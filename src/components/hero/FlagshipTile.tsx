import React from 'react';
import { ExternalLink, Github, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../../data/projects';
import { MagneticButton } from '../shared/MagneticButton';

interface FlagshipTileProps {
  onOpenCaseStudy: (projectId: string) => void;
}

export const FlagshipTile: React.FC<FlagshipTileProps> = ({ onOpenCaseStudy }) => {
  const docushield = PROJECTS.find((p) => p.id === 'docushield') || PROJECTS[0];
  const shouldReduceMotion = useReducedMotion();

  const techTags = ["Python", "OpenCV", "EasyOCR", "FastAPI", "Docker", "Verhoeff D5"];

  const contentVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      className="scan-card flex flex-col justify-between p-6 sm:p-7 rounded border-2 border-[#e58b24]/50 dark:border-[#e58b24]/50 light:border-[#c84b31]/50 bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative overflow-hidden group card-hover-lift"
      whileHover={shouldReduceMotion ? {} : { scale: 1.005 }}
    >
      {/* ── Ambient corner glow ── */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#e58b24]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#e58b24]/10 transition-all duration-700" />
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#e58b24]/5 rounded-full blur-2xl pointer-events-none" />

      {/* ── Animated horizontal shimmer pass ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(229,139,36,0.06) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['-200% center', '200% center'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Top scanning bar ── */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#e58b24]/60 to-transparent pointer-events-none"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <div>
        {/* Top Tag & Flagship Badge */}
        <motion.div custom={0} variants={contentVariants} initial="hidden" animate="visible" className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#e58b24]/15 text-[#e58b24] border border-[#e58b24]/30">
              Flagship Project
            </span>
            <span className="font-mono text-[10px] text-[#78716c] uppercase">
              SIH 2026 // Problem SIH26188
            </span>
          </div>
          <span className="flex items-center gap-1 font-mono text-[10px] text-[#e58b24]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e58b24] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e58b24]" />
            </span>
            Live Deployment
          </span>
        </motion.div>

        {/* Project Title */}
        <motion.h2
          custom={1} variants={contentVariants} initial="hidden" animate="visible"
          className="text-xl sm:text-2xl font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-2 tracking-tight group-hover:text-[#e58b24] transition-colors duration-300"
        >
          DocuShield AI: Multimodal Forensic Screening
        </motion.h2>

        <motion.p
          custom={2} variants={contentVariants} initial="hidden" animate="visible"
          className="text-xs sm:text-sm text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed mb-4"
        >
          A multimodal forensic screening system for five ID document types. Integrates Error Level Analysis (ELA) tamper heatmaps, ORB+RANSAC copy-move verification, ICAO MRZ checksums, and facial biometric verification into an explainable forensic risk engine.
        </motion.p>

        {/* Outcome Line */}
        <motion.div
          custom={3} variants={contentVariants} initial="hidden" animate="visible"
          className="p-3 rounded border border-[#2b2a27]/80 dark:border-[#2b2a27]/80 light:border-[#e6dfd5] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] mb-4"
          whileHover={{ borderColor: 'rgba(229,139,36,0.4)' }}
        >
          <div className="font-mono text-[10px] text-[#e58b24] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Target Outcome</span>
          </div>
          <p className="text-xs text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] font-medium leading-relaxed">
            {docushield.outcome}
          </p>
        </motion.div>

        {/* Tech tags — staggered pop-in */}
        <motion.div custom={4} variants={contentVariants} initial="hidden" animate="visible" className="flex flex-wrap gap-1.5 mb-5">
          {techTags.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
              whileHover={{ scale: 1.08, color: '#e58b24' }}
              className="px-2 py-0.5 rounded text-[11px] font-mono border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#121212] dark:bg-[#121212] light:bg-[#ffffff] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] cursor-default"
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Action links with Magnetic Primary Button */}
      <motion.div custom={5} variants={contentVariants} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#2b2a27]/60">
        {docushield.liveUrl && (
          <MagneticButton
            href={docushield.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded text-xs font-mono font-medium tracking-wide bg-[#e58b24] hover:bg-[#d97706] text-[#121212] transition-colors shadow-sm"
          >
            <span className="flex items-center gap-1.5">
              <span>Launch App</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </MagneticButton>
        )}

        {docushield.repoUrl && (
          <motion.a
            href={docushield.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium tracking-wide border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] hover:border-[#e58b24]/50 bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Source</span>
          </motion.a>
        )}

        <motion.button
          onClick={() => onOpenCaseStudy(docushield.id)}
          whileHover={{ scale: 1.04, x: 2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono font-medium tracking-wide border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] hover:border-[#e58b24]/50 text-[#a8a29e] hover:text-[#f5f2eb] transition-all ml-auto"
        >
          <span>Deep Spec</span>
          <ArrowRight className="w-3 h-3 text-[#e58b24]" />
        </motion.button>
      </motion.div>

    </motion.div>
  );
};
