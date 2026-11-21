import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Instagram, Layers, Rocket, Trophy, Code2, Sparkles } from 'lucide-react';
import { DeveloperWaveCanvas } from './DeveloperWaveCanvas';
import { BackgroundDottedWaves } from './BackgroundDottedWaves';
import { TypewriterRole } from '../shared/TypewriterRole';
import { MagneticButton } from '../editorial/MagneticButton';
import { AnimatedNumber } from '../shared/AnimatedNumber';

interface MinimalHeroProps {
  onViewProjects?: () => void;
  onOpenResume?: () => void;
}

export const MinimalHero: React.FC<MinimalHeroProps> = ({ onViewProjects }) => {
  const scrollToProjects = () => {
    if (onViewProjects) {
      onViewProjects();
    } else {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3D Spatial Mouse Parallax Tilt Physics for Hero Dashboard
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 140, damping: 18, mass: 0.2 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="home" className="relative min-h-[92vh] pt-32 sm:pt-36 pb-16 px-6 sm:px-10 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Background Subtle Dotted Waves Graphics */}
      <BackgroundDottedWaves />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* ======================================================================= */}
        {/* LEFT COLUMN: HERO HEADLINE, BIO, CTAs, SOCIALS (Cols 1-7)               */}
        {/* ======================================================================= */}
        <div className="lg:col-span-7 max-w-2xl">
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-medium mb-6 shadow-xs hover:border-emerald-300 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Available for Internships 2026/27</span>
          </motion.div>

          {/* Large Bold Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] tracking-tight leading-none">
              Hi, I'm
            </h1>
            <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#111827] tracking-tight leading-[1.08] mt-1 font-sans">
              Abhinav Anand
            </div>
            {/* Pure Engineering Job Roles Typewriter */}
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1F2937] tracking-tight mt-3 min-h-[44px] flex items-center">
              <TypewriterRole
                phrases={[
                  'AI/ML Engineer',
                  'Machine Learning Engineer',
                  'AI Engineer',
                  'Computer Vision Engineer',
                  'Deep Learning Engineer',
                  'Applied AI Engineer',
                  'MLOps Engineer',
                ]}
                typingSpeed={60}
                deletingSpeed={30}
                pauseDuration={2200}
                className="text-[#1F2937] font-semibold"
                cursorClassName="bg-[#6366F1] w-[3px]"
              />
            </div>
          </motion.div>

          {/* Short Professional Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#4B5563] mt-6 leading-relaxed max-w-xl font-normal"
          >
            B.Tech CSE (AIML) student at LPU, building real-world AI systems that solve meaningful problems. I work at the intersection of Machine Learning, Computer Vision and Generative AI.
          </motion.p>

          {/* Action CTA Buttons with Magnetic Spring Interaction */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <MagneticButton strength={0.3}>
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 bg-[#111827] text-white hover:bg-[#1F2937] active:scale-95 px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </MagneticButton>

            <MagneticButton strength={0.3}>
              <a
                href="https://github.com/abhinavbuilds2005"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#111827] border border-[#E5E7EB] hover:bg-slate-50 hover:border-slate-300 active:scale-95 px-5 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-xs transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4 mt-8 pt-4"
          >
            <a
              href="https://www.linkedin.com/in/abhinav-anand-865926300"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4B5563] hover:text-[#111827] transition-transform hover:-translate-y-0.5 p-1"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/abhinavbuilds2005"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4B5563] hover:text-[#111827] transition-transform hover:-translate-y-0.5 p-1"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/cse.abhinav/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4B5563] hover:text-[#E1306C] transition-transform hover:-translate-y-0.5 p-1"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="mailto:abhinavanand9996@gmail.com"
              className="text-[#4B5563] hover:text-[#111827] transition-transform hover:-translate-y-0.5 p-1"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: 3D AA IDENTITY & DARK DEVELOPER DASHBOARD (Cols 8-12)     */}
        {/* ======================================================================= */}
        <div 
          ref={cardRef}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          className="lg:col-span-5 relative flex items-center justify-center lg:justify-end perspective-[1200px]"
        >
          {/* Spatial 3D Container with spring-driven mouse parallax */}
          <motion.div 
            style={{ 
              rotateX, 
              rotateY, 
              transformStyle: 'preserve-3d' 
            }}
            className="relative w-full max-w-[520px] flex items-center justify-end transition-shadow duration-300"
          >

            {/* 1. Refined 3D AA Identity Element (Floating Glass Monogram with Orbital Levitation) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: [0, -8, 0],
                rotate: [-6, -4, -6],
              }}
              transition={{ 
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 }
              }}
              style={{ transform: 'translateZ(60px)' }}
              className="absolute -left-10 sm:-left-16 top-1/2 -translate-y-1/2 z-20 pointer-events-none sm:pointer-events-auto"
            >
              {/* Purple Orbital Elliptical Ring revolving in 360 degrees */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-8 border border-[#8B5CF6]/35 rounded-[100%] w-56 h-36 pointer-events-none"
              >
                {/* Glowing Orbital Particle Bead */}
                <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shadow-[0_0_12px_#8B5CF6]" />
              </motion.div>

              {/* Stacked Shadow Card (Underneath) */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl -z-10" />

              {/* Main 3D Glass Squircle Card */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-br from-white/95 via-white/85 to-white/70 backdrop-blur-xl border border-white/90 rounded-3xl shadow-[0_25px_50px_-10px_rgba(0,0,0,0.12)] p-3.5 sm:p-4 flex flex-col items-center justify-between relative overflow-hidden group hover:rotate-0 transition-all duration-500 hover:shadow-[0_25px_60px_-5px_rgba(99,102,241,0.22)]">
                {/* Subtle Inner Glass Refraction Highlight */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                
                {/* Holographic light sweep across the badge on hover */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-[#6366F1]/15 to-transparent rotate-45 pointer-events-none group-hover:translate-x-full transition-transform duration-1000" />

                {/* Top Micro-Header */}
                <div className="w-full flex items-center justify-between text-[9px] font-mono text-slate-500 tracking-wider relative z-10">
                  <span className="flex items-center gap-1 font-semibold text-[#6366F1]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-ping" />
                    AI/ML
                  </span>
                  <span className="text-slate-400">#2026</span>
                </div>

                {/* Center: Interlocking Precision Neural AA Monogram */}
                <div className="relative my-auto flex items-center justify-center z-10">
                  <svg className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-sm" viewBox="0 0 80 80" fill="none">
                    <defs>
                      <linearGradient id="aaGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#111827" />
                        <stop offset="100%" stopColor="#374151" />
                      </linearGradient>
                      <linearGradient id="aaGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                      <filter id="glowAA" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Circuit concentric rings */}
                    <circle cx="40" cy="40" r="34" stroke="#6366F1" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
                    <circle cx="40" cy="40" r="24" stroke="#8B5CF6" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.35" />

                    {/* First 'A' - Primary Dark Slate Geometric Chevron */}
                    <path
                      d="M 23 58 L 36 22 L 42 22 L 55 58 M 27 47 L 51 47"
                      stroke="url(#aaGradient1)"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Second Interlocking 'A' - Electric Indigo Accent Chevron Offset */}
                    <path
                      d="M 36 58 L 45 28 L 51 28 L 61 58 M 40 50 L 57 50"
                      stroke="url(#aaGradient2)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:stroke-[#4F46E5] transition-colors"
                    />

                    {/* Central Glowing Neural Synapse Vertex */}
                    <circle cx="39" cy="24" r="3" fill="#6366F1" filter="url(#glowAA)" />
                    <circle cx="39" cy="24" r="1.5" fill="#FFFFFF" />
                  </svg>
                </div>

                {/* Bottom Micro-Badge */}
                <div className="w-full text-center border-t border-slate-200/60 pt-1 relative z-10">
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-widest text-[#111827] uppercase block">
                    Abhinav Anand
                  </span>
                  <span className="font-mono text-[7px] text-slate-400 tracking-wider uppercase block">
                    Core Systems
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 2. Floating Dark Developer Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ transform: 'translateZ(20px)' }}
              className="w-full sm:max-w-[410px] ml-auto bg-[#0F1422] text-white rounded-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)] p-5 relative z-10 overflow-hidden group"
            >
              {/* Dynamic Specular Hover Highlight */}
              <motion.div 
                className="absolute -inset-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none rotate-45"
                style={{ left: glareX, top: glareY }}
              />

              {/* Top Bar: Monogram & Online Status */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="font-sans font-black text-xs text-white bg-white/10 px-1.5 py-0.5 rounded">
                    AA
                  </span>
                  <span className="text-xs font-medium text-slate-300">
                    Developer Profile
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span>
                </div>
              </div>

              {/* Interactive Glowing Waveform Terrain with mouse ripple disturbance */}
              <DeveloperWaveCanvas />

              {/* Bottom Genuine Statistics Grid with Animated Numeric Roll-up (4 Columns) */}
              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/10 text-center">
                {/* Metric 1: Projects */}
                <div className="flex flex-col items-center">
                  <div className="text-slate-400 mb-1">
                    <Code2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="font-sans font-bold text-sm sm:text-base text-white">
                    <AnimatedNumber value={6} suffix="+" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                    Projects
                  </div>
                </div>

                {/* Metric 2: Tech Stack */}
                <div className="flex flex-col items-center border-l border-white/5">
                  <div className="text-slate-400 mb-1">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div className="font-sans font-bold text-sm sm:text-base text-white">
                    <AnimatedNumber value={10} suffix="+" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                    Tech Stack
                  </div>
                </div>

                {/* Metric 3: Hackathons */}
                <div className="flex flex-col items-center border-l border-white/5">
                  <div className="text-slate-400 mb-1">
                    <Rocket className="w-3.5 h-3.5" />
                  </div>
                  <div className="font-sans font-bold text-sm sm:text-base text-white">
                    <AnimatedNumber value={2} />
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                    Hackathons
                  </div>
                </div>

                {/* Metric 4: SIH Target */}
                <div className="flex flex-col items-center border-l border-white/5">
                  <div className="text-slate-400 mb-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="font-sans font-bold text-sm sm:text-base text-white">
                    <AnimatedNumber value={100} suffix="%" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                    SIH Target
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
