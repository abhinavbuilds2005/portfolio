import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Scan, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  tech: string[];
  description: string;
  metric: string;
  project: string;
}

export const SystemPipelineHeroVisual: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('model');
  const [particleOffset, setParticleOffset] = useState<number>(0);

  const stages: Stage[] = [
    {
      id: 'input',
      name: '01. Input Ingestion',
      category: 'Multimodal Data',
      icon: <Database className="w-4 h-4 text-[#22D3EE]" />,
      tech: ['OpenCV', 'Pandas', 'Pydantic'],
      description: 'Ingesting multi-format ID document scans, sparse transactional matrices, and multi-column PDFs.',
      metric: 'Zero type-coercion loss',
      project: 'DocuShield AI & CreditWise'
    },
    {
      id: 'preprocess',
      name: '02. Preprocessing',
      category: 'Normalization',
      icon: <Scan className="w-4 h-4 text-[#818CF8]" />,
      tech: ['EasyOCR', 'spaCy', 'ELA 95%'],
      description: 'Computing Error Level Analysis differential compression heatmaps and layout-aware text segmentation.',
      metric: 'Sub-50ms CPU baseline',
      project: 'DocuShield AI & ATS Analyzer'
    },
    {
      id: 'features',
      name: '03. Feature Space',
      category: 'Representation',
      icon: <Cpu className="w-4 h-4 text-[#6366F1]" />,
      tech: ['MiniLM-L6', 'FaceNet 128D', 'PCA'],
      description: 'Mapping dense semantic tokens to 384D hyperspheres, facial landmark embeddings, and orthogonal PCA axes.',
      metric: '>85% variance preserved',
      project: 'SmartCart AI & AttendPro'
    },
    {
      id: 'model',
      name: '04. Model Inference',
      category: 'Core Estimator',
      icon: <Sparkles className="w-4 h-4 text-[#34D399]" />,
      tech: ['PyTorch', 'Scikit-Learn', 'Groq LPU'],
      description: 'Executing regularized classifiers and hierarchical evidence fusion with instant deterministic failover.',
      metric: '100% fallback uptime',
      project: 'DocuShield AI & CreditWise'
    },
    {
      id: 'output',
      name: '05. Decision Output',
      category: 'Calibrated Action',
      icon: <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />,
      tech: ['ICAO Check Digits', 'PR-AUC', 'FastAPI'],
      description: 'Generating calibrated forensic risk scores (0–100%), verified check digit audits, and async JSON payloads.',
      metric: 'Sub-2s p95 border target',
      project: 'DocuShield SIH 2026'
    }
  ];

  // Particle motion continuous ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setParticleOffset((prev) => (prev + 1) % 100);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const activeStage = stages.find((s) => s.id === activeStageId) || stages[3];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-7 rounded-xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-xl relative overflow-hidden group">
      
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366F1]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#22D3EE]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" />
          <span className="text-xs font-mono font-medium text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] tracking-wider uppercase">
            Interactive ML Data Pipeline
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#667085] hidden sm:inline">
          Hover stages to inspect architecture
        </span>
      </div>

      {/* Animated Pipeline Stage Nodes */}
      <div className="relative z-10 my-6">
        
        {/* Connector Path with traveling animated particles */}
        <div className="relative w-full h-1.5 bg-white/[0.06] dark:bg-white/[0.06] light:bg-black/[0.06] rounded-full overflow-hidden mb-6 hidden sm:block">
          <div 
            className="absolute top-0 bottom-0 bg-gradient-to-r from-[#22D3EE] via-[#6366F1] to-[#34D399]"
            style={{ width: '100%' }}
          />
          {/* Animated data pulses moving through pipeline */}
          {[0, 25, 50, 75].map((offset) => (
            <div
              key={offset}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_#ffffff]"
              style={{
                left: `${(particleOffset + offset) % 100}%`,
                opacity: 0.8,
              }}
            />
          ))}
        </div>

        {/* 5 Interactive Stage Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {stages.map((st) => {
            const isSelected = activeStageId === st.id;

            return (
              <button
                key={st.id}
                onMouseEnter={() => setActiveStageId(st.id)}
                onClick={() => setActiveStageId(st.id)}
                className={`p-3 rounded-lg text-left transition-all relative flex flex-col justify-between border ${
                  isSelected
                    ? 'border-[#6366F1] bg-[#6366F1]/15 shadow-sm scale-[1.02]'
                    : 'border-white/[0.06] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-md ${isSelected ? 'bg-[#6366F1]/20' : 'bg-white/[0.04]'}`}>
                    {st.icon}
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-mono text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] truncate">
                    {st.category}
                  </div>
                  <div className="text-xs font-semibold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] truncate mt-0.5">
                    {st.name.replace(/^\d+\.\s*/, '')}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Detail Card for Active Stage */}
      <div className="relative z-10 p-4 rounded-lg border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F7F8FA]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#6366F1] font-bold">
                  {activeStage.name}
                </span>
                <span className="text-[#667085]">•</span>
                <span className="text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]">
                  In: <strong className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-medium">{activeStage.project}</strong>
                </span>
              </div>
              <div className="font-mono text-[11px] text-[#34D399]">
                {activeStage.metric}
              </div>
            </div>

            <p className="text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
              {activeStage.description}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono text-[#667085] uppercase mr-1">Stack:</span>
              {activeStage.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] font-mono border border-white/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
