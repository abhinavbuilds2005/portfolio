import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, FileText, GitCommit } from 'lucide-react';
import buildMetadata from '../../data/build-metadata.json';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border-subtle bg-base py-12 text-xs font-mono text-text-muted transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Row: Brand & Social Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
          <div>
            <div className="text-text-primary font-bold text-sm tracking-wide">
              ABHINAV ANAND // AI SYSTEMS PORTFOLIO
            </div>
            <div className="text-xs text-text-muted mt-0.5">
              2nd-Year B.Tech Computer Science (AI/ML) · Lovely Professional University
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/abhinavbuilds2005"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhinav-anand-865926300"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:abhinavanand2005.cse@gmail.com"
              className="p-2 rounded-md border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
              title="Email Abhinav"
              aria-label="Email Abhinav"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-md border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Row: Metadata & Commit Info (No 1-second interval re-render) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3 text-text-secondary">
            <span>© {new Date().getFullYear()} Abhinav Anand.</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-live" />
              <span>Available for Summer / Fall Internships</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-text-muted">
            <span className="flex items-center gap-1 font-mono">
              <GitCommit className="w-3.5 h-3.5 text-accent" />
              <span>commit: {buildMetadata.commitHash || '9e5da2b'}</span>
            </span>
            <span>•</span>
            <span>Timezone: IST (UTC+5:30)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
