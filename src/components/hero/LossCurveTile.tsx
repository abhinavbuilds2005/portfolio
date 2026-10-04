import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, Pause, RotateCcw, TrendingDown, TrendingUp, Sliders } from 'lucide-react';

interface DataPoint {
  epoch: number;
  train: number;
  val: number;
}

export const LossCurveTile: React.FC = () => {
  const [optimizer, setOptimizer] = useState<'adam' | 'sgd'>('adam');
  const [metricMode, setMetricMode] = useState<'loss' | 'accuracy'>('loss');
  const [isTraining, setIsTraining] = useState<boolean>(true);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [epoch, setEpoch] = useState<number>(1);
  const [currentTrain, setCurrentTrain] = useState<number>(0.88);
  const [currentVal, setCurrentVal] = useState<number>(0.94);
  const [gradNorm, setGradNorm] = useState<number>(0.42);

  const maxEpochs = 50;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTraining = (selectedOpt = optimizer) => {
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

        const decayRate = optimizer === 'adam' ? 4.2 : 2.6;
        const noiseScale = optimizer === 'sgd' ? 0.03 : 0.012;

        let nextTrain: number;
        let nextVal: number;

        if (metricMode === 'loss') {
          const baseLoss = 0.038 + 0.88 * Math.exp(-progress * decayRate);
          const noise = (Math.random() - 0.48) * noiseScale;
          nextTrain = Math.max(0.02, parseFloat((baseLoss + noise).toFixed(4)));

          const valNoise = (Math.random() - 0.46) * noiseScale * 1.4;
          nextVal = Math.max(0.04, parseFloat((baseLoss * 1.15 + valNoise).toFixed(4)));
          
          setGradNorm(parseFloat((0.48 * Math.exp(-progress * 3.5) + Math.random() * 0.01).toFixed(4)));
        } else {
          const baseAcc = 0.965 - 0.84 * Math.exp(-progress * decayRate);
          const noise = (Math.random() - 0.5) * noiseScale;
          nextTrain = Math.min(0.99, parseFloat((baseAcc + noise).toFixed(4)));

          const valNoise = (Math.random() - 0.5) * noiseScale * 1.3;
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
    }, 70);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTraining, optimizer, metricMode]);

  const getCoordinates = (p: DataPoint) => {
    const x = 15 + ((p.epoch - 1) / (maxEpochs - 1)) * 250;
    const yTrain = 115 - p.train * 100;
    const yVal = 115 - p.val * 100;
    return { x, yTrain, yVal };
  };

  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

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
  const trainAreaSvgPath = trainSvgPath && lastCoords
    ? `${trainSvgPath} L ${lastCoords.x} 115 L 15 115 Z`
    : '';

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (dataPoints.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const svgX = 15 + relX * 250;
    const approxEpoch = Math.max(1, Math.min(maxEpochs, Math.round(1 + ((svgX - 15) / 250) * (maxEpochs - 1))));
    const match = dataPoints.find((d) => d.epoch === approxEpoch) || dataPoints[dataPoints.length - 1];
    setHoveredPoint(match);
  };

  const hoveredCoords = hoveredPoint ? getCoordinates(hoveredPoint) : null;

  return (
    <div className="flex flex-col justify-between p-6 sm:p-7 rounded-xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-xl relative overflow-hidden card-hover-lift h-full">
      
      {/* Header with Status & Controls */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]">
            <Activity className="w-3.5 h-3.5 text-[#6366F1]" />
            <span className="font-semibold text-white dark:text-white light:text-[#0F172A]">Training Convergence</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded border border-white/10 text-[#667085]">[simulation]</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px]">
            <span className="flex items-center gap-1.5 text-[#9AA4B2]">
              <span className={`w-1.5 h-1.5 rounded-full ${isTraining ? 'bg-[#34D399] animate-pulse' : 'bg-[#667085]'}`} />
              <span>{isTraining ? 'OPTIMIZING' : 'CONVERGED'}</span>
            </span>
          </div>
        </div>

        {/* Controls Strip */}
        <div className="flex items-center justify-between gap-2 py-1.5 px-2.5 rounded-lg bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] border border-white/[0.06] font-mono text-[11px] mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[#667085]">Optimizer:</span>
            <button
              onClick={() => setOptimizer('adam')}
              className={`px-2 py-0.5 rounded transition-colors ${
                optimizer === 'adam'
                  ? 'bg-[#6366F1] text-white font-medium shadow-sm'
                  : 'text-[#9AA4B2] hover:text-white'
              }`}
            >
              Adam
            </button>
            <button
              onClick={() => setOptimizer('sgd')}
              className={`px-2 py-0.5 rounded transition-colors ${
                optimizer === 'sgd'
                  ? 'bg-[#6366F1] text-white font-medium shadow-sm'
                  : 'text-[#9AA4B2] hover:text-white'
              }`}
            >
              SGD+M
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMetricMode(metricMode === 'loss' ? 'accuracy' : 'loss')}
              className="flex items-center gap-1 text-[#22D3EE] hover:underline"
            >
              {metricMode === 'loss' ? (
                <>
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>Loss (MSE)</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Accuracy (%)</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsTraining(!isTraining)}
              className="p-1 rounded text-[#9AA4B2] hover:text-white hover:bg-white/10"
              title={isTraining ? 'Pause' : 'Resume'}
            >
              {isTraining ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#34D399]" />}
            </button>

            <button
              onClick={() => startTraining()}
              className="p-1 rounded text-[#9AA4B2] hover:text-white hover:bg-white/10"
              title="Reset simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas with Streaming Curves */}
      <div className="relative w-full h-36 my-2 bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F7F8FA] rounded-lg border border-white/[0.06] overflow-hidden">
        <svg
          viewBox="0 0 280 130"
          className="w-full h-full overflow-visible cursor-crosshair"
          aria-label="Real-time Machine Learning Convergence Graph"
          onMouseMove={handleSvgMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id="trainLossGradIndigo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="15" y1="20" x2="265" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" strokeWidth="0.8" />
          <line x1="15" y1="65" x2="265" y2="65" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" strokeWidth="0.8" />
          <line x1="15" y1="110" x2="265" y2="110" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" strokeWidth="0.8" />

          {/* Area fill */}
          {trainAreaSvgPath && (
            <path d={trainAreaSvgPath} fill="url(#trainLossGradIndigo)" />
          )}

          {/* Validation curve */}
          {valSvgPath && (
            <path
              d={valSvgPath}
              fill="none"
              stroke="#9AA4B2"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          )}

          {/* Training curve */}
          {trainSvgPath && (
            <path
              d={trainSvgPath}
              fill="none"
              stroke="#6366F1"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Tracer dot */}
          {lastCoords && isTraining && !hoveredCoords && (
            <g>
              <circle
                cx={lastCoords.x}
                cy={lastCoords.yTrain}
                r="5"
                fill="#6366F1"
                opacity="0.3"
                className="animate-ping"
              />
              <circle
                cx={lastCoords.x}
                cy={lastCoords.yTrain}
                r="3"
                fill="#22D3EE"
                stroke="#08090B"
                strokeWidth="1"
              />
            </g>
          )}

          {/* Inspection crosshair */}
          {hoveredCoords && (
            <g>
              <line
                x1={hoveredCoords.x}
                y1="15"
                x2={hoveredCoords.x}
                y2="115"
                stroke="#6366F1"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <circle
                cx={hoveredCoords.x}
                cy={hoveredCoords.yTrain}
                r="4"
                fill="#6366F1"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <circle
                cx={hoveredCoords.x}
                cy={hoveredCoords.yVal}
                r="3"
                fill="#9AA4B2"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
            </g>
          )}
        </svg>

        {/* Legend */}
        <div className="absolute top-2 right-2 flex items-center gap-3 font-mono text-[9px] bg-[#0D1014]/80 px-2 py-0.5 rounded border border-white/[0.08]">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-[#6366F1] inline-block" />
            <span className="text-[#6366F1]">train</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-[#9AA4B2] inline-block" />
            <span className="text-[#9AA4B2]">val</span>
          </div>
        </div>

        {/* Hovered Epoch Telemetry Banner */}
        {hoveredPoint && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-[#0D1014]/95 border border-[#6366F1]/50 px-2.5 py-0.5 rounded text-[10px] font-mono text-white flex items-center gap-2 shadow-lg backdrop-blur-sm pointer-events-none">
            <span className="text-[#6366F1] font-bold">EPOCH {hoveredPoint.epoch}</span>
            <span>TRAIN: {hoveredPoint.train}</span>
            <span>VAL: {hoveredPoint.val}</span>
          </div>
        )}
      </div>

      {/* Metrics Readout */}
      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/[0.06] font-mono text-[11px]">
        <div>
          <div className="text-[10px] text-[#667085] uppercase">Epoch</div>
          <div className="font-semibold text-white dark:text-white light:text-[#0F172A]">
            {epoch} / {maxEpochs}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[#667085] uppercase">
            {metricMode === 'loss' ? 'Train Loss' : 'Train Acc'}
          </div>
          <div className="font-semibold text-[#6366F1]">
            {metricMode === 'loss' ? currentTrain.toFixed(3) : `${(currentTrain * 100).toFixed(1)}%`}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[#667085] uppercase">
            {metricMode === 'loss' ? 'Val Loss' : 'Val Acc'}
          </div>
          <div className="font-semibold text-[#9AA4B2]">
            {metricMode === 'loss' ? currentVal.toFixed(3) : `${(currentVal * 100).toFixed(1)}%`}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[#667085] uppercase">||∇L|| Grad</div>
          <div className="font-semibold text-[#34D399]">
            {gradNorm.toFixed(3)}
          </div>
        </div>
      </div>

    </div>
  );
};
