import React, { useState } from 'react';
import { Moon, Sun, Command, FileText, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCmd: () => void;
  onOpenMLLab?: () => void;
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenCmd,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#methodology', label: 'Methodology' },
    { href: '#skills', label: 'Skills' },
    { href: '#build-log', label: 'Build Log' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#08090B]/85 dark:bg-[#08090B]/85 light:bg-[#F7F8FA]/90 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand identity */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#22D3EE] p-[1px] shadow-sm">
            <div className="w-full h-full rounded-[7px] bg-[#08090B] dark:bg-[#08090B] light:bg-white flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-white dark:text-white light:text-[#0F172A] tracking-tighter">
                AA
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] group-hover:text-[#6366F1] transition-colors">
              ABHINAV ANAND
            </span>
            <span className="text-[10px] font-mono text-[#667085] dark:text-[#667085] light:text-[#94A3B8]">
              AI / ML Engineer
            </span>
          </div>
        </a>

        {/* Section Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#F5F7FA] dark:hover:text-[#F5F7FA] light:hover:text-[#0F172A] transition-colors relative py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCmd}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] text-xs hover:border-[#6366F1]/50 hover:text-white transition-all shadow-sm"
            title="Open Command Palette (Ctrl+K or ⌘K)"
            aria-label="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-[#6366F1]" />
            <span className="font-sans text-[11px]">Search</span>
            <kbd className="text-[10px] font-mono bg-white/[0.06] dark:bg-white/[0.06] light:bg-black/[0.05] px-1.5 py-0.5 rounded text-[#667085]">
              ⌘K
            </kbd>
          </button>

          {/* Resume Link */}
          <a
            href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-colors shadow-sm"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] hover:text-[#F5F7FA] dark:hover:text-[#F5F7FA] light:hover:text-[#0F172A] transition-colors"
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#F5F7FA]" /> : <Moon className="w-4 h-4 text-[#0F172A]" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-white/[0.08] bg-[#11151A] text-[#9AA4B2]"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0D1014] px-4 py-4 space-y-3 font-sans text-sm animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#9AA4B2] hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCmd();
            }}
            className="w-full flex items-center justify-between py-2 text-[#9AA4B2] hover:text-white border-t border-white/[0.06] pt-3"
          >
            <span className="flex items-center gap-2">
              <Command className="w-4 h-4 text-[#6366F1]" />
              <span>Command Palette</span>
            </span>
            <kbd className="font-mono text-xs px-1.5 py-0.5 rounded bg-white/10">⌘K</kbd>
          </button>
        </div>
      )}
    </header>
  );
};
