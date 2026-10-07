import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { BUILD_LOGS } from '../../data/buildLogs';

export const BuildLogSection: React.FC = () => {
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggleExpand = (id: string) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  return (
    <section id="build-log" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border-subtle">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="font-mono text-xs uppercase tracking-wide text-accent mb-2">
            Engineering Journal
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Technical Build Log
          </h2>
        </div>
        <p className="text-sm text-text-secondary max-w-md">
          Concise architectural retrospectives, evaluation trade-offs, and failure mode analyses written during production system engineering.
        </p>
      </div>

      {/* Build Log Entries Stack (Constrained to optimal reading width) */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {BUILD_LOGS.map((entry, idx) => {
          const isExpanded = expandedLogId === entry.id;

          return (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : idx * 0.08, ease: 'easeOut' }}
              className="rounded-lg border border-border-subtle bg-surface overflow-hidden card-hover transition-colors"
            >
              <div
                onClick={() => toggleExpand(entry.id)}
                className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-elevated/60 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted">
                    <span className="flex items-center gap-1.5 text-accent font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {entry.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {entry.readTime} read
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                    {entry.title}
                  </h3>

                  <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                    {entry.excerpt}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded font-mono text-xs border border-border-subtle bg-base text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className="p-1 text-accent flex items-center gap-1 font-mono text-xs hover:underline"
                    aria-label={isExpanded ? "Collapse entry" : "Expand entry"}
                  >
                    <span>{isExpanded ? 'Collapse' : 'Read Note'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Note Content */}
              {isExpanded && (
                <div className="p-6 pt-2 border-t border-border-subtle bg-base/50">
                  <div className="max-w-none text-text-secondary leading-relaxed space-y-3 font-sans text-sm sm:text-base">
                    {entry.content.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h4 key={pIdx} className="text-base font-bold font-mono text-text-primary mt-4 mb-2">
                            {paragraph.replace('### ', '')}
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
                </div>
              )}
            </motion.article>
          );
        })}
      </div>

    </section>
  );
};
