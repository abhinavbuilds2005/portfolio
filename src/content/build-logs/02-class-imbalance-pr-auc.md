---
title: Navigating Extreme Class Imbalance with PR-AUC
date: August 2026
tags: ["CreditWise", "SMOTE", "Scikit-Learn", "Evaluation"]
readTime: 3 min
excerpt: When modeling loan defaults, defaults represent < 5% of records. Why raw accuracy is a vanity metric and how Precision-Recall AUC protects underwriting.
---

### The Trap of Raw Accuracy
If 96 out of 100 historical loan applicants repay their debt on time, a naive classifier predicting "repaid" every single time achieves a deceptive 96% accuracy—while failing on 100% of catastrophic default cases.

### Resampling with SMOTE
In **CreditWise**, we decoupled training distribution from inference evaluation:
- Applied **SMOTE (Synthetic Minority Over-sampling Technique)** exclusively on the training fold after strict cross-validation splits to avoid data leakage.
- Tuned decision boundaries along the **Precision-Recall AUC (PR-AUC)** frontier rather than standard ROC-AUC, since PR curves focus squarely on minority positive detection performance.
- Embedded SHAP values directly into the UI so applicants understand which financial features drove their risk rating.
