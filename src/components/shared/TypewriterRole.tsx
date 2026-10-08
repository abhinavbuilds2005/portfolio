import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

interface TypewriterRoleProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export const TypewriterRole: React.FC<TypewriterRoleProps> = ({
  phrases,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseDuration = 2200,
  className = '',
  cursorClassName = 'text-accent',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentText(phrases[0] || '');
      return;
    }

    const currentTarget = phrases[currentPhraseIndex];
    let timeout: number;

    if (!isDeleting) {
      // Typing phase
      if (currentText.length < currentTarget.length) {
        timeout = window.setTimeout(() => {
          setCurrentText(currentTarget.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing word, wait before deleting
        timeout = window.setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (currentText.length > 0) {
        timeout = window.setTimeout(() => {
          setCurrentText(currentTarget.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration, shouldReduceMotion]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span>{currentText}</span>
      <span
        aria-hidden="true"
        className={`inline-block ml-0.5 w-[2px] h-[0.9em] bg-accent self-center animate-cursor-blink ${cursorClassName}`}
      />
    </span>
  );
};
