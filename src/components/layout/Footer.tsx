import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Code, Mail, FileText, GitCommit } from 'lucide-react';
import buildMetadata from '../../data/build-metadata.json';

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
    <footer className="border-t border-[#2b2a27]/80 dark:border-[#2b2a27]/80 light:border-[#e6dfd5] bg-[#121212] dark:bg-[#121212] light:bg-[#faf8f5] py-10 text-xs font-mono text-[#78716c] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Row: Brand & Social Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#2b2a27]/60 dark:border-[#2b2a27]/60 light:border-[#e6dfd5]">
          <div>
            <div className="text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] font-bold text-sm tracking-wide">
              ABHINAV ANAND // AI SYSTEMS LAB
            </div>
            <div className="text-[11px] text-[#78716c] mt-0.5">
              B.Tech Computer Science (AI/ML) · Lovely Professional University
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/abhinavbuilds2005"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] hover:text-[#f5f2eb] dark:hover:text-[#f5f2eb] light:hover:text-[#1c1917] transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhinav-anand-865926300"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] hover:text-[#f5f2eb] dark:hover:text-[#f5f2eb] light:hover:text-[#1c1917] transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://leetcode.com/u/cseabhinav2005/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] hover:text-[#f5f2eb] dark:hover:text-[#f5f2eb] light:hover:text-[#1c1917] transition-colors"
              title="LeetCode Profile"
              aria-label="LeetCode Profile"
            >
              <Code className="w-4 h-4" />
            </a>
            <a
              href="mailto:abhinavanand9996@gmail.com"
              className="p-2 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] hover:text-[#f5f2eb] dark:hover:text-[#f5f2eb] light:hover:text-[#1c1917] transition-colors"
              title="Direct Email"
              aria-label="Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] hover:text-[#f5f2eb] dark:hover:text-[#f5f2eb] light:hover:text-[#1c1917] transition-colors"
              title="Curriculum Vitae"
              aria-label="Curriculum Vitae"
            >
              <FileText className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Row: Dynamic Build Telemetry & Back to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px]">
          <div className="flex flex-wrap items-center gap-2">
            <span>Last updated:</span>
            <span className="text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] font-semibold">
              {buildMetadata.lastUpdated}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <GitCommit className="w-3 h-3 text-[#78716c]" />
              <span className="text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e]">
                {buildMetadata.commitHash} ({buildMetadata.branch})
              </span>
            </span>
            <span>•</span>
            <span>{buildMetadata.publicRepos} GitHub Repositories</span>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-auto">
            <div className="text-[#78716c]">
              IST (UTC+5:30): <span className="text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] font-semibold">{currentTime || '--:--:--'}</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] hover:text-[#f5f2eb] dark:hover:text-[#f5f2eb] light:hover:text-[#1c1917] transition-colors"
              aria-label="Scroll back to top"
            >
              <span>[TOP]</span>
              <ArrowUp className="w-3 h-3 text-[#e58b24]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
