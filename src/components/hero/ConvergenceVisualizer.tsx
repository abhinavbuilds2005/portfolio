import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Activity, Play, Pause, RotateCcw, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export const ConvergenceVisualizer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0.08); // 0.0 to 1.0 (1 = converged)
  const [fold, setFold] = useState<number>(1);
  const [isConverged, setIsConverged] = useState(false);
  const [scrubProgress, setScrubProgress] = useState<number | null>(null);
  
  const animRef = useRef<number | null>(null);
  const convergeTimerRef = useRef<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Active displayed progress: either mouse scrubber or live training progress
  const displayProgress = scrubProgress !== null ? scrubProgress : progress;

  useEffect(() => {
    if (shouldReduceMotion) {
      setProgress(1);
      setIsPlaying(false);
      setIsConverged(true);
      return;
    }

    if (!isPlaying || scrubProgress !== null) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();
    const duration = 4800; // 4.8s per full training fold

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      setProgress((prev) => {
        const next = prev + delta / duration;
        if (next >= 1) {
          setIsConverged(true);
          // Wait 2.2s at optimal state to showcase converged weights, then cycle to next fold
          if (!convergeTimerRef.current) {
            convergeTimerRef.current = window.setTimeout(() => {
              setFold((f) => (f % 5) + 1);
              setIsConverged(false);
              setProgress(0.05);
              convergeTimerRef.current = null;
            }, 2200);
          }
          return 1;
        }
        return next;
      });

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (convergeTimerRef.current) {
        clearTimeout(convergeTimerRef.current);
        convergeTimerRef.current = null;
      }
    };
  }, [isPlaying, scrubProgress, shouldReduceMotion]);

  const handleReset = () => {
    if (convergeTimerRef.current) {
      clearTimeout(convergeTimerRef.current);
      convergeTimerRef.current = null;
    }
    setIsConverged(false);
    setProgress(0.04);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (isConverged && !isPlaying) {
      handleReset();
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  // SVG Mouse Scrubbing handlers
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const svgWidth = rect.width;
    // Map mouseX across the 30px to 305px curve region (out of 320 viewBox width)
    const normalized = (mouseX / svgWidth) * 320;
    const clamped = Math.max(30, Math.min(305, normalized));
    const scrubVal = (clamped - 30) / (305 - 30);
    setScrubProgress(scrubVal);
  };

  const handleMouseLeave = () => {
    setScrubProgress(null);
  };

  // Dynamic metrics calculation based on displayProgress
  const currentEpoch = Math.max(1, Math.min(60, Math.round(displayProgress * 60)));
  
  // Real-world loss curve with slight fold-specific variation
  const baseLoss = 0.078 + (fold * 0.003);
  const currentLoss = (baseLoss + (1.492 - baseLoss) * Math.exp(-displayProgress * 4.4)).toFixed(3);
  const currentValLoss = (baseLoss + 0.024 + (1.540 - baseLoss) * Math.exp(-displayProgress * 3.8)).toFixed(3);
  const currentPrAuc = (0.420 + (0.948 - 0.420) * (1 - Math.exp(-displayProgress * 3.6))).toFixed(3);
  
  const isOptimal = displayProgress >= 0.98;

  // Path coordinates calculation for bead position
  // Start: (30, 16), End approx: (305, 107)
  const beadX = 30 + displayProgress * (305 - 30);
  // Bezier curve approximation y: starts at 16, swoops down to 107
  const beadY = 16 + Math.pow(displayProgress, 0.44) * (107 - 16);
  const valBeadY = 22 + Math.pow(displayProgress, 0.42) * (101 - 22);

  return (
    <div className="rounded-xl border border-border-subtle bg-surface p-5 sm:p-6 card-hover relative overflow-hidden group shadow-lg">
      
      {/* Ambient background glow inside card */}
      <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/15 transition-all duration-700" />

      {/* Header with live telemetry pills and interactive controls */}
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent animate-pulse" />
          <span className="font-mono text-xs font-semibold text-text-primary">
            Convergence Telemetry
          </span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
            Fold {fold}/5
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleTogglePlay}
            className="flex items-center gap-1 px-2.5 py-1 rounded border border-border-subtle hover:border-border-strong text-text-secondary hover:text-text-primary bg-base font-mono text-[11px] transition-colors cursor-pointer active:scale-95"
            title={isPlaying ? "Pause training simulation" : "Resume training simulation"}
            aria-label={isPlaying ? "Pause simulation" : "Run convergence simulation"}
          >
            {isPlaying && scrubProgress === null ? (
              <>
                <Pause className="w-3 h-3 text-accent" />
                <span className="hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-accent" />
                <span className="hidden sm:inline">Train</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded border border-border-subtle hover:border-border-strong text-text-secondary hover:text-text-primary bg-base transition-colors cursor-pointer active:scale-95"
            title="Replay from Epoch 1"
            aria-label="Replay from Epoch 1"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Interactive SVG Training Curve with Mouse Scrubbing */}
      <div className="relative w-full h-44 bg-base rounded-lg border border-border-subtle p-3 mb-4 overflow-hidden select-none">
        <svg
          ref={svgRef}
          viewBox="0 0 320 130"
          className="w-full h-full overflow-visible cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="trainLossGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#06B6D4" stopOpacity="1" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="areaFillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          <line x1="30" y1="20" x2="310" y2="20" stroke="var(--border-subtle)" strokeDasharray="3 3" opacity="0.6" />
          <line x1="30" y1="55" x2="310" y2="55" stroke="var(--border-subtle)" strokeDasharray="3 3" opacity="0.6" />
          <line x1="30" y1="90" x2="310" y2="90" stroke="var(--border-subtle)" strokeDasharray="3 3" opacity="0.6" />
          <line x1="30" y1="120" x2="310" y2="120" stroke="var(--border-subtle)" />
          <line x1="30" y1="10" x2="30" y2="120" stroke="var(--border-subtle)" />

          {/* Axis Labels */}
          <text x="10" y="24" fill="var(--text-muted)" fontSize="9" fontFamily="monospace">1.5</text>
          <text x="10" y="59" fill="var(--text-muted)" fontSize="9" fontFamily="monospace">1.0</text>
          <text x="10" y="94" fill="var(--text-muted)" fontSize="9" fontFamily="monospace">0.5</text>
          <text x="10" y="122" fill="var(--text-muted)" fontSize="9" fontFamily="monospace">0.0</text>

          <text x="30" y="129" fill="var(--text-muted)" fontSize="8" fontFamily="monospace">E1</text>
          <text x="165" y="129" fill="var(--text-muted)" fontSize="8" fontFamily="monospace">E30</text>
          <text x="295" y="129" fill="var(--text-muted)" fontSize="8" fontFamily="monospace">E60</text>

          {/* Validation Loss Curve (Dashed line) */}
          <motion.path
            d="M 30 22 Q 70 42 110 68 T 190 92 T 270 98 T 305 101"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={{ pathLength: 1 }}
            animate={{ pathLength: Math.max(0.05, displayProgress) }}
            transition={{ ease: 'linear', duration: 0.08 }}
          />

          {/* Training Loss Curve (Accent gradient smooth curve) */}
          <motion.path
            d="M 30 16 Q 70 44 110 74 T 190 97 T 270 105 T 305 107"
            fill="none"
            stroke="url(#trainLossGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 1 }}
            animate={{ pathLength: Math.max(0.05, displayProgress) }}
            transition={{ ease: 'linear', duration: 0.08 }}
          />

          {/* Scrubber Crosshair Vertical Guide */}
          {scrubProgress !== null && (
            <line
              x1={beadX}
              y1="10"
              x2={beadX}
              y2="120"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.8"
            />
          )}

          {/* Validation Loss Bead */}
          <circle
            cx={beadX}
            cy={valBeadY}
            r={3}
            fill="var(--text-muted)"
            opacity={0.8}
          />

          {/* Active Training Tracker Bead & Radiant Pulse */}
          <circle
            cx={beadX}
            cy={beadY}
            r={isOptimal ? 4.5 : 5}
            fill={isOptimal ? 'var(--status-live)' : 'var(--accent)'}
            className="transition-all"
          />
          <circle
            cx={beadX}
            cy={beadY}
            r={isOptimal ? 10 : 12}
            fill={isOptimal ? 'var(--status-live)' : 'var(--accent)'}
            opacity={isOptimal ? 0.35 : 0.4}
            className="animate-ping"
          />

          {/* Converged Marker when reached end */}
          {isOptimal && (
            <g>
              <circle cx="305" cy="107" r="5" fill="var(--status-live)" />
              <circle cx="305" cy="107" r="14" fill="var(--status-live)" opacity="0.3" className="animate-pulse" />
            </g>
          )}
        </svg>

        {/* Legend overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-3 font-mono text-xs bg-surface/90 px-2.5 py-1 rounded-md border border-border-subtle backdrop-blur-md shadow-sm pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-accent rounded-sm inline-block" />
            <span className="text-text-primary text-[11px] font-medium">Train</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 border-b border-text-muted border-dashed inline-block" />
            <span className="text-text-muted text-[11px]">Val</span>
          </div>
        </div>

        {/* Live training status banner inside plot with hover prompt */}
        <div className="absolute bottom-3 left-10 flex items-center gap-1.5 font-mono text-xs text-text-secondary bg-surface/90 px-2.5 py-1 rounded-md border border-border-subtle shadow-sm backdrop-blur-sm pointer-events-none">
          <span className={`w-2 h-2 rounded-full ${isOptimal ? 'bg-live' : 'bg-accent animate-ping'}`} />
          <span className="text-text-primary font-medium">
            {scrubProgress !== null
              ? `Scrubbing Epoch ${currentEpoch}/60 · Loss: ${currentLoss}`
              : isOptimal
              ? 'Optimal Convergence Achieved // Weights Saved'
              : `Training Fold ${fold}/5... Epoch ${currentEpoch}/60`}
          </span>
        </div>

        {/* Subtle scrubber hint on right */}
        {scrubProgress === null && (
          <div className="absolute top-3 left-10 font-mono text-[10px] text-text-muted/70 hidden sm:block pointer-events-none">
            [Hover to scrub timeline]
          </div>
        )}
      </div>

      {/* Checkpoint Metrics Grid with Live Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border-subtle">
        <div className="p-2 rounded bg-base/60 border border-border-subtle/60">
          <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Epoch</div>
          <div className="font-mono text-xs font-semibold text-text-primary mt-0.5">
            {currentEpoch} <span className="text-text-muted text-[10px]">/ 60</span>
          </div>
        </div>

        <div className="p-2 rounded bg-base/60 border border-border-subtle/60">
          <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Train / Val Loss</div>
          <div className="font-mono text-xs font-semibold text-accent mt-0.5">
            {currentLoss} <span className="text-text-muted text-[10px]">/ {currentValLoss}</span>
          </div>
        </div>

        <div className="p-2 rounded bg-base/60 border border-border-subtle/60">
          <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">PR-AUC</div>
          <div className="font-mono text-xs font-semibold text-text-primary mt-0.5">
            {currentPrAuc}
          </div>
        </div>

        <div className="p-2 rounded bg-base/60 border border-border-subtle/60">
          <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">State</div>
          <div className={`font-mono text-xs font-semibold mt-0.5 flex items-center gap-1.5 ${isOptimal ? 'text-live' : 'text-accent'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOptimal ? 'bg-live' : 'bg-accent animate-pulse'}`} />
            <span>{isOptimal ? 'Converged' : 'Fitting...'}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-text-muted flex items-start gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
        <span>Stratified 5-fold cross-validation with cosine annealing learning rate scheduler. Zero test set leakage.</span>
      </div>

    </div>
  );
};
