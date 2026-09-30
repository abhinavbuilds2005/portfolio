import { Project } from '../lib/types';

/**
 * SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO PROJECT DATA.
 * 
 * Edit this file to add or update projects. 
 * Feature importance bars, embedding maps, and case studies automatically derive from this file.
 */
export const PROJECTS: Project[] = [
  {
    id: "docushield",
    title: "DocuShield AI",
    category: "vision",
    categoryLabel: "Computer Vision & Forensics",
    status: "LIVE",
    tagline: "Multimodal forensic screening system for five ID document types.",
    outcome: "Eliminated manual inspection bottlenecks by unifying ELA tamper heatmaps, ICAO MRZ check digits, and facial biometric verification.",
    image: "/project_docushield.png",
    elaImage: "/project_docushield.jpg", // Sample heatmap comparison placeholder
    liveUrl: "https://docushield-ai-s1x9.onrender.com/",
    repoUrl: "https://github.com/abhinavbuilds2005/DocuShield",
    summary: "A multimodal forensic screening system for five ID document types (Passports, Visas, Indian Aadhaar, Driving Licences, and Travel Permits). It extracts OCR schemas, detects digital image tampering via Error Level Analysis (ELA) and copy-move forgery, parses ICAO Doc 9303 MRZ check digits and Verhoeff D5 checksums, and cross-matches live facial biometrics.",
    problem: "Digital document forgery leverages graphic manipulation (copy-move replication, font splicing, compression artifacts, and fraudulent checksums) that easily deceive conventional OCR systems and isolated classifiers.",
    solution: "Architected a hierarchical multimodal evidence fusion pipeline combining Error Level Analysis (ELA), ORB+RANSAC copy-move detection, typography Laplacian variance, ICAO Doc 9303 MRZ 7-3-1 check digit algorithms, Verhoeff D5 checksums, and facial biometric verification into an explainable 0–100% forensic risk score.",
    features: [
      "Multimodal Tampering Detection: Runs Error Level Analysis (ELA) for image compression anomalies, ORB + RANSAC copy-move detection, and typography Laplacian consistency checks.",
      "Algorithmic Validation & MRZ Parsing: Computes ICAO Doc 9303 TD1/TD2/TD3 check digits, Verhoeff checksums for Indian 12-digit Aadhaar, PAN structure validation, and chronological date logic.",
      "Biometric Face Verification & Fusion: Document facial extraction cross-matched against live selfies with HSV/gradient similarity, unified by a 5-level forensic risk engine."
    ],
    tech: ["Python", "OpenCV", "EasyOCR", "FastAPI", "Docker", "Verhoeff Checksum", "React"],
    metrics: [
      { label: "Document Classes", value: "5 Verified Types", isSample: false },
      { label: "Screening Latency", value: "[Add real metric]", isSample: true },
      { label: "Forgery Detection AUC", value: "0.94 (Sample data)", isSample: true },
      { label: "Checksum Coverage", value: "100% ICAO & Verhoeff", isSample: false }
    ],
    pipeline: [
      { label: "Document Ingestion", sub: "Multi-Format Input" },
      { label: "OCR & Tokenization", sub: "EasyOCR Tokenizer" },
      { label: "Forensic ELA", sub: "Tamper Heatmap" },
      { label: "MRZ / Verhoeff", sub: "Checksum Engines" },
      { label: "Evidence Fusion", sub: "Calibrated Risk Score" }
    ],
    embedding: { x: 22, y: 32 },
    rocCurve: {
      auc: "0.94 (Sample data)",
      isSample: true,
      points: [
        { fpr: 0.0, tpr: 0.0 },
        { fpr: 0.05, tpr: 0.65 },
        { fpr: 0.12, tpr: 0.84 },
        { fpr: 0.22, tpr: 0.92 },
        { fpr: 0.38, tpr: 0.96 },
        { fpr: 0.65, tpr: 0.98 },
        { fpr: 1.0, tpr: 1.0 }
      ]
    }
  },
  {
    id: "creditwise",
    title: "CreditWise",
    category: "predictive",
    categoryLabel: "Predictive ML & Explainability",
    status: "LIVE",
    tagline: "Predictive loan risk scoring system with real-time SHAP explainability.",
    outcome: "Addressed extreme class imbalance in loan default records with SMOTE resampling and transparent decision boundary explainability.",
    image: "/project_creditwise_1775755763976.png",
    liveUrl: "https://credishield-one.vercel.app/",
    repoUrl: "https://github.com/abhinavbuilds2005/credit-wise-loan-system",
    summary: "An end-to-end machine learning system engineered for loan default risk prediction. Built with custom financial feature engineering, risk scoring algorithms, and real-time inference, offering decision intelligence deployed via Streamlit.",
    problem: "Imbalanced training datasets where historical defaults represent a small fraction of total records, causing baseline classifiers to skew heavily toward low-risk approvals.",
    solution: "Applied SMOTE (Synthetic Minority Over-sampling Technique) during training and optimized decision thresholds against Precision-Recall AUC curves rather than misleading raw accuracy metrics.",
    features: [
      "Custom Financial Feature Pipeline: Modeled debt-to-income weights, installment ratios, and credit history tenure adjustments.",
      "Interpretable ML Classifier: Trained a regularized Logistic Regression pipeline scoring default probability with high statistical transparency.",
      "Real-Time Underwriting Console: Interactive Streamlit interface enabling variable parameter tuning and immediate credit risk estimation."
    ],
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "SMOTE", "Streamlit", "SHAP"],
    metrics: [
      { label: "Decision Engine", value: "LogReg + SMOTE", isSample: false },
      { label: "PR-AUC Score", value: "0.89 (Sample data)", isSample: true },
      { label: "Inference Speed", value: "[Add real metric]", isSample: true },
      { label: "Explainability", value: "Feature Importance Driven", isSample: false }
    ],
    pipeline: [
      { label: "Financial Data", sub: "Applicant Profile" },
      { label: "Feature Pipeline", sub: "Debt-to-Income Weights" },
      { label: "SMOTE Resampling", sub: "Class Imbalance Fix" },
      { label: "Logistic Classifier", sub: "Calibrated Odds" },
      { label: "Risk Scorecard", sub: "Streamlit UI" }
    ],
    embedding: { x: 74, y: 72 },
    rocCurve: {
      auc: "0.89 (Sample data)",
      isSample: true,
      points: [
        { fpr: 0.0, tpr: 0.0 },
        { fpr: 0.08, tpr: 0.58 },
        { fpr: 0.18, tpr: 0.78 },
        { fpr: 0.30, tpr: 0.88 },
        { fpr: 0.52, tpr: 0.94 },
        { fpr: 1.0, tpr: 1.0 }
      ]
    }
  },
  {
    id: "ats-resume-analyzer",
    title: "ATS Resume Analyzer",
    category: "nlp",
    categoryLabel: "NLP & Generative AI",
    status: "LIVE",
    tagline: "5-dimension resume parser & JD alignment engine with rolling chunk embeddings.",
    outcome: "Eliminated 512-token truncation on multi-page CVs using rolling chunk embeddings and built automatic deterministic fallbacks.",
    image: "/project_ats_resume.png",
    liveUrl: "https://ats-resume-analyzer-we86.onrender.com",
    repoUrl: "https://github.com/abhinavbuilds2005/ATS-RESUME-ANALYZER",
    summary: "A production ATS scoring and resume optimization platform. Built with FastAPI and spaCy for structural NLP parsing, Sentence Transformers for chunked semantic similarity against job descriptions, and Groq (Llama 3) for generative feedback with an automated deterministic fallback pipeline and Supabase JWT authentication.",
    problem: "Arbitrary multi-column PDF/DOCX layouts scramble standard text extraction, standard embeddings suffer 5,000-character truncation loss, and cloud LLM rate limits risk service disruptions.",
    solution: "Engineered a layout-aware document parser, implemented rolling chunk-based embeddings (all-MiniLM-L6-v2) to eliminate truncation, and built a fault-tolerant pipeline that automatically falls back to deterministic NLP extraction if external LLM APIs are unreachable.",
    features: [
      "5-Dimension Heuristic Scoring: Evaluates Formatting (20%), Keywords (25%), Impact (25%), Skill Validation (15%), and Parseability (15%).",
      "Rolling Chunk Semantic Matching: Uses Sentence Transformers to vectorize resume segments against job description requirements without truncation.",
      "Resilient AI Pipeline: Groq Llama 3 generative feedback with automatic deterministic fallback and Supabase JWT user isolation."
    ],
    tech: ["Python", "FastAPI", "spaCy", "Sentence Transformers", "Groq Llama 3", "Supabase"],
    metrics: [
      { label: "Scoring Dimensions", value: "5 Heuristic Tiers", isSample: false },
      { label: "Semantic Embedding", value: "all-MiniLM-L6-v2", isSample: false },
      { label: "Parsing Accuracy", value: "[Add real metric]", isSample: true },
      { label: "Fallback Latency", value: "< 250ms deterministic", isSample: true }
    ],
    pipeline: [
      { label: "Document Parse", sub: "Multi-Column PDF" },
      { label: "spaCy Extraction", sub: "Entities & Skills" },
      { label: "Chunk Vectors", sub: "MiniLM-L6-v2" },
      { label: "Cosine Match", sub: "JD Alignment Score" },
      { label: "Groq Generation", sub: "Actionable Feedback" }
    ],
    embedding: { x: 38, y: 78 },
    rocCurve: {
      auc: "0.91 (Sample data)",
      isSample: true,
      points: [
        { fpr: 0.0, tpr: 0.0 },
        { fpr: 0.06, tpr: 0.62 },
        { fpr: 0.15, tpr: 0.81 },
        { fpr: 0.28, tpr: 0.90 },
        { fpr: 0.50, tpr: 0.95 },
        { fpr: 1.0, tpr: 1.0 }
      ]
    }
  },
  {
    id: "smartcart",
    title: "SmartCart AI",
    category: "predictive",
    categoryLabel: "Unsupervised ML & Churn",
    status: "LIVE",
    tagline: "Customer segmentation & behavioral analytics platform via PCA & K-Means.",
    outcome: "Mitigated high-dimensional sparsity in transactional matrices using PCA dimensional reduction, increasing clustering stability.",
    image: "/project_customer_ai_1775755777519.png",
    liveUrl: "https://smartcart-recommendation-system.netlify.app/",
    repoUrl: "https://github.com/abhinavbuilds2005/Smartcart-Recommendation-system",
    summary: "An AI-powered customer segmentation and behavioral analytics platform. It leverages unsupervised clustering and dimensional reduction to discover organic purchasing patterns, generating personalized product recommendations and churn risk assessments.",
    problem: "High-dimensional sparse transaction arrays generated poorly-defined cluster centroids (curse of dimensionality), lowering clustering stability.",
    solution: "Integrated Principal Component Analysis (PCA) to project high-dimensional transaction features into dense lower-dimensional representations before clustering, increasing the silhouette coefficient.",
    features: [
      "Multi-Dimensional Clustering: Implements K-Means clustering with dynamically evaluated distance metrics.",
      "Persona Classification: Automatically categorizes consumer clusters into high-value, casual, and at-risk archetypes.",
      "Targeted Marketing Engine: Formulates targeted catalog recommendations and communication cadences per archetype."
    ],
    tech: ["Python", "Scikit-Learn", "PCA", "K-Means", "Streamlit", "Chart.js"],
    metrics: [
      { label: "Clustering Model", value: "K-Means + PCA", isSample: false },
      { label: "Silhouette Score", value: "0.68 (Sample data)", isSample: true },
      { label: "Cluster Segments", value: "4 Archetypes", isSample: false },
      { label: "Throughput", value: "[Add real metric]", isSample: true }
    ],
    pipeline: [
      { label: "Transaction Matrix", sub: "Sparse Purchase Log" },
      { label: "PCA Projection", sub: "Dimensional Reduction" },
      { label: "K-Means Clustering", sub: "Silhouette Optimized" },
      { label: "Churn Evaluation", sub: "Risk Assessment" },
      { label: "Catalog Engine", sub: "Segment Recommendations" }
    ],
    embedding: { x: 82, y: 55 }
  },
  {
    id: "presentai",
    title: "PresentAI",
    category: "vision",
    categoryLabel: "Biometric Vision & Audio",
    status: "LIVE",
    tagline: "Multimodal contact-free attendance platform integrating FaceNet & voice biometrics.",
    outcome: "Implemented dynamic confidence shifting between facial landmark vectors and acoustic speaker prints to prevent spoofing.",
    image: "/project_attendance_system.png",
    liveUrl: "https://presentai-attendance.onrender.com",
    repoUrl: "https://github.com/abhinavbuilds2005/AI-Powered-Attendance-Platform",
    summary: "A high-security biometric attendance verification system designed for institutional deployments. It authenticates identity by simultaneously analyzing real-time facial embeddings and deep acoustic speaker prints to eliminate proxy attendance.",
    problem: "Biometric validation accuracy drops substantially under adverse conditions such as poor ambient lighting (camera) or background acoustic interference (microphone).",
    solution: "Engineered a dynamic confidence-fusion model that shifts sensor weights—relying more heavily on acoustic voice biometrics in dim environments and prioritizing facial landmark vectors in noisy rooms.",
    features: [
      "Dual-Sensor Verification: Concurrent processing of live camera frames and audio microphone streams.",
      "Acoustic Voice Biometrics: Deep neural network extracting frequency embeddings to identify verified speaker profiles.",
      "Liveness & Anti-Spoofing: Micro-motion analysis paired with voice pitch variance checks to detect photo/audio replay attacks."
    ],
    tech: ["Python", "OpenCV", "FaceNet", "Voice Biometrics", "PostgreSQL", "FastAPI"],
    metrics: [
      { label: "Sensor Modalities", value: "Dual: Face + Voice", isSample: false },
      { label: "FAR / FRR Target", value: "< 0.1% (Sample data)", isSample: true },
      { label: "Vector Latency", value: "[Add real metric]", isSample: true },
      { label: "Database Layer", value: "PostgreSQL ACID", isSample: false }
    ],
    pipeline: [
      { label: "Dual Stream", sub: "Camera + Microphone" },
      { label: "Facial Landmark", sub: "FaceNet 128D Vector" },
      { label: "Voice Frequency", sub: "Speaker Embeddings" },
      { label: "Dynamic Fusion", sub: "Context Sensor Weights" },
      { label: "Ledger Commit", sub: "PostgreSQL Database" }
    ],
    embedding: { x: 30, y: 22 }
  },
  {
    id: "portfolio-v2",
    title: "AI Systems Engineering Hub",
    category: "fullstack",
    categoryLabel: "Full-Stack AI Product",
    status: "LIVE",
    tagline: "Ink & Saffron portfolio with dynamic ML animations, serverless comms, and bento layout.",
    outcome: "Built with zero framework bloat, sub-600ms purposeful animations, and 100% build-time data generation.",
    image: "/project_portfolio_1775755792684.png",
    liveUrl: "https://coderabhinavanand.netlify.app/",
    repoUrl: "https://github.com/abhinavbuilds2005/portfolio",
    summary: "The upgraded engineering console you are exploring. Crafted with an Ink & Saffron design system, interactive loss curves, 2D project embeddings, dynamic feature importance bars, and Netlify serverless functions.",
    problem: "Standard student portfolios use generic neon cards, fake metric dials, and slow animations that don't reflect engineering rigor.",
    solution: "Engineered with strict WCAG AA contrast, warm charcoal and saffron palette, real calculated tech usage frequencies, and sub-second performance.",
    features: [
      "Single Data Contract: All project metrics, tech stacks, and embeddings derive from a unified TypeScript model.",
      "Feature Importance Analytics: Dynamic bar charts reflecting actual repository toolchain occurrences.",
      "ML-Themed Purposeful Interactions: Loss curves, 4-stage pipeline drawer, and 2D embedding scatter transitions."
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "Netlify Functions"],
    metrics: [
      { label: "Lighthouse Target", value: "95+ All Categories", isSample: false },
      { label: "Animation Budget", value: "< 600ms Strict", isSample: false },
      { label: "Data Architecture", value: "100% Single File", isSample: false }
    ],
    pipeline: [
      { label: "Static Model", sub: "Strict TypeScript" },
      { label: "Prebuild Hook", sub: "GitHub Cache Sync" },
      { label: "React Runtime", sub: "Framer Motion" },
      { label: "Serverless Layer", sub: "Netlify Functions" },
      { label: "Global Edge", sub: "Netlify CDN" }
    ],
    embedding: { x: 62, y: 25 }
  }
];

export const PIPELINE_STAGES = [
  {
    id: "data",
    step: "01",
    title: "Data Ingestion & Hygiene",
    summary: "Multimodal ingestion across raw document scans, unstructured CV text, and transactional arrays.",
    tools: ["Pandas", "NumPy", "OpenCV", "EasyOCR", "FastAPI"],
    projectExample: {
      projectName: "DocuShield AI & PresentAI",
      detail: "Normalizing multi-column PDF layouts, extracting ICAO MRZ zones, and streaming synchronized audio frames."
    }
  },
  {
    id: "train",
    step: "02",
    title: "Feature Engineering & Sampling",
    summary: "Handling extreme class imbalance, extracting text embeddings, and mathematical checksum validation.",
    tools: ["SMOTE", "Sentence Transformers", "Verhoeff D5 Checksum", "spaCy", "PCA"],
    projectExample: {
      projectName: "CreditWise & ATS Resume Analyzer",
      detail: "Mitigating loan default minority imbalance via SMOTE and rolling chunk embeddings without 512-token truncation."
    }
  },
  {
    id: "eval",
    step: "03",
    title: "Model Evaluation & Calibration",
    summary: "Auditing models against PR-AUC curves, SHAP explainability, and multi-sensor confidence thresholds.",
    tools: ["Scikit-Learn", "SHAP", "Precision-Recall AUC", "FaceNet", "PyTorch"],
    projectExample: {
      projectName: "DocuShield AI & PresentAI",
      detail: "5-level hierarchical multimodal evidence fusion engine combining ELA heatmaps, copy-move detection, and facial biometrics."
    }
  },
  {
    id: "deploy",
    step: "04",
    title: "Deployment & Fallback Systems",
    summary: "Containerized edge delivery, deterministic LLM fallback pipelines, and serverless architectures.",
    tools: ["Docker", "FastAPI", "Netlify Functions", "Streamlit", "Supabase"],
    projectExample: {
      projectName: "ATS Resume Analyzer & DocuShield",
      detail: "Automatic fallback to deterministic regex/NLP parsing whenever external generative LLM APIs exceed latency bounds."
    }
  }
];
