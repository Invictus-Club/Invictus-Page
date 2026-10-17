/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, TorusKnot, MeshDistortMaterial, Stars, Torus } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
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

// 3D Gyroscopic Fly-Rings and Kinetic Core (Ships / Flight Dynamics)
function FlyRingsCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.8;
      ring1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.6;
      ring2Ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.9) * 0.6;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.5;
      ring3Ref.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Central Fluid Core */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.8}>
        <TorusKnot ref={meshRef} args={[1.5, 0.4, 128, 32]} scale={1.2}>
          <MeshDistortMaterial 
            color="#00FFCC" 
            emissive="#004433"
            emissiveIntensity={0.65}
            roughness={0.15} 
            metalness={0.85} 
            distort={0.4}
            speed={2.5}
          />
        </TorusKnot>
      </Float>

      {/* Fly-Rings: Multi-axis Aerodynamic Gyro Rings */}
      <Torus ref={ring1Ref} args={[3.2, 0.035, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color="#00FFCC" emissive="#00FFCC" emissiveIntensity={0.8} />
      </Torus>

      <Torus ref={ring2Ref} args={[3.8, 0.025, 16, 100]} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} wireframe />
      </Torus>

      <Torus ref={ring3Ref} args={[4.4, 0.02, 16, 100]} rotation={[0, Math.PI / 6, 0]}>
        <meshStandardMaterial color="#00FFCC" emissive="#00FFCC" emissiveIntensity={0.3} wireframe />
      </Torus>
    </group>
  );
}

export default function OffsiteProjectDevPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [telemetryAlt, setTelemetryAlt] = useState(420);
  const [telemetrySpeed, setTelemetrySpeed] = useState(64);

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
      // Horizontal Scroll for Travel/Culture Section with cinematic 3-axis Drone Flight movement
      const horizontalTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".travel-container",
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            // Live Drone Telemetry HUD calculation
            const progress = self.progress;
            setTelemetryAlt(Math.round(420 + progress * 380));
            setTelemetrySpeed(Math.round(58 + Math.sin(progress * Math.PI) * 44));
          },
          end: () => {
            const el = document.querySelector(".travel-container") as HTMLElement;
            return el ? "+=" + el.offsetWidth * 2.2 : "+=0";
          }
        }
      });

      // 1. Horizontal track movement
      horizontalTl.to(".travel-panels-wrapper", {
        xPercent: -75,
        ease: "none"
      }, 0);

      // 2. Drone Movement Dynamics: 3-Axis Banking, Pitch, Altitude & Acceleration Zoom
      horizontalTl
        // Panel 1: Bank Right into Forest Valley
        .fromTo(".panel-1-drone", 
          { scale: 1.05, rotation: 0, xPercent: 0, yPercent: 0 },
          { scale: 1.38, rotation: 3.5, xPercent: -12, yPercent: -6, ease: "none" }, 0
        )
        // Panel 2: Coastal Horizon Sweep & Ocean Skim Banking Left
        .fromTo(".panel-2-drone", 
          { scale: 1.05, rotation: 2, xPercent: 10, yPercent: 4 },
          { scale: 1.42, rotation: -3.8, xPercent: -8, yPercent: -10, ease: "none" }, 0.22
        )
        // Panel 3: Alpine Climb & High Altitude Mountain Ridge Dive
        .fromTo(".panel-3-drone", 
          { scale: 1.05, rotation: -2, yPercent: 8, xPercent: -6 },
          { scale: 1.35, rotation: 2.2, yPercent: -12, xPercent: 8, ease: "none" }, 0.48
        )
        // Panel 4: Pull-up to Starry Cosmos
        .fromTo(".panel-4-drone", 
          { scale: 1.1, rotation: 0, yPercent: 5 },
          { scale: 1.45, rotation: -1.2, yPercent: -15, ease: "none" }, 0.72
        );

      // 3. Zigzag Clean Text Parallax on panels
      horizontalTl
        .fromTo(".panel-1-text", { x: -60, opacity: 0.7 }, { x: 40, opacity: 1, ease: "power1.out" }, 0)
        .fromTo(".panel-2-text", { x: 80, opacity: 0.6 }, { x: -40, opacity: 1, ease: "power1.out" }, 0.25)
        .fromTo(".panel-3-text", { x: -80, opacity: 0.6 }, { x: 30, opacity: 1, ease: "power1.out" }, 0.5)
        .fromTo(".panel-4-text", { scale: 0.88, opacity: 0.6 }, { scale: 1.05, opacity: 1, ease: "power1.out" }, 0.75);

      // 4. Zigzag entry for upcoming retreats cards
      gsap.fromTo(".retreat-card-left",
        { opacity: 0, x: -70, y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".retreats-grid",
            start: "top 75%",
          }
        }
      );

      gsap.fromTo(".retreat-card-right",
        { opacity: 0, x: 70, y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          scrollTrigger: {
            trigger: ".retreats-grid",
            start: "top 75%",
          }
        }
      );

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
      <Link href="/#opportunities" className="fixed top-6 left-6 sm:top-8 sm:left-8 z-50 text-white/60 hover:text-[#00FFCC] transition flex items-center gap-2 group mix-blend-difference">
        <ArrowLeft size={18} className="group-hover:-translate-x-1.5 transition-transform" />
        <span className="text-xs font-mono font-bold tracking-widest uppercase">BACK TO BASE</span>
      </Link>

      {/* HERO SECTION WITH FLY-RINGS 3D CANVAS & REWIRED TYPOGRAPHY */}
      <section className="relative h-screen flex flex-col items-center justify-center border-b border-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-80">
          <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={2.5} color="#00FFCC" />
            <directionalLight position={[-10, -5, -5]} intensity={1.2} color="#FFFFFF" />
            <Stars radius={80} depth={50} count={3500} factor={4} saturation={0} fade speed={1.5} />
            <FlyRingsCore />
            <OrbitControls enableZoom={false} maxDistance={15} minDistance={4} autoRotate autoRotateSpeed={0.8} />
            <Environment preset="night" />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,204,0.12),transparent_70%)] pointer-events-none" />
        </div>
        
        <motion.div 
          className="z-10 text-center pointer-events-none w-full px-4 max-w-5xl space-y-4"
          initial={{ opacity: 0, scale: 0.94, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          {/* Rewired Eyebrow HUD Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FFCC]/40 bg-[#00FFCC]/10 text-[#00FFCC] text-[11px] font-mono font-bold tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(0,255,204,0.2)]">
            <Radio className="w-3.5 h-3.5 animate-pulse text-[#00FFCC]" />
            <span>INVICTUS FLIGHT LOG // DEV EXPEDITIONS</span>
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-white drop-shadow-[0_0_60px_rgba(0,255,204,0.35)] leading-[0.85] uppercase">
            OFFSITE DEV
          </h1>

          <div className="w-56 h-1 bg-gradient-to-r from-transparent via-[#00FFCC] to-transparent mx-auto my-4 shadow-[0_0_15px_#00FFCC]" />

          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-mono font-bold tracking-[0.25em] uppercase max-w-2xl mx-auto leading-relaxed">
            ESCAPE CAMPUS NOISE <span className="text-[#00FFCC]">•</span> RENT A PRIVATE VILLA <span className="text-[#00FFCC]">•</span> SHIP REAL CODE
          </p>

          <div className="pt-4 flex items-center justify-center gap-4 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#00FFCC]" /> VTU Regional Hub
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-[#00FFCC]" /> Off-Grid Starlink Meshes
            </span>
          </div>
        </motion.div>
      </section>

      {/* HORIZONTAL TRAVEL & CULTURE SCROLL - PURE DRONESHOTS, FLY-THROUGHS, HUD & ZIGZAG LAYOUT */}
      <section className="travel-container h-screen bg-black overflow-hidden relative">
        {/* Cinematic FPV Drone HUD Overlay */}
        <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-30 pointer-events-none flex flex-col gap-1 text-[11px] font-mono text-[#00FFCC] mix-blend-difference">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold tracking-widest">DRONE CAMERA [REC] // 4K 60FPS</span>
          </div>
          <span className="text-gray-400 text-[10px]">LENS: 14MM ULTRA-WIDE FPV • ISO 200</span>
        </div>

        {/* Live Scrubbed Telemetry HUD Display */}
        <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-30 pointer-events-none text-right font-mono text-xs mix-blend-difference space-y-0.5">
          <div className="text-[#00FFCC] font-bold tracking-wider flex items-center justify-end gap-2">
            <Crosshair size={14} className="text-[#00FFCC]" />
            <span>ALT: {telemetryAlt}M</span>
            <span>•</span>
            <span>SPD: {telemetrySpeed} KM/H</span>
          </div>
          <p className="text-[10px] text-gray-400 tracking-widest">GPS LOCK: 18 SATELLITES // HEADING 284° W</p>
        </div>

        {/* Bottom Horizontal Waypoint Tracker */}
        <div className="absolute bottom-8 left-6 sm:left-12 z-30 pointer-events-none flex items-center gap-3 text-xs font-mono tracking-widest text-gray-400 mix-blend-difference">
          <span className="text-[#00FFCC] font-bold">EXPEDITION WAYPOINTS</span>
          <span>——</span>
          <span className="text-gray-300">01 CANOPY</span>
          <span>•</span>
          <span className="text-gray-300">02 COAST</span>
          <span>•</span>
          <span className="text-gray-300">03 RIDGE</span>
          <span>•</span>
          <span className="text-gray-300">04 COSMOS</span>
        </div>
        
        <div className="travel-panels-wrapper flex w-[400vw] h-full">
          
          {/* Panel 1: Aerial Mountain/Forest Drone-Shot (ZIGZAG 1: LEFT-ALIGNED TEXT, DRONE BANKS RIGHT) */}
          <div className="travel-panel w-screen h-full relative flex items-center justify-start p-8 sm:p-20 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop" 
              className="panel-1-drone absolute inset-0 w-full h-full object-cover opacity-45 origin-center will-change-transform" 
              alt="Mountain Canopy Drone Shot" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            
            <div className="panel-1-text relative z-10 max-w-3xl space-y-4 text-left">
              {/* Rewired Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00FFCC]/15 border border-[#00FFCC]/30 text-[#00FFCC] text-xs font-mono font-bold tracking-widest">
                <Navigation size={13} />
                <span>WAYPOINT 01 // DANDELI DEEP FOREST CANOPY</span>
              </div>

              <h2 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase text-white leading-[0.9]">
                Off The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00FFCC]">Grid.</span>
              </h2>

              <p className="text-base sm:text-xl md:text-2xl font-medium text-gray-200 leading-relaxed max-w-xl">
                Zero campus attendance mandates. Zero academic bureaucracy. A private mountain villa where the only daily objective is deep architecture and code execution.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#00FFCC]">
                <span>COORDINATES: 15.2993° N, 74.9643° E</span>
                <span>•</span>
                <span>ELEVATION: 620M</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Coastal / Offshore Marine Drone-Shot (ZIGZAG 2: RIGHT-ALIGNED TEXT, DRONE BANKS LEFT) */}
          <div className="travel-panel w-screen h-full relative flex items-center justify-end p-8 sm:p-20 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop" 
              className="panel-2-drone absolute inset-0 w-full h-full object-cover opacity-40 origin-center will-change-transform" 
              alt="Coastal Horizon and Marine Drone View" 
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            
            <div className="panel-2-text relative z-10 max-w-3xl space-y-4 text-right ml-auto">
              {/* Rewired Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00FFCC]/15 border border-[#00FFCC]/30 text-[#00FFCC] text-xs font-mono font-bold tracking-widest ml-auto">
                <Navigation size={13} />
                <span>WAYPOINT 02 // GOKARNA SHORELINE EXPEDITION</span>
              </div>

              <h2 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase text-white leading-[0.9]">
                Ship Without <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-white">Limits.</span>
              </h2>

              <p className="text-base sm:text-xl md:text-2xl font-medium text-gray-200 leading-relaxed max-w-xl ml-auto">
                Code outdoors with the sea breeze. 72 continuous sprint hours where concepts transform into production dockerized containers and real live user traffic.
              </p>

              <div className="pt-2 flex items-center justify-end gap-4 text-xs font-mono text-[#00FFCC]">
                <span>ARABIAN SEA CORRIDOR</span>
                <span>•</span>
                <span>COORDINATES: 14.5479° N, 74.3188° E</span>
              </div>
            </div>
          </div>

          {/* Panel 3: High-Altitude Roadtrip / Alpine Drone-Shot (ZIGZAG 3: LEFT-ALIGNED TEXT, DRONE DIVES DOWN) */}
          <div className="travel-panel w-screen h-full relative flex items-center justify-start p-8 sm:p-20 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2070&auto=format&fit=crop" 
              className="panel-3-drone absolute inset-0 w-full h-full object-cover opacity-40 origin-center will-change-transform" 
              alt="Roadtrip Exploration Drone View" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            
            <div className="panel-3-text relative z-10 max-w-3xl space-y-4 text-left">
              {/* Rewired Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00FFCC]/15 border border-[#00FFCC]/30 text-[#00FFCC] text-xs font-mono font-bold tracking-widest">
                <Navigation size={13} />
                <span>WAYPOINT 03 // WESTERN GHATS HIGHWAY ASCENT</span>
              </div>

              <h2 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase text-white leading-[0.9]">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00FFCC]">Journey.</span>
              </h2>

              <p className="text-base sm:text-xl md:text-2xl font-medium text-gray-200 leading-relaxed max-w-xl">
                Late night highway convoys, local diner chai, and heated whiteboard debates that spark next-generation startup concepts hours before the sunrise.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#00FFCC]">
                <span>MOUNTAIN PASS CRUISE</span>
                <span>•</span>
                <span>ALTITUDE: 940M RIDGE</span>
              </div>
            </div>
          </div>

          {/* Panel 4: Night Hacking & The Launch (ZIGZAG 4: CENTER STAGE RADIAL LAUNCH) */}
          <div className="travel-panel w-screen h-full relative flex items-center justify-center p-8 sm:p-20 overflow-hidden bg-black">
            <img 
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop" 
              className="panel-4-drone absolute inset-0 w-full h-full object-cover opacity-35 origin-center will-change-transform" 
              alt="Night Sky Stars Drone Shot" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,204,0.18),transparent_65%)] pointer-events-none" />
            
            <div className="panel-4-text relative z-10 max-w-3xl text-center space-y-6">
              {/* Rewired Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00FFCC]/15 border border-[#00FFCC]/40 text-[#00FFCC] text-xs font-mono font-bold tracking-[0.25em] uppercase mx-auto shadow-[0_0_20px_rgba(0,255,204,0.3)]">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#00FFCC]" />
                <span>WAYPOINT 04 // FINAL PRODUCTION MERGE</span>
              </div>

              <h2 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase text-white leading-none">
                Bonded by <span className="text-[#00FFCC]">Code.</span>
              </h2>

              <p className="text-sm sm:text-lg md:text-xl text-gray-300 leading-relaxed font-medium max-w-xl mx-auto">
                Real software built alongside real friends. Experience the exhilarating adrenaline of shipping live container clusters under the open stars.
              </p>

              <div className="pt-2">
                <Link
                  href="/#opportunities"
                  className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#00FFCC] text-black font-mono font-black tracking-widest uppercase text-xs hover:bg-white hover:scale-105 transition-all rounded-full shadow-[0_0_35px_rgba(0,255,204,0.4)]"
                >
                  <span>EXPLORE EXPEDITIONS</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* UPCOMING CONFIRMED OFFSITE CALENDAR - CLEAN ZIGZAG TIMELINE */}
      <section className="py-24 sm:py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-gray-900">
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#00FFCC] uppercase mb-2 block">
            SANCTIONED EXPEDITIONS // 2026-2027
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white">
            Upcoming Hacker Retreats
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-mono mt-2">
            Invictus cohorts travel with subsidized lodging, high-speed Starlink backups, and full hardware kits.
          </p>
        </div>

        {/* Alternating Zigzag Cards Layout */}
        <div className="retreats-grid grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Zigzag Left */}
          <div className="retreat-card-left p-8 sm:p-10 rounded-3xl bg-[#080808] border border-gray-800 hover:border-[#00FFCC]/60 transition-all duration-500 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.8)] group hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-4 pb-3 border-b border-gray-900">
                <span className="flex items-center gap-1.5 text-[#00FFCC] font-bold">
                  <Calendar className="w-3.5 h-3.5" /> {offsiteItinerary[0].date}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300">
                  {offsiteItinerary[0].duration}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-500">
                  EXPEDITION COHORT 01
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-[#00FFCC] transition-colors">
                  {offsiteItinerary[0].destination}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-medium my-5 leading-relaxed">
                {offsiteItinerary[0].objective}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-gray-900 text-xs text-gray-400">
                {offsiteItinerary[0].amenities.map((am, idx) => (
                  <div key={idx} className="flex items-center gap-2 font-mono">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00FFCC] shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-900">
              <Link
                href="/#opportunities"
                className="block text-center py-3.5 bg-black border border-gray-800 hover:border-[#00FFCC] text-white hover:text-[#00FFCC] text-xs font-mono font-bold tracking-widest uppercase transition-all rounded-xl"
              >
                VIEW COHORT DETAILS
              </Link>
            </div>
          </div>

          {/* Card 2: Zigzag Right */}
          <div className="retreat-card-right p-8 sm:p-10 rounded-3xl bg-[#080808] border border-gray-800 hover:border-amber-400/60 transition-all duration-500 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.8)] group hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-4 pb-3 border-b border-gray-900">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Calendar className="w-3.5 h-3.5" /> {offsiteItinerary[1].date}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300">
                  {offsiteItinerary[1].duration}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-500">
                  EXPEDITION COHORT 02
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {offsiteItinerary[1].destination}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-medium my-5 leading-relaxed">
                {offsiteItinerary[1].objective}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-gray-900 text-xs text-gray-400">
                {offsiteItinerary[1].amenities.map((am, idx) => (
                  <div key={idx} className="flex items-center gap-2 font-mono">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-900">
              <Link
                href="/#opportunities"
                className="block text-center py-3.5 bg-black border border-gray-800 hover:border-amber-400 text-white hover:text-amber-400 text-xs font-mono font-bold tracking-widest uppercase transition-all rounded-xl"
              >
                VIEW COHORT DETAILS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="h-[60vh] flex flex-col items-center justify-center relative bg-black px-6 text-center border-t border-gray-900">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none text-white">
          PACK YOUR BAGS.
        </h2>
        <p className="text-sm sm:text-base text-gray-400 max-w-xl mb-8 leading-relaxed font-mono">
          The best code you will ever write won&apos;t be inside a classroom cubicle. It will be under the stars with peers who push you to the limit.
        </p>
        <Link 
          href="/#opportunities"
          className="px-10 py-4 bg-[#00FFCC] text-black font-mono font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-full shadow-[0_0_30px_rgba(0,255,204,0.4)]"
        >
          EXPLORE THE NETWORK
        </Link>
      </section>
    </main>
  );
}
