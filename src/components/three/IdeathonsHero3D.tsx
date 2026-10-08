"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function IdeathonsHero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.04);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 8.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();

    // 1. Central Venture Core: Dual Intersecting Octahedrons (Pure Titanium)
    const octGeo1 = new THREE.OctahedronGeometry(1.6, 0);
    const octMat1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const octMesh1 = new THREE.Mesh(octGeo1, octMat1);
    masterGroup.add(octMesh1);

    const octGeo2 = new THREE.OctahedronGeometry(1.1, 0);
    const octMat2 = new THREE.MeshBasicMaterial({
      color: 0x71717a,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const octMesh2 = new THREE.Mesh(octGeo2, octMat2);
    masterGroup.add(octMesh2);

    // Inner Solid Dark Node
    const coreSolidGeo = new THREE.OctahedronGeometry(0.7, 0);
    const coreSolidMat = new THREE.MeshBasicMaterial({ color: 0x18181b });
    const coreSolid = new THREE.Mesh(coreSolidGeo, coreSolidMat);
    masterGroup.add(coreSolid);

    // 2. Concentric Precision Hexagonal Decision Labyrinth (Pure White & Zinc)
    const layers = [
      { radius: 2.2, segments: 6, color: 0xffffff, speed: 0.25, opacity: 0.4 },
      { radius: 3.0, segments: 8, color: 0x71717a, speed: -0.18, opacity: 0.35 },
      { radius: 3.8, segments: 12, color: 0x52525b, speed: 0.12, opacity: 0.25 },
    ];

    const ringMeshes: { mesh: THREE.LineLoop; speed: number; geo: THREE.BufferGeometry; mat: THREE.LineBasicMaterial }[] = [];

    layers.forEach((layer) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < layer.segments; i++) {
        if (i === 1) continue; // open gate
        const angle = (i / layer.segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(angle) * layer.radius, 0, Math.sin(angle) * layer.radius));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const ringMat = new THREE.LineBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
      });
      const ringLine = new THREE.LineLoop(ringGeo, ringMat);
      masterGroup.add(ringLine);
      ringMeshes.push({ mesh: ringLine, speed: layer.speed, geo: ringGeo, mat: ringMat });
    });

    scene.add(masterGroup);

    // Coordinate crosshairs
    const axisGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-4.5, 0, 0),
      new THREE.Vector3(4.5, 0, 0),
      new THREE.Vector3(0, 0, -4.5),
      new THREE.Vector3(0, 0, 4.5),
    ]);
    const axisMat = new THREE.LineBasicMaterial({ color: 0x27272a });
    const axes = new THREE.LineSegments(axisGeo, axisMat);
    scene.add(axes);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      octMesh1.rotation.y = time * 0.4;
      octMesh1.rotation.x = Math.sin(time * 0.3) * 0.3;
      octMesh2.rotation.y = -time * 0.5;

      ringMeshes.forEach(({ mesh, speed }) => {
        mesh.rotation.y = time * speed;
      });

      masterGroup.rotation.y = targetX * 0.8;
      masterGroup.rotation.x = targetY * 0.4;

      camera.position.x = targetX * 1.0;
      camera.position.y = 3.5 - targetY * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      octGeo1.dispose();
      octMat1.dispose();
      octGeo2.dispose();
      octMat2.dispose();
      coreSolidGeo.dispose();
      coreSolidMat.dispose();
      axisGeo.dispose();
      axisMat.dispose();
      ringMeshes.forEach(({ geo, mat }) => {
        geo.dispose();
        mat.dispose();
      });
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
      style={{ maskImage: "radial-gradient(ellipse at 65% 50%, black 40%, transparent 80%)" }}
    />
  );
}
