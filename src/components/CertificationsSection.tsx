import React from 'react';
import { Award, FileText, Download, ExternalLink, Code } from 'lucide-react';
import { sfx } from '../utils/audio';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-3 mb-12 text-left">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-cyber-cyan block rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Certifications & Credentials
            </h2>
          </div>
          <p className="text-gray-400 text-base max-w-2xl font-light">
            Verified technical certifications across low-level C programming, object-oriented Python, and relational SQL databases.
          </p>
        </div>

        {/* Certifications 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* C Programming Certificate (NEW) */}
          <a
            href="/c_programming_certificate.pdf"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => sfx.playHover()}
            onClick={() => sfx.playClick()}
            className="group relative rounded-2xl glass-panel-card p-6 border border-white/10 hover:border-cyan-500/50 transition-all flex flex-col justify-between h-64 bg-gradient-to-br from-obsidian-900 via-obsidian-900 to-cyan-950/20 text-left"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Code className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono font-bold text-cyan-400">
                  <Award className="w-3 h-3" />
                  <span>CSE101 VERIFIED</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-400 transition-colors">
                  C Programming & Foundations
                </h3>
                <p className="text-xs text-gray-400 font-light mt-1">
                  Pointers, dynamic memory allocation, data structures & low-level hardware memory concepts.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-cyan-400 font-semibold">
              <span>View Certificate PDF</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>

          {/* Python Certificate */}
          <div
            onMouseEnter={() => sfx.playHover()}
            className="group relative rounded-2xl glass-panel-card p-0 overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all h-64 flex flex-col justify-end text-left"
          >
            <img
              src="/python.png"
              alt="Python Certification"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 bg-obsidian-950"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-transparent" />
            
            <div className="relative z-10 p-5 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-mono font-bold text-yellow-400">
                <i className="fa-brands fa-python text-xs" />
                <span>VERIFIED CREDENTIAL</span>
              </div>
              <h3 className="text-lg font-display font-bold text-white">
                Python Programming
              </h3>
              <p className="text-[11px] text-gray-300 font-light line-clamp-2">
                Object-oriented development, algorithms & scientific computing libraries.
              </p>
            </div>
          </div>

          {/* SQL Certificate */}
          <div
            onMouseEnter={() => sfx.playHover()}
            className="group relative rounded-2xl glass-panel-card p-0 overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all h-64 flex flex-col justify-end text-left"
          >
            <img
              src="/sql.png"
              alt="SQL Certification"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 bg-obsidian-950"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-transparent" />
            
            <div className="relative z-10 p-5 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400">
                <i className="fa-solid fa-database text-xs" />
                <span>VERIFIED CREDENTIAL</span>
              </div>
              <h3 className="text-lg font-display font-bold text-white">
                SQL & Database Systems
              </h3>
              <p className="text-[11px] text-gray-300 font-light line-clamp-2">
                Relational schema design, complex joins, subqueries & analytical queries.
              </p>
            </div>
          </div>

        </div>

        {/* Curriculum Vitae Card */}
        <a
          href="/Abhinav_Resume.pdf"
          target="_blank"
          rel="noreferrer"
          onClick={() => sfx.playClick()}
          onMouseEnter={() => sfx.playHover()}
          className="group rounded-2xl glass-panel-card p-6 sm:p-8 border border-white/10 hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left bg-gradient-to-r from-obsidian-900 via-obsidian-900 to-emerald-950/20"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <FileText className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400 mb-1">
                <span>UPDATED RESUME</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white">
                Curriculum Vitae / Resume
              </h3>
              <p className="text-sm text-gray-400 font-light">
                Full-stack & AI engineering portfolio, machine learning deployments, academic coursework, and verified skill achievements.
              </p>
            </div>
          </div>

          <span className="px-6 py-3 bg-white text-black font-semibold rounded-full group-hover:bg-gray-200 transition-all shadow-lg whitespace-nowrap flex items-center gap-2 text-sm shrink-0">
            <span>Download Resume</span>
            <Download className="w-4 h-4" />
          </span>
        </a>

      </div>
    </section>
  );
};
