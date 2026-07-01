# Plateforme Éducative de Jeux de Programmation (PFE)

## 🎯 Rôle de la Plateforme

Cette plateforme est une application web éducative (Projet de Fin d'Études) visant à enseigner la logique de programmation et le codage à travers des mini-jeux interactifs. Elle combine un backend robuste sous **Laravel (PHP)** et une interface utilisateur dynamique sous **React.js**.

La plateforme est construite autour de la **gamification**, offrant aux utilisateurs un environnement engageant pour apprendre et pratiquer. 

### Fonctionnalités principales :
*   **Jeux d'apprentissage variés** : 
    *   **Robozzle** : Jeu de logique et d'algorithmique spatiale.
    *   **Python RPG** : Jeu de rôle pour apprendre les bases et la syntaxe de Python.
    *   **HTML Kid** : Apprentissage ludique des balises et de la structure HTML.
    *   **Snake** : Le jeu classique, probablement revisité avec des concepts de code.
*   **Système de Progression (Gamification)** : 
    *   Les utilisateurs gagnent de l'expérience (**XP**) et montent de **niveau** en complétant des niveaux (stages) de chaque jeu.
    *   Un système de **streak** (jours consécutifs) encourage la régularité.
    *   Des **Badges** sont débloqués en fonction des accomplissements dans les différents jeux.
*   **Profil Utilisateur** : Chaque joueur possède un profil personnalisable (avatar, bio, langage favori) pour suivre ses statistiques et ses réussites.

---

## 🗄️ Architecture de la Base de Données et Relations (Migrations)

La base de données relationnelle est structurée de manière à lier les utilisateurs, les jeux, les niveaux de ces jeux, et la progression de manière granulaire.

Voici le détail complet des tables et de leurs relations (basé sur les modèles et migrations de l'application) :

### 1. Utilisateurs et Profils
*   **Table `users`** :
    *   **Rôle** : Gère l'authentification et les données globales de gamification.
    *   **Champs clés** : `username`, `email`, `password`, `xp`, `level`, `streak_days`, `avatar`, `is_active`.
*   **Table `profiles`** :
    *   **Rôle** : Stocke les informations publiques et optionnelles de l'utilisateur.
    *   **Champs clés** : `user_id`, `bio`, `favorite_language`.
    *   **Relation** : **1-to-1** avec `users`. Un `User` possède un `Profile`.

### 2. Catalogue de Jeux
*   **Table `games`** :
    *   **Rôle** : Liste tous les jeux disponibles sur la plateforme (ex: Robozzle, Python RPG).
    *   **Champs clés** : `name`, `slug`, `description`, `is_active`.

### 3. Niveaux de Jeux (Stages)
Chaque jeu possède sa propre table de niveaux (stages) pour stocker des configurations spécifiques à son gameplay, bien qu'ils partagent une structure similaire.
*   **Tables `robozzle_stages`, `python_rpg_stages`, `html_kid_stages`, `snake_game_stages`** :
    *   **Rôle** : Définissent les différents niveaux (difficulté croissante) pour chaque jeu.
    *   **Champs clés (communs)** : `game_id`, `name`, `description`, `order`, `config` (JSON pour le layout du niveau), `xp_reward` (récompense), `is_active`.
    *   **Relation** : **1-to-Many** avec `games`. Un `Game` possède plusieurs `Stages`.

### 4. Progression et Réussite
*   **Table `user_stage_progress`** :
    *   **Rôle** : C'est la table pivot (enrichie) qui suit exactement où en est chaque utilisateur.
    *   **Champs clés** : `user_id`, `stage_id`, `game_id`, `completed` (boolean), `stars` (score sur le niveau), `completed_at`.
    *   **Relations** : 
        *   Appartient à (`belongsTo`) un `User`.
        *   Appartient à (`belongsTo`) un `Game`.
        *   Appartient à (`belongsTo`) un `Stage` spécifique.
    
### 5. Système de Récompenses (Badges)
*   **Table `badges`** :
    *   **Rôle** : Catalogue des médailles/trophées disponibles sur la plateforme.
    *   **Champs clés** : `name`, `description`, `icon`.
*   **Table `badge_user` (Pivot)** :
    *   **Rôle** : Lie les utilisateurs aux badges qu'ils ont gagnés, tout en précisant dans quel jeu ils l'ont obtenu.
    *   **Champs clés** : `user_id`, `badge_id`, `game_id`.
    *   **Relation** : **Many-to-Many** entre `users` et `badges` (un utilisateur peut avoir plusieurs badges, un badge est possédé par plusieurs utilisateurs), avec `game_id` utilisé comme contexte sur le pivot.

---

## 🛠️ Stack Technique

*   **Backend** : PHP avec le framework Laravel. Gère les API REST, l'authentification (Sanctum), la logique de validation des niveaux et l'attribution des points (XP/Badges).
*   **Frontend** : JavaScript avec la bibliothèque React.js (utilisation de hooks personnalisés et de composants fonctionnels pour rendre les jeux interactifs comme le plateau de Robozzle ou le RPG Python).
*   **Base de Données** : Relationnelle (MySQL / PostgreSQL via Eloquent ORM de Laravel).
