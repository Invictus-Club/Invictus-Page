/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  Code2, 
  TrendingUp, 
  Zap, 
  Calculator,
  Car,
  ArrowRight
} from "lucide-react";

// Procedural High-Speed Highway Canvas (Car Escape / Fast Courier)
function HighSpeedCourierCanvas() {
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
      const vx = w * 0.5;
      const vy = h * 0.35;

      // Dark Sky
      ctx.fillStyle = "#020204";
      ctx.fillRect(0, 0, w, vy);

      // Distant City Skyline Silhouette
      ctx.fillStyle = "#080912";
      for (let i = 0; i < 20; i++) {
        const bx = (i / 20) * w;
        const bw = w / 22;
        const bh = 15 + Math.sin(i * 12) * 25 + 20;
        ctx.fillRect(bx, vy - bh, bw, bh);
      }

      // Highway Road
      ctx.beginPath();
      ctx.moveTo(vx - 25, vy);
      ctx.lineTo(vx + 25, vy);
      ctx.lineTo(w * 0.9, h);
      ctx.lineTo(w * 0.1, h);
      ctx.closePath();
      ctx.fillStyle = "#06080d";
      ctx.fill();

      // Neon Crimson Road Curbs
      ctx.strokeStyle = "rgba(217, 4, 41, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(vx - 25, vy);
      ctx.lineTo(w * 0.1, h);
      ctx.moveTo(vx + 25, vy);
      ctx.lineTo(w * 0.9, h);
      ctx.stroke();

      // High-Velocity Center Dashes
      offset = (offset + 5) % 40;
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i < 12; i++) {
        const p1 = (i + offset / 40) / 12;
        const p2 = (i + 0.45 + offset / 40) / 12;
        if (p1 > 1) continue;

        const y1 = vy + Math.pow(p1, 2.3) * (h - vy);
        const y2 = vy + Math.pow(Math.min(1, p2), 2.3) * (h - vy);
        ctx.moveTo(vx, y1);
        ctx.lineTo(vx, y2);
      }
      ctx.stroke();

      // Red Taillight Trails
      ctx.strokeStyle = "rgba(217, 4, 41, 0.6)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(vx - 8, vy + 10);
      ctx.lineTo(vx - 22, h - 20);
      ctx.moveTo(vx + 8, vy + 10);
      ctx.lineTo(vx + 22, h - 20);
      ctx.stroke();

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

export default function FreelanceWorkPage() {
  const [selectedBounty, setSelectedBounty] = useState<number>(0);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [calculatorScope, setCalculatorScope] = useState<number>(1);

  const scopeOptions = [
    { name: "High-Converting 3D Landing Page", payoutUsd: "$1,200", payoutInr: "₹1,00,000", timeline: "2 Weeks", stack: ["Next.js", "Tailwind", "Three.js / GSAP"] },
    { name: "Full-Stack SaaS MVP with Auth & Payments", payoutUsd: "$2,400", payoutInr: "₹2,00,000", timeline: "3.5 Weeks", stack: ["Next.js", "Supabase", "Stripe", "Prisma"] },
    { name: "Cross-Platform Mobile App (iOS & Android)", payoutUsd: "$3,200", payoutInr: "₹2,70,000", timeline: "4 Weeks", stack: ["React Native", "Expo", "SQLite", "EAS"] },
    { name: "AI Document Search & RAG Chat Engine", payoutUsd: "$4,000", payoutInr: "₹3,40,000", timeline: "4.5 Weeks", stack: ["FastAPI", "pgvector", "LangChain", "React"] }
  ];

  const bounties = [
    {
      category: "web",
      role: "High-Throughput Analytics Dashboard",
      client: "Fintech SaaS (Series A)",
      budget: "$2,200 USD",
      payoutInr: "₹1,85,000 INR",
      deadline: "3 Weeks",
      stack: ["Next.js 16", "Tailwind CSS", "ClickHouse", "Tremor"],
      deliverables: [
        "WebSocket connection ingesting 15,000 events/sec",
        "Canvas charts rendering sub-10ms response telemetry",
        "Role-based access control with Supabase Auth"
      ],
      vetting: "Code reviewed and security-scanned by Invictus systems leads."
    },
    {
      category: "ai",
      role: "AI Document Search & Knowledge Pipeline",
      client: "Enterprise LegalTech Startup",
      budget: "$3,400 USD",
      payoutInr: "₹2,85,000 INR",
      deadline: "4 Weeks",
      stack: ["FastAPI", "Python", "pgvector", "LangChain", "React"],
      deliverables: [
        "Document ingestion with chunking and token budget guards",
        "Hybrid semantic search using pgvector and Cohere rerankers",
        "Streamed conversational chat UI with citation anchors"
      ],
      vetting: "API key encryption and egress policies audited through club infra."
    },
    {
      category: "mobile",
      role: "Cross-Platform Logistics Mobile App",
      client: "Supply Chain & Fleet Operator",
      budget: "$1,600 USD",
      payoutInr: "₹1,35,000 INR",
      deadline: "2.5 Weeks",
      stack: ["React Native", "Expo", "TypeScript", "NativeWind"],
      deliverables: [
        "Offline-first driver inspection with local SQLite sync",
        "Turn-by-turn route telemetry tracking with battery conservation",
        "Over-the-air EAS update automation pipeline configured"
      ],
      vetting: "Tested across real physical devices in the student developer lab."
    }
  ];

  const filteredBounties = filterCategory === "all" 
    ? bounties 
    : bounties.filter(b => b.category === filterCategory);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D90429] selection:text-white">
      {/* Sleek Floating Back Button */}
      <Link 
        href="/#opportunities" 
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white hover:border-[#D90429] text-xs font-bold tracking-wider transition-all shadow-xl"
      >
        <ArrowLeft size={16} />
        <span>OPPORTUNITIES</span>
      </Link>

      {/* HERO SECTION WITH HIGH-SPEED COURIER CAR ESCAPE CANVAS */}
      <section className="relative h-[85vh] sm:h-screen flex flex-col items-center justify-center overflow-hidden border-b border-zinc-900 px-6">
        <HighSpeedCourierCanvas />

        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D90429]/30 bg-[#D90429]/10 text-[#D90429] text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(217,4,41,0.2)]"
          >
            <Car size={14} />
            <span>THE HIGH-SPEED COURIER // ESCAPE THE $10 GIGS</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-white"
          >
            ESCAPE LOW WAGES. <span className="text-[#D90429]">CASH $3,000.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg md:text-xl text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            We connect VTU student engineers directly with international startups. 40% upfront escrow, zero unpaid clients, and real production software contracts.
          </motion.p>
        </div>
      </section>

      {/* INTERACTIVE EARNINGS ESTIMATOR */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-[#D90429]" />
            <h3 className="text-2xl font-black uppercase text-white tracking-tight">
              Bounty Take-Home Estimator
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mb-8">
            Click an archetype to see real market rates earned by Invictus developers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {scopeOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setCalculatorScope(i)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  calculatorScope === i
                    ? "bg-[#D90429]/15 border-[#D90429] text-white"
                    : "bg-black/60 border-zinc-900 text-zinc-400 hover:border-zinc-800"
                }`}
              >
                <div className="text-xs font-mono text-zinc-500 mb-1">Tier 0{i+1}</div>
                <div className="text-sm font-bold text-white mb-1">{opt.name}</div>
                <div className="text-xs text-[#D90429] font-mono font-bold">{opt.payoutInr}</div>
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-black border border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                VERIFIED PAYOUT
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-5xl font-black text-[#D90429] font-mono">
                  {scopeOptions[calculatorScope].payoutInr}
                </span>
                <span className="text-sm font-mono text-zinc-400">
                  ({scopeOptions[calculatorScope].payoutUsd})
                </span>
              </div>
              <div className="text-xs text-zinc-400 mt-2 font-mono">
                Sprint Duration: {scopeOptions[calculatorScope].timeline}
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                TECH WEAPONS
              </span>
              <div className="flex flex-wrap sm:justify-end gap-1.5">
                {scopeOptions[calculatorScope].stack.map((st, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERABLE BOUNTY BOARD */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D90429] block mb-2">
              VERIFIED OPPORTUNITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              Open Client Contracts
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Bounties" },
              { id: "web", label: "Web / Frontend" },
              { id: "ai", label: "AI & APIs" },
              { id: "mobile", label: "Mobile Apps" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilterCategory(tab.id);
                  setSelectedBounty(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                  filterCategory === tab.id
                    ? "bg-[#D90429] text-white shadow-lg"
                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            {filteredBounties.map((bounty, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedBounty(idx)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  selectedBounty === idx 
                    ? "bg-zinc-900 border-[#D90429] shadow-lg" 
                    : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="text-xs font-mono text-zinc-400">{bounty.client}</span>
                  <span className="text-sm font-mono font-bold text-[#D90429]">{bounty.budget}</span>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-white mb-3">{bounty.role}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {bounty.stack.map((st, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black border border-zinc-800 text-zinc-300">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredBounties[selectedBounty] && (
            <motion.div 
              key={selectedBounty}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-10 space-y-6"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span>{filteredBounties[selectedBounty].client}</span>
                  <span className="text-[#D90429] font-bold">Timeline: {filteredBounties[selectedBounty].deadline}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {filteredBounties[selectedBounty].role}
                </h3>
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-3xl font-black font-mono text-[#D90429]">
                    {filteredBounties[selectedBounty].budget}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    ≈ {filteredBounties[selectedBounty].payoutInr}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                  Required Deliverables:
                </span>
                <div className="space-y-2">
                  {filteredBounties[selectedBounty].deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-black border border-zinc-900 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-4 bg-[#D90429] text-white font-bold tracking-widest uppercase text-xs rounded-full hover:bg-white hover:text-black transition-colors shadow-lg"
              >
                Claim Bounty via Dev Guild WhatsApp
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center border-t border-zinc-900 bg-black">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            Ready To Get Paid For Code?
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Send your GitHub profile to the Dev Guild review board and enter our active talent pool.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#D90429] text-white font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-black transition-all rounded-full shadow-[0_0_25px_rgba(217,4,41,0.3)]"
            >
              Join Invictus Dev Guild
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
