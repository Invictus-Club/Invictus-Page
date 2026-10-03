package com.example.data.model

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.Index
import androidx.room.PrimaryKey

@Entity(tableName = "faculty_profile")
data class FacultyProfile(
    @PrimaryKey val id: Int = 1,
    val name: String = "",
    val role: String = "Assistant Professor",
    val department: String = "Computer Science & Engineering",
    val college: String = "VTU Affiliated Institute",
    val minAttendanceRequirement: Float = 75f, // Faculty configured required attendance percentage
    val isOnboarded: Boolean = false,
    val updatedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "classes")
data class ClassEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val name: String,             // e.g. "Software Engineering & Agile"
    val code: String,             // e.g. "21CS51"
    val semester: String,         // e.g. "5th Sem"
    val section: String,          // e.g. "Sec A"
    val academicYear: String,     // e.g. "2024-25"
    val minAttendancePercentage: Float = 75f, // Class-specific attendance requirement percentage
    val colorHex: String = "#0284C7", // Visual identifier badge color
    val createdAt: Long = System.currentTimeMillis()
)

@Entity(
    tableName = "students",
    foreignKeys = [
        ForeignKey(
            entity = ClassEntity::class,
            parentColumns = ["id"],
            childColumns = ["classId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [Index("classId"), Index(value = ["classId", "usn"], unique = true)]
)
data class StudentEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val classId: Long,
    val name: String,
    val usn: String,              // e.g. "1VT21CS042" (sanitized uppercase)
    val rollNo: String = "",
    val isActive: Boolean = true,
    val createdAt: Long = System.currentTimeMillis()
)

@Entity(
    tableName = "lecture_sessions",
    foreignKeys = [
        ForeignKey(
            entity = ClassEntity::class,
            parentColumns = ["id"],
            childColumns = ["classId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [Index("classId"), Index("sessionDate")]
)
data class LectureSessionEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val classId: Long,
    val sessionDate: Long = System.currentTimeMillis(),
    val formattedDate: String,    // e.g. "30 Sep 2026"
    val startTime: String = "",   // e.g. "10:00 AM"
    val endTime: String = "",     // e.g. "11:00 AM"
    val module: String = "",      // e.g. "Module 3"
    val topicsCovered: String = "", // e.g. "Agile Scrums & Sprint Planning"
    val bulletPointsPlanned: String = "", // Bullet points planned before class
    val checkpointsCovered: String = "", // Interactive checkpoints verified after class (JSON or comma separated)
    val notes: String = "",       // Optional extra notes / remarks
    val totalStudents: Int = 0,
    val presentCount: Int = 0,
    val absentCount: Int = 0
)

@Entity(
    tableName = "attendance_records",
    foreignKeys = [
        ForeignKey(
            entity = LectureSessionEntity::class,
            parentColumns = ["id"],
            childColumns = ["sessionId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [Index("sessionId"), Index("studentId")]
)
data class AttendanceRecordEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val sessionId: Long,
    val studentId: Long,
    val studentName: String,
    val studentUsn: String,
    val isPresent: Boolean
)

@Entity(
    tableName = "timetable_slots",
    foreignKeys = [
        ForeignKey(
            entity = ClassEntity::class,
            parentColumns = ["id"],
            childColumns = ["classId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [Index("classId")]
)
data class TimetableSlotEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val classId: Long,
    val dayOfWeek: Int,          // 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
    val startTime: String,       // e.g. "09:00 AM"
    val endTime: String,         // e.g. "10:00 AM"
    val room: String = "LH-101"  // e.g. "LH-302" or "CSE Lab 3"
)

@Entity(
    tableName = "class_notes",
    foreignKeys = [
        ForeignKey(
            entity = ClassEntity::class,
            parentColumns = ["id"],
            childColumns = ["classId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [Index(value = ["classId"], unique = true)]
)
data class ClassNotesEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val classId: Long,
    val bulletPoints: String = "",
    val updatedAt: Long = System.currentTimeMillis()
)

@Entity(
    tableName = "class_pdfs",
    foreignKeys = [
        ForeignKey(
            entity = ClassEntity::class,
            parentColumns = ["id"],
            childColumns = ["classId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [Index("classId")]
)
data class ClassPdfEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val classId: Long,
    val fileName: String,
    val filePath: String,        // Local storage absolute path or URI
    val fileSizeBytes: Long = 0,
    val uploadedAt: Long = System.currentTimeMillis()
)
