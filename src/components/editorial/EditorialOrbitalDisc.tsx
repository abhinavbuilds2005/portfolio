import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Activity, ShieldCheck, Cpu, Terminal, Compass, Zap } from 'lucide-react';

export const EditorialOrbitalDisc: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const [radarAngle, setRadarAngle] = useState(0);

  // Mouse parallax springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 25 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const tiltX = useTransform(smoothY, [-300, 300], [10, -10]);
  const tiltY = useTransform(smoothX, [-300, 300], [-10, 10]);
  const shiftX = useTransform(smoothX, [-300, 300], [-15, 15]);
  const shiftY = useTransform(smoothY, [-300, 300], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth * 0.75;
      const centerY = window.innerHeight * 0.35;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Subtle telemetry cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const telemetryData = [
    { label: 'FORENSIC ELA', value: '98.4%', sub: 'SIH 2026 QUALIFIED', accent: '#F0784B' },
    { label: 'INFERENCE', value: '<42ms', sub: 'PYTORCH + ONNX', accent: '#315CFF' },
    { label: 'ALGORITHMS', value: '100%', sub: 'ICAO & VERHOEFF D5', accent: '#132532' },
    { label: 'SYSTEMS LIVE', value: '05', sub: 'GITHUB VERIFIED', accent: '#10B981' },
  ];

  return (
    <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] lg:w-[440px] lg:h-[440px] xl:w-[480px] xl:h-[480px] flex items-center justify-center select-none pointer-events-auto">
      {/* 3D Tilt Wrapper */}
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          x: shiftX,
          y: shiftY,
          perspective: 1000,
        }}
        className="relative w-full h-full flex items-center justify-center transition-transform ease-out"
      >
        {/* Layer 1: Ambient Editorial Radial Background */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(235, 230, 218, 0.75) 0%, rgba(245, 242, 235, 0.45) 55%, rgba(245, 242, 235, 0) 72%)',
            border: '1px solid rgba(19, 37, 50, 0.12)',
            boxShadow: '0 20px 50px rgba(19, 37, 50, 0.05)',
          }}
        />

        {/* Layer 1B: Continuous Kinetic Radar Sweep Beam */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full pointer-events-none opacity-40"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(49, 92, 255, 0.3) 0deg, rgba(49, 92, 255, 0.05) 45deg, transparent 90deg)',
          }}
        />

        {/* Layer 2: Outermost Concentric Dashed Ring with slow 60s rotation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 sm:inset-4 rounded-full border border-dashed border-[#132532]/20"
        />

        {/* Layer 3: Cardinal Tick Marks (000°, 090°, 180°, 270°) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest text-[#132532]/50 font-bold">
            000° // NORTH
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest text-[#132532]/50 font-bold">
            180° // SOUTH
          </div>
          <div className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-widest text-[#132532]/50 font-bold">
            270°
          </div>
          <div className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-widest text-[#132532]/50 font-bold">
            090°
          </div>
        </div>

        {/* Layer 4: Rotating Typographic Circular Orbit SVG */}
        <div className="absolute inset-6 sm:inset-8 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full animate-[spin_45s_linear_infinite]">
            <defs>
              <path
                id="orbitalTextPath"
                d="M 200, 200 m -160, 0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
              />
            </defs>
            <text className="font-mono text-[10.5px] uppercase tracking-[0.26em] fill-[#132532]/70 font-bold">
              <textPath href="#orbitalTextPath">
                • MACHINE LEARNING • COMPUTER VISION • FORENSIC SCREENING • RESILIENT SYSTEMS
              </textPath>
            </text>
          </svg>
        </div>

        {/* Layer 5: Counter-rotating Secondary SVG Ring with Radar Sweeps */}
        <div className="absolute inset-16 sm:inset-20 pointer-events-none">
          <svg viewBox="0 0 300 300" className="w-full h-full animate-[spin_30s_linear_infinite_reverse]">
            <circle
              cx="150"
              cy="150"
              r="130"
              fill="none"
              stroke="#132532"
              strokeWidth="1"
              strokeOpacity="0.12"
              strokeDasharray="4 8"
            />
            {/* Coordinate Crosshairs */}
            <line x1="150" y1="10" x2="150" y2="290" stroke="#132532" strokeWidth="0.8" strokeOpacity="0.08" />
            <line x1="10" y1="150" x2="290" y2="150" stroke="#132532" strokeWidth="0.8" strokeOpacity="0.08" />
          </svg>
        </div>

        {/* Layer 6: Floating Satellite Badge 1 (Top-Right: DocuShield SIH'26) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute top-0 right-2 sm:top-4 sm:right-6 bg-white border border-[#132532]/15 px-3 py-1.5 shadow-[3px_3px_0px_#F0784B] font-mono text-[10px] text-[#132532] flex items-center gap-2 z-20 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#F0784B] animate-pulse" />
          <span className="font-bold tracking-wider">DOCUSHIELD · SIH'26</span>
        </motion.div>

        {/* Layer 7: Floating Satellite Badge 2 (Bottom-Right: Model Latency) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute bottom-2 right-4 sm:bottom-4 sm:right-10 bg-white border border-[#132532]/15 px-3 py-1.5 shadow-[3px_3px_0px_#315CFF] font-mono text-[10px] text-[#132532] flex items-center gap-2 z-20 backdrop-blur-sm"
        >
          <Zap className="w-3 h-3 text-[#315CFF]" />
          <span className="font-bold tracking-wider">FASTAPI · &lt;42MS LATENCY</span>
        </motion.div>

        {/* Layer 8: Floating Satellite Badge 3 (Top-Left: Verified Builds) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="hidden sm:flex absolute top-12 -left-4 bg-[#FAF8F5] border border-[#132532]/15 px-2.5 py-1 font-mono text-[9px] text-[#132532]/80 items-center gap-1.5 shadow-sm"
        >
          <span className="font-semibold tracking-wider">PUNJAB, IN · 31.25°N</span>
        </motion.div>

        {/* Layer 9: Central Interactive Telemetry Core HUD */}
        <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-white border-2 border-[#132532]/15 shadow-xl p-4 sm:p-5 flex flex-col justify-between items-center text-center overflow-hidden">
          {/* Subtle Radar Scan line */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 origin-center pointer-events-none opacity-20"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #315CFF 360deg)',
            }}
          />

          {/* Top Status Row */}
          <div className="w-full flex items-center justify-between border-b border-[#132532]/10 pb-1.5 font-mono text-[9px] tracking-wider text-[#132532]/70 uppercase">
            <span className="flex items-center gap-1 font-bold text-[#315CFF]">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>LIVE CORE</span>
            </span>
            <span className="text-[9px] text-[#132532]/60 font-semibold">2026 / SYS</span>
          </div>

          {/* Center Dynamic Stat */}
          <div className="my-auto py-1">
            <motion.div
              key={activeMetric}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-0.5"
            >
              <div
                className="font-mono text-[10px] tracking-widest uppercase font-bold"
                style={{ color: telemetryData[activeMetric].accent }}
              >
                {telemetryData[activeMetric].label}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#132532] font-sans">
                {telemetryData[activeMetric].value}
              </div>
              <div className="font-mono text-[9px] text-[#132532]/65 tracking-wider font-semibold">
                {telemetryData[activeMetric].sub}
              </div>
            </motion.div>
          </div>

          {/* Bottom Telemetry Selector Dots */}
          <div className="w-full pt-1.5 border-t border-[#132532]/10 flex items-center justify-center gap-1.5">
            {telemetryData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveMetric(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  activeMetric === i
                    ? 'bg-[#315CFF] w-4'
                    : 'bg-[#132532]/20 hover:bg-[#132532]/40'
                }`}
                aria-label={`Select Telemetry ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
