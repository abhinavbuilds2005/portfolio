import React, { useRef, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(229, 139, 36, 0.1)',
  borderColor = 'rgba(229, 139, 36, 0.25)',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [shouldReduceMotion]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Dynamic Mouse Spotlight Layer */}
      {!shouldReduceMotion && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[inherit]"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 65%)`,
          }}
        />
      )}

      {/* Dynamic Border Light Layer */}
      {!shouldReduceMotion && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[inherit] border border-transparent"
          style={{
            opacity: isHovered ? 1 : 0,
            borderColor: 'transparent',
            maskImage: `radial-gradient(350px circle at ${position.x}px ${position.y}px, black, transparent 70%)`,
            WebkitMaskImage: `radial-gradient(350px circle at ${position.x}px ${position.y}px, black, transparent 70%)`,
            boxShadow: `inset 0 0 0 1px ${borderColor}`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
