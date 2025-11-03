/* ============================================ */
/* FICHIER SCRIPT.JS V1.0 - JB IMMO             */
/* ============================================ */

// On attend que toute la page (le 'DOM') soit chargée
document.addEventListener('DOMContentLoaded', () => {
  /* --- 1. MOTEUR DU CALCULATEUR --- */

  // On sélectionne le formulaire et les blocs de résultats
  const form = document.getElementById('form-calculateur');
  const resultatsCalculDiv = document.getElementById('resultats-calcul');
  const resultatsAuditDiv = document.getElementById('resultats-audit');

  // S'il ne trouve pas le formulaire sur la page, on arrête pour éviter une erreur
  if (form) {
    // On écoute l'événement "submit" (quand l'utilisateur clique sur le bouton)
    form.addEventListener('submit', function (event) {
      // ÉTAPE 1: Empêcher la page de se recharger (TRÈS IMPORTANT)
      event.preventDefault();

      // ÉTAPE 2: Récupérer les valeurs de tous les champs
      const quartier = document.getElementById('calc-quartier').value;
      const prixNuit =
        parseInt(document.getElementById('calc-prix').value) || 0;
      const nuitsLouees =
        parseInt(document.getElementById('calc-nuits').value) || 0;
      const capaciteActuelle =
        parseInt(document.getElementById('calc-capacite').value) || 2;
      const chargeMentale = document.getElementById('calc-charge').value;

      // ÉTAPE 3: La Logique "Intelligente" (Tier 1/2 vs. Tier 3)

      if (
        quartier === 'tier1' ||
        quartier === 'tier2' ||
        quartier === 'tier3' // CORRECTION: J'ai vu que tu avais tier1, tier2, tier3. On les prend tous.
      ) {
        // --- CAS A: Le quartier est éligible (Tier 1, 2 ou 3) ---
        // (Note: J'ai re-vérifié ton HTML, tu as mis Tier 1 et 2 dans les <optgroup>.
        // Si "autre" n'est pas choisi, on calcule.)

        // On affiche le bloc de résultats et on cache l'autre
        resultatsCalculDiv.style.display = 'block';
        resultatsAuditDiv.style.display = 'none';

        // --- On fait les calculs ---

        // Logique "AVANT"
        const revenuActuelBrut = prixNuit * nuitsLouees;
        // On s'assure de ne pas diviser par zéro si l'utilisateur met 0 nuits
        const tauxOccupationActuel =
          nuitsLouees > 0 ? (nuitsLouees / 30) * 100 : 0;

        // Logique "APRÈS" (Tes leviers d'optimisation)
        const PRIX_AJOUT_PHOTO = 12; // Levier 2
        const PRIX_AJOUT_CAPACITE = 25; // Levier 1
        const JOURS_OCCUPATION_GARANTI = 24; // Levier 3
        const COMMISSION_JB_IMMO = 0.25; // 25% (modifiable ici)

        const prixNuitOptimise =
          prixNuit + PRIX_AJOUT_PHOTO + PRIX_AJOUT_CAPACITE;
        const revenuOptimiseBrut =
          prixNuitOptimise * JOURS_OCCUPATION_GARANTI;
        const commissionEnEuros = revenuOptimiseBrut * COMMISSION_JB_IMMO;
        const netOptimise = revenuOptimiseBrut - commissionEnEuros;
        const gainNet = netOptimise - revenuActuelBrut;
        const capaciteOptimisee = capaciteActuelle + 2;

        // --- On affiche les résultats dans le HTML ---
        // (on utilise .toLocaleString('fr-FR') pour avoir de beaux chiffres "1 250 €")

        // Colonne "AVANT"
        document.getElementById('res-brut-actuel').textContent =
          Math.round(revenuActuelBrut).toLocaleString('fr-FR') + ' €';
        document.getElementById('res-occupation-actuel').textContent =
          Math.round(tauxOccupationActuel) + ' %';
        document.getElementById('res-cap-actuel').textContent =
          capaciteActuelle + ' pers.';
        document.getElementById('res-charge-actuel').textContent =
          chargeMentale;
        document.getElementById('res-net-actuel').textContent =
          Math.round(revenuActuelBrut).toLocaleString('fr-FR') + ' €';

        // Colonne "APRÈS"
        document.getElementById('res-brut-optimise').textContent =
          Math.round(revenuOptimiseBrut).toLocaleString('fr-FR') + ' €';
        document.getElementById('res-cap-optimise').textContent =
          capaciteOptimisee + ' pers.';
        document.getElementById('res-net-optimise').textContent =
          Math.round(netOptimise).toLocaleString('fr-FR') + ' €';

        // Le Gain Final
        document.getElementById('res-gain-net').textContent =
          '+ ' + Math.round(gainNet).toLocaleString('fr-FR') + ' € / mois*';
      } else if (quartier === 'autre') {
        // --- CAS B: Le quartier est "Autre" (Tier 3) ---

        // On affiche le bloc d'audit et on cache l'autre
        resultatsCalculDiv.style.display = 'none';
        resultatsAuditDiv.style.display = 'block';
      }
      // Si "Choisissez votre secteur" est sélectionné (valeur=""),
      // il ne se passe rien car le 'required' du HTML va bloquer le formulaire.
    });
  } // Fin du 'if (form)'

  /* --- 2. SMOOTH SCROLL (Navigation fluide) --- */

  // On sélectionne TOUS les liens qui commencent par un #
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      // On empêche le "saut" brutal
      e.preventDefault();

      // On récupère la cible (ex: "#services")
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // On fait défiler la page jusqu'à l'élément
        targetElement.scrollIntoView({
          behavior: 'smooth', // 'smooth' fait le défilement fluide
          block: 'start',
        });
      }
    });
  }); // Fin du smooth scroll
}); // Fin du 'DOMContentLoaded'