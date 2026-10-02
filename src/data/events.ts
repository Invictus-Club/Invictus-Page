/**
 * HOW TO ADD / EDIT / REMOVE AN EVENT
 * ===================================
 * 1. Add a new object to the array below.
 * 2. `status` must be one of: "UPCOMING", "ONGOING", or "PAST".
 * 3. The page will automatically categorize and display them based on their status.
 */

const eventsData = [
  {
    "id": "event-1",
    "name": "VTU Central Hackathon",
    "date": "2026-10-12",
    "category": "HACKATHON",
    "status": "UPCOMING"
  },
  {
    "id": "event-2",
    "name": "AI Research Symposium",
    "date": "2026-11-04",
    "category": "RESEARCH",
    "status": "UPCOMING"
  },
  {
    "id": "event-3",
    "name": "Invictus Pitch Day",
    "date": "2026-12-15",
    "category": "PROJECTS",
    "status": "UPCOMING"
  },
  {
    "id": "event-4",
    "name": "Ongoing Build Week",
    "date": "2026-10-01",
    "category": "BUILD",
    "status": "ONGOING"
  },
  {
    "id": "event-5",
    "name": "Past Blockchain Expo",
    "date": "2026-09-10",
    "category": "EXPO",
    "status": "PAST"
  },
  {
    "id": "event-6",
    "name": "Spring Hackathon 2026",
    "date": "2026-03-20",
    "category": "HACKATHON",
    "status": "PAST"
  }
];

export default eventsData;