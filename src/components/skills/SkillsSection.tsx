import React from 'react';
import { Award, BookOpen, Layers, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { CERTIFICATIONS, CURRENTLY_LEARNING } from '../../data/certifications';

const SKILL_DOMAINS = [
  {
    title: 'Machine Learning & Applied Statistics',
    desc: 'Convex optimization, imbalanced classification, and threshold auditing.',
    skills: [
      { name: 'Scikit-Learn', level: 'Expert', note: 'Regularized estimators & pipelines' },
      { name: 'SMOTE (Imbalanced-Learn)', level: 'Advanced', note: 'In-fold synthetic k-NN resampling' },
      { name: 'PCA Decomposition', level: 'Advanced', note: '>85% variance eigen-projection' },
      { name: 'K-Means Clustering', level: 'Advanced', note: 'Silhouette & elbow optimization' },
      { name: 'PR-AUC Evaluation', level: 'Expert', note: 'Minority positive frontier tuning' },
      { name: 'Statistics & Linear Algebra', level: 'Advanced', note: 'SVD, covariance, loss gradients' },
    ]
  },
  {
    title: 'Deep Learning & Computer Vision',
    desc: 'Pixel forensics, metric learning embeddings, and deterministic checksums.',
    skills: [
      { name: 'PyTorch', level: 'Advanced', note: 'Autograd graphs & tensor models' },
      { name: 'OpenCV', level: 'Expert', note: 'Morphological filters & homography' },
      { name: 'Error Level Analysis (ELA)', level: 'Advanced', note: 'Quantization resave forensics' },
      { name: 'FaceNet Biometrics', level: 'Advanced', note: '128D Euclidean triplet metric space' },
      { name: 'Verhoeff Checksum (D5)', level: 'Advanced', note: 'Dihedral group D5 permutation validation' },
      { name: 'EasyOCR & CRAFT', level: 'Advanced', note: 'Layout-aware text token extraction' },
    ]
  },
  {
    title: 'NLP & Generative AI',
    desc: 'Dense semantic representations, entity extraction, and resilient fallback LLMs.',
    skills: [
      { name: 'Sentence Transformers', level: 'Expert', note: 'all-MiniLM-L6-v2 384D semantic vectors' },
      { name: 'Rolling Chunk Embeddings', level: 'Advanced', note: 'Eliminates 512-token CV truncation' },
      { name: 'spaCy Industrial NLP', level: 'Advanced', note: 'Named entity recognition & POS tagging' },
      { name: 'Groq Llama 3 API', level: 'Advanced', note: 'Ultra low-latency LPU inference' },
      { name: 'Deterministic NLP Fallbacks', level: 'Expert', note: 'Zero-downtime heuristic backups' },
      { name: 'Cosine Distance Metric', level: 'Expert', note: 'Max-pooled semantic alignment' },
    ]
  },
  {
    title: 'Backend, Systems & Data Engineering',
    desc: 'High-concurrency microservices, containerization, and relational integrity.',
    skills: [
      { name: 'Python (AsyncIO / NumPy)', level: 'Expert', note: 'Vectorized operations & non-blocking I/O' },
      { name: 'FastAPI', level: 'Expert', note: 'Pydantic V2 schema validation & OpenAPI' },
      { name: 'C++ (DSA & Memory)', level: 'Advanced', note: 'Cache locality, pointers, LeetCode DSA' },
      { name: 'Docker Containerization', level: 'Advanced', note: 'Multi-stage builds & runtime isolation' },
      { name: 'PostgreSQL & SQL', level: 'Advanced', note: '3NF schema design & ACID integrity' },
      { name: 'Streamlit UI', level: 'Proficient', note: 'Reactive parameter exploration consoles' },
    ]
  }
];

export const SkillsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border-subtle">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="font-mono text-xs uppercase tracking-wide text-accent mb-2">
            Technical Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Engineering Skill Architecture
          </h2>
        </div>
        <p className="text-sm text-text-secondary max-w-md">
          Core technical competencies verified across active repositories, audited against mathematical foundations, evaluation benchmarks, and containerized deployments.
        </p>
      </div>

      {/* 4 Categorical Skill Domain Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {SKILL_DOMAINS.map((domain, dIdx) => (
          <motion.div
            key={domain.title}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : dIdx * 0.08, ease: 'easeOut' }}
            className="p-6 rounded-lg border border-border-subtle bg-surface flex flex-col justify-between card-hover"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs text-accent font-semibold">
                  0{dIdx + 1}
                </span>
                <h3 className="text-lg font-bold text-text-primary">
                  {domain.title}
                </h3>
              </div>
              <p className="text-xs text-text-muted mb-5">
                {domain.desc}
              </p>

              {/* Skill Chips / List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {domain.skills.map((s) => (
                  <div
                    key={s.name}
                    className="p-2.5 rounded border border-border-subtle bg-base flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-semibold text-text-primary">
                        {s.name}
                      </span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                        s.level === 'Expert'
                          ? 'border-accent/40 text-accent bg-accent/10'
                          : 'border-border-subtle text-text-muted'
                      }`}>
                        {s.level}
                      </span>
                    </div>
                    <span className="text-[11px] text-text-muted leading-tight">
                      {s.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Verified Credentials & Currently Learning Strip */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Verified Certifications (6 cols) */}
        <div className="md:col-span-6 p-6 rounded-lg border border-border-subtle bg-surface card-hover">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border-subtle">
            <Award className="w-4 h-4 text-accent" />
            <h4 className="text-sm font-bold font-mono text-text-primary uppercase tracking-wide">
              Verified Certifications
            </h4>
          </div>

          <div className="space-y-3">
            {CERTIFICATIONS.map((cert) => (
              <a
                key={cert.id}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded border border-border-subtle bg-base hover:border-border-strong transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-text-primary group-hover:text-accent transition-colors flex items-center gap-1.5">
                    <span>{cert.title}</span>
                    <ExternalLink className="w-3 h-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-text-muted mt-0.5">
                    {cert.platform} · {cert.tag}
                  </div>
                </div>
                <span className="font-mono text-[11px] text-live flex items-center gap-1 shrink-0">
                  <CheckCircle className="w-3 h-3 text-live" />
                  <span>Verified</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Currently Exploring / Learning (6 cols) */}
        <div className="md:col-span-6 p-6 rounded-lg border border-border-subtle bg-surface card-hover">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border-subtle">
            <BookOpen className="w-4 h-4 text-accent" />
            <h4 className="text-sm font-bold font-mono text-text-primary uppercase tracking-wide">
              Active Focus & Research Areas
            </h4>
          </div>

          <div className="space-y-3">
            {CURRENTLY_LEARNING.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded border border-border-subtle bg-base"
              >
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-semibold text-text-primary">
                    {item.topic}
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.2 rounded border border-accent/40 text-accent bg-accent/10">
                    {item.status}
                  </span>
                </div>
                <div className="text-[11px] text-text-secondary leading-snug">
                  {item.focus}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
