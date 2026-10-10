"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function PaperPosterHero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.04);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 9.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const galleryGroup = new THREE.Group();

    // 1. Floating Architectural Poster Monoliths (Exhibition Stands)
    const monolithCount = 6;
    const monolithGeo = new THREE.BoxGeometry(1.6, 2.3, 0.06);
    const monolithMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x18181b,
      transparent: true,
      opacity: 0.7,
    });

    for (let i = 0; i < monolithCount; i++) {
      const angle = (i / monolithCount) * Math.PI * 2;
      const r = 3.6;
      const monolith = new THREE.Group();

      const wireMesh = new THREE.Mesh(monolithGeo, monolithMat);
      const solidMesh = new THREE.Mesh(monolithGeo, innerMat);
      monolith.add(wireMesh);
      monolith.add(solidMesh);

      monolith.position.set(Math.cos(angle) * r, Math.sin(angle * 2) * 0.4, Math.sin(angle) * r);
      monolith.lookAt(0, 0, 0);
      galleryGroup.add(monolith);
    }

    // 2. Centerpiece Exhibition Prism (Rotating Crystal Monolith)
    const centerGeo = new THREE.CylinderGeometry(0.8, 0.8, 2.4, 6);
    const centerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.8 });
    const centerPrism = new THREE.Mesh(centerGeo, centerMat);
    galleryGroup.add(centerPrism);

    scene.add(galleryGroup);

    // 3. Perspective Floor Grid
    const floorGridGeo = new THREE.PlaneGeometry(24, 24, 24, 24);
    floorGridGeo.rotateX(-Math.PI / 2);
    const floorGridMat = new THREE.MeshBasicMaterial({ color: 0x27272a, wireframe: true, transparent: true, opacity: 0.3 });
    const floorGrid = new THREE.Mesh(floorGridGeo, floorGridMat);
    floorGrid.position.y = -2.2;
    scene.add(floorGrid);

    // 4. Floating Luminescent Dust Particles
    const dustCount = 200;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 16;
      dustPos[i * 3 + 1] = Math.random() * 8 - 2;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.07,
      transparent: true,
      opacity: 0.6,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

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

      galleryGroup.rotation.y = time * 0.15 + targetX * 0.6;
      centerPrism.rotation.y = -time * 0.5;
      centerPrism.rotation.x = Math.sin(time * 0.3) * 0.2;

      camera.position.x = targetX * 1.5;
      camera.position.y = 2.5 - targetY * 1.0;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      monolithGeo.dispose();
      monolithMat.dispose();
      innerMat.dispose();
      centerGeo.dispose();
      centerMat.dispose();
      floorGridGeo.dispose();
      floorGridMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
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
