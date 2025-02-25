// Données pour l'exercice interactif avec coordonnées relatives
window.exerciceData = {};


// Initialisation de la structure attendue par le script
window.exerciceData = {
    diagrammezone: window.diagrammezone || [],
    diagrammeElements: window.diagrammeElements || [],
    tableauzone: window.tableauzone || [],
    tableauElements: window.tableauElements || [],
};





// Zones de dépôt pour l'exercice du diagramme
window.diagrammezone = [
    { id: "zone-1", relativeTop: 0.0467, relativeLeft: 0.6662, relativeWidth: 0.1946, relativeHeight: 0.2033, taille: "grande" },
    { id: "zone-2", relativeTop: 0.2683, relativeLeft: 0.3736, relativeWidth: 0.1179, relativeHeight: 0.0813, taille: "petite" },
    { id: "zone-3", relativeTop: 0.3720, relativeLeft: 0.7060, relativeWidth: 0.1193, relativeHeight: 0.0813, taille: "petite" },
    { id: "zone-4", relativeTop: 0.3821, relativeLeft: 0.1861, relativeWidth: 0.1179, relativeHeight: 0.0793, taille: "petite" },
    { id: "zone-5", relativeTop: 0.4634, relativeLeft: 0.4062, relativeWidth: 0.1946, relativeHeight: 0.2033, taille: "grande" },
    { id: "zone-6", relativeTop: 0.5996, relativeLeft: 0.2131, relativeWidth: 0.1179, relativeHeight: 0.0793, taille: "petite" },
    { id: "zone-7", relativeTop: 0.7480, relativeLeft: 0.0625, relativeWidth: 0.1946, relativeHeight: 0.2033, taille: "grande" },
    { id: "zone-8", relativeTop: 0.7480, relativeLeft: 0.7415, relativeWidth: 0.1932, relativeHeight: 0.2033, taille: "grande" }
];

// Éléments déplaçables pour l'exercice du diagramme
window.diagrammeElements = [
    { id: "element-1", nom: "Public (élèves et professeur)", taille: "grande" },
    { id: "element-2", nom: "FP1", taille: "petite" },
    { id: "element-3", nom: "FC3", taille: "petite" },
    { id: "element-4", nom: "FC4", taille: "petite"},
    { id: "element-5", nom: "Diaporama", taille: "grande" },
    { id: "element-6", nom: "FC2", taille: "petite" },
    { id: "element-7", nom: "Matériel du collège", taille: "grande" },
    { id: "element-8", nom: "Temps", taille: "grande" }
];

// Zones de dépôt pour le tableau (étape 1 - fonctions)
window.tableauzone = [
    { id: "fonction-1", relativeTop: 0.0493, relativeLeft: 0.0765, relativeWidth: 0.2899, relativeHeight: 0.1233, colonne: 1 },
    { id: "fonction-2", relativeTop: 0.1763, relativeLeft: 0.0765, relativeWidth: 0.2899, relativeHeight: 0.1862, colonne: 1 },
    { id: "fonction-3", relativeTop: 0.3662, relativeLeft: 0.0765, relativeWidth: 0.2899, relativeHeight: 0.1874, colonne: 1 },
    { id: "fonction-4", relativeTop: 0.5561, relativeLeft: 0.0765, relativeWidth: 0.2899, relativeHeight: 0.3144, colonne: 1 },
    { id: "fonction-5", relativeTop: 0.8730, relativeLeft: 0.0765, relativeWidth: 0.2899, relativeHeight: 0.1233, colonne: 1 },
  
    { id: "critere-1", relativeTop: 0.1134, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0592, colonne: 2 },
    { id: "critere-2", relativeTop: 0.2392, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0604, colonne: 2 },
    { id: "critere-3", relativeTop: 0.3033, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0592, colonne: 2 },
    { id: "critere-4", relativeTop: 0.3662, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0604, colonne: 2 },
    { id: "critere-5", relativeTop: 0.4932, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0604, colonne: 2 },
    { id: "critere-6", relativeTop: 0.6202, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0592, colonne: 2 },
    { id: "critere-7", relativeTop: 0.6831, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0604, colonne: 2 },
    { id: "critere-8", relativeTop: 0.7472, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0592, colonne: 2 },
    { id: "critere-9", relativeTop: 0.9371, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0592, colonne: 2 },
   
    { id: "level-1", relativeTop: 0.0493, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0604, colonne: 3 },
    { id: "level-2", relativeTop: 0.1134, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0592, colonne: 3 },
    { id: "level-3", relativeTop: 0.1763, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0592, colonne: 3 },
    { id: "level-4", relativeTop: 0.3033, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0592, colonne: 3 },
    { id: "level-5", relativeTop: 0.4303, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0592, colonne: 3 },
    { id: "level-6", relativeTop: 0.4932, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0604, colonne: 3 },
    { id: "level-7", relativeTop: 0.5561, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0604, colonne: 3 },
    { id: "level-8", relativeTop: 0.6831, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0604, colonne: 3 },
    { id: "level-9", relativeTop: 0.8101, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0604, colonne: 3 },
    { id: "level-10", relativeTop: 0.8730, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0604, colonne: 3 },
    { id: "level-11", relativeTop: 0.9371, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0592, colonne: 3 }
];

// Éléments déplaçables pour le tableau 
window.tableauElements = [
    { id: "element-f1", nom: "Permettre aux élèves de présenter leur sujet au public", colonne: 1 },
    { id: "element-f2", nom: "Respecter le temps imparti", colonne: 1 },
    { id: "element-f3", nom: "Être compatible avec le matériel du collège", colonne: 1 },
    { id: "element-f4", nom: "Être agréable à regarder pour le public", colonne: 1 },
    { id: "element-f5", nom: "Faciliter la présentation orale des élèves", colonne: 1 },

    { id: "element-c1", nom: "Contenu des diapositives suivantes", colonne: 2 },
    { id: "element-c2", nom: "Répartition du temps de parole", colonne: 2 },
    { id: "element-c3", nom: "Nombre de diapositives", colonne: 2 },
    { id: "element-c4", nom: "Format du fichier", colonne: 2 },
    { id: "element-c5", nom: "Support de stockage", colonne: 2 },
    { id: "element-c6", nom: "Police d’écriture", colonne: 2 },
    { id: "element-c7", nom: "Taille d’écriture", colonne: 2 },
    { id: "element-c8", nom: "Cohérence visuelle", colonne: 2 },
    { id: "element-c9", nom: "Présence d’animation ou transition", colonne: 2  },

    { id: "element-l1", nom: "titre, noms, prénoms, classe et 1 image", colonne: 3  },
    { id: "element-l2", nom: "titres, mots-clés, images avec légendes", colonne: 3  },
    { id: "element-l3", nom: "5 minutes", colonne: 3  },
    { id: "element-l4", nom: "8 maximum", colonne: 3  },
    { id: "element-l5", nom: "16:9", colonne: 3  },
    { id: "element-l6", nom: "Clé USB ou réseau du collège", colonne: 3  },
    { id: "element-l7", nom: "Fond sobre, texte contrasté, couleurs adaptées", colonne: 3  },
    { id: "element-l8", nom: "24 pts minimum", colonne: 3  },
    { id: "element-l9", nom: "4 maximum", colonne: 3  },
    { id: "element-l10", nom: "Mots-clés et images", colonne: 3  },
    { id: "element-l11", nom: "Non autorisée", colonne: 3  }
];


// Fusion des données dans la structure attendue
window.exerciceData.diagrammezone = window.diagrammezone;
window.exerciceData.diagrammeElements = window.diagrammeElements;
window.exerciceData.tableauzone = window.tableauzone;
window.exerciceData.tableauElements = window.tableauElements;


// Vérification de la présence des données
console.log("📊 Vérification des données de `diagrammezone` :", window.exerciceData.diagrammezone);
console.log("📊 Vérification des données de `tableauzone` :", window.exerciceData.tableauzone);
console.log("✅ Données chargées dans `window.exerciceData` avec succès !");
