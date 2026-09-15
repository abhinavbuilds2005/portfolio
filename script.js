/**
 * AI SYSTEMS LAB // NEURAL ENGINEERING SCRIPT
 * Abhinav Anand — AI/ML Engineer Portfolio
 * 
 * CORE ARCHITECTURAL MODULES:
 * 1. Data Dictionary: Projects, Skills Ecosystem, Pipeline Stages, Build Log
 * 2. Hero Interactive AI Systems Pipeline Canvas (Lightweight 2D Canvas)
 * 3. AI Systems Map (Interactive Skill Explorer & Project Linkage)
 * 4. Project Matrix (Category Filters, Master-Detail Console, Architecture Pipeline Modal)
 * 5. Model Pipeline Visualizer ("How I Build Intelligent Systems")
 * 6. Engineering Telemetry (LeetCode Live Sync + Cache + GitHub Metrics)
 * 7. Build Log (Engineering Journal)
 * 8. Web3Forms Comms Form Handler
 * 9. Local Portfolio Assistant ("Ask Abhinav's Portfolio")
 * 10. Command Palette (Cmd+K / Ctrl+K)
 * 11. Navigation Scroll-Spy & Mobile Menu
 */

document.addEventListener("DOMContentLoaded", () => {
  // Ensure landing at the top of the portfolio on fresh load if no section hash is specified
  if (!window.location.hash) {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }

  // ==========================================================================
  // 1. DATA DICTIONARIES: PROJECTS, SKILLS, PIPELINE, BUILD LOG
  // ==========================================================================

  // --- Verified Projects ---
  const PROJECTS_DATA = [
    {
      id: "docushield",
      index: "01",
      title: "DocuShield AI: Forensic Screening",
      category: "VISION_FORENSICS",
      categoryLabel: "Computer Vision & Forensics",
      status: "LIVE",
      tagline: "Multimodal forensic screening platform verifying document authenticity, tampering, and biometric credentials.",
      image: "project_docushield.png",
      liveUrl: "https://docushield-ai-s1x9.onrender.com/",
      repoUrl: "https://github.com/abhinavbuilds2005/DocuShield",
      summary: "An enterprise-grade multimodal forensic screening platform engineered for Smart India Hackathon (SIH 2026, Problem Statement SIH26188). It automatically verifies document authenticity across 5 core categories (Passports, Visas, Indian Aadhaar/UID, Driving Licences, Travel Permits), extracting OCR schemas, detecting digital tampering via Error Level Analysis (ELA) and copy-move forgery, verifying ICAO Doc 9303 MRZ check digits and Verhoeff checksums, and cross-matching live facial biometrics.",
      problem: "Digital document forgery leverages sophisticated graphical manipulation (copy-move replication, font splicing, compression artifacts, and fraudulent checksums) that easily deceive conventional OCR systems and isolated classifiers.",
      solution: "Architected a 5-level Hierarchical Multimodal Evidence Fusion Engine combining Error Level Analysis (ELA), ORB+RANSAC copy-move detection, Laplacian typography variance, ICAO Doc 9303 MRZ 7-3-1 check digit algorithms, Verhoeff checksums, and facial biometric verification into an explainable 0–100% forensic risk score.",
      features: [
        "<strong>Multimodal Tampering Detection:</strong> Runs Error Level Analysis (ELA) for image compression anomalies, ORB + RANSAC copy-move detection, and typography Laplacian consistency checks.",
        "<strong>Algorithmic Validation & MRZ Parsing:</strong> Computes ICAO Doc 9303 TD1/TD2/TD3 check digits, Verhoeff checksums for Indian 12-digit Aadhaar, PAN structure validation, and chronological date logic.",
        "<strong>Biometric Face Verification & Fusion:</strong> Document facial extraction cross-matched against live selfies with HSV/gradient similarity, unified by a 5-level forensic risk engine."
      ],
      tech: ["Python", "OpenCV", "EasyOCR", "FastAPI", "Docker", "React 18 & Vite", "Verhoeff Checksum"],
      pipeline: [
        { label: "Document Upload", sub: "Multi-Format Input" },
        { label: "OCR & Layout", sub: "EasyOCR Tokenizer" },
        { label: "Forensic ELA", sub: "Tamper Heatmap" },
        { label: "MRZ / Verhoeff", sub: "Checksum Engines" },
        { label: "Evidence Fusion", sub: "Calibrated Risk Score" }
      ]
    },
    {
      id: "creditwise",
      index: "02",
      title: "CreditWise: AI Loan Risk",
      category: "PREDICTIVE_ML",
      categoryLabel: "Predictive ML",
      status: "LIVE",
      tagline: "Predictive machine learning architecture assessing loan default risk for automated underwriting.",
      image: "project_creditwise_1775755763976.png",
      liveUrl: "https://credishield-one.vercel.app/",
      repoUrl: "https://github.com/abhinavbuilds2005/credit-wise-loan-system",
      summary: "An end-to-end machine learning system engineered for loan approval prediction. Built with tailored financial feature engineering, risk scoring algorithms, and real-time inference, offering robust decision intelligence deployed seamlessly via Streamlit.",
      problem: "Imbalanced training datasets where historical defaults represent a tiny fraction of total records, causing baseline classifiers to skew heavily toward low-risk labels.",
      solution: "Applied SMOTE (Synthetic Minority Over-sampling Technique) during training and optimized decision thresholds against Precision-Recall AUC curves rather than misleading raw accuracy metrics.",
      features: [
        "<strong>Custom Financial Feature Engineering:</strong> Modeled debt-to-income weights, installment ratios, and credit history tenure adjustments.",
        "<strong>Interpretable ML Classifier:</strong> Trained a regularized Logistic Regression pipeline scoring default probability with high statistical transparency.",
        "<strong>Real-Time Underwriting Console:</strong> Interactive Streamlit interface enabling variable parameter tuning and immediate credit risk estimation."
      ],
      tech: ["Python", "Scikit-Learn", "Pandas & NumPy", "SMOTE", "Streamlit", "Matplotlib"],
      pipeline: [
        { label: "Financial Data", sub: "Applicant Profile" },
        { label: "Feature Pipeline", sub: "Debt-to-Income Weights" },
        { label: "SMOTE Resampling", sub: "Class Imbalance Fix" },
        { label: "Logistic Classifier", sub: "Calibrated Odds" },
        { label: "Risk Scorecard", sub: "Streamlit UI" }
      ]
    },
    {
      id: "smartcart",
      index: "03",
      title: "SmartCart AI: Customer Intelligence",
      category: "PREDICTIVE_ML",
      categoryLabel: "Predictive ML",
      status: "LIVE",
      tagline: "Unsupervised machine learning platform for customer segmentation and churn prediction.",
      image: "project_customer_ai_1775755777519.png",
      liveUrl: "https://smartcart-recommendation-system.netlify.app/",
      repoUrl: "https://github.com/abhinavbuilds2005/Smartcart-Recommendation-system",
      summary: "An AI-powered customer segmentation and behavioral analytics platform. It leverages unsupervised clustering and dimensional reduction to discover organic purchasing patterns, generating personalized product recommendations and churn risk assessments.",
      problem: "High-dimensional sparse transaction arrays generated poorly-defined cluster centroids (curse of dimensionality), lowering clustering stability.",
      solution: "Integrated Principal Component Analysis (PCA) to project high-dimensional transaction features into dense, lower-dimensional representations before clustering, increasing the silhouette coefficient.",
      features: [
        "<strong>Multi-Dimensional Clustering:</strong> Implements K-Means clustering with dynamically evaluated distance metrics.",
        "<strong>Persona Classification:</strong> Automatically categorizes consumer clusters (e.g. frequent budget shoppers vs. high-basket occasional buyers).",
        "<strong>Targeted Marketing Engine:</strong> Formulates targeted catalog recommendations and communication cadences per archetype."
      ],
      tech: ["Python", "Scikit-Learn", "PCA Dimension Reduction", "K-Means", "Streamlit", "Chart.js"],
      pipeline: [
        { label: "Transaction Matrix", sub: "Sparse Purchase Log" },
        { label: "PCA Projection", sub: "Dimensional Reduction" },
        { label: "K-Means Clustering", sub: "Silhouette Optimized" },
        { label: "Churn Evaluation", sub: "Risk Assessment" },
        { label: "Catalog Engine", sub: "Segment Recommendations" }
      ]
    },
    {
      id: "presentai",
      index: "04",
      title: "PresentAI: Biometric Attendance",
      category: "VISION_FORENSICS",
      categoryLabel: "Computer Vision & Forensics",
      status: "LIVE",
      tagline: "Multimodal contact-free attendance platform integrating computer vision and acoustic speaker verification.",
      image: "project_attendance_system.jpg",
      liveUrl: "https://presentai-attendance.onrender.com",
      repoUrl: "https://github.com/abhinavbuilds2005/AI-Powered-Attendance-Platform",
      summary: "A high-security biometric attendance verification system designed for institutional deployments. It authenticates identity by simultaneously analyzing real-time facial embeddings and deep acoustic speaker prints to eliminate proxy attendance.",
      problem: "Biometric validation accuracy drops substantially under adverse conditions such as poor ambient lighting (camera) or background acoustic interference (microphone).",
      solution: "Engineered a dynamic confidence-fusion model that shifts sensor weights—relying more heavily on acoustic voice biometrics in dim environments and prioritizing facial landmark vectors in noisy rooms.",
      features: [
        "<strong>Dual-Sensor Verification:</strong> Concurrent processing of live camera frames and audio microphone streams.",
        "<strong>Acoustic Voice Biometrics:</strong> Deep neural network extracting frequency embeddings to identify verified speaker profiles.",
        "<strong>Liveness & Anti-Spoofing:</strong> Micro-motion analysis paired with voice pitch variance checks to detect photo/audio replay attacks."
      ],
      tech: ["Python", "OpenCV", "FaceNet", "Voice Biometrics", "PostgreSQL"],
      pipeline: [
        { label: "Dual Stream", sub: "Camera + Microphone" },
        { label: "Facial Landmark", sub: "FaceNet 128D Vector" },
        { label: "Voice Frequency", sub: "Speaker Embeddings" },
        { label: "Dynamic Fusion", sub: "Context Sensor Weights" },
        { label: "Ledger Commit", sub: "PostgreSQL Database" }
      ]
    },
    {
      id: "elevatecv",
      index: "05",
      title: "ATS Resume Analyzer: AI Scorer",
      category: "NLP_GENAI",
      categoryLabel: "NLP & Generative AI",
      status: "LIVE",
      tagline: "High-performance ATS scoring engine matching resumes to job descriptions via NLP & semantic embeddings.",
      image: "project_ats_resume.jpg",
      liveUrl: "https://ats-resume-analyzer-we86.onrender.com",
      repoUrl: "https://github.com/abhinavbuilds2005/ATS-RESUME-ANALYZER",
      summary: "A production-grade ATS scoring and resume optimization platform. Built with FastAPI and spaCy for structural NLP parsing, Sentence Transformers for chunked semantic similarity against job descriptions, and Groq (Llama 3) for generative feedback with an automated deterministic fallback pipeline and Supabase JWT authentication.",
      problem: "Arbitrary multi-column PDF/DOCX layouts scramble standard text extraction, standard embeddings suffer 5,000-character truncation loss, and cloud LLM rate limits risk service disruptions.",
      solution: "Engineered a layout-aware document parser, implemented rolling chunk-based embeddings (all-MiniLM-L6-v2) to eliminate truncation, and built a fault-tolerant pipeline that automatically falls back to deterministic NLP extraction if external LLM APIs are unreachable.",
      features: [
        "<strong>5-Dimension Heuristic Scoring:</strong> Evaluates Formatting (20%), Keywords (25%), Impact (25%), Skill Validation (15%), and ATS Parseability & Privacy (15%).",
        "<strong>Rolling Chunk Semantic Matching:</strong> Uses Sentence Transformers to vectorize resume segments against job description requirements without truncation.",
        "<strong>Resilient AI Pipeline & Auth:</strong> Groq Llama 3 generative feedback with automatic deterministic fallback, Supabase JWT user isolation, and WeasyPrint export."
      ],
      tech: ["FastAPI", "spaCy NLP", "Sentence Transformers", "Groq Llama 3", "Supabase", "Python"],
      pipeline: [
        { label: "Document Parse", sub: "Multi-Column PDF" },
        { label: "spaCy Extraction", sub: "Entities & Skills" },
        { label: "Chunk Vectors", sub: "MiniLM-L6-v2" },
        { label: "Cosine Match", sub: "JD Alignment Score" },
        { label: "Groq Generation", sub: "Actionable Feedback" }
      ]
    },
    {
      id: "portfolio",
      index: "06",
      title: "Personal Portfolio v2",
      category: "SYSTEMS",
      categoryLabel: "Full-Stack AI",
      status: "LIVE",
      tagline: "A high-performance console-inspired engineering hub built with zero bloated frameworks.",
      image: "project_portfolio_1775755792684.png",
      liveUrl: null,
      repoUrl: "https://github.com/abhinavbuilds2005/portfolio",
      summary: "A bespoke engineering portfolio redesigned from first principles. Features a persistent IDE-style TOC activity sidebar, an interactive AI systems map, and a master-detail project console designed for senior-engineer clarity.",
      problem: "Eliminating the visual clichés common across contemporary AI/student portfolios while keeping interaction fast, accessible, and responsive.",
      solution: "Engineered a persistent two-zone layout with hairline 1px borders, monospace metadata hierarchy, and modular vanilla JavaScript components with zero framework overhead.",
      features: [
        "<strong>Persistent Two-Zone Layout:</strong> Fixed TOC navigation sidebar with active section tracking, collapsing to a top drawer on mobile.",
        "<strong>Master-Detail Project Console:</strong> Instant keyboard-navigable index with real-time inspection view and collapsible case studies.",
        "<strong>Strict Design System:</strong> Curated grayscale palette with high-contrast typography (JetBrains Mono + Inter)."
      ],
      tech: ["HTML5", "Vanilla CSS", "JavaScript (ES6+)", "JetBrains Mono"],
      pipeline: [
        { label: "Static Structure", sub: "Semantic HTML5" },
        { label: "Design System", sub: "CSS Custom Tokens" },
        { label: "State Controller", sub: "Vanilla JS ES6+" },
        { label: "Live Telemetry", sub: "GraphQL Serverless" },
        { label: "Edge Delivery", sub: "Netlify Deploy" }
      ]
    },
    {
      id: "voice-assistant",
      index: "07",
      title: "AI Voice Assistant",
      category: "NLP_GENAI",
      categoryLabel: "NLP & Generative AI",
      status: "ACTIVE ROADMAP",
      tagline: "Edge-quantized voice assistant orchestrating localized LLM reasoning and OS task execution.",
      image: "",
      liveUrl: null,
      repoUrl: null,
      summary: "A local-first conversational voice assistant engineered for low-latency dialogue, private offline inference, and operating system workflow automation.",
      problem: "Maintaining low conversation latency without leaking user voice audio to external commercial cloud endpoints.",
      solution: "Deploying 4-bit quantized local instruction LLMs combined with accelerated whisper streaming buffers for entirely on-device inference.",
      features: [
        "<strong>Whisper Audio Streamer:</strong> Continuous low-latency streaming pipeline converting audio buffers to structured tokens.",
        "<strong>Agentic Task Orchestration:</strong> Maps spoken queries into validated execution schema JSONs.",
        "<strong>OS Automation Engine:</strong> Hooks into system APIs for hands-free workflow execution."
      ],
      tech: ["Python", "OpenAI Whisper", "Local Quantized LLMs", "JSON Schema Parser"],
      pipeline: [
        { label: "Audio Stream", sub: "Continuous Buffer" },
        { label: "Whisper STT", sub: "Low-Latency Tokens" },
        { label: "Local LLM", sub: "4-Bit Quantized" },
        { label: "JSON Validator", sub: "Action Schema" },
        { label: "OS Executor", sub: "System Automation" }
      ]
    },
    {
      id: "style-transfer",
      index: "08",
      title: "Neural Style Transfer",
      category: "VISION_FORENSICS",
      categoryLabel: "Computer Vision & Forensics",
      status: "ACTIVE ROADMAP",
      tagline: "Real-time feed-forward style rendering network blending classical artistic textures onto digital images.",
      image: "",
      liveUrl: null,
      repoUrl: null,
      summary: "A deep learning visual synthesis platform using convolutional neural networks to extract style representations from famous artworks and transfer them onto custom photography while preserving semantic structure.",
      problem: "Traditional iterative style transfer optimizations require hundreds of gradient descent steps, taking minutes per image on consumer GPUs.",
      solution: "Trained a feed-forward perceptual generative network using Gram matrix style loss and deep perceptual content loss to achieve sub-second real-time inference.",
      features: [
        "<strong>Dual Perceptual Loss:</strong> Balances high-level feature retention with Gram-matrix textural synthesis.",
        "<strong>Feed-Forward Network:</strong> Sub-second processing enabling interactive web execution.",
        "<strong>Interactive Canvas Playground:</strong> Streamlit interface for custom blending and asset export."
      ],
      tech: ["Python", "PyTorch", "VGG-19 CNN", "FastAPI", "Streamlit Canvas"],
      pipeline: [
        { label: "Input Images", sub: "Content & Style" },
        { label: "VGG-19 Features", sub: "Deep Layer Maps" },
        { label: "Gram Matrix", sub: "Texture Correlation" },
        { label: "Perceptual Loss", sub: "Content + Style" },
        { label: "Synthesized Output", sub: "Sub-Second Image" }
      ]
    },
    {
      id: "gym-trainer",
      index: "09",
      title: "AI Real-Time Gym Trainer",
      category: "VISION_FORENSICS",
      categoryLabel: "Computer Vision & Forensics",
      status: "ACTIVE ROADMAP",
      tagline: "Computer vision activity monitor calculating joint kinematics and tracking exercise repetitions.",
      image: "",
      liveUrl: null,
      repoUrl: null,
      summary: "A real-time kinematic posture evaluator using standard webcams to identify skeletal joints, verify exercise angles against biomechanical standards, and count workout repetitions accurately.",
      problem: "Perspective shifts, camera tilt, and clothing clutter introduce landmark jitter, producing false repetition triggers.",
      solution: "Implemented moving-average spatial smoothing filters across 3D coordinates and enforced angular state-machine transitions calibrated for individual limb ratios.",
      features: [
        "<strong>High-Speed Pose Estimation:</strong> Identifies 33 skeletal landmarks at 30+ FPS via standard webcam streams.",
        "<strong>Kinematic Angle Calculation:</strong> Measures joint vector angles across critical movement planes.",
        "<strong>State-Machine Repetition Counter:</strong> Distinguishes full range-of-motion repetitions from erratic movements."
      ],
      tech: ["Python", "MediaPipe Pose", "OpenCV", "NumPy", "FastAPI"],
      pipeline: [
        { label: "Webcam Feed", sub: "30+ FPS Video" },
        { label: "MediaPipe 33", sub: "Skeletal Landmarks" },
        { label: "Spatial Filter", sub: "Coordinate Smoothing" },
        { label: "Angle Kinematics", sub: "Vector Plane Dot-Product" },
        { label: "State Machine", sub: "Repetition Counter" }
      ]
    }
  ];

  // --- Verified Skills Ecosystem ---
  const SKILLS_ECOSYSTEM = [
    {
      id: "python",
      name: "Python",
      category: "FOUNDATIONS",
      desc: "Core programming language for data structures, machine learning research, and high-throughput backend services.",
      projects: ["docushield", "creditwise", "smartcart", "presentai", "elevatecv"]
    },
    {
      id: "cpp",
      name: "C++ (DSA & Memory)",
      category: "FOUNDATIONS",
      desc: "Low-level memory management, pointers, and asymptotic algorithmic complexity reduction verified on LeetCode.",
      projects: ["portfolio"]
    },
    {
      id: "sql",
      name: "SQL & Schema Design",
      category: "FOUNDATIONS",
      desc: "Relational schema engineering, 3NF normalization, complex window functions, and indexing in PostgreSQL.",
      projects: ["presentai"]
    },
    {
      id: "math-stats",
      name: "Statistics & Linear Algebra",
      category: "FOUNDATIONS",
      desc: "Probability distributions, covariance matrices, vector spaces, and loss gradient formulations for machine learning.",
      projects: ["creditwise", "smartcart"]
    },
    {
      id: "scikit-learn",
      name: "Scikit-Learn",
      category: "ML",
      desc: "Regularized classifiers (Logistic, Trees), ensemble methods, and pipeline transformers.",
      projects: ["creditwise", "smartcart"]
    },
    {
      id: "smote",
      name: "SMOTE (Class Imbalance)",
      category: "ML",
      desc: "Synthetic Minority Over-sampling Technique to prevent model bias on skewed default datasets.",
      projects: ["creditwise"]
    },
    {
      id: "pca",
      name: "PCA Decomposition",
      category: "ML",
      desc: "Principal Component Analysis to compress high-dimensional sparse transaction matrices without variance loss.",
      projects: ["smartcart"]
    },
    {
      id: "kmeans",
      name: "K-Means Clustering",
      category: "ML",
      desc: "Unsupervised centroid clustering evaluated using the Elbow method and silhouette coefficient.",
      projects: ["smartcart"]
    },
    {
      id: "pr-auc",
      name: "PR-AUC Metric Auditing",
      category: "ML",
      desc: "Precision-Recall curve threshold optimization to evaluate true model performance over misleading raw accuracy.",
      projects: ["creditwise"]
    },
    {
      id: "pytorch",
      name: "PyTorch",
      category: "DL_VISION",
      desc: "Deep learning framework used for custom neural layers, tensor operations, and perceptual loss optimization.",
      projects: ["style-transfer"]
    },
    {
      id: "opencv",
      name: "OpenCV",
      category: "DL_VISION",
      desc: "Computer vision image processing: morphological filters, Haar cascades, color space conversion, and ELA.",
      projects: ["docushield", "presentai", "gym-trainer"]
    },
    {
      id: "facenet",
      name: "FaceNet Biometrics",
      category: "DL_VISION",
      desc: "Deep metric learning mapping face images to 128-dimensional Euclidean space for biometric verification.",
      projects: ["presentai"]
    },
    {
      id: "ela",
      name: "Error Level Analysis (ELA)",
      category: "DL_VISION",
      desc: "Forensic image compression analysis detecting digital splicing by measuring differential JPEG resave error.",
      projects: ["docushield"]
    },
    {
      id: "verhoeff",
      name: "Verhoeff Checksum (D5)",
      category: "DL_VISION",
      desc: "Mathematical checksum algorithm utilizing dihedral group D5 to validate Indian Aadhaar/UID identity integrity.",
      projects: ["docushield"]
    },
    {
      id: "sentence-transformers",
      name: "Sentence Transformers",
      category: "NLP_GENAI",
      desc: "Dense semantic text embeddings (all-MiniLM-L6-v2) for chunked similarity matching against job descriptions.",
      projects: ["elevatecv"]
    },
    {
      id: "spacy",
      name: "spaCy Pipeline",
      category: "NLP_GENAI",
      desc: "Industrial-strength Natural Language Processing for named entity recognition (NER) and syntactic parsing.",
      projects: ["elevatecv"]
    },
    {
      id: "easyocr",
      name: "EasyOCR & Tesseract",
      category: "NLP_GENAI",
      desc: "Optical Character Recognition extracting layout-aware text tokens, confidences, and normalized bounding boxes.",
      projects: ["docushield"]
    },
    {
      id: "groq-llama",
      name: "Groq Llama 3 LLM",
      category: "NLP_GENAI",
      desc: "High-speed generative inference for contextual resume rewrites with deterministic fallback handling.",
      projects: ["elevatecv"]
    },
    {
      id: "fastapi",
      name: "FastAPI",
      category: "SYSTEMS",
      desc: "High-throughput asynchronous Python web framework with Pydantic schema validation and OpenAPI docs.",
      projects: ["docushield", "elevatecv"]
    },
    {
      id: "docker",
      name: "Docker Containerization",
      category: "SYSTEMS",
      desc: "Reproducible container deployments packaging Python runtimes, C++ system libraries, and OCR binaries.",
      projects: ["docushield"]
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      category: "SYSTEMS",
      desc: "ACID-compliant relational database for transactional user isolation and biometric attendance records.",
      projects: ["presentai"]
    },
    {
      id: "streamlit",
      name: "Streamlit UI",
      category: "SYSTEMS",
      desc: "Interactive reactive dashboards enabling live parameter tuning and instant model risk estimation.",
      projects: ["creditwise", "smartcart"]
    }
  ];

  // --- Model Pipeline Stages ("How I Build Intelligent Systems") ---
  const PIPELINE_STAGES = [
    {
      step: "01",
      title: "Problem Definition & Data Ingestion",
      summary: "Framing the ML task (supervised, unsupervised, or forensic) and establishing rigorous data validation schemas.",
      desc: "Every project starts by understanding operational stakes. Before touching models, I define target labels, check for distribution drift, audit class balance, and establish clean deterministic data schemas.",
      rationale: "Garbage in, garbage out. A poorly framed problem or corrupted labels cannot be rescued by advanced architectures.",
      tools: ["Pandas", "NumPy", "Pydantic Schemas", "OpenCV"],
      projects: ["CreditWise", "DocuShield AI"]
    },
    {
      step: "02",
      title: "Preprocessing & Normalization",
      summary: "Transforming raw noisy inputs into standardized, clean representations.",
      desc: "Handling layout-aware text parsing, multi-column PDF desegmentation, image resizing, morphological noise filtering, and missing-value imputation without data leakage.",
      rationale: "Feature leakage during normalization is one of the most common causes of high validation scores that collapse in production.",
      tools: ["spaCy", "OpenCV", "Scikit-Learn Preprocessing", "EasyOCR"],
      projects: ["ATS Resume Analyzer", "DocuShield AI"]
    },
    {
      step: "03",
      title: "Feature Engineering & Dimensionality",
      summary: "Extracting high-leverage domain representations and mitigating the curse of dimensionality.",
      desc: "Formulating debt-to-income weights, installment ratios, acoustic pitch frequencies, and applying PCA (Principal Component Analysis) to compress sparse matrices.",
      rationale: "Clever feature representations consistently outperform brute-force parameter scaling on small to medium datasets.",
      tools: ["PCA", "Scikit-Learn", "NumPy", "Sentence Transformers"],
      projects: ["SmartCart AI", "CreditWise"]
    },
    {
      step: "04",
      title: "Model Selection & Inductive Bias",
      summary: "Selecting the simplest architecture that satisfies accuracy and latency constraints.",
      desc: "Comparing regularized linear baselines against deep neural embeddings. Prioritizing statistical interpretability for loan underwriting, and convolutional representations for image forensics.",
      rationale: "Over-parameterized models introduce unnecessary inference cost and hidden failure modes. Start simple, baseline thoroughly.",
      tools: ["Scikit-Learn", "PyTorch", "FaceNet", "VGG-19"],
      projects: ["CreditWise", "PresentAI"]
    },
    {
      step: "05",
      title: "Rigorous Metric Evaluation",
      summary: "Auditing models with metric sensitivity tailored to real-world cost functions.",
      desc: "Refusing to rely on raw accuracy. Enforcing Precision-Recall AUC curves, silhouette coefficients, confusion matrices, and test-set verification.",
      rationale: "A 99% accuracy model that predicts the majority class on an imbalanced dataset is worthless in an underwriting environment.",
      tools: ["PR-AUC Curves", "Matplotlib", "Seaborn", "Confusion Matrices"],
      projects: ["CreditWise", "DocuShield AI"]
    },
    {
      step: "06",
      title: "Deployment & API Runtimes",
      summary: "Wrapping models into low-latency asynchronous microservices and container runtimes.",
      desc: "Packaging inference pipelines into FastAPI REST endpoints with Pydantic validation, Streamlit UI controllers, and reproducible Docker images.",
      rationale: "A model stuck in a Jupyter Notebook provides zero tangible value. Production requires clear contracts, health endpoints, and isolation.",
      tools: ["FastAPI", "Docker", "Streamlit", "Render / Vercel"],
      projects: ["DocuShield AI", "ElevateCV"]
    },
    {
      step: "07",
      title: "Resilience & Fallback Engineering",
      summary: "Designing fault-tolerant pipelines with deterministic backups for external service failures.",
      desc: "Building automatic fallback mechanisms: when external LLMs or third-party APIs time out, the system automatically falls back to deterministic rule sets and local heuristics.",
      rationale: "Intelligent systems must degrade gracefully under adverse network partitions or rate limits rather than crashing.",
      tools: ["Deterministic Fallbacks", "Local Caching", "Timeout Guards"],
      projects: ["ATS Resume Analyzer", "DocuShield AI"]
    }
  ];

  // --- Build Log Entries ---
  const BUILD_LOG_ENTRIES = [
    {
      id: "LOG_01",
      date: "SEPTEMBER 2026",
      title: "Multimodal Evidence Fusion in Document Forensics",
      text: "Single-modality forensic checks are easily fooled. By fusing image Error Level Analysis (ELA), copy-move geometry (ORB+RANSAC), ICAO MRZ checksums, and facial biometric cosine similarity into a 5-level hierarchical scoring engine, false positive rates drop drastically.",
      tags: ["DocuShield AI", "OpenCV", "Forensics", "SIH 2026"]
    },
    {
      id: "LOG_02",
      date: "AUGUST 2026",
      title: "Navigating Extreme Class Imbalance with PR-AUC",
      text: "When modeling loan default risk, historical defaults make up less than 5% of records. Standard accuracy is completely misleading. Combining SMOTE over-sampling during training with decision threshold tuning on Precision-Recall AUC curves yielded reliable risk tiers.",
      tags: ["CreditWise", "SMOTE", "Scikit-Learn", "Evaluation"]
    },
    {
      id: "LOG_03",
      date: "JULY 2026",
      title: "Dynamic Confidence Shifting in Dual-Sensor Biometrics",
      text: "Camera lighting fails in dim environments; audio microphones fail in noisy rooms. PresentAI shifts its validation weight dynamically: prioritizing acoustic voiceprints in low light and camera facial landmark vectors in acoustic noise.",
      tags: ["PresentAI", "FaceNet", "Audio Biometrics", "Anti-Spoofing"]
    },
    {
      id: "LOG_04",
      date: "JUNE 2026",
      title: "Chunked Semantic Embeddings without Truncation",
      text: "Standard transformer encoders truncate input text beyond 512 tokens (~3,500 chars). For complex multi-page resumes, this strips half the applicant's experience. Implementing a rolling chunk-based embedding strategy preserved semantic recall across entire documents.",
      tags: ["ElevateCV", "Sentence Transformers", "spaCy", "NLP"]
    },
    {
      id: "LOG_05",
      date: "MAY 2026",
      title: "Mitigating Curse of Dimensionality via PCA",
      text: "Sparse customer transaction matrices cause K-Means clustering centroids to collapse into ambiguous clusters. Projecting high-dimensional purchase vectors into dense lower-dimensional space via PCA restored cluster separation and improved silhouette coefficients.",
      tags: ["SmartCart AI", "PCA", "K-Means", "Unsupervised ML"]
    }
  ];

  // ==========================================================================
  // 2. HERO INTERACTIVE AI SYSTEMS PIPELINE CANVAS (LIGHTWEIGHT 2D CANVAS)
  // ==========================================================================
  const heroCanvas = document.getElementById("hero-system-canvas");
  const heroTooltip = document.getElementById("hero-canvas-tooltip");

  if (heroCanvas) {
    const ctx = heroCanvas.getContext("2d");
    let animationFrameId;
    let isCanvasVisible = true;

    // Responsive Canvas Resizing
    function resizeHeroCanvas() {
      const rect = heroCanvas.getBoundingClientRect();
      heroCanvas.width = rect.width * (window.devicePixelRatio || 1);
      heroCanvas.height = 280 * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    resizeHeroCanvas();
    window.addEventListener("resize", resizeHeroCanvas);

    // AI Pipeline Nodes
    const pipelineNodes = [
      { id: "input", name: "01 // DATA INGEST", sub: "Images / Resumes / Logs", x: 0.12, y: 0.5, desc: "Multimodal ingestion: raw images, PDF/DOCX layouts, audio buffers, and tabular transaction records." },
      { id: "prep", name: "02 // PREPROCESS", sub: "EasyOCR / spaCy / PCA", x: 0.32, y: 0.32, desc: "Token extraction, noise filtering, text normalization, and high-dimensional vector projection." },
      { id: "feature", name: "03 // FEATURE ENG", sub: "SMOTE / Checksums / ELA", x: 0.52, y: 0.68, desc: "Domain weights, Verhoeff D5 checksum validation, and ELA tamper compression analysis." },
      { id: "model", name: "04 // MODEL INFERENCE", sub: "FaceNet / Transformers / ML", x: 0.72, y: 0.35, desc: "Dense semantic matching, facial embeddings, and calibrated risk probability classification." },
      { id: "output", name: "05 // SYSTEM OUTPUT", sub: "Risk Score / Dashboard UI", x: 0.90, y: 0.5, desc: "Actionable decision support: forensic report, underwriting decision, or attendance confirmation." }
    ];

    let t = 0;
    let hoveredNode = null;

    // Connections between stages
    const connections = [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 }
    ];

    // Data flow pulses
    const dataPulses = [
      { conn: 0, progress: 0.1, speed: 0.007 },
      { conn: 1, progress: 0.4, speed: 0.008 },
      { conn: 2, progress: 0.7, speed: 0.006 },
      { conn: 3, progress: 0.2, speed: 0.009 }
    ];

    function renderHeroCanvas() {
      if (!isCanvasVisible) return;
      t += 0.02;

      const width = heroCanvas.width / (window.devicePixelRatio || 1);
      const height = heroCanvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += 32) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Draw connection lines with smooth curves
      connections.forEach(c => {
        const p1 = { x: pipelineNodes[c.from].x * width, y: pipelineNodes[c.from].y * height };
        const p2 = { x: pipelineNodes[c.to].x * width, y: pipelineNodes[c.to].y * height };

        ctx.strokeStyle = "rgba(0, 245, 212, 0.18)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        const cpX = (p1.x + p2.x) / 2;
        ctx.moveTo(p1.x, p1.y);
        ctx.bezierCurveTo(cpX, p1.y, cpX, p2.y, p2.x, p2.y);
        ctx.stroke();
      });

      // Draw animated data pulses
      dataPulses.forEach(pulse => {
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) pulse.progress = 0;

        const c = connections[pulse.conn];
        const p1 = { x: pipelineNodes[c.from].x * width, y: pipelineNodes[c.from].y * height };
        const p2 = { x: pipelineNodes[c.to].x * width, y: pipelineNodes[c.to].y * height };

        const cpX = (p1.x + p2.x) / 2;
        const u = pulse.progress;
        // Cubic bezier interpolation
        const px = Math.pow(1 - u, 3) * p1.x + 3 * Math.pow(1 - u, 2) * u * cpX + 3 * (1 - u) * Math.pow(u, 2) * cpX + Math.pow(u, 3) * p2.x;
        const py = Math.pow(1 - u, 3) * p1.y + 3 * Math.pow(1 - u, 2) * u * p1.y + 3 * (1 - u) * Math.pow(u, 2) * p2.y + Math.pow(u, 3) * p2.y;

        // Glowing pulse particle
        const grad = ctx.createRadialGradient(px, py, 1, px, py, 8);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.4, "#00f5d4");
        grad.addColorStop(1, "rgba(0, 245, 212, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw System Nodes
      pipelineNodes.forEach((node, idx) => {
        const nx = node.x * width;
        const ny = node.y * height;
        const isHovered = hoveredNode === idx;

        // Outer glow on hover or pulsing
        const haloSize = isHovered ? 24 : 16 + Math.sin(t + idx) * 3;
        const haloGrad = ctx.createRadialGradient(nx, ny, 2, nx, ny, haloSize);
        haloGrad.addColorStop(0, isHovered ? "rgba(0, 245, 212, 0.5)" : "rgba(139, 92, 246, 0.35)");
        haloGrad.addColorStop(1, "transparent");
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(nx, ny, haloSize, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.fillStyle = isHovered ? "#00f5d4" : "#161a24";
        ctx.strokeStyle = isHovered ? "#ffffff" : "#00f5d4";
        ctx.lineWidth = isHovered ? 2 : 1.5;
        ctx.beginPath();
        ctx.arc(nx, ny, isHovered ? 8 : 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Label above / below
        ctx.fillStyle = isHovered ? "#ffffff" : "#f8fafc";
        ctx.font = "bold 9px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        const labelY = ny > height / 2 ? ny + 20 : ny - 16;
        ctx.fillText(node.name, nx, labelY);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.fillText(node.sub, nx, labelY + 11);
      });

      animationFrameId = requestAnimationFrame(renderHeroCanvas);
    }

    renderHeroCanvas();

    // Mouse hover detection on hero canvas
    heroCanvas.addEventListener("mousemove", (e) => {
      const rect = heroCanvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found = null;
      pipelineNodes.forEach((node, idx) => {
        const nx = node.x * rect.width;
        const ny = node.y * rect.height;
        const dist = Math.hypot(mouseX - nx, mouseY - ny);
        if (dist < 26) found = idx;
      });

      hoveredNode = found;
      if (found !== null && heroTooltip) {
        const n = pipelineNodes[found];
        heroTooltip.innerHTML = `<span class="text-cyan font-bold">${n.name}:</span> <span>${n.desc}</span>`;
      }
    });

    heroCanvas.addEventListener("mouseleave", () => {
      hoveredNode = null;
      if (heroTooltip) {
        heroTooltip.innerHTML = `<i class="fas fa-info-circle text-cyan"></i> <span>Hover over any system node to inspect techniques, feature pipelines, and verified models.</span>`;
      }
    });

    heroCanvas.addEventListener("click", () => {
      if (hoveredNode !== null) {
        const targetSection = hoveredNode >= 3 ? "work" : "pipeline";
        const el = document.getElementById(targetSection);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    });

    // Visibility Observer to save performance
    const heroObserver = new IntersectionObserver((entries) => {
      isCanvasVisible = entries[0].isIntersecting;
      if (isCanvasVisible) renderHeroCanvas();
    }, { threshold: 0.1 });
    heroObserver.observe(heroCanvas);
  }

  // ==========================================================================
  // 3. AI SYSTEMS MAP (INTERACTIVE SKILL EXPLORER & LINKAGE)
  // ==========================================================================
  const mapBoardContainer = document.getElementById("systems-map-board");
  const mapFilterBtns = document.querySelectorAll("#map-category-filters .map-filter-btn");
  const mapResetBtn = document.getElementById("map-reset-btn");

  const inspectorSkillName = document.getElementById("inspector-skill-name");
  const inspectorSkillDesc = document.getElementById("inspector-skill-desc");
  const inspectorCatTag = document.getElementById("inspector-cat-tag");
  const inspectorLinkedProjects = document.getElementById("inspector-linked-projects");

  let activeMapCategory = "ALL";
  let activeSelectedSkill = null;

  const CATEGORY_NAMES = {
    FOUNDATIONS: "Foundations & Low-Level Memory",
    ML: "Machine Learning & Statistical Sampling",
    DL_VISION: "Deep Learning & Computer Vision",
    NLP_GENAI: "NLP & Generative AI Systems",
    SYSTEMS: "Engineering, Runtimes & Databases"
  };

  function renderSystemsMap() {
    if (!mapBoardContainer) return;

    // Filter skills by category
    const filteredSkills = activeMapCategory === "ALL" 
      ? SKILLS_ECOSYSTEM 
      : SKILLS_ECOSYSTEM.filter(s => s.category === activeMapCategory);

    // Group skills by category for clear architectural clustering
    const clusters = {};
    filteredSkills.forEach(s => {
      if (!clusters[s.category]) clusters[s.category] = [];
      clusters[s.category].push(s);
    });

    let html = "";
    Object.keys(clusters).forEach(catKey => {
      const groupSkills = clusters[catKey];
      html += `
        <div class="map-cluster-block">
          <div class="map-cluster-title">
            <i class="fas fa-layer-group text-cyan text-[10px]"></i>
            <span>${CATEGORY_NAMES[catKey] || catKey}</span>
          </div>
          <div class="map-nodes-wrap">
            ${groupSkills.map(s => {
              const isActive = activeSelectedSkill === s.id;
              return `
                <button type="button" class="map-skill-node ${isActive ? "active" : ""}" data-skill-id="${s.id}">
                  <span class="node-dot"></span>
                  <span>${s.name}</span>
                </button>
              `;
            }).join("")}
          </div>
        </div>
      `;
    });

    mapBoardContainer.innerHTML = html;

    // Attach click listeners to skill nodes
    const skillNodes = mapBoardContainer.querySelectorAll(".map-skill-node");
    skillNodes.forEach(btn => {
      btn.addEventListener("click", () => {
        const skillId = btn.getAttribute("data-skill-id");
        selectSkillNode(skillId);
      });
    });
  }

  function selectSkillNode(skillId) {
    activeSelectedSkill = skillId;
    const skillObj = SKILLS_ECOSYSTEM.find(s => s.id === skillId);
    if (!skillObj) return;

    // Update inspector view
    if (inspectorSkillName) inspectorSkillName.textContent = skillObj.name;
    if (inspectorSkillDesc) inspectorSkillDesc.textContent = skillObj.desc;
    if (inspectorCatTag) inspectorCatTag.textContent = skillObj.category;

    if (inspectorLinkedProjects) {
      const linkedProjs = PROJECTS_DATA.filter(p => skillObj.projects.includes(p.id));
      if (linkedProjs.length > 0) {
        inspectorLinkedProjects.innerHTML = linkedProjs.map(p => `
          <a href="#work" class="linked-project-row" data-proj-id="${p.id}">
            <div>
              <div class="linked-proj-name">${p.title}</div>
              <div class="font-mono text-low" style="font-size: 0.65rem;">${p.tagline}</div>
            </div>
            <span class="linked-proj-tag">[INSPECT]</span>
          </a>
        `).join("");

        // Attach click handlers to jump to and highlight that project
        const projRows = inspectorLinkedProjects.querySelectorAll(".linked-project-row");
        projRows.forEach(row => {
          row.addEventListener("click", (e) => {
            e.preventDefault();
            const pId = row.getAttribute("data-proj-id");
            const pIdx = PROJECTS_DATA.findIndex(p => p.id === pId);
            if (pIdx !== -1) {
              selectProject(pIdx, true);
              const workEl = document.getElementById("work");
              if (workEl) workEl.scrollIntoView({ behavior: "smooth" });
            }
          });
        });
      } else {
        inspectorLinkedProjects.innerHTML = `<div class="font-mono text-xs text-low">// Foundational coursework & lab implementations</div>`;
      }
    }

    renderSystemsMap();
  }

  // Category filter buttons
  mapFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      mapFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeMapCategory = btn.getAttribute("data-category");
      renderSystemsMap();
    });
  });

  if (mapResetBtn) {
    mapResetBtn.addEventListener("click", () => {
      activeMapCategory = "ALL";
      activeSelectedSkill = null;
      mapFilterBtns.forEach(b => b.classList.remove("active"));
      const allBtn = document.querySelector('#map-category-filters [data-category="ALL"]');
      if (allBtn) allBtn.classList.add("active");
      if (inspectorSkillName) inspectorSkillName.textContent = "Select Any Skill Node";
      if (inspectorSkillDesc) inspectorSkillDesc.textContent = "Click on any technology or algorithm node on the left to reveal its mathematical role, verified tools, and the exact portfolio projects where it is implemented.";
      if (inspectorCatTag) inspectorCatTag.textContent = "SELECT NODE";
      if (inspectorLinkedProjects) inspectorLinkedProjects.innerHTML = `<div class="font-mono text-xs text-low">// No skill node currently active</div>`;
      renderSystemsMap();
    });
  }

  renderSystemsMap();

  // ==========================================================================
  // 4. PROJECT MATRIX & ARCHITECTURE SPEC CONSOLE
  // ==========================================================================
  const masterListContainer = document.getElementById("project-master-list");
  const detailPanel = document.getElementById("project-detail-panel");
  const projFilterBtns = document.querySelectorAll("#project-filter-strip .proj-filter-btn");

  const modalElement = document.getElementById("spec-modal");
  const modalContent = document.getElementById("spec-modal-body");
  const modalTitle = document.getElementById("spec-modal-title");
  const modalCloseBtn = document.getElementById("spec-modal-close");
  const modalBackdrop = document.getElementById("spec-modal-backdrop");
  const docushieldSpecBtn = document.getElementById("btn-open-docushield-spec");

  let activeProjectIndex = 0;
  let activeProjectFilter = "ALL";

  function getFilteredProjects() {
    if (activeProjectFilter === "ALL") return PROJECTS_DATA;
    return PROJECTS_DATA.filter(p => p.category === activeProjectFilter);
  }

  function renderMasterList() {
    if (!masterListContainer) return;

    const filtered = getFilteredProjects();

    masterListContainer.innerHTML = `
      <div class="master-list-header">
        <span>INDEX // REPO</span>
        <span>STATUS</span>
      </div>
    `;

    filtered.forEach((project, fIdx) => {
      // Find global index in PROJECTS_DATA
      const globalIdx = PROJECTS_DATA.findIndex(p => p.id === project.id);
      const isActive = globalIdx === activeProjectIndex;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `master-item ${isActive ? "active" : ""}`;
      btn.setAttribute("data-global-index", globalIdx);
      btn.setAttribute("aria-label", `Inspect project ${project.title}`);

      const statusClass = project.status === "LIVE" ? "live" : "upcoming";

      btn.innerHTML = `
        <div class="master-item-meta">
          <span class="master-item-idx">${project.index} // ${project.categoryLabel}</span>
          <span class="master-item-tag ${statusClass}">${project.status}</span>
        </div>
        <div class="master-item-title">${project.title}</div>
      `;

      btn.addEventListener("click", () => {
        selectProject(globalIdx);
      });

      masterListContainer.appendChild(btn);
    });
  }

  function selectProject(globalIndex, shouldScroll = false) {
    activeProjectIndex = globalIndex;
    const project = PROJECTS_DATA[globalIndex];
    if (!project || !detailPanel) return;

    // Update active highlight on master buttons
    const items = masterListContainer.querySelectorAll(".master-item");
    items.forEach((item) => {
      const gIdx = parseInt(item.getAttribute("data-global-index"), 10);
      if (gIdx === globalIndex) {
        item.classList.add("active");
        if (shouldScroll && masterListContainer.scrollHeight > masterListContainer.clientHeight) {
          const itemOffset = item.offsetTop - masterListContainer.offsetTop;
          masterListContainer.scrollTo({ top: itemOffset, behavior: "smooth" });
        }
      } else {
        item.classList.remove("active");
      }
    });

    renderDetailPanel(project);
  }

  window.handlePreviewImageError = function(img, index, id) {
    if (img.src.endsWith(".png") && !img.dataset.triedJpg) {
      img.dataset.triedJpg = "true";
      img.src = img.src.replace(/\.png$/, ".jpg");
      return;
    }
    if (img.src.endsWith(".jpg") && !img.dataset.triedPng) {
      img.dataset.triedPng = "true";
      img.src = img.src.replace(/\.jpg$/, ".png");
      return;
    }
    const frame = img.closest(".detail-preview-frame");
    if (frame) {
      frame.style.height = "180px";
      frame.style.display = "flex";
      frame.style.alignItems = "center";
      frame.style.justifyContent = "center";
      frame.style.fontFamily = "var(--font-mono)";
      frame.style.fontSize = "0.8rem";
      frame.style.color = "var(--text-low)";
      frame.style.flexDirection = "column";
      frame.style.gap = "0.5rem";
      frame.innerHTML = `<i class="fas fa-terminal text-cyan text-xl"></i><span>[SYSTEM_SCHEMATIC // ${index}_${id}]</span>`;
    }
  };

  function renderDetailPanel(project) {
    const isLive = project.status === "LIVE";
    const statusClass = isLive ? "live" : "upcoming";

    let mediaPreview = "";
    if (project.image) {
      mediaPreview = `
        <div class="detail-preview-frame">
          <img src="${project.image}" alt="${project.title} Preview" loading="lazy" class="detail-preview-img" onerror="handlePreviewImageError(this, '${project.index}', '${project.id.toUpperCase()}')">
        </div>
      `;
    } else {
      mediaPreview = `
        <div class="detail-preview-frame" style="height: 180px; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-low); flex-direction: column; gap: 0.5rem;">
          <i class="fas fa-terminal text-cyan text-xl"></i>
          <span>[SYSTEM_SCHEMATIC // ${project.index}_${project.id.toUpperCase()}]</span>
        </div>
      `;
    }

    let liveBtn = "";
    if (project.liveUrl) {
      liveBtn = `
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          Launch Live App <i class="fas fa-external-link-alt text-[10px]"></i>
        </a>
      `;
    }

    let repoBtn = "";
    if (project.repoUrl) {
      repoBtn = `
        <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm">
          <i class="fab fa-github"></i> View Source
        </a>
      `;
    }

    detailPanel.innerHTML = `
      <div class="detail-header-bar">
        <span>PROJECT [${project.index}/${PROJECTS_DATA.length.toString().padStart(2, "0")}] // STATUS: ${project.status}</span>
        <span class="text-cyan">${project.categoryLabel}</span>
      </div>

      <div class="detail-content-body">
        <h3 class="detail-project-title">${project.title}</h3>
        <p class="detail-project-tagline">${project.tagline}</p>

        ${mediaPreview}

        <p class="text-mid" style="font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.65;">
          ${project.summary}
        </p>

        <!-- Technical Spec Grid -->
        <div class="detail-spec-grid">
          <div class="detail-spec-cell">
            <div class="spec-cell-title">
              <i class="fas fa-exclamation-triangle text-low"></i> Operational Challenge
            </div>
            <p class="spec-cell-text">${project.problem}</p>
          </div>
          <div class="detail-spec-cell">
            <div class="spec-cell-title">
              <i class="fas fa-check-circle text-cyan"></i> Engineering Solution
            </div>
            <p class="spec-cell-text">${project.solution}</p>
          </div>
        </div>

        <!-- Key Features List -->
        <div class="detail-features-block">
          <div class="features-title">KEY SYSTEM CAPABILITIES:</div>
          <ul class="features-list">
            ${project.features.map(f => `<li>${f}</li>`).join("")}
          </ul>
        </div>

        <!-- Tech Stack Chips -->
        <div class="detail-features-block">
          <div class="features-title">VERIFIED STACK & DEPENDENCIES:</div>
          <div class="detail-tech-row">
            ${project.tech.map(t => `<span class="tech-chip">${t}</span>`).join("")}
          </div>
        </div>

        <!-- Actions Bar -->
        <div class="detail-actions-bar">
          ${liveBtn}
          ${repoBtn}
          <button type="button" class="btn btn-sm" id="btn-open-case-study" data-idx="${activeProjectIndex}">
            <i class="fas fa-file-code"></i> Deep Architecture Spec
          </button>
        </div>
      </div>
    `;

    // Hook modal button
    const caseStudyBtn = document.getElementById("btn-open-case-study");
    if (caseStudyBtn) {
      caseStudyBtn.addEventListener("click", () => {
        openSpecModal(project);
      });
    }
  }

  // Project Category Filter Buttons
  projFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      projFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeProjectFilter = btn.getAttribute("data-filter");

      const filtered = getFilteredProjects();
      if (filtered.length > 0) {
        const firstGlobalIdx = PROJECTS_DATA.findIndex(p => p.id === filtered[0].id);
        renderMasterList();
        selectProject(firstGlobalIdx);
      } else {
        renderMasterList();
      }
    });
  });

  // Modal Handling with Architecture Pipeline Diagram
  function openSpecModal(project) {
    if (!modalElement || !modalContent || !modalTitle) return;

    modalTitle.textContent = `SPEC // ${project.index}: ${project.title}`;

    const pipelineStepsHtml = project.pipeline ? `
      <div class="arch-pipeline-block">
        <div class="features-title" style="margin-bottom: 0.75rem;">
          <i class="fas fa-project-diagram text-cyan"></i> END-TO-END DATA & INFERENCE PIPELINE:
        </div>
        <div class="pipeline-nodes-sequence">
          ${project.pipeline.map((step, idx) => `
            <div class="pipeline-node-item">
              <span class="node-title">${step.label}</span>
              <span class="node-sub">${step.sub}</span>
            </div>
            ${idx < project.pipeline.length - 1 ? `<span class="pipeline-arrow">&rarr;</span>` : ""}
          `).join("")}
        </div>
      </div>
    ` : "";

    modalContent.innerHTML = `
      <div>
        <p class="font-mono text-cyan" style="font-size: 0.85rem; margin-bottom: 0.5rem;">${project.tagline}</p>
        <p class="text-mid" style="line-height: 1.65; font-size: 0.9rem;">${project.summary}</p>
      </div>

      ${pipelineStepsHtml}

      <div class="detail-spec-grid" style="margin-bottom: 0;">
        <div class="detail-spec-cell">
          <div class="spec-cell-title"><i class="fas fa-exclamation-triangle"></i> Technical Challenge</div>
          <p class="spec-cell-text">${project.problem}</p>
        </div>
        <div class="detail-spec-cell">
          <div class="spec-cell-title"><i class="fas fa-check-circle text-cyan"></i> Algorithmic Solution</div>
          <p class="spec-cell-text">${project.solution}</p>
        </div>
      </div>

      <div>
        <div class="features-title">DETAILED SYSTEM CAPABILITIES:</div>
        <ul class="features-list">
          ${project.features.map(f => `<li>${f}</li>`).join("")}
        </ul>
      </div>

      <div>
        <div class="features-title">VERIFIED TECHNOLOGIES:</div>
        <div class="detail-tech-row">
          ${project.tech.map(t => `<span class="tech-chip">${t}</span>`).join("")}
        </div>
      </div>

      <div style="display: flex; gap: 0.75rem; border-top: 1px solid var(--line); padding-top: 1rem;">
        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Launch Live App</a>` : ""}
        ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm"><i class="fab fa-github"></i> View GitHub Repository</a>` : ""}
      </div>
    `;

    modalElement.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSpecModal() {
    if (!modalElement) return;
    modalElement.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeSpecModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeSpecModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalElement && modalElement.classList.contains("active")) {
      closeSpecModal();
    }
  });

  if (docushieldSpecBtn) {
    docushieldSpecBtn.addEventListener("click", () => {
      const ds = PROJECTS_DATA.find(p => p.id === "docushield");
      if (ds) openSpecModal(ds);
    });
  }

  // Initial render
  renderMasterList();
  selectProject(0, false);

  // ==========================================================================
  // 5. MODEL PIPELINE VISUALIZER ("HOW I BUILD INTELLIGENT SYSTEMS")
  // ==========================================================================
  const pipelineStepsBar = document.getElementById("pipeline-steps-bar");
  const pipelineDetailBox = document.getElementById("pipeline-detail-box");
  let activePipelineStep = 0;

  function renderPipelineVisualizer() {
    if (!pipelineStepsBar || !pipelineDetailBox) return;

    // Render 7 buttons
    pipelineStepsBar.innerHTML = PIPELINE_STAGES.map((st, idx) => `
      <button type="button" class="pipeline-step-btn ${idx === activePipelineStep ? "active" : ""}" data-step-idx="${idx}">
        <span class="step-btn-num">STAGE // ${st.step}</span>
        <span class="step-btn-name">${st.title.split(" & ")[0]}</span>
      </button>
    `).join("");

    const btns = pipelineStepsBar.querySelectorAll(".pipeline-step-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-step-idx"), 10);
        selectPipelineStage(idx);
      });
    });

    // Render Detail Box
    const current = PIPELINE_STAGES[activePipelineStep];
    pipelineDetailBox.innerHTML = `
      <div>
        <div class="pipeline-detail-header">
          <span>LIFECYCLE STAGE [${current.step}/07]</span>
        </div>
        <h3 class="pipeline-detail-title">${current.title}</h3>
        <p class="pipeline-detail-desc">${current.desc}</p>
        <p class="pipeline-detail-rationale">${current.rationale}</p>
      </div>

      <div style="border-left: 1px solid var(--line); padding-left: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="features-title">RELEVANT TOOLS & LIBRARIES:</div>
          <div class="detail-tech-row" style="margin-bottom: 1.25rem;">
            ${current.tools.map(t => `<span class="tech-chip">${t}</span>`).join("")}
          </div>

          <div class="features-title">PORTFOLIO CASE STUDY EXAMPLES:</div>
          <div class="font-mono text-cyan" style="font-size: 0.8rem;">
            ${current.projects.map(p => `<div>&rarr; ${p}</div>`).join("")}
          </div>
        </div>

        <div class="font-mono text-low" style="font-size: 0.65rem; padding-top: 1rem; border-top: 1px solid var(--line);">
          INTENTIONAL DISCIPLINE // PRODUCTION-AWARE
        </div>
      </div>
    `;
  }

  function selectPipelineStage(idx) {
    activePipelineStep = idx;
    renderPipelineVisualizer();
  }

  renderPipelineVisualizer();

  // ==========================================================================
  // 6. LEETCODE TELEMETRY READOUT (API SYNC + CACHE + PROXY)
  // ==========================================================================
  const leetcodeUsername = "cseabhinav2005";
  const localProxyUrl = `/api/leetcode?username=${leetcodeUsername}`;
  const deployedProxyUrl = `https://coderabhinavanand.netlify.app/api/leetcode?username=${leetcodeUsername}`;
  const secondaryApiUrl = `https://leetcode-api-1.vercel.app/${leetcodeUsername}`;

  const FALLBACK_LEETCODE = {
    totalSolved: 10,
    totalQuestions: 4042,
    easySolved: 7,
    totalEasy: 962,
    mediumSolved: 3,
    totalMedium: 2109,
    hardSolved: 0,
    totalHard: 971,
    ranking: "5,000,001+",
    contributionPoints: 0,
    reputation: 0,
    recentSubmissions: [
      { title: "Valid Palindrome", titleSlug: "valid-palindrome", lang: "C++", timestamp: "1788381261", statusDisplay: "Accepted" },
      { title: "Arranging Coins", titleSlug: "arranging-coins", lang: "C++", timestamp: "1787821704", statusDisplay: "Accepted" },
      { title: "Boats to Save People", titleSlug: "boats-to-save-people", lang: "C++", timestamp: "1787819754", statusDisplay: "Accepted" },
      { title: "Count of Matches in Tournament", titleSlug: "count-of-matches-in-tournament", lang: "C++", timestamp: "1787289501", statusDisplay: "Accepted" }
    ]
  };

  const statSolved = document.getElementById("leetcode-stat-solved");
  const statRank = document.getElementById("leetcode-stat-rank");
  const statPoints = document.getElementById("leetcode-stat-points");
  const statRep = document.getElementById("leetcode-stat-rep");

  const easyBar = document.getElementById("diff-bar-easy");
  const easyScore = document.getElementById("diff-score-easy");
  const medBar = document.getElementById("diff-bar-medium");
  const medScore = document.getElementById("diff-score-medium");
  const hardBar = document.getElementById("diff-bar-hard");
  const hardScore = document.getElementById("diff-score-hard");

  const submissionsTableBody = document.getElementById("submissions-table-body");
  const syncBtn = document.getElementById("leetcode-sync-btn");
  const syncStatus = document.getElementById("leetcode-sync-status");
  const lastSyncedEl = document.getElementById("leetcode-last-synced");

  function formatTimeAgo(timestamp) {
    if (!timestamp) return "Recently";
    const seconds = Math.floor(Date.now() / 1000 - parseInt(timestamp, 10));
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  function updateSyncStatus(statusText, timeText, isError = false) {
    if (syncStatus) {
      syncStatus.textContent = statusText;
      syncStatus.style.color = isError ? "#f87171" : "";
    }
    if (lastSyncedEl) {
      lastSyncedEl.textContent = timeText || "";
    }
  }

  function renderLeetCodeTelemetry(data) {
    if (statSolved) statSolved.textContent = data.totalSolved;
    if (statRank) statRank.textContent = typeof data.ranking === "number" ? data.ranking.toLocaleString() : data.ranking;
    if (statPoints) statPoints.textContent = data.contributionPoints ?? data.contributionPoint ?? 0;
    if (statRep) statRep.textContent = data.reputation ?? 0;

    // Difficulty Bars
    const easyPct = data.totalEasy > 0 ? (data.easySolved / data.totalEasy) * 100 : 0;
    if (easyScore) easyScore.textContent = `${data.easySolved} / ${data.totalEasy}`;
    if (easyBar) easyBar.style.width = `${Math.max(easyPct, 1.5)}%`;

    const medPct = data.totalMedium > 0 ? (data.mediumSolved / data.totalMedium) * 100 : 0;
    if (medScore) medScore.textContent = `${data.mediumSolved} / ${data.totalMedium}`;
    if (medBar) medBar.style.width = `${Math.max(medPct, 1.5)}%`;

    const hardPct = data.totalHard > 0 ? (data.hardSolved / data.totalHard) * 100 : 0;
    if (hardScore) hardScore.textContent = `${data.hardSolved} / ${data.totalHard}`;
    if (hardBar) hardBar.style.width = `${Math.max(hardPct, 0)}%`;

    // Submissions Table
    if (submissionsTableBody && data.recentSubmissions && data.recentSubmissions.length > 0) {
      submissionsTableBody.innerHTML = data.recentSubmissions.map(sub => `
        <tr>
          <td><strong class="text-hi">${sub.title}</strong></td>
          <td><span class="font-mono text-cyan">${sub.lang || "C++"}</span></td>
          <td><span style="color: var(--accent-green);">● ${sub.statusDisplay || "Accepted"}</span></td>
          <td><span class="text-low">${formatTimeAgo(sub.timestamp)}</span></td>
        </tr>
      `).join("");
    }
  }

  async function fetchLeetCodeData(forceRefresh = false) {
    const cached = localStorage.getItem("lc-console-data");
    const cachedTime = localStorage.getItem("lc-console-time");

    // Use cache if under 30 minutes and not force refreshing
    if (!forceRefresh && cached && cachedTime && (Date.now() - parseInt(cachedTime, 10) < 30 * 60 * 1000)) {
      try {
        const parsed = JSON.parse(cached);
        renderLeetCodeTelemetry(parsed);
        updateSyncStatus("CACHED DATA (OFFLINE SYNC)", `SYNCED: ${formatTimeAgo(Math.floor(parseInt(cachedTime, 10) / 1000))}`);
        return;
      } catch (e) {}
    }

    updateSyncStatus("SYNCING TELEMETRY...", "CONNECTING TO PROXY...");

    const endpoints = [localProxyUrl, deployedProxyUrl, secondaryApiUrl];
    let fetchedData = null;

    for (const url of endpoints) {
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(4500) });
        if (!res.ok) continue;
        const json = await res.json();

        // Standardize schema
        if (json.totalSolved !== undefined) {
          fetchedData = json;
          break;
        }
      } catch (err) {
        // try next endpoint
      }
    }

    if (fetchedData) {
      localStorage.setItem("lc-console-data", JSON.stringify(fetchedData));
      localStorage.setItem("lc-console-time", Date.now().toString());
      renderLeetCodeTelemetry(fetchedData);
      updateSyncStatus("LIVE SYNCED", `SYNCED: Just now`);
    } else {
      // Fallback
      renderLeetCodeTelemetry(FALLBACK_LEETCODE);
      updateSyncStatus("OFFLINE ARCHIVE BASELINE", "VERIFIED BENCHMARK");
    }
  }

  if (syncBtn) {
    syncBtn.addEventListener("click", () => fetchLeetCodeData(true));
  }
  fetchLeetCodeData();

  // ==========================================================================
  // 7. GITHUB CREDIBILITY SIGNAL
  // ==========================================================================
  const ghRepoCountEl = document.getElementById("gh-repo-count");
  const ghRepoSyncEl = document.getElementById("gh-repo-sync");

  async function fetchGitHubMetrics() {
    try {
      const res = await fetch("https://api.github.com/users/abhinavbuilds2005", {
        headers: { Accept: "application/vnd.github.v3+json" },
        signal: AbortSignal.timeout(3500)
      });
      if (res.ok) {
        const data = await res.json();
        if (ghRepoCountEl && data.public_repos) ghRepoCountEl.textContent = data.public_repos;
        if (ghRepoSyncEl) ghRepoSyncEl.textContent = "● Live";
      }
    } catch (e) {
      if (ghRepoSyncEl) ghRepoSyncEl.textContent = "● Baseline";
    }
  }
  fetchGitHubMetrics();

  // ==========================================================================
  // 8. BUILD LOG (ENGINEERING JOURNAL)
  // ==========================================================================
  const buildLogContainer = document.getElementById("build-log-grid");
  if (buildLogContainer) {
    buildLogContainer.innerHTML = BUILD_LOG_ENTRIES.map(entry => `
      <div class="build-log-card">
        <div class="build-log-meta">
          <span class="build-log-id">${entry.id}</span>
          <span>${entry.date}</span>
        </div>
        <h3 class="build-log-title">${entry.title}</h3>
        <p class="build-log-text">${entry.text}</p>
        <div class="build-log-tags">
          ${entry.tags.map(t => `<span class="build-log-tag">${t}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  // ==========================================================================
  // 9. WEB3FORMS REAL CONTACT INTEGRATION
  // ==========================================================================
  const contactForm = document.getElementById("contactForm");
  const formButton = document.getElementById("formButton");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (formButton) {
        formButton.innerHTML = "Transmitting... <i class='fas fa-spinner fa-spin'></i>";
        formButton.disabled = true;
      }

      const formData = new FormData(contactForm);
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
          signal: AbortSignal.timeout(8000)
        });
        const result = await response.json();

        if (result.success) {
          if (formStatus) {
            formStatus.className = "form-status success";
            formStatus.style.display = "block";
            formStatus.innerHTML = "<i class='fas fa-check-circle'></i> Transmission confirmed. Message delivered to Abhinav Anand.";
          }
          contactForm.reset();
        } else {
          throw new Error(result.message || "Failed to submit");
        }
      } catch (err) {
        if (formStatus) {
          formStatus.className = "form-status error";
          formStatus.style.display = "block";
          formStatus.innerHTML = "<i class='fas fa-exclamation-triangle'></i> Transmission error. Please email directly at <a href='mailto:abhinavanand9996@gmail.com' style='color:#ffffff; text-decoration:underline;'>abhinavanand9996@gmail.com</a>";
        }
      } finally {
        if (formButton) {
          formButton.innerHTML = "Transmit Message <i class='fas fa-paper-plane text-xs'></i>";
          formButton.disabled = false;
        }
      }
    });
  }

  // ==========================================================================
  // 10. PORTFOLIO ASSISTANT ("ASK ABHINAV'S PORTFOLIO")
  // ==========================================================================
  const assistantLauncher = document.getElementById("assistant-launcher");
  const assistantDrawer = document.getElementById("assistant-drawer");
  const assistantCloseBtn = document.getElementById("assistant-close-btn");
  const assistantLogs = document.getElementById("assistant-logs");
  const assistantInput = document.getElementById("assistant-input");
  const assistantSendBtn = document.getElementById("assistant-send-btn");
  const assistantChips = document.querySelectorAll(".assistant-chip-btn");

  const KNOWLEDGE_BASE = [
    {
      keywords: ["who", "about", "bio", "background", "student"],
      response: "Abhinav Anand is a 2nd-year B.Tech CSE student specializing in AI & Machine Learning at Lovely Professional University, India. He builds practical intelligent systems across computer vision, forensic document verification, and predictive ML."
    },
    {
      keywords: ["docushield", "flagship", "sih", "hackathon", "forensic"],
      response: "DocuShield AI is Abhinav's flagship project for Smart India Hackathon (SIH 2026, Problem Statement SIH26188). It is a multimodal forensic screening system that verifies Passports, Visas, and Aadhaar cards using Error Level Analysis (ELA), copy-move tampering detection, ICAO MRZ check digits, Verhoeff checksums, and face verification. Live demo: docushield-ai-s1x9.onrender.com"
    },
    {
      keywords: ["tech", "stack", "skills", "tools", "languages"],
      response: "Abhinav's core stack includes Python, PyTorch, Scikit-Learn, OpenCV, and C++ for algorithms, backed by FastAPI, PostgreSQL, and Docker. Explore Section [02] // AI.SYSTEMS_MAP for the interactive technical graph."
    },
    {
      keywords: ["project", "projects", "creditwise", "presentai", "smartcart", "elevatecv"],
      response: "Key deployed projects include: 1. DocuShield AI (Forensics), 2. CreditWise (Loan Risk via SMOTE & Logistic Regression), 3. SmartCart AI (K-Means & PCA Churn Prediction), 4. PresentAI (Multimodal FaceNet+Voice Biometrics), and 5. ATS Resume Analyzer (spaCy & Sentence Transformers). Check Section [03] // PROJECT.MATRIX."
    },
    {
      keywords: ["internship", "hire", "job", "available", "role", "work"],
      response: "Yes! Abhinav is actively seeking AI/ML Engineer and Junior Machine Learning internships (remote or on-site). He is available for immediate onboarding. You can contact him via Section [07] // COMMS.CONTACT or email abhinavanand9996@gmail.com."
    },
    {
      keywords: ["resume", "cv", "pdf", "download"],
      response: "You can view and download his specialized AI/ML Curriculum Vitae right here: <a href='Abhinav_Anand_Resume_AIML_Specialized.pdf' target='_blank' style='color:var(--accent-cyan); text-decoration:underline;'>Download AI/ML CV (PDF)</a>."
    },
    {
      keywords: ["contact", "email", "reach", "message", "linkedin"],
      response: "You can reach Abhinav directly via email at abhinavanand9996@gmail.com, connect on LinkedIn (/in/abhinav-anand-865926300), or transmit a message using the form in Section [07]."
    }
  ];

  function toggleAssistant() {
    if (!assistantDrawer) return;
    assistantDrawer.classList.toggle("hidden");
    if (!assistantDrawer.classList.contains("hidden") && assistantInput) {
      assistantInput.focus();
    }
  }

  if (assistantLauncher) assistantLauncher.addEventListener("click", toggleAssistant);
  if (assistantCloseBtn) assistantCloseBtn.addEventListener("click", toggleAssistant);

  function handleAssistantQuery(query) {
    if (!query.trim() || !assistantLogs) return;

    // Add user message
    const userMsg = document.createElement("div");
    userMsg.className = "assistant-msg user";
    userMsg.textContent = query;
    assistantLogs.appendChild(userMsg);

    // Find match
    const cleanQ = query.toLowerCase();
    let bestMatch = null;
    let maxMatches = 0;

    KNOWLEDGE_BASE.forEach(item => {
      const matchCount = item.keywords.filter(k => cleanQ.includes(k)).length;
      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        bestMatch = item;
      }
    });

    const botMsg = document.createElement("div");
    botMsg.className = "assistant-msg bot";

    if (bestMatch && maxMatches > 0) {
      botMsg.innerHTML = bestMatch.response;
    } else {
      botMsg.innerHTML = "I can answer questions about Abhinav's AI projects (DocuShield, CreditWise), technical toolchains (PyTorch, FastAPI, C++), resume downloads, or internship availability. Try asking 'What is DocuShield AI?' or 'Is he available for internships?'";
    }

    assistantLogs.appendChild(botMsg);
    assistantLogs.scrollTop = assistantLogs.scrollHeight;
    if (assistantInput) assistantInput.value = "";
  }

  if (assistantSendBtn && assistantInput) {
    assistantSendBtn.addEventListener("click", () => handleAssistantQuery(assistantInput.value));
    assistantInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleAssistantQuery(assistantInput.value);
    });
  }

  assistantChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const q = chip.getAttribute("data-query");
      handleAssistantQuery(q);
    });
  });

  // ==========================================================================
  // 11. COMMAND PALETTE (CMD+K / CTRL+K)
  // ==========================================================================
  const cmdPalette = document.getElementById("command-palette");
  const cmdPaletteInput = document.getElementById("cmd-palette-input");
  const cmdPaletteList = document.getElementById("cmd-palette-list");
  const cmdPaletteBackdrop = document.getElementById("cmd-palette-backdrop");
  const cmdTriggerSidebar = document.getElementById("cmd-palette-btn");
  const cmdTriggerMobile = document.getElementById("mobile-cmd-btn");

  let selectedCmdIndex = 0;
  let filteredCommands = [];

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  const COMMAND_REGISTRY = [
    // Navigation
    { id: "nav-home", group: "Navigation", label: "01 // System Overview", hint: "#home", action: () => scrollToSection("home") },
    { id: "nav-map", group: "Navigation", label: "02 // AI Systems Knowledge Map", hint: "#systems-map", action: () => scrollToSection("systems-map") },
    { id: "nav-work", group: "Navigation", label: "03 // Project Matrix & Case Studies", hint: "#work", action: () => scrollToSection("work") },
    { id: "nav-pipeline", group: "Navigation", label: "04 // Model Pipeline Lifecycle", hint: "#pipeline", action: () => scrollToSection("pipeline") },
    { id: "nav-telemetry", group: "Navigation", label: "05 // LeetCode Telemetry & Metrics", hint: "#telemetry", action: () => scrollToSection("telemetry") },
    { id: "nav-log", group: "Navigation", label: "06 // Engineering Build Log", hint: "#build-log", action: () => scrollToSection("build-log") },
    { id: "nav-contact", group: "Navigation", label: "07 // Comms & Transmission Console", hint: "#contact", action: () => scrollToSection("contact") },

    // Projects
    { id: "proj-0", group: "Projects", label: "DocuShield AI: Multimodal Forensic Screening (SIH '26)", hint: "FORENSICS", action: () => { selectProject(0); scrollToSection("work"); } },
    { id: "proj-1", group: "Projects", label: "CreditWise: AI Loan Risk & Underwriting", hint: "PREDICTIVE ML", action: () => { selectProject(1); scrollToSection("work"); } },
    { id: "proj-2", group: "Projects", label: "SmartCart AI: Customer Churn & PCA Segmentation", hint: "PREDICTIVE ML", action: () => { selectProject(2); scrollToSection("work"); } },
    { id: "proj-3", group: "Projects", label: "PresentAI: Multimodal Biometric Attendance", hint: "BIOMETRICS", action: () => { selectProject(3); scrollToSection("work"); } },
    { id: "proj-4", group: "Projects", label: "ATS Resume Analyzer: 5-Dim NLP Matcher", hint: "NLP & GENAI", action: () => { selectProject(4); scrollToSection("work"); } },

    // Actions
    { id: "act-cv", group: "Actions", label: "Download Specialized AI/ML Resume (PDF)", hint: "FILE", action: () => window.open("Abhinav_Anand_Resume_AIML_Specialized.pdf", "_blank") },
    { id: "act-gh", group: "Actions", label: "Open GitHub Profile (@abhinavbuilds2005)", hint: "EXTERNAL", action: () => window.open("https://github.com/abhinavbuilds2005", "_blank") },
    { id: "act-li", group: "Actions", label: "Open LinkedIn Profile (/in/abhinav-anand-865926300)", hint: "EXTERNAL", action: () => window.open("https://www.linkedin.com/in/abhinav-anand-865926300", "_blank") },
    { id: "act-lc-sync", group: "Actions", label: "Re-Sync LeetCode Telemetry", hint: "API", action: () => { scrollToSection("telemetry"); fetchLeetCodeData(true); } }
  ];

  function openCommandPalette() {
    if (!cmdPalette) return;
    cmdPalette.removeAttribute("hidden");
    selectedCmdIndex = 0;
    if (cmdPaletteInput) {
      cmdPaletteInput.value = "";
      cmdPaletteInput.focus();
    }
    renderCommandList("");
    document.body.style.overflow = "hidden";
  }

  function closeCommandPalette() {
    if (!cmdPalette) return;
    cmdPalette.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  function renderCommandList(query) {
    if (!cmdPaletteList) return;
    const cleanQ = query.trim().toLowerCase();

    filteredCommands = cleanQ === "" 
      ? COMMAND_REGISTRY 
      : COMMAND_REGISTRY.filter(cmd => cmd.label.toLowerCase().includes(cleanQ) || cmd.group.toLowerCase().includes(cleanQ) || cmd.hint.toLowerCase().includes(cleanQ));

    if (filteredCommands.length === 0) {
      cmdPaletteList.innerHTML = `<div class="font-mono text-xs text-low" style="padding:1rem; text-align:center;">NO COMMANDS MATCHING "${query.toUpperCase()}"</div>`;
      return;
    }

    if (selectedCmdIndex >= filteredCommands.length) selectedCmdIndex = 0;

    let html = "";
    let curGroup = "";
    filteredCommands.forEach((cmd, idx) => {
      if (cmd.group !== curGroup) {
        curGroup = cmd.group;
        html += `<div class="cmd-group-label">${curGroup}</div>`;
      }
      const isSelected = idx === selectedCmdIndex;
      html += `
        <div class="cmd-item ${isSelected ? "selected" : ""}" data-idx="${idx}">
          <div>
            <i class="fas fa-chevron-right text-cyan text-[10px]" style="margin-right: 0.5rem;"></i>
            <span>${cmd.label}</span>
          </div>
          <span class="font-mono text-low text-[10px]">${cmd.hint}</span>
        </div>
      `;
    });

    cmdPaletteList.innerHTML = html;

    const items = cmdPaletteList.querySelectorAll(".cmd-item");
    items.forEach(el => {
      el.addEventListener("click", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        executeCommand(idx);
      });
    });
  }

  function executeCommand(idx) {
    const cmd = filteredCommands[idx];
    if (cmd && cmd.action) {
      closeCommandPalette();
      cmd.action();
    }
  }

  if (cmdTriggerSidebar) cmdTriggerSidebar.addEventListener("click", openCommandPalette);
  if (cmdTriggerMobile) cmdTriggerMobile.addEventListener("click", openCommandPalette);
  if (cmdPaletteBackdrop) cmdPaletteBackdrop.addEventListener("click", closeCommandPalette);

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (cmdPalette && cmdPalette.hasAttribute("hidden")) {
        openCommandPalette();
      } else {
        closeCommandPalette();
      }
    } else if (e.key === "Escape" && cmdPalette && !cmdPalette.hasAttribute("hidden")) {
      closeCommandPalette();
    } else if (!cmdPalette.hasAttribute("hidden")) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedCmdIndex = (selectedCmdIndex + 1) % filteredCommands.length;
        renderCommandList(cmdPaletteInput ? cmdPaletteInput.value : "");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedCmdIndex = (selectedCmdIndex - 1 + filteredCommands.length) % filteredCommands.length;
        renderCommandList(cmdPaletteInput ? cmdPaletteInput.value : "");
      } else if (e.key === "Enter") {
        e.preventDefault();
        executeCommand(selectedCmdIndex);
      }
    }
  });

  if (cmdPaletteInput) {
    cmdPaletteInput.addEventListener("input", (e) => {
      selectedCmdIndex = 0;
      renderCommandList(e.target.value);
    });
  }

  // ==========================================================================
  // 12. NAVIGATION SCROLL-SPY & MOBILE MENU
  // ==========================================================================
  const navItems = document.querySelectorAll(".sidebar-nav .nav-item");
  const observedSections = document.querySelectorAll(".console-section[id]");

  function onScrollSpy() {
    const scrollPos = window.scrollY + 180;
    observedSections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach((item) => {
          if (item.getAttribute("href") === `#${id}`) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  }
  window.addEventListener("scroll", onScrollSpy, { passive: true });
  onScrollSpy();

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const sidebar = document.getElementById("sidebar");

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("open");
      });
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Live UTC Clock
  const clockEl = document.getElementById("sys-clock");
  function updateClock() {
    if (clockEl) {
      const d = new Date();
      clockEl.textContent = d.toISOString().substring(11, 19);
    }
  }
  setInterval(updateClock, 1000);
  updateClock();
});
