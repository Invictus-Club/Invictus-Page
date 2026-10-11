"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollScrubTextProps {
  paragraphs: string[];
  className?: string;
}

export function ScrollScrubText({ paragraphs, className = "" }: ScrollScrubTextProps) {
  return (
    <div className={`space-y-16 sm:space-y-24 ${className}`}>
      {paragraphs.map((paragraph, idx) => (
        <AppleWordScrubParagraph key={idx} text={paragraph} index={idx} />
      ))}
    </div>
  );
}

function AppleWordScrubParagraph({ text, index }: { text: string; index: number }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.35"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.25] flex flex-wrap gap-x-[0.28em] gap-y-1.5"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, (i + 1.2) / words.length);

        return (
          <AppleWord
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}

function AppleWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block transition-colors select-none"
    >
      {word}
    </motion.span>
  );
}

export function AppleSpecItem({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-white/[0.08] hover:border-white/[0.2] transition-colors pt-6 pb-8 space-y-2 group"
    >
      <div className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white font-mono group-hover:text-zinc-100 transition-colors">
        {value}
      </div>
      <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
        {label}
      </div>
      <p className="text-sm text-zinc-500 max-w-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
        {detail}
      </p>
    </motion.div>
  );
}
