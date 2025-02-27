let recalculEnCours2 = false;

app.setupTableau = function () {
    const container2 = document.getElementById("tableau-container");
    const img2 = container2.querySelector("img");

    let repositionnementEnCours2 = false;

    let derniereOrientation2 = detecterMode2();
    let attenteMode2 = false;

    function attendreChargementEtPositionner2() {
        if (repositionnementEnCours2) return;
        repositionnementEnCours2 = true;

        console.log("🚀 Chargement terminé : Positionnement immédiat !");
        positionnerZonesEtElements2();
        repositionnementEnCours2 = false;
    }





    if (img2.complete) {
        console.log("✅ Image déjà chargée, positionnement immédiat !");
        attendreChargementEtPositionner2();
    } else {
        console.log("🕒 Attente du chargement de l'image...");
        img2.onload = () => attendreChargementEtPositionner2();
    }

   // window.addEventListener("resize", positionnerZonesEtElements2);

    //window.addEventListener("orientationchange", positionnerZonesEtElements2);
    //window.addEventListener("DOMContentLoaded", positionnerZonesEtElements2);
};

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


function calculerTailleTexteAutoParColonne(colonne, mode, callback) {  
   
    // ✅ Définition des tailles par colonne et mode
    let tailleTexteBase;
    let tailleTexte;

    if (mode === "portrait") {
        switch (colonne) {
            case 1: tailleTexteBase = 2.8; break;
            case 2: tailleTexteBase = 2.4; break;
            case 3: tailleTexteBase = 2.4; break;
            default: tailleTexteBase = 0.2;     
        }
    } else { 
        switch (colonne) {
            case 1: tailleTexteBase = 1.4; break;
            case 2: tailleTexteBase = 1.2; break;
            case 3: tailleTexteBase = 1.2; break;
            default: tailleTexteBase = 0.2;
        }
    }
        tailleTexte = (tailleTexteBase) + "vw";
  
    console.log(`✅ Taille de texte calculée pour colonne ${colonne} en ${mode} : ${tailleTexte}`);
    callback(tailleTexte);
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


function positionnerZonesEtElements2() {
    if (recalculEnCours2) return;
    recalculEnCours2 = true;
    const container2 = document.getElementById("tableau-container");
    const img2 = container2.querySelector("img");
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
    
    if (!window.exerciceData.placedElements) {
        window.exerciceData.placedElements = {}; // 📌 Initialisation si nécessaire
    }
    
    // 📌 Sauvegarde des éléments placés avant suppression
    document.querySelectorAll('.dropzone2').forEach(zone2 => {
        if (zone2.children.length > 0) {
            window.exerciceData.placedElements[zone2.id] = zone2.innerHTML; // ✅ Sauvegarde
        }
    });
    console.log("📌 Éléments sauvegardés :", window.exerciceData.placedElements);
   
    console.log("🔄 Suppression des anciennes zones avant repositionnement...");
    document.querySelectorAll(".dropzone2").forEach(zone2 => zone2.remove()); // ✅ Supprime toutes les anciennes zones

    

 // 📌 Vérification de l'étape actuelle
 let etapeActuelle = parseInt(window.app.etape); // Convertir en nombre pour éviter des erreurs
 console.log(`🔄 Génération des zones pour l'étape ${etapeActuelle}...`);


 window.exerciceData.tableauzone.forEach(zoneData2 => {
    // ✅ Vérifie si la zone correspond à l'étape actuelle
    if (
        (window.app.etape === 2 && zoneData2.colonne === 1) ||
        (window.app.etape === 3 && (zoneData2.colonne === 1 || zoneData2.colonne === 2)) ||
        (window.app.etape === 4 && (zoneData2.colonne === 1 || zoneData2.colonne === 2 || zoneData2.colonne === 3))
    ) {
    
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

// 📌 Vérifie si un élément a été placé avant et le remet dans la zone
if (window.exerciceData.placedElements[zoneData2.id]) {
    zoneDiv2.innerHTML = window.exerciceData.placedElements[zoneData2.id];
    console.log(`✅ Élément restauré pour ${zoneData2.id} :`, window.exerciceData.placedElements[zoneData2.id]);
}


        if (elementsSauvegardes2[zoneData2.id]) {
            zoneDiv2.innerHTML = elementsSauvegardes2[zoneData2.id];
        }

        // ✅ Désactiver les colonnes déjà validées
        let colonneZone = parseInt(zoneData2.colonne);
        if (
            (etapeActuelle > 2 && colonneZone === 1) ||  
            (etapeActuelle > 3 && colonneZone === 2) || 
            (etapeActuelle > 4 && colonneZone === 3)
        ) {
            zoneDiv2.style.backgroundColor = "rgba(200, 200, 200, 0.3)"; 
            zoneDiv2.style.border = "1px solid gray"; 
            zoneDiv2.style.pointerEvents = "none"; 
            zoneDiv2.style.opacity = "1"; 
            console.log(`🔒 Colonne ${colonneZone} bloquée et toujours visible.`);
            // 📌 Assure que les éléments placés restent visibles même si la colonne est inactive
            if (window.exerciceData.placedElements[zoneData2.id]) {
                console.log(`🔒 Rendu inactif mais visible : ${zoneData2.id}`);
            }
        }
        
        


        // ✅ Ajout d'un event listener pour détecter les clics
        zoneDiv2.addEventListener("click", () => {
            console.log(`📌 Zone cliquée : ${zoneDiv2.id} (Colonne ${zoneData2.colonne})`);
        });
    }
});

    console.log("✅ Toutes les zones ont été repositionnées.");
    recalculerTaillesEtTexte2(mode2);
    recalculEnCours2 = false;
}


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
    setTimeout(updateDropzonesPosition2, 30);
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

function bloquerColonnesTableau() {
    let etapeActuelle = parseInt(window.app.etape);
    console.log(`🔒 Vérification des colonnes à bloquer pour l'étape ${etapeActuelle}...`);
let bouton = document.getElementById("validate-2-button");
    document.querySelectorAll(".dropzone2").forEach(zone => {
        let colonneZone = parseInt(zone.getAttribute("data-colonne"));

        if ((bouton.textContent === "Suivant" && etapeActuelle === 2 && colonneZone === 1) || 
        (bouton.textContent === "Suivant" && etapeActuelle === 3 && colonneZone === 2) || 
        (bouton.textContent === "Suivant" && etapeActuelle === 4 && colonneZone === 3) || 
            (etapeActuelle > 2 && colonneZone === 1) || 
            (etapeActuelle > 3 && colonneZone === 2) || 
            (etapeActuelle > 4 && colonneZone === 3)
        ) {
            zone.style.backgroundColor = "rgba(200, 200, 200, 0.3)"; 
            zone.style.pointerEvents = "none"; 
            zone.style.opacity = "1"; 
            zone.style.border = "1px solid gray"; 
        
            console.log(`🔒 Colonne ${colonneZone} bloquée et toujours visible.`);
        }
        
    });

    // 🔥 Correction : Désactiver les événements de clic sur les zones bloquées
    document.querySelectorAll(".zone-bloquee").forEach(zone => {
        zone.removeEventListener("click", handleClick); // ✅ Supprime l'événement de clic
    });

    console.log("✅ Zones bloquées désactivées.");

}




// Événements pour détecter les changements de taille ou d’orientation
window.addEventListener("resize", () => {
    saveDropzoneState2();

   adjustLayoutForOrientation2();
   positionnerZonesEtElements2();

   bloquerColonnesTableau(); // ✅ Bloquer dynamiquement après changement d'orientation
});

window.addEventListener("orientationchange", () => {
    saveDropzoneState2();
    adjustLayoutForOrientation2();
    bloquerColonnesTableau(); // ✅ Bloquer dynamiquement après changement d'orientation
});

// Initialisation au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
    saveDropzoneState2();
    adjustLayoutForOrientation2();
}); 