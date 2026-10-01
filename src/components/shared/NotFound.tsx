import React from 'react';
import { Terminal, Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-lg border border-[#2b2a27] dark:border-[#2b2a27] light:border-[#e6dfd5] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] text-center font-mono space-y-4">
        <div className="inline-flex p-3 rounded-full bg-[#121212] border border-[#2b2a27] text-[#e58b24]">
          <Terminal className="w-6 h-6" />
        </div>

        <div className="text-3xl font-bold text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917]">
          404 // NOT_FOUND
        </div>

        <p className="text-xs text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed">
          The requested system route does not exist in the active telemetry registry.
        </p>

        <div className="pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold bg-[#e58b24] text-[#121212] hover:bg-[#d97706] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Console</span>
          </a>
        </div>
      </div>
    </div>
  );
};
