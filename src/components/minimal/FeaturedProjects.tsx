import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  ArrowRight,
  Code,
  Trophy,
  ShoppingCart,
  Cpu,
  CheckCircle2,
  Play,
  Pause,
  Layers,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  TrendingUp,
  Fingerprint
} from 'lucide-react';
import { Project } from '../../lib/types';
import { PROJECTS } from '../../data/projects';

interface FeaturedProjectsProps {
  onOpenCaseStudy: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onOpenCaseStudy }) => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeTab, setActiveTab] = useState<'aadhaar' | 'forensics'>('aadhaar');

  // Carousel motion state for the moving project stream
  const [streamIndex, setStreamIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [streamProgress, setStreamProgress] = useState(0);

  // Retrieve key featured projects
  const docushieldProject = PROJECTS.find((p) => p.id === 'docushield') || PROJECTS[0];
  const smartcartProject = PROJECTS.find((p) => p.id === 'smartcart') || PROJECTS[3];
  const atsProject = PROJECTS.find((p) => p.id === 'ats-resume') || PROJECTS[2];
  const otherProjects = PROJECTS.filter((p) => p.id !== 'docushield' && p.id !== 'smartcart' && p.id !== 'ats-resume');

  // Auto-motion loop for moving stream
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      setStreamProgress((prev) => {
        if (prev >= 100) {
          setStreamIndex((curr) => (curr + 1) % PROJECTS.length);
          return 0;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered]);

  const handleNextStream = () => {
    setStreamIndex((prev) => (prev + 1) % PROJECTS.length);
    setStreamProgress(0);
  };

  const handlePrevStream = () => {
    setStreamIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    setStreamProgress(0);
  };

  return (
    <section id="projects" className="py-20 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* ======================================================================= */}
      {/* 1. SECTION HEADER (FAITHFUL TO REFERENCE DESIGN)                        */}
      {/* ======================================================================= */}
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

      {/* ======================================================================= */}
      {/* 2. ASYMMETRIC SIGNATURE GRID (PIXEL-PERFECT REFERENCE MATCH)             */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
        {/* ===================================================================== */}
        {/* LEFT COLUMN: DOCUSHIELD AI DARK SPOTLIGHT CARD (7 Cols)                */}
        {/* ===================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 bg-[#0B0F19] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(11,15,25,0.4)] flex flex-col justify-between"
        >
          {/* Subtle Ambient Violet Glow Backdrop */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#6366F1]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Row: SIH Badge & Forensic Mode Toggle */}
          <div className="flex items-center justify-between mb-6 z-10">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-300">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>SIH 2026</span>
              </span>

              {/* View Toggle: Aadhaar Hologram vs High-Res Forensic Scan */}
              <div className="hidden sm:inline-flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 text-[11px] font-mono">
                <button
                  onClick={() => setActiveTab('aadhaar')}
                  className={`px-2.5 py-0.5 rounded-full transition-all ${
                    activeTab === 'aadhaar'
                      ? 'bg-white text-[#111827] font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3D ID Visual
                </button>
                <button
                  onClick={() => setActiveTab('forensics')}
                  className={`px-2.5 py-0.5 rounded-full transition-all ${
                    activeTab === 'forensics'
                      ? 'bg-white text-[#111827] font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Forensic UI
                </button>
              </div>
            </div>

            <a
              href="https://github.com/abhinavbuilds2005/DocuShield"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors p-1"
              title="Open GitHub Repository"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Main Card Content & 3D Document Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto z-10">
            {/* Project Details (Cols 1-7) */}
            <div className="md:col-span-6 lg:col-span-7">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2 group">
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

            {/* Visual Showcase (Cols 8-12): 3D Aadhaar or Forensic Scan with Levitation */}
            <div className="md:col-span-6 lg:col-span-5 relative flex items-center justify-center pt-4 md:pt-0">
              {/* Outer Neon Glow Frame */}
              <div className="absolute inset-0 border border-[#8B5CF6]/40 rounded-2xl blur-xs pointer-events-none" />

              {/* Levitating 3D Container with gentle smooth floating */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotateZ: [-0.3, 0.3, -0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-full relative"
              >
                {activeTab === 'aadhaar' ? (
                  /* 3D Realistic Aadhaar Card matching reference design */
                  <div className="w-full max-w-[275px] mx-auto bg-[#FAF8F5] text-slate-800 rounded-xl p-3 shadow-2xl border border-white/80 relative transform rotate-y-[-8deg] rotate-x-[4deg] hover:rotate-0 transition-transform duration-500">
                    {/* Top Indian Tricolor Line */}
                    <div className="h-0.5 w-full bg-gradient-to-r from-[#FF9933] via-slate-300 to-[#128807] mb-2 rounded-full" />

                    {/* Emblem & Header */}
                    <div className="flex items-center justify-between border-b border-slate-300/80 pb-1.5 mb-2">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-amber-700" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L14 6H10L12 2ZM8 7H16V9H8V7ZM7 10H17V12H7V10ZM9 13H15V15H9V13ZM6 16H18V18H6V16ZM4 19H20V21H4V19Z" />
                        </svg>
                        <div>
                          <div className="text-[9px] font-bold text-slate-900 leading-none">भारत सरकार</div>
                          <div className="text-[7px] font-medium text-slate-700 leading-none">Government of India</div>
                        </div>
                      </div>
                      <div className="text-amber-800">
                        <Fingerprint className="w-4 h-4 text-amber-700" />
                      </div>
                    </div>

                    {/* Body: Photo silhouette, redacted text, QR code */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-12 h-14 bg-slate-300 rounded border border-slate-400 flex items-center justify-center text-slate-500 overflow-hidden shrink-0">
                        <svg className="w-7 h-7 fill-current text-slate-400" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="h-2 bg-slate-300 rounded w-4/5" />
                        <div className="h-1.5 bg-slate-200 rounded w-full" />
                        <div className="h-1.5 bg-slate-200 rounded w-3/4" />
                        <div className="h-1.5 bg-slate-200 rounded w-2/3" />
                      </div>

                      <div className="w-11 h-11 bg-white border border-slate-300 p-0.5 rounded shrink-0 flex items-center justify-center">
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

                    {/* Aadhaar Number */}
                    <div className="text-center font-mono text-[9px] font-bold text-slate-800 tracking-widest pt-1 border-t border-slate-200">
                      XXXX XXXX 4189
                    </div>

                    {/* Floating "Verified Authentic Document" Badge */}
                    <div className="absolute -bottom-3 -right-2 bg-[#0B1320]/95 backdrop-blur-md border border-emerald-500/50 text-white px-2.5 py-1.5 rounded-xl shadow-2xl flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-white leading-tight">Verified</div>
                        <div className="text-[7.5px] text-slate-300 leading-tight">Authentic Document</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* High-Res Forensic UI Scan Preview */
                  <div className="rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-[#090D14]">
                    <img
                      src="/project_docushield_minimal.jpg"
                      alt="DocuShield Forensics Scanning Pipeline"
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-2 bg-[#0E1522] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-300">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        98.4% Match
                      </span>
                      <span>ELA Heatmap Active</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ===================================================================== */}
        {/* RIGHT COLUMN: SMARTCART & ATS RESUME STACKED CARDS (5 Cols)           */}
        {/* ===================================================================== */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {/* 1. TOP CARD: SMARTCART CLUSTERING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5, scale: 1.01 }}
            onClick={() => onOpenCaseStudy(smartcartProject)}
            className="bg-white rounded-3xl p-6 border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.08)] hover:border-indigo-200 transition-all cursor-pointer flex flex-col justify-between group h-full"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Purple Icon Box */}
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#8B5CF6] mb-4 group-hover:scale-105 transition-transform">
                  <ShoppingCart className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-bold text-[#111827] tracking-tight flex items-center gap-1.5">
                  <span className="group-hover:text-[#6366F1] transition-colors">SmartCart Clustering</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#6366F1] transition-colors" />
                </h3>

                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                  Customer segmentation using KMeans for retail analytics.
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {['ML', 'KMeans', 'Streamlit'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Visual: High-Res Project UI / Visualizer */}
              <div className="w-32 sm:w-36 shrink-0 aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group-hover:border-indigo-300 transition-colors bg-slate-50">
                <img
                  src="/project_smartcart_minimal.jpg"
                  alt="SmartCart Clustering Visualizer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-1 right-1 text-[8px] font-mono font-bold bg-[#111827]/80 text-white px-1.5 py-0.5 rounded">
                  PCA 3D
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. BOTTOM CARD: ATS RESUME ANALYZER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.01 }}
            onClick={() => onOpenCaseStudy(atsProject)}
            className="bg-white rounded-3xl p-6 border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.08)] hover:border-indigo-200 transition-all cursor-pointer flex flex-col justify-between group h-full"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Purple Icon Box */}
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#8B5CF6] mb-4 group-hover:scale-105 transition-transform">
                  <Cpu className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-bold text-[#111827] tracking-tight flex items-center gap-1.5">
                  <span className="group-hover:text-[#6366F1] transition-colors">ATS Resume Analyzer</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#6366F1] transition-colors" />
                </h3>

                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                  AI-powered resume screening and ATS score prediction.
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {['NLP', 'Classification', 'Streamlit'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Visual: High-Res Project UI / 92% Gauge */}
              <div className="w-32 sm:w-36 shrink-0 aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group-hover:border-indigo-300 transition-colors bg-slate-50">
                <img
                  src="/project_ats_resume_minimal.jpg"
                  alt="ATS Resume Analyzer Score"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-1 right-1 text-[8px] font-mono font-bold bg-[#6366F1] text-white px-1.5 py-0.5 rounded shadow-xs">
                  92% ATS
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 3. DYNAMIC MOVING PROJECT SHOWCASE CAROUSEL (USER'S MOTION REQUEST)       */}
      {/* ======================================================================= */}
      <div className="mt-14 bg-white/60 backdrop-blur-sm border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-xs">
        {/* Stream Header & Motion Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-ping" />
            <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider font-mono">
              Live Architecture Stream
            </h4>
            <span className="text-xs text-slate-400 font-mono">
              ({streamIndex + 1} of {PROJECTS.length})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 bg-[#111827] text-white hover:bg-[#1F2937] active:scale-95 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
              title={isPlaying ? 'Pause Auto Motion' : 'Start Auto Motion'}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Pause Motion' : 'Auto Motion'}</span>
            </button>

            {/* Prev / Next Arrows */}
            <button
              onClick={handlePrevStream}
              className="w-7 h-7 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#111827] hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextStream}
              className="w-7 h-7 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#111827] hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Next Project"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Animated Progress Timeline Bar */}
        <div className="w-full h-1 bg-slate-200 rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7]"
            style={{
              width: isPlaying && !isHovered
                ? `${((streamIndex + streamProgress / 100) / PROJECTS.length) * 100}%`
                : `${((streamIndex + 1) / PROJECTS.length) * 100}%`,
            }}
            transition={{ duration: 0.08 }}
          />
        </div>

        {/* Moving Active Showcase Card */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
          {(() => {
            const current = PROJECTS[streamIndex];
            return (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-7 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                {/* Details (Cols 1-7) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#6366F1] bg-indigo-50 px-2 py-0.5 rounded uppercase">
                      {current.categoryLabel}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      ID: {current.id}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                      {current.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#4B5563] mt-1.5 leading-relaxed font-normal">
                      {current.summary}
                    </p>
                  </div>

                  {/* Architectural Metrics Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {current.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-100 p-2 rounded-lg">
                        <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wide">
                          {m.label}
                        </div>
                        <div className="text-xs font-bold text-[#111827] mt-0.5 truncate">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => onOpenCaseStudy(current)}
                      className="inline-flex items-center gap-1.5 bg-[#111827] text-white hover:bg-[#1F2937] active:scale-95 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer"
                    >
                      <span>Architecture Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={current.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-white border border-[#E5E7EB] text-[#111827] hover:bg-slate-50 active:scale-95 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer"
                    >
                      <Code className="w-3.5 h-3.5 text-[#6366F1]" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>

                {/* Right Visual: Levitating Browser Viewport (Cols 8-12) */}
                <div className="md:col-span-5 relative">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    onClick={() => onOpenCaseStudy(current)}
                    className="w-full bg-[#0F1422] rounded-xl border border-white/10 shadow-lg overflow-hidden cursor-pointer group"
                  >
                    {/* Header dots */}
                    <div className="bg-[#181D2F] px-3 py-2 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-400/80" />
                        <div className="w-2 h-2 rounded-full bg-amber-400/80" />
                        <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {current.id}.pipeline/verified
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
                    </div>

                    <div className="relative aspect-video bg-[#0A0D15] overflow-hidden">
                      <img
                        src={current.image}
                        alt={current.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })()}
        </div>

        {/* Quick project selectors */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none">
          {PROJECTS.map((proj, idx) => {
            const isCurrent = streamIndex === idx;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  setStreamIndex(idx);
                  setStreamProgress(0);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-[#111827] text-white shadow-xs'
                    : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-slate-50'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-[#6366F1] animate-pulse' : 'bg-slate-300'}`} />
                <span>{proj.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 4. EXPANDABLE ALL-PROJECTS GRID                                         */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {showAllProjects && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="overflow-hidden mt-12 pt-8 border-t border-[#E5E7EB]"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#111827]">
                  All Verified Systems ({PROJECTS.length})
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] mt-1 font-normal">
                  Complete architecture dossiers with test suite metrics, ROC curves, and verifiable source repositories.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => onOpenCaseStudy(project)}
                  className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Image */}
                    <div className="relative aspect-video bg-slate-900 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono font-bold bg-[#111827]/80 backdrop-blur-md text-white px-2.5 py-1 rounded-md border border-white/10">
                          {project.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-[#111827] group-hover:text-[#6366F1] transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#6366F1] transition-colors" />
                      </h4>

                      <p className="text-xs text-[#4B5563] mt-2 line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-700 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#111827] group-hover:text-[#6366F1] transition-colors">
                      <span>View Architecture Dossier</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
