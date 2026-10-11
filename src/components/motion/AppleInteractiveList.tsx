"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export interface ListItemData {
  title: string;
  category?: string;
  badge?: string;
  summary: string;
  details?: {
    label: string;
    value: string;
  }[];
  initialState?: string;
  overhaulState?: string;
  flawedState?: string;
  invictusState?: string;
}

interface AppleInteractiveListProps {
  badge: string;
  title: string;
  subtitle?: string;
  items: ListItemData[];
}

export function AppleInteractiveList({
  badge,
  title,
  subtitle,
  items,
}: AppleInteractiveListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const idx = Math.min(
        items.length - 1,
        Math.max(0, Math.floor(latest * items.length))
      );
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  return (
    <div ref={containerRef} className="relative h-[280vh] w-full border-b border-white/[0.08]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Ambient Coordinate Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <div className="w-full h-full bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center z-10">
          {/* Left Column: Fixed Headline, Step Index Tracker, and Quick-Jump Bar */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase block">
                {badge}
              </span>
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-none">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-zinc-400 max-w-md leading-relaxed pt-1">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Apple Vertical Step Scrubber */}
            <div className="space-y-3 pt-2">
              <div className="space-y-2 border-l border-white/[0.08] pl-4">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`transition-all duration-300 flex items-center gap-3 ${
                      idx === activeIndex
                        ? "text-white font-bold translate-x-1"
                        : "text-zinc-600 font-normal hover:text-zinc-400"
                    }`}
                  >
                    <span className="text-xs font-mono">
                      0{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm tracking-tight truncate max-w-[260px]">
                      {item.title}
                    </span>
                    {idx === activeIndex && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Horizontal Continuous Progress Line */}
            <div className="pt-2">
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                  className="h-full bg-white"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Scroll-Swapped Architecture Inspection Deck */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[440px] flex items-center">
            {items.map((item, idx) => {
              const start = idx / items.length;
              const end = (idx + 1) / items.length;

              return (
                <DeckItem
                  key={idx}
                  item={item}
                  progress={scrollYProgress}
                  range={[start, end]}
                  isFirst={idx === 0}
                  isLast={idx === items.length - 1}
                  total={items.length}
                  index={idx}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function DeckItem({
  item,
  progress,
  range,
  isFirst,
  isLast,
  total,
  index,
}: {
  item: ListItemData;
  progress: any;
  range: [number, number];
  isFirst: boolean;
  isLast: boolean;
  total: number;
  index: number;
}) {
  const [start, end] = range;

  let opacityInput: number[];
  let opacityOutput: number[];
  let yInput: number[];
  let yOutput: number[];

  if (isFirst) {
    opacityInput = [0, end - 0.05, end];
    opacityOutput = [1, 1, 0];
    yInput = [0, end - 0.05, end];
    yOutput = [0, 0, -20];
  } else if (isLast) {
    opacityInput = [start, start + 0.05, 1.0];
    opacityOutput = [0, 1, 1];
    yInput = [start, start + 0.05, 1.0];
    yOutput = [20, 0, 0];
  } else {
    opacityInput = [start, start + 0.05, end - 0.05, end];
    opacityOutput = [0, 1, 1, 0];
    yInput = [start, start + 0.05, end - 0.05, end];
    yOutput = [20, 0, 0, -20];
  }

  const opacity = useTransform(progress, opacityInput, opacityOutput);
  const y = useTransform(progress, yInput, yOutput);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center border border-white/[0.12] bg-zinc-950/90 backdrop-blur-md p-6 sm:p-10 space-y-6 pointer-events-none"
    >
      {/* Top Header Tag & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            0{index + 1}
          </span>
          {item.category && (
            <span className="text-[11px] font-mono uppercase text-zinc-400 px-2.5 py-0.5 rounded border border-white/10 bg-white/[0.03]">
              {item.category}
            </span>
          )}
        </div>

        {item.badge && (
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-white px-3 py-1 rounded-full border border-white/20 bg-white/5">
            {item.badge}
          </span>
        )}
      </div>

      {/* Main Title & Summary */}
      <div className="space-y-2">
        <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
          {item.title}
        </h4>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          {item.summary}
        </p>
      </div>

      {/* Before / After or Flawed / Invictus comparison view */}
      {(item.initialState || item.flawedState) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/[0.06]">
          <div className="space-y-1 border-l border-white/10 pl-3.5 py-1">
            <span className="text-[11px] font-mono uppercase text-zinc-500 block">
              {item.flawedState ? "Conventional Flaw:" : "Initial State:"}
            </span>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {item.flawedState || item.initialState}
            </p>
          </div>
          <div className="space-y-1 border-l border-white/40 pl-3.5 py-1">
            <span className="text-[11px] font-mono uppercase text-white font-bold block">
              Invictus Architecture:
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
              {item.invictusState || item.overhaulState}
            </p>
          </div>
        </div>
      )}

      {/* Technical Specifications Grid */}
      {item.details && item.details.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-white/[0.06]">
          {item.details.map((detail, dIdx) => (
            <div key={dIdx} className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                {detail.label}
              </span>
              <span className="text-xs sm:text-sm font-mono text-white block truncate">
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
