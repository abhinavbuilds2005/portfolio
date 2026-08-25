import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Download, 
  BrainCircuit, 
  Github, 
  Linkedin, 
  Mail, 
  Instagram,
  FileText
} from 'lucide-react';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { sfx } from '../utils/audio';

interface HeroProps {
  accentColor: string;
}

export const Hero: React.FC<HeroProps> = ({ accentColor }) => {
  const roles = [
    'AI / ML Engineer',
    'Full-Stack Developer',
    'Generative AI Specialist',
    'Deep Learning Practitioner',
    'Intelligent Systems Architect',
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentFullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        const nextText = isDeleting
          ? currentFullText.substring(0, displayText.length - 1)
          : currentFullText.substring(0, displayText.length + 1);
        setDisplayText(nextText);
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden cyber-grid-bg">
      {/* 3D Interactive Three.js Neural Nexus Background */}
      <ThreeHeroCanvas accentColor={accentColor} />

      {/* Subtle Gradient Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-cyan/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyber-purple/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 text-center md:text-left">
          
          {/* Left Column: Bio and CTA */}
          <div className="flex-1 space-y-6">
            
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-obsidian-900/90 border border-white/10 text-xs font-medium text-gray-300 shadow-md backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for remote ML / Full-Stack opportunities</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
                Building Intelligent <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-indigo-300 to-cyber-purple">
                  Digital Experiences.
                </span>
              </h1>
            </div>

            {/* Dynamic Typewriter */}
            <div className="h-9 flex items-center justify-center md:justify-start">
              <div className="font-mono text-lg sm:text-xl font-bold flex items-center gap-1 text-cyber-cyan">
                <span>&gt;</span>
                <span>{displayText}</span>
                <span className="w-2 h-5 bg-cyber-cyan animate-pulse inline-block" />
              </div>
            </div>

            {/* Bio Description */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              I'm <strong className="text-white font-semibold">Abhinav Anand</strong>, a BTech CSE (AIML) student at Lovely Professional University. I architect production machine learning systems, interpretable predictive models, and full-stack web applications that solve real-world problems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href="#work"
                onClick={() => sfx.playClick()}
                onMouseEnter={() => sfx.playHover()}
                className="px-7 py-3.5 bg-white text-black font-bold text-sm rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.25)] flex items-center gap-2"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={() => sfx.playClick()}
                onMouseEnter={() => sfx.playHover()}
                className="px-7 py-3.5 border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-full transition-all hover:scale-105 active:scale-95"
              >
                Contact Me
              </a>

              <a
                href="/Abhinav_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => sfx.playClick()}
                onMouseEnter={() => sfx.playHover()}
                className="px-5 py-3.5 rounded-full bg-obsidian-900 border border-white/10 hover:border-cyber-cyan/50 text-gray-300 hover:text-white text-sm font-medium transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-cyber-cyan" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Social Connect Icons */}
            <div className="flex items-center justify-center md:justify-start gap-5 pt-4 text-gray-400">
              <a
                href="https://github.com/abhinavbuilds2005"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sfx.playHover()}
                className="hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/abhinav-anand-865926300"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sfx.playHover()}
                className="hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/cse.abhinav?igsh=MTcxdDR6N2VyMmIwMQ=="
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sfx.playHover()}
                className="hover:text-white transition-colors"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:abhinavanand9996@gmail.com"
                onMouseEnter={() => sfx.playHover()}
                className="hover:text-white transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right Column: Hero Profile Image with Glow Ring */}
          <div className="relative shrink-0">
            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/20 relative z-10 p-2 shadow-[0_0_50px_rgba(0,242,255,0.25)] bg-obsidian-900 group">
              <img
                src="/abhinav.jpg"
                alt="Abhinav Anand"
                className="w-full h-full object-cover object-top rounded-full group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Ambient Backing Glow */}
            <div className="absolute inset-0 bg-cyber-cyan/20 rounded-full blur-3xl -z-10 translate-x-2 translate-y-2" />

            {/* Pulsing Active Status Indicator */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-8 h-8 bg-obsidian-950 rounded-full flex items-center justify-center border-2 border-white/20 z-20 shadow-lg">
              <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
