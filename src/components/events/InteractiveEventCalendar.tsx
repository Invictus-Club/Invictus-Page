"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  MapPin, 
  Trophy, 
  Users, 
  Clock, 
  Copy, 
  Check, 
  ArrowUpRight,
  ArrowRight
} from "lucide-react";
import eventsData, { EventItem } from "@/data/events";
import { 
  generateMonthGrid, 
  formatIsoDate, 
  formatFriendlyDate, 
  generateGoogleCalendarUrl,
  formatEventBriefText,
  CalendarDay 
} from "@/lib/calendar-utils";

interface InteractiveEventCalendarProps {
  initialEvents?: EventItem[];
  className?: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function InteractiveEventCalendar({
  initialEvents = eventsData,
  className = "",
}: InteractiveEventCalendarProps) {
  // Safe default date: October 2026
  const [viewDate, setViewDate] = useState<Date>(() => new Date(2026, 9, 1));
  const [todayIso, setTodayIso] = useState<string>("2026-10-26");
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-26");
  const [stagedEventId, setStagedEventId] = useState<string>("event-midnight-hacker-jam");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const now = new Date();
    setTodayIso(formatIsoDate(now));
  }, []);

  const currentYear = viewDate.getFullYear();
  const currentMonthIdx = viewDate.getMonth();

  // 35 or 42 grid cells
  const monthGrid = useMemo(() => {
    return generateMonthGrid(currentYear, currentMonthIdx, initialEvents, todayIso);
  }, [currentYear, currentMonthIdx, initialEvents, todayIso]);

  // Staged event resolver
  const stagedEvent = useMemo(() => {
    const found = initialEvents.find((e) => e.id === stagedEventId);
    if (found) return found;
    return initialEvents.find((e) => e.date === selectedDate) || initialEvents[0];
  }, [initialEvents, stagedEventId, selectedDate]);

  // Quick navigation
  const handlePrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setViewDate(new Date(2026, 9, 1));
    setSelectedDate("2026-10-26");
    setStagedEventId("event-midnight-hacker-jam");
  };

  const handleSelectDay = (day: CalendarDay) => {
    setSelectedDate(day.dateString);
    const [y, m] = day.dateString.split("-").map(Number);
    if (m - 1 !== currentMonthIdx || y !== currentYear) {
      setViewDate(new Date(y, m - 1, 1));
    }

    if (day.events.length > 0) {
      setStagedEventId(day.events[0].id);
    }
  };

  const handleCopy = () => {
    if (!stagedEvent) return;
    const brief = formatEventBriefText(stagedEvent);
    navigator.clipboard.writeText(brief).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`w-full bg-[#0a0a0c] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      
      {/* HEADER / NAVIGATION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 border-b border-zinc-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD60A]" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 font-semibold">
              Event Calendar
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            {MONTHS[currentMonthIdx]} <span className="text-zinc-500 font-normal">{currentYear}</span>
          </h3>
        </div>

        {/* Minimal Nav Arrows + Reset */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToday}
            className="px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            Today
          </button>
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous Month"
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next Month"
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN BODY: 2-COLUMN SPLIT (GRID ON LEFT, STAGED EVENT ON RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
        
        {/* LEFT COLUMN: THE PERFECT SQUARE CALENDAR GRID */}
        <div className="lg:col-span-7 p-4 sm:p-6">
          {/* Weekday Labels */}
          <div className="grid grid-cols-7 mb-2">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center text-[11px] font-mono uppercase tracking-wider text-zinc-500 py-1 font-semibold"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Day Grid with true Square Aspect Ratio */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {monthGrid.map((day: CalendarDay) => {
              const isSelected = day.dateString === selectedDate;
              const hasEvents = day.events.length > 0;
              const isOngoing = day.events.some((e) => e.status === "ONGOING");

              return (
                <button
                  key={day.dateString}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`aspect-square relative rounded-xl p-1.5 sm:p-2 flex flex-col justify-between items-start transition-all duration-200 cursor-pointer text-left group focus:outline-none ${
                    !day.isCurrentMonth
                      ? "opacity-25 hover:opacity-50 text-zinc-600"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {/* Active Selection Background with Framer Motion spring */}
                  {isSelected && (
                    <motion.div
                      layoutId="active-calendar-day"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-zinc-800/90 border border-[#FFD60A] rounded-xl shadow-[0_0_20px_rgba(255,214,10,0.12)] z-0"
                    />
                  )}

                  {/* Day Number */}
                  <span className={`text-xs sm:text-sm font-mono font-medium relative z-10 transition-colors ${
                    isSelected
                      ? "text-[#FFD60A] font-bold"
                      : day.isToday
                      ? "text-white font-bold"
                      : ""
                  }`}>
                    {day.dayNumber}
                  </span>

                  {/* Event Marker at Bottom of Square */}
                  <div className="w-full flex items-center justify-between relative z-10">
                    {hasEvents ? (
                      <div className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full transition-transform group-hover:scale-125 ${
                          isSelected
                            ? "bg-[#FFD60A]"
                            : isOngoing
                            ? "bg-emerald-400"
                            : "bg-[#FFD60A]"
                        }`} />
                        {day.events.length > 1 && (
                          <span className="text-[9px] font-mono text-zinc-500 font-bold hidden sm:inline">
                            +{day.events.length - 1}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span />
                    )}

                    {day.isToday && !isSelected && (
                      <span className="w-1 h-1 rounded-full bg-zinc-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Minimalist Legend Footer */}
          <div className="flex items-center justify-between pt-4 mt-3 border-t border-zinc-800/60 text-[11px] font-mono text-zinc-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD60A]" />
                Event
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Active Sprint
              </span>
            </div>
            <span>Click any day to inspect</span>
          </div>
        </div>

        {/* RIGHT COLUMN: STAGED EVENT INSPECTOR */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-black/40">
          <AnimatePresence mode="wait">
            {stagedEvent ? (
              <motion.div
                key={stagedEvent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Meta Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[#FFD60A] font-bold tracking-widest uppercase">
                      {stagedEvent.category}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                      stagedEvent.status === "ONGOING"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : stagedEvent.status === "UPCOMING"
                        ? "bg-[#FFD60A]/10 text-[#FFD60A] border border-[#FFD60A]/20"
                        : "bg-zinc-800 text-zinc-400"
                    }`}>
                      {stagedEvent.status}
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                    {stagedEvent.name}
                  </h4>

                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{formatFriendlyDate(stagedEvent.date)}</span>
                    {stagedEvent.time && <span>• {stagedEvent.time}</span>}
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      Venue
                    </div>
                    <div className="text-xs font-medium text-zinc-200 truncate">
                      {stagedEvent.location}
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                      <Trophy className="w-3 h-3 text-[#FFD60A]" />
                      Bounty / Prize
                    </div>
                    <div className="text-xs font-bold text-[#FFD60A] truncate">
                      {stagedEvent.prizePool || "Official Honors"}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  {stagedEvent.summary}
                </p>

                {/* Tracks Chips (Clean Monospace) */}
                {stagedEvent.tracks && stagedEvent.tracks.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                      Tracks
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {stagedEvent.tracks.map((track, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                        >
                          {track}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="py-12 text-center text-zinc-500 space-y-2 font-mono text-xs">
                <CalendarIcon className="w-8 h-8 text-zinc-600 mx-auto" />
                <p>No events scheduled for this date.</p>
              </div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          {stagedEvent && (
            <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-3">
              <a
                href={generateGoogleCalendarUrl(stagedEvent)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] px-4 py-2.5 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Add to Calendar</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <Link
                href="/events"
                className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 rounded-xl transition-colors"
                title="Full Event Directory"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default InteractiveEventCalendar;
