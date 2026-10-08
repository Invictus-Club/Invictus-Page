"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HackathonsHero3D } from "@/components/three/HackathonsHero3D";
import { ScrollScrubText } from "@/components/motion/AppleScrollScrub";
import { ApplePinned3DSection } from "@/components/motion/ApplePinned3DSection";
import { AppleScrollSpecs, SpecItemData } from "@/components/motion/AppleScrollSpecs";
import { AppleInteractiveList, ListItemData } from "@/components/motion/AppleInteractiveList";
import { AppleFAQSection, FAQItemData } from "@/components/motion/AppleFAQSection";
import { AppleScrollCTA } from "@/components/motion/AppleScrollCTA";

const tournamentPhases = [
  {
    number: "01",
    title: "Problem Statement Analysis & Protocol Lock",
    description: "Deconstructing evaluation criteria and locking three core features. The squad sketches the user journey, designs database schemas, and strictly rejects scope creep before writing the first line of code."
  },
  {
    number: "02",
    title: "Monorepo Scaffold & Deployment Pipeline",
    description: "Setting up a synchronized full-stack monorepo with automated CI/CD. Mock API contracts are live immediately so frontend engineers construct high-contrast interfaces without blocking on backend services."
  },
  {
    number: "03",
    title: "Core Pipeline & Edge Integration",
    description: "Integrating real-time engines, hardware sensors, and AI inference models with defensive offline fallback strategies. Senior alumni jump on code reviews to identify race conditions and bottleneck queries."
  },
  {
    number: "04",
    title: "Feature Freeze & 3-Minute Pitch Defense",
    description: "Strict code freeze hours ahead of the deadline. Pre-populating realistic demonstration data, rehearsing jury cross-examination questions, and timing the live walkthrough to sub-90 seconds."
  }
];

const narrativeSentences = [
  "Competitive hackathons are tournament engineering under unforgiving 24 to 36-hour deadlines.",
  "Invictus squads operate like specialized esports rosters: Frontend Architects, Systems Leads, and Technical Presenters working in complete synchrony.",
  "From Smart India Hackathon to IIT Dharwad SleeplessSaga, our members consistently engineer podium-winning systems."
];

const squadSpecs: SpecItemData[] = [
  {
    value: "24–36h",
    label: "Tournament Duration",
    detail: "Continuous sprint format requiring strict timeline discipline, feature freezes, and zero-downtime demonstration setups."
  },
  {
    value: "4 Person",
    label: "Squad Roster",
    detail: "Frontend Architect, Backend Systems Engineer, AI / Hardware Specialist, and Pitch Defense Lead."
  },
  {
    value: "Self / Split",
    label: "Travel Logistics",
    detail: "Squads travel together, but expenses are self-funded and split among members. We apply for institutional reimbursements where eligible, but nothing is pre-funded."
  },
  {
    value: "Confidential",
    label: "Cumulative Prize Pool",
    detail: "Aggregate winnings and individual tournament cash allocations are kept strictly confidential within participating squads."
  }
];

const tournamentWins: ListItemData[] = [
  {
    title: "Smart India Hackathon",
    category: "INTERNAL QUALIFIER",
    badge: "WINNER — 1ST PLACE",
    summary: "Offline emergency LoRa mesh network relaying live sensor telemetry during cellular infrastructure failures.",
    details: [
      { label: "Architecture", value: "LoRa Mesh + ESP32 Nodes" },
      { label: "Client Layer", value: "Offline Next.js PWA" },
      { label: "Jury Verdict", value: "1st Place Institutional Seed" }
    ]
  },
  {
    title: "IIT Dharwad SleeplessSaga",
    category: "NATIONAL HACKATHON",
    badge: "RUNNER-UP",
    summary: "High-throughput limit order book simulator in Rust with sub-millisecond execution matching.",
    details: [
      { label: "Core Engine", value: "Rust SIMD Vector Matcher" },
      { label: "Throughput", value: "1.2 Million Orders / Sec" },
      { label: "Telemetry", value: "Sub-Millisecond P99" }
    ]
  },
  {
    title: "Haritha Urjaneyam",
    category: "SUSTAINERGY TOURNAMENT",
    badge: "RUNNER-UP",
    summary: "Decentralized grid energy telemetry tracking and automated load shedding microservices.",
    details: [
      { label: "Streaming", value: "MQTT + TimescaleDB" },
      { label: "Analytics", value: "Dynamic Peak Shaving" },
      { label: "Deployment", value: "Docker Microservice Cluster" }
    ]
  },
  {
    title: "IIM Bangalore National Summit",
    category: "VENTURE FINALS",
    badge: "TOP 18 / 500+ TEAMS",
    summary: "Autonomous logistics route optimization model with dynamic battery-conservation algorithms.",
    details: [
      { label: "Algorithm", value: "Heuristic Vehicle Routing" },
      { label: "Evaluation", value: "National Scalability Defense" },
      { label: "Audience", value: "Institutional Venture Jury" }
    ]
  }
];

const squadFAQs: FAQItemData[] = [
  {
    question: "Can junior developers or beginners audition for squads?",
    answer: "Yes. We pair emerging engineers with experienced squad leads. Weekly internal build sprints ensure newer members master monorepos, git branching, and deployment architectures before participating in external tournaments."
  },
  {
    question: "How are prize earnings and intellectual property handled?",
    answer: "100% of tournament prize money belongs strictly to the participating squad members and is split equally. Code repositories remain open-source under MIT or Apache licenses on the squad members' personal GitHub profiles."
  },
  {
    question: "Is travel funded by the club?",
    answer: "No. Travel and lodging are not funded or paid for by the club. Squad members coordinate transit collectively and split costs directly among themselves. We help squads file for post-event university expense reimbursements where applicable, but attendees must anticipate self-funding."
  }
];

export default function HackathonsPage() {
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
        <HackathonsHero3D />

        <div className="relative z-10 max-w-5xl space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 block">
            COMPETITIVE ENGINEERING
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-[-0.04em] uppercase leading-[0.88] text-white">
            Hackathons.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-normal max-w-2xl leading-relaxed">
            High-pressure tournament software engineering. Specialized 4-person power squads competing in national collegiate arenas.
          </p>
        </div>
      </section>

      {/* LAYER 01: APPLE-GRADE SCROLL-SCRUBBED TYPOGRAPHY */}
      <section className="py-32 sm:py-48 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto border-b border-white/[0.08]">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 block">
            01 / TOURNAMENT DOCTRINE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-400">
            Speed, Reliability, Defense
          </h2>
        </div>

        <ScrollScrubText paragraphs={narrativeSentences} />
      </section>

      {/* LAYER 02: PINNED 3D SCROLL INSPECTOR */}
      <section className="border-b border-white/[0.08]">
        <ApplePinned3DSection
          geometryType="hackathon"
          steps={tournamentPhases}
          title="24-Hour Tournament Framework"
          badge="02 / SPRINT METHODOLOGY"
        />
      </section>

      {/* LAYER 03: SCROLL-SCRUBBED SQUAD SPECIFICATIONS */}
      <AppleScrollSpecs
        badge="03 / OPERATIONAL SPECIFICATIONS"
        title="Squad Standards"
        specs={squadSpecs}
      />

      {/* LAYER 04: SCROLL-TIMELINE DOCUMENTED PODIUM FINISHES */}
      <AppleInteractiveList
        badge="04 / VERIFIED TOURNAMENT RECORD"
        title="Documented Results"
        subtitle="Podium placements won by Invictus competitive squads at major university and national hackathons."
        items={tournamentWins}
      />

      {/* LAYER 05: INTERACTIVE SCROLL-REVEAL ACCORDION FAQS */}
      <AppleFAQSection
        badge="05 / SQUAD PROTOCOLS"
        title="Frequently Asked Questions"
        items={squadFAQs}
      />

      {/* LAYER 06: CINEMATIC SCROLL-SCRUBBED CALL TO ACTION */}
      <AppleScrollCTA
        badge="NEXT TOURNAMENT CYCLE"
        title="Audition For Squads."
        description="Squad formations for upcoming national collegiate hackathons are currently in progress. Join the developer community to receive sprint notifications."
        primaryHref="/events"
        primaryText="View Tournament Calendar"
      />
    </div>
  );
}
