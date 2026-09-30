import React from 'react';
import { motion } from 'framer-motion';
import { StatusHeadlineTile } from './StatusHeadlineTile';
import { LossCurveTile } from './LossCurveTile';
import { FlagshipTile } from './FlagshipTile';
import { PipelineTile } from './PipelineTile';
import { ResultsTile } from './ResultsTile';
import { NeuralNetTile } from './NeuralNetTile';
import { BuildLogNoteTile } from './BuildLogNoteTile';
import { Sparkles } from 'lucide-react';

// Animated floating particles background
const FloatingParticle: React.FC<{ x: number; y: number; delay: number; size: number }> = ({ x, y, delay, size }) => (
  <motion.div
    className="absolute rounded-full bg-[#e58b24]/20 pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
    animate={{
      y: [0, -20, -10, -28, 0],
      x: [0, 6, -4, 2, 0],
      opacity: [0.3, 0.7, 0.5, 0.8, 0.3],
      scale: [1, 1.1, 0.9, 1.05, 1],
    }}
    transition={{
      duration: 5 + delay * 1.5,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

// Animated data stream dots (right side decoration)
const DataStreamDot: React.FC<{ idx: number }> = ({ idx }) => {
  const labels = ['∇W', 'σ(z)', 'ReLU', 'softmax', 'ELA', 'F1', 'AUC', 'MRZ', 'ORB', '∂L'];
  return (
    <motion.span
      className="absolute right-3 font-mono text-[9px] text-[#e58b24]/40 pointer-events-none select-none"
      style={{ top: `${8 + idx * 9}%` }}
      animate={{ opacity: [0, 0.6, 0], y: [-4, 0, 6] }}
      transition={{
        duration: 2.5,
        delay: idx * 0.35,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {labels[idx % labels.length]}
    </motion.span>
  );
};

const tileVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

interface BentoHeroProps {
  onOpenCaseStudy: (projectId: string) => void;
  onOpenPhysics: () => void;
}

export const BentoHero: React.FC<BentoHeroProps> = ({ onOpenCaseStudy, onOpenPhysics }) => {
  const particles = [
    { x: 8, y: 15, delay: 0, size: 4 },
    { x: 22, y: 72, delay: 0.8, size: 3 },
    { x: 48, y: 12, delay: 1.4, size: 5 },
    { x: 65, y: 85, delay: 0.4, size: 3 },
    { x: 82, y: 35, delay: 1.1, size: 4 },
    { x: 91, y: 68, delay: 0.6, size: 3 },
    { x: 33, y: 52, delay: 1.8, size: 2 },
    { x: 75, y: 20, delay: 2.1, size: 4 },
  ];

  return (
    <section id="home" className="pt-6 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* ── Floating ambient particles ── */}
      {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}

      {/* ── Data stream labels on right edge ── */}
      {Array.from({ length: 10 }).map((_, i) => <DataStreamDot key={i} idx={i} />)}

      {/* ── Subtle dot-grid background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(229,139,36,0.07) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Scanning horizontal line ── */}
      <div className="absolute left-0 right-0 overflow-hidden pointer-events-none h-full top-0">
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e58b24]/20 to-transparent"
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ top: 0 }}
        />
      </div>

      {/* Top Section Metadata Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-[#2b2a27]/60 mb-6 font-mono text-[11px] text-[#78716c]"
      >
        <div className="flex items-center gap-2">
          <span className="text-[#e58b24] font-semibold">[01]</span>
          <span className="uppercase tracking-wider">OVERVIEW // BENTO CONSOLE</span>
          <span>•</span>
          <span>LPU B.TECH (AI/ML)</span>
        </div>

        {/* Physics Free-Fall Simulator Trigger */}
        <motion.button
          onClick={onOpenPhysics}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-0.5 rounded border border-[#e58b24]/40 bg-[#e58b24]/10 text-[#e58b24] hover:bg-[#e58b24] hover:text-[#121212] transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>TRY PHYSICS LAB // FREE-FALL TENSORS</span>
        </motion.button>
      </motion.div>

      {/* Bento Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4">

        {/* Row 1: Headline (7 cols) + Loss Curve (5 cols) */}
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

        {/* Row 2: Flagship DocuShield AI (7 cols) + Pipeline Strip (5 cols) */}
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

        {/* Row 3: Results Matrix (4 cols) + Neural Net Stack (4 cols) + Build Note (4 cols) */}
        <motion.div custom={4} variants={tileVariants} initial="hidden" animate="visible" className="md:col-span-4 flex">
          <div className="w-full flex">
            <ResultsTile />
          </div>
        </motion.div>
        <motion.div custom={5} variants={tileVariants} initial="hidden" animate="visible" className="md:col-span-4 flex">
          <div className="w-full flex">
            <NeuralNetTile />
          </div>
        </motion.div>
        <motion.div custom={6} variants={tileVariants} initial="hidden" animate="visible" className="md:col-span-4 flex">
          <div className="w-full flex">
            <BuildLogNoteTile />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
