import React, { useState, useEffect, useRef } from 'react';
import { Target } from 'lucide-react';
import { motion } from 'framer-motion';

export const ResultsTile: React.FC = () => {
  const [hasScrolledIn, setHasScrolledIn] = useState(false);
  const [tp, setTp] = useState(0);
  const [fp, setFp] = useState(0);
  const [fn, setFn] = useState(0);
  const [tn, setTn] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasScrolledIn) {
          setHasScrolledIn(true);
          const duration = 600;
          const steps = 30;
          const interval = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            setTp(Math.round(142 * progress));
            setFp(Math.round(8 * progress));
            setFn(Math.round(6 * progress));
            setTn(Math.round(184 * progress));

            if (step >= steps) {
              clearInterval(timer);
              setTp(142);
              setFp(8);
              setFn(6);
              setTn(184);
            }
          }, interval);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasScrolledIn]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      className="flex flex-col justify-between p-5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative overflow-hidden card-hover-lift"
    >
      {/* Tile Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] uppercase tracking-wider">
          <Target className="w-3.5 h-3.5 text-[#e58b24]" />
          <span>Evaluation Matrix</span>
        </div>
        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[#2b2a27] text-[#78716c]">
          Sample Data
        </span>
      </div>

      {/* Confusion Matrix 2x2 Heatmap */}
      <div className="my-1">
        <div className="text-[10px] font-mono text-[#78716c] uppercase mb-1 flex justify-between">
          <span>Actual \ Predicted</span>
          <span>Pos | Neg</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {/* True Positive (High Heat) */}
          <div
            className="p-3 rounded border border-[#2b2a27] text-center transition-all duration-700 ease-out"
            style={{
              backgroundColor: hasScrolledIn ? 'rgba(229, 139, 36, 0.28)' : 'transparent',
              borderColor: hasScrolledIn ? 'rgba(229, 139, 36, 0.4)' : '#2b2a27'
            }}
          >
            <div className="font-mono text-[10px] text-[#a8a29e] uppercase">TP</div>
            <div className="font-mono text-lg font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
              {tp}
            </div>
            <div className="font-mono text-[9px] text-[#e58b24]">High Recall</div>
          </div>

          {/* False Positive (Low Heat) */}
          <div
            className="p-3 rounded border border-[#2b2a27] text-center transition-all duration-700 ease-out"
            style={{
              backgroundColor: hasScrolledIn ? 'rgba(229, 139, 36, 0.08)' : 'transparent'
            }}
          >
            <div className="font-mono text-[10px] text-[#78716c] uppercase">FP</div>
            <div className="font-mono text-lg font-bold text-[#a8a29e]">
              {fp}
            </div>
            <div className="font-mono text-[9px] text-[#78716c]">Type I Err</div>
          </div>

          {/* False Negative (Low Heat) */}
          <div
            className="p-3 rounded border border-[#2b2a27] text-center transition-all duration-700 ease-out"
            style={{
              backgroundColor: hasScrolledIn ? 'rgba(229, 139, 36, 0.06)' : 'transparent'
            }}
          >
            <div className="font-mono text-[10px] text-[#78716c] uppercase">FN</div>
            <div className="font-mono text-lg font-bold text-[#a8a29e]">
              {fn}
            </div>
            <div className="font-mono text-[9px] text-[#78716c]">Type II Err</div>
          </div>

          {/* True Negative (High Heat) */}
          <div
            className="p-3 rounded border border-[#2b2a27] text-center transition-all duration-700 ease-out"
            style={{
              backgroundColor: hasScrolledIn ? 'rgba(229, 139, 36, 0.32)' : 'transparent',
              borderColor: hasScrolledIn ? 'rgba(229, 139, 36, 0.4)' : '#2b2a27'
            }}
          >
            <div className="font-mono text-[10px] text-[#a8a29e] uppercase">TN</div>
            <div className="font-mono text-lg font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
              {tn}
            </div>
            <div className="font-mono text-[9px] text-[#e58b24]">Specificity</div>
          </div>
        </div>
      </div>

      {/* Summary readout */}
      <div className="flex items-center justify-between pt-2 border-t border-[#2b2a27]/60 font-mono text-[11px]">
        <span className="text-[#78716c]">F1-Score (Sample):</span>
        <span className="font-bold text-[#e58b24]">0.953</span>
      </div>
    </motion.div>
  );
};
