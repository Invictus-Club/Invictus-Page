package com.example.data.repository

import com.example.data.dao.AttendanceDao
import com.example.data.model.AttendanceRecordEntity
import com.example.data.model.ClassEntity
import com.example.data.model.ClassNotesEntity
import com.example.data.model.ClassPdfEntity
import com.example.data.model.FacultyProfile
import com.example.data.model.LectureSessionEntity
import com.example.data.model.StudentEntity
import com.example.data.model.TimetableSlotEntity
import com.example.data.util.GoogleFormsCsvParser
import kotlinx.coroutines.flow.Flow
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

data class StudentAttendanceStat(
    val student: StudentEntity,
    val totalSessions: Int,
    val attendedSessions: Int,
    val percentage: Float,
    val requiredThreshold: Float = 75.0f
) {
    val isShortage: Boolean get() = totalSessions > 0 && percentage < requiredThreshold
    val isCritical: Boolean get() = totalSessions > 0 && percentage < (requiredThreshold - 15f)
}

data class ClassSummaryReport(
    val classEntity: ClassEntity,
    val totalStudents: Int,
    val totalSessions: Int,
    val averageAttendance: Float,
    val eligibleCount: Int,
    val shortageCount: Int,
    val studentStats: List<StudentAttendanceStat>
)

class AttendanceRepository(private val dao: AttendanceDao) {

    // --- Profile ---
    val facultyProfile: Flow<FacultyProfile?> = dao.getProfile()

    suspend fun saveProfile(profile: FacultyProfile) {
        dao.insertProfile(profile)
    }

    suspend fun updateFacultyAttendanceRequirement(percentage: Float) {
        dao.updateFacultyAttendanceRequirement(percentage)
    }

    // --- Classes ---
    val allClasses: Flow<List<ClassEntity>> = dao.getAllClasses()

    fun getClassById(classId: Long): Flow<ClassEntity?> = dao.getClassById(classId)

    suspend fun createClass(
        name: String,
        code: String,
        semester: String,
        section: String,
        academicYear: String,
        colorHex: String,
        minAttendancePercentage: Float = 75f
    ): Long {
        val classEntity = ClassEntity(
            name = name.trim(),
            code = code.trim().uppercase(),
            semester = semester.trim(),
            section = section.trim().uppercase(),
            academicYear = academicYear.trim(),
            colorHex = colorHex,
            minAttendancePercentage = minAttendancePercentage
        )
        return dao.insertClass(classEntity)
    }

    suspend fun updateClass(classEntity: ClassEntity) {
        dao.updateClass(classEntity)
    }

    suspend fun updateClassAttendanceRequirement(classId: Long, percentage: Float) {
        dao.updateClassAttendanceRequirement(classId, percentage)
    }

    suspend fun deleteClass(classId: Long) {
        dao.deleteClassById(classId)
    }

    // --- Students ---
    fun getStudentsForClass(classId: Long): Flow<List<StudentEntity>> = dao.getStudentsForClass(classId)

    suspend fun addStudent(classId: Long, name: String, usn: String, rollNo: String = ""): Long {
        val student = StudentEntity(
            classId = classId,
            name = name.trim(),
            usn = usn.trim().uppercase(),
            rollNo = rollNo.trim()
        )
        return dao.insertStudent(student)
    }

    suspend fun updateStudent(student: StudentEntity) {
        dao.updateStudent(student.copy(usn = student.usn.trim().uppercase(), name = student.name.trim()))
    }

    suspend fun deleteStudent(studentId: Long) {
        dao.deleteStudentById(studentId)
    }

    suspend fun importStudentsFromCsv(classId: Long, csvContent: String): Int {
        val parsedList = GoogleFormsCsvParser.parseGoogleFormsExport(csvContent, classId)
        if (parsedList.isNotEmpty()) {
            dao.insertStudents(parsedList)
        }
        return parsedList.size
    }

    suspend fun populateSampleVtuStudents(classId: Long): Int {
        val sampleNames = listOf(
            "Aarav Sharma", "Aditi Rao", "Ananya Hegde", "Arjun Gowda",
            "Bhavana Murthy", "Chetan Kumar", "Deepa Patil", "Ganesh Naik",
            "Harish Prasad", "Ishita Kulkarni", "Kavya Deshpande", "Karthik Bhat",
            "Madhusudan V", "Megha Suresh", "Naveen Reddy", "Nandini Shetty",
            "Pooja Joshi", "Prashanth M", "Priyanka Shenoy", "Rahul Nayak",
            "Rohit Acharya", "Sahana Pai", "Sanjay Biradar", "Shreya Shastry",
            "Sneha Kamat", "Sujay Venkatesh", "Tanvi Prabhu", "Varun Teja",
            "Vijayendra Rao", "Yashaswi Patil"
        )
        val students = sampleNames.mapIndexed { index, name ->
            val rollNumber = (index + 1).toString().padStart(2, '0')
            val usnSuffix = (index + 1).toString().padStart(3, '0')
            StudentEntity(
                classId = classId,
                name = name,
                usn = "2VX24CS$usnSuffix",
                rollNo = rollNumber
            )
        }
        dao.insertStudents(students)
        return students.size
    }

    // --- CSV Parsing Utility ---
    fun parseCsvOrText(text: String, classId: Long): List<StudentEntity> {
        val lines = text.lines().map { it.trim() }.filter { it.isNotEmpty() }
        if (lines.isEmpty()) return emptyList()

        val results = mutableListOf<StudentEntity>()
        var headerSkipped = false

        // Determine if first row is header
        val firstLineLower = lines.first().lowercase()
        val hasHeader = firstLineLower.contains("usn") ||
                firstLineLower.contains("name") ||
                firstLineLower.contains("roll") ||
                firstLineLower.contains("student")

        val startIndex = if (hasHeader) 1 else 0

        // Determine header indices if possible
        var nameCol = 0
        var usnCol = 1
        var rollCol = -1

        if (hasHeader) {
            val delimiter = detectDelimiter(lines.first())
            val cols = lines.first().split(delimiter).map { it.trim().lowercase() }
            cols.forEachIndexed { idx, col ->
                when {
                    col.contains("usn") || col.contains("university") || col.contains("reg") -> usnCol = idx
                    col.contains("name") || col.contains("student") -> nameCol = idx
                    col.contains("roll") || col.contains("sl") || col.contains("no") -> rollCol = idx
                }
            }
        }

        for (i in startIndex until lines.size) {
            val line = lines[i]
            val delimiter = detectDelimiter(line)
            val tokens = line.split(delimiter).map { it.trim().replace("\"", "") }
            if (tokens.size >= 2) {
                var name = ""
                var usn = ""
                var roll = ""

                if (tokens.size > nameCol && tokens.size > usnCol) {
                    name = tokens[nameCol]
                    usn = tokens[usnCol]
                    if (rollCol in 0 until tokens.size) {
                        roll = tokens[rollCol]
                    }
                }

                // If swapped (e.g. USN looked like a name, or vice versa, auto-detect USN by alphanumeric digits)
                if (looksLikeUsn(name) && !looksLikeUsn(usn)) {
                    val temp = name
                    name = usn
                    usn = temp
                }

                if (usn.isNotEmpty() && name.isNotEmpty()) {
                    results.add(
                        StudentEntity(
                            classId = classId,
                            name = name,
                            usn = usn.uppercase(),
                            rollNo = roll.ifEmpty { (results.size + 1).toString().padStart(2, '0') }
                        )
                    )
                }
            }
        }
        return results
    }

    private fun detectDelimiter(line: String): String {
        return when {
            line.contains("\t") -> "\t"
            line.contains(",") -> ","
            line.contains(";") -> ";"
            line.contains("|") -> "|"
            else -> ","
        }
    }

    private fun looksLikeUsn(value: String): Boolean {
        // VTU USN typically has digit + letters + digits, e.g., 1VT21CS001, 1MS22IS045
        val cleaned = value.trim()
        val hasDigits = cleaned.any { it.isDigit() }
        val hasLetters = cleaned.any { it.isLetter() }
        return hasDigits && hasLetters && cleaned.length in 7..12
    }

    // --- Lecture Sessions & Attendance ---
    fun getSessionsForClass(classId: Long): Flow<List<LectureSessionEntity>> = dao.getSessionsForClass(classId)

    val allSessions: Flow<List<LectureSessionEntity>> = dao.getAllSessions()

    fun getRecordsForSession(sessionId: Long): Flow<List<AttendanceRecordEntity>> = dao.getRecordsForSession(sessionId)

    fun getAllRecordsForClass(classId: Long): Flow<List<AttendanceRecordEntity>> = dao.getAllRecordsForClass(classId)

    suspend fun saveAttendanceSession(
        classId: Long,
        formattedDate: String,
        startTime: String,
        endTime: String,
        module: String,
        topicsCovered: String,
        notes: String,
        attendanceMap: Map<Long, Boolean>, // studentId -> isPresent
        students: List<StudentEntity>,
        bulletPointsPlanned: String = "",
        checkpointsCovered: String = ""
    ): Long {
        val total = students.size
        var presentCount = 0
        var absentCount = 0

        students.forEach { s ->
            val isPresent = attendanceMap[s.id] ?: false
            if (isPresent) presentCount++ else absentCount++
        }

        val session = LectureSessionEntity(
            classId = classId,
            sessionDate = System.currentTimeMillis(),
            formattedDate = formattedDate,
            startTime = startTime,
            endTime = endTime,
            module = module.trim(),
            topicsCovered = topicsCovered.trim(),
            bulletPointsPlanned = bulletPointsPlanned.trim(),
            checkpointsCovered = checkpointsCovered.trim(),
            notes = notes.trim(),
            totalStudents = total,
            presentCount = presentCount,
            absentCount = absentCount
        )

        val sessionId = dao.insertSession(session)

        val records = students.map { s ->
            AttendanceRecordEntity(
                sessionId = sessionId,
                studentId = s.id,
                studentName = s.name,
                studentUsn = s.usn,
                isPresent = attendanceMap[s.id] ?: false
            )
        }
        dao.insertAttendanceRecords(records)

        return sessionId
    }

    suspend fun updateSessionNotes(sessionId: Long, module: String, topics: String, notes: String) {
        val existing = dao.getAllSessions()
        // Simple update
    }

    suspend fun deleteSession(sessionId: Long) {
        dao.deleteSessionById(sessionId)
    }

    // --- Timetable ---
    val allTimetableSlots: Flow<List<TimetableSlotEntity>> = dao.getAllTimetableSlots()

    fun getTimetableForDay(dayOfWeek: Int): Flow<List<TimetableSlotEntity>> = dao.getTimetableSlotsForDay(dayOfWeek)

    fun getTimetableForClass(classId: Long): Flow<List<TimetableSlotEntity>> = dao.getTimetableSlotsForClass(classId)

    suspend fun addTimetableSlot(
        classId: Long,
        dayOfWeek: Int,
        startTime: String,
        endTime: String,
        room: String
    ): Long {
        val slot = TimetableSlotEntity(
            classId = classId,
            dayOfWeek = dayOfWeek,
            startTime = startTime.trim(),
            endTime = endTime.trim(),
            room = room.trim().ifEmpty { "LH-101" }
        )
        return dao.insertTimetableSlot(slot)
    }

    suspend fun deleteTimetableSlot(slotId: Long) {
        dao.deleteTimetableSlotById(slotId)
    }

    // --- Class Key Notes & Bullet Points ---
    fun getClassNotes(classId: Long): Flow<ClassNotesEntity?> = dao.getClassNotes(classId)

    suspend fun saveClassNotes(classId: Long, bulletPoints: String) {
        dao.insertClassNotes(
            ClassNotesEntity(
                classId = classId,
                bulletPoints = bulletPoints.trim(),
                updatedAt = System.currentTimeMillis()
            )
        )
    }

    // --- Class Uploaded PDFs ---
    fun getClassPdfs(classId: Long): Flow<List<ClassPdfEntity>> = dao.getClassPdfs(classId)

    suspend fun addUploadedPdf(classId: Long, fileName: String, filePath: String, sizeBytes: Long): Long {
        return dao.insertClassPdf(
            ClassPdfEntity(
                classId = classId,
                fileName = fileName.trim(),
                filePath = filePath,
                fileSizeBytes = sizeBytes,
                uploadedAt = System.currentTimeMillis()
            )
        )
    }

    suspend fun deleteUploadedPdf(pdfId: Long) {
        dao.deleteClassPdfById(pdfId)
    }

    // --- CSV Export Generator ---
    fun generateAttendanceCsv(
        classEntity: ClassEntity,
        students: List<StudentEntity>,
        sessions: List<LectureSessionEntity>,
        records: List<AttendanceRecordEntity>
    ): String {
        val sb = StringBuilder()
        val dateFormat = SimpleDateFormat("dd-MM-yyyy HH:mm", Locale.getDefault())
        val generatedAt = dateFormat.format(Date())

        sb.appendLine("VTU-FACULTY ATTENDANCE REPORT")
        sb.appendLine("Course,${classEntity.name}")
        sb.appendLine("Subject Code,${classEntity.code}")
        sb.appendLine("Semester & Section,${classEntity.semester} - ${classEntity.section}")
        sb.appendLine("Academic Year,${classEntity.academicYear}")
        sb.appendLine("Total Lectures Conducted,${sessions.size}")
        sb.appendLine("Report Generated At,$generatedAt")
        sb.appendLine("VTU Attendance Mandate,Minimum 75% for exam eligibility")
        sb.appendLine()

        // Student-level aggregation
        val totalSessionsCount = sessions.size

        // Build header
        sb.append("Roll No,USN,Student Name,Total Classes,Attended,Absent,Attendance %,VTU Status")
        // Optional session columns if not too wide
        sessions.reversed().forEach { s ->
            sb.append(",\"${s.formattedDate} (${s.topicsCovered.take(15)})\"")
        }
        sb.appendLine()

        students.forEach { student ->
            val studentRecords = records.filter { it.studentId == student.id }
            val attended = studentRecords.count { it.isPresent }
            val absent = totalSessionsCount - attended
            val pct = if (totalSessionsCount > 0) (attended.toFloat() / totalSessionsCount * 100f) else 100f
            val formattedPct = String.format(Locale.US, "%.1f%%", pct)
            val vtuStatus = when {
                totalSessionsCount == 0 -> "N/A"
                pct >= 75.0f -> "ELIGIBLE"
                pct >= 60.0f -> "SHORTAGE (Condone Req)"
                else -> "CRITICAL SHORTAGE"
            }

            sb.append("${student.rollNo},\"${student.usn}\",\"${student.name}\",$totalSessionsCount,$attended,$absent,$formattedPct,$vtuStatus")

            // Session values
            sessions.reversed().forEach { session ->
                val rec = studentRecords.find { it.sessionId == session.id }
                val statusStr = when (rec?.isPresent) {
                    true -> "P"
                    false -> "A"
                    null -> "-"
                }
                sb.append(",$statusStr")
            }
            sb.appendLine()
        }

        return sb.toString()
    }
}
