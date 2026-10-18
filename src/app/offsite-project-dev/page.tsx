/* eslint-disable */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Wifi, 
  Flame, 
  Users, 
  Coffee, 
  Compass, 
  Sparkles,
  Luggage,
  ShieldAlert
} from "lucide-react";

export default function OffsiteProjectDevPage() {
  const [activeVilla, setActiveVilla] = useState<"dandeli" | "gokarna">("dandeli");
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    laptop: true,
    charger: true,
    extension: true
  });

  const toggleItem = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const villaDetails = {
    dandeli: {
      name: "Dandeli Forest Hacker Villa",
      tagline: "Dense woods, zero cell reception noise, and high-speed Starlink WiFi.",
      timing: "November 2026 • 4 Days / 3 Nights",
      location: "Dandeli Forest Corridor, Karnataka",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
      schedule: [
        { day: "Day 01", title: "Arrival, Highway Chai & Architecture War Room", desc: "Check-in at the private villa, claim your desk, set up external monitors, and whiteboard the weekend's production system architecture." },
        { day: "Day 02", title: "12-Hour Pure Build Sprint", desc: "No meetings, no interruptions. Non-stop coding sprints with shared pizza, cold brew, and real-time PR reviews across the room." },
        { day: "Day 03", title: "River Rafting & Campfire Code Teardown", desc: "Afternoon river break and kayaking to clear heads, followed by evening campfire live demos where everyone inspects each other's code." },
        { day: "Day 04", title: "Final Production Merge & Roadtrip Home", desc: "Merge all pull requests to production, celebrate with local Dhaba lunch, and drive back to campus re-energized." }
      ],
      perks: ["Fiber Starlink satellite backup", "Full kitchen & group cookouts", "Surrounded by nature trails", "Whiteboard glass walls"]
    },
    gokarna: {
      name: "Gokarna Coastal Dev Residency",
      tagline: "Beachside co-working, sea breeze, and hacking until sunrise.",
      timing: "January 2027 • 5 Days / 4 Nights",
      location: "Kudle Beach Shoreline, Gokarna",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop",
      schedule: [
        { day: "Day 01", title: "Coastal Convoy & Desk Setup", desc: "Drive down the Western Ghats pass, check into the beachside bungalow, connect the power strips, and map out the feature backlog." },
        { day: "Day 02", title: "Frontend & Interface Hackathon", desc: "Designing responsive consumer interfaces while listening to the waves. Instant feedback loops across the table." },
        { day: "Day 03", title: "Sunset Swim & 3:00 AM Deployments", desc: "Evening ocean swim to decompress, followed by an all-night push to get the backend APIs and microservices stable." },
        { day: "Day 04", title: "Live User Testing with Locals & Peers", desc: "Hand real phones to people, test edge cases, fix latency, and record the launch product demo videos." },
        { day: "Day 05", title: "Seafood Feast & Return Convoy", desc: "Grand squad dinner at the beach shack and highway return back to Belagavi." }
      ],
      perks: ["Sea-facing co-working balcony", "Outdoor hammock brainstorming", "Cold brew station on deck", "Daily sunset ocean breaks"]
    }
  };

  const offsiteRules = [
    {
      num: "01",
      title: "Zero College Attendance Talk",
      desc: "For 4 days, internal marks, attendance shortages, and campus politics are strictly banned from the dinner table."
    },
    {
      num: "02",
      title: "If It Compiles, It Ships",
      desc: "You don't leave the retreat with a draft on localhost. Everyone leaves with a working production URL live on the internet."
    },
    {
      num: "03",
      title: "Squad First: Everyone Helps",
      desc: "If someone is stuck on a gnarly bug, two people jump in to debug. If dinner is being made, everyone chips in."
    },
    {
      num: "04",
      title: "Real Campfire Roasts",
      desc: "Late-night fireside chats where we tear apart startup ideas, discuss real tech industry truths, and build authentic bonds."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#00FFCC] selection:text-black">
      {/* Sleek Floating Back Button */}
      <Link 
        href="/#opportunities" 
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white hover:border-[#00FFCC] text-xs font-bold tracking-wider transition-all shadow-xl"
      >
        <ArrowLeft size={16} />
        <span>OPPORTUNITIES</span>
      </Link>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FFCC]/30 bg-[#00FFCC]/10 text-[#00FFCC] text-xs font-bold tracking-widest uppercase mb-6"
        >
          <Compass size={14} />
          <span>INVICTUS RETREATS & RESIDENCIES</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.9] text-white max-w-5xl"
        >
          ESCAPE CAMPUS. <span className="text-[#00FFCC]">SHIP REAL CODE.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-zinc-400 font-medium max-w-2xl mt-8 leading-relaxed"
        >
          We rent private villas in nature, bring high-speed Starlink backups, leave the textbook theory behind, and spend 4 days building ambitious software with true friends.
        </motion.p>
      </section>

      {/* INTERACTIVE EXPEDITION SELECTOR */}
      <section className="py-16 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#00FFCC] block mb-1">
              CHOOSE YOUR EXPEDITION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Upcoming Sanctioned Retreats
            </h2>
          </div>

          {/* Toggle Buttons */}
          <div className="inline-flex p-1.5 rounded-full bg-zinc-900 border border-zinc-800">
            <button
              onClick={() => setActiveVilla("dandeli")}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                activeVilla === "dandeli"
                  ? "bg-[#00FFCC] text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Dandeli Forest
            </button>
            <button
              onClick={() => setActiveVilla("gokarna")}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                activeVilla === "gokarna"
                  ? "bg-[#00FFCC] text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Gokarna Beach
            </button>
          </div>
        </div>

        {/* Dynamic Villa Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVilla}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden"
          >
            {/* Header Image Banner */}
            <div className="h-72 sm:h-96 w-full relative overflow-hidden">
              <img 
                src={villaDetails[activeVilla].image} 
                alt={villaDetails[activeVilla].name} 
                className="w-full h-full object-cover filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[#00FFCC] text-xs font-bold uppercase tracking-wider mb-2">
                    <MapPin size={15} />
                    <span>{villaDetails[activeVilla].location}</span>
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
                    {villaDetails[activeVilla].name}
                  </h3>
                </div>
                <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-zinc-700 text-xs font-mono text-zinc-300 self-start sm:self-auto">
                  {villaDetails[activeVilla].timing}
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-8 sm:p-12 space-y-10">
              <p className="text-base sm:text-xl text-zinc-300 max-w-3xl leading-relaxed">
                {villaDetails[activeVilla].tagline}
              </p>

              {/* Day-by-Day Itinerary */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#00FFCC] mb-6">
                  Cohort Schedule & Itinerary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {villaDetails[activeVilla].schedule.map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-black/60 border border-zinc-900">
                      <span className="text-xs font-mono font-bold text-[#00FFCC] uppercase block mb-1">
                        {item.day}
                      </span>
                      <h5 className="font-bold text-white text-base mb-2">{item.title}</h5>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="pt-6 border-t border-zinc-900 flex flex-wrap gap-3">
                {villaDetails[activeVilla].perks.map((p, i) => (
                  <span key={i} className="px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-[#00FFCC]" /> {p}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* THE 4 UNWRITTEN RULES */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00FFCC] block mb-2">
            OFFSITE CULTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            The 4 Unwritten Ground Rules
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            An Invictus retreat is not a standard college trip. It&apos;s a focused creative sanctuary.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offsiteRules.map((r, i) => (
            <div key={i} className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-[#00FFCC]/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl font-mono font-black text-zinc-700 block mb-4">{r.num}</span>
                <h3 className="text-lg font-bold uppercase text-white mb-3">{r.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE PACKING CHECKLIST */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Luggage className="w-6 h-6 text-[#00FFCC]" />
            <h3 className="text-2xl font-black uppercase text-white tracking-tight">
              Interactive Offsite Packing Checklist
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mb-8">
            Click each item before boarding the van. Don&apos;t be the person asking for a charger at 2 AM.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "laptop", label: "Laptop & 65W/100W GaN Fast Charger" },
              { id: "extension", label: "Multi-plug 4-socket Surge Extension Cord" },
              { id: "docs", label: "Downloaded Offline Docs (Zeal / DevDocs)" },
              { id: "hotspot", label: "Secondary Mobile Hotspot SIM" },
              { id: "hoodie", label: "Warm Hoodie for late-night outdoor hacking" },
              { id: "swimwear", label: "Swimwear / River Shoes for the day breaks" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                  checkedItems[item.id]
                    ? "bg-[#00FFCC]/10 border-[#00FFCC]/50 text-white"
                    : "bg-black/60 border-zinc-900 text-zinc-500 hover:border-zinc-800"
                }`}
              >
                <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  checkedItems[item.id] ? "bg-[#00FFCC] border-[#00FFCC] text-black" : "border-zinc-700"
                }`}>
                  {checkedItems[item.id] && <CheckCircle2 size={14} className="stroke-[3]" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center border-t border-zinc-900 bg-black">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            Claim Your Villa Desk.
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Cohorts are capped at 15 developers to ensure everyone gets focused mentorship and private workspace.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#00FFCC] text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-full shadow-[0_0_25px_rgba(0,255,204,0.3)]"
            >
              Apply via WhatsApp Community
            </a>
            <Link 
              href="/#opportunities" 
              className="w-full sm:w-auto px-8 py-4 border border-zinc-800 text-zinc-300 font-bold tracking-widest uppercase text-xs hover:border-white hover:text-white transition-all rounded-full"
            >
              Explore All Opportunities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
