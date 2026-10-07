import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, ArrowRight, Activity } from 'lucide-react';
import { PIPELINE_STAGES, PipelineStage } from '../../data/pipeline';

interface ModelPipelineVisualizerProps {
  onOpenCaseStudy?: (projectId: string) => void;
}

export const ModelPipelineVisualizer: React.FC<ModelPipelineVisualizerProps> = () => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const currentStage: PipelineStage = PIPELINE_STAGES[activeStepIdx];

  return (
    <div className="p-6 rounded-lg border border-border-subtle bg-surface shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-accent font-semibold">
          <GitBranch className="w-4 h-4" />
          <span>METHODOLOGY // 7-STAGE INTELLIGENT MODEL LIFECYCLE</span>
        </div>
        <span className="font-mono text-xs text-text-muted">
          ENGINEERING ARCHITECTURE & DISCIPLINE
        </span>
      </div>

      <div className="max-w-3xl mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
          How I Build Intelligent Systems
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          An engineering blueprint of end-to-end model development. Click through any lifecycle stage to review practical engineering considerations, diagnostic tools, and real project implementations.
        </p>
      </div>

      {/* 7 Horizontal Step Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
        {PIPELINE_STAGES.map((st, idx) => {
          const isActive = idx === activeStepIdx;
          return (
            <button
              key={st.step}
              type="button"
              onClick={() => setActiveStepIdx(idx)}
              className={`p-2.5 rounded-md text-left transition-all border font-mono ${
                isActive
                  ? 'bg-accent/15 border-accent text-text-primary shadow-sm'
                  : 'bg-base border-border-subtle text-text-secondary hover:border-border-strong hover:text-text-primary'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={isActive ? 'text-accent font-bold' : 'text-text-muted'}>
                  STAGE [{st.step}]
                </span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
              </div>
              <div className="text-xs font-semibold truncate">
                {st.shortTitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage.step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-lg border border-border-subtle bg-base"
        >
          {/* Left: Summary & Rationale (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-accent font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>LIFECYCLE STAGE [{currentStage.step}/07]</span>
            </div>

            <h4 className="text-lg font-bold text-text-primary">
              {currentStage.title}
            </h4>

            <p className="text-sm text-text-secondary leading-relaxed">
              {currentStage.desc}
            </p>

            <div className="p-3.5 rounded border border-border-subtle bg-elevated">
              <div className="font-mono text-xs text-accent uppercase mb-1">
                Engineering Rationale:
              </div>
              <p className="font-mono text-xs text-text-primary leading-relaxed">
                "{currentStage.rationale}"
              </p>
            </div>
          </div>

          {/* Right: Tools & Linked Projects (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border-subtle pt-4 lg:pt-0 lg:pl-6 space-y-4">
            <div>
              <div className="font-mono text-xs text-text-muted uppercase mb-2">
                Operational Toolchain:
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {currentStage.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-mono px-2.5 py-0.5 rounded bg-surface text-text-primary border border-border-subtle"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="font-mono text-xs text-text-muted uppercase mb-2">
                Implemented Across Repositories:
              </div>
              <div className="space-y-1.5 font-mono text-xs">
                {currentStage.projects.map((proj) => (
                  <div key={proj} className="flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-accent" />
                    <span className="text-text-primary">{proj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border-subtle font-mono text-xs text-text-muted">
              <span className="text-accent font-semibold">METRICS TARGET: </span>
              <span>{currentStage.metricsNote}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
