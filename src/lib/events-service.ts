import { supabase } from "@/lib/supabase";
import fallbackEvents, { EventItem } from "@/data/events";

export async function getEvents(): Promise<EventItem[]> {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackEvents;
    }

    // Map database snake_case to frontend EventItem interface
    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      date: row.date,
      category: row.category,
      status: row.status,
      location: row.location,
      prizePool: row.prize_pool || undefined,
      teamSize: row.team_size || undefined,
      summary: row.summary,
      description: row.description || row.summary,
      tracks: Array.isArray(row.tracks) ? row.tracks : [],
      schedule: Array.isArray(row.schedule) ? row.schedule : [],
      mentorsOrJudges: Array.isArray(row.mentors_or_judges) ? row.mentors_or_judges : [],
    }));
  } catch (err) {
    console.warn("Failed to fetch events from Supabase, using fallback:", err);
    return fallbackEvents;
  }
}
