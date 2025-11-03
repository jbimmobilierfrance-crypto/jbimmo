#!/bin/bash

# ================================================================================
# JB IMMO - SCRIPT DE DÉPLOIEMENT
# ================================================================================
# Ce script prépare et déploie le site sur la branche main pour Vercel
# Usage : ./deploy.sh ou bash deploy.sh
# ================================================================================

set -e  # Arrêter le script en cas d'erreur

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "=================================================================================="
echo "  JB IMMO - DÉPLOIEMENT V10.2"
echo "=================================================================================="
echo -e "${NC}"

# ================================================================================
# 1. VÉRIFICATION : Sommes-nous dans un dépôt Git ?
# ================================================================================
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ ERREUR : Ce répertoire n'est pas un dépôt Git${NC}"
    echo ""
    echo "Pour initialiser Git, exécutez :"
    echo "  git init"
    echo "  git remote add origin <URL_DU_REPO_GITHUB>"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓${NC} Dépôt Git détecté"

# ================================================================================
# 2. VÉRIFICATION : Le remote origin est-il configuré ?
# ================================================================================
if ! git remote get-url origin &> /dev/null; then
    echo -e "${RED}❌ ERREUR : Aucun remote 'origin' configuré${NC}"
    echo ""
    echo "Pour ajouter votre repository GitHub/GitLab :"
    echo "  git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git"
    echo ""
    echo "Ou avec SSH :"
    echo "  git remote add origin git@github.com:VOTRE_USERNAME/VOTRE_REPO.git"
    echo ""
    exit 1
fi

ORIGIN_URL=$(git remote get-url origin)
echo -e "${GREEN}✓${NC} Remote origin configuré : ${ORIGIN_URL}"

# ================================================================================
# 3. VÉRIFICATION : Y a-t-il des fichiers à committer ?
# ================================================================================
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠${NC}  Aucune modification détectée. Rien à déployer."
    echo ""
    read -p "Voulez-vous forcer le push vers origin/main ? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Déploiement annulé."
        exit 0
    fi
else
    echo -e "${GREEN}✓${NC} Modifications détectées"
fi

# ================================================================================
# 4. VÉRIFICATION : La branche main existe-t-elle ?
# ================================================================================
if git show-ref --verify --quiet refs/heads/main; then
    echo -e "${GREEN}✓${NC} Branche 'main' existe"
    CURRENT_BRANCH=$(git branch --show-current)

    if [ "$CURRENT_BRANCH" != "main" ]; then
        echo -e "${YELLOW}⚠${NC}  Vous êtes sur la branche '${CURRENT_BRANCH}'"
        read -p "Basculer vers 'main' ? (Y/n) " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Nn]$ ]]; then
            git checkout main
            echo -e "${GREEN}✓${NC} Basculé vers 'main'"
        fi
    fi
else
    echo -e "${YELLOW}⚠${NC}  Branche 'main' n'existe pas. Création..."
    git checkout -b main
    echo -e "${GREEN}✓${NC} Branche 'main' créée"
fi

# ================================================================================
# 5. AJOUT DES FICHIERS
# ================================================================================
echo ""
echo -e "${BLUE}📦 Ajout des fichiers...${NC}"
git add -A

if [ -z "$(git diff --cached --name-only)" ]; then
    echo -e "${YELLOW}⚠${NC}  Aucun changement à committer"
else
    echo -e "${GREEN}✓${NC} Fichiers ajoutés au staging"
    git diff --cached --name-only | sed 's/^/  - /'
fi

# ================================================================================
# 6. COMMIT
# ================================================================================
echo ""
echo -e "${BLUE}💾 Création du commit...${NC}"

COMMIT_MSG="Deploy V10.2: restructuration prod à la racine + chemins root-relatifs

- Fichiers prod déplacés à la racine (index.html, /css, /js, /assets)
- Tous les chemins convertis en root-relatifs (/css/style.css, /js/script.js)
- Labels navigation raccourcis (Histoire, Engagements, Match)
- CSS navbar responsive optimisé (nowrap + padding)
- .gitignore, README.md et deploy.sh ajoutés
- Prêt pour déploiement Vercel

🤖 Generated with Claude Code"

if git diff --cached --quiet; then
    echo -e "${YELLOW}⚠${NC}  Rien à committer (toutes les modifications déjà commitées)"
else
    git commit -m "$COMMIT_MSG"
    echo -e "${GREEN}✓${NC} Commit créé"
fi

# ================================================================================
# 7. PUSH VERS ORIGIN/MAIN
# ================================================================================
echo ""
echo -e "${BLUE}🚀 Push vers origin/main...${NC}"

# Vérifier si la branche main existe sur le remote
if git ls-remote --heads origin main | grep -q main; then
    # La branche existe, push normal
    git push origin main
else
    # Première fois, push avec -u
    git push -u origin main
fi

echo -e "${GREEN}✓${NC} Push réussi"

# ================================================================================
# 8. RÉCAPITULATIF
# ================================================================================
echo ""
echo -e "${GREEN}=================================================================================="
echo "  ✅ DÉPLOIEMENT RÉUSSI"
echo "==================================================================================${NC}"
echo ""
echo "Prochaines étapes :"
echo ""
echo "  1. Connecter Vercel à votre repository GitHub"
echo "     → https://vercel.com/new"
echo ""
echo "  2. Vercel détectera automatiquement la configuration"
echo "     (site statique, pas de build)"
echo ""
echo "  3. À chaque push sur 'main', Vercel redéploie automatiquement"
echo ""
echo -e "${BLUE}📊 URL du repository :${NC} ${ORIGIN_URL}"
echo ""
echo -e "${YELLOW}💡 Astuce :${NC} Pour voir le statut Git : git status"
echo ""
echo "=================================================================================="
echo ""
