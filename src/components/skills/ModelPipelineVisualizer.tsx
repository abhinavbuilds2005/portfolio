import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  FileCode, 
  Terminal,
  Activity
} from 'lucide-react';
import { PIPELINE_STAGES, PipelineStage } from '../../data/pipeline';

interface ModelPipelineVisualizerProps {
  onOpenCaseStudy?: (projectId: string) => void;
}

export const ModelPipelineVisualizer: React.FC<ModelPipelineVisualizerProps> = () => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const currentStage: PipelineStage = PIPELINE_STAGES[activeStepIdx];

  return (
    <div className="mb-12 p-6 rounded-lg border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative overflow-hidden">
      {/* Background gradient/pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(229,139,36,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(229,139,36,0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-[#2b2a27]/60 relative">
        <div className="flex items-center gap-2 font-mono text-xs text-[#e58b24] font-semibold">
          <GitBranch className="w-4 h-4" />
          <span>METHODOLOGY // 7-STAGE INTELLIGENT MODEL LIFECYCLE</span>
        </div>
        <span className="font-mono text-[10px] text-[#78716c]">
          ENGINEERING ARCHITECTURE & DISCIPLINE
        </span>
      </div>

      <div className="max-w-3xl mb-6 relative">
        <h3 className="text-xl sm:text-2xl font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-2">
          How I Build Intelligent Systems
        </h3>
        <p className="text-xs sm:text-sm text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed">
          An engineering blueprint of end-to-end model development. Click through any lifecycle stage to review practical engineering considerations, diagnostic tools, and real project implementations.
        </p>
      </div>

      {/* 7 Horizontal Step Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6 relative">
        {PIPELINE_STAGES.map((st, idx) => {
          const isActive = idx === activeStepIdx;
          return (
            <button
              key={st.step}
              type="button"
              onClick={() => setActiveStepIdx(idx)}
              className={`p-2.5 rounded text-left transition-all border font-mono ${
                isActive
                  ? 'bg-[#e58b24]/15 border-[#e58b24] text-[#f5f2eb] shadow-[0_0_10px_rgba(229,139,36,0.2)]'
                  : 'bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] border-[#2b2a27] text-[#a8a29e] hover:border-[#e58b24]/40 hover:text-[#f5f2eb]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className={isActive ? 'text-[#e58b24] font-bold' : 'text-[#78716c]'}>
                  STAGE [{st.step}]
                </span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#e58b24]" />}
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
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-lg border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] relative"
        >
          {/* Left: Summary & Rationale (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#e58b24] font-semibold mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>LIFECYCLE STAGE [{currentStage.step}/07]</span>
            </div>

            <h4 className="text-lg font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-2">
              {currentStage.title}
            </h4>

            <p className="text-xs sm:text-sm text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed mb-4">
              {currentStage.desc}
            </p>

            <div className="p-3 rounded border border-[#2b2a27] bg-[#121212] dark:bg-[#121212] light:bg-[#ffffff]">
              <div className="font-mono text-[10px] text-[#e58b24] uppercase mb-1">
                Engineering Rationale:
              </div>
              <p className="font-mono text-xs text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] leading-relaxed">
                "{currentStage.rationale}"
              </p>
            </div>
          </div>

          {/* Right: Tools & Linked Projects (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#2b2a27]/60 pt-4 lg:pt-0 lg:pl-6">
            <div>
              <div className="font-mono text-[10px] text-[#78716c] uppercase mb-2">
                Operational Toolchain & Diagnostics:
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {currentStage.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-mono px-2 py-0.5 rounded bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#eae5db] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] border border-[#2b2a27]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="font-mono text-[10px] text-[#78716c] uppercase mb-2">
                Implemented Across Repositories:
              </div>
              <div className="space-y-1.5 mb-4 font-mono text-xs text-[#e58b24]">
                {currentStage.projects.map((proj) => (
                  <div key={proj} className="flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-[#e58b24]" />
                    <span className="text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">{proj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#2b2a27]/60 font-mono text-[11px] text-[#78716c]">
              <span className="text-[#e58b24]">METRICS TARGET: </span>
              <span>{currentStage.metricsNote}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
