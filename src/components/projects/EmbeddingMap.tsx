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
      const offset = (project.title.charCodeAt(0) % 7) * 4 - 12;
      const offsetY = (project.title.length % 5) * 4 - 8;
      return { x: center.x + offset, y: center.y + offsetY };
    }
    return project.embedding;
  };

  return (
    <div className="p-6 rounded-lg border border-border-subtle bg-surface shadow-sm">
      
      {/* Header & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-xs text-accent font-semibold">
            <Network className="w-4 h-4" />
            <span>2D LATENT EMBEDDING SPACE (PROJECT CLUSTERS)</span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Click filter tags to observe semantic projection clustering via spring dynamics.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
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
              className={`px-3 py-1 rounded-md text-xs transition-all border ${
                activeFilter === btn.id
                  ? 'border-accent bg-accent/15 text-accent font-semibold'
                  : 'border-border-subtle bg-base text-text-secondary hover:text-text-primary'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2D Scatter Space */}
      <div className="relative w-full h-72 sm:h-88 rounded-lg border border-border-subtle bg-base overflow-hidden">
        
        {/* Subtle coordinate grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="var(--border-strong)" strokeDasharray="3 3" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--border-strong)" strokeDasharray="3 3" />
          <line x1="75%" y1="0" x2="75%" y2="100%" stroke="var(--border-strong)" strokeDasharray="3 3" />
          <line x1="0" y1="33%" x2="100%" y2="33%" stroke="var(--border-strong)" strokeDasharray="3 3" />
          <line x1="0" y1="66%" x2="100%" y2="66%" stroke="var(--border-strong)" strokeDasharray="3 3" />
        </svg>

        {/* Axis labels */}
        <div className="absolute bottom-3 left-3 font-mono text-xs text-text-muted uppercase">
          PCA Axis 1: Input Modality & Token Space →
        </div>
        <div className="absolute top-3 left-3 font-mono text-xs text-text-muted uppercase">
          ↑ PCA Axis 2: Architectural Complexity
        </div>

        {/* Scatter dots */}
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
              aria-label={`Inspect ${proj.title}`}
            >
              <span className="relative flex items-center justify-center">
                <span
                  className={`w-4 h-4 rounded-full border-2 border-base transition-colors shadow-md ${
                    proj.id === 'docushield'
                      ? 'bg-accent ring-2 ring-accent/30'
                      : isHighlighted
                      ? 'bg-accent'
                      : 'bg-text-secondary group-hover:bg-accent'
                  }`}
                />
              </span>

              {/* Minimal inline label */}
              <span className="hidden sm:block absolute top-5 left-1/2 -translate-x-1/2 font-mono text-xs text-text-muted group-hover:text-text-primary whitespace-nowrap transition-colors">
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
              className="absolute bottom-4 right-4 p-4 rounded-lg border border-accent/40 bg-surface/95 backdrop-blur-md shadow-xl max-w-sm pointer-events-none z-20"
            >
              <div className="flex items-center gap-1.5 font-mono text-xs text-accent uppercase mb-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{hoveredProject.categoryLabel}</span>
              </div>
              <div className="text-sm font-bold text-text-primary mb-1">
                {hoveredProject.title}
              </div>
              <div className="text-xs text-text-secondary leading-snug line-clamp-2">
                {hoveredProject.tagline}
              </div>
              <div className="font-mono text-xs text-accent mt-2">
                Click dot to inspect case study →
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
