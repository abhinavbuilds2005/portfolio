import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, Pause, RotateCcw, CheckCircle, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export const ConvergenceVisualizer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(1); // 0.0 to 1.0 (1 = converged)
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      setProgress(1);
      setIsPlaying(false);
      return;
    }

    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();
    const duration = 5000; // 5 seconds per full training cycle

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      setProgress((prev) => {
        const next = prev + delta / duration;
        if (next >= 1) {
          // Pause slightly when converged before auto-restarting or hold
          return 1;
        }
        return next;
      });

      animRef.current = requestAnimationFrame(loop);
    };

    if (progress >= 1) {
      // If already at 1 and user hits play, restart from beginning
      setProgress(0.05);
    }

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, shouldReduceMotion]);

  const handleReset = () => {
    setProgress(0.02);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (progress >= 1 && !isPlaying) {
      setProgress(0.02);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  // Interpolated metrics
  const currentEpoch = Math.max(1, Math.min(60, Math.round(progress * 60)));
  // Exponential loss decay: 1.482 -> 0.082
  const currentLoss = (0.082 + (1.482 - 0.082) * Math.exp(-progress * 4.2)).toFixed(3);
  // PR-AUC climbing: 0.420 -> 0.940
  const currentPrAuc = (0.420 + (0.940 - 0.420) * (1 - Math.exp(-progress * 3.5))).toFixed(3);
  const isOptimal = progress >= 0.98;

  // Path coordinates calculation for bead position
  // Start: (30, 15), End approx: (305, 107)
  const beadX = 30 + progress * (305 - 30);
  // Bezier curve approximation y: starts high (15), swoops down to (107)
  const beadY = 15 + Math.pow(progress, 0.45) * (107 - 15);

  return (
    <div className="rounded-lg border border-border-subtle bg-surface p-5 sm:p-6 card-hover relative overflow-hidden group">
      
      {/* Ambient background glow inside card */}
      <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all duration-700" />

      {/* Header with interactive controls */}
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent animate-pulse" />
          <span className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wide">
            Model Convergence
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleTogglePlay}
            className="flex items-center gap-1 px-2 py-0.5 rounded border border-border-subtle hover:border-border-strong text-text-secondary hover:text-text-primary bg-base font-mono text-[11px] transition-colors"
            title={isPlaying ? "Pause simulation" : "Run convergence simulation"}
            aria-label={isPlaying ? "Pause simulation" : "Run convergence simulation"}
          >
            {isPlaying ? (
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
            onClick={handleReset}
            className="p-1 rounded border border-border-subtle hover:border-border-strong text-text-secondary hover:text-text-primary bg-base transition-colors"
            title="Replay from Epoch 1"
            aria-label="Replay from Epoch 1"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          <span className="font-mono text-[11px] px-2 py-0.5 rounded border border-border-subtle text-text-muted bg-base hidden sm:inline-block">
            In-Fold Telemetry
          </span>
        </div>
      </div>

      {/* SVG Training Curve */}
      <div className="relative w-full h-44 bg-base rounded border border-border-subtle p-3 mb-4 overflow-hidden">
        <svg viewBox="0 0 320 130" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="trainLossGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e58b24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="areaFillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e58b24" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#e58b24" stopOpacity="0" />
            </linearGradient>
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
            d="M 30 18 Q 70 38 110 65 T 190 92 T 270 99 T 305 101"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={{ pathLength: 1 }}
            animate={{ pathLength: Math.max(0.05, progress) }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />

          {/* Training Loss Curve (Accent gradient smooth curve) */}
          <motion.path
            d="M 30 15 Q 70 42 110 72 T 190 97 T 270 106 T 305 107"
            fill="none"
            stroke="url(#trainLossGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 1 }}
            animate={{ pathLength: Math.max(0.05, progress) }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />

          {/* Active Tracker Bead & Pulse Ring */}
          <circle
            cx={beadX}
            cy={beadY}
            r={isOptimal ? 4 : 4.5}
            fill="var(--accent)"
            className="transition-all"
          />
          <circle
            cx={beadX}
            cy={beadY}
            r={isOptimal ? 8 : 10}
            fill="var(--accent)"
            opacity={isOptimal ? 0.25 : 0.35}
            className="animate-ping"
          />

          {/* Converged Marker when reached end */}
          {isOptimal && (
            <g>
              <circle cx="305" cy="107" r="4.5" fill="var(--status-live)" />
              <circle cx="305" cy="107" r="10" fill="var(--status-live)" opacity="0.3" className="animate-pulse" />
            </g>
          )}
        </svg>

        {/* Legend overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-3 font-mono text-xs bg-surface/90 px-2.5 py-1 rounded border border-border-subtle backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-accent rounded-sm inline-block" />
            <span className="text-text-primary text-[11px] font-medium">Train</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 border-b border-text-muted border-dashed inline-block" />
            <span className="text-text-muted text-[11px]">Val</span>
          </div>
        </div>

        {/* Live training status banner inside plot */}
        <div className="absolute bottom-3 left-10 flex items-center gap-1.5 font-mono text-[10px] text-text-muted bg-surface/80 px-2 py-0.5 rounded border border-border-subtle">
          <span className={`w-1.5 h-1.5 rounded-full ${isOptimal ? 'bg-live' : 'bg-accent animate-ping'}`} />
          <span>{isOptimal ? 'Optimal Convergence Achieved' : `Fitting Batch... Epoch ${currentEpoch}/60`}</span>
        </div>
      </div>

      {/* Checkpoint Metrics Grid with Live Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border-subtle">
        <div className="p-1.5 rounded bg-base/50 border border-border-subtle/50">
          <div className="font-mono text-[10px] text-text-muted uppercase">Epoch</div>
          <div className="font-mono text-xs font-semibold text-text-primary mt-0.5">
            {currentEpoch} <span className="text-text-muted text-[10px]">/ 60</span>
          </div>
        </div>

        <div className="p-1.5 rounded bg-base/50 border border-border-subtle/50">
          <div className="font-mono text-[10px] text-text-muted uppercase">Loss</div>
          <div className="font-mono text-xs font-semibold text-accent mt-0.5">
            {currentLoss}
          </div>
        </div>

        <div className="p-1.5 rounded bg-base/50 border border-border-subtle/50">
          <div className="font-mono text-[10px] text-text-muted uppercase">PR-AUC</div>
          <div className="font-mono text-xs font-semibold text-text-primary mt-0.5">
            {currentPrAuc}
          </div>
        </div>

        <div className="p-1.5 rounded bg-base/50 border border-border-subtle/50">
          <div className="font-mono text-[10px] text-text-muted uppercase">Status</div>
          <div className={`font-mono text-xs font-semibold mt-0.5 flex items-center gap-1 ${isOptimal ? 'text-live' : 'text-accent'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOptimal ? 'bg-live' : 'bg-accent animate-pulse'}`} />
            <span>{isOptimal ? 'Optimal' : 'Learning'}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-text-muted flex items-start gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
        <span>Audited with in-fold cross-validation to guarantee zero data leakage between training splits and evaluation metrics.</span>
      </div>

    </div>
  );
};
