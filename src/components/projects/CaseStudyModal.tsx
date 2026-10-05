import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, TrendingUp, Cpu, Lightbulb, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../lib/types';
import { DocuShieldForensicReveal } from './DocuShieldForensicReveal';
import { DocuShieldArchitectureDiagram } from './DocuShieldArchitectureDiagram';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [curveDrawn, setCurveDrawn] = useState(false);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setCurveDrawn(true), 200);
      return () => {
        document.body.style.overflow = '';
        clearTimeout(timer);
        setCurveDrawn(false);
      };
    }
  }, [project]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-lg border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Top Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#e58b24] font-bold">
                ENGINEERING CASE STUDY //
              </span>
              <span className="font-mono text-xs text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] uppercase">
                {project.categoryLabel}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-[#a8a29e] hover:text-[#f5f2eb] hover:bg-[#2b2a27] transition-colors"
              aria-label="Close case study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Title & Live Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#2b2a27]/60">
              <div>
                <h2 id="case-study-title" className="text-2xl sm:text-3xl font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] tracking-tight">
                  {project.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] font-mono mt-1">
                  {project.tagline}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium bg-[#e58b24] hover:bg-[#d97706] text-[#121212] transition-colors shadow-sm"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] hover:border-[#a8a29e] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-[#78716c]" />
                    <span>Repository</span>
                  </a>
                )}
              </div>
            </div>

            {/* 1. Verified Outcome Statement */}
            <div className="p-4 rounded-lg border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5]">
              <div className="font-mono text-[10px] text-[#e58b24] uppercase tracking-wider mb-1 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Engineering Outcome</span>
              </div>
              <p className="text-sm text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] leading-relaxed">
                {project.outcome}
              </p>
            </div>

            {/* 2. Problem & Real-World Constraints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-lg border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5]">
                <div className="font-mono text-xs text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-[#e58b24]" />
                  <span>Problem Statement</span>
                </div>
                <p className="text-xs sm:text-sm text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 rounded-lg border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5]">
                <div className="font-mono text-xs text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                  <Wrench className="w-4 h-4 text-[#78716c]" />
                  <span>Operational Constraints</span>
                </div>
                {project.constraints && project.constraints.length > 0 ? (
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e]">
                    {project.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#78716c] font-mono mt-0.5">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-[#78716c] font-mono">
                    Standard production constraints: Low latency, reproducible inference, schema isolation.
                  </p>
                )}
              </div>
            </div>

            {/* 3. Algorithmic Approach & Architecture */}
            <div className="p-5 rounded-lg border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5]">
              <div className="font-mono text-xs text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                <Cpu className="w-4 h-4 text-[#e58b24]" />
                <span>Algorithmic Approach & Architecture</span>
              </div>
              <p className="text-xs sm:text-sm text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed">
                {project.approach || project.solution}
              </p>
            </div>

            {/* Special: DocuShield AI Architecture Flow Diagram */}
            {project.id === 'docushield' && (
              <DocuShieldArchitectureDiagram />
            )}

            {/* Special: DocuShield Before / After Forensic Reveal Slider */}
            {project.id === 'docushield' && project.elaImage && (
              <div className="space-y-2">
                <div className="font-mono text-xs text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] uppercase tracking-wider font-bold">
                  Forensic Tamper Heatmap Inspector (Drag Slider)
                </div>
                <DocuShieldForensicReveal
                  originalImage={project.image}
                  heatmapImage={project.elaImage}
                />
              </div>
            )}

            {/* 4. Decisions and Tradeoffs (Tagged: [Draft, to be confirmed by Abhinav]) */}
            {project.decisionsAndTradeoffs && project.decisionsAndTradeoffs.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-[#2b2a27]/60">
                  <div className="font-mono text-xs text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Lightbulb className="w-4 h-4 text-[#e58b24]" />
                    <span>Key Engineering Decisions & Tradeoffs</span>
                  </div>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-[#2b2a27] text-[#78716c]">
                    Draft, to be confirmed by Abhinav
                  </span>
                </div>

                <div className="space-y-3">
                  {project.decisionsAndTradeoffs.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] space-y-1.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="text-xs font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
                          0{idx + 1}. {item.decision}
                        </div>
                        <span className="font-mono text-[9px] text-[#78716c] uppercase self-start sm:self-auto">
                          {item.status}
                        </span>
                      </div>

                      <div className="text-xs text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed">
                        <span className="font-mono text-[10px] text-[#78716c] uppercase mr-1">Rationale:</span>
                        {item.rationale}
                      </div>

                      <div className="text-xs text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed">
                        <span className="font-mono text-[10px] text-[#e58b24] uppercase mr-1">Tradeoff:</span>
                        {item.tradeoff}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Results & Metrics Block (With [Add real metric] placeholders) */}
            <div className="p-5 rounded-lg border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#2b2a27]/60">
                <div className="font-mono text-xs text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] uppercase tracking-wider font-bold">
                  Results & Evaluation Metrics
                </div>
                <span className="font-mono text-[10px] text-[#78716c]">
                  Unverified fields tagged [Add real metric]
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(project.results || project.metrics).map((m, idx) => (
                  <div key={idx} className="p-3 rounded border border-[#2b2a27] bg-[#121212] dark:bg-[#121212] light:bg-[#ffffff]">
                    <div className="font-mono text-[10px] text-[#78716c] uppercase truncate">{m.label}</div>
                    <div className="font-mono text-xs sm:text-sm font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mt-1">
                      {m.value}
                    </div>
                    {m.notes && (
                      <div className="font-mono text-[9px] text-[#78716c] mt-0.5 truncate">
                        {m.notes}
                      </div>
                    )}
                    {m.isSample && (
                      <span className="inline-block mt-1 font-mono text-[8px] px-1 py-0.5 rounded border border-[#2b2a27] text-[#78716c]">
                        estimated baseline
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Simulated ROC / Calibration Curve */}
              {project.rocCurve && (
                <div className="pt-2 border-t border-[#2b2a27]/60">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 font-mono text-xs text-[#78716c]">
                      <TrendingUp className="w-3.5 h-3.5 text-[#e58b24]" />
                      <span>PR / ROC Discrimination Curve (AUC: {project.rocCurve.auc})</span>
                    </div>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-[#2b2a27] text-[#e58b24]">
                      {project.rocCurve.isSample ? 'Synthetic Baseline' : 'Verified Test Partition'}
                    </span>
                  </div>

                  <div className="relative w-full h-36 mt-2 bg-[#121212] rounded border border-[#2b2a27]/60 overflow-hidden">
                    <svg viewBox="0 0 300 110" className="w-full h-full overflow-visible">
                      <line x1="25" y1="20" x2="280" y2="20" stroke="#2b2a27" strokeDasharray="3 3" strokeWidth="0.8" />
                      <line x1="25" y1="55" x2="280" y2="55" stroke="#2b2a27" strokeDasharray="3 3" strokeWidth="0.8" />
                      <line x1="25" y1="90" x2="280" y2="90" stroke="#2b2a27" strokeWidth="1" />
                      <line x1="25" y1="10" x2="25" y2="90" stroke="#2b2a27" strokeWidth="1" />

                      {/* Random guess diagonal */}
                      <line x1="25" y1="90" x2="280" y2="20" stroke="#3f3e3b" strokeDasharray="2 2" strokeWidth="0.8" />

                      {/* Animated ROC Curve */}
                      <path
                        d="M 25 90 C 45 35, 110 24, 280 20"
                        fill="none"
                        stroke="#e58b24"
                        strokeWidth="2"
                        strokeDasharray="400"
                        strokeDashoffset={curveDrawn ? '0' : '400'}
                        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
                      />
                    </svg>

                    <div className="flex justify-between font-mono text-[8px] text-[#78716c] px-4 -mt-2">
                      <span>0.0 (FPR)</span>
                      <span>1.0 (Recall / Sensitivity)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 6. What I Would Improve Next */}
            {project.nextImprovements && project.nextImprovements.length > 0 && (
              <div className="p-5 rounded-lg border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5]">
                <div className="font-mono text-xs text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] uppercase tracking-wider mb-2 font-bold">
                  What I Would Improve Next (Engineering Roadmap)
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e]">
                  {project.nextImprovements.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-[#e58b24] text-xs">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Verified Toolchain Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="font-mono text-[10px] text-[#78716c] uppercase mr-1">Verified Toolchain:</span>
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] border border-[#2b2a27] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c]"
                >
                  {t}
                </span>
              ))}
            </div>

          </div>

          {/* Modal Footer Bar */}
          <div className="px-6 py-3 border-t border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#78716c]">
              PRESS ESC OR CLICK OUTSIDE TO CLOSE
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded text-xs font-mono font-medium border border-[#2b2a27] hover:border-[#a8a29e] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] transition-colors"
            >
              Close Case Study
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
