import { EventItem } from "@/data/events";

export interface CalendarDay {
  dayNumber: number;
  dateString: string; // 'YYYY-MM-DD'
  isCurrentMonth: boolean;
  isToday: boolean;
  events: EventItem[];
}

/**
 * Category styling metadata and color mappings
 */
export interface CategoryMeta {
  label: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  dotColor: string;
  glowColor: string;
}

export const CATEGORY_META_MAP: Record<string, CategoryMeta> = {
  HACKATHON: {
    label: "HACKATHON",
    badgeBg: "bg-amber-500/10",
    badgeBorder: "border-amber-400/40",
    badgeText: "text-[#FFD60A]",
    dotColor: "#FFD60A",
    glowColor: "rgba(255, 214, 10, 0.4)",
  },
  BUILD: {
    label: "BUILD SPRINT",
    badgeBg: "bg-emerald-500/10",
    badgeBorder: "border-emerald-400/40",
    badgeText: "text-emerald-400",
    dotColor: "#34d399",
    glowColor: "rgba(52, 211, 153, 0.4)",
  },
  RESEARCH: {
    label: "RESEARCH",
    badgeBg: "bg-cyan-500/10",
    badgeBorder: "border-cyan-400/40",
    badgeText: "text-cyan-400",
    dotColor: "#22d3ee",
    glowColor: "rgba(34, 211, 238, 0.4)",
  },
  WORKSHOP: {
    label: "WORKSHOP",
    badgeBg: "bg-purple-500/10",
    badgeBorder: "border-purple-400/40",
    badgeText: "text-purple-400",
    dotColor: "#c084fc",
    glowColor: "rgba(192, 132, 252, 0.4)",
  },
  PROJECTS: {
    label: "DEMO ARENA",
    badgeBg: "bg-rose-500/10",
    badgeBorder: "border-rose-400/40",
    badgeText: "text-rose-400",
    dotColor: "#fb7185",
    glowColor: "rgba(251, 113, 133, 0.4)",
  },
  "CODING CONTEST": {
    label: "CODE SPRINT",
    badgeBg: "bg-blue-500/10",
    badgeBorder: "border-blue-400/40",
    badgeText: "text-blue-400",
    dotColor: "#60a5fa",
    glowColor: "rgba(96, 165, 250, 0.4)",
  },
  SEMINAR: {
    label: "SEMINAR",
    badgeBg: "bg-indigo-500/10",
    badgeBorder: "border-indigo-400/40",
    badgeText: "text-indigo-400",
    dotColor: "#818cf8",
    glowColor: "rgba(129, 140, 248, 0.4)",
  },
  EXPO: {
    label: "EXPO",
    badgeBg: "bg-orange-500/10",
    badgeBorder: "border-orange-400/40",
    badgeText: "text-orange-400",
    dotColor: "#fb923c",
    glowColor: "rgba(251, 146, 60, 0.4)",
  },
};

export const DEFAULT_CATEGORY_META: CategoryMeta = {
  label: "TOURNAMENT",
  badgeBg: "bg-zinc-800/60",
  badgeBorder: "border-zinc-700",
  badgeText: "text-zinc-300",
  dotColor: "#a1a1aa",
  glowColor: "rgba(161, 161, 170, 0.3)",
};

export function getCategoryMeta(category: string): CategoryMeta {
  return CATEGORY_META_MAP[category] || DEFAULT_CATEGORY_META;
}

/**
 * Format a Date object to YYYY-MM-DD
 */
export function formatIsoDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Check if a date string falls within an event date or date range
 */
export function isEventOnDate(event: EventItem, dateStr: string): boolean {
  if (event.date === dateStr) return true;
  if (event.endDate && event.date <= dateStr && dateStr <= event.endDate) {
    return true;
  }
  return false;
}

/**
 * Generate full 35 or 42 grid cells for the given month view
 */
export function generateMonthGrid(
  year: number,
  month: number, // 0 = Jan, 11 = Dec
  events: EventItem[],
  todayIsoStr: string
): CalendarDay[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun, 6 = Sat
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const grid: CalendarDay[] = [];

  // 1. Previous month trailing days
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const dayNumber = daysInPrevMonth - i;
    const prevDate = new Date(year, month - 1, dayNumber);
    const dateString = formatIsoDate(prevDate);
    grid.push({
      dayNumber,
      dateString,
      isCurrentMonth: false,
      isToday: dateString === todayIsoStr,
      events: events.filter((ev) => isEventOnDate(ev, dateString)),
    });
  }

  // 2. Current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const currDate = new Date(year, month, day);
    const dateString = formatIsoDate(currDate);
    grid.push({
      dayNumber: day,
      dateString,
      isCurrentMonth: true,
      isToday: dateString === todayIsoStr,
      events: events.filter((ev) => isEventOnDate(ev, dateString)),
    });
  }

  // 3. Next month leading days (to complete 5 or 6 rows of 7 = 35 or 42 cells)
  const remainingCells = (7 - (grid.length % 7)) % 7;
  const totalTarget = grid.length + remainingCells < 35 ? 35 - grid.length : remainingCells;

  for (let day = 1; day <= totalTarget; day++) {
    const nextDate = new Date(year, month + 1, day);
    const dateString = formatIsoDate(nextDate);
    grid.push({
      dayNumber: day,
      dateString,
      isCurrentMonth: false,
      isToday: dateString === todayIsoStr,
      events: events.filter((ev) => isEventOnDate(ev, dateString)),
    });
  }

  return grid;
}

/**
 * Format date for friendly human reading
 */
export function formatFriendlyDate(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Find the closest upcoming event from an array
 */
export function findNearestUpcomingEvent(
  events: EventItem[],
  currentDateIso: string
): EventItem | null {
  const upcoming = events.filter((ev) => ev.status === "UPCOMING" || ev.status === "ONGOING");
  if (upcoming.length === 0) return events[0] || null;

  // Prefer events closest to or after currentDateIso
  const sorted = [...upcoming].sort((a, b) => {
    return Math.abs(new Date(a.date).getTime() - new Date(currentDateIso).getTime()) -
      Math.abs(new Date(b.date).getTime() - new Date(currentDateIso).getTime());
  });

  return sorted[0] || upcoming[0] || null;
}
