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
        className="h-full origin-left bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] shadow-[0_0_8px_rgba(99,102,241,0.6)]"
        style={{ scaleX }}
      />
    </div>
  );
};

