/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Box, Stars } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  Box as BoxIcon, 
  Shield, 
  Trophy, 
  Cpu, 
  Terminal, 
  CheckCircle, 
  Layers, 
  GitBranch,
  Server
} from "lucide-react";

// 3D Modular Engineering Grid of Blocks representing system architecture
function ArchitectureGridMesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group ref={groupRef}>
        {[-1.2, 0, 1.2].map((x, i) =>
          [-1.2, 0, 1.2].map((y, j) =>
            [-1.2, 0, 1.2].map((z, k) => (
              <Box key={`${i}-${j}-${k}`} position={[x, y, z]} args={[0.55, 0.55, 0.55]}>
                <meshStandardMaterial 
                  color={(i + j + k) % 2 === 0 ? "#D90429" : "#222222"} 
                  emissive={(i + j + k) % 2 === 0 ? "#800000" : "#000000"}
                  emissiveIntensity={0.5}
                  metalness={0.8}
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
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const evaluationCriteria = [
    {
      title: "Production Architecture",
      desc: "No spaghetti student scripts. Microservices or modular monoliths designed with decoupling, database indexing, and stateless APIs.",
      icon: Server
    },
    {
      title: "Hard Stress Testing & Observability",
      desc: "Live load tests using k6 or Artillery. Benchmarks proving response times under 1,000 concurrent virtual users with Grafana dashboards.",
      icon: Cpu
    },
    {
      title: "Security & Secret Sanitization",
      desc: "Zero leaked environment variables, OWASP Top 10 compliance, CSRF guards, and strict TypeScript compilation with zero 'any' escapes.",
      icon: Shield
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
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={2.5} color="#D90429" />
            <directionalLight position={[-10, -5, -5]} intensity={1.5} color="#FFFFFF" />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <ArchitectureGridMesh />
            <OrbitControls enableZoom={false} maxDistance={15} minDistance={4} autoRotate autoRotateSpeed={0.8} />
            <Environment preset="city" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,4,41,0.1),transparent_70%)] pointer-events-none" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none px-4 max-w-5xl"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D90429]/40 bg-[#D90429]/10 text-[#D90429] text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <BoxIcon className="w-3.5 h-3.5" /> Semester Project & Final Year Exhibitions
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(217,4,41,0.3)] leading-[0.85] uppercase">
            PROJECT<br/>CONTESTS
          </h1>

          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#D90429] to-transparent mx-auto my-6" />

          <p className="text-xs sm:text-sm md:text-lg text-gray-300 font-bold tracking-[0.25em] uppercase max-w-2xl mx-auto leading-relaxed">
            From Academic Submissions to Industrial Grade Software.
          </p>
        </motion.div>
      </section>

      {/* THE THREE STANDARDS */}
      <section className="py-20 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#D90429] uppercase mb-2 block">
            THE INVICTUS CRITERIA
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white">
            Transforming College Projects into Market Products
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mt-4 leading-relaxed">
            99% of engineering semester projects are abandoned after marks are submitted. Invictus helps teams turn their capstone and 6th-semester projects into open-source tools with active users or proprietary patent filings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {evaluationCriteria.map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-[#080808] border border-gray-800 hover:border-[#D90429]/50 transition-all flex flex-col justify-between">
              <div>
                <item.icon size={36} className="text-[#D90429] mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-900 text-xs font-mono text-gray-500">
                Evaluation Metric 0{i+1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWCASE OF PAST CAPSTONES */}
      <section className="py-20 bg-[#060606] border-t border-gray-800 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase mb-8">
            FEATURED STUDENT CAPSTONES FROM OUR SQUAD
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-black border border-gray-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#D90429] font-bold uppercase">VTU Best Project Award 2026</span>
                <h4 className="text-2xl font-black tracking-tight text-white mt-2 mb-3">Hyper-Local Microgrid Power Arbitrage</h4>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Built by 4 final-year Invictus members. Deployed bidirectional power meters with an automated order book matching excess solar battery power among neighboring apartments.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono text-gray-300">
                  <span className="px-2.5 py-1 bg-gray-900 rounded">ESP32 + Modbus</span>
                  <span className="px-2.5 py-1 bg-gray-900 rounded">Go Backend</span>
                  <span className="px-2.5 py-1 bg-gray-900 rounded">TimescaleDB</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-black border border-gray-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#D90429] font-bold uppercase">State Innovation Grant Winner</span>
                <h4 className="text-2xl font-black tracking-tight text-white mt-2 mb-3">Autonome: Drone Aerial Photogrammetry for Agriculture</h4>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Constructed custom quadcopter with multispectral sensors and a local WebAssembly stitching engine processing NDVI crop stress maps directly on farmer laptops.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono text-gray-300">
                  <span className="px-2.5 py-1 bg-gray-900 rounded">OpenCV + C++</span>
                  <span className="px-2.5 py-1 bg-gray-900 rounded">Next.js WebGPU</span>
                  <span className="px-2.5 py-1 bg-gray-900 rounded">PX4 Autopilot</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="h-[60vh] flex flex-col items-center justify-center relative bg-[#D90429] text-black px-6 text-center">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none">
          SUBMIT YOUR PROJECT
        </h2>
        <p className="text-sm sm:text-base text-black/80 font-medium max-w-xl mb-8 leading-relaxed">
          Get your architecture reviewed by top software engineers and compete for our internal ₹50,000 capstone sponsorship pool.
        </p>
        <Link 
          href="/create-profile"
          className="px-10 py-4 bg-black text-white font-bold tracking-widest uppercase text-xs hover:scale-105 transition-all rounded-full shadow-2xl"
        >
          Submit to Review Council
        </Link>
      </section>
    </main>
  );
}
