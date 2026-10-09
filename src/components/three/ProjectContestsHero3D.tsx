"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ProjectContestsHero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.04);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();

    // 1. Distributed Pipeline: Torus Geometry (Asynchronous Pipeline Loop)
    const torusGeo = new THREE.TorusGeometry(1.9, 0.35, 16, 64);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    masterGroup.add(torusMesh);

    // Inner Core Solid Dark Torus
    const innerTorusGeo = new THREE.TorusGeometry(1.85, 0.28, 12, 48);
    const innerTorusMat = new THREE.MeshBasicMaterial({ color: 0x18181b });
    const innerTorus = new THREE.Mesh(innerTorusGeo, innerTorusMat);
    masterGroup.add(innerTorus);

    // 2. High-Throughput Worker Cluster Orbiting Rings
    const ring1Geo = new THREE.TorusGeometry(2.8, 0.015, 16, 96);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.3, 0.012, 16, 96);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x71717a, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    masterGroup.add(ring2);

    // 3. Distributed Worker Nodes (Stream Event Queues)
    const workerCount = 12;
    const workerGeo = new THREE.OctahedronGeometry(0.18, 0);
    const workerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const workerGroup = new THREE.Group();

    for (let i = 0; i < workerCount; i++) {
      const angle = (i / workerCount) * Math.PI * 2;
      const worker = new THREE.Mesh(workerGeo, workerMat);
      worker.position.set(Math.cos(angle) * 2.8, Math.sin(angle) * 2.8, 0);
      workerGroup.add(worker);
    }
    workerGroup.rotation.x = Math.PI / 3;
    masterGroup.add(workerGroup);

    scene.add(masterGroup);

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

      masterGroup.rotation.y = time * 0.3 + targetX * 1.0;
      masterGroup.rotation.x = Math.sin(time * 0.25) * 0.2 + targetY * 0.5;

      workerGroup.rotation.z = time * 0.4;
      torusMesh.rotation.z = -time * 0.15;

      camera.position.x = targetX * 1.1;
      camera.position.y = -targetY * 1.1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      torusGeo.dispose();
      torusMat.dispose();
      innerTorusGeo.dispose();
      innerTorusMat.dispose();
      ring1Geo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      workerGeo.dispose();
      workerMat.dispose();
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
