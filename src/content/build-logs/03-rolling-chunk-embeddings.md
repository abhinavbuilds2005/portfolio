---
title: Chunked Semantic Embeddings Without Truncation
date: June 2026
tags: ["ATS Resume", "Sentence Transformers", "spaCy", "NLP"]
readTime: 4 min
excerpt: Standard transformer encoders truncate input beyond 512 tokens. How rolling semantic chunks and deterministic fallbacks ensure robust document scoring.
---

### The 512-Token Cutoff
Standard sentence transformer models (such as `all-MiniLM-L6-v2`) enforce a hard 512-token limit (~3,500 characters). When processing a thorough two-page resume or a comprehensive job description, standard truncation slices off half the candidate's career.

### Rolling Semantic Chunks
In **ATS Resume Analyzer**, we resolved this by:
1. Segmenting document text into semantic paragraphs and section headers using **spaCy**.
2. Computing rolling embeddings across sliding windows with a 20% overlap to preserve cross-sentence context.
3. Calculating max-pooled cosine similarities against individual JD qualification requirements.
4. Implementing a deterministic NLP fallback that kicks in within 200ms if external LLM generation endpoints fail or throttle.
