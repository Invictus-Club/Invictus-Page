package com.example.ui

import android.app.Application
import android.content.ContentResolver
import android.content.Context
import android.net.Uri
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.provider.OpenableColumns
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.db.AppDatabase
import com.example.data.model.AttendanceRecordEntity
import com.example.data.model.ClassEntity
import com.example.data.model.ClassNotesEntity
import com.example.data.model.ClassPdfEntity
import com.example.data.model.FacultyProfile
import com.example.data.model.LectureSessionEntity
import com.example.data.model.StudentEntity
import com.example.data.model.TimetableSlotEntity
import com.example.data.repository.AttendanceRepository
import com.example.data.repository.ClassSummaryReport
import com.example.data.repository.StudentAttendanceStat
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.File
import java.io.FileOutputStream
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale

sealed class Screen {
    object Onboarding : Screen()
    object Dashboard : Screen()
    data class ClassDetail(val classId: Long) : Screen()
    data class ClassNotesAndPdfs(val classId: Long) : Screen()
    data class SwipeAttendance(val classId: Long, val fromTimetableSlotId: Long? = null) : Screen()
    data class SessionSummary(val classId: Long) : Screen()
    object Timetable : Screen()
    object Reports : Screen()
    object AnalyticsTrends : Screen()
    object LectureNotes : Screen()
    object ProfileSettings : Screen()
    object InvictusCinematicHub : Screen()
}

class MainViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: AttendanceRepository
    private val vibrator: Vibrator?

    init {
        val db = AppDatabase.getInstance(application)
        repository = AttendanceRepository(db.attendanceDao())
        vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            val vibratorManager = application.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager
            vibratorManager?.defaultVibrator
        } else {
            @Suppress("DEPRECATION")
            application.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
        }
    }

    // --- Profile & Onboarding ---
    val facultyProfile: StateFlow<FacultyProfile?> = repository.facultyProfile
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null)

    // --- Navigation ---
    private val _currentScreen = MutableStateFlow<Screen>(Screen.Dashboard)
    val currentScreen: StateFlow<Screen> = _currentScreen.asStateFlow()

    private val screenBackStack = mutableListOf<Screen>()

    fun navigateTo(screen: Screen) {
        screenBackStack.add(_currentScreen.value)
        _currentScreen.value = screen
    }

    fun navigateBack(): Boolean {
        if (screenBackStack.isNotEmpty()) {
            _currentScreen.value = screenBackStack.removeAt(screenBackStack.size - 1)
            return true
        }
        return false
    }

    // --- Classes ---
    val allClasses: StateFlow<List<ClassEntity>> = repository.allClasses
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    private val _selectedClassId = MutableStateFlow<Long?>(null)
    val selectedClassId: StateFlow<Long?> = _selectedClassId.asStateFlow()

    fun selectClass(classId: Long) {
        _selectedClassId.value = classId
    }

    fun getStudentsForClass(classId: Long) = repository.getStudentsForClass(classId)

    fun getSessionsForClass(classId: Long) = repository.getSessionsForClass(classId)

    fun getRecordsForClass(classId: Long) = repository.getAllRecordsForClass(classId)

    fun createClass(
        name: String,
        code: String,
        semester: String,
        section: String,
        academicYear: String,
        colorHex: String,
        minAttendancePercentage: Float = 75f,
        addSampleStudents: Boolean = false,
        onCreated: (Long) -> Unit = {}
    ) {
        viewModelScope.launch {
            val classId = repository.createClass(
                name = name,
                code = code,
                semester = semester,
                section = section,
                academicYear = academicYear,
                colorHex = colorHex,
                minAttendancePercentage = minAttendancePercentage
            )
            if (addSampleStudents) {
                repository.populateSampleVtuStudents(classId)
            }
            onCreated(classId)
        }
    }

    fun updateClassAttendanceRequirement(classId: Long, percentage: Float) {
        viewModelScope.launch {
            repository.updateClassAttendanceRequirement(classId, percentage)
        }
    }

    fun updateFacultyAttendanceRequirement(percentage: Float) {
        viewModelScope.launch {
            repository.updateFacultyAttendanceRequirement(percentage)
        }
    }

    fun deleteClass(classId: Long) {
        viewModelScope.launch {
            repository.deleteClass(classId)
            if (_selectedClassId.value == classId) {
                _selectedClassId.value = null
            }
        }
    }

    // --- Students Management ---
    fun addStudent(classId: Long, name: String, usn: String, rollNo: String = "") {
        viewModelScope.launch {
            repository.addStudent(classId, name, usn, rollNo)
        }
    }

    fun updateStudent(student: StudentEntity) {
        viewModelScope.launch {
            repository.updateStudent(student)
        }
    }

    fun deleteStudent(studentId: Long) {
        viewModelScope.launch {
            repository.deleteStudent(studentId)
        }
    }

    fun importStudentsCsv(classId: Long, csvText: String, onComplete: (Int) -> Unit) {
        viewModelScope.launch {
            val count = repository.importStudentsFromCsv(classId, csvText)
            onComplete(count)
        }
    }

    fun populateSampleStudents(classId: Long, onComplete: (Int) -> Unit) {
        viewModelScope.launch {
            val count = repository.populateSampleVtuStudents(classId)
            onComplete(count)
        }
    }

    // --- Attendance Swipe State Machine ---
    private val _attendanceStudents = MutableStateFlow<List<StudentEntity>>(emptyList())
    val attendanceStudents: StateFlow<List<StudentEntity>> = _attendanceStudents.asStateFlow()

    private val _currentStudentIndex = MutableStateFlow(0)
    val currentStudentIndex: StateFlow<Int> = _currentStudentIndex.asStateFlow()

    // studentId -> isPresent
    private val _attendanceMap = MutableStateFlow<Map<Long, Boolean>>(emptyMap())
    val attendanceMap: StateFlow<Map<Long, Boolean>> = _attendanceMap.asStateFlow()

    // history of swiped student IDs in order for undo
    private val _swipeHistory = MutableStateFlow<List<Long>>(emptyList())
    val swipeHistory: StateFlow<List<Long>> = _swipeHistory.asStateFlow()

    // Active session metadata
    private val _activeClassId = MutableStateFlow<Long?>(null)
    val activeClassId: StateFlow<Long?> = _activeClassId.asStateFlow()

    val sessionDateStr = MutableStateFlow(SimpleDateFormat("dd MMM yyyy", Locale.getDefault()).format(Date()))
    val sessionStartTime = MutableStateFlow(SimpleDateFormat("hh:mm a", Locale.getDefault()).format(Date()))
    val sessionEndTime = MutableStateFlow(
        SimpleDateFormat("hh:mm a", Locale.getDefault()).format(Date(System.currentTimeMillis() + 3600_000))
    )
    val sessionModule = MutableStateFlow("Module 1")
    val sessionTopics = MutableStateFlow("")
    val sessionNotes = MutableStateFlow("")
    val sessionBulletPoints = MutableStateFlow<List<String>>(emptyList())
    val sessionCheckpoints = MutableStateFlow<Map<String, Boolean>>(emptyMap())

    fun setSessionBulletPoints(points: List<String>) {
        sessionBulletPoints.value = points
        sessionCheckpoints.value = points.associateWith { true }
        if (sessionTopics.value.isBlank()) {
            sessionTopics.value = points.joinToString(", ")
        }
    }

    fun addSessionBulletPoint(point: String) {
        val trimmed = point.trim()
        if (trimmed.isNotBlank() && !sessionBulletPoints.value.contains(trimmed)) {
            val updated = sessionBulletPoints.value + trimmed
            sessionBulletPoints.value = updated
            sessionCheckpoints.value = sessionCheckpoints.value + (trimmed to true)
            sessionTopics.value = updated.joinToString(", ")
        }
    }

    fun removeSessionBulletPoint(point: String) {
        val updated = sessionBulletPoints.value - point
        sessionBulletPoints.value = updated
        sessionCheckpoints.value = sessionCheckpoints.value - point
        sessionTopics.value = updated.joinToString(", ")
    }

    fun toggleSessionCheckpoint(point: String) {
        val current = sessionCheckpoints.value[point] ?: false
        sessionCheckpoints.value = sessionCheckpoints.value + (point to !current)
        val covered = sessionBulletPoints.value.filter { sessionCheckpoints.value[it] == true }
        sessionTopics.value = covered.joinToString(", ")
    }

    fun markAllCheckpoints(covered: Boolean) {
        sessionCheckpoints.value = sessionBulletPoints.value.associateWith { covered }
        val coveredList = if (covered) sessionBulletPoints.value else emptyList()
        sessionTopics.value = coveredList.joinToString(", ")
    }

    fun launchQuickAttendance(classId: Long, timetableSlot: TimetableSlotEntity? = null) {
        viewModelScope.launch {
            val students = repository.getStudentsForClass(classId).stateIn(viewModelScope).value
            if (students.isNotEmpty()) {
                startAttendance(classId, students, timetableSlot)
            } else {
                navigateTo(Screen.ClassDetail(classId))
            }
        }
    }

    fun startAttendance(classId: Long, students: List<StudentEntity>, timetableSlot: TimetableSlotEntity? = null) {
        _activeClassId.value = classId
        _attendanceStudents.value = students
        _currentStudentIndex.value = 0
        _attendanceMap.value = emptyMap()
        _swipeHistory.value = emptyList()

        val cal = Calendar.getInstance()
        sessionDateStr.value = SimpleDateFormat("dd MMM yyyy", Locale.getDefault()).format(cal.time)
        if (timetableSlot != null) {
            sessionStartTime.value = timetableSlot.startTime
            sessionEndTime.value = timetableSlot.endTime
        } else {
            sessionStartTime.value = SimpleDateFormat("hh:mm a", Locale.getDefault()).format(cal.time)
            cal.add(Calendar.HOUR_OF_DAY, 1)
            sessionEndTime.value = SimpleDateFormat("hh:mm a", Locale.getDefault()).format(cal.time)
        }
        sessionNotes.value = ""
        viewModelScope.launch {
            val classNotes = repository.getClassNotes(classId).firstOrNull()
            if (classNotes != null && classNotes.bulletPoints.isNotBlank()) {
                val points = classNotes.bulletPoints.lines()
                    .map { it.trim().removePrefix("•").removePrefix("-").trim() }
                    .filter { it.isNotEmpty() }
                if (points.isNotEmpty()) {
                    setSessionBulletPoints(points)
                }
            }
        }
        navigateTo(Screen.SwipeAttendance(classId))
    }

    fun markCurrentStudent(isPresent: Boolean) {
        val students = _attendanceStudents.value
        val index = _currentStudentIndex.value
        if (index in students.indices) {
            val student = students[index]
            _attendanceMap.value = _attendanceMap.value + (student.id to isPresent)
            _swipeHistory.value = _swipeHistory.value + student.id
            triggerHaptic(isPresent)

            if (index + 1 < students.size) {
                _currentStudentIndex.value = index + 1
            } else {
                // Completed all students -> Go to Session Summary
                _currentStudentIndex.value = students.size
                _activeClassId.value?.let { classId ->
                    navigateTo(Screen.SessionSummary(classId))
                }
            }
        }
    }

    fun undoLastSwipe() {
        val history = _swipeHistory.value
        if (history.isNotEmpty()) {
            val lastStudentId = history.last()
            _swipeHistory.value = history.dropLast(1)
            _attendanceMap.value = _attendanceMap.value - lastStudentId
            if (_currentStudentIndex.value > 0) {
                _currentStudentIndex.value = _currentStudentIndex.value - 1
            }
            triggerSoftHaptic()
        }
    }

    fun markRemainingAsPresent() {
        val students = _attendanceStudents.value
        val index = _currentStudentIndex.value
        val newMap = _attendanceMap.value.toMutableMap()
        val newHistory = _swipeHistory.value.toMutableList()

        for (i in index until students.size) {
            val s = students[i]
            newMap[s.id] = true
            newHistory.add(s.id)
        }
        _attendanceMap.value = newMap
        _swipeHistory.value = newHistory
        _currentStudentIndex.value = students.size
        triggerHaptic(true)

        _activeClassId.value?.let { classId ->
            navigateTo(Screen.SessionSummary(classId))
        }
    }

    fun toggleStudentAttendanceInSummary(studentId: Long) {
        val current = _attendanceMap.value[studentId] ?: false
        _attendanceMap.value = _attendanceMap.value + (studentId to !current)
        triggerSoftHaptic()
    }

    fun saveCompletedSession(onSaved: () -> Unit) {
        val classId = _activeClassId.value ?: return
        val students = _attendanceStudents.value
        val plannedStr = sessionBulletPoints.value.joinToString("\n") { "• $it" }
        val checkedStr = sessionBulletPoints.value
            .map { pt -> "$pt:${sessionCheckpoints.value[pt] == true}" }
            .joinToString(";")
        val coveredTopics = sessionBulletPoints.value
            .filter { sessionCheckpoints.value[it] == true }
            .joinToString(", ")
            .ifBlank { sessionTopics.value }

        viewModelScope.launch {
            repository.saveAttendanceSession(
                classId = classId,
                formattedDate = sessionDateStr.value,
                startTime = sessionStartTime.value,
                endTime = sessionEndTime.value,
                module = sessionModule.value,
                topicsCovered = coveredTopics,
                notes = sessionNotes.value,
                attendanceMap = _attendanceMap.value,
                students = students,
                bulletPointsPlanned = plannedStr,
                checkpointsCovered = checkedStr
            )
            onSaved()
            navigateTo(Screen.ClassDetail(classId))
        }
    }

    // --- Timetable ---
    val allTimetableSlots: StateFlow<List<TimetableSlotEntity>> = repository.allTimetableSlots
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    fun addTimetableSlot(classId: Long, dayOfWeek: Int, startTime: String, endTime: String, room: String) {
        viewModelScope.launch {
            repository.addTimetableSlot(classId, dayOfWeek, startTime, endTime, room)
        }
    }

    fun deleteTimetableSlot(slotId: Long) {
        viewModelScope.launch {
            repository.deleteTimetableSlot(slotId)
        }
    }

    // --- All Lecture Sessions ---
    val allSessions: StateFlow<List<LectureSessionEntity>> = repository.allSessions
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    fun deleteSession(sessionId: Long) {
        viewModelScope.launch {
            repository.deleteSession(sessionId)
        }
    }

    // --- Profile Save ---
    fun saveFacultyProfile(
        name: String,
        role: String,
        department: String,
        college: String,
        createInitialClass: Boolean = false
    ) {
        viewModelScope.launch {
            val profile = FacultyProfile(
                id = 1,
                name = name.trim(),
                role = role.trim(),
                department = department.trim(),
                college = college.trim(),
                isOnboarded = true,
                updatedAt = System.currentTimeMillis()
            )
            repository.saveProfile(profile)

            if (createInitialClass) {
                val classId = repository.createClass(
                    name = "Software Engineering & Agile",
                    code = "BCS501",
                    semester = "5th Sem",
                    section = "A",
                    academicYear = "2024-25",
                    colorHex = "#0284C7"
                )
                repository.populateSampleVtuStudents(classId)
                // Add sample timetable slot for today
                val todayDay = Calendar.getInstance().get(Calendar.DAY_OF_WEEK) // 1=Sun, 2=Mon...
                val vtuDay = if (todayDay in 2..7) todayDay - 1 else 1
                repository.addTimetableSlot(
                    classId = classId,
                    dayOfWeek = vtuDay,
                    startTime = "10:00 AM",
                    endTime = "11:00 AM",
                    room = "LH-302"
                )
            }
            navigateTo(Screen.Dashboard)
        }
    }

    // --- CSV & PDF Export Helpers ---
    fun getAttendanceCsv(
        classEntity: ClassEntity,
        students: List<StudentEntity>,
        sessions: List<LectureSessionEntity>,
        records: List<AttendanceRecordEntity>
    ): String {
        return repository.generateAttendanceCsv(classEntity, students, sessions, records)
    }

    // --- Class Key Notes & Bullet Points ---
    fun getClassNotes(classId: Long) = repository.getClassNotes(classId)

    fun saveClassNotes(classId: Long, points: String) {
        viewModelScope.launch {
            repository.saveClassNotes(classId, points)
        }
    }

    // --- Class Uploaded PDFs ---
    fun getClassPdfs(classId: Long) = repository.getClassPdfs(classId)

    fun uploadPdfForClass(
        classId: Long,
        uri: Uri,
        contentResolver: ContentResolver,
        onComplete: (Boolean) -> Unit = {}
    ) {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                var displayName = "Document_${System.currentTimeMillis()}.pdf"
                var size = 0L

                contentResolver.query(uri, null, null, null, null)?.use { cursor ->
                    val nameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                    val sizeIndex = cursor.getColumnIndex(OpenableColumns.SIZE)
                    if (cursor.moveToFirst()) {
                        if (nameIndex != -1) {
                            displayName = cursor.getString(nameIndex) ?: displayName
                        }
                        if (sizeIndex != -1) {
                            size = cursor.getLong(sizeIndex)
                        }
                    }
                }

                val pdfDir = File(getApplication<Application>().filesDir, "pdfs")
                if (!pdfDir.exists()) pdfDir.mkdirs()

                val safePrefix = System.currentTimeMillis()
                val targetFile = File(pdfDir, "${safePrefix}_$displayName")
                contentResolver.openInputStream(uri)?.use { input ->
                    FileOutputStream(targetFile).use { output ->
                        input.copyTo(output)
                    }
                }

                val fileSize = if (size > 0) size else targetFile.length()
                repository.addUploadedPdf(classId, displayName, targetFile.absolutePath, fileSize)
                withContext(Dispatchers.Main) {
                    onComplete(true)
                }
            } catch (e: Exception) {
                e.printStackTrace()
                withContext(Dispatchers.Main) {
                    onComplete(false)
                }
            }
        }
    }

    fun deleteUploadedPdf(pdfId: Long, filePath: String) {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                val f = File(filePath)
                if (f.exists()) f.delete()
            } catch (_: Exception) {}
            repository.deleteUploadedPdf(pdfId)
        }
    }

    // --- Haptics ---
    private fun triggerHaptic(isPresent: Boolean) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val effect = if (isPresent) {
                    VibrationEffect.createOneShot(40, VibrationEffect.DEFAULT_AMPLITUDE)
                } else {
                    VibrationEffect.createWaveform(longArrayOf(0, 30, 40, 30), intArrayOf(0, 180, 0, 180), -1)
                }
                vibrator?.vibrate(effect)
            } else {
                @Suppress("DEPRECATION")
                vibrator?.vibrate(if (isPresent) 40 else 80)
            }
        } catch (_: Exception) {}
    }

    private fun triggerSoftHaptic() {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator?.vibrate(VibrationEffect.createOneShot(20, 100))
            } else {
                @Suppress("DEPRECATION")
                vibrator?.vibrate(20)
            }
        } catch (_: Exception) {}
    }
}
