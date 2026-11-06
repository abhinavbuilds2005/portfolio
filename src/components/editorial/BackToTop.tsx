import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.round((window.scrollY / totalHeight) * 100) : 0;
      setScrollProgress(progress);
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          className="fixed bottom-6 right-6 z-40 group"
        >
          {/* Scroll % tooltip on hover */}
          <div className="absolute -top-7 right-0 font-mono text-[10px] bg-[#132532] text-white px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
            TOP · {scrollProgress}%
          </div>

          <button
            onClick={scrollToTop}
            className="w-11 h-11 sm:w-12 sm:h-12 bg-[#315CFF] hover:bg-[#2047E5] text-white flex items-center justify-center rounded-none shadow-[3px_3px_0px_#132532] cursor-pointer transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] hover:-translate-y-0.5"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

