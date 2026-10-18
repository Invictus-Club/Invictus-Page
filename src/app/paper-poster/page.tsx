/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Plane } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  Presentation, 
  Layers, 
  Eye, 
  CheckCircle,
  FileCheck,
  Maximize2
} from "lucide-react";

// Minimal Architectural Monochromatic Gallery Planes
function ArchitecturalPostersMesh() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Float 
          key={i} 
          speed={1.5} 
          rotationIntensity={0.4} 
          floatIntensity={0.8} 
          position={[
            Math.sin((i / 8) * Math.PI * 2) * 4.2,
            ((Math.sin(i * 1.5) + 1) / 2 - 0.5) * 2.5,
            Math.cos((i / 8) * Math.PI * 2) * 4.2
          ]}
        >
          <Plane args={[1.2, 1.7]}>
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#1c1c1c" : "#2a2a2a"} 
              side={THREE.DoubleSide} 
              roughness={0.25} 
              metalness={0.7} 
            />
          </Plane>
        </Float>
      ))}
    </group>
  );
}

export default function PaperPosterPage() {
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

  const posterFormats = [
    {
      icon: Eye,
      title: "Visual Synthesis & Hierarchy",
      desc: "Transform dense algorithmic equations and multi-page technical manuscripts into high-contrast A0/36\"x48\" posters that communicate key findings in 30 seconds."
    },
    {
      icon: Presentation,
      title: "Standup Jury Defense",
      desc: "Practice walking evaluators through problem friction, empirical methodology, and benchmark results without reading from prompt cards."
    },
    {
      icon: Layers,
      title: "Scientific Peer Engagement",
      desc: "Expose research findings to symposium attendees, faculty evaluators, and potential collaborators across engineering departments."
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
        <div className="absolute inset-0 z-0 opacity-60">
          <Canvas camera={{ position: [0, 1.5, 8.5], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={2.0} color="#FFFFFF" />
            <directionalLight position={[-10, -5, -5]} intensity={1.0} color="#888888" />
            <ArchitecturalPostersMesh />
            <OrbitControls enableZoom={false} maxDistance={14} minDistance={4} autoRotate autoRotateSpeed={0.4} />
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
            SCIENTIFIC EXHIBITION // VISUAL RESEARCH
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-black tracking-tighter text-white leading-[0.88] uppercase">
            PAPER POSTER
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-mono tracking-[0.2em] uppercase mt-6 max-w-xl mx-auto leading-relaxed">
            Distilling Complex Technical Research Into High-Density Visual Briefings.
          </p>
        </motion.div>
      </section>

      {/* METHODOLOGY */}
      <section className="py-24 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-zinc-900">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-zinc-400 uppercase mb-2 block">
              // 01 / METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
              Exhibition Design Principles
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-md">
            Architecting research displays that capture attention on competitive symposium floors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posterFormats.map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between group">
              <div>
                <item.icon className="w-6 h-6 text-zinc-300 mb-6 group-hover:text-white transition-colors" />
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500 flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" /> Academic Standard
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE POSTER ARCHIVE */}
      <section className="py-20 bg-[#040404] border-t border-zinc-900 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-900">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-zinc-400 uppercase mb-2 block">
                // 02 / RECENT ARCHIVE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
                Symposium Exhibitions
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              Standard Format: A0 Architectural (841 x 1189 mm)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">VTU Research Showcase // 1st Place</span>
                <h4 className="text-2xl font-black tracking-tight text-white mb-3">Fault-Tolerant Consensus In High-Latency Networks</h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  Structured comparison diagram contrasting Raft and PBFT latency curves across simulated cross-continental cluster drops.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                Format: High-Contrast Obsidian Monolith
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">State Innovation Meet // Best Visual Data</span>
                <h4 className="text-2xl font-black tracking-tight text-white mb-3">Edge Quantization Benchmarks for Local NLP</h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  Comparative analysis charts showing perplexity trade-offs between 4-bit and 2-bit GPTQ weights on mobile ARM silicon.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-500">
                Format: Dual-Column Quantitative Poster
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMALIST CTA */}
      <section className="py-28 px-6 bg-black text-center border-t border-zinc-900">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400 block">
            // EXHIBIT IN THE GALLERY
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white leading-tight">
            Exhibit Your Findings.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Invictus helps researchers format, typeset, and print technical posters for upcoming collegiate and national paper presentations.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/events"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-bold tracking-widest uppercase text-xs hover:bg-zinc-200 transition-all rounded-full"
            >
              Poster Competitions
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
