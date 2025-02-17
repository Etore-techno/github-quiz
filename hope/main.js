window.addEventListener("load", function () {
    console.log("🌐 Initialisation du projet interactif...");

    const diagrammeImage = document.querySelector("#diagramme-container img");
    const tableauImage = document.querySelector("#tableau-container img");

    Promise.all([waitForImage(diagrammeImage), waitForImage(tableauImage)]).then(() => {
        console.log("🚀 Images chargées, démarrage des exercices...");
        setupExercises();
        window.addEventListener('resize', setupExercises);
    }).catch(err => {
        console.error("❌ Erreur de chargement d'image:", err);
    });

    function waitForImage(img) {
        return new Promise((resolve, reject) => {
            if (img.complete) resolve();
            else {
                img.addEventListener("load", resolve);
                img.addEventListener("error", () => reject(`❌ Impossible de charger l'image: ${img.src}`));
            }
        });
    }

    function setupExercises() {
        console.log("🔄 Recalcul des positions des zones et des éléments...");
        document.querySelectorAll(".dropzone").forEach(zone => zone.remove());
        document.querySelectorAll(".draggable").forEach(el => el.remove());

        if (typeof app.setupDiagramme === "function" && typeof app.setupTableau === "function") {
            app.setupDiagramme();
            app.setupTableau();
        } else {
            console.error("❌ Fonctions de setup introuvables !");
        }
    }

    if (typeof app.initDragAndDropMouse === "function") {
        app.initDragAndDropMouse();
    } else {
        console.error("❌ `app.initDragAndDropMouse` est introuvable !");
    }
});