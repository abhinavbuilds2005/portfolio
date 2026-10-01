export interface PipelineStage {
  step: string;
  title: string;
  shortTitle: string;
  summary: string;
  desc: string;
  rationale: string;
  tools: string[];
  projects: string[];
  metricsNote: string;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    step: "01",
    title: "Problem Definition & Data Ingestion",
    shortTitle: "Ingestion & Validation",
    summary: "Framing the ML task (supervised, unsupervised, or forensic) and establishing rigorous data validation schemas.",
    desc: "Every project starts by understanding operational stakes. Before touching models, I define target labels, check for distribution drift, audit class balance, and establish clean deterministic data schemas.",
    rationale: "Garbage in, garbage out. A poorly framed problem or corrupted labels cannot be rescued by advanced architectures.",
    tools: ["Pandas", "NumPy", "Pydantic Schemas", "OpenCV"],
    projects: ["CreditWise", "DocuShield AI"],
    metricsNote: "Schema validity: 100% | Zero type coercion errors"
  },
  {
    step: "02",
    title: "Preprocessing & Normalization",
    shortTitle: "Preprocessing & Noise",
    summary: "Transforming raw noisy inputs into standardized, clean representations.",
    desc: "Handling layout-aware text parsing, multi-column PDF desegmentation, image resizing, morphological noise filtering, and missing-value imputation without data leakage.",
    rationale: "Feature leakage during normalization is one of the most common causes of high validation scores that collapse in production.",
    tools: ["spaCy", "OpenCV", "Scikit-Learn Preprocessing", "EasyOCR"],
    projects: ["ATS Resume Analyzer", "DocuShield AI"],
    metricsNote: "Eliminates multi-column layout scramble across PDFs"
  },
  {
    step: "03",
    title: "Feature Engineering & Dimensionality",
    shortTitle: "Feature Engineering",
    summary: "Extracting high-leverage domain representations and mitigating the curse of dimensionality.",
    desc: "Formulating debt-to-income weights, installment ratios, acoustic pitch frequencies, and applying PCA (Principal Component Analysis) to compress sparse matrices.",
    rationale: "Clever feature representations consistently outperform brute-force parameter scaling on small to medium datasets.",
    tools: ["PCA", "Scikit-Learn", "NumPy", "Sentence Transformers"],
    projects: ["SmartCart AI", "CreditWise"],
    metricsNote: "Preserves >90% variance while reducing dimensions by 70%"
  },
  {
    step: "04",
    title: "Model Selection & Inductive Bias",
    shortTitle: "Model Selection",
    summary: "Selecting the simplest architecture that satisfies accuracy and latency constraints.",
    desc: "Comparing regularized linear baselines against deep neural embeddings. Prioritizing statistical interpretability for loan underwriting, and convolutional representations for image forensics.",
    rationale: "Over-parameterized models introduce unnecessary inference cost and hidden failure modes. Start simple, baseline thoroughly.",
    tools: ["Scikit-Learn", "PyTorch", "FaceNet", "VGG-19"],
    projects: ["CreditWise", "AttendPro"],
    metricsNote: "Logistic baseline vs Deep Embeddings benchmarked"
  },
  {
    step: "05",
    title: "Rigorous Metric Evaluation",
    shortTitle: "Evaluation & PR-AUC",
    summary: "Auditing models with metric sensitivity tailored to real-world cost functions.",
    desc: "Refusing to rely on raw accuracy. Enforcing Precision-Recall AUC curves, silhouette coefficients, confusion matrices, and test-set verification.",
    rationale: "A 99% accuracy model that predicts the majority class on an imbalanced dataset is worthless in an underwriting environment.",
    tools: ["PR-AUC Curves", "Matplotlib", "Seaborn", "Confusion Matrices"],
    projects: ["CreditWise", "DocuShield AI"],
    metricsNote: "Precision-Recall AUC prioritized over skewed accuracy"
  },
  {
    step: "06",
    title: "Deployment & API Runtimes",
    shortTitle: "API Runtimes & Docker",
    summary: "Wrapping models into low-latency asynchronous microservices and container runtimes.",
    desc: "Packaging inference pipelines into FastAPI REST endpoints with Pydantic validation, Streamlit UI controllers, and reproducible Docker images.",
    rationale: "A model stuck in a Jupyter Notebook provides zero tangible value. Production requires clear contracts, health endpoints, and isolation.",
    tools: ["FastAPI", "Docker", "Streamlit", "Render / Vercel"],
    projects: ["DocuShield AI", "ElevateCV"],
    metricsNote: "Sub-250ms p95 latency on serverless/container runtimes"
  },
  {
    step: "07",
    title: "Resilience & Fallback Engineering",
    shortTitle: "Resilience & Fallbacks",
    summary: "Designing fault-tolerant pipelines with deterministic backups for external service failures.",
    desc: "Building automatic fallback mechanisms: when external LLMs or third-party APIs time out, the system automatically falls back to deterministic rule sets and local heuristics.",
    rationale: "Intelligent systems must degrade gracefully under adverse network partitions or rate limits rather than crashing.",
    tools: ["Deterministic Fallbacks", "Local Caching", "Timeout Guards"],
    projects: ["ATS Resume Analyzer", "DocuShield AI"],
    metricsNote: "100% uptime with graceful deterministic degradation"
  }
];
