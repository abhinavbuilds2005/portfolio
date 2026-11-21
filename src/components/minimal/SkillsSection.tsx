import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Server, Layout, ShieldCheck, Terminal } from 'lucide-react';

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  skills: { name: string; level: string; tag?: string }[];
}

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories: SkillCategory[] = [
    {
      id: 'ml',
      name: 'AI & Machine Learning',
      icon: <Brain className="w-4 h-4 text-[#6366F1]" />,
      skills: [
        { name: 'Python (Internals)', level: 'Advanced', tag: 'Core' },
        { name: 'PyTorch', level: 'Production', tag: 'Deep Learning' },
        { name: 'Scikit-Learn', level: 'Production', tag: 'Classifiers' },
        { name: 'Computer Vision (OpenCV)', level: 'Advanced', tag: 'Vision' },
        { name: 'EasyOCR & Tesseract', level: 'Production', tag: 'OCR' },
        { name: 'NLP & Sentence Transformers', level: 'Intermediate', tag: 'Embeddings' },
        { name: 'NumPy & Pandas', level: 'Advanced', tag: 'Data' },
        { name: 'Groq & Llama 3 API', level: 'Integration', tag: 'GenAI' },
      ],
    },
    {
      id: 'backend',
      name: 'Backend & Systems',
      icon: <Server className="w-4 h-4 text-[#6366F1]" />,
      skills: [
        { name: 'FastAPI', level: 'Production', tag: 'Async APIs' },
        { name: 'Docker & Compose', level: 'Production', tag: 'Containers' },
        { name: 'PostgreSQL', level: 'Advanced', tag: 'Database' },
        { name: 'SQL (HackerRank 5★)', level: 'Advanced', tag: 'Queries' },
        { name: 'Supabase', level: 'Production', tag: 'Auth & DB' },
        { name: 'REST Architecture', level: 'Production', tag: 'Protocols' },
        { name: 'C Language (150 hrs)', level: 'Foundation', tag: 'Memory' },
        { name: 'Linux & Bash Scripting', level: 'Working', tag: 'DevOps' },
      ],
    },
    {
      id: 'frontend',
      name: 'Frontend & UI Engineering',
      icon: <Layout className="w-4 h-4 text-[#6366F1]" />,
      skills: [
        { name: 'React 18', level: 'Production', tag: 'SPA' },
        { name: 'TypeScript', level: 'Production', tag: 'Types' },
        { name: 'Tailwind CSS', level: 'Advanced', tag: 'Styling' },
        { name: 'Vite Build Tooling', level: 'Production', tag: 'Bundler' },
        { name: 'Framer Motion', level: 'Advanced', tag: 'Animation' },
        { name: 'Streamlit', level: 'Production', tag: 'Rapid AI Apps' },
      ],
    },
    {
      id: 'algorithms',
      name: 'Forensics & Cryptography',
      icon: <ShieldCheck className="w-4 h-4 text-[#6366F1]" />,
      skills: [
        { name: 'Error Level Analysis (ELA)', level: 'Forensics', tag: 'Tampering' },
        { name: 'Verhoeff D5 Checksum', level: 'Algorithmic', tag: 'Dihedral Group' },
        { name: 'ICAO Doc 9303 MRZ', level: 'Standards', tag: 'Passport 7-3-1' },
        { name: 'ORB + RANSAC Homography', level: 'Computer Vision', tag: 'Copy-Move' },
        { name: 'EXIF Metadata Auditing', level: 'Forensics', tag: 'Evidence' },
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
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
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

      {/* Grid of Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedCategories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Card Header */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
              <span className="p-2 bg-indigo-50 rounded-xl">{category.icon}</span>
              <h3 className="font-sans font-bold text-base text-[#111827]">
                {category.name}
              </h3>
            </div>

            {/* Skills Pills Flow */}
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="inline-flex items-center gap-2 bg-[#FAF9F5] border border-slate-200/80 px-3 py-1.5 rounded-lg text-xs font-medium text-[#1F2937] hover:border-[#6366F1]/50 hover:bg-white transition-all group"
                >
                  <span className="font-semibold text-[#111827]">{skill.name}</span>
                  {skill.tag && (
                    <span className="text-[10px] text-slate-400 group-hover:text-[#6366F1] transition-colors font-mono">
                      · {skill.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
