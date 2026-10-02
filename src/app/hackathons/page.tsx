/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function NeonCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });
  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} scale={1.5}>
      <MeshDistortMaterial 
        color="#FFD60A" 
        emissive="#FFD60A"
        emissiveIntensity={0.5}
        attach="material" 
        distort={0.6} 
        speed={3} 
        roughness={0.2} 
        metalness={0.9} 
      />
    </Sphere>
  );
}

export default function HackathonsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0, 0);

    const ctx = gsap.context(() => {
      // Staggered reveal for the massive text blocks
      gsap.fromTo(".massive-text", 
        { y: 150, opacity: 0, rotateX: -30 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          duration: 1.5, 
          stagger: 0.2, 
          ease: "power4.out",
          scrollTrigger: { trigger: ".massive-trigger", start: "top 80%" } 
        }
      );

      // Image Parallax Reveal
      const images = gsap.utils.toArray(".parallax-img");
      images.forEach((img: any) => {
        gsap.to(img, {
          yPercent: -20,
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
      ctx.revert();
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-hidden selection:bg-[#FFD60A] selection:text-black">
      <Link href="/" className="fixed top-8 left-8 z-50 text-white/50 hover:text-white transition flex items-center gap-2 group mix-blend-difference">
        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
        <span className="text-xs font-bold tracking-widest uppercase">Back to Home</span>
      </Link>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-70">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={2} />
            <NeonCore />
            <OrbitControls enableZoom={false} maxDistance={15} minDistance={3} autoRotate autoRotateSpeed={1} />
            <Environment preset="city" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none w-full px-4 mt-20"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-[12vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFD60A] to-yellow-800 drop-shadow-2xl leading-[0.8] uppercase">
            HACKATHONS
          </h1>
          <p className="text-sm md:text-lg text-gray-300 font-bold tracking-[0.4em] uppercase mt-8 mix-blend-difference">
            Code. Travel. Eat. Conquer.
          </p>
        </motion.div>
      </section>

      {/* STORY DRIVEN CONTENT (Travel, Food, Freedom) */}
      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto space-y-40 massive-trigger">
        
        {/* Block 1: Travel & Freedom */}
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 h-[60vh] relative overflow-hidden rounded-2xl group border border-gray-800">
            <div className="absolute inset-0 bg-[#FFD60A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <img src="https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=2070&auto=format&fit=crop" alt="Roadtrip" className="parallax-img absolute w-full h-[120%] object-cover top-0" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="massive-text text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight">The Road <br/> To Glory.</h2>
            <p className="massive-text text-xl md:text-2xl text-gray-400 font-medium leading-relaxed">
              It’s not just an event. It’s a roadtrip with your best friends. It’s the independence of traveling to new cities, staying in bizarre Airbnb's, and exploring the world while you compete against top-tier talent.
            </p>
          </div>
        </div>

        {/* Block 2: Food & Culture */}
        <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
          <div className="w-full md:w-1/2 h-[60vh] relative overflow-hidden rounded-2xl group border border-gray-800">
            <div className="absolute inset-0 bg-[#FFD60A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <img src="https://images.unsplash.com/photo-1617196034183-421b4917c907?q=80&w=2088&auto=format&fit=crop" alt="Late night food" className="parallax-img absolute w-full h-[120%] object-cover top-0" />
          </div>
          <div className="w-full md:w-1/2 md:text-right">
            <h2 className="massive-text text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight text-[#FFD60A]">Cultures & <br/> Cravings.</h2>
            <p className="massive-text text-xl md:text-2xl text-gray-400 font-medium leading-relaxed">
              Every city has a flavor. 3 AM shawarmas, local delicacies, and endless caffeine. You aren't just coding—you're experiencing the rich food cultures of every region you conquer.
            </p>
          </div>
        </div>

        {/* Block 3: The Code & Arena */}
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 h-[60vh] relative overflow-hidden rounded-2xl group border border-gray-800">
            <div className="absolute inset-0 bg-[#FFD60A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" alt="The Arena" className="parallax-img absolute w-full h-[120%] object-cover top-0" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="massive-text text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight">The <br/> Arena.</h2>
            <p className="massive-text text-xl md:text-2xl text-gray-400 font-medium leading-relaxed">
              Under the neon lights, adrenaline takes over. 24 hours to prove yourself. The roar of the crowd, the pressure of the deadline, and the electrifying feeling of a perfectly executed pitch.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="h-screen flex flex-col items-center justify-center relative bg-[#050505] overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFD60A]/20 via-black to-black opacity-50 z-0" />
        <h2 className="text-[12vw] font-black tracking-tighter text-white mb-8 leading-none relative z-10 mix-blend-overlay">
          READY TO GO?
        </h2>
        <button className="relative z-10 px-12 py-5 bg-[#FFD60A] text-black font-bold tracking-widest uppercase text-sm hover:bg-white transition-all rounded-full hover:scale-105 shadow-[0_0_30px_rgba(255,214,10,0.4)]">
          View Upcoming Expeditions
        </button>
      </section>
    </main>
  );
}
