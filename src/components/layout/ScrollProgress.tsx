import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalScroll) * 100)));
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Map 0-100% to training epoch 01 to 50
  const epochNumber = Math.min(50, Math.max(1, Math.round((scrollProgress / 100) * 50)));

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Progress Track */}
      <div className="w-full h-[2px] bg-transparent">
        <div
          className="h-full bg-[#e58b24] dark:bg-[#e58b24] light:bg-[#c84b31] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Subtle Epoch Indicator Tag */}
      <div className="absolute right-4 top-2 hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#2b2a27]/60 dark:border-[#2b2a27]/60 light:border-[#e6dfd5] bg-[#121212]/90 dark:bg-[#121212]/90 light:bg-[#faf8f5]/90 text-[10px] font-mono text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] shadow-sm backdrop-blur-sm">
        <span className="text-[#e58b24] dark:text-[#e58b24] light:text-[#c84b31] font-semibold">
          EPOCH [{epochNumber.toString().padStart(2, '0')} / 50]
        </span>
        <span className="text-[#78716c]">|</span>
        <span>{scrollProgress}%</span>
      </div>
    </div>
  );
};
