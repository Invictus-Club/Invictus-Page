"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OffsiteHero3D } from "@/components/three/OffsiteHero3D";
import { ScrollScrubText } from "@/components/motion/AppleScrollScrub";
import { ApplePinned3DSection } from "@/components/motion/ApplePinned3DSection";
import { AppleScrollSpecs, SpecItemData } from "@/components/motion/AppleScrollSpecs";
import { AppleFAQSection, FAQItemData } from "@/components/motion/AppleFAQSection";
import { AppleScrollCTA } from "@/components/motion/AppleScrollCTA";

const residencyPhases = [
  {
    number: "01",
    title: "Monorepo Scaffold & Protocol Lock",
    description: "Within the first 3 hours, repository architecture, database schemas, and API contracts are committed. Production staging branches are provisioned with automated CI/CD pipelines before feature development begins."
  },
  {
    number: "02",
    title: "14-Hour Deep Work Sprint",
    description: "Uninterrupted engineering flow. Systems leads build core database queries and streaming endpoints while UI engineers construct high-performance client surfaces with sub-16ms render budgets."
  },
  {
    number: "03",
    title: "Load Stress & Edge Validation",
    description: "Simulating concurrent network loads, offline edge states, and failover scenarios. Code reviews focus strictly on architectural soundness, memory footprints, and exception handling."
  },
  {
    number: "04",
    title: "Production Verification & Release",
    description: "Final verification against production infrastructure. Repositories are tagged, containerized artifacts deployed, and architecture walk-through documentation published to the guild archive."
  }
];

const narrativeSentences = [
  "Campus lecture halls reward memorization. Real software engineering demands sustained focus and architectural clarity.",
  "Invictus offsite residencies isolate developer squads in distraction-free environments for 72-hour development sprints.",
  "No administrative bureaucracy. No academic distractions. Just high-density engineering and production deployments."
];

const offsiteSpecs: SpecItemData[] = [
  {
    value: "72 Hours",
    label: "Sprint Duration",
    detail: "Continuous weekend sprint lifecycle from Thursday night codebase initialization to Sunday evening release candidate."
  },
  {
    value: "12–15",
    label: "Cohort Capacity",
    detail: "Strictly capped developer density. Applicants are vetted by git track record, system fundamentals, and execution velocity."
  },
  {
    value: "Dedicated",
    label: "Satellite Uplink",
    detail: "Low-latency high-throughput connectivity paired with continuous generator backup power for zero downtime development."
  },
  {
    value: "100%",
    label: "Production Release",
    detail: "Every cohort project must deploy to production staging with verified telemetry, documentation, and live end-to-end user flows."
  }
];

const offsiteFAQs: FAQItemData[] = [
  {
    question: "How are cohort members selected?",
    answer: "Applications are reviewed on a rolling basis prior to each scheduled sprint. Developers are evaluated on demonstrable software projects, understanding of modern frameworks and deployment tools, and collaborative reliability."
  },
  {
    question: "What projects are built during residencies?",
    answer: "Teams focus either on core club infrastructure, ambitious capstone architectures, or high-conviction prototypes aimed at upcoming national hackathons and exhibitions."
  },
  {
    question: "Are travel and residency costs covered?",
    answer: "No. Travel, transit tickets, and daily food expenses are not covered or paid for by the club. Cohort members split travel and accommodation costs directly and equally. Invictus arranges the venue logistics, power backups, and satellite network connectivity."
  }
];

export default function OffsiteProjectDevPage() {
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
        <OffsiteHero3D />

        <div className="relative z-10 max-w-5xl space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
            INVICTUS GUILD RESIDENCY
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-[-0.04em] uppercase leading-[0.88] text-white">
            Offsite Project Dev.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-normal max-w-2xl leading-relaxed">
            Private 72-hour engineering sprints in secluded off-grid locations. Focused developer cohorts shipping production systems.
          </p>
        </div>
      </section>

      {/* LAYER 01: APPLE-GRADE SCROLL-SCRUBBED TYPOGRAPHY */}
      <section className="py-32 sm:py-48 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto border-b border-white/[0.08]">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 block">
            01 / PHILOSOPHY
          </span>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-400">
            Engineered For Pure Focus
          </h2>
        </div>

        <ScrollScrubText paragraphs={narrativeSentences} />
      </section>

      {/* LAYER 02: PINNED 3D SCROLL INSPECTOR */}
      <section className="border-b border-white/[0.08]">
        <ApplePinned3DSection
          geometryType="offsite"
          steps={residencyPhases}
          title="Residency Sprint Lifecycle"
          badge="02 / SPRINT ARCHITECTURE"
        />
      </section>

      {/* LAYER 03: SCROLL-SCRUBBED TECHNICAL SPECIFICATIONS */}
      <AppleScrollSpecs
        badge="03 / TECHNICAL SPECIFICATIONS"
        title="Operating Parameters"
        specs={offsiteSpecs}
      />

      {/* LAYER 04: INTERACTIVE SCROLL-REVEAL ACCORDION FAQS */}
      <AppleFAQSection
        badge="04 / PARTICIPATION PROTOCOLS"
        title="Frequently Asked Questions"
        items={offsiteFAQs}
      />

      {/* LAYER 05: CINEMATIC SCROLL-SCRUBBED CALL TO ACTION */}
      <AppleScrollCTA
        badge="NEXT RESIDENCY CYCLE"
        title="Build Without Distractions."
        description="Direct your portfolio or GitHub profile to the Invictus developer board to receive notifications for upcoming residency applications."
        primaryHref="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
        primaryText="Connect on WhatsApp"
        isExternal={true}
      />
    </div>
  );
}
