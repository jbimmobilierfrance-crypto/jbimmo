/* ================================================================================
   JB IMMO - GESTION LOCATIVE MONTPELLIER
   Script.js - Version V10.2-stable

   CHANGELOG V10.2 :
   - Ajout constante IMAGES pour gestion automatique des images depuis assets/
   - Slider hero généré dynamiquement depuis images locales
   - Image "Notre histoire" chargée automatiquement
   - Navigation avec IntersectionObserver (plus moderne et performant)
   - Ghost-cards pour centrer les grilles avec nombre impair (cas % 3 === 2)
   - Génération automatique du hero slider
   ================================================================================ */

// ================================================================================
// CONSTANTE IMAGES - GESTION AUTOMATIQUE DES ASSETS
// ================================================================================
const IMAGES = {
    hero: [
        'arbre blanc.jpg',
        'arbre-blanc-2.jpg',
        'bassin-jacques-coeur-montpellier-3.jpg',
        'comédie pluie.jpg',
        'ee.jpeg',
        'pierres vives.jpg',
        'place de l\'europe.jpg'
    ],
    histoire: 'bassin-jacques-coeur-montpellier-3.jpg'
};

document.addEventListener('DOMContentLoaded', function() {

    // ================================================================================
    // GÉNÉRATION AUTOMATIQUE DU SLIDER HERO DEPUIS ASSETS
    // ================================================================================

    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        // Vider le contenu existant
        heroSlider.innerHTML = '';

        // Générer les slides depuis la constante IMAGES
        IMAGES.hero.forEach((imageName, index) => {
            const slide = document.createElement('div');
            slide.className = 'hero-slide';
            if (index === 0) slide.classList.add('active'); // Première image active
            slide.style.backgroundImage = `url('${encodeURI('/assets/' + imageName)}')`;
            heroSlider.appendChild(slide);
        });
    }

    // ================================================================================
    // IMAGE "NOTRE HISTOIRE" - CHARGEMENT AUTOMATIQUE
    // ================================================================================

    const histoireImg = document.getElementById('histoire-img');
    if (histoireImg) {
        histoireImg.src = encodeURI('/assets/' + IMAGES.histoire);
    } else {
        // Si l'image n'existe pas encore, on la crée et l'insère dans la section
        const histoireSection = document.querySelector('.histoire-image');
        if (histoireSection) {
            const img = document.createElement('img');
            img.id = 'histoire-img';
            img.src = encodeURI('/assets/' + IMAGES.histoire);
            img.alt = 'Montpellier — Bassin Jacques Cœur';
            // Remplacer l'image existante si présente
            const existingImg = histoireSection.querySelector('img');
            if (existingImg) {
                existingImg.replaceWith(img);
            } else {
                histoireSection.appendChild(img);
            }
        }
    }

    // ================================================================================
    // GHOST-CARDS POUR GRILLES ÉQUILIBRÉES (CAS % 3 === 2)
    // ================================================================================

    function balanceGrids() {
        // Sélecteurs des grilles à équilibrer
        const grids = [
            '.probleme-grid',
            '.engagements-grid',
            '.benefits-grid'
        ];

        grids.forEach(gridSelector => {
            const grid = document.querySelector(gridSelector);
            if (!grid) return;

            // Supprimer les ghost-cards existantes
            const existingGhosts = grid.querySelectorAll('.ghost-card');
            existingGhosts.forEach(ghost => ghost.remove());

            // Compter les vraies cartes (pas les ghost-cards)
            const realCards = Array.from(grid.children).filter(
                child => !child.classList.contains('ghost-card')
            );
            const cardCount = realCards.length;

            // Si cardCount % 3 === 2, ajouter une ghost-card
            if (cardCount % 3 === 2) {
                const ghostCard = document.createElement('div');
                ghostCard.className = realCards[0].className + ' ghost-card';
                ghostCard.setAttribute('aria-hidden', 'true');
                ghostCard.style.visibility = 'hidden';
                ghostCard.style.pointerEvents = 'none';
                grid.appendChild(ghostCard);
            }
        });
    }

    // Équilibrer les grilles au chargement
    balanceGrids();

    // Rééquilibrer au resize (avec debounce pour performance)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(balanceGrids, 250);
    });

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
    // BURGER MENU - MOBILE
    // ================================================================================

    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navMenuLinks = document.querySelectorAll('.nav-links a');

    if (burgerMenu && navMenu) {
        // Toggle menu au clic sur burger
        burgerMenu.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('active');

            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Fermer le menu au clic sur un lien
        navMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });

        // Fermer le menu au clic en dehors
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnBurger = burgerMenu.contains(event.target);

            if (!isClickInsideMenu && !isClickOnBurger && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    function openMobileMenu() {
        navMenu.classList.add('active');
        burgerMenu.classList.add('active');
        burgerMenu.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMobileMenu() {
        navMenu.classList.remove('active');
        burgerMenu.classList.remove('active');
        burgerMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // ================================================================================
    // SMOOTH SCROLL POUR LES LIENS DE NAVIGATION + LIENS ACTIFS (IntersectionObserver)
    // ================================================================================

    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    // Scroll fluide vers les ancres
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

    // IntersectionObserver pour détection de section active (plus performant que scroll event)
    const observerOptions = {
        root: null,
        rootMargin: `-${header.offsetHeight}px 0px -70% 0px`,
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');

                // Mettre à jour les liens actifs
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href').substring(1);
                    if (href === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observer toutes les sections
    sections.forEach(section => {
        sectionObserver.observe(section);
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

    // Configuration de l'observer pour les animations
    const animationObserverOptions = {
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
    }, animationObserverOptions);
    
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