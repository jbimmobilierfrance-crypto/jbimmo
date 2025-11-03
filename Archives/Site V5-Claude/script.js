// ========================================
// JB IMMO V5 - SCRIPT.JS COMPLET
// Slider + Menu Sticky + Calculateur RÉALISTE + Animations
// CALCULS RÉALISTES : +15€ canapé, +8€ photos, 22 jours
// SANS CHECKBOXES : Optimisations appliquées automatiquement
// ========================================

// === 1. SLIDER HERO (3 images de Montpellier, changement toutes les 5 secondes) ===
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Changer de slide automatiquement toutes les 5 secondes
setInterval(nextSlide, 5000);

// Initialiser le premier slide
showSlide(0);

// === 2. MENU STICKY (transparent → opaque au scroll) ===
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// === 3. SMOOTH SCROLL pour les ancres ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Offset pour le menu fixe
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// === 4. ANIMATIONS AU SCROLL (fade-in des sections) ===
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe fade-in
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// === 5. CALCULATEUR RÉALISTE (V5 - SANS CHECKBOXES) ===
const quartierSelect = document.getElementById('quartier');
const nuitsLoueesInput = document.getElementById('nuitsLouees');
const capaciteInput = document.getElementById('capacite');
const prixNuitInput = document.getElementById('prixNuit');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('calculatorResult');
const resultContent = document.getElementById('resultContent');
const auditMessage = document.getElementById('auditMessage');

calculateBtn.addEventListener('click', calculerPotentiel);

function calculerPotentiel() {
    // Récupérer les valeurs
    const quartierValue = quartierSelect.value;
    const nuitsLouees = parseInt(nuitsLoueesInput.value);
    const capacite = parseInt(capaciteInput.value);
    const prixNuit = parseFloat(prixNuitInput.value);

    // Validation des champs
    if (!quartierValue) {
        alert('⚠️ Veuillez sélectionner un quartier');
        quartierSelect.focus();
        return;
    }

    if (!nuitsLouees || nuitsLouees < 0 || nuitsLouees > 31) {
        alert('⚠️ Veuillez entrer un nombre de nuits valide (0-31)');
        nuitsLoueesInput.focus();
        return;
    }

    if (!capacite || capacite < 1 || capacite > 12) {
        alert('⚠️ Veuillez entrer une capacité valide (1-12 personnes)');
        capaciteInput.focus();
        return;
    }

    if (!prixNuit || prixNuit < 30 || prixNuit > 500) {
        alert('⚠️ Veuillez entrer un prix par nuit valide (30-500€)');
        prixNuitInput.focus();
        return;
    }

    // Cacher les résultats précédents
    resultDiv.classList.add('hidden');
    auditMessage.classList.add('hidden');

    // === LOGIQUE DES 3 TIERS ===

    // TIER 3 : Audit personnalisé requis
    if (quartierValue === 'tier3') {
        auditMessage.classList.remove('hidden');
        // Scroll vers le message d'audit
        setTimeout(() => {
            auditMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        return;
    }

    // TIER 1 & TIER 2 : Calcul automatique avec optimisations RÉALISTES
    if (quartierValue === 'tier1' || quartierValue === 'tier2') {
        // === CALCULS AVANT OPTIMISATION ===
        const joursAvant = nuitsLouees; // Valeur saisie par le proprio
        const revenuBrutAvant = prixNuit * joursAvant;
        const commissionAvant = 0; // Pas de commission (gestion perso)
        const revenuNetAvant = revenuBrutAvant - commissionAvant;

        // === CALCULS APRÈS OPTIMISATION (RÉALISTES V5) ===
        let prixNuitApres = prixNuit;

        // OPTIMISATION 1 : Canapé-lit (+2 places) = +15€/nuit (RÉALISTE)
        prixNuitApres += 15;

        // OPTIMISATION 2 : Photos professionnelles + Mise en scène = +8€/nuit (RÉALISTE)
        prixNuitApres += 8;

        // OPTIMISATION 3 : Pricing dynamique + Réactivité JB Immo = 22 jours d'occupation (RÉALISTE)
        const joursApres = 22;

        // Revenu brut APRÈS optimisation
        const revenuBrutApres = prixNuitApres * joursApres;

        // Commission JB Immo : 25% sur les revenus bruts
        const commissionApres = revenuBrutApres * 0.25;
        const revenuNetApres = revenuBrutApres - commissionApres;

        // GAIN NET MENSUEL
        const gainNet = revenuNetApres - revenuNetAvant;

        // GAIN ANNUEL
        const gainAnnuel = gainNet * 12;

        // === AFFICHAGE DU RÉSULTAT ===
        resultContent.innerHTML = `
            <div class="result-table">
                <div class="result-row">
                    <div class="result-label"></div>
                    <div class="result-label" style="text-align: center; font-weight: 700; color: var(--gris-text);">AVANT</div>
                    <div class="result-label" style="text-align: center; font-weight: 700; color: var(--bleu-electrique);">AVEC JB IMMO</div>
                </div>

                <div class="result-row">
                    <div class="result-label">Prix par nuit</div>
                    <div class="result-value before">${prixNuit.toFixed(0)} €</div>
                    <div class="result-value after">${prixNuitApres.toFixed(0)} €</div>
                </div>

                <div class="result-row">
                    <div class="result-label">Occupation mensuelle</div>
                    <div class="result-value before">${joursAvant} jours</div>
                    <div class="result-value after">${joursApres} jours</div>
                </div>

                <div class="result-row">
                    <div class="result-label">Revenu brut/mois</div>
                    <div class="result-value before">${revenuBrutAvant.toFixed(0)} €</div>
                    <div class="result-value after">${revenuBrutApres.toFixed(0)} €</div>
                </div>

                <div class="result-row">
                    <div class="result-label">Commission</div>
                    <div class="result-value before">${commissionAvant.toFixed(0)} €</div>
                    <div class="result-value after">${commissionApres.toFixed(0)} € (25%)</div>
                </div>

                <div class="result-row">
                    <div class="result-label">Votre revenu net/mois</div>
                    <div class="result-value before">${revenuNetAvant.toFixed(0)} €</div>
                    <div class="result-value after">${revenuNetApres.toFixed(0)} €</div>
                </div>
            </div>

            <div class="result-gain">
                <h3>VOTRE GAIN NET</h3>
                <div class="gain-amount">+${gainNet.toFixed(0)} €/mois</div>
                <p>Soit <strong>+${gainAnnuel.toFixed(0)} € par an</strong> avec JB Immo</p>
            </div>
        `;

        // Afficher le résultat avec animation
        resultDiv.classList.remove('hidden');

        // Scroll vers le résultat
        setTimeout(() => {
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

// === 6. RESET DU CALCULATEUR SI CHANGEMENT DE QUARTIER ===
quartierSelect.addEventListener('change', () => {
    resultDiv.classList.add('hidden');
    auditMessage.classList.add('hidden');
});

// === 7. VALIDATION DES INPUTS (Nombres positifs uniquement) ===
[nuitsLoueesInput, capaciteInput, prixNuitInput].forEach(input => {
    input.addEventListener('input', (e) => {
        // Empêcher les valeurs négatives
        if (e.target.value < 0) {
            e.target.value = 0;
        }
    });
});

// === 8. INITIALISATION & LOG ===
console.log('✅ JB Immo V5 - Script chargé avec succès');
console.log('🎨 Design moderne 2025 activé');
console.log('📊 Calculateur RÉALISTE : +15€ canapé, +8€ photos, 22 jours');
console.log('🚫 Checkboxes supprimées - Calcul automatique');
console.log('🖼️ Images de Montpellier chargées');
console.log('🔥 Site V5 prêt pour Vercel !');