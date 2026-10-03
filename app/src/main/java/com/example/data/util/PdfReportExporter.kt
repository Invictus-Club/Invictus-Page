package com.example.data.util

import android.content.Context
import android.content.Intent
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.RectF
import android.graphics.Typeface
import android.graphics.pdf.PdfDocument
import android.net.Uri
import androidx.core.content.FileProvider
import com.example.data.model.AttendanceRecordEntity
import com.example.data.model.ClassEntity
import com.example.data.model.FacultyProfile
import com.example.data.model.LectureSessionEntity
import com.example.data.model.StudentEntity
import java.io.File
import java.io.FileOutputStream
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

object PdfReportExporter {

    // A4 dimensions in PostScript points: 595 x 842 pt
    private const val PAGE_WIDTH = 595
    private const val PAGE_HEIGHT = 842
    private const val MARGIN = 36f

    fun generateAttendancePdf(
        context: Context,
        classEntity: ClassEntity,
        facultyProfile: FacultyProfile?,
        students: List<StudentEntity>,
        sessions: List<LectureSessionEntity>,
        records: List<AttendanceRecordEntity>
    ): File {
        val pdfDocument = PdfDocument()

        val totalLectures = sessions.size
        val dateFormat = SimpleDateFormat("dd MMM yyyy, hh:mm a", Locale.getDefault())
        val generatedDateStr = dateFormat.format(Date())

        val sortedStudents = students.sortedBy { it.usn }

        // Compute student stats
        data class StudentRow(
            val rollNo: String,
            val usn: String,
            val name: String,
            val attended: Int,
            val absent: Int,
            val percentage: Float,
            val isShortage: Boolean
        )

        val rows = sortedStudents.mapIndexed { index, student ->
            val studentRecords = records.filter { it.studentId == student.id }
            val attended = studentRecords.count { it.isPresent }
            val absent = totalLectures - attended
            val pct = if (totalLectures > 0) (attended.toFloat() / totalLectures * 100f) else 100f
            StudentRow(
                rollNo = student.rollNo.ifBlank { (index + 1).toString().padStart(2, '0') },
                usn = student.usn,
                name = student.name,
                attended = attended,
                absent = absent,
                percentage = pct,
                isShortage = totalLectures > 0 && pct < 75.0f
            )
        }

        val eligibleCount = rows.count { !it.isShortage }
        val shortageCount = rows.count { it.isShortage }

        // Paints
        val paintHeaderTitle = Paint().apply {
            color = Color.rgb(15, 23, 42) // Slate 900
            textSize = 15f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            isAntiAlias = true
        }
        val paintHeaderSub = Paint().apply {
            color = Color.rgb(71, 85, 105) // Slate 600
            textSize = 9f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
            isAntiAlias = true
        }
        val paintMetaLabel = Paint().apply {
            color = Color.rgb(100, 116, 139)
            textSize = 8.5f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
            isAntiAlias = true
        }
        val paintMetaVal = Paint().apply {
            color = Color.rgb(15, 23, 42)
            textSize = 9.5f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            isAntiAlias = true
        }
        val paintTableHead = Paint().apply {
            color = Color.rgb(255, 255, 255)
            textSize = 8.5f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            isAntiAlias = true
        }
        val paintCellText = Paint().apply {
            color = Color.rgb(30, 41, 59)
            textSize = 8.5f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
            isAntiAlias = true
        }
        val paintCellMono = Paint().apply {
            color = Color.rgb(14, 116, 144) // Teal / Cyan
            textSize = 8.5f
            typeface = Typeface.create(Typeface.MONOSPACE, Typeface.BOLD)
            isAntiAlias = true
        }
        val paintBadgeGreen = Paint().apply {
            color = Color.rgb(16, 185, 129)
            textSize = 8f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            isAntiAlias = true
        }
        val paintBadgeRed = Paint().apply {
            color = Color.rgb(239, 68, 68)
            textSize = 8f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            isAntiAlias = true
        }
        val bgPaint = Paint().apply { isAntiAlias = true }

        // Pagination: Page 1 holds header + meta box + stats + ~20 rows.
        // Subsequent pages hold table header + ~32 rows.
        val rowsPage1 = 20
        val rowsOtherPages = 32
        val totalRows = rows.size
        val totalPages = if (totalRows <= rowsPage1) 1
        else 1 + ((totalRows - rowsPage1 + rowsOtherPages - 1) / rowsOtherPages)

        var currentRowIdx = 0

        for (pageNumber in 1..totalPages) {
            val pageInfo = PdfDocument.PageInfo.Builder(PAGE_WIDTH, PAGE_HEIGHT, pageNumber).create()
            val page = pdfDocument.startPage(pageInfo)
            val canvas: Canvas = page.canvas

            var yPos = MARGIN

            if (pageNumber == 1) {
                // Top Header Brand Stripe
                bgPaint.color = Color.rgb(2, 132, 199) // VTU Blue
                canvas.drawRect(MARGIN, yPos, PAGE_WIDTH - MARGIN, yPos + 4f, bgPaint)
                yPos += 18f

                // University Title
                canvas.drawText("VISVESVARAYA TECHNOLOGICAL UNIVERSITY", MARGIN, yPos, paintHeaderTitle)
                yPos += 14f
                canvas.drawText("Official Course Attendance & Shortage Report (VTU Mandate)", MARGIN, yPos, paintHeaderSub)
                yPos += 16f

                // Course Meta Box
                val metaBoxTop = yPos
                val metaBoxHeight = 52f
                bgPaint.color = Color.rgb(241, 245, 249) // Slate 100
                canvas.drawRoundRect(RectF(MARGIN, metaBoxTop, PAGE_WIDTH - MARGIN, metaBoxTop + metaBoxHeight), 6f, 6f, bgPaint)

                // Meta values
                val col1 = MARGIN + 12f
                val col2 = MARGIN + 180f
                val col3 = MARGIN + 350f

                canvas.drawText("Course / Subject:", col1, metaBoxTop + 16f, paintMetaLabel)
                canvas.drawText("${classEntity.code} - ${classEntity.name}", col1, metaBoxTop + 28f, paintMetaVal)

                canvas.drawText("Faculty Name:", col1, metaBoxTop + 42f, paintMetaLabel)
                val facultyDisplay = "${facultyProfile?.name ?: "Faculty Member"} (${facultyProfile?.role ?: "Asst. Prof"})"
                canvas.drawText(facultyDisplay, col1 + 60f, metaBoxTop + 42f, paintMetaVal)

                canvas.drawText("Semester & Section:", col2, metaBoxTop + 16f, paintMetaLabel)
                canvas.drawText("${classEntity.semester} • Section ${classEntity.section}", col2, metaBoxTop + 28f, paintMetaVal)

                canvas.drawText("Academic Year:", col2, metaBoxTop + 42f, paintMetaLabel)
                canvas.drawText(classEntity.academicYear, col2 + 65f, metaBoxTop + 42f, paintMetaVal)

                canvas.drawText("Total Lectures:", col3, metaBoxTop + 16f, paintMetaLabel)
                canvas.drawText("$totalLectures Conducted", col3, metaBoxTop + 28f, paintMetaVal)

                canvas.drawText("Generated On:", col3, metaBoxTop + 42f, paintMetaLabel)
                canvas.drawText(generatedDateStr, col3 + 60f, metaBoxTop + 42f, paintMetaLabel)

                yPos += metaBoxHeight + 12f

                // Stats Bar
                bgPaint.color = Color.rgb(238, 242, 255)
                canvas.drawRoundRect(RectF(MARGIN, yPos, PAGE_WIDTH - MARGIN, yPos + 24f), 4f, 4f, bgPaint)

                val statCol1 = MARGIN + 16f
                val statCol2 = MARGIN + 140f
                val statCol3 = MARGIN + 280f
                val statCol4 = MARGIN + 410f

                canvas.drawText("Total Enrolled: ${rows.size}", statCol1, yPos + 16f, paintMetaVal)
                canvas.drawText("Eligible (≥75%): $eligibleCount", statCol2, yPos + 16f, paintBadgeGreen)
                canvas.drawText("Shortage (<75%): $shortageCount", statCol3, yPos + 16f, paintBadgeRed)
                val batchPct = if (totalLectures > 0 && rows.isNotEmpty()) {
                    val totalAtt = rows.sumOf { it.attended }
                    (totalAtt.toFloat() / (rows.size * totalLectures) * 100f)
                } else 100f
                canvas.drawText("Batch Average: ${String.format(Locale.US, "%.1f%%", batchPct)}", statCol4, yPos + 16f, paintMetaVal)

                yPos += 34f
            } else {
                // Secondary Page Header
                canvas.drawText("${classEntity.code} - ${classEntity.name} (Attendance Report Continued)", MARGIN, yPos + 10f, paintHeaderSub)
                yPos += 24f
            }

            // Draw Table Header
            val tableTop = yPos
            val tableRowHeight = 18f
            bgPaint.color = Color.rgb(30, 41, 59) // Slate 800
            canvas.drawRect(MARGIN, tableTop, PAGE_WIDTH - MARGIN, tableTop + tableRowHeight, bgPaint)

            val xSl = MARGIN + 6f
            val xUsn = MARGIN + 32f
            val xName = MARGIN + 120f
            val xCond = MARGIN + 320f
            val xAtt = MARGIN + 360f
            val xAbs = MARGIN + 400f
            val xPct = MARGIN + 440f
            val xStatus = MARGIN + 480f

            canvas.drawText("Sl", xSl, tableTop + 12.5f, paintTableHead)
            canvas.drawText("VTU USN", xUsn, tableTop + 12.5f, paintTableHead)
            canvas.drawText("Student Name", xName, tableTop + 12.5f, paintTableHead)
            canvas.drawText("Total", xCond, tableTop + 12.5f, paintTableHead)
            canvas.drawText("Att.", xAtt, tableTop + 12.5f, paintTableHead)
            canvas.drawText("Abs.", xAbs, tableTop + 12.5f, paintTableHead)
            canvas.drawText("%", xPct, tableTop + 12.5f, paintTableHead)
            canvas.drawText("Exam Status", xStatus, tableTop + 12.5f, paintTableHead)

            yPos += tableRowHeight

            // Table Rows
            val rowsForThisPage = if (pageNumber == 1) rowsPage1 else rowsOtherPages
            var drawnOnThisPage = 0

            while (currentRowIdx < rows.size && drawnOnThisPage < rowsForThisPage) {
                val row = rows[currentRowIdx]
                val rowTop = yPos
                val isEven = drawnOnThisPage % 2 == 0

                // Background
                if (row.isShortage) {
                    bgPaint.color = Color.rgb(254, 242, 242) // Light red tint for shortage
                } else if (isEven) {
                    bgPaint.color = Color.rgb(248, 250, 252) // Light slate
                } else {
                    bgPaint.color = Color.WHITE
                }
                canvas.drawRect(MARGIN, rowTop, PAGE_WIDTH - MARGIN, rowTop + tableRowHeight, bgPaint)

                // Divider line
                bgPaint.color = Color.rgb(226, 232, 240)
                canvas.drawLine(MARGIN, rowTop + tableRowHeight, PAGE_WIDTH - MARGIN, rowTop + tableRowHeight, bgPaint)

                // Content
                canvas.drawText(row.rollNo, xSl, rowTop + 12.5f, paintCellText)
                canvas.drawText(row.usn, xUsn, rowTop + 12.5f, paintCellMono)
                val displayName = if (row.name.length > 28) row.name.take(26) + "..." else row.name
                canvas.drawText(displayName, xName, rowTop + 12.5f, paintCellText)
                canvas.drawText("${totalLectures}", xCond, rowTop + 12.5f, paintCellText)
                canvas.drawText("${row.attended}", xAtt, rowTop + 12.5f, paintCellText)
                canvas.drawText("${row.absent}", xAbs, rowTop + 12.5f, paintCellText)

                val pctStr = String.format(Locale.US, "%.0f%%", row.percentage)
                if (row.isShortage) {
                    canvas.drawText(pctStr, xPct, rowTop + 12.5f, paintBadgeRed)
                    canvas.drawText("SHORTAGE", xStatus, rowTop + 12.5f, paintBadgeRed)
                } else {
                    canvas.drawText(pctStr, xPct, rowTop + 12.5f, paintBadgeGreen)
                    canvas.drawText("ELIGIBLE", xStatus, rowTop + 12.5f, paintBadgeGreen)
                }

                yPos += tableRowHeight
                currentRowIdx++
                drawnOnThisPage++
            }

            // Footer
            val footerY = PAGE_HEIGHT - 24f
            bgPaint.color = Color.rgb(203, 213, 225)
            canvas.drawLine(MARGIN, footerY - 10f, PAGE_WIDTH - MARGIN, footerY - 10f, bgPaint)

            canvas.drawText("VTU-FACULTY Academic System", MARGIN, footerY, paintMetaLabel)
            val pageNumStr = "Page $pageNumber of $totalPages"
            canvas.drawText(pageNumStr, (PAGE_WIDTH / 2f) - 20f, footerY, paintMetaLabel)

            if (pageNumber == totalPages) {
                canvas.drawText("Faculty Signature: ______________________", PAGE_WIDTH - MARGIN - 180f, footerY, paintMetaLabel)
            }

            pdfDocument.finishPage(page)
        }

        // Save PDF to cache/reports directory
        val reportsDir = File(context.cacheDir, "reports")
        if (!reportsDir.exists()) {
            reportsDir.mkdirs()
        }

        val sanitizedCode = classEntity.code.replace(Regex("[^a-zA-Z0-9_-]"), "_")
        val outputFile = File(reportsDir, "Attendance_Report_${sanitizedCode}_${System.currentTimeMillis()}.pdf")

        FileOutputStream(outputFile).use { outputStream ->
            pdfDocument.writeTo(outputStream)
        }
        pdfDocument.close()

        return outputFile
    }

    /**
     * Generates a clean, professional single-lecture attendance report formatted with:
     * - Subject Name and Subject Code
     * - Lecture Date and Time Window
     * - Topics Covered / Module Focus
     * - Student List with Roll No, VTU USN, Name, and Present/Absent status
     * - Session Statistics and Faculty Signature block
     */
    fun generateSessionAttendancePdf(
        context: Context,
        classEntity: ClassEntity,
        facultyProfile: FacultyProfile?,
        sessionDate: String,
        sessionTime: String,
        topicsCovered: String,
        module: String,
        students: List<StudentEntity>,
        attendanceMap: Map<Long, Boolean>
    ): File {
        val pdfDocument = PdfDocument()

        val sortedStudents = students.sortedBy { it.usn }
        val totalEnrolled = sortedStudents.size
        val presentCount = attendanceMap.values.count { it }
        val absentCount = totalEnrolled - presentCount
        val pct = if (totalEnrolled > 0) (presentCount.toFloat() / totalEnrolled * 100f) else 0f

        val paintHeaderTitle = Paint().apply {
            color = Color.rgb(15, 23, 42)
            textSize = 15f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            isAntiAlias = true
        }
        val paintHeaderSub = Paint().apply {
            color = Color.rgb(71, 85, 105)
            textSize = 9f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
            isAntiAlias = true
        }
        val paintMetaLabel = Paint().apply {
            color = Color.rgb(100, 116, 139)
            textSize = 8.5f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
            isAntiAlias = true
        }
        val paintMetaVal = Paint().apply {
            color = Color.rgb(15, 23, 42)
            textSize = 9.5f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            isAntiAlias = true
        }
        val paintTableHead = Paint().apply {
            color = Color.rgb(255, 255, 255)
            textSize = 8.5f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            isAntiAlias = true
        }
        val paintCellText = Paint().apply {
            color = Color.rgb(30, 41, 59)
            textSize = 8.5f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
            isAntiAlias = true
        }
        val paintCellMono = Paint().apply {
            color = Color.rgb(14, 116, 144)
            textSize = 8.5f
            typeface = Typeface.create(Typeface.MONOSPACE, Typeface.BOLD)
            isAntiAlias = true
        }
        val paintBadgeGreen = Paint().apply {
            color = Color.rgb(16, 185, 129)
            textSize = 8.5f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            isAntiAlias = true
        }
        val paintBadgeRed = Paint().apply {
            color = Color.rgb(239, 68, 68)
            textSize = 8.5f
            typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
            isAntiAlias = true
        }
        val bgPaint = Paint().apply { isAntiAlias = true }

        val rowsPage1 = 22
        val rowsOtherPages = 32
        val totalRows = sortedStudents.size
        val totalPages = if (totalRows <= rowsPage1) 1
        else 1 + ((totalRows - rowsPage1 + rowsOtherPages - 1) / rowsOtherPages)

        var currentRowIdx = 0

        for (pageNumber in 1..totalPages) {
            val pageInfo = PdfDocument.PageInfo.Builder(PAGE_WIDTH, PAGE_HEIGHT, pageNumber).create()
            val page = pdfDocument.startPage(pageInfo)
            val canvas: Canvas = page.canvas

            var yPos = MARGIN

            if (pageNumber == 1) {
                // Header Bar
                bgPaint.color = Color.rgb(2, 132, 199)
                canvas.drawRect(MARGIN, yPos, PAGE_WIDTH - MARGIN, yPos + 4f, bgPaint)
                yPos += 18f

                // University Title
                canvas.drawText("VISVESVARAYA TECHNOLOGICAL UNIVERSITY", MARGIN, yPos, paintHeaderTitle)
                yPos += 14f
                canvas.drawText("Official Lecture Roll-Call & Classroom Attendance Record", MARGIN, yPos, paintHeaderSub)
                yPos += 16f

                // Meta Box
                val metaBoxTop = yPos
                val metaBoxHeight = 60f
                bgPaint.color = Color.rgb(241, 245, 249)
                canvas.drawRoundRect(RectF(MARGIN, metaBoxTop, PAGE_WIDTH - MARGIN, metaBoxTop + metaBoxHeight), 6f, 6f, bgPaint)

                val col1 = MARGIN + 12f
                val col2 = MARGIN + 210f
                val col3 = MARGIN + 380f

                canvas.drawText("Subject / Course:", col1, metaBoxTop + 16f, paintMetaLabel)
                canvas.drawText("${classEntity.code} - ${classEntity.name}", col1, metaBoxTop + 28f, paintMetaVal)

                canvas.drawText("Faculty Member:", col1, metaBoxTop + 42f, paintMetaLabel)
                val fac = "${facultyProfile?.name ?: "Faculty Member"} (${facultyProfile?.role ?: "CSE"})"
                canvas.drawText(fac, col1 + 75f, metaBoxTop + 42f, paintMetaVal)

                canvas.drawText("Date & Time:", col2, metaBoxTop + 16f, paintMetaLabel)
                canvas.drawText("$sessionDate • $sessionTime", col2, metaBoxTop + 28f, paintMetaVal)

                canvas.drawText("Classroom:", col2, metaBoxTop + 42f, paintMetaLabel)
                canvas.drawText("${classEntity.semester} - Section ${classEntity.section}", col2 + 50f, metaBoxTop + 42f, paintMetaVal)

                canvas.drawText("Topic / Module:", col3, metaBoxTop + 16f, paintMetaLabel)
                val displayTopic = if (topicsCovered.isNotBlank()) topicsCovered.take(24) else if (module.isNotBlank()) module else "Regular Lecture"
                canvas.drawText(displayTopic, col3, metaBoxTop + 28f, paintMetaVal)

                canvas.drawText("Academic Year:", col3, metaBoxTop + 42f, paintMetaLabel)
                canvas.drawText(classEntity.academicYear, col3 + 68f, metaBoxTop + 42f, paintMetaVal)

                yPos += metaBoxHeight + 12f

                // Attendance Stats Bar
                bgPaint.color = Color.rgb(238, 242, 255)
                canvas.drawRoundRect(RectF(MARGIN, yPos, PAGE_WIDTH - MARGIN, yPos + 24f), 4f, 4f, bgPaint)

                val statCol1 = MARGIN + 16f
                val statCol2 = MARGIN + 140f
                val statCol3 = MARGIN + 280f
                val statCol4 = MARGIN + 410f

                canvas.drawText("Total Enrolled: $totalEnrolled", statCol1, yPos + 16f, paintMetaVal)
                canvas.drawText("Present: $presentCount", statCol2, yPos + 16f, paintBadgeGreen)
                canvas.drawText("Absent: $absentCount", statCol3, yPos + 16f, paintBadgeRed)
                canvas.drawText("Attendance: ${String.format(Locale.US, "%.1f%%", pct)}", statCol4, yPos + 16f, paintMetaVal)

                yPos += 34f
            } else {
                canvas.drawText("${classEntity.code} - ${classEntity.name} ($sessionDate Lecture Attendance Sheet)", MARGIN, yPos + 10f, paintHeaderSub)
                yPos += 24f
            }

            // Table Header
            val tableTop = yPos
            val tableRowHeight = 18f
            bgPaint.color = Color.rgb(30, 41, 59)
            canvas.drawRect(MARGIN, tableTop, PAGE_WIDTH - MARGIN, tableTop + tableRowHeight, bgPaint)

            val xSl = MARGIN + 8f
            val xUsn = MARGIN + 40f
            val xName = MARGIN + 150f
            val xStatus = PAGE_WIDTH - MARGIN - 90f

            canvas.drawText("Sl No", xSl, tableTop + 12.5f, paintTableHead)
            canvas.drawText("VTU USN", xUsn, tableTop + 12.5f, paintTableHead)
            canvas.drawText("Student Name", xName, tableTop + 12.5f, paintTableHead)
            canvas.drawText("Attendance Status", xStatus, tableTop + 12.5f, paintTableHead)

            yPos += tableRowHeight

            val rowsForThisPage = if (pageNumber == 1) rowsPage1 else rowsOtherPages
            var drawnOnThisPage = 0

            while (currentRowIdx < sortedStudents.size && drawnOnThisPage < rowsForThisPage) {
                val student = sortedStudents[currentRowIdx]
                val isPresent = attendanceMap[student.id] ?: false
                val rowTop = yPos
                val isEven = drawnOnThisPage % 2 == 0

                if (!isPresent) {
                    bgPaint.color = Color.rgb(254, 242, 242)
                } else if (isEven) {
                    bgPaint.color = Color.rgb(248, 250, 252)
                } else {
                    bgPaint.color = Color.WHITE
                }
                canvas.drawRect(MARGIN, rowTop, PAGE_WIDTH - MARGIN, rowTop + tableRowHeight, bgPaint)

                bgPaint.color = Color.rgb(226, 232, 240)
                canvas.drawLine(MARGIN, rowTop + tableRowHeight, PAGE_WIDTH - MARGIN, rowTop + tableRowHeight, bgPaint)

                val rollDisplay = student.rollNo.ifBlank { (currentRowIdx + 1).toString().padStart(2, '0') }
                canvas.drawText(rollDisplay, xSl, rowTop + 12.5f, paintCellText)
                canvas.drawText(student.usn, xUsn, rowTop + 12.5f, paintCellMono)
                val displayName = if (student.name.length > 34) student.name.take(32) + "..." else student.name
                canvas.drawText(displayName, xName, rowTop + 12.5f, paintCellText)

                if (isPresent) {
                    canvas.drawText("PRESENT (P)", xStatus, rowTop + 12.5f, paintBadgeGreen)
                } else {
                    canvas.drawText("ABSENT (A)", xStatus, rowTop + 12.5f, paintBadgeRed)
                }

                yPos += tableRowHeight
                currentRowIdx++
                drawnOnThisPage++
            }

            // Footer
            val footerY = PAGE_HEIGHT - 24f
            bgPaint.color = Color.rgb(203, 213, 225)
            canvas.drawLine(MARGIN, footerY - 10f, PAGE_WIDTH - MARGIN, footerY - 10f, bgPaint)

            canvas.drawText("VTU-FACULTY Official Session Log", MARGIN, footerY, paintMetaLabel)
            val pageNumStr = "Page $pageNumber of $totalPages"
            canvas.drawText(pageNumStr, (PAGE_WIDTH / 2f) - 20f, footerY, paintMetaLabel)

            if (pageNumber == totalPages) {
                canvas.drawText("Faculty Signature: ______________________", PAGE_WIDTH - MARGIN - 180f, footerY, paintMetaLabel)
            }

            pdfDocument.finishPage(page)
        }

        val reportsDir = File(context.cacheDir, "reports")
        if (!reportsDir.exists()) reportsDir.mkdirs()

        val sanitizedCode = classEntity.code.replace(Regex("[^a-zA-Z0-9_-]"), "_")
        val sanitizedDate = sessionDate.replace(" ", "_")
        val outputFile = File(reportsDir, "Attendance_${sanitizedCode}_${sanitizedDate}_${System.currentTimeMillis()}.pdf")

        FileOutputStream(outputFile).use { outputStream ->
            pdfDocument.writeTo(outputStream)
        }
        pdfDocument.close()

        return outputFile
    }

    /**
     * Creates an Intent to share or open the generated PDF file.
     */
    fun getSharePdfIntent(context: Context, pdfFile: File, title: String): Intent {
        val uri: Uri = FileProvider.getUriForFile(
            context,
            "${context.packageName}.provider",
            pdfFile
        )

        return Intent(Intent.ACTION_SEND).apply {
            type = "application/pdf"
            putExtra(Intent.EXTRA_STREAM, uri)
            putExtra(Intent.EXTRA_SUBJECT, title)
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
    }

    fun getViewPdfIntent(context: Context, pdfFile: File): Intent {
        val uri: Uri = FileProvider.getUriForFile(
            context,
            "${context.packageName}.provider",
            pdfFile
        )

        return Intent(Intent.ACTION_VIEW).apply {
            setDataAndType(uri, "application/pdf")
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
    }
}
