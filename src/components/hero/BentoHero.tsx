import React from 'react';
import { StatusHeadlineTile } from './StatusHeadlineTile';
import { LossCurveTile } from './LossCurveTile';
import { FlagshipTile } from './FlagshipTile';
import { PipelineTile } from './PipelineTile';
import { ResultsTile } from './ResultsTile';
import { NeuralNetTile } from './NeuralNetTile';
import { BuildLogNoteTile } from './BuildLogNoteTile';
import { Sparkles } from 'lucide-react';

interface BentoHeroProps {
  onOpenCaseStudy: (projectId: string) => void;
  onOpenPhysics: () => void;
}

export const BentoHero: React.FC<BentoHeroProps> = ({ onOpenCaseStudy, onOpenPhysics }) => {
  return (
    <section id="home" className="pt-6 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Section Metadata Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-[#2b2a27]/60 mb-6 font-mono text-[11px] text-[#78716c]">
        <div className="flex items-center gap-2">
          <span className="text-[#e58b24] font-semibold">[01]</span>
          <span className="uppercase tracking-wider">OVERVIEW // BENTO CONSOLE</span>
          <span>•</span>
          <span>LPU B.TECH (AI/ML)</span>
        </div>

        {/* Physics Free-Fall Simulator Trigger */}
        <button
          onClick={onOpenPhysics}
          className="flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-0.5 rounded border border-[#e58b24]/40 bg-[#e58b24]/10 text-[#e58b24] hover:bg-[#e58b24] hover:text-[#121212] transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>TRY PHYSICS LAB // FREE-FALL TENSORS</span>
        </button>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Row 1: Headline (7 cols) + Loss Curve (5 cols) */}
        <div className="md:col-span-7 flex">
          <div className="w-full flex">
            <StatusHeadlineTile />
          </div>
        </div>
        <div className="md:col-span-5 flex">
          <div className="w-full flex">
            <LossCurveTile />
          </div>
        </div>

        {/* Row 2: Flagship DocuShield AI (7 cols) + Pipeline Strip (5 cols) */}
        <div className="md:col-span-7 flex">
          <div className="w-full flex">
            <FlagshipTile onOpenCaseStudy={onOpenCaseStudy} />
          </div>
        </div>
        <div className="md:col-span-5 flex">
          <div className="w-full flex">
            <PipelineTile />
          </div>
        </div>

        {/* Row 3: Results Matrix (4 cols) + Neural Net Stack (4 cols) + Build Note (4 cols) */}
        <div className="md:col-span-4 flex">
          <div className="w-full flex">
            <ResultsTile />
          </div>
        </div>
        <div className="md:col-span-4 flex">
          <div className="w-full flex">
            <NeuralNetTile />
          </div>
        </div>
        <div className="md:col-span-4 flex">
          <div className="w-full flex">
            <BuildLogNoteTile />
          </div>
        </div>

      </div>
    </section>
  );
};
