package com.example.ui.screens

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Description
import androidx.compose.material.icons.filled.FormatListBulleted
import androidx.compose.material.icons.filled.OpenInNew
import androidx.compose.material.icons.filled.PictureAsPdf
import androidx.compose.material.icons.filled.Save
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.UploadFile
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
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
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.FileProvider
import com.example.data.model.ClassPdfEntity
import com.example.ui.MainViewModel
import com.example.ui.Screen
import com.example.ui.theme.AbsentRed
import com.example.ui.theme.PresentGreen
import com.example.ui.theme.VtuBlueDark
import kotlinx.coroutines.launch
import java.io.File
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ClassSubjectNotesScreen(
    classId: Long,
    viewModel: MainViewModel
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    val allClasses by viewModel.allClasses.collectAsState()
    val classEntity = allClasses.find { it.id == classId }

    val savedNotes by viewModel.getClassNotes(classId).collectAsState(initial = null)
    val uploadedPdfs by viewModel.getClassPdfs(classId).collectAsState(initial = emptyList())

    var bulletPointsText by remember { mutableStateOf("") }
    var isInitialized by remember { mutableStateOf(false) }
    var saveSuccessMessage by remember { mutableStateOf(false) }
    var pdfToDelete by remember { mutableStateOf<ClassPdfEntity?>(null) }
    var isUploading by remember { mutableStateOf(false) }

    // Sync loaded bullet points into text state
    LaunchedEffect(savedNotes) {
        if (!isInitialized && savedNotes != null) {
            bulletPointsText = savedNotes?.bulletPoints ?: ""
            isInitialized = true
        }
    }

    // PDF document picker launcher
    val pdfPickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        if (uri != null) {
            isUploading = true
            viewModel.uploadPdfForClass(classId, uri, context.contentResolver) { success ->
                isUploading = false
                if (success) {
                    Toast.makeText(context, "PDF uploaded successfully", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(context, "Failed to upload PDF", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    BackHandler {
        viewModel.navigateBack()
    }

    if (pdfToDelete != null) {
        AlertDialog(
            onDismissRequest = { pdfToDelete = null },
            title = { Text("Delete Uploaded PDF?") },
            text = { Text("Delete ${pdfToDelete?.fileName} from this class?") },
            confirmButton = {
                TextButton(
                    onClick = {
                        pdfToDelete?.let { viewModel.deleteUploadedPdf(it.id, it.filePath) }
                        pdfToDelete = null
                    }
                ) {
                    Text("Delete", color = AbsentRed)
                }
            },
            dismissButton = {
                TextButton(onClick = { pdfToDelete = null }) {
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
                    onClick = { viewModel.navigateBack() },
                    modifier = Modifier.testTag("class_notes_back_button")
                ) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = "Back",
                        tint = MaterialTheme.colorScheme.onBackground
                    )
                }

                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = "${classEntity?.code ?: "COURSE"} Notes",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onBackground
                    )
                    Text(
                        text = classEntity?.name ?: "Course Materials",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }

                IconButton(
                    onClick = {
                        viewModel.saveClassNotes(classId, bulletPointsText)
                        saveSuccessMessage = true
                        Toast.makeText(context, "Bullet points saved", Toast.LENGTH_SHORT).show()
                    },
                    modifier = Modifier.testTag("save_notes_top_button")
                ) {
                    Icon(
                        imageVector = Icons.Default.Save,
                        contentDescription = "Save Notes",
                        tint = MaterialTheme.colorScheme.primary
                    )
                }
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
            // Section 1: Bullet Points Card
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                Icon(
                                    imageVector = Icons.Default.FormatListBulleted,
                                    contentDescription = null,
                                    tint = MaterialTheme.colorScheme.primary
                                )
                                Text(
                                    text = "Key Bullet Points & Syllabus Focus",
                                    style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold),
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }

                            // Quick add bullet symbol
                            OutlinedButton(
                                onClick = {
                                    bulletPointsText = if (bulletPointsText.isBlank()) "• "
                                    else if (bulletPointsText.endsWith("\n")) "${bulletPointsText}• "
                                    else "${bulletPointsText}\n• "
                                },
                                shape = RoundedCornerShape(8.dp),
                                contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 8.dp, vertical = 2.dp)
                            ) {
                                Text("+ Bullet", fontSize = 11.sp)
                            }
                        }

                        Spacer(modifier = Modifier.height(10.dp))

                        OutlinedTextField(
                            value = bulletPointsText,
                            onValueChange = {
                                bulletPointsText = it
                                saveSuccessMessage = false
                            },
                            placeholder = {
                                Text(
                                    "• Module 1: Software Requirements & User Stories\n" +
                                            "• Module 2: Agile Scrum Workflow & Sprints\n" +
                                            "• Assignment 1 due before 1st Internal Assessment\n" +
                                            "• Key VTU Exam Question: Waterfall vs Agile"
                                )
                            },
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(160.dp)
                                .testTag("bullet_points_input"),
                            shape = RoundedCornerShape(10.dp),
                            textStyle = MaterialTheme.typography.bodyMedium
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.End
                        ) {
                            Button(
                                onClick = {
                                    viewModel.saveClassNotes(classId, bulletPointsText)
                                    saveSuccessMessage = true
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary),
                                shape = RoundedCornerShape(8.dp),
                                modifier = Modifier.testTag("save_bullet_points_btn")
                            ) {
                                Icon(Icons.Default.Save, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("Save Key Points")
                            }
                        }

                        if (saveSuccessMessage) {
                            Spacer(modifier = Modifier.height(6.dp))
                            Text(
                                text = "✓ Key points saved successfully",
                                style = MaterialTheme.typography.labelSmall,
                                color = PresentGreen
                            )
                        }
                    }
                }
            }

            // Section 2: PDF Materials Header & Upload Button
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.PictureAsPdf,
                            contentDescription = null,
                            tint = AbsentRed
                        )
                        Text(
                            text = "Uploaded PDF Documents (${uploadedPdfs.size})",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.onBackground
                        )
                    }

                    Button(
                        onClick = { pdfPickerLauncher.launch("application/pdf") },
                        enabled = !isUploading,
                        colors = ButtonDefaults.buttonColors(containerColor = PresentGreen),
                        shape = RoundedCornerShape(10.dp),
                        modifier = Modifier.testTag("upload_pdf_button")
                    ) {
                        Icon(Icons.Default.UploadFile, contentDescription = null, tint = Color.White, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(if (isUploading) "Uploading..." else "Upload PDF", color = Color.White)
                    }
                }
            }

            // Uploaded PDFs List
            if (uploadedPdfs.isEmpty()) {
                item {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(14.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                    ) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(24.dp),
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.PictureAsPdf,
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.5f),
                                modifier = Modifier.size(48.dp)
                            )
                            Text(
                                text = "No PDFs uploaded yet",
                                style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.SemiBold),
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                            Text(
                                text = "Upload syllabus PDFs, question banks, lecture handouts, or question papers for easy classroom reference.",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.8f),
                                textAlign = androidx.compose.ui.text.style.TextAlign.Center
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            OutlinedButton(
                                onClick = { pdfPickerLauncher.launch("application/pdf") },
                                shape = RoundedCornerShape(8.dp)
                            ) {
                                Icon(Icons.Default.UploadFile, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("Choose PDF File")
                            }
                        }
                    }
                }
            } else {
                items(uploadedPdfs, key = { it.id }) { pdf ->
                    UploadedPdfCard(
                        pdf = pdf,
                        onOpen = {
                            openPdfFile(context, pdf)
                        },
                        onShare = {
                            sharePdfFile(context, pdf)
                        },
                        onDelete = {
                            pdfToDelete = pdf
                        }
                    )
                }
            }

            item {
                Spacer(modifier = Modifier.height(24.dp))
            }
        }
    }
}

@Composable
fun UploadedPdfCard(
    pdf: ClassPdfEntity,
    onOpen: () -> Unit,
    onShare: () -> Unit,
    onDelete: () -> Unit
) {
    val dateStr = SimpleDateFormat("dd MMM yyyy, hh:mm a", Locale.getDefault()).format(Date(pdf.uploadedAt))
    val sizeStr = formatFileSize(pdf.fileSizeBytes)

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier
                    .weight(1f)
                    .clickable { onOpen() }
            ) {
                Surface(
                    color = AbsentRed.copy(alpha = 0.15f),
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Box(
                        modifier = Modifier.size(44.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.PictureAsPdf,
                            contentDescription = null,
                            tint = AbsentRed,
                            modifier = Modifier.size(24.dp)
                        )
                    }
                }

                Column {
                    Text(
                        text = pdf.fileName,
                        style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        maxLines = 1
                    )
                    Text(
                        text = "$sizeStr • $dateStr",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.7f)
                    )
                }
            }

            Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                IconButton(
                    onClick = onOpen,
                    modifier = Modifier.size(36.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.OpenInNew,
                        contentDescription = "Open PDF",
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(18.dp)
                    )
                }

                IconButton(
                    onClick = onShare,
                    modifier = Modifier.size(36.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Share,
                        contentDescription = "Share PDF",
                        tint = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.size(18.dp)
                    )
                }

                IconButton(
                    onClick = onDelete,
                    modifier = Modifier.size(36.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Delete,
                        contentDescription = "Delete PDF",
                        tint = MaterialTheme.colorScheme.error.copy(alpha = 0.7f),
                        modifier = Modifier.size(18.dp)
                    )
                }
            }
        }
    }
}

private fun formatFileSize(bytes: Long): String {
    if (bytes <= 0) return "PDF Document"
    val kb = bytes / 1024.0
    val mb = kb / 1024.0
    return if (mb >= 1.0) String.format(Locale.US, "%.1f MB", mb)
    else String.format(Locale.US, "%.0f KB", kb)
}

private fun openPdfFile(context: Context, pdf: ClassPdfEntity) {
    try {
        val file = File(pdf.filePath)
        if (file.exists()) {
            val uri = FileProvider.getUriForFile(context, "${context.packageName}.provider", file)
            val intent = Intent(Intent.ACTION_VIEW).apply {
                setDataAndType(uri, "application/pdf")
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            context.startActivity(Intent.createChooser(intent, "Open PDF with"))
        } else {
            Toast.makeText(context, "File not found locally", Toast.LENGTH_SHORT).show()
        }
    } catch (e: Exception) {
        Toast.makeText(context, "No PDF viewer app found on device", Toast.LENGTH_SHORT).show()
    }
}

private fun sharePdfFile(context: Context, pdf: ClassPdfEntity) {
    try {
        val file = File(pdf.filePath)
        if (file.exists()) {
            val uri = FileProvider.getUriForFile(context, "${context.packageName}.provider", file)
            val intent = Intent(Intent.ACTION_SEND).apply {
                type = "application/pdf"
                putExtra(Intent.EXTRA_STREAM, uri)
                putExtra(Intent.EXTRA_SUBJECT, pdf.fileName)
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            }
            context.startActivity(Intent.createChooser(intent, "Share PDF Document"))
        } else {
            Toast.makeText(context, "File not found", Toast.LENGTH_SHORT).show()
        }
    } catch (e: Exception) {
        Toast.makeText(context, "Failed to share PDF: ${e.localizedMessage}", Toast.LENGTH_SHORT).show()
    }
}
