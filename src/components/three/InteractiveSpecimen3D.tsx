"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Rotate3D, Sparkles } from "lucide-react";

interface InteractiveSpecimen3DProps {
  type: "expedition" | "tournament" | "bounty" | "pitch" | "audit" | "neural" | "specimen";
  accentColor: string;
  label: string;
}

export function InteractiveSpecimen3D({ type, accentColor, label }: InteractiveSpecimen3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isWireframe, setIsWireframe] = useState(false);
  const [telemetry, setTelemetry] = useState({ rotX: 0, rotY: 0 });

  const isWireframeRef = useRef(isWireframe);
  isWireframeRef.current = isWireframe;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();

    const threeColor = new THREE.Color(accentColor);

    // Create 3D geometry depending on type
    const materials: (THREE.MeshBasicMaterial | THREE.LineBasicMaterial)[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    const createMesh = (geo: THREE.BufferGeometry, color: THREE.Color, wire: boolean, opacity = 1) => {
      geometries.push(geo);
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: wire,
        transparent: opacity < 1,
        opacity,
      });
      materials.push(mat);
      return new THREE.Mesh(geo, mat);
    };

    if (type === "expedition") {
      // 3D Compass & Starlink Dish
      const dishGeo = new THREE.CylinderGeometry(1.6, 0.4, 0.5, 16);
      dishGeo.rotateX(Math.PI / 4);
      group.add(createMesh(dishGeo, threeColor, true, 0.8));

      const spireGeo = new THREE.OctahedronGeometry(0.5, 0);
      group.add(createMesh(spireGeo, new THREE.Color(0xffffff), true, 0.9));

      const ringGeo = new THREE.TorusGeometry(2.0, 0.02, 16, 48);
      group.add(createMesh(ringGeo, threeColor, true, 0.4));
    } else if (type === "tournament") {
      // 3D Trophy Shield & 24h Orbit
      const shieldGeo = new THREE.IcosahedronGeometry(1.4, 1);
      group.add(createMesh(shieldGeo, threeColor, true, 0.85));

      const innerOcta = new THREE.OctahedronGeometry(0.7, 0);
      group.add(createMesh(innerOcta, new THREE.Color(0xffffff), false, 0.8));

      const haloGeo = new THREE.TorusGeometry(1.9, 0.03, 16, 64);
      group.add(createMesh(haloGeo, threeColor, true, 0.5));
    } else if (type === "bounty") {
      // 3D Escrow Vault Medallion & Rings
      const coinGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.25, 24);
      coinGeo.rotateX(Math.PI / 3);
      group.add(createMesh(coinGeo, threeColor, true, 0.9));

      const ringGeo = new THREE.TorusGeometry(1.9, 0.02, 16, 48);
      group.add(createMesh(ringGeo, new THREE.Color(0xffffff), true, 0.5));
    } else if (type === "pitch") {
      // 3D Venture Moat Prism
      const prismGeo = new THREE.ConeGeometry(1.3, 2.0, 6);
      group.add(createMesh(prismGeo, threeColor, true, 0.85));

      const baseGeo = new THREE.TorusGeometry(1.7, 0.02, 16, 32);
      group.add(createMesh(baseGeo, new THREE.Color(0xffffff), true, 0.4));
    } else if (type === "audit") {
      // 3D Capstone Dual-Turbine Core
      const hubGeo = new THREE.TorusGeometry(1.3, 0.25, 16, 32);
      group.add(createMesh(hubGeo, threeColor, true, 0.85));

      const coreBox = new THREE.BoxGeometry(0.8, 0.8, 1.6);
      group.add(createMesh(coreBox, new THREE.Color(0xffffff), true, 0.6));
    } else if (type === "neural") {
      // 3D Quantized Tensor Knot
      const knotGeo = new THREE.TorusKnotGeometry(0.9, 0.22, 48, 12, 2, 3);
      group.add(createMesh(knotGeo, threeColor, true, 0.85));
    } else {
      // 3D Exhibition Monolith Stand
      const standGeo = new THREE.BoxGeometry(1.2, 1.8, 0.15);
      group.add(createMesh(standGeo, threeColor, true, 0.8));

      const frameRing = new THREE.TorusGeometry(1.6, 0.02, 16, 48);
      group.add(createMesh(frameRing, new THREE.Color(0xffffff), true, 0.4));
    }

    scene.add(group);

    // Interactive Drag to Rotate
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velX = 0;
    let velY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      velX = deltaY * 0.01;
      velY = deltaX * 0.01;

      group.rotation.x += velX;
      group.rotation.y += velY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.style.touchAction = "none";
    domElement.style.cursor = "grab";

    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 280;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let frameCounter = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        // Idle autorotate with gentle damping
        velX *= 0.92;
        velY *= 0.92;
        group.rotation.x += velX + 0.003;
        group.rotation.y += velY + 0.008;
      }

      // Update materials wireframe state dynamically
      materials.forEach((mat) => {
        if ("wireframe" in mat) {
          mat.wireframe = isWireframeRef.current ? true : mat.wireframe;
        }
      });

      frameCounter++;
      if (frameCounter % 15 === 0) {
        const degX = Math.round(((group.rotation.x * 180) / Math.PI) % 360);
        const degY = Math.round(((group.rotation.y * 180) / Math.PI) % 360);
        setTelemetry({ rotX: degX, rotY: degY });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (domElement && container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [type, accentColor]);

  return (
    <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl bg-black/40 border border-white/10 overflow-hidden flex flex-col justify-between p-4 group select-none">
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
          <Rotate3D size={13} style={{ color: accentColor }} />
          <span className="font-bold text-white uppercase">{label}</span>
        </div>

        <button
          onClick={() => setIsWireframe((prev) => !prev)}
          className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 hover:text-white transition-all flex items-center gap-1"
          title="Toggle wireframe mode"
        >
          <Sparkles size={11} />
          <span>{isWireframe ? "WIREFRAME: ON" : "STYLE: DUAL"}</span>
        </button>
      </div>

      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Bottom telemetry badge */}
      <div className="flex items-center justify-between z-10 text-[10px] font-mono text-zinc-500 pointer-events-none">
        <span>DRAG TO ROTATE 360°</span>
        <span className="text-zinc-400">
          X: {telemetry.rotX}° | Y: {telemetry.rotY}°
        </span>
      </div>
    </div>
  );
}
