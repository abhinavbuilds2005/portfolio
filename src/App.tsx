import React, { useState, useEffect } from 'react';
import { CinematicIntro } from './components/editorial/CinematicIntro';
import { EditorialNavbar } from './components/editorial/EditorialNavbar';
import { EditorialHero } from './components/editorial/EditorialHero';
import { EditorialMarquee } from './components/editorial/EditorialMarquee';
import { EditorialProjects } from './components/editorial/EditorialProjects';
import { EditorialAbout } from './components/editorial/EditorialAbout';
import { EditorialJourneyMap } from './components/editorial/EditorialJourneyMap';
import { EditorialStack } from './components/editorial/EditorialStack';
import { EditorialCertifications } from './components/editorial/EditorialCertifications';
import { EditorialLeetCode } from './components/editorial/EditorialLeetCode';
import { EditorialContact } from './components/editorial/EditorialContact';
import { BackToTop } from './components/editorial/BackToTop';
import { CustomCursor } from './components/editorial/CustomCursor';
import { ScrollProgressBar } from './components/editorial/ScrollProgressBar';
import { EditorialTerminalModal } from './components/editorial/EditorialTerminalModal';
import { EditorialCaseStudyModal } from './components/editorial/EditorialCaseStudyModal';
import { EditorialResumeModal } from './components/editorial/EditorialResumeModal';
import { ThemePreviewStudio } from './components/editorial/ThemePreviewStudio';
import { THEME_OPTIONS } from './lib/themeOptions';
import { Project } from './lib/types';

export function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  // Background Theme Studio state
  const [themeId, setThemeId] = useState<string>(() => {
    return localStorage.getItem('abhinav_portfolio_theme') || 'white-blue-pages';
  });

  const activeTheme = THEME_OPTIONS.find((t) => t.id === themeId) || THEME_OPTIONS[0];

  useEffect(() => {
    localStorage.setItem('abhinav_portfolio_theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    document.body.style.backgroundColor = activeTheme.baseColor;
  }, [themeId, activeTheme]);

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
    <div className="min-h-screen text-[#132532] transition-colors duration-500 selection:bg-[#315CFF] selection:text-white font-sans relative">
      {/* Dynamic Mixed Background Canvas Layer */}
      <div 
        className={`${activeTheme.isFullDocumentGradient ? 'absolute h-full' : 'fixed'} inset-0 pointer-events-none -z-10 transition-all duration-700 ease-in-out`}
        style={{ background: activeTheme.background }}
      />
      {/* Top Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Desktop Custom Smooth Cursor */}
      <CustomCursor />

      {/* Cinematic Intro Animation (Curtain reveal on load) */}
      <CinematicIntro onComplete={() => setIntroFinished(true)} />

      {/* Sticky Editorial Navbar */}
      <EditorialNavbar 
        onOpenTerminal={() => setIsTerminalOpen(true)} 
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Editorial Content Flow */}
      <main id="main-content" className="relative z-10">
        {/* Page 1: Editorial Hero & Marquee */}
        <div 
          className="transition-all duration-700"
          style={activeTheme.isAlternating ? { background: activeTheme.page1Bg } : undefined}
        >
          <EditorialHero onOpenResume={() => setIsResumeOpen(true)} />
          <EditorialMarquee />
        </div>

        {/* Page 2: Selected Work / Engineered Systems (Blue Mix) */}
        <div 
          className="transition-all duration-700"
          data-theme={activeTheme.page2Dark ? 'obsidian' : undefined}
          style={activeTheme.isAlternating ? { background: activeTheme.page2Bg } : undefined}
        >
          <EditorialProjects onOpenCaseStudy={(project) => setSelectedCaseStudy(project)} />
        </div>

        {/* Page 3: About / The Person Behind the Builds (White) */}
        <div 
          className="transition-all duration-700"
          style={activeTheme.isAlternating ? { background: activeTheme.page1Bg } : undefined}
        >
          <EditorialAbout />
        </div>

        {/* Page 4: Interactive Journey Traversal Map & Stack (Blue Mix) */}
        <div 
          className="transition-all duration-700"
          data-theme={activeTheme.page2Dark ? 'obsidian' : undefined}
          style={activeTheme.isAlternating ? { background: activeTheme.page2Bg } : undefined}
        >
          <EditorialJourneyMap />
          <EditorialStack />
        </div>

        {/* Page 5: Verified Accreditations & Technical Credentials + LeetCode (White) */}
        <div 
          className="transition-all duration-700"
          style={activeTheme.isAlternating ? { background: activeTheme.page1Bg } : undefined}
        >
          <EditorialCertifications />
          <EditorialLeetCode />
        </div>

        {/* Page 6: Contact / Let's Build Something Dependable */}
        <div 
          className="transition-all duration-700"
          data-theme={activeTheme.page2Dark ? 'obsidian' : undefined}
          style={activeTheme.isAlternating ? { background: activeTheme.pageContactBg || activeTheme.page2Bg } : undefined}
        >
          <EditorialContact />
        </div>
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

      {/* Official Latest Résumé Dossier Modal */}
      <EditorialResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Interactive Theme Preview Studio for Live Testing */}
      <ThemePreviewStudio 
        activeThemeId={themeId} 
        onSelectTheme={setThemeId} 
      />
    </div>
  );
}

export default App;
