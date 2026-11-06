import React, { useState, useEffect } from 'react';
import { CinematicIntro } from './components/editorial/CinematicIntro';
import { EditorialNavbar } from './components/editorial/EditorialNavbar';
import { EditorialHero } from './components/editorial/EditorialHero';
import { EditorialMarquee } from './components/editorial/EditorialMarquee';
import { EditorialProjects } from './components/editorial/EditorialProjects';
import { EditorialAbout } from './components/editorial/EditorialAbout';
import { EditorialStack } from './components/editorial/EditorialStack';
import { EditorialLeetCode } from './components/editorial/EditorialLeetCode';
import { EditorialContact } from './components/editorial/EditorialContact';
import { BackToTop } from './components/editorial/BackToTop';
import { CustomCursor } from './components/editorial/CustomCursor';
import { EditorialTerminalModal } from './components/editorial/EditorialTerminalModal';
import { EditorialCaseStudyModal } from './components/editorial/EditorialCaseStudyModal';
import { Project } from './lib/types';

export function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Terminal with Ctrl+` or Ctrl+T or Cmd+K
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key.toLowerCase() === 't' || e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#132532] selection:bg-[#315CFF] selection:text-white font-sans relative">
      {/* Desktop Custom Smooth Cursor */}
      <CustomCursor />

      {/* Cinematic Intro Animation (Curtain reveal on load) */}
      <CinematicIntro onComplete={() => setIntroFinished(true)} />

      {/* Sticky Editorial Navbar */}
      <EditorialNavbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Main Editorial Content Flow */}
      <main id="main-content" className="relative z-10">
        {/* Section 0: Editorial Hero */}
        <EditorialHero />

        {/* Kinetic Horizontal Marquee Stream */}
        <EditorialMarquee />

        {/* Section 1: Selected Work / Engineered Systems */}
        <EditorialProjects onOpenCaseStudy={(project) => setSelectedCaseStudy(project)} />

        {/* Section 2: About / The Person Behind the Builds */}
        <EditorialAbout />

        {/* Section 3: Tools of the Trade / Working Vocabulary */}
        <EditorialStack />

        {/* Section 4: Problem Solving & LeetCode Telemetry */}
        <EditorialLeetCode />

        {/* Section 5: Contact / Let's Build Something Dependable */}
        <EditorialContact />
      </main>

      {/* Floating Back to Top Button (Electric Blue square with arrow) */}
      <BackToTop />

      {/* Interactive Runtime Terminal Modal */}
      <EditorialTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Deep Architecture Case Study Modal */}
      <EditorialCaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </div>
  );
}

export default App;
