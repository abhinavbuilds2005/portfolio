import React, { useState } from 'react';
import { Award, BookOpen, BarChart3, ExternalLink } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../../data/projects';
import { CERTIFICATIONS, CURRENTLY_LEARNING } from '../../data/certifications';
import { calculateTechUsage } from '../../lib/utils';
import { LeetCodeDashboard } from './LeetCodeDashboard';

// Animated skill bar with glow on hover
const SkillBar: React.FC<{
  item: { name: string; count: number; percentage: number; projects: string[] };
  idx: number;
  shouldReduceMotion: boolean | null;
}> = ({ item, idx, shouldReduceMotion }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      key={item.name}
      className="group"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="flex justify-between items-center text-xs font-mono mb-1">
        <motion.span
          className="font-medium transition-colors"
          animate={{ color: hovered ? '#e58b24' : '#f5f2eb' }}
          transition={{ duration: 0.2 }}
        >
          {item.name}
        </motion.span>
        <motion.span
          className="text-[#78716c]"
          animate={{ opacity: hovered ? 1 : 0.7 }}
        >
          {item.count} {item.count === 1 ? 'project' : 'projects'} ({item.percentage}%)
        </motion.span>
      </div>

      {/* Progress bar track */}
      <div className="w-full h-2 rounded-full bg-[#121212] overflow-hidden border border-[#2b2a27]/50 relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${item.percentage}%` }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.9,
            delay: idx * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ backgroundColor: '#e58b24' }}
        >
          {/* Shimmer sweep on bar */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-y-0 w-8 bg-white/30 skew-x-[-20deg]"
              initial={{ x: '-100%' }}
              whileInView={{ x: '400%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 + idx * 0.07, ease: 'easeOut' }}
            />
          )}
        </motion.div>

        {/* Glow overlay when hovered */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: hovered ? '0 0 10px rgba(229,139,36,0.5), inset 0 0 6px rgba(229,139,36,0.2)' : '0 0 0px transparent',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="text-[10px] text-[#78716c] truncate mt-0.5 opacity-80">
        Used in: {item.projects.join(', ')}
      </div>
    </motion.div>
  );
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const SkillsSection: React.FC = () => {
  const techUsageList = calculateTechUsage(PROJECTS).slice(0, 10);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#2b2a27]/60">

      {/* Section Meta Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between py-2 border-b border-[#2b2a27]/60 mb-8 font-mono text-[11px] text-[#78716c]"
      >
        <div className="flex items-center gap-2">
          <span className="text-[#e58b24] font-semibold">[03]</span>
          <span className="uppercase tracking-wider">SKILLS // FEATURE IMPORTANCE & CREDENTIALS</span>
        </div>
        <div>
          <span>DYNAMICALLY COMPUTED FROM {PROJECTS.length} REPOSITORIES</span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-3xl mb-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-3">
          Technical Capabilities & Feature Importance
        </h2>
        <p className="text-sm sm:text-base text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed">
          Instead of subjective 5-star skill ratings, below is an empirical feature-importance breakdown indicating how frequently each core framework and algorithm appears across my verified projects.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

        {/* Left: Dynamic Feature Importance Bars (7 cols) */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="lg:col-span-7 p-6 rounded border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm card-hover-lift relative overflow-hidden"
        >
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'linear-gradient(rgba(229,139,36,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(229,139,36,0.04) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2b2a27]/60 relative">
            <div className="flex items-center gap-2 font-mono text-xs text-[#e58b24] font-semibold">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <BarChart3 className="w-4 h-4" />
              </motion.div>
              <span>EMPIRICAL FEATURE IMPORTANCE (TOOL USAGE)</span>
            </div>
            <span className="font-mono text-[10px] text-[#78716c]">Frequency across projects</span>
          </div>

          <div className="space-y-3.5 relative">
            {techUsageList.map((item, idx) => (
              <SkillBar key={item.name} item={item} idx={idx} shouldReduceMotion={shouldReduceMotion} />
            ))}
          </div>
        </motion.div>

        {/* Right: Verified Credentials (5 cols) */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <div className="p-6 rounded border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm mb-6 card-hover-lift">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#2b2a27]/60 font-mono text-xs text-[#e58b24] font-semibold">
              <Award className="w-4 h-4" />
              <span>VERIFIED CERTIFICATIONS</span>
            </div>

            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.a
                  key={cert.id}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ x: 3, borderColor: 'rgba(229,139,36,0.5)' }}
                  className="flex items-start justify-between p-3 rounded border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] transition-all group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] group-hover:text-[#e58b24] transition-colors">
                      {cert.title}
                    </h4>
                    <div className="font-mono text-[11px] text-[#78716c] mt-0.5">
                      {cert.platform} // {cert.tag}
                    </div>
                  </div>
                  <motion.div whileHover={{ rotate: -45 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <ExternalLink className="w-3.5 h-3.5 text-[#78716c] group-hover:text-[#e58b24] mt-1 shrink-0 ml-2 transition-colors" />
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Academic Background summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="p-4 rounded border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5]"
          >
            <div className="font-mono text-[10px] text-[#e58b24] uppercase mb-1">
              Academic Background
            </div>
            <div className="text-xs font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
              Lovely Professional University, Jalandhar
            </div>
            <div className="font-mono text-[11px] text-[#a8a29e] mt-0.5">
              B.Tech in Computer Science & Engineering (AI/ML) · Class of 2025–2029
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* "Currently Learning" Strip */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="p-6 rounded border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#2b2a27]/60 font-mono text-xs text-[#e58b24] font-semibold">
          <BookOpen className="w-4 h-4" />
          <span>CURRENTLY LEARNING & RESEARCH FOCUS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CURRENTLY_LEARNING.map((item, i) => (
            <motion.div
              key={item.topic}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -3, borderColor: 'rgba(229,139,36,0.4)' }}
              className="p-3.5 rounded border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <motion.span
                    className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#e58b24]/10 text-[#e58b24] border border-[#e58b24]/30"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {item.status}
                  </motion.span>
                </div>
                <h4 className="text-xs font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-1">
                  {item.topic}
                </h4>
                <p className="text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] leading-relaxed">
                  {item.focus}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* LeetCode Telemetry Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="mt-8"
      >
        <LeetCodeDashboard />
      </motion.div>

    </section>
  );
};
