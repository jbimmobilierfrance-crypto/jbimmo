// ========================================
// JB IMMO V6 - JAVASCRIPT
// Slider + Calculateur CORRIGÉ + Animations
// ========================================

// ========== SLIDER HERO ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + totalSlides) % totalSlides;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Navigation slider
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

// Dots navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto-play slider
setInterval(nextSlide, 5000);

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== HEADER SCROLL ==========
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========== CALCULATEUR REVENUS (CORRIGÉ) ==========
function calculer() {
    // Récupération des valeurs
    const quartier = parseInt(document.getElementById('quartier').value);
    const nuitsLouees = parseInt(document.getElementById('nuitsLouees').value);
    const capacite = parseInt(document.getElementById('capacite').value);
    const prixNuit = parseInt(document.getElementById('prixNuit').value);

    // Validation
    if (!quartier || !nuitsLouees || !capacite || !prixNuit) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    // ========== CORRECTION DU BUG CRITIQUE ==========
    // AVANT (FAUX) : const joursAvant = 18; // ❌ Valeur fixe
    // MAINTENANT (CORRECT) : On utilise la valeur saisie par l'utilisateur
    const joursAvant = nuitsLouees; // ✅ Utilise la saisie du proprio

    // CALCUL SITUATION ACTUELLE
    const revenuAvant = joursAvant * prixNuit;

    // LEVIERS D'OPTIMISATION JB IMMO (réalistes et honnêtes)
    const bonusCanape = capacite >= 4 ? 15 : 0; // +15€/nuit si canapé-lit possible
    const bonusPhotos = 8; // +8€/nuit avec photos pro
    const joursApres = 22; // Augmentation à 22 jours d'occupation

    // CALCUL AVEC JB IMMO
    const nouveauPrix = prixNuit + bonusCanape + bonusPhotos;
    const revenuApres = joursApres * nouveauPrix;

    // GAIN
    const gain = revenuApres - revenuAvant;
    const pourcentage = Math.round((gain / revenuAvant) * 100);

    // AFFICHAGE DES RÉSULTATS
    document.getElementById('revenuAvant').textContent = revenuAvant + '€';
    document.getElementById('detailAvant').textContent = `${joursAvant} nuits × ${prixNuit}€`;
    
    document.getElementById('revenuApres').textContent = revenuApres + '€';
    document.getElementById('detailApres').textContent = `${joursApres} nuits × ${nouveauPrix}€`;
    
    document.getElementById('gain').textContent = '+' + gain + '€';
    document.getElementById('pourcentage').textContent = '+' + pourcentage + '%';

    // Afficher les résultats avec animation
    const resultats = document.getElementById('resultats');
    resultats.style.display = 'block';
    
    // Scroll smooth vers les résultats
    setTimeout(() => {
        resultats.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// ========== ANIMATIONS SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Appliquer l'animation aux cartes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .engagement-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========== FORM VALIDATION ==========
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const nom = contactForm.querySelector('input[name="nom"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;

        if (!nom || !email || !message) {
            e.preventDefault();
            alert('Veuillez remplir tous les champs obligatoires');
        }
    });
}
