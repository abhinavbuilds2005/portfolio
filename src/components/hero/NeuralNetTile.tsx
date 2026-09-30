import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const NeuralNetTile: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  useEffect(() => {
    // Left-to-right activation: 1 (input) -> 2 (hidden) -> 3 (output) -> rest at 3
    const t1 = setTimeout(() => setActiveLayer(1), 300);
    const t2 = setTimeout(() => setActiveLayer(2), 650);
    const t3 = setTimeout(() => setActiveLayer(3), 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const inputNodes = [20, 45, 70, 95];
  const hiddenNodes = [15, 38, 60, 82, 105];
  const outputNodes = [40, 80];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
      className="flex flex-col justify-between p-5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative overflow-hidden card-hover-lift"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#e58b24]" />
          <span>Core Stack & Architecture</span>
        </div>
        <span className="font-mono text-[10px] text-[#78716c]">
          Feedforward
        </span>
      </div>

      {/* Neural Network Layer Diagram with clear visible pulse */}
      <div className="relative w-full h-28 my-1 flex items-center justify-center">
        <svg viewBox="0 0 200 120" className="w-full h-full max-w-[220px]" aria-label="Neural Network Layers">
          {/* Connector lines between Input and Hidden */}
          {inputNodes.map((y1, i) =>
            hiddenNodes.map((y2, j) => (
              <line
                key={`ih-${i}-${j}`}
                x1="30"
                y1={y1}
                x2="100"
                y2={y2}
                stroke={activeLayer >= 2 ? "#e58b24" : "#2b2a27"}
                strokeWidth={activeLayer >= 2 ? "1.2" : "0.5"}
                opacity={activeLayer >= 2 ? 0.7 : 0.2}
                style={{ transition: 'all 0.4s ease' }}
              />
            ))
          )}

          {/* Connector lines between Hidden and Output */}
          {hiddenNodes.map((y1, i) =>
            outputNodes.map((y2, j) => (
              <line
                key={`ho-${i}-${j}`}
                x1="100"
                y1={y1}
                x2="170"
                y2={y2}
                stroke={activeLayer >= 3 ? "#e58b24" : "#2b2a27"}
                strokeWidth={activeLayer >= 3 ? "1.2" : "0.5"}
                opacity={activeLayer >= 3 ? 0.7 : 0.2}
                style={{ transition: 'all 0.4s ease' }}
              />
            ))
          )}

          {/* Input Layer Nodes */}
          {inputNodes.map((y, i) => (
            <circle
              key={`in-${i}`}
              cx="30"
              cy={y}
              r="5"
              fill={activeLayer >= 1 ? "#e58b24" : "#2b2a27"}
              stroke="#121212"
              strokeWidth="1.5"
              style={{ transition: 'all 0.35s ease' }}
            />
          ))}

          {/* Hidden Layer Nodes */}
          {hiddenNodes.map((y, i) => (
            <circle
              key={`hid-${i}`}
              cx="100"
              cy={y}
              r="5"
              fill={activeLayer >= 2 ? "#e58b24" : "#2b2a27"}
              stroke="#121212"
              strokeWidth="1.5"
              style={{ transition: 'all 0.35s ease' }}
            />
          ))}

          {/* Output Layer Nodes */}
          {outputNodes.map((y, i) => (
            <circle
              key={`out-${i}`}
              cx="170"
              cy={y}
              r="5.5"
              fill={activeLayer >= 3 ? "#e58b24" : "#2b2a27"}
              stroke="#121212"
              strokeWidth="1.5"
              style={{ transition: 'all 0.35s ease' }}
            />
          ))}
        </svg>
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
    </motion.div>
  );
};
