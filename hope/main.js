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

function detecterMode() {
    const largeur = window.innerWidth;
    const hauteur = window.innerHeight;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent); // ✅ Vérifie si c'est un mobile

    if (isMobile) {
        return hauteur > largeur ? "portrait" : "landscape"; // 📌 Portrait ou Paysage pour mobiles
    } else {
        return "desktop"; // ✅ Par défaut, tout le reste est Desktop
    }
}

// Fonction pour détecter l'orientation et adapter l'affichage
function adjustLayoutForOrientation() {
    const mode = detecterMode(); // ✅ On utilise la même fonction que dans zonesElements.js
    const diagramContainer = document.getElementById("diagramme-container");
    const diagram = document.querySelector("#diagramme-container img");

    console.log("🔍 Mode détecté dans `main.js` :", mode); // ✅ Vérification


    if (mode === "portrait") {
        console.log("📲 Mode portrait détecté - Ajustement du diagramme");

        diagramContainer.style.width = "100vw";  // 🔹 Prend toute la largeur de l'écran
        diagram.style.width = "100vw";  // Largeur complète
        diagram.style.height = "auto";  // Ajustement proportionnel
    } else {
        console.log("🖥️ Mode Desktop/Paysage détecté - Rétablissement de la mise en page");

        diagramContainer.style.width = "50vw";   // 🔹 Largeur normale en paysage ou desktop
        diagram.style.width = "100%";            // 🔹 Ajustement automatique
        diagram.style.height = "auto";           // 🔹 Hauteur ajustée automatiquement
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
