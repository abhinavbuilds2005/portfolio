import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, GitFork, Star } from 'lucide-react';
import githubData from '../../data/github-cached.json';

export const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#2b2a27]/80 bg-[#121212] py-8 text-xs font-mono text-[#78716c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Identity & Telemetry */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="text-[#f5f2eb] font-semibold">
            ABHINAV ANAND // AI SYSTEMS LAB
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-[#a8a29e]">
            <Github className="w-3.5 h-3.5 text-[#e58b24]" />
            <span>{githubData.publicRepos} Repositories</span>
            <span>({githubData.status})</span>
          </span>
        </div>

        {/* Right: Time & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="text-[11px]">
            IST (UTC+5:30): <span className="text-[#f5f2eb] font-semibold">{currentTime || '--:--:--'}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 px-2.5 py-1 rounded border border-[#2b2a27] bg-[#1c1c1c] text-[#a8a29e] hover:text-[#f5f2eb] hover:border-[#e58b24]/50 transition-colors"
            aria-label="Scroll back to top"
          >
            <span>[TOP]</span>
            <ArrowUp className="w-3 h-3 text-[#e58b24]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
