import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Calendar, CheckCircle2, Trophy, ArrowUpRight } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      period: '2026 · Present',
      role: 'Team Lead & Core ML Engineer',
      organization: 'DocuShield AI · Smart India Hackathon 2026',
      badge: 'SIH26188',
      description: 'Architecting an enterprise multimodal forensic screening system for 5 ID document categories. Engineered Error Level Analysis (ELA), ORB copy-move homography, and Verhoeff D5 cryptographic checksum engines.',
      highlights: [
        'Built 90-test automated verification suite passing 100% test assertions',
        'Decoupled high-throughput FastAPI backend with sub-2s end-to-end latency',
        'Eliminated digital document forgery loopholes through multi-evidence fusion',
      ],
      link: 'https://github.com/abhinavbuilds2005/DocuShield',
    },
    {
      period: '2025 · Present',
      role: 'B.Tech CSE (AI & Machine Learning)',
      organization: 'Lovely Professional University (LPU)',
      badge: 'Academic Trajectory',
      description: 'Specializing in machine learning internals, computer vision, data structures, and production backend development.',
      highlights: [
        'Completed 150-Hour intensive C programming and memory architecture specialization',
        'Developed end-to-end predictive models for loan risk and retail analytics',
        'Certified in Python 101 for Data Science by IBM Developer Skills Network',
      ],
    },
    {
      period: '2025 · Present',
      role: 'Open-Source AI Systems Engineer',
      organization: 'Independent Engineering Repositories',
      badge: 'GitHub Active',
      description: 'Building and publishing reproducible AI workflows, automated ATS evaluation systems, and interactive streamlit tools.',
      highlights: [
        'Built AI Resume ATS Analyzer with Groq API (Llama 3) & Supabase authentication',
        'Trained CreditWise Loan Classifier reporting 87.5% accuracy with 0% data leakage',
        'Earned 5★ Gold Badge in Advanced SQL on HackerRank',
      ],
      link: 'https://github.com/abhinavbuilds2005',
    },
  ];

  return (
    <section id="experience" className="py-20 px-6 sm:px-10 max-w-7xl mx-auto border-t border-black/[0.06]">
      {/* Header */}
      <div className="mb-12">
        <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#6366F1] block mb-2">
          — EXPERIENCE & ACHIEVEMENTS
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight font-sans">
          Proven Track Record.
        </h2>
        <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl mt-2 leading-relaxed font-normal">
          Competitive hackathons, algorithmic achievements, and hands-on systems architecture.
        </p>
      </div>

      {/* Timeline List */}
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs hover:shadow-md transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-sans font-bold text-lg text-[#111827]">
                  {exp.role}
                </span>
                <span className="bg-indigo-50 border border-indigo-200/60 text-[#6366F1] px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  {exp.badge}
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{exp.period}</span>
              </span>
            </div>

            <div className="text-sm font-semibold text-[#111827] mb-3 flex items-center gap-2">
              <span>{exp.organization}</span>
              {exp.link && (
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#6366F1] transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>

            <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
              {exp.description}
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-3 border-t border-slate-100">
              {exp.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#374151]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6366F1] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
