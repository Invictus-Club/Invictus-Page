package com.example.ui.screens

import android.content.Intent
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AccessTime
import androidx.compose.material.icons.filled.CalendarToday
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.EditNote
import androidx.compose.material.icons.filled.PictureAsPdf
import androidx.compose.material.icons.filled.Save
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
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
fun SessionSummaryScreen(
    classId: Long,
    viewModel: MainViewModel
) {
    val context = LocalContext.current
    val facultyProfile by viewModel.facultyProfile.collectAsState()
    val allClasses by viewModel.allClasses.collectAsState()
    val classEntity = allClasses.find { it.id == classId }

    val students by viewModel.attendanceStudents.collectAsState()
    val attendanceMap by viewModel.attendanceMap.collectAsState()

    val dateStr by viewModel.sessionDateStr.collectAsState()
    val startTime by viewModel.sessionStartTime.collectAsState()
    val endTime by viewModel.sessionEndTime.collectAsState()
    val module by viewModel.sessionModule.collectAsState()
    val topics by viewModel.sessionTopics.collectAsState()
    val notes by viewModel.sessionNotes.collectAsState()
    val bulletPoints by viewModel.sessionBulletPoints.collectAsState()
    val checkpoints by viewModel.sessionCheckpoints.collectAsState()

    val total = students.size
    val presentCount = attendanceMap.values.count { it }
    val absentCount = total - presentCount
    val presentPercentage = if (total > 0) (presentCount.toFloat() / total * 100f) else 0f

    val absentees = students.filter { !(attendanceMap[it.id] ?: false) }
    val presentStudents = students.filter { attendanceMap[it.id] ?: false }

    var selectedTab by remember { mutableStateOf(0) } // 0 = Absentees, 1 = Present
    val scrollState = rememberScrollState()

    BackHandler {
        viewModel.navigateTo(Screen.ClassDetail(classId))
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
    ) {
        // --- Top Bar ---
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            IconButton(
                onClick = { viewModel.navigateTo(Screen.ClassDetail(classId)) },
                modifier = Modifier.testTag("summary_back_button")
            ) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "Back",
                    tint = MaterialTheme.colorScheme.onBackground
                )
            }

            Text(
                text = "Session Summary",
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                color = MaterialTheme.colorScheme.onBackground
            )

            Spacer(modifier = Modifier.size(48.dp))
        }

        Column(
            modifier = Modifier
                .weight(1f)
                .verticalScroll(scrollState)
                .padding(horizontal = 20.dp, vertical = 8.dp),
            verticalArrangement = Arrangement.spacedBy(18.dp)
        ) {
            // Stats Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text(
                                text = classEntity?.code ?: "COURSE",
                                style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold),
                                color = MaterialTheme.colorScheme.primary
                            )
                            Text(
                                text = classEntity?.name ?: "Lecture Attendance",
                                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }

                        Surface(
                            color = MaterialTheme.colorScheme.surface,
                            shape = RoundedCornerShape(12.dp),
                            border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
                        ) {
                            Text(
                                text = String.format(Locale.US, "%.1f%%", presentPercentage),
                                style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Black),
                                color = if (presentPercentage >= 75f) PresentGreen else AbsentRed,
                                modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(18.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        StatPill(
                            label = "Total Strength",
                            value = "$total",
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        StatPill(
                            label = "Present",
                            value = "$presentCount",
                            color = PresentGreen
                        )
                        StatPill(
                            label = "Absent",
                            value = "$absentCount",
                            color = AbsentRed
                        )
                    }
                }
            }

            // Topic Checkpoints (After-Class Verification)
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Column(
                    modifier = Modifier.padding(18.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            modifier = Modifier.weight(1f)
                        ) {
                            Icon(
                                imageVector = Icons.Default.CheckCircle,
                                contentDescription = null,
                                tint = PresentGreen
                            )
                            Column {
                                Text(
                                    text = "After-Class Topic Checkpoints",
                                    style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold),
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                Text(
                                    text = "Check off topics that were covered today",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f)
                                )
                            }
                        }

                        if (bulletPoints.isNotEmpty()) {
                            val coveredCount = bulletPoints.count { checkpoints[it] == true }
                            Surface(
                                color = if (coveredCount == bulletPoints.size) PresentGreen.copy(alpha = 0.15f) else WarningAmber.copy(alpha = 0.15f),
                                shape = RoundedCornerShape(8.dp)
                            ) {
                                Text(
                                    text = "$coveredCount / ${bulletPoints.size} Covered",
                                    style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                    color = if (coveredCount == bulletPoints.size) PresentGreen else WarningAmber,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                )
                            }
                        }
                    }

                    if (bulletPoints.isNotEmpty()) {
                        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            bulletPoints.forEach { point ->
                                val isCovered = checkpoints[point] == true
                                Surface(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .clip(RoundedCornerShape(10.dp))
                                        .clickable { viewModel.toggleSessionCheckpoint(point) },
                                    color = MaterialTheme.colorScheme.surface,
                                    border = androidx.compose.foundation.BorderStroke(
                                        1.dp,
                                        if (isCovered) PresentGreen.copy(alpha = 0.5f) else MaterialTheme.colorScheme.outline.copy(alpha = 0.2f)
                                    )
                                ) {
                                    Row(
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .padding(horizontal = 10.dp, vertical = 8.dp),
                                        verticalAlignment = Alignment.CenterVertically,
                                        horizontalArrangement = Arrangement.SpaceBetween
                                    ) {
                                        Row(
                                            verticalAlignment = Alignment.CenterVertically,
                                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                                            modifier = Modifier.weight(1f)
                                        ) {
                                            Checkbox(
                                                checked = isCovered,
                                                onCheckedChange = { viewModel.toggleSessionCheckpoint(point) },
                                                colors = CheckboxDefaults.colors(
                                                    checkedColor = PresentGreen,
                                                    checkmarkColor = Color.White
                                                )
                                            )
                                            Text(
                                                text = point,
                                                style = MaterialTheme.typography.bodyMedium.copy(
                                                    fontWeight = if (isCovered) FontWeight.SemiBold else FontWeight.Normal
                                                ),
                                                color = MaterialTheme.colorScheme.onSurface
                                            )
                                        }

                                        Surface(
                                            color = if (isCovered) PresentGreen.copy(alpha = 0.15f) else WarningAmber.copy(alpha = 0.15f),
                                            shape = RoundedCornerShape(6.dp)
                                        ) {
                                            Text(
                                                text = if (isCovered) "Covered" else "Pending / Next Class",
                                                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                                color = if (isCovered) PresentGreen else WarningAmber,
                                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                                            )
                                        }
                                    }
                                }
                            }
                        }

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            OutlinedButton(
                                onClick = { viewModel.markAllCheckpoints(true) },
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(8.dp)
                            ) {
                                Icon(Icons.Default.Check, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("Mark All Covered", fontSize = 12.sp)
                            }

                            OutlinedButton(
                                onClick = { viewModel.markAllCheckpoints(false) },
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(8.dp)
                            ) {
                                Icon(Icons.Default.Close, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("Reset Checks", fontSize = 12.sp)
                            }
                        }
                    } else {
                        Text(
                            text = "No planned bullet points were defined before class. Add any topics covered in this lecture below:",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.8f)
                        )
                    }

                    // Quick topic adder
                    var newTopicInput by remember { mutableStateOf("") }
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        OutlinedTextField(
                            value = newTopicInput,
                            onValueChange = { newTopicInput = it },
                            placeholder = { Text("Add topic covered...") },
                            modifier = Modifier.weight(1f),
                            singleLine = true,
                            shape = RoundedCornerShape(8.dp)
                        )
                        Button(
                            onClick = {
                                if (newTopicInput.isNotBlank()) {
                                    viewModel.addSessionBulletPoint(newTopicInput.trim())
                                    newTopicInput = ""
                                }
                            },
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text("Add")
                        }
                    }
                }
            }

            // Lecture Notes & Teaching Log Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Column(
                    modifier = Modifier.padding(18.dp),
                    verticalArrangement = Arrangement.spacedBy(14.dp)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.EditNote,
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary
                        )
                        Text(
                            text = "Lecture Notes & Syllabus Log",
                            style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        OutlinedTextField(
                            value = dateStr,
                            onValueChange = { viewModel.sessionDateStr.value = it },
                            label = { Text("Date") },
                            leadingIcon = { Icon(Icons.Default.CalendarToday, contentDescription = null, modifier = Modifier.size(16.dp)) },
                            modifier = Modifier.weight(1f),
                            singleLine = true,
                            shape = RoundedCornerShape(10.dp)
                        )
                        OutlinedTextField(
                            value = "$startTime - $endTime",
                            onValueChange = {},
                            readOnly = true,
                            label = { Text("Time") },
                            leadingIcon = { Icon(Icons.Default.AccessTime, contentDescription = null, modifier = Modifier.size(16.dp)) },
                            modifier = Modifier.weight(1f),
                            singleLine = true,
                            shape = RoundedCornerShape(10.dp)
                        )
                    }

                    OutlinedTextField(
                        value = module,
                        onValueChange = { viewModel.sessionModule.value = it },
                        label = { Text("Module / Unit") },
                        placeholder = { Text("e.g. Module 3") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true,
                        shape = RoundedCornerShape(10.dp)
                    )

                    OutlinedTextField(
                        value = topics,
                        onValueChange = { viewModel.sessionTopics.value = it },
                        label = { Text("Topics Covered (Syllabus Log)") },
                        placeholder = { Text("e.g. Agile Scrum, Sprint Burndown & User Stories") },
                        modifier = Modifier.fillMaxWidth()
                            .testTag("topics_input"),
                        shape = RoundedCornerShape(10.dp),
                        minLines = 2
                    )

                    OutlinedTextField(
                        value = notes,
                        onValueChange = { viewModel.sessionNotes.value = it },
                        label = { Text("Lecture Remarks / Homework Notes") },
                        placeholder = { Text("e.g. Mini project problem statements assigned") },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp),
                        minLines = 2
                    )
                }
            }

            // Student Status List & Toggle (Late walk-ins)
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Attendance Roster",
                            style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )

                        // Segmented Tab for Absentees vs Present
                        Row(
                            modifier = Modifier
                                .clip(RoundedCornerShape(8.dp))
                                .background(MaterialTheme.colorScheme.surface)
                                .padding(2.dp)
                        ) {
                            Surface(
                                color = if (selectedTab == 0) AbsentRed.copy(alpha = 0.2f) else Color.Transparent,
                                shape = RoundedCornerShape(6.dp),
                                modifier = Modifier.clickable { selectedTab = 0 }
                            ) {
                                Text(
                                    text = "Absent (${absentees.size})",
                                    style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                    color = if (selectedTab == 0) AbsentRed else MaterialTheme.colorScheme.onSurfaceVariant,
                                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp)
                                )
                            }
                            Surface(
                                color = if (selectedTab == 1) PresentGreen.copy(alpha = 0.2f) else Color.Transparent,
                                shape = RoundedCornerShape(6.dp),
                                modifier = Modifier.clickable { selectedTab = 1 }
                            ) {
                                Text(
                                    text = "Present (${presentStudents.size})",
                                    style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                    color = if (selectedTab == 1) PresentGreen else MaterialTheme.colorScheme.onSurfaceVariant,
                                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp)
                                )
                            }
                        }
                    }

                    Text(
                        text = "Tip: Tap any student to toggle status (e.g. marked late)",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f),
                        modifier = Modifier.padding(top = 4.dp, bottom = 12.dp)
                    )

                    val listToShow = if (selectedTab == 0) absentees else presentStudents
                    if (listToShow.isEmpty()) {
                        Text(
                            text = if (selectedTab == 0) "No absentees! 100% Attendance recorded."
                            else "No present students recorded.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            modifier = Modifier.padding(vertical = 12.dp)
                        )
                    } else {
                        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            listToShow.forEach { student ->
                                val isPresent = attendanceMap[student.id] ?: false
                                Row(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .clip(RoundedCornerShape(10.dp))
                                        .background(MaterialTheme.colorScheme.surface)
                                        .clickable { viewModel.toggleStudentAttendanceInSummary(student.id) }
                                        .padding(horizontal = 12.dp, vertical = 10.dp),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Column {
                                        Text(
                                            text = student.usn,
                                            style = MaterialTheme.typography.labelMedium.copy(
                                                fontFamily = FontFamily.Monospace,
                                                fontWeight = FontWeight.Bold
                                            ),
                                            color = MaterialTheme.colorScheme.onSurface
                                        )
                                        Text(
                                            text = student.name,
                                            style = MaterialTheme.typography.bodySmall,
                                            color = MaterialTheme.colorScheme.onSurfaceVariant
                                        )
                                    }

                                    Surface(
                                        color = if (isPresent) PresentGreen.copy(alpha = 0.15f) else AbsentRed.copy(alpha = 0.15f),
                                        shape = RoundedCornerShape(8.dp)
                                    ) {
                                        Row(
                                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                            verticalAlignment = Alignment.CenterVertically
                                        ) {
                                            Icon(
                                                imageVector = if (isPresent) Icons.Default.Check else Icons.Default.Close,
                                                contentDescription = null,
                                                tint = if (isPresent) PresentGreen else AbsentRed,
                                                modifier = Modifier.size(14.dp)
                                            )
                                            Spacer(modifier = Modifier.width(4.dp))
                                            Text(
                                                text = if (isPresent) "Present" else "Absent",
                                                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                                color = if (isPresent) PresentGreen else AbsentRed
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(10.dp))
        }

        // Bottom Action Controls
        Surface(
            color = MaterialTheme.colorScheme.surface,
            tonalElevation = 6.dp,
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                // Share PDF Report Button
                OutlinedButton(
                    onClick = {
                        if (classEntity != null) {
                            try {
                                val pdfFile = PdfReportExporter.generateSessionAttendancePdf(
                                    context = context,
                                    classEntity = classEntity,
                                    facultyProfile = facultyProfile,
                                    sessionDate = dateStr,
                                    sessionTime = "$startTime - $endTime",
                                    topicsCovered = topics,
                                    module = module,
                                    students = students,
                                    attendanceMap = attendanceMap
                                )
                                val shareIntent = PdfReportExporter.getSharePdfIntent(
                                    context = context,
                                    pdfFile = pdfFile,
                                    title = "Lecture Attendance - ${classEntity.code} ($dateStr)"
                                )
                                context.startActivity(Intent.createChooser(shareIntent, "Share Lecture Attendance PDF"))
                            } catch (e: Exception) {
                                Toast.makeText(context, "Error generating PDF: ${e.localizedMessage}", Toast.LENGTH_SHORT).show()
                            }
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp)
                        .testTag("share_session_pdf_button"),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Icon(imageVector = Icons.Default.PictureAsPdf, contentDescription = null, tint = AbsentRed)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Share Lecture PDF Report", fontWeight = FontWeight.Bold)
                }

                // Save & Finish Button
                Button(
                    onClick = {
                        viewModel.saveCompletedSession {
                            // Saved
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(52.dp)
                        .testTag("save_session_button"),
                    shape = RoundedCornerShape(14.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = PresentGreen
                    )
                ) {
                    Icon(imageVector = Icons.Default.Save, contentDescription = null, tint = Color.White)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Save Session & Lecture Notes",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = Color.White
                    )
                }
            }
        }
    }
}

@Composable
private fun StatPill(label: String, value: String, color: Color) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
            text = value,
            style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Black),
            color = color
        )
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
