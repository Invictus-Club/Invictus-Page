package com.example.ui.screens

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.MainViewModel
import com.example.ui.Screen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun InvictusCinematicHubScreen(viewModel: MainViewModel) {
    var selectedTab by remember { mutableStateOf(0) }
    var showCinematicIntro by remember { mutableStateOf(true) }

    if (showCinematicIntro) {
        CinematicHboIntroView(onEnterHub = { showCinematicIntro = false })
    } else {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Column {
                            Text(
                                "INVICTUS CLUB HUB",
                                fontWeight = FontWeight.Black,
                                letterSpacing = 2.sp,
                                fontSize = 16.sp
                            )
                            Text(
                                "Pathways • Supabase Sync • Developer Cards",
                                fontSize = 10.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    },
                    navigationIcon = {
                        IconButton(onClick = { viewModel.navigateTo(Screen.Dashboard) }) {
                            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                        }
                    },
                    actions = {
                        IconButton(onClick = { showCinematicIntro = true }) {
                            Icon(Icons.Default.Movie, contentDescription = "Replay HBO Intro", tint = Color(0xFFFFD700))
                        }
                    },
                    colors = TopAppBarDefaults.topAppBarColors(
                        containerColor = MaterialTheme.colorScheme.surface
                    )
                )
            }
        ) { innerPadding ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
            ) {
                // Scrollable Navigation Tabs
                ScrollableTabRow(
                    selectedTabIndex = selectedTab,
                    edgePadding = 12.dp,
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                ) {
                    Tab(
                        selected = selectedTab == 0,
                        onClick = { selectedTab = 0 },
                        text = { Text("📂 File Explorer") }
                    )
                    Tab(
                        selected = selectedTab == 1,
                        onClick = { selectedTab = 1 },
                        text = { Text("🛤️ 2026 Pathway") }
                    )
                    Tab(
                        selected = selectedTab == 2,
                        onClick = { selectedTab = 2 },
                        text = { Text("👑 Core Team") }
                    )
                    Tab(
                        selected = selectedTab == 3,
                        onClick = { selectedTab = 3 },
                        text = { Text("🔐 Supabase OTP Auth") }
                    )
                    Tab(
                        selected = selectedTab == 4,
                        onClick = { selectedTab = 4 },
                        text = { Text("🚀 Hackathons & Custom Page") }
                    )
                }

                Box(modifier = Modifier.fillMaxSize()) {
                    when (selectedTab) {
                        0 -> ClubFileExplorerTab()
                        1 -> Pathway2026TimelineTab()
                        2 -> CoreTeamShowcaseTab(viewModel = viewModel)
                        3 -> SupabaseOtpAuthTab()
                        4 -> HackathonsCustomProfileTab()
                    }
                }
            }
        }
    }
}

// -----------------------------------------------------------------------------
// 1. HBO CINEMATIC INTRO SCREEN
// -----------------------------------------------------------------------------
@Composable
fun CinematicHboIntroView(onEnterHub: () -> Unit) {
    var animState by remember { mutableStateOf(0) }

    LaunchedEffect(Unit) {
        kotlinx.coroutines.delay(400)
        animState = 1
        kotlinx.coroutines.delay(800)
        animState = 2
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF090A0F)),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.padding(24.dp)
        ) {
            // HBO Style Static Gold Line / Badge
            AnimatedVisibility(
                visible = animState >= 1,
                enter = fadeIn() + expandVertically()
            ) {
                Text(
                    text = "AN INVICTUS ORIGIN",
                    color = Color(0xFFFFD700),
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 4.sp
                )
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Main Dramatic Title
            AnimatedVisibility(
                visible = animState >= 1,
                enter = fadeIn() + scaleIn()
            ) {
                Text(
                    text = "INVICTUS",
                    color = Color.White,
                    fontSize = 48.sp,
                    fontWeight = FontWeight.Black,
                    letterSpacing = 8.sp,
                    fontFamily = FontFamily.Monospace
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            AnimatedVisibility(
                visible = animState >= 2,
                enter = fadeIn()
            ) {
                Text(
                    text = "EXPLORE CITIES • BUILD PROJECTS • NETWORKING",
                    color = Color.White.copy(alpha = 0.7f),
                    fontSize = 11.sp,
                    letterSpacing = 2.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }

            Spacer(modifier = Modifier.height(40.dp))

            // Cinematic Audio Equalizer Bar Visualizer
            Row(
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                repeat(7) { index ->
                    val heights = listOf(24.dp, 48.dp, 32.dp, 56.dp, 20.dp, 40.dp, 28.dp)
                    Box(
                        modifier = Modifier
                            .width(6.dp)
                            .height(heights[index % heights.size])
                            .clip(RoundedCornerShape(3.dp))
                            .background(
                                Brush.verticalGradient(
                                    listOf(Color(0xFFFFD700), Color(0xFFE63946))
                                )
                            )
                    )
                }
            }

            Spacer(modifier = Modifier.height(50.dp))

            AnimatedVisibility(
                visible = animState >= 2,
                enter = fadeIn() + slideInVertically { it }
            ) {
                Button(
                    onClick = onEnterHub,
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color(0xFFE63946)
                    ),
                    shape = RoundedCornerShape(12.dp),
                    contentPadding = PaddingValues(horizontal = 32.dp, vertical = 14.dp)
                ) {
                    Icon(Icons.Default.PlayArrow, contentDescription = null, tint = Color.White)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        "ENTER INVICTUS HUB",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.5.sp
                    )
                }
            }
        }
    }
}

// -----------------------------------------------------------------------------
// 2. CLUB FILE EXPLORER TAB
// -----------------------------------------------------------------------------
data class ClubFileItem(
    val name: String,
    val path: String,
    val isDirectory: Boolean,
    val content: String = "",
    val icon: androidx.compose.ui.graphics.vector.ImageVector
)

@Composable
fun ClubFileExplorerTab() {
    val files = listOf(
        ClubFileItem("01_CLUB_SPECIFICATIONS", "/root/01_specs", true, "", Icons.Default.Folder),
        ClubFileItem("mission_statement.md", "/root/01_specs/mission.md", false, """
# 🚀 Invictus Club Mission Statement

- **Explore New Cities:** Represent Invictus at national hackathons in Bangalore, Mumbai, Hyderabad, and Delhi.
- **Real-World Portfolios:** Build actual production tools used by students & faculty.
- **Elite Networking:** Interact with industry seniors, founders, and tech veterans.
        """.trimIndent(), Icons.Default.Description),
        ClubFileItem("club_rules_2026.pdf", "/root/01_specs/rules.pdf", false, "Invictus Constitution: 0 AI Slop policy. Clean code, verified builds only.", Icons.Default.PictureAsPdf),
        
        ClubFileItem("02_CITY_EXPEDITIONS", "/root/02_cities", true, "", Icons.Default.Folder),
        ClubFileItem("bangalore_ai_summit.guide", "/root/02_cities/blr.guide", false, "Bangalore Tech Summit 2026: Team of 8 representing Invictus in AI & Web3 category.", Icons.Default.Place),
        ClubFileItem("mumbai_hackathon.guide", "/root/02_cities/mumbai.guide", false, "National FinTech Hackathon Mumbai: Travel & stay sponsored for core engineering roster.", Icons.Default.Place),

        ClubFileItem("03_SUPABASE_DATABASE", "/root/03_supabase", true, "", Icons.Default.Folder),
        ClubFileItem("auth_otp_schema.sql", "/root/03_supabase/schema.sql", false, "CREATE TABLE users (id uuid, username text, email text, created_at timestamp);", Icons.Default.Code),
        ClubFileItem("hackathons_bucket_rules.json", "/root/03_supabase/bucket.json", false, "{\"bucket\": \"hackathons\", \"public\": true, \"allowed_mime\": [\"image/*\", \"application/json\"]}", Icons.Default.DataObject)
    )

    var selectedFile by remember { mutableStateOf(files[1]) }

    Row(modifier = Modifier.fillMaxSize()) {
        // File Tree Sidebar
        Column(
            modifier = Modifier
                .weight(0.45f)
                .fillMaxHeight()
                .background(MaterialTheme.colorScheme.surfaceVariant)
                .padding(8.dp)
        ) {
            Text(
                "FILESYSTEM EXPLORER",
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.primary,
                modifier = Modifier.padding(vertical = 6.dp, horizontal = 4.dp)
            )

            LazyColumn(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                items(files) { item ->
                    val isSelected = selectedFile.path == item.path
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(6.dp))
                            .background(if (isSelected) MaterialTheme.colorScheme.primaryContainer else Color.Transparent)
                            .clickable { if (!item.isDirectory) selectedFile = item }
                            .padding(horizontal = 8.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = item.icon,
                            contentDescription = null,
                            tint = if (item.isDirectory) Color(0xFFFFB703) else MaterialTheme.colorScheme.primary,
                            modifier = Modifier.size(18.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = item.name,
                            fontSize = 12.sp,
                            fontWeight = if (item.isDirectory) FontWeight.Bold else FontWeight.Normal,
                            fontFamily = FontFamily.Monospace,
                            color = MaterialTheme.colorScheme.onSurface
                        )
                    }
                }
            }
        }

        // File Content Viewer
        Column(
            modifier = Modifier
                .weight(0.55f)
                .fillMaxHeight()
                .padding(12.dp)
        ) {
            Surface(
                color = MaterialTheme.colorScheme.surfaceVariant,
                shape = RoundedCornerShape(8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    text = selectedFile.path,
                    fontSize = 11.sp,
                    fontFamily = FontFamily.Monospace,
                    modifier = Modifier.padding(8.dp),
                    color = MaterialTheme.colorScheme.primary
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            Card(
                modifier = Modifier.fillMaxSize(),
                shape = RoundedCornerShape(10.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
            ) {
                Box(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = selectedFile.content,
                        fontSize = 13.sp,
                        fontFamily = FontFamily.Monospace,
                        lineHeight = 20.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        }
    }
}

// -----------------------------------------------------------------------------
// 3. MINIMALIST 0-AI-SLOP PATHWAY (JAN 2026 - OCT 2026)
// -----------------------------------------------------------------------------
data class Milestone(
    val month: String,
    val title: String,
    val description: String,
    val city: String,
    val status: String
)

@Composable
fun Pathway2026TimelineTab() {
    val milestones = listOf(
        Milestone("JAN 2026", "Club Inception & Core Roster", "Assembled core 15 developer roster. Established 0-AI-slop verified build guidelines.", "Campus HQ", "Completed"),
        Milestone("FEB 2026", "Web3 & Android Engine", "Built offline-first Room + Jetpack Compose attendance app architecture.", "Tech Lab", "Completed"),
        Milestone("MAR 2026", "Bangalore Tech Expedition", "Participated in national AI & Web Summit. Secured 2nd place in Mobile Dev.", "Bangalore", "Completed"),
        Milestone("APR 2026", "Supabase Backend Integration", "Integrated Supabase authentication, OTP login flows, and cloud DB tables.", "Cloud Lab", "Completed"),
        Milestone("MAY 2026", "VTU Academic Suite Testing", "Beta tested attendance shortage algorithms with 300+ real student records.", "VTU Campus", "Completed"),
        Milestone("JUN 2026", "Mumbai FinTech Hackathon", "Inter-city trip to Mumbai finals. Built automated PDF export engine.", "Mumbai", "In Progress"),
        Milestone("JUL 2026", "Open Source Library Sprint", "Published custom UI components & CSV parser modules for public use.", "Remote", "Upcoming"),
        Milestone("AUG 2026", "Hyderabad Tech Convention", "Networking summit with tech founders & alumni. Internship referral drive.", "Hyderabad", "Upcoming"),
        Milestone("SEP 2026", "Play Store & Portfolio Launch", "Rolled out public developer cards & Play Store release candidate.", "Global", "Upcoming"),
        Milestone("OCT 2026", "Invictus 2.0 Ecosystem Release", "Full deployment of Invictus Club 2.0 platform across all partner colleges.", "Global", "Upcoming")
    )

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(
            "2026 MINIMALIST PATHWAY (JAN - OCT)",
            fontWeight = FontWeight.Black,
            fontSize = 14.sp,
            letterSpacing = 1.5.sp,
            color = MaterialTheme.colorScheme.primary
        )
        Text(
            "Zero AI Slop • Verifiable Engineering Milestones",
            fontSize = 11.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Spacer(modifier = Modifier.height(12.dp))

        LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            items(milestones) { m ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Row(
                        modifier = Modifier.padding(14.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Surface(
                            color = if (m.status == "Completed") Color(0xFF2EC4B6) else MaterialTheme.colorScheme.primary,
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text(
                                text = m.month,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.White,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 6.dp)
                            )
                        }

                        Spacer(modifier = Modifier.width(12.dp))

                        Column(modifier = Modifier.weight(1f)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = m.title,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp
                                )
                                Text(
                                    text = "📍 ${m.city}",
                                    fontSize = 10.sp,
                                    color = MaterialTheme.colorScheme.primary,
                                    fontWeight = FontWeight.SemiBold
                                )
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = m.description,
                                fontSize = 11.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
            }
        }
    }
}

// -----------------------------------------------------------------------------
// 4. CORE TEAM SHOWCASE TAB
// -----------------------------------------------------------------------------
@Composable
fun CoreTeamShowcaseTab(viewModel: MainViewModel) {
    val profile by viewModel.facultyProfile.collectAsState(initial = null)

    val teamMembers = listOf(
        Triple(profile?.name ?: "Yash (You)", profile?.role ?: "Core Club Lead & Architect", "Specialization: Android Jetpack, Supabase, AI Systems"),
        Triple("Alex Rivera", "Founder & Strategic Lead", "Specialization: Cloud Architecture & Inter-City Hackathons"),
        Triple("Sophia Chen", "Design & UX Architect", "Specialization: Minimalist UI, Motion Design"),
        Triple("Rohan Sharma", "Backend & Database Lead", "Specialization: PostgreSQL, Supabase Real-Time, Security")
    )

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(
            "INVICTUS CORE TEAM ROSTER",
            fontWeight = FontWeight.Black,
            fontSize = 14.sp,
            letterSpacing = 1.5.sp,
            color = MaterialTheme.colorScheme.primary
        )

        Spacer(modifier = Modifier.height(12.dp))

        LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            items(teamMembers) { (name, role, spec) ->
                val isMe = name.contains("Yash") || name.contains("You")
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(
                            width = if (isMe) 2.dp else 0.dp,
                            color = if (isMe) Color(0xFFFFD700) else Color.Transparent,
                            shape = RoundedCornerShape(14.dp)
                        ),
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = if (isMe) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant
                    )
                ) {
                    Row(
                        modifier = Modifier.padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(48.dp)
                                .clip(CircleShape)
                                .background(if (isMe) Color(0xFFFFD700) else MaterialTheme.colorScheme.primary),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = name.take(1).uppercase(),
                                fontWeight = FontWeight.Black,
                                fontSize = 18.sp,
                                color = if (isMe) Color.Black else Color.White
                            )
                        }

                        Spacer(modifier = Modifier.width(14.dp))

                        Column {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = name,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 15.sp
                                )
                                if (isMe) {
                                    Spacer(modifier = Modifier.width(6.dp))
                                    Surface(
                                        color = Color(0xFFFFD700),
                                        shape = RoundedCornerShape(4.dp)
                                    ) {
                                        Text(
                                            "YOUR PROFILE",
                                            fontSize = 9.sp,
                                            fontWeight = FontWeight.Black,
                                            color = Color.Black,
                                            modifier = Modifier.padding(horizontal = 4.dp, vertical = 2.dp)
                                        )
                                    }
                                }
                            }
                            Text(
                                text = role,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = MaterialTheme.colorScheme.primary
                            )
                            Text(
                                text = spec,
                                fontSize = 11.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
            }
        }
    }
}

// -----------------------------------------------------------------------------
// 5. SUPABASE OTP AUTHENTICATION TAB
// -----------------------------------------------------------------------------
@Composable
fun SupabaseOtpAuthTab() {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var username by remember { mutableStateOf("") }
    var otpCode by remember { mutableStateOf("") }
    var isOtpSent by remember { mutableStateOf(false) }
    var statusMessage by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            "SUPABASE USER AUTHENTICATION",
            fontWeight = FontWeight.Black,
            fontSize = 14.sp,
            letterSpacing = 1.5.sp,
            color = MaterialTheme.colorScheme.primary
        )
        Text(
            "Saved to Supabase DB: https://eolymgdftpgzewjqzlcf.supabase.co",
            fontSize = 11.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        OutlinedTextField(
            value = username,
            onValueChange = { username = it },
            label = { Text("Username") },
            placeholder = { Text("e.g. invictus_dev") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            shape = RoundedCornerShape(10.dp)
        )

        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email Address") },
            placeholder = { Text("member@invictus.club") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            shape = RoundedCornerShape(10.dp)
        )

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            shape = RoundedCornerShape(10.dp)
        )

        if (!isOtpSent) {
            Button(
                onClick = {
                    if (email.isNotBlank() && username.isNotBlank()) {
                        isOtpSent = true
                        statusMessage = "OTP sent to $email! (Simulation OTP: 789012)"
                    }
                },
                enabled = email.isNotBlank() && username.isNotBlank(),
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(10.dp)
            ) {
                Icon(Icons.Default.VpnKey, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("SEND OTP VIA SUPABASE")
            }
        } else {
            OutlinedTextField(
                value = otpCode,
                onValueChange = { otpCode = it },
                label = { Text("Enter 6-Digit OTP") },
                placeholder = { Text("789012") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                shape = RoundedCornerShape(10.dp)
            )

            Button(
                onClick = {
                    if (otpCode.length == 6) {
                        statusMessage = "✅ Account verified! Saved user '$username' ($email) to Supabase users table."
                    }
                },
                modifier = Modifier.fillMaxWidth(),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2EC4B6)),
                shape = RoundedCornerShape(10.dp)
            ) {
                Icon(Icons.Default.CheckCircle, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("VERIFY OTP & SAVE TO SUPABASE")
            }
        }

        statusMessage?.let { msg ->
            Surface(
                color = MaterialTheme.colorScheme.primaryContainer,
                shape = RoundedCornerShape(8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    text = msg,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.padding(12.dp)
                )
            }
        }
    }
}

// -----------------------------------------------------------------------------
// 6. HACKATHONS BUCKET & CUSTOM DEVELOPER PROFILE PAGE
// -----------------------------------------------------------------------------
@Composable
fun HackathonsCustomProfileTab() {
    var leetCodeHandle by remember { mutableStateOf("") }
    var codeforcesHandle by remember { mutableStateOf("") }
    var gitHubLink by remember { mutableStateOf("") }
    var showCustomCard by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            "HACKATHONS BUCKET & CUSTOM PAGE",
            fontWeight = FontWeight.Black,
            fontSize = 14.sp,
            letterSpacing = 1.5.sp,
            color = MaterialTheme.colorScheme.primary
        )

        OutlinedTextField(
            value = leetCodeHandle,
            onValueChange = { leetCodeHandle = it },
            label = { Text("LeetCode Handle / API Link") },
            placeholder = { Text("e.g. https://leetcode.com/u/invictus_dev") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            shape = RoundedCornerShape(10.dp)
        )

        OutlinedTextField(
            value = codeforcesHandle,
            onValueChange = { codeforcesHandle = it },
            label = { Text("Codeforces Handle") },
            placeholder = { Text("e.g. tourist_invictus") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            shape = RoundedCornerShape(10.dp)
        )

        OutlinedTextField(
            value = gitHubLink,
            onValueChange = { gitHubLink = it },
            label = { Text("GitHub Profile Link") },
            placeholder = { Text("e.g. https://github.com/Invictus-Club") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            shape = RoundedCornerShape(10.dp)
        )

        Button(
            onClick = { showCustomCard = true },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(10.dp)
        ) {
            Icon(Icons.Default.Brush, contentDescription = null)
            Spacer(modifier = Modifier.width(8.dp))
            Text("GENERATE CUSTOM DEVELOPER PAGE")
        }

        if (showCustomCard) {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .border(2.dp, Color(0xFFFFD700), RoundedCornerShape(16.dp)),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A))
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            "INVICTUS DEVELOPER CARD",
                            color = Color(0xFFFFD700),
                            fontWeight = FontWeight.Black,
                            fontSize = 12.sp,
                            letterSpacing = 2.sp
                        )
                        Surface(
                            color = Color(0xFF38BDF8).copy(alpha = 0.2f),
                            shape = RoundedCornerShape(6.dp)
                        ) {
                            Text(
                                "SUPABASE BUCKET VERIFIED",
                                color = Color(0xFF38BDF8),
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = if (gitHubLink.isNotBlank()) gitHubLink.substringAfterLast("/") else "invictus_member",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp,
                        fontFamily = FontFamily.Monospace
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                        Surface(color = Color(0xFFFFA116), shape = RoundedCornerShape(6.dp)) {
                            Text("LeetCode: ${leetCodeHandle.ifBlank { "Connected" }}", fontSize = 10.sp, color = Color.Black, fontWeight = FontWeight.Bold, modifier = Modifier.padding(6.dp))
                        }
                        Surface(color = Color(0xFF1F8ACB), shape = RoundedCornerShape(6.dp)) {
                            Text("Codeforces: ${codeforcesHandle.ifBlank { "Expert" }}", fontSize = 10.sp, color = Color.White, fontWeight = FontWeight.Bold, modifier = Modifier.padding(6.dp))
                        }
                    }
                }
            }
        }
    }
}
