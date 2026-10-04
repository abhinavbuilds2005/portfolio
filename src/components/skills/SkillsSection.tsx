import React, { useState } from 'react';
import { Award, BookOpen, BarChart3, ExternalLink, Sparkles, GraduationCap } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../../data/projects';
import { CERTIFICATIONS, CURRENTLY_LEARNING } from '../../data/certifications';
import { calculateTechUsage } from '../../lib/utils';
import { LeetCodeDashboard } from './LeetCodeDashboard';
import { SystemsKnowledgeMap } from './SystemsKnowledgeMap';
import { AttentionHeadInspector } from '../shared/AttentionHeadInspector';

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
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="flex justify-between items-center text-xs font-mono mb-1.5">
        <span className={`font-medium transition-colors ${hovered ? 'text-[#818CF8]' : 'text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]'}`}>
          {item.name}
        </span>
        <span className="text-[#667085] text-[11px]">
          Used across {item.count} {item.count === 1 ? 'repository' : 'repositories'}
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2 rounded-full bg-[#08090B] dark:bg-[#08090B] light:bg-[#E2E8F0] overflow-hidden border border-white/[0.04] relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${item.percentage}%` }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            delay: idx * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE] relative overflow-hidden"
        />
      </div>

      <div className="text-[10px] text-[#667085] truncate mt-1">
        Projects: {item.projects.join(', ')}
      </div>
    </motion.div>
  );
};

interface SkillsSectionProps {
  onOpenCaseStudy?: (projectId: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onOpenCaseStudy }) => {
  const techUsageList = calculateTechUsage(PROJECTS).slice(0, 8);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">

      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-[#6366F1] font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Technical Competencies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] mb-4">
          AI & Machine Learning Engineering Stack
        </h2>
        <p className="text-base text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
          A breakdown of mathematical foundations, deep learning frameworks, computer vision algorithms, and backend architectures implemented across verified repositories.
        </p>
      </div>

      {/* 1. Interactive AI Systems Knowledge Map (22 skills with domain filters & inspector) */}
      <SystemsKnowledgeMap onOpenCaseStudy={onOpenCaseStudy} />

      {/* 2. Inside a Transformer (Multi-Head Scaled Dot-Product Self-Attention) */}
      <div className="mb-14">
        <AttentionHeadInspector />
      </div>

      {/* 3. Empirical Feature Importance & Verified Credentials */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">

        {/* Left: Dynamic Tech Occurrence (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 font-mono text-xs text-[#6366F1] font-semibold">
              <BarChart3 className="w-4 h-4" />
              <span>EMPIRICAL CODEBASE USAGE (REPOSITORY OCCURRENCES)</span>
            </div>
            <span className="font-mono text-[10px] text-[#667085]">Based on active projects</span>
          </div>

          <div className="space-y-4">
            {techUsageList.map((item, idx) => (
              <SkillBar key={item.name} item={item} idx={idx} shouldReduceMotion={shouldReduceMotion} />
            ))}
          </div>
        </div>

        {/* Right: Verified Certifications & Academic Background (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06] font-mono text-xs text-[#6366F1] font-semibold">
              <Award className="w-4 h-4" />
              <span>VERIFIED CERTIFICATIONS</span>
            </div>

            <div className="space-y-3">
              {CERTIFICATIONS.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between p-3.5 rounded-xl border border-white/[0.06] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] hover:border-white/20 transition-all group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] group-hover:text-[#6366F1] transition-colors">
                      {cert.title}
                    </h4>
                    <div className="font-mono text-[11px] text-[#667085] mt-0.5">
                      {cert.platform} · {cert.tag}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#6366F1] mt-1 shrink-0 ml-2 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Academic Background summary */}
          <div className="p-5 rounded-xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5]">
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#6366F1] uppercase mb-1 font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Foundation</span>
            </div>
            <div className="text-sm font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]">
              Lovely Professional University, Punjab
            </div>
            <div className="font-mono text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] mt-0.5">
              B.Tech in Computer Science & Engineering (AI/ML) · Class of 2025–2029
            </div>
          </div>
        </div>

      </div>

      {/* 4. "Currently Learning" Strip */}
      <div className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-xl mb-14">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06] font-mono text-xs text-[#6366F1] font-semibold">
          <BookOpen className="w-4 h-4" />
          <span>CURRENT FOCUS & RESEARCH EXPLORATIONS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CURRENTLY_LEARNING.map((item) => (
            <div
              key={item.topic}
              className="p-4 rounded-xl border border-white/[0.06] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] flex flex-col justify-between"
            >
              <div>
                <span className="inline-block font-mono text-[10px] px-2 py-0.5 rounded bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/20 mb-2">
                  {item.status}
                </span>
                <h4 className="text-xs font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] mb-1">
                  {item.topic}
                </h4>
                <p className="text-[11px] text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
                  {item.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. LeetCode Telemetry Dashboard */}
      <div>
        <LeetCodeDashboard />
      </div>

    </section>
  );
};
