import { Certification, CurrentlyLearning } from '../lib/types';

export const CERTIFICATIONS: Certification[] = [
  {
    id: "nptel-llm",
    title: "Introduction to Large Language Models (LLMs)",
    platform: "IIT Madras · NPTEL",
    url: "/certificates/nptel_llm_certificate.pdf",
    tag: "Transformers & Attention Mechanisms",
    date: "Verified"
  },
  {
    id: "c-prog",
    title: "Computer Programming (C Language) · 150 Hours",
    platform: "Lovely Professional University · iamneo (NIIT Venture)",
    url: "/certificates/c_programming_certificate.pdf",
    tag: "Pointers & Memory Architecture",
    date: "Verified"
  },
  {
    id: "ibm-python",
    title: "Python 101 for Data Science",
    platform: "Cognitive Class · IBM Developer Skills Network",
    url: "/certificates/ibm_python_data_science.pdf",
    tag: "Scientific Computing & Data Structures",
    date: "Verified"
  },
  {
    id: "sql-cert",
    title: "HackerRank SQL (Advanced) · 5★ Gold Badge",
    platform: "HackerRank Certified Professional",
    url: "/certificates/hackerrank_sql_advanced.png",
    tag: "Window Functions & Relational Modeling",
    date: "Verified"
  },
  {
    id: "infosys-python",
    title: "Infosys Springboard Python",
    platform: "Infosys Springboard Certification",
    url: "/certificates/infosys_python_certification.png",
    tag: "OOP Design & Algorithmic Complexity",
    date: "Verified"
  },
  {
    id: "sih-2026",
    title: "Smart India Hackathon 2026 Qualifier (SIH26188)",
    platform: "Ministry of Education & AICTE Govt. of India",
    url: "/certificates/sih_2026_qualification.png",
    tag: "DocuShield AI & Forensic Screening",
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
