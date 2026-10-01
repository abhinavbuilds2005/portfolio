import React, { useState, useEffect } from 'react';
import { Database, Cpu, CheckCircle2, CloudUpload, ArrowRight, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { PIPELINE_STAGES } from '../../data/projects';

export const PipelineTile: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);

  useEffect(() => {
    // Sequence 0 -> 1 -> 2 -> 3
    const interval = setInterval(() => {
      setCurrentStageIdx((prev) => {
        if (prev < 3) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 3;
        }
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const getStageIcon = (id: string) => {
    switch (id) {
      case 'data': return <Database className="w-4 h-4" />;
      case 'train': return <Cpu className="w-4 h-4" />;
      case 'eval': return <CheckCircle2 className="w-4 h-4" />;
      case 'deploy': return <CloudUpload className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const selectedStage = PIPELINE_STAGES.find((s) => s.id === activeStageId);

  // Calculate dot percentage position across the 4 stages
  const dotPositions = ['12%', '38%', '62%', '88%'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
      className="flex flex-col justify-between p-5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative overflow-hidden card-hover-lift"
    >
      {/* Tile Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] uppercase tracking-wider">
            Model Lifecycle Pipeline
          </span>
          <span className="font-mono text-[10px] text-[#78716c]">
            [Interactive stages]
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#e58b24]">
          4-Stage Architecture
        </span>
      </div>

      {/* Travelling connector track */}
      <div className="relative w-full h-1 bg-[#2b2a27] dark:bg-[#2b2a27] light:bg-[#e6dfd5] rounded-full mb-3 hidden sm:block overflow-hidden">
        <div
          className="absolute top-0 bottom-0 bg-[#e58b24] transition-all duration-500 ease-out"
          style={{ width: `${(currentStageIdx / 3) * 100}%` }}
        />
        {/* Animated pulse travelling dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#e58b24] shadow-md transition-all duration-500 ease-out"
          style={{ left: dotPositions[currentStageIdx] }}
        />
      </div>

      {/* 4 Pipeline Stages Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-1 relative">
        {PIPELINE_STAGES.map((stage, idx) => {
          const isLit = idx <= currentStageIdx;
          const isSelected = activeStageId === stage.id;
          const isCurrentActive = idx === currentStageIdx;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(isSelected ? null : stage.id)}
              className={`flex flex-col items-start p-3 rounded border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'border-[#e58b24] bg-[#e58b24]/15'
                  : isLit
                  ? 'border-[#3f3e3b] dark:border-[#3f3e3b] light:border-[#d6ccbe] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] hover:border-[#e58b24]/50'
                  : 'border-[#2b2a27]/40 bg-[#121212]/40 opacity-50'
              }`}
            >
              {/* Highlight dot if currently active */}
              {isCurrentActive && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#e58b24] animate-ping" />
              )}

              <div className="flex items-center justify-between w-full mb-1.5">
                <span className={`p-1.5 rounded transition-colors ${
                  isSelected || isLit
                    ? 'text-[#e58b24] bg-[#e58b24]/10'
                    : 'text-[#78716c]'
                }`}>
                  {getStageIcon(stage.id)}
                </span>
                <span className="font-mono text-[10px] text-[#78716c]">
                  0{idx + 1}
                </span>
              </div>

              <div className="font-mono text-xs font-semibold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
                {stage.title}
              </div>
              <div className="text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] truncate w-full mt-0.5">
                {stage.tools.slice(0, 2).join(', ')}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Expandable Stage Inspector Panel */}
      {selectedStage ? (
        <div className="mt-3 p-3.5 rounded border border-[#e58b24]/40 bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] text-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 font-mono text-xs text-[#e58b24] font-semibold">
              <ArrowRight className="w-3 h-3" />
              <span>STAGE {selectedStage.step} // {selectedStage.title.toUpperCase()}</span>
            </div>
            <button
              onClick={() => setActiveStageId(null)}
              className="p-1 rounded text-[#78716c] hover:text-[#f5f2eb]"
              aria-label="Close stage details"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] mb-2 leading-relaxed">
            {selectedStage.summary}
          </p>

          <div className="mb-2">
            <span className="font-mono text-[10px] text-[#78716c] uppercase">Verified Toolchain:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedStage.tools.map((tool) => (
                <span key={tool} className="px-1.5 py-0.5 rounded font-mono text-[10px] bg-[#121212] dark:bg-[#121212] light:bg-[#ffffff] border border-[#2b2a27] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="p-2 rounded bg-[#121212] dark:bg-[#121212] light:bg-[#ffffff] border border-[#2b2a27]/60">
            <span className="font-mono text-[10px] text-[#e58b24] block mb-0.5">
              Project Implementation ({selectedStage.projectExample.projectName}):
            </span>
            <p className="text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e]">
              {selectedStage.projectExample.detail}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-[11px] font-mono text-[#78716c] text-center pt-2">
          Click any stage above to inspect verified tools and project architectures.
        </div>
      )}

    </motion.div>
  );
};
