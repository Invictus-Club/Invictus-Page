/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sphere, MeshDistortMaterial, Stars, TorusKnot, MeshTransmissionMaterial } from "@react-three/drei";
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

function FluidBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });
  return (
    <Sphere ref={meshRef} args={[2, 128, 128]} scale={1.5}>
      <MeshDistortMaterial 
        color="#00FFCC" 
        attach="material" 
        distort={0.4} 
        speed={1.5} 
        roughness={0} 
        metalness={1} 
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </Sphere>
  );
}

function ColossalCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= delta * 0.05;
      meshRef.current.rotation.y += delta * 0.05;
    }
  });
  return (
    <TorusKnot ref={meshRef} args={[3, 1, 256, 64]} scale={1.5}>
      <MeshTransmissionMaterial 
        background={new THREE.Color("#000000")} 
        transmission={1} 
        roughness={0.1} 
        thickness={2} 
        chromaticAberration={0.4} 
        color="#00FFCC" 
      />
    </TorusKnot>
  );
}

export default function OffsiteProjectDevPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    lenis.scrollTo(0, { immediate: true });
    
    lenis.on('scroll', ScrollTrigger.update);
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0, 0);

    const ctx = gsap.context(() => {
      // Horizontal Scroll for Travel/Culture Section
      const panels = gsap.utils.toArray(".travel-panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".travel-container",
          pin: true,
          scrub: 1,
          end: () => {
            const el = document.querySelector(".travel-container") as HTMLElement;
            return el ? "+=" + el.offsetWidth * 2 : "+=0";
          }
        }
      });
      
      // Reveal animations for text
      gsap.fromTo(".reveal-text", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, scrollTrigger: { trigger: ".reveal-trigger", start: "top 70%" } }
      );
    }, containerRef);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-clip selection:bg-[#00FFCC] selection:text-black">
      <Link href="/#opportunities" className="fixed top-8 left-8 z-50 text-white/50 hover:text-white transition flex items-center gap-2 group mix-blend-difference">
        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
        <span className="text-xs font-bold tracking-widest uppercase">Back to Home</span>
      </Link>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-80">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <Float speed={2} rotationIntensity={2} floatIntensity={2}>
              <FluidBlob />
            </Float>
            <Environment preset="city" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none w-full px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-[12vw] font-black tracking-tighter text-white drop-shadow-2xl leading-[0.8] uppercase mix-blend-overlay">
            Wander. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-white">Ship.</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-300 font-bold tracking-[0.4em] uppercase mt-12">
            Escape the noise. Build something real.
          </p>
        </motion.div>
      </section>

      {/* HORIZONTAL TRAVEL & CULTURE SCROLL */}
      <section className="travel-container h-screen bg-black overflow-hidden flex flex-nowrap w-[400vw] relative">
        <div className="absolute top-8 left-6 sm:top-12 sm:left-12 z-20 text-[#00FFCC] font-bold tracking-widest uppercase text-xs sm:text-sm mix-blend-difference">
          THE OFFSITE EXPERIENCE
        </div>
        
        {/* Panel 1: Freedom & Roaming */}
        <div className="travel-panel w-screen h-full relative flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Hacking Setup" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-4xl px-6 sm:px-8">
            <h2 className="text-4xl sm:text-7xl md:text-[8rem] font-black tracking-tighter uppercase mb-4 sm:mb-6 leading-none">Off The Grid.</h2>
            <p className="text-lg sm:text-2xl md:text-4xl font-medium text-gray-300 leading-tight">No campus noise. Just you, your squad, and deep work in uncharted territory.</p>
          </div>
        </div>

        {/* Panel 2: Coding in Nature */}
        <div className="travel-panel w-screen h-full relative flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Coding" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-4xl px-6 sm:px-8">
            <h2 className="text-4xl sm:text-7xl md:text-[8rem] font-black tracking-tighter uppercase mb-4 sm:mb-6 leading-none">Ship Code.</h2>
            <p className="text-lg sm:text-2xl md:text-4xl font-medium text-gray-300 leading-tight">Lock in. Grind out the architecture. Deploy products that solve actual problems.</p>
          </div>
        </div>

        {/* Panel 3: The Vibe */}
        <div className="travel-panel w-screen h-full relative flex items-center justify-center bg-[#050505]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00FFCC]/20 via-black to-black opacity-50" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-4xl sm:text-6xl md:text-[6rem] font-black tracking-tighter uppercase mb-6 sm:mb-8">This is Offsite.</h2>
            <button className="px-8 sm:px-12 py-4 sm:py-5 bg-transparent border border-[#00FFCC] text-[#00FFCC] hover:bg-[#00FFCC] hover:text-black transition-all rounded-full font-bold tracking-widest text-xs sm:text-sm uppercase">
              Join The Next Expedition
            </button>
          </div>
        </div>
      </section>

      {/* COLOSSAL RENDERING SECTION */}
      <section className="h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
              <ColossalCore />
            </Float>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
            <Environment preset="city" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
        </div>
        
        <div className="relative z-10 text-center pointer-events-none">
          <h2 className="text-[15vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/50 to-transparent leading-[0.8] uppercase">
            TRANSCEND
          </h2>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="h-screen flex flex-col items-center justify-center relative bg-[#050505] overflow-hidden border-t border-white/5">
        <div className="absolute w-[800px] h-[800px] bg-[#00FFCC]/5 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <h2 className="text-[15vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-black/20 mb-8 leading-none">
          PACK UP.
        </h2>
      </section>
    </main>
  );
}
