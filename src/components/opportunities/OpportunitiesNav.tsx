"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Car, 
  Trophy, 
  DollarSign, 
  Lightbulb, 
  Cpu, 
  FileText, 
  Presentation,
  ArrowUpRight
} from "lucide-react";

export const OPPORTUNITIES_LIST = [
  {
    id: "offsite-project-dev",
    path: "/offsite-project-dev",
    title: "Offsite Dev",
    fullTitle: "Offsite Project Dev",
    category: "EXPEDITIONS",
    color: "#00FFCC",
    icon: Car,
    tag: "Nov 2026",
    summary: "Midnight convoy escape to build production software in private jungle villas."
  },
  {
    id: "hackathons",
    path: "/hackathons",
    title: "Hackathons",
    fullTitle: "Hackathons & Sprints",
    category: "COMPETITIVE",
    color: "#FFD60A",
    icon: Trophy,
    tag: "National",
    summary: "24–36 hour tournament engineering, collaborative squads, and podium hardware."
  },
  {
    id: "freelance-work",
    path: "/freelance-work",
    title: "Freelance",
    fullTitle: "Freelance Work",
    category: "DEV GUILD",
    color: "#D90429",
    icon: DollarSign,
    tag: "Escrow Verified",
    summary: "$1,500–$4,000 production contracts with international startups and founders."
  },
  {
    id: "ideathons",
    path: "/ideathons",
    title: "Ideathons",
    fullTitle: "Ideathons & Pitches",
    category: "VENTURE",
    color: "#F59E0B",
    icon: Lightbulb,
    tag: "Pitch Defense",
    summary: "First-principles business modeling, jury defense, and angel seed grants."
  },
  {
    id: "project-contests",
    path: "/project-contests",
    title: "Project Contests",
    fullTitle: "Project Contests",
    category: "CAPSTONE",
    color: "#FF0055",
    icon: Cpu,
    tag: "Exhibitions",
    summary: "Engine overhaul for final-year engineering projects and state exhibitions."
  },
  {
    id: "research",
    path: "/research",
    title: "Research",
    fullTitle: "Academic Research",
    category: "PUBLICATIONS",
    color: "#00E5FF",
    icon: FileText,
    tag: "IEEE / ACM",
    summary: "Empirical benchmarking, mathematical proofs, and faculty-mentored papers."
  },
  {
    id: "paper-poster",
    path: "/paper-poster",
    title: "Paper Poster",
    fullTitle: "Poster Presentations",
    category: "EXHIBITIONS",
    color: "#E4E4E7",
    icon: Presentation,
    tag: "Visual Synthesis",
    summary: "Architectural visual synthesis and high-contrast symposium exhibition posters."
  }
];

export function OpportunitiesNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-black/85 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Back Link & Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/#opportunities"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:text-white text-xs font-mono font-medium transition-all"
            title="Return to main opportunities grid"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline font-bold">OPPORTUNITIES</span>
          </Link>
          <div className="h-4 w-[1px] bg-zinc-800 hidden sm:block" />
          <Link
            href="/"
            className="text-xs font-mono font-bold tracking-widest text-zinc-400 hover:text-white transition-colors uppercase hidden md:inline"
          >
            INVICTUS // GUILD
          </Link>
        </div>

        {/* Horizontal Navigation Pills (Scrollable on small viewports) */}
        <nav 
          aria-label="Opportunities Subpage Navigation"
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1 max-w-full text-xs font-mono"
        >
          {OPPORTUNITIES_LIST.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.path}
                className={`relative px-3 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 select-none ${
                  isActive
                    ? "text-black font-bold shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                }`}
                style={isActive ? { backgroundColor: item.color } : {}}
              >
                <Icon size={12} className={isActive ? "text-black" : "text-zinc-400"} />
                <span>{item.title}</span>
                {isActive && (
                  <motion.span 
                    layoutId="active-nav-glow" 
                    className="absolute -bottom-1 left-2 right-2 h-[2px] rounded-full blur-[1px]"
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Direct Action Link */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-bold font-mono tracking-wider hover:bg-zinc-200 transition-all shadow-sm"
          >
            <span>JOIN</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </header>
  );
}
