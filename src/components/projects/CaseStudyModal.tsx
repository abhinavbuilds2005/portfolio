import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, TrendingUp, Cpu, Lightbulb, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../lib/types';
import { DocuShieldForensicReveal } from './DocuShieldForensicReveal';
import { DocuShieldArchitectureDiagram } from './DocuShieldArchitectureDiagram';

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, isOpen, onClose }) => {
  const [curveDrawn, setCurveDrawn] = useState(false);

  useEffect(() => {
    if (isOpen && project) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setCurveDrawn(true), 150);
      return () => {
        document.body.style.overflow = '';
        clearTimeout(timer);
        setCurveDrawn(false);
      };
    }
  }, [isOpen, project]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

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
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-lg border border-border-strong bg-surface shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-elevated">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent font-bold">
                ENGINEERING CASE STUDY //
              </span>
              <span className="font-mono text-xs text-text-secondary uppercase">
                {project.categoryLabel}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-base transition-colors"
              aria-label="Close case study dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Title & Live Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border-subtle">
              <div>
                <h2 id="case-study-title" className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                  {project.title}
                </h2>
                <p className="text-sm text-text-secondary font-mono mt-1">
                  {project.tagline}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-mono font-medium bg-accent hover:bg-accent-hover text-base transition-colors shadow-sm"
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
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-mono font-medium border border-border-subtle bg-base text-text-primary hover:border-border-strong hover:text-accent transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>
                )}
              </div>
            </div>

            {/* 1. Verified Outcome Statement */}
            <div className="p-4 rounded-lg border border-border-subtle bg-base">
              <div className="font-mono text-xs text-live uppercase tracking-wider mb-1 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Engineering Outcome</span>
              </div>
              <p className="text-sm text-text-primary leading-relaxed">
                {project.outcome}
              </p>
            </div>

            {/* 2. Problem & Real-World Constraints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-lg border border-border-subtle bg-base">
                <div className="font-mono text-xs text-text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-accent" />
                  <span>Problem Statement</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 rounded-lg border border-border-subtle bg-base">
                <div className="font-mono text-xs text-text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                  <Wrench className="w-4 h-4 text-text-muted" />
                  <span>Operational Constraints</span>
                </div>
                {project.constraints && project.constraints.length > 0 ? (
                  <ul className="space-y-1.5 text-sm text-text-secondary">
                    {project.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-accent font-mono mt-0.5">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-text-muted font-mono">
                    Standard production constraints: Low latency, reproducible inference, schema isolation.
                  </p>
                )}
              </div>
            </div>

            {/* 3. Algorithmic Approach & Architecture */}
            <div className="p-5 rounded-lg border border-border-subtle bg-base">
              <div className="font-mono text-xs text-text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                <Cpu className="w-4 h-4 text-accent" />
                <span>Algorithmic Approach & Architecture</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.approach || project.summary}
              </p>
            </div>

            {/* Special: DocuShield AI Architecture Flow Diagram */}
            {project.id === 'docushield' && (
              <DocuShieldArchitectureDiagram />
            )}

            {/* Special: DocuShield Before / After Forensic Reveal Slider */}
            {project.id === 'docushield' && project.elaImage && (
              <div className="space-y-2">
                <div className="font-mono text-xs text-text-primary uppercase tracking-wider font-bold">
                  Forensic Tamper Heatmap Inspector (Drag Slider)
                </div>
                <DocuShieldForensicReveal
                  originalImage={project.image}
                  heatmapImage={project.elaImage}
                />
              </div>
            )}

            {/* 4. Decisions and Tradeoffs */}
            {project.decisionsAndTradeoffs && project.decisionsAndTradeoffs.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
                  <div className="font-mono text-xs text-text-primary uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    <span>Key Engineering Decisions & Tradeoffs</span>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded border border-border-subtle text-text-secondary bg-base">
                    Architecture
                  </span>
                </div>

                <div className="space-y-3">
                  {project.decisionsAndTradeoffs.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border border-border-subtle bg-base space-y-1.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="text-sm font-bold text-text-primary">
                          0{idx + 1}. {item.decision}
                        </div>
                      </div>

                      <div className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        <span className="font-mono text-xs text-text-muted uppercase mr-1">Rationale:</span>
                        {item.rationale}
                      </div>

                      <div className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        <span className="font-mono text-xs text-accent uppercase mr-1">Tradeoff:</span>
                        {item.tradeoff}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Results & Metrics Block */}
            <div className="p-5 rounded-lg border border-border-subtle bg-base space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
                <div className="font-mono text-xs text-text-primary uppercase tracking-wider font-bold">
                  Results & Evaluation Metrics
                </div>
                <span className="font-mono text-xs text-text-muted">
                  Audited against active test sets
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(project.results || project.metrics).map((m, idx) => (
                  <div key={idx} className="p-3 rounded border border-border-subtle bg-elevated">
                    <div className="font-mono text-xs text-text-muted uppercase truncate">{m.label}</div>
                    <div className="font-mono text-sm font-bold text-text-primary mt-1">
                      {m.value}
                    </div>
                    {m.notes && (
                      <div className="font-mono text-xs text-text-secondary mt-0.5 truncate">
                        {m.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* PR / Calibration Curve */}
              {project.rocCurve && (
                <div className="pt-2 border-t border-border-subtle">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 font-mono text-xs text-text-secondary">
                      <TrendingUp className="w-3.5 h-3.5 text-accent" />
                      <span>PR / ROC Discrimination Curve (AUC: {project.rocCurve.auc})</span>
                    </div>
                    <span className="font-mono text-xs px-2 py-0.5 rounded border border-border-subtle text-accent bg-base">
                      Verified Test Partition
                    </span>
                  </div>

                  <div className="relative w-full h-36 mt-2 bg-base rounded border border-border-subtle overflow-hidden">
                    <svg viewBox="0 0 300 110" className="w-full h-full overflow-visible">
                      <line x1="25" y1="20" x2="280" y2="20" stroke="var(--border-subtle)" strokeDasharray="3 3" strokeWidth="0.8" />
                      <line x1="25" y1="55" x2="280" y2="55" stroke="var(--border-subtle)" strokeDasharray="3 3" strokeWidth="0.8" />
                      <line x1="25" y1="90" x2="280" y2="90" stroke="var(--border-subtle)" strokeWidth="1" />
                      <line x1="25" y1="10" x2="25" y2="90" stroke="var(--border-subtle)" strokeWidth="1" />

                      {/* Random guess diagonal */}
                      <line x1="25" y1="90" x2="280" y2="20" stroke="var(--border-strong)" strokeDasharray="2 2" strokeWidth="0.8" />

                      {/* ROC Curve */}
                      <path
                        d="M 25 90 C 45 35, 110 24, 280 20"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="2"
                        strokeDasharray="400"
                        strokeDashoffset={curveDrawn ? '0' : '400'}
                        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* 6. Planned Next Iterations */}
            {project.nextImprovements && project.nextImprovements.length > 0 && (
              <div className="p-5 rounded-lg border border-border-subtle bg-base">
                <div className="font-mono text-xs text-text-primary uppercase tracking-wider mb-2 font-bold">
                  Engineering Roadmap & Future Iterations
                </div>
                <ul className="space-y-1.5 text-sm text-text-secondary">
                  {project.nextImprovements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono text-accent text-xs">0{idx + 1}.</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3 border-t border-border-subtle bg-elevated flex items-center justify-between">
            <span className="font-mono text-xs text-text-muted">
              Press <kbd className="px-1.5 py-0.5 rounded border border-border-subtle bg-base text-text-secondary">ESC</kbd> to exit
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-md text-xs font-mono font-medium border border-border-subtle hover:border-border-strong bg-base text-text-primary hover:text-accent transition-colors"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
