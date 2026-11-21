import React, { useEffect, useRef } from 'react';

export const DeveloperWaveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Grid dimensions for the 3D perspective terrain wave
      const rows = 18;
      const cols = 42;

      for (let r = 0; r < rows; r++) {
        // Perspective factor: back rows are narrower and higher up
        const progress = r / rows;
        const yBase = height * 0.28 + progress * (height * 0.58);
        const spread = width * 0.85 + progress * (width * 0.15);
        const xStart = (width - spread) / 2;

        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const colProgress = c / (cols - 1);
          const x = xStart + colProgress * spread;

          // Wave elevation calculation using compound sines
          const distFromCenter = Math.sin(colProgress * Math.PI);
          const wave1 = Math.sin(colProgress * 6 + t * 0.03 + progress * 3) * 16;
          const wave2 = Math.cos(colProgress * 10 - t * 0.02 + progress * 2) * 8;
          const elevation = (wave1 + wave2) * distFromCenter * (0.4 + (1 - progress) * 0.8);

          const y = yBase - elevation;

          // Determine dot color based on height & depth
          const alpha = 0.25 + (1 - progress) * 0.65;
          const isHigh = elevation > 8;
          
          ctx.fillStyle = isHigh 
            ? `rgba(168, 85, 247, ${alpha})` // Purple
            : `rgba(99, 102, 241, ${alpha * 0.8})`; // Indigo

          // Draw small dots
          const dotSize = 1.2 + progress * 0.8;
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      t += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-32 sm:h-36 relative overflow-hidden my-2 flex items-center justify-center">
      {/* Background ambient purple glow */}
      <div className="absolute inset-0 bg-radial from-[#6366F1]/20 via-transparent to-transparent pointer-events-none" />
      <canvas
        ref={canvasRef}
        width={340}
        height={130}
        className="w-full h-full object-contain"
      />
    </div>
  );
};
