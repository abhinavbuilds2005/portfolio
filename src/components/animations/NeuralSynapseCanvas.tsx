import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface SynapseNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  activation: number;
  baseActivation: number;
  pulsePhase: number;
}

interface SynapsePacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export const NeuralSynapseCanvas: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (shouldReduceMotion || !isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const mouse = { x: -2000, y: -2000, active: false };
    const packets: SynapsePacket[] = [];

    const isMobile = window.innerWidth < 768;

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : 700;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Node count: fewer, more subtle nodes (especially on mobile)
    const nodeCount = isMobile
      ? Math.floor(Math.min(18, Math.max(10, (width * height) / 35000)))
      : Math.floor(Math.min(36, Math.max(22, (width * height) / 28000)));

    const nodes: SynapseNode[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        baseRadius: 1.8 + Math.random() * 1.6,
        activation: 0.1 + Math.random() * 0.2,
        baseActivation: 0.08 + Math.random() * 0.15,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const spawnPacket = (fromIdx: number, toIdx: number) => {
      if (packets.length > 16) return;
      packets.push({
        fromNode: fromIdx,
        toNode: toIdx,
        progress: 0,
        speed: 0.012 + Math.random() * 0.015,
        color: Math.random() > 0.4 ? '#6366F1' : '#22D3EE',
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -2000;
      mouse.y = -2000;
    };

    const parent = canvas.parentElement || canvas;
    parent.addEventListener('mousemove', handleMouseMove, { passive: true });
    parent.addEventListener('mouseleave', handleMouseLeave);

    const maxDistance = isMobile ? 110 : 155;
    let globalWave = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft activation wave traversing through the latent space
      globalWave += 0.008;
      const waveX = ((Math.sin(globalWave) + 1) / 2) * width;

      // Update positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap or gentle bounce
        if (node.x < 15) { node.x = 15; node.vx *= -1; }
        if (node.x > width - 15) { node.x = width - 15; node.vx *= -1; }
        if (node.y < 15) { node.y = 15; node.vy *= -1; }
        if (node.y > height - 15) { node.y = height - 15; node.vy *= -1; }

        // Pulse
        node.pulsePhase += 0.02;
        const pulse = Math.sin(node.pulsePhase) * 0.05;

        // Wave influence
        const distToWave = Math.abs(node.x - waveX);
        if (distToWave < 80) {
          const waveBoost = (1 - distToWave / 80) * 0.35;
          node.activation = Math.max(node.activation, node.baseActivation + waveBoost);
        }

        // Mouse attraction & excitation
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxInfluence = 160;

          if (dist < maxInfluence && dist > 1) {
            const pull = (1 - dist / maxInfluence) * 0.35;
            node.x += (dx / dist) * pull;
            node.y += (dy / dist) * pull;
            node.activation = Math.min(1.0, node.activation + pull * 0.1);
          }
        }

        // Decay activation toward base
        node.activation = Math.max(node.baseActivation + pulse, node.activation * 0.985);
      });

      // Draw dynamic synaptic connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const proximity = 1 - dist / maxDistance;
            const jointActivation = (n1.activation + n2.activation) / 2;
            const alpha = proximity * (0.05 + jointActivation * 0.3);

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);

            if (jointActivation > 0.45) {
              ctx.strokeStyle = `rgba(99, 102, 241, ${alpha * 1.5})`;
              ctx.lineWidth = 1.0;
            } else {
              ctx.strokeStyle = isDark
                ? `rgba(255, 255, 255, ${alpha * 0.5})`
                : `rgba(0, 0, 0, ${alpha * 0.4})`;
              ctx.lineWidth = 0.6;
            }
            ctx.stroke();

            // Occasional packet spawn
            if (jointActivation > 0.4 && Math.random() < 0.004) {
              spawnPacket(i, j);
            }
          }
        }
      }

      // Update & draw traveling data packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          if (nodes[p.toNode]) {
            nodes[p.toNode].activation = Math.min(1.0, nodes[p.toNode].activation + 0.3);
          }
          packets.splice(i, 1);
          continue;
        }

        const from = nodes[p.fromNode];
        const to = nodes[p.toNode];
        if (!from || !to) {
          packets.splice(i, 1);
          continue;
        }

        const currX = from.x + (to.x - from.x) * p.progress;
        const currY = from.y + (to.y - from.y) * p.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      // Draw subtle nodes
      nodes.forEach((node) => {
        const radius = node.baseRadius * (0.9 + node.activation * 0.5);

        // Soft halo if activated
        if (node.activation > 0.3) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${(node.activation - 0.25) * 0.2})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        if (node.activation > 0.5) {
          ctx.fillStyle = '#818CF8';
        } else if (isDark) {
          ctx.fillStyle = `rgba(245, 247, 250, ${0.25 + node.activation * 0.4})`;
        } else {
          ctx.fillStyle = `rgba(15, 23, 42, ${0.25 + node.activation * 0.4})`;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isActive, isDark, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-60 pointer-events-auto cursor-default"
      />
    </div>
  );
};
