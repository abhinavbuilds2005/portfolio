import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, ChevronDown, ChevronUp, ThumbsUp } from 'lucide-react';
import { THEME_OPTIONS, ThemeOption } from '../../lib/themeOptions';

export { THEME_OPTIONS, type ThemeOption };

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
              <span>TEST 2-COLOR MIXES</span>
              <div className="flex items-center -space-x-1">
                <span className="w-2.5 h-2.5 rounded-full border border-white/60" style={{ backgroundColor: activeTheme.color1Hex }} />
                <span className="w-2.5 h-2.5 rounded-full border border-white/60" style={{ backgroundColor: activeTheme.color2Hex }} />
              </div>
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
                      <span>TWO-COLOR MIX STUDIO // LIVE TEST</span>
                      <span className="font-mono text-[9px] bg-[#F0784B] text-white px-1.5 py-0.2 font-bold">
                        DUAL-TONE
                      </span>
                    </div>
                    <div className="text-[11px] text-white/75 font-sans hidden sm:block">
                      Click any 2-color mix below to test the exact gradient blend across your portfolio
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

              {/* 2-Color Theme Options Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-3.5">
                {THEME_OPTIONS.map((theme) => {
                  const isSelected = activeThemeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      data-theme-id={theme.id}
                      onClick={() => onSelectTheme(theme.id)}
                      className={`text-left p-2.5 border transition-all cursor-pointer relative group flex flex-col justify-between min-h-[82px] ${
                        isSelected
                          ? 'bg-[#315CFF] text-white border-[#315CFF] shadow-[2px_2px_0px_#F0784B]'
                          : 'bg-white/10 hover:bg-white/15 text-white/90 border-white/15 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        {/* Dual-Color Swatch Pill */}
                        <div className="flex items-center -space-x-1.5">
                          <span
                            className="w-4 h-4 rounded-full border border-black/30 shadow-sm z-10"
                            style={{ backgroundColor: theme.color1Hex }}
                            title={theme.color1Name}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/30 shadow-sm"
                            style={{ backgroundColor: theme.color2Hex }}
                            title={theme.color2Name}
                          />
                        </div>
                        {isSelected && (
                          <span className="text-[#F0784B] font-mono text-[9px] font-bold">
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="font-mono text-[11px] font-bold tracking-tight leading-tight line-clamp-1">
                          {theme.color1Name} + {theme.color2Name}
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
                <div className="text-white/90 flex flex-wrap items-center gap-2">
                  <span className="font-bold text-white">Active 2-Color Mix:</span>
                  <span className="bg-white/10 px-2 py-0.5 border border-white/20 font-semibold text-[#F0784B]">
                    {activeTheme.color1Name} ({activeTheme.color1Hex}) + {activeTheme.color2Name} ({activeTheme.color2Hex})
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
                        <span>APPROVE THIS 2-COLOR MIX</span>
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
