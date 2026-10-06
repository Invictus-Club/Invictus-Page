<div align="center">
  <h1 align="center">🏆 Invictus Club</h1>
  <p align="center">
    <strong>The Elite Developer Hub for VTU Students</strong>
  </p>
  <p align="center">
    A premium, ultra-modern Next.js platform showcasing the culture, vision, events, and victories of the Invictus squad.
  </p>
</div>

<br />

## 🚀 Quick Start

To get the project running locally on your machine:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site in action.

---

## 📂 Project Structure

This project is built using the Next.js App Router. Here's a quick map of where everything lives:

- **`src/app/`** - The main application code and routes.
  - **`page.tsx`** - The landing page.
  - **`events/`** - The Timeline / Events subpage.
  - **`wins/`** - The Hall of Fame subpage.
- **`src/data/`** - **THIS IS WHERE YOU MANAGE CONTENT.** (See below)
- **`src/app/api/images/`** - A custom internal API that seamlessly serves your photos to the frontend.

---

## 🛠️ How to Maintain Content

We've designed the codebase so you never have to touch the complex React/UI code just to add a new event or a hackathon win. All content is driven by simple configuration files.

### 1. Adding/Editing "Hall of Fame" Wins
All hackathon wins are managed in **`src/data/wins.ts`** and their photos live in **`src/data/photos/`**.

**To add a new win:**
1. Pick the next available ID number (e.g., if the last one was `14`, use `15`).
2. Create a new folder for your images: `src/data/photos/15/`.
3. Drop your `.jpg` or `.png` images into that folder. (We recommend naming them simply, like `1.jpg`, `2.jpg`).
4. Open `src/data/wins.ts` and add a new block to the array:
   ```typescript
   {
     id: "15",
     name: "Awesome Web3 Hackathon",
     location: "Online",
     position: "1st Place",
     displayDate: "Oct 2026",
     sortDate: "2026-10-01", // Used to auto-sort chronologically
     images: [
       "/api/images/15/1.jpg", 
       "/api/images/15/2.jpg"
     ]
   }
   ```
*That's it! The homepage and Hall of Fame page will automatically update, create the image sliders, and apply all animations.*

### 2. Adding/Editing Events
All events are managed in **`src/data/events.ts`**.

**To add a new event:**
1. Open `src/data/events.ts`.
2. Add a new block to the array:
   ```typescript
   {
     id: "new-unique-id",
     name: "Next-Gen AI Workshop",
     date: "2026-11-15",
     category: "WORKSHOP",
     status: "UPCOMING" // Valid options: "UPCOMING", "ONGOING", "PAST"
   }
   ```
*The Events page will automatically categorize it into the correct section based on the `status` you provide.*

---

## 🎨 Tech Stack Highlights
- **Framework:** Next.js 14+ (App Router)
- **Styling:** TailwindCSS
- **Animations:** Framer Motion (Butter-smooth fisheye swoops, spring physics) & GSAP (ScrollTriggers)
- **3D Graphics:** React Three Fiber / Drei (Abstract wireframes, animated Torus knots)
