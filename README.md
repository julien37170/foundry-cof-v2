# Chroniques Oubliées Fantasy V2 for Foundry VTT

Ce dépôt fournit un **squelette minimal** pour un système de jeu Foundry VTT conforme à Chroniques Oubliées Fantasy V2 (COF V2).  
Il contient la structure de dossiers et quelques fichiers de démarrage afin que vous puissiez développer un module complet.  

## Structure du dépôt

```
foundry-cof-v2/
├── README.md            # Ce fichier
├── systems/
│   └── cof-v2/
│       ├── system.json  # Manifest du système pour Foundry VTT
│       └── template.json # Schémas de données pour acteurs et objets
├── worlds/
│   └── cof-v2-starter-world/
│       └── world.json   # Manifest minimal pour un monde d’exemple
└── package.json         # Dépendances de développement (facultatif)
```

## Installation

1. Clonez ce dépôt ou téléchargez l’archive ZIP.  
2. Copiez le dossier `systems/cof-v2` dans votre répertoire `Data/systems/` de Foundry.  
3. Copiez le dossier `worlds/cof-v2-starter-world` dans `Data/worlds/`.  
4. Démarrez Foundry VTT et activez le système COF V2 puis créez un monde à partir de **cof-v2-starter-world**.

## Limitations

Ce dépôt est volontairement minimal : il ne contient que des fichiers de configuration et des schémas. Aucune feuille d’acteur, logique de calcul ou compendium n’est implémenté. Utilisez-le comme base pour développer votre propre implémentation ; reportez‑vous au guide de prompt fourni pour les spécifications détaillées.

## Licence

Le code de ce dépôt est publié sous licence **MIT**. Vous êtes libre de l’utiliser et de le modifier. Cependant, ne recopiez aucun contenu sous copyright provenant du livre de règles COF V2.  
Chroniques Oubliées Fantasy est une marque et un contenu protégés appartenant à **Black Book Éditions**.
