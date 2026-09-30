import React, { useState, useEffect, useRef } from 'react';
import { Award, BookOpen, BarChart3, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { CERTIFICATIONS, CURRENTLY_LEARNING } from '../../data/certifications';
import { calculateTechUsage } from '../../lib/utils';

export const SkillsSection: React.FC = () => {
  const [animatedBars, setAnimatedBars] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamically calculate feature importance from real project data
  const techUsageList = calculateTechUsage(PROJECTS).slice(0, 10);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimatedBars(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedBars) {
          setAnimatedBars(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [animatedBars]);

  return (
    <section id="skills" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#2b2a27]/60">
      
      {/* Section Meta Header */}
      <div className="flex items-center justify-between py-2 border-b border-[#2b2a27]/60 mb-8 font-mono text-[11px] text-[#78716c]">
        <div className="flex items-center gap-2">
          <span className="text-[#e58b24] font-semibold">[03]</span>
          <span className="uppercase tracking-wider">SKILLS // FEATURE IMPORTANCE & CREDENTIALS</span>
        </div>
        <div>
          <span>DYNAMICALLY COMPUTED FROM {PROJECTS.length} REPOSITORIES</span>
        </div>
      </div>

      {/* Headline */}
      <div className="max-w-3xl mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-3">
          Technical Capabilities & Feature Importance
        </h2>
        <p className="text-sm sm:text-base text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed">
          Instead of subjective 5-star skill ratings, below is an empirical feature-importance breakdown indicating how frequently each core framework and algorithm appears across my verified projects.
        </p>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Left: Dynamic Feature Importance Bars (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2b2a27]/60">
            <div className="flex items-center gap-2 font-mono text-xs text-[#e58b24] font-semibold">
              <BarChart3 className="w-4 h-4" />
              <span>EMPIRICAL FEATURE IMPORTANCE (TOOL USAGE)</span>
            </div>
            <span className="font-mono text-[10px] text-[#78716c]">
              Frequency across projects
            </span>
          </div>

          <div className="space-y-3.5">
            {techUsageList.map((item, idx) => (
              <div key={item.name} className="group">
                <div className="flex justify-between items-center text-xs font-mono mb-1">
                  <span className="text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] font-medium group-hover:text-[#e58b24] transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[#78716c]">
                    {item.count} {item.count === 1 ? 'project' : 'projects'} ({item.percentage}%)
                  </span>
                </div>

                {/* Progress bar track */}
                <div className="w-full h-2 rounded-full bg-[#121212] overflow-hidden border border-[#2b2a27]/50">
                  <div
                    className="h-full bg-[#e58b24] dark:bg-[#e58b24] light:bg-[#c84b31] rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: animatedBars ? `${item.percentage}%` : '0%',
                      transitionDelay: `${idx * 40}ms`
                    }}
                  />
                </div>

                <div className="text-[10px] text-[#78716c] truncate mt-0.5 opacity-80">
                  Used in: {item.projects.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Verified Credentials (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="p-6 rounded border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#2b2a27]/60 font-mono text-xs text-[#e58b24] font-semibold">
              <Award className="w-4 h-4" />
              <span>VERIFIED CERTIFICATIONS</span>
            </div>

            <div className="space-y-3">
              {CERTIFICATIONS.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between p-3 rounded border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] hover:border-[#e58b24]/50 transition-colors group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] group-hover:text-[#e58b24] transition-colors">
                      {cert.title}
                    </h4>
                    <div className="font-mono text-[11px] text-[#78716c] mt-0.5">
                      {cert.platform} // {cert.tag}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#78716c] group-hover:text-[#e58b24] mt-1 shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>

          {/* Academic Background summary */}
          <div className="p-4 rounded border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5]">
            <div className="font-mono text-[10px] text-[#e58b24] uppercase mb-1">
              Academic Background
            </div>
            <div className="text-xs font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
              Lovely Professional University, Jalandhar
            </div>
            <div className="font-mono text-[11px] text-[#a8a29e] mt-0.5">
              B.Tech in Computer Science & Engineering (AI/ML) · Class of 2025–2029
            </div>
          </div>
        </div>

      </div>

      {/* "Currently Learning" Strip (Replacing LeetCode stats block) */}
      <div className="p-6 rounded border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#2b2a27]/60 font-mono text-xs text-[#e58b24] font-semibold">
          <BookOpen className="w-4 h-4" />
          <span>CURRENTLY LEARNING & RESEARCH FOCUS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CURRENTLY_LEARNING.map((item) => (
            <div
              key={item.topic}
              className="p-3.5 rounded border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-[#e58b24]/10 text-[#e58b24] border border-[#e58b24]/30">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-1">
                  {item.topic}
                </h4>
                <p className="text-[11px] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#78716c] leading-relaxed">
                  {item.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
