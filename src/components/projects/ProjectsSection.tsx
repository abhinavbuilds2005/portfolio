import React from 'react';
import { ExternalLink, Github, ArrowRight, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Project } from '../../lib/types';
import { PROJECTS } from '../../data/projects';
import { CaseStudyModal } from './CaseStudyModal';
import { EmbeddingMap } from './EmbeddingMap';

interface ProjectsSectionProps {
  activeCaseStudyId: string | null;
  onOpenCaseStudy: (projectId: string) => void;
  onCloseCaseStudy: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  activeCaseStudyId,
  onOpenCaseStudy,
  onCloseCaseStudy,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Primary flagship: DocuShield
  const docushield = PROJECTS.find((p) => p.id === 'docushield') || PROJECTS[0];
  
  // Secondary core featured pair: CreditWise & ATS Resume Analyzer
  const corePair = PROJECTS.filter((p) => p.id === 'creditwise' || p.id === 'ats-resume-analyzer');

  // More Projects (non-repeating): SmartCart AI & AttendPro
  const moreProjects = PROJECTS.filter((p) => p.id === 'smartcart' || p.id === 'attendpro');

  const activeProject = PROJECTS.find((p) => p.id === activeCaseStudyId) || null;

  return (
    <section id="projects" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border-subtle">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="font-mono text-xs uppercase tracking-wide text-accent mb-2">
            Selected Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Featured Engineering Systems
          </h2>
        </div>
        <p className="text-sm text-text-secondary max-w-md">
          Production-grade machine learning pipelines, forensic document screening, and resilient AI architectures with verified statistical benchmarks.
        </p>
      </div>

      {/* 1. Large Flagship Card: DocuShield AI */}
      <div className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="rounded-lg border border-border-strong bg-surface overflow-hidden card-hover"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Screenshot side (5 cols on lg) */}
            <div className="lg:col-span-5 relative bg-base border-b lg:border-b-0 lg:border-r border-border-subtle flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <img
                src={docushield.image}
                alt="DocuShield AI Forensic Screening Interface"
                className="w-full h-auto max-h-80 object-contain rounded-md border border-border-subtle shadow-md"
                width={560}
                height={360}
                loading="eager"
              />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded bg-base/90 backdrop-blur-md border border-border-subtle font-mono text-xs text-live">
                <span className="w-1.5 h-1.5 rounded-full bg-live animate-live-pulse" />
                <span>Verified Live System</span>
              </div>
            </div>

            {/* Content side (7 cols on lg) */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs text-text-muted">
                  <span className="text-accent font-semibold">FLAGSHIP SYSTEM</span>
                  <span>•</span>
                  <span>{docushield.categoryLabel}</span>
                  <span>•</span>
                  <span className="text-text-secondary">SIH 2026</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                  {docushield.title}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {docushield.summary}
                </p>

                {/* Problem, Approach, Outcome summary points */}
                <div className="space-y-2.5 text-xs rounded-md bg-elevated p-4 border border-border-subtle mb-5">
                  <div>
                    <span className="font-mono text-accent font-semibold mr-1.5">Problem:</span>
                    <span className="text-text-secondary">{docushield.problem}</span>
                  </div>
                  <div>
                    <span className="font-mono text-accent font-semibold mr-1.5">Approach:</span>
                    <span className="text-text-secondary">{docushield.approach}</span>
                  </div>
                  <div>
                    <span className="font-mono text-live font-semibold mr-1.5">Result:</span>
                    <span className="text-text-primary font-medium">{docushield.outcome}</span>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {docushield.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded font-mono text-xs border border-border-subtle bg-base text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border-subtle">
                <div className="flex items-center gap-2.5">
                  <a
                    href={docushield.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium bg-accent hover:bg-accent-hover text-base transition-colors"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={docushield.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-medium border border-border-subtle hover:border-border-strong bg-base text-text-primary hover:text-accent transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                </div>

                <button
                  onClick={() => onOpenCaseStudy(docushield.id)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-accent hover:underline cursor-pointer"
                >
                  <span>Case Study & Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. Secondary Core Work: CreditWise & ATS Resume Analyzer (2 equal cards beneath) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {corePair.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : idx * 0.1, ease: 'easeOut' }}
            className="rounded-lg border border-border-subtle bg-surface flex flex-col justify-between overflow-hidden card-hover"
          >
            <div>
              {/* Screenshot */}
              <div className="relative w-full h-48 sm:h-52 bg-base border-b border-border-subtle overflow-hidden p-3 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain rounded border border-border-subtle"
                  width={480}
                  height={280}
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-base/90 border border-border-subtle font-mono text-xs text-live">
                  <span className="w-1.5 h-1.5 rounded-full bg-live animate-live-pulse" />
                  <span>Live</span>
                </div>
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-base/90 border border-border-subtle font-mono text-xs text-text-muted">
                  {project.categoryLabel}
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                  {project.tagline}
                </p>

                {/* One-line outcome */}
                <div className="text-xs text-text-primary bg-elevated p-3 rounded border border-border-subtle mb-4">
                  <span className="font-mono text-live font-semibold mr-1">Outcome:</span>
                  {project.outcome}
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded font-mono text-xs border border-border-subtle bg-base text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-6 pt-0 flex items-center justify-between border-t border-border-subtle pt-4">
              <div className="flex items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium bg-accent hover:bg-accent-hover text-base transition-colors"
                  >
                    <span>Live</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium border border-border-subtle hover:border-border-strong bg-base text-text-primary hover:text-accent transition-colors"
                  >
                    <Github className="w-3 h-3" />
                    <span>Code</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => onOpenCaseStudy(project.id)}
                className="text-xs font-mono text-accent hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Case study</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. More Projects (Clean 2-Column Grid for SmartCart & AttendPro) */}
      <div className="pt-8 border-t border-border-subtle">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
              Additional Deployed Systems
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              Unsupervised clustering algorithms and multimodal biometric attendance platforms.
            </p>
          </div>
          <span className="font-mono text-xs text-text-muted">
            {moreProjects.length} Systems
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moreProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : idx * 0.1, ease: 'easeOut' }}
              className="rounded-lg border border-border-subtle bg-surface flex flex-col justify-between overflow-hidden card-hover"
            >
              <div>
                <div className="relative w-full h-44 bg-base border-b border-border-subtle overflow-hidden p-3 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain rounded border border-border-subtle"
                    width={400}
                    height={220}
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-base/90 border border-border-subtle font-mono text-xs text-live">
                    <span className="w-1.5 h-1.5 rounded-full bg-live" />
                    <span>Live</span>
                  </div>
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-base/90 border border-border-subtle font-mono text-xs text-text-muted">
                    {project.categoryLabel}
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="text-lg font-bold text-text-primary mb-1.5">
                    {project.title}
                  </h4>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-xs text-text-primary bg-elevated p-2.5 rounded border border-border-subtle mb-3">
                    <span className="font-mono text-live font-semibold mr-1">Outcome:</span>
                    {project.outcome}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded font-mono text-xs border border-border-subtle bg-base text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-border-subtle pt-3">
                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-accent hover:bg-accent-hover text-base transition-colors"
                    >
                      <span>Live</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border border-border-subtle hover:border-border-strong bg-base text-text-primary hover:text-accent transition-colors"
                    >
                      <Github className="w-3 h-3" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => onOpenCaseStudy(project.id)}
                  className="text-xs font-mono text-accent hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Case study</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Interactive 2D Latent Embedding Scatter Map */}
      <div className="mt-14 pt-10 border-t border-border-subtle">
        <EmbeddingMap
          projects={PROJECTS}
          onSelectProject={onOpenCaseStudy}
        />
      </div>

      {/* Case Study Modal */}
      {activeProject && (
        <CaseStudyModal
          project={activeProject}
          isOpen={!!activeProject}
          onClose={onCloseCaseStudy}
        />
      )}

    </section>
  );
};
