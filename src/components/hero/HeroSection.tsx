import React from 'react';
import { ArrowDown, FileText, ExternalLink, Github, Linkedin, Mail, Cpu } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import avatarImg from '../../assets/abhinav.png';
import { TypewriterRole } from '../shared/TypewriterRole';
import { AnimatedCounter } from '../shared/AnimatedCounter';
import { SpotlightCard } from '../shared/SpotlightCard';
import { MagneticButton } from '../shared/MagneticButton';
import { ConvergenceVisualizer } from './ConvergenceVisualizer';

interface HeroSectionProps {
  onOpenProjects?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenProjects }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative pt-8 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Ambient Neural Floating Glow Orbs */}
      {!shouldReduceMotion && (
        <>
          <div className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-float-slow -z-10" />
          <div
            className="pointer-events-none absolute top-1/3 -right-24 w-80 h-80 bg-amber-500/6 rounded-full blur-3xl animate-float-slow -z-10"
            style={{ animationDelay: '3.5s' }}
          />
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Recruiter Elevator Pitch & Proof Stats (7 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6"
        >
          {/* Identity & Status Tag */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <img
                src={avatarImg}
                alt="Abhinav Anand"
                className="w-12 h-12 rounded-full object-cover border-2 border-border-strong shadow-sm"
                width={48}
                height={48}
                loading="eager"
              />
              {/* Radar live ring effect */}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-live/50 animate-radar pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-live border-2 border-base animate-live-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-text-primary">Abhinav Anand</span>
                <span className="text-xs text-text-muted">•</span>
                <span className="text-xs font-mono text-accent">2nd-Year B.Tech (AI/ML) @ LPU</span>
              </div>
              <div className="text-xs text-text-secondary flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
                </span>
                <span>Open to AI/ML & ML Engineering Internships</span>
              </div>
            </div>
          </div>

          {/* Hero Headline with Dynamic Typography Animation */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-[1.2]">
            <span>Building </span>
            <span className="text-accent underline decoration-accent/30 underline-offset-8">
              <TypewriterRole
                phrases={[
                  'multimodal forensic vision',
                  'production ML pipelines',
                  'high-availability AI systems',
                  'verifiable fraud detection',
                  'low-latency NLP architectures',
                ]}
                typingSpeed={65}
                deletingSpeed={35}
                pauseDuration={2400}
              />
            </span>
            <span className="block mt-2 text-text-secondary text-2xl sm:text-3xl lg:text-4xl font-normal">
              engineered with statistical rigor.
            </span>
          </h1>

          {/* Supporting Statement */}
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
            Specializing in multimodal document verification, predictive risk scoring under severe class imbalance, and low-latency NLP architectures with verifiable engineering rigor.
          </p>

          {/* 3 Proof Stats with Spotlight & Animated Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-1">
            <SpotlightCard className="p-3.5 rounded-md border border-border-subtle bg-surface card-hover">
              <div className="text-2xl font-bold font-mono text-accent">
                <AnimatedCounter value={5} duration={1.2} />
              </div>
              <div className="text-xs font-medium text-text-primary mt-0.5">Deployed Systems</div>
              <div className="text-xs text-text-muted mt-0.5">Vision, Predictive ML & NLP</div>
            </SpotlightCard>

            <SpotlightCard className="p-3.5 rounded-md border border-border-subtle bg-surface card-hover">
              <div className="text-2xl font-bold font-mono text-accent">
                <AnimatedCounter value={100} duration={1.4} suffix="%" />
              </div>
              <div className="text-xs font-medium text-text-primary mt-0.5">Checksum Coverage</div>
              <div className="text-xs text-text-muted mt-0.5">ICAO Doc 9303 & Verhoeff D5</div>
            </SpotlightCard>

            <SpotlightCard className="p-3.5 rounded-md border border-border-subtle bg-surface card-hover">
              <div className="text-2xl font-bold font-mono text-accent">
                <AnimatedCounter value={2} duration={1.0} prefix="< " suffix="s" />
              </div>
              <div className="text-xs font-medium text-text-primary mt-0.5">Screening Latency</div>
              <div className="text-xs text-text-muted mt-0.5">SIH 2026 Multimodal Engine</div>
            </SpotlightCard>
          </div>

          {/* CTAs with Magnetic Buttons & Hover Micro-Interactions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <MagneticButton>
              <a
                href="#projects"
                onClick={onOpenProjects}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium bg-accent hover:bg-accent-hover text-base transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#ai-telemetry"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium border border-accent/40 bg-accent/10 hover:bg-accent/20 text-accent transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <Cpu className="w-4 h-4 animate-pulse" />
                <span>ML Sandbox</span>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium border border-border-subtle hover:border-border-strong bg-surface text-text-primary hover:text-accent transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <FileText className="w-4 h-4 text-text-muted" />
                <span>Resume</span>
                <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
              </a>
            </MagneticButton>

            <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
              <MagneticButton>
                <a
                  href="https://github.com/abhinavbuilds2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md border border-border-subtle hover:border-border-strong bg-surface text-text-secondary hover:text-text-primary transition-all inline-block hover:scale-105"
                  title="GitHub: abhinavbuilds2005"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://www.linkedin.com/in/abhinav-anand-865926300"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md border border-border-subtle hover:border-border-strong bg-surface text-text-secondary hover:text-text-primary transition-all inline-block hover:scale-105"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="mailto:abhinavanand2005.cse@gmail.com"
                  className="p-2.5 rounded-md border border-border-subtle hover:border-border-strong bg-surface text-text-secondary hover:text-text-primary transition-all inline-block hover:scale-105"
                  title="Email: abhinavanand2005.cse@gmail.com"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Production Engineering Invariants Row for Senior ML Reviewers */}
          <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-[11px] text-text-muted">
            <span className="text-text-secondary font-medium">Production Invariants:</span>
            <span className="px-2 py-0.5 rounded bg-surface border border-accent/40 text-accent font-medium">
              0% Leakage (In-Fold CV)
            </span>
            <span className="px-2 py-0.5 rounded bg-surface border border-border-subtle text-text-primary">
              ONNX INT8 Quantization
            </span>
            <span className="px-2 py-0.5 rounded bg-surface border border-border-subtle text-text-primary">
              FastAPI Async Pool
            </span>
            <span className="px-2 py-0.5 rounded bg-surface border border-live/40 text-live font-medium">
              P95 Latency &lt; 45ms
            </span>
          </div>
        </motion.div>

        {/* Right Column: Interactive Animated Model Convergence Visualizer (5 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.1, ease: 'easeOut' }}
          className="lg:col-span-5"
        >
          <ConvergenceVisualizer />
        </motion.div>

      </div>
    </section>
  );
};
