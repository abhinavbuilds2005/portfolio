import React, { useState } from 'react';
import { Project, ProjectCategory } from '../../lib/types';
import { PROJECTS } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { EmbeddingMap } from './EmbeddingMap';
import { CaseStudyModal } from './CaseStudyModal';
import { ArrowRight, Sparkles, ExternalLink, Github, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectsSectionProps {
  activeCaseStudyId: string | null;
  onOpenCaseStudy: (projectId: string) => void;
  onCloseCaseStudy: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  activeCaseStudyId,
  onOpenCaseStudy,
  onCloseCaseStudy
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | ProjectCategory>('ALL');

  // Flagship project: DocuShield AI
  const flagshipProject = PROJECTS[0];
  // Next 2 core projects: CreditWise & ATS Resume Analyzer
  const coreProjects = PROJECTS.slice(1, 3);
  
  // Filtered remaining or all projects
  const filteredProjects = selectedFilter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedFilter);

  const activeProject = PROJECTS.find((p) => p.id === activeCaseStudyId) || null;

  return (
    <section id="projects" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
      
      {/* Section Headline */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-[#6366F1] font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Engineering Portfolio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] mb-4">
          Selected AI Systems
        </h2>
        <p className="text-base text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
          A selection of machine learning systems engineered from data preparation, exploratory modeling, and statistical evaluation to containerized deployment.
        </p>
      </div>

      {/* Flagship Case Study Presentation: DocuShield AI (Large Hero Card) */}
      <div className="mb-10">
        <div className="p-7 sm:p-9 rounded-2xl border border-[#6366F1]/30 bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-2xl relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#6366F1]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-[#6366F1]/15 text-[#818CF8] border border-[#6366F1]/30 font-semibold uppercase">
                  Flagship System // SIH 2026
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live On Render
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] tracking-tight">
                DocuShield AI: Multimodal Forensic Screening
              </h3>

              <p className="text-sm text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
                An enterprise-grade document authenticity screening system engineered for Smart India Hackathon (Problem SIH26188). Verifies document integrity across 5 core categories by extracting layout tokens, detecting image splicing via Error Level Analysis (ELA 95%), computing ICAO Doc 9303 check digits, and cross-matching live facial biometrics.
              </p>

              {/* Problem / Approach / Result Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-sans">
                <div className="p-3 rounded-lg bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] border border-white/[0.04]">
                  <div className="text-[10px] font-mono text-[#667085] uppercase tracking-wider mb-1">Problem</div>
                  <div className="text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] leading-snug">
                    Digital document forgery deceives conventional OCR systems.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] border border-white/[0.04]">
                  <div className="text-[10px] font-mono text-[#6366F1] uppercase tracking-wider mb-1">Approach</div>
                  <div className="text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] leading-snug">
                    5-tier hierarchical multimodal fusion: ELA + ICAO + Biometrics.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] border border-white/[0.04]">
                  <div className="text-[10px] font-mono text-[#34D399] uppercase tracking-wider mb-1">Result</div>
                  <div className="text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] leading-snug">
                    100% check digit coverage & calibrated 0–100% risk scoring.
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {flagshipProject.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.08] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] text-[#9AA4B2]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                {flagshipProject.liveUrl && (
                  <a
                    href={flagshipProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-all shadow-subtle-glow"
                  >
                    <span>Launch Live System</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {flagshipProject.repoUrl && (
                  <a
                    href={flagshipProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium border border-white/10 dark:border-white/10 light:border-black/10 hover:border-white/25 bg-[#151B22] dark:bg-[#151B22] light:bg-white text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] transition-colors"
                  >
                    <Github className="w-4 h-4 text-[#9AA4B2]" />
                    <span>View Source Code</span>
                  </a>
                )}

                <button
                  onClick={() => onOpenCaseStudy(flagshipProject.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-medium border border-white/10 hover:border-[#6366F1]/50 text-white transition-colors ml-auto sm:ml-0"
                >
                  <span>Explore Deep Case Study</span>
                  <ArrowRight className="w-4 h-4 text-[#6366F1]" />
                </button>
              </div>
            </div>

            {/* Right Showcase Image (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#08090B] shadow-2xl">
                <div className="px-3 py-2 bg-[#0D1014] border-b border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#667085]">
                  <span>docushield-forensics.internal</span>
                  <span>ELA Tamper Heatmap Inspector</span>
                </div>
                <img
                  src={flagshipProject.image}
                  alt={flagshipProject.title}
                  className="w-full h-64 object-cover object-top hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Projects Row: CreditWise & ATS Resume Analyzer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {coreProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenCaseStudy={onOpenCaseStudy}
            isFeaturedLarge={false}
          />
        ))}
      </div>

      {/* 2D Latent Embedding Scatter Map */}
      <EmbeddingMap
        projects={PROJECTS}
        onSelectProject={onOpenCaseStudy}
      />

      {/* Complete Project Index & Filtering */}
      <div className="mt-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
          <div>
            <h3 className="text-xl font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]">
              Complete Project Directory
            </h3>
            <p className="text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#667085] mt-0.5">
              Filter by model domain and engineering architecture
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {[
              { id: 'ALL', label: 'All Projects' },
              { id: 'vision', label: 'Vision & Forensics' },
              { id: 'predictive', label: 'Predictive ML' },
              { id: 'nlp', label: 'NLP & GenAI' },
              { id: 'fullstack', label: 'Full-Stack' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedFilter(btn.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${
                  selectedFilter === btn.id
                    ? 'border-[#6366F1] bg-[#6366F1]/15 text-[#818CF8] font-semibold'
                    : 'border-white/[0.06] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] text-[#9AA4B2] hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={onOpenCaseStudy}
              isFeaturedLarge={false}
            />
          ))}
        </div>
      </div>

      {/* Deep Case Study Modal */}
      <CaseStudyModal
        project={activeProject}
        onClose={onCloseCaseStudy}
      />

    </section>
  );
};
