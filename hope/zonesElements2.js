app.setupTableau = function () {
    const container2 = document.getElementById("tableau-container");
    const img2 = container2.querySelector("img");

    let repositionnementEnCours2 = false;
    let recalculEnCours2 = false;
    let derniereOrientation2 = detecterMode2();
    let attenteMode2 = false;

    function attendreChargementEtPositionner2() {
        if (repositionnementEnCours2) return;
        repositionnementEnCours2 = true;

        console.log("🚀 Chargement terminé : Positionnement immédiat !");
        positionnerZonesEtElements2();
        repositionnementEnCours2 = false;
    }

    function detecterMode2() {
        const largeur2 = window.innerWidth;
        const hauteur2 = window.innerHeight;
        const isMobile2 = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent); // ✅ Vérifie si c'est un mobile
    
        if (isMobile2) {
            return hauteur2 > largeur2 ? "portrait" : "landscape"; // 📌 Portrait ou Paysage pour mobiles
        } else {
            return "desktop"; // ✅ Par défaut, tout le reste est Desktop
        }
    }

    function trouverPlusPetiteGrandeZone2() {
        const grandesZones2 = [...document.querySelectorAll('.dropzone2[data-colonne="1"]')];
        if (grandesZones2.length === 0) return null;
        return grandesZones2.reduce((plusPetite, zone2) => {
            const surface2 = zone2.clientWidth * zone2.clientHeight;
            return (!plusPetite || surface2 < plusPetite.surface2) ? { zone2, surface2 } : plusPetite;
        }, null)?.zone2;
    }

    function trouverTexteLePlusLong2() {
        const elementsCompatibles2 = window.exerciceData.tableauElements.filter(el => el.colonne === "1");
        return elementsCompatibles2.reduce((longest, el) => el.nom.length > longest.length ? el.nom : longest, "");
    }

    let tailleTexteMemoire2 = {
        desktop: null,
        portrait: null,
        landscape: null
    };

    function calculerTailleTexteAuto2(zone2, mode2, callback) {
        if (!zone2) {
            console.warn("❌ Aucune zone trouvée pour le test !");
            callback("16px");
            return;
        }

        let texteMax2 = trouverTexteLePlusLong2();
        let testText2 = document.createElement("div");
        testText2.innerText = texteMax2;

        testText2.style.position = "absolute";
        testText2.style.width = "100%";
        testText2.style.height = "100%";
        testText2.style.display = "flex";
        testText2.style.justifyContent = "center";
        testText2.style.alignItems = "center";
        testText2.style.textAlign = "center";
        testText2.style.wordWrap = "break-word";
        testText2.style.overflow = "hidden";
        testText2.style.fontSize = "5px";

        zone2.appendChild(testText2);

        requestAnimationFrame(() => {
            let fontSize2 = 5;
            testText2.style.fontSize = fontSize2 + "px";

            let zoneHeight2 = zone2.clientHeight;
            let zoneWidth2 = zone2.clientWidth;
            let maxFontSize2 = 100;

            while (testText2.scrollHeight <= zoneHeight2 && testText2.scrollWidth <= zoneWidth2 && fontSize2 < maxFontSize2) {
                fontSize2 += 1;
                testText2.style.fontSize = fontSize2 + "px";
            }

            fontSize2 -= 1;
            let adjustedFontSize2 = Math.round(fontSize2 * 0.90);
            console.log("✅ Taille optimale trouvée pour " + mode2 + " : " + fontSize2 + "px");
            zone2.removeChild(testText2);
            callback(adjustedFontSize2 + "px");
        });
    }

function positionnerZonesEtElements2() {
    if (recalculEnCours2) return;
    recalculEnCours2 = true;

    const rect2 = img2.getBoundingClientRect();
    if (rect2.width === 0 || rect2.height === 0) {
        recalculEnCours2 = false;
        return;
    }

    const imgWidth2 = rect2.width;
    const imgHeight2 = rect2.height;
    let mode2 = detecterMode2();
    console.log("Mode détecté :", mode2);

    let elementsSauvegardes2 = {};
    document.querySelectorAll('.dropzone2').forEach(zone2 => {
        if (zone2.children.length > 0) {
            elementsSauvegardes2[zone2.id] = zone2.innerHTML;
        }
    });

    document.querySelectorAll('.dropzone2').forEach(zone2 => zone2.remove());

    window.exerciceData.tableauzone.forEach(zoneData2 => {
        const zoneDiv2 = document.createElement("div");
        zoneDiv2.className = "dropzone2";
        zoneDiv2.id = zoneData2.id;
        zoneDiv2.style.position = "absolute";
        zoneDiv2.setAttribute("data-colonne", zoneData2.colonne);

        zoneDiv2.style.top = (zoneData2.relativeTop * imgHeight2) + "px";
        zoneDiv2.style.left = (zoneData2.relativeLeft * imgWidth2) + "px";
        zoneDiv2.style.width = (zoneData2.relativeWidth * imgWidth2) + "px";
        zoneDiv2.style.height = (zoneData2.relativeHeight * imgHeight2) + "px";

        zoneDiv2.style.opacity = "1";

        // ✅ Correction : Fixer la bordure proportionnellement à la largeur de l'image
        let borderSize = Math.max(0.5, imgWidth2 * 0.002); // 0.2% de la largeur de l'image
        zoneDiv2.style.borderWidth = `${borderSize}px`;
        container2.appendChild(zoneDiv2);

        if (elementsSauvegardes2[zoneData2.id]) {
            zoneDiv2.innerHTML = elementsSauvegardes2[zoneData2.id];
        }
    });

    recalculerTaillesEtTexte2(mode2);
}


    function recalculerTaillesEtTexte2(mode2) {
        let zoneRef2 = trouverPlusPetiteGrandeZone2();
        if (!zoneRef2) {
            console.warn("⚠️ Impossible de trouver une zone de référence pour le test.");
            recalculEnCours2 = false;
            return;
        }

        calculerTailleTexteAuto2(zoneRef2, mode2, (tailleOptimale2) => {
            tailleTexteMemoire2[mode2] = tailleOptimale2;

            document.querySelectorAll('.dropzone2').forEach(zone2 => {
                zone2.style.fontSize = tailleTexteMemoire2[mode2];
            });

            app.initSelectionMenu2();
            recalculEnCours2 = false;
        });
    }

    function repositionnerEtAjuster2() {
        positionnerZonesEtElements2();
    }

    function gererChangementOrientation2() {
        let nouveauMode2 = detecterMode2();
        if (nouveauMode2 === derniereOrientation2) return;
        derniereOrientation2 = nouveauMode2;

        if (attenteMode2) return;
        attenteMode2 = true;

        setTimeout(() => {
            repositionnerEtAjuster2();
            attenteMode2 = false;
        }, 50);
    }

    if (img2.complete) {
        attendreChargementEtPositionner2();
    } else {
        img2.onload = () => attendreChargementEtPositionner2();
    }

    window.addEventListener("resize", repositionnerEtAjuster2);
    window.addEventListener("orientationchange", gererChangementOrientation2);
    window.addEventListener("DOMContentLoaded", repositionnerEtAjuster2);
};





 // Fonction pour détecter l'orientation et adapter l'affichage
 function adjustLayoutForOrientation2() {
    const mode2 = detecterMode2(); // ✅ On utilise la même fonction que dans zonesElements.js
    const tableauContainer = document.getElementById("tableau-container");
    const tableau = document.querySelector("#tableau-container img");

    console.log("🔍 Mode détecté dans main.js :", mode2); // ✅ Vérification


    if (mode2 === "portrait") {
        console.log("📲 Mode portrait détecté - Ajustement du tableau");

        tableauContainer.style.width = "100vw";  // 🔹 Prend toute la largeur de l'écran
        tableau.style.width = "100vw";  // Largeur complète
        tableau.style.height = "auto";  // Ajustement proportionnel
    } else {
        console.log("🖥️ Mode Desktop/Paysage détecté - Rétablissement de la mise en page");

        tableauContainer.style.width = "50vw";   // 🔹 Largeur normale en paysage ou desktop
        tableau.style.width = "100%";            // 🔹 Ajustement automatique
        tableau.style.height = "auto";           // 🔹 Hauteur ajustée automatiquement
    }


    // Repositionnement des zones interactives après l'ajustement
    setTimeout(updateDropzonesPosition2, 300);
}

// Fonction pour repositionner dynamiquement les dropzones2
function updateDropzonesPosition2() {
    const dropzones2 = document.querySelectorAll(".dropzone2");

    dropzones2.forEach(zone2 => {
        // On utilise les valeurs relatives au tableau pour recalculer la position
        const originalX2 = parseFloat(zone2.dataset.originalX);
        const originalY2 = parseFloat(zone2.dataset.originalY);
        const tableau = document.querySelector("#tableau-container img");

        // Mise à l'échelle proportionnelle
        const scaleX2 = tableau.clientWidth / tableau.naturalWidth;
        const scaleY2 = tableau.clientHeight / tableau.naturalHeight;

        zone2.style.left = (originalX2 * scaleX2) + "px";
        zone2.style.top = (originalY2 * scaleY2) + "px";
        
    });

    console.log("Repositionnement des zones terminé");
}

// Fonction pour sauvegarder l’état des zones avant un redimensionnement
function saveDropzoneState2() {
    const dropzones2 = document.querySelectorAll(".dropzone2");

    dropzones2.forEach(zone2 => {
        const rect2 = zone2.getBoundingClientRect();
        zone2.dataset.originalX = rect2.left;
        zone2.dataset.originalY = rect2.top;
    });

    console.log("État des zones sauvegardé");
}

// Événements pour détecter les changements de taille ou d’orientation
window.addEventListener("resize", () => {
   saveDropzoneState2();
   adjustLayoutForOrientation2();
});

window.addEventListener("orientationchange", () => {
    saveDropzoneState2();
    adjustLayoutForOrientation2();
});

// Initialisation au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
    saveDropzoneState2();
    adjustLayoutForOrientation2();
}); 