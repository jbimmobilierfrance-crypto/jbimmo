# JB Immo - Site Web V10.2

Site vitrine pour JB Immo — Partenariat Locatif Professionnel à Montpellier.

## 🚀 Développement Local

### Prérequis
- Un navigateur web moderne
- Un serveur local (Live Server pour VS Code recommandé)

### Lancer le site en local

1. **Ouvrir le projet dans VS Code**
   ```bash
   cd "/chemin/vers/JB-Immo-Site"
   code .
   ```

2. **Lancer Live Server**
   - Installer l'extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
   - Clic droit sur `index.html` → "Open with Live Server"
   - Le site s'ouvre automatiquement sur `http://localhost:5500`

3. **Alternative : Python HTTP Server**
   ```bash
   python3 -m http.server 8000
   # Ouvrir http://localhost:8000
   ```

## 📦 Structure du Projet

```
JB-Immo-Site/
├── index.html          # Page principale
├── css/
│   └── style.css       # Styles (V10.2-stable)
├── js/
│   └── script.js       # JavaScript (V10.2-stable)
├── assets/             # Images (hero slider, histoire, etc.)
├── Archives/           # Versions archivées
├── Contenu/            # Contenu éditorial
├── V10.1-stable/       # Version de développement précédente
├── README.md           # Ce fichier
├── .gitignore          # Fichiers à ignorer par Git
└── deploy.sh           # Script de déploiement
```

## 🚢 Déploiement sur Vercel

### Configuration initiale

1. **Configurer Git (si pas déjà fait)**
   ```bash
   git init
   git remote add origin <URL_DE_VOTRE_REPO_GITHUB>
   ```

2. **Exécuter le script de déploiement**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

   Ou avec bash :
   ```bash
   bash deploy.sh
   ```

3. **Connecter Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Importer votre repository GitHub
   - Vercel détecte automatiquement la configuration (site statique)
   - Le déploiement se fait automatiquement à chaque push sur `main`

### Déploiements futurs

Une fois configuré, chaque push sur `main` déclenche un déploiement automatique :

```bash
git add .
git commit -m "Description des changements"
git push origin main
```

## 🛠️ Modifications Courantes

### Ajouter une image au slider hero
1. Ajouter l'image dans `/assets/`
2. Mettre à jour `js/script.js` ligne 18 :
   ```javascript
   const IMAGES = {
       hero: [
           'arbre blanc.jpg',
           'nouvelle-image.jpg',  // Ajouter ici
           // ...
       ]
   }
   ```

### Modifier les couleurs
Éditer les variables CSS dans `css/style.css` (lignes 16-30) :
```css
:root {
    --or-discret: #C9A86A;
    --gris-fonce: #2C2C2C;
    /* ... */
}
```

### Mettre à jour les coordonnées
Éditer `index.html` dans la section Contact et le Footer.

## 📋 Versions

- **V10.2-stable** (actuelle) :
  - Grilles équilibrées avec ghost-cards
  - Navigation enrichie avec IntersectionObserver
  - Section "Notre histoire" réécrite
  - Contact/Footer différenciés
  - Chemins root-relatifs pour Vercel

- **V10.1-stable** : Version précédente avec slider automatique
- **Archives/** : Versions antérieures

## 🐛 Dépannage

### Le site s'affiche sans CSS/JS sur Vercel
- Vérifier que les chemins dans `index.html` commencent par `/` :
  - ✅ `href="/css/style.css"`
  - ❌ `href="css/style.css"`

### Les images ne s'affichent pas
- Vérifier que les images sont dans `/assets/`
- Vérifier les noms de fichiers dans `js/script.js` (const IMAGES)
- Attention aux espaces et caractères spéciaux dans les noms de fichiers

### Le menu burger ne fonctionne pas
- Vérifier que `script.js` est bien chargé
- Ouvrir la console du navigateur (F12) pour voir les erreurs

## 📞 Support

Pour toute question ou problème :
- Email : jbimmobilier.france@gmail.com
- Téléphone : 06 58 79 70 37

---

**JB Immo** — Le locataire dont tous les propriétaires rêvent.
