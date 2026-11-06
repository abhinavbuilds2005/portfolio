import React from 'react';

export const EditorialMarquee: React.FC = () => {
  const items = [
    'AI & ML ENGINEERING',
    'COMPUTER VISION',
    'FORENSIC DOCUMENT ANALYSIS',
    'DETERMINISTIC CHECKSUMS',
    'LATENCY BENCHMARKING',
    '0% DATA LEAKAGE',
    'HIGH-THROUGHPUT FASTAPI',
    'REPRODUCIBLE PIPELINES',
  ];

  return (
    <div className="w-full border-y border-[#132532]/10 bg-[#FAF8F5] py-3 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 mx-4 font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#132532]/75 uppercase"
          >
            <span>{item}</span>
            <span className="text-[#315CFF]">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};

