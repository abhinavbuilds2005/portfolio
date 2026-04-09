// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    // 1. Fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once visible if you only want the animation to run once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // 2. Navbar scroll effect
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

    // Contact Form Handler
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
            
            // Temporary styles for sending state
            result.className = "text-sm text-center mt-3 font-medium py-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20";
            
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
