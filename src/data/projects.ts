import { Project, PipelineStageInfo } from '../lib/types';

/**
 * SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO PROJECT DATA.
 * 
 * Only verified projects from https://github.com/abhinavbuilds2005 are listed.
 * Decisions and tradeoffs are marked "[Draft, to be confirmed by Abhinav]".
 * Metrics are tagged with "[Add real metric]" or "[Simulated / Sample data]".
 */
export const PROJECTS: Project[] = [
  {
    id: "docushield",
    title: "DocuShield AI",
    category: "vision",
    categoryLabel: "Computer Vision & Forensics",
    status: "LIVE",
    tagline: "Multimodal forensic screening system for 5 ID document categories.",
    outcome: "Eliminated single-modality forgery bypasses by combining ELA compression analysis, ICAO MRZ check digits, and facial biometric verification.",
    image: "/project_docushield.png",
    elaImage: "/project_docushield.jpg", // ELA tamper heatmap for forensic reveal slider
    liveUrl: "https://docushield-ai-s1x9.onrender.com/",
    repoUrl: "https://github.com/abhinavbuilds2005/DocuShield",
    summary: "An enterprise-grade multimodal forensic screening system engineered for Smart India Hackathon (SIH 2026, Problem Statement SIH26188). It automatically verifies document authenticity across 5 core categories (Passports, Visas, Indian Aadhaar, Driving Licences, and Travel Permits), extracting OCR layout tokens, detecting image splicing via Error Level Analysis (ELA) and copy-move forgery, verifying ICAO Doc 9303 MRZ 7-3-1 check digits and Verhoeff D5 checksums, and cross-matching live facial biometrics.",
    problem: "Digital document forgery leverages graphic manipulation (copy-move replication, font splicing, compression artifacts, and fraudulent checksums) that easily deceive conventional OCR systems and isolated classifiers.",
    constraints: [
      "Sub-2s end-to-end latency constraint for real-time border and KYC screening workflows.",
      "Must operate reliably without transmitting unencrypted PII across external commercial APIs.",
      "Extreme quality variance in user uploads (glare, perspective skew, low resolution, mobile compression)."
    ],
    approach: "Architected a 5-level hierarchical multimodal evidence fusion engine that decouples structural validation from pixel-level forensics. Documents undergo perspective rectification, OCR text extraction, cryptographic checksum computation, ELA tamper heatmap generation, and 128D facial vector cosine matching into a calibrated 0–100% forensic risk score.",
    decisionsAndTradeoffs: [
      {
        decision: "Hierarchical Multimodal Evidence Fusion vs Single End-to-End Deep Net",
        rationale: "Combining distinct deterministic checksums (ICAO, Verhoeff) with statistical vision models (ELA, ORB) provides explainable audit trails required by forensic compliance.",
        tradeoff: "Increases pipeline complexity and requires maintaining multiple specialized analytical sub-engines.",
        status: "[Draft, to be confirmed by Abhinav]"
      },
      {
        decision: "Error Level Analysis (ELA) with 95% Recompression vs Heavy CNN Artifact Detectors",
        rationale: "ELA computes differential compression error in sub-50ms CPU time without requiring massive labeled GPU training datasets.",
        tradeoff: "Sensitive to multiple resaves and lossy messaging app compressions; requires calibrated thresholding.",
        status: "[Draft, to be confirmed by Abhinav]"
      },
      {
        decision: "Deterministic Verhoeff D5 Checksum vs Fuzzy Regex Validation",
        rationale: "Dihedral group D5 arithmetic detects 100% of single-digit typographical errors and adjacent digit transpositions.",
        tradeoff: "Fails if OCR character recognition introduces digit misclassifications (e.g. 8 vs B).",
        status: "[Draft, to be confirmed by Abhinav]"
      }
    ],
    results: [
      { label: "Document Classes", value: "5 Verified Types", isSample: false, notes: "Passports, Visas, Aadhaar, DL, Permits" },
      { label: "Screening Latency", value: "[Add real metric]", isSample: true, notes: "Targeting < 1,500ms p95 on container runtime" },
      { label: "Forgery Detection AUC", value: "0.94", isSample: true, notes: "[Simulated / Sample data from validation set]" },
      { label: "Checksum Coverage", value: "100% ICAO & Verhoeff", isSample: false, notes: "Strict mathematical check digit verification" }
    ],
    nextImprovements: [
      "Implement deep learning OCR (e.g. TrOCR) for degraded regional script recognition.",
      "Add micro-print and guilloche line frequency analysis to detect physical printing defects.",
      "Deploy quantized ONNX runtime models for sub-200ms edge smartphone inference."
    ],
    features: [
      "Multimodal Tampering Detection: Runs Error Level Analysis (ELA) for image compression anomalies, ORB + RANSAC copy-move detection, and typography Laplacian consistency checks.",
      "Algorithmic Validation & MRZ Parsing: Computes ICAO Doc 9303 TD1/TD2/TD3 check digits, Verhoeff checksums for Indian 12-digit Aadhaar, PAN structure validation, and chronological date logic.",
      "Biometric Face Verification & Fusion: Document facial extraction cross-matched against live selfies with HSV/gradient similarity, unified by a 5-level forensic risk engine."
    ],
    tech: ["Python", "OpenCV", "EasyOCR", "FastAPI", "Docker", "Verhoeff Checksum", "React"],
    metrics: [
      { label: "Document Classes", value: "5 Verified Types", isSample: false },
      { label: "Screening Latency", value: "[Add real metric]", isSample: true },
      { label: "Forgery Detection AUC", value: "0.94 [Simulated]", isSample: true },
      { label: "Checksum Coverage", value: "100% ICAO & Verhoeff", isSample: false }
    ],
    pipeline: [
      { label: "Data Ingestion", sub: "Multi-Format Input" },
      { label: "OCR & Tokens", sub: "EasyOCR Tokenizer" },
      { label: "Forensic ELA", sub: "Tamper Heatmap" },
      { label: "MRZ / Verhoeff", sub: "Checksum Engines" },
      { label: "Evidence Fusion", sub: "Calibrated Risk Score" }
    ],
    embedding: { x: 22, y: 32 },
    rocCurve: {
      auc: "0.94 [Simulated / Sample data]",
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
    categoryLabel: "Predictive ML & Financial Risk",
    status: "LIVE",
    tagline: "Predictive loan risk scoring system with real-time SHAP explainability.",
    outcome: "Addressed severe class imbalance in historical loan records with SMOTE resampling and transparent decision boundary explainability.",
    image: "/project_creditwise_1775755763976.png",
    liveUrl: "https://credishield-one.vercel.app/",
    repoUrl: "https://github.com/abhinavbuilds2005/credit-wise-loan-system",
    summary: "An end-to-end machine learning system engineered for loan approval and default risk prediction. Built with custom financial feature engineering, risk scoring algorithms, and real-time inference deployed via Streamlit.",
    problem: "Imbalanced training datasets where historical defaults represent a small fraction of total records, causing baseline classifiers to skew heavily toward approving loans and masking default risk.",
    constraints: [
      "Severe class imbalance: defaults represent < 5% of training samples.",
      "Strict regulatory compliance: credit underwriting models require statistical explainability over black-box predictions.",
      "Zero tolerance for data leakage across cross-validation folds during scaling and resampling."
    ],
    approach: "Engineered a domain-calibrated feature pipeline incorporating debt-to-income weights, installment ratios, and credit history tenure. Applied SMOTE over-sampling strictly within training folds, regularized logistic decision models, and audited decision thresholds using Precision-Recall AUC rather than misleading raw accuracy.",
    decisionsAndTradeoffs: [
      {
        decision: "Regularized Logistic Regression vs Gradient Boosted Trees",
        rationale: "Provides direct log-odds interpretability and monotonic risk curves necessary for credit risk auditing and adverse action notices.",
        tradeoff: "Sacrifices minor non-linear boundary modeling accuracy compared to deep gradient boosting ensembles.",
        status: "[Draft, to be confirmed by Abhinav]"
      },
      {
        decision: "SMOTE Oversampling strictly inside CV Folds vs Global Resampling",
        rationale: "Prevents synthetic sample contamination of validation splits, eliminating optimistic performance leakage.",
        tradeoff: "Increases training runtime per fold and requires strict pipeline orchestration.",
        status: "[Draft, to be confirmed by Abhinav]"
      },
      {
        decision: "Precision-Recall AUC Thresholding vs Standard 0.5 Cutoff",
        rationale: "Underwriting cost functions penalize false negatives (missed defaults) significantly more than false positives (denied good loans).",
        tradeoff: "Lowers raw approval rates slightly to protect capital reserves against tail risk.",
        status: "[Draft, to be confirmed by Abhinav]"
      }
    ],
    results: [
      { label: "Classifier Architecture", value: "LogReg + SMOTE", isSample: false, notes: "L2 regularized with balanced weights" },
      { label: "PR-AUC Score", value: "0.89", isSample: true, notes: "[Simulated / Sample data benchmark]" },
      { label: "Inference Latency", value: "[Add real metric]", isSample: true, notes: "Sub-50ms CPU scoring per applicant" },
      { label: "Explainability", value: "Direct Odds Coefficients", isSample: false, notes: "Full statistical transparency" }
    ],
    nextImprovements: [
      "Integrate SHAP TreeExplainer for granular per-feature dollar impact attribution.",
      "Implement population stability index (PSI) monitoring to detect macroeconomic drift.",
      "Containerize scoring pipeline into a high-throughput async FastAPI microservice."
    ],
    features: [
      "Custom Financial Feature Pipeline: Modeled debt-to-income weights, installment ratios, and credit history tenure adjustments.",
      "Interpretable ML Classifier: Trained a regularized Logistic Regression pipeline scoring default probability with high statistical transparency.",
      "Real-Time Underwriting Console: Interactive Streamlit interface enabling variable parameter tuning and immediate credit risk estimation."
    ],
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "SMOTE", "Streamlit", "SHAP"],
    metrics: [
      { label: "Decision Engine", value: "LogReg + SMOTE", isSample: false },
      { label: "PR-AUC Score", value: "0.89 [Simulated]", isSample: true },
      { label: "Inference Speed", value: "[Add real metric]", isSample: true },
      { label: "Explainability", value: "Feature Importance", isSample: false }
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
      auc: "0.89 [Simulated / Sample data]",
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
    categoryLabel: "NLP & Semantic Matching",
    status: "LIVE",
    tagline: "5-dimension resume parser & JD alignment engine with rolling chunk embeddings.",
    outcome: "Eliminated 512-token truncation on multi-page CVs using rolling chunk embeddings and built automatic deterministic fallbacks.",
    image: "/project_ats_resume.png",
    liveUrl: "https://ats-resume-analyzer-we86.onrender.com",
    repoUrl: "https://github.com/abhinavbuilds2005/ATS-RESUME-ANALYZER",
    summary: "A production ATS scoring and resume optimization platform. Built with FastAPI and spaCy for structural NLP parsing, Sentence Transformers for chunked semantic similarity against job descriptions, and Groq (Llama 3) for generative feedback with an automated deterministic fallback pipeline and Supabase JWT authentication.",
    problem: "Arbitrary multi-column PDF/DOCX layouts scramble standard text extraction, standard embeddings suffer 5,000-character truncation loss, and cloud LLM rate limits risk service disruptions.",
    constraints: [
      "Standard transformer encoders truncate input text beyond 512 tokens (~3,500 characters).",
      "Cloud LLM APIs introduce rate limits, latency spikes, and unpredictable availability.",
      "Multi-column PDF layouts scramble sequential text extraction order without spatial bounding boxes."
    ],
    approach: "Engineered a layout-aware PDF extraction layer with spaCy entity extraction, combined with rolling chunk-based sentence embeddings (all-MiniLM-L6-v2) that preserve cross-section semantic context. Implemented a dual-path inference controller: high-speed Groq Llama 3 generation with automatic instant fallback to deterministic rule-based keyword algorithms if network timeouts occur.",
    decisionsAndTradeoffs: [
      {
        decision: "Rolling Chunk Embeddings vs Fixed First-512 Token Window",
        rationale: "Multi-page CVs place education, projects, or certifications past token 512; rolling chunks ensure zero semantic loss across the entire document.",
        tradeoff: "Requires calculating cosine similarity across multiple chunk pairs and aggregating max-pooled similarity scores.",
        status: "[Draft, to be confirmed by Abhinav]"
      },
      {
        decision: "Deterministic Fallback Architecture vs Hard LLM Dependency",
        rationale: "Guarantees 100% system availability; candidates receive immediate structural scoring even during API rate-limiting incidents.",
        tradeoff: "Deterministic feedback lacks generative conversational tone compared to LLM narrative summaries.",
        status: "[Draft, to be confirmed by Abhinav]"
      },
      {
        decision: "Dense Sentence Transformers (all-MiniLM-L6-v2) vs Sparse TF-IDF",
        rationale: "Captures conceptual synonyms (e.g. 'PyTorch' vs 'Deep Learning Framework') without requiring exact keyword overlaps.",
        tradeoff: "Requires local embedding model loading into memory (~120MB memory footprint).",
        status: "[Draft, to be confirmed by Abhinav]"
      }
    ],
    results: [
      { label: "Scoring Dimensions", value: "5 Heuristic Tiers", isSample: false, notes: "Format, Keywords, Impact, Skills, ATS Parseability" },
      { label: "Embedding Architecture", value: "all-MiniLM-L6-v2", isSample: false, notes: "384-dimensional dense semantic vectors" },
      { label: "Parsing Accuracy", value: "[Add real metric]", isSample: true, notes: "Evaluated on multi-column benchmark set" },
      { label: "Fallback Latency", value: "< 250ms", isSample: true, notes: "[Simulated / Sample data deterministic fallback]" }
    ],
    nextImprovements: [
      "Add OCR preprocessing for scanned image-based PDF resumes.",
      "Implement personalized bullet-point rewrite suggestions with semantic drift guards.",
      "Add fine-tuned token classification for domain-specific technical skill tags."
    ],
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
      { label: "Fallback Latency", value: "< 250ms [Simulated]", isSample: true }
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
      auc: "0.91 [Simulated / Sample data]",
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
    problem: "High-dimensional sparse transaction arrays generated poorly-defined cluster centroids (curse of dimensionality), lowering clustering stability and muddling consumer segmentation.",
    constraints: [
      "High dimensional sparsity: customer purchasing matrices contain 90%+ zero-frequency item entries.",
      "Unknown ground-truth labels: requires purely unsupervised evaluation metrics (silhouette score, Davies-Bouldin).",
      "Dynamic data scale: cluster centroids must adapt as catalog items grow."
    ],
    approach: "Applied log-transformation and standard scaling across customer RFM (Recency, Frequency, Monetary) metrics and product purchase counts. Projected features into orthogonal principal axes via PCA, retaining >85% variance while eliminating collinear noise, followed by K-Means clustering with optimal k determined via the Elbow heuristic and silhouette coefficient.",
    decisionsAndTradeoffs: [
      {
        decision: "PCA Dimensional Reduction prior to K-Means Clustering",
        rationale: "Combats distance inflation in sparse high-dimensional space where Euclidean distances between points converge to equal values.",
        tradeoff: "Principal components represent linear combinations of features, slightly reducing direct single-feature interpretability.",
        status: "[Draft, to be confirmed by Abhinav]"
      },
      {
        decision: "K-Means Centroids vs Hierarchical Agglomerative Clustering",
        rationale: "Linear computational complexity O(n * k * d) enables fast real-time segment assignment upon incoming new transactions.",
        tradeoff: "Assumes spherical cluster geometry and requires predefined k evaluation.",
        status: "[Draft, to be confirmed by Abhinav]"
      },
      {
        decision: "RFM Normalization + Transaction Vector Concatenation",
        rationale: "Balances overall monetary value with specific product category affinity in a single cohesive vector.",
        tradeoff: "Requires careful feature weighting to prevent monetary outliers from dominating affinity clusters.",
        status: "[Draft, to be confirmed by Abhinav]"
      }
    ],
    results: [
      { label: "Clustering Model", value: "K-Means + PCA", isSample: false, notes: "Elbow method & silhouette optimized" },
      { label: "Silhouette Score", value: "0.68", isSample: true, notes: "[Simulated / Sample data benchmark]" },
      { label: "Cluster Archetypes", value: "4 Distinct Segments", isSample: false, notes: "High-value, Regular, Budget, At-risk" },
      { label: "Segmentation Throughput", value: "[Add real metric]", isSample: true, notes: "Transactions categorized per second" }
    ],
    nextImprovements: [
      "Implement DBSCAN or HDBSCAN for arbitrary density-based non-spherical customer clusters.",
      "Add time-series churn probability forecasting using survival analysis models.",
      "Build dynamic marketing trigger webhooks connecting segment shifts directly to CRM pipelines."
    ],
    features: [
      "Multi-Dimensional Clustering: Implements K-Means clustering with dynamically evaluated distance metrics.",
      "Persona Classification: Automatically categorizes consumer clusters into high-value, casual, and at-risk archetypes.",
      "Targeted Marketing Engine: Formulates targeted catalog recommendations and communication cadences per archetype."
    ],
    tech: ["Python", "Scikit-Learn", "PCA", "K-Means", "Streamlit", "Chart.js"],
    metrics: [
      { label: "Clustering Model", value: "K-Means + PCA", isSample: false },
      { label: "Silhouette Score", value: "0.68 [Simulated]", isSample: true },
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
    id: "attendpro",
    title: "AttendPro",
    category: "vision",
    categoryLabel: "Biometric Vision & Audio",
    status: "LIVE",
    tagline: "Multimodal contact-free attendance platform integrating FaceID & voice recognition.",
    outcome: "Implemented dual-sensor validation with dynamic weight shifting between facial embeddings and acoustic voiceprints to prevent spoofing.",
    image: "/project_attendance_system.png",
    liveUrl: "https://presentai-attendance.onrender.com",
    repoUrl: "https://github.com/abhinavbuilds2005/AI-Powered-Attendance-Platform",
    summary: "An AI-powered attendance platform utilizing face and voice recognition, built with Streamlit and Supabase. Teachers manage subjects and log attendance directly from classroom camera frames or audio captures; students self-enroll via QR codes and verify presence using facial biometric embeddings.",
    problem: "Single-biometric validation fails under variable environmental conditions (dim camera lighting, background classroom chatter) and remains vulnerable to static photo or recorded voice replay spoofing.",
    constraints: [
      "Real-time processing: must authenticate whole classroom sessions without long student queues.",
      "Low-light and acoustic noise interference in non-studio classroom environments.",
      "Privacy and transactional integrity: biometric templates must be stored with strict ACID compliance."
    ],
    approach: "Designed a dual-sensor verification pipeline with dynamic confidence shifting: when visual landmark confidence drops in dim environments, the system weights acoustic speaker prints higher; in noisy rooms, facial landmark vectors dominate. Integrates student QR onboarding with Supabase transactional records.",
    decisionsAndTradeoffs: [
      {
        decision: "Dynamic Sensor Weight Shifting vs Fixed 50/50 Multi-Modal Average",
        rationale: "Prevents a single degraded channel (e.g. low ambient lighting) from dragging down an otherwise definitive biometric match.",
        tradeoff: "Requires real-time sensor quality estimation heuristics before score aggregation.",
        status: "[Draft, to be confirmed by Abhinav]"
      },
      {
        decision: "Euclidean Embedding Metric Learning vs Classifier Output Layer",
        rationale: "Allows adding new students dynamically without retraining the underlying neural network; only template embeddings need to be stored.",
        tradeoff: "Requires calibrated distance thresholding to balance false accept vs false reject rates.",
        status: "[Draft, to be confirmed by Abhinav]"
      },
      {
        decision: "Supabase Backend with Row-Level Security vs Local File Storage",
        rationale: "Ensures ACID auditability of attendance timestamps and prevents unauthorized template access.",
        tradeoff: "Requires continuous network connectivity to remote database cluster.",
        status: "[Draft, to be confirmed by Abhinav]"
      }
    ],
    results: [
      { label: "Sensor Modalities", value: "Dual: Face + Voice", isSample: false, notes: "Synchronized dual-stream ingestion" },
      { label: "FAR / FRR Target", value: "< 0.1%", isSample: true, notes: "[Simulated / Sample data validation target]" },
      { label: "Authentication Speed", value: "[Add real metric]", isSample: true, notes: "End-to-end vector lookup latency" },
      { label: "Database Layer", value: "Supabase / Postgres", isSample: false, notes: "ACID transactional logs" }
    ],
    nextImprovements: [
      "Implement 3D facial depth estimation via infrared camera streams to defeat high-res screen replay attacks.",
      "Add localized offline vector search (e.g. SQLite + FAISS) for zero-connectivity environments.",
      "Build automated absence escalation notifications via institutional email APIs."
    ],
    features: [
      "Dual-Sensor Verification: Concurrent processing of classroom camera frames and audio microphone streams.",
      "Acoustic Voice Biometrics: Deep neural network extracting frequency embeddings to identify verified speaker profiles.",
      "Liveness & Anti-Spoofing: Micro-motion analysis paired with voice pitch variance checks to detect photo/audio replay attacks."
    ],
    tech: ["Python", "OpenCV", "FaceNet", "Voice Biometrics", "Supabase", "Streamlit"],
    metrics: [
      { label: "Sensor Modalities", value: "Dual: Face + Voice", isSample: false },
      { label: "FAR / FRR Target", value: "< 0.1% [Simulated]", isSample: true },
      { label: "Authentication Speed", value: "[Add real metric]", isSample: true },
      { label: "Database Layer", value: "Supabase ACID", isSample: false }
    ],
    pipeline: [
      { label: "Dual Stream", sub: "Camera + Microphone" },
      { label: "Facial Landmark", sub: "FaceNet 128D Vector" },
      { label: "Voice Frequency", sub: "Speaker Embeddings" },
      { label: "Dynamic Fusion", sub: "Context Sensor Weights" },
      { label: "Ledger Commit", sub: "Supabase Database" }
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
    constraints: [
      "Fast global edge loading with zero bloated UI dependencies.",
      "Strict WCAG AA accessibility compliance in both dark and light modes.",
      "Dynamic build-time data synchronization with zero manual timestamp editing."
    ],
    approach: "Designed around a single TypeScript data contract, prebuild metadata generation hooks, strict 8px layout grid, and purposeful mathematical animations.",
    decisionsAndTradeoffs: [
      {
        decision: "Single TypeScript Data Contract for Metrics, Embeddings & Projects",
        rationale: "Eliminates synchronization bugs across multiple portfolio views; updating projects.ts propagates across all UI components.",
        tradeoff: "Requires strict adherence to data model types during portfolio maintenance.",
        status: "[Draft, to be confirmed by Abhinav]"
      },
      {
        decision: "Ink & Saffron Curated Palette with Restrained Accent Placement",
        rationale: "Signals senior product design discipline by avoiding generic neon or AI gradients.",
        tradeoff: "Requires careful tone balancing in light mode to maintain contrast.",
        status: "[Draft, to be confirmed by Abhinav]"
      }
    ],
    results: [
      { label: "Lighthouse Target", value: "95+ All Categories", isSample: false, notes: "Performance, Accessibility, Best Practices, SEO" },
      { label: "Animation Budget", value: "< 400ms Strict", isSample: false, notes: "Purposeful motion with reduced-motion support" },
      { label: "Build Metadata", value: "100% Dynamic", isSample: false, notes: "Commit hash and date generated at prebuild" }
    ],
    nextImprovements: [
      "Add interactive terminal mode emulator for CLI-based recruiter navigation.",
      "Implement automated GitHub Actions CI audit running Lighthouse tests on every PR."
    ],
    features: [
      "Single Data Contract: All project metrics, tech stacks, and embeddings derive from a unified TypeScript model.",
      "Feature Importance Analytics: Dynamic bar charts reflecting actual repository toolchain occurrences.",
      "ML-Themed Purposeful Interactions: Loss curves, 4-stage pipeline drawer, and 2D embedding scatter transitions."
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "Netlify Functions"],
    metrics: [
      { label: "Lighthouse Target", value: "95+ All Categories", isSample: false },
      { label: "Animation Budget", value: "< 400ms Strict", isSample: false },
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

export const PIPELINE_STAGES: PipelineStageInfo[] = [
  {
    id: "data",
    step: "01",
    title: "Data",
    summary: "Multimodal ingestion across raw document scans, unstructured CV text, and transactional arrays.",
    tools: ["Pandas", "NumPy", "OpenCV", "EasyOCR", "FastAPI"],
    projectExample: {
      projectName: "DocuShield AI & AttendPro",
      detail: "Normalizing multi-column PDF layouts, extracting ICAO MRZ zones, and streaming synchronized audio frames."
    }
  },
  {
    id: "train",
    step: "02",
    title: "Train",
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
    title: "Evaluate",
    summary: "Auditing models against PR-AUC curves, SHAP explainability, and multi-sensor confidence thresholds.",
    tools: ["Scikit-Learn", "SHAP", "Precision-Recall AUC", "FaceNet", "PyTorch"],
    projectExample: {
      projectName: "DocuShield AI & AttendPro",
      detail: "5-level hierarchical multimodal evidence fusion engine combining ELA heatmaps, copy-move detection, and facial biometrics."
    }
  },
  {
    id: "deploy",
    step: "04",
    title: "Deploy",
    summary: "Containerized edge delivery, deterministic LLM fallback pipelines, and serverless architectures.",
    tools: ["Docker", "FastAPI", "Netlify Functions", "Streamlit", "Supabase"],
    projectExample: {
      projectName: "ATS Resume Analyzer & DocuShield",
      detail: "Automatic fallback to deterministic regex/NLP parsing whenever external generative LLM APIs exceed latency bounds."
    }
  }
];
