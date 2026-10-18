/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  CheckCircle,
  Lightbulb,
  Crosshair,
  TrendingUp,
  ShieldAlert,
  ArrowRight
} from "lucide-react";

// Minimal Architectural Geometric Polyhedron
function PolyhedralGeometryMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.25;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.15;
      wireRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
      <group>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial 
            color="#FFFFFF" 
            emissive="#FFFFFF"
            emissiveIntensity={0.15}
            roughness={0.15} 
            metalness={0.9} 
          />
        </mesh>

        <mesh ref={wireRef}>
          <icosahedronGeometry args={[2.1, 1]} />
          <meshBasicMaterial color="#FFFFFF" wireframe transparent opacity={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

export default function IdeathonsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  const frameworks = [
    {
      num: "01",
      title: "First-Principles Problem Framing",
      desc: "Isolate the systemic friction point before writing any code. We analyze incumbent failures and dismantle buzzwords to identify structural market voids.",
      deliverable: "1-Page Executive Problem Abstract"
    },
    {
      num: "02",
      title: "Unit Economics & Defensibility",
      desc: "Prepare for stringent jury cross-examination on unit viability. Invictus mentors pressure-test TAM, CAC payback cycles, and customer retention metrics.",
      deliverable: "Defensible Unit Economics Model"
    },
    {
      num: "03",
      title: "Executive Keynote Architecture",
      desc: "Deliver high-impact narrative progression under tight timers. We teach the Hook-Friction-Mechanism-Proof model, refining slide cadence to the second.",
      deliverable: "Zero-Clutter High-Contrast Slide Deck"
    }
  ];

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-x-clip selection:bg-white selection:text-black">
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
            <directionalLight position={[10, 10, 5]} intensity={2.2} color="#FFFFFF" />
            <directionalLight position={[-10, -5, -5]} intensity={1.2} color="#CCCCCC" />
            <PolyhedralGeometryMesh />
            <OrbitControls enableZoom={false} maxDistance={14} minDistance={4} autoRotate autoRotateSpeed={0.6} />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_65%)] pointer-events-none" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none px-6 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 text-[11px] font-mono font-medium tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            VENTURE STRATEGY // PITCH DEFENSE
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[9.5rem] font-black tracking-tighter text-white leading-[0.88] uppercase">
            IDEATHONS
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-mono tracking-[0.2em] uppercase mt-6 max-w-xl mx-auto leading-relaxed">
            Unpacking Complex System Friction. Defending Hypotheses on National Stages.
          </p>
        </motion.div>
      </section>

      {/* STRATEGY METHODOLOGY */}
      <section className="py-24 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-zinc-900">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-zinc-400 uppercase mb-2 block">
              // 01 / BLUEPRINT
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
              The Pitch Defense System
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-md">
            Rigorous cross-examination practice with experienced founders before tournament presentations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frameworks.map((fw, i) => (
            <div key={i} className="p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-3xl font-black font-mono text-zinc-500 block mb-4 group-hover:text-white transition-colors">{fw.num}</span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3">{fw.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">{fw.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-400 flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-zinc-300 shrink-0" /> {fw.deliverable}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRACK RECORD & CASE BRIEFS */}
      <section className="py-20 bg-[#040404] border-t border-zinc-900 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-900">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-zinc-400 uppercase mb-2 block">
                // 02 / PROVEN PROPOSALS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
                Incubated Concepts
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              State-Level Innovation Finalists
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-400 font-semibold uppercase tracking-wider">VTU Innovation Summit • Top Distinction</span>
                <h4 className="text-2xl font-black tracking-tight text-white mt-3 mb-3">Grain Storage Supply Telemetry</h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  Pitched an off-grid sensor and algorithmic tracking model mitigating grain spoilage across regional transit hubs. Advanced directly to regional incubator fast-track review.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                Focus: Edge IoT, Supply Chains, Cold Storage
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-400 font-semibold uppercase tracking-wider">E-Cell National Summit • Finalist Citation</span>
                <h4 className="text-2xl font-black tracking-tight text-white mt-3 mb-3">Grid-Scale Battery Swapping Logistics</h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  Defended a micro-station fleet swap network model with dynamic pricing pegged to municipal renewable surplus, securing seed feasibility capital.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                Focus: Energy Logistics, Dynamic Pricing Models
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMALIST OBSIDIAN CTA */}
      <section className="py-28 px-6 bg-black text-center border-t border-zinc-900">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400 block">
            // WEEKLY PITCH SCRIMS
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white leading-tight">
            Stress-Test Your Thesis.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Bring your proposal to our closed review sessions. We critique the economics, polish the defense, and prepare you to win.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/events"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-bold tracking-widest uppercase text-xs hover:bg-zinc-200 transition-all rounded-full"
            >
              Innovation Calendar
            </Link>
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
