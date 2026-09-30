import React, { useState, useEffect } from 'react';
import { Layers, RotateCcw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const NeuralNetTile: React.FC = () => {
  const [formationKey, setFormationKey] = useState<number>(0);
  const [phase, setPhase] = useState<'falling' | 'connecting' | 'firing'>('falling');
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

    // Phase 1: Nodes free fall and land (0 to 600ms)
    // Phase 2: Synapse connections draw (600ms to 1100ms)
    const tConnect = setTimeout(() => {
      setPhase('connecting');
    }, 600);

    // Phase 3: Synaptic energy pulses fire (1100ms onwards)
    const tFire = setTimeout(() => {
      setPhase('firing');
    }, 1100);

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
      
      {/* Header with Re-Form Action */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#e58b24]" />
          <span>Neural Network Formation</span>
        </div>

        {/* Free-Fall Re-Form Trigger Button */}
        <button
          onClick={handleReform}
          className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded border border-[#e58b24]/40 bg-[#e58b24]/10 text-[#e58b24] hover:bg-[#e58b24] hover:text-[#121212] transition-colors"
          title="Trigger free fall node drop and re-form network"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          <span>Re-Form</span>
        </button>
      </div>

      {/* Interactive Free-Fall Neural Formation Canvas */}
      <div className="relative w-full h-32 my-1 flex items-center justify-center select-none">
        <svg
          key={formationKey}
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
                  stroke={isExcited ? '#e58b24' : isConnected ? '#3f3e3b' : 'transparent'}
                  strokeWidth={isExcited ? '1.5' : isConnected ? '0.6' : '0'}
                  opacity={isExcited ? 0.9 : isConnected ? 0.45 : 0}
                  style={{
                    transition: 'all 0.5s ease',
                    transitionDelay: `${(i + j) * 20}ms`
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
                  stroke={isExcited ? '#e58b24' : isConnected ? '#3f3e3b' : 'transparent'}
                  strokeWidth={isExcited ? '1.5' : isConnected ? '0.6' : '0'}
                  opacity={isExcited ? 0.9 : isConnected ? 0.45 : 0}
                  style={{
                    transition: 'all 0.5s ease',
                    transitionDelay: `${(i + j) * 25}ms`
                  }}
                />
              );
            })
          )}

          {/* Traveling Synaptic Energy Pulses (when in 'firing' phase) */}
          {phase === 'firing' && (
            <>
              {/* Pulse 1: Input to Hidden */}
              <circle r="2.2" fill="#e58b24" opacity="0.9">
                <animateMotion
                  path={`M ${layers[0].x} ${layers[0].nodes[0]} L ${layers[1].x} ${layers[1].nodes[1]}`}
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="2.2" fill="#e58b24" opacity="0.9">
                <animateMotion
                  path={`M ${layers[0].x} ${layers[0].nodes[2]} L ${layers[1].x} ${layers[1].nodes[3]}`}
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Pulse 2: Hidden to Output */}
              <circle r="2.5" fill="#e58b24" opacity="0.95">
                <animateMotion
                  path={`M ${layers[1].x} ${layers[1].nodes[1]} L ${layers[2].x} ${layers[2].nodes[0]}`}
                  dur="1.3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="2.5" fill="#e58b24" opacity="0.95">
                <animateMotion
                  path={`M ${layers[1].x} ${layers[1].nodes[3]} L ${layers[2].x} ${layers[2].nodes[1]}`}
                  dur="1.1s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}

          {/* Layer 1: Input Nodes Free Falling into Place */}
          {layers[0].nodes.map((y, i) => (
            <motion.circle
              key={`in-${i}-${formationKey}`}
              cx={layers[0].x}
              cy={y}
              r="5"
              fill={phase === 'firing' ? '#e58b24' : '#d97706'}
              stroke="#121212"
              strokeWidth="1.5"
              initial={{ cy: -30, opacity: 0 }}
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
              initial={{ cy: -30, opacity: 0 }}
              animate={{ cy: y, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 10,
                mass: 1.1,
                delay: 0.15 + i * 0.06
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
              fill={phase === 'firing' ? '#e58b24' : '#2b2a27'}
              stroke="#121212"
              strokeWidth="1.5"
              initial={{ cy: -30, opacity: 0 }}
              animate={{ cy: y, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 9,
                mass: 1.2,
                delay: 0.3 + i * 0.08
              }}
              onMouseEnter={() => setSelectedNode(`out-${i}`)}
              onMouseLeave={() => setSelectedNode(null)}
              className="cursor-pointer"
            />
          ))}
        </svg>

        {/* Small phase indicator */}
        <div className="absolute bottom-0 right-1 font-mono text-[9px] text-[#78716c] flex items-center gap-1">
          <Zap className="w-2.5 h-2.5 text-[#e58b24]" />
          <span>
            {phase === 'falling' && 'Dropping nodes…'}
            {phase === 'connecting' && 'Forming synapses…'}
            {phase === 'firing' && 'Active inference'}
          </span>
        </div>
      </div>

      {/* Toolchain Badges */}
      <div className="flex flex-wrap gap-1 pt-2 border-t border-[#2b2a27]/60">
        {["Python", "PyTorch", "Scikit-Learn", "FastAPI", "OpenCV", "Docker"].map((tech) => (
          <span
            key={tech}
            className="px-1.5 py-0.5 rounded text-[10px] font-mono border border-[#2b2a27] bg-[#121212] dark:bg-[#121212] light:bg-[#faf8f5] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
