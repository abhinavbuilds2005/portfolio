import React, { useState } from 'react';
import { ArrowDown, FileText, ExternalLink, Github, Linkedin, Mail, Activity, Play, RotateCcw } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroSectionProps {
  onOpenProjects?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenProjects }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section id="home" className="pt-8 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                src="/abhinav.jpeg"
                alt="Abhinav Anand"
                className="w-12 h-12 rounded-full object-cover border-2 border-border-strong shadow-sm"
                width={48}
                height={48}
                loading="eager"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-live border-2 border-base animate-live-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-text-primary">Abhinav Anand</span>
                <span className="text-xs text-text-muted">•</span>
                <span className="text-xs font-mono text-accent">2nd-Year B.Tech (AI/ML) @ LPU</span>
              </div>
              <div className="text-xs text-text-secondary flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-live" />
                <span>Open to AI/ML & ML Engineering Internships</span>
              </div>
            </div>
          </div>

          {/* Hero Headline (Option A) */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-[1.18]">
            Building production ML pipelines, multimodal forensic vision, and high-availability AI systems.
          </h1>

          {/* Supporting Statement */}
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
            Specializing in multimodal document verification, predictive risk scoring under severe class imbalance, and low-latency NLP architectures with verifiable engineering rigor.
          </p>

          {/* 3 Proof Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-1">
            <div className="p-3.5 rounded-md border border-border-subtle bg-surface">
              <div className="text-2xl font-bold font-mono text-accent">5</div>
              <div className="text-xs font-medium text-text-primary mt-0.5">Deployed Systems</div>
              <div className="text-xs text-text-muted mt-0.5">Vision, Predictive ML & NLP</div>
            </div>

            <div className="p-3.5 rounded-md border border-border-subtle bg-surface">
              <div className="text-2xl font-bold font-mono text-accent">100%</div>
              <div className="text-xs font-medium text-text-primary mt-0.5">Checksum Coverage</div>
              <div className="text-xs text-text-muted mt-0.5">ICAO Doc 9303 & Verhoeff D5</div>
            </div>

            <div className="p-3.5 rounded-md border border-border-subtle bg-surface">
              <div className="text-2xl font-bold font-mono text-accent">&lt; 2s</div>
              <div className="text-xs font-medium text-text-primary mt-0.5">Screening Latency</div>
              <div className="text-xs text-text-muted mt-0.5">SIH 2026 Multimodal Engine</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              onClick={onOpenProjects}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium bg-accent hover:bg-accent-hover text-base transition-colors shadow-sm"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium border border-border-subtle hover:border-border-strong bg-surface text-text-primary hover:text-accent transition-colors"
            >
              <FileText className="w-4 h-4 text-text-muted" />
              <span>Resume</span>
              <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
            </a>

            <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
              <a
                href="https://github.com/abhinavbuilds2005"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-md border border-border-subtle hover:border-border-strong bg-surface text-text-secondary hover:text-text-primary transition-colors"
                title="GitHub: abhinavbuilds2005"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/abhinav-anand-865926300"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-md border border-border-subtle hover:border-border-strong bg-surface text-text-secondary hover:text-text-primary transition-colors"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="mailto:abhinavanand2005.cse@gmail.com"
                className="p-2.5 rounded-md border border-border-subtle hover:border-border-strong bg-surface text-text-secondary hover:text-text-primary transition-colors"
                title="Email: abhinavanand2005.cse@gmail.com"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Quiet, labeled training curve visual (5 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.1, ease: 'easeOut' }}
          className="lg:col-span-5"
        >
          <div className="rounded-lg border border-border-subtle bg-surface p-5 sm:p-6 card-hover relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent" />
                <span className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wide">
                  Model Convergence
                </span>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded border border-border-subtle text-text-muted bg-base">
                Illustration
              </span>
            </div>

            {/* SVG Training Curve */}
            <div className="relative w-full h-44 bg-base rounded border border-border-subtle p-3 mb-4">
              <svg viewBox="0 0 320 130" className="w-full h-full overflow-visible">
                {/* Grid lines */}
                <line x1="30" y1="20" x2="310" y2="20" stroke="var(--border-subtle)" strokeDasharray="3 3" />
                <line x1="30" y1="55" x2="310" y2="55" stroke="var(--border-subtle)" strokeDasharray="3 3" />
                <line x1="30" y1="90" x2="310" y2="90" stroke="var(--border-subtle)" strokeDasharray="3 3" />
                <line x1="30" y1="120" x2="310" y2="120" stroke="var(--border-subtle)" />
                <line x1="30" y1="10" x2="30" y2="120" stroke="var(--border-subtle)" />

                {/* Axis Labels */}
                <text x="10" y="24" fill="var(--text-muted)" fontSize="9" fontFamily="monospace">1.5</text>
                <text x="10" y="59" fill="var(--text-muted)" fontSize="9" fontFamily="monospace">1.0</text>
                <text x="10" y="94" fill="var(--text-muted)" fontSize="9" fontFamily="monospace">0.5</text>
                <text x="10" y="122" fill="var(--text-muted)" fontSize="9" fontFamily="monospace">0.0</text>

                <text x="30" y="129" fill="var(--text-muted)" fontSize="8" fontFamily="monospace">E1</text>
                <text x="165" y="129" fill="var(--text-muted)" fontSize="8" fontFamily="monospace">E30</text>
                <text x="295" y="129" fill="var(--text-muted)" fontSize="8" fontFamily="monospace">E60</text>

                {/* Validation Loss Curve (Subtle dashed line) */}
                <path
                  d="M 30 18 Q 70 38 110 65 T 190 92 T 270 99 T 305 101"
                  fill="none"
                  stroke="var(--text-muted)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />

                {/* Training Loss Curve (Amber solid smooth curve) */}
                <path
                  d="M 30 15 Q 70 42 110 72 T 190 97 T 270 106 T 305 107"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.2"
                />

                {/* Converged Marker Dot */}
                <circle cx="305" cy="107" r="4" fill="var(--accent)" />
                <circle cx="305" cy="107" r="8" fill="var(--accent)" opacity="0.2" />
              </svg>

              {/* Legend overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-3 font-mono text-xs bg-surface/90 px-2 py-1 rounded border border-border-subtle backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-accent inline-block" />
                  <span className="text-text-primary text-[11px]">Train</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 border-b border-text-muted border-dashed inline-block" />
                  <span className="text-text-muted text-[11px]">Val</span>
                </div>
              </div>
            </div>

            {/* Checkpoint Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-border-subtle">
              <div>
                <div className="font-mono text-[11px] text-text-muted uppercase">Epoch</div>
                <div className="font-mono text-xs font-semibold text-text-primary mt-0.5">60 / 60</div>
              </div>
              <div>
                <div className="font-mono text-[11px] text-text-muted uppercase">Loss</div>
                <div className="font-mono text-xs font-semibold text-accent mt-0.5">0.082</div>
              </div>
              <div>
                <div className="font-mono text-[11px] text-text-muted uppercase">PR-AUC</div>
                <div className="font-mono text-xs font-semibold text-text-primary mt-0.5">0.940</div>
              </div>
              <div>
                <div className="font-mono text-[11px] text-text-muted uppercase">Status</div>
                <div className="font-mono text-xs font-semibold text-live mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-live" />
                  <span>Optimal</span>
                </div>
              </div>
            </div>

            <div className="mt-3 text-xs text-text-muted">
              Audited with in-fold cross-validation to guarantee zero data leakage between training splits and evaluation metrics.
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
