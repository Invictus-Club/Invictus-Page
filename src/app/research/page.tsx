"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResearchHero3D } from "@/components/three/ResearchHero3D";
import { ScrollScrubText } from "@/components/motion/AppleScrollScrub";
import { ApplePinned3DSection } from "@/components/motion/ApplePinned3DSection";
import { AppleScrollSpecs, SpecItemData } from "@/components/motion/AppleScrollSpecs";
import { AppleInteractiveList, ListItemData } from "@/components/motion/AppleInteractiveList";
import { AppleFAQSection, FAQItemData } from "@/components/motion/AppleFAQSection";
import { AppleScrollCTA } from "@/components/motion/AppleScrollCTA";

const researchPhases = [
  {
    number: "01",
    title: "Empirical Hypothesis & Bottleneck Isolation",
    description: "Rejecting generic literature summaries. Student researchers isolate specific architectural bottlenecks: memory bandwidth in edge inference, packet loss in mesh networks, or verification latency in zero-knowledge circuits."
  },
  {
    number: "02",
    title: "Physical Hardware Benchmarks & Statistical Runs",
    description: "Executing hundreds of reproducible benchmark trials on physical consumer hardware. Measuring variance, standard deviations, and profiling memory footprints using Python, perf tools, and vector charting."
  },
  {
    number: "03",
    title: "LaTeX Typesetting & Rigorous Peer Review",
    description: "Authoring camera-ready manuscripts on Overleaf using IEEE and ACM conference templates. Faculty mentors and alumni co-authors audit mathematical proofs, citation integrity, and experimental methodology."
  },
  {
    number: "04",
    title: "Conference Defense & Artifact Publication",
    description: "Submitting to indexed proceedings, defending slide decks in front of symposium evaluation panels, and publishing open-source reproduction repositories with complete benchmark datasets."
  }
];

const narrativeSentences = [
  "Undergraduate research should never be abstract literature summaries that gather dust in university archives.",
  "Invictus research cohorts investigate concrete empirical bottlenecks in distributed systems, model quantization, and edge wireless networking.",
  "Every paper is backed by reproducible benchmarks on physical silicon, statistical rigor, and indexed peer-reviewed proceedings."
];

const labSpecs: SpecItemData[] = [
  {
    value: "IEEE / ACM",
    label: "Target Venues",
    detail: "Research cohorts prepare camera-ready manuscripts formatted for indexed regional and national computing conferences."
  },
  {
    value: "100% Physical",
    label: "Hardware Telemetry",
    detail: "No theoretical assumptions. Experimental data is collected from physical microcontrollers, consumer SoCs, and real network environments."
  },
  {
    value: "Open Artifacts",
    label: "Reproducibility",
    detail: "Every paper is paired with open-source benchmark scripts, dataset archives, and containerized evaluation environments."
  },
  {
    value: "Peer-Reviewed",
    label: "Faculty Mentorship",
    detail: "Manuscripts undergo internal technical review by department advisors and senior club alumni before external submission."
  }
];

const researchDomains: ListItemData[] = [
  {
    title: "Low-Power Transformer Execution on Edge Silicon",
    category: "MACHINE LEARNING SYSTEMS",
    badge: "REGIONAL PROCEEDINGS",
    summary: "Profiling latency, memory bandwidth, and perplexity degradation when executing quantized 4-bit and 3-bit weights on commodity mobile SoCs without cloud offloading.",
    details: [
      { label: "Target Silicon", value: "Apple Silicon & Qualcomm SoCs" },
      { label: "Quantization", value: "4-bit GPTQ / AWQ / GGUF" },
      { label: "Primary Metrics", value: "Tokens/sec, Joules/Token, Perplexity" }
    ]
  },
  {
    title: "Deterministic Fallbacks for Distributed LoRa Mesh Topographies",
    category: "DISTRIBUTED WIRELESS",
    badge: "STATE TECHNICAL INNOVATION",
    summary: "Empirical packet delivery analysis across multi-hop LoRa sensor networks under physical attenuation and node dropouts without centralized cellular backhauls.",
    details: [
      { label: "Frequency", value: "868 / 915 MHz Sub-GHz" },
      { label: "Routing Strategy", value: "Multi-Hop Flood Fallback" },
      { label: "Packet Loss", value: "< 2.4% Under 4-Hop Attenuation" }
    ]
  },
  {
    title: "Client-Side Zero-Knowledge Verification in WebAssembly",
    category: "APPLIED CRYPTOGRAPHY",
    badge: "SYMPOSIUM UNDERGRAD FORUM",
    summary: "Benchmarking memory utilization and execution times for Groth16 zk-SNARK verification inside browser client runtimes for privacy-preserving credential validation.",
    details: [
      { label: "Proof System", value: "Groth16 (BN254 Pairing)" },
      { label: "Runtime", value: "Browser WebAssembly Core" },
      { label: "Peak Memory", value: "< 34MB RAM Footprint" }
    ]
  }
];

const researchFAQs: FAQItemData[] = [
  {
    question: "Can undergraduate students publish peer-reviewed scientific papers?",
    answer: "Yes. Undergraduate research that avoids generic theory and focuses on empirical benchmarking, system profiling, or reproducible experimental tests is routinely accepted at indexed technical conferences."
  },
  {
    question: "How does published research benefit career and graduate admissions?",
    answer: "First-author scientific publications demonstrate rigorous technical discipline, independent problem formulation, and communication skills, representing the highest-signal credential for competitive graduate programs and research labs."
  },
  {
    question: "How are conference travel and publication costs covered?",
    answer: "Invictus assists authors in applying for institutional student travel grants, departmental conference subsidies, and open-access publishing waivers."
  }
];

export default function ResearchPage() {
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
        <ResearchHero3D />

        <div className="relative z-10 max-w-5xl space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
            COMPUTATIONAL RESEARCH
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-[-0.04em] uppercase leading-[0.88] text-white">
            Research.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-normal max-w-2xl leading-relaxed">
            Empirical computer science investigations. Rigorous physical hardware benchmarks, statistical reproducibility, and peer-reviewed conference publications.
          </p>
        </div>
      </section>

      {/* LAYER 01: APPLE-GRADE SCROLL-SCRUBBED TYPOGRAPHY */}
      <section className="py-32 sm:py-48 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto border-b border-white/[0.08]">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 block">
            01 / SCIENTIFIC DOCTRINE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-400">
            Empirical Validation
          </h2>
        </div>

        <ScrollScrubText paragraphs={narrativeSentences} />
      </section>

      {/* LAYER 02: PINNED 3D SCROLL INSPECTOR */}
      <section className="border-b border-white/[0.08]">
        <ApplePinned3DSection
          geometryType="research"
          steps={researchPhases}
          title="Publishing Methodology"
          badge="02 / RESEARCH BLUEPRINT"
        />
      </section>

      {/* LAYER 03: SCROLL-SCRUBBED LAB SPECIFICATIONS */}
      <AppleScrollSpecs
        badge="03 / PUBLICATION METRICS"
        title="Lab Standards"
        specs={labSpecs}
      />

      {/* LAYER 04: SCROLL-TIMELINE ACTIVE INVESTIGATIVE DOMAINS */}
      <AppleInteractiveList
        badge="04 / ACTIVE DOMAINS"
        title="Investigative Focus"
        subtitle="Empirical engineering investigations driven by Invictus cohorts targeting national and regional computing proceedings."
        items={researchDomains}
      />

      {/* LAYER 05: INTERACTIVE SCROLL-REVEAL ACCORDION FAQS */}
      <AppleFAQSection
        badge="05 / ACADEMIC PROTOCOLS"
        title="Frequently Asked Questions"
        items={researchFAQs}
      />

      {/* LAYER 06: CINEMATIC SCROLL-SCRUBBED CALL TO ACTION */}
      <AppleScrollCTA
        badge="RESEARCH COLLABORATION"
        title="Submit A Proposal."
        description="Have an empirical hypothesis or algorithmic bottleneck you want to benchmark? Connect with Invictus research leads to structure an investigation."
        primaryHref="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
        primaryText="Connect via WhatsApp"
        isExternal={true}
      />
    </div>
  );
}
