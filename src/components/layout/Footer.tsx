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
    <footer className="border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#08090B] dark:bg-[#08090B] light:bg-[#F7F8FA] py-12 text-xs font-mono text-[#667085] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Row: Brand & Social Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06]">
          <div>
            <div className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-bold text-sm tracking-wide font-sans">
              ABHINAV ANAND // AI SYSTEMS
            </div>
            <div className="text-[11px] text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#64748B] mt-0.5 font-sans">
              B.Tech in Computer Science & Engineering (AI/ML) · Lovely Professional University
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/abhinavbuilds2005"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] hover:text-white dark:hover:text-[#0F172A] transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhinav-anand-865926300"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] hover:text-white dark:hover:text-[#0F172A] transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://leetcode.com/u/cseabhinav2005/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] hover:text-white dark:hover:text-[#0F172A] transition-colors"
              title="LeetCode Profile"
              aria-label="LeetCode Profile"
            >
              <Code className="w-4 h-4" />
            </a>
            <a
              href="mailto:abhinavanand9996@gmail.com"
              className="p-2.5 rounded-lg border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] hover:text-white dark:hover:text-[#0F172A] transition-colors"
              title="Direct Email"
              aria-label="Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] hover:text-white dark:hover:text-[#0F172A] transition-colors"
              title="Curriculum Vitae (PDF)"
              aria-label="Curriculum Vitae"
            >
              <FileText className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Row: Build Telemetry & Back to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px]">
          <div className="flex flex-wrap items-center gap-2">
            <span>Commit:</span>
            <span className="flex items-center gap-1 text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]">
              <GitCommit className="w-3.5 h-3.5 text-[#6366F1]" />
              <span>{buildMetadata.commitHash} ({buildMetadata.branch})</span>
            </span>
            <span>•</span>
            <span>{buildMetadata.publicRepos} GitHub repositories verified</span>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-auto">
            <div>
              IST: <span className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-semibold">{currentTime || '--:--:--'}</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/10 dark:border-white/10 light:border-black/10 bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#9AA4B2] hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#6366F1]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
