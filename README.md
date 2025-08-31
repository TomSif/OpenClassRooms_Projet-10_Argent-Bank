![ArgentBank](Front-End/public/assets/img/argentBankLogo.webp)

# ArgentBank 💰

![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)
![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)
![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://github.com/TomSif)
[![React](https://img.shields.io/badge/react-20232a?style=for-the-badge&logo=react&logocolor=61dafb)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/redux-593d88?style=for-the-badge&logo=redux&logocolor=white)](https://redux.js.org/)
[![Vite](https://img.shields.io/badge/vite-646cff?style=for-the-badge&logo=vite&logocolor=white)](https://vitejs.dev/)

<a href="#description-fr-">🇫🇷 README en Français</a> - <a href="#en-description">🇺🇸 English README</a>

---

## Description FR :

Ceci est un projet réalisé dans le cadre du programme de formation Développeur Front-end JavaScript React chez [OpenClassrooms](https://openclassrooms.com/fr/paths/900-integrateur-web)

> **Mission** : Implémenter le front-end d'une application bancaire avec React et Redux
>
> #### Compétences évaluées :
>
> - ✅ Implémenter un gestionnaire d'état dans une application React (Redux)
> - 🤝 Interagir avec une API REST
> - 📝 Modéliser une API (Phase 2)
> - 🔑 S'authentifier à une API (JWT)

### 🎯 Contexte du projet :

**Argent Bank** est une nouvelle banque en ligne qui souhaite développer son application web pour permettre aux clients de :

- Se connecter de manière sécurisée
- Consulter leurs informations de profil
- Gérer leurs comptes bancaires

### 📱 Fonctionnalités implémentées :

**Phase 1 - Authentification & Profil :**

- ✅ Page d'accueil responsive
- ✅ Système d'authentification (JWT)
- ✅ Page de connexion avec gestion d'erreurs
- ✅ Page profil utilisateur sécurisée
- ✅ Modification du nom d'utilisateur (userName)
- ✅ Déconnexion sécurisée
- ✅ Persistance du userName entre sessions

**Phase 2 - Transactions (Bonus) :**

- ✅ Page de transactions par compte
- ✅ Affichage détaillé des opérations
- ✅ Modification des catégories et notes
- ✅ Navigation entre les comptes

### 🛠️ Stack Technique :

**Frontend :**

- **React 18** avec hooks
- **Vite** (bundler moderne)
- **React Router v6** (navigation)
- **Redux Toolkit** (gestion d'état)
- **CSS3** responsive

**Backend fourni :**

- **Node.js** / **Express**
- **MongoDB**
- **JWT** pour l'authentification

---

## 🚀 Installation

### Prérequis :

- **Node.js** (v14 ou supérieur)
- **MongoDB** (pour le backend)
- **Git**

### 📥 Cloner le projet :

```bash
git clone https://github.com/TomSif/OpenClassRooms_Projet-10_Argent-Bank.git
cd OpenClassRooms_Projet-10_Argent-Bank
```

### 🔧 Installation Backend :

1. Naviguez vers le dossier backend :

```bash
cd backend
```

2. Installez les dépendances :

```bash
npm install
```

3. Lancez le serveur de développement :

```bash
npm run dev:server
```

4. Remplissez la base de données :

```bash
npm run populate-db
```

Le backend sera accessible sur `http://localhost:3001`

### ⚛️ Installation Frontend :

1. Naviguez vers le dossier racine :

```bash
cd ../
```

2. Installez les dépendances :

```bash
npm install
```

3. Lancez l'application :

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

---

## 👥 Comptes de test

Utilisez ces identifiants pour tester l'application :

| Utilisateur      | Email              | Mot de passe  |
| ---------------- | ------------------ | ------------- |
| **Tony Stark**   | `tony@stark.com`   | `password123` |
| **Steve Rogers** | `steve@rogers.com` | `password456` |

---

## 📱 Utilisation

1. **Accueil** : Visitez la page d'accueil
2. **Connexion** : Cliquez sur "Sign In" et utilisez un compte de test
3. **Profil** : Consultez vos informations et modifiez votre userName
4. **Transactions** : Cliquez sur "View transactions" sur n'importe quel compte
5. **Édition** : Modifiez les catégories et notes des transactions
6. **Déconnexion** : Cliquez sur "Sign Out" pour vous déconnecter

---

## 🏗️ Architecture

```markdown
Front-End/
├── docs/ # 📚 Documentation
│ └── swagger_phase_2.yaml # API Swagger/OpenAPI Phase 2
├── public/ # Assets statiques
│ └── assets/
│ └── img/ # 🖼️ Images et icônes
│ ├── argentBankLogo.webp
│ ├── icon-chat.webp
│ ├── icon-money.webp
│ ├── icon-security.webp
│ ├── bank-tree.webp
│ └── bank-tree-max920.webp
└── src/
├── app/ # Configuration Redux
│ └── store.js
├── features/ # Slices Redux
│ └── auth/
│ └── authSlice.js
├── components/ # Composants réutilisables
│ ├── AccountCard.jsx
│ ├── FeatureItem.jsx
│ ├── Footer.jsx
│ ├── Header.jsx
│ ├── Login.jsx
│ └── UserProfile.jsx
├── pages/ # Pages principales
│ ├── HomePage.jsx
│ ├── SignInPage.jsx
│ ├── User.jsx
│ └── Transactions.jsx
└── css/
└── main.css # Fichier CSS principal
```

---

## 🧪 API Documentation

Une fois le backend lancé, consultez la documentation Swagger :
`http://localhost:3001/api-docs`

**Endpoints principaux :**

- `POST /api/v1/user/login` - Connexion
- `POST /api/v1/user/profile` - Récupération profil
- `PUT /api/v1/user/profile` - Modification profil

---

## 📋 Spécifications Phase 2

J'ai également conçu une spécification d'API pour la gestion des transactions (Phase 2 du projet). Consultez le fichier `swagger_phase_2.yaml` dans /docs pour les détails techniques.

---

## 🔧 Développé avec :

- [React 18](https://reactjs.org/) - Bibliothèque JavaScript
- [Vite](https://vitejs.dev/) - Build tool moderne
- [Redux Toolkit](https://redux-toolkit.js.org/) - Gestion d'état
- [React Router](https://reactrouter.com/) - Navigation
- [Visual Studio Code](https://code.visualstudio.com/) - IDE

---

## 👨‍💻 Auteur :

**Thomas Sifferle** : [GitHub](https://github.com/TomSif)

---

## EN Description

This is a project carried out as part of the Front-End JavaScript React Developer training program at [OpenClassrooms](https://openclassrooms.com/fr/paths/900-integrateur-web).

> **Mission**: Implement the front-end of a banking application with React and Redux
>
> #### Skills evaluated:
>
> - ✅ Implement a state manager in a React application (Redux)
> - 🤝 Interact with a REST API
> - 📝 Model an API (Phase 2)
> - 🔑 Authenticate with an API (JWT)

### 🎯 Project Context:

**Argent Bank** is a new online bank that wants to develop its web application to allow customers to:

- Log in securely
- View their profile information
- Manage their bank accounts

### 📱 Implemented Features:

**Phase 1 - Authentication & Profile:**

- ✅ Responsive homepage
- ✅ Authentication system (JWT)
- ✅ Login page with error handling
- ✅ Secure user profile page
- ✅ Username modification (userName)
- ✅ Secure logout
- ✅ userName persistence between sessions

**Phase 2 - Transactions (Bonus):**

- ✅ Transaction page per account
- ✅ Detailed display of operations
- ✅ Category and note modification
- ✅ Navigation between accounts

### 🛠️ Tech Stack:

**Frontend:**

- **React 18** with hooks
- **Vite** (modern bundler)
- **React Router v6** (navigation)
- **Redux Toolkit** (state management)
- **CSS3** responsive

**Backend provided:**

- **Node.js** / **Express**
- **MongoDB**
- **JWT** for authentication

---

## 🚀 Installation

### Prerequisites:

- **Node.js** (v14 or higher)
- **MongoDB** (for backend)
- **Git**

### 📥 Clone the project:

```bash
git clone https://github.com/TomSif/OpenClassRooms_Projet-10_Argent-Bank.git
cd OpenClassRooms_Projet-10_Argent-Bank
```

### 🔧 Backend Setup:

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev:server
```

4. Populate database:

```bash
npm run populate-db
```

Backend will be accessible at `http://localhost:3001`

### ⚛️ Frontend Setup:

1. Navigate to root folder:

```bash
cd ../
```

2. Install dependencies:

```bash
npm install
```

3. Start application:

```bash
npm run dev
```

Application will be accessible at `http://localhost:5173`

---

## 👥 Test Accounts

Use these credentials to test the application:

| User             | Email              | Password      |
| ---------------- | ------------------ | ------------- |
| **Tony Stark**   | `tony@stark.com`   | `password123` |
| **Steve Rogers** | `steve@rogers.com` | `password456` |

---

## 👨‍💻 Author:

**Thomas Sifferle**: [GitHub](https://github.com/TomSif)
