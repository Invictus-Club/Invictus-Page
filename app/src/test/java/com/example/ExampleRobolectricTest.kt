package com.example

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.example.data.model.ClassEntity
import com.example.data.model.StudentEntity
import com.example.data.util.GoogleFormsCsvParser
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [36])
class ExampleRobolectricTest {

    @Test
    fun `read string from context`() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        val appName = context.getString(R.string.app_name)
        assertEquals("VTU-FACULTY", appName)
    }

    @Test
    fun `vtu attendance threshold calculation`() {
        val totalSessions = 20
        val attendedSessions = 14
        val percentage = attendedSessions.toFloat() / totalSessions * 100f
        assertEquals(70.0f, percentage, 0.01f)
        assertTrue("Under 75% must be shortage", percentage < 75.0f)
    }

    @Test
    fun `vtu eligible attendance calculation`() {
        val totalSessions = 20
        val attendedSessions = 18
        val percentage = attendedSessions.toFloat() / totalSessions * 100f
        assertEquals(90.0f, percentage, 0.01f)
        assertTrue("Equal or above 75% must be eligible", percentage >= 75.0f)
    }

    @Test
    fun `parse google forms export with timestamp name and usn`() {
        val googleFormsCsv = """Timestamp,Student Name,University Seat Number (USN)
2026/09/30 10:14:02 AM GMT+5:30,"Sharma, Aarav",1vt22cs001
2026/09/30 10:15:45 AM GMT+5:30,Aditi Rao,1VT22CS002
2026/09/30 10:16:12 AM GMT+5:30,Aditi Rao,1VT22CS002"""

        val parsed = GoogleFormsCsvParser.parseGoogleFormsExport(googleFormsCsv, classId = 10L)
        assertEquals(2, parsed.size)
        assertEquals("1VT22CS001", parsed[0].usn)
        assertEquals("Sharma, Aarav", parsed[0].name)
        assertEquals("1VT22CS002", parsed[1].usn)
        assertEquals("Aditi Rao", parsed[1].name)
    }

    @Test
    fun `student mapping and roll number generation`() {
        val twoColCsv = """Name,USN
Chetan Kumar,1VT22CS006
Deepa Patil,1VT22CS007"""

        val parsed = GoogleFormsCsvParser.parseGoogleFormsExport(twoColCsv, classId = 5L)
        assertEquals(2, parsed.size)
        assertEquals("01", parsed[0].rollNo)
        assertEquals("1VT22CS006", parsed[0].usn)
        assertEquals("Chetan Kumar", parsed[0].name)
        assertEquals("02", parsed[1].rollNo)
    }

    @Test
    fun `altered faculty attendance requirement calculation`() {
        // Faculty alters requirement to 80%
        val customFacultyRequirement = 80.0f
        val totalSessions = 10
        val attendedSessions = 7 // 70%
        val percentage = attendedSessions.toFloat() / totalSessions * 100f

        val isShortage = percentage < customFacultyRequirement
        assertTrue("70% must be shortage under 80% custom requirement", isShortage)

        val attendedSessions8 = 8 // 80%
        val percentage8 = attendedSessions8.toFloat() / totalSessions * 100f
        val isEligible = percentage8 >= customFacultyRequirement
        assertTrue("80% must be eligible under 80% custom requirement", isEligible)
    }

    @Test
    fun `topic checkpoints after class verification logic`() {
        val plannedBulletPoints = listOf("Agile Scrum", "Sprint Planning", "Burndown Charts")
        val checkpointsCovered = mapOf(
            "Agile Scrum" to true,
            "Sprint Planning" to true,
            "Burndown Charts" to false
        )

        val coveredTopics = plannedBulletPoints.filter { checkpointsCovered[it] == true }
        val pendingTopics = plannedBulletPoints.filter { checkpointsCovered[it] != true }

        assertEquals(2, coveredTopics.size)
        assertEquals(1, pendingTopics.size)
        assertEquals("Burndown Charts", pendingTopics[0])
        assertEquals("Agile Scrum, Sprint Planning", coveredTopics.joinToString(", "))
    }
}
