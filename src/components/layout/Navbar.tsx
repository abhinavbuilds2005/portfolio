import React from 'react';
import { Moon, Sun, Command, FileText, ExternalLink, Cpu } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCmd: () => void;
  onOpenLab: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenCmd,
  onOpenLab
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-base/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Brand identity */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="font-mono text-xs px-1.5 py-0.5 rounded border border-accent/40 text-accent bg-accent/10 font-bold">
            AA
          </span>
          <span className="text-sm font-semibold tracking-tight text-text-primary group-hover:text-accent transition-colors">
            Abhinav Anand
          </span>
          <span className="hidden sm:inline-block font-mono text-xs text-text-muted">
            / AI Systems
          </span>
        </a>

        {/* Section Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-text-secondary">
          <a href="#projects" className="hover:text-accent transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-accent transition-colors">
            Skills
          </a>
          <a href="#build-log" className="hover:text-accent transition-colors">
            Build Log
          </a>
          <a href="#contact" className="hover:text-accent transition-colors">
            Contact
          </a>
        </nav>

        {/* Quick actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Interactive Lab Trigger */}
          <button
            onClick={onOpenLab}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border-subtle bg-surface text-text-primary text-xs font-mono hover:text-accent hover:border-border-strong transition-colors shadow-sm"
            title="Open Interactive ML Lab (Mechanisms, Embeddings & Pipeline)"
          >
            <Cpu className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">Lab</span>
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCmd}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border-subtle bg-surface text-text-secondary text-xs font-mono hover:border-border-strong hover:text-text-primary transition-colors"
            title="Open Command Palette (Ctrl+K or ⌘K)"
            aria-label="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-text-muted" />
            <span className="hidden sm:inline">Cmd</span>
            <kbd className="text-[10px] bg-base px-1 py-0.5 rounded border border-border-subtle text-text-muted">
              ⌘K
            </kbd>
          </button>

          {/* Resume Link */}
          <a
            href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border-subtle bg-surface text-text-primary text-xs font-mono hover:text-accent transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-text-muted" />
            <span>Resume</span>
            <ExternalLink className="w-2.5 h-2.5 text-text-muted" />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-md border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-accent" />}
          </button>
        </div>

      </div>
    </header>
  );
};
