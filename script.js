document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".bento-card").forEach((card) => {
        const rect = card.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});

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
                result.classList.replace("text-indigo-400", "text-green-500");
                result.classList.replace("text-red-500", "text-green-500");
            } else {
                result.innerHTML = json.message;
                result.classList.replace("text-indigo-400", "text-red-500");
                result.classList.replace("text-green-500", "text-red-500");
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
            result.classList.replace("text-indigo-400", "text-red-500");
            result.classList.replace("text-green-500", "text-red-500");
        })
        .then(function() {
            form.reset();
            button.disabled = false;
            button.innerHTML = 'Send Message <i class="fas fa-paper-plane ml-1"></i>';
            setTimeout(() => {
                result.classList.add('hidden');
                result.classList.replace("text-green-500", "text-indigo-400");
                result.classList.replace("text-red-500", "text-indigo-400");
            }, 3000);
        });
    });
}
