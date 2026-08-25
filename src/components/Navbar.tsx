import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Sparkles, 
  Code2, 
  Briefcase, 
  Cpu, 
  Send,
  Award,
  FileText
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface NavbarProps {
  accentColor: string;
  setAccentColor: (color: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  activeSection: string;
}

export const themes = [
  { id: 'cyan', name: 'Cyber Cyan', hex: '#00f2ff' },
  { id: 'indigo', name: 'Royal Indigo', hex: '#6366f1' },
  { id: 'emerald', name: 'Emerald Green', hex: '#10b981' },
  { id: 'purple', name: 'Electric Violet', hex: '#8b5cf6' },
  { id: 'amber', name: 'Solar Amber', hex: '#f59e0b' },
];

export const Navbar: React.FC<NavbarProps> = ({
  accentColor,
  setAccentColor,
  soundEnabled,
  setSoundEnabled,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Overview', href: '#hero' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Work', href: '#work' },
    { label: 'LeetCode', href: '#leetcode' },
    { label: 'Credentials', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => {
    sfx.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 py-4 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-5xl transition-all duration-300 rounded-full border ${
            isScrolled
              ? 'bg-obsidian-900/80 backdrop-blur-xl border-white/10 shadow-2xl py-2 px-4 sm:px-6'
              : 'bg-obsidian-900/50 backdrop-blur-md border-white/10 py-3 px-4 sm:px-6'
          }`}
        >
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <a
              href="#hero"
              onClick={handleNavClick}
              onMouseEnter={() => sfx.playHover()}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-full bg-white text-black font-bold font-display flex items-center justify-center text-sm shadow-md group-hover:scale-105 transition-transform">
                AA
              </div>
              <span className="font-display font-bold text-sm tracking-tight text-white hidden sm:inline">
                Abhinav Anand
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={handleNavClick}
                    onMouseEnter={() => sfx.playHover()}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-white/10 text-white font-semibold shadow-inner'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            {/* Controls & CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Audio Toggle */}
              <button
                onClick={() => {
                  const next = !soundEnabled;
                  sfx.enabled = next;
                  setSoundEnabled(next);
                  if (next) sfx.playSuccess();
                }}
                onMouseEnter={() => sfx.playHover()}
                title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
                className={`p-2 rounded-full border transition-all ${
                  soundEnabled
                    ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan'
                    : 'bg-obsidian-800 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              {/* Theme Accent Switcher */}
              <div className="relative">
                <button
                  onClick={() => {
                    sfx.playClick();
                    setThemeDropdownOpen(!themeDropdownOpen);
                  }}
                  onMouseEnter={() => sfx.playHover()}
                  title="Customize Theme Accent"
                  className="p-2 rounded-full bg-obsidian-800 border border-white/10 text-gray-300 hover:text-white transition-all flex items-center justify-center"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                </button>

                {themeDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-obsidian-900 border border-white/15 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in">
                    <div className="text-[10px] font-mono text-gray-400 px-2 py-1 uppercase tracking-wider border-b border-white/10 mb-1">
                      Accent Color
                    </div>
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setAccentColor(t.hex);
                          document.documentElement.style.setProperty('--accent-color', t.hex);
                          document.documentElement.style.setProperty('--accent-glow', `${t.hex}55`);
                          sfx.playSuccess();
                          setThemeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                          accentColor === t.hex
                            ? 'bg-white/10 text-white font-semibold'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.hex }} />
                        <span>{t.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hire Me CTA Button */}
              <a
                href="#contact"
                onClick={handleNavClick}
                onMouseEnter={() => sfx.playHover()}
                className="px-4 py-1.5 rounded-full bg-white text-black font-semibold text-xs transition-all hover:bg-gray-200 hover:scale-105 active:scale-95 shadow-md"
              >
                Hire Me
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => {
                  sfx.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="md:hidden p-2 rounded-full bg-obsidian-800 border border-white/10 text-gray-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>

          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/Abhinav_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={handleNavClick}
                className="px-3 py-2 rounded-lg text-xs font-medium text-cyber-cyan hover:bg-white/5 flex items-center gap-2 border-t border-white/5 mt-1"
              >
                <FileText className="w-3.5 h-3.5" />
                Download Resume (PDF)
              </a>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};
