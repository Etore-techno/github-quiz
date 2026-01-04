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

        positionnerZonesEtElements2();
        repositionnementEnCours2 = false;
    }





    if (img2.complete) {
        attendreChargementEtPositionner2();
    } else {
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
            case 1: tailleTexteBase = 2.2; break;
            case 2: tailleTexteBase = 2.0; break;
            case 3: tailleTexteBase = 2.0; break;
            default: tailleTexteBase = 0.2;     
        }
    } else { 
        switch (colonne) {
            case 1: tailleTexteBase = 1.1; break;
            case 2: tailleTexteBase = 1.0; break;
            case 3: tailleTexteBase = 1.0; break;
            default: tailleTexteBase = 0.2;
        }
    }
        tailleTexte = (tailleTexteBase) + "vw";
  
    callback(tailleTexte);
}


function recalculerTaillesEtTexte2(mode2) {

    let colonnes = [1, 2, 3];

    colonnes.forEach(colonne => {
        calculerTailleTexteAutoParColonne(colonne, mode2, (tailleOptimale) => {
            if (!tailleOptimale) {
                return;
            }
            tailleTexteMemoire2[`colonne${colonne}`][mode2] = tailleOptimale;

            setTimeout(() => {
                document.querySelectorAll(`.dropzone2[data-colonne="${colonne}"]`).forEach(zone => {
                    zone.style.fontSize = tailleTexteMemoire2[`colonne${colonne}`][mode2];
                });

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
    const imgWidth2 = rect2.width;
    const imgHeight2 = rect2.height;
    let mode2 = detecterMode2();

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
   
    document.querySelectorAll(".dropzone2").forEach(zone2 => zone2.remove()); // ✅ Supprime toutes les anciennes zones

    

 // 📌 Vérification de l'étape actuelle
 let etapeActuelle = parseInt(window.app.etape); // Convertir en nombre pour éviter des erreurs


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
         }
        
    }
   });

    recalculerTaillesEtTexte2(mode2);
    recalculEnCours2 = false;
}


 // Fonction pour détecter l'orientation et adapter l'affichage
 function adjustLayoutForOrientation2() {
    const mode2 = detecterMode2(); // ✅ On utilise la même fonction que dans zonesElements.js
    const tableauContainer = document.getElementById("tableau-container");
    const tableau = document.querySelector("#tableau-container img");



    if (mode2 === "portrait") {

        tableauContainer.style.width = "100vw";  // 🔹 Prend toute la largeur de l'écran
        tableau.style.width = "100vw";  // Largeur complète
        tableau.style.height = "auto";  // Ajustement proportionnel
    } else {

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

}

// Fonction pour sauvegarder l’état des zones avant un redimensionnement
function saveDropzoneState2() {
    const dropzones2 = document.querySelectorAll(".dropzone2");

    dropzones2.forEach(zone2 => {
        const rect2 = zone2.getBoundingClientRect();
        zone2.dataset.originalX = rect2.left;
        zone2.dataset.originalY = rect2.top;
    });

}

function bloquerColonnesTableau() {
    let etapeActuelle = parseInt(window.app.etape);
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
        
        }
        
    });

    // 🔥 Correction : Désactiver les événements de clic sur les zones bloquées
    document.querySelectorAll(".zone-bloquee").forEach(zone => {
        zone.removeEventListener("click", handleClick); // ✅ Supprime l'événement de clic
    });


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
    positionnerZonesEtElements2();

    bloquerColonnesTableau(); // ✅ Bloquer dynamiquement après changement d'orientation
});

// Initialisation au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
    saveDropzoneState2();
    adjustLayoutForOrientation2();
}); 