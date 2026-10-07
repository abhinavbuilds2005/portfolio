import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Terminal, 
  Brain, 
  Eye, 
  Sparkles, 
  Server, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw,
  Code2,
  Sigma,
  Wrench,
  ExternalLink
} from 'lucide-react';
import { 
  SKILLS_ECOSYSTEM, 
  SKILL_CATEGORIES, 
  SkillCategory, 
  SkillItem 
} from '../../data/skills';
import { PROJECTS } from '../../data/projects';

interface SystemsKnowledgeMapProps {
  onOpenCaseStudy?: (projectId: string) => void;
}

export const SystemsKnowledgeMap: React.FC<SystemsKnowledgeMapProps> = ({ onOpenCaseStudy }) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('ALL');
  const [selectedSkillId, setSelectedSkillId] = useState<string>('python');

  // Filter skills by category
  const filteredSkills = activeCategory === 'ALL'
    ? SKILLS_ECOSYSTEM
    : SKILLS_ECOSYSTEM.filter((s) => s.category === activeCategory);

  // Group filtered skills by category
  const groupedCategories = SKILL_CATEGORIES.filter((c) => c.id !== 'ALL').filter((cat) => {
    return filteredSkills.some((s) => s.category === cat.id);
  });

  const selectedSkill: SkillItem | undefined = 
    SKILLS_ECOSYSTEM.find((s) => s.id === selectedSkillId) || SKILLS_ECOSYSTEM[0];

  const linkedProjects = PROJECTS.filter((p) => selectedSkill?.projects.includes(p.id));

  const getCategoryIcon = (catId: SkillCategory) => {
    switch (catId) {
      case 'FOUNDATIONS':
        return <Terminal className="w-3.5 h-3.5" />;
      case 'ML':
        return <Brain className="w-3.5 h-3.5" />;
      case 'DL_VISION':
        return <Eye className="w-3.5 h-3.5" />;
      case 'NLP_GENAI':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'SYSTEMS':
        return <Server className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="mb-12">
      {/* Header bar with category filter chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-accent font-semibold mb-1">
            <Layers className="w-4 h-4" />
            <span>AI SYSTEMS KNOWLEDGE MAP // 22 VERIFIED CAPABILITIES</span>
          </div>
          <p className="text-xs text-text-secondary">
            Interactive technical ecosystem. Select any skill node to inspect mathematical formulations and linked project implementations.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-accent text-base font-semibold shadow-sm'
                    : 'bg-surface text-text-secondary hover:text-text-primary border border-border-subtle hover:border-border-strong'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
              </button>
            );
          })}

          {activeCategory !== 'ALL' && (
            <button
              onClick={() => setActiveCategory('ALL')}
              className="p-1.5 rounded-md border border-border-subtle bg-surface text-text-muted hover:text-text-primary"
              title="Reset Filter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Interactive Skill Matrix (7 cols) + Telemetry Inspector (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Skill Nodes Matrix (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {groupedCategories.map((group) => {
            const groupSkills = filteredSkills.filter((s) => s.category === group.id);
            if (groupSkills.length === 0) return null;

            return (
              <div
                key={group.id}
                className="p-5 rounded-lg border border-border-subtle bg-surface transition-all"
              >
                {/* Domain Category Header */}
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-text-primary">
                    <span className="text-accent">{getCategoryIcon(group.id)}</span>
                    <span className="uppercase tracking-wide">{group.label}</span>
                  </div>
                  <span className="font-mono text-xs text-text-muted">
                    {groupSkills.length} NODES
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {groupSkills.map((skill) => {
                    const isSelected = selectedSkillId === skill.id;
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => setSelectedSkillId(skill.id)}
                        className={`group flex items-center gap-2 px-3 py-2 rounded-md text-xs font-mono transition-all border ${
                          isSelected
                            ? 'bg-accent/15 border-accent text-text-primary shadow-sm'
                            : 'bg-base border-border-subtle text-text-secondary hover:border-border-strong hover:text-text-primary'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full transition-colors ${
                            isSelected
                              ? 'bg-accent'
                              : 'bg-text-muted group-hover:bg-accent'
                          }`}
                        />
                        <span className="font-medium">{skill.name}</span>
                        {skill.level === 'Expert' && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-accent/20 text-accent uppercase font-semibold">
                            core
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Skill Telemetry Inspector Panel (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 p-6 rounded-lg border border-border-subtle bg-surface shadow-sm flex flex-col justify-between">
            <div>
              {/* Panel Top Meta */}
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4 font-mono text-xs">
                <div className="flex items-center gap-1.5 text-accent font-semibold">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>SKILL TELEMETRY INSPECTOR</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-base border border-border-subtle text-text-muted uppercase">
                  {selectedSkill?.categoryLabel}
                </span>
              </div>

              {/* Title & Level */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-text-primary">
                  {selectedSkill?.name}
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded border border-accent/40 bg-accent/10 text-accent font-semibold">
                  {selectedSkill?.level}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {selectedSkill?.desc}
              </p>

              {/* Mathematical / Architectural Role */}
              {selectedSkill?.mathRole && (
                <div className="p-3.5 rounded border border-border-subtle bg-base mb-4">
                  <div className="flex items-center gap-1.5 font-mono text-xs text-accent font-semibold mb-1">
                    <Sigma className="w-3.5 h-3.5" />
                    <span>MATHEMATICAL & ALGORITHMIC FORMULATION</span>
                  </div>
                  <div className="font-mono text-xs text-text-primary leading-relaxed">
                    {selectedSkill.mathRole}
                  </div>
                </div>
              )}

              {/* Toolchain / Sub-libraries */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted uppercase mb-2">
                  <Wrench className="w-3.5 h-3.5 text-accent" />
                  <span>Verified Sub-Tools & Libraries</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill?.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono px-2.5 py-0.5 rounded bg-base text-text-secondary border border-border-subtle"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Implemented in Projects */}
              <div>
                <div className="font-mono text-xs text-text-muted uppercase mb-2">
                  Implemented in Verified Projects:
                </div>
                {linkedProjects.length > 0 ? (
                  <div className="space-y-2">
                    {linkedProjects.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 rounded border border-border-subtle bg-base flex items-center justify-between group hover:border-border-strong transition-colors"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-semibold text-text-primary truncate group-hover:text-accent transition-colors">
                            {p.title}
                          </div>
                          <div className="font-mono text-xs text-text-muted truncate">
                            {p.tagline}
                          </div>
                        </div>

                        {onOpenCaseStudy && (
                          <button
                            type="button"
                            onClick={() => onOpenCaseStudy(p.id)}
                            className="shrink-0 flex items-center gap-1 text-xs font-mono text-accent hover:underline cursor-pointer"
                          >
                            <span>Inspect</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="font-mono text-xs text-text-muted p-3 rounded border border-border-subtle bg-base">
                    // Coursework, data structures & competitive programming
                  </div>
                )}
              </div>
            </div>

            {/* Bottom note */}
            <div className="pt-4 mt-4 border-t border-border-subtle font-mono text-xs text-text-muted flex items-center justify-between">
              <span>ENGINEERING RIGOR</span>
              <span className="text-accent font-semibold">100% REPO VERIFIED</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
