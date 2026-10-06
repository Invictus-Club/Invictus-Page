"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Icosahedron, MeshTransmissionMaterial, Float, Stars } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { ArrowLeft, Lightbulb, Zap, Crosshair } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function IdeaCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });
  return (
    <Icosahedron ref={meshRef} args={[2, 0]} scale={1.5}>
      <MeshTransmissionMaterial 
        background={new THREE.Color("#000000")} 
        transmission={1} 
        roughness={0.2} 
        thickness={2} 
        chromaticAberration={0.5} 
        color="#FFFFFF" 
      />
    </Icosahedron>
  );
}

export default function IdeathonsPage() {
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
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            <Float speed={3} rotationIntensity={2} floatIntensity={2}>
              <IdeaCore />
            </Float>
            <OrbitControls enableZoom={false} maxDistance={15} minDistance={3} autoRotate autoRotateSpeed={2} />
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
          <h1 className="text-[12vw] font-black tracking-tighter text-white drop-shadow-2xl leading-none uppercase mix-blend-difference">
            IDEATHONS
          </h1>
          <p className="text-xs sm:text-sm md:text-lg text-gray-400 font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase mt-6 sm:mt-8">
            Think. Pitch. Disrupt.
          </p>
        </motion.div>
      </section>

      <section className="py-20 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase mb-12 sm:mb-20 text-center">Pure Strategy</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Lightbulb, title: "Brainstorm", desc: "No code required yet. Break down massive real-world problems and formulate robust, scalable solutions." },
            { icon: Crosshair, title: "Strategize", desc: "Define the business model, the user acquisition strategy, and the technical architecture before writing a single line." },
            { icon: Zap, title: "The Pitch", desc: "Sell your vision to industry leaders and investors. Master the art of communication and storytelling." }
          ].map((item, i) => (
            <div key={i} className="bg-[#050505] border border-gray-800 p-10 rounded-3xl hover:border-white/50 transition-colors group">
              <item.icon size={40} className="text-white mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="h-[70vh] flex flex-col items-center justify-center relative bg-white text-black">
        <h2 className="text-[10vw] font-black tracking-tighter mb-8 leading-none text-center">
          SHAPE THE <br/> FUTURE.
        </h2>
        <button className="px-12 py-5 bg-black text-white font-bold tracking-widest uppercase text-sm hover:scale-105 transition-all rounded-full">
          Join the Think Tank
        </button>
      </section>
    </main>
  );
}
