import React from 'react';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { BUILD_LOGS } from '../../data/buildLogs';

export const BuildLogNoteTile: React.FC = () => {
  const latestLog = BUILD_LOGS[0];

  return (
    <div className="flex flex-col justify-between p-5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative group hover:border-[#e58b24]/40 transition-colors">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#e58b24]" />
            <span>Latest Engineering Note</span>
          </div>
          <span className="font-mono text-[10px] text-[#78716c]">
            {latestLog.date}
          </span>
        </div>

        <a href="#build-log" className="block group-hover:text-[#e58b24] transition-colors">
          <h3 className="text-sm font-semibold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-1.5 line-clamp-2">
            {latestLog.title}
          </h3>
        </a>

        <p className="text-xs text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] line-clamp-2 leading-relaxed mb-3">
          {latestLog.excerpt}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#2b2a27]/60">
        <div className="flex gap-1">
          {latestLog.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="font-mono text-[9px] px-1 py-0.5 rounded border border-[#2b2a27] text-[#78716c]">
              #{tag}
            </span>
          ))}
        </div>

        <a
          href="#build-log"
          className="inline-flex items-center gap-1 font-mono text-[11px] text-[#e58b24] hover:underline"
        >
          <span>Read log</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
