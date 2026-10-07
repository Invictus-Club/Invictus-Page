"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function EventsHero3D() {
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

    const masterGroup = new THREE.Group();

    // 1. Concentric Chronological Orbit Rings (Calendar Ephemeris)
    const ringCount = 4;
    const ringGroup = new THREE.Group();

    for (let i = 0; i < ringCount; i++) {
      const radius = 2.0 + i * 0.7;
      const ringGeo = new THREE.TorusGeometry(radius, 0.012, 16, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0xffffff : 0x71717a,
        transparent: true,
        opacity: 0.5 - i * 0.1,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / (2.2 + i * 0.3);
      ringMesh.rotation.y = (i * Math.PI) / 6;
      ringGroup.add(ringMesh);
    }
    masterGroup.add(ringGroup);

    // 2. Central Chrono-Core: Intersecting Polyhedral Chronometer (Titanium)
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // Inner Dark Node
    const darkNodeGeo = new THREE.IcosahedronGeometry(1.0, 0);
    const darkNodeMat = new THREE.MeshBasicMaterial({ color: 0x18181b });
    const darkNode = new THREE.Mesh(darkNodeGeo, darkNodeMat);
    masterGroup.add(darkNode);

    // 3. Milestone Nodes on Outer Ring (Active Tournaments)
    const nodeCount = 8;
    const nodeGeo = new THREE.OctahedronGeometry(0.12, 0);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const nodesGroup = new THREE.Group();

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const r = 3.4;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
      nodesGroup.add(node);
    }
    nodesGroup.rotation.x = Math.PI / 2.5;
    masterGroup.add(nodesGroup);

    // 4. Ambient Perspective Floor Grid
    const floorGridGeo = new THREE.PlaneGeometry(28, 28, 28, 28);
    floorGridGeo.rotateX(-Math.PI / 2);
    const floorGridMat = new THREE.MeshBasicMaterial({
      color: 0x27272a,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const floorGrid = new THREE.Mesh(floorGridGeo, floorGridMat);
    floorGrid.position.y = -2.4;
    scene.add(floorGrid);

    // 5. Luminescent Ambient Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 20;
      particlePos[i * 3 + 1] = Math.random() * 8 - 2;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.07,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

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

      masterGroup.rotation.y = time * 0.2 + targetX * 0.8;
      masterGroup.rotation.x = Math.sin(time * 0.15) * 0.15 + targetY * 0.4;

      nodesGroup.rotation.z = time * 0.15;
      coreMesh.rotation.y = -time * 0.4;

      camera.position.x = targetX * 1.2;
      camera.position.y = 2.5 - targetY * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      coreGeo.dispose();
      coreMat.dispose();
      darkNodeGeo.dispose();
      darkNodeMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      floorGridGeo.dispose();
      floorGridMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
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
