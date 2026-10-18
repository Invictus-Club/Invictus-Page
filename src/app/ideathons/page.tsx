/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  Lightbulb, 
  CheckCircle2, 
  Clock, 
  Flame, 
  HelpCircle, 
  XCircle, 
  Compass, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

// Procedural Interactive Maze Grill Radar Canvas
function FoundersMazeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      time += 0.015;

      // Dark Labyrinth Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      const size = 35;
      for (let x = 0; x < w; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Procedural Labyrinth Walls
      ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
      ctx.lineWidth = 2;
      const cx = w * 0.5;
      const cy = h * 0.45;

      for (let r = 50; r <= 180; r += 45) {
        ctx.beginPath();
        const startA = time * (r % 2 === 0 ? 0.3 : -0.3);
        ctx.arc(cx, cy, r, startA, startA + Math.PI * 1.6);
        ctx.stroke();
      }

      // Center Core Target (The Seed Check)
      ctx.fillStyle = "#FFD60A";
      ctx.shadowColor = "#FFD60A";
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" />;
}

export default function IdeathonsPage() {
  const [activeRoom, setActiveRoom] = useState<number>(0);
  const [selectedRoast, setSelectedRoast] = useState<number>(0);

  const mazeRooms = [
    {
      room: "CHAMBER 01",
      title: "The Uncomfortable Truth",
      juryTrap: "“Why wouldn't students just do this manually or on WhatsApp?”",
      badMove: "Saying 'Because our app has dark mode and better UI!' (Jury checks their phones)",
      invictusBypass: "Prove operational friction: manual coordination breaks at 40 orders. We pre-batch kitchen prep 30 minutes before the bell."
    },
    {
      room: "CHAMBER 02",
      title: "The Moat Defense",
      juryTrap: "“What stops Swiggy or Google from building this in a 2-day hackathon?”",
      badMove: "Saying 'We have first-mover advantage and we work harder!' (Instant rejection)",
      invictusBypass: "Hyper-local closed distribution: our hardware is directly keyed into the campus captive network. Zero customer acquisition cost."
    },
    {
      room: "CHAMBER 03",
      title: "The Financial Proof",
      juryTrap: "“Show me your unit margins under real payment gateway fees.”",
      badMove: "Waving hands about advertising revenue and hypothetical banner clicks.",
      invictusBypass: "Calculated unit margins: 14% net take rate with UPI auto-debit, zero merchant interchange fees via direct institutional escrow."
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

      {/* HERO SECTION WITH FOUNDERS MAZE RADAR */}
      <section className="relative h-[85vh] sm:h-screen flex flex-col items-center justify-center overflow-hidden border-b border-zinc-900 px-6">
        <FoundersMazeCanvas />

        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-zinc-300 text-xs font-bold tracking-widest uppercase shadow-lg"
          >
            <Lightbulb size={14} className="text-[#FFD60A]" />
            <span>THE PITCH LABYRINTH // JURY GRILL GAUNTLET</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-white"
          >
            SURVIVE THE <span className="text-zinc-400">PITCH MAZE.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg md:text-xl text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Ideas are cheap. Most student presentations get shredded during Q&A. We teach you how to navigate the jury cross-examination and unlock the winning grant.
          </motion.p>
        </div>
      </section>

      {/* INTERACTIVE PITCH MAZE CHAMBERS */}
      <section className="py-24 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] block mb-2">
            CROSS-EXAMINATION CHAMBERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Navigate The Jury Maze
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Click each chamber to see the lethal questions judges throw and the exact defense that unlocks the door.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {mazeRooms.map((room, idx) => (
            <button
              key={idx}
              onClick={() => setActiveRoom(idx)}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all ${
                activeRoom === idx
                  ? "bg-white text-black shadow-lg scale-105"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              <span>{room.room}: {room.title}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeRoom}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-4xl mx-auto space-y-6"
          >
            <div>
              <span className="text-xs font-mono font-bold text-[#FFD60A] uppercase tracking-widest block mb-1">
                {mazeRooms[activeRoom].room}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
                {mazeRooms[activeRoom].title}
              </h3>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 block mb-1">
                The Judge Trap:
              </span>
              <p className="text-base text-zinc-200 font-semibold italic">
                {mazeRooms[activeRoom].juryTrap}
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-xs sm:text-sm">
                <span className="font-bold text-red-400 block mb-1">The Rookie Mistake (Dead End):</span>
                <p className="text-zinc-400">{mazeRooms[activeRoom].badMove}</p>
              </div>

              <div className="p-4 rounded-xl bg-green-950/20 border border-green-900/30 text-xs sm:text-sm">
                <span className="font-bold text-green-400 block mb-1">The Invictus Defense (Door Unlocked):</span>
                <p className="text-zinc-200 font-medium">{mazeRooms[activeRoom].invictusBypass}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* FINAL HIGH-ENERGY CTA */}
      <section className="py-24 px-6 text-center border-t border-zinc-900 bg-black">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            Bring Your Raw Pitch.
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Every Thursday night in the lab, we run closed mock jury sessions. We critique the economics, pressure-test the defense, and prepare you to win.
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
