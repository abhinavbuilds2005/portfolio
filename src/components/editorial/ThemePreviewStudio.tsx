import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, Sparkles, ChevronDown, ChevronUp, Copy, ThumbsUp, RefreshCw } from 'lucide-react';

export interface ThemeOption {
  id: string;
  name: string;
  category: 'Warm Light' | 'Cool Light' | 'Ambient Mesh' | 'Deep Dark' | 'Industrial Dark' | 'Classic';
  description: string;
  swatch: string;
  baseColor: string;
  background: string;
  isDark?: boolean;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'warmth',
    name: '01. Editorial Warmth',
    category: 'Warm Light',
    description: 'Warm porcelain & desert sand with soft persimmon and electric blue auras',
    swatch: 'linear-gradient(135deg, #F6F3EC 0%, #F0784B 50%, #EFE8DC 100%)',
    baseColor: '#F6F3EC',
    background: `
      radial-gradient(circle at 85% 15%, rgba(240, 120, 75, 0.11), transparent 45%),
      radial-gradient(circle at 15% 85%, rgba(49, 92, 255, 0.08), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(245, 240, 230, 0.6), transparent 70%),
      linear-gradient(180deg, #F6F3EC 0%, #EFE8DC 45%, #F4EFE6 100%)
    `,
  },
  {
    id: 'nordic',
    name: '02. Nordic Frost',
    category: 'Cool Light',
    description: 'Crisp ice white & cool slate with an energetic top electric blue light beam',
    swatch: 'linear-gradient(135deg, #F8FAFC 0%, #315CFF 50%, #F1F5F9 100%)',
    baseColor: '#F8FAFC',
    background: `
      radial-gradient(circle at 50% -10%, rgba(49, 92, 255, 0.16) 0%, transparent 60%),
      radial-gradient(circle at 90% 70%, rgba(14, 165, 233, 0.09) 0%, transparent 45%),
      linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 50%, #E2E8F0 100%)
    `,
  },
  {
    id: 'mesh',
    name: '03. Chromatic Mesh',
    category: 'Ambient Mesh',
    description: 'Warm linen with a 4-point diffused ambient lighting field (Blue, Amber, Emerald)',
    swatch: 'linear-gradient(135deg, #315CFF 0%, #F0784B 50%, #10B981 100%)',
    baseColor: '#F5F2EB',
    background: `
      radial-gradient(circle at 15% 20%, rgba(49, 92, 255, 0.13) 0px, transparent 40%),
      radial-gradient(circle at 85% 25%, rgba(240, 120, 75, 0.12) 0px, transparent 40%),
      radial-gradient(circle at 50% 70%, rgba(16, 185, 129, 0.09) 0px, transparent 45%),
      radial-gradient(circle at 80% 90%, rgba(99, 102, 241, 0.09) 0px, transparent 45%),
      #F5F2EB
    `,
  },
  {
    id: 'obsidian',
    name: '04. Midnight Obsidian',
    category: 'Deep Dark',
    description: 'Deep cybernetic dark mode with electric cobalt aurora glow',
    swatch: 'linear-gradient(135deg, #0B0F17 0%, #315CFF 50%, #0F172A 100%)',
    baseColor: '#0B0F17',
    isDark: true,
    background: `
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(49, 92, 255, 0.35), transparent 70%),
      radial-gradient(circle at 85% 60%, rgba(14, 165, 233, 0.15), transparent 50%),
      linear-gradient(180deg, #0B0F17 0%, #0F172A 50%, #080C14 100%)
    `,
  },
  {
    id: 'carbon',
    name: '05. Carbon & Ember',
    category: 'Industrial Dark',
    description: 'Industrial charcoal & graphite with burnt persimmon embers',
    swatch: 'linear-gradient(135deg, #12161A 0%, #F0784B 50%, #171E24 100%)',
    baseColor: '#12161A',
    isDark: true,
    background: `
      radial-gradient(circle at 85% 15%, rgba(240, 120, 75, 0.24), transparent 45%),
      radial-gradient(circle at 15% 85%, rgba(49, 92, 255, 0.18), transparent 50%),
      linear-gradient(180deg, #12161A 0%, #171E24 50%, #0E1215 100%)
    `,
  },
  {
    id: 'classic',
    name: '00. Classic Porcelain',
    category: 'Classic',
    description: 'Original neutral porcelain canvas (Solid #F5F2EB)',
    swatch: '#F5F2EB',
    baseColor: '#F5F2EB',
    background: '#F5F2EB',
  },
];

interface ThemePreviewStudioProps {
  activeThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

export const ThemePreviewStudio: React.FC<ThemePreviewStudioProps> = ({
  activeThemeId,
  onSelectTheme,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const activeTheme = THEME_OPTIONS.find((t) => t.id === activeThemeId) || THEME_OPTIONS[0];

  const handleCopyApproval = () => {
    navigator.clipboard.writeText(`I approve ${activeTheme.name}!`);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-4 pointer-events-none">
      <div className="pointer-events-auto">
        <AnimatePresence mode="wait">
          {isMinimized ? (
            <motion.button
              key="minimized-pill"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => setIsMinimized(false)}
              className="mx-auto flex items-center gap-2.5 bg-[#132532] text-white px-4 py-2.5 shadow-[4px_4px_0px_#315CFF] border border-[#132532] font-mono text-xs font-bold cursor-pointer hover:bg-[#2047E5] transition-all"
            >
              <Palette className="w-3.5 h-3.5 text-[#F0784B]" />
              <span>TEST BACKGROUND PALETTES</span>
              <span className="w-2.5 h-2.5 rounded-full border border-white/40" style={{ background: activeTheme.swatch }} />
              <ChevronUp className="w-3.5 h-3.5 text-white/70 ml-1" />
            </motion.button>
          ) : (
            <motion.div
              key="expanded-studio"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="bg-[#132532] text-white border-2 border-[#315CFF] shadow-[6px_6px_0px_rgba(0,0,0,0.4)] p-4 sm:p-5"
            >
              {/* Studio Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-[#315CFF] text-white">
                    <Palette className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <div className="font-mono text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                      <span>BACKGROUND STUDIO // LIVE TEST</span>
                      <span className="font-mono text-[9px] bg-[#F0784B] text-white px-1.5 py-0.2 font-bold">
                        INTERACTIVE
                      </span>
                    </div>
                    <div className="text-[11px] text-white/75 font-sans hidden sm:block">
                      Click any mixed background below to see it live across your entire portfolio
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1 hover:bg-white/15 transition-colors text-white cursor-pointer"
                    title="Minimize Studio"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Theme Options Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-3.5">
                {THEME_OPTIONS.map((theme) => {
                  const isSelected = activeThemeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => onSelectTheme(theme.id)}
                      className={`text-left p-2.5 border transition-all cursor-pointer relative group flex flex-col justify-between min-h-[72px] ${
                        isSelected
                          ? 'bg-[#315CFF] text-white border-[#315CFF] shadow-[2px_2px_0px_#F0784B]'
                          : 'bg-white/10 hover:bg-white/15 text-white/90 border-white/15 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        <span
                          className="w-4 h-4 rounded-full border border-white/30 shadow-sm flex-shrink-0"
                          style={{ background: theme.swatch }}
                        />
                        {isSelected && (
                          <span className="text-[#F0784B] font-mono text-[10px] font-bold">
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="font-mono text-[11px] font-bold tracking-tight leading-tight line-clamp-1">
                          {theme.name.replace(/^\d+\.\s*/, '')}
                        </div>
                        <div className={`font-mono text-[9px] uppercase tracking-wider mt-0.5 ${
                          isSelected ? 'text-white/80' : 'text-white/50'
                        }`}>
                          {theme.category}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action & Approval Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-white/15 font-mono text-xs">
                <div className="text-white/90 flex items-center gap-2">
                  <span className="font-bold text-white">Current:</span>
                  <span className="bg-white/10 px-2 py-0.5 border border-white/20 font-semibold text-[#F0784B]">
                    {activeTheme.name}
                  </span>
                  <span className="text-[11px] text-white/70 hidden md:inline">
                    — {activeTheme.description}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyApproval}
                    className="bg-[#315CFF] hover:bg-[#2047E5] text-white px-3.5 py-1.5 font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm text-xs"
                  >
                    {copiedToast ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>COPIED FOR APPROVAL!</span>
                      </>
                    ) : (
                      <>
                        <ThumbsUp className="w-3.5 h-3.5 text-[#F0784B]" />
                        <span>APPROVE THIS PALETTE</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
