import React, { useState } from 'react';
import { Cpu, ChevronRight, X, HardDrive, Layers, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const GpuTelemetryHUD: React.FC = () => {
  const [isProfilerOpen, setIsProfilerOpen] = useState(false);

  return (
    <>
      {/* Sleek Top ML Environment Telemetry Bar */}
      <div className="w-full bg-[#0D1014]/90 dark:bg-[#0D1014]/90 light:bg-[#F0F2F5]/90 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] py-2 px-4 font-mono text-[11px] backdrop-blur-md transition-colors relative z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
          
          {/* Environment Status Badge */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[#667085] dark:text-[#667085] light:text-[#94A3B8] uppercase tracking-wider text-[10px] font-semibold">
              LOCAL ML ENVIRONMENT:
            </span>
            <span className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-medium flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#6366F1]" />
              <span>NVIDIA RTX 3050 Laptop GPU</span>
              <span className="text-[#667085] hidden sm:inline">(6 GB VRAM)</span>
            </span>
          </div>

          {/* Genuine Stack Information */}
          <div className="hidden md:flex items-center gap-5 text-[11px] text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-[#22D3EE]" />
              <span className="text-[#667085]">STACK:</span>
              <span className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]">PyTorch · CUDA 12.x · Python 3.11</span>
            </div>

            <div className="flex items-center gap-1.5">
              <HardDrive className="w-3 h-3 text-[#34D399]" />
              <span className="text-[#667085]">VRAM BUDGET:</span>
              <span className="text-[#34D399] font-medium">6 GB Dedicated</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[#9AA4B2]">Ready for experimentation</span>
            </div>
          </div>

          {/* Environment Specs Drawer Trigger */}
          <button
            onClick={() => setIsProfilerOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/10 dark:border-white/10 light:border-black/10 hover:border-[#6366F1]/50 bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] hover:text-[#F5F7FA] transition-all text-[11px] group ml-auto sm:ml-0"
          >
            <span>Specs & Setup</span>
            <ChevronRight className="w-3 h-3 text-[#6366F1] group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>
      </div>

      {/* Verified Hardware & Environment Modal */}
      <AnimatePresence>
        {isProfilerOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsProfilerOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-xl border border-white/10 bg-[#0D1014] text-[#F5F7FA] shadow-2xl overflow-hidden font-mono text-xs flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-[#11151A]">
                <div className="flex items-center gap-2 text-[#6366F1] font-semibold text-sm font-sans">
                  <Cpu className="w-4 h-4" />
                  <span>Local Machine Learning Environment</span>
                </div>
                <button
                  onClick={() => setIsProfilerOpen(false)}
                  className="p-1 rounded text-[#9AA4B2] hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                <div>
                  <div className="text-[#9AA4B2] text-xs font-sans mb-3">
                    Truthful disclosure of local development and model training infrastructure used across these portfolio projects:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-lg border border-white/[0.08] bg-[#11151A]">
                      <div className="text-[10px] text-[#667085] uppercase tracking-wider">Local Workstation GPU</div>
                      <div className="text-sm font-bold text-white mt-1">NVIDIA GeForce RTX 3050</div>
                      <div className="text-[11px] text-[#9AA4B2] mt-1">6 GB GDDR6 · Ampere architecture with Tensor Cores for FP16 inference.</div>
                    </div>

                    <div className="p-3.5 rounded-lg border border-white/[0.08] bg-[#11151A]">
                      <div className="text-[10px] text-[#667085] uppercase tracking-wider">CUDA & Runtime</div>
                      <div className="text-sm font-bold text-[#22D3EE] mt-1">CUDA 12.4 + cuDNN</div>
                      <div className="text-[11px] text-[#9AA4B2] mt-1">PyTorch 2.4.x GPU accelerated tensor operations & mixed precision (AMP).</div>
                    </div>

                    <div className="p-3.5 rounded-lg border border-white/[0.08] bg-[#11151A]">
                      <div className="text-[10px] text-[#667085] uppercase tracking-wider">Deployment Runtime</div>
                      <div className="text-sm font-bold text-[#34D399] mt-1">Docker & FastAPI Microservices</div>
                      <div className="text-[11px] text-[#9AA4B2] mt-1">Containerized edge delivery on Render / Vercel with deterministic latency guards.</div>
                    </div>

                    <div className="p-3.5 rounded-lg border border-white/[0.08] bg-[#11151A]">
                      <div className="text-[10px] text-[#667085] uppercase tracking-wider">Cloud LLM & Hybrid Inference</div>
                      <div className="text-sm font-bold text-[#818CF8] mt-1">Groq LPU (Llama 3)</div>
                      <div className="text-[11px] text-[#9AA4B2] mt-1">High-speed conversational inference paired with instant local deterministic fallbacks.</div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-white/[0.08] bg-[#11151A] text-[11px] leading-relaxed text-[#9AA4B2]">
                  <div className="flex items-center gap-1.5 text-white font-semibold font-sans mb-1">
                    <Terminal className="w-3.5 h-3.5 text-[#6366F1]" />
                    <span>Engineering Philosophy</span>
                  </div>
                  "Great ML engineering is not about claiming to own an H100 cluster—it is about knowing how to profile algorithms, prune models, eliminate data leakage, and engineer resilient systems that deliver sub-second inference within realistic constraints."
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 border-t border-white/[0.08] bg-[#11151A] flex items-center justify-between text-[11px] text-[#667085]">
                <span>Verified System Specification</span>
                <button
                  onClick={() => setIsProfilerOpen(false)}
                  className="px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
