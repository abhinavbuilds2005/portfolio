/**
 * CONSOLE / ENGINEERING LOG SCRIPT
 * Abhinav Anand — AI/ML Engineer Portfolio
 * 
 * LIVE API INTEGRATIONS & RESILIENCE STRATEGY:
 * 1. LeetCode Telemetry (api/leetcode.js):
 *    - Primary: Self-hosted serverless GraphQL proxy (/api/leetcode -> https://leetcode.com/graphql)
 *    - Secondary Fallback: https://leetcode-api-1.vercel.app/cseabhinav2005
 *    - Cache: localStorage ("lc-console-data", 30m TTL)
 *    - Baseline Archive: Hardcoded verified stats (10 solved: 7 Easy, 3 Medium, 0 Hard)
 *    - UI Status: Explicit indicators for "LIVE SYNCED", "CACHED", "SYNC FAILED", or "OFFLINE ARCHIVE"
 * 
 * 2. GitHub Credibility Signal:
 *    - Endpoint: https://api.github.com/users/abhinavbuilds2005
 *    - Cache: localStorage ("gh-console-data", 1h TTL)
 *    - Baseline Archive: 7 public repositories, verified live push activity
 * 
 * 3. Command Palette (Cmd+K / Ctrl+K):
 *    - Fully keyboard-driven fuzzy search & direct actions across sections and projects
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
  // 1. DATA DICTIONARY: MASTER-DETAIL PROJECTS & CASE STUDIES
  // ==========================================================================
  const PROJECTS_DATA = [
    {
      id: "creditwise",
      index: "01",
      title: "CreditWise: AI Loan Risk",
      category: "AI/ML",
      status: "LIVE",
      tagline: "Predictive machine learning architecture assessing loan default risk for automated underwriting.",
      image: "project_creditwise_1775755763976.png",
      liveUrl: "https://credishield-one.vercel.app/",
      repoUrl: "https://github.com/abhinavbuilds2005/credit-wise-loan-system",
      summary: "An end-to-end machine learning system engineered for loan approval prediction. Built with tailored financial feature engineering, risk scoring algorithms, and real-time inference, offering robust decision intelligence deployed seamlessly via Streamlit.",
      challenge: "Imbalanced training datasets where historical defaults represent a tiny fraction of total records, causing baseline classifiers to skew heavily toward low-risk labels.",
      solution: "Applied SMOTE (Synthetic Minority Over-sampling Technique) during training and optimized decision thresholds against Precision-Recall AUC curves rather than misleading raw accuracy metrics.",
      features: [
        "<strong>Custom Financial Feature Engineering:</strong> Modeled debt-to-income weights, installment ratios, and credit history tenure adjustments.",
        "<strong>Interpretable ML Classifier:</strong> Trained a regularized Logistic Regression pipeline scoring default probability with high statistical transparency.",
        "<strong>Real-Time Underwriting Console:</strong> Interactive Streamlit interface enabling variable parameter tuning and immediate credit risk estimation."
      ],
      tech: ["Python", "Scikit-Learn", "Pandas & NumPy", "Streamlit", "Matplotlib"]
    },
    {
      id: "smartcart",
      index: "02",
      title: "SmartCart AI: Customer Intelligence",
      category: "AI/ML",
      status: "LIVE",
      tagline: "Unsupervised machine learning platform for customer segmentation and churn prediction.",
      image: "project_customer_ai_1775755777519.png",
      liveUrl: "https://smartcart-recommendation-system.netlify.app/",
      repoUrl: "https://github.com/abhinavbuilds2005/Smartcart-Recommendation-system",
      summary: "An AI-powered customer segmentation and behavioral analytics platform. It leverages unsupervised clustering and dimensional reduction to discover organic purchasing patterns, generating personalized product recommendations and churn risk assessments.",
      challenge: "High-dimensional sparse transaction arrays generated poorly-defined cluster centroids (curse of dimensionality), lowering clustering stability.",
      solution: "Integrated Principal Component Analysis (PCA) to project high-dimensional transaction features into dense, lower-dimensional representations before clustering, increasing the silhouette coefficient.",
      features: [
        "<strong>Multi-Dimensional Clustering:</strong> Implements K-Means clustering with dynamically evaluated distance metrics.",
        "<strong>Persona Classification:</strong> Automatically categorizes consumer clusters (e.g. frequent budget shoppers vs. high-basket occasional buyers).",
        "<strong>Targeted Marketing Engine:</strong> Formulates targeted catalog recommendations and communication cadences per archetype."
      ],
      tech: ["Python", "Scikit-Learn", "PCA Dimension Reduction", "Streamlit", "Chart.js"]
    },
    {
      id: "portfolio",
      index: "03",
      title: "Personal Portfolio v2",
      category: "WEB DEV",
      status: "LIVE",
      tagline: "A high-performance console-inspired engineering hub built with zero bloated frameworks.",
      image: "project_portfolio_1775755792684.png",
      liveUrl: null,
      repoUrl: "https://github.com/abhinavbuilds2005/portfolio",
      summary: "A bespoke engineering portfolio redesigned from first principles. Features a persistent IDE-style TOC activity sidebar, a master-detail project console, and a strict monochromatic visual language designed for senior-engineer clarity.",
      challenge: "Eliminating the visual clichés common across contemporary AI/student portfolios (gradient blobs, floating pill bars, glassmorphism) while keeping interaction fast, accessible, and responsive.",
      solution: "Engineered a persistent two-zone layout with hairline 1px borders, monospace metadata hierarchy, and modular vanilla JavaScript components with zero framework overhead.",
      features: [
        "<strong>Persistent Two-Zone Layout:</strong> Fixed TOC navigation sidebar with active section tracking, collapsing to a top drawer on mobile.",
        "<strong>Master-Detail Project Console:</strong> Instant keyboard-navigable index with real-time inspection view and collapsible case studies.",
        "<strong>Strict Design System:</strong> Curated grayscale palette with high-contrast typography (JetBrains Mono + Inter)."
      ],
      tech: ["HTML5", "Vanilla CSS", "JavaScript (ES6+)", "JetBrains Mono"]
    },
    {
      id: "presentai",
      index: "04",
      title: "PresentAI: Biometric Attendance",
      category: "AI/ML",
      status: "LIVE",
      tagline: "Multimodal contact-free attendance platform integrating computer vision and acoustic speaker verification.",
      image: "project_attendance_system.jpg",
      liveUrl: "https://presentai-attendance.onrender.com",
      repoUrl: "https://github.com/abhinavbuilds2005/AI-Powered-Attendance-Platform",
      summary: "A high-security biometric attendance verification system designed for institutional deployments. It authenticates identity by simultaneously analyzing real-time facial embeddings and deep acoustic speaker prints to eliminate proxy attendance.",
      challenge: "Biometric validation accuracy drops substantially under adverse conditions such as poor ambient lighting (camera) or background acoustic interference (microphone).",
      solution: "Engineered a dynamic confidence-fusion model that shifts sensor weights—relying more heavily on acoustic voice biometrics in dim environments and prioritizing facial landmark vectors in noisy rooms.",
      features: [
        "<strong>Dual-Sensor Verification:</strong> Concurrent processing of live camera frames and audio microphone streams.",
        "<strong>Acoustic Voice Biometrics:</strong> Deep neural network extracting frequency embeddings to identify verified speaker profiles.",
        "<strong>Liveness & Anti-Spoofing:</strong> Micro-motion analysis paired with voice pitch variance checks to detect photo/audio replay attacks."
      ],
      tech: ["Python", "OpenCV", "FaceNet", "Voice Biometrics", "PostgreSQL"]
    },
    {
      id: "elevatecv",
      index: "05",
      title: "ElevateCV: ATS Resume Analyser",
      category: "AI/ML",
      status: "LIVE",
      tagline: "LLM-driven resume evaluation platform measuring semantic alignment against live job descriptions.",
      image: "",
      liveUrl: "https://elevatecv-ai.streamlit.app/",
      repoUrl: "https://github.com/abhinavbuilds2005/ATS-RESUME-ANALYZER",
      summary: "An intelligent ATS scoring platform that parses complex PDF resumes, performs semantic gap analysis against target job specifications, and produces tailored generative feedback to optimize applicant match rates.",
      challenge: "Multi-column resume designs and arbitrary table layouts disrupt standard text extraction, scrambling semantic sentence flow.",
      solution: "Combined robust PDF extraction streams with spatial text-block reconstruction and prompt-engineered Gemini API workflows for structured JSON analysis.",
      features: [
        "<strong>Layout-Aware PDF Parser:</strong> Extracts and standardizes structural content from arbitrary multi-column templates.",
        "<strong>Semantic Match Scoring:</strong> Measures similarity vectors and identifies missing domain competencies.",
        "<strong>Actionable Generative Rewrite:</strong> Produces tailored bullet points and keyword optimizations aligned with target roles."
      ],
      tech: ["Python", "Streamlit", "Gemini API", "PyPDF2 / NLP", "Scikit-Learn"]
    },
    {
      id: "voice-assistant",
      index: "06",
      title: "AI Voice Assistant",
      category: "AI/ML",
      status: "UPCOMING",
      tagline: "Edge-quantized voice assistant orchestrating localized LLM reasoning and OS task execution.",
      image: "",
      liveUrl: null,
      repoUrl: null,
      summary: "A local-first conversational voice assistant engineered for low-latency dialogue, private offline inference, and operating system workflow automation.",
      challenge: "Maintaining low conversation latency without leaking user voice audio to external commercial cloud endpoints.",
      solution: "Deploying 4-bit quantized local instruction LLMs combined with accelerated whisper streaming buffers for entirely on-device inference.",
      features: [
        "<strong>Whisper Audio Streamer:</strong> Continuous low-latency streaming pipeline converting audio buffers to structured tokens.",
        "<strong>Agentic Task Orchestration:</strong> Maps spoken queries into validated execution schema JSONs.",
        "<strong>OS Automation Engine:</strong> Hooks into system APIs for hands-free workflow execution."
      ],
      tech: ["Python", "OpenAI Whisper", "Local Quantized LLMs", "JSON Schema Parser"]
    },
    {
      id: "style-transfer",
      index: "07",
      title: "Neural Style Transfer",
      category: "AI/ML",
      status: "UPCOMING",
      tagline: "Real-time feed-forward style rendering network blending classical artistic textures onto digital images.",
      image: "",
      liveUrl: null,
      repoUrl: null,
      summary: "A deep learning visual synthesis platform using convolutional neural networks to extract style representations from famous artworks and transfer them onto custom photography while preserving semantic structure.",
      challenge: "Traditional iterative style transfer optimizations require hundreds of gradient descent steps, taking minutes per image on consumer GPUs.",
      solution: "Trained a feed-forward perceptual generative network using Gram matrix style loss and deep perceptual content loss to achieve sub-second real-time inference.",
      features: [
        "<strong>Dual Perceptual Loss:</strong> Balances high-level feature retention with Gram-matrix textural synthesis.",
        "<strong>Feed-Forward Network:</strong> Sub-second processing enabling interactive web execution.",
        "<strong>Interactive Canvas Playground:</strong> Streamlit interface for custom blending and asset export."
      ],
      tech: ["Python", "PyTorch", "VGG-19 CNN", "FastAPI", "Streamlit Canvas"]
    },
    {
      id: "gym-trainer",
      index: "08",
      title: "AI Real-Time Gym Trainer",
      category: "AI/ML",
      status: "UPCOMING",
      tagline: "Computer vision activity monitor calculating joint kinematics and tracking exercise repetitions.",
      image: "",
      liveUrl: null,
      repoUrl: null,
      summary: "A real-time kinematic posture evaluator using standard webcams to identify skeletal joints, verify exercise angles against biomechanical standards, and count workout repetitions accurately.",
      challenge: "Perspective shifts, camera tilt, and clothing clutter introduce landmark jitter, producing false repetition triggers.",
      solution: "Implemented moving-average spatial smoothing filters across 3D coordinates and enforced angular state-machine transitions calibrated for individual limb ratios.",
      features: [
        "<strong>High-Speed Pose Estimation:</strong> Identifies 33 skeletal landmarks at 30+ FPS via standard webcam streams.",
        "<strong>Kinematic Angle Calculation:</strong> Measures joint vector angles across critical movement planes.",
        "<strong>State-Machine Repetition Counter:</strong> Distinguishes full range-of-motion repetitions from erratic movements."
      ],
      tech: ["Python", "MediaPipe Pose", "OpenCV", "NumPy", "FastAPI"]
    }
  ];

  // ==========================================================================
  // 2. MASTER-DETAIL PROJECT CONSOLE CONTROLLER
  // ==========================================================================
  const masterListContainer = document.getElementById("project-master-list");
  const detailPanel = document.getElementById("project-detail-panel");
  const modalElement = document.getElementById("spec-modal");
  const modalContent = document.getElementById("spec-modal-body");
  const modalTitle = document.getElementById("spec-modal-title");
  const modalCloseBtn = document.getElementById("spec-modal-close");
  const modalBackdrop = document.getElementById("spec-modal-backdrop");

  let activeProjectIndex = 0;

  function renderMasterList() {
    if (!masterListContainer) return;

    masterListContainer.innerHTML = `
      <div class="master-list-header">
        <span>INDEX / REPO</span>
        <span>STATUS</span>
      </div>
    `;

    PROJECTS_DATA.forEach((project, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `master-item ${idx === activeProjectIndex ? "active" : ""}`;
      btn.setAttribute("data-index", idx);
      btn.setAttribute("aria-label", `Inspect project ${project.title}`);

      const statusClass = project.status === "LIVE" ? "live" : "upcoming";

      btn.innerHTML = `
        <div class="master-item-meta">
          <span class="master-item-idx">${project.index} // ${project.category}</span>
          <span class="master-item-tag ${statusClass}">${project.status}</span>
        </div>
        <div class="master-item-title">${project.title}</div>
      `;

      btn.addEventListener("click", () => {
        selectProject(idx);
      });

      masterListContainer.appendChild(btn);
    });
  }

  function selectProject(index, shouldScroll = false) {
    activeProjectIndex = index;
    const project = PROJECTS_DATA[index];
    if (!project || !detailPanel) return;

    // Update active class on master buttons
    const items = masterListContainer.querySelectorAll(".master-item");
    items.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add("active");
        if (shouldScroll && masterListContainer && masterListContainer.scrollHeight > masterListContainer.clientHeight) {
          const itemOffsetTop = item.offsetTop - masterListContainer.offsetTop;
          masterListContainer.scrollTo({ top: itemOffsetTop, behavior: "smooth" });
        }
      } else {
        item.classList.remove("active");
      }
    });

    // Render Detail Viewport
    renderDetailPanel(project);
  }

  function renderDetailPanel(project) {
    const isLive = project.status === "LIVE";
    const statusClass = isLive ? "live" : "upcoming";

    let mediaPreview = "";
    if (project.image) {
      mediaPreview = `
        <div class="detail-preview-frame">
          <img src="${project.image}" alt="${project.title} Preview" loading="lazy" class="detail-preview-img">
        </div>
      `;
    } else {
      mediaPreview = `
        <div class="detail-preview-frame">
          <div class="detail-preview-placeholder">
            <i class="fas fa-terminal"></i>
            <span>[SCHEMATIC_VIEW // ${project.index}_${project.id.toUpperCase()}]</span>
          </div>
        </div>
      `;
    }

    let liveBtn = "";
    if (project.liveUrl) {
      liveBtn = `
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          Launch Live App <i class="fas fa-external-link-alt text-[11px]"></i>
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
        <div class="detail-header-links">
          <span>${project.category}</span>
        </div>
      </div>

      <div class="detail-content-body">
        <div class="detail-title-row">
          <h3 class="detail-project-title">${project.title}</h3>
          <p class="detail-project-tagline font-mono">${project.tagline}</p>
        </div>

        ${mediaPreview}

        <p class="text-mid" style="font-size: 0.95rem; margin-bottom: 1.75rem; line-height: 1.65;">
          ${project.summary}
        </p>

        <!-- Architecture Breakdown Spec Grid -->
        <div class="detail-spec-grid">
          <div class="detail-spec-cell">
            <div class="spec-cell-title">
              <i class="fas fa-exclamation-triangle text-low"></i> Technical Challenge
            </div>
            <p class="spec-cell-text">${project.challenge}</p>
          </div>
          <div class="detail-spec-cell">
            <div class="spec-cell-title">
              <i class="fas fa-check-circle text-low"></i> Engineering Solution
            </div>
            <p class="spec-cell-text">${project.solution}</p>
          </div>
        </div>

        <!-- Key Features List -->
        <div class="detail-features-block">
          <div class="features-title">KEY TECHNICAL FEATURES:</div>
          <ul class="features-list">
            ${project.features.map(f => `<li>${f}</li>`).join("")}
          </ul>
        </div>

        <!-- Tech Stack Chips -->
        <div class="detail-features-block">
          <div class="features-title">STACK & DEPENDENCIES:</div>
          <div class="detail-tech-row">
            ${project.tech.map(t => `<span class="tech-chip">${t}</span>`).join("")}
          </div>
        </div>

        <!-- Actions Bar -->
        <div class="detail-actions-bar">
          ${liveBtn}
          ${repoBtn}
          <button type="button" class="btn btn-sm" id="btn-open-case-study" data-idx="${activeProjectIndex}">
            <i class="fas fa-file-alt"></i> Full Spec Modal
          </button>
        </div>
      </div>
    `;

    // Hook modal trigger
    const caseStudyBtn = document.getElementById("btn-open-case-study");
    if (caseStudyBtn) {
      caseStudyBtn.addEventListener("click", () => {
        openSpecModal(project);
      });
    }
  }

  // Keyboard navigation for project list (active when interacting with master list)
  if (masterListContainer) {
    masterListContainer.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIdx = (activeProjectIndex + 1) % PROJECTS_DATA.length;
        selectProject(nextIdx, true);
        const items = masterListContainer.querySelectorAll(".master-item");
        if (items[nextIdx]) items[nextIdx].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIdx = (activeProjectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
        selectProject(prevIdx, true);
        const items = masterListContainer.querySelectorAll(".master-item");
        if (items[prevIdx]) items[prevIdx].focus();
      }
    });
  }

  // Modal Handling
  function openSpecModal(project) {
    if (!modalElement || !modalContent || !modalTitle) return;

    modalTitle.textContent = `SPEC // ${project.index}: ${project.title}`;
    modalContent.innerHTML = `
      <div>
        <p class="font-mono text-mid" style="margin-bottom: 0.75rem; font-size: 0.85rem;">${project.tagline}</p>
        <p class="text-mid" style="line-height: 1.65; font-size: 0.9rem;">${project.summary}</p>
      </div>

      <div style="border-top: 1px solid var(--line); padding-top: 1.25rem;">
        <h4 class="font-mono" style="font-size: 0.75rem; color: var(--text-low); text-transform: uppercase; margin-bottom: 0.75rem;">
          Architectural Analysis
        </h4>
        <div class="detail-spec-grid">
          <div class="detail-spec-cell">
            <div class="spec-cell-title"><i class="fas fa-exclamation-triangle"></i> Challenge</div>
            <p class="spec-cell-text">${project.challenge}</p>
          </div>
          <div class="detail-spec-cell">
            <div class="spec-cell-title"><i class="fas fa-check-circle"></i> Solution</div>
            <p class="spec-cell-text">${project.solution}</p>
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid var(--line); padding-top: 1.25rem;">
        <h4 class="font-mono" style="font-size: 0.75rem; color: var(--text-low); text-transform: uppercase; margin-bottom: 0.75rem;">
          Detailed System Features
        </h4>
        <ul class="features-list">
          ${project.features.map(f => `<li>${f}</li>`).join("")}
        </ul>
      </div>

      <div style="border-top: 1px solid var(--line); padding-top: 1.25rem;">
        <h4 class="font-mono" style="font-size: 0.75rem; color: var(--text-low); text-transform: uppercase; margin-bottom: 0.75rem;">
          Technology Stack
        </h4>
        <div class="detail-tech-row" style="margin-bottom: 0;">
          ${project.tech.map(t => `<span class="tech-chip">${t}</span>`).join("")}
        </div>
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

  // Initial render of Master-Detail
  renderMasterList();
  selectProject(0, false);

  // ==========================================================================
  // 3. TOC SCROLL-SPY NAVIGATION
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

    // Close on navigation link click on mobile
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

  // ==========================================================================
  // 4. LEETCODE TELEMETRY READOUT (API SYNC + CACHE + HARDENED PROXY)
  // ==========================================================================
  const leetcodeUsername = "cseabhinav2005";
  const localProxyUrl = `/api/leetcode?username=${leetcodeUsername}`;
  const deployedProxyUrl = `https://coderabhinavanand.netlify.app/api/leetcode?username=${leetcodeUsername}`;
  const secondaryApiUrl = `https://leetcode-api-1.vercel.app/${leetcodeUsername}`;

  // Verified real data baseline (current verified count: 10 solved)
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

    // Easy
    const easyPct = data.totalEasy > 0 ? (data.easySolved / data.totalEasy) * 100 : 0;
    if (easyScore) easyScore.textContent = `${data.easySolved} / ${data.totalEasy}`;
    if (easyBar) easyBar.style.width = `${Math.max(easyPct, 1.5)}%`;

    // Medium
    const medPct = data.totalMedium > 0 ? (data.mediumSolved / data.totalMedium) * 100 : 0;
    if (medScore) medScore.textContent = `${data.mediumSolved} / ${data.totalMedium}`;
    if (medBar) medBar.style.width = `${Math.max(medPct, 1.5)}%`;

    // Hard
    const hardPct = data.totalHard > 0 ? (data.hardSolved / data.totalHard) * 100 : 0;
    if (hardScore) hardScore.textContent = `${data.hardSolved} / ${data.totalHard}`;
    if (hardBar) hardBar.style.width = `${hardPct}%`;

    // Submissions Table
    if (submissionsTableBody) {
      submissionsTableBody.innerHTML = "";
      const subs = (data.recentSubmissions && data.recentSubmissions.length > 0)
        ? data.recentSubmissions.slice(0, 4)
        : FALLBACK_LEETCODE.recentSubmissions;

      subs.forEach((sub) => {
        const title = sub.title || sub.titleName || "Problem";
        const slug = sub.titleSlug || "problem";
        const lang = sub.lang || sub.langName || "C++";
        const time = formatTimeAgo(sub.timestamp || sub.submitTime);
        const status = sub.statusDisplay || sub.status || "Accepted";

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>
            <a href="https://leetcode.com/problems/${encodeURIComponent(slug)}/" target="_blank" rel="noopener noreferrer" class="sub-link">
              ${title}
            </a>
          </td>
          <td><span class="tech-chip" style="font-size: 0.65rem;">${lang}</span></td>
          <td><span class="sub-status-tag accepted">${status}</span></td>
          <td style="color: var(--text-low);">${time}</td>
        `;
        submissionsTableBody.appendChild(tr);
      });
    }
  }

  async function fetchLeetCodeData(force = false) {
    const syncIcon = syncBtn ? syncBtn.querySelector("i") : null;
    if (syncIcon) syncIcon.classList.add("fa-spin");
    updateSyncStatus("SYNCING TELEMETRY...", "CONNECTING GATEWAY...");

    const cached = localStorage.getItem("lc-console-data");
    const cachedTime = localStorage.getItem("lc-console-time");

    // Check client-side cache (30-minute validity)
    if (!force && cached && cachedTime) {
      const ageMs = Date.now() - parseInt(cachedTime, 10);
      if (ageMs < 30 * 60 * 1000) {
        try {
          const parsed = JSON.parse(cached);
          renderLeetCodeTelemetry(parsed);
          updateSyncStatus("CACHED", `LAST SYNCED: ${formatTimeAgo(Math.floor(parseInt(cachedTime, 10) / 1000))}`);
          if (syncIcon) syncIcon.classList.remove("fa-spin");
          return;
        } catch (e) {
          console.warn("Invalid cache in localStorage, refetching...", e);
        }
      }
    }

    let fetchSuccess = false;
    let finalData = null;
    let syncSourceLabel = "LIVE SYNCED";

    // Tier 1: Try local serverless endpoint (same-origin on deployed Netlify/Vercel)
    try {
      const res = await fetch(localProxyUrl, { signal: AbortSignal.timeout(4000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = await res.json();
      if (!raw || typeof raw.totalSolved !== "number") throw new Error("Invalid payload");
      finalData = raw;
      fetchSuccess = true;
      syncSourceLabel = "LIVE SYNCED";
    } catch (err1) {
      console.warn("Same-origin serverless proxy failed, attempting deployed proxy...", err1);

      // Tier 1b: Try deployed proxy directly (handles local static server like python -m http.server)
      try {
        const res = await fetch(deployedProxyUrl, { signal: AbortSignal.timeout(5000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        if (!raw || typeof raw.totalSolved !== "number") throw new Error("Invalid payload");
        finalData = raw;
        fetchSuccess = true;
        syncSourceLabel = "LIVE SYNCED";
      } catch (err2) {
        console.warn("Deployed serverless proxy failed, checking secondary fallback proxy...", err2);

        // Tier 2: Try secondary fallback proxy (leetcode-api-1.vercel.app)
        try {
          const [solvedRes, infoRes] = await Promise.all([
            fetch(`${secondaryApiUrl}/solved`, { signal: AbortSignal.timeout(5000) }),
            fetch(secondaryApiUrl, { signal: AbortSignal.timeout(5000) })
          ]);
          if (!solvedRes.ok || !infoRes.ok) throw new Error("Secondary API responded with error");

          const solved = await solvedRes.json();
          const info = await infoRes.json();

          finalData = {
            totalSolved: solved.solvedProblem ?? FALLBACK_LEETCODE.totalSolved,
            totalQuestions: 4042,
            easySolved: solved.easySolved ?? FALLBACK_LEETCODE.easySolved,
            totalEasy: 962,
            mediumSolved: solved.mediumSolved ?? FALLBACK_LEETCODE.mediumSolved,
            totalMedium: 2109,
            hardSolved: solved.hardSolved ?? 0,
            totalHard: 971,
            ranking: info.ranking ?? FALLBACK_LEETCODE.ranking,
            contributionPoints: info.contributionPoint ?? 0,
            reputation: info.reputation ?? 0,
            recentSubmissions: FALLBACK_LEETCODE.recentSubmissions
          };
          fetchSuccess = true;
          syncSourceLabel = "FALLBACK PROXY SYNCED";
        } catch (err3) {
          console.warn("All live network gateways failed.", err3);
          fetchSuccess = false;
        }
      }
    }

    if (fetchSuccess && finalData) {
      const mapped = {
        totalSolved: finalData.totalSolved ?? FALLBACK_LEETCODE.totalSolved,
        totalQuestions: finalData.totalQuestions ?? 4042,
        easySolved: finalData.easySolved ?? FALLBACK_LEETCODE.easySolved,
        totalEasy: finalData.totalEasy ?? 962,
        mediumSolved: finalData.mediumSolved ?? FALLBACK_LEETCODE.mediumSolved,
        totalMedium: finalData.totalMedium ?? 2109,
        hardSolved: finalData.hardSolved ?? 0,
        totalHard: finalData.totalHard ?? 971,
        ranking: finalData.ranking ?? FALLBACK_LEETCODE.ranking,
        contributionPoints: finalData.contributionPoints ?? finalData.contributionPoint ?? 0,
        reputation: finalData.reputation ?? 0,
        recentSubmissions: finalData.recentSubmissions && finalData.recentSubmissions.length > 0
          ? finalData.recentSubmissions
          : FALLBACK_LEETCODE.recentSubmissions
      };

      const now = Date.now();
      localStorage.setItem("lc-console-data", JSON.stringify(mapped));
      localStorage.setItem("lc-console-time", now.toString());

      renderLeetCodeTelemetry(mapped);
      updateSyncStatus(syncSourceLabel, "LAST SYNCED: JUST NOW");
    } else {
      // Failure hardening: do not silently display numbers without visual indicator
      if (cached && cachedTime) {
        try {
          const cachedParsed = JSON.parse(cached);
          renderLeetCodeTelemetry(cachedParsed);
          const cachedSec = Math.floor(parseInt(cachedTime, 10) / 1000);
          updateSyncStatus("SYNC FAILED // SHOWING LAST KNOWN GOOD DATA", `CACHED: ${formatTimeAgo(cachedSec)}`, true);
        } catch (e) {
          renderLeetCodeTelemetry(FALLBACK_LEETCODE);
          updateSyncStatus("OFFLINE // USING VERIFIED BASELINE ARCHIVE", "BASELINE ARCHIVE", true);
        }
      } else {
        renderLeetCodeTelemetry(FALLBACK_LEETCODE);
        updateSyncStatus("OFFLINE // USING VERIFIED BASELINE ARCHIVE", "BASELINE ARCHIVE", true);
      }
    }

    if (syncIcon) syncIcon.classList.remove("fa-spin");
  }

  if (syncBtn) {
    syncBtn.addEventListener("click", () => fetchLeetCodeData(true));
  }
  fetchLeetCodeData(false);

  // ==========================================================================
  // 5. WEB3FORMS CONTACT SUBMISSION
  // ==========================================================================
  const contactForm = document.getElementById("contactForm");
  const formButton = document.getElementById("formButton");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!formButton || !formStatus) return;

      const formData = new FormData(contactForm);
      const json = JSON.stringify(Object.fromEntries(formData));

      formStatus.className = "form-status font-mono";
      formStatus.classList.remove("hidden");
      formStatus.textContent = "TRANSMITTING INQUIRY...";
      formButton.disabled = true;

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        });

        const result = await response.json();
        if (response.status === 200) {
          formStatus.className = "form-status success";
          formStatus.textContent = "TRANSMISSION SUCCESSFUL // STATUS: 200 OK";
          contactForm.reset();
        } else {
          formStatus.className = "form-status error";
          formStatus.textContent = `ERR // ${result.message || "Failed to submit"}`;
        }
      } catch (error) {
        console.error("Transmission error:", error);
        formStatus.className = "form-status error";
        formStatus.textContent = "NETWORK_ERROR // Could not connect to gateway.";
      } finally {
        formButton.disabled = false;
        setTimeout(() => {
          if (formStatus) formStatus.classList.add("hidden");
        }, 5000);
      }
    });
  }

  // ==========================================================================
  // 6. SYSTEM TIMESTAMP FOOTER META
  // ==========================================================================
  const sysClock = document.getElementById("sys-clock");
  function updateSysClock() {
    if (!sysClock) return;
    const now = new Date();
    const utc = now.toISOString().replace("T", " ").substring(0, 19) + " UTC";
    sysClock.textContent = utc;
  }
  updateSysClock();
  setInterval(updateSysClock, 1000);

  // ==========================================================================
  // 7. SUBTLE SCROLL REVEAL (NO GLOW, NO BOUNCE)
  // ==========================================================================
  const revealItems = document.querySelectorAll(".reveal-on-scroll");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealItems.forEach((el) => revealObserver.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  // ==========================================================================
  // 8. GITHUB CREDIBILITY SIGNAL (LIVE REST API + CACHE + FALLBACK)
  // ==========================================================================
  const ghRepoCountEl = document.getElementById("gh-repo-count");
  const ghRepoSyncEl = document.getElementById("gh-repo-sync");
  const GITHUB_FALLBACK = {
    public_repos: 7,
    status: "Verified Archive"
  };

  async function fetchGitHubMetrics() {
    const cached = localStorage.getItem("gh-console-data");
    const cachedTime = localStorage.getItem("gh-console-time");

    if (cached && cachedTime && (Date.now() - parseInt(cachedTime, 10) < 60 * 60 * 1000)) {
      try {
        const parsed = JSON.parse(cached);
        if (ghRepoCountEl) ghRepoCountEl.textContent = parsed.public_repos;
        if (ghRepoSyncEl) ghRepoSyncEl.textContent = "● Cached";
        return;
      } catch (e) {}
    }

    try {
      const res = await fetch("https://api.github.com/users/abhinavbuilds2005", {
        headers: { Accept: "application/vnd.github.v3+json" },
        signal: AbortSignal.timeout(4000)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const repos = typeof data.public_repos === "number" ? data.public_repos : GITHUB_FALLBACK.public_repos;

      localStorage.setItem("gh-console-data", JSON.stringify({ public_repos: repos }));
      localStorage.setItem("gh-console-time", Date.now().toString());

      if (ghRepoCountEl) ghRepoCountEl.textContent = repos;
      if (ghRepoSyncEl) ghRepoSyncEl.textContent = "● Live";
    } catch (err) {
      console.warn("GitHub API rate-limited or offline, using fallback:", err);
      if (ghRepoCountEl) ghRepoCountEl.textContent = GITHUB_FALLBACK.public_repos;
      if (ghRepoSyncEl) ghRepoSyncEl.textContent = "● Baseline";
    }
  }
  fetchGitHubMetrics();

  // ==========================================================================
  // 9. COMMAND PALETTE (CMD+K / CTRL+K OVERLAY)
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

  function selectProjectDirect(index) {
    selectProject(index);
    scrollToSection("work");
  }

  const COMMAND_REGISTRY = [
    // Navigation
    { id: "nav-home", group: "Navigation", label: "01 // System Overview", hint: "#home", action: () => scrollToSection("home") },
    { id: "nav-expertise", group: "Navigation", label: "02 // Technical Competencies & Matrix", hint: "#expertise", action: () => scrollToSection("expertise") },
    { id: "nav-work", group: "Navigation", label: "03 // Master-Detail Work Index", hint: "#work", action: () => scrollToSection("work") },
    { id: "nav-leetcode", group: "Navigation", label: "04 // LeetCode Telemetry & Metrics", hint: "#leetcode", action: () => scrollToSection("leetcode") },
    { id: "nav-certs", group: "Navigation", label: "05 // Milestones & Verified Certifications", hint: "#certifications", action: () => scrollToSection("certifications") },
    { id: "nav-contact", group: "Navigation", label: "06 // Communication Console", hint: "#contact", action: () => scrollToSection("contact") },

    // Projects (Direct select in master-detail console)
    { id: "proj-0", group: "Projects", label: "CreditWise: AI Loan Default Prediction", hint: "AI/ML [01]", action: () => selectProjectDirect(0) },
    { id: "proj-1", group: "Projects", label: "SmartCart AI: Customer Intelligence Platform", hint: "AI/ML [02]", action: () => selectProjectDirect(1) },
    { id: "proj-2", group: "Projects", label: "Personal Portfolio v2 (Console Engineering Hub)", hint: "WEB [03]", action: () => selectProjectDirect(2) },
    { id: "proj-3", group: "Projects", label: "PresentAI: Multimodal Biometric Attendance", hint: "AI/ML [04]", action: () => selectProjectDirect(3) },
    { id: "proj-4", group: "Projects", label: "ElevateCV: ATS Resume Scoring Engine", hint: "AI/ML [05]", action: () => selectProjectDirect(4) },
    { id: "proj-5", group: "Projects", label: "Voice Assistant & Operating System Automation", hint: "PYTHON [06]", action: () => selectProjectDirect(5) },
    { id: "proj-6", group: "Projects", label: "Neural Style Transfer (PyTorch VGG-19)", hint: "DL [07]", action: () => selectProjectDirect(6) },
    { id: "proj-7", group: "Projects", label: "AI Fitness Coach & Real-Time Pose Correction", hint: "CV [08]", action: () => selectProjectDirect(7) },

    // Actions
    { id: "act-cv-aiml", group: "Actions", label: "Download Specialized AI/ML Curriculum Vitae (PDF)", hint: "FILE", action: () => window.open("Abhinav_Anand_Resume_AIML_Specialized.pdf", "_blank") },
    { id: "act-cv-gen", group: "Actions", label: "Download General Engineering Resume (PDF)", hint: "FILE", action: () => window.open("Abhinav_Resume.pdf", "_blank") },
    { id: "act-gh", group: "Actions", label: "Open GitHub Profile (@abhinavbuilds2005)", hint: "EXTERNAL", action: () => window.open("https://github.com/abhinavbuilds2005", "_blank") },
    { id: "act-li", group: "Actions", label: "Open LinkedIn Profile (/in/abhinav-anand-865926300)", hint: "EXTERNAL", action: () => window.open("https://www.linkedin.com/in/abhinav-anand-865926300", "_blank") },
    { id: "act-lc-sync", group: "Actions", label: "Force Re-Sync LeetCode Telemetry", hint: "API", action: () => { scrollToSection("leetcode"); fetchLeetCodeData(true); } }
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
      : COMMAND_REGISTRY.filter(cmd => {
          return cmd.label.toLowerCase().includes(cleanQ) ||
                 cmd.group.toLowerCase().includes(cleanQ) ||
                 cmd.hint.toLowerCase().includes(cleanQ);
        });

    if (filteredCommands.length === 0) {
      cmdPaletteList.innerHTML = `<div class="cmd-palette-empty">NO MATCHING COMMANDS FOR "${query.toUpperCase()}"</div>`;
      return;
    }

    if (selectedCmdIndex >= filteredCommands.length) selectedCmdIndex = 0;

    let html = "";
    let currentGroup = "";

    filteredCommands.forEach((cmd, idx) => {
      if (cmd.group !== currentGroup) {
        currentGroup = cmd.group;
        html += `<div class="cmd-group-label">${currentGroup}</div>`;
      }

      const isSelected = idx === selectedCmdIndex;
      const iconClass = cmd.group === "Navigation" ? "fas fa-compass" :
                        cmd.group === "Projects" ? "fas fa-cube" : "fas fa-bolt";

      html += `
        <div class="cmd-item ${isSelected ? "selected" : ""}" data-cmd-idx="${idx}" role="option" aria-selected="${isSelected}">
          <div class="cmd-item-left">
            <i class="${iconClass}"></i>
            <span>${cmd.label}</span>
          </div>
          <span class="cmd-item-tag">${cmd.hint}</span>
        </div>
      `;
    });

    cmdPaletteList.innerHTML = html;

    // Scroll selected item into view
    const selectedEl = cmdPaletteList.querySelector(".cmd-item.selected");
    if (selectedEl) selectedEl.scrollIntoView({ block: "nearest" });

    // Attach click listeners to items
    const itemEls = cmdPaletteList.querySelectorAll(".cmd-item");
    itemEls.forEach(el => {
      el.addEventListener("click", () => {
        const idx = parseInt(el.getAttribute("data-cmd-idx"), 10);
        executeCommand(idx);
      });
      el.addEventListener("mouseenter", () => {
        const idx = parseInt(el.getAttribute("data-cmd-idx"), 10);
        selectedCmdIndex = idx;
        updateSelectedCmdVisual();
      });
    });
  }

  function updateSelectedCmdVisual() {
    const itemEls = cmdPaletteList ? cmdPaletteList.querySelectorAll(".cmd-item") : [];
    itemEls.forEach((el, idx) => {
      if (idx === selectedCmdIndex) {
        el.classList.add("selected");
        el.setAttribute("aria-selected", "true");
        el.scrollIntoView({ block: "nearest" });
      } else {
        el.classList.remove("selected");
        el.setAttribute("aria-selected", "false");
      }
    });
  }

  function executeCommand(index) {
    const cmd = filteredCommands[index];
    if (cmd && typeof cmd.action === "function") {
      closeCommandPalette();
      cmd.action();
    }
  }

  // Global Keyboard Listener for Cmd+K and Ctrl+K
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (cmdPalette && cmdPalette.hasAttribute("hidden")) {
        openCommandPalette();
      } else {
        closeCommandPalette();
      }
      return;
    }

    if (!cmdPalette || cmdPalette.hasAttribute("hidden")) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeCommandPalette();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedCmdIndex = (selectedCmdIndex + 1) % filteredCommands.length;
        updateSelectedCmdVisual();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedCmdIndex = (selectedCmdIndex - 1 + filteredCommands.length) % filteredCommands.length;
        updateSelectedCmdVisual();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands.length > 0) {
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

  if (cmdPaletteBackdrop) cmdPaletteBackdrop.addEventListener("click", closeCommandPalette);
  if (cmdTriggerSidebar) cmdTriggerSidebar.addEventListener("click", openCommandPalette);
  if (cmdTriggerMobile) cmdTriggerMobile.addEventListener("click", openCommandPalette);
});

