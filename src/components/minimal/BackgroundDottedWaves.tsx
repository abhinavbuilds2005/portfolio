import React from 'react';

export const BackgroundDottedWaves: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      <svg
        className="absolute top-0 right-0 w-full h-[850px] opacity-[0.35] text-[#6366F1]"
        viewBox="0 0 1440 850"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Contour lines with dashed dots */}
        <path
          d="M600,200 C800,100 1100,350 1440,250"
          stroke="url(#waveGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 6"
        />
        <path
          d="M650,240 C850,140 1150,380 1440,300"
          stroke="url(#waveGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 6"
        />
        <path
          d="M700,280 C900,190 1200,410 1440,350"
          stroke="url(#waveGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 6"
        />
        <path
          d="M750,320 C950,230 1250,440 1440,400"
          stroke="url(#waveGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 7"
        />
        <path
          d="M800,360 C1000,280 1300,470 1440,450"
          stroke="url(#waveGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 7"
        />
        <path
          d="M850,400 C1050,320 1350,500 1440,500"
          stroke="url(#waveGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 8"
        />
        <path
          d="M900,440 C1100,370 1380,530 1440,550"
          stroke="url(#waveGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 8"
        />
        <path
          d="M950,480 C1150,420 1400,560 1440,600"
          stroke="url(#waveGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 9"
        />
        <path
          d="M1000,520 C1200,470 1420,590 1440,650"
          stroke="url(#waveGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 9"
        />
      </svg>
    </div>
  );
};
