import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Server, Layout, ShieldCheck, Terminal, Cpu, Database, Eye, Sparkles } from 'lucide-react';

interface SkillItemDetail {
  name: string;
  level: string;
  tag?: string;
  icon?: React.ReactNode;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  skills: SkillItemDetail[];
}

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories: SkillCategory[] = [
    {
      id: 'ml',
      name: 'AI & Machine Learning',
      icon: <Brain className="w-4 h-4 text-[#6366F1]" />,
      skills: [
        {
          name: 'Python (Internals)',
          level: 'Advanced',
          tag: 'Core',
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M11.91 2C6.91 2 7.21 4.17 7.21 4.17L7.22 6.42H12V7.17H4.41C2.32 7.17 2 9.5 2 9.5C2 12.39 3.82 12.54 3.82 12.54H5.32V10.42C5.32 7.89 7.47 7.89 7.47 7.89H11.96C14.37 7.89 14.37 5.61 14.37 5.61V3.94C14.37 2.05 11.91 2 11.91 2Z" fill="#3776AB" />
              <path d="M12.09 22C17.09 22 16.79 19.83 16.79 19.83L16.78 17.58H12V16.83H19.59C21.68 16.83 22 14.5 22 14.5C22 11.61 20.18 11.46 20.18 11.46H18.68V13.58C18.68 16.11 16.53 16.11 16.53 16.11H12.04C9.63 16.11 9.63 18.39 9.63 18.39V20.06C9.63 21.95 12.09 22 12.09 22Z" fill="#FFD43B" />
            </svg>
          ),
        },
        {
          name: 'PyTorch',
          level: 'Production',
          tag: 'Deep Learning',
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 6.5L16.5 4.5L14.5 9.5C17.5 11 19 14 18.5 17C17.8 21.2 13.5 22.8 10 21.8C6.5 20.8 4 17.5 4.5 14C5 10.5 8 8 11 8L12 2Z" stroke="#EE4C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="16.5" cy="5.5" r="1.5" fill="#EE4C2C" />
            </svg>
          ),
        },
        {
          name: 'Scikit-Learn',
          level: 'Production',
          tag: 'Classifiers',
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#F7931E" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="3.5" fill="#3499CD" />
            </svg>
          ),
        },
        {
          name: 'Computer Vision (OpenCV)',
          level: 'Advanced',
          tag: 'Vision',
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="7" r="3.5" stroke="#EA4335" strokeWidth="2.2" />
              <circle cx="7" cy="16" r="3.5" stroke="#34A853" strokeWidth="2.2" />
              <circle cx="17" cy="16" r="3.5" stroke="#4285F4" strokeWidth="2.2" />
            </svg>
          ),
        },
        {
          name: 'EasyOCR & Tesseract',
          level: 'Production',
          tag: 'OCR',
          icon: <Eye className="w-5 h-5 text-[#3B82F6]" />,
        },
        {
          name: 'NLP & Sentence Transformers',
          level: 'Intermediate',
          tag: 'Embeddings',
          icon: <Sparkles className="w-5 h-5 text-[#6366F1]" />,
        },
        {
          name: 'NumPy & Pandas',
          level: 'Advanced',
          tag: 'Data',
          icon: <Database className="w-5 h-5 text-[#10B981]" />,
        },
        {
          name: 'Groq & Llama 3 API',
          level: 'Integration',
          tag: 'GenAI',
          icon: <Cpu className="w-5 h-5 text-[#F97316]" />,
        },
      ],
    },
    {
      id: 'backend',
      name: 'Backend & Systems',
      icon: <Server className="w-4 h-4 text-[#6366F1]" />,
      skills: [
        {
          name: 'FastAPI',
          level: 'Production',
          tag: 'Async APIs',
          icon: (
            <svg className="w-5 h-5 text-[#059669]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L3 7V17L12 22L21 17V7L12 2ZM11 16.5V11.5H8.5L13 5.5V10.5H15.5L11 16.5Z" />
            </svg>
          ),
        },
        {
          name: 'Docker & Compose',
          level: 'Production',
          tag: 'Containers',
          icon: (
            <svg className="w-5 h-5 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 10h2v2H4v-2zm3 0h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-6-3h2v2H7V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7zm-6-3h2v2h-2V4zm3 0h2v2h-2V4zm8.5 7.5c-.3-.2-.8-.4-1.3-.4-.2 0-.4 0-.6.1-.3-.7-.9-1.2-1.6-1.5v-.2c0-.3-.1-.5-.2-.7-.2-.4-.6-.7-1.1-.7-.2 0-.4 0-.5.1-.4-.6-1-1-1.7-1H2v3c0 .3.1.6.2.8C1.5 11.8 1 12.8 1 14c0 3.3 2.7 6 6 6h11c3.3 0 6-2.7 6-6 0-1-.3-1.9-.8-2.7-.2.1-.4.2-.7.2z" />
            </svg>
          ),
        },
        {
          name: 'PostgreSQL',
          level: 'Advanced',
          tag: 'Database',
          icon: (
            <svg className="w-5 h-5 text-[#336791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 7V17M8 10C8 8.9 9.8 8 12 8C14.2 8 16 8.9 16 10C16 11.1 14.2 12 12 12C9.8 12 8 12.9 8 14C8 15.1 9.8 16 12 16" strokeLinecap="round" />
            </svg>
          ),
        },
        {
          name: 'SQL (HackerRank 5★)',
          level: 'Advanced',
          tag: 'Queries',
          icon: <Database className="w-5 h-5 text-[#6366F1]" />,
        },
        {
          name: 'Supabase',
          level: 'Production',
          tag: 'Auth & DB',
          icon: (
            <svg className="w-5 h-5 text-[#3ECF8E]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.996 0A12 12 0 0 0 0 12c0 5.405 3.57 9.974 8.528 11.488l7.65-9.878h-5.267l6.634-9.336A11.968 11.968 0 0 0 11.996 0z" />
            </svg>
          ),
        },
        {
          name: 'REST Architecture',
          level: 'Production',
          tag: 'Protocols',
          icon: <Server className="w-5 h-5 text-slate-700" />,
        },
        {
          name: 'C Language (150 hrs)',
          level: 'Foundation',
          tag: 'Memory',
          icon: <Terminal className="w-5 h-5 text-[#00599C]" />,
        },
        {
          name: 'Linux & Bash Scripting',
          level: 'Working',
          tag: 'DevOps',
          icon: <Terminal className="w-5 h-5 text-emerald-600" />,
        },
      ],
    },
    {
      id: 'frontend',
      name: 'Frontend & UI Engineering',
      icon: <Layout className="w-4 h-4 text-[#6366F1]" />,
      skills: [
        {
          name: 'React 18',
          level: 'Production',
          tag: 'SPA',
          icon: (
            <svg className="w-5 h-5 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
          ),
        },
        {
          name: 'TypeScript',
          level: 'Production',
          tag: 'Types',
          icon: (
            <svg className="w-5 h-5 text-[#3178C6]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.5 0h21l1.5 1.5v21l-1.5 1.5h-21l-1.5-1.5v-21zm10.7 13.7h-2.8v-1.6h7.4v1.6h-2.8v8.7h-1.8zm6.5 4.9c.5.8 1.3 1.3 2.3 1.3 1.1 0 1.8-.6 1.8-1.4 0-1-.8-1.4-2.2-2-1.9-.8-3.2-1.8-3.2-3.8 0-2.1 1.7-3.7 4.1-3.7 1.6 0 2.8.6 3.6 1.8l-1.4 1.2c-.4-.7-1.1-1.1-2.2-1.1-1.1 0-1.7.6-1.7 1.3 0 .8.6 1.2 2 1.7 2.1.8 3.4 1.8 3.4 3.9 0 2.3-1.8 3.8-4.3 3.8-2 0-3.4-.8-4.2-2.3z" />
            </svg>
          ),
        },
        {
          name: 'Tailwind CSS',
          level: 'Advanced',
          tag: 'Styling',
          icon: (
            <svg className="w-5 h-5 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
            </svg>
          ),
        },
        {
          name: 'Streamlit',
          level: 'Production',
          tag: 'Rapid AI Apps',
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M16.5 14.5L12 6.5L7.5 14.5H16.5Z" fill="#FF4B4B" />
              <path d="M19 18.5L14.5 10.5L10 18.5H19Z" fill="#FF4B4B" fillOpacity="0.8" />
              <path d="M14 18.5L9.5 10.5L5 18.5H14Z" fill="#FF4B4B" fillOpacity="0.5" />
            </svg>
          ),
        },
      ],
    },
    {
      id: 'algorithms',
      name: 'Forensics & Cryptography',
      icon: <ShieldCheck className="w-4 h-4 text-[#6366F1]" />,
      skills: [
        {
          name: 'Error Level Analysis (ELA)',
          level: 'Forensics',
          tag: 'Tampering',
          icon: <ShieldCheck className="w-5 h-5 text-[#A855F7]" />,
        },
        {
          name: 'Verhoeff D5 Checksum',
          level: 'Algorithmic',
          tag: 'Dihedral Group',
          icon: <ShieldCheck className="w-5 h-5 text-[#EAB308]" />,
        },
        {
          name: 'ICAO Doc 9303 MRZ',
          level: 'Standards',
          tag: 'Passport 7-3-1',
          icon: <ShieldCheck className="w-5 h-5 text-[#10B981]" />,
        },
      ],
    },
  ];

  const displayedCategories = activeTab === 'all' 
    ? categories 
    : categories.filter((c) => c.id === activeTab);

  return (
    <section id="skills" className="py-20 px-6 sm:px-10 max-w-7xl mx-auto border-t border-black/[0.06]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#6366F1] block mb-2">
            — TECHNICAL SKILLS
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight font-sans">
            Tools of the Trade.
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl mt-2 leading-relaxed font-normal">
            Every tool in my stack has been proven across active, passing automated test suites and production deployments.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#111827] text-white shadow-xs'
                : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-slate-50'
            }`}
          >
            All Skills
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Categories & Skill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayedCategories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100/60 flex items-center justify-center">
                {category.icon}
              </div>
              <h3 className="font-sans font-bold text-lg text-[#111827]">
                {category.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-slate-200/80 hover:border-indigo-200 hover:bg-white hover:shadow-xs transition-all flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    {skill.icon || <Cpu className="w-5 h-5 text-[#6366F1]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-sans font-semibold text-xs text-[#111827] truncate group-hover:text-[#6366F1] transition-colors">
                        {skill.name}
                      </span>
                      {skill.tag && (
                        <span className="text-[9px] font-mono font-bold text-[#6366F1] bg-indigo-50 px-1.5 py-0.5 rounded">
                          {skill.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
