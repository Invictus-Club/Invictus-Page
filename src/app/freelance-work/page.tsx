/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, TorusKnot, Float, Stars } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  DollarSign, 
  Globe, 
  ShieldCheck, 
  Code2, 
  Zap, 
  TrendingUp, 
  Building2, 
  CheckCircle,
  Briefcase,
  FileCheck,
  ChevronRight
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 3D Metallic Crypto/Fiat Currency Knot representing global liquidity & work contracts
function FinancialKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.8}>
      <TorusKnot ref={meshRef} args={[1.7, 0.45, 128, 32]} scale={1.3}>
        <meshStandardMaterial 
          color="#D90429" 
          emissive="#7A0014"
          emissiveIntensity={0.6}
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
        "Real-time WebSocket connection to ingest 15,000 transactions/sec",
        "Interactive canvas charts with sub-10ms render latency",
        "Role-based access control with Supabase Auth"
      ],
      vetting: "Invictus Lead reviews code before final client handoff."
    },
    {
      role: "AI Document Search & RAG Pipeline",
      client: "Enterprise LegalTech Startup",
      budget: "$3,400 USD",
      payoutInr: "₹2,85,000 INR",
      deadline: "4 Weeks",
      stack: ["Python", "FastAPI", "pgvector", "LangChain", "React"],
      deliverables: [
        "Document parsing pipeline with chunking and token budget guards",
        "Semantic search with hybrid reranking using Cohere & pgvector",
        "Clean conversational chat UI with streaming response tokens"
      ],
      vetting: "Security audit & API key rotation automated through Invictus infra."
    },
    {
      role: "Cross-Platform Mobile App Redesign",
      client: "Logistics Fleet Management",
      budget: "$1,600 USD",
      payoutInr: "₹1,35,000 INR",
      deadline: "2.5 Weeks",
      stack: ["React Native", "Expo", "TypeScript", "Tailwind (NativeWind)"],
      deliverables: [
        "Offline-first driver checklist with SQLite caching",
        "GPS turn-by-turn route telemetry tracking with battery optimization",
        "Over-the-air EAS updates pipeline configured"
      ],
      vetting: "Tested on 12 physical Android & iOS devices in Invictus lab."
    }
  ];

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-x-clip selection:bg-[#D90429] selection:text-white">
      {/* Top Header Back Button */}
      <Link href="/#opportunities" className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 text-white/50 hover:text-white transition flex items-center gap-2 group mix-blend-difference">
        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
        <span className="text-xs font-bold tracking-widest uppercase">Back to Base</span>
      </Link>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center border-b border-gray-800">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={2.5} color="#D90429" />
            <directionalLight position={[-10, -5, -5]} intensity={1.2} color="#FFFFFF" />
            <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />
            <FinancialKnot />
            <OrbitControls enableZoom={false} maxDistance={15} minDistance={4} autoRotate autoRotateSpeed={1} />
            <Environment preset="city" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,4,41,0.12),transparent_70%)] pointer-events-none" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none px-4 max-w-5xl"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D90429]/40 bg-[#D90429]/10 text-[#D90429] text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <DollarSign className="w-3.5 h-3.5" /> High-Ticket Client Contracts & Bounties
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(217,4,41,0.3)] leading-[0.85] uppercase">
            FREELANCE
          </h1>

          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#D90429] to-transparent mx-auto my-6" />

          <p className="text-xs sm:text-sm md:text-lg text-gray-300 font-bold tracking-[0.25em] uppercase max-w-2xl mx-auto leading-relaxed">
            Stop Doing $20 Gig Work. Build Production Systems for Real Companies.
          </p>
        </motion.div>
      </section>

      {/* HOW INVICTUS FREELANCE AGENCY MODEL WORKS */}
      <section className="py-20 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#D90429] uppercase mb-2 block">
            HOW WE PROTECT OUR DEVELOPERS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white">
            The Student-First Agency Model
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mt-4 leading-relaxed">
            College freelancers typically get ghosted, underpaid, or scope-crept. Invictus operates as an umbrella agency: we sign corporate NDAs, handle milestone escrow, and handle invoice disputes so you can focus 100% on writing clean code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: "Escrow & Upfront Deposit",
              desc: "No work starts without 40% locked in escrow. Clients can never run away with unpaid source code."
            },
            {
              icon: FileCheck,
              title: "Code Review & Quality Gate",
              desc: "Before shipping, an Invictus senior engineer reviews your PRs to ensure production security and test coverage."
            },
            {
              icon: TrendingUp,
              title: "Direct Portfolio Ownership",
              desc: "You retain public case-study credit. Several students converted freelance clients into full-time remote job offers."
            }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-[#080808] border border-gray-800 hover:border-[#D90429]/50 transition-all flex flex-col justify-between">
              <div>
                <item.icon size={36} className="text-[#D90429] mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-900 text-xs font-mono text-gray-500">
                100% Guaranteed Payout
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE LIVE BOUNTY BOARD */}
      <section className="py-24 bg-[#050505] border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#D90429] uppercase mb-2 block">
                ACTIVE PIPELINE
              </span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white">
                Open Client Bounties
              </h2>
            </div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#D90429] px-4 py-1.5 rounded-full border border-[#D90429]/40 bg-[#D90429]/10 self-start md:self-auto">
              {realBounties.length} Verified Contracts Available
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* List */}
            <div className="lg:col-span-5 space-y-4">
              {realBounties.map((bounty, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedBounty(idx)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                    selectedBounty === idx 
                      ? "bg-[#111] border-[#D90429] shadow-[0_0_30px_rgba(217,4,41,0.2)]" 
                      : "bg-black/60 border-gray-800 hover:border-gray-600"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-xs font-mono text-gray-400 font-semibold">{bounty.client}</span>
                    <span className="text-sm font-mono font-bold text-[#D90429]">{bounty.budget}</span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-white mb-2">{bounty.role}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {bounty.stack.slice(0, 3).map((st, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Dossier for Selected Bounty */}
            <div className="lg:col-span-7 bg-[#0a0a0a] border border-gray-800 rounded-3xl p-8 sm:p-10 relative">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                    <span>{realBounties[selectedBounty].client}</span>
                    <span className="text-[#D90429] font-bold">Timeline: {realBounties[selectedBounty].deadline}</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                    {realBounties[selectedBounty].role}
                  </h3>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-2xl font-black font-mono text-[#D90429]">
                      {realBounties[selectedBounty].budget}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      ≈ {realBounties[selectedBounty].payoutInr}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 block mb-3">
                    Required Deliverables:
                  </span>
                  <div className="space-y-2">
                    {realBounties[selectedBounty].deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-black border border-gray-900 text-xs text-gray-300">
                        <CheckCircle className="w-4 h-4 text-[#D90429] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 block mb-2">
                    Invictus Quality Standard:
                  </span>
                  <p className="text-xs text-gray-400 font-mono bg-black p-3 rounded-xl border border-gray-900">
                    {realBounties[selectedBounty].vetting}
                  </p>
                </div>

                <Link
                  href="/create-profile"
                  className="block text-center py-4 bg-[#D90429] text-white font-bold tracking-widest uppercase text-xs rounded-xl hover:bg-white hover:text-black transition-colors"
                >
                  Claim This Bounty with Invictus Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="h-[60vh] flex flex-col items-center justify-center relative bg-black px-6 text-center">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase">
          READY TO EARN AS A VTU DEVELOPER?
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-xl mb-8 leading-relaxed">
          Create your developer profile, submit your GitHub and project proof, and enter the Invictus freelance talent pool.
        </p>
        <Link 
          href="/create-profile"
          className="px-10 py-4 bg-white text-black font-bold tracking-widest uppercase text-xs hover:bg-[#D90429] hover:text-white transition-all rounded-full"
        >
          Join Freelance Roster
        </Link>
      </section>
    </main>
  );
}
