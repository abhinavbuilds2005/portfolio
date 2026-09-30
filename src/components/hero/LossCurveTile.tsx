import React, { useState, useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';

export const LossCurveTile: React.FC = () => {
  const [epoch, setEpoch] = useState(1);
  const [trainLoss, setTrainLoss] = useState(0.85);
  const [valLoss, setValLoss] = useState(0.92);
  const [hasDrawn, setHasDrawn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setEpoch(50);
      setTrainLoss(0.042);
      setValLoss(0.068);
      setHasDrawn(true);
      return;
    }

    // Observer to play once when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasDrawn) {
          setHasDrawn(true);
          const duration = 1400; // 1.4s max as per motion rules
          const steps = 50;
          const interval = duration / steps;
          let currentStep = 1;

          const timer = setInterval(() => {
            currentStep++;
            setEpoch(currentStep);
            
            // Exponential decay simulation
            const decay = Math.exp(-currentStep / 12);
            setTrainLoss(Number((0.042 + 0.82 * decay).toFixed(3)));
            setValLoss(Number((0.068 + 0.86 * decay + (Math.sin(currentStep) * 0.015)).toFixed(3)));

            if (currentStep >= steps) {
              clearInterval(timer);
              setEpoch(50);
              setTrainLoss(0.042);
              setValLoss(0.068);
            }
          }, interval);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasDrawn]);

  // Pre-calculated smooth SVG path points for 50 epochs
  // SVG ViewBox 0 0 260 120
  const trainPath = "M 10 105 C 40 85, 80 40, 140 25 S 210 20, 250 18";
  const valPath = "M 10 110 C 45 92, 90 48, 140 32 S 210 28, 250 24";

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-between p-5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative overflow-hidden"
    >
      {/* Tile Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 text-[#e58b24]" />
          <span>Convergence Telemetry</span>
        </div>
        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[#2b2a27] text-[#78716c]">
          Sample Curve
        </span>
      </div>

      {/* SVG Loss Curve with drawing animation */}
      <div className="relative w-full h-32 my-1">
        <svg viewBox="0 0 260 120" className="w-full h-full overflow-visible" aria-label="Training Loss vs Validation Loss Curve">
          {/* Subtle grid lines */}
          <line x1="10" y1="20" x2="250" y2="20" stroke="#2b2a27" strokeDasharray="3 3" strokeWidth="1" />
          <line x1="10" y1="60" x2="250" y2="60" stroke="#2b2a27" strokeDasharray="3 3" strokeWidth="1" />
          <line x1="10" y1="100" x2="250" y2="100" stroke="#2b2a27" strokeDasharray="3 3" strokeWidth="1" />

          {/* Validation loss curve (warm muted stone / dashed) */}
          <path
            d={valPath}
            fill="none"
            stroke="#a8a29e"
            strokeWidth="1.5"
            strokeDasharray={hasDrawn ? "none" : "300"}
            strokeDashoffset={hasDrawn ? "0" : "300"}
            style={{
              transition: hasDrawn ? "stroke-dashoffset 1.4s ease-out" : "none"
            }}
          />

          {/* Train loss curve (Saffron accent) */}
          <path
            d={trainPath}
            fill="none"
            stroke="#e58b24"
            strokeWidth="2.2"
            strokeDasharray={hasDrawn ? "none" : "300"}
            strokeDashoffset={hasDrawn ? "0" : "300"}
            style={{
              transition: hasDrawn ? "stroke-dashoffset 1.4s ease-out" : "none"
            }}
          />
        </svg>

        {/* Legend */}
        <div className="absolute top-1 right-1 flex items-center gap-3 font-mono text-[10px]">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-[#e58b24] inline-block"></span>
            <span className="text-[#a8a29e]">train</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-[#a8a29e] inline-block"></span>
            <span className="text-[#78716c]">val</span>
          </div>
        </div>
      </div>

      {/* Epoch & Loss Telemetry Counters */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#2b2a27]/60 font-mono text-[11px]">
        <div>
          <div className="text-[10px] text-[#78716c] uppercase">Epoch</div>
          <div className="font-semibold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
            {epoch.toString().padStart(2, '0')} / 50
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[#78716c] uppercase">Train Loss</div>
          <div className="font-semibold text-[#e58b24]">
            {trainLoss.toFixed(3)}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[#78716c] uppercase">Val Loss</div>
          <div className="font-semibold text-[#a8a29e]">
            {valLoss.toFixed(3)}
          </div>
        </div>
      </div>
    </div>
  );
};
