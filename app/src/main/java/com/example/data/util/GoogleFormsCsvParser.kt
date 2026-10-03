package com.example.data.util

import com.example.data.model.StudentEntity
import java.util.Locale

object GoogleFormsCsvParser {

    data class ParsedStudent(
        val name: String,
        val usn: String,
        val rollNo: String = ""
    )

    /**
     * Parses CSV or TSV exported from Google Forms / Excel sheets.
     * Accurately handles:
     * - Commas inside quoted strings (e.g. "Kumar, Rahul")
     * - Tab-separated text directly pasted from Excel / Google Sheets
     * - UTF-8 Byte Order Marks (BOM) added by Excel
     * - Google Forms 'Timestamp' and 'Email' leading columns
     * - Varied headers: "Timestamp", "Name", "Student Name", "USN", "University Seat Number", etc.
     * - Deduplication by USN (last submission wins or unique)
     */
    fun parseGoogleFormsExport(content: String, classId: Long): List<StudentEntity> {
        val cleanContent = content.trimStart('\uFEFF') // Strip UTF-8 BOM
        val rawLines = cleanContent.lines()
            .map { it.trim() }
            .filter { it.isNotEmpty() }

        if (rawLines.isEmpty()) return emptyList()

        val parsedRows = rawLines.map { parseCsvLine(it) }.filter { it.isNotEmpty() }
        if (parsedRows.isEmpty()) return emptyList()

        val firstRow = parsedRows.first()
        val hasHeader = isHeaderRow(firstRow)

        var nameCol = -1
        var usnCol = -1
        var rollCol = -1

        if (hasHeader) {
            firstRow.forEachIndexed { index, headerRaw ->
                val h = headerRaw.lowercase().trim()
                when {
                    h.contains("usn") || h.contains("seat") || h.contains("university") || h.contains("reg") -> {
                        if (usnCol == -1) usnCol = index
                    }
                    h.contains("name") || h.contains("student") || h.contains("candidate") -> {
                        if (nameCol == -1) nameCol = index
                    }
                    h.contains("roll") || h.contains("sl") -> {
                        if (rollCol == -1) rollCol = index
                    }
                }
            }
        }

        val dataRows = if (hasHeader) parsedRows.drop(1) else parsedRows
        if (dataRows.isEmpty()) return emptyList()

        // If columns not identified from headers, infer from sample data rows
        if (nameCol == -1 || usnCol == -1) {
            val sample = dataRows.firstOrNull() ?: emptyList()
            var detectedUsn = -1
            var detectedName = -1

            sample.forEachIndexed { idx, value ->
                val v = value.trim()
                if (looksLikeUsn(v) && detectedUsn == -1) {
                    detectedUsn = idx
                } else if (v.isNotBlank() && !looksLikeTimestamp(v) && detectedName == -1) {
                    detectedName = idx
                }
            }

            if (detectedUsn != -1 && detectedName != -1) {
                usnCol = detectedUsn
                nameCol = detectedName
            } else {
                // Fallback: If 2 columns, assume [Name, USN] or [USN, Name]
                if (sample.size == 2) {
                    if (looksLikeUsn(sample[0])) {
                        usnCol = 0
                        nameCol = 1
                    } else {
                        nameCol = 0
                        usnCol = 1
                    }
                } else if (sample.size >= 3) {
                    // Typical Google Forms: [Timestamp, Name, USN] or [Timestamp, USN, Name]
                    if (looksLikeUsn(sample[1])) {
                        usnCol = 1
                        nameCol = 2
                    } else {
                        nameCol = 1
                        usnCol = 2
                    }
                }
            }
        }

        // Final safety fallback
        if (nameCol == -1) nameCol = 0
        if (usnCol == -1) usnCol = 1

        val studentMap = LinkedHashMap<String, ParsedStudent>() // Keyed by sanitized USN to deduplicate

        for (row in dataRows) {
            if (row.size > nameCol && row.size > usnCol) {
                var rawName = row[nameCol].trim()
                var rawUsn = row[usnCol].trim()

                // Check if swapped
                if (looksLikeUsn(rawName) && !looksLikeUsn(rawUsn)) {
                    val temp = rawName
                    rawName = rawUsn
                    rawUsn = temp
                }

                val sanitizedUsn = sanitizeUsn(rawUsn)
                val sanitizedName = sanitizeName(rawName)

                val roll = if (rollCol != -1 && row.size > rollCol) {
                    row[rollCol].trim()
                } else ""

                if (sanitizedUsn.isNotBlank() && sanitizedName.isNotBlank() && !sanitizedName.equals("name", ignoreCase = true)) {
                    studentMap[sanitizedUsn] = ParsedStudent(
                        name = sanitizedName,
                        usn = sanitizedUsn,
                        rollNo = roll
                    )
                }
            }
        }

        var rollCounter = 1
        return studentMap.values.map { parsed ->
            val rollNumber = if (parsed.rollNo.isNotBlank()) parsed.rollNo
            else (rollCounter++).toString().padStart(2, '0')

            StudentEntity(
                classId = classId,
                name = parsed.name,
                usn = parsed.usn,
                rollNo = rollNumber
            )
        }
    }

    /**
     * Splits a CSV line respecting quoted values containing commas or tabs.
     */
    fun parseCsvLine(line: String): List<String> {
        val delimiter = when {
            line.contains("\t") -> '\t'
            line.contains(";") && !line.contains(",") -> ';'
            else -> ','
        }

        val tokens = mutableListOf<String>()
        val sb = StringBuilder()
        var inQuotes = false
        var i = 0

        while (i < line.length) {
            val c = line[i]
            when {
                c == '"' -> {
                    if (inQuotes && i + 1 < line.length && line[i + 1] == '"') {
                        sb.append('"')
                        i++ // Skip escaped quote
                    } else {
                        inQuotes = !inQuotes
                    }
                }
                c == delimiter && !inQuotes -> {
                    tokens.add(sb.toString().trim())
                    sb.clear()
                }
                else -> {
                    sb.append(c)
                }
            }
            i++
        }
        tokens.add(sb.toString().trim())
        return tokens
    }

    private fun isHeaderRow(row: List<String>): Boolean {
        return row.any { col ->
            val lower = col.lowercase()
            lower.contains("usn") || lower.contains("name") || lower.contains("timestamp") ||
                    lower.contains("email") || lower.contains("seat") || lower.contains("roll")
        }
    }

    private fun looksLikeTimestamp(value: String): Boolean {
        val v = value.trim()
        return v.contains("/") && v.contains(":") ||
                v.contains("-") && v.contains(":") ||
                v.lowercase().contains("am") ||
                v.lowercase().contains("pm")
    }

    private fun looksLikeUsn(value: String): Boolean {
        val clean = value.replace(" ", "").trim()
        val hasLetter = clean.any { it.isLetter() }
        val hasDigit = clean.any { it.isDigit() }
        return hasLetter && hasDigit && clean.length in 7..14
    }

    fun sanitizeUsn(usn: String): String {
        return usn.replace(" ", "").trim().uppercase(Locale.ROOT)
    }

    fun sanitizeName(name: String): String {
        val cleaned = name.replace("\"", "").trim()
        // Capitalize each word properly if in all caps or all lowercase
        return cleaned.split(" ")
            .filter { it.isNotBlank() }
            .joinToString(" ") { word ->
                if (word.length <= 1) word.uppercase()
                else word.first().uppercase() + word.drop(1)
            }
    }
}
