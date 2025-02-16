// main.js - Gestion principale des exercices

// Attendre que la page et les images soient chargées
window.addEventListener("load", function () {
    console.log("🌐 Initialisation du projet interactif...");

    const diagrammeImage = document.querySelector("#diagramme-container img");
    const tableauImage = document.querySelector("#tableau-container img");

    // Charger les images avant d'initialiser les exercices
    Promise.all([waitForImage(diagrammeImage), waitForImage(tableauImage)]).then(() => {
        console.log("🚀 Images chargées, démarrage des exercices...");
        setupExercises();
        window.addEventListener('resize', setupExercises);
    }).catch(err => {
        console.error("❌ Erreur de chargement d'image:", err);
    });

    // Fonction utilitaire pour attendre le chargement d'une image
    function waitForImage(img) {
        return new Promise((resolve, reject) => {
            if (img.complete) resolve();
            else {
                img.addEventListener("load", resolve);
                img.addEventListener("error", () => reject(`❌ Impossible de charger l'image: ${img.src}`));
            }
        });
    }

    // Initialisation complète des exercices
    function setupExercises() {
        console.log("🔄 Recalcul des positions des zones et des éléments...");
        
        // Nettoyer les zones et les éléments existants
        document.querySelectorAll(".dropzone").forEach(zone => zone.remove());
        document.querySelectorAll(".draggable").forEach(el => el.remove());

        // Vérifier si les fonctions de `zonesElements.js` sont disponibles
        if (typeof app.setupDiagramme === "function" && typeof app.setupTableau === "function") {
            app.setupDiagramme();
            app.setupTableau();
        } else {
            console.error("❌ Les fonctions setupDiagramme et setupTableau sont introuvables !");
        }
        app.initDragAndDrop();

    }


});
