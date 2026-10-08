"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageSquare, ArrowUpRight } from "lucide-react";
import { OPPORTUNITIES_LIST } from "./OpportunitiesNav";

interface OpportunityFooterNavProps {
  currentId: string;
  accentColor: string;
}

export function OpportunityFooterNav({ currentId, accentColor }: OpportunityFooterNavProps) {
  const currentIndex = OPPORTUNITIES_LIST.findIndex((o) => o.id === currentId);
  const prevIndex = (currentIndex - 1 + OPPORTUNITIES_LIST.length) % OPPORTUNITIES_LIST.length;
  const nextIndex = (currentIndex + 1) % OPPORTUNITIES_LIST.length;

  const prevItem = OPPORTUNITIES_LIST[prevIndex];
  const nextItem = OPPORTUNITIES_LIST[nextIndex];

  return (
    <footer className="border-t border-zinc-900 bg-[#050505] text-white py-20 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Next / Previous Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href={prevItem.path}
            className="group p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                <ArrowLeft size={16} />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                  PREVIOUS OPPORTUNITY
                </span>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-200">
                  {prevItem.fullTitle}
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400">
              0{prevIndex + 1}/07
            </span>
          </Link>

          <Link
            href={nextItem.path}
            className="group p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                NEXT OPPORTUNITY
              </span>
              <span className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-200">
                {nextItem.fullTitle}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400">
                0{nextIndex + 1}/07
              </span>
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-black font-bold transition-transform group-hover:scale-105"
                style={{ backgroundColor: nextItem.color }}
              >
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </div>

        {/* Global Opportunity Index Ribbon */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800/90 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-black uppercase tracking-tight">
              Explore All 7 Guild Opportunities
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400">
              Invictus bridges academic theory and real industry production. Pick your arena.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/#opportunities"
              className="px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-xs font-mono font-bold text-zinc-300 hover:text-white transition-all"
            >
              OPPORTUNITIES DIRECTORY
            </Link>
            <a
              href="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold text-black transition-all hover:brightness-110 shadow-lg"
              style={{ backgroundColor: accentColor }}
            >
              <MessageSquare size={14} />
              <span>COMMUNITY WHATSAPP</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Copyright & Meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 pt-4 border-t border-zinc-900">
          <span>INVICTUS TECH GUILD // VTU EXCELLENCE LABS</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <Link href="/events" className="hover:text-zinc-300 transition-colors">Events</Link>
            <Link href="/merch" className="hover:text-[#FFD60A] transition-colors font-bold">Merch</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
