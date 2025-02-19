// Données pour l'exercice interactif avec coordonnées relatives
window.exerciceData = {};


// Initialisation de la structure attendue par le script
window.exerciceData = {
    diagrammezone: window.diagrammezone || [],
    diagrammeElements: window.diagrammeElements || [],
    tableauzones1: window.tableauzones1 || [],
    tableauzones2: window.tableauzones2 || [],
    tableauElementsEtape1: window.tableauElementsEtape1 || [],
    tableauElementsEtape2: window.tableauElementsEtape2 || []
};

// Vérification de la présence des données
console.log("📊 Vérification des données de `diagrammezone` :", window.exerciceData.diagrammezone);



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
window.tableauzones1 = [
    { id: "fonction-1", relativeTop: 0.0493, relativeLeft: 0.0765, relativeWidth: 0.2899, relativeHeight: 0.1233, etape1: true },
    { id: "fonction-2", relativeTop: 0.1763, relativeLeft: 0.0765, relativeWidth: 0.2899, relativeHeight: 0.1862, etape1: true },
    { id: "fonction-3", relativeTop: 0.3662, relativeLeft: 0.0765, relativeWidth: 0.2899, relativeHeight: 0.1874, etape1: true },
    { id: "fonction-4", relativeTop: 0.5561, relativeLeft: 0.0765, relativeWidth: 0.2899, relativeHeight: 0.3144, etape1: true },
    { id: "fonction-5", relativeTop: 0.8730, relativeLeft: 0.0765, relativeWidth: 0.2899, relativeHeight: 0.1233, etape1: true }
];

// Zones de dépôt pour le tableau (étape 2 - critères et niveaux)
window.tableauzones2 = [
    { id: "critere-1", relativeTop: 0.1134, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0592, etape2: true },
    { id: "critere-2", relativeTop: 0.2392, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0604, etape2: true },
    { id: "critere-3", relativeTop: 0.3033, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0592, etape2: true },
    { id: "critere-4", relativeTop: 0.3662, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0604, etape2: true },
    { id: "critere-5", relativeTop: 0.4932, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0604, etape2: true },
    { id: "critere-6", relativeTop: 0.6202, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0592, etape2: true },
    { id: "critere-7", relativeTop: 0.6831, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0604, etape2: true },
    { id: "critere-8", relativeTop: 0.7472, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0592, etape2: true },
    { id: "critere-9", relativeTop: 0.9371, relativeLeft: 0.3713, relativeWidth: 0.2801, relativeHeight: 0.0592, etape2: true },

    { id: "level-1", relativeTop: 0.0493, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0604, etape2: true },
    { id: "level-2", relativeTop: 0.1134, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0592, etape2: true },
    { id: "level-3", relativeTop: 0.1763, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0592, etape2: true },
    { id: "level-4", relativeTop: 0.3033, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0592, etape2: true },
    { id: "level-5", relativeTop: 0.4303, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0592, etape2: true },
    { id: "level-6", relativeTop: 0.4932, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0604, etape2: true },
    { id: "level-7", relativeTop: 0.5561, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0604, etape2: true },
    { id: "level-8", relativeTop: 0.6831, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0604, etape2: true },
    { id: "level-9", relativeTop: 0.8101, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0604, etape2: true },
    { id: "level-10", relativeTop: 0.8730, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0604, etape2: true },
    { id: "level-11", relativeTop: 0.9371, relativeLeft: 0.6564, relativeWidth: 0.3388, relativeHeight: 0.0592, etape2: true }
];

// Éléments déplaçables pour le tableau - Étape 1
window.tableauElementsEtape1 = [
    { id: "draggable-f1", nom: "Permettre aux élèves de présenter leur sujet au public" },
    { id: "draggable-f2", nom: "Respecter le temps imparti" },
    { id: "draggable-f3", nom: "Être compatible avec le matériel du collège" },
    { id: "draggable-f4", nom: "Être agréable à regarder pour le public" },
    { id: "draggable-f5", nom: "Faciliter la présentation orale des élèves" }
];

// Éléments déplaçables pour le tableau - Étape 2
window.tableauElementsEtape2 = [
    { id: "draggable-c1", nom: "Contenu des diapositives suivantes" },
    { id: "draggable-c2", nom: "Répartition du temps de parole" },
    { id: "draggable-c3", nom: "Nombre de diapositives" },
    { id: "draggable-c4", nom: "Format du fichier" },
    { id: "draggable-c5", nom: "Support de stockage" },
    { id: "draggable-c6", nom: "Police d’écriture" },
    { id: "draggable-c7", nom: "Taille d’écriture" },
    { id: "draggable-c8", nom: "Cohérence visuelle" },
    { id: "draggable-c9", nom: "Présence d’animation ou transition" },

    { id: "draggable-l1", nom: "titre, noms, prénoms, classe et 1 image" },
    { id: "draggable-l2", nom: "titres, mots-clés, images avec légendes" },
    { id: "draggable-l3", nom: "5 minutes" },
    { id: "draggable-l4", nom: "8 maximum" },
    { id: "draggable-l5", nom: "16:9" },
    { id: "draggable-l6", nom: "Clé USB ou réseau du collège" },
    { id: "draggable-l7", nom: "Fond sobre, texte contrasté, couleurs adaptées" },
    { id: "draggable-l8", nom: "24 pts minimum" },
    { id: "draggable-l9", nom: "4 maximum" },
    { id: "draggable-l10", nom: "Mots-clés et images" },
    { id: "draggable-l11", nom: "Non autorisée" }
];


// Fusion des données dans la structure attendue
window.exerciceData.diagrammezone = window.diagrammezone;
window.exerciceData.diagrammeElements = window.diagrammeElements;
window.exerciceData.tableauzones1 = window.tableauzones1;
window.exerciceData.tableauzones2 = window.tableauzones2;
window.exerciceData.tableauElementsEtape1 = window.tableauElementsEtape1;
window.exerciceData.tableauElementsEtape2 = window.tableauElementsEtape2;

console.log("✅ Données chargées dans `window.exerciceData` avec succès !");
