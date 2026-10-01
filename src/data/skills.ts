export type SkillCategory = 'ALL' | 'FOUNDATIONS' | 'ML' | 'DL_VISION' | 'NLP_GENAI' | 'SYSTEMS';

export interface SkillItem {
  id: string;
  name: string;
  category: 'FOUNDATIONS' | 'ML' | 'DL_VISION' | 'NLP_GENAI' | 'SYSTEMS';
  categoryLabel: string;
  desc: string;
  mathRole?: string;
  tools: string[];
  projects: string[]; // project ids
  level: 'Expert' | 'Advanced' | 'Proficient';
  icon?: string;
}

export const SKILL_CATEGORIES: { id: SkillCategory; label: string; icon: string }[] = [
  { id: 'ALL', label: 'All Domains', icon: 'Layers' },
  { id: 'FOUNDATIONS', label: 'Foundations', icon: 'Terminal' },
  { id: 'ML', label: 'Machine Learning', icon: 'Brain' },
  { id: 'DL_VISION', label: 'Deep Learning & Vision', icon: 'Eye' },
  { id: 'NLP_GENAI', label: 'NLP & Generative AI', icon: 'Sparkles' },
  { id: 'SYSTEMS', label: 'Engineering & Backend', icon: 'Server' },
];

export const SKILLS_ECOSYSTEM: SkillItem[] = [
  // --- FOUNDATIONS ---
  {
    id: 'python',
    name: 'Python',
    category: 'FOUNDATIONS',
    categoryLabel: 'Foundations',
    desc: 'Core language for tensor computations, scientific computing, PyTorch architectures, and asynchronous microservices.',
    mathRole: 'Vectorized linear algebra (NumPy), automated differentiation graphs, and high-performance async event loops.',
    tools: ['NumPy', 'Pandas', 'AsyncIO', 'Multiprocessing', 'Type Hints'],
    projects: ['docushield', 'creditwise', 'smartcart', 'presentai', 'elevatecv'],
    level: 'Expert'
  },
  {
    id: 'cpp',
    name: 'C++ (DSA & Memory)',
    category: 'FOUNDATIONS',
    categoryLabel: 'Foundations',
    desc: 'Low-level memory management, pointers, dynamic programming, and asymptotic algorithmic complexity reduction verified on LeetCode.',
    mathRole: 'Cache-locality optimization, asymptotic big-O complexity reduction, custom graph traversal and bitwise algorithms.',
    tools: ['STL', 'Pointers & Memory', 'Graph Algorithms', 'Dynamic Programming', 'C++17/20'],
    projects: ['portfolio'],
    level: 'Advanced'
  },
  {
    id: 'sql',
    name: 'SQL & Schema Design',
    category: 'FOUNDATIONS',
    categoryLabel: 'Foundations',
    desc: 'Relational schema engineering, 3NF normalization, ACID transaction integrity, window functions, and indexing in PostgreSQL.',
    mathRole: 'Relational tuple calculus, B-Tree index traversal cost optimization, and ACID serializability guarantees.',
    tools: ['PostgreSQL', 'Window Functions', 'Query Optimization', 'Foreign Key Cascades', 'Schema Migrations'],
    projects: ['presentai', 'docushield'],
    level: 'Advanced'
  },
  {
    id: 'math-stats',
    name: 'Statistics & Linear Algebra',
    category: 'FOUNDATIONS',
    categoryLabel: 'Foundations',
    desc: 'Probability distributions, covariance matrices, vector spaces, eigenvalues/eigenvectors, and loss gradient formulations.',
    mathRole: 'Singular Value Decomposition (SVD), multivariate Gaussian modeling, Bayes theorem, and stochastic gradient descent.',
    tools: ['Probability Theory', 'Eigen-Decomposition', 'Multivariate Calculus', 'Hypothesis Testing', 'Loss Surfaces'],
    projects: ['creditwise', 'smartcart', 'docushield'],
    level: 'Advanced'
  },

  // --- MACHINE LEARNING ---
  {
    id: 'scikit-learn',
    name: 'Scikit-Learn',
    category: 'ML',
    categoryLabel: 'Machine Learning',
    desc: 'Regularized estimators, ensemble trees, cross-validation pipelines, and custom column transformers.',
    mathRole: 'L1/L2 ridge and lasso shrinkage penalty formulation, convex loss function optimization, and stratified cross-validation.',
    tools: ['Logistic Regression', 'Random Forests', 'Pipelines', 'GridSearchCV', 'StandardScaler'],
    projects: ['creditwise', 'smartcart'],
    level: 'Expert'
  },
  {
    id: 'smote',
    name: 'SMOTE (Class Imbalance)',
    category: 'ML',
    categoryLabel: 'Machine Learning',
    desc: 'Synthetic Minority Over-sampling Technique generating k-NN synthetic interpolations to prevent model majority-class bias on skewed data.',
    mathRole: 'k-nearest-neighbors Euclidean distance feature-space interpolation: x_new = x_i + λ * (x_zi - x_i), λ ∈ [0, 1].',
    tools: ['Imbalanced-Learn', 'k-NN Interpolation', 'BorderlineSMOTE', 'Resampling Pipelines'],
    projects: ['creditwise'],
    level: 'Advanced'
  },
  {
    id: 'pca',
    name: 'PCA Decomposition',
    category: 'ML',
    categoryLabel: 'Machine Learning',
    desc: 'Principal Component Analysis to compress high-dimensional sparse transaction matrices into orthogonal variance axes.',
    mathRole: 'Covariance matrix eigen-decomposition maximizing explained variance ratio while eliminating multicollinear axes.',
    tools: ['Dimensionality Reduction', 'Explained Variance Ratio', 'SVD', 'Sparse Matrix Compression'],
    projects: ['smartcart'],
    level: 'Advanced'
  },
  {
    id: 'kmeans',
    name: 'K-Means Clustering',
    category: 'ML',
    categoryLabel: 'Machine Learning',
    desc: 'Unsupervised centroid-based clustering evaluated using the Elbow method, Voronoi partitions, and silhouette coefficients.',
    mathRole: "Lloyd's algorithm minimizing within-cluster sum of squares (WCSS) distance to dynamic centroid vectors.",
    tools: ['Elbow Heuristic', 'Silhouette Analysis', 'Euclidean Metric', 'Cluster Centroids'],
    projects: ['smartcart'],
    level: 'Advanced'
  },
  {
    id: 'pr-auc',
    name: 'PR-AUC Metric Auditing',
    category: 'ML',
    categoryLabel: 'Machine Learning',
    desc: 'Precision-Recall curve threshold optimization and calibration auditing to evaluate true positive detection over misleading accuracy.',
    mathRole: 'Area Under the Precision-Recall Curve (Integral of P(R) dR), calibrated F1 threshold optimization, and confusion matrix auditing.',
    tools: ['Precision-Recall Curves', 'Brier Score', 'Threshold Calibration', 'Confusion Matrices'],
    projects: ['creditwise', 'docushield'],
    level: 'Expert'
  },

  // --- DEEP LEARNING & COMPUTER VISION ---
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'DL_VISION',
    categoryLabel: 'Deep Learning & Vision',
    desc: 'Deep learning framework for custom convolutional architectures, tensor gradient graphs, and perceptual loss optimization.',
    mathRole: 'Autograd automatic differentiation, backpropagation graph computation, GPU CUDA tensor acceleration.',
    tools: ['torch.nn', 'Autograd', 'CUDA Tensors', 'DataLoader Pipelines', 'Custom Loss Functions'],
    projects: ['style-transfer', 'docushield'],
    level: 'Advanced'
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'DL_VISION',
    categoryLabel: 'Deep Learning & Vision',
    desc: 'Production computer vision image processing: morphological filters, affine transforms, Haar cascades, color space conversion, and contours.',
    mathRole: 'Discrete 2D spatial convolution kernels, Sobel gradient edge operators, and affine perspective homography matrices.',
    tools: ['Morphological Ops', 'Perspective Warp', 'Color Spaces (HSV/LAB)', 'Contour Extraction', 'Canny / Sobel'],
    projects: ['docushield', 'presentai', 'gym-trainer'],
    level: 'Expert'
  },
  {
    id: 'facenet',
    name: 'FaceNet Biometrics',
    category: 'DL_VISION',
    categoryLabel: 'Deep Learning & Vision',
    desc: 'Deep metric learning mapping face images to 128-dimensional Euclidean space for real-time verification and anti-spoofing.',
    mathRole: 'Triplet loss optimization: L = max(0, ||f(a) - f(p)||^2 - ||f(a) - f(n)||^2 + α), mapping identities to hypersphere embeddings.',
    tools: ['128-D Embeddings', 'Cosine Similarity', 'Euclidean Metric', 'Facial Landmarks', 'Anti-Spoofing'],
    projects: ['presentai'],
    level: 'Advanced'
  },
  {
    id: 'ela',
    name: 'Error Level Analysis (ELA)',
    category: 'DL_VISION',
    categoryLabel: 'Deep Learning & Vision',
    desc: 'Forensic image compression analysis detecting digital splicing by measuring differential JPEG resave error and quantization rates.',
    mathRole: 'Quantization table error variance detection: |I_original - I_recompressed(Q=95)| amplified by scale factor.',
    tools: ['Quantization Error', 'Tamper Heatmaps', 'Resave Differential', 'Splice Detection'],
    projects: ['docushield'],
    level: 'Advanced'
  },
  {
    id: 'verhoeff',
    name: 'Verhoeff Checksum (D5)',
    category: 'DL_VISION',
    categoryLabel: 'Deep Learning & Vision',
    desc: 'Mathematical checksum algorithm utilizing dihedral group D5 to detect 100% of single-digit errors and adjacent transpositions in identity documents.',
    mathRole: 'Dihedral group D5 permutation matrix multiplication: d(x_n, p(x_n-1, ...)) = 0 over permutation cycle groups.',
    tools: ['Dihedral Group D5', 'Permutation Matrices', 'Aadhaar / UID Validation', 'MRZ Check Digits'],
    projects: ['docushield'],
    level: 'Advanced'
  },

  // --- NLP & GENERATIVE AI ---
  {
    id: 'sentence-transformers',
    name: 'Sentence Transformers',
    category: 'NLP_GENAI',
    categoryLabel: 'NLP & Generative AI',
    desc: 'Dense semantic text embeddings (all-MiniLM-L6-v2) for rolling-chunk semantic similarity matching without token truncation.',
    mathRole: 'Dense vector projection through multi-head self-attention, generating 384-dimensional cosine similarity alignments.',
    tools: ['all-MiniLM-L6-v2', 'Cosine Distance', 'Rolling Chunking', 'Semantic Retrieval', 'Vector Caching'],
    projects: ['elevatecv'],
    level: 'Expert'
  },
  {
    id: 'spacy',
    name: 'spaCy Pipeline',
    category: 'NLP_GENAI',
    categoryLabel: 'NLP & Generative AI',
    desc: 'Industrial-strength Natural Language Processing for named entity recognition (NER), part-of-speech tagging, and syntactic token parsing.',
    mathRole: 'Transition-based dependency parsing and statistical token classification using pre-trained convolutional embeddings.',
    tools: ['NER Extraction', 'Tokenization', 'Dependency Parsing', 'Stopword Filtering', 'Custom Entity Rulers'],
    projects: ['elevatecv'],
    level: 'Advanced'
  },
  {
    id: 'easyocr',
    name: 'EasyOCR & Layout Parsing',
    category: 'NLP_GENAI',
    categoryLabel: 'NLP & Generative AI',
    desc: 'Optical Character Recognition extracting layout-aware text tokens, confidences, and normalized bounding boxes from scanned identity documents.',
    mathRole: 'CRAFT text detector + CRNN (Convolutional Recurrent Neural Network) with CTC loss decoding sequence predictions.',
    tools: ['CRAFT Detector', 'CRNN Text Recognizer', 'Bounding Boxes', 'Confidence Thresholds', 'Multilingual Support'],
    projects: ['docushield'],
    level: 'Advanced'
  },
  {
    id: 'groq-llama',
    name: 'Groq Llama 3 LLM',
    category: 'NLP_GENAI',
    categoryLabel: 'NLP & Generative AI',
    desc: 'High-speed LPUs executing generative resume and document critiques with automatic deterministic NLP fallback architectures.',
    mathRole: 'Rotary position embeddings (RoPE), grouped-query attention (GQA), and temperature-calibrated nucleus sampling.',
    tools: ['Groq LPU Inference', 'Llama 3 70B/8B', 'Structured JSON Output', 'Deterministic Fallbacks', 'Prompt Engineering'],
    projects: ['elevatecv'],
    level: 'Advanced'
  },

  // --- SYSTEMS & BACKEND ---
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'SYSTEMS',
    categoryLabel: 'Engineering & Backend',
    desc: 'Asynchronous Python web framework with Pydantic strict schema validation, OpenAPI auto-docs, and low-latency inference routes.',
    mathRole: 'Non-blocking I/O event loops (uvicorn/uvloop) handling concurrent batch model requests without thread starvation.',
    tools: ['Async Endpoints', 'Pydantic V2', 'Dependency Injection', 'CORS Middleware', 'OpenAPI Specs'],
    projects: ['docushield', 'elevatecv'],
    level: 'Expert'
  },
  {
    id: 'docker',
    name: 'Docker Containerization',
    category: 'SYSTEMS',
    categoryLabel: 'Engineering & Backend',
    desc: 'Reproducible multi-stage container builds packaging PyTorch runtimes, C++ system libraries, OpenCV dependencies, and OCR binaries.',
    mathRole: 'Kernel namespace isolation, cgroup memory resource limiting, and deterministic multi-stage caching layers.',
    tools: ['Multi-Stage Builds', 'Docker Compose', 'Layer Optimization', 'Alpine / Debian Runtimes'],
    projects: ['docushield'],
    level: 'Advanced'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'SYSTEMS',
    categoryLabel: 'Engineering & Backend',
    desc: 'ACID-compliant relational database for transactional user isolation, biometric attendance logs, and audit trails.',
    mathRole: 'Write-Ahead Logging (WAL), Multi-Version Concurrency Control (MVCC), and indexed relational join optimizations.',
    tools: ['ACID Compliance', 'Connection Pooling', 'JSONB Storage', 'Index Tuning', 'Row-Level Security'],
    projects: ['presentai'],
    level: 'Advanced'
  },
  {
    id: 'streamlit',
    name: 'Streamlit UI',
    category: 'SYSTEMS',
    categoryLabel: 'Engineering & Backend',
    desc: 'Interactive reactive dashboards enabling live parameter tuning, feature sliders, and instant model risk estimation.',
    mathRole: 'Reactive state reconciliation triggering forward inference passes upon parameter delta events.',
    tools: ['Session State', 'Custom Components', 'Real-Time Sliders', 'Matplotlib Integration', 'Cached Inference'],
    projects: ['creditwise', 'smartcart'],
    level: 'Proficient'
  }
];
