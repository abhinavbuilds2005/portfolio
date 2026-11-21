import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Play, Pause, SkipBack, SkipForward, Radio, CheckCircle2, ArrowRight } from 'lucide-react';
import { JOURNEY_WAYPOINTS } from '../editorial/EditorialJourneyMap';

export const MinimalJourneyMap: React.FC = () => {
  const [currentStation, setCurrentStation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoTimerProgress, setAutoTimerProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) {
      setAutoTimerProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setAutoTimerProgress((prev) => {
        if (prev >= 100) {
          setCurrentStation((curr) => (curr + 1) % JOURNEY_WAYPOINTS.length);
          return 0;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeWaypoint = JOURNEY_WAYPOINTS[currentStation];

  return (
    <section id="journey" className="py-20 px-6 sm:px-10 max-w-7xl mx-auto border-t border-black/[0.06]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#6366F1] block mb-2">
            — TRAJECTORY & MILESTONES
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight font-sans">
            The Traversal Map.
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl mt-2 leading-relaxed font-normal">
            Month-by-month engineering trajectory starting B.Tech CSE (AI/ML) at Lovely Professional University in 2025 to Smart India Hackathon '26.
          </p>
        </div>

        {/* Play / Pause Toggle */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-2 bg-[#111827] text-white hover:bg-[#1F2937] active:scale-95 px-5 py-2.5 rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause Autoplay</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Auto Traverse</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Traversal Progress & Timeline Steps */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E5E7EB] shadow-xs mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-0 scrollbar-none">
          {JOURNEY_WAYPOINTS.map((wp, idx) => {
            const isSelected = currentStation === idx;
            return (
              <button
                key={wp.id}
                onClick={() => {
                  setCurrentStation(idx);
                  setAutoTimerProgress(0);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#6366F1] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{wp.stationNum}</span>
                <span>{wp.monthLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-1 bg-slate-100 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-[#6366F1] transition-all duration-150"
            style={{
              width: `${((currentStation + autoTimerProgress / 100) / JOURNEY_WAYPOINTS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Active Waypoint Dossier Card */}
      <motion.div
        key={activeWaypoint.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        {/* Left Telemetry (Cols 1-7) */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono font-bold text-[#6366F1] bg-indigo-50 px-2.5 py-1 rounded-md">
              WAYPOINT {activeWaypoint.stationNum} // {activeWaypoint.timeframe}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Sector: {activeWaypoint.location}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] font-sans">
            {activeWaypoint.title}
          </h3>

          <p className="text-xs sm:text-sm font-semibold text-[#6366F1] mt-1 mb-3">
            {activeWaypoint.subtitle}
          </p>

          <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
            {activeWaypoint.narrative}
          </p>

          {/* Metrics & Highlights */}
          {activeWaypoint.metrics && activeWaypoint.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 mb-4">
              {activeWaypoint.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-[#111827]">{m.value}</span>{' '}
                    <span className="text-slate-500 font-mono text-[11px]">{m.label}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech tags */}
          {activeWaypoint.technologies && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {activeWaypoint.technologies.map((t, i) => (
                <span key={i} className="px-2.5 py-0.5 bg-indigo-50/70 text-[#6366F1] font-mono text-[10px] rounded-md font-semibold border border-indigo-100/60">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Radar Coordinate Graphic (Cols 8-12) */}
        <div className="lg:col-span-5 bg-[#0F1422] rounded-2xl p-6 text-white border border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[260px]">
          <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 border-b border-white/10 pb-3 mb-4">
            <span className="flex items-center gap-1.5 text-[#8B5CF6] font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#8B5CF6]" />
              <span>RADAR POSITION</span>
            </span>
            <span>{activeWaypoint.coordinates.lat}, {activeWaypoint.coordinates.lng}</span>
          </div>

          {/* Radar Circles Graphic */}
          <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-4">
            <div className="absolute inset-0 rounded-full border border-indigo-500/20" />
            <div className="absolute inset-4 rounded-full border border-indigo-500/30" />
            <div className="absolute inset-8 rounded-full border border-indigo-500/40" />
            {/* Blinking Radar Beacon */}
            <div className="w-3 h-3 rounded-full bg-[#8B5CF6] shadow-[0_0_15px_#8B5CF6] animate-ping" />
            <div className="w-3 h-3 rounded-full bg-[#8B5CF6] absolute" />
          </div>

          <div className="text-center font-mono text-[11px] text-slate-300">
            Phase: <span className="text-white font-bold">{activeWaypoint.phase}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
