import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";
import fallbackWins from "@/data/wins";

export interface WinItem {
  id: string;
  name: string;
  location: string;
  position: string;
  displayDate: string;
  sortDate: string;
  images: string[];
}

export async function getWins(): Promise<WinItem[]> {
  try {
    const { data, error } = await supabase
      .from("wins")
      .select("*")
      .order("sort_date", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((row: any) => ({
        id: String(row.id),
        name: row.name,
        location: row.location,
        position: row.position,
        displayDate: row.display_date,
        sortDate: row.sort_date,
        images: Array.isArray(row.images) ? row.images : [],
      }));
    }
  } catch (err) {
    console.warn("Supabase wins query failed, falling back to local files:", err);
  }

  // Fallback to local files
  return fallbackWins.map((win) => {
    const dir = path.join(process.cwd(), "public", "photos", win.id);
    let images: string[] = [];
    if (fs.existsSync(dir)) {
      images = fs
        .readdirSync(dir)
        .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
        .map((f) => `/photos/${win.id}/${f}`);
    }
    return { ...win, images };
  });
}
