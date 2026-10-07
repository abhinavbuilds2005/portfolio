import React from 'react';
import { Cpu } from 'lucide-react';

export const DocuShieldArchitectureDiagram: React.FC = () => {
  return (
    <div className="p-5 rounded-lg border border-border-subtle bg-base shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-accent font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>DOCUSHIELD AI // MULTIMODAL FORENSIC PIPELINE ARCHITECTURE</span>
        </div>
        <span className="font-mono text-xs text-text-muted">
          5-Stage Evidence Fusion Flow
        </span>
      </div>

      {/* SVG Pipeline Graph */}
      <div className="w-full overflow-x-auto pb-2">
        <div className="min-w-[640px]">
          <svg viewBox="0 0 760 220" className="w-full h-auto text-xs font-mono" fill="none">
            {/* Background Grid Pattern */}
            <defs>
              <pattern id="diag-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" strokeOpacity="0.4" />
              </pattern>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--text-muted)" />
              </marker>
              <marker id="arrow-saffron" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent)" />
              </marker>
            </defs>

            <rect width="760" height="220" fill="var(--bg-surface)" rx="6" />
            <rect width="760" height="220" fill="url(#diag-grid)" rx="6" />

            {/* Connecting lines */}
            <path d="M 125 110 L 165 110" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M 275 110 C 300 110, 300 50, 325 50" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M 275 110 L 325 110" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M 275 110 C 300 110, 300 170, 325 170" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />

            <path d="M 475 50 C 510 50, 510 110, 545 110" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-saffron)" />
            <path d="M 475 110 L 545 110" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-saffron)" />
            <path d="M 475 170 C 510 170, 510 110, 545 110" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-saffron)" />
            <path d="M 645 110 L 675 110" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-saffron)" />

            {/* NODE 1: Document Ingest */}
            <g transform="translate(15, 75)">
              <rect width="110" height="70" rx="4" fill="var(--bg-elevated)" stroke="var(--border-strong)" strokeWidth="1" />
              <text x="10" y="22" fill="var(--accent)" fontSize="10" fontWeight="bold">01 // INGEST</text>
              <text x="10" y="38" fill="var(--text-primary)" fontSize="10">Multi-Format</text>
              <text x="10" y="52" fill="var(--text-muted)" fontSize="9">Passport / Aadhaar</text>
              <text x="10" y="63" fill="var(--text-muted)" fontSize="9">Visa / DL / Permits</text>
            </g>

            {/* NODE 2: Preprocess & OCR */}
            <g transform="translate(165, 75)">
              <rect width="110" height="70" rx="4" fill="var(--bg-elevated)" stroke="var(--border-strong)" strokeWidth="1" />
              <text x="10" y="22" fill="var(--accent)" fontSize="10" fontWeight="bold">02 // PREPROCESS</text>
              <text x="10" y="38" fill="var(--text-primary)" fontSize="10">EasyOCR Tokens</text>
              <text x="10" y="52" fill="var(--text-muted)" fontSize="9">Perspective Warp</text>
              <text x="10" y="63" fill="var(--text-muted)" fontSize="9">Layout Bounding Box</text>
            </g>

            {/* SUB-NODE 3A: ELA & Copy-Move */}
            <g transform="translate(325, 15)">
              <rect width="150" height="68" rx="4" fill="var(--bg-elevated)" stroke="var(--border-strong)" strokeWidth="1" />
              <text x="10" y="20" fill="var(--accent)" fontSize="10" fontWeight="bold">03A // PIXEL FORENSICS</text>
              <text x="10" y="36" fill="var(--text-primary)" fontSize="10">Error Level Analysis</text>
              <text x="10" y="50" fill="var(--text-muted)" fontSize="9">ORB Copy-Move Homography</text>
              <text x="10" y="62" fill="var(--text-muted)" fontSize="9">Laplacian Font Variance</text>
            </g>

            {/* SUB-NODE 3B: Mathematical Checksums */}
            <g transform="translate(325, 75)">
              <rect width="150" height="70" rx="4" fill="var(--bg-elevated)" stroke="var(--border-strong)" strokeWidth="1" />
              <text x="10" y="20" fill="var(--accent)" fontSize="10" fontWeight="bold">03B // CHECKSUMS (D5)</text>
              <text x="10" y="36" fill="var(--text-primary)" fontSize="10">ICAO Doc 9303 (7-3-1)</text>
              <text x="10" y="50" fill="var(--text-muted)" fontSize="9">Verhoeff Dihedral Group</text>
              <text x="10" y="62" fill="var(--text-muted)" fontSize="9">PAN Structure & Chronology</text>
            </g>

            {/* SUB-NODE 3C: Face Biometrics */}
            <g transform="translate(325, 140)">
              <rect width="150" height="65" rx="4" fill="var(--bg-elevated)" stroke="var(--border-strong)" strokeWidth="1" />
              <text x="10" y="20" fill="var(--accent)" fontSize="10" fontWeight="bold">03C // BIOMETRICS</text>
              <text x="10" y="36" fill="var(--text-primary)" fontSize="10">FaceNet 128D Vector</text>
              <text x="10" y="50" fill="var(--text-muted)" fontSize="9">Live Selfie Cross-Match</text>
            </g>

            {/* NODE 4: Evidence Fusion */}
            <g transform="translate(545, 75)">
              <rect width="100" height="70" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.5" />
              <text x="10" y="22" fill="var(--accent)" fontSize="10" fontWeight="bold">04 // FUSION</text>
              <text x="10" y="38" fill="var(--text-primary)" fontSize="10">Hierarchical</text>
              <text x="10" y="52" fill="var(--text-muted)" fontSize="9">5-Level Engine</text>
              <text x="10" y="63" fill="var(--text-muted)" fontSize="9">Risk Scoring</text>
            </g>

            {/* NODE 5: Final Calibrated Risk Decision */}
            <g transform="translate(675, 80)">
              <rect width="70" height="60" rx="4" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1" />
              <text x="8" y="22" fill="var(--bg-base)" fontSize="9" fontWeight="bold">DECISION</text>
              <text x="8" y="36" fill="var(--bg-base)" fontSize="10" fontWeight="bold">0–100%</text>
              <text x="8" y="50" fill="var(--bg-base)" fontSize="9">Calibrated</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
