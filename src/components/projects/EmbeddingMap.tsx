import React, { useState } from 'react';
import { Network, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCategory } from '../../lib/types';

interface EmbeddingMapProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
}

export const EmbeddingMap: React.FC<EmbeddingMapProps> = ({ projects, onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  // Cluster centers for categorized filter
  const clusterCenters: Record<ProjectCategory, { x: number; y: number }> = {
    vision: { x: 26, y: 34 },
    nlp: { x: 38, y: 72 },
    predictive: { x: 74, y: 64 },
    fullstack: { x: 68, y: 28 }
  };

  const getCoordinates = (project: Project) => {
    if (activeFilter === 'all') {
      return project.embedding;
    }
    if (project.category === activeFilter) {
      const center = clusterCenters[activeFilter];
      // Deterministic slight displacement so multiple dots in the same cluster don't completely overlap
      const offset = (project.title.charCodeAt(0) % 7) * 4 - 12;
      const offsetY = (project.title.length % 5) * 4 - 8;
      return { x: center.x + offset, y: center.y + offsetY };
    }
    // Non-matching dots scatter outward slightly
    return project.embedding;
  };

  return (
    <div className="p-5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm mb-10 card-hover-lift">
      
      {/* Header & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-xs text-[#e58b24] font-semibold">
            <Network className="w-3.5 h-3.5" />
            <span>2D LATENT EMBEDDING MAP (PROJECT CLUSTERS)</span>
          </div>
          <p className="text-xs text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] mt-0.5">
            Click filter tags to smoothly move project vectors into semantic clusters via spring physics.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-1 font-mono text-xs">
          {[
            { id: 'all', label: 'All Clusters' },
            { id: 'vision', label: 'Vision' },
            { id: 'nlp', label: 'NLP' },
            { id: 'predictive', label: 'Predictive' },
            { id: 'fullstack', label: 'Full-Stack' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id as any)}
              className={`px-2.5 py-1 rounded text-[11px] transition-all border ${
                activeFilter === btn.id
                  ? 'border-[#e58b24] bg-[#e58b24]/15 text-[#e58b24] font-semibold'
                  : 'border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] text-[#a8a29e] hover:text-[#f5f2eb]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2D Scatter Space */}
      <div className="relative w-full h-64 sm:h-80 rounded border border-[#2b2a27] bg-[#121212] overflow-hidden">
        
        {/* Subtle coordinate grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#3f3e3b" strokeDasharray="3 3" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#3f3e3b" strokeDasharray="3 3" />
          <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#3f3e3b" strokeDasharray="3 3" />
          <line x1="0" y1="33%" x2="100%" y2="33%" stroke="#3f3e3b" strokeDasharray="3 3" />
          <line x1="0" y1="66%" x2="100%" y2="66%" stroke="#3f3e3b" strokeDasharray="3 3" />
        </svg>

        {/* Axis labels */}
        <div className="absolute bottom-2 left-3 font-mono text-[9px] text-[#78716c] uppercase">
          PCA Dim 1: Model Modality & Input Space →
        </div>
        <div className="absolute top-3 left-3 font-mono text-[9px] text-[#78716c] uppercase">
          ↑ PCA Dim 2: Task Complexity
        </div>

        {/* Smoothly animated project scatter dots using Framer Motion */}
        {projects.map((proj) => {
          const coords = getCoordinates(proj);
          const isDimmed = activeFilter !== 'all' && proj.category !== activeFilter;
          const isHighlighted = activeFilter === proj.category;

          return (
            <motion.button
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              onMouseEnter={() => setHoveredProject(proj)}
              onMouseLeave={() => setHoveredProject(null)}
              animate={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
                opacity: isDimmed ? 0.25 : 1,
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
              {/* Pulsing ring on hover or flagship */}
              <span className="relative flex items-center justify-center">
                <span
                  className={`absolute w-6 h-6 rounded-full transition-opacity ${
                    proj.id === 'docushield'
                      ? 'bg-[#e58b24]/30 animate-ping'
                      : 'bg-[#a8a29e]/20 group-hover:opacity-100 opacity-0'
                  }`}
                />
                <span
                  className={`w-3.5 h-3.5 rounded-full border-2 border-[#121212] transition-colors shadow-md ${
                    proj.id === 'docushield'
                      ? 'bg-[#e58b24]'
                      : isHighlighted
                      ? 'bg-[#e58b24]'
                      : 'bg-[#a8a29e] group-hover:bg-[#e58b24]'
                  }`}
                />
              </span>

              {/* Minimal inline label */}
              <span className="hidden sm:block absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#78716c] group-hover:text-[#f5f2eb] whitespace-nowrap transition-colors">
                {proj.title}
              </span>
            </motion.button>
          );
        })}

        {/* Interactive Tooltip Card */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-4 right-4 p-3 rounded border border-[#e58b24]/50 bg-[#161616]/95 backdrop-blur-md shadow-xl max-w-xs pointer-events-none z-20"
            >
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#e58b24] uppercase mb-1">
                <Eye className="w-3 h-3" />
                <span>{hoveredProject.categoryLabel}</span>
              </div>
              <div className="text-sm font-bold text-[#f5f2eb] mb-1">
                {hoveredProject.title}
              </div>
              <div className="text-xs text-[#a8a29e] leading-snug line-clamp-2">
                {hoveredProject.tagline}
              </div>
              <div className="font-mono text-[10px] text-[#78716c] mt-2">
                Click dot to inspect case study
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
