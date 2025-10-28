/* ========================================
   JB IMMO V7 - JAVASCRIPT
   Gestion Slider / Calculateur / Interactions
   ======================================== */

// ========== SLIDER HERO ==========
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

// Auto-play slider toutes les 5 secondes
setInterval(nextSlide, 5000);

// ========== SCROLL SMOOTH ==========
function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== CALCULATEUR ==========
function calculateLoyer() {
    const quartier = document.getElementById('quartier').value;
    const surface = parseInt(document.getElementById('surface').value);
    const pieces = parseInt(document.getElementById('pieces').value);
    const loyerActuel = document.getElementById('loyerActuel').value;

    // Validation
    if (!quartier || !surface || !pieces) {
        alert('Veuillez remplir tous les champs requis');
        return;
    }

    // Cacher les deux sections par défaut
    document.getElementById('resultContent').style.display = 'none';
    document.getElementById('auditMessage').style.display = 'none';

    // ========== LOGIQUE FILTRE PAR QUARTIER ==========
    if (quartier === 'tier3') {
        // Tier 3 = Audit personnalisé
        document.getElementById('auditMessage').style.display = 'block';
        scrollToElement(document.getElementById('auditMessage'));
        return;
    }

    // ========== CALCUL POUR TIER 1 ET TIER 2 ==========
    
    // Coefficients par tier (prix base par m²)
    const tierCoefficients = {
        'tier1': 22,  // Zones premium
        'tier2': 16   // Zones dynamiques
    };

    // Coefficients par nombre de pièces
    const pieceCoefficients = {
        1: 0.85,
        2: 1.0,
        3: 1.15,
        4: 1.25,
        5: 1.35
    };

    // Récupération des coefficients
    const basePrice = tierCoefficients[quartier] || 15;
    const pieceCoeff = pieceCoefficients[pieces] || 1.0;

    // Calcul du loyer garanti mensuel estimé
    // Formule : Surface × Price par m² × Coeff Pièces × 0.85 (conversion nuits → mois)
    const loyerEstime = Math.round(surface * basePrice * pieceCoeff * 0.85);

    // Affichage du résultat
    document.getElementById('resultValue').textContent = loyerEstime + ' €';
    document.getElementById('resultContent').style.display = 'block';

    scrollToElement(document.getElementById('resultContent'));
}

// Fonction helper pour scroller vers un élément
function scrollToElement(element) {
    setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// ========== RESET RESULT QUAND ON CHANGE LES INPUTS ==========
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

// ========== FORM CONTACT ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = {
            nom: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            tel: this.querySelector('input[type="tel"]').value,
            message: this.querySelector('textarea').value
        };

        // Log pour vérifier les données (en vrai site, ce serait une API)
        console.log('Formulaire soumis:', data);

        // Message de confirmation
        alert('Merci pour votre message. Nous vous recontacterons sous 24 heures.');
        
        // Reset du formulaire
        this.reset();
    });
}

// ========== ANIMATIONS AU SCROLL ==========
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

// Application des animations aux cartes au chargement du DOM
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

// ========== INITIALISATION SLIDER ==========
showSlide(slideIndex);