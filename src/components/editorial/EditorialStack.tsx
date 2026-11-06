import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Search, Layers, Cpu, Database, Eye, Terminal, Server, ExternalLink } from 'lucide-react';
import { SKILLS_ECOSYSTEM, SKILL_CATEGORIES, SkillCategory, SkillItem } from '../../data/skills';

// Augmented skills with additional web & language essentials to complete the 25+ ecosystem
const EXTENDED_SKILLS: SkillItem[] = [
  ...SKILLS_ECOSYSTEM,
  {
    id: 'react',
    name: 'React & Modern Web',
    category: 'SYSTEMS',
    categoryLabel: 'Backend & Deployment',
    desc: 'Component architecture, responsive typography, state management, and real-time canvas visualization for AI/ML dashboards.',
    mathRole: 'Reactive state reconciliation triggering forward inference telemetry and real-time SVG coordinate re-renders.',
    tools: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    projects: ['docushield', 'portfolio-v2'],
    level: 'Production Frontend (Portfolio & DocuShield)',
    isCore: true
  },
  {
    id: 'git-github',
    name: 'Git & CI/CD Hygiene',
    category: 'FOUNDATIONS',
    categoryLabel: 'Programming & Fundamentals',
    desc: 'Semantic commit hygiene, branch isolation, automated GitHub Actions workflows, and automated release validation.',
    mathRole: 'Directed Acyclic Graph (DAG) commit topology traversal and cryptographic SHA-256 tree integrity verification.',
    tools: ['Git CLI', 'GitHub Actions', 'Automated Testing', 'Branch Protection'],
    projects: ['docushield', 'creditwise', 'smartcart', 'attendpro', 'ats-resume-analyzer'],
    level: 'Version Control & CI/CD',
    isCore: true
  },
  {
    id: 'langchain',
    name: 'LangChain & RAG',
    category: 'NLP_GENAI',
    categoryLabel: 'NLP & Generative AI',
    desc: 'Orchestrating prompt templates, chunked vector store retrievals, and deterministic output schema guarantees.',
    mathRole: 'Retrieval-Augmented Generation using cosine top-k vector space nearest neighbor queries over dense chunk embeddings.',
    tools: ['Chains', 'Document Loaders', 'Text Splitters', 'Vector Stores'],
    projects: ['ats-resume-analyzer'],
    level: 'LLM Orchestration (ATS Resume)',
    isCore: false
  }
];

export const EditorialStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  // Filter skills based on Category and Search
  const filteredSkills = useMemo(() => {
    return EXTENDED_SKILLS.filter((skill) => {
      const matchesCategory = selectedCategory === 'ALL' || skill.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Pair filtered skills into 2-column rows matching Editorial Image 5
  const skillPairs = useMemo(() => {
    const pairs: { left: SkillItem; right?: SkillItem }[] = [];
    for (let i = 0; i < filteredSkills.length; i += 2) {
      pairs.push({
        left: filteredSkills[i],
        right: filteredSkills[i + 1]
      });
    }
    return pairs;
  }, [filteredSkills]);

  return (
    <section id="stack" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#132532]/10">
      {/* Top Header Row with Kicker, Subhead, and Annotation */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-12">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#F0784B] block mb-3">
            03 / TOOLS OF THE TRADE · COMPLETE SKILLS ECOSYSTEM
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#132532] font-sans mb-4">
            My working vocabulary.
          </h2>
          <div className="font-mono text-xs uppercase tracking-widest text-[#132532] text-opacity-80 space-y-0.5 max-w-md">
            <div>A PRACTICAL TOOLKIT OF 25+ VERIFIED SKILLS</div>
            <div>FOR BUILDING, TRAINING, EVALUATING AND SHIPPING</div>
            <div>RESILIENT AI/ML PRODUCTION SYSTEMS.</div>
          </div>
        </div>

        {/* Right Editorial Note */}
        <div className="font-mono text-xs uppercase tracking-widest text-[#132532]/50 text-left sm:text-right pt-2 space-y-0.5">
          <div>ALWAYS LEARNING</div>
          <div>NEVER COLLECTING BADGES</div>
          <div className="text-[#315CFF] font-bold mt-1">25+ SKILLS ACROSS 5 DOMAINS</div>
        </div>
      </div>

      {/* Domain Category Filter Tabs + Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#132532]/10 mb-8">
        {/* Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {SKILL_CATEGORIES.map((cat) => {
            const count =
              cat.id === 'ALL'
                ? EXTENDED_SKILLS.length
                : EXTENDED_SKILLS.filter((s) => s.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedSkillId(null);
                }}
                className={`font-mono text-xs px-3.5 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#132532] text-white border-[#132532] shadow-[2px_2px_0px_#F0784B]'
                    : 'bg-white text-[#132532] border-[#132532]/20 hover:border-[#132532] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] ${isSelected ? 'text-[#F0784B]' : 'text-[#132532]/60'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-[#132532]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skills, math, tools…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs font-mono bg-white border border-[#132532]/20 focus:border-[#315CFF] focus:outline-none text-[#132532] placeholder:text-[#132532]/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#132532]/50 hover:text-[#132532]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Two-Column Editorial Table with Hairline Horizontal Dividers (Matching Image 5) */}
      <div className="border-t border-[#132532]/15">
        {skillPairs.length === 0 ? (
          <div className="py-16 text-center font-mono text-sm text-[#132532]/60">
            No engineering skills match "{searchQuery}". Try searching for Python, PyTorch, SMOTE, or Docker.
          </div>
        ) : (
          skillPairs.map((pair, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 border-b border-[#132532]/15 divide-y md:divide-y-0 md:divide-x divide-[#132532]/15"
            >
              {/* Left Column Item */}
              <SkillCard
                skill={pair.left}
                isSelected={selectedSkillId === pair.left.id}
                onToggle={() => setSelectedSkillId(selectedSkillId === pair.left.id ? null : pair.left.id)}
              />

              {/* Right Column Item */}
              {pair.right ? (
                <SkillCard
                  skill={pair.right}
                  isSelected={selectedSkillId === pair.right.id}
                  onToggle={() => setSelectedSkillId(selectedSkillId === pair.right.id ? null : pair.right.id)}
                />
              ) : (
                <div className="hidden md:block py-6 px-8 bg-[#FAF8F5]/50 border-r border-[#132532]/15" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Subtle Hint */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#132532]/60">
        <span>Click any skill row to unfold mathematical formulation & project implementations.</span>
        <span className="text-[#315CFF] font-semibold">Showing {filteredSkills.length} of {EXTENDED_SKILLS.length} Skills</span>
      </div>
    </section>
  );
};

// Modular Single Skill Card for the 2-Column Grid
const SkillCard: React.FC<{
  skill: SkillItem;
  isSelected: boolean;
  onToggle: () => void;
}> = ({ skill, isSelected, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`py-6 sm:py-7 px-4 sm:px-8 group transition-colors cursor-pointer select-none ${
        isSelected ? 'bg-[#FAF8F5]' : 'hover:bg-[#FAF8F5]/60'
      }`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-2xl sm:text-3xl font-extrabold text-[#132532] font-sans group-hover:text-[#315CFF] transition-colors">
          {skill.name}
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-[#132532]/60 font-semibold whitespace-nowrap">
          {skill.categoryLabel.split('&')[0].trim()}
        </span>
      </div>

      {/* Summary line */}
      <p className="font-sans text-xs sm:text-sm text-[#132532] text-opacity-80 mt-2 line-clamp-2 leading-relaxed">
        {skill.desc}
      </p>

      {/* Expanded Architectural Drawer */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-3 border-t border-[#132532]/12 space-y-3 font-mono text-xs">
              {/* Math / Theory Role */}
              {skill.mathRole && (
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#F0784B]">
                    MATHEMATICAL & SYSTEM ROLE:
                  </div>
                  <div className="font-sans text-xs text-[#132532] mt-0.5 leading-relaxed">
                    {skill.mathRole}
                  </div>
                </div>
              )}

              {/* Tools list */}
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#315CFF] mb-1.5">
                  ASSOCIATED TOOLS:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-white border border-[#132532]/15 text-[11px] text-[#132532]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Project Implementations */}
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#132532]/70 mb-1.5">
                  VERIFIED IMPLEMENTATIONS:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.projects.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 bg-[#132532] text-white text-[10px] font-bold uppercase tracking-wider"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
