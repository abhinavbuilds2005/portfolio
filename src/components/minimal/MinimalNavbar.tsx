import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { MagneticButton } from '../editorial/MagneticButton';

interface MinimalNavbarProps {
  onOpenResume: () => void;
  activeSection?: string;
}

export const MinimalNavbar: React.FC<MinimalNavbarProps> = ({
  onOpenResume,
  activeSection = 'home',
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple spy
      const sections = ['home', 'about', 'projects', 'skills', 'certificates', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'LeetCode', href: '#leetcode', id: 'leetcode' },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF9F5]/90 backdrop-blur-md border-b border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.02)] py-3'
          : 'bg-[#FAF9F5]/60 backdrop-blur-xs py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <span className="font-sans font-extrabold text-2xl tracking-tight text-[#111827] group-hover:text-[#6366F1] transition-colors">
            AA
          </span>
          <span className="font-sans font-semibold text-base tracking-tight text-[#111827]">
            Abhinav Anand
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive
                    ? 'text-[#111827] font-semibold'
                    : 'text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6366F1] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action: Resume Button */}
        <div className="hidden sm:flex items-center gap-3">
          <MagneticButton strength={0.35}>
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 bg-[#111827] text-white hover:bg-[#1F2937] active:scale-95 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Resume</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111827] hover:text-[#6366F1] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F5] border-b border-black/[0.08] px-6 py-5 shadow-lg">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-base font-medium py-1.5 ${
                  currentSection === link.id
                    ? 'text-[#6366F1] font-bold'
                    : 'text-[#4B5563] hover:text-[#111827]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#111827] text-white py-2.5 rounded-full text-xs font-semibold shadow-sm"
              >
                <span>Resume</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
