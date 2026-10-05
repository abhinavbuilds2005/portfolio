import React, { useState, useEffect } from 'react';
import { Cpu, Eye, Zap, Play, RotateCcw, X, Layers, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const MLMechanismsLab: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'attention' | 'gradient'>('attention');

  // =========================================================================
  // 1. TRANSFORMER SELF-ATTENTION SIMULATOR
  // Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V
  // =========================================================================
  const tokens = ['Multimodal', 'Forensic', 'Screening', 'Checksums', 'Biometrics'];
  const [activeTokenIdx, setActiveTokenIdx] = useState<number>(1); // Default "Forensic"

  // Pre-calculated attention weight matrix (5x5)
  const attentionWeights = [
    [0.45, 0.25, 0.15, 0.05, 0.10], // Multimodal
    [0.18, 0.42, 0.22, 0.10, 0.08], // Forensic
    [0.12, 0.28, 0.35, 0.15, 0.10], // Screening
    [0.08, 0.15, 0.12, 0.55, 0.10], // Checksums
    [0.15, 0.20, 0.10, 0.05, 0.50]  // Biometrics
  ];

  // =========================================================================
  // 2. GRADIENT DESCENT SIMULATOR
  // Non-convex function: f(x) = x^2 + 0.35 * sin(5x)
  // df/dx = 2x + 1.75 * cos(5x)
  // =========================================================================
  const [learningRate, setLearningRate] = useState<number>(0.08);
  const [optimizer, setOptimizer] = useState<'sgd' | 'momentum' | 'adam'>('adam');
  const [gdSteps, setGdSteps] = useState<{ x: number; y: number }[]>([]);
  const [currentX, setCurrentX] = useState<number>(2.4);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  const lossFunction = (x: number) => 0.25 * x * x + 0.3 * Math.sin(4 * x) + 0.8;
  const lossDerivative = (x: number) => 0.5 * x + 1.2 * Math.cos(4 * x);

  const startGradientDescent = () => {
    setIsOptimizing(true);
    let x = 2.4;
    let v = 0; // momentum velocity
    let m = 0; // adam 1st moment
    let s = 0; // adam 2nd moment
    let t = 0;

    const steps: { x: number; y: number }[] = [{ x, y: lossFunction(x) }];
    setGdSteps(steps);
    setCurrentX(x);

    const interval = setInterval(() => {
      t++;
      const grad = lossDerivative(x);

      if (optimizer === 'sgd') {
        x -= learningRate * grad;
      } else if (optimizer === 'momentum') {
        v = 0.85 * v + learningRate * grad;
        x -= v;
      } else if (optimizer === 'adam') {
        m = 0.9 * m + 0.1 * grad;
        s = 0.999 * s + 0.001 * (grad * grad);
        const mHat = m / (1 - Math.pow(0.9, t));
        const sHat = s / (1 - Math.pow(0.999, t));
        x -= (learningRate / (Math.sqrt(sHat) + 1e-8)) * mHat;
      }

      // Constrain
      x = Math.max(-2.6, Math.min(2.6, x));

      steps.push({ x, y: lossFunction(x) });
      setGdSteps([...steps]);
      setCurrentX(x);

      if (t >= 35 || Math.abs(grad) < 0.02) {
        clearInterval(interval);
        setIsOptimizing(false);
      }
    }, 90);
  };

  useEffect(() => {
    if (isOpen && activeTab === 'gradient') {
      startGradientDescent();
    }
  }, [isOpen, activeTab, optimizer]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-lg border border-[#2b2a27] bg-[#161616] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#2b2a27] bg-[#121212]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#e58b24] font-bold">
              AI SYSTEMS LAB //
            </span>
            <span className="font-mono text-xs text-[#f5f2eb]">
              LIVE MACHINE LEARNING MECHANISMS
            </span>
            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-[#2b2a27] text-[#78716c]">
              interactive lab
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab switch */}
            <div className="flex items-center bg-[#1c1c1c] p-0.5 rounded border border-[#2b2a27] font-mono text-xs">
              <button
                onClick={() => setActiveTab('attention')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'attention'
                    ? 'bg-[#e58b24] text-[#121212] font-semibold'
                    : 'text-[#a8a29e] hover:text-[#f5f2eb]'
                }`}
              >
                Transformer Attention
              </button>
              <button
                onClick={() => setActiveTab('gradient')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'gradient'
                    ? 'bg-[#e58b24] text-[#121212] font-semibold'
                    : 'text-[#a8a29e] hover:text-[#f5f2eb]'
                }`}
              >
                Gradient Descent Valley
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-[#78716c] hover:text-[#f5f2eb] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: TRANSFORMER SELF-ATTENTION */}
          {activeTab === 'attention' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#f5f2eb] mb-1 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#e58b24]" />
                  <span>Scaled Dot-Product Self-Attention: A = softmax(Q · Kᵀ / √dₖ)</span>
                </h3>
                <p className="text-xs text-[#a8a29e]">
                  Hover over or click any token below to observe how the transformer dynamically queries keys and redistributes attention weights across the sequence.
                </p>
              </div>

              {/* Sequence Tokens Interactive Row */}
              <div className="flex flex-wrap gap-2 pt-2">
                {tokens.map((token, idx) => {
                  const isSelected = activeTokenIdx === idx;
                  const weightToActive = attentionWeights[activeTokenIdx][idx];

                  return (
                    <button
                      key={token}
                      onClick={() => setActiveTokenIdx(idx)}
                      onMouseEnter={() => setActiveTokenIdx(idx)}
                      className={`px-3 py-2 rounded border font-mono text-xs transition-all relative overflow-hidden ${
                        isSelected
                          ? 'border-[#e58b24] bg-[#e58b24]/20 text-[#f5f2eb] font-bold shadow-lg scale-105'
                          : 'border-[#2b2a27] bg-[#1c1c1c] text-[#a8a29e] hover:border-[#e58b24]/50'
                      }`}
                    >
                      <div className="text-[9px] text-[#78716c] mb-0.5">Token [{idx}]</div>
                      <div>{token}</div>
                      {/* Weight pill */}
                      <div className="text-[10px] text-[#e58b24] mt-1 font-semibold">
                        {(weightToActive * 100).toFixed(0)}% attn
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Attention Heatmap Grid */}
              <div className="p-4 rounded border border-[#2b2a27] bg-[#121212]">
                <div className="font-mono text-xs text-[#a8a29e] mb-3 flex justify-between">
                  <span>ATTENTION WEIGHT MATRIX (QUERY \ KEY):</span>
                  <span className="text-[#e58b24]">Active Query: "{tokens[activeTokenIdx]}"</span>
                </div>

                <div className="grid grid-cols-6 gap-1 font-mono text-xs">
                  {/* Header Row */}
                  <div className="text-[10px] text-[#78716c]">Q \ K</div>
                  {tokens.map((t) => (
                    <div key={t} className="text-[10px] text-[#78716c] truncate text-center">
                      {t.slice(0, 5)}
                    </div>
                  ))}

                  {/* Matrix Rows */}
                  {tokens.map((qToken, qIdx) => (
                    <React.Fragment key={qToken}>
                      <div className={`text-[10px] truncate py-1.5 ${qIdx === activeTokenIdx ? 'text-[#e58b24] font-bold' : 'text-[#78716c]'}`}>
                        {qToken.slice(0, 6)}
                      </div>
                      {tokens.map((kToken, kIdx) => {
                        const weight = attentionWeights[qIdx][kIdx];
                        const isRowActive = qIdx === activeTokenIdx;

                        return (
                          <div
                            key={`${qToken}-${kToken}`}
                            className="p-2 rounded text-center transition-colors border border-[#2b2a27]/30"
                            style={{
                              backgroundColor: `rgba(229, 139, 36, ${weight * (isRowActive ? 1.2 : 0.4)})`,
                              color: weight > 0.3 ? '#121212' : '#f5f2eb',
                              fontWeight: isRowActive ? 'bold' : 'normal'
                            }}
                          >
                            {(weight * 100).toFixed(0)}%
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NON-CONVEX GRADIENT DESCENT VALLEY */}
          {activeTab === 'gradient' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#f5f2eb] mb-1 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#e58b24]" />
                    <span>Non-Convex Optimization: θₜ₊₁ = θₜ - η · ∇L(θ)</span>
                  </h3>
                  <p className="text-xs text-[#a8a29e]">
                    Watch momentum and adaptive optimizers navigate local minima, momentum oscillations, and find the global cost minimum.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 font-mono text-xs bg-[#121212] p-1 rounded border border-[#2b2a27]">
                    <span className="text-[#78716c] px-1">OPT:</span>
                    {(['adam', 'momentum', 'sgd'] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setOptimizer(opt)}
                        className={`px-2 py-0.5 rounded uppercase ${
                          optimizer === opt ? 'bg-[#e58b24] text-[#121212] font-bold' : 'text-[#a8a29e]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={startGradientDescent}
                    disabled={isOptimizing}
                    className="flex items-center gap-1 px-3 py-1 rounded font-mono text-xs bg-[#e58b24] hover:bg-[#d97706] text-[#121212] font-bold transition-colors disabled:opacity-50"
                  >
                    <Play className="w-3 h-3" />
                    <span>Drop Ball</span>
                  </button>
                </div>
              </div>

              {/* 2D Cost Landscape SVG */}
              <div className="relative w-full h-64 bg-[#121212] rounded border border-[#2b2a27] overflow-hidden p-2">
                <svg viewBox="-3 0 6 3.2" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="-3" y1="1" x2="3" y2="1" stroke="#2b2a27" strokeDasharray="0.1 0.1" strokeWidth="0.02" />
                  <line x1="-3" y1="2" x2="3" y2="2" stroke="#2b2a27" strokeDasharray="0.1 0.1" strokeWidth="0.02" />

                  {/* Cost Curve: f(x) = 0.25*x^2 + 0.3*sin(4*x) + 0.8 */}
                  <path
                    d={`M -2.8 ${lossFunction(-2.8)} ` +
                      Array.from({ length: 60 }, (_, i) => {
                        const x = -2.8 + (i / 59) * 5.6;
                        return `L ${x} ${lossFunction(x)}`;
                      }).join(' ')
                    }
                    fill="none"
                    stroke="#a8a29e"
                    strokeWidth="0.04"
                  />

                  {/* Gradient Steps Trajectory */}
                  {gdSteps.length > 1 && (
                    <polyline
                      points={gdSteps.map((s) => `${s.x},${s.y}`).join(' ')}
                      fill="none"
                      stroke="#e58b24"
                      strokeWidth="0.05"
                      strokeDasharray="0.08 0.04"
                    />
                  )}

                  {/* Active Optimizer Ball */}
                  <circle
                    cx={currentX}
                    cy={lossFunction(currentX)}
                    r="0.12"
                    fill="#e58b24"
                    stroke="#ffffff"
                    strokeWidth="0.03"
                  />
                </svg>

                {/* Real-time coordinates */}
                <div className="absolute bottom-3 left-4 font-mono text-[10px] text-[#78716c] bg-[#121212]/80 px-2 py-1 rounded border border-[#2b2a27]">
                  Parameter θ: <span className="text-[#f5f2eb] font-bold">{currentX.toFixed(3)}</span> · Loss L(θ): <span className="text-[#e58b24] font-bold">{lossFunction(currentX).toFixed(3)}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-2.5 border-t border-[#2b2a27] bg-[#121212] flex items-center justify-between font-mono text-[11px] text-[#78716c]">
          <span>Mathematical visualizations run locally via client runtime equations</span>
          <span className="text-[#e58b24]">Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
