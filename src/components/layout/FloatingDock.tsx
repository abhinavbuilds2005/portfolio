import React, { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Copy, 
  Check, 
  Terminal, 
  ArrowUp, 
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingDock: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'abhinavanand2005.cse@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 pointer-events-none flex justify-center px-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/[0.12] bg-[#0F172A]/85 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-slate-200"
      >
        {/* Status indicator (Pulsing Live Dot) */}
        <div className="hidden md:flex items-center gap-2 pl-1 pr-2 border-r border-white/[0.08]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono text-slate-300 font-medium whitespace-nowrap">
            Available for Roles
          </span>
        </div>

        {/* Copy Email Button with Toast Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={copyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Copy email address"
            aria-label="Copy email address to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy Email</span>
              </>
            )}
          </button>

          {/* Toast Notification */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: -45, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-md bg-[#080B11] border border-cyan-500/40 text-cyan-300 text-[11px] font-mono shadow-xl pointer-events-none"
              >
                ✓ Copied {email}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Social Links */}
        <a
          href="https://github.com/abhinavbuilds2005"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all hover:scale-110 active:scale-95"
          title="GitHub Profile"
          aria-label="GitHub Profile"
        >
          <Github className="w-4 h-4" />
        </a>

        <a
          href="https://www.linkedin.com/in/abhinav-anand-865926300"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all hover:scale-110 active:scale-95"
          title="LinkedIn Profile"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        <a
          href={`mailto:${email}`}
          className="p-2 rounded-full hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all hover:scale-110 active:scale-95"
          title="Send Direct Email"
          aria-label="Send Direct Email"
        >
          <Mail className="w-4 h-4" />
        </a>

        <div className="h-4 w-px bg-white/[0.1] mx-0.5" />

        {/* Navigation Shortcut to Bento Projects */}
        <a
          href="#projects"
          className="p-2 rounded-full hover:bg-white/[0.08] text-slate-300 hover:text-cyan-400 transition-all hover:scale-110 active:scale-95 hidden sm:inline-block"
          title="Jump to Featured Bento Projects"
          aria-label="Jump to Featured Bento Projects"
        >
          <Layers className="w-4 h-4" />
        </a>

        {/* Navigation Shortcut to Shell Terminal */}
        <a
          href="#terminal"
          className="p-2 rounded-full hover:bg-white/[0.08] text-slate-300 hover:text-cyan-400 transition-all hover:scale-110 active:scale-95"
          title="Launch Interactive Terminal"
          aria-label="Launch Interactive Terminal"
        >
          <Terminal className="w-4 h-4" />
        </a>

        {/* Scroll to Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="p-2 rounded-full hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
          title="Scroll to Top"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};

