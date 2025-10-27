/* ========== CALCULATEUR DE LOYER GARANTI ========== */

function calculateLoyer() {
    const quartier = document.getElementById('quartier').value;
    const surface = parseFloat(document.getElementById('surface').value);
    const pieces = parseInt(document.getElementById('pieces').value);
    const loyerActuel = document.getElementById('loyer').value;

    // Validation
    if (!quartier || !surface || !pieces) {
        alert('Veuillez remplir tous les champs requis (Quartier, Surface, Pièces).');
        return;
    }

    // Coefficients par quartier (€ par m²)
    const quarterCoefficients = {
        'centre': 25,
        'ecusson': 24,
        'regordane': 23,
        'comedie': 26,
        'clemenceau': 22,
        'foch': 23,
        'peyrou': 21,
        'antigone': 24,
        'polygone': 25,
        'boutonnet': 18,
        'paillade': 16,
        'montpellieraine': 17,
        'proche-ouest': 19,
        'autre': 15
    };

    // Coefficient par nombre de pièces
    const pieceCoefficients = {
        1: 0.9,
        2: 1.0,
        3: 1.15,
        4: 1.25,
        5: 1.35
    };

    // Récupération du coefficient quartier
    const quarterCoeff = quarterCoefficients[quartier] || 15;
    const pieceCoeff = pieceCoefficients[pieces] || 1.0;

    // Calcul de base : Surface × Coeff Quartier × Coeff Pièces
    const loyerBase = surface * quarterCoeff * pieceCoeff;

    // Bonus pour bien bien entretenu (si loyer actuel saisi)
    let bonusEntretien = 0;
    if (loyerActuel) {
        const loyerActuelNum = parseFloat(loyerActuel);
        // Si bien correctement loué, petite prime
        if (loyerActuelNum > 0) {
            bonusEntretien = 50; // +50€ pour bien déjà loué et bien entretenu
        }
    }

    // Commission JB Immo (25%) - On affiche le NET
    const loyerEstimeBrut = Math.round(loyerBase + bonusEntretien);
    const commission = loyerEstimeBrut * 0.25;
    const loyerEstimeNet = Math.round(loyerEstimeBrut - commission);

    // Affichage du résultat
    document.getElementById('result').style.display = 'block';
    document.getElementById('resultValue').textContent = loyerEstimeNet + '€/mois';

    // Scroll vers le résultat
    document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ========== FORMULAIRE DE CONTACT ========== */

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Récupération des données
    const name = document.querySelector('[placeholder="Votre nom"]').value;
    const email = document.querySelector('[placeholder="Votre email"]').value;
    const phone = document.querySelector('[placeholder="Votre téléphone"]').value;
    const message = document.querySelector('[placeholder*="Décrivez"]').value;

    // Validation basique
    if (!name || !email || !phone || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Simulation d'envoi (dans un vrai site, ce serait une API/backend)
    console.log('Formulaire soumis:', { name, email, phone, message });

    // Message de confirmation
    alert(`Merci ${name} ! Votre demande a été envoyée. Nous vous recontacterons au ${phone} ou à ${email} sous 24h.`);

    // Réinitialisation du formulaire
    this.reset();
});

/* ========== ANIMATIONS AU SCROLL ========== */

const observerOptions = {
    threshold: 0.1,
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

// Observer les cards et sections
document.querySelectorAll('.problem-card, .benefit-card, .faq-item, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* ========== UTILITAIRES ========== */

// Empêcher les champs numériques de devenir négatifs
document.getElementById('surface').addEventListener('input', function() {
    if (this.value < 15) this.value = 15;
    if (this.value > 200) this.value = 200;
});

document.getElementById('loyer').addEventListener('input', function() {
    if (this.value < 0) this.value = 0;
    if (this.value > 2000) this.value = 2000;
});

// Masquer le résultat au changement d'input
function hideResult() {
    document.getElementById('result').style.display = 'none';
}

document.getElementById('quartier').addEventListener('change', hideResult);
document.getElementById('surface').addEventListener('input', hideResult);
document.getElementById('pieces').addEventListener('change', hideResult);
document.getElementById('loyer').addEventListener('input', hideResult);
