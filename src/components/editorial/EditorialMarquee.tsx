import React, { useState } from 'react';

export const EditorialMarquee: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const items = [
    'AI & ML ENGINEERING',
    'COMPUTER VISION & FORENSICS',
    'ERROR LEVEL ANALYSIS (ELA)',
    'DETERMINISTIC CHECKSUMS',
    'LATENCY BENCHMARKING (<50MS)',
    '0% DATA LEAKAGE',
    'HIGH-THROUGHPUT FASTAPI',
    'REPRODUCIBLE PYTORCH PIPELINES',
  ];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full border-y border-[#132532]/10 bg-[#FAF8F5] py-3.5 overflow-hidden select-none cursor-default group"
      title="Hover to pause stream"
    >
      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
          animationDuration: '28s',
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 mx-5 font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#132532] text-opacity-80 hover:text-[#315CFF] uppercase transition-colors"
          >
            <span>{item}</span>
            <span className="text-[#315CFF] font-bold">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};
