/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, TorusKnot, Torus } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  CheckCircle, 
  Calendar,
  Compass,
  ArrowRight,
  Crosshair,
  Radio,
  Wifi,
  Navigation
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Minimalist Architectural Fly-Rings Core
function FlyRingsCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.3;
      ring2Ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.6) * 0.3;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
        <TorusKnot ref={meshRef} args={[1.4, 0.35, 128, 32]} scale={1.1}>
          <meshStandardMaterial 
            color="#00FFCC" 
            emissive="#003322"
            emissiveIntensity={0.5}
            roughness={0.2} 
            metalness={0.85} 
          />
        </TorusKnot>
      </Float>

      <Torus ref={ring1Ref} args={[2.8, 0.02, 16, 80]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color="#00FFCC" emissive="#00FFCC" emissiveIntensity={0.6} />
      </Torus>

      <Torus ref={ring2Ref} args={[3.4, 0.015, 16, 80]} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.4} wireframe />
      </Torus>
    </group>
  );
}

export default function OffsiteProjectDevPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const altRef = useRef<HTMLSpanElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);

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
      const horizontalTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".travel-container",
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            const progress = self.progress;
            if (altRef.current) {
              altRef.current.textContent = `${Math.round(420 + progress * 380)}M`;
            }
            if (speedRef.current) {
              speedRef.current.textContent = `${Math.round(58 + Math.sin(progress * Math.PI) * 44)} KM/H`;
            }
          },
          end: () => {
            const el = document.querySelector(".travel-container") as HTMLElement;
            return el ? "+=" + el.offsetWidth * 2.2 : "+=0";
          }
        }
      });

      horizontalTl.to(".travel-panels-wrapper", {
        xPercent: -75,
        ease: "none"
      }, 0);

      horizontalTl
        .fromTo(".panel-1-drone", 
          { scale: 1.02, rotation: 0 },
          { scale: 1.25, rotation: 2, ease: "none" }, 0
        )
        .fromTo(".panel-2-drone", 
          { scale: 1.02, rotation: 1 },
          { scale: 1.25, rotation: -2, ease: "none" }, 0.22
        )
        .fromTo(".panel-3-drone", 
          { scale: 1.02, rotation: -1 },
          { scale: 1.25, rotation: 1.5, ease: "none" }, 0.48
        )
        .fromTo(".panel-4-drone", 
          { scale: 1.05, rotation: 0 },
          { scale: 1.3, rotation: -1, ease: "none" }, 0.72
        );

      horizontalTl
        .fromTo(".panel-1-text", { x: -40, opacity: 0.7 }, { x: 20, opacity: 1, ease: "power1.out" }, 0)
        .fromTo(".panel-2-text", { x: 60, opacity: 0.6 }, { x: -20, opacity: 1, ease: "power1.out" }, 0.25)
        .fromTo(".panel-3-text", { x: -60, opacity: 0.6 }, { x: 20, opacity: 1, ease: "power1.out" }, 0.5)
        .fromTo(".panel-4-text", { scale: 0.92, opacity: 0.6 }, { scale: 1.02, opacity: 1, ease: "power1.out" }, 0.75);

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

  const offsiteItinerary = [
    {
      destination: "Dandeli Forest Hacker Villa",
      duration: "4 Days / 3 Nights",
      date: "November 2026",
      objective: "Full-Stack System Architecture Sprint & Off-Grid LoRa Meshes",
      amenities: ["Fiber Internet via Starlink backup", "Whiteboard Glass Walls", "Nightly Code Teardowns"]
    },
    {
      destination: "Gokarna Coastal Dev Retreat",
      duration: "5 Days / 4 Nights",
      date: "January 2027",
      objective: "AI Agent Tournament Scaffolding & Open-Source Modules",
      amenities: ["Sea-Facing Co-working Desks", "Cold Brew Bar", "Deep Focus Sprints"]
    }
  ];

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-clip selection:bg-[#00FFCC] selection:text-black">
      {/* Sleek Minimalist Floating Back Button */}
      <Link 
        href="/#opportunities" 
        className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 text-xs font-mono uppercase tracking-widest transition-all"
      >
        <ArrowLeft size={14} />
        <span>Base</span>
      </Link>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-70">
          <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={2.2} color="#00FFCC" />
            <directionalLight position={[-10, -5, -5]} intensity={1.2} color="#FFFFFF" />
            <FlyRingsCore />
            <OrbitControls enableZoom={false} maxDistance={14} minDistance={4} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,204,0.06),transparent_65%)] pointer-events-none" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none w-full px-6 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 text-[11px] font-mono font-medium tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFCC]" />
            DEV EXPEDITIONS // OFF-GRID RESIDENCIES
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[9.5rem] font-black tracking-tighter text-white leading-[0.88] uppercase">
            OFFSITE DEV
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-mono tracking-[0.2em] uppercase mt-6 max-w-xl mx-auto leading-relaxed">
            Private Villas. Uninterrupted Focus. Shipping Real Production Software.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#00FFCC]" /> VTU Regional Network
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-[#00FFCC]" /> Off-Grid Starlink Backups
            </span>
          </div>
        </motion.div>
      </section>

      {/* HORIZONTAL TRAVEL SCROLL */}
      <section className="travel-container h-screen bg-black overflow-hidden relative">
        {/* HUD Telemetry */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-10 z-30 pointer-events-none flex flex-col gap-1 text-[11px] font-mono text-[#00FFCC]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold tracking-widest">DRONE TELEMETRY // 4K 60FPS</span>
          </div>
          <span className="text-zinc-500 text-[10px]">14MM ULTRA-WIDE FPV • PRO EXPOSURE</span>
        </div>

        <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-30 pointer-events-none text-right font-mono text-xs space-y-0.5">
          <div className="text-[#00FFCC] font-bold tracking-wider flex items-center justify-end gap-2">
            <Crosshair size={14} className="text-[#00FFCC]" />
            <span>ALT: <span ref={altRef}>420M</span></span>
            <span>•</span>
            <span>SPD: <span ref={speedRef}>58 KM/H</span></span>
          </div>
          <p className="text-[10px] text-zinc-500 tracking-widest">HEADING: 284° W // SATELLITES: 18</p>
        </div>

        <div className="absolute bottom-8 left-6 sm:left-12 z-30 pointer-events-none flex items-center gap-3 text-xs font-mono tracking-widest text-zinc-500">
          <span className="text-[#00FFCC] font-bold">WAYPOINTS:</span>
          <span>01 CANOPY</span>
          <span>•</span>
          <span>02 COAST</span>
          <span>•</span>
          <span>03 RIDGE</span>
          <span>•</span>
          <span>04 COSMOS</span>
        </div>
        
        <div className="travel-panels-wrapper flex w-[400vw] h-full">
          {/* Panel 1 */}
          <div className="travel-panel w-screen h-full relative flex items-center justify-start p-8 sm:p-20 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop" 
              className="panel-1-drone absolute inset-0 w-full h-full object-cover opacity-35 origin-center will-change-transform" 
              alt="Mountain Canopy Drone Shot" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            
            <div className="panel-1-text relative z-10 max-w-2xl space-y-4 text-left">
              <span className="text-xs font-mono text-[#00FFCC] font-bold tracking-widest block uppercase">
                WAYPOINT 01 // DANDELI FOREST CANOPY
              </span>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase text-white leading-[0.9]">
                Off The Grid.
              </h2>
              <p className="text-sm sm:text-base md:text-lg font-normal text-zinc-300 leading-relaxed">
                Zero campus interruptions. Zero administrative friction. A private mountain residency where the primary focus is distributed software architecture and code execution.
              </p>
              <div className="pt-2 text-xs font-mono text-zinc-500">
                COORDINATES: 15.2993° N, 74.9643° E • ELEVATION: 620M
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="travel-panel w-screen h-full relative flex items-center justify-end p-8 sm:p-20 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop" 
              className="panel-2-drone absolute inset-0 w-full h-full object-cover opacity-35 origin-center will-change-transform" 
              alt="Coastal Horizon Drone View" 
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            
            <div className="panel-2-text relative z-10 max-w-2xl space-y-4 text-right ml-auto">
              <span className="text-xs font-mono text-[#00FFCC] font-bold tracking-widest block uppercase">
                WAYPOINT 02 // GOKARNA SHORELINE EXPEDITION
              </span>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase text-white leading-[0.9]">
                Pure Velocity.
              </h2>
              <p className="text-sm sm:text-base md:text-lg font-normal text-zinc-300 leading-relaxed ml-auto">
                Continuous 72-hour development sprints where technical concepts evolve into deployed containers serving live production endpoints.
              </p>
              <div className="pt-2 text-xs font-mono text-zinc-500">
                COORDINATES: 14.5479° N, 74.3188° E • ARABIAN SEA SECTOR
              </div>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="travel-panel w-screen h-full relative flex items-center justify-start p-8 sm:p-20 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2070&auto=format&fit=crop" 
              className="panel-3-drone absolute inset-0 w-full h-full object-cover opacity-35 origin-center will-change-transform" 
              alt="Roadtrip Drone View" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            
            <div className="panel-3-text relative z-10 max-w-2xl space-y-4 text-left">
              <span className="text-xs font-mono text-[#00FFCC] font-bold tracking-widest block uppercase">
                WAYPOINT 03 // WESTERN GHATS HIGHWAY PASS
              </span>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase text-white leading-[0.9]">
                The Roadtrip.
              </h2>
              <p className="text-sm sm:text-base md:text-lg font-normal text-zinc-300 leading-relaxed">
                Late night highway convoys, local highway chai, and deep whiteboard debates that spark next-generation open source projects before sunrise.
              </p>
              <div className="pt-2 text-xs font-mono text-zinc-500">
                ALTITUDE: 940M RIDGE • TRANSIT CORRIDOR
              </div>
            </div>
          </div>

          {/* Panel 4 */}
          <div className="travel-panel w-screen h-full relative flex items-center justify-center p-8 sm:p-20 overflow-hidden bg-black">
            <img 
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop" 
              className="panel-4-drone absolute inset-0 w-full h-full object-cover opacity-30 origin-center will-change-transform" 
              alt="Night Sky Stars Drone Shot" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black" />
            
            <div className="panel-4-text relative z-10 max-w-2xl text-center space-y-5">
              <span className="text-xs font-mono text-[#00FFCC] font-bold tracking-widest uppercase block">
                WAYPOINT 04 // MERGE & DEPLOY
              </span>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase text-white leading-none">
                Bonded by Code.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed font-normal mx-auto">
                Real software built alongside genuine peers. The camaraderie of shipping live clusters under the open night sky.
              </p>
              <div className="pt-4">
                <Link
                  href="/#opportunities"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00FFCC] text-black font-mono font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-full"
                >
                  <span>Explore Expeditions</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIRMED COHORTS */}
      <section className="py-24 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-zinc-900">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#00FFCC] uppercase mb-2 block">
              // UPCOMING RESIDENCIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
              Scheduled Retreats
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-md">
            Subsidized lodging, high-speed Starlink backups, and full hardware kits provided.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offsiteItinerary.map((cohort, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-[#00FFCC]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 pb-3 border-b border-zinc-900">
                  <span className="flex items-center gap-1.5 text-[#00FFCC] font-bold">
                    <Calendar className="w-3.5 h-3.5" /> {cohort.date}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                    {cohort.duration}
                  </span>
                </div>

                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-500 block mb-1">
                  COHORT 0{idx + 1}
                </span>
                <h3 className="text-2xl font-black tracking-tight text-white mb-3 group-hover:text-[#00FFCC] transition-colors">
                  {cohort.destination}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-normal mb-6 leading-relaxed">
                  {cohort.objective}
                </p>

                <div className="space-y-2 pt-4 border-t border-zinc-900 text-xs text-zinc-400">
                  {cohort.amenities.map((am, i) => (
                    <div key={i} className="flex items-center gap-2 font-mono">
                      <CheckCircle className="w-3.5 h-3.5 text-[#00FFCC] shrink-0" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-900">
                <Link
                  href="/#opportunities"
                  className="block text-center py-3 bg-zinc-900 border border-zinc-800 hover:border-white text-zinc-300 hover:text-white text-xs font-mono font-bold tracking-widest uppercase transition-all rounded-xl"
                >
                  Cohort Overview
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MINIMALIST CTA */}
      <section className="py-28 px-6 bg-black text-center border-t border-zinc-900">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FFCC] block">
            // JOIN NEXT COHORT
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white leading-tight">
            Build Outside The Classroom.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            The most meaningful projects emerge when dedicated developers collaborate without distractions. Join the upcoming offsite roster.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/#opportunities" 
              className="w-full sm:w-auto px-8 py-3.5 bg-[#00FFCC] text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-full"
            >
              All Opportunities
            </Link>
            <Link 
              href="/events" 
              className="w-full sm:w-auto px-8 py-3.5 border border-zinc-800 text-zinc-300 font-mono font-medium tracking-widest uppercase text-xs hover:border-white hover:text-white transition-all rounded-full"
            >
              Events Calendar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
