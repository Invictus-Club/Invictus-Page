/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Icosahedron, MeshDistortMaterial, Stars, Float } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  Lightbulb, 
  Crosshair, 
  Zap, 
  Compass, 
  CheckCircle, 
  Presentation, 
  FileText, 
  Target,
  Sparkles,
  Award
} from "lucide-react";

// 3D Polyhedral Ideation Spark with inner glowing core
function PolyhedralIdeaMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.2;
      wireRef.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.8}>
      <group>
        <Icosahedron ref={meshRef} args={[1.7, 0]} scale={1.3}>
          <MeshDistortMaterial 
            color="#FFFFFF" 
            emissive="#FFD60A"
            emissiveIntensity={0.25}
            distort={0.4} 
            speed={2} 
            roughness={0.1} 
            metalness={0.9} 
          />
        </Icosahedron>

        <Icosahedron ref={wireRef} args={[2.2, 1]}>
          <meshBasicMaterial color="#FFD60A" wireframe transparent opacity={0.35} />
        </Icosahedron>
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
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const frameworks = [
    {
      num: "01",
      title: "First Principles Problem Framing",
      desc: "Before building, identify the systemic bottleneck. Why haven't incumbents solved this yet? We strip buzzwords away to isolate unit economics and user resistance.",
      deliverable: "1-Page Executive Problem Abstract"
    },
    {
      num: "02",
      title: "Market Size & Unit Economics Defense",
      desc: "Judges grill pitch decks on viability. Invictus mentors help quantify TAM, SAM, and SOM, proving customer acquisition costs and payback margins under harsh scrutiny.",
      deliverable: "Defensible Financial & Growth Model"
    },
    {
      num: "03",
      title: "The 3-Minute Narrative Arc",
      desc: "Great ideas die in boring presentations. We teach the Hook-Agony-Solution-Proof framework, timing slide transitions to the exact second for maximum emotional impact.",
      deliverable: "Keynote / Pitch Deck with Zero Clutter"
    }
  ];

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-x-clip selection:bg-white selection:text-black">
      {/* Top Header Back Button */}
      <Link href="/#opportunities" className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 text-white/50 hover:text-white transition flex items-center gap-2 group mix-blend-difference">
        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
        <span className="text-xs font-bold tracking-widest uppercase">Back to Base</span>
      </Link>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center border-b border-gray-800">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={2.5} color="#FFFFFF" />
            <directionalLight position={[-10, -5, -5]} intensity={1.5} color="#FFD60A" />
            <Stars radius={100} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />
            <PolyhedralIdeaMesh />
            <OrbitControls enableZoom={false} maxDistance={15} minDistance={4} autoRotate autoRotateSpeed={1.2} />
            <Environment preset="city" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none px-4 max-w-5xl"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <Lightbulb className="w-3.5 h-3.5 text-[#FFD60A]" /> Strategy & High-Stakes Venture Pitching
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.25)] leading-[0.85] uppercase">
            IDEATHONS
          </h1>

          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#FFD60A] to-transparent mx-auto my-6" />

          <p className="text-xs sm:text-sm md:text-lg text-gray-300 font-bold tracking-[0.25em] uppercase max-w-2xl mx-auto leading-relaxed">
            Raw Ideas Defended with Precision. Turning Hypotheses into Seed Investments.
          </p>
        </motion.div>
      </section>

      {/* STRATEGY METHODOLOGY */}
      <section className="py-20 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#FFD60A] uppercase mb-2 block">
            HOW INVICTUS TEAMS PITCH
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white">
            The Pitch Defense Blueprint
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mt-4 leading-relaxed">
            Most college ideas fail during Q&A when judges ask about distribution channels or unit economics. We train you through mock cross-examinations by real founders before you step onto the state stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {frameworks.map((fw, i) => (
            <div key={i} className="p-8 rounded-3xl bg-[#080808] border border-gray-800 hover:border-white/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black font-mono text-[#FFD60A] block mb-4">{fw.num}</span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">{fw.title}</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">{fw.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-900 text-xs font-mono text-gray-400 flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFD60A]" /> {fw.deliverable}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT VICTORIES */}
      <section className="py-20 bg-[#060606] border-t border-gray-800 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase mb-8">
            RECENT IDEATHON WINS BY INVICTUS FELLOWS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-black border border-gray-800">
              <span className="text-xs font-mono text-[#FFD60A] font-bold uppercase">1st Place • VTU Innovation Summit</span>
              <h4 className="text-2xl font-black tracking-tight text-white mt-2 mb-3">Decentralized Grain Storage Telemetry</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Pitched an IoT + algorithmic assurance model preventing grain spoilage in Karnataka government warehouses. Secured incubation offer from VTU STEP cell.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-black border border-gray-800">
              <span className="text-xs font-mono text-[#FFD60A] font-bold uppercase">Best Pitch Award • E-Cell Summit</span>
              <h4 className="text-2xl font-black tracking-tight text-white mt-2 mb-3">Modular Battery Swapping for Electric Autos</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Defended a micro-franchise swapping station network model with dynamic pricing based on solar generation grid surplus. Received ₹50,000 grant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="h-[60vh] flex flex-col items-center justify-center relative bg-white text-black px-6 text-center">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
          HAVE A DISRUPTIVE IDEA?
        </h2>
        <p className="text-sm sm:text-base text-gray-700 max-w-xl mb-8 leading-relaxed">
          Bring your raw hypothesis to our weekly pitch reviews. We will tear it apart, rebuild it, and help you win competitions with it.
        </p>
        <Link 
          href="/create-profile"
          className="px-10 py-4 bg-black text-white font-bold tracking-widest uppercase text-xs hover:scale-105 transition-all rounded-full shadow-2xl"
        >
          Pitch to Invictus Mentors
        </Link>
      </section>
    </main>
  );
}
