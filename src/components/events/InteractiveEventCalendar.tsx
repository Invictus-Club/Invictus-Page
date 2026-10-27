"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, Calendar as CalendarIcon, CornerDownRight } from "lucide-react";
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
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function InteractiveEventCalendar({
  initialEvents = eventsData,
  className = "",
}: InteractiveEventCalendarProps) {
  // Safe SSR date (default October 2026)
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

  // Month grid matrix
  const monthGrid = useMemo(() => {
    return generateMonthGrid(currentYear, currentMonthIdx, initialEvents, todayIso);
  }, [currentYear, currentMonthIdx, initialEvents, todayIso]);

  // Current staged event
  const stagedEvent = useMemo(() => {
    const found = initialEvents.find((e) => e.id === stagedEventId);
    if (found) return found;
    return initialEvents.find((e) => e.date === selectedDate) || null;
  }, [initialEvents, stagedEventId, selectedDate]);

  // Days that have events this month
  const eventsInCurrentMonth = useMemo(() => {
    return initialEvents.filter((e) => {
      const [y, m] = e.date.split("-").map(Number);
      return y === currentYear && m - 1 === currentMonthIdx;
    });
  }, [initialEvents, currentYear, currentMonthIdx]);

  // Nearest event lookup if selected day is empty
  const nearestUpcoming = useMemo(() => {
    const upcoming = initialEvents.filter((e) => e.status !== "PAST");
    if (upcoming.length === 0) return initialEvents[0] || null;
    return upcoming.sort((a, b) => a.date.localeCompare(b.date))[0] || null;
  }, [initialEvents]);

  const handlePrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleResetCurrent = () => {
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

  const handleSelectEventDirect = (ev: EventItem) => {
    setSelectedDate(ev.date);
    setStagedEventId(ev.id);
    const [y, m] = ev.date.split("-").map(Number);
    if (m - 1 !== currentMonthIdx || y !== currentYear) {
      setViewDate(new Date(y, m - 1, 1));
    }
  };

  const handleCopyIntel = () => {
    if (!stagedEvent) return;
    const brief = formatEventBriefText(stagedEvent);
    navigator.clipboard.writeText(brief).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`w-full bg-black text-white border-2 border-white/20 p-4 sm:p-6 md:p-8 font-sans ${className}`}>
      
      {/* BRUTALIST TOP BAR: SYSTEM STATUS & MONTH NAVIGATION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#FFD60A]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FFD60A] font-bold">
            SCHEDULE // RADAR TERMINAL
          </span>
          <span className="text-zinc-600 font-mono text-xs">/</span>
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            {eventsInCurrentMonth.length} DEPLOYMENTS THIS MONTH
          </span>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={handleResetCurrent}
            className="px-3 py-1.5 border border-white/30 hover:border-[#FFD60A] hover:text-[#FFD60A] uppercase transition-colors"
          >
            CURRENT SPRINT
          </button>
          <div className="flex items-center border border-white/30 divide-x divide-white/30">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous Month"
              className="px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
            >
              PREV
            </button>
            <div className="px-4 py-1.5 font-bold uppercase tracking-widest text-[#FFD60A] bg-zinc-950">
              {MONTHS[currentMonthIdx]} {currentYear}
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next Month"
              className="px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>

      {/* ARCHITECTURAL CALENDAR GRID */}
      <div className="pt-6">
        {/* WEEKDAYS HEADER */}
        <div className="grid grid-cols-7 border-t border-l border-white/20">
          {WEEKDAYS.map((wd) => (
            <div
              key={wd}
              className="border-r border-b border-white/20 p-2 text-center font-mono text-[11px] font-bold tracking-widest text-zinc-400 bg-zinc-950/60 uppercase"
            >
              {wd}
            </div>
          ))}
        </div>

        {/* DAY CELLS */}
        <div className="grid grid-cols-7 border-l border-white/20">
          {monthGrid.map((day: CalendarDay) => {
            const isSelected = day.dateString === selectedDate;
            const hasEvents = day.events.length > 0;
            const isOngoing = day.events.some((e) => e.status === "ONGOING");
            const firstEvent = day.events[0];

            return (
              <div
                key={day.dateString}
                onClick={() => handleSelectDay(day)}
                className={`min-h-[72px] sm:min-h-[88px] md:min-h-[104px] p-2 border-r border-b border-white/20 transition-colors flex flex-col justify-between cursor-pointer relative select-none ${
                  isSelected
                    ? "bg-[#FFD60A] text-black font-black"
                    : hasEvents
                    ? "bg-zinc-900/80 hover:bg-zinc-800 text-white"
                    : day.isCurrentMonth
                    ? "bg-black hover:bg-zinc-950 text-zinc-400"
                    : "bg-black/40 text-zinc-700 opacity-40"
                }`}
              >
                {/* Top: Day Number + Status marker */}
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs sm:text-sm font-bold ${
                    isSelected ? "text-black font-black" : day.isToday ? "text-[#FFD60A] underline underline-offset-4" : ""
                  }`}>
                    {String(day.dayNumber).padStart(2, "0")}
                  </span>

                  {hasEvents && (
                    <span className={`font-mono text-[9px] font-black tracking-widest px-1 py-0.5 uppercase ${
                      isSelected 
                        ? "bg-black text-[#FFD60A]" 
                        : isOngoing
                        ? "bg-emerald-400 text-black"
                        : "bg-[#FFD60A] text-black"
                    }`}>
                      {isOngoing ? "LIVE" : "EVENT"}
                    </span>
                  )}
                </div>

                {/* Bottom: Event Title preview */}
                {hasEvents && firstEvent && (
                  <div className="mt-1">
                    <p className={`font-mono text-[10px] sm:text-[11px] font-bold uppercase truncate leading-tight ${
                      isSelected ? "text-black" : "text-[#FFD60A]"
                    }`}>
                      {firstEvent.category}
                    </p>
                    <p className={`text-[10px] truncate leading-tight mt-0.5 hidden sm:block ${
                      isSelected ? "text-black/80 font-semibold" : "text-zinc-300"
                    }`}>
                      {firstEvent.name}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* STAGED EVENT CONSOLE: BRUTALIST RAW READOUT */}
      <div className="mt-8 pt-8 border-t-2 border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FFD60A]">
            <CornerDownRight className="w-4 h-4 text-[#FFD60A]" />
            <span>STAGED EVENT INSPECTOR</span>
          </div>
          <span className="font-mono text-[11px] text-zinc-500 uppercase">
            TARGET DATE: {selectedDate}
          </span>
        </div>

        {stagedEvent ? (
          <div className="border border-white/20 bg-zinc-950 p-5 sm:p-6 space-y-6">
            {/* Header: Date + Title */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <span className="bg-white text-black font-black px-2 py-0.5 uppercase">
                  {stagedEvent.category}
                </span>
                <span className={`px-2 py-0.5 uppercase font-bold border ${
                  stagedEvent.status === "ONGOING"
                    ? "border-emerald-400 text-emerald-400"
                    : stagedEvent.status === "UPCOMING"
                    ? "border-[#FFD60A] text-[#FFD60A]"
                    : "border-zinc-700 text-zinc-500"
                }`}>
                  [{stagedEvent.status}]
                </span>
                <span className="text-zinc-400">
                  // {formatFriendlyDate(stagedEvent.date).toUpperCase()}{stagedEvent.time ? ` • ${stagedEvent.time}` : ""}
                </span>
              </div>

              <h4 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                {stagedEvent.name}
              </h4>
            </div>

            {/* Brutalist Metadata Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-white/20 divide-y sm:divide-y-0 sm:divide-x divide-white/20 py-3 font-mono text-xs">
              <div className="py-2 sm:py-0 sm:px-3 first:pl-0">
                <span className="text-zinc-500 uppercase block text-[10px]">VENUE // LOCATION</span>
                <span className="text-zinc-200 font-bold truncate block">{stagedEvent.location}</span>
              </div>
              <div className="py-2 sm:py-0 sm:px-3">
                <span className="text-zinc-500 uppercase block text-[10px]">BOUNTY // PRIZE</span>
                <span className="text-[#FFD60A] font-bold truncate block">{stagedEvent.prizePool || "OFFICIAL RECOGNITION"}</span>
              </div>
              <div className="py-2 sm:py-0 sm:px-3">
                <span className="text-zinc-500 uppercase block text-[10px]">SQUAD CAPACITY</span>
                <span className="text-zinc-200 font-bold truncate block">{stagedEvent.teamSize || "OPEN"}</span>
              </div>
              <div className="py-2 sm:py-0 sm:px-3">
                <span className="text-zinc-500 uppercase block text-[10px]">EXECUTION STAGE</span>
                <span className="text-zinc-200 font-bold truncate block">{stagedEvent.status}</span>
              </div>
            </div>

            {/* Concise Summary */}
            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-4xl">
              {stagedEvent.summary}
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={generateGoogleCalendarUrl(stagedEvent)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#FFD60A] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
              >
                + ADD TO CALENDAR
              </a>

              <button
                type="button"
                onClick={handleCopyIntel}
                className="px-5 py-2.5 border border-white/30 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY BRIEF</span>
                  </>
                )}
              </button>

              <Link
                href="/events"
                className="px-5 py-2.5 border border-white/10 text-zinc-400 font-mono text-xs uppercase tracking-wider hover:border-white/30 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>FULL TIMELINE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="border border-white/20 bg-zinc-950 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-zinc-500 uppercase block">NO SCHEDULED OPERATIONS</span>
              <p className="text-zinc-300">
                NO TOURNAMENTS CONFIGURED FOR {selectedDate}.
              </p>
            </div>
            {nearestUpcoming && (
              <button
                type="button"
                onClick={() => handleSelectEventDirect(nearestUpcoming)}
                className="px-4 py-2 border border-[#FFD60A] text-[#FFD60A] hover:bg-[#FFD60A] hover:text-black uppercase font-bold transition-colors cursor-pointer"
              >
                STAGE NEXT: {nearestUpcoming.name} ({nearestUpcoming.date})
              </button>
            )}
          </div>
        )}
      </div>

      {/* QUICK DEPLOYMENTS STRIP: ARCHITECTURAL MONO LIST */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">
          ACTIVE DEPLOYMENTS // DIRECT SELECT
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {initialEvents.slice(0, 4).map((ev) => {
            const isStaged = stagedEvent?.id === ev.id;
            return (
              <button
                key={ev.id}
                type="button"
                onClick={() => handleSelectEventDirect(ev)}
                className={`p-3 border text-left font-mono transition-all cursor-pointer ${
                  isStaged
                    ? "border-[#FFD60A] bg-zinc-900 text-[#FFD60A]"
                    : "border-white/10 hover:border-white/40 bg-black text-zinc-300 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase mb-1">
                  <span>{ev.date}</span>
                  <span className="font-bold">{ev.category}</span>
                </div>
                <div className="text-xs font-bold uppercase truncate">{ev.name}</div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default InteractiveEventCalendar;
