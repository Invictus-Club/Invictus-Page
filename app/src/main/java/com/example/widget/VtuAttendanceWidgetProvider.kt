package com.example.widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import com.example.MainActivity
import com.example.R
import com.example.data.db.AppDatabase
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.launch
import java.util.Calendar

class VtuAttendanceWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        val scope = CoroutineScope(Dispatchers.IO)
        scope.launch {
            val db = AppDatabase.getInstance(context)
            val dao = db.attendanceDao()

            val todayCal = Calendar.getInstance()
            val dayOfWeek = todayCal.get(Calendar.DAY_OF_WEEK)
            val currentDayIndex = if (dayOfWeek in 2..7) dayOfWeek - 1 else 1

            val todaySlots = dao.getTimetableSlotsForDay(currentDayIndex).firstOrNull() ?: emptyList()
            val activeSlot = todaySlots.firstOrNull()

            val classEntity = if (activeSlot != null) {
                dao.getClassById(activeSlot.classId).firstOrNull()
            } else {
                dao.getAllClasses().firstOrNull()?.firstOrNull()
            }

            for (widgetId in appWidgetIds) {
                val views = RemoteViews(context.packageName, R.layout.vtu_attendance_widget)

                if (classEntity != null) {
                    views.setTextViewText(R.id.widget_class_code, "${classEntity.code} • ${classEntity.semester} ${classEntity.section}")
                    views.setTextViewText(R.id.widget_class_name, classEntity.name)
                    if (activeSlot != null) {
                        views.setTextViewText(R.id.widget_class_time_room, "${activeSlot.startTime} - ${activeSlot.endTime} • ${activeSlot.room}")
                        views.setTextViewText(R.id.widget_status_tag, "NEXT UP")
                    } else {
                        views.setTextViewText(R.id.widget_class_time_room, "Scheduled Course")
                        views.setTextViewText(R.id.widget_status_tag, "ACTIVE")
                    }

                    // Intent to launch attendance immediately
                    val intent = Intent(context, MainActivity::class.java).apply {
                        action = ACTION_QUICK_ATTENDANCE
                        putExtra(EXTRA_CLASS_ID, classEntity.id)
                        flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                    }
                    val pendingIntent = PendingIntent.getActivity(
                        context,
                        widgetId,
                        intent,
                        PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
                    )
                    views.setOnClickPendingIntent(R.id.widget_btn_take_attendance, pendingIntent)
                    views.setOnClickPendingIntent(R.id.widget_root, pendingIntent)
                } else {
                    views.setTextViewText(R.id.widget_class_code, "No Classes")
                    views.setTextViewText(R.id.widget_class_name, "Tap to open VTU-FACULTY")
                    views.setTextViewText(R.id.widget_class_time_room, "Create a class to get started")

                    val intent = Intent(context, MainActivity::class.java).apply {
                        flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                    }
                    val pendingIntent = PendingIntent.getActivity(
                        context,
                        widgetId,
                        intent,
                        PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
                    )
                    views.setOnClickPendingIntent(R.id.widget_btn_take_attendance, pendingIntent)
                    views.setOnClickPendingIntent(R.id.widget_root, pendingIntent)
                }

                appWidgetManager.updateAppWidget(widgetId, views)
            }
        }
    }

    companion object {
        const val ACTION_QUICK_ATTENDANCE = "com.example.vtu.ACTION_QUICK_ATTENDANCE"
        const val EXTRA_CLASS_ID = "EXTRA_CLASS_ID"
    }
}
