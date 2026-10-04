import React from 'react';
import { ExternalLink, Github, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '../../lib/types';
import { TiltCard } from '../shared/TiltCard';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (projectId: string) => void;
  isFeaturedLarge?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
  isFeaturedLarge = false,
}) => {
  return (
    <TiltCard maxTilt={1.2} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`flex flex-col justify-between h-full rounded-xl border ${
          isFeaturedLarge
            ? 'border-[#6366F1]/30 bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-xl'
            : 'border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white'
        } overflow-hidden group hover:border-white/20 dark:hover:border-white/20 light:hover:border-black/20 transition-all duration-300 card-hover-lift`}
      >
        <div>
          {/* Subtle Browser Window Frame Treatment */}
          <div className="px-4 py-2 bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] flex items-center justify-between font-mono text-[10px] text-[#667085]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="ml-2 font-mono uppercase tracking-wider text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]">
                {project.categoryLabel}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{project.status}</span>
            </div>
          </div>

          {/* Project Screenshot with Controlled Zoom & Gradient Overlay */}
          <div className={`relative w-full ${isFeaturedLarge ? 'h-56 sm:h-64' : 'h-44 sm:h-48'} bg-[#08090B] overflow-hidden`}>
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 opacity-90 group-hover:opacity-100"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {/* Subtle bottom fade gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#11151A] via-transparent to-transparent opacity-80" />
          </div>

          {/* Content Body */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] mb-2 tracking-tight group-hover:text-[#6366F1] group-hover:translate-x-0.5 transition-all duration-200">
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed mb-4">
              {project.tagline}
            </p>

            {/* Problem & Approach Quick Insight */}
            <div className="space-y-2 mb-4 text-xs">
              <div className="p-2.5 rounded-lg bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] border border-white/[0.04]">
                <div className="text-[10px] font-mono text-[#667085] uppercase tracking-wider mb-0.5 font-semibold">
                  Problem & Constraints
                </div>
                <p className="text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] line-clamp-2 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Result / Outcome Line */}
              <div className="p-2.5 rounded-lg bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] border border-white/[0.04]">
                <div className="text-[10px] font-mono text-[#22D3EE] uppercase tracking-wider mb-0.5 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#22D3EE]" />
                  <span>Engineered Result</span>
                </div>
                <p className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-medium leading-relaxed line-clamp-2">
                  {project.outcome}
                </p>
              </div>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.06] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]"
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 5 && (
                <span className="font-mono text-[10px] text-[#667085] self-center">
                  +{project.tech.length - 5}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-0 flex items-center justify-between border-t border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] pt-4 mt-2">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-colors"
              >
                <span>Live App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 dark:border-white/10 light:border-black/10 hover:border-white/20 bg-[#151B22] dark:bg-[#151B22] light:bg-white text-[#9AA4B2] hover:text-white transition-colors"
                title="View Source on GitHub"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}
          </div>

          <button
            onClick={() => onOpenCaseStudy(project.id)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9AA4B2] hover:text-white transition-colors group/cta ml-auto"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#6366F1] group-hover/cta:translate-x-1 transition-transform" />
          </button>
        </div>

      </motion.div>
    </TiltCard>
  );
};
