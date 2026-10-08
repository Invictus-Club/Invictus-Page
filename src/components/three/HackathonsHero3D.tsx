"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HackathonsHero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.04);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();

    // 1. Central Competitive Tournament Engine: Titanium Geodesic Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // Inner Solid Dark Node
    const innerGeo = new THREE.OctahedronGeometry(0.8, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x18181b,
      wireframe: false,
      transparent: true,
      opacity: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerMesh);

    // Inner White Node Wire
    const innerWireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, opacity: 0.9 });
    const innerWire = new THREE.Mesh(innerGeo, innerWireMat);
    masterGroup.add(innerWire);

    // 2. High-Precision Orbital Chrono-Rings (Tournament Clock)
    const ring1Geo = new THREE.TorusGeometry(2.7, 0.015, 16, 96);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    masterGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.3, 0.012, 16, 96);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x71717a, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    masterGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(3.9, 0.01, 16, 96);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x52525b, transparent: true, opacity: 0.25 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    masterGroup.add(ring3);

    scene.add(masterGroup);

    // 3. Orbiting Data Node Swarm (Pure Monochrome Titanium)
    const particleCount = 240;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const angles = new Float32Array(particleCount);
    const radii = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const yOffsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      angles[i] = Math.random() * Math.PI * 2;
      radii[i] = 2.4 + Math.random() * 5.0;
      speeds[i] = (0.2 + Math.random() * 0.6) * (Math.random() > 0.5 ? 1 : -1);
      yOffsets[i] = (Math.random() - 0.5) * 3.5;

      particlePos[i * 3] = Math.cos(angles[i]) * radii[i];
      particlePos[i * 3 + 1] = yOffsets[i];
      particlePos[i * 3 + 2] = Math.sin(angles[i]) * radii[i];
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

      masterGroup.rotation.y = time * 0.35 + targetX * 1.2;
      masterGroup.rotation.x = Math.sin(time * 0.25) * 0.2 + targetY * 0.6;
      innerMesh.rotation.y = -time * 0.6;
      innerWire.rotation.y = -time * 0.6;

      ring1.rotation.z = time * 0.25;
      ring2.rotation.x = Math.PI / 3 + Math.sin(time * 0.4) * 0.2;
      ring3.rotation.y = time * 0.15;

      const posArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        angles[i] += speeds[i] * 0.012;
        posArr[i * 3] = Math.cos(angles[i]) * radii[i];
        posArr[i * 3 + 1] = yOffsets[i] + Math.sin(time * 1.5 + i) * 0.2;
        posArr[i * 3 + 2] = Math.sin(angles[i]) * radii[i];
      }
      particleGeo.attributes.position.needsUpdate = true;

      camera.position.x = targetX * 1.2;
      camera.position.y = -targetY * 1.2;
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
      innerGeo.dispose();
      innerMat.dispose();
      innerWireMat.dispose();
      ring1Geo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
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
