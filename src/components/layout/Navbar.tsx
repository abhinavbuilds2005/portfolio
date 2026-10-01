import React from 'react';
import { Moon, Sun, Command, FileText, ExternalLink, Cpu } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCmd: () => void;
  onOpenMLLab: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenCmd,
  onOpenMLLab
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#121212]/90 dark:bg-[#121212]/90 light:bg-[#faf8f5]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Brand identity */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="font-mono text-xs px-1.5 py-0.5 rounded border border-[#e58b24]/40 text-[#e58b24] bg-[#e58b24]/10 font-medium">
            AA
          </span>
          <span className="font-mono text-sm tracking-wide text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] font-semibold group-hover:text-[#e58b24] transition-colors">
            abhinav.anand
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-[#78716c]">
            // AI Systems
          </span>
        </a>

        {/* Section Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e]">
          <a href="#projects" className="hover:text-[#e58b24] dark:hover:text-[#e58b24] light:hover:text-[#e58b24] transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-[#e58b24] dark:hover:text-[#e58b24] light:hover:text-[#e58b24] transition-colors">
            Skills
          </a>
          <a href="#build-log" className="hover:text-[#e58b24] dark:hover:text-[#e58b24] light:hover:text-[#e58b24] transition-colors">
            Build Log
          </a>
          <a href="#contact" className="hover:text-[#e58b24] dark:hover:text-[#e58b24] light:hover:text-[#e58b24] transition-colors">
            Contact
          </a>
        </nav>

        {/* Quick actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* ML Mechanisms Lab Trigger */}
          <button
            onClick={onOpenMLLab}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] text-xs font-mono hover:text-[#f5f2eb] hover:border-[#e58b24]/40 transition-colors shadow-sm"
            title="Inspect Transformer Attention & Gradient Descent"
          >
            <Cpu className="w-3.5 h-3.5 text-[#e58b24]" />
            <span className="hidden sm:inline">ML Mechanisms</span>
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCmd}
            className="flex items-center gap-1.5 px-2 py-1 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] text-xs font-mono hover:border-[#e58b24]/50 transition-colors"
            title="Open Command Palette (Ctrl+K or ⌘K)"
            aria-label="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-[#78716c]" />
            <span className="hidden sm:inline">Cmd</span>
            <kbd className="text-[10px] bg-[#121212] dark:bg-[#121212] light:bg-[#eae5db] px-1 py-0.5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#d6ccbe]">
              ⌘K
            </kbd>
          </button>

          {/* Resume Link */}
          <a
            href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] text-xs font-mono hover:text-[#e58b24] transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#78716c]" />
            <span>Resume</span>
            <ExternalLink className="w-2.5 h-2.5 text-[#78716c]" />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] hover:text-[#f5f2eb] dark:hover:text-[#f5f2eb] light:hover:text-[#1c1917] transition-colors"
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#e58b24]" /> : <Moon className="w-4 h-4 text-[#e58b24]" />}
          </button>
        </div>

      </div>
    </header>
  );
};
