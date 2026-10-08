"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface OpportunityFaqProps {
  items: FaqItem[];
  accentColor: string;
  title?: string;
}

export function OpportunityFaq({ items, accentColor, title = "Frequently Asked Questions" }: OpportunityFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto border-t border-zinc-900">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span 
          className="text-xs font-mono font-bold uppercase tracking-widest block mb-2"
          style={{ color: accentColor }}
        >
          // DIRECT INTEL & PROTOCOLS
        </span>
        <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
          {title}
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-2">
          Everything you need to know about eligibility, attendance, logistics, and deliverables.
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-2xl bg-zinc-950/80 border border-zinc-800/80 overflow-hidden transition-all hover:border-zinc-700"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={16} className="shrink-0 text-zinc-500" style={isOpen ? { color: accentColor } : {}} />
                  <span className="font-bold text-sm sm:text-base text-white tracking-tight">
                    {item.question}
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 text-zinc-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-white bg-zinc-800" : ""
                  }`}
                >
                  <ChevronDown size={14} />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-900/80">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
