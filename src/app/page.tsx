/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronRight, Menu, ExternalLink } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ----------------------------------------------------
// 3D HERO BACKGROUND (Abstract wireframe/particles)
// ----------------------------------------------------
function ParticleNetwork() {
  const ref = useRef<THREE.Points>(null);
  const count = 1500;
  
  // Generate random points in a sphere
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const rand1 = Math.abs(Math.sin(i * 12.9898)) % 1;
      const rand2 = Math.abs(Math.sin(i * 78.233)) % 1;
      const rand3 = Math.abs(Math.sin(i * 45.123)) % 1;
      
      const r = 20 * Math.cbrt(rand1);
      const theta = rand2 * 2 * Math.PI;
      const phi = Math.acos(2 * rand3 - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#FFD60A" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  );
}

import Lenis from "lenis";

function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 bg-black pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <fog attach="fog" args={["#000000", 10, 25]} />
        <ParticleNetwork />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
    </div>
  );
}

import { supabase } from "@/lib/supabase";
import winsData from "@/data/wins";
import eventsData from "@/data/events";

// ----------------------------------------------------
// NAVIGATION
// ----------------------------------------------------
function Navbar() {
  const [session, setSession] = useState<unknown>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference text-white">
      <div className="font-bold tracking-widest text-lg">INVICTUS</div>
      <div className="hidden md:flex gap-8 text-xs font-semibold tracking-widest">
        <Link href="#about-showcase" className="hover:text-[#FFD60A] transition-colors">ABOUT</Link>
        <Link href="#opportunities" className="hover:text-[#FFD60A] transition-colors">OPPORTUNITIES</Link>
        <Link href="#events" className="hover:text-[#FFD60A] transition-colors">EVENTS</Link>
        <Link href="#achievements" className="hover:text-[#FFD60A] transition-colors">ACHIEVEMENTS</Link>
      </div>
      <div className="flex items-center gap-4">
        {session ? (
          <Link href="/profile" className="hidden md:block bg-[#FFD60A] text-black px-6 py-2.5 text-xs font-bold tracking-widest hover:bg-white transition-colors">
            GO TO DASHBOARD
          </Link>
        ) : (
          <Link href="/create-profile" className="hidden md:block bg-white text-black px-6 py-2.5 text-xs font-bold tracking-widest hover:bg-[#FFD60A] transition-colors">
            JOIN INVICTUS
          </Link>
        )}
        <Menu className="md:hidden w-6 h-6" />
      </div>
    </nav>
  );
}

// ----------------------------------------------------
// PAGE COMPONENT
// ----------------------------------------------------
export default function PremiumInvictus() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
  
  useGSAP(() => {
    // Cinematic Showcase Animation 1
    const showcaseTl1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#culture-1",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true
      }
    });

    showcaseTl1
      .to("#culture-1 .drone-shot", { scale: 1.2, opacity: 0.8, ease: "none" }, 0)
      .fromTo("#culture-1 .center-element", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, ease: "power2.out" }, 0)
      .fromTo("#culture-1 .float-img-1", { y: "50vh", rotation: -15, scale: 0.8 }, { y: "-20vh", rotation: 5, scale: 1.1, ease: "none" }, 0)
      .fromTo("#culture-1 .float-img-2", { y: "60vh", rotation: 10, scale: 0.9 }, { y: "-30vh", rotation: -5, scale: 1.2, ease: "none" }, 0)
      .fromTo("#culture-1 .float-img-3", { x: -100, y: "40vh", rotation: -20 }, { x: 50, y: "-10vh", rotation: 10, ease: "none" }, 0)
      .fromTo("#culture-1 .float-img-4", { x: 100, y: "50vh", rotation: 20 }, { x: -50, y: "-15vh", rotation: -10, ease: "none" }, 0);

    // Cinematic Showcase Animation 2
    const showcaseTl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#culture-2",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true
      }
    });

    showcaseTl2
      .to("#culture-2 .drone-shot-2", { scale: 1.2, opacity: 0.8, ease: "none" }, 0)
      .fromTo("#culture-2 .center-element-2", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, ease: "power2.out" }, 0)
      .fromTo("#culture-2 .float-img-2-1", { y: "50vh", rotation: 15, scale: 0.8 }, { y: "-20vh", rotation: -5, scale: 1.1, ease: "none" }, 0)
      .fromTo("#culture-2 .float-img-2-2", { y: "60vh", rotation: -10, scale: 0.9 }, { y: "-30vh", rotation: 5, scale: 1.2, ease: "none" }, 0)
      .fromTo("#culture-2 .float-img-2-3", { x: 100, y: "40vh", rotation: 20 }, { x: -50, y: "-10vh", rotation: -10, ease: "none" }, 0)
      .fromTo("#culture-2 .float-img-2-4", { x: -100, y: "50vh", rotation: -20 }, { x: 50, y: "-15vh", rotation: 10, ease: "none" }, 0);

    // Element by Element Stagger Animations for Events and Achievements
    gsap.fromTo(".event-item", 
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.05,
        scrollTrigger: {
          trigger: "#events",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".achievement-item", 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        scrollTrigger: {
          trigger: "#achievements",
          start: "top 80%",
        }
      }
    );

    // Smooth, elegant entrance for Editorial Panels
    gsap.fromTo(".warp-panel", 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#editorial",
          start: "top 75%",
        }
      }
    );

    // Pinned How it works
    ScrollTrigger.create({
      trigger: ".pinned-container",
      start: "top top",
      end: "+=300%",
      pin: true,
      animation: gsap.to(".pinned-content", {
        xPercent: -75,
        ease: "none"
      }),
      scrub: 1
    });

    // Phonk Style Edit Card Reveal
    gsap.fromTo(".opportunity-card", 
      { scale: 1.1, opacity: 0, rotationZ: 5, filter: "brightness(2) contrast(1.5)" },
      { 
        scale: 1, 
        opacity: 1, 
        rotationZ: 0,
        filter: "brightness(1) contrast(1)",
        duration: 0.5, 
        stagger: 0.1, 
        ease: "expo.out", 
        scrollTrigger: { trigger: "#opportunities", start: "top 70%" } 
      }
    );

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-black min-h-screen text-white selection:bg-[#FFD60A] selection:text-black font-sans overflow-hidden">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-16 pt-20">
        <Hero3D />
        
        <div className="relative z-10 flex flex-col items-start gap-4 max-w-5xl">
          <div className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#FFD60A]">
            VTU • COMPETITION & INNOVATION
          </div>
          
          <h1 className="text-7xl sm:text-9xl lg:text-[12rem] font-black tracking-tighter leading-[0.85] text-white">
            INVICTUS
          </h1>
          
          <p className="text-xl sm:text-3xl font-light text-gray-300 tracking-tight max-w-2xl mt-4">
            Learn, build, compete and grow together.
          </p>
          
          <p className="text-sm sm:text-base text-gray-500 max-w-xl font-medium leading-relaxed mt-4">
            A student-led initiative connecting VTU students to competitions, teams, innovation, and opportunities beyond their campus.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-12">
            <Link href="#about-showcase">
              <button className="bg-[#FFD60A] text-black px-8 py-4 text-sm font-bold tracking-widest hover:bg-white transition-all flex items-center gap-2">
                EXPLORE INVICTUS <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/create-profile">
              <button className="bg-transparent border border-gray-700 text-white px-8 py-4 text-sm font-bold tracking-widest hover:border-white transition-all">
                JOIN THE COMMUNITY
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CINEMATIC SHOWCASE - SCENE 1 */}
      <section id="culture-1" className="relative h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/culture-pics/1st-main-background(bg1).png" 
            alt="Culture Background 1" 
            className="w-full h-full object-cover opacity-30 drone-shot origin-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
        
        <div className="z-10 relative flex items-center justify-center w-full h-full">
          <div className="absolute z-10 center-element text-center px-4 pointer-events-none">
            <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase text-white mix-blend-overlay drop-shadow-2xl">
              THE CULTURE
            </h2>
            <p className="text-[#FFD60A] tracking-[0.4em] font-bold mt-4 uppercase text-sm">Beyond The Campus</p>
          </div>
          
          {/* Floating Image Elements */}
          <img src="/culture-pics/bg1-img1.png" className="absolute w-40 h-56 md:w-64 md:h-80 object-cover float-img-1 rounded-2xl shadow-[0_0_40px_rgba(255,214,10,0.25)] z-20 border border-white/10" style={{ left: '5%', top: '20%' }} />
          <img src="/culture-pics/bg1-img2.png" className="absolute w-48 h-64 md:w-72 md:h-96 object-cover float-img-2 rounded-2xl shadow-[0_0_40px_rgba(255,214,10,0.25)] z-20 border border-white/10" style={{ right: '5%', top: '15%' }} />
          <img src="/culture-pics/bg1-img3.png" className="absolute w-56 h-40 md:w-80 md:h-64 object-cover float-img-3 rounded-2xl shadow-[0_0_40px_rgba(255,214,10,0.25)] z-20 border border-white/10" style={{ left: '15%', bottom: '15%' }} />
          <img src="/culture-pics/bg1-img4.png" className="absolute w-40 h-40 md:w-56 md:h-56 object-cover float-img-4 rounded-2xl shadow-[0_0_40px_rgba(255,214,10,0.25)] z-20 border border-white/10" style={{ right: '15%', bottom: '10%' }} />
        </div>
      </section>

      {/* 2.5 CINEMATIC SHOWCASE - SCENE 2 */}
      <section id="culture-2" className="relative h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/culture-pics/2nd-main-background(bg2).png" 
            alt="Culture Background 2" 
            className="w-full h-full object-cover opacity-30 drone-shot-2 origin-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
        
        <div className="z-10 relative flex items-center justify-center w-full h-full">
          <div className="absolute z-10 center-element-2 text-center px-4 pointer-events-none">
            <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase text-white mix-blend-overlay drop-shadow-2xl">
              THE VISION
            </h2>
            <p className="text-[#FFD60A] tracking-[0.4em] font-bold mt-4 uppercase text-sm">Building The Future</p>
          </div>
          
          {/* Floating Image Elements */}
          <img src="/culture-pics/bg2-img1.png" className="absolute w-40 h-56 md:w-64 md:h-80 object-cover float-img-2-1 rounded-2xl shadow-[0_0_40px_rgba(255,214,10,0.25)] z-20 border border-white/10" style={{ right: '10%', top: '25%' }} />
          <img src="/culture-pics/bg2-img2.png" className="absolute w-48 h-64 md:w-72 md:h-96 object-cover float-img-2-2 rounded-2xl shadow-[0_0_40px_rgba(255,214,10,0.25)] z-20 border border-white/10" style={{ left: '10%', top: '10%' }} />
          <img src="/culture-pics/bg2-img3.png" className="absolute w-56 h-40 md:w-80 md:h-64 object-cover float-img-2-3 rounded-2xl shadow-[0_0_40px_rgba(255,214,10,0.25)] z-20 border border-white/10" style={{ right: '20%', bottom: '15%' }} />
          <img src="/culture-pics/bg2-img4.png" className="absolute w-40 h-40 md:w-56 md:h-56 object-cover float-img-2-4 rounded-2xl shadow-[0_0_40px_rgba(255,214,10,0.25)] z-20 border border-white/10" style={{ left: '25%', bottom: '20%' }} />
        </div>
      </section>

      {/* 3. WHAT INVICTUS DOES (Editorial Panels) */}
      <section id="editorial" className="grid grid-cols-1 md:grid-cols-2 border-y border-gray-800 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD60A]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0" />
        
        <div className="warp-panel border-b md:border-b-0 md:border-r border-gray-800 p-12 md:p-20 group hover:bg-white/5 transition-colors relative z-10">
          <span className="text-xs font-bold text-[#FFD60A] tracking-widest mb-8 block">01 / FIND</span>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-white mb-6">
            <AnimatedText text="Discover hackathons, ideathons, and innovation events." />
          </h3>
        </div>
        <div className="warp-panel border-b md:border-b-0 p-12 md:p-20 group hover:bg-white/5 transition-colors relative z-10">
          <span className="text-xs font-bold text-[#D90429] tracking-widest mb-8 block">02 / BUILD</span>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-white mb-6">
            <AnimatedText text="Find teammates based on skills, interests, and availability." />
          </h3>
        </div>
        <div className="warp-panel border-b md:border-b-0 md:border-r border-t md:border-t-0 border-gray-800 p-12 md:p-20 group hover:bg-white/5 transition-colors relative z-10">
          <span className="text-xs font-bold text-gray-500 tracking-widest mb-8 block">03 / COMPETE</span>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-white mb-6">
            <AnimatedText text="Prepare, build, present and compete at premier events." />
          </h3>
        </div>
        <div className="warp-panel border-t border-gray-800 p-12 md:p-20 group hover:bg-white/5 transition-colors relative z-10">
          <span className="text-xs font-bold text-white tracking-widest mb-8 block">04 / REPRESENT</span>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-white mb-6">
            <AnimatedText text="Represent your team, your campus, and the wider VTU community." />
          </h3>
        </div>
      </section>

      {/* 5. OPPORTUNITIES (Highlighted + Grid) */}
      <section id="opportunities" className="py-32 bg-[#050505]">
        <div className="px-6 md:px-16 mb-16 flex items-end justify-between max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Opportunities</h2>
          <Link href="/events" className="hidden md:flex items-center gap-2 text-sm font-bold tracking-widest hover:text-[#FFD60A] transition-colors">
            VIEW ALL <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="px-6 md:px-16 max-w-7xl mx-auto flex flex-col gap-8">
          {/* Highlighted Large Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "OFFSITE DEV", desc: "Get out of the city. Ship real code. Zero distractions.", color: "#00FFCC", path: "/offsite-project-dev", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop" },
              { title: "HACKATHONS", desc: "24 hours to break things and build them better.", color: "#FFD60A", path: "/hackathons", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" }
            ].map((item, i) => (
              <Link href={item.path} key={i} className="opportunity-card h-[500px] border border-gray-800 p-10 flex flex-col justify-between group hover:border-gray-500 transition-colors bg-black relative overflow-hidden block cursor-pointer rounded-3xl hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)]">
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700 mix-blend-luminosity z-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-all duration-700 z-10" />
                
                <div className="relative z-20 flex justify-between items-start">
                  <span className="text-sm font-mono text-white/50 bg-black/50 px-3 py-1 backdrop-blur-md rounded-full">FEATURED</span>
                  <ArrowRight className="text-white/50 group-hover:text-white transform group-hover:-rotate-45 transition-all w-8 h-8" />
                </div>
                
                <div className="relative z-20">
                  <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 transition-colors drop-shadow-lg" style={{ color: item.color }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-200 font-medium text-lg max-w-sm drop-shadow-md">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Rest of the Independent Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { title: "FREELANCE", desc: "Take on client work. Get paid.", color: "#D90429", path: "/freelance-work", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" },
              { title: "IDEATHONS", desc: "Pitch raw ideas, defend them.", color: "#FFFFFF", path: "/ideathons", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" },
              { title: "EXPOS", desc: "Show off what you built this semester.", color: "#D90429", path: "/project-contests", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" },
              { title: "RESEARCH", desc: "Deep dive and publish.", color: "#555555", path: "/research", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop" }
            ].map((item, i) => (
              <Link href={item.path} key={i} className="opportunity-card h-[250px] border border-gray-800 p-6 flex flex-col justify-between group hover:border-gray-600 transition-colors bg-black relative overflow-hidden block cursor-pointer rounded-2xl">
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 group-hover:opacity-30 transition-all duration-500 mix-blend-luminosity z-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
                
                <div className="relative z-20 flex justify-between items-start">
                  <span className="text-xs font-mono text-white/40">0{i+3}</span>
                  <ArrowRight className="text-white/40 group-hover:text-white transform group-hover:-rotate-45 transition-all w-4 h-4" />
                </div>
                
                <div className="relative z-20">
                  <h3 className="text-2xl font-black tracking-tighter mb-2 transition-colors drop-shadow-md" style={{ color: item.color }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-medium text-xs leading-relaxed group-hover:text-gray-200 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (GSAP Pinned Section with 3D Background) */}
      <section className="pinned-container h-screen bg-black text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-50">
          <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <ParticleNetwork />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        </div>
        
        <div className="absolute top-12 left-6 md:left-16 text-xs font-bold tracking-widest uppercase z-10 mix-blend-difference">
          HOW IT WORKS
        </div>
        <div className="pinned-content flex w-[400vw] h-full items-center relative z-10">
          
          <div className="w-[100vw] px-6 md:px-32 flex flex-col justify-center">
            <h2 className="text-[10rem] md:text-[15rem] font-black tracking-tighter text-white/10 leading-none">01</h2>
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter -mt-12 md:-mt-20 relative z-10 text-white">SPOT IT</h3>
            <p className="text-xl md:text-2xl font-medium mt-8 max-w-lg text-gray-400">Find the right hackathon or bounty before anyone else.</p>
          </div>
          
          <div className="w-[100vw] px-6 md:px-32 flex flex-col justify-center">
            <h2 className="text-[10rem] md:text-[15rem] font-black tracking-tighter text-white/10 leading-none">02</h2>
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter -mt-12 md:-mt-20 relative z-10 text-white">SQUAD UP</h3>
            <p className="text-xl md:text-2xl font-medium mt-8 max-w-lg text-gray-400">Pull the best devs and designers from the network.</p>
          </div>
          
          <div className="w-[100vw] px-6 md:px-32 flex flex-col justify-center">
            <h2 className="text-[10rem] md:text-[15rem] font-black tracking-tighter text-[#FFD60A]/20 leading-none">03</h2>
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter -mt-12 md:-mt-20 relative z-10 text-[#D90429]">SHIP</h3>
            <p className="text-xl md:text-2xl font-medium mt-8 max-w-lg text-gray-400">Grind it out. Build something that actually works.</p>
          </div>
          
          <div className="w-[100vw] px-6 md:px-32 flex flex-col justify-center">
            <h2 className="text-[10rem] md:text-[15rem] font-black tracking-tighter text-white/10 leading-none">04</h2>
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter -mt-12 md:-mt-20 relative z-10 text-white">WIN</h3>
            <p className="text-xl md:text-2xl font-medium mt-8 max-w-lg text-gray-400">Take the prize, rep the club, repeat.</p>
          </div>

        </div>
      </section>

      {/* 7. ACHIEVEMENTS */}
      <section id="achievements" className="py-32 px-6 md:px-16 border-b border-gray-800">
        <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] mb-20 text-stroke">
          WE SHOW UP.
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 border-b border-gray-800 pb-20">
          <div>
            <h4 className="text-5xl md:text-7xl font-black tracking-tighter">15+</h4>
            <p className="text-xs font-bold tracking-widest text-gray-500 mt-2 uppercase">Hackathons</p>
          </div>
          <div>
            <h4 className="text-5xl md:text-7xl font-black tracking-tighter text-[#FFD60A]">300+</h4>
            <p className="text-xs font-bold tracking-widest text-gray-500 mt-2 uppercase">Members</p>
          </div>
          <div>
            <h4 className="text-5xl md:text-7xl font-black tracking-tighter">12</h4>
            <p className="text-xs font-bold tracking-widest text-gray-500 mt-2 uppercase">Victories</p>
          </div>
          <div>
            <h4 className="text-5xl md:text-7xl font-black tracking-tighter text-[#D90429]">VTU</h4>
            <p className="text-xs font-bold tracking-widest text-gray-500 mt-2 uppercase">Network</p>
          </div>
        </div>

        {/* Timeline placeholder (Data driven later) */}
        <div className="pt-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold tracking-tight uppercase">Hall of Fame</h3>
            <Link href="/wins" className="text-sm font-bold tracking-widest hover:text-[#FFD60A] transition-colors flex items-center gap-2">
              SEE ALL <ArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-6">
            {winsData
              .sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime())
              .slice(0, 3)
              .map((win, i) => (
              <Link href={`/wins`} key={i} className="achievement-item flex flex-col md:flex-row gap-6 border border-gray-800 p-6 md:p-8 bg-black hover:bg-[#0a0a0a] transition-all duration-500 group cursor-pointer relative overflow-hidden rounded-xl hover:shadow-[0_0_40px_-10px_rgba(255,214,10,0.3)] hover:border-[#FFD60A]/30 block">
                {/* Electrifying sweep effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD60A]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none z-0" />
                
                <div className="md:w-1/4 text-sm font-mono text-gray-500 group-hover:text-gray-300 transition-colors relative z-10">{win.displayDate}</div>
                <div className="md:w-2/4 relative z-10">
                  <h4 className="text-2xl font-black tracking-tight group-hover:text-[#FFD60A] transition-colors text-stroke">{win.name}</h4>
                  <p className="text-gray-400 mt-2 font-medium group-hover:text-gray-300 transition-colors">{win.location}</p>
                </div>
                <div className="md:w-1/4 flex items-start justify-end text-xs font-bold tracking-widest uppercase text-gray-500 group-hover:text-[#FFD60A] transition-colors relative z-10">
                  <Trophy size={16} className="mr-2" /> {win.position}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. EVENTS (Premium Listing) */}
      <section id="events" className="py-32 px-6 md:px-16">
        <div className="flex items-end justify-between mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Events</h2>
          <Link href="/events" className="text-sm font-bold tracking-widest hover:text-[#FFD60A] transition-colors flex items-center gap-2">
            SEE ALL <ArrowRight size={16} />
          </Link>
        </div>

        <div className="border-t border-gray-800 relative z-10">
          {eventsData.slice(0, 3).map((ev, i) => (
            <Link key={i} href="/events" className="event-item flex flex-col md:flex-row items-start md:items-center py-8 border-b border-gray-800 group hover:bg-[#111] transition-colors px-4 -mx-4 cursor-pointer relative overflow-hidden block">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD60A]/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
              <div className="w-full md:w-1/6 text-xl font-bold tracking-tighter text-gray-400 group-hover:text-[#FFD60A] transition-colors relative z-10">
                {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()}
              </div>
              <div className="w-full md:w-3/6 text-3xl font-black tracking-tighter mt-2 md:mt-0 text-stroke relative z-10">{ev.name}</div>
              <div className="w-full md:w-1/6 text-xs font-bold tracking-widest text-gray-500 mt-2 md:mt-0 relative z-10">{ev.category}</div>
              <div className="w-full md:w-1/6 flex justify-between md:justify-end items-center mt-6 md:mt-0 relative z-10">
                <span className={`text-xs font-bold tracking-widest px-3 py-1 rounded-full border ${ev.status === 'OPEN' || ev.status === 'ONGOING' || ev.status === 'UPCOMING' ? 'border-[#FFD60A] text-[#FFD60A]' : 'border-gray-700 text-gray-500'}`}>
                  {ev.status}
                </span>
                <ChevronRight className="hidden md:block ml-4 text-gray-600 group-hover:text-[#FFD60A] transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. COMMUNITY MARQUEE */}
      <section className="py-20 border-y border-gray-800 bg-[#0a0a0a] overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content text-[8rem] md:text-[12rem] font-black tracking-tighter uppercase leading-none opacity-20">
            BUILDERS DESIGNERS DEVELOPERS RESEARCHERS MAKERS THINKERS FOUNDERS COMPETITORS 
          </div>
        </div>
      </section>

      {/* 11. FOOTER CTA */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-black">
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-[#FFD60A] mb-12">
          READY TO<br/>COMPETE?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/create-profile">
            <button className="bg-white text-black px-12 py-5 text-sm font-bold tracking-widest hover:bg-[#FFD60A] transition-all w-full sm:w-auto">
              JOIN INVICTUS
            </button>
          </Link>
          <Link href="#events">
            <button className="bg-transparent border border-white text-white px-12 py-5 text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-all w-full sm:w-auto">
              EXPLORE EVENTS
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-16 border-t border-gray-900 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-xs font-bold tracking-widest text-gray-500 uppercase">
          <div>
            <span className="text-white text-lg block mb-2">INVICTUS</span>
            <span className="font-normal text-gray-600 lowercase tracking-normal">Learn, build, compete and grow together.</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz" target="_blank" rel="noreferrer" className="hover:text-white transition">WhatsApp</a>
            <a href="https://www.linkedin.com/company/your-page" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a>
            <a href="https://www.instagram.com/vtu.invictus" target="_blank" rel="noreferrer" className="hover:text-white transition">Instagram</a>
            <a href="https://www.youtube.com/channel/UC6be4wheRoTs2ghdgjznVzA" target="_blank" rel="noreferrer" className="hover:text-white transition">YouTube</a>
            <a href="mailto:yashkopardevtu@gmail.com" className="hover:text-white transition">Email</a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-900/50 text-[10px] font-bold tracking-widest text-gray-600 uppercase">
          <div>
            Designed and developed by <a href="https://yashkoparde.vercel.app" target="_blank" rel="noreferrer" className="text-white hover:text-[#FFD60A] transition-colors">Yash Koparde</a>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/yashkoparde" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://yashkoparde.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Portfolio</a>
            <a href="https://yk-projects.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Projects</a>
          </div>
        </div>
      </footer>
      
    </main>
  );
}

// Simple internal icon for trophy
function Trophy({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  )
}

function AnimatedText({ text }: { text: string }) {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span style={{ opacity: 0 }}>{text}</span>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      suppressHydrationWarning
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.03 }
        }
      }}
    >
      {text.split("").map((char, index) => {
        // pseudo random based on index
        const randX = (Math.sin(index * 12.3) * 300);
        const randY = (Math.cos(index * 45.6) * 300);
        const randRotate = (Math.sin(index * 78.9) * 180);
        return (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, x: randX, y: randY, rotate: randRotate, scale: 0 },
            visible: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100 } }
          }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal", opacity: 0 }}
        >
          {char}
        </motion.span>
      )})}
    </motion.div>
  )
}
