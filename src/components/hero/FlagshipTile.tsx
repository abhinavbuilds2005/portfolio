import React from 'react';
import { ExternalLink, Github, ShieldCheck, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../../data/projects';

interface FlagshipTileProps {
  onOpenCaseStudy: (projectId: string) => void;
}

export const FlagshipTile: React.FC<FlagshipTileProps> = ({ onOpenCaseStudy }) => {
  const docushield = PROJECTS.find((p) => p.id === 'docushield') || PROJECTS[0];

  return (
    <div className="flex flex-col justify-between p-6 sm:p-7 rounded border-2 border-[#e58b24]/50 dark:border-[#e58b24]/50 light:border-[#c84b31]/50 bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative overflow-hidden group">
      
      {/* Top Tag & Flagship Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#e58b24]/15 text-[#e58b24] border border-[#e58b24]/30">
              Flagship Project
            </span>
            <span className="font-mono text-[10px] text-[#78716c] uppercase">
              SIH 2026 // Problem SIH26188
            </span>
          </div>
          <span className="flex items-center gap-1 font-mono text-[10px] text-[#e58b24]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e58b24] animate-pulse"></span>
            Live Deployment
          </span>
        </div>

        {/* Project Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-2 tracking-tight group-hover:text-[#e58b24] transition-colors">
          DocuShield AI: Multimodal Forensic Screening
        </h2>

        {/* User-mandated description: "A multimodal forensic screening system for five ID document types." */}
        <p className="text-xs sm:text-sm text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed mb-4">
          A multimodal forensic screening system for five ID document types. Integrates Error Level Analysis (ELA) tamper heatmaps, ORB+RANSAC copy-move verification, ICAO MRZ checksums, and facial biometric verification into an explainable forensic risk engine.
        </p>

        {/* Outcome Line (Mandated) */}
        <div className="p-3 rounded border border-[#2b2a27]/80 dark:border-[#2b2a27]/80 light:border-[#e6dfd5] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] mb-4">
          <div className="font-mono text-[10px] text-[#e58b24] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Target Outcome</span>
          </div>
          <p className="text-xs text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] font-medium leading-relaxed">
            {docushield.outcome}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Python", "OpenCV", "EasyOCR", "FastAPI", "Docker", "Verhoeff D5"].map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-[11px] font-mono border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#121212] dark:bg-[#121212] light:bg-[#ffffff] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action links */}
      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#2b2a27]/60">
        {docushield.liveUrl && (
          <a
            href={docushield.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium tracking-wide bg-[#e58b24] hover:bg-[#d97706] text-[#121212] transition-colors"
          >
            <span>Launch App</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}

        {docushield.repoUrl && (
          <a
            href={docushield.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium tracking-wide border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] hover:border-[#e58b24]/50 bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Source</span>
          </a>
        )}

        <button
          onClick={() => onOpenCaseStudy(docushield.id)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono font-medium tracking-wide border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] hover:border-[#e58b24]/50 text-[#a8a29e] hover:text-[#f5f2eb] transition-colors ml-auto"
        >
          <span>Deep Spec</span>
          <ArrowRight className="w-3 h-3 text-[#e58b24]" />
        </button>
      </div>

    </div>
  );
};
