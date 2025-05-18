// Données pour l'exercice interactif avec coordonnées relatives
window.exerciceData = {};


// Initialisation de la structure attendue par le script
window.exerciceData = {
    tableauzone: window.tableauzone || [],
    tableauElements: window.tableauElements || [],
    tableauImageReelle: window.tableauImageReelle || [],
};

window.tableauImageReelle = [537];


// Zones de dépôt pour le tableau (étape 1 - fonctions)

  window.tableauzone = [
    {
      "colonne": 2, 
      "id": "critere-1", 
      "relativeHeight": 0.0728,
      "relativeLeft": 0.2961,
      "relativeTop": 0.1521,
      "relativeWidth": 0.3706
    },
    {
      "colonne": 2,
      "id": "critere-2",
      "relativeHeight": 0.0715,
      "relativeLeft": 0.2961,
      "relativeTop": 0.3069,
      "relativeWidth": 0.3706
    },
    {
      "colonne": 2,
      "id": "critere-3",
      "relativeHeight": 0.0728,
      "relativeLeft": 0.2961,
      "relativeTop": 0.3836,
      "relativeWidth": 0.3706
    },
    {
      "colonne": 2,
      "id": "critere-4",
      "relativeHeight": 0.0728,
      "relativeLeft": 0.2961,
      "relativeTop": 0.5371,
      "relativeWidth": 0.3706
    },
    {
      "colonne": 2,
      "id": "critere-5",
      "relativeHeight": 0.0728,
      "relativeLeft": 0.2961,
      "relativeTop": 0.6918,
      "relativeWidth": 0.3706
    },
    {
      "colonne": 2,
      "id": "critere-6",
      "relativeHeight": 0.0728,
      "relativeLeft": 0.2961,
      "relativeTop": 0.8453,
      "relativeWidth": 0.3706
    },
    {
      "colonne": 3,
      "id": "level-1",
      "relativeHeight": 0.0728,
      "relativeLeft": 0.6723,
      "relativeTop": 0.0754,
      "relativeWidth": 0.3222

    },
    {
      "colonne": 3,
      "id": "level-2",
      "relativeHeight": 0.0728,
      "relativeLeft": 0.6723,
      "relativeTop": 0.2289,
      "relativeWidth": 0.3222

    },
    {
      "colonne": 3,
      "id": "level-3",
      "relativeHeight": 0.0728,
      "relativeLeft": 0.6723,
      "relativeTop": 0.4603,
      "relativeWidth": 0.3222

    },
    {
      "colonne": 3,
      "id": "level-4",
      "relativeHeight": 0.0715,
      "relativeLeft": 0.6723,
      "relativeTop": 0.6151,
      "relativeWidth": 0.3222

    },
    {
      "colonne": 3,
      "id": "level-5",
      "relativeHeight": 0.0728,
      "relativeLeft": 0.6723,
      "relativeTop": 0.7685,
      "relativeWidth": 0.3222

    },
    {
      "colonne": 3,
      "id": "level-6",
      "relativeHeight": 0.0728,
      "relativeLeft": 0.6723,
      "relativeTop": 0.9233,
      "relativeWidth": 0.3222

    }
  ];

 

// Éléments déplaçables pour le tableau 
window.tableauElements = [
    { id: "element-c1", nom: "Surface pièce de vie", colonne: 2 },
    { id: "element-c2", nom: "Surface salle d’eau", colonne: 2 },
    { id: "element-c3", nom: "Surface vitrée totale du logement", colonne: 2 },
    { id: "element-c4", nom: "Largeur de circulation", colonne: 2 },
    { id: "element-c5", nom: "Hauteur de l’allège (hauteur sous fenêtre)", colonne: 2 },
    { id: "element-c6", nom: "Résistance du vitrage", colonne: 2 },

    { id: "element-l1", nom: "≥ 45 m²", colonne: 3  },
    { id: "element-l2", nom: "≥ 9 m²", colonne: 3  },
    { id: "element-l3", nom: "7 cm minimum", colonne: 3  },
    { id: "element-l4", nom: "2 m 04", colonne: 3  },
    { id: "element-l5", nom: "20 cm minimum", colonne: 3  },
    { id: "element-l6", nom: "350 Joules (classe RC2)", colonne: 3  },

];


// Fusion des données dans la structure attendue
window.exerciceData.tableauzone = window.tableauzone;
window.exerciceData.tableauElements = window.tableauElements;


