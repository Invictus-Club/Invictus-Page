"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Award, 
  Users, 
  ChevronDown, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Layers
} from "lucide-react";
import eventsData, { EventItem } from "@/data/events";

export default function EventsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(eventsData[0]?.id ?? null);
  const [activeFilter, setActiveFilter] = useState<"ALL" | "UPCOMING" | "ONGOING" | "PAST">("ALL");

  const filteredEvents = eventsData.filter(ev => {
    if (activeFilter === "ALL") return true;
    return ev.status === activeFilter;
  });

  const selectedEvent = eventsData.find(ev => ev.id === selectedId) || filteredEvents[0];

  const getStatusBadge = (status: EventItem["status"]) => {
    switch (status) {
      case "UPCOMING":
        return "border-emerald-500/40 text-emerald-400 bg-emerald-500/10";
      case "ONGOING":
        return "border-[#FFD60A]/40 text-[#FFD60A] bg-[#FFD60A]/10";
      case "PAST":
        return "border-gray-700 text-gray-400 bg-gray-900/60";
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-clip selection:bg-[#FFD60A] selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,214,10,0.12),rgba(0,0,0,0.95))] pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_70%,rgba(217,4,41,0.07),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-24 sm:pt-32 pb-24">
        {/* Navigation Breadcrumb */}
        <Link 
          href="/" 
          className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-[#FFD60A] transition-colors mb-8 sm:mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Back to Base
        </Link>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-gray-800 pb-8 sm:pb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-[#FFD60A] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Official Timeline & Tournaments
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              The Timeline
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-400 max-w-2xl mt-4 leading-relaxed">
              Every hackathon, research symposium, demo day, and build sprint across the VTU circuit. Click any tournament to inspect complete tracks, schedules, prizes, and criteria.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-4 md:pt-0">
            {(["ALL", "UPCOMING", "ONGOING", "PAST"] as const).map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 text-xs font-bold tracking-widest rounded-full transition-all cursor-pointer ${
                  activeFilter === tab 
                    ? "bg-[#FFD60A] text-black shadow-[0_0_20px_rgba(255,214,10,0.3)]" 
                    : "bg-gray-900/80 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Interactive Timeline and Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Timeline List */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FFD60A]" /> Select Tournament ({filteredEvents.length})
            </h2>

            <div className="relative border-l border-gray-800 ml-3 pl-6 sm:pl-8 space-y-6">
              {filteredEvents.map((ev) => {
                const isSelected = selectedId === ev.id;

                return (
                  <div
                    key={ev.id}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedId(ev.id)}
                  >
                    {/* Glowing Timeline Marker */}
                    <div 
                      className={`absolute -left-[31px] sm:-left-[39px] top-6 w-3 h-3 rounded-full transition-all duration-300 ${
                        isSelected 
                          ? "bg-[#FFD60A] ring-4 ring-[#FFD60A]/30 scale-125 shadow-[0_0_20px_#FFD60A]" 
                          : "bg-gray-700 group-hover:bg-gray-500"
                      }`} 
                    />

                    <div 
                      className={`p-6 sm:p-7 rounded-2xl transition-all duration-300 border ${
                        isSelected 
                          ? "bg-[#111111] border-[#FFD60A]/70 shadow-[0_10px_35px_rgba(0,0,0,0.8)] scale-[1.01]" 
                          : "bg-black/60 border-gray-800 hover:border-gray-600 hover:bg-[#0a0a0a]"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono text-gray-400 font-bold flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                          {new Date(ev.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>

                        <span className={`text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full border uppercase ${getStatusBadge(ev.status)}`}>
                          {ev.status}
                        </span>
                      </div>

                      <h3 className={`text-xl sm:text-2xl font-black tracking-tight transition-colors ${
                        isSelected ? "text-[#FFD60A]" : "text-white group-hover:text-gray-200"
                      }`}>
                        {ev.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-400 font-medium line-clamp-2 mt-2 leading-relaxed">
                        {ev.summary}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-gray-800/60 text-[11px] text-gray-400 font-mono">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#FFD60A]" /> {ev.location}
                        </span>
                        {ev.prizePool && (
                          <span className="flex items-center gap-1 text-gray-300 font-bold">
                            <Award className="w-3 h-3 text-[#FFD60A]" /> {ev.prizePool.split('+')[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep Tournament Dossier (Sticks into viewport smoothly) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              {selectedEvent && (
                <motion.div
                  key={selectedEvent.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-[#0b0b0b] border border-gray-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
                >
                  {/* Subtle Yellow Gradient Glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD60A]/10 blur-[90px] rounded-full pointer-events-none -z-0" />

                  <div className="relative z-10 space-y-6">
                    {/* Header Details */}
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-[11px] font-mono tracking-widest text-[#FFD60A] font-bold uppercase">
                          {selectedEvent.category} • TOURNAMENT DOSSIER
                        </span>
                        <span className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded-full border ${getStatusBadge(selectedEvent.status)}`}>
                          {selectedEvent.status}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-1">
                        {selectedEvent.name}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed mt-3">
                        {selectedEvent.description}
                      </p>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-800">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block">Venue</span>
                        <p className="text-xs sm:text-sm font-semibold text-gray-200 mt-1 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#FFD60A] shrink-0" />
                          {selectedEvent.location}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block">Prize Pool & Grants</span>
                        <p className="text-xs sm:text-sm font-bold text-[#FFD60A] mt-1 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-[#FFD60A] shrink-0" />
                          {selectedEvent.prizePool || "Official Badges & Mentorship"}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block">Squad Capacity</span>
                        <p className="text-xs sm:text-sm font-semibold text-gray-200 mt-1 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          {selectedEvent.teamSize || "Open Roster"}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block">Competition Date</span>
                        <p className="text-xs sm:text-sm font-semibold text-gray-200 mt-1 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          {new Date(selectedEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Specific Competition Tracks */}
                    {selectedEvent.tracks && selectedEvent.tracks.length > 0 && (
                      <div>
                        <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block mb-3">
                          Featured Problem Tracks
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedEvent.tracks.map((track, i) => (
                            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-black/60 border border-gray-800 text-xs text-gray-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD60A] shrink-0 mt-0.5" />
                              <span>{track}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Official Agenda / Schedule */}
                    {selectedEvent.schedule && selectedEvent.schedule.length > 0 && (
                      <div>
                        <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block mb-3">
                          Tournament Schedule & Checkpoints
                        </span>
                        <div className="space-y-2">
                          {selectedEvent.schedule.map((slot, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-gray-900 text-xs">
                              <span className="font-mono text-[#FFD60A] font-bold shrink-0">{slot.time}</span>
                              <span className="text-gray-300 text-right ml-3">{slot.activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                      <Link 
                        href="/create-profile"
                        className="flex-1 text-center py-3.5 px-6 bg-[#FFD60A] text-black font-bold tracking-widest text-xs uppercase hover:bg-white transition-all rounded-xl shadow-[0_0_25px_rgba(255,214,10,0.3)]"
                      >
                        Register Squad for This Event
                      </Link>
                      <a 
                        href="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
                        target="_blank"
                        rel="noreferrer"
                        className="text-center py-3.5 px-6 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 font-bold tracking-widest text-xs uppercase transition-all rounded-xl"
                      >
                        Join Discussion
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </main>
  );
}
