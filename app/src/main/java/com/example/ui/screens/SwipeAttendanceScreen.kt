package com.example.ui.screens

import androidx.activity.compose.BackHandler
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectHorizontalDragGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.DoneAll
import androidx.compose.material.icons.filled.EditNote
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Undo
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.ClassEntity
import com.example.data.model.StudentEntity
import com.example.ui.MainViewModel
import com.example.ui.Screen
import com.example.ui.theme.AbsentRed
import com.example.ui.theme.AbsentRedLightBg
import com.example.ui.theme.PresentGreen
import com.example.ui.theme.PresentGreenLightBg
import com.example.ui.theme.VtuBlueDark
import com.example.ui.theme.WarningAmber
import kotlinx.coroutines.launch
import kotlin.math.abs
import kotlin.math.roundToInt

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SwipeAttendanceScreen(
    classId: Long,
    viewModel: MainViewModel
) {
    val allClasses by viewModel.allClasses.collectAsState()
    val classEntity = allClasses.find { it.id == classId }

    val students by viewModel.attendanceStudents.collectAsState()
    val currentIndex by viewModel.currentStudentIndex.collectAsState()
    val attendanceMap by viewModel.attendanceMap.collectAsState()
    val swipeHistory by viewModel.swipeHistory.collectAsState()
    val bulletPoints by viewModel.sessionBulletPoints.collectAsState()

    var showExitDialog by remember { mutableStateOf(false) }
    var showMarkAllDialog by remember { mutableStateOf(false) }
    var showTopicsDialog by remember { mutableStateOf(false) }

    val scope = rememberCoroutineScope()
    val density = LocalDensity.current

    val totalCount = students.size
    val presentCount = attendanceMap.values.count { it }
    val absentCount = attendanceMap.values.count { !it }
    val progress = if (totalCount > 0) currentIndex.toFloat() / totalCount else 0f

    BackHandler {
        if (currentIndex > 0) {
            showExitDialog = true
        } else {
            viewModel.navigateBack()
        }
    }

    if (showExitDialog) {
        AlertDialog(
            onDismissRequest = { showExitDialog = false },
            title = { Text("Exit Attendance?") },
            text = { Text("Attendance in progress will not be saved. Are you sure you want to exit?") },
            confirmButton = {
                TextButton(
                    onClick = {
                        showExitDialog = false
                        viewModel.navigateBack()
                    }
                ) {
                    Text("Exit", color = AbsentRed)
                }
            },
            dismissButton = {
                TextButton(onClick = { showExitDialog = false }) {
                    Text("Stay")
                }
            }
        )
    }

    if (showMarkAllDialog) {
        AlertDialog(
            onDismissRequest = { showMarkAllDialog = false },
            title = { Text("Mark Remaining as Present?") },
            text = { Text("This will mark all remaining ${totalCount - currentIndex} students as Present.") },
            confirmButton = {
                TextButton(
                    onClick = {
                        showMarkAllDialog = false
                        viewModel.markRemainingAsPresent()
                    }
                ) {
                    Text("Confirm", color = PresentGreen)
                }
            },
            dismissButton = {
                TextButton(onClick = { showMarkAllDialog = false }) {
                    Text("Cancel")
                }
            }
        )
    }

    if (showTopicsDialog) {
        var newBulletText by remember { mutableStateOf("") }
        AlertDialog(
            onDismissRequest = { showTopicsDialog = false },
            title = { Text("Bullet Points Before Class (Planned Topics)") },
            text = {
                Column(
                    modifier = Modifier.fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Text(
                        text = "Outline the topics and bullet points to be covered in this lecture. After class, you can check off whether these topics were covered.",
                        style = MaterialTheme.typography.bodySmall
                    )

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        OutlinedTextField(
                            value = newBulletText,
                            onValueChange = { newBulletText = it },
                            placeholder = { Text("e.g. Scrum Sprints & Agile") },
                            modifier = Modifier.weight(1f),
                            singleLine = true,
                            shape = RoundedCornerShape(8.dp)
                        )
                        IconButton(
                            onClick = {
                                if (newBulletText.isNotBlank()) {
                                    viewModel.addSessionBulletPoint(newBulletText)
                                    newBulletText = ""
                                }
                            }
                        ) {
                            Icon(Icons.Default.Add, contentDescription = "Add Topic", tint = MaterialTheme.colorScheme.primary)
                        }
                    }

                    if (bulletPoints.isNotEmpty()) {
                        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                            bulletPoints.forEach { pt ->
                                Row(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(6.dp))
                                        .padding(horizontal = 10.dp, vertical = 6.dp),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(
                                        text = "• $pt",
                                        style = MaterialTheme.typography.bodySmall,
                                        modifier = Modifier.weight(1f)
                                    )
                                    IconButton(
                                        onClick = { viewModel.removeSessionBulletPoint(pt) },
                                        modifier = Modifier.size(24.dp)
                                    ) {
                                        Icon(Icons.Default.Delete, contentDescription = "Remove", tint = AbsentRed, modifier = Modifier.size(16.dp))
                                    }
                                }
                            }
                        }
                    } else {
                        Text(
                            text = "No topics added yet for this class. Add your lecture bullet points above.",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.outline
                        )
                    }
                }
            },
            confirmButton = {
                Button(onClick = { showTopicsDialog = false }) {
                    Text("Done")
                }
            }
        )
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
                onClick = {
                    if (currentIndex > 0) showExitDialog = true else viewModel.navigateBack()
                },
                modifier = Modifier.testTag("swipe_back_button")
            ) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "Back",
                    tint = MaterialTheme.colorScheme.onBackground
                )
            }

            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    text = classEntity?.code ?: "ATTENDANCE",
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                    color = MaterialTheme.colorScheme.onBackground
                )
                Text(
                    text = "${classEntity?.semester ?: ""} ${classEntity?.section ?: ""}".trim(),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            Row(verticalAlignment = Alignment.CenterVertically) {
                // Pre-class bullet points dialog trigger
                IconButton(
                    onClick = { showTopicsDialog = true },
                    modifier = Modifier.testTag("topics_dialog_button")
                ) {
                    Icon(
                        imageVector = Icons.Default.EditNote,
                        contentDescription = "Pre-Class Topics",
                        tint = MaterialTheme.colorScheme.primary
                    )
                }

                // Quick Mark Rest Present button
                IconButton(
                    onClick = { showMarkAllDialog = true },
                    enabled = currentIndex < totalCount,
                    modifier = Modifier.testTag("mark_rest_present_button")
                ) {
                    Icon(
                        imageVector = Icons.Default.DoneAll,
                        contentDescription = "Mark Rest Present",
                        tint = if (currentIndex < totalCount) PresentGreen else MaterialTheme.colorScheme.outline
                    )
                }
            }
        }

        // --- Live Stats & Progress ---
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 4.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Student ${if (totalCount > 0) (currentIndex + 1).coerceAtMost(totalCount) else 0} of $totalCount",
                    style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold),
                    color = MaterialTheme.colorScheme.onBackground
                )

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    // Present Count Chip
                    Surface(
                        color = PresentGreen.copy(alpha = 0.15f),
                        shape = RoundedCornerShape(8.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, PresentGreen.copy(alpha = 0.3f))
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(6.dp)
                                    .clip(CircleShape)
                                    .background(PresentGreen)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = "$presentCount Present",
                                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                color = PresentGreen
                            )
                        }
                    }

                    // Absent Count Chip
                    Surface(
                        color = AbsentRed.copy(alpha = 0.15f),
                        shape = RoundedCornerShape(8.dp),
                        border = androidx.compose.foundation.BorderStroke(1.dp, AbsentRed.copy(alpha = 0.3f))
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(6.dp)
                                    .clip(CircleShape)
                                    .background(AbsentRed)
                            )
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = "$absentCount Absent",
                                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                color = AbsentRed
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            LinearProgressIndicator(
                progress = { progress },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(6.dp)
                    .clip(RoundedCornerShape(3.dp)),
                color = MaterialTheme.colorScheme.primary,
                trackColor = MaterialTheme.colorScheme.surfaceVariant
            )

            Spacer(modifier = Modifier.height(8.dp))

            // Pre-Class Planned Topics Banner
            Surface(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(10.dp))
                    .clickable { showTopicsDialog = true }
                    .testTag("pre_class_topics_banner"),
                color = MaterialTheme.colorScheme.surfaceVariant,
                border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 12.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        modifier = Modifier.weight(1f)
                    ) {
                        Icon(
                            imageVector = Icons.Default.EditNote,
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary,
                            modifier = Modifier.size(18.dp)
                        )
                        Column {
                            Text(
                                text = "Before-Class Bullet Points (${bulletPoints.size} planned)",
                                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                color = MaterialTheme.colorScheme.primary
                            )
                            Text(
                                text = if (bulletPoints.isNotEmpty()) {
                                    bulletPoints.joinToString(" • ")
                                } else {
                                    "Tap to set topics to cover in this class"
                                },
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                maxLines = 1
                            )
                        }
                    }

                    Surface(
                        color = MaterialTheme.colorScheme.primary.copy(alpha = 0.15f),
                        shape = RoundedCornerShape(6.dp)
                    ) {
                        Text(
                            text = if (bulletPoints.isEmpty()) "+ Add" else "Edit",
                            style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.primary,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // --- Card Deck Area ---
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .padding(horizontal = 24.dp),
            contentAlignment = Alignment.Center
        ) {
            if (students.isEmpty()) {
                Text(
                    text = "No students enrolled in this class.\nPlease add students or import via CSV.",
                    style = MaterialTheme.typography.bodyLarge,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    textAlign = TextAlign.Center
                )
            } else if (currentIndex >= totalCount) {
                // All swiped -> Auto transitioning or completed
                Text(
                    text = "All students recorded!\nLoading session summary...",
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.primary,
                    textAlign = TextAlign.Center
                )
            } else {
                // Peek Card (Next student if available)
                if (currentIndex + 1 < totalCount) {
                    val nextStudent = students[currentIndex + 1]
                    StudentSwipeCard(
                        student = nextStudent,
                        isTopCard = false,
                        modifier = Modifier
                            .scale(0.92f)
                            .offset(y = 18.dp)
                    )
                }

                // Active Top Card with drag gestures
                val currentStudent = students[currentIndex]
                key(currentStudent.id) {
                    ActiveSwipeableCard(
                        student = currentStudent,
                        onSwipeRight = { viewModel.markCurrentStudent(isPresent = true) },
                        onSwipeLeft = { viewModel.markCurrentStudent(isPresent = false) }
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // --- Bottom Controls ---
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp, vertical = 20.dp),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Absent Button (Left Swipe)
            IconButton(
                onClick = { viewModel.markCurrentStudent(isPresent = false) },
                enabled = currentIndex < totalCount,
                modifier = Modifier
                    .size(68.dp)
                    .clip(CircleShape)
                    .background(AbsentRed)
                    .testTag("swipe_absent_button")
            ) {
                Icon(
                    imageVector = Icons.Default.Close,
                    contentDescription = "Mark Absent",
                    tint = Color.White,
                    modifier = Modifier.size(36.dp)
                )
            }

            // Undo Button
            IconButton(
                onClick = { viewModel.undoLastSwipe() },
                enabled = swipeHistory.isNotEmpty(),
                modifier = Modifier
                    .size(48.dp)
                    .clip(CircleShape)
                    .background(
                        if (swipeHistory.isNotEmpty()) MaterialTheme.colorScheme.surfaceVariant
                        else MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.4f)
                    )
                    .testTag("swipe_undo_button")
            ) {
                Icon(
                    imageVector = Icons.Default.Undo,
                    contentDescription = "Undo",
                    tint = if (swipeHistory.isNotEmpty()) MaterialTheme.colorScheme.onSurfaceVariant
                    else MaterialTheme.colorScheme.outline
                )
            }

            // Present Button (Right Swipe)
            IconButton(
                onClick = { viewModel.markCurrentStudent(isPresent = true) },
                enabled = currentIndex < totalCount,
                modifier = Modifier
                    .size(68.dp)
                    .clip(CircleShape)
                    .background(PresentGreen)
                    .testTag("swipe_present_button")
            ) {
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = "Mark Present",
                    tint = Color.White,
                    modifier = Modifier.size(36.dp)
                )
            }
        }

        // Swipe Instructions Banner
        Text(
            text = "👈 Swipe Left: Absent  •  Swipe Right: Present 👉",
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f),
            textAlign = TextAlign.Center,
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp)
        )
    }
}

@Composable
fun ActiveSwipeableCard(
    student: StudentEntity,
    onSwipeRight: () -> Unit,
    onSwipeLeft: () -> Unit
) {
    val coroutineScope = rememberCoroutineScope()
    val offsetX = remember { Animatable(0f) }
    val swipeThreshold = 300f

    val rotation = (offsetX.value / 35f).coerceIn(-25f, 25f)
    val overlayAlpha = (abs(offsetX.value) / swipeThreshold).coerceIn(0f, 0.85f)
    val isSwipingRight = offsetX.value > 0

    Box(
        modifier = Modifier
            .offset { IntOffset(offsetX.value.roundToInt(), 0) }
            .rotate(rotation)
            .pointerInput(student.id) {
                detectHorizontalDragGestures(
                    onDragEnd = {
                        coroutineScope.launch {
                            if (offsetX.value > swipeThreshold) {
                                // Animate complete swipe off right
                                offsetX.animateTo(
                                    targetValue = 1200f,
                                    animationSpec = tween(durationMillis = 180, easing = FastOutSlowInEasing)
                                )
                                onSwipeRight()
                            } else if (offsetX.value < -swipeThreshold) {
                                // Animate complete swipe off left
                                offsetX.animateTo(
                                    targetValue = -1200f,
                                    animationSpec = tween(durationMillis = 180, easing = FastOutSlowInEasing)
                                )
                                onSwipeLeft()
                            } else {
                                // Spring back to center
                                offsetX.animateTo(
                                    targetValue = 0f,
                                    animationSpec = spring(dampingRatio = 0.75f, stiffness = 400f)
                                )
                            }
                        }
                    },
                    onHorizontalDrag = { _, dragAmount ->
                        coroutineScope.launch {
                            offsetX.snapTo(offsetX.value + dragAmount)
                        }
                    }
                )
            }
    ) {
        StudentSwipeCard(
            student = student,
            isTopCard = true,
            modifier = Modifier.fillMaxWidth()
        )

        // Overlay Feedback Tint
        if (overlayAlpha > 0.05f) {
            Box(
                modifier = Modifier
                    .matchParentSize()
                    .clip(RoundedCornerShape(24.dp))
                    .background(
                        if (isSwipingRight) PresentGreen.copy(alpha = overlayAlpha)
                        else AbsentRed.copy(alpha = overlayAlpha)
                    ),
                contentAlignment = if (isSwipingRight) Alignment.CenterEnd else Alignment.CenterStart
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 32.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    if (isSwipingRight) {
                        Text(
                            text = "PRESENT",
                            style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Black),
                            color = Color.White
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Icon(
                            imageVector = Icons.Default.Check,
                            contentDescription = null,
                            tint = Color.White,
                            modifier = Modifier.size(36.dp)
                        )
                    } else {
                        Icon(
                            imageVector = Icons.Default.Close,
                            contentDescription = null,
                            tint = Color.White,
                            modifier = Modifier.size(36.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "ABSENT",
                            style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Black),
                            color = Color.White
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun StudentSwipeCard(
    student: StudentEntity,
    isTopCard: Boolean,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .height(380.dp),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isTopCard) MaterialTheme.colorScheme.surfaceVariant
            else MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.7f)
        ),
        elevation = CardDefaults.cardElevation(
            defaultElevation = if (isTopCard) 8.dp else 2.dp
        ),
        border = androidx.compose.foundation.BorderStroke(
            width = if (isTopCard) 1.5.dp else 1.dp,
            color = if (isTopCard) MaterialTheme.colorScheme.outline.copy(alpha = 0.5f)
            else MaterialTheme.colorScheme.outline.copy(alpha = 0.2f)
        )
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Header Row: Roll No & VTU Badge
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Surface(
                    color = MaterialTheme.colorScheme.surface,
                    shape = RoundedCornerShape(10.dp),
                    border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.3f))
                ) {
                    Text(
                        text = "ROLL #${student.rollNo.ifBlank { "01" }}",
                        style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface,
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp)
                    )
                }

                Surface(
                    color = MaterialTheme.colorScheme.primaryContainer,
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(
                        text = "VTU",
                        style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Black),
                        color = MaterialTheme.colorScheme.onPrimaryContainer,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }

            // Student Avatar Initials Circle
            Box(
                modifier = Modifier
                    .size(96.dp)
                    .clip(CircleShape)
                    .background(
                        MaterialTheme.colorScheme.primary.copy(alpha = 0.15f)
                    )
                    .border(
                        2.dp,
                        MaterialTheme.colorScheme.primary.copy(alpha = 0.4f),
                        CircleShape
                    ),
                contentAlignment = Alignment.Center
            ) {
                val initials = student.name.split(" ")
                    .filter { it.isNotEmpty() }
                    .take(2)
                    .map { it.first() }
                    .joinToString("")
                Text(
                    text = initials.ifBlank { "ST" },
                    style = MaterialTheme.typography.headlineMedium.copy(
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.primary
                    )
                )
            }

            // Center: Large prominent USN & Name
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    text = student.usn,
                    style = MaterialTheme.typography.headlineMedium.copy(
                        fontWeight = FontWeight.Black,
                        fontFamily = FontFamily.Monospace,
                        letterSpacing = 2.sp
                    ),
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.height(8.dp))

                Text(
                    text = student.name,
                    style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold),
                    color = MaterialTheme.colorScheme.onSurface,
                    textAlign = TextAlign.Center
                )
            }

            // Bottom Card Footer: Status Indicator
            Surface(
                color = MaterialTheme.colorScheme.surface,
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 14.dp, vertical = 8.dp),
                    horizontalArrangement = Arrangement.Center,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Swipe Right to Mark Present",
                        style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Medium),
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}

@Composable
private fun key(key: Any?, content: @Composable () -> Unit) {
    androidx.compose.runtime.key(key) {
        content()
    }
}
