// Interactivity and Premium Visual Behaviors for Abhinav Anand's Portfolio

document.addEventListener("DOMContentLoaded", () => {
    
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
        const phrases = ["Digital Experiences.", "AI-Powered Systems.", "Predictive ML Solutions.", "Scalable Architectures."];
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
                const category = container.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
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
            result.className = "text-sm text-center mt-3 font-medium py-2 rounded-lg bg-accent-dynamic/10 text-accent-dynamic border border-accent-dynamic/20";
            
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
});
