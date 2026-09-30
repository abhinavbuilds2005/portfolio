import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { BUILD_LOGS } from '../../data/buildLogs';

export const BuildLogSection: React.FC = () => {
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  return (
    <section id="build-log" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#2b2a27]/60">
      
      {/* Section Meta Header */}
      <div className="flex items-center justify-between py-2 border-b border-[#2b2a27]/60 mb-8 font-mono text-[11px] text-[#78716c]">
        <div className="flex items-center gap-2">
          <span className="text-[#e58b24] font-semibold">[04]</span>
          <span className="uppercase tracking-wider">BUILD LOG // ENGINEERING JOURNAL</span>
        </div>
        <div>
          <span>{BUILD_LOGS.length} TECHNICAL ENTRIES RECORDED</span>
        </div>
      </div>

      {/* Headline */}
      <div className="max-w-3xl mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-3">
          Engineering Build Log
        </h2>
        <p className="text-sm sm:text-base text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed">
          Concise architectural notes, benchmark retrospectives, and failure mode analyses written while building and evaluating machine learning systems.
        </p>
      </div>

      {/* Build Log Entries Stack */}
      <div className="space-y-4">
        {BUILD_LOGS.map((entry) => {
          const isExpanded = expandedLogId === entry.id;

          return (
            <article
              key={entry.id}
              className="rounded border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] overflow-hidden transition-colors"
            >
              <div
                onClick={() => toggleExpand(entry.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#161616]/50 dark:hover:bg-[#161616]/50 light:hover:bg-[#faf8f5] transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#78716c]">
                    <span className="flex items-center gap-1 text-[#e58b24]">
                      <Calendar className="w-3 h-3" />
                      {entry.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {entry.readTime} read
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
                    {entry.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] line-clamp-2 leading-relaxed">
                    {entry.excerpt}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded font-mono text-[10px] border border-[#2b2a27] bg-[#121212] text-[#a8a29e]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className="p-1 rounded text-[#e58b24] hover:bg-[#2b2a27] transition-colors flex items-center gap-1 font-mono text-xs"
                    aria-label={isExpanded ? "Collapse entry" : "Expand entry"}
                  >
                    <span>{isExpanded ? 'Collapse' : 'Read Note'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Markdown Content */}
              {isExpanded && (
                <div className="p-6 pt-0 border-t border-[#2b2a27]/60 bg-[#161616]/40 dark:bg-[#161616]/40 light:bg-[#faf8f5]">
                  <div className="prose dark:prose-invert prose-sm max-w-none text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed space-y-3 font-sans pt-4">
                    {entry.content.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h4 key={pIdx} className="text-sm font-bold font-mono text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mt-4 mb-2">
                            {paragraph.replace('### ', '')}
                          </h4>
                        );
                      }
                      return (
                        <p key={pIdx} className="text-xs sm:text-sm">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

    </section>
  );
};
