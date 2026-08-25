import React from 'react';
import { GraduationCap, Award, Rocket, CheckCircle, Sparkles, Calendar, MapPin } from 'lucide-react';
import { sfx } from '../utils/audio';

export const ExperienceTimeline: React.FC = () => {
  const milestones = [
    {
      period: '2025 — 2029',
      title: 'BTech in Computer Science & Engineering (AIML)',
      institution: 'Lovely Professional University, Jalandhar',
      type: 'ACADEMIC MILESTONE',
      icon: GraduationCap,
      description: 'Specializing in Artificial Intelligence, Deep Learning architectures, Natural Language Processing, and scalable computing systems.',
      tags: ['Machine Learning', 'Data Structures & Algorithms', 'Calculus & Linear Algebra', 'Neural Systems'],
    },
    {
      period: '2026 — Present',
      title: 'AI/ML Production Systems & Deployed Applications',
      institution: 'Independent Research & Open-Source Engineering',
      type: 'PRODUCTION ENGINEERING',
      icon: Rocket,
      description: 'Engineered and deployed 3+ production ML frameworks including CreditWise (SHAP explainability) and SmartCart (PCA customer intelligence).',
      tags: ['Streamlit', 'Vercel Deployment', 'Scikit-Learn Pipelines', 'SHAP Interpretability'],
    },
    {
      period: '2026',
      title: 'Multimodal Biometric & Voice Authentication',
      institution: 'Advanced Computer Vision & Audio ML',
      type: 'SYSTEM INNOVATION',
      icon: Award,
      description: 'Designed PresentAI: an anti-spoof biometric framework pairing FaceNet facial embeddings with acoustic speaker verification in PostgreSQL.',
      tags: ['OpenCV', 'FaceNet', 'Acoustic Biometrics', 'PostgreSQL'],
    },
  ];

  return (
    <section id="experience" className="py-24 relative z-10 cyber-grid-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-purple/15 border border-cyber-purple/30 text-xs font-mono text-cyber-purple">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CHRONOLOGY · ACADEMIC & ENGINEERING JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Milestones & Education
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light max-w-xl mx-auto">
            Combining rigorous academic foundations with practical, hands-on production engineering.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-white/10 ml-4 sm:ml-32 space-y-12">
          {milestones.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onMouseEnter={() => sfx.playHover()}
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-[17px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-obsidian-950 border-2 border-cyber-cyan group-hover:border-white group-hover:shadow-[0_0_15px_rgba(0,242,255,0.8)] transition-all">
                  <Icon className="w-3.5 h-3.5 text-cyber-cyan group-hover:text-white transition-colors" />
                </div>

                {/* Left Floating Period on desktop */}
                <div className="sm:absolute sm:-left-32 sm:top-2 sm:text-right font-mono text-xs text-cyber-cyan font-bold mb-1 sm:mb-0">
                  {item.period}
                </div>

                {/* Card Body */}
                <div className="rounded-2xl glass-panel-card p-6 border border-white/10 group-hover:border-cyber-cyan/40 transition-all text-left">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                      {item.type}
                    </span>
                    <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyber-purple" />
                      India
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white group-hover:text-cyber-cyan transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-gray-400 mb-3">
                    {item.institution}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-obsidian-950 border border-white/10 text-[10px] font-mono text-gray-300"
                      >
                        {t}
                      </span>
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
