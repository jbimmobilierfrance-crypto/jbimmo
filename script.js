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
    
    // ================================================================================
    // ANIMATIONS AU SCROLL - INTERSECTION OBSERVER
    // ================================================================================
    
    // Observer pour les animations d'apparition
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Sélectionner tous les éléments à animer
    const elementsToAnimate = document.querySelectorAll(
        '.probleme-card, .benefit-card, .fonctionnement-card, ' +
        '.faq-item, .section-title, .intro-text, .histoire-content p'
    );
    
    elementsToAnimate.forEach(el => {
        animateOnScroll.observe(el);
    });
    
    // Animation spéciale pour le tableau comparatif
    const comparatifTable = document.querySelector('.comparatif-table');
    if (comparatifTable) {
        animateOnScroll.observe(comparatifTable);
    }
});
