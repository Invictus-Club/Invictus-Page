package com.example.ui.screens

import androidx.activity.compose.BackHandler
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectTapGestures
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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Assessment
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.ShowChart
import androidx.compose.material.icons.filled.TrendingDown
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.ClassEntity
import com.example.data.model.LectureSessionEntity
import com.example.ui.MainViewModel
import com.example.ui.Screen
import com.example.ui.theme.AbsentRed
import com.example.ui.theme.PresentGreen
import com.example.ui.theme.VtuBlueDark
import com.example.ui.theme.VtuCyanDark
import com.example.ui.theme.WarningAmber
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AnalyticsTrendsDashboardScreen(viewModel: MainViewModel) {
    val allClasses by viewModel.allClasses.collectAsState()
    val allSessions by viewModel.allSessions.collectAsState()

    var selectedClassId by remember { mutableStateOf<Long?>(null) }
    var selectedPointIndex by remember { mutableStateOf<Int?>(null) }

    BackHandler {
        viewModel.navigateTo(Screen.Dashboard)
    }

    val relevantSessions = remember(allSessions, selectedClassId) {
        val filtered = if (selectedClassId != null) {
            allSessions.filter { it.classId == selectedClassId }
        } else {
            allSessions
        }
        filtered.sortedBy { it.sessionDate }
    }

    val activeClass = remember(allClasses, selectedClassId) {
        allClasses.find { it.id == selectedClassId }
    }
    val minThreshold = activeClass?.minAttendancePercentage ?: 75f

    // Compute key metrics
    val totalSessions = relevantSessions.size
    val totalStudents = relevantSessions.sumOf { it.totalStudents }
    val totalPresent = relevantSessions.sumOf { it.presentCount }
    val avgAttendance = if (totalStudents > 0) (totalPresent.toFloat() / totalStudents * 100f) else 0f

    val engagementScore = (avgAttendance * 1.1f).coerceIn(0f, 100f).toInt()

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
                    modifier = Modifier.testTag("analytics_back_button")
                ) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = "Back",
                        tint = MaterialTheme.colorScheme.onBackground
                    )
                }

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.ShowChart,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary
                    )
                    Text(
                        text = "Attendance Trends & Analytics",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onBackground
                    )
                }

                Spacer(modifier = Modifier.size(48.dp))
            }
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(MaterialTheme.colorScheme.background)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Class Filter Chips
            item {
                LazyRow(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    item {
                        FilterChip(
                            selected = selectedClassId == null,
                            onClick = {
                                selectedClassId = null
                                selectedPointIndex = null
                            },
                            label = { Text("All Classes Combined") }
                        )
                    }
                    items(allClasses) { cls ->
                        FilterChip(
                            selected = selectedClassId == cls.id,
                            onClick = {
                                selectedClassId = cls.id
                                selectedPointIndex = null
                            },
                            label = { Text("${cls.code} (${cls.section})") }
                        )
                    }
                }
            }

            // Summary Metrics Grid
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    MetricKpiCard(
                        title = "Batch Avg",
                        value = String.format(Locale.US, "%.1f%%", avgAttendance),
                        subtitle = if (avgAttendance >= 75f) "Eligible Range" else "Shortage Alert",
                        isPositive = avgAttendance >= 75f,
                        modifier = Modifier.weight(1f)
                    )
                    MetricKpiCard(
                        title = "Engagement",
                        value = "$engagementScore / 100",
                        subtitle = if (engagementScore >= 80) "High Class Focus" else "Needs Improvement",
                        isPositive = engagementScore >= 75,
                        modifier = Modifier.weight(1f)
                    )
                    MetricKpiCard(
                        title = "Lectures",
                        value = "$totalSessions",
                        subtitle = "Conducted",
                        isPositive = true,
                        modifier = Modifier.weight(0.9f)
                    )
                }
            }

            // Interactive Trend Area Chart (Recharts-style)
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(18.dp),
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
                                    text = "Attendance Trend Over Time",
                                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                Text(
                                    text = "Session-by-session presence vs 75% VTU mandate",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f)
                                )
                            }

                            Surface(
                                color = AbsentRed.copy(alpha = 0.15f),
                                shape = RoundedCornerShape(6.dp)
                            ) {
                                Text(
                                    text = "${minThreshold.toInt()}% Target",
                                    style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                                    color = AbsentRed,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(16.dp))

                        if (relevantSessions.size < 2) {
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(180.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = if (relevantSessions.isEmpty()) "No lecture sessions logged yet."
                                    else "Log at least 2 sessions to visualize dynamic trend curves.",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.8f),
                                    textAlign = TextAlign.Center
                                )
                            }
                        } else {
                            RechartsStyleTrendAreaChart(
                                sessions = relevantSessions,
                                selectedIndex = selectedPointIndex,
                                targetThreshold = minThreshold,
                                onPointSelected = { selectedPointIndex = it }
                            )

                            // Tooltip info if point selected
                            if (selectedPointIndex != null && selectedPointIndex!! in relevantSessions.indices) {
                                val s = relevantSessions[selectedPointIndex!!]
                                val sPct = if (s.totalStudents > 0) (s.presentCount.toFloat() / s.totalStudents * 100f) else 0f
                                Spacer(modifier = Modifier.height(10.dp))
                                Surface(
                                    color = MaterialTheme.colorScheme.surface,
                                    shape = RoundedCornerShape(10.dp),
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Row(
                                        modifier = Modifier.padding(12.dp),
                                        horizontalArrangement = Arrangement.SpaceBetween,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Column {
                                            Text(
                                                text = "${s.formattedDate} • ${s.module.ifBlank { "Session" }}",
                                                style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold),
                                                color = MaterialTheme.colorScheme.primary
                                            )
                                            Text(
                                                text = s.topicsCovered.ifBlank { "Regular Lecture" },
                                                style = MaterialTheme.typography.bodySmall,
                                                color = MaterialTheme.colorScheme.onSurface
                                            )
                                        }

                                        Text(
                                            text = String.format(Locale.US, "%.1f%%", sPct),
                                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Black),
                                            color = if (sPct >= minThreshold) PresentGreen else AbsentRed
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Engagement Distribution Bar Chart (Recharts-style)
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(18.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = "Attendance Tier Distribution",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Text(
                            text = "Student breakdown by VTU eligibility tiers",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f)
                        )

                        Spacer(modifier = Modifier.height(16.dp))

                        DistributionBars(sessions = relevantSessions)
                    }
                }
            }

            // Key Engagement Insights Card
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(18.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Icon(Icons.Default.Info, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                            Text(
                                text = "Classroom Engagement Highlights",
                                style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold),
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }

                        if (relevantSessions.isNotEmpty()) {
                            val peakSession = relevantSessions.maxByOrNull {
                                if (it.totalStudents > 0) it.presentCount.toFloat() / it.totalStudents else 0f
                            }
                            val peakPct = if (peakSession != null && peakSession.totalStudents > 0) {
                                peakSession.presentCount.toFloat() / peakSession.totalStudents * 100f
                            } else 0f

                            val lowestSession = relevantSessions.minByOrNull {
                                if (it.totalStudents > 0) it.presentCount.toFloat() / it.totalStudents else 0f
                            }
                            val lowestPct = if (lowestSession != null && lowestSession.totalStudents > 0) {
                                lowestSession.presentCount.toFloat() / lowestSession.totalStudents * 100f
                            } else 0f

                            InsightRow(
                                title = "Peak Attendance Session",
                                desc = "${peakSession?.formattedDate}: ${String.format(Locale.US, "%.0f%%", peakPct)} attendance (${peakSession?.topicsCovered?.take(20) ?: ""})",
                                isPositive = true
                            )
                            InsightRow(
                                title = "Lowest Attendance Session",
                                desc = "${lowestSession?.formattedDate}: ${String.format(Locale.US, "%.0f%%", lowestPct)} attendance",
                                isPositive = lowestPct >= 75f
                            )
                        } else {
                            Text(
                                text = "Log lecture sessions to generate classroom engagement insights.",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
            }

            item {
                Spacer(modifier = Modifier.height(24.dp))
            }
        }
    }
}

@Composable
fun MetricKpiCard(
    title: String,
    value: String,
    subtitle: String,
    isPositive: Boolean,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(
                text = title,
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = value,
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Black),
                color = if (isPositive) MaterialTheme.colorScheme.primary else AbsentRed
            )
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = subtitle,
                style = MaterialTheme.typography.labelSmall.copy(fontSize = 10.sp),
                color = if (isPositive) PresentGreen else AbsentRed,
                maxLines = 1
            )
        }
    }
}

@Composable
fun RechartsStyleTrendAreaChart(
    sessions: List<LectureSessionEntity>,
    selectedIndex: Int?,
    targetThreshold: Float = 75f,
    onPointSelected: (Int) -> Unit
) {
    val percentages = sessions.map { s ->
        if (s.totalStudents > 0) (s.presentCount.toFloat() / s.totalStudents * 100f) else 100f
    }

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(180.dp)
            .pointerInput(sessions) {
                detectTapGestures { offset ->
                    val step = size.width / (sessions.size - 1).coerceAtLeast(1)
                    val clickedIndex = ((offset.x + step / 2) / step).toInt().coerceIn(0, sessions.size - 1)
                    onPointSelected(clickedIndex)
                }
            }
    ) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            val w = size.width
            val h = size.height
            val paddingBottom = 24f
            val paddingTop = 12f
            val chartH = h - paddingBottom - paddingTop

            val maxVal = 100f
            val minVal = 0f
            val vtuThresholdY = paddingTop + chartH * (1f - (targetThreshold - minVal) / (maxVal - minVal))

            // Draw 75% dashed reference line (VTU threshold)
            val dashPath = Path().apply {
                moveTo(0f, vtuThresholdY)
                lineTo(w, vtuThresholdY)
            }
            drawPath(
                path = dashPath,
                color = Color(0xFFEF4444).copy(alpha = 0.6f),
                style = Stroke(
                    width = 2f,
                    pathEffect = PathEffect.dashPathEffect(floatArrayOf(10f, 10f), 0f)
                )
            )

            // Calculate point coordinates
            val count = percentages.size
            val stepX = w / (count - 1).coerceAtLeast(1)
            val points = percentages.mapIndexed { idx, pct ->
                val x = idx * stepX
                val y = paddingTop + chartH * (1f - (pct - minVal) / (maxVal - minVal))
                Offset(x, y)
            }

            // Build smooth Bezier path
            val path = Path()
            val fillPath = Path()

            if (points.isNotEmpty()) {
                path.moveTo(points.first().x, points.first().y)
                fillPath.moveTo(points.first().x, points.first().y)

                for (i in 0 until points.size - 1) {
                    val p0 = points[i]
                    val p1 = points[i + 1]
                    val cx = (p0.x + p1.x) / 2f
                    path.cubicTo(cx, p0.y, cx, p1.y, p1.x, p1.y)
                    fillPath.cubicTo(cx, p0.y, cx, p1.y, p1.x, p1.y)
                }

                fillPath.lineTo(points.last().x, h - paddingBottom)
                fillPath.lineTo(points.first().x, h - paddingBottom)
                fillPath.close()

                // Draw gradient under-fill (Recharts Area style)
                drawPath(
                    path = fillPath,
                    brush = Brush.verticalGradient(
                        colors = listOf(
                            Color(0xFF38BDF8).copy(alpha = 0.35f),
                            Color(0xFF38BDF8).copy(alpha = 0.02f)
                        ),
                        startY = paddingTop,
                        endY = h - paddingBottom
                    )
                )

                // Draw main curve stroke
                drawPath(
                    path = path,
                    color = Color(0xFF0284C7),
                    style = Stroke(width = 3.5f, cap = StrokeCap.Round)
                )

                // Draw circular nodes
                points.forEachIndexed { idx, pt ->
                    val isSelected = selectedIndex == idx
                    drawCircle(
                        color = Color.White,
                        radius = if (isSelected) 6f else 4f,
                        center = pt
                    )
                    drawCircle(
                        color = if (percentages[idx] >= 75f) Color(0xFF0284C7) else Color(0xFFEF4444),
                        radius = if (isSelected) 4f else 2.5f,
                        center = pt
                    )
                }
            }
        }
    }
}

@Composable
fun DistributionBars(sessions: List<LectureSessionEntity>) {
    if (sessions.isEmpty()) {
        Text(
            text = "No sessions recorded for distribution.",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        return
    }

    // Classify sessions by attendance bracket
    val high = sessions.count { s -> s.totalStudents > 0 && (s.presentCount.toFloat() / s.totalStudents * 100f) >= 85f }
    val normal = sessions.count { s ->
        val pct = if (s.totalStudents > 0) s.presentCount.toFloat() / s.totalStudents * 100f else 0f
        pct in 75f..84.99f
    }
    val warning = sessions.count { s ->
        val pct = if (s.totalStudents > 0) s.presentCount.toFloat() / s.totalStudents * 100f else 0f
        pct in 60f..74.99f
    }
    val critical = sessions.count { s -> s.totalStudents > 0 && (s.presentCount.toFloat() / s.totalStudents * 100f) < 60f }

    val total = sessions.size.toFloat().coerceAtLeast(1f)

    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        DistributionTierRow(
            label = "High Attendance (≥85%)",
            count = high,
            fraction = high / total,
            color = PresentGreen
        )
        DistributionTierRow(
            label = "Normal / Eligible (75-84%)",
            count = normal,
            fraction = normal / total,
            color = Color(0xFF38BDF8)
        )
        DistributionTierRow(
            label = "Shortage Alert (60-74%)",
            count = warning,
            fraction = warning / total,
            color = WarningAmber
        )
        DistributionTierRow(
            label = "Critical Shortage (<60%)",
            count = critical,
            fraction = critical / total,
            color = AbsentRed
        )
    }
}

@Composable
fun DistributionTierRow(
    label: String,
    count: Int,
    fraction: Float,
    color: Color
) {
    Column {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = label,
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Text(
                text = "$count sessions (${String.format(Locale.US, "%.0f%%", fraction * 100f)})",
                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                color = color
            )
        }

        Spacer(modifier = Modifier.height(4.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp)
                .clip(RoundedCornerShape(4.dp))
                .background(MaterialTheme.colorScheme.surface)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth(fraction.coerceIn(0.02f, 1f))
                    .height(8.dp)
                    .clip(RoundedCornerShape(4.dp))
                    .background(color)
            )
        }
    }
}

@Composable
fun InsightRow(
    title: String,
    desc: String,
    isPositive: Boolean
) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Icon(
            imageVector = if (isPositive) Icons.Default.TrendingUp else Icons.Default.TrendingDown,
            contentDescription = null,
            tint = if (isPositive) PresentGreen else AbsentRed,
            modifier = Modifier.size(20.dp)
        )
        Column {
            Text(
                text = title,
                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Text(
                text = desc,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurface
            )
        }
    }
}
