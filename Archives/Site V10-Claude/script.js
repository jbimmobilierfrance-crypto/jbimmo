/* ================================================================================
   JB IMMO - GESTION LOCATIVE MONTPELLIER
   Script.js - Version Dynamique
   ================================================================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ================================================================================
    // SLIDER HERO - DÉFILEMENT AUTOMATIQUE DES IMAGES
    // ================================================================================
    
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 secondes
    
    function nextSlide() {
        // Retirer la classe active de la slide actuelle et réinitialiser le scale
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].style.transform = 'scale(1)';
        
        // Passer à la slide suivante (boucle)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Ajouter la classe active à la nouvelle slide
        slides[currentSlide].classList.add('active');
        
        // Forcer le reflow pour relancer l'animation
        void slides[currentSlide].offsetWidth;
    }
    
    // Démarrer le slider automatique
    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }
    
    // ================================================================================
    // HEADER STICKY - CHANGEMENT AU SCROLL
    // ================================================================================
    
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ================================================================================
    // SMOOTH SCROLL POUR LES LIENS DE NAVIGATION
    // ================================================================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ================================================================================
    // FAQ - ACCORDÉON INTERACTIF
    // ================================================================================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle l'item actuel
            item.classList.toggle('active');
        });
    });
    
    // ================================================================================
    // FORMULAIRE DE CONTACT - VALIDATION ET ENVOI
    // ================================================================================
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const nom = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const telephone = document.getElementById('telephone').value;
            const adresse = document.getElementById('adresse').value;
            const message = document.getElementById('message').value;
            
            // Validation basique
            if (!nom || !email || !telephone) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Validation email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Message de confirmation
            alert(`Merci ${nom} ! Nous avons bien reçu votre demande.\n\nNous vous recontacterons sous 24 heures au ${telephone}.\n\nÀ très bientôt !`);
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Note : Dans une version production, ici vous enverriez les données à un backend
            // via fetch() ou XMLHttpRequest vers votre serveur/API
            // Exemple :
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: nom,
                    email: email,
                    telephone: telephone,
                    adresse: adresse,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Merci ! Votre message a été envoyé avec succès.');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            });
            */
        });
    }
    
    // ================================================================================
    // ANIMATIONS AU SCROLL - INTERSECTION OBSERVER
    // ================================================================================
    
    // Configuration de l'observer
    const observerOptions = {
        threshold: 0.12, // L'élément doit être visible à 12%
        rootMargin: '0px 0px -60px 0px' // Déclencher un peu avant d'arriver
    };
    
    // Créer l'observer
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Une fois visible, arrêter d'observer (optimisation + ne déclenche qu'une fois)
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Sélectionner tous les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.fade-in');
    
    // Observer chaque élément
    elementsToAnimate.forEach(element => {
        animateOnScroll.observe(element);
    });
    
    // ================================================================================
    // BOUTON CTA FIXE (Optionnel - Commenté par défaut)
    // ================================================================================
    
    /*
    // Créer un bouton CTA fixe qui apparaît au scroll
    const fixedCTA = document.createElement('div');
    fixedCTA.className = 'fixed-cta';
    fixedCTA.innerHTML = '<a href="#contact" class="btn btn-primary">Échanger avec nous</a>';
    fixedCTA.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 999;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease-out;
    `;
    document.body.appendChild(fixedCTA);
    
    // Afficher/masquer le bouton au scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 800) {
            fixedCTA.style.opacity = '1';
            fixedCTA.style.transform = 'translateY(0)';
        } else {
            fixedCTA.style.opacity = '0';
            fixedCTA.style.transform = 'translateY(20px)';
        }
    });
    */
    
    // ================================================================================
    // DÉTECTION DU SCROLL POUR L'INDICATEUR HERO
    // ================================================================================
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.8';
            }
        });
    }
    
    // ================================================================================
    // ANALYTICS - TRACKING DES CLICS SUR LES CTA (Optionnel)
    // ================================================================================
    
    /*
    // Si vous utilisez Google Analytics ou autre
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Exemple avec Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'CTA',
                    'event_label': button.textContent
                });
            }
            
            // Ou avec un autre système de tracking
            console.log('CTA cliqué:', button.textContent);
        });
    });
    */
    
    // ================================================================================
    // PRÉCHARGEMENT DES IMAGES DU SLIDER (Optimisation)
    // ================================================================================
    
    slides.forEach((slide, index) => {
        if (index > 0) { // Ne pas précharger la première (déjà visible)
            const img = new Image();
            const bgImage = slide.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (bgImage) {
                img.src = bgImage[1];
            }
        }
    });
    
    // ================================================================================
    // CONSOLE LOG - CONFIRMATION DE CHARGEMENT
    // ================================================================================
    
    console.log('JB Immo - Site chargé avec succès ! 🏠');
    console.log('Slider actif avec', slides.length, 'images');
    console.log('Animations au scroll activées');
    console.log('FAQ interactive prête');
});

// ================================================================================
// UTILITAIRES GLOBAUX
// ================================================================================

// Fonction pour détecter si on est sur mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Fonction pour obtenir la hauteur du viewport
function getViewportHeight() {
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}

// Fonction pour vérifier si un élément est visible dans le viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= getViewportHeight() &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}