/* eslint-disable */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  BookOpen, 
  Cpu, 
  Database, 
  Copy, 
  Check, 
  ExternalLink,
  Sparkles,
  Award
} from "lucide-react";

export default function ResearchPage() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const publicationSteps = [
    {
      step: "01",
      title: "Isolate The Empirical Gap",
      desc: "Don't write another generic survey paper that nobody reads. Find a specific real-world bottleneck: why does model inferencing lag on budget Android phones? Why do mesh packets drop in concrete stairwells? Measure the exact pain point."
    },
    {
      step: "02",
      title: "Run Real Benchmarks",
      desc: "Collect authentic experimental data across physical devices. Run 100 iterations, calculate standard deviations, and generate crisp vector charts using Python and Matplotlib."
    },
    {
      step: "03",
      title: "Faculty Advisor Review",
      desc: "Our faculty advisor Mrs. Chaitrali Mam and senior club co-authors review the LaTeX formatting, citation integrity, mathematical proofs, and abstract impact."
    },
    {
      step: "04",
      title: "Conference Stage Defense",
      desc: "Submit to IEEE, ACM, or VTU regional proceedings. Defend your slides in front of university professors and publish your first indexed paper before graduation."
    }
  ];

  const papers = [
    {
      id: "paper-1",
      title: "Low-Latency Quantized Transformer Execution on Low-Power Consumer Silicon",
      authors: "Y. Koparde, S. Patil, M. Kulkarni (Invictus Systems Lab)",
      venue: "VTU Regional Computing Symposium • Best Paper Nominee",
      abstract: "Benchmarking execution speed, memory footprint, and perplexity degradation when compressing 7B parameter open models into 4-bit and 3-bit weights on commodity mobile chipsets without cloud offloading.",
      citation: "Koparde et al., 'Low-Latency Quantized Transformer Execution on Consumer Silicon', VTU Proceedings, 2026."
    },
    {
      id: "paper-2",
      title: "Deterministic Fallbacks for Distributed LoRa Mesh Sensor Topographies",
      authors: "P. Deshmukh, A. Joshi, Invictus Systems Group",
      venue: "State Technical Innovation Proceedings",
      abstract: "Simulating wireless multi-hop telemetry reliability under extreme attenuation and simulated node failures, proving a 98.4% packet delivery rate without reliance on central cellular infrastructure.",
      citation: "Deshmukh et al., 'Deterministic Fallbacks for Distributed LoRa Mesh Topographies', State Tech Proc, 2026."
    }
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#00E5FF] selection:text-black">
      {/* Sleek Floating Back Button */}
      <Link 
        href="/#opportunities" 
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white hover:border-[#00E5FF] text-xs font-bold tracking-wider transition-all shadow-xl"
      >
        <ArrowLeft size={16} />
        <span>OPPORTUNITIES</span>
      </Link>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-bold tracking-widest uppercase mb-6"
        >
          <BookOpen size={14} />
          <span>INVICTUS RESEARCH DIVISION</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.9] text-white max-w-5xl"
        >
          UNDERGRADS PUBLISHING <span className="text-[#00E5FF]">REAL PAPERS.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-zinc-400 font-medium max-w-2xl mt-8 leading-relaxed"
        >
          You don&apos;t need a master&apos;s degree to contribute to computer science. We partner students with faculty mentors to structure, benchmark, and publish peer-reviewed papers.
        </motion.p>
      </section>

      {/* INTERACTIVE 4-STAGE PUBLISHING ROADMAP */}
      <section className="py-16 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00E5FF] block mb-2">
            THE PUBLISHING BLUEPRINT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            How Students Actually Publish
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Click through the 4 stages from initial hypothesis to indexed conference proceedings.
          </p>
        </div>

        {/* Step Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {publicationSteps.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                activeStep === i
                  ? "bg-[#00E5FF]/15 border-[#00E5FF] text-white"
                  : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
              }`}
            >
              <span className="text-xs font-mono font-bold text-[#00E5FF] block mb-1">Stage {s.step}</span>
              <h4 className="font-bold text-sm text-white">{s.title}</h4>
            </button>
          ))}
        </div>

        {/* Active Stage Card */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-4xl mx-auto"
        >
          <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-widest block mb-2">
            STAGE 0{activeStep + 1} DEEP DIVE
          </span>
          <h3 className="text-2xl sm:text-4xl font-black uppercase text-white mb-4">
            {publicationSteps[activeStep].title}
          </h3>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {publicationSteps[activeStep].desc}
          </p>
        </motion.div>
      </section>

      {/* RECENT PAPERS SHOWCASE */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00E5FF] block mb-2">
            PEER-REVIEWED ARCHIVE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Recent Publications & Preprints
          </h2>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {papers.map((paper) => (
            <div key={paper.id} className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-900">
                <span className="text-xs font-mono text-[#00E5FF] font-semibold">{paper.venue}</span>
                <button
                  onClick={() => handleCopy(paper.id, paper.citation)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors self-start sm:self-auto"
                >
                  {copiedId === paper.id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  <span>{copiedId === paper.id ? "Citation Copied!" : "Copy BibTeX Citation"}</span>
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">{paper.title}</h3>
              <p className="text-xs font-mono text-zinc-400">Authors: {paper.authors}</p>
              
              <div className="p-4 rounded-2xl bg-black border border-zinc-900 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                <span className="font-bold text-zinc-500 uppercase tracking-wider block mb-1">Abstract:</span>
                {paper.abstract}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center border-t border-zinc-900 bg-black">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            Have An Algorithmic Hypothesis?
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Bring your paper draft or research proposal to our lab syncs. We help with LaTeX formatting, citation reviews, and faculty co-author connections.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#00E5FF] text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-full shadow-[0_0_25px_rgba(0,229,255,0.3)]"
            >
              Join Research Sync via WhatsApp
            </a>
            <Link 
              href="/#opportunities" 
              className="w-full sm:w-auto px-8 py-4 border border-zinc-800 text-zinc-300 font-bold tracking-widest uppercase text-xs hover:border-white hover:text-white transition-all rounded-full"
            >
              All Opportunities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
