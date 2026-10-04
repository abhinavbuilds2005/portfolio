import React from 'react';
import { Cpu } from 'lucide-react';

export const DocuShieldArchitectureDiagram: React.FC = () => {
  return (
    <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#6366F1] font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>DOCUSHIELD AI // MULTIMODAL FORENSIC ARCHITECTURE</span>
        </div>
        <span className="font-mono text-[10px] text-[#667085]">
          5-Stage Evidence Fusion Pipeline
        </span>
      </div>

      {/* SVG Pipeline Graph */}
      <div className="w-full overflow-x-auto pb-2">
        <div className="min-w-[640px]">
          <svg viewBox="0 0 760 220" className="w-full h-auto text-xs font-mono" fill="none">
            {/* Background Grid Pattern */}
            <defs>
              <pattern id="diag-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeOpacity="0.4" />
              </pattern>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#667085" />
              </marker>
              <marker id="arrow-indigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#6366F1" />
              </marker>
            </defs>

            <rect width="760" height="220" fill="#08090B" rx="8" />
            <rect width="760" height="220" fill="url(#diag-grid)" rx="8" />

            {/* Connecting lines */}
            {/* Step 1 to Step 2 */}
            <path id="path-1-2" d="M 125 110 L 165 110" stroke="#667085" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <circle r="2.5" fill="#6366F1">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 125 110 L 165 110" />
            </circle>

            {/* Step 2 split into 3 forensic paths */}
            <path id="path-2-ela" d="M 275 110 C 300 110, 300 50, 325 50" stroke="#667085" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <circle r="2.5" fill="#22D3EE">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M 275 110 C 300 110, 300 50, 325 50" />
            </circle>

            <path id="path-2-chk" d="M 275 110 L 325 110" stroke="#667085" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <circle r="2.5" fill="#6366F1">
              <animateMotion dur="2.1s" repeatCount="indefinite" path="M 275 110 L 325 110" />
            </circle>

            <path id="path-2-bio" d="M 275 110 C 300 110, 300 170, 325 170" stroke="#667085" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <circle r="2.5" fill="#34D399">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 275 110 C 300 110, 300 170, 325 170" />
            </circle>

            {/* 3 Forensic paths merging into Evidence Fusion */}
            <path id="path-ela-fuse" d="M 475 50 C 510 50, 510 110, 545 110" stroke="#6366F1" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />
            <circle r="2.5" fill="#22D3EE">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M 475 50 C 510 50, 510 110, 545 110" />
            </circle>

            <path id="path-chk-fuse" d="M 475 110 L 545 110" stroke="#6366F1" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />
            <circle r="2.5" fill="#6366F1">
              <animateMotion dur="2.0s" repeatCount="indefinite" path="M 475 110 L 545 110" />
            </circle>

            <path id="path-bio-fuse" d="M 475 170 C 510 170, 510 110, 545 110" stroke="#6366F1" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />
            <circle r="2.5" fill="#34D399">
              <animateMotion dur="2.6s" repeatCount="indefinite" path="M 475 170 C 510 170, 510 110, 545 110" />
            </circle>

            {/* Step 4 to Output Step 5 */}
            <path id="path-fuse-out" d="M 645 110 L 675 110" stroke="#6366F1" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />
            <circle r="3" fill="#6366F1">
              <animateMotion dur="1.4s" repeatCount="indefinite" path="M 645 110 L 675 110" />
            </circle>

            {/* NODE 1: Document Ingest */}
            <g transform="translate(15, 75)">
              <rect width="110" height="70" rx="6" fill="#11151A" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="10" y="22" fill="#818CF8" fontSize="10" fontWeight="bold">01 // INGEST</text>
              <text x="10" y="38" fill="#F5F7FA" fontSize="10">Multi-Format</text>
              <text x="10" y="52" fill="#9AA4B2" fontSize="9">Passport / Aadhaar</text>
              <text x="10" y="63" fill="#667085" fontSize="8">Visa / DL / Permits</text>
            </g>

            {/* NODE 2: OCR & Layout */}
            <g transform="translate(165, 75)">
              <rect width="110" height="70" rx="6" fill="#11151A" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="10" y="22" fill="#818CF8" fontSize="10" fontWeight="bold">02 // OCR ENGINE</text>
              <text x="10" y="38" fill="#F5F7FA" fontSize="10">EasyOCR & Layout</text>
              <text x="10" y="52" fill="#9AA4B2" fontSize="9">Bounding Boxes</text>
              <text x="10" y="63" fill="#667085" fontSize="8">Spatial Tokenizer</text>
            </g>

            {/* NODE 3A: ELA & Copy-Move */}
            <g transform="translate(325, 20)">
              <rect width="150" height="58" rx="6" fill="#11151A" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="10" y="18" fill="#22D3EE" fontSize="9" fontWeight="bold">03A // PIXEL FORENSICS</text>
              <text x="10" y="33" fill="#F5F7FA" fontSize="10">Error Level Analysis (ELA)</text>
              <text x="10" y="47" fill="#667085" fontSize="8">ORB+RANSAC Copy-Move</text>
            </g>

            {/* NODE 3B: Checksum Algorithms */}
            <g transform="translate(325, 82)">
              <rect width="150" height="58" rx="6" fill="#11151A" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="10" y="18" fill="#818CF8" fontSize="9" fontWeight="bold">03B // CRYPTO CHECKSUM</text>
              <text x="10" y="33" fill="#F5F7FA" fontSize="10">ICAO MRZ 7-3-1 Weight</text>
              <text x="10" y="47" fill="#667085" fontSize="8">Verhoeff D5 Permutation</text>
            </g>

            {/* NODE 3C: Face Biometrics */}
            <g transform="translate(325, 144)">
              <rect width="150" height="58" rx="6" fill="#11151A" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="10" y="18" fill="#34D399" fontSize="9" fontWeight="bold">03C // FACE BIOMETRICS</text>
              <text x="10" y="33" fill="#F5F7FA" fontSize="10">128D Vector Extract</text>
              <text x="10" y="47" fill="#667085" fontSize="8">Cosine Selfie Match</text>
            </g>

            {/* NODE 4: Evidence Fusion */}
            <g transform="translate(545, 75)">
              <rect width="100" height="70" rx="6" fill="#11151A" stroke="#6366F1" strokeWidth="1.5" />
              <text x="10" y="22" fill="#818CF8" fontSize="10" fontWeight="bold">04 // FUSION</text>
              <text x="10" y="38" fill="#F5F7FA" fontSize="10">5-Tier Engine</text>
              <text x="10" y="52" fill="#9AA4B2" fontSize="9">Calibrated Risk</text>
              <text x="10" y="63" fill="#667085" fontSize="8">Weight Shifting</text>
            </g>

            {/* NODE 5: Final Output */}
            <g transform="translate(675, 75)">
              <rect width="70" height="70" rx="6" fill="#11151A" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x="8" y="22" fill="#34D399" fontSize="9" fontWeight="bold">05 // OUT</text>
              <text x="8" y="40" fill="#F5F7FA" fontSize="10">0–100%</text>
              <text x="8" y="54" fill="#9AA4B2" fontSize="8">Risk Score</text>
              <text x="8" y="65" fill="#667085" fontSize="8">& Audit Log</text>
            </g>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-[#667085]">
        <div>
          <span className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-semibold block mb-0.5">Dual-Path Separation:</span>
          <span>Decouples fast deterministic checksums from slower GPU pixel forensics.</span>
        </div>
        <div>
          <span className="text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] font-semibold block mb-0.5">Explainability:</span>
          <span>Every flag outputs human-readable audit reasons rather than a single black-box score.</span>
        </div>
        <div>
          <span className="text-[#818CF8] font-semibold block mb-0.5">Verification:</span>
          <span>100% verified across 5 document types with zero external commercial API dependencies.</span>
        </div>
      </div>
    </div>
  );
};
