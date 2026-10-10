"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function OffsiteHero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.04);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();

    // 1. Geodesic Architectural Node (Representing the Secluded Deep Work Residency)
    const domeGeo = new THREE.IcosahedronGeometry(2.4, 2);
    const domeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    masterGroup.add(domeMesh);

    // Inner Core: Floating Titanium Cube Octahedron
    const coreGeo = new THREE.OctahedronGeometry(1.1, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // 2. Precision Planar Coordinate Grid (Engineering Bed)
    const gridHelper = new THREE.GridHelper(24, 24, 0x52525b, 0x27272a);
    gridHelper.position.y = -2.2;
    scene.add(gridHelper);

    // 3. Coordinate Orientation Rings
    const ringGeo = new THREE.TorusGeometry(3.2, 0.015, 16, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x71717a,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = -1.2;
    masterGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 4;
    masterGroup.add(ring2);

    // 4. White Micro-Particles (Ambient Depth)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 20;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.07,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    scene.add(masterGroup);

    let animId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      animId = requestAnimationFrame(animate);
      masterGroup.rotation.y += 0.003;
      domeMesh.rotation.x += 0.001;
      coreMesh.rotation.y -= 0.005;

      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (3 + mouseY * 0.8 - camera.position.y) * 0.04;
      camera.lookAt(0, 0.2, 0);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      domeGeo.dispose();
      domeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none opacity-85"
      style={{ maskImage: "radial-gradient(ellipse at 65% 50%, black 40%, transparent 80%)" }}
    />
  );
}
