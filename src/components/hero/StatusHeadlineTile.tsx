import React from 'react';
import { ArrowDown, FileText, Github, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export const StatusHeadlineTile: React.FC = () => {
  return (
    <div className="flex flex-col justify-between p-7 sm:p-9 rounded-xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-xl relative overflow-hidden h-full">
      
      {/* Subtle radial ambient glow behind headline */}
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-[#6366F1]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#22D3EE]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        
        {/* Top identity & Availability Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/25">
              AI / ML ENGINEER
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for Internships & Projects</span>
          </div>
        </div>

        {/* Name Header */}
        <div className="mb-2">
          <span className="font-mono text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#667085] tracking-widest uppercase">
            Abhinav Anand
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] mb-5 leading-[1.15]">
          I build AI systems that move from experiments to production.
        </h1>

        {/* Sub-headline core pillars */}
        <p className="text-sm sm:text-base text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed mb-6 max-w-xl">
          Specializing in <span className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-medium">Machine Learning</span>, <span className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-medium">Deep Learning</span>, <span className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-medium">Generative AI</span>, and <span className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-medium">Computer Vision</span>. Focused on empirical evaluation, data pipeline resilience, and production engineering.
        </p>

        {/* Academic credentials strip */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 py-3 px-4 rounded-lg border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] text-xs font-mono text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] mb-8">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#6366F1]" />
            <span className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-medium">B.Tech CSE (AI/ML)</span>
            <span>· Lovely Professional University</span>
          </div>
          <span className="text-[#667085] hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-[#667085] dark:text-[#667085] light:text-[#64748B]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Class of 2029</span>
          </div>
        </div>

      </div>

      {/* Action CTAs */}
      <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium tracking-wide bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-all shadow-subtle-glow"
        >
          <span>View Projects</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>

        <a
          href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium tracking-wide border border-white/10 dark:border-white/10 light:border-black/10 hover:border-white/25 bg-[#151B22] dark:bg-[#151B22] light:bg-white text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] transition-colors"
        >
          <FileText className="w-3.5 h-3.5 text-[#9AA4B2]" />
          <span>Download Resume</span>
        </a>

        <a
          href="https://github.com/abhinavbuilds2005"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium tracking-wide border border-white/10 dark:border-white/10 light:border-black/10 hover:border-white/25 bg-[#151B22] dark:bg-[#151B22] light:bg-white text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] transition-colors"
        >
          <Github className="w-3.5 h-3.5 text-[#9AA4B2]" />
          <span>GitHub</span>
        </a>
      </div>

    </div>
  );
};
