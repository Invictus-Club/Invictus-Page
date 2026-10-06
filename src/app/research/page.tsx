"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Points, PointMaterial } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { ArrowLeft, BookOpen, Network, Database } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function DataSwarm() {
  const ref = useRef<THREE.Points>(null);
  const count = 5000;
  
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Pseudo-random based on index
      const rand1 = Math.abs(Math.sin(i * 12.9898)) % 1;
      const rand2 = Math.abs(Math.sin(i * 78.233)) % 1;
      const rand3 = Math.abs(Math.sin(i * 45.123)) % 1;
      
      const r = 10 * Math.cbrt(rand1);
      const theta = rand2 * 2 * Math.PI;
      const phi = Math.acos(2 * rand3 - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5; // Flattened swarm
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  );
}

export default function ResearchPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-x-hidden selection:bg-white selection:text-black">
      <Link href="/#opportunities" className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 text-white/50 hover:text-white transition flex items-center gap-2 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
        <span className="text-xs font-bold tracking-widest uppercase">Back to Home</span>
      </Link>

      <section className="relative h-screen flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
            <ambientLight intensity={1} />
            <DataSwarm />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="city" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-black tracking-tighter text-white drop-shadow-2xl leading-none uppercase mix-blend-difference">
            RESEARCH
          </h1>
          <p className="text-xs sm:text-sm md:text-lg text-gray-500 font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase mt-6 sm:mt-8 mix-blend-difference">
            Discover. Publish. Innovate.
          </p>
        </motion.div>
      </section>

      <section className="py-20 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase mb-12 sm:mb-20 text-center">The Lab</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: BookOpen, title: "Publish", desc: "Write comprehensive whitepapers and academic papers. Share your findings with the world." },
            { icon: Database, title: "Data Driven", desc: "Base your assumptions on hard data. Our research division focuses on empirical evidence." },
            { icon: Network, title: "Peer Review", desc: "Collaborate with professors, industry experts, and peers to validate your innovations." }
          ].map((item, i) => (
            <div key={i} className="bg-transparent border-t border-gray-800 pt-10 hover:border-white transition-colors group">
              <item.icon size={30} className="text-gray-500 mb-6 group-hover:text-white transition-colors" />
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="h-[60vh] flex flex-col items-center justify-center relative bg-[#111] text-white">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 text-center max-w-3xl">
          ADVANCE HUMAN KNOWLEDGE.
        </h2>
        <button className="px-12 py-5 bg-white text-black font-bold tracking-widest uppercase text-sm hover:scale-105 transition-all rounded-full shadow-2xl">
          Submit Research Proposal
        </button>
      </section>
    </main>
  );
}
