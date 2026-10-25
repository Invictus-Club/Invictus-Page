/**
 * INVICTUS EVENTS DATA REGISTRY
 * Detailed event documentation, agendas, prizes, venues & participation guidelines.
 */

export interface EventItem {
  id: string;
  name: string;
  date: string; // ISO date 'YYYY-MM-DD'
  time?: string;
  endDate?: string;
  category: 
    | "HACKATHON" 
    | "MAKEATHON" 
    | "IDEATHON" 
    | "RESEARCH" 
    | "PROJECTS" 
    | "BUILD" 
    | "EXPO" 
    | "WORKSHOP" 
    | "CODING CONTEST" 
    | "SEMINAR" 
    | "MEETUP" 
    | "PITCH DAY";
  status: "UPCOMING" | "ONGOING" | "PAST";
  location: string;
  prizePool?: string;
  teamSize?: string;
  summary: string;
  description: string;
  tracks: string[];
  schedule: { time: string; activity: string }[];
  mentorsOrJudges?: string[];
  registrationUrl?: string;
  featured?: boolean;
}

const eventsData: EventItem[] = [
  {
    id: "event-build-portal",
    name: "Ongoing Build Sprint: VTU Student Portal 2.0",
    date: "2026-10-01",
    endDate: "2026-11-15",
    time: "09:00 PM IST (Daily)",
    category: "BUILD",
    status: "ONGOING",
    location: "Invictus Discord / Night Hacking War Rooms",
    prizePool: "Monthly Stipend + Production Royalties",
    teamSize: "Open Squads",
    summary: "Active sprint engineering open-source VTU resource portals, syllabus tracking, and exam analyzers.",
    description: "Over 85 club members are actively writing high-performance Go microservices, modern Next.js frontends, and automated result parsing scripts servicing 10,000+ daily student hits across VTU affiliated colleges.",
    tracks: ["High-throughput Scrapers", "Realtime WebSocket notifications", "Accessible UI Components", "Edge Cache Layers"],
    schedule: [
      { time: "Daily 09:00 PM", activity: "Asynchronous Standup & Pull Request Reviews" },
      { time: "Wednesday 10:00 PM", activity: "Live Architecture Triage on Discord Stage" },
      { time: "Sunday 11:59 PM", activity: "Weekly Production Deployment Release" }
    ],
    mentorsOrJudges: ["Invictus Tech Leads", "Senior VTU Contributors"],
    featured: true
  },
  {
    id: "event-vtu-hackathon",
    name: "VTU Central Hackathon 2026",
    date: "2026-10-12",
    endDate: "2026-10-13",
    time: "09:00 AM IST",
    category: "HACKATHON",
    status: "PAST",
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
    id: "event-zk-crypto-workshop",
    name: "Zero-Knowledge & Rust Cryptography Workshop",
    date: "2026-10-22",
    time: "05:00 PM - 08:30 PM IST",
    category: "WORKSHOP",
    status: "PAST",
    location: "Invictus Virtual Lab & Regional Centre",
    prizePool: "Audit Tool Licenses + Certification",
    teamSize: "Individual",
    summary: "Deep dive into Halo2, Circom circuits, and writing memory-safe cryptographic primitives in Rust.",
    description: "Hands-on engineering workshop where students designed SNARK verification circuits for decentralized credentials, benchmarked proving times against RISC Zero, and deployed verified provers.",
    tracks: ["Circom Arithmetic Circuits", "Rust Memory Safety in Crypto", "On-Chain SNARK Verifiers"],
    schedule: [
      { time: "05:00 PM", activity: "Math Foundation: Polynomial Commitments & Arithmetic Circuits" },
      { time: "06:15 PM", activity: "Hands-on: Compiling Circom to WebAssembly Provers" },
      { time: "07:30 PM", activity: "Rust Integration & Live EVM Verification Tests" }
    ],
    mentorsOrJudges: ["Core Cryptographers at Polygon Zero", "Invictus Systems Lead"]
  },
  {
    id: "event-midnight-hacker-jam",
    name: "Midnight Hacker Jam & Rapid Prototyping",
    date: "2026-10-26",
    endDate: "2026-10-27",
    time: "10:00 PM - 06:00 AM IST",
    category: "HACKATHON",
    status: "ONGOING",
    location: "VTU Innovation Hub / Discord Stage",
    prizePool: "₹50,000 Spot Bounties + Cloud Credits",
    teamSize: "1 - 3 Builders",
    summary: "8-hour overnight sprint to ship functional developer tools, micro-SaaS prototypes, and AI workflows.",
    description: "An intensive overnight sprint engineered for builders who thrive in high-speed, sleep-optional hacking environments. Submissions are judged live at sunrise with instant cash spot prizes.",
    tracks: ["Developer Ergonomics", "Local First Web Apps", "Generative Audio & Visual Canvas", "Reverse Engineering APIs"],
    schedule: [
      { time: "10:00 PM", activity: "Theme Drop & Squad Assembly" },
      { time: "01:30 AM", activity: "Mid-Sprint Code Triage & Energy Drink Refuel" },
      { time: "04:30 AM", activity: "Deployment Polish & Readme Hardening" },
      { time: "05:45 AM", activity: "Sunrise Live 90-Second Lightning Demos" }
    ],
    mentorsOrJudges: ["Invictus Hack Leads", "Y Combinator Alumni"],
    featured: true
  },
  {
    id: "event-evm-audit-intensive",
    name: "Smart Contract Security & EVM Audit Intensive",
    date: "2026-10-28",
    time: "04:00 PM - 07:30 PM IST",
    category: "WORKSHOP",
    status: "UPCOMING",
    location: "Seminar Hall 1 & Live Stream",
    prizePool: "₹25,000 Capture-The-Flag Bounty",
    teamSize: "Individual / Pairs",
    summary: "Learn reentrancy attacks, flashloan vulnerabilities, and invariant testing with Foundry.",
    description: "Break contracts before attackers do. We deconstruct historical multi-million dollar DeFi exploits and practice fuzz testing, symbolic execution, and Slither static analysis.",
    tracks: ["Foundry Invariant Testing", "Reentrancy & Read-Only Exploits", "Gas Optimization Strategies"],
    schedule: [
      { time: "04:00 PM", activity: "Anatomy of Real-World Smart Contract Hacks" },
      { time: "05:15 PM", activity: "Writing Invariant Tests with Echidna & Foundry" },
      { time: "06:30 PM", activity: "Live CTF Challenge: Drain the Vulnerable Vault" }
    ],
    mentorsOrJudges: ["Smart Contract Auditors at Code4rena", "Security Researchers"]
  },
  {
    id: "event-research-symposium",
    name: "AI & Distributed Systems Research Symposium",
    date: "2026-11-04",
    time: "10:00 AM - 05:30 PM IST",
    category: "RESEARCH",
    status: "UPCOMING",
    location: "Auditorium Hall 2, VTU Regional Centre",
    prizePool: "Publication Grants + Conference Registration",
    teamSize: "Individual or Duo",
    summary: "Peer-reviewed student symposium on LLM optimization, latency profiling, and edge computing.",
    description: "Submit original papers, empirical evaluations, and algorithmic proofs. Selected papers are paired with academic advisors for journal indexed publication and international conference presentations.",
    tracks: ["Low-Bit Quantization for Edge LLMs", "Consensus Algorithms in Partitioned Networks", "Computer Vision for Rural Agriculture"],
    schedule: [
      { time: "10:00 AM", activity: "Keynote: Scalable Transformers without Memory Bottlenecks" },
      { time: "11:30 AM", activity: "Track A: Edge Computing & Embedded Systems Presentations" },
      { time: "02:00 PM", activity: "Track B: Machine Learning & NLP Oral Reviews" },
      { time: "04:30 PM", activity: "Panel Discussion: Publishing Before Graduation as VTU Students" }
    ],
    mentorsOrJudges: ["Dr. C. R. Rao Research Scholars", "Principal AI Scientists", "IEEE Senior Members"]
  },
  {
    id: "event-autumn-algo-sprint",
    name: "Autumn Algorithms & High-Frequency Code Sprint",
    date: "2026-11-18",
    time: "02:00 PM - 06:00 PM IST",
    category: "CODING CONTEST",
    status: "UPCOMING",
    location: "Online Arena & Campus Labs",
    prizePool: "₹75,000 Cash Pool + Quant Firm Fast-Track Interviews",
    teamSize: "Individual",
    summary: "Intense 4-hour algorithmic battle featuring dynamic programming, graph theory, and concurrent queues.",
    description: "Engineered in collaboration with high-frequency trading engineers and competitive programmers. 6 challenging algorithmic problems designed to test raw spatial and computational intuition.",
    tracks: ["Advanced Dynamic Programming", "Low-Latency Data Structures", "Combinatorial Optimization"],
    schedule: [
      { time: "02:00 PM", activity: "Contest Launch & Live Scoreboard Active" },
      { time: "04:00 PM", activity: "Scoreboard Freeze (Final 2 Hours)" },
      { time: "06:00 PM", activity: "Live Editorial & Optimal Code Walkthroughs" }
    ],
    mentorsOrJudges: ["Grandmasters at Codeforces", "Quant Developers"]
  },
  {
    id: "event-cloud-edge-summit",
    name: "Cloud Native & Edge Architecture Summit",
    date: "2026-12-05",
    time: "11:00 AM - 04:00 PM IST",
    category: "SEMINAR",
    status: "UPCOMING",
    location: "VTU Central Tech Amphitheater",
    prizePool: "Cloud Credits + CNCF Certifications",
    teamSize: "Open Access",
    summary: "Industry leaders deconstruct Kubernetes internals, eBPF telemetry, and serverless WASM execution.",
    description: "Explore the bleeding edge of cloud infrastructure. Learn how hyperscalers handle multi-region failovers, manage zero-downtime database migrations, and deploy WASM runtimes at the CDN edge.",
    tracks: ["eBPF Kernel Telemetry", "WASM at the Network Edge", "Zero-Trust Microservice Meshes"],
    schedule: [
      { time: "11:00 AM", activity: "Keynote: Life After Traditional Virtual Machines" },
      { time: "12:30 PM", activity: "Deep Dive: eBPF for High Performance Network Tracing" },
      { time: "02:30 PM", activity: "Hands-on: Deploying Microservices with Cilium & Envoy" }
    ],
    mentorsOrJudges: ["CNCF Ambassadors", "Principal Reliability Architects"]
  },
  {
    id: "event-pitch-day",
    name: "Invictus Pitch Day & Demo Arena",
    date: "2026-12-15",
    time: "01:00 PM - 06:00 PM IST",
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
    mentorsOrJudges: ["Venture Partners at Blume & Elevation", "VTU Angel Syndicate", "Serial SaaS Founders"],
    featured: true
  },
  {
    id: "event-web3-expo-archive",
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
    id: "event-spring-hackfest-archive",
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
