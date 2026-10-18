/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight,
  Terminal, 
  Cpu, 
  Trophy, 
  Layers, 
  CheckCircle,
  Code2,
  Compass
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Minimalist Architectural Kinetic Core (City / Brutalist Style)
function ArchitecturalKineticMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.35;
    }
    if (cageRef.current) {
      cageRef.current.rotation.x -= delta * 0.15;
      cageRef.current.rotation.z += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
      ringRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
      <group>
        {/* Geometric Icosahedron Core */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial 
            color="#FFD60A" 
            emissive="#FFD60A"
            emissiveIntensity={0.2}
            roughness={0.2} 
            metalness={0.9} 
          />
        </mesh>

        {/* Structural Wireframe Cage */}
        <mesh ref={cageRef}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
        </mesh>

        {/* Subtle Orbital Axis Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.0, 0.015, 16, 80]} />
          <meshStandardMaterial color="#FFD60A" emissive="#FFD60A" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HackathonsPage() {
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
    
    lenis.on('scroll', ScrollTrigger.update);
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(".hack-stat-card", 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.7, 
          stagger: 0.1, 
          ease: "power2.out", 
          scrollTrigger: { trigger: ".hack-stats-grid", start: "top 85%" } 
        }
      );

      const images = gsap.utils.toArray(".parallax-img");
      images.forEach((img: any) => {
        gsap.to(img, {
          yPercent: -12,
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
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const timelinePhases = [
    {
      index: "01",
      phase: "T-14 DAYS",
      title: "Team Calibration & Scoping",
      desc: "Invictus matches students by complementary proficiencies (Systems Architecture, React/Next Frontend, Edge AI, and Technical Presentation). Problem domains are validated against historical winning benchmarks.",
      metric: "4-Person Dedicated Squads"
    },
    {
      index: "02",
      phase: "00:00 — 06:00",
      title: "Scaffold & Monorepo Init",
      desc: "Instant Turborepo setup, continuous deployment pipes, typed database migrations, and mock API endpoints so frontend and systems engineers ship in parallel without blocking.",
      metric: "Sub-10m Initial Deployment"
    },
    {
      index: "03",
      phase: "06:00 — 20:00",
      title: "Core Execution & Resilience",
      desc: "Building core functionality with offline fallback handling, real telemetry feeds, and deterministic stress testing before the evaluation jury steps in.",
      metric: "Live PR Code Reviews"
    },
    {
      index: "04",
      phase: "20:00 — 24:00",
      title: "Telemetry & Live Defense",
      desc: "High-contrast editorial keynote, 3-minute elevator walkthrough, and zero-latency local fallback demo videos prepared for variable convention center Wi-Fi.",
      metric: "100% Working Live MVP"
    }
  ];

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-x-clip selection:bg-[#FFD60A] selection:text-black">
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
            <directionalLight position={[10, 10, 5]} intensity={2.0} color="#FFD60A" />
            <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#FFFFFF" />
            <ArchitecturalKineticMesh />
            <OrbitControls enableZoom={false} maxDistance={14} minDistance={4} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,214,10,0.06),transparent_65%)] pointer-events-none" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none w-full px-6 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 text-[11px] font-mono font-medium tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD60A]" />
            COMPETITIVE ENGINEERING // 24-HOUR SPRINTS
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[9.5rem] font-black tracking-tighter text-white leading-[0.88] uppercase">
            HACKATHONS
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-mono tracking-[0.2em] uppercase mt-6 max-w-xl mx-auto leading-relaxed">
            From Belagavi to National Podiums: Engineering Under Strict Deadlines
          </p>
        </motion.div>
      </section>

      {/* METRICS & TRACK RECORD */}
      <section className="py-16 border-b border-zinc-900 bg-[#040404] hack-stats-grid">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: "₹4.8L+", label: "Prize Purse in 2026", sub: "Cash Awards & Cloud Grants" },
            { value: "14 Podiums", label: "State & National Tier", sub: "IIT Competitions, SIH, VTU" },
            { value: "24h — 36h", label: "Standard Sprint Runtime", sub: "Architecture to Deployment" },
            { value: "92%", label: "Finalist Conversion Rate", sub: "Strict Internal Vetting" },
          ].map((stat, i) => (
            <div key={i} className="hack-stat-card p-6 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between">
              <span className="text-3xl sm:text-5xl font-black text-[#FFD60A] tracking-tighter font-mono">{stat.value}</span>
              <div className="mt-4 pt-3 border-t border-zinc-900">
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">{stat.label}</h3>
                <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 24-HOUR SPRINT FRAMEWORK */}
      <section className="py-24 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-zinc-900">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#FFD60A] uppercase mb-2 block">
              // 01 / METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
              The Tournament Framework
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-md">
            Tested across Smart India Hackathon, premier IIT challenges, and corporate hack events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {timelinePhases.map((phase, idx) => (
            <div 
              key={idx}
              className="p-7 rounded-2xl bg-zinc-950/60 border border-white/[0.08] hover:border-[#FFD60A]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-4 text-zinc-500">
                  <span className="font-bold text-[#FFD60A]">{phase.index}</span>
                  <span className="tracking-wider">{phase.phase}</span>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-white uppercase mb-3 group-hover:text-[#FFD60A] transition-colors">{phase.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">{phase.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFD60A] shrink-0" /> {phase.metric}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 sm:py-28 px-6 md:px-16 border-t border-zinc-900 bg-[#030303]">
        <div className="max-w-7xl mx-auto space-y-24">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-900">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#FFD60A] uppercase mb-2 block">
                // 02 / RECENT PODIUMS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
                Battle-Tested Case Studies
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              Live Hardware & Distributed Code
            </span>
          </div>

          {/* Story 1 */}
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="w-full lg:w-1/2 h-[320px] sm:h-[420px] relative overflow-hidden rounded-2xl border border-white/[0.08] group bg-zinc-950">
              <img 
                src="/hackathons/sih-internal/1.png" 
                alt="SIH Hackathon Presentation" 
                className="parallax-img absolute w-full h-[120%] object-cover top-0 filter brightness-90 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#FFD60A] text-black uppercase">Grand Finalists</span>
                <span className="text-xs font-mono text-zinc-300">Smart India Hackathon</span>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-5">
              <span className="text-xs font-mono text-[#FFD60A] uppercase tracking-widest block">CASE RECORD 01</span>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase leading-tight">
                Mesh Networking for Disaster Response
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                Engineered an off-grid wireless telemetry grid capable of relaying drone sensory feeds and emergency distress coordinates across isolated terrain without cellular infrastructure.
              </p>

              <div className="p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08] space-y-2.5 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span className="text-zinc-500 uppercase">Architecture:</span>
                  <span className="text-white">LoRa Mesh + TinyYOLO + FastAPI</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span className="text-zinc-500 uppercase">Hardware Node:</span>
                  <span className="text-white">Raspberry Pi Cluster + Battery Powerpack</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span className="text-zinc-500 uppercase">Jury Assessment:</span>
                  <span className="text-[#FFD60A]">100% Functioning Live Demo Under Zero Internet</span>
                </div>
              </div>
            </div>
          </div>

          {/* Story 2 */}
          <div className="flex flex-col lg:flex-row-reverse gap-10 items-center pt-8">
            <div className="w-full lg:w-1/2 h-[320px] sm:h-[420px] relative overflow-hidden rounded-2xl border border-white/[0.08] group bg-zinc-950">
              <img 
                src="/hackathons/iitdw/1.png" 
                alt="IIT Delhi Winner Moment" 
                className="parallax-img absolute w-full h-[120%] object-cover top-0 filter brightness-90 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#FFD60A] text-black uppercase">Top Podium</span>
                <span className="text-xs font-mono text-zinc-300">Collegiate Innovation Summit</span>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-5">
              <span className="text-xs font-mono text-[#FFD60A] uppercase tracking-widest block">CASE RECORD 02</span>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase leading-tight">
                Microsecond Latency Limit Order Simulator
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                Competed against premier national engineering colleges with a high-throughput order matching engine in Rust accompanied by real-time WebGPU canvas transaction visualizers.
              </p>

              <div className="p-5 rounded-xl bg-zinc-950/80 border border-white/[0.08] space-y-2.5 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span className="text-zinc-500 uppercase">Engine:</span>
                  <span className="text-white">Rust (Tokio async) + L3 Order Feed</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span className="text-zinc-500 uppercase">Frontend:</span>
                  <span className="text-white">Next.js 16 + WebGPU Canvas</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span className="text-zinc-500 uppercase">Prize Award:</span>
                  <span className="text-[#FFD60A]">₹1,00,000 INR + Institutional Recognition</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MINIMALIST CITY-STYLE CTA */}
      <section className="py-28 px-6 bg-black text-center border-t border-zinc-900">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FFD60A] block">
            // JOIN THE SQUAD
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white leading-tight">
            Build With The Invictus Team.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            We sponsor travel expenses, cover tournament registration fees, and partner you with peers dedicated to shipping elite software.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/events" 
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FFD60A] text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-full"
            >
              Browse Tournaments
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
