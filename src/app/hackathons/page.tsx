/* eslint-disable */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight,
  Trophy, 
  Clock, 
  CheckCircle2, 
  Users, 
  Flame, 
  Code2, 
  Sparkles,
  Zap,
  Coffee,
  Shield,
  Plane
} from "lucide-react";

export default function HackathonsPage() {
  const [activeHour, setActiveHour] = useState(0);
  const [activeRole, setActiveRole] = useState(0);

  const timelineSteps = [
    {
      time: "00:00",
      label: "Problem Reveal & Brainstorm",
      tagline: "Locking the MVP in 30 minutes",
      description: "No endless debates. The squad picks the problem statement, sketches the user journey on Figma or a napkin, and locks the feature list. 3 core features. Zero scope creep.",
      stack: ["Whiteboard", "Figma", "Prisma Schemas"],
      tip: "If an idea takes more than 2 minutes to explain to a 10-year-old, trash it."
    },
    {
      time: "06:00",
      label: "Monorepo Scaffold & Setup",
      tagline: "First deployment live to Vercel",
      description: "Both frontend and backend branches push to main with CI/CD. Mock endpoints are live so the frontend team starts building UI without waiting on APIs.",
      stack: ["Next.js 16", "Supabase", "Turborepo", "Tailwind"],
      tip: "Deploy hello-world to production in the first hour. Never debug deployments at 4 AM."
    },
    {
      time: "14:00",
      label: "The 3:00 AM Sprint",
      tagline: "Coffee, cold chai & deep coding",
      description: "The core engine gets hooked up. Hardware sensors calibrate, AI pipelines test against fallback prompts, and Invictus alumni jump on Discord voice to review live pull requests.",
      stack: ["FastAPI", "WebSockets", "Docker", "Hardware I/O"],
      tip: "When the conference center Wi-Fi drops, switch immediately to mobile hotspot without panic."
    },
    {
      time: "20:00",
      label: "Feature Freeze & Demo Polish",
      tagline: "Break everything before the judges do",
      description: "Code freeze. No new features allowed. We seed real test data, record an emergency local screen capture in case Wi-Fi dies, and run mock jury cross-examinations.",
      stack: ["Screen Recording", "Seed Data", "Edge Cases"],
      tip: "Judges don't inspect your lines of code. They evaluate what happens when they click the button."
    },
    {
      time: "24:00",
      label: "The 3-Minute Pitch",
      tagline: "High energy, zero fluff, podium finish",
      description: "The pitch presenter takes the stage. 60 seconds on the problem, 90 seconds live interactive demo, 30 seconds on business viability. The trophy goes back to Belagavi.",
      stack: ["Keynote", "Live Demo", "Swagger"],
      tip: "Start with a live click, not a slide reading. Action speaks louder than bullet points."
    }
  ];

  const squadRoles = [
    {
      role: "Frontend Architect",
      duty: "Build slick, high-contrast interfaces with snappy feedback and zero render stutter.",
      weapons: ["Next.js", "Tailwind CSS", "Framer Motion", "Lucide"],
      highlight: "Crafts the UI judges fall in love with in the first 5 seconds."
    },
    {
      role: "Backend & Systems Lead",
      duty: "Designs bulletproof APIs, database schemas, and instant sub-100ms response endpoints.",
      weapons: ["FastAPI / Node", "PostgreSQL / Supabase", "Redis", "Docker"],
      highlight: "Keeps data consistent even when 50 judges hammer the demo server."
    },
    {
      role: "AI & Hardware Specialist",
      duty: "Connects LLMs, vision models, IoT boards, and ensures offline fallback resilience.",
      weapons: ["Python", "LoRa / ESP32", "ONNX / LangChain", "WebSockets"],
      highlight: "Makes hardware and machine learning look effortless in live demonstrations."
    },
    {
      role: "Pitch & Product Lead",
      duty: "Controls the narrative, slide transitions, Q&A defense, and business economics.",
      weapons: ["Pitch Decks", "Unit Economics", "Storytelling", "Live Walkthrough"],
      highlight: "Commands the room and defends against skeptical judge questions with ease."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#FFD60A] selection:text-black">
      {/* Sleek Floating Back Button */}
      <Link 
        href="/#opportunities" 
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white hover:border-[#FFD60A] text-xs font-bold tracking-wider transition-all shadow-xl"
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD60A]/30 bg-[#FFD60A]/10 text-[#FFD60A] text-xs font-bold tracking-widest uppercase mb-6"
        >
          <Trophy size={14} />
          <span>INVICTUS COMPETITIVE DEV</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.9] text-white max-w-5xl"
        >
          24 HOURS. ONE MVP. <span className="text-[#FFD60A]">TAKE THE TROPHY.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-zinc-400 font-medium max-w-2xl mt-8 leading-relaxed"
        >
          We build 4-developer power squads, sponsor your tournament travel, pay your registration, and coach you to win against tier-1 engineering colleges.
        </motion.p>

        {/* Real Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full mt-16 max-w-5xl">
          {[
            { val: "₹4.8L+", label: "Won in Cash & Grants" },
            { val: "14 Podiums", label: "National & State Wins" },
            { val: "100%", label: "Travel & Reg Covered" },
            { val: "92%", label: "Finalist Stage Rate" }
          ].map((m, i) => (
            <div key={i} className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-center hover:border-[#FFD60A]/40 transition-colors">
              <div className="text-3xl sm:text-5xl font-black text-[#FFD60A] font-mono tracking-tight">{m.val}</div>
              <div className="text-xs sm:text-sm font-semibold text-zinc-400 mt-2 uppercase tracking-wide">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE 24-HOUR BATTLE SCRUBBER */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] block mb-2">
            THE 24-HOUR PLAYBOOK
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Click An Hour To See How We Win
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Winning a hackathon isn&apos;t luck. It&apos;s a disciplined step-by-step sprint executed under high adrenaline.
          </p>
        </div>

        {/* Step Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {timelineSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveHour(idx)}
              className={`px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeHour === idx
                  ? "bg-[#FFD60A] text-black shadow-[0_0_25px_rgba(255,214,10,0.4)] scale-105"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              <Clock size={14} />
              <span>{step.time}</span>
            </button>
          ))}
        </div>

        {/* Interactive Active Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHour}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono font-bold text-[#FFD60A] uppercase tracking-widest block mb-1">
                  SPRINT PHASE {activeHour + 1} OF 5
                </span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                  {timelineSteps[activeHour].label}
                </h3>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono font-semibold self-start md:self-auto">
                {timelineSteps[activeHour].tagline}
              </span>
            </div>

            <p className="text-base sm:text-lg text-zinc-300 mt-6 leading-relaxed">
              {timelineSteps[activeHour].description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-6 border-t border-zinc-900">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-3">
                  Arsenal & Tools Used:
                </span>
                <div className="flex flex-wrap gap-2">
                  {timelineSteps[activeHour].stack.map((item, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD60A] block mb-2">
                  Invictus Pro-Tip:
                </span>
                <p className="text-xs sm:text-sm text-zinc-400 italic bg-black/60 p-3.5 rounded-xl border border-zinc-900">
                  &ldquo;{timelineSteps[activeHour].tip}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* INTERACTIVE SQUAD ROLE BUILDER */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] block mb-2">
            WHAT&apos;S YOUR WEAPON?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Build Your Squad Position
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Every winning Invictus squad is balanced like an esports team. Select a role to see how you fit.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
          {squadRoles.map((r, i) => (
            <button
              key={i}
              onClick={() => setActiveRole(i)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                activeRole === i 
                  ? "bg-zinc-900 border-[#FFD60A] text-white" 
                  : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                activeRole === i ? "bg-[#FFD60A] text-black" : "bg-zinc-800 text-zinc-400"
              }`}>
                {i === 0 && <Code2 size={16} />}
                {i === 1 && <Zap size={16} />}
                {i === 2 && <Sparkles size={16} />}
                {i === 3 && <Trophy size={16} />}
              </div>
              <h4 className="font-bold text-sm leading-snug">{r.role}</h4>
            </button>
          ))}
        </div>

        <motion.div 
          key={activeRole}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-2xl sm:text-3xl font-black text-white">{squadRoles[activeRole].role}</h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FFD60A]/10 text-[#FFD60A] border border-[#FFD60A]/30 self-start sm:self-auto">
              Core Position
            </span>
          </div>

          <p className="text-base sm:text-lg text-zinc-300 mb-6 leading-relaxed">
            {squadRoles[activeRole].duty}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-900">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                Typical Tech Weapons:
              </span>
              <div className="flex flex-wrap gap-2">
                {squadRoles[activeRole].weapons.map((w, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                    {w}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFD60A] block mb-2">
                Squad Impact:
              </span>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                {squadRoles[activeRole].highlight}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* REAL PODIUM PROOF */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] block mb-2">
            REAL PODIUM MOMENTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Proof On The Big Stage
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden group hover:border-[#FFD60A]/40 transition-all">
            <div className="h-64 sm:h-72 overflow-hidden relative">
              <img 
                src="/hackathons/sih-internal/1.png" 
                alt="Smart India Hackathon Internal" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FFD60A] text-black text-xs font-bold uppercase">
                1st Place Champions
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-black uppercase text-white mb-2">Smart India Hackathon Internal</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Engineered an offline LoRa emergency communication network capable of relaying live camera telemetry when cell towers are destroyed.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FFD60A]">
                <CheckCircle2 size={15} /> Evaluated by Senior Defense & Disaster Panel
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden group hover:border-[#FFD60A]/40 transition-all">
            <div className="h-64 sm:h-72 overflow-hidden relative">
              <img 
                src="/hackathons/iitdw/1.png" 
                alt="IIT Delhi Summit" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FFD60A] text-black text-xs font-bold uppercase">
                Top National Podium
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-black uppercase text-white mb-2">National Innovation Summit (IIT)</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Flew to Delhi and built a limit order book simulator in Rust with real-time canvas visualizers, taking home ₹1,00,000 in direct cash prize.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FFD60A]">
                <CheckCircle2 size={15} /> Won against 60+ National University Teams
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERKS SECTION */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="p-8 sm:p-14 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] block mb-2">
              WHY COMPETE WITH INVICTUS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white mb-6">
              You Code. We Cover The Rest.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-2xl bg-black border border-zinc-800">
              <Plane className="w-8 h-8 text-[#FFD60A] mb-4" />
              <h4 className="font-bold text-lg mb-2">Travel Sponsored</h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Trains, flights, and stay are reimbursed for officially sanctioned tournament teams.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-zinc-800">
              <Coffee className="w-8 h-8 text-[#FFD60A] mb-4" />
              <h4 className="font-bold text-lg mb-2">All-Night Mentorship</h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Senior alumni who have won Smart India Hackathon review your pitch and unblock bugs at 3 AM.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-zinc-800">
              <Trophy className="w-8 h-8 text-[#FFD60A] mb-4" />
              <h4 className="font-bold text-lg mb-2">100% Prize Money Yours</h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Every rupee won in cash prizes goes directly to the student team members. Zero club cuts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL HIGH-ENERGY CTA */}
      <section className="py-24 px-6 text-center border-t border-zinc-900 bg-black">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            Ready To Wear The Jersey?
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Upcoming national hackathons are assembling squads right now. Join the auditions and put your name on the next trophy.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/events" 
              className="w-full sm:w-auto px-8 py-4 bg-[#FFD60A] text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-full shadow-[0_0_25px_rgba(255,214,10,0.3)]"
            >
              View Upcoming Tournaments
            </Link>
            <Link 
              href="/wins" 
              className="w-full sm:w-auto px-8 py-4 border border-zinc-800 text-zinc-300 font-bold tracking-widest uppercase text-xs hover:border-white hover:text-white transition-all rounded-full"
            >
              See All Victory Photos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
