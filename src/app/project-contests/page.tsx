/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Box } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  Server, 
  Cpu, 
  ShieldCheck, 
  CheckCircle,
  Code2
} from "lucide-react";

// Minimal Modular Architectural Core
function ArchitectureModularMesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
      <group ref={groupRef}>
        {[-1.0, 0, 1.0].map((x, i) =>
          [-1.0, 0, 1.0].map((y, j) =>
            [-1.0, 0, 1.0].map((z, k) => (
              <Box key={`${i}-${j}-${k}`} position={[x * 0.9, y * 0.9, z * 0.9]} args={[0.42, 0.42, 0.42]}>
                <meshStandardMaterial 
                  color={(i + j + k) % 3 === 0 ? "#D90429" : "#1a1a1a"} 
                  emissive={(i + j + k) % 3 === 0 ? "#550010" : "#050505"}
                  emissiveIntensity={0.4}
                  metalness={0.85}
                  roughness={0.2}
                />
              </Box>
            ))
          )
        )}
      </group>
    </Float>
  );
}

export default function ProjectContestsPage() {
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

  const evaluationCriteria = [
    {
      title: "Production Architecture",
      desc: "Zero spaghetti scripts. Systems structured into decoupled modules, strict indexing, stateless API tiers, and automated migrations.",
      icon: Server,
      badge: "Architecture Standard"
    },
    {
      title: "Stress Testing & Load Observability",
      desc: "Live load tests using k6 or Artillery. Benchmarking verified response times under 1,000 concurrent requests with latency distributions.",
      icon: Cpu,
      badge: "Load Profiling"
    },
    {
      title: "Security & Secret Sanitization",
      desc: "Zero leaked credentials, sanitized environment workflows, OWASP compliant inputs, and strict TypeScript types without any escapes.",
      icon: ShieldCheck,
      badge: "Security Audit"
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
            <ArchitectureModularMesh />
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
            CAPSTONE ENGINEERING // SEMESTER CONTESTS
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-black tracking-tighter text-white leading-[0.88] uppercase">
            PROJECT CONTESTS
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-mono tracking-[0.2em] uppercase mt-6 max-w-xl mx-auto leading-relaxed">
            Elevating College Capstones Into Enterprise-Grade Systems.
          </p>
        </motion.div>
      </section>

      {/* EVALUATION STANDARDS */}
      <section className="py-24 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-zinc-900">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#D90429] uppercase mb-2 block">
              // 01 / BENCHMARKS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
              Engineering Audit Rubric
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-md">
            Projects are reviewed against industry production baselines, not academic boilerplate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {evaluationCriteria.map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-4 group-hover:text-[#D90429] transition-colors">{item.badge}</span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500 flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#D90429] shrink-0" /> Verified by Council
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE SYSTEM SHOWCASES */}
      <section className="py-20 bg-[#040404] border-t border-zinc-900 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-900">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#D90429] uppercase mb-2 block">
                // 02 / RECENT SUBMISSIONS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
                Flagship Implementations
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              State Contest Winners
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#D90429] font-semibold uppercase tracking-wider">Department 1st Prize • Final Year Showcase</span>
                <h4 className="text-2xl font-black tracking-tight text-white mt-3 mb-3">Distributed Video Transcoding Cluster</h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  Built a serverless queue worker model using Redis Streams and FFmpeg worker nodes that splits 4K footage into parallel chunks with sub-second assembly.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                Stack: Go, Redis, Docker, AWS S3
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#D90429] font-semibold uppercase tracking-wider">Inter-College Project Expo • Best Architecture</span>
                <h4 className="text-2xl font-black tracking-tight text-white mt-3 mb-3">Zero-Knowledge Identity Verification</h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  Implemented a zk-SNARK proof system verifying student credentials without exposing identifying information, benchmarked in under 400ms on mobile browser clients.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                Stack: Circom, Snarkjs, Next.js, Rust
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMALIST CTA */}
      <section className="py-28 px-6 bg-black text-center border-t border-zinc-900">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D90429] block">
            // SUBMIT CAPSTONE
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white leading-tight">
            Exhibit Your System.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Need guidance polishing your semester engineering project or preparing for college juries? Invictus conducts comprehensive architecture reviews.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/events"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#D90429] text-white font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-black transition-all rounded-full"
            >
              Upcoming Expositions
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
