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
    { id: "zone-1", relativeTop: 0.4318, relativeLeft: 0.4257, relativeWidth: 0.14, relativeHeight: 0.1514, taille: "grande" },
    { id: "zone-2", relativeTop: 0.0471, relativeLeft: 0.2221, relativeWidth: 0.14, relativeHeight: 0.1514, taille: "grande" },
    { id: "zone-3", relativeTop: 0.8065, relativeLeft: 0.6280, relativeWidth: 0.14, relativeHeight: 0.1514, taille: "grande" },
    { id: "zone-4", relativeTop: 0.8065, relativeLeft: 0.2277, relativeWidth: 0.14, relativeHeight: 0.1514, taille: "grande" },
    { id: "zone-5", relativeTop: 0.2134, relativeLeft: 0.4088, relativeWidth: 0.0919, relativeHeight: 0.1042, taille: "petite" },
    { id: "zone-6", relativeTop: 0.2978, relativeLeft: 0.2334, relativeWidth: 0.0919, relativeHeight: 0.1042, taille: "petite" },
    { id: "zone-7", relativeTop: 0.5310, relativeLeft: 0.6450, relativeWidth: 0.0919, relativeHeight: 0.1042, taille: "petite" },
    { id: "zone-8", relativeTop: 0.5310, relativeLeft: 0.2546, relativeWidth: 0.0919, relativeHeight: 0.1042, taille: "petite" }
  ];
  
  
  

// Éléments déplaçables pour l'exercice du diagramme
window.diagrammeElements = [
    { id: "element-1", nom: "Enceinte", taille: "grande" },
    { id: "element-2", nom: "Utilisateur", taille: "grande" },
    { id: "element-3", nom: "Sac", taille: "grande" },
    { id: "element-4", nom: "Energie", taille: "grande"},
    { id: "element-5", nom: "FP1", taille: "petite" },
    { id: "element-6", nom: "FC5", taille: "petite" },
    { id: "element-7", nom: "FC4", taille: "petite" },
    { id: "element-8", nom: "FC6", taille: "petite" }
];

// Zones de dépôt pour le tableau (étape 1 - fonctions)
window.tableauzone = [
    // 🔴 Fonctions
    { id: "fonction-1", relativeTop: 0.0629, relativeLeft: 0.0789, relativeWidth: 0.2865, relativeHeight: 0.1505, colonne: 1 },
    { id: "fonction-2", relativeTop: 0.2202, relativeLeft: 0.0789, relativeWidth: 0.2865, relativeHeight: 0.1505, colonne: 1 },
    { id: "fonction-3", relativeTop: 0.3762, relativeLeft: 0.0789, relativeWidth: 0.2865, relativeHeight: 0.0711, colonne: 1 },
    { id: "fonction-4", relativeTop: 0.4542, relativeLeft: 0.0789, relativeWidth: 0.2865, relativeHeight: 0.1505, colonne: 1 },
    { id: "fonction-5", relativeTop: 0.6101, relativeLeft: 0.0789, relativeWidth: 0.2865, relativeHeight: 0.1505, colonne: 1 },
    { id: "fonction-6", relativeTop: 0.7661, relativeLeft: 0.0789, relativeWidth: 0.2865, relativeHeight: 0.1505, colonne: 1 },
    { id: "fonction-7", relativeTop: 0.9220, relativeLeft: 0.0789, relativeWidth: 0.2865, relativeHeight: 0.0711, colonne: 1 },
  
    // 🟩 Critères
    { id: "critere-1", relativeTop: 0.0629, relativeLeft: 0.3728, relativeWidth: 0.2792, relativeHeight: 0.0725, colonne: 2 },
    { id: "critere-2", relativeTop: 0.1423, relativeLeft: 0.3728, relativeWidth: 0.2792, relativeHeight: 0.0725, colonne: 2 },
    { id: "critere-3", relativeTop: 0.2982, relativeLeft: 0.3728, relativeWidth: 0.2792, relativeHeight: 0.0725, colonne: 2 },
    { id: "critere-4", relativeTop: 0.3762, relativeLeft: 0.3728, relativeWidth: 0.2792, relativeHeight: 0.0725, colonne: 2 },
    { id: "critere-5", relativeTop: 0.5321, relativeLeft: 0.3728, relativeWidth: 0.2792, relativeHeight: 0.0725, colonne: 2 },
    { id: "critere-6", relativeTop: 0.6101, relativeLeft: 0.3728, relativeWidth: 0.2792, relativeHeight: 0.0725, colonne: 2 },
    { id: "critere-7", relativeTop: 0.6881, relativeLeft: 0.3728, relativeWidth: 0.2792, relativeHeight: 0.0725, colonne: 2 },
    { id: "critere-8", relativeTop: 0.7674, relativeLeft: 0.3728, relativeWidth: 0.2792, relativeHeight: 0.0725, colonne: 2 },
    { id: "critere-9", relativeTop: 0.8440, relativeLeft: 0.3728, relativeWidth: 0.2792, relativeHeight: 0.0725, colonne: 2 },
    { id: "critere-10", relativeTop: 0.9220, relativeLeft: 0.3728, relativeWidth: 0.2792, relativeHeight: 0.0725, colonne: 2 },
  
    // 🔵 Niveaux
    { id: "level-1", relativeTop: 0.1423, relativeLeft: 0.6594, relativeWidth: 0.3363, relativeHeight: 0.0725, colonne: 3 },
    { id: "level-2", relativeTop: 0.2202, relativeLeft: 0.6594, relativeWidth: 0.3363, relativeHeight: 0.0725, colonne: 3 },
    { id: "level-3", relativeTop: 0.2982, relativeLeft: 0.6594, relativeWidth: 0.3363, relativeHeight: 0.0725, colonne: 3 },
    { id: "level-4", relativeTop: 0.3762, relativeLeft: 0.6594, relativeWidth: 0.3363, relativeHeight: 0.0725, colonne: 3 },
    { id: "level-5", relativeTop: 0.4542, relativeLeft: 0.6594, relativeWidth: 0.3363, relativeHeight: 0.0725, colonne: 3 },
    { id: "level-6", relativeTop: 0.5321, relativeLeft: 0.6594, relativeWidth: 0.3363, relativeHeight: 0.0725, colonne: 3 },
    { id: "level-7", relativeTop: 0.6881, relativeLeft: 0.6594, relativeWidth: 0.3363, relativeHeight: 0.0725, colonne: 3 },
    { id: "level-8", relativeTop: 0.8440, relativeLeft: 0.6594, relativeWidth: 0.3363, relativeHeight: 0.0725, colonne: 3 },
    { id: "level-9", relativeTop: 0.9220, relativeLeft: 0.6594, relativeWidth: 0.3363, relativeHeight: 0.0725, colonne: 3 }
  ];
  
  

// Éléments déplaçables pour le tableau 
window.tableauElements = [
    { id: "element-f1", nom: "Permettre à l’utilisateur de diffuser de la musique", colonne: 1 },
    { id: "element-f2", nom: "Être facilement transportable dans un sac", colonne: 1 },
    { id: "element-f3", nom: "Être facilement rechargeable", colonne: 1 },
    { id: "element-f4", nom: "Avoir une autonomie suffisante", colonne: 1 },
    { id: "element-f5", nom: "Résister aux conditions extérieures", colonne: 1 },
    { id: "element-f6", nom: "Être simple d’utilisation", colonne: 1 },
    { id: "element-f7", nom: "Respecter un coût de fabrication raisonnable", colonne: 1 },

    { id: "element-c1", nom: "Type de connectivité", colonne: 2 },
    { id: "element-c2", nom: "Portée de la connexion", colonne: 2 },
    { id: "element-c3", nom: "Longueur de l’enceinte", colonne: 2 },
    { id: "element-c4", nom: "Type de recharge", colonne: 2 },
    { id: "element-c5", nom: "Temps de recharge", colonne: 2 },
    { id: "element-c6", nom: "Résistance aux chocs", colonne: 2 },
    { id: "element-c7", nom: "Étanchéité", colonne: 2 },
    { id: "element-c8", nom: "Nombre de boutons et fonctions", colonne: 2 },
    { id: "element-c9", nom: "Type de signalisation", colonne: 2  },
    { id: "element-c10", nom: "Coût de production", colonne: 2  },

    { id: "element-l1", nom: "≥ 10 mètres", colonne: 3  },
    { id: "element-l2", nom: "< 1 kg", colonne: 3  },
    { id: "element-l3", nom: "20 cm max", colonne: 3  },
    { id: "element-l4", nom: "USB-C", colonne: 3  },
    { id: "element-l5", nom: "≥ 8 heures", colonne: 3  },
    { id: "element-l6", nom: "≤ 3 heures", colonne: 3  },
    { id: "element-l7", nom: "Norme IPX4 minimum", colonne: 3  },
    { id: "element-l8", nom: "Voyants DEL", colonne: 3  },
    { id: "element-l9", nom: "< 30 €", colonne: 3  }
];


// Fusion des données dans la structure attendue
window.exerciceData.diagrammezone = window.diagrammezone;
window.exerciceData.diagrammeElements = window.diagrammeElements;
window.exerciceData.tableauzone = window.tableauzone;
window.exerciceData.tableauElements = window.tableauElements;


