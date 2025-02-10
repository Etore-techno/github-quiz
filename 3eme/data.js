// Définition des zones de dépôt pour l'exercice du diagramme
window.diagrammezone = [
    { id: "zone-1", top: 23, left: 469, width: 137, height: 100 }, // Zone en haut à droite
    { id: "zone-2", top: 132, left: 263, width: 83, height: 40 },  // Petite zone centrale gauche
    { id: "zone-3", top: 183, left: 497, width: 84, height: 40 },  // Petite zone centrale droite
    { id: "zone-4", top: 188, left: 131, width: 83, height: 39 },  // Petite zone à gauche
    { id: "zone-5", top: 228, left: 286, width: 137, height: 100 }, // Zone centrale
    { id: "zone-6", top: 295, left: 150, width: 83, height: 39 },  // Petite zone en bas à gauche
    { id: "zone-7", top: 368, left: 44, width: 137, height: 100 },  // Zone en bas à gauche
    { id: "zone-8", top: 368, left: 522, width: 136, height: 100 }  // Zone en bas à droite
];


// Liste des éléments déplaçables pour l'exercice du diagramme avec des identifiants uniques
window.diagrammeElements = [
    { id: "element-1", nom: "Public (élèves et professeur)" },
    { id: "element-2", nom: "FP1" },
    { id: "element-3", nom: "FC3" },
    { id: "element-4", nom: "FC4" },
    { id: "element-5", nom: "Diaporama" },
    { id: "element-6", nom: "FC2" },
    { id: "element-7", nom: "Matériel du collège" },
    { id: "element-8", nom: "Temps" }

];


// Correspondances attendues pour l'étape 1 (zones bleues)
window.placementsCorrects = [
    { nom: "Public (élèves et professeur)", zone: "zone-1" },
    { nom: "FP1", zone: "zone-2" },
    { nom: "FC3", zone: "zone-3" },
    { nom: "FC4", zone: "zone-4" },
    { nom: "Diaporama", zone: "zone-5" },
    { nom: "FC2", zone: "zone-6" },
    { nom: "Matériel du collège", zone: "zone-7" },
    { nom: "Temps", zone: "zone-8" }
];





// TABLEAU :

window.tableauzones1 = [
    // Fonctions (zones rouges)
    { id: 'fonction-1', top: 40, left: 47, width: 178, height: 100, etape1: true},
    { id: 'fonction-2', top: 143, left: 47, width: 178, height: 151, etape1: true },
    { id: 'fonction-3', top: 297, left: 47, width: 178, height: 152, etape1: true },
    { id: 'fonction-4', top: 451, left: 47, width: 178, height: 255, etape1: true },
    { id: 'fonction-5', top: 708, left: 47, width: 178, height: 100, etape1: true },
]

window.tableauzones2 = [

    // Critères (zones vertes - colonne du milieu)
    { id: 'critere-1', top: 92, left: 228, width: 172, height: 48, etape2: true },
    { id: 'critere-2', top: 194, left: 228, width: 172, height: 49, etape2: true },
    { id: 'critere-3', top: 246, left: 228, width: 172, height: 48, etape2: true },
    { id: 'critere-4', top: 297, left: 228, width: 172, height: 49, etape2: true },
    { id: 'critere-5', top: 400, left: 228, width: 172, height: 49, etape2: true },
    { id: 'critere-6', top: 503, left: 228, width: 172, height: 48, etape2: true },
    { id: 'critere-7', top: 554, left: 228, width: 172, height: 49, etape2: true },
    { id: 'critere-8', top: 606, left: 228, width: 172, height: 48, etape2: true },
    { id: 'critere-9', top: 760, left: 228, width: 172, height: 48, etape2: true },

    // Niveaux (zones vertes - colonne de droite)
    { id: 'level-1', top: 40, left: 403, width: 208, height: 49, etape2: true },
    { id: 'level-2', top: 92, left: 403, width: 208, height: 48, etape2: true },
    { id: 'level-3', top: 143, left: 403, width: 208, height: 48, etape2: true },
    { id: 'level-4', top: 246, left: 403, width: 208, height: 48, etape2: true },
    { id: 'level-5', top: 349, left: 403, width: 208, height: 48, etape2: true },
    { id: 'level-6', top: 400, left: 403, width: 208, height: 49, etape2: true },
    { id: 'level-7', top: 451, left: 403, width: 208, height: 49, etape2: true },
    { id: 'level-8', top: 554, left: 403, width: 208, height: 49, etape2: true },
    { id: 'level-9', top: 657, left: 403, width: 208, height: 49, etape2: true },
    { id: 'level-10', top: 708, left: 403, width: 208, height: 49, etape2: true },
    { id: 'level-11', top: 760, left: 403, width: 208, height: 48, etape2: true }
];

window.tableauElementsEtape1 = [
    { id: 'draggable-f1', nom: 'Permettre aux élèves de présenter leur sujet au public' },
    { id: 'draggable-f2', nom: 'Respecter le temps imparti' },
    { id: 'draggable-f3', nom: 'Être compatible avec le matériel du collège' },
    { id: 'draggable-f4', nom: 'Être agréable à regarder pour le public' },
    { id: 'draggable-f5', nom: 'Faciliter la présentation orale des élèves' }

];

window.tableauElementsEtape2 = [
    { id: 'draggable-c1', nom: 'Contenu des diapositives suivantes' },
    { id: 'draggable-c2', nom: 'Répartition du temps de parole' },
    { id: 'draggable-c3', nom: 'Nombre de diapositives' },
    { id: 'draggable-c4', nom: 'Format du fichier' },
    { id: 'draggable-c5', nom: 'Support de stockage' },
    { id: 'draggable-c6', nom: 'Police d’écriture' },
    { id: 'draggable-c7', nom: 'Taille d’écriture' },
    { id: 'draggable-c8', nom: 'Cohérence visuelle' },
    { id: 'draggable-c9', nom: 'Présence d’animation ou transition' },

    { id: 'draggable-l1', nom: 'titre, noms, prénoms, classe et 1 image' },
    { id: 'draggable-l2', nom: 'titres, mots-clés, images avec légendes' },
    { id: 'draggable-l3', nom: '5 minutes' },
    { id: 'draggable-l4', nom: '8 maximum' },
    { id: 'draggable-l5', nom: '16:9' },
    { id: 'draggable-l6', nom: 'Clé USB ou réseau du collège' },
    { id: 'draggable-l7', nom: 'Fond sobre, texte contrasté, couleurs adaptées' },
    { id: 'draggable-l8', nom: '24 pts minimum' },
    { id: 'draggable-l9', nom: '4 maximum' },
    { id: 'draggable-l10', nom: 'Mots-clés et images' },
    { id: 'draggable-l11', nom: 'Non autorisée' }

];


// Correspondances correctes pour l'étape 1 : Fonctions
window.placementsCorrectsTableauEtape1 = {
    'fonction-1': 'draggable-f1',
    'fonction-2': 'draggable-f2',
    'fonction-3': 'draggable-f3',
    'fonction-4': 'draggable-f4',
    'fonction-5': 'draggable-f5'
};

// Correspondances correctes pour l'étape 2 : Critères et niveaux
window.placementsCorrectsTableauEtape2 = {
    'critere-1': 'draggable-c1',
    'critere-2': 'draggable-c2',
    'critere-3': 'draggable-c3',
    'critere-4': 'draggable-c4',
    'critere-5': 'draggable-c5',
    'critere-6': 'draggable-c6',
    'critere-7': 'draggable-c7',
    'critere-8': 'draggable-c8',
    'critere-9': 'draggable-c9',

    'level-1': 'draggable-l1',
    'level-2': 'draggable-l2',
    'level-3': 'draggable-l3',
    'level-4': 'draggable-l4',
    'level-5': 'draggable-l5',
    'level-6': 'draggable-l6',
    'level-7': 'draggable-l7',
    'level-8': 'draggable-l8',
    'level-9': 'draggable-l9',
    'level-10': 'draggable-l10',
    'level-11': 'draggable-l11'

};
