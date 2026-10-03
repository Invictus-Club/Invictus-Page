package com.example.data.db

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.example.data.dao.AttendanceDao
import com.example.data.model.AttendanceRecordEntity
import com.example.data.model.ClassEntity
import com.example.data.model.ClassNotesEntity
import com.example.data.model.ClassPdfEntity
import com.example.data.model.FacultyProfile
import com.example.data.model.LectureSessionEntity
import com.example.data.model.StudentEntity
import com.example.data.model.TimetableSlotEntity

@Database(
    entities = [
        FacultyProfile::class,
        ClassEntity::class,
        StudentEntity::class,
        LectureSessionEntity::class,
        AttendanceRecordEntity::class,
        TimetableSlotEntity::class,
        ClassNotesEntity::class,
        ClassPdfEntity::class
    ],
    version = 3,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {

    abstract fun attendanceDao(): AttendanceDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "vtu_faculty_database"
                )
                    .fallbackToDestructiveMigration()
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
}
