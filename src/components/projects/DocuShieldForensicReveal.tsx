import React, { useState, useRef } from 'react';
import { Sliders, AlertTriangle } from 'lucide-react';

interface DocuShieldForensicRevealProps {
  originalImage: string;
  heatmapImage: string;
}

export const DocuShieldForensicReveal: React.FC<DocuShieldForensicRevealProps> = ({
  originalImage,
  heatmapImage
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="rounded-xl border border-white/[0.08] dark:border-white/[0.08] border-black/[0.08] bg-[#0D1014] dark:bg-[#0D1014] bg-white p-4 sm:p-5 my-4 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 font-semibold tracking-wide">
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          <span>FORENSIC REVEAL · ERROR LEVEL ANALYSIS (ELA)</span>
        </div>
        <span className="font-mono text-[10px] text-muted-text">
          [Drag slider to inspect]
        </span>
      </div>

      <p className="text-xs text-secondary-text mb-3 leading-relaxed">
        Drag the vertical dividing line to compare the clean document scan against the forensic compression-disparity heatmap revealing digitally spliced regions.
      </p>

      {/* Before / After Draggable Container */}
      <div
        ref={containerRef}
        className="relative w-full h-56 sm:h-72 rounded-lg border border-white/[0.08] dark:border-white/[0.08] border-black/[0.08] overflow-hidden select-none cursor-ew-resize bg-[#08090B]"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Heatmap Image (Base Layer - Right Side) */}
        <img
          src={heatmapImage}
          alt="ELA Tamper Heatmap Overlay"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Original Clean Scan (Clipped Top Layer - Left Side) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={originalImage}
            alt="Original Input Document"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute inset-y-0 w-0.5 bg-gradient-to-b from-indigo-500 via-cyan-400 to-indigo-500 shadow-lg pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md shadow-indigo-500/30">
            ⇄
          </div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-[#08090B]/85 backdrop-blur-md font-mono text-[10px] text-primary-text border border-white/[0.08]">
          Original Scan
        </span>
        <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-[#08090B]/85 backdrop-blur-md font-mono text-[10px] text-cyan-300 border border-cyan-500/20">
          ELA Heatmap (Tamper)
        </span>
      </div>

      <div className="flex items-center gap-2 mt-2.5 font-mono text-[10px] text-muted-text">
        <AlertTriangle className="w-3 h-3 text-cyan-400 shrink-0" />
        <span>Sample document overlay demonstration. In production, local Laplacian variance confirms splice boundaries.</span>
      </div>
    </div>
  );
};

