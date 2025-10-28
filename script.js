// ================================================================================
// HEADER STICKY - CHANGEMENT DE STYLE AU SCROLL
// ================================================================================

const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ================================================================================
// SLIDER HERO - AUTO-PLAY ET NAVIGATION
// ================================================================================

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let slideInterval;
    
    // Fonction pour afficher un slide spécifique
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Fonction pour passer au slide suivant
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Fonction pour revenir au slide précédent
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Auto-play (toutes les 5 secondes)
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Événements pour les flèches
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopSlideshow();
            nextSlide();
            startSlideshow();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopSlideshow();
            prevSlide();
            startSlideshow();
        });
    }
    
    // Événements pour les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopSlideshow();
            showSlide(index);
            startSlideshow();
        });
    });
    
    // Démarrer le slideshow automatique
    startSlideshow();
    
    // Pause au survol
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSlideshow);
        heroSection.addEventListener('mouseleave', startSlideshow);
    }

// ================================================================================
// CALCULATEUR DE LOYER GARANTI - JB IMMO
// ================================================================================

    const calcForm = document.getElementById('calc-form');
    const resultatsBox = document.getElementById('resultats-box');
    const auditMessageBox = document.getElementById('audit-message-box');
    const montantEstime = document.getElementById('montant-estime');
    
    // Gestion de la soumission du formulaire
    if (calcForm) {
        calcForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const quartierSelect = document.getElementById('quartier');
            const surface = parseFloat(document.getElementById('surface').value);
            const pieces = parseInt(document.getElementById('pieces').value);
            const loyerActuel = document.getElementById('loyer-actuel').value;
            
            // Validation des champs obligatoires
            if (!quartierSelect.value || !surface || !pieces) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Récupération du tier sélectionné
            const selectedOption = quartierSelect.options[quartierSelect.selectedIndex];
            const tier = selectedOption.getAttribute('data-tier');
            
            // Masquer les deux boxes au départ
            resultatsBox.style.display = 'none';
            auditMessageBox.style.display = 'none';
            
            // Logique selon le Tier
            if (tier === '1' || tier === '2') {
                // Calcul pour Tier 1 et 2
                const estimation = calculerEstimation(tier, surface, pieces);
                montantEstime.textContent = estimation.toLocaleString('fr-FR') + ' €';
                resultatsBox.style.display = 'block';
                
                // Scroll vers les résultats
                resultatsBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (tier === '3') {
                // Afficher la box d'audit pour Tier 3
                auditMessageBox.style.display = 'block';
                
                // Scroll vers la box d'audit
                auditMessageBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    
    // Fonction de calcul d'estimation
    function calculerEstimation(tier, surface, pieces) {
        // Tarifs de base au m² selon le Tier
        const tarifM2 = {
            '1': 22,  // Tier 1 : quartiers premium (22€/m²)
            '2': 18   // Tier 2 : quartiers attractifs (18€/m²)
        };
        
        // Bonus selon le nombre de pièces
        const bonusPieces = {
            1: 0,
            2: 50,
            3: 100,
            4: 150,
            5: 200
        };
        
        // Calcul de base
        let estimation = surface * tarifM2[tier];
        
        // Ajout du bonus pièces (max à 5 pièces)
        const bonus = bonusPieces[Math.min(pieces, 5)] || 200;
        estimation += bonus;
        
        // Arrondir au multiple de 50 le plus proche
        estimation = Math.round(estimation / 50) * 50;
        
        // S'assurer que l'estimation minimale est de 600€
        estimation = Math.max(estimation, 600);
        
        return estimation;
    }
    
    // Smooth scroll pour tous les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Gestion du formulaire de contact (simple validation et message)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation basique
            const nom = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const telephone = document.getElementById('telephone').value;
            const message = document.getElementById('message').value;
            
            if (!nom || !email || !telephone || !message) {
                alert('Veuillez remplir tous les champs du formulaire.');
                return;
            }
            
            // Validation email basique
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Message de confirmation
            alert('Merci pour votre message ! Nous vous recontacterons sous 24 heures.\n\nVos coordonnées ont été enregistrées.');
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Note : Dans une version production, ici vous enverriez les données à un backend
            // via fetch() ou XMLHttpRequest vers votre serveur/API
        });
    }
});
