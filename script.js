// ========================================
// JB IMMO V6 FINAL - JAVASCRIPT CORRIGÉ
// Slider + Calculateur CORRIGÉ (Filtre Quartier + Prix Saisi + Revenu NET)
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

// ========== CALCULATEUR REVENUS (LOGIQUE CORRIGÉE V6 FINAL) ==========
function calculer() {
    // Récupération des valeurs du formulaire
    const quartierSelect = document.getElementById('quartier');
    const quartierValue = quartierSelect.value;
    const nuitsLouees = parseInt(document.getElementById('nuitsLouees').value);
    const capacite = parseInt(document.getElementById('capacite').value);
    const prixNuit = parseInt(document.getElementById('prixNuit').value);

    // Validation des champs
    if (!quartierValue || !nuitsLouees || !capacite || !prixNuit) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    // Cacher les deux sections avant d'afficher la bonne
    document.getElementById('resultats').style.display = 'none';
    document.getElementById('messageAudit').style.display = 'none';

    // ========== LOGIQUE DE FILTRAGE PAR QUARTIER ==========
    if (quartierValue === 'tier3') {
        // Si "Autre quartier" (Tier 3) → Afficher message audit
        document.getElementById('messageAudit').style.display = 'block';
        
        // Scroll vers le message
        setTimeout(() => {
            document.getElementById('messageAudit').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
        
        return; // On arrête ici, pas de calcul
    }

    // ========== SI TIER 1 OU TIER 2 → CALCUL ==========
    // La logique ci-dessous s'exécute UNIQUEMENT pour Tier 1 et Tier 2

    // ========== CALCUL SITUATION ACTUELLE (AVANT JB IMMO) ==========
    // On utilise TOUJOURS le prix saisi par le proprio
    const revenuNetAvant = nuitsLouees * prixNuit;

    // ========== CALCUL AVEC JB IMMO (APRÈS) ==========
    
    // LEVIER 1 : Optimisation couchage (canapé-lit) → +15€/nuit
    const bonusCanape = capacite >= 4 ? 15 : 0;
    
    // LEVIER 2 : Photos professionnelles → +8€/nuit
    const bonusPhotos = 8;
    
    // LEVIER 3 : Augmentation occupation à 22 jours/mois
    const joursApres = 22;

    // Prix optimisé après nos leviers
    const prixNuitOptimise = prixNuit + bonusCanape + bonusPhotos;

    // REVENU BRUT (avant commission)
    const revenuBrutApres = joursApres * prixNuitOptimise;

    // COMMISSION JB IMMO (25%)
    const commission = Math.round(revenuBrutApres * 0.25);

    // REVENU NET (après commission) = Ce que le proprio garde réellement
    const revenuNetApres = revenuBrutApres - commission;

    // ========== CALCUL DU GAIN ==========
    const gain = revenuNetApres - revenuNetAvant;
    const pourcentage = Math.round((gain / revenuNetAvant) * 100);

    // ========== AFFICHAGE DES RÉSULTATS ==========
    
    // Situation AVANT
    document.getElementById('revenuAvant').textContent = revenuNetAvant + '€';
    document.getElementById('detailAvant').textContent = `${nuitsLouees} nuits × ${prixNuit}€`;
    
    // Situation APRÈS (Revenu NET)
    document.getElementById('revenuApres').textContent = revenuNetApres + '€';
    document.getElementById('detailApres').textContent = `${joursApres} nuits × ${prixNuitOptimise}€ (net après commission)`;
    
    // Gain
    document.getElementById('gain').textContent = '+' + gain + '€';
    document.getElementById('pourcentage').textContent = '+' + pourcentage + '%';

    // Détail breakdown (nouveau)
    document.getElementById('revenuBrut').textContent = revenuBrutApres + '€';
    document.getElementById('commission').textContent = '-' + commission + '€';
    document.getElementById('revenuNetFinal').textContent = revenuNetApres + '€';

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
