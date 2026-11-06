import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight, ExternalLink, Sparkles, RefreshCw, Cpu, Zap, Binary } from 'lucide-react';
import { EditorialOrbitalDisc } from './EditorialOrbitalDisc';
import { MagneticButton } from './MagneticButton';

interface HeroPhrase {
  tag: string;
  action: string;
  result: string;
  color: string;
  discipline: string;
}

const PHRASES: HeroPhrase[] = [
  { tag: 'AI', action: 'feel', result: 'useful.', color: '#315CFF', discipline: 'APPLIED MACHINE LEARNING & STATS' },
  { tag: 'INFERENCE', action: 'feel', result: '<42ms.', color: '#315CFF', discipline: 'LOW-LATENCY ONNX & FASTAPI' },
  { tag: 'FORENSICS', action: 'feel', result: 'tamper-evident.', color: '#F0784B', discipline: 'IMAGE FORENSICS & ELA LAB' },
  { tag: 'PIPELINES', action: 'feel', result: 'deterministic.', color: '#132532', discipline: 'PRODUCTION MLOPS & DOCKER' },
  { tag: 'MODELS', action: 'feel', result: 'dependable.', color: '#315CFF', discipline: 'REPRODUCIBLE PYTORCH ARCHITECTURES' },
  { tag: 'SYSTEMS', action: 'feel', result: 'resilient.', color: '#F0784B', discipline: 'VERHOEFF CRYPTOGRAPHY & SIH\'26' },
];

interface EditorialHeroProps {
  onOpenResume?: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ onOpenResume }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const [makingWord, setMakingWord] = useState('Making');

  // Rotate headline phrases every 3.6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  const currentPhrase = PHRASES[phraseIndex];

  // Interactive scramble effect on hover
  const triggerScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    const original = 'Making';
    const glyphs = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789_#@%';
    let iteration = 0;

    const interval = setInterval(() => {
      setMakingWord(
        original
          .split('')
          .map((char, idx) => {
            if (idx < iteration) return original[idx];
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('')
      );
      if (iteration >= original.length) {
        clearInterval(interval);
        setMakingWord(original);
        setIsScrambling(false);
      }
      iteration += 1 / 2;
    }, 35);
  };

  const nextPhrase = () => {
    setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
  };

  return (
    <section className="relative min-h-[92vh] pt-28 sm:pt-32 pb-16 px-6 sm:px-12 flex flex-col justify-between max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* MAIN HERO GRID: ASYMMETRIC 2-COLUMN LAYOUT (PERFECT BREATHING ROOM)       */}
      {/* ========================================================================= */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-12 items-center my-auto w-full">
        {/* LEFT COLUMN: Editorial Kinetic Headline, Mission & CTA (Cols 1-7) */}
        <div className="lg:col-span-7 xl:col-span-7 max-w-2xl">
          {/* Kicker tag with Live Discipline Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#F0784B]">
              INDEPENDENT MIND, ENGINEERED SYSTEMS — 2026
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#132532]/20" />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentPhrase.discipline}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-[11px] font-bold tracking-wider text-[#315CFF] uppercase hidden sm:inline-block bg-[#315CFF]/8 px-2 py-0.5 border border-[#315CFF]/15"
              >
                {currentPhrase.discipline}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Giant Editorial Kinetic Headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.5rem] 2xl:text-[5.25rem] font-extrabold tracking-[-0.035em] leading-[0.98] text-[#132532] font-sans"
          >
            {/* Line 1: Making (Interactive Scramble) */}
            <div
              onMouseEnter={triggerScramble}
              className="block cursor-pointer select-none transition-transform duration-200 hover:translate-x-1"
              title="Hover to scramble"
            >
              {makingWord}
            </div>

            {/* Line 2: Animated Focus Domain [AI / INFERENCE / FORENSICS / PIPELINES / MODELS / SYSTEMS] */}
            <div className="relative block overflow-hidden py-0.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tag-${phraseIndex}`}
                  initial={{ y: 35, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -35, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={nextPhrase}
                  className="text-[#315CFF] inline-block cursor-pointer select-none hover:text-[#2047E5] transition-colors"
                  title="Click to cycle next architecture"
                >
                  {currentPhrase.tag}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Line 3: feel [useful. / <42ms. / tamper-evident. / deterministic. / dependable. / resilient.] */}
            <div className="flex items-baseline flex-wrap gap-x-3 sm:gap-x-4 py-0.5">
              <span className="text-[#132532]">feel</span>
              <div className="relative inline-block overflow-hidden align-baseline">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`result-${phraseIndex}`}
                    initial={{ y: 35, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -35, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                    style={{ color: currentPhrase.color }}
                  >
                    {currentPhrase.result}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Mission Statement Subtitle with High-Density Technical Depth */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base sm:text-lg lg:text-xl text-[#132532] text-opacity-90 font-normal leading-relaxed max-w-xl mt-6 sm:mt-8"
          >
            I'm Abhinav — an AI/ML engineering student architecting <strong className="font-semibold text-[#132532]">multimodal computer vision</strong>, <strong className="font-semibold text-[#132532]">forensic tamper detection (ELA)</strong>, and <strong className="font-semibold text-[#132532]">low-latency model inference (&lt;42ms FastAPI + ONNX)</strong>. Focused on deterministic pipelines, cryptographic checksums, and mathematically grounded architectures.
          </motion.p>

          {/* Live Technical Competency Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-5 font-mono text-xs"
          >
            <span className="text-[#F0784B] font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 mr-1">
              <Cpu className="w-3.5 h-3.5 text-[#315CFF]" />
              <span>ARSENAL //</span>
            </span>
            {[
              'PyTorch',
              'FastAPI · <42ms',
              'OpenCV Forensics',
              'ONNX Runtime',
              'Error Level Analysis (ELA)',
              'Verhoeff D5 Checksum',
              'Docker',
              'Scikit-Learn',
            ].map((term) => (
              <span
                key={term}
                className="bg-[#FAF8F5] border border-[#132532]/15 text-[#132532] px-2.5 py-1 text-[11px] font-medium shadow-[1px_1px_0px_rgba(19,37,50,0.06)] hover:border-[#315CFF] hover:bg-[#315CFF]/5 transition-colors cursor-default"
              >
                {term}
              </span>
            ))}
          </motion.div>

          {/* Interactive Cycle Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 flex items-center gap-2 font-mono text-[11px] text-[#132532]/60"
          >
            <button
              onClick={nextPhrase}
              className="inline-flex items-center gap-1.5 text-[#315CFF] hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 animate-[spin_8s_linear_infinite]" />
              <span>Cycle architecture ({phraseIndex + 1}/{PHRASES.length})</span>
            </button>
          </motion.div>

          {/* CTA Button Group with Magnetic Pull Physics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8"
          >
            {/* Primary CTA with Persimmon Drop Shadow */}
            <MagneticButton strength={0.3}>
              <a
                href="#work"
                className="btn-editorial-primary text-xs sm:text-sm"
              >
                <span>EXPLORE SELECTED WORK</span>
                <ArrowDownRight className="w-4 h-4 text-white" />
              </a>
            </MagneticButton>

            {/* Secondary Outline CTA */}
            <MagneticButton strength={0.3}>
              {onOpenResume ? (
                <button
                  onClick={onOpenResume}
                  className="btn-editorial-outline text-xs sm:text-sm cursor-pointer"
                >
                  <span>VIEW RÉSUMÉ</span>
                  <ExternalLink className="w-4 h-4 text-[#132532]" />
                </button>
              ) : (
                <a
                  href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-outline text-xs sm:text-sm"
                >
                  <span>VIEW RÉSUMÉ</span>
                  <ExternalLink className="w-4 h-4 text-[#132532]" />
                </a>
              )}
            </MagneticButton>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Interactive 3D Radar Orbital System (Cols 8-12) */}
        <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end items-center pointer-events-auto py-8 lg:py-0">
          <EditorialOrbitalDisc />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* META PROFILE BAR (Matching Bottom of Reference Image 1)                   */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="relative z-10 pt-16 mt-8 border-t border-[#132532]/10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start"
      >
        {/* Left Column: Avatar Photo Card */}
        <div className="sm:col-span-3 flex items-center gap-4">
          <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-none border border-[#132532]/20 bg-white p-1 shadow-sm overflow-hidden flex-shrink-0">
            <img
              src="/abhinav.png"
              alt="Abhinav Anand"
              className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
              loading="eager"
            />
          </div>
          <div className="sm:hidden font-mono text-xs">
            <div className="text-[#315CFF] font-semibold uppercase">Abhinav Anand</div>
            <div className="text-[#132532]/70 text-[11px]">B.Tech CSE (AI/ML)</div>
          </div>
        </div>

        {/* Middle Column: Currently */}
        <div className="sm:col-span-5 font-mono text-xs sm:text-sm space-y-1">
          <div className="text-[#315CFF] font-semibold tracking-wider uppercase text-[11px] sm:text-xs">
            Currently
          </div>
          <div className="text-[#132532] font-medium">
            B.Tech CSE · AI & Machine Learning
          </div>
          <div className="text-[#132532]/65 text-xs">
            Lovely Professional University
          </div>
          <div className="text-[#F0784B] text-[11px] font-mono font-medium pt-0.5">
            Focus: Multimodal Vision & Low-Latency MLOps
          </div>
        </div>

        {/* Right Column: Based in */}
        <div className="sm:col-span-4 font-mono text-xs sm:text-sm space-y-1">
          <div className="text-[#315CFF] font-semibold tracking-wider uppercase text-[11px] sm:text-xs">
            Status
          </div>
          <div className="text-[#132532] font-medium">
            Punjab, India · Class of 2029
          </div>
          <div className="text-[#132532]/65 text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open for AI/ML Internships (Summer 2026)</span>
          </div>
          <div className="text-[#132532]/60 text-[11px] font-mono">
            Stack: PyTorch · OpenCV · ONNX · FastAPI
          </div>
        </div>
      </motion.div>
    </section>
  );
};
