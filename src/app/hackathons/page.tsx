/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Sphere, MeshDistortMaterial, Stars, Float, Ring } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  Terminal, 
  Code2, 
  Cpu, 
  Flame, 
  Trophy, 
  Clock, 
  CheckCircle, 
  Layers, 
  ExternalLink,
  Zap,
  Target
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Sophisticated Cybernetic Core in Three.js
function CyberHackCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35;
      meshRef.current.rotation.y += delta * 0.45;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.5;
      ringRef1.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.4;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z -= delta * 0.6;
      ringRef2.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.8) * 0.5;
    }
  });

  return (
    <group>
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
        <Sphere ref={meshRef} args={[1.8, 64, 64]} scale={1.4}>
          <MeshDistortMaterial 
            color="#FFD60A" 
            emissive="#FF9E00"
            emissiveIntensity={0.65}
            attach="material" 
            distort={0.55} 
            speed={2.8} 
            roughness={0.15} 
            metalness={0.85} 
            wireframe={false}
          />
        </Sphere>
      </Float>

      {/* Orbiting Orbital Gyroscope Rings */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.2, 0.03, 16, 100]} />
        <meshStandardMaterial color="#FFD60A" emissive="#FFD60A" emissiveIntensity={0.8} />
      </mesh>

      <mesh ref={ringRef2} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[3.8, 0.02, 16, 100]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} wireframe />
      </mesh>
    </group>
  );
}

export default function HackathonsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenis.scrollTo(0, { immediate: true });
    
    lenis.on('scroll', ScrollTrigger.update);
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0, 0);

    const ctx = gsap.context(() => {
      // Staggered reveal for headline cards
      gsap.fromTo(".hack-stat-card", 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power3.out", 
          scrollTrigger: { trigger: ".hack-stats-grid", start: "top 85%" } 
        }
      );

      // Smooth Parallax on story sections
      const images = gsap.utils.toArray(".parallax-img");
      images.forEach((img: any) => {
        gsap.to(img, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const timelinePhases = [
    {
      time: "T - 14 Days",
      title: "Team Formation & Idea Validation",
      tagline: "Algorithm, Stack & API Keys Prepared",
      desc: "Invictus matches students with specialized complementary skills (1 Frontend Lead, 1 Systems/Backend Dev, 1 ML/Web3 Specialist, 1 Pitch Presenter). We validate problem statements against past winning rubrics."
    },
    {
      time: "Hour 00:00 - 06:00",
      title: "Core Architecture & Scaffolding",
      tagline: "Zero Fluff, Clean Schemas & Repos",
      desc: "Monorepo initialization with Turborepo, CI/CD setup to Vercel/Fly.io, schema migrations with Supabase or Prisma, and immediate mock API endpoints to unlock frontend development simultaneously."
    },
    {
      time: "Hour 06:00 - 20:00",
      title: "Feature Execution & Stress Testing",
      tagline: "Handling Edge Cases Before Judges Do",
      desc: "Integrating actual hardware sensors, LLM agents with deterministic fallback, and WebSocket streams. Invictus seniors review the live PRs through Discord voice channels during the 3:00 AM sprint."
    },
    {
      time: "Hour 20:00 - 24:00",
      title: "Pitch Deck & Live Interactive Demo",
      tagline: "Sell Value, Not Just Lines of Code",
      desc: "High-contrast slides, 2-minute elevator pitch script memorization, fallback local video recording for unreliable Wi-Fi, and live metrics showing latency, business viability, and real users."
    }
  ];

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-x-clip selection:bg-[#FFD60A] selection:text-black">
      {/* Top Header Back Button */}
      <Link href="/#opportunities" className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 text-white/50 hover:text-white transition flex items-center gap-2 group mix-blend-difference">
        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
        <span className="text-xs font-bold tracking-widest uppercase">Back to Base</span>
      </Link>

      {/* HERO SECTION WITH INTERACTIVE 3JS GYROSCOPE */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-80">
          <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={2.5} color="#FFD60A" />
            <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#FFFFFF" />
            <Stars radius={120} depth={60} count={3500} factor={4} saturation={0} fade speed={2} />
            <CyberHackCore />
            <OrbitControls enableZoom={false} maxDistance={15} minDistance={4} autoRotate autoRotateSpeed={0.8} />
            <Environment preset="night" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,214,10,0.12),transparent_70%)] pointer-events-none" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none w-full px-4 mt-16 max-w-5xl"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD60A]/40 bg-[#FFD60A]/10 text-[#FFD60A] text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <Zap className="w-3.5 h-3.5" /> High-Performance Tournament Training
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,214,10,0.25)] leading-[0.85] uppercase">
            HACKATHONS
          </h1>

          <p className="text-xs sm:text-sm md:text-lg text-gray-300 font-bold tracking-[0.3em] uppercase mt-6 max-w-2xl mx-auto leading-relaxed">
            From Belagavi to National Podiums: Engineering Under 24h Deadlines
          </p>
        </motion.div>
      </section>

      {/* METRICS & PROVEN TRACK RECORD */}
      <section className="py-16 border-y border-gray-800 bg-[#060606] hack-stats-grid">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            { value: "₹4.8L+", label: "Prizes Won in 2026", sub: "Direct Cash & Cloud Grants" },
            { value: "14 Podiums", label: "National & State Tier", sub: "IIT Delhi, SIH, VTU Central" },
            { value: "24h - 36h", label: "Average Sprint Time", sub: "Production MVP & Demo" },
            { value: "92%", label: "Pitch-to-Finalist Rate", sub: "Strict Rigorous Mentoring" },
          ].map((stat, i) => (
            <div key={i} className="hack-stat-card p-6 rounded-2xl bg-black border border-gray-900 flex flex-col justify-between">
              <span className="text-3xl sm:text-5xl font-black text-[#FFD60A] tracking-tighter font-mono">{stat.value}</span>
              <div className="mt-4">
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">{stat.label}</h3>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DETAILED 24-HOUR BATTLE BLUEPRINT */}
      <section className="py-24 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="text-xs font-mono font-bold tracking-[0.25em] text-[#FFD60A] uppercase mb-2">
            THE METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white">
            How Invictus Wins Tournaments
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mt-4 leading-relaxed">
            Winning is never an accident. We use an institutionalized 4-phase framework tested across Smart India Hackathon, IIT competitions, and premier corporate dev challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timelinePhases.map((phase, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-[#090909] border border-gray-800 hover:border-[#FFD60A]/50 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD60A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#FFD60A]/10 transition-colors" />
              
              <div>
                <span className="text-xs font-mono font-bold text-[#FFD60A] block mb-2">{phase.time}</span>
                <h3 className="text-xl font-black tracking-tight text-white uppercase mb-2 group-hover:text-[#FFD60A] transition-colors">{phase.title}</h3>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">{phase.tagline}</p>
                <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">{phase.desc}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-900 text-[11px] font-mono text-gray-500 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFD60A]" /> Verified by Invictus Leads
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REAL CASE STUDIES & STACK ARCHITECTURE */}
      <section className="py-20 sm:py-28 px-6 md:px-16 border-t border-gray-800 bg-[#050505]">
        <div className="max-w-7xl mx-auto space-y-24 sm:space-y-36">
          
          {/* Story 1: SIH Internal & National Finalists */}
          <div className="flex flex-col lg:flex-row gap-10 sm:gap-16 items-center">
            <div className="w-full lg:w-1/2 h-[350px] sm:h-[450px] relative overflow-hidden rounded-3xl border border-gray-800 group">
              <img 
                src="/hackathons/sih-internal/1.png" 
                alt="SIH Hackathon Presentation" 
                className="parallax-img absolute w-full h-[120%] object-cover top-0 filter brightness-90 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#FFD60A] text-black uppercase">Grand Finalists</span>
                <p className="text-sm font-bold text-white mt-2">Smart India Hackathon Internal Champions</p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <span className="text-xs font-mono font-bold text-[#FFD60A] uppercase tracking-widest">CASE STUDY 01</span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase leading-tight">
                Disaster Response Grid with Edge AI
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 font-medium leading-relaxed">
                Our squad engineered a mesh networking protocol capable of relaying drone camera feeds and SOS telemetry in disaster zones without cellular connectivity.
              </p>

              <div className="p-5 rounded-2xl bg-black border border-gray-800 space-y-3 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span className="text-gray-500 uppercase">Architecture:</span>
                  <span className="text-white">LoRa Mesh + ONNX TinyYOLO + FastAPI</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span className="text-gray-500 uppercase">Deployment:</span>
                  <span className="text-white">Raspberry Pi 4 Cluster + Docker Swarm</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span className="text-gray-500 uppercase">Judges Remark:</span>
                  <span className="text-[#FFD60A]">"Flawless live hardware demo under zero internet"</span>
                </div>
              </div>
            </div>
          </div>

          {/* Story 2: IIT Delhi Regional Hackathon */}
          <div className="flex flex-col lg:flex-row-reverse gap-10 sm:gap-16 items-center">
            <div className="w-full lg:w-1/2 h-[350px] sm:h-[450px] relative overflow-hidden rounded-3xl border border-gray-800 group">
              <img 
                src="/hackathons/iitdw/1.png" 
                alt="IIT Delhi Winner Moment" 
                className="parallax-img absolute w-full h-[120%] object-cover top-0 filter brightness-90 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#FFD60A] text-black uppercase">Top Podium</span>
                <p className="text-sm font-bold text-white mt-2">National Collegiate Innovation Summit</p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <span className="text-xs font-mono font-bold text-[#FFD60A] uppercase tracking-widest">CASE STUDY 02</span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase leading-tight">
                High-Frequency Algorithmic Order Flow Analyzer
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 font-medium leading-relaxed">
                Competing against tier-1 Indian institutes, Invictus engineers built a microsecond-latency limit order book simulator in Rust with real-time WebAssembly visualizer.
              </p>

              <div className="p-5 rounded-2xl bg-black border border-gray-800 space-y-3 text-xs font-mono">
                <div className="flex justify-between text-gray-400">
                  <span className="text-gray-500 uppercase">Core Engine:</span>
                  <span className="text-white">Rust (Tokio async) + L3 Market Feed</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span className="text-gray-500 uppercase">Interface:</span>
                  <span className="text-white">Next.js 16 + WebGPU Canvas Heatmap</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span className="text-gray-500 uppercase">Prize Won:</span>
                  <span className="text-[#FFD60A]">₹1,00,000 INR + Fast-Tracked Interviews</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center relative bg-black text-center px-6 py-20 border-t border-gray-900">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-800 bg-[#111] text-xs font-mono text-gray-400">
            <Trophy className="w-3.5 h-3.5 text-[#FFD60A]" /> Next Hackathon Squad Auditions Open
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white">
            WANT TO WEAR THE INVICTUS JERSEY?
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            We sponsor travel, pay registration costs for approved teams, and connect you with experienced teammates who will push you to build your best work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link 
              href="/create-profile" 
              className="px-10 py-4 bg-[#FFD60A] text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-full shadow-[0_0_35px_rgba(255,214,10,0.3)]"
            >
              Apply For Next Squad
            </Link>
            <Link 
              href="/events" 
              className="px-10 py-4 border border-gray-800 text-gray-300 font-bold tracking-widest uppercase text-xs hover:border-white hover:text-white transition-all rounded-full"
            >
              Browse Tournaments
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
