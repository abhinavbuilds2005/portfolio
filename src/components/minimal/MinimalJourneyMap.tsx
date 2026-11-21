import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Radio, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  MapPin,
  Sparkles,
  Zap,
  Activity,
  Scan,
  Cpu,
  Eye,
  Layers
} from 'lucide-react';
import { JOURNEY_WAYPOINTS, JourneyWaypoint } from '../editorial/EditorialJourneyMap';

export const MinimalJourneyMap: React.FC = () => {
  // Default focused on Station 04 (SIH 2026 Flagship / DocuShield)
  const [currentStation, setCurrentStation] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2>(1);
  const [autoTimerProgress, setAutoTimerProgress] = useState(0);

  // Mode switcher for AI/ML Engineering Telemetry Visualizer
  const [visualizerMode, setVisualizerMode] = useState<'radar' | 'vision' | 'tensor'>('radar');

  // Auto-traversal timer loop
  useEffect(() => {
    if (!isPlaying) {
      setAutoTimerProgress(0);
      return;
    }

    const intervalDuration = speed === 1 ? 40 : 20; // 40ms * 100 = 4000ms (~4s per station)
    const timer = setInterval(() => {
      setAutoTimerProgress((prev) => {
        if (prev >= 100) {
          setCurrentStation((curr) => (curr + 1) % JOURNEY_WAYPOINTS.length);
          return 0;
        }
        return prev + 1;
      });
    }, intervalDuration);

    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  const handleNextStation = () => {
    setCurrentStation((prev) => (prev + 1) % JOURNEY_WAYPOINTS.length);
    setAutoTimerProgress(0);
  };

  const handlePrevStation = () => {
    setCurrentStation((prev) => (prev - 1 + JOURNEY_WAYPOINTS.length) % JOURNEY_WAYPOINTS.length);
    setAutoTimerProgress(0);
  };

  const handleSelectStation = (index: number) => {
    setCurrentStation(index);
    setAutoTimerProgress(0);
  };

  const activeWaypoint: JourneyWaypoint = JOURNEY_WAYPOINTS[currentStation];

  // SVG Scaled coordinates for the 5 Waypoints on the 500x320 cartographic grid
  const mapNodes = [
    { x: 80, y: 245, label: "01 AUG '25", code: 'LPU-01' },
    { x: 170, y: 190, label: "02 OCT '25", code: 'STAT-02' },
    { x: 260, y: 140, label: "03 DEC '25", code: 'CV-03' },
    { x: 355, y: 100, label: "04 FEB '26", code: 'SIH-04' },
    { x: 440, y: 55, label: '05 2026+', code: 'MLOPS-05' },
  ];

  return (
    <section id="journey" className="py-20 px-6 sm:px-10 max-w-7xl mx-auto border-t border-black/[0.06]">
      {/* ======================================================================= */}
      {/* 1. SECTION HEADER & TRAVERSAL CONTROLS                                  */}
      {/* ======================================================================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#6366F1] flex items-center gap-1.5 mb-2">
            <Compass className="w-4 h-4 text-[#6366F1] animate-[spin_16s_linear_infinite]" />
            <span>— ENGINEERING TRAJECTORY & ROADMAP</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight font-sans">
            The Traversal Map.
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl mt-2 leading-relaxed font-normal">
            Month-by-month engineering telemetry starting B.Tech CSE (AI/ML) at Lovely Professional University in 2025 to Smart India Hackathon '26 and production systems.
          </p>
        </div>

        {/* Motion & Traversal Controls */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-2 bg-[#111827] text-white hover:bg-[#1F2937] active:scale-95 px-4 py-2 rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause Traversal</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Auto Traverse</span>
              </>
            )}
          </button>

          {/* Velocity Speed Toggle */}
          <button
            onClick={() => setSpeed(speed === 1 ? 2 : 1)}
            className="hidden sm:inline-flex items-center px-3 py-2 rounded-full text-xs font-mono font-bold bg-white text-[#111827] border border-[#E5E7EB] hover:bg-slate-50 transition-colors cursor-pointer"
            title="Toggle Traversal Velocity"
          >
            {speed}X VELOCITY
          </button>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevStation}
              className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#111827] hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
              aria-label="Previous Waypoint"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextStation}
              className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#111827] hover:bg-slate-50 transition-all cursor-pointer active:scale-95"
              aria-label="Next Waypoint"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 2. MASTER UNIFIED ROADMAP MODULE                                        */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
        
        {/* ===================================================================== */}
        {/* 2A. INTERACTIVE HORIZONTAL MILESTONE TRACK                            */}
        {/* ===================================================================== */}
        <div className="bg-[#FAF9F5] border-b border-[#E5E7EB] p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {JOURNEY_WAYPOINTS.map((wp, idx) => {
              const isCurrent = currentStation === idx;
              const isPast = idx < currentStation;

              return (
                <button
                  key={wp.id}
                  onClick={() => handleSelectStation(idx)}
                  className={`p-3 rounded-2xl text-left transition-all cursor-pointer relative overflow-hidden border ${
                    isCurrent
                      ? 'bg-white border-[#6366F1] shadow-md ring-2 ring-[#6366F1]/10'
                      : isPast
                      ? 'bg-white/80 border-slate-200 hover:border-indigo-200 hover:bg-white'
                      : 'bg-white/40 border-slate-200/70 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isCurrent
                          ? 'bg-[#6366F1] text-white'
                          : isPast
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {wp.stationNum}
                    </span>

                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {wp.monthLabel}
                    </span>
                  </div>

                  <div className="font-sans font-bold text-xs text-[#111827] truncate">
                    {wp.title}
                  </div>

                  <div className="text-[10px] text-[#6366F1] font-mono mt-0.5 truncate">
                    {wp.status}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Animated Connecting Timeline Hairline */}
          <div className="w-full h-1 bg-slate-200 rounded-full mt-4 overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7]"
              style={{
                width: isPlaying
                  ? `${((currentStation + autoTimerProgress / 100) / JOURNEY_WAYPOINTS.length) * 100}%`
                  : `${((currentStation + 1) / JOURNEY_WAYPOINTS.length) * 100}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 2B. SPLIT SCREEN: ADVANCED AI/ML TELEMETRY RADAR & DOSSIER            */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          
          {/* =================================================================== */}
          {/* LEFT: ADVANCED AI/ML & COMPUTER VISION RADAR COCKPIT (5.5 Cols)     */}
          {/* =================================================================== */}
          <div className="lg:col-span-6 bg-[#0B0F19] text-white p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 select-none min-h-[460px]">
            {/* Ambient Violet/Electric Glow Backdrop */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#6366F1]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar: Mode Switcher & Real-Time Coordinates */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 z-10">
              {/* Telemetry Mode Toggle */}
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-0.5 text-[10px] font-mono">
                <button
                  onClick={() => setVisualizerMode('radar')}
                  className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    visualizerMode === 'radar'
                      ? 'bg-[#6366F1] text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Radio className="w-3 h-3" />
                  <span>RADAR</span>
                </button>
                <button
                  onClick={() => setVisualizerMode('vision')}
                  className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    visualizerMode === 'vision'
                      ? 'bg-[#6366F1] text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>VISION HUD</span>
                </button>
                <button
                  onClick={() => setVisualizerMode('tensor')}
                  className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    visualizerMode === 'tensor'
                      ? 'bg-[#6366F1] text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-3 h-3" />
                  <span>TENSORS</span>
                </button>
              </div>

              {/* Coordinates Pill */}
              <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{activeWaypoint.coordinates.lat}</span>
              </div>
            </div>

            {/* Main Interactive AI/ML Viewport */}
            <div className="relative w-full aspect-[5/3.4] my-auto select-none z-10 flex items-center justify-center overflow-hidden rounded-2xl bg-[#080B13] border border-white/10 shadow-inner">
              
              {/* =============================================================== */}
              {/* MODE 1: ACTIVE 360° RADAR FLIGHT SWEEP & TRAJECTORY             */}
              {/* =============================================================== */}
              {visualizerMode === 'radar' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg viewBox="0 0 500 320" className="w-full h-full absolute inset-0">
                    <defs>
                      <pattern id="radarGridAnim" width="25" height="25" patternUnits="userSpaceOnUse">
                        <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                      </pattern>

                      <linearGradient id="splineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>

                    {/* Background Grid */}
                    <rect width="500" height="320" fill="url(#radarGridAnim)" />

                    {/* Concentric Radar Rings Centered on Active Node */}
                    {(() => {
                      const center = mapNodes[currentStation];
                      return (
                        <g>
                          <circle cx={center.x} cy={center.y} r="35" fill="none" stroke="#6366F1" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.5" />
                          <circle cx={center.x} cy={center.y} r="75" fill="none" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="4 4" strokeOpacity="0.3" />
                          <circle cx={center.x} cy={center.y} r="120" fill="none" stroke="#A855F7" strokeWidth="0.6" strokeDasharray="5 5" strokeOpacity="0.2" />
                          <circle cx={center.x} cy={center.y} r="170" fill="none" stroke="white" strokeWidth="0.4" strokeDasharray="6 6" strokeOpacity="0.08" />

                          {/* Degree Crosshairs */}
                          <line x1={center.x - 170} y1={center.y} x2={center.x + 170} y2={center.y} stroke="rgba(99,102,241,0.25)" strokeWidth="0.6" strokeDasharray="2 4" />
                          <line x1={center.x} y1={center.y - 170} x2={center.x} y2={center.y + 170} stroke="rgba(99,102,241,0.25)" strokeWidth="0.6" strokeDasharray="2 4" />

                          {/* Range Tick Labels */}
                          <text x={center.x + 80} y={center.y - 4} className="font-mono text-[7px] fill-indigo-300/60">50 KM VECTOR</text>
                          <text x={center.x + 125} y={center.y - 4} className="font-mono text-[7px] fill-indigo-300/40">100 KM RANGE</text>
                        </g>
                      );
                    })()}

                    {/* Base Inactive Path */}
                    <path
                      d="M 80 245 C 120 220, 145 205, 170 190 C 215 165, 235 150, 260 140 C 305 120, 330 110, 355 100 C 395 85, 415 70, 440 55"
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />

                    {/* Traversed Spline with Animated Glow */}
                    <path
                      d="M 80 245 C 120 220, 145 205, 170 190 C 215 165, 235 150, 260 140 C 305 120, 330 110, 355 100 C 395 85, 415 70, 440 55"
                      fill="none"
                      stroke="url(#splineGradient)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: 500,
                        strokeDashoffset: 500 - (currentStation / (JOURNEY_WAYPOINTS.length - 1)) * 500,
                        transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />

                    {/* 5 Interactive Coordinate Nodes */}
                    {mapNodes.map((node, idx) => {
                      const isCurrent = currentStation === idx;
                      const isVisited = idx <= currentStation;

                      return (
                        <g
                          key={idx}
                          onClick={() => handleSelectStation(idx)}
                          className="cursor-pointer group"
                        >
                          {/* Pulsing Target Ring */}
                          {isCurrent && (
                            <>
                              <circle
                                cx={node.x}
                                cy={node.y}
                                r="16"
                                fill="none"
                                stroke="#6366F1"
                                strokeWidth="1.5"
                                className="animate-ping origin-center"
                                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                              />
                              <circle
                                cx={node.x}
                                cy={node.y}
                                r="11"
                                fill="none"
                                stroke="#8B5CF6"
                                strokeWidth="1.2"
                                strokeOpacity="0.7"
                              />
                            </>
                          )}

                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={isCurrent ? '7' : '4.5'}
                            fill={isCurrent ? '#6366F1' : isVisited ? '#10B981' : '#334155'}
                            stroke="#0B0F19"
                            strokeWidth="2"
                            className="transition-all duration-300 group-hover:scale-125"
                          />

                          <text
                            x={node.x}
                            y={node.y + (idx % 2 === 0 ? 18 : -12)}
                            textAnchor="middle"
                            className={`font-mono text-[8.5px] font-bold ${
                              isCurrent ? 'fill-white font-extrabold' : 'fill-slate-400'
                            }`}
                          >
                            {node.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Real 360° Rotating Radar Sweep Wedge centered on Active Waypoint */}
                  {(() => {
                    const center = mapNodes[currentStation];
                    return (
                      <motion.div
                        className="absolute pointer-events-none rounded-full"
                        style={{
                          left: `${(center.x / 500) * 100}%`,
                          top: `${(center.y / 320) * 100}%`,
                          width: '240px',
                          height: '240px',
                          marginLeft: '-120px',
                          marginTop: '-120px',
                          background: 'conic-gradient(from 0deg, rgba(99, 102, 241, 0.4) 0deg, rgba(99, 102, 241, 0.05) 50deg, transparent 50deg)',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
                      />
                    );
                  })()}

                  {/* Target Lock Reticle HUD Overlay */}
                  <div className="absolute top-3 left-3 bg-[#0B0F19]/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[9px] font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-300">TARGET:</span>
                    <span className="text-emerald-400 font-bold">{mapNodes[currentStation].code}</span>
                  </div>
                </div>
              )}

              {/* =============================================================== */}
              {/* MODE 2: COMPUTER VISION & FORENSIC SCANLINE HUD                  */}
              {/* =============================================================== */}
              {visualizerMode === 'vision' && (
                <div className="relative w-full h-full p-4 flex flex-col justify-between overflow-hidden">
                  {/* Moving Laser Scanline */}
                  <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent shadow-[0_0_12px_#06B6D4] z-20 pointer-events-none"
                    animate={{ top: ['8%', '92%', '8%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Corner Bounding Reticles */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                  {/* Biometric Face Landmark / Document Grid Mesh */}
                  <div className="relative w-48 h-36 mx-auto my-auto border border-cyan-500/30 rounded-xl bg-cyan-950/10 flex items-center justify-center p-3">
                    <div className="w-full h-full border border-dashed border-indigo-400/40 rounded-lg flex flex-col justify-around p-2">
                      <div className="flex justify-between items-center text-[8px] font-mono text-cyan-300">
                        <span>OCR: EASYOCR</span>
                        <span className="text-emerald-400">98.4% CONF</span>
                      </div>
                      <div className="flex justify-center items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-cyan-400/80 flex items-center justify-center">
                          <Eye className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="text-[9px] font-mono text-slate-300 space-y-0.5">
                          <div>ICAO 9303: PASS</div>
                          <div className="text-emerald-400 font-bold">VERHOEFF D5: VALID</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[8px] font-mono text-slate-400">
                        <span>ELA RESAVE: 95%</span>
                        <span className="text-indigo-400">LATENCY: &lt;42ms</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 z-10">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Scan className="w-3 h-3" />
                      <span>CV FORENSIC PIPELINE ACTIVE</span>
                    </span>
                    <span>128D VECTOR SPACE</span>
                  </div>
                </div>
              )}

              {/* =============================================================== */}
              {/* MODE 3: TENSOR LOSS & INFERENCE EQUALIZER                        */}
              {/* =============================================================== */}
              {visualizerMode === 'tensor' && (
                <div className="relative w-full h-full p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-indigo-400 font-bold">LOSS GRADIENT OPTIMIZATION</span>
                    <span className="text-emerald-400">CONVERGED (η = 0.001)</span>
                  </div>

                  {/* Animated Loss Curve Line Graph */}
                  <div className="relative w-full h-24 my-auto">
                    <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                      <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                      <line x1="0" y1="10" x2="400" y2="10" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                      <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

                      <motion.path
                        d="M 10 15 C 60 20, 100 65, 160 75 C 220 85, 280 82, 390 85"
                        fill="none"
                        stroke="#8B5CF6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                      />
                      <circle cx="390" cy="85" r="4" fill="#10B981" />
                    </svg>
                  </div>

                  {/* Live Tensor Batch Parameters */}
                  <div className="grid grid-cols-3 gap-2 text-[9px] font-mono bg-white/5 border border-white/10 rounded-lg p-2">
                    <div>
                      <span className="text-slate-400 block">BATCH LOSS</span>
                      <span className="text-indigo-300 font-bold">0.0382</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">THROUGHPUT</span>
                      <span className="text-white font-bold">142 req/sec</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">ACCELERATION</span>
                      <span className="text-emerald-400 font-bold">CUDA ONNX</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Real-Time Neural Signal Waveform Equalizer */}
            <div className="bg-[#121826] border border-white/10 rounded-xl p-3 z-10 mt-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-ping" />
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">Active Neural Telemetry</span>
                  <span className="text-[11px] font-mono font-bold text-white block">
                    {activeWaypoint.phase}
                  </span>
                </div>
              </div>

              {/* 16 Animated Frequency Equalizer Bars */}
              <div className="flex items-end gap-1 h-6 shrink-0">
                {[14, 22, 10, 18, 24, 12, 20, 8, 16, 22, 12, 19, 10, 24, 15, 20].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-[#6366F1] via-[#8B5CF6] to-[#A855F7] rounded-full"
                    animate={{
                      height: isPlaying ? [4, h, 6, Math.max(8, h * 0.9), 4] : [h * 0.5, h, h * 0.6],
                    }}
                    transition={{
                      duration: 0.8 + (i % 5) * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* RIGHT: WAYPOINT INTELLIGENCE DOSSIER (6.5 Cols)                     */}
          {/* =================================================================== */}
          <div className="lg:col-span-6 p-6 sm:p-9 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWaypoint.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Waypoint Meta Header */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-[#6366F1] bg-indigo-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      WAYPOINT {activeWaypoint.stationNum} // {activeWaypoint.timeframe}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
                      <MapPin className="w-3 h-3 text-[#6366F1]" />
                      <span>{activeWaypoint.location}</span>
                    </span>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        activeWaypoint.status === 'COMPLETED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : activeWaypoint.status === 'ACTIVE PHASE'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      {activeWaypoint.status}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-sans">
                    {activeWaypoint.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#6366F1] mt-1.5">
                    {activeWaypoint.subtitle}
                  </p>
                </div>

                {/* Narrative Paragraph */}
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal">
                  {activeWaypoint.narrative}
                </p>

                {/* Key Architectural Deliverables Metrics */}
                {activeWaypoint.metrics && activeWaypoint.metrics.length > 0 && (
                  <div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Key Deliverables & Verifiable Benchmarks
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {activeWaypoint.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="bg-[#FAF9F5] border border-slate-200/90 rounded-xl p-3 flex items-center gap-2.5"
                        >
                          <div className="w-6 h-6 rounded-lg bg-emerald-100/60 border border-emerald-200 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#111827] truncate">
                              {m.value}
                            </div>
                            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-tight truncate">
                              {m.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technology & Tool Stack */}
                {activeWaypoint.technologies && activeWaypoint.technologies.length > 0 && (
                  <div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Ecosystem & Applied Technologies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeWaypoint.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-white border border-slate-200 text-slate-800 font-mono text-[11px] rounded-lg font-medium shadow-2xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Cross-Link / Action Link */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
                    <span>Station {activeWaypoint.stationNum} of {JOURNEY_WAYPOINTS.length}</span>
                  </div>

                  {activeWaypoint.systemLink ? (
                    <a
                      href={activeWaypoint.systemLink.href}
                      className="inline-flex items-center gap-1.5 bg-[#111827] text-white hover:bg-[#1F2937] active:scale-95 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-xs"
                    >
                      <span>{activeWaypoint.systemLink.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-1.5 bg-[#FAF9F5] hover:bg-slate-100 text-[#111827] border border-slate-200 active:scale-95 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer"
                    >
                      <span>Explore Engineered Systems</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
