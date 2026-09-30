import React from 'react';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BUILD_LOGS } from '../../data/buildLogs';

export const BuildLogNoteTile: React.FC = () => {
  const latestLog = BUILD_LOGS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(229,139,36,0.08)' }}
      className="flex flex-col justify-between p-5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative group overflow-hidden transition-colors hover:border-[#e58b24]/40"
    >
      {/* Animated corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at top right, rgba(229,139,36,0.12), transparent 70%)',
        }}
      />

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] uppercase tracking-wider">
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#e58b24]" />
            </motion.div>
            <span>Latest Engineering Note</span>
          </div>
          <motion.span
            className="font-mono text-[10px] text-[#78716c]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {latestLog.date}
          </motion.span>
        </div>

        <a href="#build-log" className="block">
          <motion.h3
            className="text-sm font-semibold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-1.5 line-clamp-2 group-hover:text-[#e58b24] transition-colors duration-300"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {latestLog.title}
          </motion.h3>
        </a>

        <motion.p
          className="text-xs text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] line-clamp-2 leading-relaxed mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.4 }}
        >
          {latestLog.excerpt}
        </motion.p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#2b2a27]/60">
        <div className="flex gap-1">
          {latestLog.tags.slice(0, 2).map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              className="font-mono text-[9px] px-1 py-0.5 rounded border border-[#2b2a27] text-[#78716c]"
            >
              #{tag}
            </motion.span>
          ))}
        </div>

        <motion.a
          href="#build-log"
          className="inline-flex items-center gap-1 font-mono text-[11px] text-[#e58b24] hover:underline"
          whileHover={{ x: 3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <span>Read log</span>
          <ArrowUpRight className="w-3 h-3" />
        </motion.a>
      </div>
    </motion.div>
  );
};
