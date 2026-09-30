import React, { useState, useEffect } from 'react';
import { Layers, RotateCcw, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const NeuralNetTile: React.FC = () => {
  const [formationKey, setFormationKey] = useState<number>(0);
  const [phase, setPhase] = useState<'falling' | 'connecting' | 'firing'>('falling');
  const [passMode, setPassMode] = useState<'forward' | 'backprop'>('forward');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // 3-layer architecture coordinates
  const layers = [
    { id: 'input', name: 'Input Layer', x: 28, nodes: [20, 48, 76, 104] },
    { id: 'hidden', name: 'Latent Hidden', x: 100, nodes: [14, 38, 62, 86, 110] },
    { id: 'output', name: 'Output Layer', x: 172, nodes: [42, 82] }
  ];

  // Trigger formation sequence
  useEffect(() => {
    setPhase('falling');

    const tConnect = setTimeout(() => {
      setPhase('connecting');
    }, 550);

    const tFire = setTimeout(() => {
      setPhase('firing');
    }, 1000);

    return () => {
      clearTimeout(tConnect);
      clearTimeout(tFire);
    };
  }, [formationKey]);

  const handleReform = () => {
    setFormationKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col justify-between p-5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative overflow-hidden card-hover-lift">
      
      {/* Header with Re-Form & Mode Action */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#e58b24]" />
            <span>Deep Learning Mechanism</span>
          </div>

          <div className="flex items-center gap-1">
            {/* Free-Fall Re-Form Trigger Button */}
            <button
              onClick={handleReform}
              className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded border border-[#e58b24]/40 bg-[#e58b24]/10 text-[#e58b24] hover:bg-[#e58b24] hover:text-[#121212] transition-colors"
              title="Trigger free fall node drop and re-form network"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Drop & Re-Form</span>
            </button>
          </div>
        </div>

        {/* Mode Selector: Forward Inference vs Backpropagation */}
        <div className="flex items-center justify-between gap-1 py-1 px-2 rounded bg-[#121212] border border-[#2b2a27] font-mono text-[10px] mb-2">
          <span className="text-[#78716c]">PASS:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPassMode('forward')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                passMode === 'forward'
                  ? 'bg-[#e58b24] text-[#121212] font-bold'
                  : 'text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              <span>Forward (ŷ)</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </button>
            <button
              onClick={() => setPassMode('backprop')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                passMode === 'backprop'
                  ? 'bg-[#e58b24] text-[#121212] font-bold'
                  : 'text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              <ArrowLeft className="w-2.5 h-2.5" />
              <span>Backprop (∂L/∂W)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Free-Fall Neural Formation Canvas */}
      <div className="relative w-full h-32 my-1 flex items-center justify-center select-none bg-[#121212]/30 rounded border border-[#2b2a27]/40">
        <svg
          key={`${formationKey}-${passMode}`}
          viewBox="0 0 200 125"
          className="w-full h-full max-w-[240px] overflow-visible"
          aria-label="Dynamic Neural Network Formation"
        >
          {/* Synapses (Connections) drawing from Input to Hidden */}
          {layers[0].nodes.map((y1, i) =>
            layers[1].nodes.map((y2, j) => {
              const isConnected = phase === 'connecting' || phase === 'firing';
              const isExcited = selectedNode === `in-${i}` || selectedNode === `hid-${j}`;

              return (
                <line
                  key={`ih-${i}-${j}`}
                  x1={layers[0].x}
                  y1={y1}
                  x2={layers[1].x}
                  y2={y2}
                  stroke={isExcited ? '#e58b24' : isConnected ? (passMode === 'backprop' ? '#8c5017' : '#3f3e3b') : 'transparent'}
                  strokeWidth={isExcited ? '1.5' : isConnected ? '0.7' : '0'}
                  opacity={isExcited ? 0.95 : isConnected ? 0.45 : 0}
                  style={{
                    transition: 'all 0.5s ease',
                    transitionDelay: `${(i + j) * 15}ms`
                  }}
                />
              );
            })
          )}

          {/* Synapses (Connections) drawing from Hidden to Output */}
          {layers[1].nodes.map((y1, i) =>
            layers[2].nodes.map((y2, j) => {
              const isConnected = phase === 'connecting' || phase === 'firing';
              const isExcited = selectedNode === `hid-${i}` || selectedNode === `out-${j}`;

              return (
                <line
                  key={`ho-${i}-${j}`}
                  x1={layers[1].x}
                  y1={y1}
                  x2={layers[2].x}
                  y2={y2}
                  stroke={isExcited ? '#e58b24' : isConnected ? (passMode === 'backprop' ? '#8c5017' : '#3f3e3b') : 'transparent'}
                  strokeWidth={isExcited ? '1.5' : isConnected ? '0.7' : '0'}
                  opacity={isExcited ? 0.95 : isConnected ? 0.45 : 0}
                  style={{
                    transition: 'all 0.5s ease',
                    transitionDelay: `${(i + j) * 20}ms`
                  }}
                />
              );
            })
          )}

          {/* Traveling Synaptic Energy Pulses */}
          {phase === 'firing' && (
            <>
              {passMode === 'forward' ? (
                // Forward Propagation (Input -> Hidden -> Output)
                <>
                  <circle r="2.4" fill="#e58b24" opacity="0.95">
                    <animateMotion
                      path={`M ${layers[0].x} ${layers[0].nodes[0]} L ${layers[1].x} ${layers[1].nodes[1]}`}
                      dur="1.0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="2.4" fill="#e58b24" opacity="0.95">
                    <animateMotion
                      path={`M ${layers[0].x} ${layers[0].nodes[2]} L ${layers[1].x} ${layers[1].nodes[3]}`}
                      dur="1.3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="2.6" fill="#e58b24">
                    <animateMotion
                      path={`M ${layers[1].x} ${layers[1].nodes[1]} L ${layers[2].x} ${layers[2].nodes[0]}`}
                      dur="1.1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="2.6" fill="#e58b24">
                    <animateMotion
                      path={`M ${layers[1].x} ${layers[1].nodes[3]} L ${layers[2].x} ${layers[2].nodes[1]}`}
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              ) : (
                // Backward Propagation of Error Gradients (Output -> Hidden -> Input)
                <>
                  <circle r="2.6" fill="#e58b24" opacity="0.95">
                    <animateMotion
                      path={`M ${layers[2].x} ${layers[2].nodes[0]} L ${layers[1].x} ${layers[1].nodes[2]}`}
                      dur="1.1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="2.6" fill="#e58b24" opacity="0.95">
                    <animateMotion
                      path={`M ${layers[2].x} ${layers[2].nodes[1]} L ${layers[1].x} ${layers[1].nodes[4]}`}
                      dur="1.3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="2.4" fill="#d97706">
                    <animateMotion
                      path={`M ${layers[1].x} ${layers[1].nodes[2]} L ${layers[0].x} ${layers[0].nodes[1]}`}
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="2.4" fill="#d97706">
                    <animateMotion
                      path={`M ${layers[1].x} ${layers[1].nodes[4]} L ${layers[0].x} ${layers[0].nodes[3]}`}
                      dur="1.0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              )}
            </>
          )}

          {/* Layer 1: Input Nodes Free Falling into Place */}
          {layers[0].nodes.map((y, i) => (
            <motion.circle
              key={`in-${i}-${formationKey}`}
              cx={layers[0].x}
              cy={y}
              r="5"
              fill={phase === 'firing' ? (passMode === 'forward' ? '#e58b24' : '#a8a29e') : '#d97706'}
              stroke="#121212"
              strokeWidth="1.5"
              initial={{ cy: -35, opacity: 0 }}
              animate={{ cy: y, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 10,
                mass: 1.1,
                delay: i * 0.08
              }}
              onMouseEnter={() => setSelectedNode(`in-${i}`)}
              onMouseLeave={() => setSelectedNode(null)}
              className="cursor-pointer"
            />
          ))}

          {/* Layer 2: Hidden Nodes Free Falling into Place */}
          {layers[1].nodes.map((y, i) => (
            <motion.circle
              key={`hid-${i}-${formationKey}`}
              cx={layers[1].x}
              cy={y}
              r="5"
              fill={phase === 'firing' ? '#e58b24' : '#2b2a27'}
              stroke="#121212"
              strokeWidth="1.5"
              initial={{ cy: -35, opacity: 0 }}
              animate={{ cy: y, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 10,
                mass: 1.1,
                delay: 0.12 + i * 0.06
              }}
              onMouseEnter={() => setSelectedNode(`hid-${i}`)}
              onMouseLeave={() => setSelectedNode(null)}
              className="cursor-pointer"
            />
          ))}

          {/* Layer 3: Output Nodes Free Falling into Place */}
          {layers[2].nodes.map((y, i) => (
            <motion.circle
              key={`out-${i}-${formationKey}`}
              cx={layers[2].x}
              cy={y}
              r="6"
              fill={phase === 'firing' ? (passMode === 'backprop' ? '#e58b24' : '#d97706') : '#2b2a27'}
              stroke="#121212"
              strokeWidth="1.5"
              initial={{ cy: -35, opacity: 0 }}
              animate={{ cy: y, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 9,
                mass: 1.2,
                delay: 0.25 + i * 0.08
              }}
              onMouseEnter={() => setSelectedNode(`out-${i}`)}
              onMouseLeave={() => setSelectedNode(null)}
              className="cursor-pointer"
            />
          ))}
        </svg>

        {/* Dynamic status pill */}
        <div className="absolute bottom-1 right-2 font-mono text-[9px] text-[#78716c] flex items-center gap-1 bg-[#121212]/90 px-1.5 py-0.5 rounded border border-[#2b2a27]">
          <Zap className="w-2.5 h-2.5 text-[#e58b24]" />
          <span>
            {phase === 'falling' && 'Free-Fall Gravitational Drop'}
            {phase === 'connecting' && 'Synaptic Wiring'}
            {phase === 'firing' && (passMode === 'forward' ? 'Forward Pass (Inference)' : 'Backprop (Gradient Flow)')}
          </span>
        </div>
      </div>

      {/* Mathematical Tensor Flow Spec */}
      <div className="flex items-center justify-between pt-2 border-t border-[#2b2a27]/60 font-mono text-[10px]">
        <span className="text-[#78716c]">Mapping:</span>
        <span className="text-[#a8a29e] truncate">
          {passMode === 'forward'
            ? 'y_hat = σ(W₂ · ReLU(W₁x + b₁) + b₂)'
            : '∂L/∂W₁ = (∂L/∂y · W₂) ⊙ σ\'(z₁) · xᵀ'}
        </span>
      </div>
    </div>
  );
};
