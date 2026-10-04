import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, TrendingUp, Cpu, Lightbulb, Wrench, Sparkles, BookOpen } from 'lucide-react';
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
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-white/10 dark:border-white/10 light:border-black/10 bg-[#0D1014] dark:bg-[#0D1014] light:bg-white shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-[#F0F2F5]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#6366F1] font-semibold uppercase tracking-wider">
                Case Study //
              </span>
              <span className="font-mono text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] uppercase">
                {project.categoryLabel}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9AA4B2] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close case study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7">
            
            {/* Project Title & Links */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div>
                <h2 id="case-study-title" className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] tracking-tight">
                  {project.title}
                </h2>
                <p className="text-sm text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] mt-1.5 leading-relaxed max-w-2xl">
                  {project.tagline}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-colors shadow-sm"
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
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-white/10 dark:border-white/10 light:border-black/10 bg-[#151B22] dark:bg-[#151B22] light:bg-[#F0F2F5] text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] hover:border-white/20 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-[#9AA4B2]" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>

            {/* 1. Engineered Outcome */}
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-[#F0F2F5]">
              <div className="font-mono text-[11px] text-[#34D399] uppercase tracking-wider mb-1 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                <span>Engineered Outcome</span>
              </div>
              <p className="text-sm text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] leading-relaxed">
                {project.outcome}
              </p>
            </div>

            {/* 2. Problem & Real-World Constraints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-white/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-[#F0F2F5]">
                <div className="font-mono text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-[#6366F1]" />
                  <span>The Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 rounded-xl border border-white/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-[#F0F2F5]">
                <div className="font-mono text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                  <Wrench className="w-4 h-4 text-[#22D3EE]" />
                  <span>Operational Constraints</span>
                </div>
                {project.constraints && project.constraints.length > 0 ? (
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]">
                    {project.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#6366F1] font-mono mt-0.5">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-[#667085] font-mono">
                    Low latency, reproducible inference, strict schema typing.
                  </p>
                )}
              </div>
            </div>

            {/* 3. The Approach */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-[#F0F2F5]">
              <div className="font-mono text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                <Cpu className="w-4 h-4 text-[#6366F1]" />
                <span>The Approach & Architecture</span>
              </div>
              <p className="text-xs sm:text-sm text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
                {project.approach || project.solution}
              </p>
            </div>

            {/* Special: DocuShield AI Architecture Flow Diagram */}
            {project.id === 'docushield' && (
              <DocuShieldArchitectureDiagram />
            )}

            {/* Special: DocuShield Forensic Reveal Heatmap */}
            {project.id === 'docushield' && project.elaImage && (
              <div className="space-y-2">
                <div className="font-mono text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] uppercase tracking-wider font-bold">
                  Forensic Tamper Heatmap Inspector (Drag Slider)
                </div>
                <DocuShieldForensicReveal
                  originalImage={project.image}
                  heatmapImage={project.elaImage}
                />
              </div>
            )}

            {/* 4. Engineering Decisions and Tradeoffs */}
            {project.decisionsAndTradeoffs && project.decisionsAndTradeoffs.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
                  <div className="font-mono text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Lightbulb className="w-4 h-4 text-[#22D3EE]" />
                    <span>Key Engineering Decisions & Tradeoffs</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#667085]">
                    Architecture Audit
                  </span>
                </div>

                <div className="space-y-3">
                  {project.decisionsAndTradeoffs.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-white/[0.06] bg-[#11151A] dark:bg-[#11151A] light:bg-[#F0F2F5] space-y-1.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="text-xs font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]">
                          0{idx + 1}. {item.decision}
                        </div>
                      </div>

                      <div className="text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
                        <span className="font-mono text-[10px] text-[#6366F1] uppercase mr-1">Rationale:</span>
                        {item.rationale}
                      </div>

                      <div className="text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
                        <span className="font-mono text-[10px] text-[#22D3EE] uppercase mr-1">Tradeoff:</span>
                        {item.tradeoff}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Results & Metrics */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-[#F0F2F5] space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
                <div className="font-mono text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] uppercase tracking-wider font-bold">
                  Results & Evaluation Metrics
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(project.results || project.metrics).map((m, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-white/[0.06] bg-[#0D1014] dark:bg-[#0D1014] light:bg-white">
                    <div className="font-mono text-[10px] text-[#667085] uppercase truncate">{m.label}</div>
                    <div className="font-mono text-sm font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] mt-1">
                      {m.value}
                    </div>
                    {m.notes && (
                      <div className="font-mono text-[10px] text-[#9AA4B2] mt-0.5 truncate">
                        {m.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ROC / Calibration Curve */}
              {project.rocCurve && (
                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 font-mono text-xs text-[#9AA4B2]">
                      <TrendingUp className="w-3.5 h-3.5 text-[#6366F1]" />
                      <span>PR / ROC Discrimination Curve (AUC: {project.rocCurve.auc})</span>
                    </div>
                  </div>

                  <div className="relative w-full h-32 mt-2 bg-[#0D1014] rounded-lg border border-white/[0.06] overflow-hidden">
                    <svg viewBox="0 0 300 110" className="w-full h-full overflow-visible">
                      <line x1="25" y1="20" x2="280" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" strokeWidth="0.8" />
                      <line x1="25" y1="55" x2="280" y2="55" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" strokeWidth="0.8" />
                      <line x1="25" y1="90" x2="280" y2="90" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                      <line x1="25" y1="10" x2="25" y2="90" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

                      <line x1="25" y1="90" x2="280" y2="20" stroke="rgba(255,255,255,0.15)" strokeDasharray="2 2" strokeWidth="0.8" />

                      <path
                        d="M 25 90 C 45 35, 110 24, 280 20"
                        fill="none"
                        stroke="#6366F1"
                        strokeWidth="2.2"
                        strokeDasharray="400"
                        strokeDashoffset={curveDrawn ? '0' : '400'}
                        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
                      />
                    </svg>

                    <div className="flex justify-between font-mono text-[9px] text-[#667085] px-4 -mt-2">
                      <span>0.0 (FPR)</span>
                      <span>1.0 (Recall / Sensitivity)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 6. What I Would Improve Next / Engineering Roadmap */}
            {project.nextImprovements && project.nextImprovements.length > 0 && (
              <div className="p-5 rounded-xl border border-white/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-[#F0F2F5]">
                <div className="font-mono text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#6366F1]" />
                  <span>What I Learned & What I Would Improve Next</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]">
                  {project.nextImprovements.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-[#6366F1] text-xs">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="font-mono text-[10px] text-[#667085] uppercase mr-1">Verified Toolchain:</span>
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-[#11151A] dark:bg-[#11151A] light:bg-white border border-white/[0.08] text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]"
                >
                  {t}
                </span>
              ))}
            </div>

          </div>

          {/* Modal Footer Bar */}
          <div className="px-6 py-3.5 border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-[#F0F2F5] flex items-center justify-between">
            <span className="font-mono text-[11px] text-[#667085]">
              Press ESC or click outside to dismiss
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg text-xs font-medium border border-white/10 hover:border-white/25 text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] transition-colors"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
