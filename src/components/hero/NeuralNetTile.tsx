import React, { useState, useEffect, useRef } from 'react';
import { Layers } from 'lucide-react';

export const NeuralNetTile: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [hasActivated, setHasActivated] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setActiveLayer(3);
      setHasActivated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasActivated) {
          setHasActivated(true);
          // Activate layer 1 -> 2 -> 3 once, then rest
          setTimeout(() => setActiveLayer(1), 100);
          setTimeout(() => setActiveLayer(2), 350);
          setTimeout(() => setActiveLayer(3), 600);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasActivated]);

  // Layer node distributions
  const inputNodes = [20, 45, 70, 95];
  const hiddenNodes = [15, 38, 60, 82, 105];
  const outputNodes = [40, 80];

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-between p-5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative overflow-hidden"
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

      {/* Subtle Neural Network Layer Diagram */}
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
                stroke="#2b2a27"
                strokeWidth={activeLayer >= 2 ? "1" : "0.5"}
                opacity={activeLayer >= 2 ? "0.8" : "0.3"}
                style={{ transition: 'opacity 0.3s ease, stroke-width 0.3s ease' }}
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
                stroke="#2b2a27"
                strokeWidth={activeLayer >= 3 ? "1" : "0.5"}
                opacity={activeLayer >= 3 ? "0.8" : "0.3"}
                style={{ transition: 'opacity 0.3s ease, stroke-width 0.3s ease' }}
              />
            ))
          )}

          {/* Input Layer Nodes */}
          {inputNodes.map((y, i) => (
            <circle
              key={`in-${i}`}
              cx="30"
              cy={y}
              r="4.5"
              fill={activeLayer >= 1 ? "#e58b24" : "#2b2a27"}
              stroke="#121212"
              strokeWidth="1.5"
              style={{ transition: 'fill 0.3s ease' }}
            />
          ))}

          {/* Hidden Layer Nodes */}
          {hiddenNodes.map((y, i) => (
            <circle
              key={`hid-${i}`}
              cx="100"
              cy={y}
              r="4.5"
              fill={activeLayer >= 2 ? "#e58b24" : "#2b2a27"}
              stroke="#121212"
              strokeWidth="1.5"
              style={{ transition: 'fill 0.3s ease' }}
            />
          ))}

          {/* Output Layer Nodes */}
          {outputNodes.map((y, i) => (
            <circle
              key={`out-${i}`}
              cx="170"
              cy={y}
              r="5"
              fill={activeLayer >= 3 ? "#e58b24" : "#2b2a27"}
              stroke="#121212"
              strokeWidth="1.5"
              style={{ transition: 'fill 0.3s ease' }}
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
    </div>
  );
};
