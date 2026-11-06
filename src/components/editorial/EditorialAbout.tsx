import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2, Database, Terminal, FileCheck, ExternalLink } from 'lucide-react';

const CountingNumber: React.FC<{ target: number; prefix?: string; pad?: boolean }> = ({
  target,
  prefix = '',
  pad = false,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    let start = Math.max(0, target - 12);
    if (target > 2000) start = target - 9; // E.g. start at 2020 for 2029

    let current = start;
    const duration = 1200; // ms
    const steps = target - start;
    const stepTime = Math.max(30, Math.floor(duration / (steps || 1)));

    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= target) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  const display = pad ? String(count).padStart(2, '0') : String(count);

  return (
    <div ref={ref} className="text-6xl sm:text-7xl font-extrabold text-[#315CFF] tracking-tight font-sans mb-2 tabular-nums">
      {prefix}{display || (pad ? '01' : target)}
    </div>
  );
};

export const EditorialAbout: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#132532]/10">
      {/* Top Header Row with Kicker & Annotation */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-10">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#F0784B] block mb-3">
            02 / THE PERSON BEHIND THE BUILDS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#132532] font-sans leading-[1.05]">
            Curious by default.
            <br />
            Practical by design.
          </h2>
        </div>

        {/* Top-Right Editorial Annotation */}
        <div className="font-mono text-xs uppercase tracking-wider text-[#132532]/50 text-left sm:text-right pt-2">
          <div>A SHORT INTRO</div>
          <div>NOT A MANIFESTO</div>
        </div>
      </div>

      {/* Main Narrative Area */}
      <div className="max-w-4xl mt-12 space-y-8">
        {/* Highlight Lead Quote */}
        <p className="text-2xl sm:text-3xl font-semibold text-[#132532] leading-snug">
          I like the space where{' '}
          <span className="text-[#315CFF]">models meet messy reality —</span>{' '}
          imperfect data, latency, deployment and the details that make a prototype useful.
        </p>

        {/* Body Paragraphs */}
        <div className="text-base sm:text-lg text-[#132532] text-opacity-90 leading-relaxed space-y-6 pt-4">
          <p>
            I'm pursuing a B.Tech in Computer Science and Engineering with a specialization in AI &
            Machine Learning at Lovely Professional University. My work spans predictive modelling,
            computer vision, NLP and full-stack interfaces for AI products.
          </p>
          <p>
            I care about understanding why a system works, how it fails, and what it takes to make it
            dependable. Currently sharpening my engineering fundamentals and building projects that
            demonstrate that mindset.
          </p>
        </div>
      </div>

      {/* Bottom 3-Column Metrics Grid (Matching Image 4) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 pt-8 border-t border-[#132532]/12 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#132532]/12"
      >
        {/* Metric 1 */}
        <div className="py-6 sm:py-0 sm:pr-8">
          <CountingNumber target={5} pad={true} />
          <div className="font-mono text-xs uppercase tracking-widest text-[#132532]/70 font-semibold">
            PROJECT SYSTEMS
          </div>
        </div>

        {/* Metric 2 */}
        <div className="py-6 sm:py-0 sm:px-8">
          <CountingNumber target={2029} />
          <div className="font-mono text-xs uppercase tracking-widest text-[#132532]/70 font-semibold">
            GRADUATION YEAR
          </div>
        </div>

        {/* Metric 3 */}
        <div className="py-6 sm:py-0 sm:pl-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl sm:text-7xl font-extrabold text-[#315CFF] tracking-tight font-sans mb-2 flex items-baseline gap-2"
          >
            <span>AI</span>
            <span className="text-[#F0784B] font-mono text-5xl">×</span>
          </motion.div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#132532]/70 font-semibold">
            SOFTWARE ENGINEERING
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* VERIFIED ACCREDITATIONS & TECHNICAL CREDENTIALS                           */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-20 pt-12 border-t border-[#132532]/12"
      >
        {/* Accreditation Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#F0784B] block mb-2">
              ACCREDITATIONS & HONORS
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#132532] font-sans">
              Verified Technical Credentials.
            </h3>
          </div>
          <div className="font-mono text-xs text-[#132532]/70 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold uppercase tracking-wider">3 Independent Certifications Verified</span>
          </div>
        </div>

        {/* 3-Card Accreditation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Credential 1: Smart India Hackathon 2026 */}
          <div className="bg-[#FAF8F5] border border-[#132532]/15 p-6 flex flex-col justify-between hover:border-[#F0784B] hover:shadow-[4px_4px_0px_#F0784B] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase bg-[#F0784B]/10 text-[#F0784B] px-2.5 py-1 border border-[#F0784B]/20">
                  NATIONAL QUALIFIER
                </span>
                <span className="font-mono text-xs text-[#132532]/50 font-bold">2026</span>
              </div>
              <h4 className="text-lg font-bold text-[#132532] font-sans group-hover:text-[#F0784B] transition-colors mb-1">
                Smart India Hackathon 2026
              </h4>
              <p className="font-mono text-xs text-[#315CFF] font-semibold mb-3">
                Problem Statement: SIH26188
              </p>
              <p className="text-xs text-[#132532]/75 leading-relaxed mb-4">
                Qualified with <em>DocuShield AI</em> — Multimodal Image & Document Forensic Screening System detecting digital tampering across 5 ID formats using ELA, ORB, and Verhoeff D5 cryptography.
              </p>
            </div>
            <div className="pt-4 border-t border-[#132532]/10 flex items-center justify-between font-mono text-[11px]">
              <span className="text-[#132532]/60 font-medium">Ministry of Education / AICTE</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          {/* Credential 2: HackerRank SQL Advanced */}
          <div className="bg-[#FAF8F5] border border-[#132532]/15 p-6 flex flex-col justify-between hover:border-[#315CFF] hover:shadow-[4px_4px_0px_#315CFF] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase bg-[#315CFF]/10 text-[#315CFF] px-2.5 py-1 border border-[#315CFF]/20 flex items-center gap-1">
                  <Database className="w-3 h-3 text-[#315CFF]" />
                  <span>GOLD BADGE · 5★</span>
                </span>
                <span className="font-mono text-xs text-[#132532]/50 font-bold">VERIFIED</span>
              </div>
              <h4 className="text-lg font-bold text-[#132532] font-sans group-hover:text-[#315CFF] transition-colors mb-1">
                HackerRank SQL (Advanced)
              </h4>
              <p className="font-mono text-xs text-[#315CFF] font-semibold mb-3">
                Complex Relational Modeling & Optimization
              </p>
              <p className="text-xs text-[#132532]/75 leading-relaxed mb-4">
                Rigorous evaluation across recursive Common Table Expressions (CTEs), window functions, nested subqueries, query execution plan optimization, and multi-table integrity indexing.
              </p>
            </div>
            <div className="pt-4 border-t border-[#132532]/10 flex items-center justify-between font-mono text-[11px]">
              <span className="text-[#132532]/60 font-medium">HackerRank Certified</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          {/* Credential 3: Infosys Springboard Python */}
          <div className="bg-[#FAF8F5] border border-[#132532]/15 p-6 flex flex-col justify-between hover:border-[#10B981] hover:shadow-[4px_4px_0px_#10B981] transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-700 px-2.5 py-1 border border-emerald-500/20 flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-emerald-600" />
                  <span>PROFESSIONAL</span>
                </span>
                <span className="font-mono text-xs text-[#132532]/50 font-bold">VERIFIED</span>
              </div>
              <h4 className="text-lg font-bold text-[#132532] font-sans group-hover:text-emerald-700 transition-colors mb-1">
                Infosys Springboard Python
              </h4>
              <p className="font-mono text-xs text-[#315CFF] font-semibold mb-3">
                Object-Oriented Architecture & Systems
              </p>
              <p className="text-xs text-[#132532]/75 leading-relaxed mb-4">
                Assessed on object-oriented programming architecture, memory references, asymptotic time complexity analysis, algorithm design, and robust error-handling paradigms.
              </p>
            </div>
            <div className="pt-4 border-t border-[#132532]/10 flex items-center justify-between font-mono text-[11px]">
              <span className="text-[#132532]/60 font-medium">Infosys Springboard</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

