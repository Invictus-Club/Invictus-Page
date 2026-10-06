"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import eventsData from "@/data/events";

export default function EventsPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const upcomingEvents = eventsData.filter(ev => ev.status === "UPCOMING");
  const ongoingEvents = eventsData.filter(ev => ev.status === "ONGOING");
  const pastEvents = eventsData.filter(ev => ev.status === "PAST");

  const EventList = ({ events, title }: { events: typeof eventsData, title: string }) => {
    if (events.length === 0) return null;
    return (
      <div className="mb-24">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8 sm:mb-12 text-white border-b border-gray-800 pb-3 sm:pb-4 inline-block">{title}</h2>
        <div className="relative border-l border-gray-800 ml-3 sm:ml-4 md:ml-12 pl-6 sm:pl-8 md:pl-16 space-y-10 sm:space-y-16">
          {events.map((ev, i) => (
            <motion.div 
              key={ev.id}
              initial={{ opacity: 0, x: -100, scale: 0.7, rotateY: -30, filter: "blur(15px)" }}
              whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: i * 0.1, type: "spring", bounce: 0.35, damping: 15 }}
              onMouseEnter={() => setHoveredId(ev.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group cursor-pointer transform-gpu"
              style={{ transformPerspective: 1200 }}
            >
              {/* Timeline Node */}
              <div className={`absolute -left-[31px] sm:-left-[37px] md:-left-[69px] top-2 w-3 h-3 rounded-full transition-all duration-500 ${hoveredId === ev.id ? 'bg-[#FFD60A] scale-150 shadow-[0_0_20px_#FFD60A]' : 'bg-gray-700'}`} />
              
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-12">
                <div className="md:w-1/4">
                  <div className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase mb-2">
                    {new Date(ev.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className={`text-xs font-bold tracking-widest px-3 py-1 rounded-full border inline-block ${ev.status === 'UPCOMING' ? 'border-green-500/50 text-green-400 bg-green-500/10' : ev.status === 'ONGOING' ? 'border-[#FFD60A]/50 text-[#FFD60A] bg-[#FFD60A]/10' : 'border-gray-600 text-gray-400 bg-gray-800/50'}`}>
                    {ev.status}
                  </div>
                </div>

                <div className="md:w-3/4 bg-black border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-gray-500 hover:bg-[#0a0a0a] transition-all duration-500 relative overflow-hidden group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-2 sm:mb-4 gap-2 sm:gap-4">
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-white group-hover:text-[#FFD60A] transition-colors">
                      {ev.name}
                    </h3>
                    <span className="text-xs sm:text-sm font-mono text-gray-500 shrink-0">{ev.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <Link href="/" className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-white transition-colors mb-8 sm:mb-16">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Base
        </Link>

        <h1 className="text-5xl sm:text-7xl md:text-[10rem] font-black tracking-tighter uppercase mb-4 sm:mb-6 text-white drop-shadow-2xl leading-none">
          The Timeline
        </h1>
        <p className="text-base sm:text-xl md:text-3xl font-medium text-gray-400 max-w-3xl mb-12 sm:mb-24 leading-relaxed">
          Where and when we gather. Synced up for the rest of the year.
        </p>

        <EventList events={ongoingEvents} title="Ongoing" />
        <EventList events={upcomingEvents} title="Upcoming" />
        <EventList events={pastEvents} title="Past" />
        
      </div>
    </main>
  );
}
