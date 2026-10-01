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
          <div className="flex items-center gap-2 font-mono text-xs text-[#e58b24] font-semibold mb-1">
            <Layers className="w-4 h-4" />
            <span>AI SYSTEMS KNOWLEDGE MAP // 22 VERIFIED CAPABILITIES</span>
          </div>
          <p className="text-xs text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c]">
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
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-[#e58b24] text-[#121212] font-semibold shadow-sm'
                    : 'bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] text-[#a8a29e] hover:text-[#f5f2eb] border border-[#2b2a27]'
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
              className="p-1.5 rounded text-xs font-mono text-[#78716c] hover:text-[#e58b24] border border-[#2b2a27] bg-[#161616] transition-colors"
              title="Reset Filter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left Node Board, Right Telemetry Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Categorized Clusters (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {groupedCategories.map((group) => {
            const groupSkills = filteredSkills.filter((s) => s.category === group.id);
            if (groupSkills.length === 0) return null;

            return (
              <div
                key={group.id}
                className="p-4 rounded border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm"
              >
                <div className="flex items-center justify-between mb-3 pb-1.5 border-b border-[#2b2a27]/60">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
                    <span className="text-[#e58b24]">{getCategoryIcon(group.id)}</span>
                    <span className="uppercase tracking-wide">{group.label}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#78716c]">
                    {groupSkills.length} NODES
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {groupSkills.map((skill) => {
                    const isSelected = selectedSkillId === skill.id;
                    return (
                      <motion.button
                        key={skill.id}
                        type="button"
                        onClick={() => setSelectedSkillId(skill.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-all border ${
                          isSelected
                            ? 'bg-[#e58b24]/15 border-[#e58b24] text-[#f5f2eb] shadow-[0_0_12px_rgba(229,139,36,0.25)]'
                            : 'bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] border-[#2b2a27] text-[#a8a29e] hover:border-[#e58b24]/50 hover:text-[#f5f2eb]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            isSelected
                              ? 'bg-[#e58b24] shadow-[0_0_6px_#e58b24]'
                              : 'bg-[#78716c] group-hover:bg-[#e58b24]'
                          }`}
                        />
                        <span className="font-medium">{skill.name}</span>
                        {skill.level === 'Expert' && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-[#e58b24]/20 text-[#e58b24] uppercase">
                            core
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Skill Telemetry Inspector Panel (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 p-5 rounded border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm flex flex-col justify-between">
            <div>
              {/* Panel Top Meta */}
              <div className="flex items-center justify-between pb-3 border-b border-[#2b2a27]/60 mb-4 font-mono text-[10px]">
                <div className="flex items-center gap-1.5 text-[#e58b24] font-semibold">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>SKILL TELEMETRY INSPECTOR</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-[#121212] border border-[#2b2a27] text-[#78716c] uppercase">
                  {selectedSkill?.categoryLabel}
                </span>
              </div>

              {/* Title & Level */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
                  {selectedSkill?.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#e58b24]/40 bg-[#e58b24]/10 text-[#e58b24] font-semibold">
                  {selectedSkill?.level}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed mb-4">
                {selectedSkill?.desc}
              </p>

              {/* Mathematical / Architectural Role */}
              {selectedSkill?.mathRole && (
                <div className="p-3 rounded border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] mb-4">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#e58b24] font-semibold mb-1">
                    <Sigma className="w-3 h-3" />
                    <span>MATHEMATICAL & ALGORITHMIC FORMULATION</span>
                  </div>
                  <div className="font-mono text-[11px] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] leading-relaxed">
                    {selectedSkill.mathRole}
                  </div>
                </div>
              )}

              {/* Toolchain / Sub-libraries */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#78716c] uppercase mb-2">
                  <Wrench className="w-3 h-3 text-[#e58b24]" />
                  <span>Verified Sub-Tools & Libraries</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill?.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#121212] dark:bg-[#121212] light:bg-[#eae5db] text-[#a8a29e] border border-[#2b2a27]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Implemented in Projects */}
              <div>
                <div className="font-mono text-[10px] text-[#78716c] uppercase mb-2">
                  Implemented in Verified Projects:
                </div>
                {linkedProjects.length > 0 ? (
                  <div className="space-y-2">
                    {linkedProjects.map((p) => (
                      <div
                        key={p.id}
                        className="p-2.5 rounded border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] flex items-center justify-between group hover:border-[#e58b24]/50 transition-colors"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-semibold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] truncate group-hover:text-[#e58b24] transition-colors">
                            {p.title}
                          </div>
                          <div className="font-mono text-[10px] text-[#78716c] truncate">
                            {p.tagline}
                          </div>
                        </div>

                        {onOpenCaseStudy && (
                          <button
                            type="button"
                            onClick={() => onOpenCaseStudy(p.id)}
                            className="shrink-0 flex items-center gap-1 text-[11px] font-mono text-[#e58b24] hover:underline"
                          >
                            <span>Inspect</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="font-mono text-[11px] text-[#78716c] p-2.5 rounded border border-[#2b2a27] bg-[#161616]">
                    // Fundamental coursework, data structures & competitive programming
                  </div>
                )}
              </div>
            </div>

            {/* Bottom note */}
            <div className="pt-4 mt-4 border-t border-[#2b2a27]/60 font-mono text-[10px] text-[#78716c] flex items-center justify-between">
              <span>ENGINEERING RIGOR</span>
              <span className="text-[#e58b24]">100% REPO VERIFIED</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
