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
  Layers,
  Zap,
  Tag,
  Radio,
  Compass
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

  const stagedMeta = stagedEvent ? getCategoryMeta(stagedEvent.category) : null;

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

      {/* TWO-COLUMN LAYOUT: CALENDAR GRID (LEFT) + STAGED EVENT CONSOLE (RIGHT) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* LEFT COLUMN: MONTHLY CALENDAR GRID (7 COLUMNS) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <CalendarIcon className="w-3.5 h-3.5 text-[#FFD60A]" />
              Tournament Grid
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              {filteredEvents.length} active events in scope
            </span>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl p-3 sm:p-4">
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
                const primaryEvent = day.events[0];
                const meta = primaryEvent ? getCategoryMeta(primaryEvent.category) : null;
                const isOngoing = day.events.some((e) => e.status === "ONGOING");

                return (
                  <div
                    key={day.dateString}
                    className={`relative min-h-[64px] sm:min-h-[78px] md:min-h-[92px] p-1.5 sm:p-2 rounded-xl transition-all flex flex-col justify-between border cursor-pointer group ${
                      isSelected
                        ? "bg-[#FFD60A]/10 border-[#FFD60A] shadow-[0_0_20px_rgba(255,214,10,0.15)] ring-1 ring-[#FFD60A]/50"
                        : hasEvents
                        ? "bg-zinc-900/60 border-white/15 hover:border-[#FFD60A]/50 hover:bg-white/[0.04]"
                        : day.isCurrentMonth
                        ? "bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/[0.03]"
                        : "bg-black/20 border-transparent opacity-30"
                    }`}
                  >
                    {/* Day Header Row */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-mono font-bold ${
                        isSelected ? "text-[#FFD60A]" : day.isToday ? "text-white underline decoration-[#FFD60A] decoration-2 underline-offset-4" : "text-zinc-300"
                      }`}>
                        {day.dayNumber}
                      </span>

                      {/* Top corner indicators */}
                      {hasEvents && (
                        <div className="flex items-center gap-1">
                          {isOngoing && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          )}
                          <span 
                            className="w-2 h-2 rounded-full transition-transform group-hover:scale-125" 
                            style={{ backgroundColor: meta?.dotColor || "#FFD60A" }} 
                          />
                        </div>
                      )}
                    </div>

                    {/* Event previews in cell */}
                    {hasEvents && primaryEvent && (
                      <div className="mt-1 space-y-1 overflow-hidden">
                        <div 
                          className={`text-[9px] sm:text-[10px] font-mono font-semibold truncate px-1 sm:px-1.5 py-0.5 rounded border ${
                            isSelected 
                              ? "bg-[#FFD60A] text-black border-[#FFD60A] font-bold" 
                              : `${meta?.badgeBg} ${meta?.badgeText} ${meta?.badgeBorder}`
                          }`}
                        >
                          {primaryEvent.category}
                        </div>

                        <p className="text-[10px] font-medium text-zinc-300 truncate hidden md:block group-hover:text-white transition-colors">
                          {primaryEvent.name}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STAGED EVENT CONSOLE (5 COLUMNS) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFD60A] flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-[#FFD60A] animate-pulse" />
              Staged Tournament Deck
            </span>
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
              No Page Reload
            </span>
          </div>

          {stagedEvent ? (
            <motion.div 
              key={stagedEvent.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-950/80 border border-white/15 rounded-2xl p-5 sm:p-6 space-y-5 relative overflow-hidden backdrop-blur-xl shadow-2xl"
            >
              <div 
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ backgroundColor: stagedMeta?.dotColor || "#FFD60A" }}
              />

              {/* Status & Category Tag Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${stagedMeta?.badgeBg} ${stagedMeta?.badgeText} ${stagedMeta?.badgeBorder}`}>
                    {stagedEvent.category}
                  </span>
                  <span className={`text-[10px] font-mono font-black tracking-widest px-2.5 py-0.5 rounded-full border ${
                    stagedEvent.status === "ONGOING"
                      ? "border-emerald-400 text-emerald-400 bg-emerald-500/10"
                      : stagedEvent.status === "UPCOMING"
                      ? "border-[#FFD60A] text-[#FFD60A] bg-[#FFD60A]/10"
                      : "border-zinc-700 text-zinc-500 bg-zinc-800/40"
                  }`}>
                    {stagedEvent.status}
                  </span>
                </div>

                <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{formatFriendlyDate(stagedEvent.date)}</span>
                </div>
              </div>

              {/* Tournament Title */}
              <div>
                <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug">
                  {stagedEvent.name}
                </h4>
                {stagedEvent.time && (
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400/90 mt-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{stagedEvent.time}</span>
                  </div>
                )}
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 space-y-1">
                  <span className="text-[10px] uppercase text-zinc-500 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-zinc-400" />
                    Venue
                  </span>
                  <p className="font-semibold text-zinc-200 truncate">{stagedEvent.location}</p>
                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 space-y-1">
                  <span className="text-[10px] uppercase text-zinc-500 flex items-center gap-1.5">
                    <Trophy className="w-3 h-3 text-[#FFD60A]" />
                    Prize Bounty
                  </span>
                  <p className="font-semibold text-[#FFD60A] truncate">{stagedEvent.prizePool || "Certificates + Honors"}</p>
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                {stagedEvent.summary}
              </p>

              {/* Tracks */}
              {stagedEvent.tracks && stagedEvent.tracks.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Tournament Tracks & Domains:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stagedEvent.tracks.map((track, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300">
                        {track}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedule Highlights */}
              {stagedEvent.schedule && stagedEvent.schedule.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Milestone Timeline:
                  </span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {stagedEvent.schedule.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-mono">
                        <span className="text-[#FFD60A] shrink-0 font-bold">{item.time}:</span>
                        <span className="text-zinc-300 font-sans text-xs">{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="bg-zinc-950/60 border border-white/10 rounded-2xl p-8 text-center text-zinc-400 space-y-3">
              <Compass className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-sm font-medium">Select any tournament date from the calendar to stage its battle brief.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InteractiveEventCalendar;
