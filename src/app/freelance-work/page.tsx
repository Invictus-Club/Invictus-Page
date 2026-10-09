"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FreelanceHero3D } from "@/components/three/FreelanceHero3D";
import { ScrollScrubText } from "@/components/motion/AppleScrollScrub";
import { ApplePinned3DSection } from "@/components/motion/ApplePinned3DSection";
import { AppleScrollSpecs, SpecItemData } from "@/components/motion/AppleScrollSpecs";
import { AppleInteractiveList, ListItemData } from "@/components/motion/AppleInteractiveList";
import { AppleFAQSection, FAQItemData } from "@/components/motion/AppleFAQSection";
import { AppleScrollCTA } from "@/components/motion/AppleScrollCTA";

const engagementPhases = [
  {
    number: "01",
    title: "Technical Specification & Scope Freeze",
    description: "Before writing code, developers and clients sign off on a concrete architecture spec detailing APIs, database models, wireframes, and delivery milestones. Ambiguous requirements are eliminated upfront."
  },
  {
    number: "02",
    title: "40% Kickoff Escrow Deposit",
    description: "Clients fund the first milestone into secure escrow before repository initialization. Developers never build on unverified verbal promises or unsecured contracts."
  },
  {
    number: "03",
    title: "Alpha Milestone & Architecture Demo",
    description: "End of Sprint 1 delivers a live, clickable staging deployment on Vercel or Fly.io. Clients test real user flows while senior guild leads audit security headers and schema migrations."
  },
  {
    number: "04",
    title: "Production Handoff & Escrow Release",
    description: "Complete repository ownership transfer, domain DNS configuration, and automated test suite verification. Final milestone funds are released directly to the developer's bank account."
  }
];

const narrativeSentences = [
  "Generic freelance platforms force developers into race-to-the-bottom pricing and unpaid scope creep.",
  "The Invictus Dev Guild connects vetted student engineers directly with international startups and technology founders.",
  "Every project is structured with 40% upfront milestone escrow, verified contracts, and zero platform commissions."
];

const guildSpecs: SpecItemData[] = [
  {
    value: "$1.5k–$4.5k",
    label: "Average Contract Value",
    detail: "Priced on technical complexity, architectural depth, and delivery timeline rather than commoditized hourly bidding."
  },
  {
    value: "40% Upfront",
    label: "Escrow Protection",
    detail: "Milestone funds are deposited into verified escrow before any repository commits begin. Zero risk of unpaid deliverables."
  },
  {
    value: "0%",
    label: "Platform Commission",
    detail: "Invictus is an engineer-led community, not an agency intermediary. 100% of client payments go directly to the authors."
  },
  {
    value: "FIRC Compliant",
    label: "Direct Bank Settlement",
    detail: "Payments arrive directly via Stripe, Wise, or SWIFT into Indian accounts with legal foreign inward remittance certificates."
  }
];

const contractArchetypes: ListItemData[] = [
  {
    title: "High-Performance 3D & Web Applications",
    category: "2 WEEKS DELIVERY",
    badge: "$1,200 – $2,000 USD",
    summary: "High-conversion web application with WebGL visualizers, sub-100ms first paint, and automated SEO optimization.",
    details: [
      { label: "Architecture", value: "Next.js App Router + Three.js" },
      { label: "Rendering Budget", value: "Sub-16ms Frame Budget" },
      { label: "Styling System", value: "Custom Tailored Vanilla CSS" }
    ]
  },
  {
    title: "Full-Stack SaaS MVP with Auth & Billing",
    category: "3–4 WEEKS DELIVERY",
    badge: "$2,200 – $3,500 USD",
    summary: "Complete authenticated multi-tenant web application with role-based access, webhooks, and billing management.",
    details: [
      { label: "Backend Core", value: "Supabase + PostgreSQL with RLS" },
      { label: "Payments", value: "Stripe / LemonSqueezy Webhooks" },
      { label: "Hosting", value: "Containerized Cloud Staging" }
    ]
  },
  {
    title: "Cross-Platform Mobile Application",
    category: "3–5 WEEKS DELIVERY",
    badge: "$2,800 – $4,500 USD",
    summary: "Offline-first mobile application compiled for iOS and Android with background push notifications and EAS updates.",
    details: [
      { label: "Framework", value: "React Native + Expo EAS" },
      { label: "Local Database", value: "Encrypted SQLite Engine" },
      { label: "Publishing", value: "Automated App Store / Play Store Pipelines" }
    ]
  }
];

const guildFAQs: FAQItemData[] = [
  {
    question: "Can undergraduate students realistically deliver production systems?",
    answer: "Yes. Guild developers are paired with senior alumni tech leads who perform architectural reviews, PR audits, and edge case stress tests before client delivery."
  },
  {
    question: "How do developers qualify for the Invictus Dev Guild?",
    answer: "Qualification requires an active GitHub profile showcasing production-deployed full-stack or mobile applications, participation in club hackathon squads, and successful completion of an internal architecture review."
  },
  {
    question: "How are intellectual property rights and contracts formalized?",
    answer: "Contracts specify clear milestone deliverables, escrow release schedules, and full IP transfer to the client upon receipt of the final escrow settlement."
  }
];

export default function FreelanceWorkPage() {
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
        <FreelanceHero3D />

        <div className="relative z-10 max-w-5xl space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
            INVICTUS DEV GUILD
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-[-0.04em] uppercase leading-[0.88] text-white">
            Freelance Work.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-normal max-w-2xl leading-relaxed">
            High-value engineering contracts with global technology startups. Milestone-protected escrow and direct institutional settlements.
          </p>
        </div>
      </section>

      {/* LAYER 01: APPLE-GRADE SCROLL-SCRUBBED TYPOGRAPHY */}
      <section className="py-32 sm:py-48 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto border-b border-white/[0.08]">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 block">
            01 / CONTRACT DOCTRINE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-400">
            Dignity In Engineering
          </h2>
        </div>

        <ScrollScrubText paragraphs={narrativeSentences} />
      </section>

      {/* LAYER 02: PINNED 3D SCROLL INSPECTOR */}
      <section className="border-b border-white/[0.08]">
        <ApplePinned3DSection
          geometryType="freelance"
          steps={engagementPhases}
          title="Milestone Escrow Workflow"
          badge="02 / ENGAGEMENT PROTOCOL"
        />
      </section>

      {/* LAYER 03: SCROLL-SCRUBBED GUILD SPECIFICATIONS */}
      <AppleScrollSpecs
        badge="03 / OPERATING METRICS"
        title="Guild Standards"
        specs={guildSpecs}
      />

      {/* LAYER 04: SCROLL-TIMELINE CONTRACT SCOPES */}
      <AppleInteractiveList
        badge="04 / CONTRACT SCOPES"
        title="Common Project Archetypes"
        subtitle="Standardized delivery scopes vetted by senior guild architects with locked timelines and fixed milestone disbursements."
        items={contractArchetypes}
      />

      {/* LAYER 05: INTERACTIVE SCROLL-REVEAL ACCORDION FAQS */}
      <AppleFAQSection
        badge="05 / DEV GUILD PROTOCOLS"
        title="Frequently Asked Questions"
        items={guildFAQs}
      />

      {/* LAYER 06: CINEMATIC SCROLL-SCRUBBED CALL TO ACTION */}
      <AppleScrollCTA
        badge="ACTIVE BOUNTIES & CONTRACTS"
        title="Join The Dev Guild."
        description="Submit your GitHub profile to the Dev Guild lead review board to be considered for open client engineering contracts."
        primaryHref="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
        primaryText="Apply via WhatsApp"
        isExternal={true}
      />
    </div>
  );
}
