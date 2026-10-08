import React from 'react';
import { Moon, Sun, Command, FileText, ExternalLink, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-base/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Brand identity */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <motion.span
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="font-mono text-xs px-1.5 py-0.5 rounded border border-accent/40 text-accent bg-accent/10 font-bold transition-shadow hover:shadow-[0_0_12px_rgba(229,139,36,0.3)]"
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

        {/* Section Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-text-secondary">
          {[
            { href: '#projects', label: 'Projects' },
            { href: '#ai-telemetry', label: 'ML Sandbox' },
            { href: '#skills', label: 'Skills' },
            { href: '#build-log', label: 'Build Log' },
            { href: '#contact', label: 'Contact' },
          ].map((item) => (
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
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Interactive Lab Trigger */}
          <motion.button
            onClick={onOpenLab}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border-subtle bg-surface text-text-primary text-xs font-mono hover:text-accent hover:border-border-strong transition-colors shadow-sm"
            title="Open Interactive ML Lab (Mechanisms, Embeddings & Pipeline)"
          >
            <Cpu className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span className="hidden sm:inline">Lab</span>
          </motion.button>

          {/* Command Palette Trigger */}
          <motion.button
            onClick={onOpenCmd}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border-subtle bg-surface text-text-secondary text-xs font-mono hover:border-border-strong hover:text-text-primary transition-colors"
            title="Open Command Palette (Ctrl+K or ⌘K)"
            aria-label="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-text-muted" />
            <span className="hidden sm:inline">Cmd</span>
            <kbd className="text-[10px] bg-base px-1 py-0.5 rounded border border-border-subtle text-text-muted">
              ⌘K
            </kbd>
          </motion.button>

          {/* Resume Link */}
          <a
            href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border-subtle bg-surface text-text-primary text-xs font-mono hover:text-accent hover:border-border-strong transition-all hover:scale-[1.02]"
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
            className="p-1.5 rounded-md border border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-accent" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

      </div>
    </header>
  );
};
