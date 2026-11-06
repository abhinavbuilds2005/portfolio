import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';
import { EditorialOrbitalDisc } from './EditorialOrbitalDisc';

interface HeroPhrase {
  tag: string;
  action: string;
  result: string;
  color: string;
  discipline: string;
}

const PHRASES: HeroPhrase[] = [
  { tag: 'AI', action: 'feel', result: 'useful.', color: '#315CFF', discipline: 'APPLIED MACHINE LEARNING' },
  { tag: 'MODELS', action: 'feel', result: 'dependable.', color: '#315CFF', discipline: 'REPRODUCIBLE INFERENCE' },
  { tag: 'VISION', action: 'feel', result: 'explainable.', color: '#F0784B', discipline: 'IMAGE FORENSICS & ELA' },
  { tag: 'SYSTEMS', action: 'feel', result: 'resilient.', color: '#132532', discipline: 'PRODUCTION MLOPS PIPELINES' },
];

export const EditorialHero: React.FC = () => {
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
    <section className="relative min-h-[92vh] pt-28 sm:pt-32 pb-16 px-6 sm:px-12 flex flex-col justify-between max-w-7xl mx-auto overflow-hidden">
      {/* ========================================================================= */}
      {/* ASYMMETRIC INTERACTIVE EDITORIAL RADAR ORBITAL SYSTEM (Right Hero Space)  */}
      {/* ========================================================================= */}
      <div className="absolute top-12 right-[-100px] sm:right-[-40px] md:right-0 lg:right-6 xl:right-12 pointer-events-auto z-0 opacity-80 sm:opacity-100 scale-90 sm:scale-100 lg:scale-105 transition-all">
        <EditorialOrbitalDisc />
      </div>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA: EDITORIAL HEADLINE & KINETIC TEXT ANIMATION           */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-3xl lg:max-w-4xl">
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
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[-0.035em] leading-[0.92] text-[#132532] font-sans"
        >
          {/* Line 1: Making (Interactive Scramble) */}
          <div
            onMouseEnter={triggerScramble}
            className="block cursor-pointer select-none transition-transform duration-200 hover:translate-x-1"
            title="Hover to scramble"
          >
            {makingWord}
          </div>

          {/* Line 2: [AI / MODELS / VISION / SYSTEMS] feel */}
          <div className="flex items-baseline flex-wrap gap-x-3 sm:gap-x-5 py-1">
            <div className="relative inline-block overflow-hidden align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`tag-${phraseIndex}`}
                  initial={{ y: 40, opacity: 0, rotateX: -30 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -40, opacity: 0, rotateX: 30 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onClick={nextPhrase}
                  className="text-stroke-ink text-transparent inline-block cursor-pointer select-none hover:text-[#132532] transition-colors"
                  title="Click to cycle next term"
                >
                  {currentPhrase.tag}
                </motion.span>
              </AnimatePresence>
            </div>
            <span>feel</span>
          </div>

          {/* Line 3: useful. / dependable. / explainable. / resilient. */}
          <div className="relative block overflow-hidden py-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`result-${phraseIndex}`}
                initial={{ y: 45, opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -45, opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
                style={{ color: currentPhrase.color }}
              >
                {currentPhrase.result}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mission Statement Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg sm:text-xl text-[#132532] text-opacity-90 font-normal leading-relaxed max-w-2xl mt-8"
        >
          I'm Abhinav — a computer science student focused on building practical machine
          learning systems, computer vision tools, and thoughtful software. Less hype. More
          things that work.
        </motion.p>

        {/* Interactive Cycle Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-3 flex items-center gap-2 font-mono text-[11px] text-[#132532]/60"
        >
          <button
            onClick={nextPhrase}
            className="inline-flex items-center gap-1.5 text-[#315CFF] hover:underline cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 animate-[spin_8s_linear_infinite]" />
            <span>Cycle philosophy ({phraseIndex + 1}/{PHRASES.length})</span>
          </button>
        </motion.div>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8"
        >
          {/* Primary CTA with Persimmon Drop Shadow */}
          <a
            href="#work"
            className="btn-editorial-primary text-xs sm:text-sm"
          >
            <span>EXPLORE SELECTED WORK</span>
            <ArrowDownRight className="w-4 h-4 text-white" />
          </a>

          {/* Secondary Outline CTA */}
          <a
            href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial-outline text-xs sm:text-sm"
          >
            <span>VIEW RÉSUMÉ</span>
            <ExternalLink className="w-4 h-4 text-[#132532]" />
          </a>
        </motion.div>
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
        </div>

        {/* Right Column: Based in */}
        <div className="sm:col-span-4 font-mono text-xs sm:text-sm space-y-1">
          <div className="text-[#315CFF] font-semibold tracking-wider uppercase text-[11px] sm:text-xs">
            Based in
          </div>
          <div className="text-[#132532] font-medium">
            Punjab, India · Class of 2029
          </div>
          <div className="text-[#132532]/65 text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for AI/ML Internships</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
