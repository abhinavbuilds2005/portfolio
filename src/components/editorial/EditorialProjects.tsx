import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye, Sliders, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { Project } from '../../lib/types';
import { TiltProjectCard } from './TiltProjectCard';
import { MagneticButton } from './MagneticButton';

interface EditorialProjectsProps {
  onOpenCaseStudy?: (project: Project) => void;
}

export const EditorialProjects: React.FC<EditorialProjectsProps> = ({ onOpenCaseStudy }) => {
  // State for DocuShield ELA reveal interactive slider
  const [elaSliderPos, setElaSliderPos] = useState(50);
  const [activeTab, setActiveTab] = useState<'interface' | 'ela'>('interface');

  const docushield = PROJECTS.find((p) => p.id === 'docushield') || PROJECTS[0];
  const otherProjects = PROJECTS.filter((p) => p.id !== 'docushield');

  return (
    <section id="work" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#132532]/10 pb-6 mb-16 gap-4">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#F0784B] block mb-2">
            01 / SELECTED WORK
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#132532] font-sans">
            Engineered Systems.
          </h2>
        </div>
        <p className="font-mono text-xs sm:text-sm text-[#132532] text-opacity-80 max-w-md">
          Production-grade machine learning pipelines, forensic document screening, and resilient AI architectures with verified statistical benchmarks.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* FLAGSHIP PROJECT CARD: DOCUSHIELD AI (Matching Reference Image 3)          */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="bg-white border border-[#132532]/15 shadow-sm overflow-hidden mb-20 relative"
      >
        {/* Top Kicker Badge - Solid Persimmon */}
        <div className="absolute top-0 left-0 z-20">
          <div className="bg-[#F0784B] text-white font-mono text-xs font-bold tracking-wider uppercase px-4 py-2 flex items-center gap-2">
            <span>01 / FEATURED SYSTEM · SIH 2026</span>
          </div>
        </div>

        {/* Top Image Showcase Area with Interactive ELA Reveal Slider */}
        <div className="relative bg-[#FAF8F5] border-b border-[#132532]/12 pt-14 pb-4 px-4 sm:px-8">
          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-[#132532]/60 uppercase tracking-widest">
              DocuShield AI interface
            </span>
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
          </div>

          {/* Interactive Screen Container */}
          <div className="relative w-full aspect-[16/9] max-h-[460px] bg-white border border-[#132532]/10 overflow-hidden select-none">
            {activeTab === 'interface' ? (
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={docushield.image}
                  alt="DocuShield AI Interface"
                  className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-500"
                />
                {/* Forensic Laser Scanline Animation */}
                <motion.div
                  animate={{ y: ['0%', '100%', '0%'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#315CFF] to-transparent pointer-events-none shadow-[0_0_10px_#315CFF]"
                />
              </div>
            ) : (
              /* ELA Forensic Split Scrubber */
              <div className="relative w-full h-full overflow-hidden">
                {/* Background: Tamper Heatmap */}
                <img
                  src={docushield.elaImage || docushield.image}
                  alt="Forensic ELA Heatmap"
                  className="absolute inset-0 w-full h-full object-cover object-top filter hue-rotate-180 contrast-125"
                />

                {/* Foreground: Original Document Scan clipped by slider */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${elaSliderPos}%` }}
                >
                  <img
                    src={docushield.image}
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
            )}
          </div>
        </div>

        {/* Bottom Editorial Content Area */}
        <div className="p-8 sm:p-12">
          {/* Subcategory kicker */}
          <div className="font-mono text-xs uppercase tracking-wider font-semibold text-[#315CFF] mb-3">
            01 — COMPUTER VISION / DOCUMENT FORENSICS
          </div>

          {/* Title */}
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#132532] font-sans mb-4">
            DocuShield AI.
          </h3>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#132532] text-opacity-90 leading-relaxed max-w-3xl mb-8">
            A multimodal identity-document screening system combining OCR, image forensics,
            checksum validation and evidence fusion to flag suspicious documents with explainable
            signals.
          </p>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-10">
            {docushield.tech.map((t) => (
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
            <MagneticButton strength={0.25}>
              <a
                href={docushield.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 underline underline-offset-4 decoration-2 decoration-[#132532] hover:decoration-[#315CFF] hover:text-[#315CFF] transition-colors py-1"
              >
                <span>LIVE SYSTEM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <a
                href={docushield.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 underline underline-offset-4 decoration-2 decoration-[#132532] hover:decoration-[#315CFF] hover:text-[#315CFF] transition-colors py-1"
              >
                <span>SOURCE CODE</span>
                <Github className="w-3.5 h-3.5" />
              </a>
            </MagneticButton>

            {onOpenCaseStudy && (
              <MagneticButton strength={0.25}>
                <button
                  onClick={() => onOpenCaseStudy(docushield)}
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

      {/* ========================================================================= */}
      {/* OTHER 4 PROJECTS IN EDITORIAL CARD GRID (with 3D Tilt & Cursor Spotlight)*/}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
        {otherProjects.map((project, index) => {
          const num = (index + 2).toString().padStart(2, '0');
          return (
            <TiltProjectCard
              key={project.id}
              project={project}
              num={num}
              index={index}
              onOpenCaseStudy={onOpenCaseStudy}
            />
          );
        })}
      </div>
    </section>
  );
};

