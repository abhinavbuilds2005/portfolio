import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { StatusHeadlineTile } from './StatusHeadlineTile';
import { LossCurveTile } from './LossCurveTile';
import { FlagshipTile } from './FlagshipTile';
import { PipelineTile } from './PipelineTile';

interface BentoHeroProps {
  onOpenCaseStudy: (projectId: string) => void;
}

export const BentoHero: React.FC<BentoHeroProps> = ({ onOpenCaseStudy }) => {
  const shouldReduceMotion = useReducedMotion();

  const tileVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : i * 0.08,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section id="home" className="pt-6 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Top Section Metadata Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-[#2b2a27]/60 mb-6 font-mono text-[11px] text-[#78716c]"
      >
        <div className="flex items-center gap-2">
          <span className="text-[#e58b24] font-semibold">[01]</span>
          <span className="uppercase tracking-wider">OVERVIEW // BENTO CONSOLE</span>
          <span>•</span>
          <span>LPU B.TECH (AI/ML)</span>
        </div>

        <div className="text-[10px] text-[#78716c] font-mono">
          LOC: INDIA (UTC+5:30) · SYS: v2.0
        </div>
      </motion.div>

      {/* Bento Grid: Clean 2-Row Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

        {/* Row 1: Headline & Bio (7 cols) + Inverted Loss Convergence Chart (5 cols) */}
        <motion.div custom={0} variants={tileVariants} initial="hidden" animate="visible" className="md:col-span-7 flex">
          <div className="w-full flex">
            <StatusHeadlineTile />
          </div>
        </motion.div>

        <motion.div custom={1} variants={tileVariants} initial="hidden" animate="visible" className="md:col-span-5 flex">
          <div className="w-full flex">
            <LossCurveTile />
          </div>
        </motion.div>

        {/* Row 2: Flagship DocuShield AI (7 cols) + Model Lifecycle Pipeline (5 cols) */}
        <motion.div custom={2} variants={tileVariants} initial="hidden" animate="visible" className="md:col-span-7 flex">
          <div className="w-full flex">
            <FlagshipTile onOpenCaseStudy={onOpenCaseStudy} />
          </div>
        </motion.div>

        <motion.div custom={3} variants={tileVariants} initial="hidden" animate="visible" className="md:col-span-5 flex">
          <div className="w-full flex">
            <PipelineTile />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
