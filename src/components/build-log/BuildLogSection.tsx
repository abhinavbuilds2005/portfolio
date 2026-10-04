import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown, ChevronUp, BookOpen, GitCommit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUILD_LOGS } from '../../data/buildLogs';

export const BuildLogSection: React.FC = () => {
  const [expandedLogId, setExpandedLogId] = useState<string | null>('01-multimodal-evidence-fusion');

  const toggleExpand = (id: string) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  return (
    <section id="build-log" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-[#6366F1] font-semibold uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Engineering Journal</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] mb-4">
          Build Log & Retrospectives
        </h2>
        <p className="text-base text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
          Architectural decisions, failure mode analyses, and benchmark findings written during the development of real machine learning systems.
        </p>
      </div>

      {/* Vertical Timeline Stack */}
      <div className="relative pl-6 sm:pl-8 border-l border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] space-y-6">
        {BUILD_LOGS.map((entry, idx) => {
          const isExpanded = expandedLogId === entry.id;

          return (
            <div key={entry.id} className="relative">
              
              {/* Timeline Node Indicator */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-3 h-3 rounded-full border-2 border-[#6366F1] bg-[#08090B] dark:bg-[#08090B] light:bg-white shadow-[0_0_8px_rgba(99,102,241,0.5)]" />

              {/* Journal Card */}
              <article
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isExpanded
                    ? 'border-[#6366F1]/40 bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-xl'
                    : 'border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white hover:border-white/20'
                }`}
              >
                <div
                  onClick={() => toggleExpand(entry.id)}
                  className="p-6 sm:p-7 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                >
                  <div className="space-y-2 flex-1">
                    {/* Metadata Header */}
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#667085]">
                      <span className="font-bold text-[#6366F1]">
                        ENTRY 0{idx + 1}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]">
                        <Calendar className="w-3.5 h-3.5 text-[#6366F1]" />
                        {entry.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {entry.readTime}
                      </span>
                    </div>

                    {/* Entry Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] tracking-tight">
                      {entry.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed line-clamp-2">
                      {entry.excerpt}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.06] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] text-[#9AA4B2]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#818CF8] hover:text-white transition-colors"
                      aria-label={isExpanded ? "Collapse entry" : "Read entry"}
                    >
                      <span>{isExpanded ? 'Collapse' : 'Read Note'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Markdown Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] bg-[#0D1014]/60 dark:bg-[#0D1014]/60 light:bg-[#F7F8FA]"
                    >
                      <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
                        {entry.content.split('\n\n').map((paragraph, pIdx) => {
                          if (paragraph.startsWith('### ')) {
                            return (
                              <h4 key={pIdx} className="text-sm sm:text-base font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] mt-4 mb-2 flex items-center gap-2">
                                <GitCommit className="w-4 h-4 text-[#6366F1]" />
                                <span>{paragraph.replace('### ', '')}</span>
                              </h4>
                            );
                          }
                          return (
                            <p key={pIdx}>
                              {paragraph}
                            </p>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </div>
          );
        })}
      </div>

    </section>
  );
};
