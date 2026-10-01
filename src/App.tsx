import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { BentoHero } from './components/hero/BentoHero';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { BuildLogSection } from './components/build-log/BuildLogSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/shared/CommandPalette';
import { PhysicsTensorDropper } from './components/shared/PhysicsTensorDropper';
import { MLMechanismsLab } from './components/shared/MLMechanismsLab';

export function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isCmdOpen, setIsCmdOpen] = useState<boolean>(false);
  const [isPhysicsOpen, setIsPhysicsOpen] = useState<boolean>(false);
  const [isMLLabOpen, setIsMLLabOpen] = useState<boolean>(false);
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
    <div className="min-h-screen bg-[#121212] dark:bg-[#121212] light:bg-[#faf8f5] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] transition-colors duration-200 selection:bg-[#e58b24] selection:text-[#121212]">
      
      {/* Scroll Progress Epoch Bar */}
      <ScrollProgress />

      {/* Top Navbar */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenCmd={() => setIsCmdOpen(true)}
        onOpenPhysics={() => setIsPhysicsOpen(true)}
        onOpenMLLab={() => setIsMLLabOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content">
        {/* Bento Grid Hero */}
        <BentoHero
          onOpenCaseStudy={(id) => setActiveCaseStudyId(id)}
          onOpenPhysics={() => setIsPhysicsOpen(true)}
        />

        {/* Projects Section */}
        <ProjectsSection
          activeCaseStudyId={activeCaseStudyId}
          onOpenCaseStudy={(id) => setActiveCaseStudyId(id)}
          onCloseCaseStudy={() => setActiveCaseStudyId(null)}
        />

        {/* Skills & Empirical Feature Importance */}
        <SkillsSection onOpenCaseStudy={(id) => setActiveCaseStudyId(id)} />

        {/* Engineering Build Log */}
        <BuildLogSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
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
        onOpenPhysics={() => setIsPhysicsOpen(true)}
      />

      {/* Physics Free-Fall Tensor Gravity Sandbox Modal */}
      <PhysicsTensorDropper
        isOpen={isPhysicsOpen}
        onClose={() => setIsPhysicsOpen(false)}
      />

      {/* ML Mechanisms Lab: Transformer Attention & Gradient Descent */}
      <MLMechanismsLab
        isOpen={isMLLabOpen}
        onClose={() => setIsMLLabOpen(false)}
      />

    </div>
  );
}

export default App;
