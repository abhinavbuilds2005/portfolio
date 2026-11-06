import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none bg-transparent">
      {/* Background track (transparent) */}
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#315CFF] via-[#315CFF] to-[#F0784B] shadow-[0_0_8px_rgba(49,92,255,0.5)]"
        style={{ scaleX }}
      />
    </div>
  );
};
