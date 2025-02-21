app.initSelectionMenu = function () {
    console.log("🚀 Initialisation du menu de sélection...");

    const container = document.getElementById("diagramme-container");

    // Supprimer et recréer le menu pour éviter les duplications
    let selectionMenu = document.getElementById("selection-menu");
    if (selectionMenu) selectionMenu.remove();

    selectionMenu = document.createElement("div");
    selectionMenu.id = "selection-menu";
    selectionMenu.style.display = "none";
    document.body.appendChild(selectionMenu);

    // Calcul de la taille optimale des boutons (même logique que pour les zones)
    let tailleMaxTexte = 0;
    window.exerciceData.diagrammeElements.forEach(element => {
        let longueurTexte = element.nom.length;
        tailleMaxTexte = Math.max(tailleMaxTexte, longueurTexte);
    });

    let tailleTexte = Math.max(1.5, 20 / tailleMaxTexte) + "vw"; // 🔥 Ajustement dynamique

    document.querySelectorAll(".dropzone").forEach(zone => {
        zone.addEventListener("click", function (event) {
            console.log(`📌 Zone cliquée : ${zone.id}`);
    
            // ✅ Recalcul des styles AVANT d'afficher la fenêtre
            ajusterStylesSelectionMenu(selectionMenu);
    
            // Nettoyage du menu précédent
            selectionMenu.innerHTML = "";
            selectionMenu.style.top = `${event.clientY}px`;
            selectionMenu.style.left = `${event.clientX}px`;
            selectionMenu.style.display = "block";
    
            // Récupération des éléments compatibles avec la zone
            const elementsCompatibles = window.exerciceData.diagrammeElements.filter(el => el.taille === zone.getAttribute("data-taille"));
    
            if (elementsCompatibles.length === 0) {
                selectionMenu.innerHTML = "<p>Aucun élément disponible</p>";
                return;
            }
    
            elementsCompatibles.forEach(element => {
                const button = document.createElement("button");
                button.className = "selection-button";
                button.textContent = element.nom;
                button.style.fontSize = tailleTexte; // ✅ Même taille que dans les zones
    
                button.addEventListener("click", function () {
                    console.log(`✅ Élément sélectionné : ${element.nom} → Zone: ${zone.id}`);
    
                    // Supprime l'ancien élément dans la zone
                    zone.innerHTML = "";
    
                    // Vérifier si l'élément est déjà placé ailleurs et le retirer
                    document.querySelectorAll(".dropzone span").forEach(placedEl => {
                        if (placedEl.textContent === element.nom) {
                            console.log(`❌ Suppression de ${element.nom} d'une autre zone`);
                            placedEl.remove();
                        }
                    });
    
                    // Ajout du texte directement dans la zone
                    const newText = document.createElement("span");
                    newText.textContent = element.nom;
                    zone.appendChild(newText);
    
                    // Enregistrement de la position
                    window.app.positionsElements[element.id] = zone.id;
    
                    // Fermeture du menu
                    selectionMenu.style.display = "none";
                });
    
                selectionMenu.appendChild(button);
            });
        });
    });
    
    
};


function ajusterStylesMenu() {
    console.log("🔧 Ajustement du style du menu de sélection");

    const selectionMenu = document.getElementById("selection-menu");
    if (!selectionMenu) return;

    const baseTaille = window.innerHeight * 0.02; // 🔥 Base stable pour padding/marge
    const baseBordure = window.innerHeight * 0.002; // 🔥 Taille stable pour bordure

    selectionMenu.style.padding = `${baseTaille}px`;  
    selectionMenu.style.borderWidth = `${baseBordure}px`;  // ✅ Fixe la bordure
    selectionMenu.style.boxShadow = "0.2em 0.2em 0.8em rgba(0, 0, 0, 0.2)";  

    console.log(`📏 Padding : ${selectionMenu.style.padding}, Bordure : ${selectionMenu.style.borderWidth}`);
}

// 🟢 Ajustement dès que le menu s’ouvre
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("dropzone")) {
        ajusterStylesMenu();
    }
});

function ajusterStylesSelectionMenu(selectionMenu) {
    if (!selectionMenu) return;

    console.log("🔄 Recalcul des styles du menu de sélection...");

    const zoomLevel = window.devicePixelRatio * 100;
    console.log(`🔍 Zoom actuel : ${zoomLevel}%`);

    // ✅ Ajustement dynamique des bordures et marges en fonction du zoom
    selectionMenu.style.borderWidth = `${0.15 * (100 / zoomLevel)}em`;
    selectionMenu.style.padding = `${0.8 * (100 / zoomLevel)}em`;
    selectionMenu.style.boxShadow = `${0.2 * (100 / zoomLevel)}em ${0.2 * (100 / zoomLevel)}em ${0.8 * (100 / zoomLevel)}em rgba(0, 0, 0, 0.2)`;

    console.log(`📏 Nouvelle bordure : ${selectionMenu.style.borderWidth}, Padding : ${selectionMenu.style.padding}`);
}

