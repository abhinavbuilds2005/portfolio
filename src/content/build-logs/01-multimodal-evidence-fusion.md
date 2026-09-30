---
title: Multimodal Evidence Fusion in Document Forensics
date: September 2026
tags: ["DocuShield AI", "OpenCV", "Forensics", "SIH 2026"]
readTime: 4 min
excerpt: Why single-modality checks fail against modern forgery, and how fusing ELA compression heatmaps, copy-move geometry, and ICAO checksums creates resilient defenses.
---

### The Single-Modality Fragility
In document forensics, trusting any single classification model is dangerous. An attacker can match typography fonts while altering pixel textures, or forge an ID number while passing simple visual inspections.

### 5-Level Hierarchical Fusion
In **DocuShield AI**, we structured our verification into 5 complementary defensive layers:
1. **Error Level Analysis (ELA):** Resaving images at 90% JPEG quality to highlight distinct compression artifact disparities.
2. **Copy-Move Forgery Detection:** ORB keypoints filtered via RANSAC geometric homography to locate duplicate regions.
3. **Typography & Font Geometry:** Laplacian edge-variance calculations to spot spliced characters.
4. **Algorithmic Checksums:** Deterministic verification including ICAO Doc 9303 7-3-1 weight algorithms and Indian 12-digit Aadhaar Verhoeff D5 dihedral permutations.
5. **Biometric Face Verification:** Document face extraction cross-matched against live frames using cosine distance.

### The Takeaway
When these 5 signals are fused into a weighted probabilistic risk engine, isolated false positives drop sharply while zero-day manipulation is caught before human review.
