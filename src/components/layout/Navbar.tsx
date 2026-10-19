import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Command, FileText, ExternalLink, Cpu, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

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
  onOpenLab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu on hash/route change
  useEffect(() => {
    const handleHashChange = () => setMobileMenuOpen(false);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navItems = [
    { href: '#projects', label: 'Projects' },
    { href: '#ai-telemetry', label: 'ML Sandbox' },
    { href: '#skills', label: 'Skills' },
    { href: '#build-log', label: 'Build Log' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-base/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Brand identity */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <motion.span
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="font-mono text-xs px-1.5 py-0.5 rounded border border-accent/40 text-accent bg-accent/10 font-bold transition-shadow hover:shadow-[0_0_12px_rgba(34,211,238,0.3)]"
          >
            AA
          </motion.span>
          <span className="text-sm font-semibold tracking-tight text-text-primary group-hover:text-accent transition-colors">
            Abhinav Anand
          </span>
          <span className="hidden sm:inline-block font-mono text-xs text-text-muted">
            / AI Systems
          </span>
        </a>

        {/* Section Navigation (Desktop) */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-text-secondary"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 hover:text-accent transition-colors group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Quick actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Interactive Lab Trigger */}
          <motion.button
            onClick={onOpenLab}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden xs:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border-subtle bg-surface text-text-primary text-xs font-mono hover:text-accent hover:border-border-strong transition-colors shadow-sm cursor-pointer"
            title="Open Interactive ML Lab (Mechanisms, Embeddings & Pipeline)"
            aria-label="Open Interactive ML Lab"
          >
            <Cpu className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span className="hidden sm:inline">Lab</span>
          </motion.button>

          {/* Command Palette Trigger */}
          <motion.button
            onClick={onOpenCmd}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-2 py-1.5 sm:px-2.5 rounded-md border border-border-subtle bg-surface text-text-secondary text-xs font-mono hover:border-border-strong hover:text-text-primary transition-colors cursor-pointer"
            title="Open Command Palette (Ctrl+K or ⌘K)"
            aria-label="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-text-muted" />
            <span className="hidden sm:inline">Cmd</span>
            <kbd className="hidden sm:inline-block text-[10px] bg-base px-1 py-0.5 rounded border border-border-subtle text-text-muted">
              ⌘K
            </kbd>
          </motion.button>

          {/* Resume Link (Desktop) */}
          <a
            href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border-subtle bg-surface text-text-primary text-xs font-mono hover:text-accent hover:border-border-strong transition-all hover:scale-[1.02]"
            aria-label="Open Resume in new tab"
          >
            <FileText className="w-3.5 h-3.5 text-text-muted" />
            <span>Resume</span>
            <ExternalLink className="w-2.5 h-2.5 text-text-muted" />
          </a>

          {/* Theme Toggle with Rotation Animation */}
          <motion.button
            onClick={onToggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="p-1.5 rounded-md border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors cursor-pointer"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              >
                {isDark ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-accent" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-1.5 rounded-md border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-accent" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
            className="md:hidden border-t border-border-subtle bg-surface/98 backdrop-blur-xl px-4 py-4 space-y-3 shadow-2xl overflow-hidden"
          >
            <nav aria-label="Mobile section navigation" className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-md font-mono text-xs uppercase tracking-wider text-text-primary hover:bg-elevated hover:text-accent transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-text-muted text-[10px]">→</span>
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-border-subtle grid grid-cols-2 gap-2">
              <a
                href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-border-subtle bg-base text-text-primary text-xs font-mono hover:text-accent hover:border-border-strong transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-text-muted" />
                <span>Resume (PDF)</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLab();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-accent/30 bg-accent/10 text-accent text-xs font-mono hover:bg-accent/20 transition-colors cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>ML Lab</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
