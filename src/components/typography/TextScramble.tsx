"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  children: string;
  className?: string;
  scrambleOnMount?: boolean;
  speed?: number;
}

const GLYPHS = "ABCDEF0123456789_<>#$!%&*?/";

export function TextScramble({
  children,
  className,
  scrambleOnMount = true,
  speed = 30,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);
  const animatingRef = useRef(false);

  const startScramble = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    let iteration = 0;
    const target = children;

    const interval = setInterval(() => {
      setDisplayText(() =>
        target
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return target[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= target.length) {
        clearInterval(interval);
        animatingRef.current = false;
        setDisplayText(target);
      }

      iteration += 1 / 2;
    }, speed);
  };

  useEffect(() => {
    if (scrambleOnMount) {
      startScramble();
    }
  }, [children]);

  return (
    <span
      className={cn("inline-block font-mono cursor-default select-none", className)}
      onMouseEnter={() => {
        setIsHovered(true);
        startScramble();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
}
