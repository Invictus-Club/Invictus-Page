"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Users } from "lucide-react";
import staticEventsData, { EventItem } from "@/data/events";
import { getEvents } from "@/lib/events-service";
import { EventsHero3D } from "@/components/three/EventsHero3D";
import { AppleScrollCTA } from "@/components/motion/AppleScrollCTA";

export default function EventsPage() {
  const [eventsList, setEventsList] = useState<EventItem[]>(staticEventsData);
  const [selectedId, setSelectedId] = useState<string | null>(staticEventsData[0]?.id ?? null);
  const [activeFilter, setActiveFilter] = useState<"ALL" | "UPCOMING" | "ONGOING" | "PAST">("ALL");

  useEffect(() => {
    getEvents().then((items) => {
      if (items && items.length > 0) {
        setEventsList(items);
        setSelectedId((prev) => prev ?? (items[0]?.id ?? null));
      }
    });
  }, []);

  const filteredEvents = eventsList.filter((ev) => {
    if (activeFilter === "ALL") return true;
    return ev.status === activeFilter;
  });

  const selectedEvent = eventsList.find((ev) => ev.id === selectedId) || filteredEvents[0];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Ultra-Minimal Floating Back Link */}
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-all backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 bg-black/60 shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
      >
        <ArrowLeft size={13} />
        <span>Base</span>
      </Link>

      {/* HERO SECTION - APPLE MONOLITHIC TYPOGRAPHY */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 sm:px-12 md:px-24 pb-20 pt-32 overflow-hidden border-b border-white/[0.08]">
        <EventsHero3D />

        <div className="relative z-10 max-w-5xl space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
            TOURNAMENT CALENDAR
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-[-0.04em] uppercase leading-[0.88] text-white">
            The Timeline.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-normal max-w-2xl leading-relaxed">
            Every verified hackathon, research symposium, demo day, and engineering sprint across the collegiate circuit.
          </p>
        </div>
      </section>

      {/* TOURNAMENT CHRONOLOGY & DOSSIER */}
      <section className="py-24 sm:py-36 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto border-b border-white/[0.08]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 block">
              SCHEDULE & DETAILS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Official Events
            </h2>
          </div>

          {/* Minimalist Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(["ALL", "UPCOMING", "ONGOING", "PAST"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-full transition-all cursor-pointer ${
                  activeFilter === tab
                    ? "bg-white text-black font-bold"
                    : "bg-zinc-950 text-zinc-500 hover:text-white border border-white/[0.08]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Interactive Timeline and Simplistic Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Event Timeline List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              Tournaments ({filteredEvents.length})
            </div>

            <div className="space-y-3">
              {filteredEvents.length === 0 ? (
                <div className="p-8 border border-white/[0.08] text-center space-y-3">
                  <Calendar className="w-8 h-8 text-zinc-600 mx-auto" />
                  <h4 className="text-sm font-bold text-zinc-300 uppercase font-mono">
                    No {activeFilter.toLowerCase()} tournaments found
                  </h4>
                  <button
                    onClick={() => setActiveFilter("ALL")}
                    className="mt-2 px-4 py-2 rounded-full border border-white/20 text-xs font-mono uppercase text-white hover:bg-white hover:text-black transition-colors"
                  >
                    View All Events
                  </button>
                </div>
              ) : (
                filteredEvents.map((ev) => {
                  const isSelected = selectedEvent?.id === ev.id;

                  return (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedId(ev.id)}
                      className={`p-6 border-l-4 transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "border-l-white border-y border-r border-white/30 bg-zinc-900"
                          : "border-l-transparent border-y border-r border-white/[0.08] hover:border-white/[0.2] bg-black/40 hover:bg-zinc-950"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className={isSelected ? "text-zinc-300 font-semibold" : "text-zinc-500"}>
                          {new Date(ev.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                          {ev.status}
                        </span>
                      </div>

                      <h3 className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                        isSelected ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                      }`}>
                        {ev.name}
                      </h3>

                      <p className={`text-xs line-clamp-2 mt-2 leading-relaxed ${
                        isSelected ? "text-zinc-300" : "text-zinc-500"
                      }`}>
                        {ev.summary}
                      </p>

                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.06] text-xs font-mono text-zinc-500">
                        <MapPin size={12} className={isSelected ? "text-zinc-300" : "text-zinc-600"} />
                        <span className={isSelected ? "text-zinc-300" : "text-zinc-500"}>{ev.location}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Simplistic Template-Based Details (Name, Venue, Time, Expected Students, Short Description) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              {selectedEvent ? (
                <motion.div
                  key={selectedEvent.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-white/[0.12] bg-zinc-950 p-6 sm:p-10 space-y-6"
                >
                  {/* 1. Name */}
                  <div className="space-y-1 border-b border-white/[0.08] pb-6">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest block">
                      {selectedEvent.category}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                      {selectedEvent.name}
                    </h2>
                  </div>

                  {/* 2. Venue & 3. Time (From / To) & 4. Expected Students */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-white/[0.08] pb-6 text-sm">
                    <div className="space-y-1">
                      <span className="text-xs font-mono uppercase text-zinc-500 block">
                        Venue
                      </span>
                      <p className="text-zinc-200 font-medium">
                        {selectedEvent.location}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-mono uppercase text-zinc-500 block">
                        Date & Time
                      </span>
                      <p className="text-zinc-200 font-medium">
                        {new Date(selectedEvent.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        {selectedEvent.schedule && selectedEvent.schedule.length > 0 && (
                          <span className="block text-xs font-mono text-zinc-400 pt-0.5">
                            {selectedEvent.schedule[0].time} to {selectedEvent.schedule[selectedEvent.schedule.length - 1].time}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-mono uppercase text-zinc-500 block">
                        Students Expected
                      </span>
                      <p className="text-zinc-200 font-medium">
                        {selectedEvent.teamSize || "2–4 Members per Squad"}
                      </p>
                    </div>

                    {selectedEvent.prizePool && (
                      <div className="space-y-1">
                        <span className="text-xs font-mono uppercase text-zinc-500 block">
                          Prizes / Recognition
                        </span>
                        <p className="text-zinc-200 font-medium">
                          {selectedEvent.prizePool}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 5. Short Description */}
                  <div className="space-y-2 border-b border-white/[0.08] pb-6">
                    <span className="text-xs font-mono uppercase text-zinc-500 block">
                      Description
                    </span>
                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                      {selectedEvent.summary || selectedEvent.description}
                    </p>
                  </div>

                  {/* Simple Call to Action */}
                  <div className="pt-2">
                    <a
                      href="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                    >
                      <span>Audition / Register</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* LAYER 03: CINEMATIC SCROLL-SCRUBBED CALL TO ACTION */}
      <AppleScrollCTA
        badge="SQUAD FORMATIONS"
        title="Compete With Invictus."
        description="Audition for upcoming collegiate hackathon rosters or submit original engineering proposals to our research division."
        primaryHref="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
        primaryText="Connect on WhatsApp"
        isExternal={true}
      />
    </div>
  );
}
