package com.example.data.dao

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.example.data.model.AttendanceRecordEntity
import com.example.data.model.ClassEntity
import com.example.data.model.ClassNotesEntity
import com.example.data.model.ClassPdfEntity
import com.example.data.model.FacultyProfile
import com.example.data.model.LectureSessionEntity
import com.example.data.model.StudentEntity
import com.example.data.model.TimetableSlotEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface AttendanceDao {

    // --- Faculty Profile ---
    @Query("SELECT * FROM faculty_profile WHERE id = 1 LIMIT 1")
    fun getProfile(): Flow<FacultyProfile?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertProfile(profile: FacultyProfile)

    @Query("UPDATE faculty_profile SET minAttendanceRequirement = :percentage WHERE id = 1")
    suspend fun updateFacultyAttendanceRequirement(percentage: Float)

    // --- Classes ---
    @Query("SELECT * FROM classes ORDER BY createdAt DESC")
    fun getAllClasses(): Flow<List<ClassEntity>>

    @Query("SELECT * FROM classes WHERE id = :id LIMIT 1")
    fun getClassById(id: Long): Flow<ClassEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertClass(classEntity: ClassEntity): Long

    @Update
    suspend fun updateClass(classEntity: ClassEntity)

    @Query("UPDATE classes SET minAttendancePercentage = :percentage WHERE id = :classId")
    suspend fun updateClassAttendanceRequirement(classId: Long, percentage: Float)

    @Delete
    suspend fun deleteClass(classEntity: ClassEntity)

    @Query("DELETE FROM classes WHERE id = :id")
    suspend fun deleteClassById(id: Long)

    // --- Students ---
    @Query("SELECT * FROM students WHERE classId = :classId ORDER BY usn ASC")
    fun getStudentsForClass(classId: Long): Flow<List<StudentEntity>>

    @Query("SELECT COUNT(*) FROM students WHERE classId = :classId")
    fun getStudentCountForClass(classId: Long): Flow<Int>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertStudent(student: StudentEntity): Long

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertStudents(students: List<StudentEntity>): List<Long>

    @Update
    suspend fun updateStudent(student: StudentEntity)

    @Query("DELETE FROM students WHERE id = :id")
    suspend fun deleteStudentById(id: Long)

    @Query("DELETE FROM students WHERE classId = :classId")
    suspend fun deleteAllStudentsForClass(classId: Long)

    // --- Lecture Sessions ---
    @Query("SELECT * FROM lecture_sessions WHERE classId = :classId ORDER BY sessionDate DESC, id DESC")
    fun getSessionsForClass(classId: Long): Flow<List<LectureSessionEntity>>

    @Query("SELECT * FROM lecture_sessions ORDER BY sessionDate DESC, id DESC")
    fun getAllSessions(): Flow<List<LectureSessionEntity>>

    @Query("SELECT * FROM lecture_sessions WHERE id = :id LIMIT 1")
    fun getSessionById(id: Long): Flow<LectureSessionEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSession(session: LectureSessionEntity): Long

    @Update
    suspend fun updateSession(session: LectureSessionEntity)

    @Query("DELETE FROM lecture_sessions WHERE id = :id")
    suspend fun deleteSessionById(id: Long)

    // --- Attendance Records ---
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAttendanceRecords(records: List<AttendanceRecordEntity>)

    @Query("SELECT * FROM attendance_records WHERE sessionId = :sessionId ORDER BY studentUsn ASC")
    fun getRecordsForSession(sessionId: Long): Flow<List<AttendanceRecordEntity>>

    @Query("SELECT ar.* FROM attendance_records ar INNER JOIN lecture_sessions ls ON ar.sessionId = ls.id WHERE ls.classId = :classId")
    fun getAllRecordsForClass(classId: Long): Flow<List<AttendanceRecordEntity>>

    // --- Timetable Slots ---
    @Query("SELECT * FROM timetable_slots ORDER BY dayOfWeek ASC, startTime ASC")
    fun getAllTimetableSlots(): Flow<List<TimetableSlotEntity>>

    @Query("SELECT * FROM timetable_slots WHERE dayOfWeek = :dayOfWeek ORDER BY startTime ASC")
    fun getTimetableSlotsForDay(dayOfWeek: Int): Flow<List<TimetableSlotEntity>>

    @Query("SELECT * FROM timetable_slots WHERE classId = :classId ORDER BY dayOfWeek ASC, startTime ASC")
    fun getTimetableSlotsForClass(classId: Long): Flow<List<TimetableSlotEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTimetableSlot(slot: TimetableSlotEntity): Long

    @Query("DELETE FROM timetable_slots WHERE id = :id")
    suspend fun deleteTimetableSlotById(id: Long)

    // --- Class Notes & Key Bullet Points ---
    @Query("SELECT * FROM class_notes WHERE classId = :classId LIMIT 1")
    fun getClassNotes(classId: Long): Flow<ClassNotesEntity?>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertClassNotes(notes: ClassNotesEntity)

    // --- Class Uploaded PDFs ---
    @Query("SELECT * FROM class_pdfs WHERE classId = :classId ORDER BY uploadedAt DESC")
    fun getClassPdfs(classId: Long): Flow<List<ClassPdfEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertClassPdf(pdf: ClassPdfEntity): Long

    @Query("DELETE FROM class_pdfs WHERE id = :id")
    suspend fun deleteClassPdfById(id: Long)
}
