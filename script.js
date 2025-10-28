let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('slide-active'));
    dots.forEach(dot => dot.classList.remove('dot-active'));

    slides[slideIndex].classList.add('slide-active');
    dots[slideIndex].classList.add('dot-active');
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

function currentSlide(n) {
    slideIndex = n;
    showSlide(slideIndex);
}

setInterval(nextSlide, 5000);

function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function calculateLoyer() {
    const quartier = document.getElementById('quartier').value;
    const surface = parseInt(document.getElementById('surface').value);
    const pieces = parseInt(document.getElementById('pieces').value);

    if (!quartier || !surface || !pieces) {
        alert('Veuillez remplir tous les champs requis');
        return;
    }

    document.getElementById('resultContent').style.display = 'none';
    document.getElementById('auditMessage').style.display = 'none';

    if (quartier === 'tier3') {
        document.getElementById('auditMessage').style.display = 'block';
        scrollToElement(document.getElementById('auditMessage'));
        return;
    }

    const tierCoefficients = {
        'tier1': 22,
        'tier2': 16
    };

    const pieceCoefficients = {
        1: 0.85,
        2: 1.0,
        3: 1.15,
        4: 1.25,
        5: 1.35
    };

    const basePrice = tierCoefficients[quartier] || 15;
    const pieceCoeff = pieceCoefficients[pieces] || 1.0;

    const loyerEstime = Math.round(surface * basePrice * pieceCoeff * 0.85);

    document.getElementById('resultValue').textContent = loyerEstime + ' €';
    document.getElementById('resultContent').style.display = 'block';

    scrollToElement(document.getElementById('resultContent'));
}

function scrollToElement(element) {
    setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

document.getElementById('quartier').addEventListener('change', function() {
    document.getElementById('resultContent').style.display = 'none';
    document.getElementById('auditMessage').style.display = 'none';
});

document.getElementById('surface').addEventListener('input', function() {
    document.getElementById('resultContent').style.display = 'none';
    document.getElementById('auditMessage').style.display = 'none';
});

document.getElementById('pieces').addEventListener('input', function() {
    document.getElementById('resultContent').style.display = 'none';
    document.getElementById('auditMessage').style.display = 'none';
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const data = {
            nom: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            tel: this.querySelector('input[type="tel"]').value,
            message: this.querySelector('textarea').value
        };

        console.log('Formulaire soumis:', data);

        alert('Merci pour votre message. Nous vous recontacterons sous 24 heures.');
        
        this.reset();
    });
}

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.problem-card, .benefit-card, .step, .faq-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

showSlide(slideIndex);
