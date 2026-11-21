import React, { useState, useEffect } from 'react';
import { MinimalNavbar } from './components/minimal/MinimalNavbar';
import { MinimalHero } from './components/minimal/MinimalHero';
import { TechStrip } from './components/minimal/TechStrip';
import { FeaturedProjects } from './components/minimal/FeaturedProjects';
import { AboutSection } from './components/minimal/AboutSection';
import { SkillsSection } from './components/minimal/SkillsSection';
import { ExperienceSection } from './components/minimal/ExperienceSection';
import { CertificatesSection } from './components/minimal/CertificatesSection';
import { ContactSection } from './components/minimal/ContactSection';
import { MinimalFooter } from './components/minimal/MinimalFooter';
import { EditorialCaseStudyModal } from './components/editorial/EditorialCaseStudyModal';
import { EditorialResumeModal } from './components/editorial/EditorialResumeModal';
import { EditorialTerminalModal } from './components/editorial/EditorialTerminalModal';
import { Project } from './lib/types';

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  // Global developer keyboard shortcuts (Ctrl+` or Ctrl+T to open terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key.toLowerCase() === 't' || e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleViewProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#111827] selection:bg-[#6366F1] selection:text-white font-sans relative antialiased">
      {/* 1. Header / Navigation */}
      <MinimalNavbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* 2. Main Content Flow */}
      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <MinimalHero
          onViewProjects={handleViewProjects}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Technology Strip */}
        <TechStrip />

        {/* Featured Projects Section */}
        <FeaturedProjects onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)} />

        {/* About Me Section */}
        <AboutSection />

        {/* Technical Skills Section */}
        <SkillsSection />

        {/* Experience & Achievements Section */}
        <ExperienceSection />

        {/* Certificates & Accreditations Section */}
        <CertificatesSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* 3. Footer */}
      <MinimalFooter />

      {/* ======================================================================= */}
      {/* INTERACTIVE MODALS & PRESERVED CAPABILITIES                            */}
      {/* ======================================================================= */}

      {/* Deep Architecture Case Study Modal */}
      <EditorialCaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Official Latest Résumé Dossier Modal */}
      <EditorialResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Developer Terminal Modal (Ctrl+` or Ctrl+T) */}
      <EditorialTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}

export default App;
