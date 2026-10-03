package com.example

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import com.example.ui.MainViewModel
import com.example.ui.Screen
import com.example.ui.screens.AnalyticsTrendsDashboardScreen
import com.example.ui.screens.ClassDetailScreen
import com.example.ui.screens.ClassSubjectNotesScreen
import com.example.ui.screens.DashboardScreen
import com.example.ui.screens.InvictusCinematicHubScreen
import com.example.ui.screens.LectureNotesScreen
import com.example.ui.screens.OnboardingScreen
import com.example.ui.screens.ProfileSettingsScreen
import com.example.ui.screens.ReportsScreen
import com.example.ui.screens.SessionSummaryScreen
import com.example.ui.screens.SwipeAttendanceScreen
import com.example.ui.screens.TimetableScreen
import com.example.ui.theme.MyApplicationTheme
import com.example.widget.VtuAttendanceWidgetProvider

class MainActivity : ComponentActivity() {

    private val viewModel: MainViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        handleWidgetIntent(intent)
        setContent {
            MyApplicationTheme {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(MaterialTheme.colorScheme.background)
                        .windowInsetsPadding(WindowInsets.safeDrawing)
                ) {
                    AppNavigation(viewModel)
                }
            }
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        handleWidgetIntent(intent)
    }

    private fun handleWidgetIntent(incomingIntent: Intent?) {
        if (incomingIntent?.action == VtuAttendanceWidgetProvider.ACTION_QUICK_ATTENDANCE) {
            val classId = incomingIntent.getLongExtra(VtuAttendanceWidgetProvider.EXTRA_CLASS_ID, -1L)
            if (classId != -1L) {
                viewModel.launchQuickAttendance(classId)
            }
        }
    }
}

@Composable
fun AppNavigation(viewModel: MainViewModel) {
    val profile by viewModel.facultyProfile.collectAsState()
    val currentScreen by viewModel.currentScreen.collectAsState()

    // Gate Onboarding if faculty profile is not yet created
    if (profile == null || !profile!!.isOnboarded) {
        OnboardingScreen(viewModel = viewModel)
    } else {
        when (val screen = currentScreen) {
            is Screen.Onboarding -> OnboardingScreen(viewModel = viewModel)
            is Screen.Dashboard -> DashboardScreen(viewModel = viewModel)
            is Screen.ClassDetail -> ClassDetailScreen(classId = screen.classId, viewModel = viewModel)
            is Screen.ClassNotesAndPdfs -> ClassSubjectNotesScreen(classId = screen.classId, viewModel = viewModel)
            is Screen.SwipeAttendance -> SwipeAttendanceScreen(classId = screen.classId, viewModel = viewModel)
            is Screen.SessionSummary -> SessionSummaryScreen(classId = screen.classId, viewModel = viewModel)
            is Screen.Timetable -> TimetableScreen(viewModel = viewModel)
            is Screen.Reports -> ReportsScreen(viewModel = viewModel)
            is Screen.AnalyticsTrends -> AnalyticsTrendsDashboardScreen(viewModel = viewModel)
            is Screen.LectureNotes -> LectureNotesScreen(viewModel = viewModel)
            is Screen.ProfileSettings -> ProfileSettingsScreen(viewModel = viewModel)
            is Screen.InvictusCinematicHub -> InvictusCinematicHubScreen(viewModel = viewModel)
        }
    }
}
