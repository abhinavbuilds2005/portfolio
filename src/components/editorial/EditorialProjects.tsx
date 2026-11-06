import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Eye, 
  Sliders, 
  CheckCircle2, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  Layers,
  ArrowRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { Project } from '../../lib/types';
import { MagneticButton } from './MagneticButton';

interface EditorialProjectsProps {
  onOpenCaseStudy?: (project: Project) => void;
}

export const EditorialProjects: React.FC<EditorialProjectsProps> = ({ onOpenCaseStudy }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [speed, setSpeed] = useState<1 | 2>(1);
  const [timerProgress, setTimerProgress] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // State for DocuShield ELA reveal interactive slider
  const [elaSliderPos, setElaSliderPos] = useState(50);
  const [activeTab, setActiveTab] = useState<'interface' | 'ela'>('interface');

  // Auto-running horizontal slide loop
  useEffect(() => {
    if (!isPlaying || isHovered) {
      return;
    }

    const intervalDuration = speed === 1 ? 40 : 20; // 40ms * 100 = 4000ms (~4 seconds per project slide)
    const timer = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev >= 100) {
          setDirection(1);
          setCurrentIndex((curr) => (curr + 1) % PROJECTS.length);
          return 0;
        }
        return prev + 1;
      });
    }, intervalDuration);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, speed]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    setTimerProgress(0);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    setTimerProgress(0);
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setTimerProgress(0);
  };

  const activeProject = PROJECTS[currentIndex];

  // Slide animation variants for horizontal motion
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section id="work" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto select-none">
      {/* ========================================================================= */}
      {/* SECTION HEADER WITH SLIDER METRICS & LIVE COUNTER                         */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#132532]/10 pb-6 mb-10 gap-6">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#F0784B] flex items-center gap-2 mb-2">
            <Layers className="w-3.5 h-3.5 text-[#F0784B]" />
            <span>01 / SELECTED WORK · PRODUCTION SYSTEMS</span>
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#132532] font-sans">
            Engineered Systems.
          </h2>
        </div>
        <p className="font-mono text-xs sm:text-sm text-[#132532]/80 max-w-md">
          Production-grade machine learning pipelines, forensic document screening, and resilient AI architectures with verified statistical benchmarks.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* AUTO-SLIDE CONTROL CONSOLE & PROJECT NAVIGATOR BAR                         */}
      {/* ========================================================================= */}
      <div className="bg-white border border-[#132532]/15 p-4 sm:p-5 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Play/Pause & Step Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`font-mono text-xs uppercase font-bold tracking-wider px-4 py-2 flex items-center gap-2 transition-all cursor-pointer shadow-[2px_2px_0px_#132532] active:translate-x-[1px] active:translate-y-[1px] ${
              isPlaying
                ? 'bg-[#315CFF] text-white hover:bg-[#2047E5]'
                : 'bg-[#132532] text-white hover:bg-[#203444]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>AUTO SLIDE ON</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PAUSED · PLAY</span>
              </>
            )}
          </button>

          {/* Previous / Next Slide Buttons */}
          <button
            onClick={handlePrev}
            className="p-2 bg-[#FAF8F5] border border-[#132532]/20 hover:border-[#132532] text-[#132532] transition-colors cursor-pointer"
            title="Previous Project (←)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-[#FAF8F5] border border-[#132532]/20 hover:border-[#132532] text-[#132532] transition-colors cursor-pointer"
            title="Next Project (→)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Speed Toggle */}
          <button
            onClick={() => setSpeed(speed === 1 ? 2 : 1)}
            className="font-mono text-[11px] font-bold px-2.5 py-1.5 border border-[#132532]/15 hover:border-[#315CFF] text-[#132532]/80 cursor-pointer hidden sm:inline-block"
            title="Toggle Slider Velocity"
          >
            SPEED: {speed}X
          </button>
        </div>

        {/* Quick Project Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {PROJECTS.map((project, idx) => {
            const num = (idx + 1).toString().padStart(2, '0');
            const isActive = currentIndex === idx;
            return (
              <button
                key={project.id}
                onClick={() => handleSelect(idx)}
                className={`font-mono text-xs px-2.5 sm:px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#132532] text-white border-[#132532] shadow-[2px_2px_0px_#315CFF] font-bold'
                    : 'bg-[#FAF8F5] text-[#132532]/75 border-[#132532]/15 hover:border-[#132532]/40'
                }`}
              >
                <span className={isActive ? 'text-[#F0784B]' : 'text-[#315CFF]'}>
                  {num}
                </span>
                <span className="hidden lg:inline">{project.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Auto-Slide Progress Bar */}
      <div className="w-full h-1 bg-[#132532]/10 mb-8 overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-[#315CFF] to-[#F0784B]"
          style={{
            width: isPlaying && !isHovered
              ? `${((currentIndex + timerProgress / 100) / PROJECTS.length) * 100}%`
              : `${((currentIndex + 1) / PROJECTS.length) * 100}%`,
          }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* ========================================================================= */}
      {/* MAIN HORIZONTAL SLIDE SHOWCASE CARD (Expansive Showcase Deck)              */}
      {/* ========================================================================= */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden mb-12"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeProject.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="bg-white border border-[#132532]/15 shadow-sm overflow-hidden relative w-full"
          >
            {/* Top Kicker Badge - Solid Persimmon */}
            <div className="absolute top-0 left-0 z-20">
              <div className="bg-[#F0784B] text-white font-mono text-xs font-bold tracking-wider uppercase px-4 py-2 flex items-center gap-2">
                <span>
                  {String(currentIndex + 1).padStart(2, '0')} / {activeProject.categoryLabel.toUpperCase()}
                  {activeProject.id === 'docushield' ? ' · SIH 2026' : ''}
                </span>
              </div>
            </div>

            {/* Top Image Showcase Area */}
            <div className="relative bg-[#FAF8F5] border-b border-[#132532]/12 pt-14 pb-4 px-4 sm:px-8">
              {/* Controls Bar */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#132532]/60 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{activeProject.title} — Verified Interface</span>
                </span>

                {/* DocuShield ELA Toggle (if DocuShield) */}
                {activeProject.id === 'docushield' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('interface')}
                      className={`font-mono text-xs px-3 py-1 border transition-colors cursor-pointer ${
                        activeTab === 'interface'
                          ? 'bg-[#132532] text-white border-[#132532]'
                          : 'bg-white text-[#132532] border-[#132532]/20 hover:border-[#132532]'
                      }`}
                    >
                      Interface
                    </button>
                    <button
                      onClick={() => setActiveTab('ela')}
                      className={`font-mono text-xs px-3 py-1 border transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'ela'
                          ? 'bg-[#315CFF] text-white border-[#315CFF]'
                          : 'bg-white text-[#132532] border-[#132532]/20 hover:border-[#315CFF]'
                      }`}
                    >
                      <Sliders className="w-3 h-3" />
                      <span>Forensic ELA Lab</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Interactive Screen Container */}
              <div className="relative w-full aspect-[16/9] max-h-[440px] bg-white border border-[#132532]/10 overflow-hidden select-none">
                {activeProject.id === 'docushield' && activeTab === 'ela' ? (
                  /* ELA Forensic Split Scrubber */
                  <div className="relative w-full h-full overflow-hidden">
                    {/* Background: Tamper Heatmap */}
                    <img
                      src={activeProject.elaImage || activeProject.image}
                      alt="Forensic ELA Heatmap"
                      className="absolute inset-0 w-full h-full object-cover object-top filter hue-rotate-180 contrast-125"
                    />

                    {/* Foreground: Original Document Scan clipped by slider */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${elaSliderPos}%` }}
                    >
                      <img
                        src={activeProject.image}
                        alt="Original Clean Document"
                        className="absolute inset-0 w-full h-full object-cover object-top max-w-none"
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>

                    {/* Vertical Divider Line */}
                    <div
                      className="absolute top-0 bottom-0 w-[2px] bg-[#315CFF] z-10 pointer-events-none"
                      style={{ left: `${elaSliderPos}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#315CFF] text-white flex items-center justify-center shadow-md font-mono text-[10px] font-bold">
                        ↔
                      </div>
                    </div>

                    {/* Invisible input range for dragging */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={elaSliderPos}
                      onChange={(e) => setElaSliderPos(Number(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-ew-resize z-20 w-full h-full"
                      aria-label="Drag to scrub ELA compression heatmap"
                    />

                    {/* Sub-labels */}
                    <div className="absolute bottom-3 left-3 bg-[#132532]/85 text-white font-mono text-[10px] px-2.5 py-1 z-10 backdrop-blur-sm">
                      ORIGINAL DOCUMENT
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#315CFF]/90 text-white font-mono text-[10px] px-2.5 py-1 z-10 backdrop-blur-sm">
                      ELA FORENSIC HEATMAP
                    </div>
                  </div>
                ) : (
                  /* Standard High-Fidelity Project Screen with Scanline */
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-500"
                    />
                    {/* Continuous Laser Scanline Animation */}
                    <motion.div
                      animate={{ y: ['0%', '100%', '0%'] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#315CFF] to-transparent pointer-events-none shadow-[0_0_10px_#315CFF]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-3">
                <div className="font-mono text-xs uppercase tracking-wider font-semibold text-[#315CFF]">
                  {String(currentIndex + 1).padStart(2, '0')} — {activeProject.categoryLabel}
                </div>
                <div className="font-mono text-xs text-[#132532]/60">
                  SLIDE {currentIndex + 1} OF {PROJECTS.length}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#132532] font-sans mb-4">
                {activeProject.title}.
              </h3>

              {/* Summary */}
              <p className="text-base sm:text-lg text-[#132532] text-opacity-90 leading-relaxed max-w-3xl mb-8">
                {activeProject.summary}
              </p>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {activeProject.metrics.slice(0, 4).map((metric) => (
                  <div key={metric.label} className="bg-[#FAF8F5] border border-[#132532]/12 p-3">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#132532]/60 font-semibold mb-0.5">
                      {metric.label}
                    </div>
                    <div className="font-sans font-bold text-lg sm:text-xl text-[#315CFF]">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technology tags */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-10">
                {activeProject.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 bg-[#FAF8F5] border border-[#132532]/15 text-xs font-mono text-[#132532] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links Row with Magnetic Hover Physics */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#132532] border-t border-[#132532]/10 pt-6">
                {activeProject.liveUrl && (
                  <MagneticButton strength={0.25}>
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 underline underline-offset-4 decoration-2 decoration-[#132532] hover:decoration-[#315CFF] hover:text-[#315CFF] transition-colors py-1"
                    >
                      <span>LIVE SYSTEM</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </MagneticButton>
                )}

                {activeProject.repoUrl && (
                  <MagneticButton strength={0.25}>
                    <a
                      href={activeProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 underline underline-offset-4 decoration-2 decoration-[#132532] hover:decoration-[#315CFF] hover:text-[#315CFF] transition-colors py-1"
                    >
                      <span>SOURCE CODE</span>
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  </MagneticButton>
                )}

                {onOpenCaseStudy && (
                  <MagneticButton strength={0.25}>
                    <button
                      onClick={() => onOpenCaseStudy(activeProject)}
                      className="inline-flex items-center gap-1.5 underline underline-offset-4 decoration-2 decoration-[#315CFF] text-[#315CFF] hover:text-[#2047E5] transition-colors cursor-pointer py-1"
                    >
                      <span>ARCHITECTURE BREAKDOWN</span>
                      <span>↘</span>
                    </button>
                  </MagneticButton>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* HORIZONTAL THUMBNAIL TRACK (Peek & Jump Deck)                              */}
      {/* ========================================================================= */}
      <div className="relative">
        <div className="flex items-center justify-between mb-3 font-mono text-xs text-[#132532]/70 uppercase tracking-wider">
          <span>ALL PROJECTS (CLICK TO JUMP)</span>
          <span>{currentIndex + 1} / {PROJECTS.length}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {PROJECTS.map((project, idx) => {
            const num = (idx + 1).toString().padStart(2, '0');
            const isActive = currentIndex === idx;

            return (
              <button
                key={project.id}
                onClick={() => handleSelect(idx)}
                className={`text-left p-3 border transition-all cursor-pointer bg-white group ${
                  isActive
                    ? 'border-[#315CFF] shadow-[3px_3px_0px_#315CFF]'
                    : 'border-[#132532]/15 hover:border-[#132532]/40'
                }`}
              >
                <div className="relative aspect-[16/10] bg-[#FAF8F5] mb-2 overflow-hidden border border-[#132532]/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1 left-1 bg-[#132532] text-white font-mono text-[9px] px-1.5 py-0.5 font-bold">
                    {num}
                  </div>
                </div>
                <div className="font-mono text-[10px] text-[#315CFF] font-bold uppercase truncate">
                  {project.categoryLabel}
                </div>
                <div className="font-sans font-bold text-xs text-[#132532] truncate">
                  {project.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
