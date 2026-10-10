"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaperPosterHero3D } from "@/components/three/PaperPosterHero3D";
import { ScrollScrubText } from "@/components/motion/AppleScrollScrub";
import { ApplePinned3DSection } from "@/components/motion/ApplePinned3DSection";
import { AppleScrollSpecs, SpecItemData } from "@/components/motion/AppleScrollSpecs";
import { AppleInteractiveList, ListItemData } from "@/components/motion/AppleInteractiveList";
import { AppleFAQSection, FAQItemData } from "@/components/motion/AppleFAQSection";
import { AppleScrollCTA } from "@/components/motion/AppleScrollCTA";

const posterZones = [
  {
    number: "01",
    title: "10-Second Billboard Title & Metric",
    description: "Evaluators scan from 3 meters away. The headline must declare the concrete empirical finding or metric—not vague academic filler. 72pt+ high-contrast typography readable across crowded exhibition halls."
  },
  {
    number: "02",
    title: "Vector Architecture & Pipeline Diagram",
    description: "Replacing four paragraphs of dense methodology text with an intuitive high-contrast vector system diagram. Clear directional flow, consistent icon notation, and zero pixelated raster artifacts."
  },
  {
    number: "03",
    title: "Decisive Benchmark Comparison Curve",
    description: "One killer graph beats ten data tables. Highlighting the primary comparative benchmark showing your system outperforming existing baselines with clear labels and standard deviation indicators."
  },
  {
    number: "04",
    title: "30-Second Takeaway & Interactive Demo QR",
    description: "An executive bullet summary paired with a high-contrast QR code linking directly to the open-source GitHub repository and live web demonstration for evaluators to test on their mobile devices."
  }
];

const narrativeSentences = [
  "Academic poster sessions are high-speed visual communication under intense sensory distraction.",
  "Evaluators scan before they read: dense paragraphs of text and low-resolution screenshots get bypassed immediately.",
  "Invictus teams construct architectural exhibition posters: ISO A0 precision, 300 DPI vector clarity, and structured 90-second presentations."
];

const hardwareSpecs: SpecItemData[] = [
  {
    value: "ISO A0",
    label: "Standard Format",
    detail: "841 × 1189 mm dimensions formatted specifically for international IEEE, ACM, and university exhibition easels."
  },
  {
    value: "300 DPI",
    label: "Raster Resolution",
    detail: "Zero pixelation. High-resolution export pipelines in Figma and LaTeX ensuring razor-sharp line weights when printed."
  },
  {
    value: "90 Seconds",
    label: "Walkthrough Target",
    detail: "Structured 3-beat presentation narrative: problem context, architecture diagram, and decisive benchmark comparison."
  },
  {
    value: "100% Vector",
    label: "Data Graphics",
    detail: "All performance curves, system blocks, and state machine diagrams plotted in Python Seaborn and exported as vectors."
  }
];

const exhibitionPlaybook: ListItemData[] = [
  {
    title: "The 10-Second Rule",
    category: "COGNITIVE HOOK",
    badge: "SCAN PRIORITY",
    summary: "A walking evaluator must understand your core thesis, discovery, and benchmark result within 10 seconds of approaching your station.",
    details: [
      { label: "Optimal Distance", value: "3 Meters Evaluation Radius" },
      { label: "Headline Scale", value: "72pt+ High-Contrast Monospace" },
      { label: "Objective", value: "Immediate Conceptual Grasp" }
    ]
  },
  {
    title: "Pure Vector Assets & Crisp Line Weights",
    category: "GRAPHIC RIGOR",
    badge: "ZERO PRINT BLUR",
    summary: "Never paste 72 DPI screen grabs. All charts and architecture schemas must be exported as native SVGs or 300 DPI vector PDFs for zero print blur.",
    details: [
      { label: "Asset Format", value: "Native SVG / EPS / Vector PDF" },
      { label: "Tooling", value: "Figma Grid Kits + Matplotlib" },
      { label: "Raster Elements", value: "Strictly Prohibited" }
    ]
  },
  {
    title: "High-Contrast Typography Hierarchy",
    category: "LEGIBILITY DISCIPLINE",
    badge: "EXHIBITION STANDARD",
    summary: "96pt headlines, 40pt section headers, 24pt minimum body copy. Designed to be legible under harsh convention center fluorescent lighting.",
    details: [
      { label: "Title Scale", value: "96pt Primary Monolith" },
      { label: "Minimum Body", value: "24pt High-Contrast Clean Body" },
      { label: "Palette", value: "Monochrome Titanium on Slate" }
    ]
  },
  {
    title: "Interactive Artifact Integration",
    category: "DIGITAL BRIDGE",
    badge: "LIVE ARTIFACTS",
    summary: "Prominent 5cm QR code connecting physical print to digital reality: live web demos, arXiv preprints, or hardware telemetry recordings.",
    details: [
      { label: "Physical Dimensions", value: "5 × 5 cm High-Contrast QR" },
      { label: "Destination", value: "Live Production Demo & GitHub" },
      { label: "Offline Fallback", value: "Cached Demonstration Video" }
    ]
  }
];

const posterFAQs: FAQItemData[] = [
  {
    question: "What design tools does Invictus provide templates for?",
    answer: "We provide standardized A0 grid kits for Figma, along with LaTeX beamerposter templates tailored to academic conference style guides."
  },
  {
    question: "How should student presenters structure their verbal walkthrough?",
    answer: "Follow the 3-beat sequence: 15 seconds on the headline problem, 45 seconds explaining the visual architecture pipeline, and 30 seconds detailing the benchmark result, concluding with an invite to scan the demo QR code."
  },
  {
    question: "Where can posters be professionally printed on campus?",
    answer: "The club coordinates bulk high-resolution matte and canvas printing with verified vendors prior to regional symposia to ensure color fidelity and accurate sizing."
  }
];

export default function PaperPosterPage() {
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
        <PaperPosterHero3D />

        <div className="relative z-10 max-w-5xl space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
            SCIENTIFIC VISUAL SYNTHESIS
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-[-0.04em] uppercase leading-[0.88] text-white">
            Paper & Poster.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-normal max-w-2xl leading-relaxed">
            High-density scientific presentation design. Constructing ISO A0 exhibition posters with vector clarity and structured verbal delivery.
          </p>
        </div>
      </section>

      {/* LAYER 01: APPLE-GRADE SCROLL-SCRUBBED TYPOGRAPHY */}
      <section className="py-32 sm:py-48 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto border-b border-white/[0.08]">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 block">
            01 / EXHIBITION DOCTRINE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-400">
            Speed In Communication
          </h2>
        </div>

        <ScrollScrubText paragraphs={narrativeSentences} />
      </section>

      {/* LAYER 02: PINNED 3D SCROLL INSPECTOR */}
      <section className="border-b border-white/[0.08]">
        <ApplePinned3DSection
          geometryType="poster"
          steps={posterZones}
          title="Poster Anatomy & Information Flow"
          badge="02 / STRUCTURAL ZONES"
        />
      </section>

      {/* LAYER 03: SCROLL-SCRUBBED PRINT SPECIFICATIONS */}
      <AppleScrollSpecs
        badge="03 / PRINT SPECIFICATIONS"
        title="Hardware Standards"
        specs={hardwareSpecs}
      />

      {/* LAYER 04: SCROLL-TIMELINE EXHIBITION PLAYBOOK */}
      <AppleInteractiveList
        badge="04 / EXHIBITION PLAYBOOK"
        title="Presentation Guidelines"
        subtitle="Visual synthesis and presentation protocols engineered to capture attention and defend technical depth in crowded symposia."
        items={exhibitionPlaybook}
      />

      {/* LAYER 05: INTERACTIVE SCROLL-REVEAL ACCORDION FAQS */}
      <AppleFAQSection
        badge="05 / PRESENTATION CLINIC"
        title="Frequently Asked Questions"
        items={posterFAQs}
      />

      {/* LAYER 06: CINEMATIC SCROLL-SCRUBBED CALL TO ACTION */}
      <AppleScrollCTA
        badge="POSTER CLINIC & TEMPLATES"
        title="Synthesize Your Research."
        description="Access Invictus A0 poster design kits and schedule a visual review session before presenting at upcoming scientific symposia."
        primaryHref="/events"
        primaryText="View Symposia Schedule"
      />
    </div>
  );
}
