# Bite - Plateforme de livraison de repas

Application de livraison de repas avec gestion multi-utilisateurs (Clients, Restaurateurs, Administrateurs).

## Design

L'application utilise un design moderne inspiré de l'application "Bite" avec :

### Couleurs
- **Primary Red** : #A30000 (Rouge principal)
- **Dark Red** : #8B0000 (Header)
- **Yellow Badge** : #FFC107 (Badges promotionnels)
- **White** : #FFFFFF
- **Light Gray** : #F5F5F5 (Fonds)
- **Text Dark** : #212121
- **Text Light** : #757575
- **Gradient** : Dégradé orange-jaune (#FFA800 to #FFC107) pour les bannières promotionnelles

### Typographie
- **Titres/Prix** : Montserrat Bold ou Poppins Bold
- **Texte normal** : Poppins Regular ou Roboto Medium
- Les polices sont chargées via Google Fonts

### Caractéristiques du design
- Design mobile-first avec navigation en bas sur mobile
- Bordures arrondies (rounded-2xl)
- Ombres douces personnalisées (shadow-bite)
- Dégradés orange-jaune pour les promotions
- Badges "50% OFF" en jaune vif
- Bouton Google Login dans le profil
- Hamburger menu icon pour mobile
- Design épuré et moderne avec transitions fluides

## Technologies

- **React** avec **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**

## Structure du projet

```
/
├── app/
│   ├── client/          # Application client
│   │   ├── home         # Page d'accueil + recherche
│   │   ├── restaurants  # Liste + filtres
│   │   ├── restaurant/[id]  # Menu détaillé
│   │   ├── cart         # Panier
│   │   ├── checkout     # Paiement
│   │   ├── orders       # Suivi & historique
│   │   └── profile      # Compte utilisateur
│   │
│   ├── resto/           # Dashboard restaurateur
│   │   ├── dashboard
│   │   ├── menu
│   │   ├── orders
│   │   ├── schedule
│   │   ├── stats
│   │   └── settings
│   │
│   └── admin/           # Backoffice administrateur
│       ├── dashboard
│       ├── restaurants
│       ├── users
│       ├── payments
│       ├── zones
│       └── settings
```

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
```

3. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Fonctionnalités

### Client
- Recherche et découverte de restaurants
- Consultation des menus
- Panier et commande
- Suivi de commande en temps réel
- Paiement sécurisé (MTN MOBILE MONEY, AIRTEL MONEY)
- Compte utilisateur

### Restaurateur
- Gestion du menu (CRUD)
- Gestion des commandes
- Horaires & disponibilité
- Statistiques & rapports
- Profil restaurant

### Administrateur
- Gestion des restaurants
- Gestion des utilisateurs
- Gestion des paiements & finances
- Suivi global & analytics
- Configuration plateforme
- Support & modération

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run start` - Lance le serveur de production
- `npm run lint` - Lance ESLint

