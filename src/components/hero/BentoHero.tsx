import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { StatusHeadlineTile } from './StatusHeadlineTile';
import { SystemPipelineHeroVisual } from './SystemPipelineHeroVisual';
import { FlagshipTile } from './FlagshipTile';
import { LossCurveTile } from './LossCurveTile';
import { NeuralSynapseCanvas } from '../animations/NeuralSynapseCanvas';
import { TiltCard } from '../shared/TiltCard';

interface BentoHeroProps {
  onOpenCaseStudy: (projectId: string) => void;
  isDark?: boolean;
}

export const BentoHero: React.FC<BentoHeroProps> = ({ onOpenCaseStudy, isDark = true }) => {
  const shouldReduceMotion = useReducedMotion();

  const tileVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : i * 0.08,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section id="home" className="relative pt-6 sm:pt-10 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Interactive Neural Synapse Canvas Ambient Layer */}
      <NeuralSynapseCanvas isDark={isDark} />

      {/* Bento Grid: Clean 2-Row Hierarchical Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

        {/* Row 1: Left / Large - Personal Introduction + Core Headline (7 cols) */}
        <motion.div custom={0} variants={tileVariants} initial="hidden" animate="visible" className="lg:col-span-7 flex">
          <TiltCard className="w-full flex" maxTilt={1.5}>
            <StatusHeadlineTile />
          </TiltCard>
        </motion.div>

        {/* Row 1: Right - Interactive AI System Data Pipeline (5 cols) */}
        <motion.div custom={1} variants={tileVariants} initial="hidden" animate="visible" className="lg:col-span-5 flex">
          <TiltCard className="w-full flex" maxTilt={1.8}>
            <SystemPipelineHeroVisual />
          </TiltCard>
        </motion.div>

        {/* Row 2: Bottom Left - Featured Flagship DocuShield AI (7 cols) */}
        <motion.div custom={2} variants={tileVariants} initial="hidden" animate="visible" className="lg:col-span-7 flex">
          <TiltCard className="w-full flex" maxTilt={1.5}>
            <FlagshipTile onOpenCaseStudy={onOpenCaseStudy} />
          </TiltCard>
        </motion.div>

        {/* Row 2: Bottom Right - ML Training Convergence Simulation (5 cols) */}
        <motion.div custom={3} variants={tileVariants} initial="hidden" animate="visible" className="lg:col-span-5 flex">
          <TiltCard className="w-full flex" maxTilt={1.8}>
            <LossCurveTile />
          </TiltCard>
        </motion.div>

      </div>
    </section>
  );
};
