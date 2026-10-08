import React, { useState, useEffect, useRef } from 'react';
import { Search, ExternalLink, Moon, Sun, FileText, ArrowRight, FolderGit2, Cpu } from 'lucide-react';
import { PROJECTS } from '../../data/projects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
  onSelectProject: (projectId: string) => void;
  onOpenLab?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onToggleTheme,
  isDark,
  onSelectProject,
  onOpenLab
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
      sub: 'Selected engineering work & verified repositories',
      icon: <FolderGit2 className="w-4 h-4 text-accent" />,
      action: () => { window.location.hash = '#projects'; onClose(); }
    },
    {
      id: 'sec-telemetry',
      label: 'Jump to: ML Systems Sandbox',
      sub: 'Live model inference trace, threshold tuning & cost matrix optimizer',
      icon: <Cpu className="w-4 h-4 text-accent" />,
      action: () => { window.location.hash = '#ai-telemetry'; onClose(); }
    },
    {
      id: 'sec-skills',
      label: 'Jump to: Skills & Capabilities',
      sub: 'Machine learning, computer vision, NLP, and backend architecture',
      icon: <ArrowRight className="w-4 h-4 text-accent" />,
      action: () => { window.location.hash = '#skills'; onClose(); }
    },
    {
      id: 'sec-lab',
      label: 'Open: Interactive ML Lab',
      sub: 'Transformer attention, gradient descent, embeddings & model pipeline',
      icon: <Cpu className="w-4 h-4 text-accent" />,
      action: () => { if (onOpenLab) onOpenLab(); onClose(); }
    },
    {
      id: 'sec-build-log',
      label: 'Jump to: Build Log',
      sub: 'Technical architectural notes and evaluation retrospectives',
      icon: <ArrowRight className="w-4 h-4 text-accent" />,
      action: () => { window.location.hash = '#build-log'; onClose(); }
    },
    {
      id: 'sec-contact',
      label: 'Jump to: Contact',
      sub: 'Initiate communication or view direct channels',
      icon: <ArrowRight className="w-4 h-4 text-accent" />,
      action: () => { window.location.hash = '#contact'; onClose(); }
    },
    {
      id: 'act-resume',
      label: 'View Curriculum Vitae (PDF)',
      sub: 'Abhinav Anand AI/ML specialized resume',
      icon: <FileText className="w-4 h-4 text-accent" />,
      action: () => { window.open('/Abhinav_Anand_Resume_AIML_Specialized.pdf', '_blank'); onClose(); }
    },
    {
      id: 'act-theme',
      label: `Switch to ${isDark ? 'Light Warm Paper Mode' : 'Dark Charcoal Mode'}`,
      sub: 'Toggle color scheme',
      icon: isDark ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-accent" />,
      action: () => { onToggleTheme(); onClose(); }
    },
    {
      id: 'act-github',
      label: 'Open GitHub Profile',
      sub: 'github.com/abhinavbuilds2005',
      icon: <ExternalLink className="w-4 h-4 text-accent" />,
      action: () => { window.open('https://github.com/abhinavbuilds2005', '_blank'); onClose(); }
    }
  ];

  // Project search items
  const projectItems = PROJECTS.map((p) => ({
    id: `proj-${p.id}`,
    label: `Project: ${p.title}`,
    sub: p.tagline,
    icon: <FolderGit2 className="w-4 h-4 text-accent" />,
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
    if (filteredItems.length === 0) {
      if (e.key === 'Escape') onClose();
      return;
    }
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-lg border border-border-strong bg-surface shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-border-subtle bg-elevated">
          <Search className="w-4 h-4 text-accent mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a section, project, or command..."
            className="w-full bg-transparent text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none"
          />
          <kbd className="text-xs font-mono px-1.5 py-0.5 rounded border border-border-subtle text-text-muted bg-base">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-center text-xs font-mono text-text-muted">
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
                  className={`flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-accent/15 border border-accent/40 text-text-primary'
                      : 'text-text-secondary hover:bg-elevated border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1 rounded bg-base border border-border-subtle">{item.icon}</span>
                    <div>
                      <div className="text-xs font-semibold font-mono text-text-primary">
                        {item.label}
                      </div>
                      <div className="text-xs text-text-muted truncate max-w-sm">
                        {item.sub}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="font-mono text-xs text-accent">↵</span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-border-subtle bg-elevated flex items-center justify-between text-xs font-mono text-text-muted">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-accent font-medium">Ctrl+K or ⌘K</span>
        </div>

      </div>
    </div>
  );
};
