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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Sleek Progress Track */}
      <div className="w-full h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#6366F1] to-[#22D3EE] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(99,102,241,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};
