# 🚀 Invictus Technical Club & Faculty Portal

<div align="center">

![Invictus Banner](https://img.shields.io/badge/Invictus-Technical%20Club-0284C7?style=for-the-badge&logo=rocket&logoColor=white)
![Supabase Enabled](https://img.shields.io/badge/Supabase-Connected-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Android Studio](https://img.shields.io/badge/Android-Jetpack%20Compose-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![VTU Academic](https://img.shields.io/badge/VTU-Academic%20Suite-4A5568?style=for-the-badge&logo=graduation-cap&logoColor=white)

---

### 🌟 *Connect. Create. Travel the World. Build Real-World Impact.*

</div>

---

## ⚡ About Invictus Technical Club

**Invictus** is an elite student-led technical community focused on empowering engineers, developers, and innovators to push beyond traditional classroom boundaries. We bridge the gap between academic theory and industry engineering standards by working on real-world products, hosting hackathons, and competing in global developer challenges.

> [!IMPORTANT]
> **Why Join Invictus?**
> - 🌐 **Travel & Explore Different Cities:** Represent Invictus at national and international hackathons, tech summits, and developer conferences across major tech hubs.
> - 🤝 **Elite Networking Opportunities:** Connect directly with senior software engineers, tech founders, research labs, and an active alumni network.
> - 🛠️ **Real-World Portfolio Projects:** Stop building generic todo apps. Build scalable production software used by real users and faculty.
> - 🚀 **Career Fast-Tracking:** Get referral opportunities, internship placements, and hands-on experience with modern cloud stacks like Supabase, Jetpack Compose, and AI integration.

---

## ✨ Key Features & Ecosystem

| Feature | Description |
| :--- | :--- |
| **⚡ Instant Attendance & Timetable** | One-tap lecture check-ins synced directly with live college timetables and class schedules. |
| **📊 Smart Shortage Analytics** | Automatic calculations for VTU attendance shortage thresholds (75% rule) with instant PDF export. |
| **📂 Notes & PDFs Repository** | Seamless attachment of syllabus notes, lecture logs, and study materials per class module. |
| **🌐 Cloud Backend Sync** | Instant authentication and real-time database synchronization via Supabase backend. |
| **🎯 Authentic VTU USN Support** | Pre-loaded support for authentic VTU student seat numbers (e.g. `2VX24CS125`) and standard schemes (`BCS501`). |

---

## ⚙️ Cloud & Environment Setup

This project uses **Supabase** for backend storage and authentication.

> [!WARNING]
> Never commit actual credentials to public repositories. Place your credentials inside `.env` (which is included in `.gitignore`).

### Environment Configuration (`.env`)
Create a local `.env` file in the project root based on `.env.example`:

```env
# Supabase Cloud Integration (Keep local, do NOT commit)
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_KEY
```

---

## 🛠️ Getting Started Locally

### Prerequisites
- [Android Studio Ladybug (2024.2.1+)](https://developer.android.com/studio)
- JDK 17+ / Android SDK 34+

### Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Invictus-Club/Invictus-Page.git
   cd Invictus-Page
   ```

2. **Configure Environment Variables:**
   Copy `.env.example` to `.env` and fill in your private Supabase keys:
   ```bash
   cp .env.example .env
   ```

3. **Open in Android Studio:**
   - Launch Android Studio -> **Open Existing Project** -> Select repository directory.
   - Allow Gradle sync to download required dependencies.

4. **Build & Run:**
   - Connect an Android device or start an emulator.
   - Select `app` target and click **Run** (or press `Shift + F10`).
   - Generated APK location: `app/build/outputs/apk/debug/app-debug.apk`

---

<div align="center">
  <b>Built with ❤️ by Invictus Club Developers</b>
</div>
