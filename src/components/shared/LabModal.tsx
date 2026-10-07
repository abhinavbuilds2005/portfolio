import React, { useState, useEffect } from 'react';
import { X, Cpu, Layers, GitBranch, Code2, Sparkles, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../../data/projects';
import { EmbeddingMap } from '../projects/EmbeddingMap';
import { ModelPipelineVisualizer } from '../skills/ModelPipelineVisualizer';
import { LeetCodeDashboard } from '../skills/LeetCodeDashboard';

interface LabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const LabModal: React.FC<LabModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<'mechanisms' | 'embedding' | 'pipeline' | 'leetcode'>('mechanisms');

  // Transformer & Gradient Descent state
  const [mechSubTab, setMechSubTab] = useState<'attention' | 'gradient'>('attention');
  const tokens = ['Multimodal', 'Forensic', 'Screening', 'Checksums', 'Biometrics'];
  const [activeTokenIdx, setActiveTokenIdx] = useState<number>(1);
  const attentionWeights = [
    [0.45, 0.25, 0.15, 0.05, 0.10],
    [0.18, 0.42, 0.22, 0.10, 0.08],
    [0.12, 0.28, 0.35, 0.15, 0.10],
    [0.08, 0.15, 0.12, 0.55, 0.10],
    [0.15, 0.20, 0.10, 0.05, 0.50]
  ];

  // Gradient Descent state
  const [learningRate, setLearningRate] = useState<number>(0.08);
  const [optimizer, setOptimizer] = useState<'sgd' | 'momentum' | 'adam'>('adam');
  const [currentX, setCurrentX] = useState<number>(2.4);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [gdSteps, setGdSteps] = useState<{ x: number; y: number }[]>([]);

  const lossFunction = (x: number) => 0.25 * x * x + 0.3 * Math.sin(4 * x) + 0.8;
  const lossDerivative = (x: number) => 0.5 * x + 1.2 * Math.cos(4 * x);

  const resetGD = () => {
    setCurrentX(2.4);
    setIsOptimizing(false);
    setGdSteps([{ x: 2.4, y: lossFunction(2.4) }]);
  };

  useEffect(() => {
    resetGD();
  }, [optimizer]);

  useEffect(() => {
    if (!isOptimizing) return;
    const interval = setInterval(() => {
      setCurrentX((prevX) => {
        const grad = lossDerivative(prevX);
        const nextX = prevX - learningRate * grad;
        setGdSteps((steps) => [...steps.slice(-15), { x: nextX, y: lossFunction(nextX) }]);
        if (Math.abs(grad) < 0.02 || stepsCount() > 25) {
          setIsOptimizing(false);
        }
        return nextX;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [isOptimizing, learningRate]);

  const stepsCount = () => gdSteps.length;

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lab-title"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-lg border border-border-strong bg-surface shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-elevated">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-accent" />
              <h2 id="lab-title" className="font-mono text-sm font-bold text-text-primary uppercase tracking-wide">
                Interactive Engineering Lab
              </h2>
              <span className="hidden sm:inline font-mono text-xs text-text-muted">
                // Telemetry & Mechanisms
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-base transition-colors"
              aria-label="Close Lab dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 px-6 pt-3 border-b border-border-subtle bg-base overflow-x-auto text-xs font-mono">
            {[
              { id: 'mechanisms', label: 'ML Mechanisms', icon: <Cpu className="w-3.5 h-3.5" /> },
              { id: 'embedding', label: '2D Latent Embeddings', icon: <Layers className="w-3.5 h-3.5" /> },
              { id: 'pipeline', label: 'Model Lifecycle', icon: <GitBranch className="w-3.5 h-3.5" /> },
              { id: 'leetcode', label: 'Algorithmic DSA', icon: <Code2 className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-accent text-accent bg-surface/50'
                    : 'border-transparent text-text-muted hover:text-text-primary'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* TAB 1: ML Mechanisms */}
            {activeTab === 'mechanisms' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      Mathematical Mechanisms Simulator
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Interactive demonstrations of core deep learning building blocks.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-xs bg-base p-1 rounded border border-border-subtle">
                    <button
                      onClick={() => setMechSubTab('attention')}
                      className={`px-3 py-1 rounded transition-colors ${
                        mechSubTab === 'attention' ? 'bg-accent text-base font-semibold' : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      Attention Softmax
                    </button>
                    <button
                      onClick={() => setMechSubTab('gradient')}
                      className={`px-3 py-1 rounded transition-colors ${
                        mechSubTab === 'gradient' ? 'bg-accent text-base font-semibold' : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      Gradient Descent
                    </button>
                  </div>
                </div>

                {mechSubTab === 'attention' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-border-subtle bg-base text-xs space-y-2">
                      <div className="font-mono text-accent font-semibold flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5" />
                        <span>Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q·Kᵀ / √d_k) · V</span>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        Click any query token below to observe how the self-attention mechanism distributes attention weights across the sequence tokens.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tokens.map((tok, idx) => (
                        <button
                          key={tok}
                          onClick={() => setActiveTokenIdx(idx)}
                          className={`px-3 py-1.5 rounded font-mono text-xs border transition-colors ${
                            activeTokenIdx === idx
                              ? 'border-accent bg-accent/10 text-accent font-semibold'
                              : 'border-border-subtle bg-base text-text-secondary hover:border-border-strong'
                          }`}
                        >
                          Query: [{tok}]
                        </button>
                      ))}
                    </div>

                    {/* Attention weight distribution bar chart */}
                    <div className="p-5 rounded-lg border border-border-subtle bg-base space-y-3">
                      <div className="font-mono text-xs text-text-muted uppercase">
                        Softmax Attention Weights for "{tokens[activeTokenIdx]}"
                      </div>
                      <div className="space-y-2.5">
                        {tokens.map((keyTok, kIdx) => {
                          const weight = attentionWeights[activeTokenIdx][kIdx];
                          return (
                            <div key={keyTok} className="space-y-1">
                              <div className="flex justify-between font-mono text-xs">
                                <span className="text-text-primary font-medium">{keyTok}</span>
                                <span className="text-accent font-bold">{(weight * 100).toFixed(1)}%</span>
                              </div>
                              <div className="w-full h-2 rounded bg-surface overflow-hidden border border-border-subtle">
                                <div
                                  className="h-full bg-accent rounded transition-all duration-300"
                                  style={{ width: `${weight * 100}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {mechSubTab === 'gradient' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-border-subtle bg-base text-xs space-y-2">
                      <div className="font-mono text-accent font-semibold">
                        Loss Surface: L(w) = 0.25w² + 0.3·sin(4w) + 0.8
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        Non-convex optimization landscape comparing parameter updates across SGD and Adam optimizers.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setIsOptimizing(!isOptimizing)}
                        className="px-4 py-1.5 rounded text-xs font-mono font-medium bg-accent hover:bg-accent-hover text-base transition-colors"
                      >
                        {isOptimizing ? 'Pause Optimization' : 'Run Gradient Step'}
                      </button>
                      <button
                        onClick={resetGD}
                        className="px-3.5 py-1.5 rounded text-xs font-mono font-medium border border-border-subtle bg-base text-text-secondary hover:text-text-primary transition-colors"
                      >
                        Reset Position
                      </button>
                      <span className="font-mono text-xs text-text-muted">
                        Position: w = {currentX.toFixed(3)} | Loss: {lossFunction(currentX).toFixed(3)}
                      </span>
                    </div>

                    {/* SVG Curve of non-convex function with current position */}
                    <div className="w-full h-48 bg-base rounded border border-border-subtle p-3 relative">
                      <svg viewBox="-3 0 6 3.5" className="w-full h-full overflow-visible">
                        <line x1="-3" y1="3" x2="3" y2="3" stroke="var(--border-subtle)" strokeWidth="0.03" />
                        <line x1="0" y1="0" x2="0" y2="3" stroke="var(--border-subtle)" strokeWidth="0.03" />
                        {/* Function path */}
                        <path
                          d="M -3 2.9 Q -2 1.4 -1 0.9 T 0 0.8 T 1 1.2 T 2 1.8 T 3 3.0"
                          fill="none"
                          stroke="var(--text-muted)"
                          strokeWidth="0.04"
                        />
                        {/* Current weight point */}
                        <circle
                          cx={Math.max(-2.8, Math.min(2.8, currentX))}
                          cy={Math.max(0.2, Math.min(3.2, 3.2 - lossFunction(currentX)))}
                          r="0.12"
                          fill="var(--accent)"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Embedding Map */}
            {activeTab === 'embedding' && (
              <EmbeddingMap
                projects={PROJECTS}
                onSelectProject={(id) => {
                  if (onSelectProject) onSelectProject(id);
                  onClose();
                }}
              />
            )}

            {/* TAB 3: Model Pipeline */}
            {activeTab === 'pipeline' && (
              <ModelPipelineVisualizer
                onOpenCaseStudy={(id) => {
                  if (onSelectProject) onSelectProject(id);
                  onClose();
                }}
              />
            )}

            {/* TAB 4: LeetCode Analytics */}
            {activeTab === 'leetcode' && (
              <LeetCodeDashboard />
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-border-subtle bg-elevated flex items-center justify-between">
            <span className="font-mono text-xs text-text-muted">
              Press <kbd className="px-1.5 py-0.5 rounded border border-border-subtle bg-base text-text-secondary">ESC</kbd> to close
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-md text-xs font-mono font-medium border border-border-subtle hover:border-border-strong bg-base text-text-primary hover:text-accent transition-colors"
            >
              Close Lab
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
