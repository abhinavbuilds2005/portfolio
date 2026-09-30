import React, { useState, useEffect } from 'react';
import { Database, Cpu, CheckCircle2, CloudUpload, ArrowRight, X } from 'lucide-react';
import { PIPELINE_STAGES } from '../../data/projects';

export const PipelineTile: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  const [litIndex, setLitIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setLitIndex(3);
      return;
    }

    // Sequence stages 0 -> 1 -> 2 -> 3 once over 1.4s
    const stepDuration = 350;
    const timers = [
      setTimeout(() => setLitIndex(1), stepDuration),
      setTimeout(() => setLitIndex(2), stepDuration * 2),
      setTimeout(() => setLitIndex(3), stepDuration * 3),
    ];

    return () => timers.forEach(clearTimeout);
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

  return (
    <div className="flex flex-col justify-between p-5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative">
      
      {/* Tile Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] uppercase tracking-wider">
            Model Lifecycle Pipeline
          </span>
          <span className="font-mono text-[10px] text-[#78716c]">
            [Click stage to inspect]
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#e58b24]">
          4-Stage Architecture
        </span>
      </div>

      {/* 4 Pipeline Stages Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2 relative">
        {PIPELINE_STAGES.map((stage, idx) => {
          const isLit = idx <= litIndex;
          const isSelected = activeStageId === stage.id;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(isSelected ? null : stage.id)}
              className={`flex flex-col items-start p-3 rounded border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'border-[#e58b24] bg-[#e58b24]/10'
                  : isLit
                  ? 'border-[#3f3e3b] dark:border-[#3f3e3b] light:border-[#d6ccbe] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] hover:border-[#e58b24]/50'
                  : 'border-[#2b2a27]/50 bg-[#121212]/50 opacity-60'
              }`}
            >
              {/* Connector pulse dot if active */}
              {isLit && idx === litIndex && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#e58b24] animate-ping" />
              )}

              <div className="flex items-center justify-between w-full mb-1.5">
                <span className={`p-1.5 rounded ${isSelected || isLit ? 'text-[#e58b24] bg-[#e58b24]/10' : 'text-[#78716c]'}`}>
                  {getStageIcon(stage.id)}
                </span>
                <span className="font-mono text-[10px] text-[#78716c]">
                  0{idx + 1}
                </span>
              </div>

              <div className="font-mono text-xs font-semibold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] capitalize">
                {stage.id}
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
        <div className="mt-3 p-3.5 rounded border border-[#e58b24]/40 bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] text-xs">
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

    </div>
  );
};
