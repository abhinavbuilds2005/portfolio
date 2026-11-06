import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ExternalLink } from 'lucide-react';

export const EditorialHero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-16 px-6 sm:px-12 flex flex-col justify-between max-w-7xl mx-auto overflow-hidden">
      {/* Asymmetric Background Architectural Ring Disc (from Reference Image 1) */}
      <div
        className="absolute top-12 right-[-60px] sm:right-[-20px] lg:right-[40px] w-[340px] sm:w-[480px] lg:w-[600px] h-[340px] sm:h-[480px] lg:h-[600px] rounded-full pointer-events-none -z-0"
        style={{
          background: 'radial-gradient(circle, rgba(235, 230, 218, 0.6) 0%, rgba(245, 242, 235, 0.2) 65%, rgba(245, 242, 235, 0) 70%)',
          border: '1px solid rgba(19, 37, 50, 0.08)'
        }}
      >
        {/* Inner subtle concentric ring */}
        <div className="absolute inset-12 sm:inset-16 rounded-full border border-[#132532]/5" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-4xl">
        {/* Kicker tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#F0784B] mb-6 flex items-center gap-2"
        >
          <span>INDEPENDENT MIND, ENGINEERED SYSTEMS — 2026</span>
        </motion.div>

        {/* Giant Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[-0.035em] leading-[0.92] text-[#132532] font-sans"
        >
          <div className="block">Making</div>
          <div className="flex items-baseline flex-wrap gap-x-3 sm:gap-x-4">
            {/* Outlined "AI" */}
            <span className="text-stroke-ink text-transparent">AI</span>
            <span>feel</span>
          </div>
          <div className="block text-[#315CFF]">useful.</div>
        </motion.div>

        {/* Mission Statement Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg sm:text-xl text-[#132532]/80 font-normal leading-relaxed max-w-2xl mt-8"
        >
          I'm Abhinav — a computer science student focused on building practical machine
          learning systems, computer vision tools, and thoughtful software. Less hype. More
          things that work.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center gap-4 sm:gap-6 mt-10"
        >
          {/* Primary CTA with Persimmon Drop Shadow */}
          <a
            href="#work"
            className="btn-editorial-primary text-xs sm:text-sm"
          >
            <span>EXPLORE SELECTED WORK</span>
            <ArrowDownRight className="w-4 h-4 text-white" />
          </a>

          {/* Secondary Outline CTA */}
          <a
            href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial-outline text-xs sm:text-sm"
          >
            <span>VIEW RÉSUMÉ</span>
            <ExternalLink className="w-4 h-4 text-[#132532]" />
          </a>
        </motion.div>
      </div>

      {/* Meta Profile Bar (Matching Bottom of Image 1) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="relative z-10 pt-16 mt-8 border-t border-[#132532]/10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start"
      >
        {/* Left Column: Avatar Photo Card */}
        <div className="sm:col-span-3 flex items-center gap-4">
          <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-none border border-[#132532]/20 bg-white p-1 shadow-sm overflow-hidden flex-shrink-0">
            <img
              src="/abhinav.png"
              alt="Abhinav Anand"
              className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
              loading="eager"
            />
          </div>
          <div className="sm:hidden font-mono text-xs">
            <div className="text-[#315CFF] font-semibold uppercase">Abhinav Anand</div>
            <div className="text-[#132532]/70 text-[11px]">B.Tech CSE (AI/ML)</div>
          </div>
        </div>

        {/* Middle Column: Currently */}
        <div className="sm:col-span-5 font-mono text-xs sm:text-sm space-y-1">
          <div className="text-[#315CFF] font-semibold tracking-wider uppercase text-[11px] sm:text-xs">
            Currently
          </div>
          <div className="text-[#132532] font-medium">
            B.Tech CSE · AI & Machine Learning
          </div>
          <div className="text-[#132532]/65 text-xs">
            Lovely Professional University
          </div>
        </div>

        {/* Right Column: Based in */}
        <div className="sm:col-span-4 font-mono text-xs sm:text-sm space-y-1">
          <div className="text-[#315CFF] font-semibold tracking-wider uppercase text-[11px] sm:text-xs">
            Based in
          </div>
          <div className="text-[#132532] font-medium">
            Punjab, India · Class of 2029
          </div>
          <div className="text-[#132532]/65 text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for AI/ML Internships</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

