import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on desktop devices with hover pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.classList.contains('cursor-pointer')
        );
        setIsHoveringInteractive(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (shouldReduceMotion || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
      {/* Primary inner micro dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#6366F1] shadow-[0_0_8px_rgba(99,102,241,0.6)] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.1 }}
      />

      {/* Secondary outer soft ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          width: isHoveringInteractive ? 36 : 22,
          height: isHoveringInteractive ? 36 : 22,
          borderColor: isHoveringInteractive ? 'rgba(99, 102, 241, 0.5)' : 'rgba(255, 255, 255, 0.25)',
          backgroundColor: isHoveringInteractive ? 'rgba(99, 102, 241, 0.06)' : 'rgba(255, 255, 255, 0.01)',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 300,
          mass: 0.2,
        }}
        style={{
          marginLeft: isHoveringInteractive ? -18 : -11,
          marginTop: isHoveringInteractive ? -18 : -11,
        }}
      />
    </div>
  );
};
