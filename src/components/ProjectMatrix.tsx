import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  BookOpen, 
  CheckCircle, 
  Sparkles,
  Layers,
  ArrowRight,
  X
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface Project {
  id: string;
  title: string;
  badge: string;
  category: 'ai-ml' | 'web-dev' | 'upcoming';
  description: string;
  problem: string;
  solution: string;
  tags: { name: string; icon: string; color: string }[];
  liveUrl?: string;
  githubUrl: string;
  image: string;
  keyFeatures: string[];
}

export const ProjectMatrix: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai-ml' | 'web-dev' | 'upcoming'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'creditwise',
      title: 'CreditWise — AI Loan Risk Scoring System',
      badge: 'Live',
      category: 'ai-ml',
      description: 'An end-to-end loan risk scoring framework. Built with custom feature engineering pipelines, model explainability via SHAP, and real-time decision analytics deployed on Streamlit & Vercel.',
      problem: 'Traditional financial credit scoring systems often operate as black boxes, preventing loan officers from understanding why an applicant was approved or denied.',
      solution: 'CreditWise provides an interpretable machine learning pipeline that exposes real-time SHAP force plots, feature attribution charts, and model confidence directly in the browser.',
      tags: [
        { name: 'Python', icon: 'fa-brands fa-python', color: '#FCD34D' },
        { name: 'Logistic Regression', icon: 'fa-solid fa-brain', color: '#818CF8' },
        { name: 'SHAP Explainability', icon: 'fa-solid fa-chart-pie', color: '#34D399' },
        { name: 'Streamlit', icon: 'fa-solid fa-chart-line', color: '#FB7185' },
        { name: 'Vercel', icon: 'fa-solid fa-cloud', color: '#38BDF8' },
      ],
      liveUrl: 'https://credishield-one.vercel.app/',
      githubUrl: 'https://github.com/abhinavbuilds2005/CreditWise-Loan-Risk-Prediction-System',
      image: '/project_creditwise_1775755763976.png',
      keyFeatures: [
        'Custom scikit-learn preprocessing pipelines for debt-to-income and credit utilization ratios.',
        'Real-time SHAP explainability calculations surfacing individual feature impact.',
        'Low latency UI serving prediction confidence intervals directly to non-technical users.',
        'Continuous automated testing and deployment pipeline on Vercel.',
      ]
    },
    {
      id: 'smartcart',
      title: 'SmartCart — Customer Intelligence & Churn AI',
      badge: 'Live',
      category: 'ai-ml',
      description: 'E-commerce customer segmentation and churn intelligence platform utilizing K-Means clustering and PCA dimensionality reduction to drive personalized retention campaigns.',
      problem: 'E-commerce stores lose up to 30% of their customer base yearly because marketing campaigns treat all customer cohorts identically without behavioral awareness.',
      solution: 'SmartCart performs automated RFM analysis, PCA dimensionality compression, and K-Means segmentation with optimal cluster detection to score churn risk and suggest targeted actions.',
      tags: [
        { name: 'Python', icon: 'fa-brands fa-python', color: '#FCD34D' },
        { name: 'K-Means Clustering', icon: 'fa-solid fa-network-wired', color: '#FB923C' },
        { name: 'PCA Analysis', icon: 'fa-solid fa-cube', color: '#60A5FA' },
        { name: 'Chart.js', icon: 'fa-solid fa-chart-area', color: '#38BDF8' },
        { name: 'Netlify', icon: 'fa-solid fa-globe', color: '#34D399' },
      ],
      liveUrl: 'https://smartcart-recommendation-system.netlify.app/',
      githubUrl: 'https://github.com/abhinavbuilds2005/Smartcart-Recommendation-system',
      image: '/project_customer_ai_1775755777519.png',
      keyFeatures: [
        'High-dimensional RFM (Recency, Frequency, Monetary) data transformation pipeline.',
        'PCA projection revealing cluster variance ratios and behavioral boundaries.',
        'Automated optimal K determination via Silhouette scoring and Elbow curve.',
        'Interactive client-side data exploration charts with instant segment filtering.',
      ]
    },
    {
      id: 'presentai',
      title: 'PresentAI — Multimodal Biometric Attendance',
      badge: 'Live',
      category: 'ai-ml',
      description: 'A contact-free multimodal biometric attendance framework that validates identity using real-time FaceNet facial embeddings and acoustic speaker verification.',
      problem: 'Traditional attendance systems like RFID cards or fingerprint scanners suffer from proxy attendance, touch contamination, and high hardware maintenance overhead.',
      solution: 'PresentAI combines webcam-based face detection with deep acoustic voiceprint matching to ensure dual-factor anti-spoof biometric authentication stored in PostgreSQL.',
      tags: [
        { name: 'Python', icon: 'fa-brands fa-python', color: '#FCD34D' },
        { name: 'OpenCV & FaceNet', icon: 'fa-solid fa-eye', color: '#38BDF8' },
        { name: 'Voice Biometrics', icon: 'fa-solid fa-microphone', color: '#C084FC' },
        { name: 'PostgreSQL', icon: 'fa-solid fa-server', color: '#60A5FA' },
        { name: 'Render', icon: 'fa-solid fa-cloud', color: '#4ADE80' },
      ],
      liveUrl: 'https://presentai-attendance.onrender.com',
      githubUrl: 'https://github.com/abhinavbuilds2005/AI-Powered-Attendance-Platform',
      image: '/project_attendance_system.jpg',
      keyFeatures: [
        '128-dimensional facial embedding vector extraction and cosine metric distance matching.',
        'Real-time webcam video stream landmark tracking using OpenCV cascades.',
        'Secondary acoustic voiceprint spectral verification preventing photo/video spoofing.',
        'Indexed vector lookups in PostgreSQL delivering sub-second attendance logging.',
      ]
    },
    {
      id: 'ats-resume',
      title: 'ATS Resume Analyser & Generative Matcher',
      badge: 'In Progress',
      category: 'upcoming',
      description: 'An AI-powered applicant tracking analyzer that parses candidate resumes, computes contextual embeddings against target job descriptions, and generates recruiter-aligned rewrite suggestions.',
      problem: 'Job applicants struggle to understand how automated enterprise ATS algorithms filter their resumes before a human recruiter ever sees them.',
      solution: 'Parses resume text into structured technical entities, computes semantic cosine match against job descriptions, and provides generative suggestions to maximize keyword alignment.',
      tags: [
        { name: 'NLP & SBERT', icon: 'fa-solid fa-brain', color: '#818CF8' },
        { name: 'Generative AI', icon: 'fa-solid fa-wand-magic-sparkles', color: '#C084FC' },
        { name: 'Streamlit', icon: 'fa-solid fa-chart-line', color: '#FB7185' },
        { name: 'Python', icon: 'fa-brands fa-python', color: '#FCD34D' },
      ],
      liveUrl: 'https://github.com/abhinavbuilds2005',
      githubUrl: 'https://github.com/abhinavbuilds2005',
      image: '/project_portfolio_1775755792684.png',
      keyFeatures: [
        'Contextual embedding matching evaluating semantic alignment beyond exact keywords.',
        'Automated skill gap extraction categorizing missing critical technical proficiencies.',
        'Generative LLM prompt chain generating quantifiable resume bullet enhancements.',
      ]
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="work" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-cyber-cyan block rounded-full" />
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Selected Work & Systems
              </h2>
            </div>
            <p className="text-gray-400 text-base max-w-xl font-light">
              End-to-end intelligent systems, machine learning pipelines, and full-stack applications built for scalability and real-world impact.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-obsidian-900/90 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
            <button
              onClick={() => { sfx.playClick(); setActiveFilter('all'); }}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === 'all' ? 'bg-white text-black font-bold shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => { sfx.playClick(); setActiveFilter('ai-ml'); }}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === 'ai-ml' ? 'bg-white text-black font-bold shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              AI & ML
            </button>
            <button
              onClick={() => { sfx.playClick(); setActiveFilter('upcoming'); }}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === 'upcoming' ? 'bg-white text-black font-bold shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Upcoming
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl glass-panel-card p-6 sm:p-10 border border-white/10 hover:border-white/25 transition-all text-left"
              onMouseEnter={() => sfx.playHover()}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Side: Content */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-cyber-cyan transition-colors">
                      {project.title}
                    </h3>
                    <span className={`px-3 py-0.5 text-xs font-mono font-semibold rounded-full border ${
                      project.badge === 'Live' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {project.badge}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-obsidian-950/90 border border-white/10 text-xs font-medium text-gray-300"
                      >
                        <i className={t.icon} style={{ color: t.color }} />
                        <span>{t.name}</span>
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        sfx.playClick();
                        setSelectedProject(project);
                      }}
                      className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Case Study</span>
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sfx.playClick()}
                        className="p-2.5 rounded-full border border-white/10 hover:border-cyber-cyan hover:bg-white/5 text-white transition-all hover:scale-105"
                        title="Open Live Application"
                      >
                        <ExternalLink className="w-4 h-4 text-cyber-cyan" />
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sfx.playClick()}
                      className="p-2.5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 text-white transition-all hover:scale-105"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Right Side: Image Window */}
                <div className="lg:col-span-5 aspect-video rounded-2xl overflow-hidden bg-obsidian-950 border border-white/10 group-hover:border-cyber-cyan/40 transition-colors relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-40 pointer-events-none" />
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-obsidian-900 border border-white/15 p-6 sm:p-8 text-left shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-cyber-cyan uppercase font-bold">
                  PROJECT CASE STUDY
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  sfx.playClick();
                  setSelectedProject(null);
                }}
                className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Problem & Solution */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-obsidian-950 border border-white/10 space-y-1">
                <h4 className="text-xs font-mono uppercase text-rose-400 font-bold">Problem Statement</h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                  {selectedProject.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-950 border border-white/10 space-y-1">
                <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold">Architectural Solution</h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                  {selectedProject.solution}
                </p>
              </div>
            </div>

            {/* Key Engineering Features */}
            <div>
              <h4 className="text-xs font-mono uppercase text-gray-400 font-bold mb-3">
                Key Engineering Highlights
              </h4>
              <ul className="space-y-2.5">
                {selectedProject.keyFeatures.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 font-light">
                    <CheckCircle className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-mono uppercase text-gray-400 font-bold mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-obsidian-950 border border-white/10 text-xs font-medium text-gray-200"
                  >
                    <i className={t.icon} style={{ color: t.color }} />
                    <span>{t.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sfx.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-obsidian-950 border border-white/10 hover:border-white/30 text-xs font-semibold text-gray-200 hover:text-white transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View Repository</span>
              </a>

              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sfx.playSuccess()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-gray-200 transition-all shadow-lg"
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
