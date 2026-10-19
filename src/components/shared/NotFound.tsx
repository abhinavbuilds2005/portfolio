import React from 'react';
import { Terminal, Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-lg border border-border-subtle bg-surface text-center font-mono space-y-4">
        <div className="inline-flex p-3 rounded-full bg-base border border-border-subtle text-accent">
          <Terminal className="w-6 h-6" />
        </div>

        <div className="text-3xl font-bold text-text-primary">
          404 // NOT_FOUND
        </div>

        <p className="text-xs text-text-secondary leading-relaxed">
          The requested system route does not exist in the active telemetry registry.
        </p>

        <div className="pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold bg-accent text-base hover:bg-accent-hover transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Console</span>
          </a>
        </div>
      </div>
    </div>
  );
};
