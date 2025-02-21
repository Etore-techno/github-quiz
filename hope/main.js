// main.js - Initialisation de l'exercice avec la nouvelle interaction

window.app = window.app || {};
window.app.positionsElements = {}; // Stockage des positions des éléments

window.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth < window.innerHeight) {
        console.log("📱 Démarrage en mode portrait, affichage du message...");
    } else {
        console.log("🌐 Démarrage en mode paysage, initialisation immédiate...");
        app.setupDiagramme();
    }
   
   
   
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

window.addEventListener("orientationchange", () => {
    console.log("🔄 Orientation changée, recalcul des zones...");

    setTimeout(() => {
        app.setupDiagramme(); // 🔥 Recalcule les zones
    }, 500); // ⏳ Petite attente pour éviter les bugs d'affichage
});
