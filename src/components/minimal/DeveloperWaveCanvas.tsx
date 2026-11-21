import React, { useEffect, useRef } from 'react';

export const DeveloperWaveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Grid dimensions for the 3D perspective terrain wave
      const rows = 18;
      const cols = 42;

      for (let r = 0; r < rows; r++) {
        const progress = r / rows;
        const yBase = height * 0.28 + progress * (height * 0.58);
        const spread = width * 0.85 + progress * (width * 0.15);
        const xStart = (width - spread) / 2;

        for (let c = 0; c < cols; c++) {
          const colProgress = c / (cols - 1);
          const x = xStart + colProgress * spread;

          // Base wave elevation calculation using compound sines
          const distFromCenter = Math.sin(colProgress * Math.PI);
          const wave1 = Math.sin(colProgress * 6 + t * 0.03 + progress * 3) * 16;
          const wave2 = Math.cos(colProgress * 10 - t * 0.02 + progress * 2) * 8;
          let elevation = (wave1 + wave2) * distFromCenter * (0.4 + (1 - progress) * 0.8);

          // Interactive mouse wave disturbance
          if (mouseRef.current.active) {
            const dx = x - mouseRef.current.x;
            const dy = yBase - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              const mouseWave = Math.exp(-dist * 0.04) * Math.sin(t * 0.15 - dist * 0.1) * 20;
              elevation += mouseWave;
            }
          }

          const y = yBase - elevation;

          // Determine dot color based on height & depth
          const alpha = 0.25 + (1 - progress) * 0.65;
          const isHigh = elevation > 8;
          
          ctx.fillStyle = isHigh 
            ? `rgba(168, 85, 247, ${alpha})` // Electric Purple
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
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-32 sm:h-36 relative overflow-hidden my-2 flex items-center justify-center group cursor-crosshair">
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
