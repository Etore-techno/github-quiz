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
            console.log(`📐 Détection du mode : ${isMobile2 ? "Mobile" : "Desktop"} - Dimensions : ${largeur2}x${hauteur2}`);
        if (isMobile2) {
            return hauteur2 > largeur2 ? "portrait" : "landscape"; // 📌 Portrait ou Paysage pour mobiles
        } else {
            return "desktop"; // ✅ Par défaut, tout le reste est Desktop
        }
    }
    let tailleTexteMemoire2 = {
        colonne1: { desktop: null, portrait: null, landscape: null },
        colonne2: { desktop: null, portrait: null, landscape: null },
        colonne3: { desktop: null, portrait: null, landscape: null }
    };

    function trouverPlusPetiteZoneParColonne(colonne) {
        const zones = [...document.querySelectorAll(`.dropzone2[data-colonne="${colonne}"]`)];
        if (zones.length === 0) return null;
        return zones.reduce((plusPetite, zone) => {
            const surface = zone.clientWidth * zone.clientHeight;
            return (!plusPetite || surface < plusPetite.surface) ? { zone, surface } : plusPetite;
        }, null)?.zone;
    }

    function trouverTexteLePlusLongParColonne(colonne) {
        const elementsCompatibles = window.exerciceData.tableauElements.filter(el => el.colonne === parseInt(colonne));
        return elementsCompatibles.reduce((longest, el) => el.nom.length > longest.length ? el.nom : longest, "");
    }

    function calculerTailleTexteAutoParColonne(colonne, mode, callback) {
        let zoneRef = trouverPlusPetiteZoneParColonne(colonne);
        let texteMax = trouverTexteLePlusLongParColonne(colonne);

        if (!zoneRef || !texteMax) {
            console.warn(`⚠️ Impossible de calculer la taille pour la colonne ${colonne}`);
            callback("16px");
            return;
        }

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

        zoneRef.appendChild(testText);

        requestAnimationFrame(() => {
            let fontSize = 5;
            testText.style.fontSize = fontSize + "px";

            let zoneHeight = zoneRef.clientHeight;
            let zoneWidth = zoneRef.clientWidth;
            let maxFontSize = 100;

            while (testText.scrollHeight <= zoneHeight && testText.scrollWidth <= zoneWidth && fontSize < maxFontSize) {
                fontSize += 1;
                testText.style.fontSize = fontSize + "px";
            }

            fontSize -= 1;
            let adjustedFontSize = Math.round((fontSize - 1) * 0.80);

            console.log(`✅ Taille optimale pour colonne ${colonne} en ${mode} : ${adjustedFontSize}px`);
            zoneRef.removeChild(testText);
            callback(adjustedFontSize + "px");
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
    console.log("🖼️ Dimensions de l'image détectées :", rect2.width, "x", rect2.height);
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
    console.log("🔄 Suppression des anciennes zones...");
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


        container2.appendChild(zoneDiv2);

        if (elementsSauvegardes2[zoneData2.id]) {
            zoneDiv2.innerHTML = elementsSauvegardes2[zoneData2.id];
        }
 
            // ✅ Ajout d'un event listener pour détecter les clics
            zoneDiv2.addEventListener("click", () => {
                console.log(`📌 Zone cliquée : ${zoneDiv2.id} (Colonne ${zoneData2.colonne})`);
            });
    });
    console.log("✅ Toutes les zones ont été repositionnées.");
    recalculerTaillesEtTexte2(mode2);
}


function recalculerTaillesEtTexte2(mode2) {

    console.log("🔄 Recalcul des tailles de texte...");
    let colonnes = [1, 2, 3];

    colonnes.forEach(colonne => {
        console.log(`🧐 Calcul pour la colonne ${colonne} en mode ${mode2}...`);
        calculerTailleTexteAutoParColonne(colonne, mode2, (tailleOptimale) => {
            if (!tailleOptimale) {
                console.warn(`⚠️ Aucune taille optimale trouvée pour la colonne ${colonne}`);
                return;
            }
            tailleTexteMemoire2[`colonne${colonne}`][mode2] = tailleOptimale;

            setTimeout(() => {
                document.querySelectorAll(`.dropzone2[data-colonne="${colonne}"]`).forEach(zone => {
                    zone.style.fontSize = tailleTexteMemoire2[`colonne${colonne}`][mode2];
                });

                console.log(`✅ Texte mis à jour pour colonne ${colonne} en mode ${mode2} : ${tailleOptimale}`);
            }, 10);
        });
    });
    app.initSelectionMenu2();

    recalculEnCours2 = false;
}

    function repositionnerEtAjuster2() {
        console.log("🔄 Repositionnement et ajustement des zones...");
        positionnerZonesEtElements2();
    }

    function gererChangementOrientation2() {
        let nouveauMode2 = detecterMode2();
        if (nouveauMode2 === derniereOrientation2) return;
        derniereOrientation2 = nouveauMode2;

        if (attenteMode2) return;
        attenteMode2 = true;
        console.log("🔄 Changement d'orientation détecté, mise à jour...");
        setTimeout(() => {
            repositionnerEtAjuster2();
            attenteMode2 = false;
        }, 50);
    }

    if (img2.complete) {
        console.log("✅ Image déjà chargée, positionnement immédiat !");
        attendreChargementEtPositionner2();
    } else {
        console.log("🕒 Attente du chargement de l'image...");
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