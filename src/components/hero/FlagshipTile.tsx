import React from 'react';
import { ExternalLink, Github, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../../data/projects';

interface FlagshipTileProps {
  onOpenCaseStudy: (projectId: string) => void;
}

export const FlagshipTile: React.FC<FlagshipTileProps> = ({ onOpenCaseStudy }) => {
  const docushield = PROJECTS.find((p) => p.id === 'docushield') || PROJECTS[0];
  const shouldReduceMotion = useReducedMotion();

  const techTags = ["Computer Vision", "OpenCV", "EasyOCR", "FastAPI", "Docker", "Verhoeff Checksum"];

  return (
    <div className="flex flex-col justify-between p-6 sm:p-7 rounded-xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-xl relative overflow-hidden group card-hover-lift h-full">
      
      {/* Ambient subtle corner glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#6366F1]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#6366F1]/10 transition-colors duration-500" />

      <div>
        {/* Top Header Tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/20">
              Featured Case Study
            </span>
            <span className="font-mono text-[10px] text-[#667085]">
              SIH 2026 // Problem SIH26188
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#34D399]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            <span>Live System</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] mb-2 tracking-tight group-hover:text-[#6366F1] transition-colors">
          DocuShield AI: Multimodal Forensic Screening
        </h2>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed mb-4">
          An enterprise-grade document authenticity screening system for five ID categories. Eliminates single-modality forgery bypasses by combining Error Level Analysis (ELA), ICAO MRZ check digits, and facial biometric verification into an explainable 0–100% forensic risk score.
        </p>

        {/* Outcome Box */}
        <div className="p-3.5 rounded-lg border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] mb-4">
          <div className="font-mono text-[10px] text-[#22D3EE] uppercase tracking-wider mb-1 flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Engineered Outcome</span>
          </div>
          <p className="text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-medium leading-relaxed">
            {docushield.outcome}
          </p>
        </div>

        {/* Verified Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 font-mono text-xs">
          <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
            <div className="text-[10px] text-[#667085]">Document Classes</div>
            <div className="text-xs font-semibold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] mt-0.5">5 Verified Types</div>
          </div>
          <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
            <div className="text-[10px] text-[#667085]">Checksums</div>
            <div className="text-xs font-semibold text-[#34D399] mt-0.5">100% ICAO & D5</div>
          </div>
          <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04] col-span-2 sm:col-span-1">
            <div className="text-[10px] text-[#667085]">Engine Design</div>
            <div className="text-xs font-semibold text-[#818CF8] mt-0.5">5-Tier Fusion</div>
          </div>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {techTags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action links */}
      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06]">
        {docushield.liveUrl && (
          <a
            href={docushield.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-colors shadow-sm"
          >
            <span>Launch Live App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {docushield.repoUrl && (
          <a
            href={docushield.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-white/10 dark:border-white/10 light:border-black/10 hover:border-white/25 bg-[#151B22] dark:bg-[#151B22] light:bg-white text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-[#9AA4B2]" />
            <span>Repository</span>
          </a>
        )}

        <button
          onClick={() => onOpenCaseStudy(docushield.id)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-white/10 dark:border-white/10 light:border-black/10 hover:border-[#6366F1]/50 text-[#9AA4B2] hover:text-white transition-colors ml-auto"
        >
          <span>View Architecture & Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#6366F1]" />
        </button>
      </div>

    </div>
  );
};
