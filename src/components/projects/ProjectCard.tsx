import React from 'react';
import { ExternalLink, Github, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '../../lib/types';
import { MagneticButton } from '../shared/MagneticButton';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (projectId: string) => void;
  isPriority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
  isPriority = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`flex flex-col justify-between rounded border ${
        isPriority
          ? 'border-[#e58b24]/40 dark:border-[#e58b24]/40 light:border-[#c84b31]/40 shadow-sm'
          : 'border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5]'
      } bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] overflow-hidden group hover:border-[#e58b24]/60 transition-all duration-200 card-hover-lift`}
    >
      <div>
        {/* Project Thumbnail Image */}
        <div className="relative w-full h-44 sm:h-48 bg-[#121212] overflow-hidden border-b border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 opacity-90 group-hover:opacity-100"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-[#121212]/85 backdrop-blur-md font-mono text-[10px] text-[#e58b24] border border-[#2b2a27]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e58b24] animate-pulse"></span>
            {project.status}
          </div>
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-[#121212]/85 backdrop-blur-md font-mono text-[10px] text-[#a8a29e] border border-[#2b2a27]">
            {project.categoryLabel}
          </div>
        </div>

        {/* Content body */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-1.5 group-hover:text-[#e58b24] transition-colors">
            {project.title}
          </h3>

          <p className="text-xs text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] line-clamp-2 leading-relaxed mb-3">
            {project.tagline}
          </p>

          {/* Outcome Line (Crucial requirement) */}
          <div className="p-2.5 rounded bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] border border-[#2b2a27]/80 dark:border-[#2b2a27]/80 light:border-[#e6dfd5] mb-3.5">
            <div className="font-mono text-[9px] text-[#e58b24] uppercase tracking-wider mb-0.5 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Target Outcome</span>
            </div>
            <p className="text-[11px] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] leading-snug">
              {project.outcome}
            </p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="px-1.5 py-0.5 rounded font-mono text-[10px] border border-[#2b2a27] bg-[#121212] dark:bg-[#121212] light:bg-[#ffffff] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c]"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="font-mono text-[10px] text-[#78716c] self-center">
                +{project.tech.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action links */}
      <div className="p-5 pt-0 flex items-center justify-between border-t border-[#2b2a27]/60 pt-3">
        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <MagneticButton
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded text-xs font-mono font-medium tracking-wide bg-[#e58b24] hover:bg-[#d97706] text-[#121212] transition-colors"
            >
              <span className="flex items-center gap-1">
                <span>Demo</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </MagneticButton>
          )}

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-medium border border-[#2b2a27] bg-[#161616] text-[#a8a29e] hover:text-[#f5f2eb] transition-all hover:scale-[1.02]"
              title="View Source on GitHub"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Code</span>
            </a>
          )}
        </div>

        <button
          onClick={() => onOpenCaseStudy(project.id)}
          className="inline-flex items-center gap-1 font-mono text-xs text-[#a8a29e] hover:text-[#e58b24] transition-all hover:scale-[1.02] ml-auto"
        >
          <span>Case Study</span>
          <ArrowRight className="w-3 h-3 text-[#e58b24]" />
        </button>
      </div>

    </motion.div>
  );
};
