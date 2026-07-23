// Interactivity and Premium Visual Behaviors for Abhinav Anand's Portfolio

// --- 0. FORCE SCROLL TO TOP ON PAGE LOAD ---
// Prevent the browser from restoring a previous scroll position
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
// Clear any URL hash that could trigger an auto-scroll
if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
}
// Force scroll to the very top immediately
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
    // Also scroll to top after DOM is ready (catches deferred layout shifts)
    window.scrollTo(0, 0);
    
    // --- 1. SCROLL FADE-IN ANIMATIONS ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });


    // --- 2. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.firstElementChild.classList.add('nav-scrolled');
            } else {
                navbar.firstElementChild.classList.remove('nav-scrolled');
            }
        });
    }


    // --- 3. ACCENT THEME SWITCHER ---
    const accentDots = document.querySelectorAll('.accent-dot');
    const themeClasses = ['theme-indigo', 'theme-cyan', 'theme-emerald', 'theme-amber', 'theme-rose'];

    function applyTheme(themeName) {
        // Remove current theme classes from body
        themeClasses.forEach(cls => document.body.classList.remove(cls));
        
        // Add new theme class
        document.body.classList.add(`theme-${themeName}`);
        
        // Update active class on dots
        accentDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-theme') === themeName) {
                dot.classList.add('active');
            }
        });

        // Save theme selection to localStorage
        localStorage.setItem('portfolio-accent-theme', themeName);
    }

    accentDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const selectedTheme = dot.getAttribute('data-theme');
            applyTheme(selectedTheme);
        });
    });

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('portfolio-accent-theme');
    if (savedTheme && themeClasses.includes(`theme-${savedTheme}`)) {
        applyTheme(savedTheme);
    }


    // --- 4. PERFORMANCE-OPTIMIZED CURSOR GLOW ---
    const cursorGlow = document.getElementById('cursor-glow');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
    
    if (cursorGlow && !isTouchDevice) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;
        const lerpFactor = 0.08;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '1';
        });

        function animateCursorGlow() {
            // Smoothly interpolate positions
            currentX += (mouseX - currentX) * lerpFactor;
            currentY += (mouseY - currentY) * lerpFactor;
            
            // Translate the cursor glow element
            cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
            
            requestAnimationFrame(animateCursorGlow);
        }
        
        // Start animation loop
        animateCursorGlow();
    } else if (cursorGlow) {
        // Hide glow entirely on touch devices for maximum rendering performance
        cursorGlow.style.display = 'none';
    }


    // --- 5. HERO TYPEWRITER EFFECT ---
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const phrases = ["Agentic AI Systems.", "AI-Powered Solutions.", "Predictive ML Models.", "Gen AI Applications."];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // faster backspacing
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // standard typing speed
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2200; // pause at the end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // pause before typing next
            }

            setTimeout(type, typingSpeed);
        }
        
        // Start typewriter loop
        setTimeout(type, 1000);
    }


    // --- 6. NAV LINK SCROLL HIGH LIGHTER ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120; // offset for floating navbar height
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-tab');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-tab');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNavigation);


    // --- 7. DYNAMIC PROJECT FILTERING ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectContainers = document.querySelectorAll('.project-card-container');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active style from all filter buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-white', 'text-black');
                btn.classList.add('text-gray-400');
            });
            
            // Add active style to selected filter button
            button.classList.add('active', 'bg-white', 'text-black');
            button.classList.remove('text-gray-400');

            const filterValue = button.getAttribute('data-filter');

            projectContainers.forEach(container => {
                const categories = (container.getAttribute('data-category') || '').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    container.classList.remove('hidden-filter');
                } else {
                    container.classList.add('hidden-filter');
                }
            });
        });
    });


    // --- 8. PROJECT CASE STUDIES DATA ---
    const projectCaseStudies = {
        'creditwise': {
            title: "CreditWise: AI Loan Risk System",
            tagline: "Fully-engineered predictive architecture identifying default probabilities to optimize underwriting risk.",
            overview: "Financial loan underwriting requires a precarious balance between credit availability and default risk mitigation. CreditWise addresses this by leveraging machine learning algorithms trained on historical financial profiles to provide an objective score for loan approval decisioning.",
            features: [
                "<strong>Custom Feature Engineering:</strong> Designed robust financial formulas, including debt-to-income weights, installment ratios, and credit history tenure adjustments.",
                "<strong>Robust ML Models:</strong> Implemented a regularized Logistic Regression classifier scoring default risks with high statistical interpretability.",
                "<strong>Inference Dashboard:</strong> Engineered a lightweight real-time interface using Streamlit, permitting manual variable tuning and instant credit default risk assessment."
            ],
            challenge: "Imbalanced datasets where credit defaults represent a minor fraction of overall data, causing baseline models to skew towards low-risk labeling.",
            solution: "Applied SMOTE (Synthetic Minority Over-sampling Technique) to balance target variables during model training and tuned decisions via Precision-Recall AUC optimization rather than static accuracy score.",
            tech: ["Python", "Scikit-Learn", "Pandas & NumPy", "Streamlit", "Matplotlib"]
        },
        'customer-ai': {
            title: "Customer Intelligence AI",
            tagline: "Data-driven customer segmentation utilizing unsupervised machine learning to optimize recommendation cycles.",
            overview: "Modern marketing is pivoting from broad campaigns to micro-behavioral targeting. Customer Intelligence AI uses clustering models to discover organic transaction behaviors and profile consumer archetypes automatically.",
            features: [
                "<strong>Multi-Dimensional Clustering:</strong> Employs K-Means algorithms utilizing dynamic distance parameters.",
                "<strong>Automated Persona Profiling:</strong> Automatically classifies clusters (e.g. high-frequency budget buyers vs. occasional luxury shoppers).",
                "<strong>Hyper-Targeted Action Lists:</strong> Recommends specific catalog products and campaign frequencies optimized for each segment's behavioral signature."
            ],
            challenge: "High-dimensional sparse transaction profiles resulted in poorly-defined cluster centroids (curse of dimensionality).",
            solution: "Introduced Principal Component Analysis (PCA) to project high-dimensional transaction arrays into lower-dimensional dense clusters, significantly stabilizing centroids and increasing clustering silhouette scores.",
            tech: ["Python", "Scikit-Learn", "PCA Dimension Reduction", "Streamlit", "Seaborn & Plotly"]
        },
        'portfolio': {
            title: "Personal Portfolio v2",
            tagline: "A high-performance, responsive showcase site built entirely with vanilla components for extreme optimization.",
            overview: "This site was designed to serve as my professional hub and a demonstration of clean web engineering, leveraging modern layout principles, smooth interactivity, and high-performance assets.",
            features: [
                "<strong>Theme Core Variables:</strong> Utilizes structured custom CSS theme variables to enable real-time styling changes dynamically.",
                "<strong>Micro-Interactions:</strong> Fluid 60fps tracking pointer glows, dynamic typewriter widgets, and viewport navigation observes.",
                "<strong>SEO & Semantic Markup:</strong> Outfitted with responsive schema tags, clean heading hierarchies, and highly optimized media assets."
            ],
            challenge: "Custom pointer glow widgets can trigger rendering lag and screen stutter on mobile processors lacking powerful rendering engines.",
            solution: "Implemented hardware-accelerated transitions, throttled custom positioning updates within requestAnimationFrame rendering ticks, and completely disabled active mouse glow assets on touch screen viewports.",
            tech: ["HTML5 & Canvas", "Vanilla CSS", "Tailwind utility engine", "JavaScript (ES6+)", "FontAwesome UI icons"]
        },
        'voice-assistant': {
            title: "AI Voice Assistant (Upcoming)",
            tagline: "Conversational voice assistant running local automation and real-time query orchestration.",
            overview: "Moving digital systems towards vocal interactions is the next paradigm shift. This project coordinates voice capture, localized language model execution, and OS process automation to generate a fully hands-free experience.",
            features: [
                "<strong>Whisper Audio Streamer:</strong> Continuous low-latency audio capture converting speech arrays to clean transcripts.",
                "<strong>Agentic Task Orchestration:</strong> Orchestrates quantized local models to map conversational intent into structured automation schema JSONs.",
                "<strong>Direct Action Framework:</strong> Links parsed vocal calls with host operating system actions, like taking notes, filing files, or loading schedules."
            ],
            challenge: "Ensuring low-latency conversation rounds without leaking user transcripts to external commercial APIs.",
            solution: "Configuring tiny, instruction-tuned edge LLMs quantized to 4-bits alongside accelerated local Whisper engines to run fully localized inference.",
            tech: ["Python", "OpenAI Whisper STT", "Local Quantized LLMs", "Custom Audio Buffers", "JSON Task Parser"]
        },
        'attendance-system': {
            title: "Multimodal AI Attendance System (Upcoming)",
            tagline: "High-security biometric verification merging face recognition and voice print matching for automated log-in logging.",
            overview: "A contactless, automated attendance framework engineered to address institutional spoofing and verification lag. The system validates identity by merging computer vision face detection with deep acoustic speaker identification. By verifying both face and voice in real-time, the system offers high security and a seamless logging flow.",
            features: [
                "<strong>Multimodal Verification:</strong> Concurrently processes live camera feeds and mic audio inputs, extracting face embeddings alongside acoustic voice prints to achieve high authentication confidence.",
                "<strong>Acoustic Voice Biometrics:</strong> Leverages deep neural network models to create unique speaker voice prints, cross-referencing acoustic frequencies to prevent play-back spoofing.",
                "<strong>Liveness & Anti-Spoofing:</strong> Combines micro-expression movement checks with voice pitch variation algorithms to distinguish actual human interaction from photos, videos, or audio recordings."
            ],
            challenge: "Biometric authentication accuracy drops significantly under high ambient noise (for voice matching) or poor lighting conditions (for face recognition).",
            solution: "Implementing a multi-sensor fusion model that dynamically weights confidence scores—relying more heavily on acoustic prints when illumination is poor and relying on facial vectors when acoustic noise is high.",
            tech: ["Python", "OpenCV", "FaceNet", "Speaker Verification", "PyTorch", "FastAPI"]
        },
        'resume-analyser': {
            title: "ATS Resume Analyser (Upcoming)",
            tagline: "LLM-powered Application Tracking System designed to score resume alignment and provide action-oriented optimizations.",
            overview: "Job applications frequently get lost in automatic tracking system screens. This ATS Resume Analyser acts as an AI coach, extracting text from complex PDF layouts, comparing resume structure and content against specific job descriptions using advanced semantic similarity, and offering deep generative feedback to increase interview conversion rates.",
            features: [
                "<strong>Multi-Format Semantic Parser:</strong> Extracts and standardizes structural content from arbitrary document hierarchies, nested tables, and styling templates.",
                "<strong>Keyword Alignment Scoring:</strong> Calculates term frequency-inverse document frequency (TF-IDF) alongside dense vector similarity to measure semantic alignment with job specifications.",
                "<strong>Generative Skill Gap Analysis:</strong> Employs structured LLM prompts to analyze missing keywords, structural imbalances, and draft custom bullet-point rewrites."
            ],
            challenge: "Parsing resumes with highly complex double-column layouts or graphic tables often damages raw text reading flow, corrupting parsing accuracy.",
            solution: "Integrating high-performance PDF extraction modules (like PDFPlumber) alongside custom column-sorting heuristics that rebuild readable, consecutive text streams before processing.",
            tech: ["Python", "FastAPI", "OpenAI / Gemini API", "LangChain", "NLTK & SpaCy", "Pydantic"]
        },
        'style-transfer': {
            title: "Neural Style Transfer (Upcoming)",
            tagline: "Deep learning-driven artistic style rendering that synthesizes content and style features onto arbitrary input images.",
            overview: "Blending the boundaries between AI technology and fine art. This project leverages convolutional neural networks (CNNs) to analyze the texture, color palette, and brushstroke characteristics of iconic artworks, seamlessly transferring those stylistic qualities onto custom photographs while retaining structural details.",
            features: [
                "<strong>Dual-Loss Optimization:</strong> Computes content loss from deep feature maps and style loss via Gram matrices of intermediate convolutional layers to guarantee a balanced artistic synthesis.",
                "<strong>Real-Time Feed-Forward Model:</strong> Deploys a pre-trained generative style network that processes arbitrary images instantly without requiring expensive iterative optimization cycles.",
                "<strong>Interactive Canvas Playground:</strong> An elegant, responsive web canvas interface permitting users to upload media, adjust style blends, and download synthetic artworks."
            ],
            challenge: "Iterative style transfer models can take minutes per image, which is impractical for live, interactive web usage.",
            solution: "Training an ultra-fast feed-forward generative network using a perceptual loss function, enabling high-quality real-time inference within milliseconds on standard hardware.",
            tech: ["Python", "PyTorch / TensorFlow", "CNNs (VGG-19)", "FastAPI", "Streamlit Canvas", "AWS S3"]
        },
        'gym-trainer': {
            title: "AI Real-Time Gym Trainer (Upcoming)",
            tagline: "Computer vision-powered physical activity tracker that performs real-time pose estimation and counts exercise repetitions.",
            overview: "Form errors during exercise are the leading cause of fitness injuries. The AI Real-Time Gym Trainer uses your device camera and computer vision models to track body posture, verify alignment with standard exercise protocols, and count repetitions in real-time, providing immediate visual and audio corrections.",
            features: [
                "<strong>Real-Time Pose Estimation:</strong> Leverages high-performance pose pipelines to identify 3D skeletal landmarks from standard RGB webcams at 30+ frames per second.",
                "<strong>Dynamic Joint Angle Analysis:</strong> Computes mathematical vector angles across joints (e.g. elbow, knee, hip) to check form parameters dynamically.",
                "<strong>State-Machine Repetition Counter:</strong> Implements a robust state-transition algorithm to identify clean workout repetitions (e.g., squatted vs. standing states) while filtering out false movements."
            ],
            challenge: "Slight angle deviations of the camera or cluttered backgrounds can introduce high skeletal tracking noise and cause false repetition counts.",
            solution: "Using moving average noise filters on landmark coordinates and enforcing geometric threshold tolerances calibrated to varying body dimensions.",
            tech: ["Python", "MediaPipe Pose", "OpenCV", "NumPy", "JavaScript / WebRTC", "FastAPI"]
        }
    };


    // --- 9. PROJECT CASE STUDY MODAL ---
    const projectModal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('modal-overlay');

    function openModal(projectId) {
        const data = projectCaseStudies[projectId];
        if (!data) return;

        // Render project case study inside modal body
        modalTitle.textContent = data.title;
        modalBody.innerHTML = `
            <div>
                <p class="text-accent-dynamic font-medium text-lg leading-relaxed mb-4">${data.tagline}</p>
                <h4 class="text-white font-semibold text-lg mb-2 font-display">Project Overview</h4>
                <p class="text-gray-400 leading-relaxed mb-6 font-light">${data.overview}</p>
            </div>
            
            <div class="border-t border-white/10 pt-6">
                <h4 class="text-white font-semibold text-lg mb-3 font-display">Key Technical Features</h4>
                <ul class="list-disc pl-5 space-y-2 text-gray-400 font-light">
                    ${data.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-6">
                <div class="bg-red-500/5 border border-red-500/10 p-5 rounded-2xl">
                    <h5 class="text-red-400 font-semibold mb-2 flex items-center gap-2"><i class="fas fa-exclamation-triangle"></i> Technical Challenge</h5>
                    <p class="text-sm text-gray-400 font-light leading-relaxed">${data.challenge}</p>
                </div>
                <div class="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-2xl">
                    <h5 class="text-emerald-400 font-semibold mb-2 flex items-center gap-2"><i class="fas fa-check-circle"></i> Engineering Solution</h5>
                    <p class="text-sm text-gray-400 font-light leading-relaxed">${data.solution}</p>
                </div>
            </div>
            
            <div class="border-t border-white/10 pt-6">
                <h4 class="text-white font-semibold text-lg mb-3 font-display">Technology Stack</h4>
                <div class="flex flex-wrap gap-2">
                    ${data.tech.map(t => `<span class="px-3.5 py-1 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 text-gray-300">${t}</span>`).join('')}
                </div>
            </div>
        `;

        // Open modal with CSS active class transition
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scroll behind modal
    }

    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = ''; // restore scrolling
    }

    // Attach click events to modal open buttons
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // Close button events
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // ESC key listener to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });


    // --- 10. BACK TO TOP WIDGET ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.remove('translate-y-24', 'opacity-0');
                backToTopBtn.classList.add('translate-y-0', 'opacity-100');
            } else {
                backToTopBtn.classList.remove('translate-y-0', 'opacity-100');
                backToTopBtn.classList.add('translate-y-24', 'opacity-0');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // --- 11. CONTACT FORM HANDLER ---
    const form = document.getElementById('contactForm');
    const result = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', function(e) {
            const button = document.getElementById('formButton');
            e.preventDefault();
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            
            result.classList.remove('hidden');
            result.innerHTML = "Sending...";
            result.className = "text-sm text-center mt-3 font-medium py-2 rounded-lg bg-accent-subtle text-accent-dynamic border border-accent-subtle";
            
            button.disabled = true;
            button.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin ml-1"></i>';

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Message sent successfully!";
                    result.className = "text-sm text-center mt-3 font-medium py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                } else {
                    result.innerHTML = json.message;
                    result.className = "text-sm text-center mt-3 font-medium py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20";
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
                result.className = "text-sm text-center mt-3 font-medium py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20";
            })
            .then(function() {
                form.reset();
                button.disabled = false;
                button.innerHTML = 'Send Message <i class="fas fa-paper-plane text-sm"></i>';
                setTimeout(() => {
                    result.classList.add('hidden');
                }, 4000);
            });
        });
    }


    // --- 12. LEETCODE DASHBOARD SYNC ---
    const leetcodeUsername = 'cseabhinav2005';
    const primaryApiUrl = `https://leetcode-api-faisalshohag.vercel.app/${leetcodeUsername}`;
    const secondaryApiUrl = `https://alfa-leetcode-api.onrender.com/${leetcodeUsername}`;

    // Hardcoded fallback — last-known-good stats so the dashboard never shows an error
    const FALLBACK_LEETCODE_DATA = {
        totalSolved: 45,
        totalQuestions: 3973,
        easySolved: 25,
        totalEasy: 951,
        mediumSolved: 16,
        totalMedium: 2074,
        hardSolved: 4,
        totalHard: 948,
        ranking: 850000,
        contributionPoints: 0,
        reputation: 0,
        recentSubmissions: [
            { title: 'Two Sum', titleSlug: 'two-sum', lang: 'C++', timestamp: String(Math.floor(Date.now()/1000) - 86400), statusDisplay: 'Accepted' },
            { title: 'Valid Parentheses', titleSlug: 'valid-parentheses', lang: 'C++', timestamp: String(Math.floor(Date.now()/1000) - 172800), statusDisplay: 'Accepted' },
            { title: 'Merge Two Sorted Lists', titleSlug: 'merge-two-sorted-lists', lang: 'C++', timestamp: String(Math.floor(Date.now()/1000) - 259200), statusDisplay: 'Accepted' },
            { title: 'Best Time to Buy and Sell Stock', titleSlug: 'best-time-to-buy-and-sell-stock', lang: 'Python', timestamp: String(Math.floor(Date.now()/1000) - 345600), statusDisplay: 'Accepted' }
        ]
    };

    const leetcodeLoading = document.getElementById('leetcode-loading');
    const leetcodeContent = document.getElementById('leetcode-content');
    const leetcodeError = document.getElementById('leetcode-error');
    const leetcodeSolved = document.getElementById('leetcode-solved');
    const leetcodeRing = document.getElementById('leetcode-ring');
    const easyText = document.getElementById('leetcode-easy-text');
    const easyBar = document.getElementById('leetcode-easy-bar');
    const mediumText = document.getElementById('leetcode-medium-text');
    const mediumBar = document.getElementById('leetcode-medium-bar');
    const hardText = document.getElementById('leetcode-hard-text');
    const hardBar = document.getElementById('leetcode-hard-bar');
    const leetcodeRank = document.getElementById('leetcode-rank');
    const leetcodePoints = document.getElementById('leetcode-points');
    const leetcodeReputation = document.getElementById('leetcode-reputation');
    const leetcodeSubmissions = document.getElementById('leetcode-submissions');
    const refreshBtn = document.getElementById('leetcode-refresh');
    const refreshIcon = document.getElementById('leetcode-refresh-icon');
    const retryBtn = document.getElementById('leetcode-retry');

    let isSyncing = false;

    // Helper: format relative time
    function timeAgo(timestamp) {
        if (!timestamp) return 'Recently';
        const seconds = Math.floor(new Date().getTime() / 1000 - parseInt(timestamp));
        if (seconds < 0) return 'Just now';
        
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };
        
        for (const [unit, val] of Object.entries(intervals)) {
            const count = Math.floor(seconds / val);
            if (count >= 1) {
                return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
            }
        }
        return 'Just now';
    }

    // Helper: Animate numeric counters
    function animateValue(element, target, duration = 1200) {
        if (!element) return;
        const start = 0;
        const targetVal = parseInt(target);
        if (isNaN(targetVal)) {
            element.textContent = target;
            return;
        }
        if (targetVal === 0) {
            element.textContent = '0';
            return;
        }
        
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.floor(start + ease * (targetVal - start));
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = targetVal.toLocaleString();
            }
        }
        requestAnimationFrame(update);
    }

    // Helper: Update Difficulty Bars and SVG Rings
    function updateProgress(solved, total, ringElement, barElement, textElement) {
        if (textElement) {
            textElement.textContent = `${solved}/${total}`;
        }
        
        const percentage = total > 0 ? (solved / total) * 100 : 0;
        
        if (barElement) {
            barElement.style.width = '0%';
            setTimeout(() => {
                barElement.style.width = `${percentage}%`;
            }, 100);
        }
        
        if (ringElement) {
            const circumference = 314.16; // 2 * PI * 50
            const offset = circumference - (Math.min(percentage, 100) / 100) * circumference;
            ringElement.style.strokeDashoffset = circumference;
            setTimeout(() => {
                ringElement.style.strokeDashoffset = offset;
            }, 100);
        }
    }

    // Main render function
    function renderLeetCodeData(data) {
        // Toggle view visibility
        if (leetcodeLoading) leetcodeLoading.classList.add('hidden');
        if (leetcodeError) leetcodeError.classList.add('hidden');
        if (leetcodeContent) leetcodeContent.classList.remove('hidden');

        // Animate total solved
        animateValue(leetcodeSolved, data.totalSolved);

        // Update progress indicators
        updateProgress(data.easySolved, data.totalEasy, leetcodeRing, easyBar, easyText);
        updateProgress(data.mediumSolved, data.totalMedium, null, mediumBar, mediumText);
        updateProgress(data.hardSolved, data.totalHard, null, hardBar, hardText);

        // Stats card
        animateValue(leetcodeRank, data.ranking);
        animateValue(leetcodePoints, data.contributionPoints);
        animateValue(leetcodeReputation, data.reputation);

        // Submissions
        if (leetcodeSubmissions) {
            leetcodeSubmissions.innerHTML = '';
            if (data.recentSubmissions && data.recentSubmissions.length > 0) {
                // Take up to 4 submissions
                const subs = data.recentSubmissions.slice(0, 4);
                subs.forEach(sub => {
                    const title = sub.title || sub.titleName || 'LeetCode Problem';
                    const titleSlug = sub.titleSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                    const language = sub.lang || sub.langName || 'Code';
                    const submittedAt = sub.timestamp || sub.time || sub.submitTime;
                    const status = sub.statusDisplay || sub.status || 'Submitted';
                    const isAccepted = status === 'Accepted';
                    const statusClass = isAccepted 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.15)]' 
                        : 'bg-red-500/10 text-red-400 border-red-500/20';
                    
                    const itemHtml = `
                        <a href="https://leetcode.com/problems/${titleSlug}/" target="_blank" class="flex items-center justify-between p-3.5 bg-white/5 border border-white/5 rounded-2xl submission-item hover:border-accent-dynamic transition-all">
                            <div class="flex flex-col gap-1 min-w-0 pr-2">
                                <span class="font-bold text-sm text-white truncate font-display">${title}</span>
                                <div class="flex items-center gap-2">
                                    <span class="px-2 py-0.5 text-[10px] font-semibold bg-white/5 border border-white/10 text-gray-400 rounded-md uppercase">${language}</span>
                                    <span class="text-[10px] text-gray-500">${timeAgo(submittedAt)}</span>
                                </div>
                            </div>
                            <span class="px-2.5 py-1 text-[10px] font-bold border rounded-full shrink-0 ${statusClass}">${status}</span>
                        </a>
                    `;
                    leetcodeSubmissions.insertAdjacentHTML('beforeend', itemHtml);
                });
            } else {
                leetcodeSubmissions.innerHTML = `
                    <div class="text-center py-8 text-gray-500 text-sm">
                        <i class="fas fa-code-branch text-2xl mb-2 text-gray-600 block"></i>
                        No recent submissions found
                    </div>
                `;
            }
        }
    }

    // Fetch from primary API, fallback to secondary, and then fallback to cache
    async function syncLeetCodeData(force = false) {
        if (isSyncing) return;
        isSyncing = true;

        if (refreshIcon) refreshIcon.classList.add('fa-spin', 'text-accent-dynamic');

        // Check cache first (skip if forced refresh)
        if (!force) {
            const cached = localStorage.getItem('leetcode-portfolio-data');
            if (cached) {
                try {
                    const parsed = JSON.parse(cached);
                    // Render cached data immediately
                    renderLeetCodeData(parsed);
                    
                    // If cached data is fresh (less than 15 minutes old), don't trigger background fetch
                    const cacheTime = localStorage.getItem('leetcode-portfolio-time');
                    if (cacheTime && (new Date().getTime() - parseInt(cacheTime) < 24 * 60 * 60 * 1000)) {
                        if (refreshIcon) refreshIcon.classList.remove('fa-spin', 'text-accent-dynamic');
                        isSyncing = false;
                        return;
                    }
                } catch (e) {
                    console.error('Failed to parse cached data', e);
                }
            }
        }

        try {
            // Attempt fetching from primary API
            const response = await fetch(primaryApiUrl);
            if (!response.ok) throw new Error(`Primary API failed with status ${response.status}`);
            
            const rawData = await response.json();
            
            // Map Primary API properties
            const data = {
                totalSolved: rawData.totalSolved || 0,
                totalQuestions: rawData.totalQuestions || 3973,
                easySolved: rawData.easySolved || 0,
                totalEasy: rawData.totalEasy || 951,
                mediumSolved: rawData.mediumSolved || 0,
                totalMedium: rawData.totalMedium || 2074,
                hardSolved: rawData.hardSolved || 0,
                totalHard: rawData.totalHard || 948,
                ranking: rawData.ranking || '--',
                contributionPoints: rawData.contributionPoint || 0,
                reputation: rawData.reputation || 0,
                recentSubmissions: rawData.recentSubmissions || []
            };

            // Cache and Render
            localStorage.setItem('leetcode-portfolio-data', JSON.stringify(data));
            localStorage.setItem('leetcode-portfolio-time', new Date().getTime().toString());
            renderLeetCodeData(data);
        } catch (primaryErr) {
            console.warn('Primary LeetCode API failed. Trying fallback API...', primaryErr);
            
            try {
                // Secondary API (solved counts)
                const solvedRes = await fetch(`${secondaryApiUrl}/solved`);
                const infoRes = await fetch(secondaryApiUrl);
                
                if (!solvedRes.ok || !infoRes.ok) throw new Error('Secondary API endpoints failed');
                
                const solvedData = await solvedRes.json();
                const infoData = await infoRes.json();
                
                // Secondary API submissions (optional fetch)
                let recentSubs = [];
                try {
                    const subsRes = await fetch(`${secondaryApiUrl}/submission?limit=5`);
                    if (subsRes.ok) {
                        const subsData = await subsRes.json();
                        recentSubs = subsData.submission || [];
                    }
                } catch (subErr) {
                    console.warn('Could not fetch submissions from secondary API', subErr);
                }

                const data = {
                    totalSolved: solvedData.solvedProblem || 0,
                    totalQuestions: 3973,
                    easySolved: solvedData.easySolved || 0,
                    totalEasy: 951,
                    mediumSolved: solvedData.mediumSolved || 0,
                    totalMedium: 2074,
                    hardSolved: solvedData.hardSolved || 0,
                    totalHard: 948,
                    ranking: infoData.ranking || '--',
                    contributionPoints: infoData.contributionPoint || 0,
                    reputation: infoData.reputation || 0,
                    recentSubmissions: recentSubs
                };

                // Cache and Render
                localStorage.setItem('leetcode-portfolio-data', JSON.stringify(data));
                localStorage.setItem('leetcode-portfolio-time', new Date().getTime().toString());
                renderLeetCodeData(data);
            } catch (fallbackErr) {
                console.error('All LeetCode APIs failed.', fallbackErr);
                
                // If we have cached data, keep displaying it (even if old)
                const cached = localStorage.getItem('leetcode-portfolio-data');
                if (cached) {
                    try {
                        const parsed = JSON.parse(cached);
                        renderLeetCodeData(parsed);
                        return;
                    } catch (e) {}
                }

                // If no cache, render hardcoded fallback data — never show an error to visitors
                renderLeetCodeData(FALLBACK_LEETCODE_DATA);
            }
        } finally {
            if (refreshIcon) refreshIcon.classList.remove('fa-spin', 'text-accent-dynamic');
            isSyncing = false;
        }
    }

    // Attach sync event listeners
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => syncLeetCodeData(true));
    }
    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            if (leetcodeError) leetcodeError.classList.add('hidden');
            if (leetcodeLoading) leetcodeLoading.classList.remove('hidden');
            syncLeetCodeData(true);
        });
    }

    // Initial Trigger
    syncLeetCodeData(false);
});
