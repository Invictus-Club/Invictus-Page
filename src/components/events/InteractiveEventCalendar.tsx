"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Filter, 
  Clock, 
  MapPin, 
  Trophy, 
  Users, 
  ExternalLink, 
  Share2, 
  Check, 
  Sparkles, 
  ArrowUpRight,
  Flame,
  Layers
} from "lucide-react";
import eventsData, { EventItem } from "@/data/events";
import { 
  generateMonthGrid, 
  formatIsoDate, 
  formatFriendlyDate, 
  getCategoryMeta, 
  findNearestUpcomingEvent,
  CalendarDay 
} from "@/lib/calendar-utils";

interface InteractiveEventCalendarProps {
  initialEvents?: EventItem[];
  className?: string;
}

const MONTH_NAMES = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

const WEEKDAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function InteractiveEventCalendar({
  initialEvents = eventsData,
  className = "",
}: InteractiveEventCalendarProps) {
  // Safe SSR date fallback (defaults to October 2026)
  const [viewDate, setViewDate] = useState<Date>(() => new Date(2026, 9, 1));
  const [todayIso, setTodayIso] = useState<string>("2026-10-26");
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-26");
  const [stagedEventId, setStagedEventId] = useState<string>("event-midnight-hacker-jam");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "UPCOMING" | "ONGOING" | "PAST">("ALL");

  useEffect(() => {
    const now = new Date();
    setTodayIso(formatIsoDate(now));
  }, []);

  const currentYear = viewDate.getFullYear();
  const currentMonthIdx = viewDate.getMonth();

  // Filtered event dataset
  const filteredEvents = useMemo(() => {
    return initialEvents.filter((ev) => {
      const matchCat = categoryFilter === "ALL" || ev.category === categoryFilter;
      const matchStatus = statusFilter === "ALL" || ev.status === statusFilter;
      return matchCat && matchStatus;
    });
  }, [initialEvents, categoryFilter, statusFilter]);

  // Generate 35/42 month cells
  const monthGrid = useMemo(() => {
    return generateMonthGrid(currentYear, currentMonthIdx, filteredEvents, todayIso);
  }, [currentYear, currentMonthIdx, filteredEvents, todayIso]);

  // Navigate to previous month
  const handlePrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  // Navigate to next month
  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Jump to active sprint (October 2026)
  const handleJumpToActiveSprint = () => {
    setViewDate(new Date(2026, 9, 1));
    setSelectedDate("2026-10-26");
    setStagedEventId("event-midnight-hacker-jam");
  };

  // Staged event resolver
  const stagedEvent = useMemo(() => {
    const found = initialEvents.find((e) => e.id === stagedEventId);
    if (found) return found;
    return filteredEvents[0] || initialEvents[0];
  }, [initialEvents, stagedEventId, filteredEvents]);

  return (
    <div className={`w-full bg-[#08080a] border border-white/10 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Background ambient mesh */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD60A]/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

      {/* HEADER CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-[#FFD60A] uppercase px-3 py-1 rounded-full bg-[#FFD60A]/10 border border-[#FFD60A]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD60A] animate-pulse" />
            LIVE STAGING RADAR
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase flex items-center gap-3">
            <span>{MONTH_NAMES[currentMonthIdx]}</span>
            <span className="text-white/40">{currentYear}</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Interactive mission terminal. Click any calendar cell or event badge to stage details instantly.
          </p>
        </div>

        {/* Navigation & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleJumpToActiveSprint}
            className="px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-[#FFD60A]/20 hover:text-[#FFD60A] border border-white/10 hover:border-[#FFD60A]/40 rounded-xl transition-all flex items-center gap-2"
          >
            <Flame className="w-3.5 h-3.5 text-[#FFD60A]" />
            Active Sprint
          </button>
          <div className="flex items-center bg-black/60 border border-white/10 rounded-xl p-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous Month"
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs font-mono font-bold text-zinc-300">
              {String(currentMonthIdx + 1).padStart(2, "0")} / {currentYear}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next Month"
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CALENDAR BODY */}
      <div className="mt-6 relative z-10">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
          {WEEKDAY_NAMES.map((dayName, idx) => (
            <div 
              key={dayName} 
              className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider py-1.5 ${
                idx === 0 || idx === 6 ? "text-amber-400/70" : "text-zinc-500"
              }`}
            >
              {dayName}
            </div>
          ))}
        </div>

        {/* 7-Column Monthly Day Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {monthGrid.map((day: CalendarDay) => {
            const isSelected = day.dateString === selectedDate;
            const hasEvents = day.events.length > 0;

            return (
              <div
                key={day.dateString}
                className={`relative min-h-[56px] sm:min-h-[76px] md:min-h-[92px] p-1.5 sm:p-2 rounded-xl transition-all flex flex-col justify-between border ${
                  isSelected
                    ? "bg-[#FFD60A]/10 border-[#FFD60A] shadow-[0_0_20px_rgba(255,214,10,0.15)] ring-1 ring-[#FFD60A]/50"
                    : day.isCurrentMonth
                    ? "bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/[0.03]"
                    : "bg-black/20 border-transparent opacity-30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs sm:text-sm font-mono font-bold ${
                    isSelected ? "text-[#FFD60A]" : day.isToday ? "text-white underline decoration-[#FFD60A] decoration-2 underline-offset-4" : "text-zinc-300"
                  }`}>
                    {day.dayNumber}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InteractiveEventCalendar;
