"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

interface StepAnnotation {
  number: string;
  title: string;
  description: string;
}

interface ApplePinned3DSectionProps {
  geometryType: "offsite" | "hackathon" | "freelance" | "ideathon" | "project" | "research" | "poster";
  steps: StepAnnotation[];
  title: string;
  badge: string;
}

export function ApplePinned3DSection({
  geometryType,
  steps,
  title,
  badge,
}: ApplePinned3DSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const idx = Math.min(
        steps.length - 1,
        Math.max(0, Math.floor(latest * steps.length))
      );
      setActiveStepIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, steps.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 400;
    const height = canvas.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();

    // Apple Monochrome Precision Wireframe + Dark Core
    let mainGeo: THREE.BufferGeometry;
    let coreGeo: THREE.BufferGeometry;

    if (geometryType === "offsite") {
      mainGeo = new THREE.TorusKnotGeometry(1.3, 0.28, 120, 16);
      coreGeo = new THREE.TorusKnotGeometry(1.22, 0.22, 80, 12);
    } else if (geometryType === "hackathon") {
      mainGeo = new THREE.IcosahedronGeometry(1.65, 1);
      coreGeo = new THREE.IcosahedronGeometry(1.4, 0);
    } else if (geometryType === "freelance") {
      mainGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.5, 32);
      coreGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.45, 24);
    } else if (geometryType === "ideathon") {
      mainGeo = new THREE.OctahedronGeometry(1.7, 0);
      coreGeo = new THREE.OctahedronGeometry(1.4, 0);
    } else if (geometryType === "project") {
      mainGeo = new THREE.TorusGeometry(1.5, 0.35, 16, 48);
      coreGeo = new THREE.TorusGeometry(1.35, 0.26, 12, 36);
    } else if (geometryType === "research") {
      mainGeo = new THREE.DodecahedronGeometry(1.6, 0);
      coreGeo = new THREE.DodecahedronGeometry(1.3, 0);
    } else {
      mainGeo = new THREE.BoxGeometry(1.4, 2.0, 0.25);
      coreGeo = new THREE.BoxGeometry(1.2, 1.8, 0.18);
    }

    // Outer precision white wireframe
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const mainMesh = new THREE.Mesh(mainGeo, wireMat);
    group.add(mainMesh);

    // Inner subtle dark graphite core to give true 3D solid depth
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x09090b,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Orbiting reference alignment rings
    const ringGeo = new THREE.TorusGeometry(2.3, 0.012, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x71717a,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    scene.add(group);

    let animId: number;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let targetScale = 1;
    let mouseOffsetX = 0;
    let mouseOffsetY = 0;

    const unsubscribeScroll = scrollYProgress.on("change", (latest) => {
      targetRotationY = latest * Math.PI * 3;
      targetRotationX = Math.sin(latest * Math.PI * 2) * 0.75;
      targetScale = 1 + Math.sin(latest * Math.PI) * 0.12;
    });

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseOffsetX = x * 0.25;
      mouseOffsetY = y * 0.25;
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    const render = () => {
      animId = requestAnimationFrame(render);
      group.rotation.y += (targetRotationY + mouseOffsetX - group.rotation.y) * 0.08;
      group.rotation.x += (targetRotationX + mouseOffsetY - group.rotation.x) * 0.08;
      const curScale = group.scale.x;
      const nextScale = curScale + (targetScale - curScale) * 0.08;
      group.scale.set(nextScale, nextScale, nextScale);

      renderer.render(scene, camera);
    };
    render();

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth || 400;
      const h = canvas.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      unsubscribeScroll();
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      mainGeo.dispose();
      coreGeo.dispose();
      wireMat.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [geometryType, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[260vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Subtle Background Coordinate Dot Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center z-10">
          {/* Left Column: Fixed Headline, Phase Scrubber Bar, and Dynamic Step Annotation */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase block">
                {badge}
              </span>
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-none">
                {title}
              </h3>
            </div>

            {/* Apple-Grade Horizontal Phase Scrubber Track */}
            <div className="flex items-center gap-3 pt-2">
              {steps.map((s, idx) => (
                <div key={idx} className="flex-1 space-y-1.5">
                  <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        idx <= activeStepIndex ? "bg-white" : "bg-transparent"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-mono tracking-widest block transition-colors ${
                      idx === activeStepIndex ? "text-white font-bold" : "text-zinc-600"
                    }`}
                  >
                    PHASE {s.number}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Annotations with Continuous Scroll-Progress Crossfade */}
            <div className="relative min-h-[170px] sm:min-h-[190px]">
              {steps.map((step, idx) => {
                const stepStart = idx / steps.length;
                const stepEnd = (idx + 1) / steps.length;

                return (
                  <StepBlock
                    key={idx}
                    step={step}
                    progress={scrollYProgress}
                    range={[stepStart, stepEnd]}
                    isFirst={idx === 0}
                    isLast={idx === steps.length - 1}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Column: 3D Canvas Rotating Mathematically with Scroll Progress */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] relative">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepBlock({
  step,
  progress,
  range,
  isFirst,
  isLast,
}: {
  step: StepAnnotation;
  progress: any;
  range: [number, number];
  isFirst: boolean;
  isLast: boolean;
}) {
  const [start, end] = range;

  // Compute strictly continuous opacity ranges to ensure zero flicker:
  // - First step starts at 1.0 from progress 0 to (end - 0.05), then fades out to 0 at end
  // - Last step fades in from start to (start + 0.05), then stays at 1.0 until progress 1.0
  // - Intermediate steps fade in at start, stay 1.0, fade out at end
  let opacityInput: number[];
  let opacityOutput: number[];
  let yInput: number[];
  let yOutput: number[];

  if (isFirst) {
    opacityInput = [0, end - 0.05, end];
    opacityOutput = [1, 1, 0];
    yInput = [0, end - 0.05, end];
    yOutput = [0, 0, -16];
  } else if (isLast) {
    opacityInput = [start, start + 0.05, 1.0];
    opacityOutput = [0, 1, 1];
    yInput = [start, start + 0.05, 1.0];
    yOutput = [16, 0, 0];
  } else {
    opacityInput = [start, start + 0.05, end - 0.05, end];
    opacityOutput = [0, 1, 1, 0];
    yInput = [start, start + 0.05, end - 0.05, end];
    yOutput = [16, 0, 0, -16];
  }

  const opacity = useTransform(progress, opacityInput, opacityOutput);
  const y = useTransform(progress, yInput, yOutput);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute top-0 left-0 right-0 space-y-3 pointer-events-none"
    >
      <div className="text-xs font-mono font-bold text-white tracking-[0.2em]">
        PHASE {step.number}
      </div>
      <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
        {step.title}
      </h4>
      <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg">
        {step.description}
      </p>
    </motion.div>
  );
}
