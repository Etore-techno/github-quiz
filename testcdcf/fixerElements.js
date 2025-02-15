function modifierIDsElementsEtape1() {
    console.log("Modification des IDs des éléments et zones placés à la fin de l'étape 1...");

    document.querySelectorAll(".diagramme-droppable").forEach((zone, index) => {
        zone.id = `fixed-zone-diagramme-${index}`;
        zone.style.border = "none"; // Supprimer la bordure
        zone.style.backgroundColor = "transparent"; // Supprimer la couleur de fond
        zone.style.pointerEvents = "none"; // Désactiver toute interaction
    });

    document.querySelectorAll(".diagramme-droppable .diagramme-draggable").forEach((element, index) => {
        element.id = `fixed-diagramme-${index}`;
        element.removeAttribute("draggable"); 
        element.style.cursor = "default";
        element.style.pointerEvents = "none"; // Désactiver toute interaction
    });
    
    const message = document.getElementById("diagramme-message");

    message.innerHTML = "Recopiez le diagramme sur votre feuille,<br> puis complétez le tableau de caractérisation en-dessous !";
    message.style.fontSize = "24px" ;
    message.style.textAlign = "center" ;

}

function modifierIDsElementsEtape2() {
    console.log("Modification des IDs des éléments placés à la fin de l'étape 2...");

    document.querySelectorAll(".tableau-droppable").forEach((zone, index) => {
        zone.id = `fixed-zone-tableau-${index}`;
        zone.style.border = "none"; // Supprimer la bordure
        zone.style.backgroundColor = "transparent"; // Supprimer la couleur de fond
        zone.style.pointerEvents = "none"; // Désactiver toute interaction
    });

    document.querySelectorAll(".tableau-droppable .bougeable").forEach((element, index) => {
        element.id = `fixed-tableau-${index}`;
        element.removeAttribute("draggable"); 
        element.style.cursor = "default";
        element.style.pointerEvents = "none"; // Désactiver toute interaction
    });

}

function modifierIDsElementsEtape3() {
    console.log("Modification des IDs des éléments placés à la fin de l'étape 3...");

    document.querySelectorAll(".tableau-droppable").forEach((zone, index) => {
        zone.id = `fixed-2-zone-tableau-${index}`;
        zone.style.border = "none"; // Supprimer la bordure
        zone.style.backgroundColor = "transparent"; // Supprimer la couleur de fond
        zone.style.pointerEvents = "none"; // Désactiver toute interaction
    });

    document.querySelectorAll(".tableau-droppable .bougeable").forEach((element, index) => {
        element.id = `fixed-2-tableau-${index}`;
        element.removeAttribute("draggable"); 
        element.style.cursor = "default";
        element.style.pointerEvents = "none"; // Désactiver toute interaction
    });  
    
    document.getElementById("deplacables-tableau-container").style.display = "none";
    document.getElementById("validate-3-button").style.display = "none";

    const message = document.getElementById("tableau-message");

    message.innerHTML = "Recopiez le tableau sur votre feuille !";
    message.style.fontSize = "24px" ;
    message.style.textAlign = "center" ;
    
   
}

// fixerElements.js

function appliquerPositions() {
    // Appliquer les zones du diagramme
    if (window.diagrammezone) {
        window.diagrammezone.forEach(zone => {
            const elem = document.getElementById(zone.id);
            if (elem) {
                elem.style.setProperty('--top', `${zone.top}%`);
                elem.style.setProperty('--left', `${zone.left}%`);
                elem.style.setProperty('--width', `${zone.width}%`);
                elem.style.setProperty('--height', `${zone.height}%`);
            }
        });
    }

    // Appliquer les zones du tableau (fonctions)
    if (window.tableauzones1) {
        window.tableauzones1.forEach(zone => {
            const elem = document.getElementById(zone.id);
            if (elem) {
                elem.style.setProperty('--top', `${zone.top}%`);
                elem.style.setProperty('--left', `${zone.left}%`);
                elem.style.setProperty('--width', `${zone.width}%`);
                elem.style.setProperty('--height', `${zone.height}%`);
            }
        });
    }

    // Appliquer les zones du tableau (critères et niveaux)
    if (window.tableauzones2) {
        window.tableauzones2.forEach(zone => {
            const elem = document.getElementById(zone.id);
            if (elem) {
                elem.style.setProperty('--top', `${zone.top}%`);
                elem.style.setProperty('--left', `${zone.left}%`);
                elem.style.setProperty('--width', `${zone.width}%`);
                elem.style.setProperty('--height', `${zone.height}%`);
            }
        });
    }

    console.log("✅ Zones positionnées en pourcentage.");
}

// Lancer au chargement et au changement d'orientation
window.addEventListener('load', appliquerPositions);
window.addEventListener('orientationchange', appliquerPositions);
