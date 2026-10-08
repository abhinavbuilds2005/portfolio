import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { HeroSection } from './components/hero/HeroSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { BuildLogSection } from './components/build-log/BuildLogSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/shared/CommandPalette';
import { LabModal } from './components/shared/LabModal';
import { ModelInferenceSandbox } from './components/playground/ModelInferenceSandbox';

export function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isCmdOpen, setIsCmdOpen] = useState<boolean>(false);
  const [isLabOpen, setIsLabOpen] = useState<boolean>(false);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);

  // Initialize theme from storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      if (prefersLight) {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        setIsDark(true);
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
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

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-base text-text-primary transition-colors duration-200 selection:bg-accent selection:text-base">
      
      {/* Scroll Progress Epoch Bar */}
      <ScrollProgress />

      {/* Top Navbar */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenCmd={() => setIsCmdOpen(true)}
        onOpenLab={() => setIsLabOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content">
        {/* Editorial Hero Section */}
        <HeroSection />

        {/* Projects Section with DocuShield Flagship & Distinct Hierarchy */}
        <ProjectsSection
          activeCaseStudyId={activeCaseStudyId}
          onOpenCaseStudy={(id) => setActiveCaseStudyId(id)}
          onCloseCaseStudy={() => setActiveCaseStudyId(null)}
        />

        {/* Interactive Production Model Telemetry & Diagnostics Sandbox */}
        <ModelInferenceSandbox />

        {/* Skills Section with Knowledge Map, Pipeline, Feature Importance & LeetCode */}
        <SkillsSection onOpenCaseStudy={(id) => setActiveCaseStudyId(id)} />

        {/* Technical Build Log */}
        <BuildLogSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onToggleTheme={toggleTheme}
        isDark={isDark}
        onSelectProject={(id) => {
          setActiveCaseStudyId(id);
        }}
        onOpenLab={() => setIsLabOpen(true)}
      />

      {/* Interactive ML Lab Modal (Mechanisms, Embeddings, Pipeline & LeetCode) */}
      <LabModal
        isOpen={isLabOpen}
        onClose={() => setIsLabOpen(false)}
        onSelectProject={(id) => {
          setActiveCaseStudyId(id);
        }}
      />

    </div>
  );
}

export default App;
