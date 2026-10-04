import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { CustomCursor } from './components/layout/CustomCursor';
import { BentoHero } from './components/hero/BentoHero';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ModelPipelineVisualizer } from './components/skills/ModelPipelineVisualizer';
import { SkillsSection } from './components/skills/SkillsSection';
import { BuildLogSection } from './components/build-log/BuildLogSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/shared/CommandPalette';
import { MLMechanismsLab } from './components/shared/MLMechanismsLab';
import { GpuTelemetryHUD } from './components/telemetry/GpuTelemetryHUD';
import { InteractiveTerminalDrawer } from './components/terminal/InteractiveTerminalDrawer';
import { Terminal as TerminalIcon } from 'lucide-react';

export function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isCmdOpen, setIsCmdOpen] = useState<boolean>(false);
  const [isMLLabOpen, setIsMLLabOpen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);

  // Initialize theme from storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  // Keyboard shortcut listener for Ctrl+K / Cmd+K and `~` for Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      } else if ((e.key === '`' || e.key === '~') && tag !== 'input' && tag !== 'textarea') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#08090B] dark:bg-[#08090B] light:bg-[#F7F8FA] text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] transition-colors duration-200 selection:bg-[#6366F1]/30 selection:text-white font-sans">
      
      {/* Subtle Desktop Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress Track */}
      <ScrollProgress />

      {/* Top Navigation */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenCmd={() => setIsCmdOpen(true)}
        onOpenMLLab={() => setIsMLLabOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Truthful Local ML Hardware Environment Indicator */}
      <GpuTelemetryHUD />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Bento Grid Hero with Dynamic Latent Synapse Canvas */}
        <BentoHero
          onOpenCaseStudy={(id) => setActiveCaseStudyId(id)}
          isDark={isDark}
        />

        {/* Selected AI Systems & 2D Latent Embedding Space */}
        <ProjectsSection
          activeCaseStudyId={activeCaseStudyId}
          onOpenCaseStudy={(id) => setActiveCaseStudyId(id)}
          onCloseCaseStudy={() => setActiveCaseStudyId(null)}
        />

        {/* How I Build AI Systems - 7-Stage End-to-End Lifecycle */}
        <ModelPipelineVisualizer />

        {/* AI & ML Engineering Stack, Knowledge Map, Inside a Transformer, LeetCode */}
        <SkillsSection onOpenCaseStudy={(id) => setActiveCaseStudyId(id)} />

        {/* Engineering Build Log & Architectural Retrospectives */}
        <BuildLogSection />

        {/* Contact Section: Build Something Intelligent */}
        <ContactSection />
      </main>

      {/* Footer with Build Metadata & Live Clock */}
      <Footer />

      {/* Command Palette Modal (Ctrl/Cmd + K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onToggleTheme={toggleTheme}
        isDark={isDark}
        onSelectProject={(id) => {
          setActiveCaseStudyId(id);
        }}
        onOpenMLLab={() => setIsMLLabOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* AI Lab: Interactive Transformer Attention & Non-Convex Gradient Descent */}
      <MLMechanismsLab
        isOpen={isMLLabOpen}
        onClose={() => setIsMLLabOpen(false)}
      />

      {/* Interactive AI Systems Terminal (~ key) */}
      <InteractiveTerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Minimal Floating Launcher for Terminal Console */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 bg-[#11151A]/90 dark:bg-[#11151A]/90 light:bg-white/95 backdrop-blur-md text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] hover:text-white hover:border-[#6366F1]/50 hover:shadow-subtle-glow transition-all font-mono text-xs shadow-xl group"
          title="Open Interactive Terminal (~ key)"
          aria-label="Open Interactive Terminal"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <TerminalIcon className="w-3.5 h-3.5 text-[#6366F1]" />
          <span className="hidden sm:inline font-sans text-xs font-medium">Terminal</span>
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-[#667085] border border-white/[0.04]">~</kbd>
        </button>
      </div>

    </div>
  );
}

export default App;
