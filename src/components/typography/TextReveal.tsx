"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  by?: "word" | "char";
}

export function TextReveal({
  children,
  className,
  delay = 0,
  by = "word",
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const tokens = by === "word" ? children.split(" ") : children.split("");

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {tokens.map((token, i) => (
        <span key={i} className="inline-block overflow-hidden align-top">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
            animate={
              isInView
                ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                : { y: "110%", opacity: 0, filter: "blur(6px)" }
            }
            transition={{
              duration: 0.65,
              delay: delay + i * (by === "word" ? 0.04 : 0.015),
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {token}
            {by === "word" && i < tokens.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
