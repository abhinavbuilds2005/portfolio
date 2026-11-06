import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Radio,
  Sparkles
} from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export interface JourneyWaypoint {
  id: string;
  stationNum: string;
  monthLabel: string;
  timeframe: string;
  phase: string;
  title: string;
  subtitle: string;
  location: string;
  coordinates: {
    lat: string;
    lng: string;
    mapX: number; // 0-100% SVG coordinates
    mapY: number; // 0-100% SVG coordinates
  };
  narrative: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  systemLink?: { label: string; href: string };
  status: 'COMPLETED' | 'ACTIVE PHASE' | 'PROJECTED';
}

export const JOURNEY_WAYPOINTS: JourneyWaypoint[] = [
  {
    id: 'genesis',
    stationNum: '01',
    monthLabel: "AUG '25",
    timeframe: 'MONTH 01 · AUGUST 2025',
    phase: 'FIRST PRINCIPLES & CORE PROGRAMMING',
    title: 'First Principles & Low-Level Thinking',
    subtitle: 'Commenced B.Tech CSE (AI/ML) at LPU · Computational Foundations in C++',
    location: 'LPU Campus / Origins · 25.59° N, 85.13° E',
    coordinates: {
      lat: '25.5941° N',
      lng: '85.1376° E',
      mapX: 74,
      mapY: 66,
    },
    narrative:
      'Commenced B.Tech in Computer Science & Engineering (specializing in AI/ML) at Lovely Professional University in 2025. Immediately immersed in first-principles engineering: implementing core data structures, algorithms, and computational complexity analysis in C++ and Python to build an intuitive feel for memory, cache locality, and asymptotic time complexity.',
    metrics: [
      { label: 'DSA PROBLEMS', value: '50+' },
      { label: 'COMPLEXITY DISCIPLINE', value: 'O(N)' },
      { label: 'CORE STACK', value: 'C++ · PYTHON' },
    ],
    technologies: ['C++', 'Python', 'Data Structures', 'Algorithms', 'Linux Shell', 'Git'],
    status: 'COMPLETED',
  },
  {
    id: 'predictive',
    stationNum: '02',
    monthLabel: "OCT '25",
    timeframe: 'MONTH 03 · OCTOBER 2025',
    phase: 'STATISTICAL MACHINE LEARNING & REPRODUCIBILITY',
    title: 'Statistical Rigor & Predictive Pipelines',
    subtitle: 'From Toy Notebooks to Production Predictors & Feature Engineering',
    location: 'Predictive Lab · 28.61° N, 77.20° E',
    coordinates: {
      lat: '28.6139° N',
      lng: '77.2090° E',
      mapX: 52,
      mapY: 50,
    },
    narrative:
      'Rapidly accelerated into applied machine learning with a relentless focus on statistical validation over hype. Engineered reproducible predictive pipelines—including customer churn classifiers and housing valuation regressors—implementing automated outlier treatment, stratified k-fold cross validation, and ROC-AUC benchmarking.',
    metrics: [
      { label: 'ROC-AUC BENCHMARK', value: '94.2%' },
      { label: 'EXPERIMENTS RUN', value: '15+' },
      { label: 'VALIDATION', value: 'K-FOLD' },
    ],
    technologies: ['Scikit-Learn', 'Pandas', 'NumPy', 'XGBoost', 'Matplotlib', 'Statistical Rigor'],
    status: 'COMPLETED',
  },
  {
    id: 'vision-lab',
    stationNum: '03',
    monthLabel: "DEC '25",
    timeframe: 'MONTH 05 · DECEMBER 2025',
    phase: 'COMPUTER VISION & FORENSIC SCREENING',
    title: 'The Forensic Computer Vision Laboratory',
    subtitle: 'Analyzing Compression Artifacts, Tamper Heatmaps & Deep Vision',
    location: 'Lovely Professional University (LPU), Punjab · 31.25° N, 75.70° E',
    coordinates: {
      lat: '31.2544° N',
      lng: '75.7028° E',
      mapX: 38,
      mapY: 34,
    },
    narrative:
      'Advanced into deep learning and computer vision architectures: analyzing JPEG compression degradation, building convolutional neural networks, and developing Error Level Analysis (ELA) algorithms to expose forged pixels and digital tampering in identity documents.',
    metrics: [
      { label: 'FORENSIC LATENCY', value: '<120ms' },
      { label: 'TAMPER DETECTION', value: '98.4%' },
      { label: 'OCR EXTRACTION', value: 'MULTI-MODAL' },
    ],
    technologies: ['OpenCV', 'EasyOCR', 'PyTorch', 'CNNs', 'ELA Forensic Heatmaps', 'NumPy'],
    status: 'COMPLETED',
  },
  {
    id: 'docushield-sih',
    stationNum: '04',
    monthLabel: "FEB '26",
    timeframe: 'MONTH 07 · FEBRUARY 2026',
    phase: 'FLAGSHIP SYSTEM & NATIONAL QUALIFICATION',
    title: 'DocuShield AI & Smart India Hackathon',
    subtitle: 'National-Scale Identity Forensic Screening with <42ms Latency',
    location: 'Punjab Production Cluster · 31.25° N, 75.70° E',
    coordinates: {
      lat: '31.2544° N',
      lng: '75.7028° E',
      mapX: 34,
      mapY: 26,
    },
    narrative:
      'Engineered DocuShield AI—a multimodal identity-document screening system combining OCR, cryptographic checksum algorithms (Verhoeff D5), and image forensics. Successfully qualified for Smart India Hackathon 2026. Built with a production FastAPI backend delivering sub-42ms inference on ONNX-accelerated pipelines.',
    metrics: [
      { label: 'SIH SELECTION', value: 'QUALIFIED' },
      { label: 'INFERENCE LATENCY', value: '<42ms' },
      { label: 'CHECKSUM CHECK', value: 'VERHOEFF D5' },
    ],
    technologies: ['FastAPI', 'PyTorch', 'ONNX', 'Docker', 'OpenCV', 'React', 'Verhoeff D5'],
    systemLink: { label: 'EXPLORE DOCUSHIELD AI SYSTEM', href: '#work' },
    status: 'ACTIVE PHASE',
  },
  {
    id: 'resilient-frontier',
    stationNum: '05',
    monthLabel: '2026+',
    timeframe: 'HORIZON · CLASS OF 2029',
    phase: 'THE FRONTIER: RESILIENT PRODUCTION ARCHITECTURES',
    title: 'Distributed Systems, Autonomous MLOps & Industry Impact',
    subtitle: 'Class of 2029 · Available for High-Impact AI/ML Internships',
    location: 'Global Telemetry // Industry Deployment',
    coordinates: {
      lat: 'GLOBAL',
      lng: 'EXPEDITION',
      mapX: 68,
      mapY: 16,
    },
    narrative:
      'Scaling machine learning beyond isolated scripts into dependable distributed systems. Sharpening competitive problem solving on LeetCode while engineering resilient MLOps pipelines and autonomous agent runtimes. Actively seeking AI/ML engineering internships to ship mission-critical software.',
    metrics: [
      { label: 'GRADUATION YEAR', value: '2029' },
      { label: 'SYSTEMS ONLINE', value: '05 LIVE' },
      { label: 'AVAILABILITY', value: 'OPEN' },
    ],
    technologies: ['MLOps Pipelines', 'Docker', 'Distributed Inference', 'Autonomous Agents', 'CI/CD'],
    systemLink: { label: 'TRANSMIT MESSAGE / HIRE ME', href: '#contact' },
    status: 'PROJECTED',
  },
];

export const EditorialJourneyMap: React.FC = () => {
  const [currentStation, setCurrentStation] = useState(3); // Start focused on Station 4 (DocuShield / SIH'26)
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2>(1);
  const [autoTimerProgress, setAutoTimerProgress] = useState(0);

  const activeWaypoint = JOURNEY_WAYPOINTS[currentStation];

  // Auto-traversal timer loop
  useEffect(() => {
    if (!isPlaying) {
      setAutoTimerProgress(0);
      return;
    }

    const intervalDuration = speed === 1 ? 40 : 20; // 40ms tick = ~4s per station
    const timer = setInterval(() => {
      setAutoTimerProgress((prev) => {
        if (prev >= 100) {
          // Advance to next station or loop back
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

  return (
    <section id="journey" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#132532]/10 select-none">
      {/* ========================================================================= */}
      {/* SECTION HEADER & TELEMETRY BADGE                                          */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#132532]/10 pb-6 mb-12 gap-6">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#F0784B] flex items-center gap-2 mb-2">
            <Compass className="w-3.5 h-3.5 text-[#F0784B] animate-[spin_20s_linear_infinite]" />
            <span>03 / GEOGRAPHIC & ENGINEERING TRAJECTORY</span>
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#132532] font-sans">
            The Traversal Map.
          </h2>
        </div>
        <p className="font-mono text-xs sm:text-sm text-[#132532]/80 max-w-md">
          Interactive telemetry expedition charting the rapid month-by-month engineering trajectory starting B.Tech CSE (AI/ML) at Lovely Professional University in 2025 — from first-principles coding to computer vision, Smart India Hackathon '26 qualification, and resilient production systems.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* TRAVERSAL CONTROL CONSOLE & TIMELINE BAR                                  */}
      {/* ========================================================================= */}
      <div className="bg-white border border-[#132532]/15 p-4 sm:p-6 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Play / Pause & Step Navigation Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`font-mono text-xs uppercase font-bold tracking-wider px-4 py-2.5 flex items-center gap-2 transition-all cursor-pointer shadow-[2px_2px_0px_#132532] active:translate-x-[1px] active:translate-y-[1px] ${
              isPlaying
                ? 'bg-[#F0784B] text-white hover:bg-[#D96338]'
                : 'bg-[#315CFF] text-white hover:bg-[#2047E5]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>PAUSE TRAVERSAL</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>AUTO TRAVERSE</span>
              </>
            )}
          </button>

          {/* Prev / Next Station Buttons */}
          <button
            onClick={handlePrevStation}
            className="p-2.5 bg-[#FAF8F5] border border-[#132532]/20 hover:border-[#132532] text-[#132532] transition-colors cursor-pointer"
            title="Previous Waypoint (←)"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNextStation}
            className="p-2.5 bg-[#FAF8F5] border border-[#132532]/20 hover:border-[#132532] text-[#132532] transition-colors cursor-pointer"
            title="Next Waypoint (→)"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Speed Toggle */}
          <button
            onClick={() => setSpeed(speed === 1 ? 2 : 1)}
            className="font-mono text-[11px] font-bold px-2.5 py-2 border border-[#132532]/15 hover:border-[#315CFF] text-[#132532]/80 cursor-pointer hidden sm:inline-block"
            title="Toggle Traversal Velocity"
          >
            VELOCITY: {speed}X
          </button>
        </div>

        {/* Station Navigation Quick Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {JOURNEY_WAYPOINTS.map((wp, idx) => (
            <button
              key={wp.id}
              onClick={() => handleSelectStation(idx)}
              className={`font-mono text-xs px-2.5 sm:px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 ${
                currentStation === idx
                  ? 'bg-[#132532] text-white border-[#132532] shadow-[2px_2px_0px_#315CFF] font-bold'
                  : 'bg-[#FAF8F5] text-[#132532]/75 border-[#132532]/15 hover:border-[#132532]/40'
              }`}
            >
              <span className={currentStation === idx ? 'text-[#F0784B]' : 'text-[#315CFF]'}>
                {wp.stationNum}
              </span>
              <span className="font-semibold">{wp.monthLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Traversal Progress Hairline */}
      <div className="w-full h-1 bg-[#132532]/10 mb-8 overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-[#315CFF] to-[#F0784B]"
          style={{
            width: isPlaying
              ? `${((currentStation + autoTimerProgress / 100) / JOURNEY_WAYPOINTS.length) * 100}%`
              : `${((currentStation + 1) / JOURNEY_WAYPOINTS.length) * 100}%`,
          }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2-COLUMN MAP & DOSSIER GRID                                               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* ======================================================================= */}
        {/* LEFT COLUMN: THE INTERACTIVE CARTOGRAPHIC VECTOR RADAR MAP (7 Cols)     */}
        {/* ======================================================================= */}
        <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#132532]/15 shadow-sm p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[460px] sm:min-h-[520px]">
          {/* Top Telemetry Overlay */}
          <div className="flex items-center justify-between font-mono text-[11px] text-[#132532]/70 uppercase tracking-widest border-b border-[#132532]/10 pb-3 mb-4 z-20">
            <span className="flex items-center gap-1.5 font-bold text-[#315CFF]">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#315CFF]" />
              <span>RADAR GRID // SUB-CONTINENT SECTOR</span>
            </span>
            <span className="font-semibold text-[#132532]">
              {activeWaypoint.coordinates.lat}, {activeWaypoint.coordinates.lng}
            </span>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[4/3] my-auto select-none">
            <svg
              viewBox="0 0 500 400"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(19, 37, 50, 0.03))' }}
            >
              <defs>
                {/* Background Grid Pattern */}
                <pattern id="radarGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#132532" strokeWidth="0.5" strokeOpacity="0.08" />
                </pattern>

                {/* Linear gradient for active path traversal */}
                <linearGradient id="pathGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#315CFF" />
                  <stop offset="60%" stopColor="#315CFF" />
                  <stop offset="100%" stopColor="#F0784B" />
                </linearGradient>

                {/* Radar glow filter */}
                <filter id="radarGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid Background */}
              <rect width="500" height="400" fill="url(#radarGrid)" />

              {/* Concentric Radar Rings Centered on Punjab (X: 170, Y: 120) */}
              <circle cx="170" cy="120" r="60" fill="none" stroke="#315CFF" strokeWidth="0.8" strokeDasharray="3 4" strokeOpacity="0.25" />
              <circle cx="170" cy="120" r="120" fill="none" stroke="#132532" strokeWidth="0.8" strokeDasharray="4 6" strokeOpacity="0.15" />
              <circle cx="170" cy="120" r="180" fill="none" stroke="#132532" strokeWidth="0.5" strokeOpacity="0.08" />

              {/* Geographic Abstract Territorial Outline (Stylized Northern/Central India Vector) */}
              <path
                d="M 120 40 L 190 40 L 220 80 L 240 120 L 320 140 L 380 180 L 410 240 L 380 290 L 320 320 L 250 370 L 210 330 L 170 280 L 130 220 L 100 160 L 110 90 Z"
                fill="none"
                stroke="#132532"
                strokeWidth="1.2"
                strokeOpacity="0.18"
                strokeDasharray="6 6"
              />

              {/* Latitude & Longitude Coordinate Guidelines */}
              <line x1="20" y1="120" x2="480" y2="120" stroke="#132532" strokeWidth="0.6" strokeOpacity="0.1" strokeDasharray="2 4" />
              <text x="25" y="115" className="font-mono text-[8px] fill-[#132532]/40 font-bold">31.25° NORTH LATITUDE</text>

              <line x1="20" y1="240" x2="480" y2="240" stroke="#132532" strokeWidth="0.6" strokeOpacity="0.1" strokeDasharray="2 4" />
              <text x="25" y="235" className="font-mono text-[8px] fill-[#132532]/40 font-bold">25.50° NORTH LATITUDE</text>

              <line x1="170" y1="20" x2="170" y2="380" stroke="#132532" strokeWidth="0.6" strokeOpacity="0.1" strokeDasharray="2 4" />
              <text x="175" y="375" className="font-mono text-[8px] fill-[#132532]/40 font-bold">75.70° E LONG</text>

              {/* Flight / Traversal Bézier Spline Route connecting the 5 Waypoints */}
              {/* Node 1: (370, 264) -> Node 2: (260, 200) -> Node 3: (190, 136) -> Node 4: (170, 104) -> Node 5: (340, 64) */}
              <path
                d="M 370 264 C 320 230, 290 220, 260 200 C 230 180, 205 155, 190 136 C 180 120, 175 110, 170 104 C 230 80, 280 70, 340 64"
                fill="none"
                stroke="#132532"
                strokeWidth="2"
                strokeOpacity="0.2"
                strokeDasharray="4 6"
              />

              {/* Illuminated Traversed Path (Drawn up to current station) */}
              <path
                d="M 370 264 C 320 230, 290 220, 260 200 C 230 180, 205 155, 190 136 C 180 120, 175 110, 170 104 C 230 80, 280 70, 340 64"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
                style={{
                  strokeDasharray: 600,
                  strokeDashoffset: 600 - (currentStation / (JOURNEY_WAYPOINTS.length - 1)) * 600,
                }}
              />

              {/* Waypoint Coordinate Nodes */}
              {JOURNEY_WAYPOINTS.map((wp, idx) => {
                // Scaled SVG Coordinates for the 5 points
                const coords = [
                  { cx: 370, cy: 264 },
                  { cx: 260, cy: 200 },
                  { cx: 190, cy: 136 },
                  { cx: 170, cy: 104 },
                  { cx: 340, cy: 64 },
                ][idx];

                const isCurrent = currentStation === idx;
                const isVisited = idx <= currentStation;

                return (
                  <g
                    key={wp.id}
                    onClick={() => handleSelectStation(idx)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing Radar Ring on Active Node */}
                    {isCurrent && (
                      <>
                        <circle
                          cx={coords.cx}
                          cy={coords.cy}
                          r="18"
                          fill="none"
                          stroke="#315CFF"
                          strokeWidth="1.5"
                          className="animate-ping opacity-60 origin-center"
                        />
                        <circle
                          cx={coords.cx}
                          cy={coords.cy}
                          r="28"
                          fill="#315CFF"
                          fillOpacity="0.08"
                        />
                      </>
                    )}

                    {/* Outer Target Ring */}
                    <circle
                      cx={coords.cx}
                      cy={coords.cy}
                      r={isCurrent ? 10 : 7}
                      fill={isCurrent ? '#315CFF' : isVisited ? '#132532' : '#FFFFFF'}
                      stroke={isCurrent ? '#F0784B' : '#132532'}
                      strokeWidth={isCurrent ? 2.5 : 1.5}
                      className="transition-all duration-300 group-hover:scale-125"
                    />

                    {/* Center Core Dot */}
                    <circle
                      cx={coords.cx}
                      cy={coords.cy}
                      r={isCurrent ? 3.5 : 2}
                      fill={isCurrent ? '#FFFFFF' : isVisited ? '#FFFFFF' : '#132532'}
                    />

                    {/* Station Tag & Month Label */}
                    <text
                      x={coords.cx + (idx === 4 ? -12 : 14)}
                      y={coords.cy + (idx === 3 ? -10 : idx === 4 ? 18 : 4)}
                      textAnchor={idx === 4 ? 'end' : 'start'}
                      className={`font-mono text-[9px] font-bold uppercase tracking-wider transition-colors select-none ${
                        isCurrent
                          ? 'fill-[#315CFF]'
                          : isVisited
                          ? 'fill-[#132532]'
                          : 'fill-[#132532]/50'
                      }`}
                    >
                      {wp.stationNum} · {wp.monthLabel}
                    </text>
                  </g>
                );
              })}

              {/* Animated Traveling Beacon (Moving Glider along path) */}
              <g
                className="transition-all duration-700 ease-out"
                style={{
                  transform: `translate(${
                    [
                      { x: 370, y: 264 },
                      { x: 260, y: 200 },
                      { x: 190, y: 136 },
                      { x: 170, y: 104 },
                      { x: 340, y: 64 },
                    ][currentStation].x
                  }px, ${
                    [
                      { x: 370, y: 264 },
                      { x: 260, y: 200 },
                      { x: 190, y: 136 },
                      { x: 170, y: 104 },
                      { x: 340, y: 64 },
                    ][currentStation].y
                  }px)`,
                }}
              >
                <circle r="6" fill="#F0784B" className="animate-pulse shadow-lg" />
                <line x1="-12" y1="0" x2="12" y2="0" stroke="#F0784B" strokeWidth="1" strokeOpacity="0.6" />
                <line x1="0" y1="-12" x2="0" y2="12" stroke="#F0784B" strokeWidth="1" strokeOpacity="0.6" />
              </g>

              {/* Compass Rose (Top-Right Corner) */}
              <g transform="translate(450, 45)" className="opacity-70 pointer-events-none">
                <circle cx="0" cy="0" r="20" fill="none" stroke="#132532" strokeWidth="0.8" strokeOpacity="0.2" />
                <path d="M 0 -18 L 4 0 L 0 18 L -4 0 Z" fill="#315CFF" fillOpacity="0.8" />
                <path d="M 0 0 L 4 0 L 0 18 L -4 0 Z" fill="#132532" fillOpacity="0.3" />
                <text x="0" y="-22" textAnchor="middle" className="font-mono text-[7px] font-bold fill-[#132532]">N</text>
              </g>
            </svg>
          </div>

          {/* Bottom Coordinates & Elevation Telemetry Bar */}
          <div className="pt-3 border-t border-[#132532]/10 flex flex-wrap items-center justify-between font-mono text-[10px] text-[#132532]/70 gap-2 z-20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-[#132532] uppercase">
                STATION {activeWaypoint.stationNum} ACTIVE
              </span>
              <span>— {activeWaypoint.location}</span>
            </div>
            <div className="text-[#315CFF] font-semibold">
              TRAVERSED: {Math.round(((currentStation + 1) / JOURNEY_WAYPOINTS.length) * 100)}%
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: WAYPOINT DOSSIER & SYSTEM METRICS (5 Cols)                */}
        {/* ======================================================================= */}
        <div className="lg:col-span-5 bg-white border border-[#132532]/15 shadow-sm p-6 sm:p-8 flex flex-col justify-between relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWaypoint.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Waypoint Phase Tag & Status */}
              <div className="flex items-center justify-between gap-2 border-b border-[#132532]/10 pb-3">
                <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#315CFF]">
                  PHASE {activeWaypoint.stationNum} // {activeWaypoint.timeframe}
                </span>
                <span
                  className={`font-mono text-[10px] font-bold px-2 py-0.5 border ${
                    activeWaypoint.status === 'ACTIVE PHASE'
                      ? 'bg-[#315CFF]/10 text-[#315CFF] border-[#315CFF]/30'
                      : activeWaypoint.status === 'COMPLETED'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-amber-50 text-amber-700 border-amber-300'
                  }`}
                >
                  {activeWaypoint.status}
                </span>
              </div>

              {/* Station Headline */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#132532] font-sans leading-tight mb-2">
                  {activeWaypoint.title}
                </h3>
                <p className="font-mono text-xs text-[#F0784B] font-semibold tracking-wide">
                  {activeWaypoint.subtitle}
                </p>
              </div>

              {/* Location Annotation */}
              <div className="flex items-center gap-1.5 font-mono text-xs text-[#132532]/70 bg-[#FAF8F5] p-2.5 border border-[#132532]/10">
                <MapPin className="w-3.5 h-3.5 text-[#315CFF] flex-shrink-0" />
                <span>{activeWaypoint.location}</span>
              </div>

              {/* Narrative Story */}
              <p className="text-sm sm:text-base text-[#132532]/90 leading-relaxed">
                {activeWaypoint.narrative}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#132532]/10">
                {activeWaypoint.metrics.map((m) => (
                  <div key={m.label} className="bg-[#FAF8F5] p-2.5 border border-[#132532]/10">
                    <div className="text-lg sm:text-xl font-extrabold text-[#315CFF] font-sans">
                      {m.value}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-[#132532]/65 font-bold mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="pt-2">
                <div className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#132532]/50 mb-2">
                  VERIFIED COMPETENCIES AT THIS STATION:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeWaypoint.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#FAF8F5] border border-[#132532]/12 text-[11px] font-mono text-[#132532] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Action Row */}
          <div className="pt-6 mt-6 border-t border-[#132532]/10 flex flex-wrap items-center justify-between gap-4">
            {activeWaypoint.systemLink ? (
              <MagneticButton strength={0.25}>
                <a
                  href={activeWaypoint.systemLink.href}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-wider bg-[#132532] text-white px-4 py-2.5 shadow-[3px_3px_0px_#F0784B] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
                >
                  <span>{activeWaypoint.systemLink.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </MagneticButton>
            ) : (
              <div className="font-mono text-xs text-[#132532]/50 italic flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Station milestones verified</span>
              </div>
            )}

            {/* Step Controls */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={handlePrevStation}
                className="hover:text-[#315CFF] underline underline-offset-4 cursor-pointer"
              >
                ← PREV
              </button>
              <span className="text-[#132532]/30">/</span>
              <button
                onClick={handleNextStation}
                className="hover:text-[#315CFF] underline underline-offset-4 cursor-pointer font-bold text-[#132532]"
              >
                NEXT →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

