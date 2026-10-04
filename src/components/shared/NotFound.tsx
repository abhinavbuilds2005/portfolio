import React from 'react';
import { Terminal, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-2xl border border-white/[0.08] dark:border-white/[0.08] border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] bg-white text-center space-y-4 shadow-xl">
        <div className="inline-flex p-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <Terminal className="w-6 h-6" />
        </div>

        <div className="text-3xl font-bold font-sans text-primary-text tracking-tight">
          404 · Page Not Found
        </div>

        <p className="text-sm text-secondary-text leading-relaxed">
          The requested route does not exist or has been relocated.
        </p>

        <div className="pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </a>
        </div>
      </div>
    </div>
  );
};

