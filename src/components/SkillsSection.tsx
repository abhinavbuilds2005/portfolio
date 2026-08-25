import React, { useState } from 'react';
import { 
  Brain, 
  Layers, 
  Database, 
  Code2, 
  Cpu, 
  Sparkles, 
  Globe, 
  Terminal, 
  Server,
  GitBranch
} from 'lucide-react';
import { sfx } from '../utils/audio';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'ai-ml' | 'fullstack' | 'data' | 'tools'>('all');

  const marqueeSkills = [
    { name: 'Python', icon: 'fa-brands fa-python', color: '#FCD34D' },
    { name: 'PyTorch', icon: 'fa-solid fa-fire', color: '#F97316' },
    { name: 'Scikit-Learn', icon: 'fa-solid fa-network-wired', color: '#FB923C' },
    { name: 'React.js', icon: 'fa-brands fa-react', color: '#38BDF8' },
    { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#4ADE80' },
    { name: 'FastAPI', icon: 'fa-solid fa-bolt', color: '#34D399' },
    { name: 'PostgreSQL', icon: 'fa-solid fa-server', color: '#60A5FA' },
    { name: 'SQL', icon: 'fa-solid fa-database', color: '#93C5FD' },
    { name: 'LangChain', icon: 'fa-solid fa-link', color: '#818CF8' },
    { name: 'Generative AI', icon: 'fa-solid fa-wand-magic-sparkles', color: '#C084FC' },
    { name: 'Agentic AI', icon: 'fa-solid fa-robot', color: '#F43F5E' },
    { name: 'OpenCV', icon: 'fa-solid fa-eye', color: '#38BDF8' },
    { name: 'NumPy & Pandas', icon: 'fa-solid fa-cube', color: '#60A5FA' },
    { name: 'Tailwind CSS', icon: 'fa-solid fa-wind', color: '#22D3EE' },
    { name: 'TypeScript', icon: 'fa-solid fa-code', color: '#60A5FA' },
    { name: 'Git & GitHub', icon: 'fa-brands fa-github', color: '#FFFFFF' },
    { name: 'Streamlit', icon: 'fa-solid fa-chart-line', color: '#FB7185' },
    { name: 'Docker', icon: 'fa-brands fa-docker', color: '#38BDF8' },
  ];

  const skillCategories = [
    {
      id: 'ai-ml',
      title: 'Machine Learning & Deep Learning',
      icon: Brain,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      description: 'End-to-end model development from mathematical formulations to real-time production inference.',
      skills: [
        { name: 'PyTorch', tag: 'Deep Learning' },
        { name: 'Scikit-Learn', tag: 'Classical ML' },
        { name: 'SHAP & Explainability', tag: 'Interpretability' },
        { name: 'Feature Engineering', tag: 'Pipelines' },
        { name: 'Computer Vision (OpenCV)', tag: 'FaceNet & CNNs' },
        { name: 'Supervised & Unsupervised', tag: 'Classification & Clustering' },
        { name: 'Model Optimization', tag: 'Hyperparameter Tuning' },
      ],
    },
    {
      id: 'ai-ml',
      title: 'Generative AI & LLMs',
      icon: Sparkles,
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/20',
      description: 'Architecting intelligent autonomous agents, semantic retrieval pipelines, and custom prompt engines.',
      skills: [
        { name: 'LLM Integration', tag: 'OpenAI / Claude' },
        { name: 'LangChain & LangGraph', tag: 'Multi-Agent Chains' },
        { name: 'RAG Architecture', tag: 'Knowledge Retrieval' },
        { name: 'Vector Databases', tag: 'FAISS / ChromaDB' },
        { name: 'Contextual Embeddings', tag: 'SBERT / Transformers' },
        { name: 'Prompt Engineering', tag: 'Few-shot & CoT' },
      ],
    },
    {
      id: 'fullstack',
      title: 'Full-Stack & Backend Systems',
      icon: Globe,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      description: 'Developing high-performance APIs, reactive user interfaces, and robust server architectures.',
      skills: [
        { name: 'Python (FastAPI / Flask)', tag: 'RESTful Microservices' },
        { name: 'React.js & Vite', tag: 'Modern Frontend' },
        { name: 'TypeScript / JavaScript', tag: 'Type-safe Apps' },
        { name: 'Node.js & Express', tag: 'Backend Runtimes' },
        { name: 'Tailwind CSS', tag: 'Responsive UI' },
        { name: 'HTML5 / Modern CSS3', tag: 'Core Standards' },
      ],
    },
    {
      id: 'data',
      title: 'Data Science & Databases',
      icon: Database,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      description: 'Relational data modeling, dimensionality reduction, statistical testing, and visualization dashboards.',
      skills: [
        { name: 'PostgreSQL & SQL', tag: 'Relational DBs' },
        { name: 'Pandas & NumPy', tag: 'Data Wrangling' },
        { name: 'Matplotlib & Seaborn', tag: 'Exploratory Viz' },
        { name: 'PCA & Dimensionality', tag: 'Variance Analysis' },
        { name: 'Streamlit & Chart.js', tag: 'Live Data Dashboards' },
      ],
    },
  ];

  const filteredCategories = activeTab === 'all' 
    ? skillCategories 
    : skillCategories.filter(c => c.id === activeTab);

  return (
    <section id="expertise" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 mb-10 text-left">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-cyber-cyan block rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Technical Expertise & Stack
            </h2>
          </div>
          <p className="text-gray-400 text-base max-w-2xl font-light">
            A comprehensive developer toolkit spanning cutting-edge machine learning research, structural databases, and modern full-stack web engineering.
          </p>
        </div>

        {/* Seamless Infinite Marquee */}
        <div className="rounded-2xl bg-obsidian-900/80 border border-white/10 p-1 relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-obsidian-900 to-transparent z-10 pointer-events-none rounded-l-2xl" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-obsidian-900 to-transparent z-10 pointer-events-none rounded-r-2xl" />

          <div className="flex gap-4 py-4 overflow-x-hidden w-full whitespace-nowrap group">
            <div className="flex gap-4 animate-scroll whitespace-nowrap">
              {marqueeSkills.map((skill, index) => (
                <div
                  key={index}
                  onMouseEnter={() => sfx.playHover()}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-obsidian-950/90 border border-white/10 hover:border-cyber-cyan/50 hover:bg-white/5 transition-all text-sm font-medium text-gray-200 cursor-default shadow-sm"
                >
                  <i className={`${skill.icon} text-base`} style={{ color: skill.color }} />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
              
            {/* Duplicated for smooth continuous loop */}
            <div className="flex gap-4 animate-scroll whitespace-nowrap" aria-hidden="true">
              {marqueeSkills.map((skill, index) => (
                <div
                  key={`dup-${index}`}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-obsidian-950/90 border border-white/10 hover:border-cyber-cyan/50 hover:bg-white/5 transition-all text-sm font-medium text-gray-200 cursor-default shadow-sm"
                >
                  <i className={`${skill.icon} text-base`} style={{ color: skill.color }} />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => { sfx.playClick(); setActiveTab('all'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-black font-bold shadow-lg'
                : 'bg-obsidian-900 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            All Disciplines
          </button>
          <button
            onClick={() => { sfx.playClick(); setActiveTab('ai-ml'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'ai-ml'
                ? 'bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/30'
                : 'bg-obsidian-900 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            AI & Machine Learning
          </button>
          <button
            onClick={() => { sfx.playClick(); setActiveTab('fullstack'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'fullstack'
                ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/30'
                : 'bg-obsidian-900 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            Full-Stack & Backend
          </button>
          <button
            onClick={() => { sfx.playClick(); setActiveTab('data'); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'data'
                ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/30'
                : 'bg-obsidian-900 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            Data & Analytics
          </button>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => sfx.playHover()}
                className="rounded-2xl glass-panel-card p-6 sm:p-7 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${cat.bgColor} border ${cat.borderColor} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${cat.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-white">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-light mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-950/80 border border-white/10 text-xs text-gray-200 hover:border-cyber-cyan/40 transition-colors"
                      >
                        <span className="font-medium text-white">{skill.name}</span>
                        <span className="text-[10px] font-mono text-gray-400 px-1 py-0.2 rounded bg-white/5">
                          {skill.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
