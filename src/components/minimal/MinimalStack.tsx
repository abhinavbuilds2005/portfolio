import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Brain, Eye, Server, Cpu, ShieldCheck, Check, X, ExternalLink, Sparkles } from 'lucide-react';
import { SKILLS_ECOSYSTEM, SkillCategory, SkillItem } from '../../data/skills';

const EXTENDED_SKILLS: SkillItem[] = [
  ...SKILLS_ECOSYSTEM,
  {
    id: 'react',
    name: 'React & Modern Frontend',
    category: 'SYSTEMS',
    categoryLabel: 'Backend & Deployment',
    desc: 'Component architecture, responsive typography, state management, and real-time canvas telemetry for AI/ML dashboards.',
    mathRole: 'Reactive state reconciliation triggering forward inference telemetry and real-time SVG coordinate re-renders.',
    tools: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    projects: ['docushield', 'portfolio-v2'],
    level: 'Production Frontend (Portfolio & DocuShield)',
    isCore: true,
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
    isCore: true,
  },
  {
    id: 'langchain',
    name: 'LangChain & RAG Orchestration',
    category: 'NLP_GENAI',
    categoryLabel: 'NLP & Generative AI',
    desc: 'Orchestrating prompt templates, chunked vector store retrievals, and deterministic output schema guarantees.',
    mathRole: 'Retrieval-Augmented Generation using cosine top-k vector space nearest neighbor queries over dense chunk embeddings.',
    tools: ['Chains', 'Document Loaders', 'Text Splitters', 'Vector Stores'],
    projects: ['ats-resume-analyzer'],
    level: 'LLM Orchestration (ATS Resume)',
    isCore: false,
  },
];

export const MinimalStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const categories = [
    { id: 'ALL', label: 'All Ecosystem' },
    { id: 'VISION', label: 'Computer Vision' },
    { id: 'ML_STATS', label: 'ML & Statistics' },
    { id: 'SYSTEMS', label: 'Backend & Cloud' },
    { id: 'NLP_GENAI', label: 'NLP & GenAI' },
    { id: 'FOUNDATIONS', label: 'Core Foundations' },
  ];

  const filteredSkills = useMemo(() => {
    return EXTENDED_SKILLS.filter((skill) => {
      const matchesCategory = selectedCategory === 'ALL' || skill.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        skill.name.toLowerCase().includes(q) ||
        skill.desc.toLowerCase().includes(q) ||
        skill.tools.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-20 px-6 sm:px-10 max-w-7xl mx-auto border-t border-black/[0.06]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#6366F1] block mb-2">
            — TECHNICAL ECOSYSTEM
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight font-sans">
            Skills & Architecture.
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl mt-2 leading-relaxed font-normal">
            Every tool in my stack has been proven across active, passing automated test suites and production deployments.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 25+ skills..."
            className="w-full bg-white border border-[#E5E7EB] rounded-full pl-9 pr-4 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#6366F1] transition-colors shadow-2xs"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#111827] text-white shadow-xs'
                : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of 25+ Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveSkill(skill)}
              className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#6366F1] uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md">
                    {skill.categoryLabel || skill.category}
                  </span>
                  {skill.isCore && (
                    <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      CORE
                    </span>
                  )}
                </div>

                <h3 className="font-sans font-bold text-base text-[#111827] group-hover:text-[#6366F1] transition-colors">
                  {skill.name}
                </h3>

                <p className="text-xs text-[#4B5563] mt-2 line-clamp-2 leading-relaxed">
                  {skill.desc}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {skill.tools.slice(0, 3).map((tool) => (
                  <span
                    key={tool}
                    className="bg-[#FAF9F5] border border-slate-200 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded"
                  >
                    {tool}
                  </span>
                ))}
                {skill.tools.length > 3 && (
                  <span className="text-[10px] text-slate-400 self-center">
                    +{skill.tools.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {activeSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setActiveSkill(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="bg-indigo-50 text-[#6366F1] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeSkill.categoryLabel || activeSkill.category}
                </span>
                <h3 className="text-2xl font-bold text-[#111827] mt-2 font-sans">
                  {activeSkill.name}
                </h3>
                <div className="text-xs font-semibold text-slate-600 mt-1">
                  Level: {activeSkill.level}
                </div>
              </div>

              <p className="text-sm text-[#4B5563] leading-relaxed my-3">
                {activeSkill.desc}
              </p>

              {/* Mathematical / Algorithmic Role */}
              <div className="bg-[#FAF9F5] border border-slate-200 rounded-xl p-3.5 my-3">
                <div className="text-[11px] font-bold text-[#111827] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>Computational & Mathematical Role</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-mono">
                  {activeSkill.mathRole}
                </p>
              </div>

              {/* Tools List */}
              <div className="pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-[#111827] mb-2 uppercase tracking-wider">
                  Tools & Libraries
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeSkill.tools.map((t) => (
                    <span
                      key={t}
                      className="bg-white border border-slate-300 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
