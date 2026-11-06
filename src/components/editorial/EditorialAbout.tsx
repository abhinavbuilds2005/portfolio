import React from 'react';
import { motion } from 'framer-motion';

export const EditorialAbout: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#132532]/10">
      {/* Top Header Row with Kicker & Annotation */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-10">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#F0784B] block mb-3">
            02 / THE PERSON BEHIND THE BUILDS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#132532] font-sans leading-[1.05]">
            Curious by default.
            <br />
            Practical by design.
          </h2>
        </div>

        {/* Top-Right Editorial Annotation */}
        <div className="font-mono text-xs uppercase tracking-wider text-[#132532]/50 text-left sm:text-right pt-2">
          <div>A SHORT INTRO</div>
          <div>NOT A MANIFESTO</div>
        </div>
      </div>

      {/* Main Narrative Area */}
      <div className="max-w-4xl mt-12 space-y-8">
        {/* Highlight Lead Quote */}
        <p className="text-2xl sm:text-3xl font-semibold text-[#132532] leading-snug">
          I like the space where{' '}
          <span className="text-[#315CFF]">models meet messy reality —</span>{' '}
          imperfect data, latency, deployment and the details that make a prototype useful.
        </p>

        {/* Body Paragraphs */}
        <div className="text-base sm:text-lg text-[#132532] text-opacity-90 leading-relaxed space-y-6 pt-4">
          <p>
            I'm pursuing a B.Tech in Computer Science and Engineering with a specialization in AI &
            Machine Learning at Lovely Professional University. My work spans predictive modelling,
            computer vision, NLP and full-stack interfaces for AI products.
          </p>
          <p>
            I care about understanding why a system works, how it fails, and what it takes to make it
            dependable. Currently sharpening my engineering fundamentals and building projects that
            demonstrate that mindset.
          </p>
        </div>
      </div>

      {/* Bottom 3-Column Metrics Grid (Matching Image 4) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 pt-8 border-t border-[#132532]/12 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#132532]/12"
      >
        {/* Metric 1 */}
        <div className="py-6 sm:py-0 sm:pr-8">
          <div className="text-6xl sm:text-7xl font-extrabold text-[#315CFF] tracking-tight font-sans mb-2">
            05
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#132532]/70 font-semibold">
            PROJECT SYSTEMS
          </div>
        </div>

        {/* Metric 2 */}
        <div className="py-6 sm:py-0 sm:px-8">
          <div className="text-6xl sm:text-7xl font-extrabold text-[#315CFF] tracking-tight font-sans mb-2">
            2029
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#132532]/70 font-semibold">
            GRADUATION YEAR
          </div>
        </div>

        {/* Metric 3 */}
        <div className="py-6 sm:py-0 sm:pl-8">
          <div className="text-6xl sm:text-7xl font-extrabold text-[#315CFF] tracking-tight font-sans mb-2">
            AI ×
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-[#132532]/70 font-semibold">
            SOFTWARE ENGINEERING
          </div>
        </div>
      </motion.div>
    </section>
  );
};

