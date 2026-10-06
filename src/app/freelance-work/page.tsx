"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Torus, MeshWobbleMaterial, Stars } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { ArrowLeft, Briefcase, Zap, Globe } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function DynamicRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });
  return (
    <Torus ref={meshRef} args={[2, 0.4, 64, 128]} scale={1.5}>
      <MeshWobbleMaterial 
        color="#D90429" 
        attach="material" 
        factor={1} 
        speed={2} 
        roughness={0.2} 
        metalness={0.8}
      />
    </Torus>
  );
}

export default function FreelanceWorkPage() {
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
    <main className="bg-black text-white min-h-screen font-sans overflow-x-hidden selection:bg-[#D90429] selection:text-white">
      <Link href="/#opportunities" className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 text-white/50 hover:text-white transition flex items-center gap-2 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
        <span className="text-xs font-bold tracking-widest uppercase">Back to Home</span>
      </Link>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <DynamicRing />
            <OrbitControls enableZoom={false} maxDistance={20} minDistance={5} autoRotate autoRotateSpeed={2} />
            <Environment preset="city" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-black mb-4 tracking-tighter text-white drop-shadow-2xl leading-none">
            FREELANCE
          </h1>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D90429] to-transparent my-4 sm:my-6 opacity-50" />
          <p className="text-sm sm:text-lg md:text-xl text-gray-400 font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase">
            Build. Deliver. <span className="text-[#D90429]">Get Paid.</span>
          </p>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase mb-12 sm:mb-20 text-center">The Network</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Globe, title: "Global Clients", desc: "We source high-quality freelance projects from startups and enterprises globally, funneling them to top VTU talent." },
            { icon: Zap, title: "Deslop Designs", desc: "Deliver state-of-the-art 'deslop' UI/UX and robust backends. We enforce a high standard of quality." },
            { icon: Briefcase, title: "Seamless Delivery", desc: "Manage contracts, payments, and client communication seamlessly through the Invictus infrastructure." }
          ].map((item, i) => (
            <div key={i} className="bg-[#050505] border border-gray-800 p-10 rounded-2xl hover:border-[#D90429]/50 transition-colors group relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#D90429]/10 blur-[40px] rounded-full group-hover:bg-[#D90429]/20 transition-all duration-700" />
              <item.icon size={40} className="text-[#D90429] mb-8" />
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVE Bounties */}
      <section className="py-32 bg-[#050505] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Live Bounties</h2>
            <span className="text-xs font-bold tracking-widest text-[#D90429] animate-pulse uppercase">3 Active</span>
          </div>
          
          <div className="space-y-4">
            {[
              { role: "Frontend Developer", budget: "$1,200", tech: "React / Three.js" },
              { role: "Smart Contract Dev", budget: "$3,500", tech: "Solidity / Foundry" },
              { role: "UI/UX Designer", budget: "$800", tech: "Figma / Framer" }
            ].map((job, i) => (
              <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 border border-gray-800 rounded-xl hover:bg-[#0a0a0a] transition-all duration-500 cursor-pointer group hover:border-[#D90429]/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D90429]/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
                
                <div>
                  <h4 className="text-2xl font-black tracking-tighter mb-2 group-hover:text-[#D90429] transition-colors">{job.role}</h4>
                  <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">{job.tech}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-6">
                  <span className="text-xl font-bold font-mono">{job.budget}</span>
                  <button className="px-6 py-2 bg-white text-black text-xs font-bold tracking-widest uppercase rounded-full hover:bg-[#D90429] hover:text-white transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="h-[60vh] flex flex-col items-center justify-center relative bg-black">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 text-center">
          READY TO WORK?
        </h2>
        <button className="px-12 py-5 bg-transparent border-2 border-[#D90429] text-[#D90429] font-bold tracking-widest uppercase text-sm hover:bg-[#D90429] hover:text-white transition-all">
          Join Freelance Roster
        </button>
      </section>
    </main>
  );
}
