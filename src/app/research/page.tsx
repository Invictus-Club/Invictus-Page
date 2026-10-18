/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  FileText, 
  BookOpen, 
  Copy, 
  Check, 
  Waves, 
  Trees, 
  ArrowRight,
  Compass
} from "lucide-react";

// Procedural Neural Data River Canvas (River Animation)
function NeuralRiverCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    resize();
    window.addEventListener("resize", resize);

    const streams: { y: number; speed: number; amp: number; freq: number }[] = [];
    for (let i = 0; i < 8; i++) {
      streams.push({
        y: 60 + i * 40,
        speed: 1.5 + Math.random() * 2,
        amp: 12 + Math.random() * 15,
        freq: 0.01 + Math.random() * 0.015
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      time += 0.025;

      // Dark River Depths
      ctx.fillStyle = "#01080d";
      ctx.fillRect(0, 0, w, h);

      // Flowing Currents
      streams.forEach((s, idx) => {
        ctx.strokeStyle = idx % 2 === 0 ? "rgba(0, 229, 255, 0.25)" : "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = idx % 2 === 0 ? 2 : 1;
        ctx.beginPath();
        for (let x = 0; x < w; x += 15) {
          const cy = s.y + Math.sin(x * s.freq + time * s.speed) * s.amp;
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.stroke();
      });

      // Drifting Data Spores
      for (let i = 0; i < 25; i++) {
        const px = ((i * 45 + time * 60) % (w + 40)) - 20;
        const py = (h * 0.2) + ((i * 97) % (h * 0.6)) + Math.sin(time + i) * 10;
        ctx.fillStyle = "#00E5FF";
        ctx.shadowColor = "#00E5FF";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />;
}

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

      {/* HERO SECTION WITH NEURAL DATA RIVER CANVAS */}
      <section className="relative h-[85vh] sm:h-screen flex flex-col items-center justify-center overflow-hidden border-b border-zinc-900 px-6">
        <NeuralRiverCanvas />

        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,229,255,0.2)]"
          >
            <Waves size={14} />
            <span>THE UNCHARTERED DATA RIVER // INVICTUS RESEARCH</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-white"
          >
            NAVIGATE THE <span className="text-[#00E5FF]">DATA RIVER.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg md:text-xl text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Venturing into research territory where no undergrad textbook has gone. Formulate hypotheses, collect empirical benchmarks, and publish peer-reviewed papers.
          </motion.p>
        </div>
      </section>

      {/* 4-STAGE PUBLISHING ROADMAP */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00E5FF] block mb-2">
            THE PUBLISHING BLUEPRINT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            How Students Actually Publish
          </h2>
        </div>

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

        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-4xl mx-auto"
        >
          <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-widest block mb-2">
            STAGE 0{activeStep + 1} INTEL
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mb-4">
            {publicationSteps[activeStep].title}
          </h3>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {publicationSteps[activeStep].desc}
          </p>
        </motion.div>
      </section>

      {/* PAPERS ARCHIVE */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
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
                {paper.abstract}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL HIGH-ENERGY CTA */}
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
