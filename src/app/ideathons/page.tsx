/* eslint-disable */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  Lightbulb, 
  CheckCircle2, 
  Mic, 
  Clock, 
  Flame, 
  Sparkles,
  HelpCircle,
  TrendingUp,
  XCircle
} from "lucide-react";

export default function IdeathonsPage() {
  const [activeMinute, setActiveMinute] = useState<number>(0);
  const [selectedRoast, setSelectedRoast] = useState<number>(0);

  const pitchMinutes = [
    {
      minute: "00:00 — 01:00",
      stage: "The Villain & Pain Point",
      goal: "Hook the judges by proving the current status quo is broken.",
      whatToSay: "State the single biggest point of friction in 20 seconds. Ground it with real user stories or verified data. Never start with 'Good morning esteemed judges'.",
      deadlyMistake: "Spending 45 seconds introducing all 4 team members and their college branch.",
      invictusRule: "If you don't make the judges uncomfortable about the problem in 30 seconds, they will check their phones."
    },
    {
      minute: "01:00 — 02:00",
      stage: "The Working Mechanism",
      goal: "Reveal how your product fundamentally solves the friction.",
      whatToSay: "Walk through the core user loop. Show a real screen or physical mockup. Explain why existing solutions failed to solve it (cost, latency, distribution).",
      deadlyMistake: "Showing 10 bullet points of speculative future features instead of 1 working mechanism.",
      invictusRule: "Depth beats breadth every single time. One sharp knife beats a broken Swiss Army tool."
    },
    {
      minute: "02:00 — 03:00",
      stage: "The Defense & Viability",
      goal: "Prove you understand distribution, cost structure, and competition.",
      whatToSay: "Explain how you acquire your first 500 users for $0. Explain your competitive moat when a funded competitor tries to copy you.",
      deadlyMistake: "Saying 'We have no competitors' or 'Everyone in India is our target customer'.",
      invictusRule: "Acknowledge your competition with confidence, then explain the exact blind spot they ignore."
    }
  ];

  const pitchRoasts = [
    {
      title: "Campus Food Delivery App",
      badPitch: "“It's like Swiggy, but specifically for our college canteen with a modern UI!”",
      roastedFeedback: "“Why wouldn't students just send a WhatsApp message to the canteen anna? High delivery friction and negative margins.”",
      invictusRewrite: "“Pre-ordered batch ticketing: Canteen prepares 80 thalis ahead of the 1:15 PM bell. Zero wait time for students, guaranteed volume for the canteen.”",
      verdict: "Turned into an operational optimization problem rather than a generic clone."
    },
    {
      title: "AI Attendance Facial Recognition",
      badPitch: "“Students walk in front of a camera and an AI face detector records attendance automatically!”",
      roastedFeedback: "“Fails in low-light lecture halls, camera bottlenecks at the door cause 10-minute entry queues, and students hold up photos on their phones.”",
      invictusRewrite: "“Dual-factor Bluetooth Low Energy beacon ping with rotating ephemeral challenge tokens verified only when connected to the classroom AP.”",
      verdict: "Addresses real hardware friction that judges love to drill into."
    },
    {
      title: "Blockchain Certificate Verification",
      badPitch: "“We put college graduation degree certificates on Ethereum so nobody can fake their marks!”",
      roastedFeedback: "“Why pay $12 gas fees when VTU can just sign a PDF with a private cryptographic RSA key?”",
      invictusRewrite: "“Zero-knowledge credential proofs: Students prove their aggregate GPA > 8.5 to recruiters without disclosing individual subject grades.”",
      verdict: "Protects student privacy while removing redundant blockchain gas overhead."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Sleek Floating Back Button */}
      <Link 
        href="/#opportunities" 
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white hover:border-white text-xs font-bold tracking-wider transition-all shadow-xl"
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-zinc-300 text-xs font-bold tracking-widest uppercase mb-6"
        >
          <Lightbulb size={14} className="text-[#FFD60A]" />
          <span>INVICTUS VENTURE & PITCH LAB</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.9] text-white max-w-5xl"
        >
          IDEAS ARE CHEAP. <span className="text-zinc-400">DEFEND YOUR THESIS.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-zinc-400 font-medium max-w-2xl mt-8 leading-relaxed"
        >
          Most college pitch presentations get torn apart during the first 60 seconds of Q&A. We run mock investor cross-examinations so your thesis is bulletproof on stage.
        </motion.p>
      </section>

      {/* INTERACTIVE 3-MINUTE PITCH BREAKDOWN */}
      <section className="py-16 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] block mb-2">
            STAGE MASTERY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            The 3-Minute Pitch Simulator
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Click through each minute to master what to say and what will get you roasted by judges.
          </p>
        </div>

        {/* Minute Selectors */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {pitchMinutes.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveMinute(i)}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeMinute === i
                  ? "bg-white text-black shadow-lg scale-105"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              <Clock size={14} />
              <span>Minute 0{i + 1}: {p.stage}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMinute}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-4xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono font-bold text-[#FFD60A] uppercase tracking-widest block mb-1">
                  TIMELINE WINDOW: {pitchMinutes[activeMinute].minute}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
                  {pitchMinutes[activeMinute].stage}
                </h3>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 font-medium">
                Goal: {pitchMinutes[activeMinute].goal}
              </span>
            </div>

            <div className="space-y-6 mt-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-green-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 size={15} /> What You Should Say:
                </span>
                <p className="text-sm sm:text-base text-zinc-200 bg-black/60 p-4 rounded-2xl border border-zinc-900 leading-relaxed">
                  {pitchMinutes[activeMinute].whatToSay}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5 mb-2">
                  <XCircle size={15} /> The Deadly College Mistake:
                </span>
                <p className="text-sm sm:text-base text-zinc-400 bg-black/60 p-4 rounded-2xl border border-zinc-900 leading-relaxed">
                  {pitchMinutes[activeMinute].deadlyMistake}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD60A] block mb-1">
                  Invictus Golden Rule:
                </span>
                <p className="text-xs sm:text-sm text-zinc-400 font-mono italic">
                  &ldquo;{pitchMinutes[activeMinute].invictusRule}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* INTERACTIVE ROAST MY PITCH BOX */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] block mb-2">
            PITCH CLINIC
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            The Pitch Tear-Down Lab
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Click through common student pitch submissions to see why judges reject them and how Invictus rewrites them to win.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto mb-8">
          {pitchRoasts.map((r, i) => (
            <button
              key={i}
              onClick={() => setSelectedRoast(i)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                selectedRoast === i 
                  ? "bg-zinc-900 border-white text-white" 
                  : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
              }`}
            >
              <span className="text-xs font-mono text-zinc-500 block mb-1">Case 0{i + 1}</span>
              <h4 className="font-bold text-sm text-white">{r.title}</h4>
            </button>
          ))}
        </div>

        <motion.div 
          key={selectedRoast}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-4xl mx-auto space-y-6"
        >
          <div>
            <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest block mb-1">
              PROPOSAL BRIEF
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">{pitchRoasts[selectedRoast].title}</h3>
          </div>

          <div className="p-5 rounded-2xl bg-red-950/20 border border-red-900/30 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400 block">
              The Common Student Pitch:
            </span>
            <p className="text-sm text-zinc-300 italic">{pitchRoasts[selectedRoast].badPitch}</p>
            <div className="pt-2 text-xs text-red-400 font-mono">
              Judge Roast: {pitchRoasts[selectedRoast].roastedFeedback}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-green-950/20 border border-green-900/30 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-green-400 block">
              The Invictus Redesign (The Winner):
            </span>
            <p className="text-sm text-zinc-200 font-medium leading-relaxed">{pitchRoasts[selectedRoast].invictusRewrite}</p>
            <div className="pt-2 text-xs text-green-400 font-mono">
              Why it wins: {pitchRoasts[selectedRoast].verdict}
            </div>
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center border-t border-zinc-900 bg-black">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            Bring Your Raw Hypothesis.
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Have a crazy idea you want to defend? Bring it to our Thursday night mock pitch reviews. We will tear it apart and rebuild it with you.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/events" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold tracking-widest uppercase text-xs hover:bg-zinc-200 transition-all rounded-full shadow-lg"
            >
              Browse Innovation Events
            </Link>
            <Link 
              href="/#opportunities" 
              className="w-full sm:w-auto px-8 py-4 border border-zinc-800 text-zinc-300 font-bold tracking-widest uppercase text-xs hover:border-white hover:text-white transition-all rounded-full"
            >
              All Opportunities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
