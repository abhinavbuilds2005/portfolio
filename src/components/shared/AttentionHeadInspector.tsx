import React, { useState } from 'react';
import { Layers, Sparkles, Cpu, Eye, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeadConfig {
  id: number;
  name: string;
  focus: string;
  weights: number[][];
}

export const AttentionHeadInspector: React.FC = () => {
  const tokens = ['[BOS]', 'Multimodal', 'Forensic', 'ELA-Tamper', 'Checksum', 'Biometrics', '[EOS]'];
  const [activeHead, setActiveHead] = useState<number>(1);
  const [hoveredTokenIdx, setHoveredTokenIdx] = useState<number>(2); // Default to 'Forensic'
  const [inspectCell, setInspectCell] = useState<{ row: number; col: number } | null>(null);

  const heads: HeadConfig[] = [
    {
      id: 0,
      name: 'Head 0: Positional & Syntax',
      focus: 'Local token adjacency & document structural bounds',
      weights: [
        [0.45, 0.35, 0.10, 0.04, 0.02, 0.02, 0.02],
        [0.15, 0.50, 0.25, 0.05, 0.02, 0.01, 0.02],
        [0.05, 0.20, 0.52, 0.15, 0.04, 0.02, 0.02],
        [0.02, 0.05, 0.18, 0.55, 0.14, 0.04, 0.02],
        [0.02, 0.02, 0.06, 0.18, 0.54, 0.15, 0.03],
        [0.02, 0.02, 0.04, 0.08, 0.18, 0.56, 0.10],
        [0.05, 0.05, 0.05, 0.05, 0.10, 0.25, 0.45],
      ],
    },
    {
      id: 1,
      name: 'Head 1: Forensic Pixel Tampering',
      focus: 'Strong cross-attention between Forensic, ELA, and Checksums',
      weights: [
        [0.10, 0.20, 0.30, 0.25, 0.10, 0.03, 0.02],
        [0.05, 0.15, 0.35, 0.30, 0.10, 0.03, 0.02],
        [0.02, 0.08, 0.22, 0.48, 0.15, 0.03, 0.02],
        [0.01, 0.04, 0.42, 0.38, 0.12, 0.02, 0.01],
        [0.02, 0.03, 0.25, 0.22, 0.42, 0.04, 0.02],
        [0.05, 0.10, 0.15, 0.10, 0.10, 0.45, 0.05],
        [0.05, 0.10, 0.25, 0.25, 0.20, 0.05, 0.10],
      ],
    },
    {
      id: 2,
      name: 'Head 2: Biometric Consistency',
      focus: 'Correlating face extraction vectors with global document context',
      weights: [
        [0.20, 0.25, 0.10, 0.05, 0.05, 0.30, 0.05],
        [0.10, 0.20, 0.10, 0.05, 0.05, 0.45, 0.05],
        [0.05, 0.15, 0.20, 0.10, 0.05, 0.40, 0.05],
        [0.05, 0.08, 0.12, 0.20, 0.05, 0.45, 0.05],
        [0.05, 0.05, 0.10, 0.05, 0.25, 0.45, 0.05],
        [0.02, 0.08, 0.10, 0.05, 0.05, 0.65, 0.05],
        [0.05, 0.10, 0.05, 0.05, 0.05, 0.50, 0.20],
      ],
    },
    {
      id: 3,
      name: 'Head 3: Checksum & MRZ Verifier',
      focus: 'Validating cryptographic 7-3-1 weights and alphanumeric tokens',
      weights: [
        [0.15, 0.10, 0.10, 0.05, 0.50, 0.05, 0.05],
        [0.05, 0.15, 0.10, 0.05, 0.55, 0.05, 0.05],
        [0.02, 0.10, 0.15, 0.10, 0.58, 0.03, 0.02],
        [0.02, 0.05, 0.12, 0.20, 0.56, 0.03, 0.02],
        [0.02, 0.02, 0.05, 0.05, 0.78, 0.04, 0.04],
        [0.05, 0.05, 0.05, 0.05, 0.45, 0.30, 0.05],
        [0.05, 0.05, 0.05, 0.05, 0.60, 0.05, 0.15],
      ],
    },
  ];

  const currentHead = heads[activeHead];
  const queryTokenIdx = hoveredTokenIdx !== null ? hoveredTokenIdx : 2;
  const currentTokenWeights = currentHead.weights[queryTokenIdx] || [];

  return (
    <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] shadow-xl relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#6366F1] font-semibold uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Inside a Transformer</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]">
            Scaled Dot-Product Self-Attention Visualizer
          </h3>
        </div>

        <div className="font-mono text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#667085] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] px-3 py-1.5 rounded-lg border border-white/[0.06]">
          Softmax(Q · Kᵀ / √dₖ) · dₖ=64
        </div>
      </div>

      {/* Head Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {heads.map((h) => (
          <button
            key={h.id}
            onClick={() => setActiveHead(h.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              activeHead === h.id
                ? 'bg-[#6366F1] text-white border-[#6366F1] font-semibold shadow-sm'
                : 'bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] border-white/[0.06] hover:border-white/20'
            }`}
          >
            {h.name}
          </button>
        ))}
      </div>

      {/* Head Specialization Summary */}
      <div className="text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] mb-6 p-3 rounded-lg bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] border border-white/[0.06] flex items-center justify-between">
        <span>Head Specialization: <strong className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-medium">{currentHead.focus}</strong></span>
        <span className="font-mono text-[#6366F1]">Active Query: [{tokens[queryTokenIdx]}]</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Dynamic Curved Bezier Attention Arcs (7 cols) */}
        <div className="lg:col-span-7 bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F7F8FA] p-5 rounded-xl border border-white/[0.06]">
          <div className="text-[11px] font-mono text-[#667085] uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Hover Tokens to route Dynamic Attention Arcs</span>
            <span className="text-[#6366F1]">Weights: [0.00 → 1.00]</span>
          </div>

          {/* Tokens Array */}
          <div className="flex flex-wrap justify-between gap-1.5 mb-8 relative z-10">
            {tokens.map((tok, idx) => {
              const isQuery = idx === queryTokenIdx;
              const weight = currentTokenWeights[idx] || 0;

              return (
                <button
                  key={tok}
                  onMouseEnter={() => setHoveredTokenIdx(idx)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                    isQuery
                      ? 'bg-[#6366F1] text-white border-[#6366F1] font-bold shadow-md scale-105'
                      : weight > 0.3
                      ? 'bg-[#6366F1]/20 text-[#818CF8] border-[#6366F1]/40'
                      : 'bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div>{tok}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{(weight * 100).toFixed(0)}%</div>
                </button>
              );
            })}
          </div>

          {/* SVG Dynamic Arcs */}
          <div className="w-full h-36 relative">
            <svg viewBox="0 0 460 120" className="w-full h-full overflow-visible">
              {tokens.map((_, targetIdx) => {
                const weight = currentTokenWeights[targetIdx] || 0;
                if (weight < 0.03) return null;

                const startX = 30 + (queryTokenIdx / (tokens.length - 1)) * 400;
                const endX = 30 + (targetIdx / (tokens.length - 1)) * 400;
                const distance = Math.abs(endX - startX);
                const curveHeight = Math.min(85, Math.max(25, distance * 0.4));

                const pathData = `M ${startX} 10 C ${startX} ${10 + curveHeight}, ${endX} ${10 + curveHeight}, ${endX} 10`;

                return (
                  <g key={targetIdx}>
                    <path
                      d={pathData}
                      fill="none"
                      stroke={targetIdx === queryTokenIdx ? '#22D3EE' : '#6366F1'}
                      strokeWidth={Math.max(1.2, weight * 7)}
                      strokeOpacity={Math.min(1, 0.3 + weight * 1.2)}
                      strokeLinecap="round"
                    />
                    {weight > 0.25 && (
                      <circle r={2.5} fill="#22D3EE">
                        <animateMotion
                          path={pathData}
                          dur={`${2.2 - weight}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#667085] pt-3 border-t border-white/[0.06]">
            <span>α_i,j = exp(q_i · k_j / √64) / Σ exp(q_i · k_m / √64)</span>
            <span className="text-[#22D3EE]">Cyan: Self-Attn · Indigo: Cross-Attn</span>
          </div>
        </div>

        {/* Right: Full 7x7 Attention Heatmap Matrix (5 cols) */}
        <div className="lg:col-span-5 bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F7F8FA] p-5 rounded-xl border border-white/[0.06]">
          <div className="text-[11px] font-mono text-[#667085] uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>7×7 Softmax Matrix</span>
            {inspectCell && (
              <span className="text-[#6366F1] font-semibold">
                [{tokens[inspectCell.row]} → {tokens[inspectCell.col]}]: {(currentHead.weights[inspectCell.row][inspectCell.col] * 100).toFixed(1)}%
              </span>
            )}
          </div>

          {/* Matrix Grid */}
          <div className="grid grid-cols-7 gap-1">
            {currentHead.weights.map((row, rIdx) =>
              row.map((val, cIdx) => {
                const isSelectedRow = rIdx === queryTokenIdx;
                const alpha = val;

                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    onMouseEnter={() => {
                      setHoveredTokenIdx(rIdx);
                      setInspectCell({ row: rIdx, col: cIdx });
                    }}
                    onMouseLeave={() => setInspectCell(null)}
                    className={`aspect-square rounded-md flex items-center justify-center text-[9px] font-mono cursor-pointer transition-all ${
                      isSelectedRow ? 'ring-1 ring-[#6366F1]' : ''
                    }`}
                    style={{
                      backgroundColor: `rgba(99, 102, 241, ${Math.max(0.08, alpha)})`,
                      color: alpha > 0.4 ? '#FFFFFF' : '#9AA4B2',
                      fontWeight: alpha > 0.3 ? 'bold' : 'normal',
                    }}
                    title={`Q: ${tokens[rIdx]} | K: ${tokens[cIdx]} = ${(val * 100).toFixed(1)}%`}
                  >
                    {(val * 100).toFixed(0)}
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-4 text-[10px] font-mono text-[#667085] flex items-center justify-between">
            <span>Rows: Query Vectors (Q)</span>
            <span>Cols: Key Vectors (K)</span>
          </div>
        </div>

      </div>

    </div>
  );
};
