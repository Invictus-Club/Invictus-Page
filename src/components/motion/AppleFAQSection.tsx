"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export interface FAQItemData {
  question: string;
  answer: string;
}

interface AppleFAQSectionProps {
  badge: string;
  title: string;
  items: FAQItemData[];
}

export function AppleFAQSection({ badge, title, items }: AppleFAQSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-32 sm:py-44 px-6 sm:px-12 md:px-24 max-w-4xl mx-auto border-b border-white/[0.08]">
      <div className="space-y-4 mb-20">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 block">
          {badge}
        </span>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
          {title}
        </h2>
      </div>

      <div className="space-y-6">
        {items.map((item, idx) => (
          <ScrollFAQItem key={idx} item={item} index={idx} total={items.length} />
        ))}
      </div>
    </section>
  );
}

function ScrollFAQItem({
  item,
  index,
  total,
}: {
  item: FAQItemData;
  index: number;
  total: number;
}) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const rowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 0.95", "start 0.65"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.div
      ref={rowRef}
      style={{ opacity, y }}
      className="border-t border-white/[0.08] hover:border-white/[0.2] transition-colors pt-6 pb-2"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-start justify-between gap-6 group py-2"
      >
        <div className="space-y-2 flex-1">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
            0{index + 1} / {total < 10 ? `0${total}` : total}
          </span>
          <h3 className="text-lg sm:text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors tracking-tight">
            {item.question}
          </h3>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="mt-1 p-2 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 group-hover:text-white group-hover:border-white/20 transition-colors flex-shrink-0"
        >
          <Plus size={16} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed pt-3 pb-6 max-w-2xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
