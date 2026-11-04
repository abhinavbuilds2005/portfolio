import React, { useState, useRef, useEffect } from 'react';
import { Sliders, AlertTriangle, Scan, ShieldAlert, CheckCircle2, Play, Pause } from 'lucide-react';

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
  const [isAutoScanning, setIsAutoScanning] = useState<boolean>(false);
  const [isTampered, setIsTampered] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scanIntervalRef = useRef<number | null>(null);

  // Auto-scanning radar effect
  useEffect(() => {
    if (!isAutoScanning) {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      return;
    }

    let direction = 1;
    scanIntervalRef.current = window.setInterval(() => {
      setSliderPosition((prev) => {
        if (prev >= 88) direction = -1;
        if (prev <= 12) direction = 1;
        return prev + direction * 1.5;
      });
    }, 30);

    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, [isAutoScanning]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    setIsAutoScanning(false);
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
    <div className="rounded-xl border border-border-subtle bg-surface/90 p-4 sm:p-5 my-3 shadow-md">
      {/* Header with control actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 font-mono text-xs text-accent font-semibold">
          <Sliders className="w-3.5 h-3.5" />
          <span>FORENSIC ELA HEATMAP SLIDER</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsAutoScanning((prev) => !prev)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono border transition-all cursor-pointer ${
              isAutoScanning
                ? 'bg-accent/20 border-accent text-accent'
                : 'bg-base border-border-subtle text-text-secondary hover:text-text-primary'
            }`}
            title="Auto scan document with forensic laser"
          >
            {isAutoScanning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-accent" />}
            <span className="text-[11px]">{isAutoScanning ? 'Scanning' : 'Auto Scan'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsTampered((prev) => !prev)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono border transition-all cursor-pointer ${
              isTampered
                ? 'bg-red-500/20 border-red-500/60 text-red-400'
                : 'bg-base border-border-subtle text-text-secondary hover:text-text-primary'
            }`}
            title="Simulate synthetic document tampering"
          >
            {isTampered ? <ShieldAlert className="w-3 h-3 text-red-400" /> : <Scan className="w-3 h-3 text-accent" />}
            <span className="text-[11px]">{isTampered ? 'Tamper Active' : 'Simulate Tamper'}</span>
          </button>
        </div>
      </div>

      <p className="text-xs text-text-secondary mb-3 leading-relaxed">
        Drag the vertical dividing line to compare the clean document scan against the forensic compression-disparity heatmap revealing digitally spliced regions.
      </p>

      {/* Before / After Draggable Container */}
      <div
        ref={containerRef}
        role="slider"
        tabIndex={0}
        aria-label="Forensic reveal comparison slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setIsAutoScanning(false);
            setSliderPosition((p) => Math.max(0, p - 5));
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            setIsAutoScanning(false);
            setSliderPosition((p) => Math.min(100, p + 5));
          }
        }}
        className="relative w-full h-56 sm:h-72 rounded-lg border border-border-subtle overflow-hidden select-none cursor-ew-resize bg-base focus:outline-none focus-visible:ring-2 focus-visible:ring-accent group"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
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
          className="absolute inset-y-0 w-0.5 bg-accent shadow-[0_0_12px_rgba(6,182,212,0.8)] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-accent text-base flex items-center justify-center text-xs font-bold shadow-lg border border-white/40">
            ⇄
          </div>
        </div>

        {/* Left Tag: Original Scan */}
        <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-base/90 backdrop-blur-md font-mono text-[11px] text-text-primary border border-border-subtle shadow-sm pointer-events-none">
          Original Scan (Clean)
        </span>

        {/* Right Tag: ELA Heatmap with Tamper Detection Badge */}
        <span className={`absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md backdrop-blur-md font-mono text-[11px] border shadow-sm pointer-events-none transition-colors ${
          isTampered
            ? 'bg-red-950/90 text-red-300 border-red-500/60 animate-pulse'
            : 'bg-base/90 text-accent border-border-subtle'
        }`}>
          {isTampered ? '⚠ ELA DISPARITY: 0.384 (TAMPER DETECTED)' : 'ELA Heatmap (Compression)'}
        </span>
      </div>

      {/* Real-time Tamper Alert Feedback */}
      {isTampered ? (
        <div className="flex items-center gap-2 mt-2.5 p-2 rounded bg-red-950/30 border border-red-500/40 text-red-300 font-mono text-xs">
          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          <span>SIMULATED FORGERY: Invalidation of ICAO Doc 9303 check digit in birthdate field. ELA artifact heatmaps activated.</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 mt-2.5 font-mono text-xs text-text-muted">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>All checksums valid. 95% JPEG quality difference error &lt; 0.12 baseline threshold.</span>
        </div>
      )}
    </div>
  );
};
