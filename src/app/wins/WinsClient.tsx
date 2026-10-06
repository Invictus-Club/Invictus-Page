"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, TorusKnot, Wireframe, MeshWobbleMaterial } from "@react-three/drei";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function AutoSlider({ images, name }: { images: string[], name: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-[220px] sm:h-[300px] md:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-800 group mt-6 sm:mt-8">
      <div 
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="w-full h-full shrink-0 relative">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
            <img 
              src={img} 
              alt={`${name} image ${idx + 1}`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
        ))}
      </div>
      
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-[#FFD60A] w-8' : 'bg-white/50 w-2'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AnimatedTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <TorusKnot ref={ref} args={[1.5, 0.4, 128, 32]} scale={1.5}>
        <MeshWobbleMaterial color="#FFD60A" factor={0.5} speed={2} wireframe={true} />
      </TorusKnot>
    </Float>
  );
}

export default function WinsClient({ winsData }: { winsData: any[] }) {
  const sortedWins = [...winsData].sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime());

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background 3D */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={1} />
          <AnimatedTorus />
          <Environment preset="city" />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <Link href="/" className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-[#FFD60A] transition-colors mb-8 sm:mb-16">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Base
        </Link>

        <h1 className="text-5xl sm:text-7xl md:text-[10rem] font-black tracking-tighter uppercase mb-6 sm:mb-12 text-[#FFD60A] drop-shadow-[0_0_50px_rgba(255,214,10,0.3)] leading-none">
          Hall of Fame
        </h1>
        <p className="text-base sm:text-xl md:text-3xl font-medium text-gray-400 max-w-3xl mb-12 sm:mb-24 leading-relaxed">
          We don&apos;t just participate. We dominate. A record of the battle scars and victories of the Invictus squad.
        </p>

        <div className="space-y-12 sm:space-y-24">
          {sortedWins.map((win, i) => (
            <motion.div 
              key={win.id}
              initial={{ opacity: 0, y: 150, scale: 0.7, rotateX: 30, filter: "blur(15px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: i * 0.1, type: "spring", bounce: 0.35, damping: 15 }}
              className="flex flex-col gap-6 sm:gap-8 transform-gpu"
              style={{ transformPerspective: 1200 }}
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center p-6 sm:p-8 md:p-12 border border-gray-800 bg-black/50 backdrop-blur-md rounded-3xl hover:border-[#FFD60A]/50 transition-all group">
                <div className="md:w-1/4">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-gray-500 group-hover:text-white transition-colors">
                    {win.displayDate.split(' ').pop()}
                  </div>
                  <div className="text-xs sm:text-sm font-bold tracking-widest text-[#FFD60A] mt-1 sm:mt-2 uppercase">
                    {win.displayDate.split(' ').slice(0, -1).join(' ')}
                  </div>
                </div>

                <div className="md:w-2/4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter mb-2 sm:mb-4 text-white group-hover:text-[#FFD60A] transition-colors">
                    {win.name}
                  </h3>
                  <p className="text-gray-400 font-medium text-sm sm:text-base md:text-lg leading-relaxed">
                    {win.location}
                  </p>
                </div>

                <div className="md:w-1/4 flex justify-start md:justify-end w-full md:w-auto mt-2 md:mt-0">
                  <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-black to-[#111] border border-gray-800 rounded-full w-24 h-24 sm:w-32 sm:h-32 group-hover:shadow-[0_0_30px_rgba(255,214,10,0.2)] transition-shadow">
                    <Trophy className={`w-8 h-8 sm:w-10 sm:h-10 mb-1 sm:mb-2 ${win.position.toLowerCase().includes('1st') || win.position.toLowerCase().includes('winner') ? 'text-[#FFD60A]' : 'text-gray-400'}`} />
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-center">{win.position}</span>
                  </div>
                </div>
              </div>
              
              {/* Slider for images */}
              <AutoSlider images={win.images} name={win.name} />
            </motion.div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </main>
  );
}
