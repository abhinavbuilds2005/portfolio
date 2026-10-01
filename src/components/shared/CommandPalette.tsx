import React, { useState, useEffect, useRef } from 'react';
import { Search, ExternalLink, Moon, Sun, FileText, ArrowRight, FolderGit2, Sparkles } from 'lucide-react';
import { PROJECTS } from '../../data/projects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
  onSelectProject: (projectId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onToggleTheme,
  isDark,
  onSelectProject
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Static commands
  const defaultItems = [
    {
      id: 'sec-projects',
      label: 'Jump to: Projects',
      sub: 'Selected engineering work & 2D latent embedding map',
      icon: <FolderGit2 className="w-4 h-4 text-[#e58b24]" />,
      action: () => { window.location.hash = '#projects'; onClose(); }
    },
    {
      id: 'sec-skills',
      label: 'Jump to: Skills & Feature Importance',
      sub: 'Dynamic empirical tech frequency bars & certifications',
      icon: <ArrowRight className="w-4 h-4 text-[#e58b24]" />,
      action: () => { window.location.hash = '#skills'; onClose(); }
    },
    {
      id: 'sec-build-log',
      label: 'Jump to: Build Log',
      sub: 'Architectural notes and failure mode retrospectives',
      icon: <ArrowRight className="w-4 h-4 text-[#e58b24]" />,
      action: () => { window.location.hash = '#build-log'; onClose(); }
    },
    {
      id: 'sec-contact',
      label: 'Jump to: Contact',
      sub: 'Initiate transmission or view direct communication channels',
      icon: <ArrowRight className="w-4 h-4 text-[#e58b24]" />,
      action: () => { window.location.hash = '#contact'; onClose(); }
    },
    {
      id: 'act-resume',
      label: 'Download Curriculum Vitae (PDF)',
      sub: 'Tailored AI/ML Engineer resume',
      icon: <FileText className="w-4 h-4 text-[#e58b24]" />,
      action: () => { window.open('/Abhinav_Anand_Resume_AIML_Specialized.pdf', '_blank'); onClose(); }
    },
    {
      id: 'act-theme',
      label: `Switch to ${isDark ? 'Light Warm Paper Mode' : 'Dark Charcoal Mode'}`,
      sub: 'Toggle Ink and Saffron visual identity',
      icon: isDark ? <Sun className="w-4 h-4 text-[#e58b24]" /> : <Moon className="w-4 h-4 text-[#c84b31]" />,
      action: () => { onToggleTheme(); onClose(); }
    },
    {
      id: 'act-github',
      label: 'Open GitHub Profile',
      sub: 'github.com/abhinavbuilds2005',
      icon: <ExternalLink className="w-4 h-4 text-[#e58b24]" />,
      action: () => { window.open('https://github.com/abhinavbuilds2005', '_blank'); onClose(); }
    }
  ];

  // Project search items
  const projectItems = PROJECTS.map((p) => ({
    id: `proj-${p.id}`,
    label: `Project: ${p.title}`,
    sub: p.tagline,
    icon: <FolderGit2 className="w-4 h-4 text-[#e58b24]" />,
    action: () => { onSelectProject(p.id); onClose(); }
  }));

  const allItems = [...defaultItems, ...projectItems];

  const filteredItems = query.trim() === ''
    ? allItems
    : allItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.sub.toLowerCase().includes(query.toLowerCase())
      );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-lg border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5]">
          <Search className="w-4 h-4 text-[#e58b24] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a section, project, or command..."
            className="w-full bg-transparent text-sm font-mono text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] placeholder-[#78716c] focus:outline-none"
          />
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#2b2a27] text-[#78716c]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-center text-xs font-mono text-[#78716c]">
              No commands matching "{query}"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#e58b24]/15 border border-[#e58b24]/40 text-[#f5f2eb]'
                      : 'text-[#a8a29e] hover:bg-[#161616] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1 rounded bg-[#121212]">{item.icon}</span>
                    <div>
                      <div className="text-xs font-semibold font-mono text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#78716c] truncate max-w-sm">
                        {item.sub}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="font-mono text-[10px] text-[#e58b24]">↵</span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-[#2b2a27]/60 bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5] flex items-center justify-between text-[10px] font-mono text-[#78716c]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[#e58b24]">Ctrl+K or ⌘K</span>
        </div>

      </div>
    </div>
  );
};
