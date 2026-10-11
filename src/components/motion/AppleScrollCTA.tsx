"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface AppleScrollCTAProps {
  badge: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryText: string;
  isExternal?: boolean;
}

export function AppleScrollCTA({
  badge,
  title,
  description,
  primaryHref,
  primaryText,
  isExternal = false,
}: AppleScrollCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.6"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1.0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1.0]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <section ref={containerRef} className="py-40 sm:py-56 px-6 text-center relative overflow-hidden">
      {/* Background Subtle Radial Dot Matrix */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <motion.div
        style={{ scale, opacity, y }}
        className="max-w-3xl mx-auto space-y-8 relative z-10"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
          {badge}
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-[-0.03em] uppercase text-white leading-[0.92]">
          {title}
        </h2>

        <p className="text-zinc-400 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          {isExternal ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span>{primaryText}</span>
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span>{primaryText}</span>
              <ArrowUpRight size={14} />
            </Link>
          )}

          <Link
            href="/#opportunities"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.12] text-zinc-300 font-mono font-bold text-xs uppercase tracking-widest hover:border-white hover:text-white hover:scale-105 active:scale-95 transition-all bg-black/40 backdrop-blur-md"
          >
            All Opportunities
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
