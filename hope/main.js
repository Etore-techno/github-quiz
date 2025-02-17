// main.js - Gestion des exercices avec restauration fiable des positions du diagramme uniquement

window.addEventListener("load", function () {
    console.log("🌐 Initialisation du projet interactif...");

    const diagrammeImage = document.querySelector("#diagramme-container img");

    waitForImage(diagrammeImage).then(() => {
        console.log("🚀 Image chargée, démarrage des exercices...");
        setupExercises();

        // 🛑 Désactivation de la réinitialisation lors du zoom (resize)
        window.addEventListener('resize', () => {
            console.log("🔍 Redimensionnement détecté, tentative de restauration...");
            setTimeout(restoreDiagrammePositions, 300);
        });
    }).catch(err => {
        console.error("❌ Erreur de chargement d'image:", err);
    });

    // 🖼️ Attente du chargement de l'image
    function waitForImage(img) {
        return new Promise((resolve, reject) => {
            if (img.complete) resolve();
            else {
                img.addEventListener("load", resolve);
                img.addEventListener("error", () => reject(`❌ Image non chargée: ${img.src}`));
            }
        });
    }

    // ⚙️ Configuration initiale
    function setupExercises() {
        console.log("🔄 Configuration initiale...");
        if (typeof app.setupDiagramme === "function") {
            app.setupDiagramme();
        } else {
            console.error("❌ `app.setupDiagramme` introuvable !");
        }

        if (typeof app.initDragAndDropMouse === "function") {
            app.initDragAndDropMouse();
        } else {
            console.error("❌ `app.initDragAndDropMouse` introuvable !");
        }

        // 🧠 Initialisation des positions
        initializeDiagrammePositions();

        // 🔄 Restauration différée
        setTimeout(restoreDiagrammePositions, 500);
    }
});

// 🧠 Initialisation des positions
window.app = window.app || {};
window.app.diagrammePositions = window.app.diagrammePositions || {};

// 🛠️ Initialisation basée sur les éléments de data.js
function initializeDiagrammePositions() {
    window.exerciceData.diagrammeElements.forEach(element => {
        if (!window.app.diagrammePositions[element.id]) {
            window.app.diagrammePositions[element.id] = 'deplacables-diagramme-container';
        }
    });
    console.log("✅ Initialisation des positions du diagramme.");
}

// 🔄 Restauration des positions des éléments
function restoreDiagrammePositions() {
    Object.entries(window.app.diagrammePositions).forEach(([elementId, zoneId]) => {
        if (!elementId) {
            console.warn(`⚠️ ID vide détecté, ignoré.`);
            return;
        }

        const element = document.getElementById(elementId);
        const zone = document.getElementById(zoneId);
        if (element && zone) {
            zone.appendChild(element);
            console.log(`↩️ Restauration : ${elementId} → ${zoneId}`);
        } else {
            console.warn(`⚠️ Impossible de restaurer : ${elementId} → ${zoneId}`);
        }
    });
}

// 🖨️ Afficher les positions dans la console
window.app.logDiagrammePositions = () => {
    console.log('📍 Positions du diagramme :', window.app.diagrammePositions);
};

// 🔁 Réinitialiser les positions
window.app.resetDiagrammePositions = () => {
    const container = document.getElementById('deplacables-diagramme-container');
    if (container) {
        container.querySelectorAll('.draggable').forEach(el => {
            container.appendChild(el);
            window.app.diagrammePositions[el.id] = container.id;
        });
    }
    console.log('🔄 Positions du diagramme réinitialisées.');
};
