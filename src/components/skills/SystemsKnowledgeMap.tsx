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
  const [selectedSkillId, setSelectedSkillId] = useState<string>('pytorch');

  const filteredSkills = activeCategory === 'ALL'
    ? SKILLS_ECOSYSTEM
    : SKILLS_ECOSYSTEM.filter((s) => s.category === activeCategory);

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
    <div className="mb-14">
      {/* Header bar with category filter chips */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-3 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#6366F1] font-semibold mb-1">
            <Layers className="w-4 h-4" />
            <span>AI Systems Knowledge Map // 22 Verified Competencies</span>
          </div>
          <p className="text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]">
            Select any capability below to inspect mathematical roles, operational tools, and project usages.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 flex-wrap font-mono text-xs">
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all border ${
                  isActive
                    ? 'bg-[#6366F1] text-white font-medium shadow-sm border-[#6366F1]'
                    : 'bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] border-white/[0.06] hover:border-white/20'
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
              className="p-1.5 rounded-lg text-[#9AA4B2] hover:text-white border border-white/[0.06] hover:bg-white/10"
              title="Reset Filter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Interactive Map (7 cols) + Selected Skill Telemetry Drawer (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Domain Categorized Skill Tiles (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {groupedCategories.map((catGroup) => {
            const groupSkills = filteredSkills.filter((s) => s.category === catGroup.id);

            return (
              <div 
                key={catGroup.id}
                className="p-5 rounded-xl border border-white/[0.06] bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-sm"
              >
                <div className="flex items-center justify-between mb-3 text-xs font-mono pb-2 border-b border-white/[0.04]">
                  <div className="flex items-center gap-2 font-semibold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]">
                    <span className="text-[#6366F1]">{getCategoryIcon(catGroup.id)}</span>
                    <span className="uppercase tracking-wider">{catGroup.label}</span>
                  </div>
                  <span className="text-[#667085] text-[11px]">
                    {groupSkills.length} competencies
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {groupSkills.map((skill) => {
                    const isSelected = skill.id === selectedSkillId;

                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => setSelectedSkillId(skill.id)}
                        className={`p-3 rounded-lg text-left transition-all border flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#6366F1]/15 border-[#6366F1] shadow-sm scale-[1.01]'
                            : 'bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] border-white/[0.04] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] truncate">
                            {skill.name}
                          </span>
                          <span className="font-mono text-[10px] text-[#34D399]">
                            {skill.level}
                          </span>
                        </div>

                        <p className="text-[11px] text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] line-clamp-2 leading-relaxed">
                          {skill.desc}
                        </p>

                        <div className="flex items-center justify-between text-[10px] font-mono text-[#667085] mt-2 pt-1.5 border-t border-white/[0.04]">
                          <span>{skill.tools.slice(0, 2).join(' · ')}</span>
                          <span className="text-[#6366F1]">
                            {skill.projects.length} {skill.projects.length === 1 ? 'project' : 'projects'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Capability Inspector Card (5 cols) */}
        <div className="lg:col-span-5 sticky top-24">
          <AnimatePresence mode="wait">
            {selectedSkill && (
              <motion.div
                key={selectedSkill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-xl border border-[#6366F1]/30 bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-xl space-y-5"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/[0.06]">
                  <div>
                    <div className="font-mono text-[10px] text-[#6366F1] font-semibold uppercase tracking-wider mb-1">
                      {selectedSkill.categoryLabel}
                    </div>
                    <h3 className="text-xl font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]">
                      {selectedSkill.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    {selectedSkill.level}
                  </span>
                </div>

                {/* Practical Description */}
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#667085] uppercase tracking-wider mb-1 font-semibold">
                    <Code2 className="w-3.5 h-3.5 text-[#22D3EE]" />
                    <span>Technical Overview</span>
                  </div>
                  <p className="text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
                    {selectedSkill.desc}
                  </p>
                </div>

                {/* Mathematical Formulation */}
                {selectedSkill.mathRole && (
                  <div className="p-3.5 rounded-lg bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] border border-white/[0.06]">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#818CF8] uppercase tracking-wider mb-1 font-semibold">
                      <Sigma className="w-3.5 h-3.5 text-[#6366F1]" />
                      <span>Mathematical & Algorithmic Role</span>
                    </div>
                    <p className="font-mono text-xs text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] leading-relaxed">
                      {selectedSkill.mathRole}
                    </p>
                  </div>
                )}

                {/* Operational Tools */}
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#667085] uppercase tracking-wider mb-2 font-semibold">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Verified Tooling:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSkill.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.06] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Linked Projects in Portfolio */}
                <div className="pt-3 border-t border-white/[0.06]">
                  <div className="font-mono text-[10px] text-[#667085] uppercase tracking-wider mb-2 font-semibold">
                    Verified in Active Repositories:
                  </div>
                  <div className="space-y-2">
                    {linkedProjects.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 rounded-lg border border-white/[0.06] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]">{p.title}</div>
                          <div className="text-[11px] text-[#667085] line-clamp-1">{p.tagline}</div>
                        </div>

                        {onOpenCaseStudy && (
                          <button
                            onClick={() => onOpenCaseStudy(p.id)}
                            className="p-1 rounded text-[#818CF8] hover:text-white"
                            title="Inspect Case Study"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
