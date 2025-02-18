// main.js - Gestion des exercices avec chargement dynamique et recalcul après stabilisation

window.app = window.app || {};
window.app.diagrammePositions = {};
window.app.positionsElements = {}; // ✅ Initialisation dès le départ

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
            app.initDragAndDropMouse();
            console.log("✅ Exercices prêts !");
        }, 500);
    }

    document.getElementById("validate-1-button").addEventListener("click", () => {
        app.verifierPositions();
    });
});
