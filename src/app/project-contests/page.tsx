"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectContestsHero3D } from "@/components/three/ProjectContestsHero3D";
import { ScrollScrubText } from "@/components/motion/AppleScrollScrub";
import { ApplePinned3DSection } from "@/components/motion/ApplePinned3DSection";
import { AppleScrollSpecs, SpecItemData } from "@/components/motion/AppleScrollSpecs";
import { AppleInteractiveList, ListItemData } from "@/components/motion/AppleInteractiveList";
import { AppleFAQSection, FAQItemData } from "@/components/motion/AppleFAQSection";
import { AppleScrollCTA } from "@/components/motion/AppleScrollCTA";

const auditPhases = [
  {
    number: "01",
    title: "Architectural Audit & Bottleneck Profiling",
    description: "Tearing down fragile monolithic designs. Club leads profile database query latencies, memory leaks, and brittle synchronous endpoints to identify failure points before examiners inspect the code."
  },
  {
    number: "02",
    title: "Asynchronous Workers & Decoupled Pipelines",
    description: "Replacing blocking HTTP requests with asynchronous job queues, WebSockets, or streaming protocols. The architecture is refactored into modular services capable of independent deployment and scaling."
  },
  {
    number: "03",
    title: "Production Staging & Telemetry Verification",
    description: "Moving off localhost:3000 to production HTTPS deployments with Docker and automated staging workflows. Real-time telemetry dashboards verify sub-100ms response benchmarks under concurrent load."
  },
  {
    number: "04",
    title: "Exhibition Demonstration & Examiner Defense",
    description: "Rehearsing live demonstrator flows with seeded test records and offline fallbacks. Teams learn to defend system tradeoffs, architectural diagrams, and database indexing strategies."
  }
];

const narrativeSentences = [
  "Undergraduate capstone projects are frequently compromised by toy architectures and localhost shortcuts.",
  "The Invictus Capstone Clinic subjects student repositories to enterprise-grade code audits and performance stress tests.",
  "We help engineering teams convert academic submissions into robust, exhibition-winning production architectures."
];

const exhibitionSpecs: SpecItemData[] = [
  {
    value: "Zero Localhost",
    label: "Deployment Standard",
    detail: "Every demonstration operates on live production HTTPS domains with proper TLS certificates and cloud staging."
  },
  {
    value: "< 100ms",
    label: "Latency Benchmark",
    detail: "Core API endpoints and client interactions profiled and optimized to execute sub-100ms response latencies."
  },
  {
    value: "0 Exceptions",
    label: "Console Hygiene",
    detail: "Client web and mobile applications must operate through entire examiner walkthroughs without unhandled console errors."
  },
  {
    value: "Top Honors",
    label: "Exhibition Track Record",
    detail: "Consistently securing 1st Place awards at regional VTU project symposiums and departmental capstone exhibitions."
  }
];

const capstoneCaseStudies: ListItemData[] = [
  {
    title: "Distributed Video Transcoding Engine",
    category: "FINAL YEAR CAPSTONE",
    badge: "1ST PRIZE WINNER",
    summary: "Converting a single-node bottleneck into a high-throughput worker cluster capable of concurrent 4K media transcoding.",
    initialState: "Single synchronous Python script locking client UI for 180+ seconds on 4K uploads.",
    overhaulState: "Parallel worker cluster in Go using Redis Streams and FFmpeg chunked pipelines, reducing processing latency to sub-5 seconds.",
    details: [
      { label: "Pipeline Stack", value: "Go + Redis Streams + FFmpeg" },
      { label: "Deployment", value: "Docker Microservice Cluster" },
      { label: "Latency Benchmark", value: "180s -> 4.8s (37x Speedup)" }
    ]
  },
  {
    title: "Zero-Knowledge Academic Credential Verification",
    category: "INTER-COLLEGE EXPO",
    badge: "BEST TECHNICAL DEPTH",
    summary: "Privacy-preserving verification proving student degree and eligibility metrics without exposing raw database records.",
    initialState: "Centralized database queries exposing sensitive student semester records to third-party verifiers.",
    overhaulState: "Groth16 zk-SNARK cryptographic verification executing in client WebAssembly runtimes, proving aggregate eligibility without leaking raw data.",
    details: [
      { label: "Cryptographic Core", value: "Rust + Circom (Groth16)" },
      { label: "Client Execution", value: "Browser WebAssembly Runtime" },
      { label: "Verification Latency", value: "Sub-120ms Zero-Knowledge Proof" }
    ]
  }
];

const capstoneFAQs: FAQItemData[] = [
  {
    question: "Can our team bring an existing semester project for review?",
    answer: "Yes. Capstone Clinic sessions review repositories at any stage. We profile performance, optimize data schemas, and help structure the demonstration narrative."
  },
  {
    question: "What hardware testing resources are available?",
    answer: "The Invictus developer lab provides microcontrollers, LoRa wireless modules, camera telemetry sensors, and cloud compute access for training and benchmarking."
  },
  {
    question: "How do examiners respond to production-staged systems?",
    answer: "Exhibition juries consistently award top honors to systems that operate on live domains with documented latency benchmarks and comprehensive test suites rather than unverified local scripts."
  }
];

export default function ProjectContestsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Ultra-Minimal Floating Back Link */}
      <Link
        href="/#opportunities"
        className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-all backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 bg-black/60 shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
      >
        <ArrowLeft size={13} />
        <span>Opportunities</span>
      </Link>

      {/* HERO SECTION - APPLE MONOLITHIC TYPOGRAPHY */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 sm:px-12 md:px-24 pb-20 pt-32 overflow-hidden border-b border-white/[0.08]">
        <ProjectContestsHero3D />

        <div className="relative z-10 max-w-5xl space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
            CAPSTONE AUDIT
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-[-0.04em] uppercase leading-[0.88] text-white">
            Project Contests.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-normal max-w-2xl leading-relaxed">
            Converting collegiate capstone projects into production systems. Rigorous architecture audits, telemetry stress tests, and exhibition wins.
          </p>
        </div>
      </section>

      {/* LAYER 01: APPLE-GRADE SCROLL-SCRUBBED TYPOGRAPHY */}
      <section className="py-32 sm:py-48 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto border-b border-white/[0.08]">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 block">
            01 / CAPSTONE DOCTRINE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-400">
            Beyond Toy Implementations
          </h2>
        </div>

        <ScrollScrubText paragraphs={narrativeSentences} />
      </section>

      {/* LAYER 02: PINNED 3D SCROLL INSPECTOR */}
      <section className="border-b border-white/[0.08]">
        <ApplePinned3DSection
          geometryType="project"
          steps={auditPhases}
          title="Capstone Overhaul Lifecycle"
          badge="02 / AUDIT METHODOLOGY"
        />
      </section>

      {/* LAYER 03: SCROLL-SCRUBBED EXHIBITION SPECIFICATIONS */}
      <AppleScrollSpecs
        badge="03 / TECHNICAL SPECIFICATIONS"
        title="Exhibition Standards"
        specs={exhibitionSpecs}
      />

      {/* LAYER 04: SCROLL-TIMELINE ARCHITECTURE CASE STUDIES */}
      <AppleInteractiveList
        badge="04 / CASE STUDIES"
        title="Architectural Overhauls"
        subtitle="Documented capstone transformations executed by Invictus squads to secure university exhibition honors."
        items={capstoneCaseStudies}
      />

      {/* LAYER 05: INTERACTIVE SCROLL-REVEAL ACCORDION FAQS */}
      <AppleFAQSection
        badge="05 / CLINIC PROTOCOLS"
        title="Frequently Asked Questions"
        items={capstoneFAQs}
      />

      {/* LAYER 06: CINEMATIC SCROLL-SCRUBBED CALL TO ACTION */}
      <AppleScrollCTA
        badge="WEEKLY CODE REVIEWS"
        title="Audit Your Capstone."
        description="Schedule an architectural review session with senior club leads before submitting your repository for university exhibition evaluation."
        primaryHref="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
        primaryText="Request Review via WhatsApp"
        isExternal={true}
      />
    </div>
  );
}
