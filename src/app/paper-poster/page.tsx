"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Plane, Stars } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { ArrowLeft, Presentation, Layers, Eye } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function FloatingPosters() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1} position={[
          Math.sin((i / 12) * Math.PI * 2) * 5,
          ((Math.sin(i * 123.45) + 1) / 2 - 0.5) * 4,
          Math.cos((i / 12) * Math.PI * 2) * 5
        ]}>
          <Plane args={[1.5, 2]}>
            <meshStandardMaterial color={new THREE.Color().setHSL(i/12, 0.8, 0.5)} side={THREE.DoubleSide} roughness={0.2} metalness={0.1} />
          </Plane>
        </Float>
      ))}
    </group>
  );
}

export default function PaperPosterPage() {
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
    <main ref={containerRef} className="bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white">
      <Link href="/" className="fixed top-8 left-8 z-50 text-white/50 hover:text-white transition flex items-center gap-2 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
        <span className="text-xs font-bold tracking-widest uppercase">Back to Home</span>
      </Link>

      <section className="relative h-screen flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-60">
          <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            <FloatingPosters />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="city" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-2xl leading-none uppercase">
            PAPER <br/> POSTER
          </h1>
          <p className="text-sm md:text-lg text-gray-400 font-bold tracking-[0.4em] uppercase mt-8">
            Visualize Your Findings.
          </p>
        </motion.div>
      </section>

      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-20 text-center">The Exhibition</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Eye, title: "Visual Impact", desc: "Turn dense research papers into stunning, easy-to-digest visual posters that capture attention." },
            { icon: Presentation, title: "Present", desc: "Stand by your work in our gallery events. Defend your research and answer questions from the community." },
            { icon: Layers, title: "Network", desc: "Connect with like-minded researchers and potential collaborators during the poster sessions." }
          ].map((item, i) => (
            <div key={i} className="bg-black border border-gray-800 p-10 rounded-2xl hover:border-purple-500/50 transition-colors group">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-8 group-hover:bg-purple-500/20 transition-colors">
                <item.icon size={30} className="text-purple-500" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="h-[60vh] flex flex-col items-center justify-center relative bg-gradient-to-r from-purple-900 to-pink-900 text-white">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 text-center max-w-3xl drop-shadow-lg">
          SHOWCASE YOUR BRILLIANCE.
        </h2>
        <button className="px-12 py-5 bg-white text-black font-bold tracking-widest uppercase text-sm hover:scale-105 transition-all rounded-full shadow-2xl">
          Reserve a Board
        </button>
      </section>
    </main>
  );
}
