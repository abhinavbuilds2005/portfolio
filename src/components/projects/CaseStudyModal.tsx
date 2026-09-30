import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { Project } from '../../lib/types';
import { DocuShieldForensicReveal } from './DocuShieldForensicReveal';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [curveDrawn, setCurveDrawn] = useState(false);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setCurveDrawn(true), 150);
      return () => {
        document.body.style.overflow = '';
        clearTimeout(timer);
        setCurveDrawn(false);
      };
    }
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-2xl overflow-hidden"
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#e58b24] font-bold">
              CASE STUDY //
            </span>
            <span className="font-mono text-xs text-[#a8a29e] uppercase">
              {project.categoryLabel}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-[#a8a29e] hover:text-[#f5f2eb] hover:bg-[#2b2a27] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Title & External Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2b2a27]/60">
            <div>
              <h2 id="case-study-title" className="text-2xl sm:text-3xl font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
                {project.title}
              </h2>
              <p className="text-sm text-[#e58b24] font-mono mt-1">
                {project.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium bg-[#e58b24] hover:bg-[#d97706] text-[#121212] transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium border border-[#2b2a27] bg-[#161616] text-[#f5f2eb] hover:border-[#e58b24]/50 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Outcome Highlight Box */}
          <div className="p-4 rounded border border-[#e58b24]/40 bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5]">
            <div className="font-mono text-[11px] text-[#e58b24] uppercase tracking-wider mb-1 flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Engineering Outcome</span>
            </div>
            <p className="text-sm text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] font-medium leading-relaxed">
              {project.outcome}
            </p>
          </div>

          {/* Summary */}
          <div>
            <h3 className="font-mono text-xs text-[#a8a29e] uppercase tracking-wider mb-2">
              System Architecture & Summary
            </h3>
            <p className="text-sm text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Special Feature: DocuShield Forensic Tamper Slider */}
          {project.id === 'docushield' && project.elaImage && (
            <DocuShieldForensicReveal
              originalImage={project.image}
              heatmapImage={project.elaImage}
            />
          )}

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded border border-[#2b2a27] bg-[#161616]">
              <div className="font-mono text-xs text-[#a8a29e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#a8a29e]" />
                <span>Problem & Constraints</span>
              </div>
              <p className="text-xs sm:text-sm text-[#a8a29e] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded border border-[#2b2a27] bg-[#161616]">
              <div className="font-mono text-xs text-[#e58b24] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#e58b24]" />
                <span>Algorithmic Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-[#a8a29e] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Self-drawing ROC / Accuracy Curve */}
          {project.rocCurve && (
            <div className="p-4 rounded border border-[#2b2a27] bg-[#161616]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 font-mono text-xs text-[#e58b24] font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>ROC / PR DISCRIMINATION CURVE (AUC: {project.rocCurve.auc})</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-[#2b2a27] text-[#78716c]">
                  Sample Data Benchmark
                </span>
              </div>

              <div className="relative w-full h-40 mt-3">
                <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
                  {/* Grid */}
                  <line x1="20" y1="20" x2="280" y2="20" stroke="#2b2a27" strokeDasharray="3 3" />
                  <line x1="20" y1="60" x2="280" y2="60" stroke="#2b2a27" strokeDasharray="3 3" />
                  <line x1="20" y1="100" x2="280" y2="100" stroke="#2b2a27" />
                  <line x1="20" y1="10" x2="20" y2="100" stroke="#2b2a27" />

                  {/* Diagonal baseline (random guess AUC = 0.5) */}
                  <line x1="20" y1="100" x2="280" y2="20" stroke="#3f3e3b" strokeDasharray="2 2" strokeWidth="1" />

                  {/* Self-drawing ROC Curve */}
                  <path
                    d="M 20 100 C 40 40, 100 24, 280 20"
                    fill="none"
                    stroke="#e58b24"
                    strokeWidth="2.5"
                    strokeDasharray={curveDrawn ? "none" : "400"}
                    strokeDashoffset={curveDrawn ? "0" : "400"}
                    style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                  />

                  {/* Area under curve fill */}
                  <path
                    d="M 20 100 C 40 40, 100 24, 280 20 L 280 100 Z"
                    fill="rgba(229, 139, 36, 0.08)"
                  />
                </svg>

                <div className="flex justify-between font-mono text-[9px] text-[#78716c] px-4 mt-1">
                  <span>0.0 (Low False Positive Rate)</span>
                  <span>1.0 (High Recall)</span>
                </div>
              </div>
            </div>
          )}

          {/* Key Engineering Features */}
          <div>
            <h3 className="font-mono text-xs text-[#a8a29e] uppercase tracking-wider mb-2">
              Key Engineering Features
            </h3>
            <ul className="space-y-2">
              {project.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#a8a29e]">
                  <span className="font-mono text-[#e58b24] font-bold mt-0.5">0{i+1}.</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics Readout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded border border-[#2b2a27] bg-[#161616]">
                <div className="font-mono text-[10px] text-[#78716c] uppercase">{m.label}</div>
                <div className="font-mono text-sm font-bold text-[#f5f2eb] mt-0.5">
                  {m.value}
                </div>
                {m.isSample && (
                  <span className="font-mono text-[9px] text-[#e58b24]">
                    *Sample data
                  </span>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] flex items-center justify-between">
          <div className="font-mono text-[10px] text-[#78716c]">
            PRESS ESC OR CLICK CLOSE TO EXIT SPEC
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded text-xs font-mono font-medium border border-[#2b2a27] hover:border-[#e58b24]/50 text-[#f5f2eb] transition-colors"
          >
            Close Spec
          </button>
        </div>

      </div>
    </div>
  );
};
