// Données pour l'exercice interactif avec coordonnées relatives
window.exerciceData = {};


// Initialisation de la structure attendue par le script
window.exerciceData = {
    diagrammezone: window.diagrammezone || [],
    diagrammeElements: window.diagrammeElements || [],
    tableauzone: window.tableauzone || [],
    tableauElements: window.tableauElements || [],
    tableauImageReelle: window.tableauImageReelle || [],
};

window.tableauImageReelle = [614];



// Zones de dépôt pour l'exercice du diagramme
window.diagrammezone = [
  // Grandes zones
  { id: "zone-1", relativeTop: 0.0503, relativeLeft: 0.185, relativeWidth: 0.1878, relativeHeight: 0.1482, taille: "grande" },
  { id: "zone-2", relativeTop: 0.3819, relativeLeft: 0.4109, relativeWidth: 0.1878, relativeHeight: 0.1482, taille: "grande" },
  { id: "zone-3", relativeTop: 0.5628, relativeLeft: 0.0463, relativeWidth: 0.1878, relativeHeight: 0.1482, taille: "grande" },
  { id: "zone-4", relativeTop: 0.7487, relativeLeft: 0.6776, relativeWidth: 0.1878, relativeHeight: 0.1482, taille: "grande" },

  // Petites zones
  { id: "zone-5", relativeTop: 0.1181, relativeLeft: 0.4544, relativeWidth: 0.0803, relativeHeight: 0.0804, taille: "petite" },
  { id: "zone-6", relativeTop: 0.2613, relativeLeft: 0.6041, relativeWidth: 0.0803, relativeHeight: 0.0804, taille: "petite" },
  { id: "zone-7", relativeTop: 0.4899, relativeLeft: 0.6395, relativeWidth: 0.0803, relativeHeight: 0.0804, taille: "petite" },
  { id: "zone-8", relativeTop: 0.5,    relativeLeft: 0.2748, relativeWidth: 0.0803, relativeHeight: 0.0804, taille: "petite" },
  { id: "zone-9", relativeTop: 0.6181, relativeLeft: 0.3714, relativeWidth: 0.0803, relativeHeight: 0.0804, taille: "petite" }
];

  
  
  

// Éléments déplaçables pour l'exercice du diagramme
window.diagrammeElements = [
    { id: "element-1", nom: "Utilisateur", taille: "grande" },
    { id: "element-2", nom: "Tondeuse", taille: "grande" },
    { id: "element-3", nom: "Prix", taille: "grande" },
    { id: "element-4", nom: "Énergie électrique", taille: "grande"},
    { id: "element-5", nom: "FC4", taille: "petite" },
    { id: "element-6", nom: "FP1", taille: "petite" },
    { id: "element-7", nom: "FC1", taille: "petite" },
    { id: "element-8", nom: "FC6", taille: "petite" },
    { id: "element-9", nom: "FC5", taille: "petite" }

];

// Zones de dépôt pour le tableau (étape 1 - fonctions)
window.tableauzone = [
  // 🔴 Fonctions (colonne 1)
  { id: "fonction-1", relativeTop: 0.062, relativeLeft: 0.09, relativeWidth: 0.3254, relativeHeight: 0.0886, colonne: 1 },
  { id: "fonction-2", relativeTop: 0.1557, relativeLeft: 0.09, relativeWidth: 0.3254, relativeHeight: 0.0886, colonne: 1 },
  { id: "fonction-3", relativeTop: 0.2494, relativeLeft: 0.09, relativeWidth: 0.3254, relativeHeight: 0.1823, colonne: 1 },
  { id: "fonction-4", relativeTop: 0.4367, relativeLeft: 0.09, relativeWidth: 0.3254, relativeHeight: 0.1823, colonne: 1 },
  { id: "fonction-5", relativeTop: 0.6241, relativeLeft: 0.09, relativeWidth: 0.3254, relativeHeight: 0.1823, colonne: 1 },
  { id: "fonction-6", relativeTop: 0.8114, relativeLeft: 0.09, relativeWidth: 0.3254, relativeHeight: 0.0886, colonne: 1 },
  { id: "fonction-7", relativeTop: 0.9051, relativeLeft: 0.09, relativeWidth: 0.3254, relativeHeight: 0.0886, colonne: 1 },

  // 🟩 Critères (colonne 2)
  { id: "critere-1", relativeTop: 0.062, relativeLeft: 0.4202, relativeWidth: 0.3002, relativeHeight: 0.0886, colonne: 2 },
  { id: "critere-2", relativeTop: 0.1557, relativeLeft: 0.4202, relativeWidth: 0.3002, relativeHeight: 0.0886, colonne: 2 },
  { id: "critere-3", relativeTop: 0.343, relativeLeft: 0.4202, relativeWidth: 0.3002, relativeHeight: 0.0886, colonne: 2 },
  { id: "critere-4", relativeTop: 0.5304, relativeLeft: 0.4202, relativeWidth: 0.3002, relativeHeight: 0.0886, colonne: 2 },
  { id: "critere-5", relativeTop: 0.6241, relativeLeft: 0.4202, relativeWidth: 0.3002, relativeHeight: 0.0886, colonne: 2 },
  { id: "critere-6", relativeTop: 0.7177, relativeLeft: 0.4202, relativeWidth: 0.3002, relativeHeight: 0.0886, colonne: 2 },
  { id: "critere-7", relativeTop: 0.8114, relativeLeft: 0.4202, relativeWidth: 0.3002, relativeHeight: 0.0886, colonne: 2 },
  { id: "critere-8", relativeTop: 0.9051, relativeLeft: 0.4202, relativeWidth: 0.3002, relativeHeight: 0.0886, colonne: 2 },

  // 🔵 Niveaux (colonne 3)
  { id: "level-1", relativeTop: 0.062, relativeLeft: 0.7267, relativeWidth: 0.267, relativeHeight: 0.0886, colonne: 3 },
  { id: "level-2", relativeTop: 0.1557, relativeLeft: 0.7267, relativeWidth: 0.267, relativeHeight: 0.0886, colonne: 3 },
  { id: "level-3", relativeTop: 0.2494, relativeLeft: 0.7267, relativeWidth: 0.267, relativeHeight: 0.0886, colonne: 3 },
  { id: "level-4", relativeTop: 0.343, relativeLeft: 0.7267, relativeWidth: 0.267, relativeHeight: 0.0886, colonne: 3 },
  { id: "level-5", relativeTop: 0.4367, relativeLeft: 0.7267, relativeWidth: 0.267, relativeHeight: 0.0886, colonne: 3 },
  { id: "level-6", relativeTop: 0.5304, relativeLeft: 0.7267, relativeWidth: 0.267, relativeHeight: 0.0886, colonne: 3 },
  { id: "level-7", relativeTop: 0.6241, relativeLeft: 0.7267, relativeWidth: 0.267, relativeHeight: 0.0886, colonne: 3 },
  { id: "level-8", relativeTop: 0.8114, relativeLeft: 0.7267, relativeWidth: 0.267, relativeHeight: 0.0886, colonne: 3 },
  { id: "level-9", relativeTop: 0.9051, relativeLeft: 0.7267, relativeWidth: 0.267, relativeHeight: 0.0886, colonne: 3 }
];

  

// Éléments déplaçables pour le tableau 
window.tableauElements = [
    { id: "element-f1", nom: "Permettre à l’utilisateur de réduire la hauteur du gazon", colonne: 1 },
    { id: "element-f2", nom: "Stocker les déchets d’herbe", colonne: 1 },
    { id: "element-f3", nom: "Être alimentée en énergie électrique", colonne: 1 },
    { id: "element-f4", nom: "Être facile d’utilisation", colonne: 1 },
    { id: "element-f5", nom: "Plaire aux utilisateurs", colonne: 1 },
    { id: "element-f6", nom: "Résister aux intempéries", colonne: 1 },
    { id: "element-f7", nom: "Avoir un prix raisonnable", colonne: 1 },

    { id: "element-c1", nom: "Hauteur d’herbe obtenue", colonne: 2 },
    { id: "element-c2", nom: "Volume de stockage", colonne: 2 },
    { id: "element-c3", nom: "Temps de recharge", colonne: 2 },
    { id: "element-c4", nom: "Poids", colonne: 2 },
    { id: "element-c5", nom: "Couleurs", colonne: 2 },
    { id: "element-c6", nom: "Formes", colonne: 2 },
    { id: "element-c7", nom: "Type d’intempéries", colonne: 2 },
    { id: "element-c8", nom: "Prix", colonne: 2 },


    { id: "element-l1", nom: "entre 4 et 10 cm", colonne: 3  },
    { id: "element-l2", nom: "3 dm³ minimum", colonne: 3  },
    { id: "element-l3", nom: "2h minimum", colonne: 3  },
    { id: "element-l4", nom: "4h maximum", colonne: 3  },
    { id: "element-l5", nom: "Environ 1 mètre", colonne: 3  },
    { id: "element-l6", nom: "12 kg maximum", colonne: 3  },
    { id: "element-l7", nom: "Vert et jaune", colonne: 3  },
    { id: "element-l8", nom: "la pluie, la neige ou la grêle", colonne: 3  },
    { id: "element-l9", nom: "1000 € maximum", colonne: 3  }

];


// Fusion des données dans la structure attendue
window.exerciceData.diagrammezone = window.diagrammezone;
window.exerciceData.diagrammeElements = window.diagrammeElements;
window.exerciceData.tableauzone = window.tableauzone;
window.exerciceData.tableauElements = window.tableauElements;


