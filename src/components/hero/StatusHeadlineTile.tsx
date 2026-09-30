import React, { useState, useEffect } from 'react';
import { ArrowDown, Mail, FileText } from 'lucide-react';

export const StatusHeadlineTile: React.FC = () => {
  const [terminalText, setTerminalText] = useState('training…');
  const [isFinal, setIsFinal] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTerminalText('open to internships');
      setIsFinal(true);
      return;
    }

    const sequence = [
      { text: 'training…', duration: 350 },
      { text: 'evaluating…', duration: 400 },
      { text: 'deployed', duration: 350 },
      { text: 'open to internships', duration: 0 }
    ];

    let currentStep = 0;
    const runSequence = () => {
      if (currentStep < sequence.length - 1) {
        currentStep++;
        setTerminalText(sequence[currentStep].text);
        if (currentStep === sequence.length - 1) {
          setIsFinal(true);
        } else {
          setTimeout(runSequence, sequence[currentStep].duration);
        }
      }
    };

    const timer = setTimeout(runSequence, sequence[0].duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-between p-6 sm:p-7 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative overflow-hidden">
      <div>
        {/* Terminal status badge */}
        <div className="flex items-center gap-2 mb-4 font-mono text-xs">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isFinal ? 'bg-[#e58b24]' : 'bg-[#78716c]'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isFinal ? 'bg-[#e58b24]' : 'bg-[#78716c]'}`}></span>
          </span>
          <span className="text-[#78716c] dark:text-[#78716c] light:text-[#a8a29e] uppercase tracking-wider text-[11px]">
            SYS_STATUS:
          </span>
          <span className="text-[#e58b24] dark:text-[#e58b24] light:text-[#c84b31] font-semibold tracking-wide">
            {terminalText}
          </span>
        </div>

        {/* Technical title label */}
        <div className="font-mono text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] uppercase tracking-wide-tech mb-2">
          AI/ML Engineer · 2nd-Year B.Tech CSE (AIML) @ LPU
        </div>

        {/* Main headline */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-4 leading-snug">
          Engineering Practical Intelligent Systems & Scalable ML Pipelines.
        </h1>

        {/* Bio paragraph */}
        <p className="text-sm sm:text-base text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed mb-6 max-w-2xl">
          I'm <strong className="text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] font-semibold">Abhinav Anand</strong>. I architect predictive models, multimodal forensic document screening, and resilient full-stack systems with verifiable engineering rigor.
        </p>

        {/* Quick-scan strip for recruiters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded border border-[#2b2a27]/60 dark:border-[#2b2a27]/60 light:border-[#e6dfd5] bg-[#121212]/50 dark:bg-[#121212]/50 light:bg-[#faf8f5] mb-6">
          <div>
            <div className="font-mono text-[10px] text-[#78716c] uppercase">Target Roles</div>
            <div className="text-xs font-medium text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">AI/ML & Systems Intern</div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-[#78716c] uppercase">Availability</div>
            <div className="text-xs font-medium text-[#e58b24] dark:text-[#e58b24] light:text-[#c84b31]">Immediate · Remote / On-Site</div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-[#78716c] uppercase">Location</div>
            <div className="text-xs font-medium text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">India (UTC+5:30)</div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-medium tracking-wide bg-[#e58b24] hover:bg-[#d97706] text-[#121212] transition-colors"
        >
          <span>Explore Projects</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>

        <a
          href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-medium tracking-wide border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] hover:border-[#e58b24]/60 bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Curriculum Vitae</span>
        </a>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-medium tracking-wide border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] hover:border-[#e58b24]/60 bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contact</span>
        </a>
      </div>
    </div>
  );
};
