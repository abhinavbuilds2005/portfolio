import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, FileText, GitCommit } from 'lucide-react';
import buildMetadata from '../../data/build-metadata.json';
import { MagneticButton } from '../shared/MagneticButton';
import { ScrambleText } from '../shared/ScrambleText';

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
              <ScrambleText text="ABHINAV ANAND // AI SYSTEMS PORTFOLIO" scrambleOnMount={false} scrambleOnHover={true} />
            </div>
            <div className="text-xs text-text-muted mt-0.5">
              2nd-Year B.Tech Computer Science (AI/ML) · Lovely Professional University
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            <MagneticButton>
              <a
                href="https://github.com/abhinavbuilds2005"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors inline-block"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="https://www.linkedin.com/in/abhinav-anand-865926300"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors inline-block"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="mailto:abhinavanand2005.cse@gmail.com"
                className="p-2 rounded-md border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors inline-block"
                title="Email Abhinav"
                aria-label="Email Abhinav"
              >
                <Mail className="w-4 h-4" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-md border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors cursor-pointer"
                title="Scroll to top"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Bottom Row: Metadata & Commit Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3 text-text-secondary">
            <span>© {new Date().getFullYear()} Abhinav Anand.</span>
            <span>•</span>
            <span>All code repositories verifiable on GitHub.</span>
            <span>•</span>
            <a
              href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline flex items-center gap-1"
            >
              <FileText className="w-3 h-3" />
              <span>Resume (PDF)</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-text-muted">
            <GitCommit className="w-3.5 h-3.5 text-accent" />
            <span className="font-mono text-[11px]">
              Commit <span className="text-text-primary font-semibold">{buildMetadata.commitHash || 'c9e8960'}</span>
            </span>
            <span>•</span>
            <span className="text-[11px]">{buildMetadata.lastUpdated || 'October 2026'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
