import React, { useState, useEffect } from 'react';
import { Terminal, FileText, Menu, X } from 'lucide-react';

interface EditorialNavbarProps {
  onOpenTerminal?: () => void;
}

export const EditorialNavbar: React.FC<EditorialNavbarProps> = ({ onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'JOURNEY', href: '#journey' },
    { label: 'SKILLS', href: '#stack' },
    { label: 'LEETCODE', href: '#leetcode' },
    { label: 'HIRE ME', href: '#contact', isHireMe: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F2EB]/95 backdrop-blur-md border-b border-[#132532]/10 py-3 shadow-sm'
          : 'bg-[#F5F2EB] py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          className="group flex items-center gap-3 no-underline select-none"
        >
          {/* Blue Sticker Badge with Persimmon Offset Shadow */}
          <div className="relative">
            <div className="w-8 h-8 rounded bg-[#315CFF] text-white flex items-center justify-center font-mono font-bold text-sm tracking-tight shadow-[3px_3px_0px_#F0784B] transform -rotate-3 group-hover:rotate-0 transition-transform duration-200">
              A.
            </div>
          </div>
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#132532] uppercase">
            ABHINAV ANAND / PORTFOLIO
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest text-[#132532]/75 font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.isHireMe
                  ? 'bg-[#315CFF] text-white px-3.5 py-1.5 shadow-[2px_2px_0px_#F0784B] hover:bg-[#2047E5] transition-all font-bold hover:translate-x-[1px] hover:translate-y-[1px]'
                  : 'hover:text-[#132532] hover:text-[#315CFF] transition-colors relative py-1'
              }
            >
              {link.label}
            </a>
          ))}

          {/* Interactive Terminal Trigger */}
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#132532]/20 hover:border-[#315CFF] hover:text-[#315CFF] transition-colors rounded text-xs font-mono cursor-pointer"
              title="Open Interactive Terminal"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>TERMINAL</span>
            </button>
          )}

          {/* Direct Resume Link */}
          <a
            href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#F0784B] hover:text-[#DC6437] transition-colors"
          >
            <span>RÉSUMÉ</span>
            <span className="text-[10px]">↗</span>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 md:hidden">
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="p-1.5 border border-[#132532]/20 text-[#132532] rounded"
              aria-label="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#132532] border border-[#132532]/20 rounded"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F2EB] border-b border-[#132532]/10 px-6 py-5 flex flex-col gap-4 font-mono text-sm tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#132532] py-2 border-b border-[#132532]/10"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F0784B] font-bold py-2 flex items-center justify-between"
          >
            <span>DOWNLOAD RÉSUMÉ</span>
            <span>↗</span>
          </a>
        </div>
      )}
    </header>
  );
};

