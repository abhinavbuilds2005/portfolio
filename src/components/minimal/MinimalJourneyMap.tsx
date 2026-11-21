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
  Zap
} from 'lucide-react';
import { JOURNEY_WAYPOINTS, JourneyWaypoint } from '../editorial/EditorialJourneyMap';

export const MinimalJourneyMap: React.FC = () => {
  // Default to Station 04 (SIH 2026 Flagship / DocuShield) or Station 01
  const [currentStation, setCurrentStation] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2>(1);
  const [autoTimerProgress, setAutoTimerProgress] = useState(0);

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
    { x: 75, y: 250, label: "01 AUG '25" },
    { x: 165, y: 195, label: "02 OCT '25" },
    { x: 260, y: 145, label: "03 DEC '25" },
    { x: 355, y: 105, label: "04 FEB '26" },
    { x: 440, y: 55, label: '05 2026+' },
  ];

  return (
    <section id="journey" className="py-20 px-6 sm:px-10 max-w-7xl mx-auto border-t border-black/[0.06]">
      {/* ======================================================================= */}
      {/* 1. SECTION HEADER                                                       */}
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
      {/* 2. MASTER UNIFIED ROADMAP & TELEMETRY MODULE                            */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
        
        {/* ===================================================================== */}
        {/* 2A. INTERACTIVE HORIZONTAL MILESTONE TRACK                            */}
        {/* ===================================================================== */}
        <div className="bg-[#FAF9F5] border-b border-[#E5E7EB] p-4 sm:p-6">
          {/* Milestone Tabs Row */}
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
                  {/* Top indicator dot & status */}
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

                  {/* Waypoint Title preview */}
                  <div className="font-sans font-bold text-xs text-[#111827] truncate">
                    {wp.title}
                  </div>

                  {/* Status label */}
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
        {/* 2B. SPLIT SCREEN: CARTOGRAPHIC RADAR MAP (LEFT) & DOSSIER (RIGHT)      */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          
          {/* =================================================================== */}
          {/* LEFT: THE INTERACTIVE CARTOGRAPHIC VECTOR RADAR MAP (5 Cols)        */}
          {/* =================================================================== */}
          <div className="lg:col-span-5 bg-[#0B0F19] text-white p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Subtle Neon Glow Accents */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#6366F1]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Telemetry Overlay */}
            <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 border-b border-white/10 pb-3 mb-3 z-10">
              <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#6366F1]" />
                <span>RADAR VECTOR // SECTOR TELEMETRY</span>
              </span>
              <span className="text-slate-300 font-mono text-[10px]">
                {activeWaypoint.coordinates.lat}, {activeWaypoint.coordinates.lng}
              </span>
            </div>

            {/* Interactive Vector SVG Canvas */}
            <div className="relative w-full aspect-[5/3.4] my-auto select-none z-10 flex items-center justify-center">
              <svg viewBox="0 0 500 320" className="w-full h-full">
                <defs>
                  {/* Subtle Radar Background Grid */}
                  <pattern id="radarGridMinimal" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
                  </pattern>

                  {/* Flight Route Gradient */}
                  <linearGradient id="flightPathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>

                  {/* Pulsing Beacon Glow Filter */}
                  <filter id="beaconGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Grid Background */}
                <rect width="500" height="320" fill="url(#radarGridMinimal)" />

                {/* Concentric Radar Rings Centered on Punjab (X: 355, Y: 105) */}
                <circle cx="355" cy="105" r="45" fill="none" stroke="#6366F1" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.4" />
                <circle cx="355" cy="105" r="95" fill="none" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="4 4" strokeOpacity="0.25" />
                <circle cx="355" cy="105" r="150" fill="none" stroke="#A855F7" strokeWidth="0.6" strokeDasharray="5 5" strokeOpacity="0.15" />
                <circle cx="355" cy="105" r="210" fill="none" stroke="white" strokeWidth="0.4" strokeDasharray="6 6" strokeOpacity="0.08" />

                {/* Range Ring Labels */}
                <text x="360" y="55" className="font-mono text-[7px] fill-indigo-300/40">50 KM VECTOR</text>
                <text x="360" y="5" className="font-mono text-[7px] fill-indigo-300/40">100 KM RANGE</text>

                {/* Coordinate Crosshairs */}
                <line x1="20" y1="105" x2="480" y2="105" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" strokeDasharray="2 4" />
                <line x1="355" y1="10" x2="355" y2="310" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" strokeDasharray="2 4" />

                {/* Base Trajectory Route (Curved Bézier Spline) */}
                <path
                  d="M 75 250 C 120 220, 140 210, 165 195 C 210 170, 230 155, 260 145 C 300 130, 330 115, 355 105 C 390 90, 415 70, 440 55"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Active Illuminated Traversed Spline (Reveals progressively) */}
                <path
                  d="M 75 250 C 120 220, 140 210, 165 195 C 210 170, 230 155, 260 145 C 300 130, 330 115, 355 105 C 390 90, 415 70, 440 55"
                  fill="none"
                  stroke="url(#flightPathGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 500,
                    strokeDashoffset: 500 - (currentStation / (JOURNEY_WAYPOINTS.length - 1)) * 500,
                    transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Radar Rotating Scan Sweep Line */}
                <g transform="translate(355, 105)">
                  <motion.line
                    x1="0"
                    y1="0"
                    x2="150"
                    y2="0"
                    stroke="#6366F1"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    style={{ originX: 0, originY: 0 }}
                  />
                </g>

                {/* Waypoint Coordinate Nodes */}
                {mapNodes.map((node, idx) => {
                  const isCurrent = currentStation === idx;
                  const isVisited = idx <= currentStation;

                  return (
                    <g
                      key={idx}
                      onClick={() => handleSelectStation(idx)}
                      className="cursor-pointer group"
                    >
                      {/* Pulsing Beacon Ring on Active Node */}
                      {isCurrent && (
                        <>
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="14"
                            fill="none"
                            stroke="#6366F1"
                            strokeWidth="1.5"
                            className="animate-ping origin-center"
                            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                          />
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="10"
                            fill="none"
                            stroke="#8B5CF6"
                            strokeWidth="1.2"
                            strokeOpacity="0.6"
                          />
                        </>
                      )}

                      {/* Main Node Circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isCurrent ? '6.5' : '4.5'}
                        fill={isCurrent ? '#6366F1' : isVisited ? '#10B981' : '#334155'}
                        stroke="#0B0F19"
                        strokeWidth="2"
                        className="transition-all duration-300 group-hover:scale-125"
                      />

                      {/* Station Badge Label */}
                      <text
                        x={node.x}
                        y={node.y + (idx % 2 === 0 ? 18 : -12)}
                        textAnchor="middle"
                        className={`font-mono text-[8.5px] font-bold transition-colors ${
                          isCurrent
                            ? 'fill-white font-extrabold'
                            : isVisited
                            ? 'fill-slate-300'
                            : 'fill-slate-500'
                        }`}
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Telemetry HUD Bar */}
            <div className="bg-[#121826] border border-white/10 rounded-xl p-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] font-mono z-10 mt-3">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Telemetry Phase</span>
                <span className="text-indigo-300 font-bold truncate block">
                  {activeWaypoint.phase}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Sector / Node</span>
                <span className="text-white font-bold truncate block">
                  Station {activeWaypoint.stationNum} // {activeWaypoint.monthLabel}
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-slate-400 block text-[9px] uppercase">Status</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {activeWaypoint.status}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* RIGHT: WAYPOINT INTELLIGENCE DOSSIER (7 Cols)                       */}
          {/* =================================================================== */}
          <div className="lg:col-span-7 p-6 sm:p-9 flex flex-col justify-between">
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
