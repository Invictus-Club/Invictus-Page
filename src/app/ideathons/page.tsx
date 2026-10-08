"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IdeathonsHero3D } from "@/components/three/IdeathonsHero3D";
import { ScrollScrubText } from "@/components/motion/AppleScrollScrub";
import { ApplePinned3DSection } from "@/components/motion/ApplePinned3DSection";
import { AppleScrollSpecs, SpecItemData } from "@/components/motion/AppleScrollSpecs";
import { AppleInteractiveList, ListItemData } from "@/components/motion/AppleInteractiveList";
import { AppleFAQSection, FAQItemData } from "@/components/motion/AppleFAQSection";
import { AppleScrollCTA } from "@/components/motion/AppleScrollCTA";

const pitchPhases = [
  {
    number: "01",
    title: "Empirical Problem Formulation",
    description: "Rejecting hypothetical market claims. Teams identify measurable operational friction: quantifiable hours lost, manual spreadsheet failures, or localized supply chain bottlenecks with concrete user evidence."
  },
  {
    number: "02",
    title: "Technical Moat & Distribution Lock",
    description: "Proving why incumbent platforms cannot replicate the solution in an afternoon sprint. Defensible advantages include captive campus hardware nodes, unique data pipelines, or zero-acquisition distribution channels."
  },
  {
    number: "03",
    title: "Unit Margins & Economic Defense",
    description: "Rigorous unit economics calculated under real transaction fees, cloud hosting overhead, and customer acquisition costs. Vague advertising revenue models are replaced with positive net contribution margins."
  },
  {
    number: "04",
    title: "180-Second Live Demonstration & Q&A",
    description: "Pitch presenters transition from slides to live interactive software within the first 60 seconds. Rehearsed defenses address skeptical questions from venture capitalists and faculty juries."
  }
];

const narrativeSentences = [
  "Ideas without operational clarity and technical moats get shredded during jury cross-examination.",
  "Invictus ideathon cohorts train for first-principles venture modeling, concrete unit margins, and defensible distribution.",
  "We prepare collegiate founders to win university innovation grants, regional venture competitions, and institutional incubation."
];

const pitchSpecs: SpecItemData[] = [
  {
    value: "180 Seconds",
    label: "Defense Window",
    detail: "60 seconds on measurable problem friction, 90 seconds live interactive software demo, 30 seconds on unit economics."
  },
  {
    value: "8 Slides Max",
    label: "Deck Constraint",
    detail: "Title Hook, Market Friction, Technical Architecture, Moat Defense, Unit Margins, Go-To-Market, Team, The Ask."
  },
  {
    value: "Mandatory",
    label: "Interactive Demo",
    detail: "No static mockups. Teams must demonstrate live working software or physical hardware during the presentation."
  },
  {
    value: "₹2,00,000+",
    label: "Grant Track Record",
    detail: "Seed awards and prototype development grants secured by Invictus venture squads in collegiate pitch forums."
  }
];

const crossExaminations: ListItemData[] = [
  {
    title: "“Why wouldn't users simply solve this manually on WhatsApp or spreadsheets?”",
    category: "CHAMBER 01",
    badge: "OPERATIONAL SCALE",
    summary: "Juries test whether the problem genuinely requires software automation or if manual coordination suffices.",
    flawedState: "Claiming superior UI design, dark mode, or better aesthetic appeal.",
    invictusState: "Demonstrating operational breaking points: manual coordination fails at scale. Automated state-machine scheduling pre-batches requests with zero manual latency.",
    details: [
      { label: "Moat", value: "Algorithmic State Machines" },
      { label: "Failure Mode", value: "Human Latency & Coordination Collapse" }
    ]
  },
  {
    title: "“What stops a capitalized incumbent from cloning this feature next quarter?”",
    category: "CHAMBER 02",
    badge: "DISTRIBUTION LOCK",
    summary: "Venture evaluators examine whether product defensibility survives well-funded competition.",
    flawedState: "Claiming first-mover advantage or working harder than corporate competitors.",
    invictusState: "Hyper-local captive distribution: hardware is physically integrated into local institutional networks, creating near-zero customer acquisition cost.",
    details: [
      { label: "Defensibility", value: "Local Captive Hardware Integration" },
      { label: "CAC", value: "Near-Zero Institutional Integration" }
    ]
  },
  {
    title: "“What are your actual unit margins after third-party payment processing fees?”",
    category: "CHAMBER 03",
    badge: "UNIT MARGINS",
    summary: "Financial analysts evaluate transactional sustainability under real merchant discount rates.",
    flawedState: "Relying on future banner advertising or speculative premium tier conversion.",
    invictusState: "Demonstrating positive unit economics: 12-14% net take rate with direct UPI auto-debit, bypassing credit interchange surcharges entirely.",
    details: [
      { label: "Settlement Rails", value: "UPI Auto-Debit Recurring Mandates" },
      { label: "Net Contribution", value: "12-14% Positive Margin" }
    ]
  }
];

const ventureFAQs: FAQItemData[] = [
  {
    question: "Can non-engineering students participate in ideathons?",
    answer: "Yes. Successful venture squads combine technical architects with domain specialists in economics, operations, and product design."
  },
  {
    question: "What support is provided after winning collegiate pitch events?",
    answer: "Invictus connects winning teams directly with institutional innovation grants, university incubation facilities, and technical alumni advisors to advance prototypes to production."
  },
  {
    question: "How do teams rehearse for aggressive jury questions?",
    answer: "We run weekly mock defense clinics where faculty advisors and alumni founders simulate cross-examination on customer acquisition, unit margins, and defensive barriers."
  }
];

export default function IdeathonsPage() {
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
        <IdeathonsHero3D />

        <div className="relative z-10 max-w-5xl space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
            VENTURE ARCHITECTURE
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-[-0.04em] uppercase leading-[0.88] text-white">
            Ideathons.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-normal max-w-2xl leading-relaxed">
            Rigorous first-principles venture modeling. Defending technical moats, distribution channels, and unit economics in front of venture juries.
          </p>
        </div>
      </section>

      {/* LAYER 01: APPLE-GRADE SCROLL-SCRUBBED TYPOGRAPHY */}
      <section className="py-32 sm:py-48 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto border-b border-white/[0.08]">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 block">
            01 / VENTURE DOCTRINE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-400">
            First-Principles Defense
          </h2>
        </div>

        <ScrollScrubText paragraphs={narrativeSentences} />
      </section>

      {/* LAYER 02: PINNED 3D SCROLL INSPECTOR */}
      <section className="border-b border-white/[0.08]">
        <ApplePinned3DSection
          geometryType="ideathon"
          steps={pitchPhases}
          title="Pitch Architecture Framework"
          badge="02 / VENTURE DEFENSE"
        />
      </section>

      {/* LAYER 03: SCROLL-SCRUBBED PITCH SPECIFICATIONS */}
      <AppleScrollSpecs
        badge="03 / PRESENTATION STANDARDS"
        title="Pitch Specifications"
        specs={pitchSpecs}
      />

      {/* LAYER 04: SCROLL-TIMELINE JURY DEFENSE CLINIC */}
      <AppleInteractiveList
        badge="04 / JURY DEFENSE CLINIC"
        title="Cross-Examination Analysis"
        subtitle="Critical examination chambers evaluating defensibility against incumbent cloning, manual workarounds, and negative margins."
        items={crossExaminations}
      />

      {/* LAYER 05: INTERACTIVE SCROLL-REVEAL ACCORDION FAQS */}
      <AppleFAQSection
        badge="05 / VENTURE CLINIC PROTOCOLS"
        title="Frequently Asked Questions"
        items={ventureFAQs}
      />

      {/* LAYER 06: CINEMATIC SCROLL-SCRUBBED CALL TO ACTION */}
      <AppleScrollCTA
        badge="MOCK JURY CLINIC"
        title="Stress-Test Your Venture."
        description="Bring your pitch deck and software prototype to our weekly technical defense review before competing in collegiate venture forums."
        primaryHref="/events"
        primaryText="View Innovation Events"
      />
    </div>
  );
}
