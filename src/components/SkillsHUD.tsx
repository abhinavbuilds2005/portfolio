import React, { useState } from 'react';
import { 
  Cpu, 
  Brain, 
  Sparkles, 
  Database, 
  Terminal, 
  Code, 
  Search, 
  Zap,
  CheckCircle,
  Network
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface Skill {
  name: string;
  category: 'ML & Deep Learning' | 'GenAI & LLMs' | 'Backend & Languages' | 'Data Science & Tools';
  level: number; // 0 to 100
  highlight?: boolean;
  iconTag: string;
}

export const SkillsHUD: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const skills: Skill[] = [
    // ML & Deep Learning
    { name: 'PyTorch', category: 'ML & Deep Learning', level: 90, highlight: true, iconTag: '🔥' },
    { name: 'Scikit-Learn', category: 'ML & Deep Learning', level: 95, highlight: true, iconTag: '⚙️' },
    { name: 'Feature Engineering Pipeline', category: 'ML & Deep Learning', level: 92, highlight: true, iconTag: '🧪' },
    { name: 'Model Evaluation & Tuning', category: 'ML & Deep Learning', level: 90, iconTag: '📊' },
    { name: 'SHAP & Model Interpretability', category: 'ML & Deep Learning', level: 94, highlight: true, iconTag: '🔍' },
    { name: 'Computer Vision (OpenCV)', category: 'ML & Deep Learning', level: 88, highlight: true, iconTag: '👁️' },
    { name: 'K-Means & PCA Dimensionality', category: 'ML & Deep Learning', level: 92, iconTag: '🌌' },
    { name: 'FaceNet & Biometric Vectors', category: 'ML & Deep Learning', level: 86, iconTag: '👤' },

    // GenAI & LLMs
    { name: 'Large Language Models (LLMs)', category: 'GenAI & LLMs', level: 92, highlight: true, iconTag: '🤖' },
    { name: 'Prompt Engineering & Reasoning', category: 'GenAI & LLMs', level: 95, highlight: true, iconTag: '💬' },
    { name: 'LangChain & Agentic AI', category: 'GenAI & LLMs', level: 88, highlight: true, iconTag: '🔗' },
    { name: 'RAG Architecture (Retrieval)', category: 'GenAI & LLMs', level: 90, highlight: true, iconTag: '📚' },
    { name: 'Vector DBs (FAISS / ChromaDB)', category: 'GenAI & LLMs', level: 88, iconTag: '⚡' },
    { name: 'Hugging Face Transformers', category: 'GenAI & LLMs', level: 90, iconTag: '🤗' },
    { name: 'Semantic Embeddings & Similarity', category: 'GenAI & LLMs', level: 92, iconTag: '🧬' },
    { name: 'Multi-Agent Autonomous Systems', category: 'GenAI & LLMs', level: 85, iconTag: '🌐' },

    // Backend & Languages
    { name: 'Python (OOP, Scientific)', category: 'Backend & Languages', level: 98, highlight: true, iconTag: '🐍' },
    { name: 'PostgreSQL / SQL', category: 'Backend & Languages', level: 90, highlight: true, iconTag: '🗄️' },
    { name: 'FastAPI / RESTful APIs', category: 'Backend & Languages', level: 88, highlight: true, iconTag: '⚡' },
    { name: 'JavaScript / TypeScript', category: 'Backend & Languages', level: 85, iconTag: '📜' },
    { name: 'React.js & Node.js', category: 'Backend & Languages', level: 84, iconTag: '⚛️' },
    { name: 'Data Structures & Algorithms', category: 'Backend & Languages', level: 88, highlight: true, iconTag: '🎯' },

    // Data Science & Tools
    { name: 'Pandas & NumPy', category: 'Data Science & Tools', level: 96, highlight: true, iconTag: '🐼' },
    { name: 'Matplotlib & Seaborn', category: 'Data Science & Tools', level: 92, iconTag: '📈' },
    { name: 'Streamlit Deployment', category: 'Data Science & Tools', level: 95, highlight: true, iconTag: '🚀' },
    { name: 'Git & GitHub Workflows', category: 'Data Science & Tools', level: 94, iconTag: '🐙' },
    { name: 'VS Code & Jupyter Notebooks', category: 'Data Science & Tools', level: 96, iconTag: '💻' },
    { name: 'Linux / Shell Scripting', category: 'Data Science & Tools', level: 85, iconTag: '🐧' },
  ];

  const categories = [
    'ALL',
    'ML & Deep Learning',
    'GenAI & LLMs',
    'Backend & Languages',
    'Data Science & Tools'
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesCat = selectedCategory === 'ALL' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative z-10 cyber-dot-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-purple/15 border border-cyber-purple/30 text-xs font-mono text-cyber-purple">
              <Network className="w-3.5 h-3.5" />
              <span>NEURAL MATRIX · COMPETENCY HUD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
              Technical Arsenal & Skills Matrix
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl font-light">
              Rigorous foundations in deep learning, mathematical modeling, and production software architectures.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search neural skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-obsidian-900 border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan transition-colors"
            />
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sfx.playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={() => sfx.playHover()}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-cyber-purple text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-cyber-purple'
                  : 'bg-obsidian-900 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* HUD Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sfx.playHover()}
              className="group relative rounded-xl glass-panel p-4 border border-white/10 hover:border-cyber-cyan/40 hover:shadow-[0_0_20px_rgba(0,242,255,0.15)] transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl shrink-0">{skill.iconTag}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-cyber-cyan transition-colors">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] font-mono text-gray-400">
                      {skill.category}
                    </span>
                  </div>
                </div>

                {skill.highlight && (
                  <span className="px-1.5 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-[9px] font-mono font-bold text-cyber-cyan">
                    CORE
                  </span>
                )}
              </div>

              {/* Proficiency HUD Bar */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span>Proficiency Index</span>
                  <span className="text-cyber-cyan font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-obsidian-950 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyber-cyan via-blue-500 to-cyber-purple transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skill Category Summary Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-obsidian-950/80 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-cyber-cyan font-mono text-xs mb-2">
              <Brain className="w-4 h-4" />
              <span>MACHINE LEARNING</span>
            </div>
            <p className="text-xs text-gray-300 font-light">
              Supervised, Unsupervised, SHAP interpretability & real-time risk scoring algorithms.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-950/80 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-cyber-purple font-mono text-xs mb-2">
              <Sparkles className="w-4 h-4" />
              <span>GENERATIVE AI</span>
            </div>
            <p className="text-xs text-gray-300 font-light">
              LLMs, Multi-Agent pipelines, RAG retrieval flows, contextual SBERT embeddings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-950/80 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs mb-2">
              <Database className="w-4 h-4" />
              <span>DATA & BACKEND</span>
            </div>
            <p className="text-xs text-gray-300 font-light">
              PostgreSQL, Vector DBs, FastAPI microservices, and robust data manipulation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-950/80 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs mb-2">
              <Zap className="w-4 h-4" />
              <span>COMPUTER VISION</span>
            </div>
            <p className="text-xs text-gray-300 font-light">
              FaceNet face recognition, OpenCV streams, and multimodal acoustic speaker verification.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
