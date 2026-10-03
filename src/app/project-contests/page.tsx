"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Box, Stars } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { ArrowLeft, Box as BoxIcon, Shield, Trophy } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function GridStructure() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
      group.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 50 }).map((_, i) => (
        <Box 
          key={i} 
          args={[0.2, 0.2, 0.2]} 
          position={[
            ((Math.sin(i * 12.3) + 1) / 2 - 0.5) * 10,
            ((Math.cos(i * 45.6) + 1) / 2 - 0.5) * 10,
            ((Math.sin(i * 78.9) + 1) / 2 - 0.5) * 10
          ]}
        >
          <meshStandardMaterial color="#D90429" wireframe />
        </Box>
      ))}
      <Box args={[3, 3, 3]}>
        <meshStandardMaterial color="#000000" metalness={1} roughness={0.2} transparent opacity={0.8} />
      </Box>
    </group>
  );
}

export default function ProjectContestsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-x-hidden selection:bg-[#D90429] selection:text-white">
      <Link href="/" className="fixed top-8 left-8 z-50 text-white/50 hover:text-white transition flex items-center gap-2 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
        <span className="text-xs font-bold tracking-widest uppercase">Back to Home</span>
      </Link>

      <section className="relative h-screen flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
              <GridStructure />
            </Float>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="city" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D90429] drop-shadow-2xl leading-none uppercase">
            PROJECT<br/>CONTESTS
          </h1>
          <p className="text-sm md:text-lg text-gray-400 font-bold tracking-[0.4em] uppercase mt-8">
            Exhibition of Engineering.
          </p>
        </motion.div>
      </section>

      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-20 text-center">The Standards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: BoxIcon, title: "Architecture", desc: "Showcase robust, scalable, and beautifully engineered software architecture." },
            { icon: Shield, title: "Execution", desc: "It's not just a prototype. It's a fully functional, market-ready product." },
            { icon: Trophy, title: "Recognition", desc: "Compete against the best final year and semester projects in the VTU ecosystem." }
          ].map((item, i) => (
            <div key={i} className="bg-black border border-gray-800 p-10 rounded-3xl hover:bg-[#D90429] hover:border-[#D90429] transition-all duration-500 group">
              <item.icon size={40} className="text-[#D90429] mb-8 group-hover:text-white transition-colors" />
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-black transition-colors">{item.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed group-hover:text-black/80 transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="h-[70vh] flex flex-col items-center justify-center relative bg-[#D90429] text-black">
        <h2 className="text-[10vw] font-black tracking-tighter mb-8 leading-none text-center">
          PROVE IT.
        </h2>
        <button className="px-12 py-5 bg-black text-white font-bold tracking-widest uppercase text-sm hover:scale-105 transition-all rounded-full shadow-2xl">
          Submit Your Project
        </button>
      </section>
    </main>
  );
}
