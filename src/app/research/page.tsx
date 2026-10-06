/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Points, PointMaterial } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  BookOpen, 
  Database, 
  Network, 
  Award, 
  FileCheck, 
  FileText, 
  Sparkles, 
  Cpu, 
  CheckCircle,
  ExternalLink
} from "lucide-react";

// 3D Neural Swarm / Data Lattice representing empirical research and neural networks
function ResearchLatticeMesh() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 4.5;
      const sinPhi = Math.sin(phi);
      arr[i * 3] = r * sinPhi * Math.cos(theta);
      arr[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial 
        transparent 
        color="#00E5FF" 
        size={0.06} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.75} 
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
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const researchPillars = [
    {
      icon: Cpu,
      title: "Model Compression & Edge LLMs",
      desc: "Quantizing 7B+ parameter transformer models into 2-bit and 3-bit weights (AWQ / GPTQ) running on commodity phone chips without cloud latency.",
      target: "IEEE / NeurIPS Workshop Submissions"
    },
    {
      icon: Database,
      title: "Byzantine-Fault-Tolerant Consensus",
      desc: "Benchmarking distributed state machines under high network packet loss and adversarial partition simulations.",
      target: "ACM Distributed Computing Tracks"
    },
    {
      icon: Network,
      title: "Spatial Computing & CV Photogrammetry",
      desc: "Evaluating Gaussian Splatting rendering pipelines against traditional LiDAR point clouds on low-cost consumer hardware.",
      target: "CVPR / ECCV Posters"
    }
  ];

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-x-clip selection:bg-[#00E5FF] selection:text-black">
      {/* Top Header Back Button */}
      <Link href="/#opportunities" className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 text-white/50 hover:text-white transition flex items-center gap-2 group mix-blend-difference">
        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
        <span className="text-xs font-bold tracking-widest uppercase">Back to Base</span>
      </Link>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center border-b border-gray-800">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#00E5FF" />
            <ResearchLatticeMesh />
            <OrbitControls enableZoom={false} maxDistance={15} minDistance={4} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="night" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.1),transparent_70%)] pointer-events-none" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none px-4 max-w-5xl"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Peer-Reviewed Publications & Compute Grants
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(0,229,255,0.3)] leading-[0.85] uppercase">
            RESEARCH
          </h1>

          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mx-auto my-6" />

          <p className="text-xs sm:text-sm md:text-lg text-gray-300 font-bold tracking-[0.25em] uppercase max-w-2xl mx-auto leading-relaxed">
            Move Beyond Tutorial Coding. Publish Novel Algorithms Before You Graduate.
          </p>
        </motion.div>
      </section>

      {/* CORE RESEARCH DOMAINS */}
      <section className="py-20 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#00E5FF] uppercase mb-2 block">
            LAB DIVISIONS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white">
            Active Investigation Areas
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mt-4 leading-relaxed">
            Invictus partners with university faculty and industry researchers to provide student fellows with GPU compute clusters, mathematical review, and conference travel grants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {researchPillars.map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-[#080808] border border-gray-800 hover:border-[#00E5FF]/50 transition-all flex flex-col justify-between">
              <div>
                <item.icon size={36} className="text-[#00E5FF] mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-900 text-xs font-mono text-[#00E5FF]">
                {item.target}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT PAPERS BY INVICTUS FELLOWS */}
      <section className="py-20 bg-[#060606] border-t border-gray-800 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase mb-8">
            RECENT PREPRINTS & CONFERENCE ACCEPTS
          </h3>

          <div className="space-y-4">
            {[
              {
                title: "Asynchronous Gradient Checkpointing in Heterogeneous Consumer GPUs",
                authors: "Invictus AI Working Group • Belagavi Campus",
                status: "Accepted, IEEE Regional Computing 2026",
                abstract: "Demonstrated a 34% reduction in peak VRAM consumption during fine-tuning of 8B parameter models on mixed RTX 3060 / 4060 hardware rigs."
              },
              {
                title: "Zero-Knowledge Verifiable Execution for Collegiate Academic Transcripts",
                authors: "Invictus Cryptography Lab",
                status: "Preprint on arXiv / Under Peer Review",
                abstract: "A succinct zk-SNARK proof system enabling students to cryptographically verify GPA and credit requirements to international universities without exposing full transcript records."
              }
            ].map((paper, i) => (
              <div key={i} className="p-8 rounded-2xl bg-black border border-gray-800 hover:border-gray-600 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-[#00E5FF] font-bold">{paper.status}</span>
                  <span className="text-xs font-mono text-gray-500">{paper.authors}</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white my-2">{paper.title}</h4>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">{paper.abstract}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="h-[60vh] flex flex-col items-center justify-center relative bg-black px-6 text-center">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
          PUBLISH YOUR FIRST PAPER
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-xl mb-8 leading-relaxed">
          Submit your proposal or abstract. We pair you with senior co-authors and provide access to dedicated GPU clusters.
        </p>
        <Link 
          href="/create-profile"
          className="px-10 py-4 bg-[#00E5FF] text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-full shadow-[0_0_30px_rgba(0,229,255,0.4)]"
        >
          Submit Proposal to Lab
        </Link>
      </section>
    </main>
  );
}
