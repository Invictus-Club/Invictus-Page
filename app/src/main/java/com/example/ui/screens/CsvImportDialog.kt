package com.example.ui.screens

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.ContentPaste
import androidx.compose.material.icons.filled.FileOpen
import androidx.compose.material.icons.filled.GroupAdd
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.ScrollableTabRow
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
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
import com.example.data.model.StudentEntity
import com.example.data.util.GoogleFormsCsvParser
import com.example.ui.MainViewModel
import com.example.ui.theme.PresentGreen
import com.example.ui.theme.VtuBlueDark
import kotlinx.coroutines.launch
import java.io.BufferedReader
import java.io.InputStreamReader

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CsvImportDialog(
    classId: Long,
    viewModel: MainViewModel,
    onDismiss: () -> Unit
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    var selectedTab by remember { mutableStateOf(0) } // 0: Paste CSV, 1: File, 2: Sample VTU
    var csvText by remember {
        mutableStateOf(
            """USN,Name
2VX24CS001,Aarav Sharma
2VX24CS002,Aditi Rao
2VX24CS003,Ananya Hegde
2VX24CS004,Arjun Gowda
2VX24CS005,Bhavana Murthy"""
        )
    }

    var selectedFileName by remember { mutableStateOf<String?>(null) }
    var importStatusMessage by remember { mutableStateOf<String?>(null) }

    // Document Picker launcher for CSV / TXT files
    val filePickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        if (uri != null) {
            try {
                context.contentResolver.openInputStream(uri)?.use { inputStream ->
                    BufferedReader(InputStreamReader(inputStream)).use { reader ->
                        val content = reader.readText()
                        csvText = content
                        selectedFileName = uri.lastPathSegment ?: "student_list.csv"
                    }
                }
            } catch (e: Exception) {
                importStatusMessage = "Failed to read file: ${e.localizedMessage}"
            }
        }
    }

    // Live preview parsing using GoogleFormsCsvParser
    val previewStudents = remember(csvText) {
        GoogleFormsCsvParser.parseGoogleFormsExport(csvText, classId)
    }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Icon(Icons.Default.GroupAdd, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                Text(
                    text = "Import Students",
                    style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold)
                )
            }
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(440.dp)
            ) {
                ScrollableTabRow(
                    selectedTabIndex = selectedTab,
                    edgePadding = 0.dp,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Tab(
                        selected = selectedTab == 0,
                        onClick = { selectedTab = 0 },
                        text = { Text("Paste Data") }
                    )
                    Tab(
                        selected = selectedTab == 1,
                        onClick = { selectedTab = 1 },
                        text = { Text("Upload File") }
                    )
                    Tab(
                        selected = selectedTab == 2,
                        onClick = { selectedTab = 2 },
                        text = { Text("Sample Batch") }
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                when (selectedTab) {
                    0 -> {
                        // Paste CSV / Excel
                        Text(
                            text = "Paste text copied from Excel, Sheets, or CSV (format: USN, Name or Name, USN):",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        OutlinedTextField(
                            value = csvText,
                            onValueChange = { csvText = it },
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(140.dp)
                                .testTag("csv_text_input"),
                            shape = RoundedCornerShape(10.dp),
                            textStyle = MaterialTheme.typography.bodySmall.copy(fontFamily = FontFamily.Monospace)
                        )
                    }
                    1 -> {
                        // File picker
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 12.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            OutlinedButton(
                                onClick = { filePickerLauncher.launch("*/*") },
                                shape = RoundedCornerShape(10.dp),
                                modifier = Modifier.testTag("pick_csv_file_button")
                            ) {
                                Icon(Icons.Default.FileOpen, contentDescription = null)
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(if (selectedFileName != null) "Choose Different File" else "Browse .CSV / .TXT File")
                            }

                            if (selectedFileName != null) {
                                Spacer(modifier = Modifier.height(8.dp))
                                Surface(
                                    color = MaterialTheme.colorScheme.primaryContainer,
                                    shape = RoundedCornerShape(8.dp)
                                ) {
                                    Text(
                                        text = "Selected: $selectedFileName",
                                        style = MaterialTheme.typography.labelSmall,
                                        color = MaterialTheme.colorScheme.onPrimaryContainer,
                                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                                    )
                                }
                            }
                        }
                    }
                    2 -> {
                        // Sample VTU Batch
                        Card(
                            colors = CardDefaults.cardColors(
                                containerColor = MaterialTheme.colorScheme.surfaceVariant
                            ),
                            shape = RoundedCornerShape(12.dp),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.padding(14.dp)) {
                                Text(
                                    text = "VTU Standard Batch (30 Students)",
                                    style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold),
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                Text(
                                    text = "Instantly generates 30 student records with authentic USNs (2VX24CS001 to 2VX24CS030).",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                                Spacer(modifier = Modifier.height(10.dp))
                                Button(
                                    onClick = {
                                        viewModel.populateSampleStudents(classId) { count ->
                                            onDismiss()
                                        }
                                    },
                                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                                    shape = RoundedCornerShape(8.dp),
                                    modifier = Modifier.testTag("load_sample_batch_button")
                                ) {
                                    Text("Load 30 Sample VTU Students Now")
                                }
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Parsing Preview
                if (selectedTab != 2) {
                    Text(
                        text = "Parsed Preview (${previewStudents.size} students detected):",
                        style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Spacer(modifier = Modifier.height(6.dp))

                    LazyColumn(
                        modifier = Modifier
                            .fillMaxWidth()
                            .weight(1f)
                            .clip(RoundedCornerShape(8.dp))
                            .background(MaterialTheme.colorScheme.surfaceVariant)
                            .padding(8.dp),
                        verticalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        items(previewStudents.take(10)) { student ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 2.dp),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = "${student.rollNo}. ${student.usn}",
                                    style = MaterialTheme.typography.bodySmall.copy(
                                        fontFamily = FontFamily.Monospace,
                                        fontWeight = FontWeight.Bold
                                    ),
                                    color = MaterialTheme.colorScheme.primary
                                )
                                Text(
                                    text = student.name,
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                        if (previewStudents.size > 10) {
                            item {
                                Text(
                                    text = "+ ${previewStudents.size - 10} more students...",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f),
                                    modifier = Modifier.padding(top = 4.dp)
                                )
                            }
                        }
                    }
                }
            }
        },
        confirmButton = {
            if (selectedTab != 2) {
                Button(
                    onClick = {
                        if (csvText.isNotBlank()) {
                            viewModel.importStudentsCsv(classId, csvText) { count ->
                                onDismiss()
                            }
                        }
                    },
                    enabled = previewStudents.isNotEmpty(),
                    colors = ButtonDefaults.buttonColors(containerColor = PresentGreen),
                    modifier = Modifier.testTag("confirm_import_button")
                ) {
                    Icon(Icons.Default.CheckCircle, contentDescription = null)
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Import ${previewStudents.size} Students")
                }
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}
