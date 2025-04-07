# Application de Gestion de Contacts

L'Application de Gestion de Contacts est conçu pour vous aider à gérer vos contacts efficacement. Avec des fonctionnalités comme l'ajout, la modification et la suppression de contacts, cette application offre une expérience fluide pour organiser votre réseau personnel ou professionnel.

## Langue
J'ai fait l'application est en anglais car je vais le mettre sur mon portfolio.

## Démo en Ligne
L'application est déployée et disponible sur [https://contact-manager-lemon.vercel.app/](https://contact-manager-lemon.vercel.app/)

## Table des Matières
- [Fonctionnalités](#fonctionnalités)
- [Captures d'écran](#captures-décran)
- [Structure du Projet](#structure-du-projet)
- [Directives UI](#directives-ui)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Problèmes Connus](#problèmes-connus)

## Fonctionnalités
- Interface moderne avec style Tailwind CSS
- Authentification utilisateur (connexion/inscription)
- Ajout de nouveaux contacts avec des détails comme nom, email, téléphone et photo
- Modification des contacts existants pour mettre à jour leurs informations
- Suppression de contacts avec une fenêtre de confirmation pour éviter les suppressions accidentelles
- Consultation des détails des contacts avec une interface conviviale
- Pagination pour une meilleure navigation à travers les contacts

## Captures d'écran

### Authentification
| Connexion | Inscription |
|-----------|-------------|
| ![Écran de connexion](/public/screenshoots/login.png) | ![Écran d'inscription](/public/screenshoots/register.png) |

### Gestion des Contacts
| Tous les Contacts | Créer un Contact |
|-------------------|------------------|
| ![Tous les contacts](/public/screenshoots/all_contacts.png) | ![Créer un contact](/public/screenshoots/create_contact.png) |

| Détails du Contact | Modifier un Contact |
|--------------------|---------------------|
| ![Détails du contact](/public/screenshoots/contact_details.png) | ![Modifier un contact](/public/screenshoots/edit_contact.png) |

| Supprimer un Contact | Pagination |
|----------------------|------------|
| ![Supprimer un contact](/public/screenshoots/delete_contact.png) | ![Pagination](/public/screenshoots/pagination.png) |

### Recherche de Contacts
| Recherche sans Résultat |
|--------------------------|
| ![Recherche sans résultat](/public/screenshoots/not_contact_searched_found.png) |

## Structure du Projet
```
src/
├── app/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   ├── contacts/
│   │   ├── components/
│   │   ├── models/
│   │   └── services/
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── styles.css
└── main.ts
```

## Directives UI
L'application utilise un langage de design cohérent avec :
- Une palette de couleurs personnalisée (primaire : #6c63ff, secondaire : #ff6584)
- Un rayon de bordure personnalisé (20px)
- Des effets d'ombre personnalisés
- Un design responsive pour les vues mobiles et bureau

### Configuration de Tailwind CSS
L'application utilise Tailwind CSS pour le style avec une configuration personnalisée :

1. Fichier de configuration (`tailwind.config.js`) :
```js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f5f7fa',
        primary: '#6c63ff',
        secondary: '#ff6584',
        text: '#333',
      },
      borderRadius: {
        custom: '20px',
      },
      boxShadow: {
        custom: '0 4px 12px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
```

2. Styles globaux (`styles.css`) :
```css
@import 'tailwindcss';
@config "../tailwind.config.js";
```

## Installation
Pour installer et exécuter l'application localement, suivez ces étapes :

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/pinsdev24/contact-manager.git
   ```
  ou juste unzip le dossier zipper du projet.

2. Naviguez vers le répertoire du projet :
   ```bash
   cd contact-manager (github) ou contact-manager-app (fichier unzip)
   ```

3. Installez les dépendances :
   ```bash
   npm install
   ```

4. Démarrez le serveur de développement :
   ```bash
   ng serve
   ```

5. Ouvrez votre navigateur et allez sur `http://localhost:4200/` pour voir l'application.

## Utilisation
- Inscrivez-vous ou connectez-vous avec des identifiants existants
- Naviguez vers la page Contacts pour voir tous vos contacts
- Utilisez la fonctionnalité de recherche pour trouver des contacts spécifiques
- Cliquez sur un contact pour voir ses informations détaillées
- Utilisez le bouton Modifier pour mettre à jour les détails d'un contact
- Cliquez sur le bouton Supprimer pour retirer un contact, avec une invite de confirmation

## Problèmes Connus
- **Limitations de l'API** : L'implémentation actuelle de l'API présente quelques problèmes :
  - La fonctionnalité de pagination ne fonctionne pas comme prévu même en ayant plus de 10 contacts que j'ai créés.
  - La fonctionnalité de recherche a des limitations et peut ne pas renvoyer des résultats précis
  - L'API swagger dans son ensemble n'est pas bien documentée et comporte des erreurs. (dans la reponse de /auth/login par exemple on a "message": "..." et l'objet user or dans la documentation c'est 'token' et user). Aussi le body pour creer un user n'indique pas qu'il faut le first_name et last_name
  - Les erreurs ne sont pas explicites.

### Captures d'écran des Problèmes d'API
| Problème d'API 1 | Problème d'API 2 |
|------------------|------------------|
| ![Problème d'API 1](/public/screenshoots/api_issue1.png) | ![Problème d'API 2](/public/screenshoots/api_issue2.png) |