import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Twitter, Layers, Rocket, Trophy, Code2 } from 'lucide-react';
import { DeveloperWaveCanvas } from './DeveloperWaveCanvas';
import { BackgroundDottedWaves } from './BackgroundDottedWaves';

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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-medium mb-6 shadow-xs"
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
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1F2937] tracking-tight mt-3 flex items-center">
              <span>AI/ML Engineer</span>
              <span className="text-[#6366F1] font-light ml-1 animate-pulse select-none">|</span>
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

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 bg-[#111827] text-white hover:bg-[#1F2937] active:scale-95 px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <a
              href="https://github.com/abhinavbuilds2005"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#111827] border border-[#E5E7EB] hover:bg-slate-50 hover:border-slate-300 active:scale-95 px-5 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-xs transition-all cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
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
              className="text-[#4B5563] hover:text-[#111827] transition-colors p-1"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/abhinavbuilds2005"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4B5563] hover:text-[#111827] transition-colors p-1"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4B5563] hover:text-[#111827] transition-colors p-1"
              aria-label="Twitter / X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="mailto:abhinavanand9996@gmail.com"
              className="text-[#4B5563] hover:text-[#111827] transition-colors p-1"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: 3D AA GLASS IDENTITY & DARK DEVELOPER DASHBOARD (Cols 8-12)*/}
        {/* ======================================================================= */}
        <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
          {/* Container holding both 3D card and dark dashboard with subtle overlap */}
          <div className="relative w-full max-w-[520px] flex items-center justify-end">

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
              className="absolute -left-10 sm:-left-16 top-1/2 -translate-y-1/2 z-20 pointer-events-none sm:pointer-events-auto"
            >
              {/* Purple Orbital Elliptical Ring revolving in 360 degrees */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-8 border border-[#8B5CF6]/35 rounded-[100%] w-56 h-36 pointer-events-none"
              >
                {/* Glowing Orbital Particle Bead */}
                <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shadow-[0_0_12px_#8B5CF6]" />
              </motion.div>

              {/* Stacked Shadow Card (Underneath) */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl -z-10" />

              {/* Main 3D Glass Squircle Card */}
              <div className="w-36 h-36 sm:w-40 sm:h-40 bg-gradient-to-br from-white/95 via-white/80 to-white/65 backdrop-blur-xl border border-white/90 rounded-3xl shadow-[0_25px_50px_-10px_rgba(0,0,0,0.12)] flex items-center justify-center relative overflow-hidden group hover:rotate-0 transition-transform duration-500">
                {/* Subtle Inner Glass Refraction Highlight */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                
                {/* AA Monogram */}
                <span className="font-sans font-black text-3xl sm:text-4xl text-[#111827] tracking-tight">
                  AA
                </span>
              </div>
            </motion.div>

            {/* 2. Floating Dark Developer Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full sm:max-w-[410px] ml-auto bg-[#0F1422] text-white rounded-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)] p-5 relative z-10 overflow-hidden"
            >
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

              {/* Interactive Glowing Waveform Terrain */}
              <DeveloperWaveCanvas />

              {/* Bottom Genuine Statistics Grid (4 Columns) */}
              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/10 text-center">
                {/* Metric 1: Projects */}
                <div className="flex flex-col items-center">
                  <div className="text-slate-400 mb-1">
                    <Code2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="font-sans font-bold text-sm sm:text-base text-white">
                    6+
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
                    10+
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
                    2
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
                    100%
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                    SIH Target
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
