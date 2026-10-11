"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface SpecItemData {
  value: string;
  label: string;
  detail: string;
}

interface AppleScrollSpecsProps {
  badge: string;
  title: string;
  specs: SpecItemData[];
}

export function AppleScrollSpecs({ badge, title, specs }: AppleScrollSpecsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.2"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 0.4], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 sm:py-44 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto border-b border-white/[0.08] relative">
      {/* Scroll-Drawn Top Progress Hairline */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.06] overflow-hidden">
        <motion.div style={{ width: lineWidth }} className="h-full bg-white/40" />
      </div>

      <div className="space-y-4 mb-20">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 block">
          {badge}
        </span>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {specs.map((spec, idx) => (
          <ScrollSpecCard key={idx} spec={spec} index={idx} />
        ))}
      </div>
    </section>
  );
}

function ScrollSpecCard({ spec, index }: { spec: SpecItemData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.95", "start 0.6"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y }}
      className="border-t border-white/[0.08] hover:border-white/[0.25] transition-colors pt-6 pb-6 space-y-3 group"
    >

      <div className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white font-mono group-hover:text-zinc-100 transition-colors">
        {spec.value}
      </div>

      <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 font-semibold">
        {spec.label}
      </div>

      <p className="text-sm text-zinc-500 max-w-md leading-relaxed group-hover:text-zinc-400 transition-colors">
        {spec.detail}
      </p>
    </motion.div>
  );
}
