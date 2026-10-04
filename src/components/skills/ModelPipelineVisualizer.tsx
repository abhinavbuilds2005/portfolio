import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  Server, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { PIPELINE_STAGES, PipelineStage } from '../../data/pipeline';

interface ModelPipelineVisualizerProps {
  onOpenCaseStudy?: (projectId: string) => void;
}

export const ModelPipelineVisualizer: React.FC<ModelPipelineVisualizerProps> = () => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(3); // Default to Model Selection
  const currentStage: PipelineStage = PIPELINE_STAGES[activeStepIdx];

  const stageIcons = [
    <Database className="w-4 h-4 text-[#22D3EE]" />,
    <Filter className="w-4 h-4 text-[#38BDF8]" />,
    <Cpu className="w-4 h-4 text-[#818CF8]" />,
    <Sparkles className="w-4 h-4 text-[#6366F1]" />,
    <Activity className="w-4 h-4 text-[#34D399]" />,
    <Server className="w-4 h-4 text-[#F59E0B]" />,
    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
  ];

  return (
    <section id="methodology" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
      
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-[#6366F1] font-semibold uppercase tracking-wider mb-2">
          <Activity className="w-3.5 h-3.5" />
          <span>Engineering Methodology</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] mb-4">
          How I Build AI Systems
        </h2>
        <p className="text-base text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
          From data ingestion and preprocessing to empirical evaluation and containerized edge delivery. Every model lifecycle is treated with production rigor rather than quick notebook prototyping.
        </p>
      </div>

      {/* Main Interactive Pipeline Box */}
      <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-xl relative overflow-hidden">
        
        {/* Animated Connecting Track */}
        <div className="relative w-full h-1 bg-white/[0.06] dark:bg-white/[0.06] light:bg-black/[0.06] rounded-full mb-8 hidden lg:block overflow-hidden">
          <motion.div
            className="absolute top-0 bottom-0 bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#34D399]"
            animate={{ width: `${((activeStepIdx + 1) / PIPELINE_STAGES.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          />
        </div>

        {/* 7 Horizontal Lifecycle Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-8">
          {PIPELINE_STAGES.map((st, idx) => {
            const isActive = idx === activeStepIdx;
            const isCompleted = idx < activeStepIdx;

            return (
              <button
                key={st.step}
                type="button"
                onClick={() => setActiveStepIdx(idx)}
                className={`p-3.5 rounded-xl text-left transition-all border flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#6366F1]/15 border-[#6366F1] shadow-subtle-glow scale-[1.02]'
                    : isCompleted
                    ? 'bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] border-white/[0.08] text-[#F5F7FA]'
                    : 'bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] border-white/[0.04] text-[#9AA4B2] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#6366F1]/20' : 'bg-white/[0.04]'}`}>
                    {stageIcons[idx] || <Cpu className="w-4 h-4 text-[#6366F1]" />}
                  </div>
                  <span className={`font-mono text-[10px] ${isActive ? 'text-[#818CF8] font-bold' : 'text-[#667085]'}`}>
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] truncate">
                    {st.shortTitle}
                  </div>
                  <div className="text-[10px] font-mono text-[#667085] truncate mt-0.5">
                    {st.tools.slice(0, 2).join(', ')}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Inspector Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-7 rounded-xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F7F8FA]"
          >
            {/* Left Detail (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#6366F1] font-semibold">
                <span>STAGE [{currentStage.step} OF 07]</span>
                <span className="text-[#667085]">•</span>
                <span className="text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]">{currentStage.shortTitle}</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]">
                {currentStage.title}
              </h4>

              <p className="text-sm text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
                {currentStage.desc}
              </p>

              <div className="p-4 rounded-lg border border-white/[0.06] bg-[#11151A] dark:bg-[#11151A] light:bg-white">
                <div className="font-mono text-[10px] text-[#22D3EE] uppercase tracking-wider mb-1 font-semibold">
                  Engineering Rationale
                </div>
                <p className="text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] leading-relaxed italic">
                  "{currentStage.rationale}"
                </p>
              </div>
            </div>

            {/* Right Tools & Implementations (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-5 lg:pt-0 lg:pl-6 space-y-4">
              <div>
                <div className="font-mono text-[10px] text-[#667085] uppercase tracking-wider mb-2 font-semibold">
                  Operational Tools & Stack:
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {currentStage.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-md text-xs font-mono border border-white/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="font-mono text-[10px] text-[#667085] uppercase tracking-wider mb-2 font-semibold">
                  Implemented in Active Repositories:
                </div>
                <div className="space-y-1.5 font-mono text-xs">
                  {currentStage.projects.map((proj) => (
                    <div key={proj} className="flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-[#6366F1]" />
                      <span className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-medium">{proj}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 font-mono text-xs text-emerald-400">
                <span className="text-[#9AA4B2] block text-[10px] uppercase">Evaluation Target:</span>
                <span className="font-semibold text-emerald-400">{currentStage.metricsNote}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
