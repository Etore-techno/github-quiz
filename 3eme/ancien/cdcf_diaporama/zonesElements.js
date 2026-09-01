app.setupDiagramme = function () {
    const container = document.getElementById("diagramme-container");
    const img = container.querySelector("img");

    let repositionnementEnCours = false;
    let derniereOrientation = detecterMode();
    let attenteMode = false;

    function attendreChargementEtPositionner() {
        if (repositionnementEnCours) return;
        repositionnementEnCours = true;

        positionnerZonesEtElements();
        repositionnementEnCours = false;
    }

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

    let tailleTexteMemoire = {
        petite: {desktop: null, portrait: null, landscape: null },
        grande: {desktop: null, portrait: null, landscape: null },
    };

    function calculerTailleTexteAuto(mode, callback) {
            
        // ✅ Définition des tailles par colonne et mode
            let tailleTexteBase;
            let tailleTexte;
            if (mode === "portrait") {
                tailleTexteBase = 2.8;   
            } else {                 
                tailleTexteBase = 1.4;
            }
            
            tailleTexte = (tailleTexteBase) + "vw";
          
            callback(tailleTexte);
    }

    function positionnerZonesEtElements() {

        const rect = img.getBoundingClientRect();


        const imgWidth = rect.width;
        const imgHeight = rect.height;
        let mode = detecterMode();

        let elementsSauvegardes = {};
        document.querySelectorAll(".dropzone").forEach(zone => {
            if (zone.children.length > 0) {
                elementsSauvegardes[zone.id] = zone.innerHTML;
            }
            
            // 🔥 Supprimer le blocage des interactions pour permettre le changement de réponse
            zone.style.pointerEvents = "auto";
        });
        document.querySelectorAll('.dropzone').forEach(zone => zone.remove());

        window.exerciceData.diagrammezone.forEach(zoneData => {
            const zoneDiv = document.createElement("div");
            zoneDiv.className = "dropzone";
            zoneDiv.id = zoneData.id;
            zoneDiv.style.position = "absolute";
            zoneDiv.setAttribute("data-taille", zoneData.taille);

            zoneDiv.style.top = (zoneData.relativeTop * imgHeight) + "px";
            zoneDiv.style.left = (zoneData.relativeLeft * imgWidth) + "px";
            zoneDiv.style.width = (zoneData.relativeWidth * imgWidth) + "px";
            zoneDiv.style.height = (zoneData.relativeHeight * imgHeight) + "px";

            zoneDiv.style.opacity = "1";

        // ✅ Ajout de la taille de bordure en fonction du mode
        const screenWidth = window.innerWidth;
        zoneDiv.style.border = `${mode === "portrait" ? 0.001 * imgWidth : 0.002 * imgWidth}px solid black`;

            container.appendChild(zoneDiv);

            if (elementsSauvegardes[zoneData.id]) {
                zoneDiv.innerHTML = elementsSauvegardes[zoneData.id];
            }
        });

        recalculerTaillesEtTexte(mode);
    }

    function recalculerTaillesEtTexte(mode) {

        calculerTailleTexteAuto(mode, (tailleOptimale) => {
            tailleTexteMemoire[mode] = tailleOptimale;

            document.querySelectorAll('.dropzone').forEach(zone => {
                zone.style.fontSize = tailleTexteMemoire[mode];
            });

            app.initSelectionMenu();
        });
    }

    function repositionnerEtAjuster() {
        positionnerZonesEtElements();
    }

    if (img.complete) {
        attendreChargementEtPositionner();
    } else {
        img.onload = () => attendreChargementEtPositionner();
    }

    window.addEventListener("resize", () => {
        repositionnerEtAjuster();        
        bloquerzones();
     });
     
     window.addEventListener("orientationchange", () => {
        repositionnerEtAjuster();        
         bloquerzones();
     });
    window.addEventListener("DOMContentLoaded", repositionnerEtAjuster);
};





 // Fonction pour détecter l'orientation et adapter l'affichage
 function adjustLayoutForOrientation() {
    const mode = detecterMode(); // ✅ On utilise la même fonction que dans zonesElements.js
    const diagramContainer = document.getElementById("diagramme-container");
    const diagram = document.querySelector("#diagramme-container img");



    if (mode === "portrait") {

        diagramContainer.style.width = "100vw";  // 🔹 Prend toute la largeur de l'écran
        diagram.style.width = "100vw";  // Largeur complète
        diagram.style.height = "auto";  // Ajustement proportionnel
    } else {

        diagramContainer.style.width = "50vw";   // 🔹 Largeur normale en paysage ou desktop
        diagram.style.width = "100%";            // 🔹 Ajustement automatique
        diagram.style.height = "auto";           // 🔹 Hauteur ajustée automatiquement
    }


    // Repositionnement des zones interactives après l'ajustement
    setTimeout(updateDropzonesPosition, 30);
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

        zone.style.left = (originalX * scaleX) + "px";
        zone.style.top = (originalY * scaleY) + "px";
        
    });

}

// Fonction pour sauvegarder l’état des zones avant un redimensionnement
function saveDropzoneState() {
    const dropzones = document.querySelectorAll(".dropzone");

    dropzones.forEach(zone => {
        const rect = zone.getBoundingClientRect();
        zone.dataset.originalX = rect.left;
        zone.dataset.originalY = rect.top;
    });

}
function bloquerzones() {
     // 📌 Vérification de l'étape actuelle
     let etapeActuelle = parseInt(window.app.etape); // Convertir en nombre pour éviter des erreurs
     if (etapeActuelle != 1 || document.getElementById("validate-1-button").textContent === "Suivant") {   
            // 🔹 Désactiver les zones (supprime bordures et interactions)
    document.querySelectorAll(".dropzone").forEach(zone => {
    zone.style.border = "none";
    zone.style.backgroundColor = "transparent";
    zone.style.pointerEvents = "none"; // Désactive le clic
    });
};


}
// Événements pour détecter les changements de taille ou d’orientation
window.addEventListener("resize", () => {
   saveDropzoneState();
   adjustLayoutForOrientation();
   bloquerzones();
});

window.addEventListener("orientationchange", () => {
    saveDropzoneState();
    adjustLayoutForOrientation();
    bloquerzones();
});

// Initialisation au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
    saveDropzoneState();
    adjustLayoutForOrientation();
});