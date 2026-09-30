import { BuildLogEntry } from '../lib/types';

export const BUILD_LOGS: BuildLogEntry[] = [
  {
    id: "log-01",
    slug: "multimodal-evidence-fusion-forensics",
    date: "SEPTEMBER 2026",
    title: "Multimodal Evidence Fusion in Document Forensics",
    excerpt: "Why single-modality checks fail against modern forgery, and how fusing ELA compression heatmaps, copy-move geometry, and ICAO checksums creates resilient defenses.",
    tags: ["DocuShield AI", "OpenCV", "Forensics", "SIH 2026"],
    readTime: "4 min",
    content: `In document forensics, trusting any single classification model is dangerous. An attacker can match typography fonts while altering pixel textures, or forge an ID number while passing simple visual inspections.

In **DocuShield AI**, we structured our verification into 5 complementary defensive layers:
1. **Error Level Analysis (ELA):** Resaving images at 90% JPEG quality to highlight distinct compression artifact disparities.
2. **Copy-Move Forgery Detection:** ORB keypoints filtered via RANSAC geometric homography to locate duplicate regions.
3. **Typography & Font Geometry:** Laplacian edge-variance calculations to spot spliced characters.
4. **Algorithmic Checksums:** Deterministic verification including ICAO Doc 9303 7-3-1 weight algorithms and Indian 12-digit Aadhaar Verhoeff D5 dihedral permutations.
5. **Biometric Face Verification:** Document face extraction cross-matched against live frames using cosine distance.

When these 5 signals are fused into a weighted probabilistic risk engine, isolated false positives drop sharply while zero-day manipulation is caught before human review.`
  },
  {
    id: "log-02",
    slug: "class-imbalance-pr-auc",
    date: "AUGUST 2026",
    title: "Navigating Extreme Class Imbalance with PR-AUC",
    excerpt: "When modeling loan defaults, defaults represent < 5% of records. Why raw accuracy is a vanity metric and how Precision-Recall AUC protects underwriting.",
    tags: ["CreditWise", "SMOTE", "Scikit-Learn", "Evaluation"],
    readTime: "3 min",
    content: `If 96 out of 100 historical loan applicants repay their debt on time, a naive classifier predicting "repaid" every single time achieves a deceptive 96% accuracy—while failing on 100% of catastrophic default cases.

In **CreditWise**, we decoupled training distribution from inference evaluation:
- Applied **SMOTE (Synthetic Minority Over-sampling Technique)** exclusively on the training fold after strict cross-validation splits to avoid data leakage.
- Tuned decision boundaries along the **Precision-Recall AUC (PR-AUC)** frontier rather than standard ROC-AUC, since PR curves focus squarely on minority positive detection performance.
- Embedded SHAP values directly into the UI so applicants understand which financial features drove their risk rating.`
  },
  {
    id: "log-03",
    slug: "rolling-chunk-embeddings",
    date: "JUNE 2026",
    title: "Chunked Semantic Embeddings Without Truncation",
    excerpt: "Standard transformer encoders truncate input beyond 512 tokens. How rolling semantic chunks and deterministic fallbacks ensure robust document scoring.",
    tags: ["ATS Resume", "Sentence Transformers", "spaCy", "NLP"],
    readTime: "4 min",
    content: `Standard sentence transformer models (such as \`all-MiniLM-L6-v2\`) enforce a hard 512-token limit (~3,500 characters). When processing a thorough two-page resume or a comprehensive job description, standard truncation slices off half the candidate's career.

In **ATS Resume Analyzer**, we resolved this by:
1. Segmenting document text into semantic paragraphs and section headers using **spaCy**.
2. Computing rolling embeddings across sliding windows with a 20% overlap to preserve cross-sentence context.
3. Calculating max-pooled cosine similarities against individual JD qualification requirements.
4. Implementing a deterministic NLP fallback that kicks in within 200ms if external LLM generation endpoints fail or throttle.`
  }
];
