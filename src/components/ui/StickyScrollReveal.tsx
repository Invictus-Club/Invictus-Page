"use client";

import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyScrollContent {
  title: string;
  badge: string;
  description: string;
  quote?: string;
  bullets?: string[];
  content?: React.ReactNode;
}

export const StickyScrollReveal = ({
  content,
  contentClassName,
  accentColor = "#00FFCC",
}: {
  content: StickyScrollContent[];
  contentClassName?: string;
  accentColor?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div
      ref={ref}
      className="relative flex justify-center space-x-10 rounded-[2.5rem] p-4 sm:p-10"
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-xs font-mono font-bold uppercase tracking-widest block mb-2"
                style={{ color: accentColor }}
              >
                {item.badge}
              </motion.span>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight"
              >
                {item.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-sm sm:text-base text-zinc-300 max-w-sm mt-6 leading-relaxed"
              >
                {item.description}
              </motion.p>
              {item.quote && (
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.25,
                  }}
                  className="mt-4 p-4 rounded-2xl bg-black/50 border border-white/5 text-xs sm:text-sm text-zinc-400 italic"
                >
                  {item.quote}
                </motion.blockquote>
              )}
              {item.bullets && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="mt-6 space-y-2"
                >
                  {item.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span>{b}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "hidden lg:block h-96 w-96 rounded-[2rem] sticky top-28 overflow-hidden backdrop-blur-2xl bg-zinc-950/70 border border-white/10 shadow-2xl",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </div>
  );
};
