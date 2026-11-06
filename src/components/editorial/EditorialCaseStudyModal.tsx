import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, AlertTriangle, Layers, Activity } from 'lucide-react';
import { Project } from '../../lib/types';

interface EditorialCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const EditorialCaseStudyModal: React.FC<EditorialCaseStudyModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#132532]/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-[#F5F2EB] text-[#132532] border border-[#132532]/20 shadow-2xl my-8 overflow-hidden"
        >
          {/* Modal Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#F5F2EB]/95 backdrop-blur-md border-b border-[#132532]/12">
            <div>
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#315CFF]">
                ENGINEERING ARCHITECTURE BRIEF
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#132532] font-sans">
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 border border-[#132532]/20 hover:border-[#132532] text-[#132532] transition-colors cursor-pointer"
              aria-label="Close case study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-6 sm:p-10 space-y-8 max-h-[75vh] overflow-y-auto">
            {/* Top Overview & Tagline */}
            <div className="space-y-3">
              <p className="text-lg sm:text-xl font-semibold text-[#132532] leading-snug">
                {project.tagline}
              </p>
              <p className="text-sm sm:text-base text-[#132532] text-opacity-90 leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Problem & Engineering Constraints */}
            <div className="bg-white p-6 border border-[#132532]/12 space-y-4">
              <div className="font-mono text-xs uppercase tracking-wider font-bold text-[#F0784B] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>CORE PROBLEM & CONSTRAINTS</span>
              </div>
              <p className="text-sm text-[#132532]/85 leading-relaxed font-sans">
                {project.problem}
              </p>
              {project.constraints && (
                <ul className="space-y-2 pt-2 border-t border-[#132532]/10">
                  {project.constraints.map((c, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[#132532]/80 flex items-start gap-2">
                      <span className="text-[#315CFF] font-mono font-bold">[{i + 1}]</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Decisions & Tradeoffs Table */}
            {project.decisionsAndTradeoffs && project.decisionsAndTradeoffs.length > 0 && (
              <div className="space-y-3">
                <div className="font-mono text-xs uppercase tracking-wider font-bold text-[#315CFF] flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>AUDITED ARCHITECTURAL TRADEOFFS</span>
                </div>
                <div className="space-y-3">
                  {project.decisionsAndTradeoffs.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-5 border border-[#132532]/12 space-y-2 font-sans"
                    >
                      <div className="text-sm sm:text-base font-bold text-[#132532]">
                        {item.decision}
                      </div>
                      <div className="text-xs sm:text-sm text-[#132532]/80 leading-relaxed">
                        <strong className="text-[#132532]">Rationale:</strong> {item.rationale}
                      </div>
                      <div className="text-xs sm:text-sm text-[#132532]/70 leading-relaxed">
                        <strong className="text-[#F0784B]">Tradeoff:</strong> {item.tradeoff}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benchmark Results */}
            {project.results && project.results.length > 0 && (
              <div className="space-y-3">
                <div className="font-mono text-xs uppercase tracking-wider font-bold text-[#132532] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#315CFF]" />
                  <span>MEASURED EVALUATION BENCHMARKS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.results.map((res, i) => (
                    <div key={i} className="bg-white p-4 border border-[#132532]/12 font-mono">
                      <div className="text-xs text-[#132532]/60 uppercase">{res.label}</div>
                      <div className="text-base sm:text-lg font-extrabold text-[#315CFF] mt-1">
                        {res.value}
                      </div>
                      {res.notes && (
                        <div className="text-[11px] text-[#132532]/70 mt-1 font-sans">
                          {res.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Links */}
          <div className="px-6 sm:px-10 py-4 bg-white border-t border-[#132532]/12 flex items-center justify-between font-mono text-xs uppercase font-bold">
            <div className="flex items-center gap-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#315CFF] hover:underline"
                >
                  <span>LAUNCH LIVE SYSTEM</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#132532] hover:underline"
                >
                  <span>INSPECT SOURCE CODE</span>
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-[#132532]/60 hover:text-[#132532] cursor-pointer"
            >
              CLOSE [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

