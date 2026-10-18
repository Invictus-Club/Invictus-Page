/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import { 
  ArrowLeft, 
  MapPin, 
  Compass, 
  Calendar, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Car, 
  Waves, 
  Trees, 
  Sparkles,
  Luggage,
  ArrowRight,
  Flame
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Procedural Midnight Road Animation (Car Escape Canvas)
function MidnightRoadCanvas() {
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
      const vanishingX = w / 2;
      const vanishingY = h * 0.35;

      // Dark Mist Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, vanishingY);
      skyGrad.addColorStop(0, "#000000");
      skyGrad.addColorStop(1, "#0a0d14");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, vanishingY);

      // Stars in mist
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      for (let i = 0; i < 40; i++) {
        const sx = (Math.sin(i * 99) * 0.5 + 0.5) * w;
        const sy = (Math.cos(i * 33) * 0.5 + 0.5) * vanishingY * 0.8;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Asphalt Ground
      const groundGrad = ctx.createLinearGradient(0, vanishingY, 0, h);
      groundGrad.addColorStop(0, "#05070d");
      groundGrad.addColorStop(1, "#020305");
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, vanishingY, w, h - vanishingY);

      // Road Perspective Trapezoid
      ctx.beginPath();
      ctx.moveTo(vanishingX - 20, vanishingY);
      ctx.lineTo(vanishingX + 20, vanishingY);
      ctx.lineTo(w * 0.85, h);
      ctx.lineTo(w * 0.15, h);
      ctx.closePath();
      ctx.fillStyle = "#0c1017";
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 255, 204, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Dashed Center Highway Line (Moving)
      offset = (offset + 3.5) % 40;
      ctx.strokeStyle = "#FFD60A";
      ctx.lineWidth = 3;
      ctx.beginPath();

      const numDashes = 14;
      for (let i = 0; i < numDashes; i++) {
        const p1 = (i + offset / 40) / numDashes;
        const p2 = (i + 0.5 + offset / 40) / numDashes;
        if (p1 > 1) continue;

        const y1 = vanishingY + Math.pow(p1, 2.2) * (h - vanishingY);
        const y2 = vanishingY + Math.pow(Math.min(1, p2), 2.2) * (h - vanishingY);
        const x1 = vanishingX;
        const x2 = vanishingX;

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();

      // Car Headlights Beams
      const beamGrad = ctx.createRadialGradient(vanishingX, h - 30, 10, vanishingX, h - 30, w * 0.45);
      beamGrad.addColorStop(0, "rgba(0, 255, 204, 0.25)");
      beamGrad.addColorStop(0.5, "rgba(0, 255, 204, 0.08)");
      beamGrad.addColorStop(1, "transparent");
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(vanishingX - 40, h - 20);
      ctx.lineTo(vanishingX - w * 0.4, vanishingY + 30);
      ctx.lineTo(vanishingX + w * 0.4, vanishingY + 30);
      ctx.lineTo(vanishingX + 40, h - 20);
      ctx.closePath();
      ctx.fill();

      // Taillights Glow in distance
      ctx.fillStyle = "#FF0055";
      ctx.shadowColor = "#FF0055";
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(vanishingX - 8, vanishingY + 12, 2.5, 0, Math.PI * 2);
      ctx.arc(vanishingX + 8, vanishingY + 12, 2.5, 0, Math.PI * 2);
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />;
}

// Procedural Whitewater River Current Animation
function WhitewaterRiverCanvas() {
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
      canvas.height = canvas.parentElement?.clientHeight || 450;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; speed: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * (canvas.height || 400),
        speed: 2 + Math.random() * 4,
        size: 1 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.6
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      time += 0.03;

      // Deep River Water Gradient
      const riverGrad = ctx.createLinearGradient(0, 0, w, h);
      riverGrad.addColorStop(0, "#011219");
      riverGrad.addColorStop(0.5, "#02242e");
      riverGrad.addColorStop(1, "#010e14");
      ctx.fillStyle = riverGrad;
      ctx.fillRect(0, 0, w, h);

      // River Water Current Swirls
      ctx.strokeStyle = "rgba(0, 255, 204, 0.12)";
      ctx.lineWidth = 1.5;
      for (let j = 0; j < 6; j++) {
        ctx.beginPath();
        const baseY = (h / 7) * (j + 1);
        ctx.moveTo(0, baseY);
        for (let x = 0; x < w; x += 30) {
          const waveY = baseY + Math.sin(x * 0.015 + time + j) * 16 + Math.cos(x * 0.03 - time * 0.8) * 8;
          ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }

      // Foam and Whitewater Rapids Particles
      particles.forEach((p) => {
        p.x -= p.speed;
        p.y += Math.sin(p.x * 0.02 + time) * 1.5;
        if (p.x < 0) {
          p.x = w + 10;
          p.y = Math.random() * h;
        }

        ctx.fillStyle = `rgba(180, 255, 240, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl opacity-75" />;
}

export default function OffsiteProjectDevPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStory, setActiveStory] = useState(0);
  const [activeVilla, setActiveVilla] = useState<"dandeli" | "gokarna">("dandeli");

  const storyChapters = [
    {
      id: "car-escape",
      badge: "THE MIDNIGHT CAR ESCAPE",
      icon: Car,
      color: "#FFD60A",
      title: "2:00 AM Convoy Through Western Ghats Mist",
      lead: "Escape the suffocating lecture halls, attendance spreadsheets, and campus politics. Four cars, trunks loaded with monitors and sleeping bags, rolling down the empty midnight highway.",
      quote: "“The cold mountain air hits your face at 3:30 AM at the highway tea stall. Everyone is wide awake, buzzing about the repo we're going to build.”",
      details: [
        "4-Car Midnight Convoy departing Belagavi at 2:00 AM",
        "Winding ghats road with headlights piercing dense forest fog",
        "Hot Dhaba chai & parottas at the Karnataka border",
        "Zero notifications. Zero academic drama. Absolute freedom."
      ]
    },
    {
      id: "bear-walk",
      badge: "DEEP IN SLOTH BEAR COUNTRY",
      icon: Trees,
      color: "#00FFCC",
      title: "Wilderness Seclusion in Dandeli's Teak Jungle",
      lead: "We enter the dense Dandeli forest where hornbills fly over the canopy and sloth bears walk the river trails at dusk. The villa sits completely off the grid.",
      quote: "“You wake up to mist rolling over the teak trees. Your phone says 'No Service'. You plug into the Starlink dish, brew black coffee, and dive into 10 hours of flow.”",
      details: [
        "Hidden private villa surrounded by towering wilderness",
        "Starlink Satellite dish beamed to low-earth orbit (180 Mbps)",
        "Giant whiteboard glass walls for whole-squad architecture mapping",
        "Campfire standups where we roast each other's code under the stars"
      ]
    },
    {
      id: "river-rapids",
      badge: "KALI RIVER WHITEWATER EXPEDITION",
      icon: Waves,
      color: "#38BDF8",
      title: "Grade-3 Rapids & Midnight Campfire Merges",
      lead: "When code hits a dead end, we drop laptops, buckle into life jackets, and battle the Grade-3 whitewater rapids of the Kali River. Ice-cold river spray washes away all burnout.",
      quote: "“Nothing clears your mind like paddling through a roaring rapid with 6 teammates screaming at the top of their lungs. You return to the keyboard with insane clarity.”",
      details: [
        "3-Hour Whitewater Rafting down the Kali River gorge",
        "Kayaking and cliff jumps to reset after grueling all-nighters",
        "Cooking group chicken biryani and dal in the villa outdoor stove",
        "Merging 8 pull requests to production before Sunday midnight"
      ]
    }
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white selection:bg-[#00FFCC] selection:text-black">
      {/* Sleek Floating Back Button */}
      <Link 
        href="/#opportunities" 
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white hover:border-[#00FFCC] text-xs font-bold tracking-wider transition-all shadow-xl"
      >
        <ArrowLeft size={16} />
        <span>OPPORTUNITIES</span>
      </Link>

      {/* HERO SECTION WITH CINEMATIC MIDNIGHT ROAD ESCAPE ANIMATION */}
      <section className="relative h-[90vh] sm:h-screen flex flex-col items-center justify-center overflow-hidden border-b border-zinc-900 px-6">
        <MidnightRoadCanvas />

        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#00FFCC]/30 bg-[#00FFCC]/10 text-[#00FFCC] text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(0,255,204,0.2)]"
          >
            <Car size={15} />
            <span>EXPEDITION PROTOCOL // THE MIDNIGHT CONVOY</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-white"
          >
            THE GREAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] via-white to-[#00FFCC]">ESCAPE.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg md:text-xl text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Pack your monitors into the car trunk. We leave campus behind, drive through the Western Ghats mist, and build production systems in private jungle villas.
          </motion.p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Compass size={14} className="text-[#00FFCC]" /> Dandeli Bear Country
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Waves size={14} className="text-[#38BDF8]" /> Kali River Rapids
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Flame size={14} className="text-[#FFD60A]" /> Campfire Code Merges
            </span>
          </div>
        </div>
      </section>

      {/* STORY CHAPTERS INTERACTIVE EXPEDITION VIEWER */}
      <section className="py-24 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00FFCC] block mb-2">
            THE 3-ACT OFFSITE JOURNEY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Experience The Expedition
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Click each chapter to uncover the story of how Invictus cohorts build, recharge, and ship in the wild.
          </p>
        </div>

        {/* Chapter Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto mb-12">
          {storyChapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setActiveStory(idx)}
              className={`p-5 rounded-2xl text-left border transition-all ${
                activeStory === idx
                  ? "bg-zinc-900 border-[#00FFCC] text-white shadow-[0_0_30px_rgba(0,255,204,0.15)] scale-[1.02]"
                  : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold" style={{ color: ch.color }}>ACT 0{idx + 1}</span>
                <ch.icon size={16} style={{ color: ch.color }} />
              </div>
              <h4 className="font-bold text-sm text-white">{ch.badge}</h4>
            </button>
          ))}
        </div>

        {/* Active Chapter Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="p-8 sm:p-14 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-5xl mx-auto space-y-8 relative overflow-hidden"
          >
            {activeStory === 2 && <WhitewaterRiverCanvas />}

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest block mb-1" style={{ color: storyChapters[activeStory].color }}>
                  ACT 0{activeStory + 1} OF 3
                </span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                  {storyChapters[activeStory].title}
                </h3>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 font-mono font-bold self-start md:self-auto">
                {storyChapters[activeStory].badge}
              </span>
            </div>

            <p className="relative z-10 text-base sm:text-xl text-zinc-200 leading-relaxed max-w-4xl font-normal">
              {storyChapters[activeStory].lead}
            </p>

            <blockquote className="relative z-10 p-5 rounded-2xl bg-black/70 border border-zinc-800 text-sm sm:text-base text-zinc-300 italic font-medium leading-relaxed">
              {storyChapters[activeStory].quote}
            </blockquote>

            <div className="relative z-10 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                Expedition Intel & Highlights:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {storyChapters[activeStory].details.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-black/60 border border-zinc-900 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 size={16} className="text-[#00FFCC] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* CONFIRMED RESIDENCIES: DANDELI VS GOKARNA */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#00FFCC] block mb-2">
              UPCOMING EXPEDITIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              Choose Your Sanctuary
            </h2>
          </div>

          <div className="inline-flex p-1.5 rounded-full bg-zinc-900 border border-zinc-800">
            <button
              onClick={() => setActiveVilla("dandeli")}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                activeVilla === "dandeli"
                  ? "bg-[#00FFCC] text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Dandeli Forest Villa
            </button>
            <button
              onClick={() => setActiveVilla("gokarna")}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                activeVilla === "gokarna"
                  ? "bg-[#00FFCC] text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Gokarna Beach Residency
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-72 sm:h-96 lg:h-auto relative overflow-hidden">
              <img 
                src={activeVilla === "dandeli" ? "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop" : "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop"} 
                alt="Retreat location"
                className="w-full h-full object-cover filter brightness-75 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent lg:hidden" />
            </div>

            <div className="p-8 sm:p-12 space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#00FFCC] mb-2 uppercase">
                  <MapPin size={14} />
                  <span>{activeVilla === "dandeli" ? "Dandeli Teak Forest • Kali River Basin" : "Kudle Beach Shoreline • Gokarna"}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black uppercase text-white mb-4">
                  {activeVilla === "dandeli" ? "Dandeli Forest Hacker Villa" : "Gokarna Coastal Dev Residency"}
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {activeVilla === "dandeli" 
                    ? "Private forest villa surrounded by river trails and wildlife. High-speed Starlink dishes, whiteboards on every wall, and late-night campfire code reviews." 
                    : "Ocean-facing desks where you write software to the sound of crashing waves. Sunset swims, fresh coastal seafood, and 72-hour development sprints."}
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-900 space-y-3">
                <div className="text-xs font-mono text-zinc-400">
                  <span className="text-white font-bold">TIMING:</span> {activeVilla === "dandeli" ? "Late November 2026 (4 Days / 3 Nights)" : "January 2027 (5 Days / 4 Nights)"}
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  <span className="text-white font-bold">CAPACITY:</span> Strictly limited to 15 developers for focused collaboration
                </div>
                <div className="pt-2">
                  <a
                    href="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00FFCC] text-black font-bold uppercase text-xs rounded-full hover:bg-white transition-all shadow-lg"
                  >
                    <span>Request Cohort Invite</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL HIGH-ENERGY CTA */}
      <section className="py-24 px-6 text-center border-t border-zinc-900 bg-black">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            Leave Campus. Build Real Software.
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            The best code of your college life won&apos;t happen inside an examination hall. It happens under the stars with peers who push you to be great.
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
              All Opportunities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
