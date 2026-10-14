"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollSequenceCanvasProps {
  framesCount?: number;
  framePrefix?: string;
  frameExtension?: string;
  padLength?: number;
  scrollProgress: number; // 0 to 1
}

export function ScrollSequenceCanvas({
  framesCount = 342,
  framePrefix = "/merch/sequence/all/frame_",
  frameExtension = ".jpg",
  padLength = 4,
  scrollProgress,
}: ScrollSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  targetProgressRef.current = scrollProgress;

  // Progressive frame preloader
  useEffect(() => {
    if (framesCount <= 0) return;

    const frames: (HTMLImageElement | null)[] = new Array(framesCount).fill(null);
    imagesRef.current = frames;

    let initialBatchLoaded = 0;
    const initialBatchSize = Math.min(framesCount, 25);

    // 1. Immediately load the initial entrance batch
    for (let i = 1; i <= initialBatchSize; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(padLength, "0");
      img.src = `${framePrefix}${paddedIndex}${frameExtension}`;
      img.onload = () => {
        frames[i - 1] = img;
        initialBatchLoaded++;
        if (initialBatchLoaded >= Math.min(10, initialBatchSize)) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        // Fallback or ignore missing frame
      };
    }

    // 2. Stream the rest of the sequence frames in background chunks
    let nextIndex = initialBatchSize + 1;
    const loadNextChunk = () => {
      const chunkEnd = Math.min(framesCount, nextIndex + 15);
      for (let i = nextIndex; i <= chunkEnd; i++) {
        const img = new Image();
        const paddedIndex = String(i).padStart(padLength, "0");
        img.src = `${framePrefix}${paddedIndex}${frameExtension}`;
        img.onload = () => {
          frames[i - 1] = img;
        };
      }
      nextIndex = chunkEnd + 1;
      if (nextIndex <= framesCount) {
        if ("requestIdleCallback" in window) {
          (window as any).requestIdleCallback(loadNextChunk, { timeout: 200 });
        } else {
          setTimeout(loadNextChunk, 30);
        }
      }
    };

    setTimeout(loadNextChunk, 50);

    return () => {
      imagesRef.current = [];
    };
  }, [framesCount, framePrefix, frameExtension, padLength]);

  // Window resize & DPR scaling
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Silky smooth 60FPS animation loop with lerping
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastDrawnIndex = -1;

    const animate = () => {
      // Lerp progress for smooth cinematic scrub
      currentProgressRef.current +=
        (targetProgressRef.current - currentProgressRef.current) * 0.16;

      const width = canvas.width;
      const height = canvas.height;

      // When approaching the checkout section (progress >= 0.84), smoothly fade canvas to 0
      // so the REGISTER & ORDER NOW terminal has an entirely pure black background for ultimate readability.
      const progress = Math.min(1, Math.max(0, currentProgressRef.current));
      const fadeStart = 0.84;
      if (progress > fadeStart) {
        const opacity = Math.max(0, 1 - (progress - fadeStart) / 0.08);
        canvas.style.opacity = String(opacity);
      } else {
        canvas.style.opacity = "1";
      }

      const frames = imagesRef.current;
      if (frames && frames.length > 0) {
        const total = frames.length;
        const targetIndex = Math.min(
          total - 1,
          Math.max(0, Math.round(progress * (total - 1)))
        );

        // Find exact or nearest loaded frame
        let img = frames[targetIndex];
        if (!img || !img.complete || img.naturalWidth === 0) {
          // Search backwards
          for (let b = targetIndex - 1; b >= 0; b--) {
            if (frames[b] && frames[b]!.complete && frames[b]!.naturalWidth > 0) {
              img = frames[b];
              break;
            }
          }
          // If still not found, search forwards
          if (!img) {
            for (let f = targetIndex + 1; f < total; f++) {
              if (frames[f] && frames[f]!.complete && frames[f]!.naturalWidth > 0) {
                img = frames[f];
                break;
              }
            }
          }
        }

        if (img && img.complete && img.naturalWidth > 0) {
          ctx.clearRect(0, 0, width, height);
          ctx.fillStyle = "#000000";
          ctx.fillRect(0, 0, width, height);

          drawCover(ctx, img, width, height);
          lastDrawnIndex = targetIndex;
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [imagesLoaded, framesCount]);

  // Full-bleed aspect cover
  const drawCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasW: number,
    canvasH: number
  ) => {
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const w = imgW * scale;
    const h = imgH * scale;
    const x = (canvasW - w) / 2;
    const y = (canvasH - h) / 2;

    ctx.drawImage(img, x, y, w, h);
  };

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover filter contrast-105 brightness-95"
      />
      {/* Subtle vignette gradient to keep text razor sharp */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60 pointer-events-none" />
    </div>
  );
}
