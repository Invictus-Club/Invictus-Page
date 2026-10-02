"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const opportunities = [
  { title: "OFFSITE PROJECT DEV", desc: "Go offsite, chill, and dev a project that solves a real problem.", color: "#00FFCC", path: "/offsite-project-dev", size: "large" },
  { title: "HACKATHONS", desc: "Build working prototypes in 24-48 hours.", color: "#FFD60A", path: "/hackathons", size: "large" },
  { title: "FREELANCE WORK", desc: "Find freelance opportunities and connect with clients.", color: "#D90429", path: "/freelance-work", size: "small" },
  { title: "IDEATHONS", desc: "Pitch innovative solutions to critical problems.", color: "#FFFFFF", path: "/ideathons", size: "small" },
  { title: "PROJECT CONTESTS", desc: "Showcase semester projects on a grand scale.", color: "#D90429", path: "/project-contests", size: "small" },
  { title: "RESEARCH", desc: "Present findings and publish papers.", color: "#555555", path: "/research", size: "small" },
  { title: "PAPER POSTER", desc: "Visual research presentations and networking.", color: "#AAAAAA", path: "/paper-poster", size: "small" }
];

export function OpportunitiesSection() {
  const largeCards = opportunities.filter(o => o.size === "large");
  const smallCards = opportunities.filter(o => o.size === "small");

  return (
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
          {largeCards.map((item, i) => (
            <Link href={item.path} key={i} className="h-[500px] border border-gray-800 p-10 flex flex-col justify-between group hover:border-gray-500 transition-colors bg-black relative overflow-hidden block cursor-pointer rounded-3xl hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-all duration-700" />
              
              <div className="relative z-20 flex justify-between items-start">
                <span className="text-sm font-mono text-gray-500">FEATURED</span>
                <ArrowRight className="text-gray-600 group-hover:text-white transform group-hover:-rotate-45 transition-all w-8 h-8" />
              </div>
              
              <div className="relative z-20">
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 transition-colors" style={{ color: item.color }}>
                  {item.title}
                </h3>
                <p className="text-gray-300 font-medium text-lg max-w-sm">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Rest of the Independent Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {smallCards.map((item, i) => (
            <Link href={item.path} key={i} className="h-[250px] border border-gray-800 p-6 flex flex-col justify-between group hover:border-gray-600 transition-colors bg-black relative overflow-hidden block cursor-pointer rounded-2xl">
              <div className="relative z-20 flex justify-between items-start">
                <span className="text-xs font-mono text-gray-600">0{i+3}</span>
                <ArrowRight className="text-gray-700 group-hover:text-white transform group-hover:-rotate-45 transition-all w-4 h-4" />
              </div>
              
              <div className="relative z-20">
                <h3 className="text-2xl font-black tracking-tighter mb-2 transition-colors" style={{ color: item.color }}>
                  {item.title}
                </h3>
                <p className="text-gray-500 font-medium text-xs leading-relaxed">
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
