import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, Pause, RotateCcw, Sliders, TrendingDown, TrendingUp } from 'lucide-react';

interface DataPoint {
  epoch: number;
  train: number;
  val: number;
}

export const LossCurveTile: React.FC = () => {
  const [optimizer, setOptimizer] = useState<'adam' | 'sgd'>('adam');
  const [metricMode, setMetricMode] = useState<'loss' | 'accuracy'>('loss');
  const [learningRate, setLearningRate] = useState<number>(0.005);
  const [isTraining, setIsTraining] = useState<boolean>(true);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [epoch, setEpoch] = useState<number>(1);
  const [currentTrain, setCurrentTrain] = useState<number>(0.88);
  const [currentVal, setCurrentVal] = useState<number>(0.94);
  const [gradNorm, setGradNorm] = useState<number>(0.42);

  const maxEpochs = 60;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset and restart training
  const startTraining = (selectedOpt = optimizer, selectedLR = learningRate) => {
    setIsTraining(true);
    setEpoch(1);
    setDataPoints([]);

    const initialTrain = metricMode === 'loss' ? 0.92 : 0.12;
    const initialVal = metricMode === 'loss' ? 0.98 : 0.08;

    setCurrentTrain(initialTrain);
    setCurrentVal(initialVal);
    setGradNorm(0.48);

    const firstPoint: DataPoint = { epoch: 1, train: initialTrain, val: initialVal };
    setDataPoints([firstPoint]);
  };

  useEffect(() => {
    startTraining();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [optimizer, metricMode]);

  // Live real-time training step ticker
  useEffect(() => {
    if (!isTraining) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setEpoch((prevEpoch) => {
        if (prevEpoch >= maxEpochs) {
          setIsTraining(false);
          return maxEpochs;
        }

        const nextEpoch = prevEpoch + 1;
        const progress = nextEpoch / maxEpochs;

        // Realistic convergence simulation with noise
        const decayRate = optimizer === 'adam' ? 4.2 : 2.8;
        const noiseScale = optimizer === 'sgd' ? 0.035 : 0.012;

        let nextTrain: number;
        let nextVal: number;

        if (metricMode === 'loss') {
          // Loss decays from ~0.92 down to ~0.038
          const baseLoss = 0.038 + 0.88 * Math.exp(-progress * decayRate);
          const noise = (Math.random() - 0.48) * noiseScale;
          nextTrain = Math.max(0.02, parseFloat((baseLoss + noise).toFixed(4)));

          const valNoise = (Math.random() - 0.46) * noiseScale * 1.5;
          nextVal = Math.max(0.04, parseFloat((baseLoss * 1.15 + valNoise).toFixed(4)));
          
          setGradNorm(parseFloat((0.48 * Math.exp(-progress * 3.5) + Math.random() * 0.01).toFixed(4)));
        } else {
          // Accuracy ascends from ~0.12 up to ~0.965
          const baseAcc = 0.965 - 0.84 * Math.exp(-progress * decayRate);
          const noise = (Math.random() - 0.5) * noiseScale;
          nextTrain = Math.min(0.99, parseFloat((baseAcc + noise).toFixed(4)));

          const valNoise = (Math.random() - 0.5) * noiseScale * 1.4;
          nextVal = Math.min(0.97, parseFloat((baseAcc * 0.96 + valNoise).toFixed(4)));

          setGradNorm(parseFloat((0.48 * Math.exp(-progress * 3.5)).toFixed(4)));
        }

        setCurrentTrain(nextTrain);
        setCurrentVal(nextVal);

        setDataPoints((prevPoints) => [
          ...prevPoints,
          { epoch: nextEpoch, train: nextTrain, val: nextVal }
        ]);

        return nextEpoch;
      });
    }, 65); // 65ms per epoch for smooth real-time streaming plot

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTraining, optimizer, metricMode]);

  // SVG coordinate transformation
  // ViewBox: 0 0 280 130
  // X: 15 to 265
  // Y: 15 (high metric/loss at top) to 115 (low metric/loss at bottom)
  const getCoordinates = (p: DataPoint) => {
    const x = 15 + ((p.epoch - 1) / (maxEpochs - 1)) * 250;
    // Both loss and accuracy: high value (1.0) maps near top (y=15), low value (0.0) maps near bottom (y=115)
    // For loss, it starts high (~0.92, y=23) and falls down to near zero (~0.04, y=111)
    const yTrain = 115 - p.train * 100;
    const yVal = 115 - p.val * 100;
    return { x, yTrain, yVal };
  };

  // Build SVG path strings
  let trainSvgPath = '';
  let valSvgPath = '';

  dataPoints.forEach((p, idx) => {
    const { x, yTrain, yVal } = getCoordinates(p);
    if (idx === 0) {
      trainSvgPath = `M ${x} ${yTrain}`;
      valSvgPath = `M ${x} ${yVal}`;
    } else {
      trainSvgPath += ` L ${x} ${yTrain}`;
      valSvgPath += ` L ${x} ${yVal}`;
    }
  });

  const lastCoords = dataPoints.length > 0 ? getCoordinates(dataPoints[dataPoints.length - 1]) : null;

  return (
    <div className="flex flex-col justify-between p-5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm relative overflow-hidden card-hover-lift">
      
      {/* Header with Live Status & Controls */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-[#e58b24]" />
            <span>Convergence Telemetry</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded border border-[#2b2a27] text-[#78716c] lowercase font-normal">[simulated / sample data]</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Live status dot */}
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#a8a29e]">
              <span className={`w-1.5 h-1.5 rounded-full ${isTraining ? 'bg-[#e58b24]' : 'bg-[#78716c]'}`} />
              <span>{isTraining ? 'OPTIMIZING' : 'CONVERGED'}</span>
            </span>
          </div>
        </div>

        {/* Optimizer & Metric Mode Controls Strip */}
        <div className="flex items-center justify-between gap-2 py-1.5 px-2 rounded bg-[#121212] border border-[#2b2a27] font-mono text-[10px] mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[#78716c]">OPT:</span>
            <button
              onClick={() => setOptimizer('adam')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                optimizer === 'adam'
                  ? 'bg-[#e58b24] text-[#121212] font-bold'
                  : 'text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              Adam
            </button>
            <button
              onClick={() => setOptimizer('sgd')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                optimizer === 'sgd'
                  ? 'bg-[#e58b24] text-[#121212] font-bold'
                  : 'text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              SGD+M
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMetricMode(metricMode === 'loss' ? 'accuracy' : 'loss')}
              className="flex items-center gap-1 text-[#e58b24] hover:underline"
            >
              {metricMode === 'loss' ? (
                <>
                  <TrendingDown className="w-3 h-3" />
                  <span>Loss (MSE)</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-3 h-3" />
                  <span>Accuracy (%)</span>
                </>
              )}
            </button>

            {/* Play/Pause & Restart buttons */}
            <button
              onClick={() => setIsTraining(!isTraining)}
              className="p-1 rounded text-[#a8a29e] hover:text-[#f5f2eb] hover:bg-[#2b2a27]"
              title={isTraining ? 'Pause training' : 'Resume training'}
            >
              {isTraining ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-[#e58b24]" />}
            </button>

            <button
              onClick={() => startTraining()}
              className="p-1 rounded text-[#a8a29e] hover:text-[#f5f2eb] hover:bg-[#2b2a27]"
              title="Reset & Re-Train model"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Real-time SVG Canvas with Live Streaming Curve */}
      <div className="relative w-full h-32 my-1 bg-[#121212]/40 rounded border border-[#2b2a27]/60 overflow-hidden">
        <svg viewBox="0 0 280 130" className="w-full h-full overflow-visible" aria-label="Live ML Training Graph">
          {/* Subtle horizontal grid lines */}
          <line x1="15" y1="20" x2="265" y2="20" stroke="#2b2a27" strokeDasharray="3 3" strokeWidth="0.8" />
          <line x1="15" y1="65" x2="265" y2="65" stroke="#2b2a27" strokeDasharray="3 3" strokeWidth="0.8" />
          <line x1="15" y1="110" x2="265" y2="110" stroke="#2b2a27" strokeDasharray="3 3" strokeWidth="0.8" />

          {/* Validation Curve (Muted Stone) */}
          {valSvgPath && (
            <path
              d={valSvgPath}
              fill="none"
              stroke="#a8a29e"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          )}

          {/* Training Curve (Saffron Accent) */}
          {trainSvgPath && (
            <path
              d={trainSvgPath}
              fill="none"
              stroke="#e58b24"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Glowing Animated Leading Head (Tracer dot) */}
          {lastCoords && isTraining && (
            <g>
              <circle
                cx={lastCoords.x}
                cy={lastCoords.yTrain}
                r="6"
                fill="#e58b24"
                opacity="0.3"
                className="animate-ping"
              />
              <circle
                cx={lastCoords.x}
                cy={lastCoords.yTrain}
                r="3.5"
                fill="#e58b24"
                stroke="#121212"
                strokeWidth="1.2"
              />
            </g>
          )}
        </svg>

        {/* Legend */}
        <div className="absolute top-2 right-2 flex items-center gap-3 font-mono text-[9px] bg-[#121212]/80 px-2 py-0.5 rounded border border-[#2b2a27]">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-[#e58b24] inline-block"></span>
            <span className="text-[#e58b24]">train</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-[#a8a29e] inline-block"></span>
            <span className="text-[#a8a29e]">val</span>
          </div>
        </div>

        {/* Y-axis indicator */}
        <div className="absolute top-2 left-2 font-mono text-[8px] text-[#78716c]">
          {metricMode === 'loss' ? 'LOSS 1.0 (High)' : 'ACC 100%'}
        </div>
        <div className="absolute bottom-1 left-2 font-mono text-[8px] text-[#78716c]">
          {metricMode === 'loss' ? 'LOSS 0.0 (Converged) ↓' : 'ACC 0%'}
        </div>
      </div>

      {/* Live Telemetry Readout Strip */}
      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#2b2a27]/60 font-mono text-[11px]">
        <div>
          <div className="text-[9px] text-[#78716c] uppercase">Epoch</div>
          <div className="font-semibold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
            {epoch} / {maxEpochs}
          </div>
        </div>
        <div>
          <div className="text-[9px] text-[#78716c] uppercase">
            {metricMode === 'loss' ? 'Train Loss' : 'Train Acc'}
          </div>
          <div className="font-semibold text-[#e58b24]">
            {metricMode === 'loss' ? currentTrain.toFixed(3) : `${(currentTrain * 100).toFixed(1)}%`}
          </div>
        </div>
        <div>
          <div className="text-[9px] text-[#78716c] uppercase">
            {metricMode === 'loss' ? 'Val Loss' : 'Val Acc'}
          </div>
          <div className="font-semibold text-[#a8a29e]">
            {metricMode === 'loss' ? currentVal.toFixed(3) : `${(currentVal * 100).toFixed(1)}%`}
          </div>
        </div>
        <div>
          <div className="text-[9px] text-[#78716c] uppercase">||∇L|| Grad</div>
          <div className="font-semibold text-[#78716c]">
            {gradNorm.toFixed(3)}
          </div>
        </div>
      </div>

    </div>
  );
};
