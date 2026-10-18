/* eslint-disable */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Cpu, 
  Server, 
  Layers, 
  ShieldCheck, 
  Terminal, 
  ExternalLink,
  Flame,
  Zap,
  FolderGit2
} from "lucide-react";

export default function ProjectContestsPage() {
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    liveUrl: true,
    cleanConsole: true,
    readme: true
  });
  const [activeProject, setActiveProject] = useState<number>(0);

  const checklistItems = [
    { id: "liveUrl", label: "Live Production URL on HTTPS (No localhost:3000 on projector)" },
    { id: "cleanConsole", label: "Zero Red Console Errors during the entire live walkthrough" },
    { id: "responsive", label: "Mobile Responsive Layout (Tested on actual phones)" },
    { id: "readme", label: "Clean GitHub README with Architecture Diagram & Setup Script" },
    { id: "seedData", label: "Automated Database Seed Command for 50+ realistic records" },
    { id: "videoBackup", label: "60-Second Offline Video Demo in case convention center Wi-Fi drops" }
  ];

  const totalChecked = Object.values(checklist).filter(Boolean).length;
  const scorePercent = Math.round((totalChecked / checklistItems.length) * 100);

  const toggleCheck = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getScoreVerdict = () => {
    if (scorePercent <= 33) return { text: "Average College Project (Judges will forget in 5 minutes)", color: "text-zinc-500" };
    if (scorePercent <= 66) return { text: "Good Project (Top 10% in Department Exhibition)", color: "text-[#FFD60A]" };
    return { text: "Invictus Tier (1st Place Contender & Trophy Ready)", color: "text-[#D90429]" };
  };

  const showcases = [
    {
      title: "Distributed Video Transcoding Engine",
      dept: "Final Year Capstone • 1st Prize Winner",
      stack: ["Go", "Redis Streams", "Docker", "FFmpeg"],
      before: "Students manually uploaded video files to a slow Python script that locked the UI for 3 minutes.",
      after: "Engineered a chunked parallel transcode worker cluster that slices 4K footage and streams it in sub-5 seconds.",
      judgeReaction: "“Better than most corporate enterprise tools we see in industrial audits.”"
    },
    {
      title: "Zero-Knowledge Student Credential Proofs",
      dept: "Inter-College Project Expo • Best Architecture",
      stack: ["Rust", "Circom", "Next.js", "WebAssembly"],
      before: "Printing out physical mark sheets and stamping photocopies at the registrar office.",
      after: "Cryptographic zk-proof allowing students to prove aggregate GPA > 8.5 without exposing any individual semester marks.",
      judgeReaction: "“Remarkable technical depth for undergraduate engineering students.”"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D90429] selection:text-white">
      {/* Sleek Floating Back Button */}
      <Link 
        href="/#opportunities" 
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white hover:border-[#D90429] text-xs font-bold tracking-wider transition-all shadow-xl"
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D90429]/30 bg-[#D90429]/10 text-[#D90429] text-xs font-bold tracking-widest uppercase mb-6"
        >
          <FolderGit2 size={14} />
          <span>INVICTUS CAPSTONE CLINIC</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.9] text-white max-w-5xl"
        >
          TIRED OF BORING <span className="text-[#D90429]">COLLEGE PROJECTS?</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-zinc-400 font-medium max-w-2xl mt-8 leading-relaxed"
        >
          Most semester project exhibitions are full of cloned tutorials and broken code. We help you build production-ready systems that leave evaluators speechless.
        </motion.p>
      </section>

      {/* INTERACTIVE PROJECT AUDIT CHECKLIST */}
      <section className="py-16 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#D90429] uppercase tracking-widest block mb-1">
                SELF-ASSESSMENT TOOL
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Project Exhibition Audit Checklist
              </h3>
            </div>
            <div className="text-right self-start sm:self-auto">
              <span className="text-3xl sm:text-4xl font-mono font-black text-white">{scorePercent}%</span>
              <span className="text-xs font-mono text-zinc-500 block">Readiness Score</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden mb-6">
            <motion.div 
              className="h-full bg-[#D90429]"
              initial={{ width: 0 }}
              animate={{ width: `${scorePercent}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className={`text-xs sm:text-sm font-bold font-mono mb-8 ${getScoreVerdict().color}`}>
            Verdict: {getScoreVerdict().text}
          </div>

          {/* Interactive Checkbox List */}
          <div className="space-y-3">
            {checklistItems.map(item => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                  checklist[item.id]
                    ? "bg-[#D90429]/10 border-[#D90429]/40 text-white"
                    : "bg-black/60 border-zinc-900 text-zinc-400 hover:border-zinc-800"
                }`}
              >
                <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                  checklist[item.id] ? "bg-[#D90429] border-[#D90429] text-white" : "border-zinc-700"
                }`}>
                  {checklist[item.id] && <CheckCircle2 size={14} className="stroke-[3]" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER CASE STUDIES */}
      <section className="py-20 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D90429] block mb-2">
            THE INVICTUS UPGRADE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            From Tutorial Clone To Showstopper
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            See how Invictus mentors took student final year capstone projects and turned them into award-winning systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {showcases.map((proj, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#D90429] uppercase tracking-wider block mb-1">
                  {proj.dept}
                </span>
                <h3 className="text-2xl font-black text-white">{proj.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {proj.stack.map((s, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-900 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30">
                  <span className="text-xs font-bold text-red-400 block mb-1">Initial Draft:</span>
                  <p className="text-zinc-400">{proj.before}</p>
                </div>

                <div className="p-4 rounded-xl bg-green-950/20 border border-green-900/30">
                  <span className="text-xs font-bold text-green-400 block mb-1">Invictus Architecture Overhaul:</span>
                  <p className="text-zinc-200">{proj.after}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black border border-zinc-900 text-xs text-zinc-400 font-mono italic">
                Evaluator Comment: {proj.judgeReaction}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center border-t border-zinc-900 bg-black">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            Get Your Code Pre-Audited.
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Don&apos;t wait for the exhibition jury to find your bugs. Bring your repository to Invictus leads for a stress test and architecture review.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://chat.whatsapp.com/EKzm2FVmGWr6nOSf66MdQz"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#D90429] text-white font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-black transition-all rounded-full shadow-[0_0_25px_rgba(217,4,41,0.3)]"
            >
              Request Project Review via WhatsApp
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
