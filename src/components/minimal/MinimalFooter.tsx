import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';

export const MinimalFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black/[0.06] bg-[#FAF9F5] py-12 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand Monogram & Title */}
        <div className="flex items-center gap-3">
          <span className="font-sans font-black text-xl text-[#111827]">
            AA
          </span>
          <div className="text-xs text-[#4B5563]">
            <span className="font-semibold text-[#111827]">Abhinav Anand</span> · AI/ML Engineering & Systems
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/abhinavbuilds2005"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4B5563] hover:text-[#111827] transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/abhinav-anand-865926300"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4B5563] hover:text-[#111827] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4B5563] hover:text-[#111827] transition-colors"
            aria-label="X / Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/cse.abhinav/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4B5563] hover:text-[#E1306C] transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="mailto:abhinavanand9996@gmail.com"
            className="text-[#4B5563] hover:text-[#111827] transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Back to top & Copyright */}
        <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
          <span>© {new Date().getFullYear()} Abhinav Anand</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#111827] hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
            aria-label="Back to Top"
            title="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
