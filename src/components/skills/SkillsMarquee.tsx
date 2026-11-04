import React from 'react';
import { 
  Brain, 
  Cpu, 
  Eye, 
  Layers, 
  Server, 
  Database, 
  Terminal, 
  GitBranch, 
  Box, 
  Zap, 
  Activity, 
  Search,
  Code2,
  Workflow
} from 'lucide-react';

interface MarqueeSkill {
  name: string;
  tag: string;
  category: 'ml' | 'systems';
  icon: React.ComponentType<{ className?: string }>;
}

const ROW_ONE_SKILLS: MarqueeSkill[] = [
  { name: 'PyTorch', tag: 'Deep Learning', category: 'ml', icon: Brain },
  { name: 'Hugging Face', tag: 'Transformers', category: 'ml', icon: Layers },
  { name: 'OpenCV', tag: 'Computer Vision', category: 'ml', icon: Eye },
  { name: 'ONNX Runtime', tag: 'Inference Engine', category: 'ml', icon: Zap },
  { name: 'Scikit-Learn', tag: 'Predictive ML', category: 'ml', icon: Activity },
  { name: 'FAISS', tag: 'Vector Search', category: 'ml', icon: Search },
  { name: 'CUDA', tag: 'GPU Acceleration', category: 'ml', icon: Cpu },
  { name: 'LangChain', tag: 'LLM Orchestration', category: 'ml', icon: Workflow },
  { name: 'TensorFlow', tag: 'Neural Nets', category: 'ml', icon: Brain },
  { name: 'Error Level Analysis (ELA)', tag: 'Forensics', category: 'ml', icon: Eye },
  { name: 'LightGBM / XGBoost', tag: 'Ensemble Models', category: 'ml', icon: Activity },
  { name: 'SentenceTransformers', tag: 'Dense Embeddings', category: 'ml', icon: Layers },
];

const ROW_TWO_SKILLS: MarqueeSkill[] = [
  { name: 'Python 3.12', tag: 'Core Language', category: 'systems', icon: Terminal },
  { name: 'C++20 (STL)', tag: 'DSA & Memory', category: 'systems', icon: Code2 },
  { name: 'FastAPI', tag: 'Async Microservices', category: 'systems', icon: Zap },
  { name: 'Docker', tag: 'Containerization', category: 'systems', icon: Box },
  { name: 'PostgreSQL', tag: 'Relational DB', category: 'systems', icon: Database },
  { name: 'Redis', tag: 'In-Memory Cache', category: 'systems', icon: Database },
  { name: 'Ray Distributed', tag: 'Cluster Compute', category: 'systems', icon: Workflow },
  { name: 'Linux / Bash', tag: 'OS Internals', category: 'systems', icon: Terminal },
  { name: 'Git & CI/CD', tag: 'Version Control', category: 'systems', icon: GitBranch },
  { name: 'Triton Server', tag: 'Model Serving', category: 'systems', icon: Server },
  { name: 'NumPy & SciPy', tag: 'Tensor Math', category: 'systems', icon: Activity },
  { name: 'Verhoeff D5 & ICAO', tag: 'Deterministic Checksums', category: 'systems', icon: Zap },
];

const SkillPill: React.FC<{ item: MarqueeSkill }> = ({ item }) => {
  const Icon = item.icon;
  const isML = item.category === 'ml';

  return (
    <div
      className="group relative flex items-center gap-3 px-4 py-2.5 rounded-lg border border-white/[0.08] bg-[#0F172A]/80 backdrop-blur-md shadow-sm hover:border-cyan-400/40 hover:bg-[#1E293B]/90 transition-all duration-200 select-none cursor-default shrink-0"
    >
      {/* Subtle indicator dot / icon */}
      <div
        className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${
          isML
            ? 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20'
            : 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20'
        }`}
      >
        <Icon className="w-3.5 h-3.5" />
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-semibold text-slate-100 tracking-tight group-hover:text-cyan-300 transition-colors">
          {item.name}
        </span>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          {item.tag}
        </span>
      </div>

      {/* Subtle hover radial glow */}
      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial-gradient from-cyan-500/5 to-transparent" />
    </div>
  );
};

export const SkillsMarquee: React.FC = () => {
  // Duplicate arrays to ensure seamless infinite looping with CSS translate3d
  const rowOneItems = [...ROW_ONE_SKILLS, ...ROW_ONE_SKILLS];
  const rowTwoItems = [...ROW_TWO_SKILLS, ...ROW_TWO_SKILLS];

  return (
    <section id="skills-stream" className="scroll-mt-20 relative py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Stream Section Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-mono mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>PRODUCTION TECH STACK & ENGINE MATRIX</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
          Flowing Skills Stream
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mt-1 font-mono">
          GPU-accelerated telemetry across machine learning frameworks, forensic computer vision, and scalable backend infrastructure.
        </p>
      </div>

      {/* Dual Row Infinite Marquee Container with Edge Fade Masks */}
      <div className="relative w-full overflow-hidden mask-marquee py-2 space-y-4">
        {/* Row 1: AI / Deep Learning / Vision (Left Scroll) */}
        <div className="flex animate-marquee-left gap-4 hover:cursor-grab active:cursor-grabbing">
          {rowOneItems.map((item, index) => (
            <SkillPill key={`row1-${item.name}-${index}`} item={item} />
          ))}
        </div>

        {/* Row 2: Systems / MLOps / Backend (Right Scroll) */}
        <div className="flex animate-marquee-right gap-4 hover:cursor-grab active:cursor-grabbing">
          {rowTwoItems.map((item, index) => (
            <SkillPill key={`row2-${item.name}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
