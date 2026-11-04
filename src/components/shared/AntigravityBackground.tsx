import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  dx: number;
  dy: number;
  angle: number;
  angleSpeed: number;
  color: string;
  alpha: number;
}

export const AntigravityBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle pool: Radiant cyan and ultraviolet particles
    const particleColors = [
      'rgba(6, 182, 212, ',   // Radiant cyan
      'rgba(139, 92, 246, ',  // Ultraviolet
      'rgba(56, 189, 248, ',  // Sky cyan
      'rgba(167, 139, 250, ', // Violet glow
    ];

    const particleCount = Math.min(Math.floor((width * height) / 28000), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseRadius: radius,
        dx: (Math.random() - 0.5) * 0.4,
        // Anti-gravity: negative dy makes them gently float upward
        dy: -(Math.random() * 0.45 + 0.15),
        angle: Math.random() * Math.PI * 2,
        angleSpeed: Math.random() * 0.02 + 0.005,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: Math.random() * 0.55 + 0.25,
      });
    }

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 60FPS Render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      if (prefersReducedMotion) {
        // Draw static particles without animation
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha * 0.5})`;
          ctx.fill();
        }
        return;
      }

      const mouse = mouseRef.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Anti-gravity upward drift with subtle horizontal sine wobble
        p.angle += p.angleSpeed;
        p.x += p.dx + Math.sin(p.angle) * 0.35;
        p.y += p.dy;

        // Wrap around screen boundaries seamlessly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw connecting neural filament between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Interactive mouse repulsion
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const maxRepelDist = 130;

          if (mouseDist < maxRepelDist && mouseDist > 0) {
            const force = (maxRepelDist - mouseDist) / maxRepelDist;
            p.x += (mdx / mouseDist) * force * 2.5;
            p.y += (mdy / mouseDist) * force * 2.5;
            p.radius = p.baseRadius * 1.5;
          } else {
            p.radius = p.baseRadius;
          }
        } else {
          p.radius = p.baseRadius;
        }

        // Draw particle with gentle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-base" aria-hidden="true">
      {/* Dynamic Animated Mesh Gradient (Radiant Cyan #06B6D4 and Ultraviolet #8B5CF6) */}
      <div className="absolute inset-0 opacity-35 mix-blend-screen filter blur-[100px] animate-mesh-drift">
        <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#06B6D4]/15 via-[#0F172A]/10 to-transparent" />
        <div className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-[#8B5CF6]/12 via-[#06B6D4]/10 to-transparent" />
        <div className="absolute -bottom-[20%] left-[25%] w-[60vw] h-[45vw] rounded-full bg-gradient-to-t from-[#8B5CF6]/12 via-[#0F172A]/40 to-transparent" />
      </div>

      {/* Cyber-Dark Perspective Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Canvas for 60fps Zero-Gravity Floating Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />
    </div>
  );
};
