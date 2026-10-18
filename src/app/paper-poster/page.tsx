/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  Presentation, 
  Eye, 
  CheckCircle2, 
  QrCode, 
  Maximize2, 
  AlertTriangle,
  ArrowRight
} from "lucide-react";

// Procedural Brutalist Gallery Perspective Canvas (Drone Fly-Through / Gallery Perspective)
function GalleryPerspectiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let offset = 0;

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
      const cx = w * 0.5;
      const cy = h * 0.42;

      offset = (offset + 0.8) % 60;

      // Gallery Floor & Ceiling Perspective Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      for (let i = -6; i <= 6; i++) {
        const x = cx + i * (w / 10);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, h);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, 0);
        ctx.stroke();
      }

      // Moving Gallery Frames / Posters on Left & Right Walls
      for (let j = 0; j < 5; j++) {
        const depth = ((j * 60 + offset) % 300) / 300;
        const scale = Math.pow(depth, 1.8);
        const frameW = 80 * scale;
        const frameH = 110 * scale;
        const leftX = cx - (w * 0.45 * scale) - frameW;
        const rightX = cx + (w * 0.45 * scale);
        const frameY = cy - frameH * 0.5;

        // Left Frame
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.fillStyle = "rgba(20, 20, 25, 0.6)";
        ctx.strokeRect(leftX, frameY, frameW, frameH);
        ctx.fillRect(leftX, frameY, frameW, frameH);

        // Right Frame
        ctx.strokeRect(rightX, frameY, frameW, frameH);
        ctx.fillRect(rightX, frameY, frameW, frameH);
      }

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

export default function PaperPosterPage() {
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  const posterSections = [
    {
      title: "10-Second Billboard Headline",
      tagline: "Readable from 10 feet away across a busy hall",
      advice: "Your title should state the actual discovery or metric, not generic filler like 'A Study On Distributed Networks'. Use 64pt+ bold typography.",
      example: "“LoRa Mesh Delivers 98.4% Telemetry Under Zero Cellular Coverage”"
    },
    {
      title: "The Core Visual Architecture",
      tagline: "Replaces 4 paragraphs of dense text",
      advice: "Evaluators scan before they read. An intuitive, clean vector diagram showing the input, transformation layer, and output gets 80% of the attention.",
      example: "Step-by-step data pipeline with high-contrast arrows and clean icon tags."
    },
    {
      title: "The Decisive Benchmark Plot",
      tagline: "One killer graph beats 10 data tables",
      advice: "Never paste raw Excel tables. Highlight the single comparison chart showing your system outperforming existing baselines with bold labels.",
      example: "Latency curve comparison: 4-bit Quantization vs FP16 baseline across 100 trials."
    },
    {
      title: "The 30-Second Takeaway & QR",
      tagline: "Immediate follow-through for interested faculty",
      advice: "Include a sharp 3-bullet executive summary and a high-contrast QR code linking directly to the open-source GitHub repo or camera-ready PDF.",
      example: "Direct link to arXiv preprint + interactive web demo on Vercel."
    }
  ];

  const commonMistakes = [
    { title: "The Wall of Text", desc: "Printing a 6-page research paper onto an A0 poster. Nobody reads paragraphs on an exhibition floor." },
    { title: "Low-Res Screenshots", desc: "Pasting 72 DPI screen grabs that turn into pixelated mush when printed at 300 DPI." },
    { title: "Invisible Contrast", desc: "Using light gray text on white or neon text on black that strains evaluator eyes under hall lighting." }
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

      {/* HERO SECTION WITH GALLERY PERSPECTIVE CANVAS */}
      <section className="relative h-[85vh] sm:h-screen flex flex-col items-center justify-center overflow-hidden border-b border-zinc-900 px-6">
        <GalleryPerspectiveCanvas />

        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-zinc-300 text-xs font-bold tracking-widest uppercase shadow-lg"
          >
            <Presentation size={14} className="text-[#FFD60A]" />
            <span>THE GALLERY FLY-THROUGH // STREETWEAR FOR RESEARCH</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-white"
          >
            POSTERS ARE <span className="text-zinc-400">SHOWPIECES.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg md:text-xl text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Turn dense academic papers into striking, architectural exhibition posters that command attention across crowded national symposiums.
          </motion.p>
        </div>
      </section>

      {/* INTERACTIVE POSTER ANATOMY INSPECTOR */}
      <section className="py-24 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD60A] block mb-2">
            ANATOMY OF A WINNING POSTER
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Click A Component To Inspect
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {posterSections.map((sec, i) => (
            <button
              key={i}
              onClick={() => setActiveHotspot(i)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                activeHotspot === i
                  ? "bg-white text-black shadow-lg scale-105"
                  : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
              }`}
            >
              <span className="text-xs font-mono font-bold block mb-1">Zone 0{i + 1}</span>
              <h4 className="font-bold text-sm leading-snug">{sec.title}</h4>
            </button>
          ))}
        </div>

        <motion.div
          key={activeHotspot}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-4xl mx-auto space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <span className="text-xs font-mono font-bold text-[#FFD60A] uppercase tracking-widest block mb-1">
                INSPECTION FOCUS: ZONE 0{activeHotspot + 1}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
                {posterSections[activeHotspot].title}
              </h3>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 font-medium self-start sm:self-auto">
              {posterSections[activeHotspot].tagline}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                Evaluator Guideline:
              </span>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal bg-black/60 p-4 rounded-2xl border border-zinc-900">
                {posterSections[activeHotspot].advice}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFD60A] block mb-1">
                Real Winning Example:
              </span>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono italic">
                {posterSections[activeHotspot].example}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* COMMON MISTAKES */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-red-400 block mb-2">
            WHAT GETS YOU IGNORED
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            3 Costly Exhibition Errors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {commonMistakes.map((m, i) => (
            <div key={i} className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h4 className="font-bold text-lg text-white">{m.title}</h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL HIGH-ENERGY CTA */}
      <section className="py-24 px-6 text-center border-t border-zinc-900 bg-black">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            Print Your Research Showpiece.
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Invictus provides high-resolution Figma and LaTeX poster templates tuned specifically for VTU and IEEE conference specifications.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/events" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold tracking-widest uppercase text-xs hover:bg-zinc-200 transition-all rounded-full shadow-lg"
            >
              Browse Upcoming Symposia
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
