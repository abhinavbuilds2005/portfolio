import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Code, Trophy, ShoppingCart, Cpu, CheckCircle2, FileText } from 'lucide-react';
import { Project } from '../../lib/types';
import { PROJECTS } from '../../data/projects';

interface FeaturedProjectsProps {
  onOpenCaseStudy: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onOpenCaseStudy }) => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Retrieve projects
  const docushieldProject = PROJECTS.find((p) => p.id === 'docushield') || PROJECTS[0];
  const smartcartProject = PROJECTS.find((p) => p.id === 'smartcart') || PROJECTS[3];
  const atsProject = PROJECTS.find((p) => p.id === 'ats-resume') || PROJECTS[2];
  const otherProjects = PROJECTS.filter((p) => p.id !== 'docushield' && p.id !== 'smartcart' && p.id !== 'ats-resume');

  return (
    <section id="projects" className="py-20 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#6366F1] block mb-2">
            — PROJECTS
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight font-sans">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl mt-3 leading-relaxed font-normal">
            A selection of my work focused on AI/ML, Computer Vision and real-world problem-solving. Each project reflects my approach, implementation and impact.
          </p>
        </div>

        <button
          onClick={() => setShowAllProjects(!showAllProjects)}
          className="inline-flex items-center gap-2 bg-white text-[#111827] border border-[#E5E7EB] hover:bg-slate-50 hover:border-slate-300 active:scale-95 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-xs transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          <span>{showAllProjects ? 'Show Featured Only' : 'View All Projects'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* FEATURED PROJECTS ASYMMETRIC GRID                                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ======================================================================= */}
        {/* 1. MAIN SPOTLIGHT CARD: DOCUSHIELD AI (Left / 7 cols)                   */}
        {/* ======================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 bg-gradient-to-br from-[#101726] via-[#0F1420] to-[#0A0D15] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(15,23,42,0.25)] flex flex-col justify-between"
        >
          {/* Subtle Ambient Purple Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#6366F1]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Row: SIH Badge */}
          <div className="flex items-center justify-between mb-5 z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1 rounded-full text-xs font-semibold text-amber-300">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>SIH 2026</span>
            </span>

            <a
              href="https://github.com/abhinavbuilds2005/DocuShield"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="Open GitHub Repository"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Middle Content & 3D Aadhaar Graphic Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto z-10">
            {/* Project Details (Cols 1-7) */}
            <div className="md:col-span-6 lg:col-span-7">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2 group">
                <span className="group-hover:text-indigo-300 transition-colors">DocuShield AI</span>
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-indigo-300 transition-colors" />
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed font-normal">
                AI-Based Identity & Document Forensic Screening System for Aadhaar, PAN, Driving License & Passport.
              </p>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2 mt-5">
                {['Computer Vision', 'OCR', 'FastAPI', 'React'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/10 text-slate-200 text-xs px-3 py-1 rounded-full font-medium border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  onClick={() => onOpenCaseStudy(docushieldProject)}
                  className="inline-flex items-center gap-2 bg-white text-[#111827] hover:bg-slate-100 active:scale-95 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-sm transition-all cursor-pointer"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://github.com/abhinavbuilds2005/DocuShield"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-transparent border border-white/20 text-white hover:bg-white/10 active:scale-95 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              </div>
            </div>

            {/* 3D Realistic Aadhaar Card Mockup (Cols 8-12) */}
            <div className="md:col-span-6 lg:col-span-5 relative flex items-center justify-center pt-4 md:pt-0">
              {/* Outer Neon Glow Frame */}
              <div className="absolute inset-0 border border-[#8B5CF6]/50 rounded-2xl blur-xs pointer-events-none" />

              {/* Tilted Aadhaar Card */}
              <div className="w-full max-w-[280px] bg-[#FAF8F5] text-slate-800 rounded-xl p-3.5 shadow-2xl border border-white/80 relative transform rotate-y-[-8deg] rotate-x-[4deg] hover:rotate-0 transition-transform duration-500">
                {/* Top Indian Tricolor Accent Line */}
                <div className="h-0.5 w-full bg-gradient-to-r from-[#FF9933] via-slate-300 to-[#128807] mb-2 rounded-full" />

                {/* Header: Emblem & Government of India */}
                <div className="flex items-center justify-between border-b border-slate-300/80 pb-1.5 mb-2">
                  <div className="flex items-center gap-1.5">
                    {/* Ashoka Emblem Silhouette SVG */}
                    <svg className="w-4 h-4 text-amber-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L14 6H10L12 2ZM8 7H16V9H8V7ZM7 10H17V12H7V10ZM9 13H15V15H9V13ZM6 16H18V18H6V16ZM4 19H20V21H4V19Z" />
                    </svg>
                    <div>
                      <div className="text-[9px] font-bold text-slate-900 leading-none">भारत सरकार</div>
                      <div className="text-[7.5px] font-medium text-slate-700 leading-none">Government of India</div>
                    </div>
                  </div>
                  {/* Biometric Fingerprint Icon */}
                  <div className="text-amber-800">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 11c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" />
                      <path d="M12 2a10 10 0 0 0-7.07 17.07M12 22a10 10 0 0 0 7.07-17.07" strokeDasharray="3 3" />
                    </svg>
                  </div>
                </div>

                {/* Body: Photo & Details & QR Code */}
                <div className="flex items-center gap-2 mb-2">
                  {/* Photo Silhouette Frame */}
                  <div className="w-13 h-15 bg-slate-300 rounded border border-slate-400 flex items-center justify-center text-slate-500 overflow-hidden shrink-0">
                    <svg className="w-7 h-7 fill-current text-slate-400" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>

                  {/* Redacted Mock Text Lines */}
                  <div className="space-y-1.5 flex-1">
                    <div className="h-2 bg-slate-300 rounded w-4/5" />
                    <div className="h-1.5 bg-slate-200 rounded w-full" />
                    <div className="h-1.5 bg-slate-200 rounded w-3/4" />
                    <div className="h-1.5 bg-slate-200 rounded w-2/3" />
                  </div>

                  {/* QR Matrix */}
                  <div className="w-12 h-12 bg-white border border-slate-300 p-0.5 rounded shrink-0 flex items-center justify-center">
                    <div className="w-full h-full bg-slate-900 grid grid-cols-3 gap-0.5 p-0.5">
                      <div className="bg-white" />
                      <div className="bg-slate-900" />
                      <div className="bg-white" />
                      <div className="bg-slate-900" />
                      <div className="bg-white" />
                      <div className="bg-slate-900" />
                      <div className="bg-white" />
                      <div className="bg-slate-900" />
                      <div className="bg-white" />
                    </div>
                  </div>
                </div>

                {/* Aadhaar Number Redacted */}
                <div className="text-center font-mono text-[10px] font-bold text-slate-800 tracking-widest pt-1 border-t border-slate-200">
                  XXXX XXXX 4189
                </div>

                {/* Floating "Verified Authentic Document" Badge */}
                <div className="absolute -bottom-3 -right-3 bg-[#0B1320]/95 backdrop-blur-md border border-emerald-500/50 text-white px-3 py-1.5 rounded-xl shadow-2xl flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white leading-tight">Verified</div>
                    <div className="text-[8px] text-slate-300 leading-tight">Authentic Document</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ======================================================================= */}
        {/* 2. RIGHT STACKED CARDS: SMARTCART & ATS RESUME (Right / 5 cols)         */}
        {/* ======================================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">

          {/* CARD A: SmartCart Clustering */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group h-full"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Purple Icon */}
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#6366F1] mb-3">
                  <ShoppingCart className="w-5 h-5" />
                </div>

                {/* Title */}
                <a
                  href="https://github.com/abhinavbuilds2005/SmartCart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-bold text-lg text-[#111827] group-hover:text-[#6366F1] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>SmartCart Clustering</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#6366F1] transition-colors" />
                </a>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#4B5563] mt-2 leading-relaxed">
                  Customer segmentation using KMeans for retail analytics.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {['ML', 'KMeans', 'Streamlit'].map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Graphic: Purple Bar Chart Illustration */}
              <div className="w-24 h-24 flex items-end justify-center gap-1.5 pt-4 shrink-0">
                <div className="w-3.5 h-8 bg-indigo-100 rounded-t" />
                <div className="w-3.5 h-14 bg-indigo-200 rounded-t" />
                <div className="w-3.5 h-20 bg-[#6366F1] rounded-t shadow-xs" />
                <div className="w-3.5 h-11 bg-indigo-300 rounded-t" />
              </div>
            </div>
          </motion.div>

          {/* CARD B: ATS Resume Analyzer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group h-full"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Purple CPU Icon */}
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#6366F1] mb-3">
                  <Cpu className="w-5 h-5" />
                </div>

                {/* Title */}
                <a
                  href="https://github.com/abhinavbuilds2005/ATS_Resume_Analyzer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-bold text-lg text-[#111827] group-hover:text-[#6366F1] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>ATS Resume Analyzer</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#6366F1] transition-colors" />
                </a>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#4B5563] mt-2 leading-relaxed">
                  AI-powered resume screening and ATS score prediction.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {['NLP', 'Classification', 'Streamlit'].map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Graphic: Document wireframe with ATS Score 92% badge */}
              <div className="w-24 shrink-0 flex flex-col items-center justify-center relative pt-2">
                <div className="w-20 bg-slate-50 border border-slate-200 rounded-lg p-2 shadow-xs space-y-1">
                  <div className="w-6 h-6 rounded-full bg-slate-200 mb-1 mx-auto" />
                  <div className="h-1 bg-slate-200 rounded w-full" />
                  <div className="h-1 bg-slate-200 rounded w-3/4 mx-auto" />
                  <div className="h-1 bg-slate-200 rounded w-5/6 mx-auto" />
                </div>
                {/* Purple Score Pill */}
                <div className="absolute -bottom-1 -right-1 bg-[#6366F1] text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap">
                  ATS Score 92%
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Optional: Expanded Other Projects Grid when "View All Projects" is toggled */}
      {showAllProjects && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-black/[0.06]"
        >
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#6366F1] uppercase tracking-wider">
                    {project.categoryLabel || 'Machine Learning'}
                  </span>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#111827]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <h4 className="font-bold text-base text-[#111827] mb-2">{project.title}</h4>
                <p className="text-xs text-[#4B5563] line-clamp-2">{project.summary}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenCaseStudy(project)}
                  className="text-xs font-semibold text-[#111827] hover:text-[#6366F1] flex items-center gap-1 cursor-pointer"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-slate-500 hover:text-slate-900"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
};
