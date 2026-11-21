import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Brain, Eye, Server, Cpu, ShieldCheck, Check, X, ExternalLink, Sparkles, Terminal, Code2 } from 'lucide-react';
import { SKILLS_ECOSYSTEM, SkillCategory, SkillItem } from '../../data/skills';

// Helper function to render authentic branded SVG icons for all 25 skills
const getSkillIcon = (id: string) => {
  switch (id) {
    case 'python':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M11.91 2C6.91 2 7.21 4.17 7.21 4.17L7.22 6.42H12V7.17H4.41C2.32 7.17 2 9.5 2 9.5C2 12.39 3.82 12.54 3.82 12.54H5.32V10.42C5.32 7.89 7.47 7.89 7.47 7.89H11.96C14.37 7.89 14.37 5.61 14.37 5.61V3.94C14.37 2.05 11.91 2 11.91 2ZM9.07 3.33C9.57 3.33 9.98 3.74 9.98 4.24C9.98 4.74 9.57 5.15 9.07 5.15C8.57 5.15 8.16 4.74 8.16 4.24C8.16 3.74 8.57 3.33 9.07 3.33Z"
            fill="#3776AB"
          />
          <path
            d="M12.09 22C17.09 22 16.79 19.83 16.79 19.83L16.78 17.58H12V16.83H19.59C21.68 16.83 22 14.5 22 14.5C22 11.61 20.18 11.46 20.18 11.46H18.68V13.58C18.68 16.11 16.53 16.11 16.53 16.11H12.04C9.63 16.11 9.63 18.39 9.63 18.39V20.06C9.63 21.95 12.09 22 12.09 22ZM14.93 20.67C14.43 20.67 14.02 20.26 14.02 19.76C14.02 19.26 14.43 18.85 14.93 18.85C15.43 18.85 15.84 19.26 15.84 19.76C15.84 20.26 15.43 20.67 14.93 20.67Z"
            fill="#FFD43B"
          />
        </svg>
      );

    case 'cpp':
      return (
        <svg className="w-6 h-6 text-[#00599C]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.4 12c0-.5-.4-.9-.9-.9h-1.6V9.5c0-.5-.4-.9-.9-.9s-.9.4-.9.9v1.6h-1.6c-.5 0-.9.4-.9.9s.4.9.9.9h1.6v1.6c0 .5.4.9.9.9s.9-.4.9-.9v-1.6h1.6c.5 0 .9-.4.9-.9zm-6.2 0c0-.5-.4-.9-.9-.9h-1.6V9.5c0-.5-.4-.9-.9-.9s-.9.4-.9.9v1.6h-1.6c-.5 0-.9.4-.9.9s.4.9.9.9h1.6v1.6c0 .5.4.9.9.9s.9-.4.9-.9v-1.6h1.6c.5 0 .9-.4.9-.9zM7.5 5.5C3.9 5.5 1 8.4 1 12s2.9 6.5 6.5 6.5c2.4 0 4.6-1.3 5.7-3.3.2-.4.1-.9-.3-1.1-.4-.2-.9-.1-1.1.3-.8 1.5-2.4 2.4-4.3 2.4-2.6 0-4.8-2.1-4.8-4.8s2.2-4.8 4.8-4.8c1.9 0 3.5.9 4.3 2.4.2.4.7.5 1.1.3.4-.2.5-.7.3-1.1-1.1-2-3.3-3.3-5.7-3.3z" />
        </svg>
      );

    case 'sql':
      return (
        <svg className="w-6 h-6 text-[#336791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );

    case 'math-stats':
      return (
        <svg className="w-6 h-6 text-[#8B5CF6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 4H6l6 8-6 8h12" />
          <circle cx="16" cy="12" r="1.2" fill="currentColor" />
          <path d="M4 20c2-4 4-8 8-8s6 4 8 8" strokeDasharray="2 2" strokeWidth="1.5" />
        </svg>
      );

    case 'scikit-learn':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#F7931E" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.5" fill="#3499CD" />
          <path d="M7 9.5L12 12L17 9.5" stroke="#F7931E" strokeWidth="1.5" />
          <path d="M12 12V17" stroke="#3499CD" strokeWidth="1.5" />
        </svg>
      );

    case 'smote':
      return (
        <svg className="w-6 h-6 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" fill="#10B981" fillOpacity="0.25" />
          <circle cx="18" cy="6" r="3" fill="#10B981" fillOpacity="0.25" />
          <circle cx="12" cy="18" r="3" fill="#10B981" fillOpacity="0.8" />
          <path d="M6 9l4.5 6.5M18 9l-4.5 6.5M8 6h8" strokeDasharray="2 2" />
        </svg>
      );

    case 'pca':
      return (
        <svg className="w-6 h-6 text-[#6366F1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="20" x2="20" y2="4" strokeWidth="2.2" stroke="#6366F1" />
          <line x1="8" y1="8" x2="18" y2="18" strokeWidth="1.8" stroke="#A855F7" strokeDasharray="3 3" />
          <circle cx="7" cy="17" r="1.5" fill="#6366F1" />
          <circle cx="12" cy="12" r="2" fill="#6366F1" />
          <circle cx="17" cy="7" r="1.5" fill="#6366F1" />
          <circle cx="10" cy="9" r="1.2" fill="#A855F7" />
          <circle cx="15" cy="14" r="1.2" fill="#A855F7" />
        </svg>
      );

    case 'kmeans':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <circle cx="7" cy="8" r="4.5" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="7" cy="8" r="2.2" fill="#3B82F6" />
          <circle cx="16" cy="15" r="5" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="16" cy="15" r="2.2" fill="#8B5CF6" />
          <circle cx="5" cy="16" r="1.2" fill="#64748B" />
          <circle cx="18" cy="7" r="1.2" fill="#64748B" />
        </svg>
      );

    case 'pr-auc':
      return (
        <svg className="w-6 h-6 text-[#EC4899]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M3 5c6 0 10 2 13 6s3 7 5 10" stroke="#EC4899" strokeWidth="2.5" />
          <path d="M3 21l18-18" strokeDasharray="2 2" strokeWidth="1.2" stroke="#94A3B8" />
        </svg>
      );

    case 'pytorch':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 6.5L16.5 4.5L14.5 9.5C17.5 11 19 14 18.5 17C17.8 21.2 13.5 22.8 10 21.8C6.5 20.8 4 17.5 4.5 14C5 10.5 8 8 11 8L12 2Z" stroke="#EE4C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16.5" cy="5.5" r="1.5" fill="#EE4C2C" />
        </svg>
      );

    case 'opencv':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="7" r="3.5" stroke="#EA4335" strokeWidth="2.5" />
          <circle cx="7" cy="16" r="3.5" stroke="#34A853" strokeWidth="2.5" />
          <circle cx="17" cy="16" r="3.5" stroke="#4285F4" strokeWidth="2.5" />
        </svg>
      );

    case 'facenet':
      return (
        <svg className="w-6 h-6 text-[#06B6D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
          <circle cx="12" cy="11" r="3" />
          <path d="M9 16c1 .6 2 1 3 1s2-.4 3-1" />
        </svg>
      );

    case 'ela':
      return (
        <svg className="w-6 h-6 text-[#A855F7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 17l4-5 3 3 3-4" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" />
          <path d="M14 14l3 3M17 14l-3 3" stroke="#EF4444" strokeWidth="2" />
        </svg>
      );

    case 'verhoeff':
      return (
        <svg className="w-6 h-6 text-[#EAB308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#EAB308" />
          <path d="M9 12l2 2 4-4" stroke="#EAB308" strokeWidth="2.2" />
        </svg>
      );

    case 'sentence-transformers':
      return (
        <svg className="w-6 h-6 text-[#6366F1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="6" r="2.5" fill="#6366F1" fillOpacity="0.3" />
          <circle cx="19" cy="6" r="2.5" fill="#6366F1" fillOpacity="0.3" />
          <circle cx="12" cy="18" r="3" fill="#6366F1" />
          <path d="M5 8.5L10 16M19 8.5L14 16M7.5 6h9" />
        </svg>
      );

    case 'spacy':
      return (
        <svg className="w-6 h-6 text-[#09A3D5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 12h10M4 18h16" />
          <circle cx="18" cy="12" r="2.5" fill="#09A3D5" />
          <path d="M12 4v4M8 10v4" strokeDasharray="1.5 1.5" />
        </svg>
      );

    case 'easyocr':
      return (
        <svg className="w-6 h-6 text-[#3B82F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7V4h3M17 4h3v3M4 17v3h3M20 17v3h-3" strokeWidth="2" />
          <rect x="7" y="7" width="10" height="10" rx="1" strokeDasharray="2 2" />
          <path d="M9 12h6" strokeWidth="2" />
        </svg>
      );

    case 'groq-llama':
      return (
        <svg className="w-6 h-6 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="#F97316" />
          <path d="M9 9h6v6H9z" fill="#F97316" fillOpacity="0.25" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2" strokeWidth="2" />
          <circle cx="12" cy="12" r="1.5" fill="#F97316" />
        </svg>
      );

    case 'fastapi':
      return (
        <svg className="w-6 h-6 text-[#059669]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L3 7V17L12 22L21 17V7L12 2ZM11 16.5V11.5H8.5L13 5.5V10.5H15.5L11 16.5Z" />
        </svg>
      );

    case 'docker':
      return (
        <svg className="w-6 h-6 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 10h2v2H4v-2zm3 0h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-6-3h2v2H7V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7zm-6-3h2v2h-2V4zm3 0h2v2h-2V4zm8.5 7.5c-.3-.2-.8-.4-1.3-.4-.2 0-.4 0-.6.1-.3-.7-.9-1.2-1.6-1.5v-.2c0-.3-.1-.5-.2-.7-.2-.4-.6-.7-1.1-.7-.2 0-.4 0-.5.1-.4-.6-1-1-1.7-1H2v3c0 .3.1.6.2.8C1.5 11.8 1 12.8 1 14c0 3.3 2.7 6 6 6h11c3.3 0 6-2.7 6-6 0-1-.3-1.9-.8-2.7-.2.1-.4.2-.7.2z" />
        </svg>
      );

    case 'postgresql':
      return (
        <svg className="w-6 h-6 text-[#336791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 7V17M8 10C8 8.9 9.8 8 12 8C14.2 8 16 8.9 16 10C16 11.1 14.2 12 12 12C9.8 12 8 12.9 8 14C8 15.1 9.8 16 12 16" strokeLinecap="round" />
        </svg>
      );

    case 'streamlit':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M16.5 14.5L12 6.5L7.5 14.5H16.5Z" fill="#FF4B4B" />
          <path d="M19 18.5L14.5 10.5L10 18.5H19Z" fill="#FF4B4B" fillOpacity="0.8" />
          <path d="M14 18.5L9.5 10.5L5 18.5H14Z" fill="#FF4B4B" fillOpacity="0.5" />
        </svg>
      );

    case 'react':
      return (
        <svg className="w-6 h-6 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'git-github':
      return (
        <svg className="w-6 h-6 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.6 4.8l2.7 2.7c.6-.2 1.4 0 1.9.5.5.5.7 1.3.5 1.9l2.6 2.6c.6-.2 1.4 0 1.9.5.7.7.7 1.9 0 2.7s-1.9.7-2.7 0c-.6-.6-.7-1.4-.4-2.1l-2.4-2.4v6.3c.2.1.4.3.5.5.7.7.7 1.9 0 2.7s-1.9.7-2.7 0c-.7-.7-.7-1.9 0-2.7.2-.2.4-.4.6-.5V8.9c-.2-.1-.4-.3-.6-.5-.6-.6-.7-1.4-.4-2.1L8.1 3.9 2.4 9.6c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.5.1-2.1z" />
        </svg>
      );

    case 'langchain':
      return (
        <svg className="w-6 h-6 text-[#1C3C3C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="7" height="8" rx="2" stroke="#1C3C3C" />
          <rect x="14" y="8" width="7" height="8" rx="2" stroke="#00A67E" />
          <path d="M10 12h4" stroke="#00A67E" strokeWidth="2" strokeDasharray="1.5 1.5" />
          <circle cx="6.5" cy="12" r="1" fill="#1C3C3C" />
          <circle cx="17.5" cy="12" r="1" fill="#00A67E" />
        </svg>
      );

    default:
      return <Cpu className="w-6 h-6 text-[#6366F1]" />;
  }
};

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
    { id: 'FOUNDATIONS', label: 'Core Foundations' },
    { id: 'ML', label: 'ML & Statistics' },
    { id: 'DL_VISION', label: 'Computer Vision' },
    { id: 'NLP_GENAI', label: 'NLP & GenAI' },
    { id: 'SYSTEMS', label: 'Backend & Cloud' },
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
      {/* ======================================================================= */}
      {/* 1. SECTION HEADER                                                       */}
      {/* ======================================================================= */}
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

      {/* ======================================================================= */}
      {/* 2. CATEGORY FILTER PILLS                                                */}
      {/* ======================================================================= */}
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

      {/* ======================================================================= */}
      {/* 3. 25+ SKILL CARDS WITH DEDICATED BRANDED SVG ICONS                     */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveSkill(skill)}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E7EB] shadow-2xs hover:shadow-lg hover:border-indigo-200 transition-all flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
            >
              <div>
                {/* Header: Branded Skill Icon on Left, Badges on Right */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  {/* Skill Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-indigo-50/50 group-hover:border-indigo-200 transition-all shadow-2xs">
                    {getSkillIcon(skill.id)}
                  </div>

                  {/* Badges: Category & Core */}
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-[10px] font-bold text-[#6366F1] uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md">
                      {skill.categoryLabel || skill.category}
                    </span>
                    {skill.isCore && (
                      <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded">
                        CORE
                      </span>
                    )}
                  </div>
                </div>

                {/* Skill Name */}
                <h3 className="font-sans font-bold text-lg text-[#111827] group-hover:text-[#6366F1] transition-colors flex items-center justify-between">
                  <span>{skill.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-[#6366F1] transition-opacity" />
                </h3>

                {/* Description */}
                <p className="text-xs text-[#4B5563] mt-2 line-clamp-2 leading-relaxed">
                  {skill.desc}
                </p>
              </div>

              {/* Tools Chips */}
              <div className="pt-3 mt-4 border-t border-slate-100 flex flex-wrap gap-1.5 items-center">
                {skill.tools.slice(0, 3).map((tool) => (
                  <span
                    key={tool}
                    className="bg-[#FAF9F5] border border-slate-200 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded"
                  >
                    {tool}
                  </span>
                ))}
                {skill.tools.length > 3 && (
                  <span className="text-[10px] font-mono text-slate-400">
                    +{skill.tools.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ======================================================================= */}
      {/* 4. SKILL DETAIL MODAL WITH PROMINENT ICON                                */}
      {/* ======================================================================= */}
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
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header with Large Icon */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                  {getSkillIcon(activeSkill.id)}
                </div>

                <div>
                  <span className="bg-indigo-50 text-[#6366F1] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {activeSkill.categoryLabel || activeSkill.category}
                  </span>
                  <h3 className="text-2xl font-bold text-[#111827] mt-1 font-sans">
                    {activeSkill.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-600 mt-0.5">
                    Level: {activeSkill.level}
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#4B5563] leading-relaxed my-3">
                {activeSkill.desc}
              </p>

              {/* Computational / Mathematical Role */}
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
