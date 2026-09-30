import { Certification, CurrentlyLearning } from '../lib/types';

export const CERTIFICATIONS: Certification[] = [
  {
    id: "c-prog",
    title: "C Programming & Memory Foundations",
    platform: "LPU Academic Coursework",
    url: "/c_programming_certificate.pdf",
    tag: "Pointers & Data Structures",
    date: "Verified"
  },
  {
    id: "sql-cert",
    title: "Relational Database Modeling & SQL",
    platform: "Database Certification",
    url: "/sql.png",
    tag: "SQL Schema Normalization & Queries",
    date: "Verified"
  },
  {
    id: "python-ml",
    title: "Python for Data Science & Machine Learning",
    platform: "Scientific Computing Foundation",
    url: "/python.png",
    tag: "NumPy, Pandas & Scikit-Learn",
    date: "Verified"
  }
];

export const CURRENTLY_LEARNING: CurrentlyLearning[] = [
  {
    topic: "LLM Fine-Tuning & Quantization",
    focus: "LoRA, QLoRA, and AWQ 4-bit edge weight quantization for low-memory deployment",
    status: "Active"
  },
  {
    topic: "Transformer Internals & Attention",
    focus: "FlashAttention-2, KV-cache management, and multi-head latent space geometry",
    status: "Deep Dive"
  },
  {
    topic: "Distributed ML Training & MLOps",
    focus: "PyTorch DDP, model lineage tracking, and CI/CD pipelines for production models",
    status: "Applying"
  },
  {
    topic: "C++ High-Performance Inference",
    focus: "ONNX Runtime C++ APIs and CUDA kernels for sub-millisecond vision models",
    status: "Active"
  }
];
