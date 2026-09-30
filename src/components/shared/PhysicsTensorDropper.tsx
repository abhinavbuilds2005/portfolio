import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Sparkles, X, ArrowDown } from 'lucide-react';

interface PhysicsObject {
  id: number;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  rotation: number;
  vRot: number;
  color: string;
  isResting: boolean;
}

const TOKEN_LABELS = [
  'W₁ [768×512]',
  'W₂ [512×128]',
  'bias b₁',
  '∇Loss',
  'Epoch 50',
  'Softmax',
  'ReLU(x)',
  'Tensor [32, 3, 224]',
  'Vector 128D',
  'SHAP: +0.42',
  'Learning Rate 1e-4'
];

export const PhysicsTensorDropper: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [objects, setObjects] = useState<PhysicsObject[]>([]);
  const objectsRef = useRef<PhysicsObject[]>([]);
  const animationFrameRef = useRef<number>();

  const GRAVITY = 0.42;
  const RESTITUTION = 0.62; // Bounce elasticity
  const FRICTION = 0.985;

  const spawnObject = (xPos?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 110;
    const height = 28;
    const x = xPos ?? Math.random() * (canvas.width - width - 40) + 20;
    const randomLabel = TOKEN_LABELS[Math.floor(Math.random() * TOKEN_LABELS.length)];

    const newObj: PhysicsObject = {
      id: Date.now() + Math.random(),
      label: randomLabel,
      x,
      y: -height - 10, // Start above screen for free fall
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 2 + 1, // Initial downward drop velocity
      width,
      height,
      rotation: (Math.random() - 0.5) * 0.3,
      vRot: (Math.random() - 0.5) * 0.05,
      color: Math.random() > 0.4 ? '#e58b24' : '#f5f2eb',
      isResting: false
    };

    objectsRef.current.push(newObj);
  };

  // Shower drop multiple objects
  const triggerFreeFallShower = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        spawnObject(Math.random() * (canvas.width - 140) + 20);
      }, i * 140);
    }
  };

  const clearCanvas = () => {
    objectsRef.current = [];
    setObjects([]);
  };

  useEffect(() => {
    if (!isOpen) return;

    // Initial shower
    triggerFreeFallShower();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    updateDimensions();

    const render = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, w, h);

      // Floor grid line
      ctx.strokeStyle = '#2b2a27';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, h - 8);
      ctx.lineTo(w, h - 8);
      ctx.stroke();
      ctx.setLineDash([]);

      const floorY = h - 8;

      // Update and draw physics objects
      for (let i = 0; i < objectsRef.current.length; i++) {
        const obj = objectsRef.current[i];

        // Apply gravitational acceleration
        obj.vy += GRAVITY;
        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.rotation += obj.vRot;

        obj.vx *= FRICTION;

        // Collision with floor (Free fall bounce)
        if (obj.y + obj.height >= floorY) {
          obj.y = floorY - obj.height;
          obj.vy = -obj.vy * RESTITUTION;
          obj.vRot *= 0.8;

          // Dampen tiny jitter
          if (Math.abs(obj.vy) < 0.6) {
            obj.vy = 0;
            obj.vRot = 0;
            obj.isResting = true;
          }
        }

        // Collision with lateral walls
        if (obj.x <= 10) {
          obj.x = 10;
          obj.vx = -obj.vx * 0.7;
        } else if (obj.x + obj.width >= w - 10) {
          obj.x = w - obj.width - 10;
          obj.vx = -obj.vx * 0.7;
        }

        // Draw physical tensor card
        ctx.save();
        ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
        ctx.rotate(obj.rotation);

        // Body
        ctx.fillStyle = '#1c1c1c';
        ctx.strokeStyle = obj.color === '#e58b24' ? '#e58b24' : '#3f3e3b';
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.roundRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height, 4);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.fillStyle = obj.color;
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obj.label, 0, 0);

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-xl border border-[#2b2a27] bg-[#161616] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#2b2a27] bg-[#121212]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#e58b24] font-bold">
              PHYSICS LAB //
            </span>
            <span className="font-mono text-xs text-[#f5f2eb]">
              FREE-FALL GRAVITY TENSOR SIMULATION
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerFreeFallShower}
              className="flex items-center gap-1.5 px-3 py-1 rounded font-mono text-xs bg-[#e58b24] hover:bg-[#d97706] text-[#121212] font-semibold transition-colors"
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span>Drop Tensors</span>
            </button>

            <button
              onClick={clearCanvas}
              className="p-1 rounded text-[#78716c] hover:text-[#f5f2eb] border border-[#2b2a27] hover:border-[#3f3e3b] transition-colors"
              title="Reset Sandbox"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded text-[#78716c] hover:text-[#f5f2eb] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Interactive Physics Canvas */}
        <div className="relative w-full h-80 sm:h-96 bg-[#121212] overflow-hidden cursor-crosshair">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              spawnObject(e.clientX - rect.left - 50);
            }}
          />

          <div className="absolute top-3 left-4 font-mono text-[10px] text-[#78716c] pointer-events-none">
            [Click anywhere inside to spawn and drop custom weight tensors under gravity]
          </div>

          <div className="absolute bottom-3 left-4 font-mono text-[10px] text-[#e58b24] pointer-events-none flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Gravity: 9.8 m/s² · Elastic Bounce: 62%</span>
          </div>
        </div>

        {/* Footer controls hint */}
        <div className="px-5 py-2.5 border-t border-[#2b2a27] bg-[#121212] flex items-center justify-between font-mono text-[11px] text-[#78716c]">
          <span>Click canvas to drop individual items · Press ESC to close</span>
          <span className="text-[#a8a29e]">{objectsRef.current.length} Active Objects</span>
        </div>
      </div>
    </div>
  );
};
