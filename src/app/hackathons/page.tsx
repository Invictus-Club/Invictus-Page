/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Code2, 
  Zap, 
  Coffee, 
  Compass, 
  Crosshair,
  ShieldAlert,
  ArrowRight
} from "lucide-react";

// Procedural Interactive Hackathon Arena Radar / Maze Grill
function TournamentMazeRadarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let scanAngle = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    resize();
    window.addEventListener("resize", resize);

    // Arena Grid Nodes
    const nodes = [
      { x: 0.2, y: 0.3, label: "00:00 KICKOFF", color: "#FFD60A", pulse: 0 },
      { x: 0.45, y: 0.25, label: "06:00 DEPLOY", color: "#00FFCC", pulse: 1 },
      { x: 0.35, y: 0.65, label: "14:00 3AM CRASH", color: "#FF0055", pulse: 2 },
      { x: 0.7, y: 0.5, label: "20:00 JURY GRILL", color: "#FFD60A", pulse: 3 },
      { x: 0.85, y: 0.3, label: "24:00 PODIUM", color: "#FFFFFF", pulse: 4 }
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      scanAngle += 0.02;

      // Dark Arena Grid Background
      ctx.strokeStyle = "rgba(255, 214, 10, 0.05)";
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Rotating Radar Beam
      const cx = w * 0.5;
      const cy = h * 0.45;
      const radius = Math.min(w, h) * 0.45;

      const beamGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
      beamGrad.addColorStop(0, "rgba(255, 214, 10, 0.12)");
      beamGrad.addColorStop(1, "transparent");
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Radar Sweep Line
      ctx.strokeStyle = "rgba(255, 214, 10, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(scanAngle) * radius, cy + Math.sin(scanAngle) * radius);
      ctx.stroke();

      // Connecting Squad Paths
      ctx.strokeStyle = "rgba(255, 214, 10, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      nodes.forEach((n, idx) => {
        const nx = n.x * w;
        const ny = n.y * h;
        if (idx === 0) ctx.moveTo(nx, ny);
        else ctx.lineTo(nx, ny);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      // Nodes
      nodes.forEach((n) => {
        const nx = n.x * w;
        const ny = n.y * h;

        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(nx, ny, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = "bold 10px monospace";
        ctx.fillStyle = "#A1A1AA";
        ctx.fillText(n.label, nx + 10, ny + 4);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />;
}

export default function HackathonsPage() {
  const [activeHour, setActiveHour] = useState(0);
  const [activeRole, setActiveRole] = useState(0);

  const timelineSteps = [
    {
      time: "00:00",
      stage: "The Maze Drop",
      label: "Problem Reveal & Architecture Lock",
      desc: "No endless debates. The squad picks the problem statement, sketches the user journey on Figma or a napkin, and locks the feature list. 3 core features. Zero scope creep.",
      stack: ["Whiteboard", "Figma", "Prisma Schemas"],
      tip: "If an idea takes more than 2 minutes to explain to a 10-year-old, trash it."
    },
    {
      time: "06:00",
      stage: "The First Breach",
      label: "Monorepo Scaffold & Setup",
      desc: "Both frontend and backend branches push to main with CI/CD. Mock endpoints are live so the frontend team starts building UI without waiting on APIs.",
      stack: ["Next.js 16", "Supabase", "Turborepo", "Tailwind"],
      tip: "Deploy hello-world to production in the first hour. Never debug deployments at 4 AM."
    },
    {
      time: "14:00",
      stage: "The Gauntlet Grill",
      label: "The 3:00 AM Sprint & Coffee",
      desc: "The core engine gets hooked up. Hardware sensors calibrate, AI pipelines test against fallback prompts, and Invictus alumni jump on Discord voice to review live pull requests.",
      stack: ["FastAPI", "WebSockets", "Docker", "Hardware I/O"],
      tip: "When the conference center Wi-Fi drops, switch immediately to mobile hotspot without panic."
    },
    {
      time: "20:00",
      stage: "The Boss Chamber",
      label: "Feature Freeze & Demo Polish",
      desc: "Code freeze. No new features allowed. We seed real test data, record an emergency local screen capture in case Wi-Fi dies, and run mock jury cross-examinations.",
      stack: ["Screen Recording", "Seed Data", "Edge Cases"],
      tip: "Judges don't inspect your lines of code. They evaluate what happens when they click the button."
    },
    {
      time: "24:00",
      stage: "The Victory Escape",
      label: "The 3-Minute Pitch & Trophy",
      desc: "The pitch presenter takes the stage. 60 seconds on the problem, 90 seconds live interactive demo, 30 seconds on business viability. The trophy goes back to Belagavi.",
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

      {/* HERO SECTION WITH RADAR MAZE CANVAS */}
      <section className="relative h-[85vh] sm:h-screen flex flex-col items-center justify-center overflow-hidden border-b border-zinc-900 px-6">
        <TournamentMazeRadarCanvas />

        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD60A]/30 bg-[#FFD60A]/10 text-[#FFD60A] text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,214,10,0.2)]"
          >
            <Trophy size={14} />
            <span>THE 24-HOUR BATTLEGROUND // INVICTUS WAR ROOM</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-white"
          >
            ENTER THE MAZE. <span className="text-[#FFD60A]">TAKE THE TROPHY.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg md:text-xl text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Survive the 24-hour tournament gauntlet. 4-person power squads, sponsored travel to national arenas, 3:00 AM coffee sprints, and podium finishes.
          </motion.p>
        </div>
      </section>

      {/* INTERACTIVE 24-HOUR GAUNTLET MAZE SCRUBBER */}
      <section className="py-24 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] block mb-2">
            THE TOURNAMENT GAUNTLET
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Step Through The 24-Hour Maze
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Click each hour mark to see how we bypass judge traps, survive bugs, and escape with the trophy.
          </p>
        </div>

        {/* Step Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {timelineSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveHour(idx)}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeHour === idx
                  ? "bg-[#FFD60A] text-black shadow-[0_0_25px_rgba(255,214,10,0.4)] scale-105"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              <Clock size={14} />
              <span>{step.time} — {step.stage}</span>
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
                  GAUNTLET CHAMBER 0{activeHour + 1} OF 5
                </span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                  {timelineSteps[activeHour].label}
                </h3>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono font-bold self-start md:self-auto">
                {timelineSteps[activeHour].stage}
              </span>
            </div>

            <p className="text-base sm:text-lg text-zinc-300 mt-6 leading-relaxed">
              {timelineSteps[activeHour].desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-6 border-t border-zinc-900">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-3">
                  Arsenal Used In This Chamber:
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
                  Invictus Survival Advice:
                </span>
                <p className="text-xs sm:text-sm text-zinc-400 italic bg-black/60 p-3.5 rounded-xl border border-zinc-900">
                  &ldquo;{timelineSteps[activeHour].tip}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* SQUAD POSITION PICKER */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] block mb-2">
            CHOOSE YOUR WEAPON
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Pick Your Squad Position
          </h2>
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
              Squad Core
            </span>
          </div>

          <p className="text-base sm:text-lg text-zinc-300 mb-6 leading-relaxed">
            {squadRoles[activeRole].duty}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-900">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                Tech Weapons:
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
                Battle Impact:
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
              <p className="text-sm text-zinc-400 leading-relaxed">
                Engineered an offline LoRa emergency network relaying live telemetry when cell towers are down.
              </p>
            </div>
          </div>

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
              <p className="text-sm text-zinc-400 leading-relaxed">
                Limit order book simulator in Rust with real-time canvas visualizers, taking home ₹1,00,000 cash.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL HIGH-ENERGY CTA */}
      <section className="py-24 px-6 text-center border-t border-zinc-900 bg-black">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            Ready To Enter The Arena?
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Upcoming national hackathons are assembling squads right now. Join the auditions and put your name on the next trophy.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/events" 
              className="w-full sm:w-auto px-8 py-4 bg-[#FFD60A] text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-full shadow-[0_0_25px_rgba(255,214,10,0.3)]"
            >
              Browse Tournaments
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
