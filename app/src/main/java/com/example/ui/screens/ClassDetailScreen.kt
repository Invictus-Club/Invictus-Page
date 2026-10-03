package com.example.ui.screens

import android.content.Intent
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Description
import androidx.compose.material.icons.filled.FileDownload
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.GroupAdd
import androidx.compose.material.icons.filled.PictureAsPdf
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.PrimaryTabRow
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.AttendanceRecordEntity
import com.example.data.model.ClassEntity
import com.example.data.model.LectureSessionEntity
import com.example.data.model.StudentEntity
import com.example.data.util.PdfReportExporter
import com.example.ui.MainViewModel
import com.example.ui.Screen
import com.example.ui.theme.AbsentRed
import com.example.ui.theme.PresentGreen
import com.example.ui.theme.VtuBlueDark
import com.example.ui.theme.WarningAmber
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ClassDetailScreen(
    classId: Long,
    viewModel: MainViewModel
) {
    val context = LocalContext.current
    val allClasses by viewModel.allClasses.collectAsState()
    val classEntity = allClasses.find { it.id == classId }

    val students by viewModel.getStudentsForClass(classId).collectAsState(initial = emptyList())
    val sessions by viewModel.getSessionsForClass(classId).collectAsState(initial = emptyList())
    val records by viewModel.getRecordsForClass(classId).collectAsState(initial = emptyList())

    var selectedTabIndex by remember { mutableStateOf(0) }
    var searchQuery by remember { mutableStateOf("") }
    var showCsvImportDialog by remember { mutableStateOf(false) }
    var showAddStudentDialog by remember { mutableStateOf(false) }
    var showAlterReqDialog by remember { mutableStateOf(false) }
    var studentToDelete by remember { mutableStateOf<StudentEntity?>(null) }
    var sessionToDelete by remember { mutableStateOf<LectureSessionEntity?>(null) }
    var showDeleteClassDialog by remember { mutableStateOf(false) }

    BackHandler {
        viewModel.navigateTo(Screen.Dashboard)
    }

    if (showCsvImportDialog) {
        CsvImportDialog(
            classId = classId,
            viewModel = viewModel,
            onDismiss = { showCsvImportDialog = false }
        )
    }

    if (showAddStudentDialog) {
        AddManualStudentDialog(
            onDismiss = { showAddStudentDialog = false },
            onAdd = { name, usn, rollNo ->
                viewModel.addStudent(classId, name, usn, rollNo)
                showAddStudentDialog = false
            }
        )
    }

    if (studentToDelete != null) {
        AlertDialog(
            onDismissRequest = { studentToDelete = null },
            title = { Text("Delete Student?") },
            text = { Text("Remove ${studentToDelete?.name} (${studentToDelete?.usn}) from this class roster?") },
            confirmButton = {
                TextButton(
                    onClick = {
                        studentToDelete?.let { viewModel.deleteStudent(it.id) }
                        studentToDelete = null
                    }
                ) {
                    Text("Delete", color = AbsentRed)
                }
            },
            dismissButton = {
                TextButton(onClick = { studentToDelete = null }) {
                    Text("Cancel")
                }
            }
        )
    }

    if (sessionToDelete != null) {
        AlertDialog(
            onDismissRequest = { sessionToDelete = null },
            title = { Text("Delete Lecture Record?") },
            text = { Text("Delete attendance session of ${sessionToDelete?.formattedDate}?") },
            confirmButton = {
                TextButton(
                    onClick = {
                        sessionToDelete?.let { viewModel.deleteSession(it.id) }
                        sessionToDelete = null
                    }
                ) {
                    Text("Delete", color = AbsentRed)
                }
            },
            dismissButton = {
                TextButton(onClick = { sessionToDelete = null }) {
                    Text("Cancel")
                }
            }
        )
    }

    if (showDeleteClassDialog) {
        AlertDialog(
            onDismissRequest = { showDeleteClassDialog = false },
            title = { Text("Delete Class?") },
            text = { Text("Are you sure you want to delete ${classEntity?.name}? All students, sessions, and records will be deleted.") },
            confirmButton = {
                TextButton(
                    onClick = {
                        showDeleteClassDialog = false
                        viewModel.deleteClass(classId)
                        viewModel.navigateTo(Screen.Dashboard)
                    }
                ) {
                    Text("Delete Course", color = AbsentRed)
                }
            },
            dismissButton = {
                TextButton(onClick = { showDeleteClassDialog = false }) {
                    Text("Cancel")
                }
            }
        )
    }

    if (showAlterReqDialog && classEntity != null) {
        var newReqStr by remember { mutableStateOf(classEntity.minAttendancePercentage.toInt().toString()) }
        AlertDialog(
            onDismissRequest = { showAlterReqDialog = false },
            title = { Text("Alter Attendance Requirement") },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Text(
                        text = "Customize the minimum attendance percentage required for ${classEntity.code}. Students below this threshold will be flagged with a Shortage Alert.",
                        style = MaterialTheme.typography.bodySmall
                    )
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        listOf("70", "75", "80", "85").forEach { preset ->
                            val isSel = newReqStr == preset
                            OutlinedButton(
                                onClick = { newReqStr = preset },
                                modifier = Modifier.weight(1f),
                                contentPadding = PaddingValues(0.dp),
                                colors = ButtonDefaults.outlinedButtonColors(
                                    containerColor = if (isSel) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surface
                                )
                            ) {
                                Text("$preset%")
                            }
                        }
                    }
                    OutlinedTextField(
                        value = newReqStr,
                        onValueChange = { newReqStr = it.filter { c -> c.isDigit() }.take(3) },
                        label = { Text("Required Attendance %") },
                        trailingIcon = { Text("%", fontWeight = FontWeight.Bold, modifier = Modifier.padding(end = 12.dp)) },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        val num = newReqStr.toFloatOrNull() ?: 75f
                        viewModel.updateClassAttendanceRequirement(classId, num)
                        showAlterReqDialog = false
                    }
                ) {
                    Text("Save Requirement")
                }
            },
            dismissButton = {
                TextButton(onClick = { showAlterReqDialog = false }) {
                    Text("Cancel")
                }
            }
        )
    }

    Scaffold(
        topBar = {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                IconButton(
                    onClick = { viewModel.navigateTo(Screen.Dashboard) },
                    modifier = Modifier.testTag("detail_back_button")
                ) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = "Back",
                        tint = MaterialTheme.colorScheme.onBackground
                    )
                }

                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = classEntity?.code ?: "COURSE",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onBackground
                    )
                    Text(
                        text = "${classEntity?.semester ?: ""} ${classEntity?.section ?: ""}".trim(),
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                IconButton(
                    onClick = { showDeleteClassDialog = true },
                    modifier = Modifier.testTag("delete_class_button")
                ) {
                    Icon(
                        imageVector = Icons.Default.Delete,
                        contentDescription = "Delete Class",
                        tint = MaterialTheme.colorScheme.error
                    )
                }
            }
        },
        floatingActionButton = {
            if (selectedTabIndex == 0) {
                FloatingActionButton(
                    onClick = { showAddStudentDialog = true },
                    containerColor = MaterialTheme.colorScheme.primary,
                    contentColor = MaterialTheme.colorScheme.onPrimary,
                    modifier = Modifier.testTag("fab_add_student")
                ) {
                    Icon(Icons.Default.Add, contentDescription = "Add Student")
                }
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(MaterialTheme.colorScheme.background)
        ) {
            // Header Info Card
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 6.dp),
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = classEntity?.name ?: "Course Name",
                            style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            modifier = Modifier.weight(1f)
                        )

                        Surface(
                            color = MaterialTheme.colorScheme.primaryContainer,
                            shape = RoundedCornerShape(8.dp),
                            border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.primary.copy(alpha = 0.4f)),
                            modifier = Modifier
                                .clickable { showAlterReqDialog = true }
                                .testTag("alter_requirement_badge")
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "Req: ${classEntity?.minAttendancePercentage?.toInt() ?: 75}%",
                                    style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                    color = MaterialTheme.colorScheme.onPrimaryContainer
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = "✎ Alter",
                                    style = MaterialTheme.typography.labelSmall.copy(fontSize = 10.sp, fontWeight = FontWeight.SemiBold),
                                    color = MaterialTheme.colorScheme.primary
                                )
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                            Column {
                                Text(
                                    text = "${students.size}",
                                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Black),
                                    color = MaterialTheme.colorScheme.primary
                                )
                                Text(
                                    text = "Students",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                            Column {
                                Text(
                                    text = "${sessions.size}",
                                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Black),
                                    color = MaterialTheme.colorScheme.secondary
                                )
                                Text(
                                    text = "Lectures",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }

                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            OutlinedButton(
                                onClick = { viewModel.navigateTo(Screen.ClassNotesAndPdfs(classId)) },
                                shape = RoundedCornerShape(12.dp)
                            ) {
                                Icon(Icons.Default.Description, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("Notes & PDFs")
                            }

                            // CTA Start Attendance
                            Button(
                                onClick = {
                                    if (students.isNotEmpty()) {
                                        viewModel.startAttendance(classId, students)
                                    } else {
                                        showCsvImportDialog = true
                                    }
                                },
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = if (students.isNotEmpty()) PresentGreen else MaterialTheme.colorScheme.primary
                                ),
                                shape = RoundedCornerShape(12.dp),
                                modifier = Modifier.testTag("start_roll_call_button")
                            ) {
                                Icon(Icons.Default.CheckCircle, contentDescription = null, tint = Color.White)
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = if (students.isNotEmpty()) "Attendance" else "Add Students",
                                    style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.Bold),
                                    color = Color.White
                                )
                            }
                        }
                    }
                }
            }

            // Tab Row
            PrimaryTabRow(
                selectedTabIndex = selectedTabIndex,
                modifier = Modifier.fillMaxWidth()
            ) {
                Tab(
                    selected = selectedTabIndex == 0,
                    onClick = { selectedTabIndex = 0 },
                    text = { Text("Students (${students.size})") },
                    icon = { Icon(Icons.Default.Group, contentDescription = null, modifier = Modifier.size(18.dp)) }
                )
                Tab(
                    selected = selectedTabIndex == 1,
                    onClick = { selectedTabIndex = 1 },
                    text = { Text("Lecture Logs (${sessions.size})") },
                    icon = { Icon(Icons.Default.Book, contentDescription = null, modifier = Modifier.size(18.dp)) }
                )
                Tab(
                    selected = selectedTabIndex == 2,
                    onClick = { selectedTabIndex = 2 },
                    text = { Text("VTU Reports") },
                    icon = { Icon(Icons.Default.FileDownload, contentDescription = null, modifier = Modifier.size(18.dp)) }
                )
            }

            // Tab Content
            when (selectedTabIndex) {
                0 -> {
                    // --- Students Roster Tab ---
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(16.dp)
                    ) {
                        // Quick Action Bar: Search & CSV Import
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            OutlinedTextField(
                                value = searchQuery,
                                onValueChange = { searchQuery = it },
                                placeholder = { Text("Search Name or USN...") },
                                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                                modifier = Modifier
                                    .weight(1f)
                                    .testTag("search_student_input"),
                                singleLine = true,
                                shape = RoundedCornerShape(10.dp)
                            )

                            OutlinedButton(
                                onClick = { showCsvImportDialog = true },
                                shape = RoundedCornerShape(10.dp),
                                modifier = Modifier.testTag("import_csv_button")
                            ) {
                                Icon(Icons.Default.GroupAdd, contentDescription = null)
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("CSV")
                            }
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        val filteredStudents = students.filter {
                            it.name.contains(searchQuery, ignoreCase = true) ||
                                    it.usn.contains(searchQuery, ignoreCase = true)
                        }

                        if (filteredStudents.isEmpty()) {
                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .fillMaxWidth(),
                                contentAlignment = Alignment.Center
                            ) {
                                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                    Text(
                                        text = if (students.isEmpty()) "No students in this class yet." else "No matching students.",
                                        style = MaterialTheme.typography.bodyMedium,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                    if (students.isEmpty()) {
                                        Spacer(modifier = Modifier.height(12.dp))
                                        Button(
                                            onClick = { showCsvImportDialog = true },
                                            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
                                        ) {
                                            Text("Import Students via CSV / Excel")
                                        }
                                    }
                                }
                            }
                        } else {
                            LazyColumn(
                                modifier = Modifier.weight(1f),
                                verticalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                items(filteredStudents, key = { it.id }) { student ->
                                    val studentRecords = records.filter { it.studentId == student.id }
                                    val attended = studentRecords.count { it.isPresent }
                                    val totalSessions = sessions.size
                                    val pct = if (totalSessions > 0) (attended.toFloat() / totalSessions * 100f) else 100f
                                    val minReq = classEntity?.minAttendancePercentage ?: 75.0f
                                    val isShortage = totalSessions > 0 && pct < minReq

                                    StudentRosterCard(
                                        student = student,
                                        attended = attended,
                                        totalSessions = totalSessions,
                                        percentage = pct,
                                        isShortage = isShortage,
                                        onDelete = { studentToDelete = student }
                                    )
                                }
                            }
                        }
                    }
                }
                1 -> {
                    // --- Lecture Logs & Notes Tab ---
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(16.dp)
                    ) {
                        if (sessions.isEmpty()) {
                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .fillMaxWidth(),
                                contentAlignment = Alignment.Center
                            ) {
                                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                    Text(
                                        text = "No lecture attendance recorded yet.",
                                        style = MaterialTheme.typography.bodyMedium,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                    Spacer(modifier = Modifier.height(12.dp))
                                    Button(
                                        onClick = {
                                            if (students.isNotEmpty()) {
                                                viewModel.startAttendance(classId, students)
                                            } else {
                                                showCsvImportDialog = true
                                            }
                                        }
                                    ) {
                                        Text("Start First Lecture Roll-Call")
                                    }
                                }
                            }
                        } else {
                            LazyColumn(
                                modifier = Modifier.weight(1f),
                                verticalArrangement = Arrangement.spacedBy(12.dp)
                            ) {
                                items(sessions, key = { it.id }) { session ->
                                    LectureLogCard(
                                        session = session,
                                        onSharePdf = {
                                            if (classEntity != null) {
                                                try {
                                                    val sessionRecords = records.filter { it.sessionId == session.id }
                                                    val attMap = sessionRecords.associate { it.studentId to it.isPresent }
                                                    val pdfFile = PdfReportExporter.generateSessionAttendancePdf(
                                                        context = context,
                                                        classEntity = classEntity,
                                                        facultyProfile = viewModel.facultyProfile.value,
                                                        sessionDate = session.formattedDate,
                                                        sessionTime = "${session.startTime} - ${session.endTime}",
                                                        topicsCovered = session.topicsCovered,
                                                        module = session.module,
                                                        students = students,
                                                        attendanceMap = attMap
                                                    )
                                                    val shareIntent = PdfReportExporter.getSharePdfIntent(
                                                        context = context,
                                                        pdfFile = pdfFile,
                                                        title = "${classEntity.code} - ${session.formattedDate} Attendance Report"
                                                    )
                                                    context.startActivity(Intent.createChooser(shareIntent, "Share Lecture PDF Report"))
                                                } catch (e: Exception) {
                                                    android.widget.Toast.makeText(context, "Error creating PDF: ${e.localizedMessage}", android.widget.Toast.LENGTH_SHORT).show()
                                                }
                                            }
                                        },
                                        onDelete = { sessionToDelete = session }
                                    )
                                }
                            }
                        }
                    }
                }
                2 -> {
                    // --- VTU Reports & Export Tab ---
                    ClassVtuReportsTab(
                        classEntity = classEntity ?: ClassEntity(name = "", code = "", semester = "", section = "", academicYear = ""),
                        students = students,
                        sessions = sessions,
                        records = records,
                        viewModel = viewModel
                    )
                }
            }
        }
    }
}

@Composable
fun StudentRosterCard(
    student: StudentEntity,
    attended: Int,
    totalSessions: Int,
    percentage: Float,
    isShortage: Boolean,
    onDelete: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 14.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.weight(1f)
            ) {
                Surface(
                    color = MaterialTheme.colorScheme.surface,
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(
                        text = "#${student.rollNo.ifBlank { "01" }}",
                        style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface,
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 4.dp)
                    )
                }

                Column {
                    Text(
                        text = student.usn,
                        style = MaterialTheme.typography.labelMedium.copy(
                            fontFamily = FontFamily.Monospace,
                            fontWeight = FontWeight.Bold
                        ),
                        color = MaterialTheme.colorScheme.primary
                    )
                    Text(
                        text = student.name,
                        style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold),
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                if (totalSessions > 0) {
                    Surface(
                        color = if (isShortage) AbsentRed.copy(alpha = 0.15f) else PresentGreen.copy(alpha = 0.15f),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            if (isShortage) {
                                Icon(
                                    imageVector = Icons.Default.Warning,
                                    contentDescription = "Shortage",
                                    tint = AbsentRed,
                                    modifier = Modifier.size(12.dp)
                                )
                                Spacer(modifier = Modifier.width(3.dp))
                            }
                            Text(
                                text = String.format(Locale.US, "%.0f%%", percentage),
                                style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Black),
                                color = if (isShortage) AbsentRed else PresentGreen
                            )
                        }
                    }
                }

                IconButton(
                    onClick = onDelete,
                    modifier = Modifier.size(32.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Delete,
                        contentDescription = "Delete",
                        tint = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.6f),
                        modifier = Modifier.size(18.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun LectureLogCard(
    session: LectureSessionEntity,
    onSharePdf: () -> Unit,
    onDelete: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = session.formattedDate,
                        style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    if (session.startTime.isNotBlank()) {
                        Text(
                            text = "${session.startTime} - ${session.endTime}",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f)
                        )
                    }
                }

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    Surface(
                        color = PresentGreen.copy(alpha = 0.15f),
                        shape = RoundedCornerShape(6.dp)
                    ) {
                        Text(
                            text = "${session.presentCount} P",
                            style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                            color = PresentGreen,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 3.dp)
                        )
                    }
                    Surface(
                        color = AbsentRed.copy(alpha = 0.15f),
                        shape = RoundedCornerShape(6.dp)
                    ) {
                        Text(
                            text = "${session.absentCount} A",
                            style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                            color = AbsentRed,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 3.dp)
                        )
                    }

                    IconButton(
                        onClick = onSharePdf,
                        modifier = Modifier.size(28.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.PictureAsPdf,
                            contentDescription = "Share Session PDF",
                            tint = AbsentRed,
                            modifier = Modifier.size(16.dp)
                        )
                    }

                    IconButton(
                        onClick = onDelete,
                        modifier = Modifier.size(28.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Delete,
                            contentDescription = "Delete Session",
                            tint = MaterialTheme.colorScheme.error.copy(alpha = 0.7f),
                            modifier = Modifier.size(16.dp)
                        )
                    }
                }
            }

            if (session.module.isNotBlank() || session.topicsCovered.isNotBlank()) {
                Spacer(modifier = Modifier.height(10.dp))
                Surface(
                    color = MaterialTheme.colorScheme.surface,
                    shape = RoundedCornerShape(8.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(10.dp)) {
                        if (session.module.isNotBlank()) {
                            Text(
                                text = session.module,
                                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                color = MaterialTheme.colorScheme.primary
                            )
                        }
                        if (session.topicsCovered.isNotBlank()) {
                            Text(
                                text = session.topicsCovered,
                                style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Medium),
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        }

                        if (session.checkpointsCovered.isNotBlank()) {
                            val checkpointPairs = session.checkpointsCovered.split(";")
                                .mapNotNull { item ->
                                    val parts = item.split(":")
                                    if (parts.size >= 2) parts[0] to (parts[1].toBooleanStrictOrNull() ?: false) else null
                                }
                            if (checkpointPairs.isNotEmpty()) {
                                Spacer(modifier = Modifier.height(4.dp))
                                Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                                    checkpointPairs.forEach { (pt, covered) ->
                                        Text(
                                            text = if (covered) "✓ $pt" else "⏳ $pt (carried forward)",
                                            style = MaterialTheme.typography.labelSmall.copy(
                                                fontWeight = if (covered) FontWeight.SemiBold else FontWeight.Normal
                                            ),
                                            color = if (covered) PresentGreen else WarningAmber
                                        )
                                    }
                                }
                            }
                        }
                        if (session.notes.isNotBlank()) {
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = "Notes: ${session.notes}",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ClassVtuReportsTab(
    classEntity: ClassEntity,
    students: List<StudentEntity>,
    sessions: List<LectureSessionEntity>,
    records: List<AttendanceRecordEntity>,
    viewModel: MainViewModel
) {
    val context = LocalContext.current
    val totalClasses = sessions.size
    val minReq = classEntity.minAttendancePercentage

    val eligibleCount = students.count { s ->
        val attended = records.count { it.studentId == s.id && it.isPresent }
        totalClasses == 0 || (attended.toFloat() / totalClasses * 100f) >= minReq
    }
    val shortageCount = students.size - eligibleCount

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // VTU Mandate Warning / Overview Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Warning,
                        contentDescription = null,
                        tint = WarningAmber
                    )
                    Text(
                        text = "Attendance Requirement (${minReq.toInt()}%)",
                        style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceAround
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            text = "$eligibleCount",
                            style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Black),
                            color = PresentGreen
                        )
                        Text(
                            text = "Eligible (≥75%)",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }

                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            text = "$shortageCount",
                            style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Black),
                            color = if (shortageCount > 0) AbsentRed else MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Text(
                            text = "Shortage (<75%)",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }

        // Export Actions Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Text(
                    text = "Export & Share Report",
                    style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold),
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                Text(
                    text = "Generate comprehensive official PDF or CSV reports with student USN, percentages, and VTU shortage status.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                // Primary PDF Export Button
                Button(
                    onClick = {
                        try {
                            val profile = viewModel.facultyProfile.value
                            val pdfFile = PdfReportExporter.generateAttendancePdf(
                                context = context,
                                classEntity = classEntity,
                                facultyProfile = profile,
                                students = students,
                                sessions = sessions,
                                records = records
                            )
                            val shareIntent = PdfReportExporter.getSharePdfIntent(
                                context = context,
                                pdfFile = pdfFile,
                                title = "VTU Attendance Report - ${classEntity.code} (${classEntity.name})"
                            )
                            context.startActivity(Intent.createChooser(shareIntent, "Export PDF Report"))
                        } catch (e: Exception) {
                            android.widget.Toast.makeText(context, "Error creating PDF: ${e.localizedMessage}", android.widget.Toast.LENGTH_SHORT).show()
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = PresentGreen),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp)
                        .testTag("export_class_pdf_button"),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Icon(Icons.Default.PictureAsPdf, contentDescription = null, tint = Color.White)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Export Official PDF Report", color = Color.White, fontWeight = FontWeight.Bold)
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    OutlinedButton(
                        onClick = {
                            try {
                                val profile = viewModel.facultyProfile.value
                                val pdfFile = PdfReportExporter.generateAttendancePdf(
                                    context = context,
                                    classEntity = classEntity,
                                    facultyProfile = profile,
                                    students = students,
                                    sessions = sessions,
                                    records = records
                                )
                                val viewIntent = PdfReportExporter.getViewPdfIntent(context, pdfFile)
                                context.startActivity(Intent.createChooser(viewIntent, "Open PDF with"))
                            } catch (e: Exception) {
                                android.widget.Toast.makeText(context, "No PDF viewer found on device", android.widget.Toast.LENGTH_SHORT).show()
                            }
                        },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Text("View PDF")
                    }

                    OutlinedButton(
                        onClick = {
                            val csvData = viewModel.getAttendanceCsv(classEntity, students, sessions, records)
                            val sendIntent = Intent().apply {
                                action = Intent.ACTION_SEND
                                putExtra(Intent.EXTRA_TEXT, csvData)
                                putExtra(Intent.EXTRA_SUBJECT, "Attendance Report - ${classEntity.name} (${classEntity.code})")
                                type = "text/csv"
                            }
                            val shareIntent = Intent.createChooser(sendIntent, "Share VTU Attendance Report")
                            context.startActivity(shareIntent)
                        },
                        modifier = Modifier
                            .weight(1f)
                            .testTag("share_csv_button"),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Icon(Icons.Default.Share, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Share CSV")
                    }
                }
            }
        }
    }
}

@Composable
fun AddManualStudentDialog(
    onDismiss: () -> Unit,
    onAdd: (name: String, usn: String, rollNo: String) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var usn by remember { mutableStateOf("") }
    var rollNo by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Student to Roster") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Student Full Name") },
                    placeholder = { Text("e.g. Rahul Nayak") },
                    singleLine = true,
                    modifier = Modifier
                        .fillMaxWidth()
                        .testTag("add_student_name_input")
                )
                OutlinedTextField(
                    value = usn,
                    onValueChange = { usn = it },
                    label = { Text("VTU USN") },
                    placeholder = { Text("e.g. 2VX24CS125") },
                    singleLine = true,
                    modifier = Modifier
                        .fillMaxWidth()
                        .testTag("add_student_usn_input")
                )
                OutlinedTextField(
                    value = rollNo,
                    onValueChange = { rollNo = it },
                    label = { Text("Roll Number (Optional)") },
                    placeholder = { Text("e.g. 45") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    if (name.isNotBlank() && usn.isNotBlank()) {
                        onAdd(name, usn, rollNo)
                    }
                },
                enabled = name.isNotBlank() && usn.isNotBlank(),
                modifier = Modifier.testTag("confirm_add_student_button")
            ) {
                Text("Add Student")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}
