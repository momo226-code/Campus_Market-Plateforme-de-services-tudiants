🚀 Ventura (Campus-Market) : Digital Marketplace for UM6P
Ventura est une plateforme de marketplace solidaire et de services conçue exclusivement pour la communauté étudiante de l'Université Mohammed VI Polytechnique (UM6P). L'application facilite l'échange de biens et de services entre étudiants dans un écosystème sécurisé et moderne.

🌟 Vision du Projet
L'objectif était de créer une solution "tout-en-un" pour le campus, permettant aux étudiants de publier des annonces, de proposer des services et de gérer leurs interactions via une interface fluide et responsive, inspirée des meilleurs standards du e-commerce actuel.

Note : Ce projet a été développé avec le soutien et le financement de la Fondation Mastercard dans le cadre des initiatives d'entrepreneuriat et d'innovation de l'UM6P.

🛠️ Stack Technique (MERN)
Frontend : React.js avec Vite pour la performance.

Styling : Tailwind CSS (Design moderne et responsive).

Backend : Node.js & Express.

Base de Données : MongoDB Atlas (Base de données NoSQL flexible).

Déploiement : Prêt pour Vercel / Render avec intégration Git continue.

✨ Fonctionnalités Clés
Authentification Sécurisée : Gestion des comptes étudiants.

Marketplace Dynamique : Publication, modification et suppression d'annonces en temps réel.

Système de Catégories : Filtrage intelligent des services et des produits.

Dashboard Utilisateur : Suivi des annonces publiées et gestion du profil.

UI/UX Optimisée : Navigation intuitive avec une barre de recherche globale et une navbar interactive.

🏗️ Architecture du Projet
Le projet suit une architecture découplée pour une meilleure scalabilité :

Client : Composants React modulaires et gestion d'état optimisée.

Server : API RESTful structurée avec des routes protégées et une gestion d'erreurs centralisée.

Database : Modélisation de documents JSON pour une grande flexibilité dans l'évolution des fonctionnalités.

🚀 Installation & Développement
Cloner le projet :

Bash
git clone [https://github.com/momo226-code/Campus_Market-Plateforme-de-services-tudiants.git](https://github.com/momo226-code/Campus_Market-Plateforme-de-services-tudiants.git)
cd Campus_Market-Plateforme-de-services-tudiants
Installation des dépendances :

Bash
# Installer les dépendances du serveur
cd server && npm install

# Installer les dépendances du client
cd ../client && npm install
Configuration :
Créer un fichier .env dans le dossier server :

Extrait de code
MONGO_URI=votre_mongodb_uri
JWT_SECRET=votre_secret_key
PORT=5000
Lancement du projet :

Bash
# Terminal 1 (Frontend - dossier client)
npm run dev

# Terminal 2 (Backend - dossier server)
npm run start
📈 Impact & Perspectives
Ventura démontre ma capacité à gérer un cycle de développement complet (Full-Stack) tout en répondant à un besoin communautaire réel. Ce projet, soutenu par la Fondation Mastercard, applique les technologies web les plus modernes pour améliorer la vie sur le campus.
