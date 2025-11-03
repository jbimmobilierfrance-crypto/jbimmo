// ========================================
// JB IMMO V4 - SCRIPT.JS (CLAUDE + GEMINI)
// Levier personnalisé + Stratégie de Tiers
// ========================================

// === 1. SLIDER HERO (de Claude) ===
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
setInterval(nextSlide, 5000); // Changer de slide toutes les 5 secondes
showSlide(0); // Initialiser le premier slide

// === 2. MENU STICKY (de Claude) ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// === 3. SMOOTH SCROLL (de Claude) ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === 4. ANIMATIONS AU SCROLL (de Claude) ===
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// === 5. CALCULATEUR INTELLIGENT (Stratégie V4) ===
const quartierSelect = document.getElementById('quartier');
const nuitsLoueesInput = document.getElementById('nuitsLouees'); // MODIFIÉ
const capaciteInput = document.getElementById('capacite');
const prixNuitInput = document.getElementById('prixNuit');
const canapeCheckbox = document.getElementById('canape');
const photosCheckbox = document.getElementById('photos');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('calculatorResult');
const resultContent = document.getElementById('resultContent');
const auditMessage = document.getElementById('auditMessage');

calculateBtn.addEventListener('click', calculerPotentiel);

function calculerPotentiel() {
    // Récupérer les valeurs
    const quartierValue = quartierSelect.value;
    const nuitsLouees = parseInt(nuitsLoueesInput.value); // MODIFIÉ
    const capacite = parseInt(capaciteInput.value);
    const prixNuit = parseFloat(prixNuitInput.value);
    const ajouterCanape = canapeCheckbox.checked;
    const ajouterPhotos = photosCheckbox.checked;

    // Validation
    if (!quartierValue) {
        alert('Veuillez sélectionner un quartier');
        return;
    }

    if (!nuitsLouees || !capacite || !prixNuit) {
        // Correction de la validation pour inclure le nouveau champ
        alert('Veuillez remplir tous les champs numériques (Nuits louées, Capacité, Prix)');
        return;
    }

    // Cacher les résultats précédents
    resultDiv.classList.add('hidden');
    auditMessage.classList.add('hidden');

    // === LOGIQUE DES 3 TIERS ===

    // TIER 3 : Audit personnalisé requis
    if (quartierValue === 'tier3') {
        auditMessage.classList.remove('hidden');
        auditMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // TIER 1 & TIER 2 : Calcul automatique
    if (quartierValue === 'tier1' || quartierValue === 'tier2') {
        // === CALCULS (Logique V4) ===

        // AVANT optimisation (Maintenant personnalisé)
        const joursAvant = nuitsLouees; // On utilise la saisie de l'utilisateur
        const revenuBrutAvant = prixNuit * joursAvant;
        const revenuNetAvant = revenuBrutAvant; // Pas de commission (gestion perso)

        // APRÈS optimisation
        let prixNuitApres = prixNuit;

        // Levier 1 : Canapé-lit (+2 places) = +25€/nuit
        if (ajouterCanape) {
            prixNuitApres += 25;
        }

        // Levier 2 : Photos pro + Mise en scène = +12€/nuit
        if (ajouterPhotos) {
            prixNuitApres += 12;
        }

        // Levier 3 : Pricing dynamique + Réactivité = 24 jours d'occupation garantis
        const joursApres = 24;

        // Revenu brut APRÈS
        const revenuBrutApres = prixNuitApres * joursApres;

        // Commission JB Immo : 25%
        const commission = revenuBrutApres * 0.25;
        const revenuNetApres = revenuBrutApres - commission;

        // GAIN NET FINAL
        const gainNet = revenuNetApres - revenuNetAvant;

        // === AFFICHAGE DU RÉSULTAT ===
        resultContent.innerHTML = `
            <div class="result-table">
                <div class="result-row">
                    <div class="result-label"></div>
                    <div class="result-label" style="text-align: center; font-weight: 700; color: #666;">VOTRE SITUATION</div>
                    <div class="result-label" style="text-align: center; font-weight: 700; color: #800020;">AVEC JB IMMO</div>
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
                    <div class="result-label">Commission JB Immo (25%)</div>
                    <div class="result-value before">0 €</div>
                    <div class="result-value after">${commission.toFixed(0)} €</div>
                </div>

                <div class="result-row">
                    <div class="result-label">Votre revenu net/mois</div>
                    <div class="result-value before">${revenuNetAvant.toFixed(0)} €</div>
                    <div class="result-value after">${revenuNetApres.toFixed(0)} €</div>
                </div>
            </div>

            <div class="result-gain">
                <h3>GAIN NET MENSUEL</h3>
                <div class="gain-amount">+ ${gainNet.toFixed(0)} €</div>
                <p>Soit +${(gainNet * 12).toFixed(0)} € par an avec JB Immo</p>
            </div>
        `;

        // Afficher le résultat
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
[nuitsLoueesInput, capaciteInput, prixNuitInput].forEach(input => { // MODIFIÉ
    input.addEventListener('input', (e) => {
        if (e.target.value < 0) {
            e.target.value = 0;
        }
    });
});

// === 8. INITIALISATION ===
console.log('JB Immo V4 (Claude+Gemini) - Script chargé avec succès ✅');