import React, { useState, useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const LossCurveTile: React.FC = () => {
  const [epoch, setEpoch] = useState(1);
  const [trainLoss, setTrainLoss] = useState(0.85);
  const [valLoss, setValLoss] = useState(0.92);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start drawing shortly after mount or when in view
    const timer = setTimeout(() => {
      setHasStarted(true);

      const totalSteps = 50;
      const duration = 1400; // 1.4s duration
      const stepInterval = duration / totalSteps;
      let currentEpoch = 1;

      const intervalId = setInterval(() => {
        currentEpoch++;
        setEpoch(currentEpoch);

        // Exponential convergence simulation
        const progress = currentEpoch / totalSteps;
        const decay = Math.exp(-progress * 3.5);
        
        const curTrain = (0.042 + 0.808 * decay).toFixed(3);
        const curVal = (0.068 + 0.852 * decay + Math.sin(currentEpoch * 0.4) * 0.008).toFixed(3);

        setTrainLoss(parseFloat(curTrain));
        setValLoss(parseFloat(curVal));

        if (currentEpoch >= totalSteps) {
          clearInterval(intervalId);
          setEpoch(50);
          setTrainLoss(0.042);
          setValLoss(0.068);
        }
      }, stepInterval);

      return () => clearInterval(intervalId);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const trainPath = "M 10 105 C 40 85, 80 40, 140 25 S 210 20, 250 18";
  const valPath = "M 10 110 C 45 92, 90 48, 140 32 S 210 28, 250 24";

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      className="flex flex-col justify-between p-5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative overflow-hidden card-hover-lift"
    >
      {/* Tile Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 text-[#e58b24]" />
          <span>Convergence Telemetry</span>
        </div>
        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[#2b2a27] text-[#78716c]">
          Realtime Draw
        </span>
      </div>

      {/* SVG Loss Curve with smooth stroke-dashoffset transition */}
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
            strokeWidth="1.6"
            strokeDasharray="320"
            strokeDashoffset={hasStarted ? "0" : "320"}
            style={{
              transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />

          {/* Train loss curve (Saffron accent) */}
          <path
            d={trainPath}
            fill="none"
            stroke="#e58b24"
            strokeWidth="2.4"
            strokeDasharray="320"
            strokeDashoffset={hasStarted ? "0" : "320"}
            style={{
              transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </svg>

        {/* Legend */}
        <div className="absolute top-1 right-1 flex items-center gap-3 font-mono text-[10px]">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-[#e58b24] inline-block"></span>
            <span className="text-[#e58b24] font-medium">train</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-[#a8a29e] inline-block"></span>
            <span className="text-[#a8a29e]">val</span>
          </div>
        </div>
      </div>

      {/* Epoch & Loss Telemetry Counters */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#2b2a27]/60 font-mono text-[11px]">
        <div>
          <div className="text-[10px] text-[#78716c] uppercase">Epoch</div>
          <div className="font-semibold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] tracking-wider">
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
    </motion.div>
  );
};
