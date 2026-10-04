import React, { useState } from 'react';
import { Network, Eye, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCategory } from '../../lib/types';

interface EmbeddingMapProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
}

export const EmbeddingMap: React.FC<EmbeddingMapProps> = ({ projects, onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  // Cluster centers for categorized projection
  const clusterCenters: Record<ProjectCategory, { x: number; y: number }> = {
    vision: { x: 28, y: 32 },
    nlp: { x: 42, y: 72 },
    predictive: { x: 72, y: 62 },
    fullstack: { x: 68, y: 30 }
  };

  const getCoordinates = (project: Project) => {
    if (activeFilter === 'all') {
      return project.embedding;
    }
    if (project.category === activeFilter) {
      const center = clusterCenters[activeFilter];
      const offset = (project.title.charCodeAt(0) % 7) * 4 - 12;
      const offsetY = (project.title.length % 5) * 4 - 8;
      return { x: center.x + offset, y: center.y + offsetY };
    }
    return project.embedding;
  };

  const getCategoryColor = (cat: ProjectCategory) => {
    switch (cat) {
      case 'vision': return '#6366F1'; // Electric Indigo
      case 'nlp': return '#22D3EE';    // Cyan
      case 'predictive': return '#34D399'; // Emerald
      case 'fullstack': return '#38BDF8';  // Sky
      default: return '#818CF8';
    }
  };

  return (
    <div className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-xl mb-12">
      
      {/* Header & Cluster Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#6366F1] font-semibold uppercase tracking-wider mb-1">
            <Network className="w-3.5 h-3.5" />
            <span>Interactive 2D Embedding Space</span>
          </div>
          <p className="text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#667085]">
            Projects projected across semantic similarity axes. Click any node to open its full engineering case study.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {[
            { id: 'all', label: 'All Modalities' },
            { id: 'vision', label: 'Computer Vision' },
            { id: 'nlp', label: 'NLP' },
            { id: 'predictive', label: 'Predictive ML' },
            { id: 'fullstack', label: 'Full-Stack' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id as any)}
              className={`px-3 py-1 rounded-lg text-xs transition-all border ${
                activeFilter === btn.id
                  ? 'border-[#6366F1] bg-[#6366F1]/15 text-[#818CF8] font-semibold'
                  : 'border-white/[0.06] bg-[#0D1014] text-[#9AA4B2] hover:text-white'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2D Coordinate Space */}
      <div className="relative w-full h-72 sm:h-96 rounded-xl border border-white/[0.06] bg-[#08090B] overflow-hidden">
        
        {/* Subtle grid background */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          {/* Subtle centroid axes */}
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(99,102,241,0.15)" strokeDasharray="3 3" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(99,102,241,0.15)" strokeDasharray="3 3" />
        </svg>

        {/* Modality Legend Tags */}
        <div className="absolute top-3 left-3 hidden sm:flex items-center gap-3 font-mono text-[10px] text-[#667085] bg-[#0D1014]/90 px-3 py-1 rounded-lg border border-white/[0.06] backdrop-blur-sm">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#6366F1]" /> Vision</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#22D3EE]" /> NLP</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#34D399]" /> Predictive</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#38BDF8]" /> Full-Stack</span>
        </div>

        {/* Dynamic Project Nodes */}
        {projects.map((proj) => {
          const coords = getCoordinates(proj);
          const isDimmed = activeFilter !== 'all' && proj.category !== activeFilter;
          const isHighlighted = activeFilter === proj.category;
          const dotColor = getCategoryColor(proj.category);

          return (
            <motion.button
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              onMouseEnter={() => setHoveredProject(proj)}
              onMouseLeave={() => setHoveredProject(null)}
              animate={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
                opacity: isDimmed ? 0.2 : 1,
                scale: isHighlighted ? 1.25 : 1
              }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 15,
                mass: 0.8
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-2 group cursor-pointer focus:outline-none z-10"
              aria-label={`Project: ${proj.title}`}
            >
              <span className="relative flex items-center justify-center">
                <span
                  className="absolute w-7 h-7 rounded-full opacity-0 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: dotColor }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border-2 border-[#08090B] shadow-md transition-transform group-hover:scale-125"
                  style={{ backgroundColor: dotColor }}
                />
              </span>

              {/* Node Title */}
              <span className="hidden sm:block absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[#9AA4B2] group-hover:text-white whitespace-nowrap transition-colors bg-[#0D1014]/80 px-1.5 py-0.5 rounded border border-white/[0.04]">
                {proj.title}
              </span>
            </motion.button>
          );
        })}

        {/* Hover Tooltip Card */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 6 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-4 right-4 p-4 rounded-xl border border-white/10 bg-[#0D1014]/95 backdrop-blur-md shadow-2xl max-w-sm pointer-events-none z-20"
            >
              <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                <span className="font-semibold text-[#818CF8] uppercase">
                  {hoveredProject.categoryLabel}
                </span>
                <span className="text-emerald-400 font-medium">Click to inspect</span>
              </div>
              <div className="text-sm font-bold text-white mb-1">
                {hoveredProject.title}
              </div>
              <p className="text-xs text-[#9AA4B2] leading-relaxed line-clamp-2">
                {hoveredProject.tagline}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
