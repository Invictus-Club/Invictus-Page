/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  Cpu, 
  Database, 
  Network, 
  FileText, 
  CheckCircle,
  ExternalLink
} from "lucide-react";

// Sleek Minimalist Research Lattice Mesh
function ResearchLatticeMesh() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1800;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 4.0;
      const sinPhi = Math.sin(phi);
      arr[i * 3] = r * sinPhi * Math.cos(theta);
      arr[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.12;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial 
        transparent 
        color="#00E5FF" 
        size={0.045} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.65} 
      />
    </Points>
  );
}

export default function ResearchPage() {
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

  const researchPillars = [
    {
      icon: Cpu,
      title: "Model Compression & Edge Inferencing",
      desc: "Quantizing 7B+ parameter transformer architectures down to low-bit representations (AWQ, GPTQ) for deterministic, cloud-free local execution on commodity hardware.",
      target: "IEEE / NeurIPS Workshop Standards"
    },
    {
      icon: Database,
      title: "Distributed Fault-Tolerant Consensus",
      desc: "Simulating distributed state machine synchronization, latency bottlenecks, and partition tolerance under simulated high-packet-loss network topographies.",
      target: "ACM Distributed Computing Tracks"
    },
    {
      icon: Network,
      title: "Spatial Computing & Neural Radiance",
      desc: "Evaluating 3D Gaussian Splatting rendering performance against photogrammetry point clouds on low-power mobile GPUs.",
      target: "Computer Vision & Graphics Symposia"
    }
  ];

  const recentPapers = [
    {
      title: "Low-Latency Quantized Transformer Execution on Low-Power Consumer Silicon",
      authors: "Y. Koparde, S. Patil, M. Kulkarni",
      venue: "VTU Regional Computing Symposium // 2026",
      status: "Published Paper"
    },
    {
      title: "Deterministic Fallbacks for Distributed LoRa Mesh Sensor Topographies",
      authors: "P. Deshmukh, A. Joshi, Invictus Systems Group",
      venue: "State Technical Innovation Proceedings // 2026",
      status: "Peer Reviewed"
    }
  ];

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-x-clip selection:bg-[#00E5FF] selection:text-black">
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
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={2.0} color="#00E5FF" />
            <ResearchLatticeMesh />
            <OrbitControls enableZoom={false} maxDistance={14} minDistance={4} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.06),transparent_65%)] pointer-events-none" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none px-6 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 text-[11px] font-mono font-medium tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
            ACADEMIC COMPUTING // EMPIRICAL BENCHMARKS
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[9.5rem] font-black tracking-tighter text-white leading-[0.88] uppercase">
            RESEARCH
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-mono tracking-[0.2em] uppercase mt-6 max-w-xl mx-auto leading-relaxed">
            Empirical Validation. Formal Mathematical Models. Published Conference Papers.
          </p>
        </motion.div>
      </section>

      {/* RESEARCH PILLARS */}
      <section className="py-24 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-zinc-900">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#00E5FF] uppercase mb-2 block">
              // 01 / CORE DOMAINS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
              Investigative Divisions
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-md">
            Focus areas designed to advance beyond standard coursework into published peer-reviewed contributions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {researchPillars.map((p, i) => (
            <div key={i} className="p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-[#00E5FF]/40 transition-all flex flex-col justify-between group">
              <div>
                <p.icon className="w-6 h-6 text-[#00E5FF] mb-6" />
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3">{p.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">{p.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500 flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" /> {p.target}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT WORKING PAPERS */}
      <section className="py-20 bg-[#040404] border-t border-zinc-900 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-900">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#00E5FF] uppercase mb-2 block">
                // 02 / PUBLICATIONS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
                Member Preprints & Papers
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              Faculty & Student Co-Authored
            </span>
          </div>

          <div className="space-y-4">
            {recentPapers.map((paper, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF]">
                      {paper.status}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{paper.venue}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-tight">{paper.title}</h4>
                  <p className="text-xs font-mono text-zinc-400">Authors: {paper.authors}</p>
                </div>

                <div className="shrink-0">
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                    <FileText size={14} className="text-[#00E5FF]" /> PDF in Review
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINIMALIST CTA */}
      <section className="py-28 px-6 bg-black text-center border-t border-zinc-900">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00E5FF] block">
            // JOIN RESEARCH SPRINT
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white leading-tight">
            Publish With Invictus.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Have a unique algorithmic premise or systems investigation? Partner with experienced co-authors and faculty advisors to structure, benchmark, and publish your findings.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/events"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#00E5FF] text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-full"
            >
              Academic Symposia
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
