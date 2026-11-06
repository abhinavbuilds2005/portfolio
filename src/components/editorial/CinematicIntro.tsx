import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete?: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Animate progress percentage from 0 to 100 over ~1.8 seconds
    const startTime = Date.now();
    const duration = 1800;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Hold for 300ms, then trigger curtain reveal
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            onComplete?.();
          }, 800);
        }, 300);
      }
    }, 20);

    // ESC key to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearInterval(interval);
        setIsVisible(false);
        onComplete?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cinematic-intro"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#132532] text-white px-6 sm:px-12 py-8 sm:py-10 select-none overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          {/* Top Metadata Row */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-between text-xs sm:text-sm font-mono tracking-widest text-[#F5F2EB]/70 uppercase"
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#315CFF] animate-pulse" />
              <span>AA® — PORTFOLIO</span>
            </div>
            <div className="flex items-center gap-4">
              <span>2026 / INDIA</span>
              <button
                onClick={() => {
                  setIsVisible(false);
                  onComplete?.();
                }}
                className="hidden sm:inline-block text-[11px] text-[#F5F2EB]/40 hover:text-white transition-colors cursor-pointer border border-[#F5F2EB]/20 px-2 py-0.5 rounded"
              >
                SKIP [ESC]
              </button>
            </div>
          </motion.div>

          {/* Centerpiece Typographic Reveal */}
          <div className="my-auto py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-7xl mx-auto"
            >
              {/* "A." Accent Mark in Persimmon */}
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="block text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-[#F0784B] mb-2"
              >
                A.
              </motion.span>

              {/* Massive ABHINAV (Solid) */}
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.88] text-white uppercase font-sans">
                ABHINAV
              </h1>

              {/* Massive ANAND. (Outlined / Stroked) */}
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.88] uppercase font-sans text-stroke-white text-transparent">
                ANAND.
              </h1>
            </motion.div>
          </div>

          {/* Bottom Telemetry & Gradient Progress Line */}
          <div className="w-full">
            <div className="flex items-center justify-between text-xs sm:text-sm font-mono tracking-widest text-[#F5F2EB]/80 uppercase mb-3">
              <span className="flex items-center gap-2">
                <span className="text-[#315CFF]">■</span> AI / ML ENGINEERING
              </span>
              <span className="font-bold tabular-nums text-sm sm:text-base text-white">
                {progress.toString().padStart(2, '0')}%
              </span>
            </div>

            {/* Gradient Loading Line */}
            <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#315CFF] via-[#5E7FFF] to-[#F0784B]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

