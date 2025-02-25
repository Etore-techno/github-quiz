app.setupDiagramme = function () {
    const container = document.getElementById("diagramme-container");
    const img = container.querySelector("img");

    let repositionnementEnCours = false;
    let recalculEnCours = false;
    let derniereOrientation = detecterMode();
    let attenteMode = false;

    function attendreChargementEtPositionner() {
        if (repositionnementEnCours) return;
        repositionnementEnCours = true;

        console.log("🚀 Chargement terminé : Positionnement immédiat !");
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

    function trouverPlusPetiteGrandeZone() {
        const grandesZones = [...document.querySelectorAll('.dropzone[data-taille="grande"]')];
        if (grandesZones.length === 0) return null;
        return grandesZones.reduce((plusPetite, zone) => {
            const surface = zone.clientWidth * zone.clientHeight;
            return (!plusPetite || surface < plusPetite.surface) ? { zone, surface } : plusPetite;
        }, null)?.zone;
    }

    function trouverTexteLePlusLong() {
        const elementsCompatibles = window.exerciceData.diagrammeElements.filter(el => el.taille === "grande");
        return elementsCompatibles.reduce((longest, el) => el.nom.length > longest.length ? el.nom : longest, "");
    }

    let tailleTexteMemoire = {
        desktop: null,
        portrait: null,
        landscape: null
    };

    function calculerTailleTexteAuto(zone, mode, callback) {
        if (!zone) {
            console.warn("❌ Aucune zone trouvée pour le test !");
            callback("16px");
            return;
        }

        let texteMax = trouverTexteLePlusLong();
        let testText = document.createElement("div");
        testText.innerText = texteMax;

        testText.style.position = "absolute";
        testText.style.width = "100%";
        testText.style.height = "100%";
        testText.style.display = "flex";
        testText.style.justifyContent = "center";
        testText.style.alignItems = "center";
        testText.style.textAlign = "center";
        testText.style.wordWrap = "break-word";
        testText.style.overflow = "hidden";
        testText.style.fontSize = "5px";

        zone.appendChild(testText);

        requestAnimationFrame(() => {
            let fontSize = 5;
            testText.style.fontSize = fontSize + "px";

            let zoneHeight = zone.clientHeight;
            let zoneWidth = zone.clientWidth;
            let maxFontSize = 100;

            while (testText.scrollHeight <= zoneHeight && testText.scrollWidth <= zoneWidth && fontSize < maxFontSize) {
                fontSize += 1;
                testText.style.fontSize = fontSize + "px";
            }

            fontSize -= 1;
            let adjustedFontSize = Math.round(fontSize * 0.90);
            console.log("✅ Taille optimale trouvée pour " + mode + " : " + fontSize + "px");
            zone.removeChild(testText);
            callback(adjustedFontSize + "px");
        });
    }

    function positionnerZonesEtElements() {
        if (recalculEnCours) return;
        recalculEnCours = true;

        const rect = img.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
            recalculEnCours = false;
            return;
        }

        const imgWidth = rect.width;
        const imgHeight = rect.height;
        let mode = detecterMode();
        console.log("Mode détecté :", mode);

        let elementsSauvegardes = {};
        document.querySelectorAll('.dropzone').forEach(zone => {
            if (zone.children.length > 0) {
                elementsSauvegardes[zone.id] = zone.innerHTML;
            }
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

            container.appendChild(zoneDiv);

            if (elementsSauvegardes[zoneData.id]) {
                zoneDiv.innerHTML = elementsSauvegardes[zoneData.id];
            }
        });

        recalculerTaillesEtTexte(mode);
    }

    function recalculerTaillesEtTexte(mode) {
        let zoneRef = trouverPlusPetiteGrandeZone();
        if (!zoneRef) {
            console.warn("⚠️ Impossible de trouver une zone de référence pour le test.");
            recalculEnCours = false;
            return;
        }

        calculerTailleTexteAuto(zoneRef, mode, (tailleOptimale) => {
            tailleTexteMemoire[mode] = tailleOptimale;

            document.querySelectorAll('.dropzone').forEach(zone => {
                zone.style.fontSize = tailleTexteMemoire[mode];
            });

            app.initSelectionMenu();
            recalculEnCours = false;
        });
    }

    function repositionnerEtAjuster() {
        positionnerZonesEtElements();
    }

    function gererChangementOrientation() {
        let nouveauMode = detecterMode();
        if (nouveauMode === derniereOrientation) return;
        derniereOrientation = nouveauMode;

        if (attenteMode) return;
        attenteMode = true;

        setTimeout(() => {
            repositionnerEtAjuster();
            attenteMode = false;
        }, 50);
    }

    if (img.complete) {
        attendreChargementEtPositionner();
    } else {
        img.onload = () => attendreChargementEtPositionner();
    }

    window.addEventListener("resize", repositionnerEtAjuster);
    window.addEventListener("orientationchange", gererChangementOrientation);
    window.addEventListener("DOMContentLoaded", repositionnerEtAjuster);
};





 // Fonction pour détecter l'orientation et adapter l'affichage
 function adjustLayoutForOrientation() {
    const mode = detecterMode(); // ✅ On utilise la même fonction que dans zonesElements.js
    const diagramContainer = document.getElementById("diagramme-container");
    const diagram = document.querySelector("#diagramme-container img");

    console.log("🔍 Mode détecté dans main.js :", mode); // ✅ Vérification


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

        zone.style.left = (originalX * scaleX) + "px";
        zone.style.top = (originalY * scaleY) + "px";
        
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