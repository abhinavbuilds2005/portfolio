import React, { useEffect, useState } from 'react';
import { ArrowUp, Activity, Terminal, Shield, Github, Linkedin, Heart } from 'lucide-react';
import { sfx } from '../utils/audio';

export const Footer: React.FC = () => {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calculateFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calculateFps);
    };

    animId = requestAnimationFrame(calculateFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  const scrollToTop = () => {
    sfx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-obsidian-950 border-t border-white/10 pt-12 pb-8 font-mono text-xs text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8 mb-8 border-b border-white/10 text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <div className="text-[10px] text-gray-500 uppercase">SYS TELEMETRY</div>
              <div className="text-gray-200 font-bold">ALL NODES NOMINAL</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyber-cyan" />
            <div>
              <div className="text-[10px] text-gray-500 uppercase">RENDER FPS</div>
              <div className="text-cyber-cyan font-bold">{fps} FPS STABLE</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyber-purple" />
            <div>
              <div className="text-[10px] text-gray-500 uppercase">SECURITY</div>
              <div className="text-gray-200 font-bold">TLS 1.3 / ENCRYPTED</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-gray-500 uppercase">LOCATION</div>
              <div className="text-amber-400 font-bold">INDIA (UTC+5:30)</div>
            </div>
          </div>
        </div>

        {/* Brand & Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
          <div className="text-center md:text-left space-y-1">
            <div className="font-display font-bold text-base text-white flex items-center justify-center md:justify-start gap-2">
              <span>Abhinav Anand</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20">
                AI/ML Engineer
              </span>
            </div>
            <p className="text-xs text-gray-400 font-light">
              Designed with Obsidian Cyber-Luxury precision. Built with React, Three.js & Tailwind CSS.
            </p>
          </div>

          {/* Social & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/abhinavbuilds2005"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sfx.playHover()}
              className="p-2 rounded-xl bg-obsidian-900 border border-white/10 hover:border-cyber-cyan hover:text-white transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/abhinav-anand-865926300"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sfx.playHover()}
              className="p-2 rounded-xl bg-obsidian-900 border border-white/10 hover:border-cyber-cyan hover:text-white transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => sfx.playHover()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-obsidian-900 border border-white/15 hover:border-cyber-cyan text-gray-300 hover:text-white transition-all"
              title="Return to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyber-cyan" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-white/5 text-[11px] text-gray-400">
          © {new Date().getFullYear()} Abhinav Anand. All rights reserved. Architecting real-world AI systems.
        </div>

      </div>
    </footer>
  );
};
