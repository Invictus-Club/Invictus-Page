/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, TorusKnot } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShieldCheck, 
  FileCheck, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  ExternalLink
} from "lucide-react";

// Minimal Architectural Knot Core
function ArchitecturalKnotMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1} floatIntensity={1.2}>
      <TorusKnot ref={meshRef} args={[1.5, 0.38, 128, 32]} scale={1.2}>
        <meshStandardMaterial 
          color="#D90429" 
          emissive="#550010"
          emissiveIntensity={0.35}
          roughness={0.2} 
          metalness={0.9} 
          wireframe={false}
        />
      </TorusKnot>
    </Float>
  );
}

export default function FreelanceWorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedBounty, setSelectedBounty] = useState<number>(0);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenis.scrollTo(0, { immediate: true });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const realBounties = [
    {
      role: "High-Throughput Analytics Dashboard",
      client: "Fintech SaaS (Series A)",
      budget: "$2,200 USD",
      payoutInr: "₹1,85,000 INR",
      deadline: "3 Weeks",
      stack: ["Next.js 16", "Tailwind CSS", "ClickHouse", "Tremor"],
      deliverables: [
        "WebSocket feed consuming 15,000 real-time events/sec",
        "Canvas charts rendering sub-10ms latency metrics",
        "Role-based access control with session revocation"
      ],
      vetting: "Code reviewed and security-scanned by Invictus systems leads."
    },
    {
      role: "Enterprise RAG & Knowledge Pipeline",
      client: "Enterprise LegalTech Startup",
      budget: "$3,400 USD",
      payoutInr: "₹2,85,000 INR",
      deadline: "4 Weeks",
      stack: ["FastAPI", "Python", "pgvector", "LangChain", "React"],
      deliverables: [
        "Document ingestion with chunking and token budget guards",
        "Hybrid semantic search using pgvector and rerankers",
        "Streamed conversational chat UI with citation anchors"
      ],
      vetting: "API key encryption and egress policies audited through club infra."
    },
    {
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

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-x-clip selection:bg-[#D90429] selection:text-white">
      {/* Sleek Minimalist Floating Back Button */}
      <Link 
        href="/#opportunities" 
        className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 text-xs font-mono uppercase tracking-widest transition-all"
      >
        <ArrowLeft size={14} />
        <span>Base</span>
      </Link>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center border-b border-zinc-900">
        <div className="absolute inset-0 z-0 opacity-70">
          <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2.2} color="#D90429" />
            <directionalLight position={[-10, -5, -5]} intensity={1.2} color="#FFFFFF" />
            <ArchitecturalKnotMesh />
            <OrbitControls enableZoom={false} maxDistance={14} minDistance={4} autoRotate autoRotateSpeed={0.6} />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,4,41,0.06),transparent_65%)] pointer-events-none" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none px-6 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 text-[11px] font-mono font-medium tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D90429]" />
            DEV GUILD // COMMERCIAL CONTRACTS
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[9.5rem] font-black tracking-tighter text-white leading-[0.88] uppercase">
            FREELANCE
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-mono tracking-[0.2em] uppercase mt-6 max-w-xl mx-auto leading-relaxed">
            High-Value Production Engineering For Startups And Modern Tech Companies.
          </p>
        </motion.div>
      </section>

      {/* AGENCY MODEL */}
      <section className="py-24 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-zinc-900">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#D90429] uppercase mb-2 block">
              // 01 / GUILD MODEL
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
              The Developer Collective
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-md">
            Guaranteed escrow deposits, peer architecture review, and public case-study credit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "Escrow Deposit Protection",
              desc: "Contracts begin with upfront milestone escrow funding. Developers are never exposed to unpaid client handoffs or scope drift."
            },
            {
              icon: FileCheck,
              title: "Senior Code Quality Gate",
              desc: "Every milestone PR undergoes architecture and security audits by Invictus tech leads before client delivery."
            },
            {
              icon: TrendingUp,
              title: "Full Attribution & Credit",
              desc: "Members retain public portfolio attribution. Several student builders have converted freelance clients into full-time roles."
            }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-[#D90429]/40 transition-all flex flex-col justify-between group">
              <div>
                <item.icon className="w-6 h-6 text-[#D90429] mb-6" />
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500 flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#D90429] shrink-0" /> Verified Escrow Guarantee
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE BOUNTY BOARD */}
      <section className="py-24 bg-[#040404] border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-zinc-900">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#D90429] uppercase mb-2 block">
                // 02 / ACTIVE CONTRACTS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
                Client Bounties
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              {realBounties.length} Verified Production Contracts
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* List */}
            <div className="lg:col-span-5 space-y-3">
              {realBounties.map((bounty, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedBounty(idx)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                    selectedBounty === idx 
                      ? "bg-zinc-900/90 border-[#D90429]/60 shadow-[0_0_30px_rgba(217,4,41,0.1)]" 
                      : "bg-zinc-950/60 border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-xs font-mono text-zinc-400">{bounty.client}</span>
                    <span className="text-sm font-mono font-bold text-[#D90429]">{bounty.budget}</span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-white mb-3">{bounty.role}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {bounty.stack.slice(0, 3).map((st, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Dossier */}
            <div className="lg:col-span-7 bg-zinc-950/80 border border-white/[0.08] rounded-2xl p-8 sm:p-10 space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span>{realBounties[selectedBounty].client}</span>
                  <span className="text-[#D90429] font-bold">Timeline: {realBounties[selectedBounty].deadline}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {realBounties[selectedBounty].role}
                </h3>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-2xl font-black font-mono text-[#D90429]">
                    {realBounties[selectedBounty].budget}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    ≈ {realBounties[selectedBounty].payoutInr}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-3">
                  Scope & Deliverables:
                </span>
                <div className="space-y-2">
                  {realBounties[selectedBounty].deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-2">
                  Quality Audit Standard:
                </span>
                <p className="text-xs text-zinc-400 font-mono bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                  {realBounties[selectedBounty].vetting}
                </p>
              </div>

              <a
                href="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-3.5 bg-[#D90429] text-white font-bold tracking-widest uppercase text-xs rounded-full hover:bg-white hover:text-black transition-colors"
              >
                Apply via Dev Guild
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMALIST CTA */}
      <section className="py-28 px-6 bg-black text-center border-t border-zinc-900">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D90429] block">
            // JOIN INVICTUS GUILD
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white leading-tight">
            Ship Client Software.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Have verified project proof or GitHub contributions? Join the student developer talent pool to take on high-paying startup contracts.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#D90429] text-white font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-black transition-all rounded-full"
            >
              Join Dev Guild
            </a>
            <Link 
              href="/#opportunities"
              className="w-full sm:w-auto px-8 py-3.5 border border-zinc-800 text-zinc-300 font-mono font-medium tracking-widest uppercase text-xs hover:border-white hover:text-white transition-all rounded-full"
            >
              All Opportunities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
