// Slider automatique
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dot');
const totalSlides = slides.length;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + totalSlides) % totalSlides;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

function goToSlide(n) {
    showSlide(n);
}

// Auto-play toutes les 5 secondes
setInterval(() => {
    changeSlide(1);
}, 5000);

// Calculateur
function calculer() {
    const surface = parseFloat(document.getElementById('surface').value) || 0;
    const capacite = parseInt(document.getElementById('capacite').value) || 0;
    const loyer = parseFloat(document.getElementById('prix').value) || 0;
    
    if (!surface || !capacite || !loyer) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    // Revenu actuel (location classique)
    const revenuActuel = loyer;
    
    // Estimation revenus Airbnb
    // Calcul basé sur tarif moyen Airbnb Montpellier
    let tarifNuit = 0;
    
    if (surface < 30) {
        tarifNuit = 50 + (capacite * 10);
    } else if (surface < 50) {
        tarifNuit = 70 + (capacite * 12);
    } else if (surface < 80) {
        tarifNuit = 90 + (capacite * 15);
    } else {
        tarifNuit = 120 + (capacite * 18);
    }
    
    // Taux d'occupation moyen Montpellier: 75%
    const joursOccupes = 30 * 0.75;
    const revenuBrutAirbnb = joursOccupes * tarifNuit;
    
    // Commission JB Immo: 25%
    const commission = 0.25;
    const revenuNetProprio = revenuBrutAirbnb * (1 - commission);
    
    // Gain
    const gain = revenuNetProprio - revenuActuel;
    const gainPourcent = ((gain / revenuActuel) * 100).toFixed(0);
    
    // Affichage
    document.getElementById('avant').textContent = Math.round(revenuActuel) + '€/mois';
    document.getElementById('apres').textContent = Math.round(revenuNetProprio) + '€/mois';
    document.getElementById('gain').textContent = '+' + Math.round(gain) + '€/mois';
    document.getElementById('gainPct').textContent = '(+' + gainPourcent + '%)';
    document.getElementById('results').style.display = 'block';
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});