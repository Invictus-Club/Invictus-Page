/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, TorusKnot, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  Coffee, 
  Wifi, 
  Mountain, 
  CheckCircle, 
  Sparkles, 
  Calendar,
  Compass,
  Users
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 3D Organic Fluid Torus representing freedom, fluid movement & nomadic engineering
function OrganicNomadCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.8}>
      <TorusKnot ref={meshRef} args={[1.7, 0.45, 128, 32]} scale={1.3}>
        <MeshDistortMaterial 
          color="#00FFCC" 
          emissive="#005544"
          emissiveIntensity={0.6}
          roughness={0.15} 
          metalness={0.85} 
          distort={0.45}
          speed={2.2}
          wireframe={false}
        />
      </TorusKnot>
    </Float>
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
    }, containerRef);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const offsiteItinerary = [
    {
      destination: "Dandeli Forest Hacker Villa",
      duration: "4 Days / 3 Nights",
      date: "Late November 2026",
      objective: "Full-Stack System Architecture Sprint & High-Bandwidth LoRa Meshes",
      amenities: ["Fiber Internet via Starlink backup", "Whiteboard Glass Walls", "Kayaking & Campfire Standups"]
    },
    {
      destination: "Gokarna Coastal Dev Retreat",
      duration: "5 Days / 4 Nights",
      date: "January 2027",
      objective: "AI Agent Hackathon Preparation & Open-Source Kernel Modules",
      amenities: ["Sea-Facing Co-working Desks", "Cold Brew Bar", "Nightly Code Teardowns"]
    }
  ];

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-clip selection:bg-[#00FFCC] selection:text-black">
      {/* Top Header Back Button */}
      <Link href="/#opportunities" className="fixed top-8 left-8 z-50 text-white/50 hover:text-white transition flex items-center gap-2 group mix-blend-difference">
        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
        <span className="text-xs font-bold tracking-widest uppercase">Back to Base</span>
      </Link>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center border-b border-gray-800">
        <div className="absolute inset-0 z-0 opacity-80">
          <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={2.5} color="#00FFCC" />
            <directionalLight position={[-10, -5, -5]} intensity={1.2} color="#FFFFFF" />
            <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />
            <OrganicNomadCore />
            <OrbitControls enableZoom={false} maxDistance={15} minDistance={4} autoRotate autoRotateSpeed={1} />
            <Environment preset="night" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,204,0.1),transparent_70%)] pointer-events-none" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none w-full px-4 max-w-5xl"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FFCC]/40 bg-[#00FFCC]/10 text-[#00FFCC] text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <Compass className="w-3.5 h-3.5" /> Nomadic Engineering & Retreats
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(0,255,204,0.3)] leading-[0.85] uppercase">
            OFFSITE DEV
          </h1>

          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#00FFCC] to-transparent mx-auto my-6" />

          <p className="text-xs sm:text-sm md:text-lg text-gray-300 font-bold tracking-[0.25em] uppercase max-w-2xl mx-auto leading-relaxed">
            Escape Campus Noise. Rent a Villa with Top Engineers. Ship Without Distractions.
          </p>
        </motion.div>
      </section>

      {/* HORIZONTAL TRAVEL & CULTURE SCROLL */}
      <section className="travel-container h-screen bg-black overflow-hidden flex flex-nowrap w-[300vw] relative">
        <div className="absolute top-8 left-6 sm:top-12 sm:left-12 z-20 text-[#00FFCC] font-mono font-bold tracking-widest uppercase text-xs sm:text-sm mix-blend-difference flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> THE OFFSITE CULTURE (SCROLL HORIZONTALLY)
        </div>
        
        {/* Panel 1: Freedom & Roaming */}
        <div className="travel-panel w-screen h-full relative flex items-center justify-center p-6 sm:p-16">
          <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-25" alt="Hacking Setup" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 max-w-4xl space-y-4">
            <span className="text-xs font-mono text-[#00FFCC] font-bold uppercase tracking-widest">PHASE 01 • THE SANCTUARY</span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase text-white leading-none">Off The Grid.</h2>
            <p className="text-base sm:text-xl md:text-2xl font-medium text-gray-300 leading-relaxed">
              No college attendance mandates, no mundane cafeteria food. A secluded estate equipped with high-speed fiber where your only focus is solving hard engineering problems.
            </p>
          </div>
        </div>

        {/* Panel 2: Coding in Nature */}
        <div className="travel-panel w-screen h-full relative flex items-center justify-center p-6 sm:p-16">
          <img src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-25" alt="Coding" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 max-w-4xl space-y-4">
            <span className="text-xs font-mono text-[#00FFCC] font-bold uppercase tracking-widest">PHASE 02 • THE MOMENTUM</span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase text-white leading-none">Zero Friction.</h2>
            <p className="text-base sm:text-xl md:text-2xl font-medium text-gray-300 leading-relaxed">
              Pair-program next to teammates who write code 5x faster than average. 72 continuous hours where ideas go from whiteboard scribbles to production container deployments.
            </p>
          </div>
        </div>

        {/* Panel 3: Fellowship */}
        <div className="travel-panel w-screen h-full relative flex items-center justify-center p-6 sm:p-16 bg-[#050505]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00FFCC]/15 via-black to-black opacity-60" />
          <div className="relative z-10 max-w-3xl text-center space-y-6">
            <span className="text-xs font-mono text-[#00FFCC] font-bold uppercase tracking-widest">PHASE 03 • BROTHERHOOD</span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white leading-none">Bonded by Code.</h2>
            <p className="text-sm sm:text-lg text-gray-300 leading-relaxed font-medium">
              You don’t just build software—you build lifelong co-founders. Late-night conversations about startup mechanics, economics, and life beyond college walls.
            </p>
            <Link
              href="/create-profile"
              className="inline-block px-10 py-4 bg-[#00FFCC] text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-full"
            >
              Request Invitation to Next Offsite
            </Link>
          </div>
        </div>
      </section>

      {/* UPCOMING CONFIRMED OFFSITE CALENDAR */}
      <section className="py-24 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-gray-800">
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#00FFCC] uppercase mb-2 block">
            SANCTIONED EXPEDITIONS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white">
            Upcoming Hacker Retreats
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mt-4 leading-relaxed">
            Invictus subsidizes villa rentals and food for active contributors. Seats are limited to 12 developers per cohort to maintain high signal and focus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offsiteItinerary.map((trip, i) => (
            <div key={i} className="p-8 sm:p-10 rounded-3xl bg-[#080808] border border-gray-800 hover:border-[#00FFCC]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5 text-[#00FFCC] font-bold">
                    <Calendar className="w-3.5 h-3.5" /> {trip.date}
                  </span>
                  <span>{trip.duration}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">{trip.destination}</h3>
                <p className="text-xs sm:text-sm text-gray-300 font-medium mb-6 leading-relaxed">{trip.objective}</p>

                <div className="space-y-2 pt-4 border-t border-gray-900 text-xs text-gray-400">
                  {trip.amenities.map((am, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#00FFCC]" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-900">
                <Link
                  href="/create-profile"
                  className="block text-center py-3.5 bg-black border border-gray-700 hover:border-[#00FFCC] text-white hover:text-[#00FFCC] text-xs font-bold tracking-widest uppercase transition-all rounded-xl"
                >
                  Apply For Seat in Cohort
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="h-[60vh] flex flex-col items-center justify-center relative bg-black px-6 text-center border-t border-gray-900">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none text-white">
          PACK YOUR BAGS.
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-xl mb-8 leading-relaxed">
          The best code you will ever write won't be in a classroom cubicle. It will be under the stars with people who push you to the limit.
        </p>
        <Link 
          href="/create-profile"
          className="px-10 py-4 bg-[#00FFCC] text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-full shadow-[0_0_30px_rgba(0,255,204,0.4)]"
        >
          Join The Invictus Network
        </Link>
      </section>
    </main>
  );
}
