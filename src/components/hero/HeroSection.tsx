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
    <section id="home" className="scroll-mt-20 relative pt-8 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Ambient Neural Floating Glow Orbs & Grid Overlay */}
      {!shouldReduceMotion && (
        <>
          <div className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-float-slow -z-10" />
          <div
            className="pointer-events-none absolute top-1/3 -right-24 w-80 h-80 bg-accent-secondary/6 rounded-full blur-3xl animate-float-slow -z-10"
            style={{ animationDelay: '3.5s' }}
          />
        </>
      )}

      {/* Subtle Neural Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage: `radial-gradient(var(--border-strong) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Recruiter Elevator Pitch & Proof Stats (7 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6"
        >
          {/* Identity & Status Tag */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative shrink-0">
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
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-medium text-text-primary">Abhinav Anand</span>
                <span className="text-xs text-text-muted">•</span>
                <span className="text-xs font-mono text-accent">B.Tech CSE (AI/ML) · Class of 2029</span>
              </div>
              <div className="text-xs text-text-secondary flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
                </span>
                <span>Lovely Professional University · Available for AI/ML Internships</span>
              </div>
            </div>
          </div>

          {/* Hero Headline with Clear Statement and Animated Specialty Line */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-[1.15]">
            I build machine learning systems that solve{' '}
            <span className="text-accent underline decoration-accent/30 underline-offset-8">
              real problems.
            </span>
            <span className="block mt-2.5 text-text-secondary text-xl sm:text-2xl lg:text-3xl font-normal">
              Specializing in{' '}
              <TypewriterRole
                phrases={[
                  'multimodal forensic vision',
                  'predictive ML pipelines under class imbalance',
                  'low-latency document verification',
                  'reproducible containerized AI services',
                ]}
                typingSpeed={60}
                deletingSpeed={30}
                pauseDuration={2400}
              />
            </span>
          </h1>

          {/* Supporting Statement */}
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
            B.Tech CSE student specializing in Artificial Intelligence and Machine Learning. Experienced in developing computer vision document verification pipelines, handling extreme class imbalance with regularized estimators, and deploying containerized FastAPI inference microservices with statistical rigor.
          </p>

          {/* 3 Audited Proof Stats with Spotlight & Animated Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-1">
            <SpotlightCard className="p-3.5 rounded-md border border-border-subtle bg-surface card-hover">
              <div className="text-2xl font-bold font-mono text-accent">
                <AnimatedCounter value={5} duration={1.2} />
              </div>
              <div className="text-xs font-medium text-text-primary mt-0.5">Engineered Systems</div>
              <div className="text-xs text-text-muted mt-0.5">Document Vision, ML & NLP</div>
            </SpotlightCard>

            <SpotlightCard className="p-3.5 rounded-md border border-border-subtle bg-surface card-hover">
              <div className="text-2xl font-bold font-mono text-accent">
                <AnimatedCounter value={100} duration={1.4} suffix="%" />
              </div>
              <div className="text-xs font-medium text-text-primary mt-0.5">Checksum Coverage</div>
              <div className="text-xs text-text-muted mt-0.5">DocuShield ICAO 9303 & D5</div>
            </SpotlightCard>

            <SpotlightCard className="p-3.5 rounded-md border border-border-subtle bg-surface card-hover">
              <div className="text-2xl font-bold font-mono text-accent">
                <AnimatedCounter value={45} duration={1.0} prefix="< " suffix="ms" />
              </div>
              <div className="text-xs font-medium text-text-primary mt-0.5">P95 Inference Latency</div>
              <div className="text-xs text-text-muted mt-0.5">FastAPI Async Execution</div>
            </SpotlightCard>
          </div>

          {/* CTAs with Magnetic Buttons (Issues 6 & 1) */}
          <div className="space-y-3.5 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton>
                <a
                  href="#projects"
                  onClick={onOpenProjects}
                  className="btn-primary btn-md gap-2 shadow-sm hover:shadow-md"
                >
                  <span>Explore Projects</span>
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#ai-telemetry"
                  className="btn-subtle btn-md gap-2"
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
                  className="btn-secondary btn-md gap-2"
                >
                  <FileText className="w-4 h-4 text-text-muted" />
                  <span>Resume</span>
                  <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
                </a>
              </MagneticButton>
            </div>

            {/* Dedicated secondary row for social presence (Issue 6) */}
            <div className="flex items-center gap-3 text-xs font-mono text-text-muted pt-0.5">
              <span>Connect:</span>
              <div className="flex items-center gap-1.5">
                <MagneticButton>
                  <a
                    href="https://github.com/abhinavbuilds2005"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md border border-border-subtle hover:border-border-strong bg-surface text-text-secondary hover:text-text-primary transition-all inline-block hover:scale-105"
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
                    className="p-2 rounded-md border border-border-subtle hover:border-border-strong bg-surface text-text-secondary hover:text-text-primary transition-all inline-block hover:scale-105"
                    title="LinkedIn Profile"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="mailto:abhinavanand2005.cse@gmail.com"
                    className="p-2 rounded-md border border-border-subtle hover:border-border-strong bg-surface text-text-secondary hover:text-text-primary transition-all inline-block hover:scale-105"
                    title="Email: abhinavanand2005.cse@gmail.com"
                    aria-label="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Production Engineering Invariants Row: standard >= 12px text (Issues 10 & 18) */}
          <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-text-muted">
            <span className="text-text-secondary font-medium">Production Invariants:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface border border-border-subtle text-text-primary font-mono text-xs shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              0% Leakage (In-Fold CV)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface border border-border-subtle text-text-primary font-mono text-xs shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              ONNX INT8 Quantization
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface border border-border-subtle text-text-primary font-mono text-xs shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              FastAPI Async Pool
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface border border-border-subtle text-live font-mono text-xs shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-live" />
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
