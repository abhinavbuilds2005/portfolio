import React, { useState } from 'react';
import { Project, ProjectCategory } from '../../lib/types';
import { PROJECTS } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { EmbeddingMap } from './EmbeddingMap';
import { CaseStudyModal } from './CaseStudyModal';
import { FolderGit2 } from 'lucide-react';

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

  // Top 3 strongest projects: DocuShield AI, CreditWise, ATS Resume Analyzer
  const topThreeProjects = PROJECTS.slice(0, 3);
  
  // Filtered remaining or all projects
  const filteredProjects = selectedFilter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedFilter);

  const activeProject = PROJECTS.find((p) => p.id === activeCaseStudyId) || null;

  return (
    <section id="projects" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#2b2a27]/60">
      
      {/* Section Meta Header */}
      <div className="flex items-center justify-between py-2 border-b border-[#2b2a27]/60 mb-8 font-mono text-[11px] text-[#78716c]">
        <div className="flex items-center gap-2">
          <span className="text-[#e58b24] font-semibold">[02]</span>
          <span className="uppercase tracking-wider">PROJECTS // VERIFIED REPOSITORIES</span>
        </div>
        <div>
          <span>{PROJECTS.length} SYSTEMS DEPLOYED / ACTIVE</span>
        </div>
      </div>

      {/* Section Headline */}
      <div className="max-w-3xl mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-3">
          Selected Engineering Work
        </h2>
        <p className="text-sm sm:text-base text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed">
          Production-grade machine learning pipelines, forensic document screening platforms, and generative NLP engines. Built with verifiable statistical benchmarks and clean full-stack interfaces.
        </p>
      </div>

      {/* Top 3 Strongest Projects Above Fold */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4 font-mono text-xs text-[#e58b24] font-semibold">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>PRIMARY PRODUCTION SYSTEMS (CORE 3)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topThreeProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={onOpenCaseStudy}
              isPriority={true}
            />
          ))}
        </div>
      </div>

      {/* 2D Latent Embedding Scatter Map */}
      <EmbeddingMap
        projects={PROJECTS}
        onSelectProject={onOpenCaseStudy}
      />

      {/* Complete Project Index & Filtering */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-[#2b2a27]/60">
          <h3 className="text-lg font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
            Complete System Index
          </h3>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1 font-mono text-xs">
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
                className={`px-3 py-1 rounded text-xs transition-colors border ${
                  selectedFilter === btn.id
                    ? 'border-[#e58b24] bg-[#e58b24]/15 text-[#e58b24] font-semibold'
                    : 'border-[#2b2a27] bg-[#161616] text-[#a8a29e] hover:text-[#f5f2eb]'
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
              isPriority={false}
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
