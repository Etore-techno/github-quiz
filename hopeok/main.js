// main.js - Initialisation de l'exercice avec la nouvelle interaction

window.app = window.app || {};
window.app.positionsElements = {}; // Stockage des positions des éléments

window.addEventListener("DOMContentLoaded", () => {
    const diagrammeImage = document.querySelector("#diagramme-container img");

    function attendreChargement(callback) {
        let tentatives = 0;
        const verifier = () => {
            const rect = diagrammeImage.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                callback();
            } else if (tentatives < 20) {
                tentatives++;
                requestAnimationFrame(verifier);
            }
        };
        verifier();
    }

    if (diagrammeImage.complete) {
        attendreChargement(demarrerExercices);
    } else {
        diagrammeImage.addEventListener('load', () => attendreChargement(demarrerExercices));
    }

    function demarrerExercices() {
        setTimeout(() => {
            app.setupDiagramme();
            console.log("✅ Exercices prêts !");
        }, 500);
    }

    document.getElementById("validate-1-button").addEventListener("click", () => {
        console.log("Vérification des positions :", window.app.positionsElements);
    });
});


// Fonction pour détecter l'orientation et adapter l'affichage
function adjustLayoutForOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const diagram = document.querySelector("#diagramme-container img");
    const dropzones = document.querySelectorAll(".dropzone");

    if (isPortrait) {
        console.log("Mode portrait détecté - Ajustement du diagramme");
        diagram.style.width = "100vw";  // Largeur complète
        diagram.style.height = "auto";  // Ajustement proportionnel
    } else {
        console.log("Mode paysage détecté - Rétablissement de la mise en page");
        diagram.style.width = "";  // Retour aux valeurs CSS par défaut
        diagram.style.height = "";
    }

    // Repositionnement des zones interactives après l'ajustement
    setTimeout(updateDropzonesPosition, 300);
}

// Fonction pour repositionner dynamiquement les dropzones
function updateDropzonesPosition() {
    const dropzones = document.querySelectorAll(".dropzone");

    dropzones.forEach(zone => {
        // On utilise les valeurs relatives au diagramme pour recalculer la position
        const originalX = parseFloat(zone.dataset.originalX);
        const originalY = parseFloat(zone.dataset.originalY);
        const diagram = document.querySelector("#diagramme-container img");

        // Mise à l'échelle proportionnelle
        const scaleX = diagram.clientWidth / diagram.naturalWidth;
        const scaleY = diagram.clientHeight / diagram.naturalHeight;

        zone.style.left = `${originalX * scaleX}px`;
        zone.style.top = `${originalY * scaleY}px`;
    });

    console.log("Repositionnement des zones terminé");
}

// Fonction pour sauvegarder l’état des zones avant un redimensionnement
function saveDropzoneState() {
    const dropzones = document.querySelectorAll(".dropzone");

    dropzones.forEach(zone => {
        const rect = zone.getBoundingClientRect();
        zone.dataset.originalX = rect.left;
        zone.dataset.originalY = rect.top;
    });

    console.log("État des zones sauvegardé");
}

// Événements pour détecter les changements de taille ou d’orientation
window.addEventListener("resize", () => {
    saveDropzoneState();
    adjustLayoutForOrientation();
});

window.addEventListener("orientationchange", () => {
    saveDropzoneState();
    adjustLayoutForOrientation();
});

// Initialisation au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
    saveDropzoneState();
    adjustLayoutForOrientation();
});
