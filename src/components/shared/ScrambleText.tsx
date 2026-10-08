import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnMount?: boolean;
  scrambleOnHover?: boolean;
  speed?: number;
  chars?: string;
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@%&/<>';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  scrambleOnMount = false,
  scrambleOnHover = true,
  speed = 25,
  chars = DEFAULT_CHARS,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    if (shouldReduceMotion || isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }

      iteration += 1 / 2;
    }, speed);
  }, [text, chars, speed, shouldReduceMotion, isScrambling]);

  useEffect(() => {
    if (scrambleOnMount && !shouldReduceMotion) {
      startScramble();
    } else {
      setDisplayText(text);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, scrambleOnMount, shouldReduceMotion, startScramble]);

  return (
    <span
      className={`inline-block transition-colors cursor-default ${className}`}
      onMouseEnter={scrambleOnHover ? startScramble : undefined}
    >
      {displayText}
    </span>
  );
};
