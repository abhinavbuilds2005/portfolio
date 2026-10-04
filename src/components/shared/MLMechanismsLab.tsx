import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Play, RotateCcw, X, Activity, Sparkles, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MLMechanismsLab: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'attention' | 'gradient'>('attention');

  // Transformer self-attention simulator
  const tokens = ['Multimodal', 'Forensic', 'Screening', 'Checksums', 'Biometrics'];
  const [activeTokenIdx, setActiveTokenIdx] = useState<number>(1);

  const attentionWeights = [
    [0.45, 0.25, 0.15, 0.05, 0.10],
    [0.18, 0.42, 0.22, 0.10, 0.08],
    [0.12, 0.28, 0.35, 0.15, 0.10],
    [0.08, 0.15, 0.12, 0.55, 0.10],
    [0.15, 0.20, 0.10, 0.05, 0.50]
  ];

  // Non-convex gradient descent simulator
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
    let v = 0;
    let m = 0;
    let s = 0;
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

      x = Math.max(-2.6, Math.min(2.6, x));

      steps.push({ x, y: lossFunction(x) });
      setGdSteps([...steps]);
      setCurrentX(x);

      if (t >= 35 || Math.abs(grad) < 0.02) {
        clearInterval(interval);
        setIsOptimizing(false);
      }
    }, 80);
  };

  useEffect(() => {
    if (isOpen && activeTab === 'gradient') {
      startGradientDescent();
    }
  }, [isOpen, activeTab, optimizer]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0D1014] text-[#F5F7FA] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#11151A]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#6366F1] font-bold">
                AI LAB //
              </span>
              <span className="font-mono text-xs text-white font-medium">
                INTERACTIVE ML MECHANISMS
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#08090B] p-1 rounded-lg border border-white/[0.08] font-mono text-xs">
                <button
                  onClick={() => setActiveTab('attention')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'attention'
                      ? 'bg-[#6366F1] text-white font-semibold'
                      : 'text-[#9AA4B2] hover:text-white'
                  }`}
                >
                  Self-Attention
                </button>
                <button
                  onClick={() => setActiveTab('gradient')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'gradient'
                      ? 'bg-[#6366F1] text-white font-semibold'
                      : 'text-[#9AA4B2] hover:text-white'
                  }`}
                >
                  Gradient Descent
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-1 rounded-lg text-[#9AA4B2] hover:text-white hover:bg-white/10"
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
                  <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#22D3EE]" />
                    <span>Scaled Dot-Product Self-Attention: A = softmax(Q · Kᵀ / √dₖ)</span>
                  </h3>
                  <p className="text-xs text-[#9AA4B2]">
                    Select any token below to inspect how query vectors route attention weights across keys in the sequence.
                  </p>
                </div>

                {/* Tokens Row */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {tokens.map((token, idx) => {
                    const isSelected = activeTokenIdx === idx;
                    const weightToActive = attentionWeights[activeTokenIdx][idx];

                    return (
                      <button
                        key={token}
                        onClick={() => setActiveTokenIdx(idx)}
                        className={`px-3.5 py-2 rounded-xl border font-mono text-xs transition-all ${
                          isSelected
                            ? 'border-[#6366F1] bg-[#6366F1]/20 text-white font-bold shadow-sm scale-105'
                            : 'border-white/[0.08] bg-[#11151A] text-[#9AA4B2] hover:border-white/20'
                        }`}
                      >
                        <div className="text-[10px] text-[#667085] mb-0.5">Token [{idx}]</div>
                        <div>{token}</div>
                        <div className="text-[10px] text-[#6366F1] mt-1 font-semibold">
                          {(weightToActive * 100).toFixed(0)}% attn
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Attention Matrix Grid */}
                <div className="p-5 rounded-xl border border-white/[0.08] bg-[#08090B]">
                  <div className="font-mono text-xs text-[#9AA4B2] mb-3 flex justify-between">
                    <span>ATTENTION WEIGHT MATRIX (QUERY \ KEY):</span>
                    <span className="text-[#6366F1]">Active Query: "{tokens[activeTokenIdx]}"</span>
                  </div>

                  <div className="grid grid-cols-6 gap-1.5 font-mono text-xs">
                    <div className="text-[10px] text-[#667085]">Q \ K</div>
                    {tokens.map((t) => (
                      <div key={t} className="text-[10px] text-[#667085] truncate text-center">
                        {t.slice(0, 5)}
                      </div>
                    ))}

                    {tokens.map((qToken, qIdx) => (
                      <React.Fragment key={qToken}>
                        <div className={`text-[10px] truncate py-2 ${qIdx === activeTokenIdx ? 'text-[#818CF8] font-bold' : 'text-[#667085]'}`}>
                          {qToken.slice(0, 6)}
                        </div>
                        {tokens.map((kToken, kIdx) => {
                          const weight = attentionWeights[qIdx][kIdx];
                          const isRowActive = qIdx === activeTokenIdx;

                          return (
                            <div
                              key={`${qToken}-${kToken}`}
                              className="p-2.5 rounded-lg text-center transition-colors border border-white/[0.04]"
                              style={{
                                backgroundColor: `rgba(99, 102, 241, ${weight * (isRowActive ? 1.4 : 0.4)})`,
                                color: weight > 0.3 ? '#FFFFFF' : '#9AA4B2',
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

            {/* TAB 2: NON-CONVEX GRADIENT DESCENT */}
            {activeTab === 'gradient' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#34D399]" />
                      <span>Non-Convex Optimization: θₜ₊₁ = θₜ - η · ∇L(θ)</span>
                    </h3>
                    <p className="text-xs text-[#9AA4B2]">
                      Observe how Adam, Momentum, and SGD navigate local saddle points and settle in minima.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 font-mono text-xs bg-[#08090B] p-1 rounded-lg border border-white/[0.08]">
                      <span className="text-[#667085] px-1.5">Optimizer:</span>
                      {(['adam', 'momentum', 'sgd'] as const).map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setOptimizer(opt)}
                          className={`px-2 py-0.5 rounded transition-colors uppercase ${
                            optimizer === opt
                              ? 'bg-[#6366F1] text-white font-bold'
                              : 'text-[#9AA4B2] hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={startGradientDescent}
                      disabled={isOptimizing}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#34D399] hover:bg-emerald-400 text-[#08090B] font-mono text-xs font-semibold disabled:opacity-50 transition-colors"
                    >
                      <RotateCcw className={`w-3.5 h-3.5 ${isOptimizing ? 'animate-spin' : ''}`} />
                      <span>Re-Run</span>
                    </button>
                  </div>
                </div>

                {/* SVG Cost Curve with Optimizer Descent */}
                <div className="relative w-full h-56 bg-[#08090B] rounded-xl border border-white/[0.08] overflow-hidden p-4">
                  <svg viewBox="-3 0 6 3" className="w-full h-full overflow-visible">
                    <path
                      d={Array.from({ length: 120 }, (_, i) => {
                        const x = -2.8 + (i / 119) * 5.6;
                        const y = 3 - lossFunction(x);
                        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(3)} ${y.toFixed(3)}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#6366F1"
                      strokeWidth="0.06"
                    />

                    {/* Descent Step Trail */}
                    {gdSteps.map((step, idx) => (
                      <circle
                        key={idx}
                        cx={step.x}
                        cy={3 - step.y}
                        r="0.05"
                        fill="#22D3EE"
                        opacity={0.4 + (idx / gdSteps.length) * 0.6}
                      />
                    ))}

                    {/* Current Position Marker */}
                    <circle
                      cx={currentX}
                      cy={3 - lossFunction(currentX)}
                      r="0.1"
                      fill="#34D399"
                      stroke="#FFFFFF"
                      strokeWidth="0.02"
                    />
                  </svg>

                  <div className="absolute bottom-3 left-4 font-mono text-[10px] text-[#667085] flex items-center gap-4">
                    <span>Position θ: {currentX.toFixed(3)}</span>
                    <span>Loss L(θ): {lossFunction(currentX).toFixed(3)}</span>
                    <span className="text-[#34D399]">Optimizer: {optimizer.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-white/[0.08] bg-[#11151A] flex items-center justify-between text-xs font-mono text-[#667085]">
            <span>Pedagogical Visualization Environment</span>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
