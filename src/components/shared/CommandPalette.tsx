import React, { useState, useEffect, useRef } from 'react';
import { Search, ExternalLink, Moon, Sun, FileText, ArrowRight, FolderGit2, Cpu, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { PROJECTS } from '../../data/projects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
  onSelectProject: (projectId: string) => void;
  onOpenMLLab?: () => void;
  onOpenTerminal?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onToggleTheme,
  isDark,
  onSelectProject,
  onOpenMLLab,
  onOpenTerminal,
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

  const defaultItems = [
    {
      id: 'sec-projects',
      label: 'Go to Projects',
      sub: 'Selected engineering systems & 2D embedding space',
      icon: <FolderGit2 className="w-4 h-4 text-[#6366F1]" />,
      action: () => { window.location.hash = '#projects'; onClose(); }
    },
    {
      id: 'sec-methodology',
      label: 'Go to Methodology',
      sub: '7-stage intelligent system lifecycle',
      icon: <Sparkles className="w-4 h-4 text-[#22D3EE]" />,
      action: () => { window.location.hash = '#methodology'; onClose(); }
    },
    {
      id: 'sec-skills',
      label: 'Go to Skills & Architecture',
      sub: 'AI systems knowledge map & empirical tool usage',
      icon: <Cpu className="w-4 h-4 text-[#818CF8]" />,
      action: () => { window.location.hash = '#skills'; onClose(); }
    },
    {
      id: 'sec-build-log',
      label: 'Go to Build Log',
      sub: 'Engineering journal & architectural retrospectives',
      icon: <ArrowRight className="w-4 h-4 text-[#34D399]" />,
      action: () => { window.location.hash = '#build-log'; onClose(); }
    },
    {
      id: 'sec-contact',
      label: 'Go to Contact',
      sub: 'Direct communication channels & inquiry form',
      icon: <ArrowRight className="w-4 h-4 text-[#38BDF8]" />,
      action: () => { window.location.hash = '#contact'; onClose(); }
    },
    {
      id: 'act-ai-lab',
      label: 'Open AI Lab',
      sub: 'Interactive Transformer self-attention & gradient descent valley',
      icon: <Cpu className="w-4 h-4 text-[#6366F1]" />,
      action: () => { if (onOpenMLLab) onOpenMLLab(); onClose(); }
    },
    {
      id: 'act-terminal',
      label: 'Open Interactive Terminal',
      sub: 'Run diagnostics, nvidia-smi & system commands (~ key)',
      icon: <TerminalIcon className="w-4 h-4 text-emerald-400" />,
      action: () => { if (onOpenTerminal) onOpenTerminal(); onClose(); }
    },
    {
      id: 'act-resume',
      label: 'Download Curriculum Vitae (PDF)',
      sub: 'Specialized AI/ML Engineer resume',
      icon: <FileText className="w-4 h-4 text-[#F59E0B]" />,
      action: () => { window.open('/Abhinav_Anand_Resume_AIML_Specialized.pdf', '_blank'); onClose(); }
    },
    {
      id: 'act-theme',
      label: `Switch to ${isDark ? 'Light Mode' : 'Dark Mode'}`,
      sub: 'Toggle portfolio aesthetic',
      icon: isDark ? <Sun className="w-4 h-4 text-[#F5F7FA]" /> : <Moon className="w-4 h-4 text-[#0F172A]" />,
      action: () => { onToggleTheme(); onClose(); }
    },
    {
      id: 'act-github',
      label: 'Open GitHub Profile',
      sub: 'github.com/abhinavbuilds2005',
      icon: <ExternalLink className="w-4 h-4 text-[#9AA4B2]" />,
      action: () => { window.open('https://github.com/abhinavbuilds2005', '_blank'); onClose(); }
    }
  ];

  const projectItems = PROJECTS.map((p) => ({
    id: `proj-${p.id}`,
    label: `Project: ${p.title}`,
    sub: `${p.categoryLabel} — ${p.tagline}`,
    icon: <FolderGit2 className="w-4 h-4 text-[#6366F1]" />,
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

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-white/10 dark:border-white/10 light:border-black/10 bg-[#0D1014] dark:bg-[#0D1014] light:bg-white text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] shadow-2xl overflow-hidden font-sans flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-[#F0F2F5]">
          <Search className="w-4 h-4 text-[#6366F1] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search systems (e.g. DocuShield, PyTorch, Terminal)..."
            className="w-full bg-transparent text-sm focus:outline-none placeholder:text-[#667085] text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]"
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-[#9AA4B2]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-[#667085]">
              No commands or systems found matching "{query}"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <button
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                    isSelected
                      ? 'bg-[#6366F1]/15 text-white'
                      : 'text-[#9AA4B2] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#6366F1]/20' : 'bg-white/[0.04]'}`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A]'}`}>
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#667085] line-clamp-1">
                        {item.sub}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <ArrowRight className="w-3.5 h-3.5 text-[#6366F1] shrink-0 ml-2" />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-white/[0.06] bg-[#08090B] dark:bg-[#08090B] light:bg-[#F7F8FA] flex items-center justify-between font-mono text-[10px] text-[#667085]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>Abhinav Anand · Portfolio v2</span>
        </div>

      </div>
    </div>
  );
};
