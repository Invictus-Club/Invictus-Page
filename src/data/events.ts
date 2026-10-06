/**
 * INVICTUS EVENTS DATA REGISTRY
 * Detailed event documentation, agendas, prizes, venues & participation guidelines.
 */

export interface EventItem {
  id: string;
  name: string;
  date: string;
  category: "HACKATHON" | "RESEARCH" | "PROJECTS" | "BUILD" | "EXPO";
  status: "UPCOMING" | "ONGOING" | "PAST";
  location: string;
  prizePool?: string;
  teamSize?: string;
  summary: string;
  description: string;
  tracks: string[];
  schedule: { time: string; activity: string }[];
  mentorsOrJudges?: string[];
}

const eventsData: EventItem[] = [
  {
    id: "event-1",
    name: "VTU Central Hackathon 2026",
    date: "2026-10-12",
    category: "HACKATHON",
    status: "UPCOMING",
    location: "VTU Belagavi Campus / Hybrid",
    prizePool: "₹2,50,000 INR + Incubation Grant",
    teamSize: "2 - 4 Members",
    summary: "36-hour multi-track battle across AI, Distributed Systems, Web3, and HealthTech.",
    description: "The flagship tournament uniting collegiate teams across Karnataka. Participants get round-the-clock mentor support from VTU alumni in top tier companies, free compute credits, and investor demos.",
    tracks: ["Autonomous AI Agents", "Decentralized Infrastructure", "Adaptive Smart Grid Systems", "Next-Gen EdTech & Accessibility"],
    schedule: [
      { time: "Day 1 - 09:00 AM", activity: "Opening Keynote & Problem Statements Released" },
      { time: "Day 1 - 02:00 PM", activity: "Mentor Checkpoint 1: Architecture Review" },
      { time: "Day 2 - 12:00 AM", activity: "Midnight Hacker Showdown & Live Bug Bounty" },
      { time: "Day 2 - 04:00 PM", activity: "Final Code Freeze & Demo Submissions" },
      { time: "Day 2 - 06:30 PM", activity: "Grand Finale Pitch & Winners Announced" }
    ],
    mentorsOrJudges: ["Staff Engineers at Google & Postman", "VTU Innovation Council Members", "Founders of YC Backed Startups"]
  },
  {
    id: "event-2",
    name: "AI & Distributed Systems Research Symposium",
    date: "2026-11-04",
    category: "RESEARCH",
    status: "UPCOMING",
    location: "Auditorium Hall 2, VTU Regional Centre",
    prizePool: "Publication Grants + IEEE Conference Sponsorship",
    teamSize: "Individual or Duo",
    summary: "Peer-reviewed student symposium on LLM optimization, latency profiling, and edge computing.",
    description: "Submit original papers, empirical evaluations, and algorithmic proofs. Selected papers are paired with academic advisors for journal indexed publication and international travel sponsorship.",
    tracks: ["Low-Bit Quantization for Edge LLMs", "Consensus Algorithms in Partioned Networks", "Computer Vision for Rural Agriculture"],
    schedule: [
      { time: "10:00 AM", activity: "Keynote: Scalable Transformers without Memory Bottlenecks" },
      { time: "11:30 AM", activity: "Track A: Edge Computing & Embedded Systems Presentations" },
      { time: "02:00 PM", activity: "Track B: Machine Learning & NLP Oral Reviews" },
      { time: "04:30 PM", activity: "Panel Discussion: Publishing Before Graduation as VTU Students" }
    ],
    mentorsOrJudges: ["Dr. C. R. Rao Research Scholars", "Principal AI Scientists", "IEEE Senior Members"]
  },
  {
    id: "event-3",
    name: "Invictus Pitch Day & Demo Arena",
    date: "2026-12-15",
    category: "PROJECTS",
    status: "UPCOMING",
    location: "Bengaluru Tech Summit Venue / Live Stream",
    prizePool: "₹5,00,000 Seed Pool + Angel Network Access",
    teamSize: "Founding Teams (1 - 5)",
    summary: "Live product demo day connecting student builders with angels, venture scouts, and accelerators.",
    description: "Invictus teams take their semester projects, hackathon winners, and freelance prototypes directly to pre-seed funds and enterprise angels. 5 minutes pitch, 3 minutes brutal live Q&A.",
    tracks: ["B2B Developer Tooling", "Applied AI Infrastructure", "Consumer Fintech", "Open-Source Hardware"],
    schedule: [
      { time: "01:00 PM", activity: "Investor Networking & Founders Exhibition Booths" },
      { time: "02:30 PM", activity: "Top 10 Cohort Demos (Strict 5-min timer)" },
      { time: "04:30 PM", activity: "Term Sheet Offers & Pilot Deployments Reveal" }
    ],
    mentorsOrJudges: ["Venture Partners at Blume & Elevation", "VTU Angel Syndicate", "Serial SaaS Founders"]
  },
  {
    id: "event-4",
    name: "Ongoing Build Sprint: VTU Student Portal 2.0",
    date: "2026-10-01",
    category: "BUILD",
    status: "ONGOING",
    location: "Invictus Discord / Night Hacking War Rooms",
    prizePool: "Monthly Stipend + Production Royalties",
    teamSize: "Open Squads",
    summary: "Active sprint engineering open-source VTU resource portals, syllabus tracking, and exam analyzers.",
    description: "Over 85 club members are actively writing high-performance Go microservices, modern Next.js frontends, and automated result parsing scripts that service 10,000+ daily student hits.",
    tracks: ["High-throughput Scrapers", "Realtime WebSocket notifications", "Accessible UI Components"],
    schedule: [
      { time: "Daily 09:00 PM", activity: "Asynchronous Standup & Pull Request Reviews" },
      { time: "Wednesday 10:00 PM", activity: "Live Architecture Triage on Discord Stage" },
      { time: "Sunday 11:59 PM", activity: "Weekly Production Deployment Release" }
    ],
    mentorsOrJudges: ["Invictus Tech Leads", "Senior VTU Contributors"]
  },
  {
    id: "event-5",
    name: "Invictus Web3 & Distributed Expo",
    date: "2026-09-10",
    category: "EXPO",
    status: "PAST",
    location: "Mysuru Innovation Park",
    prizePool: "₹1,80,000 Awarded",
    teamSize: "18 Teams Finalists",
    summary: "Comprehensive showcase of decentralized identities, cross-chain bridges, and zero-knowledge proofs.",
    description: "Gathered 400+ attendees. 18 teams demoed smart contracts deployed on testnets with production-grade audits, security stress-tests, and live attack vectors demonstrated on stage.",
    tracks: ["ZK Verification for Academic Credentials", "Gas-optimized Rollup Contracts"],
    schedule: [
      { time: "Archive", activity: "Completed successfully with 3 teams funded by ecosystem grants." }
    ],
    mentorsOrJudges: ["Security Auditors from OpenZeppelin", "Protocol Engineers"]
  },
  {
    id: "event-6",
    name: "Spring VTU Hackfest 2026",
    date: "2026-03-20",
    category: "HACKATHON",
    status: "PAST",
    location: "Hubballi Convention Center",
    prizePool: "₹2,00,000 Awarded across 6 Categories",
    teamSize: "64 Teams",
    summary: "The legendary 48-hour spring tournament where Invictus squads took 1st and 2nd overall prizes.",
    description: "Historic event with 250+ coders grinding throughout the night. Projects included real-time bus telemetry, local language speech-to-text models for Kannada dialects, and automated college timetabling algorithms.",
    tracks: ["GovTech Innovation", "Regional Language AI", "High Performance Web Apps"],
    schedule: [
      { time: "Archive", activity: "1st Place: Team Invictus Zero (Fleet Telemetry with Rust & MQTT)" }
    ],
    mentorsOrJudges: ["VTU Dept Chairs", "Industry CTOs"]
  }
];

export default eventsData;