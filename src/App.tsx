import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ProjectMatrix } from './components/ProjectMatrix';
import { LeetCodeHUD } from './components/LeetCodeHUD';
import { CertificationsSection } from './components/CertificationsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactTerminal } from './components/ContactTerminal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [accentColor, setAccentColor] = useState('#00f2ff');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Custom Cursor Glow Follower
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Section Observer
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#07090e] text-gray-100 selection:bg-white selection:text-black relative overflow-hidden">
      
      {/* Ambient Mesh Lighting (Deep Dark Mode) */}
      <div className="bg-ambient-lighting">
        <div className="light-1" style={{ background: `radial-gradient(circle, ${accentColor}15 0%, transparent 70%)` }} />
        <div className="light-2" style={{ background: `radial-gradient(circle, #8b5cf615 0%, transparent 70%)` }} />
      </div>

      {/* Subtle Dynamic Cursor Light Glow */}
      <div
        className="fixed w-[450px] h-[450px] rounded-full pointer-events-none z-30 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          background: `radial-gradient(circle, ${accentColor}12 0%, transparent 70%)`,
        }}
      />

      {/* Floating Header */}
      <Navbar
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero accentColor={accentColor} />
        <SkillsSection />
        <ProjectMatrix />
        <LeetCodeHUD />
        <CertificationsSection />
        <ExperienceTimeline />
        <ContactTerminal />
      </main>

      {/* Clean Footer */}
      <Footer />
    </div>
  );
};
