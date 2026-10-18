"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const opportunities = [
  { title: "OFFSITE PROJECT DEV", desc: "Private residency sprints to design and deploy production architectures.", color: "#00FFCC", path: "/offsite-project-dev", size: "large", tag: "EXPEDITIONS" },
  { title: "HACKATHONS", desc: "Fast-paced tournament engineering under 24–36 hour deadlines.", color: "#FFD60A", path: "/hackathons", size: "large", tag: "COMPETITIVE" },
  { title: "FREELANCE WORK", desc: "High-value production contracts and client systems.", color: "#D90429", path: "/freelance-work", size: "small", tag: "DEV GUILD" },
  { title: "IDEATHONS", desc: "First-principles venture modeling and pitch defenses.", color: "#FFFFFF", path: "/ideathons", size: "small", tag: "STRATEGY" },
  { title: "PROJECT CONTESTS", desc: "Capstone engineering audits and state-level exhibitions.", color: "#D90429", path: "/project-contests", size: "small", tag: "CAPSTONE" },
  { title: "RESEARCH", desc: "Empirical benchmarks, novel algorithms, and papers.", color: "#00E5FF", path: "/research", size: "small", tag: "ACADEMIA" },
  { title: "PAPER POSTER", desc: "High-density visual synthesis and symposium presentations.", color: "#A1A1AA", path: "/paper-poster", size: "small", tag: "GALLERY" }
];

export function OpportunitiesSection() {
  const largeCards = opportunities.filter(o => o.size === "large");
  const smallCards = opportunities.filter(o => o.size === "small");

  return (
    <section id="opportunities" className="py-20 sm:py-32 bg-black border-t border-zinc-900">
      <div className="px-6 md:px-16 mb-12 sm:mb-16 flex items-end justify-between max-w-7xl mx-auto">
        <div>
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-zinc-400 uppercase mb-2 block">
            // INVICTUS LABS & GUILD
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase text-white">Opportunities</h2>
        </div>
        <Link href="/events" className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-widest text-zinc-400 hover:text-white transition-colors">
          CALENDAR <ArrowRight size={15} />
        </Link>
      </div>
      
      <div className="px-6 md:px-16 max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
        {/* Highlighted Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {largeCards.map((item, i) => (
            <Link 
              href={item.path} 
              key={i} 
              className="h-[280px] sm:h-[380px] md:h-[460px] border border-white/[0.08] p-6 sm:p-8 md:p-10 flex flex-col justify-between group hover:border-white/30 transition-all bg-zinc-950/70 relative overflow-hidden block cursor-pointer rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 pointer-events-none" />
              
              <div className="relative z-20 flex justify-between items-start">
                <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">{item.tag}</span>
                <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/40 transition-all">
                  <ArrowRight className="transform group-hover:-rotate-45 transition-transform w-4 h-4" />
                </div>
              </div>
              
              <div className="relative z-20">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-3 transition-colors uppercase" style={{ color: item.color }}>
                  {item.title}
                </h3>
                <p className="text-zinc-400 font-normal text-sm sm:text-base max-w-md leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Rest of the Independent Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {smallCards.map((item, i) => (
            <Link 
              href={item.path} 
              key={i} 
              className="min-h-[180px] sm:h-[220px] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between group hover:border-white/20 transition-all bg-zinc-950/60 relative overflow-hidden block cursor-pointer rounded-xl"
            >
              <div className="relative z-20 flex justify-between items-start mb-4">
                <span className="text-[11px] font-mono text-zinc-600">0{i+3} // {item.tag}</span>
                <ArrowRight className="text-zinc-600 group-hover:text-white transform group-hover:-rotate-45 transition-all w-3.5 h-3.5" />
              </div>
              
              <div className="relative z-20">
                <h3 className="text-lg font-bold tracking-tight mb-2 transition-colors uppercase text-white group-hover:text-zinc-200">
                  {item.title}
                </h3>
                <p className="text-zinc-500 font-normal text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
