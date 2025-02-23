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

    // Vérification de la disponibilité des éléments
    if (!window.exerciceData || !window.exerciceData.diagrammeElements) {
        console.error("❌ `window.exerciceData.diagrammeElements` est introuvable !");
        return;
    }

    document.querySelectorAll(".dropzone").forEach(zone => {
        zone.addEventListener("click", function (event) {
            console.log(`📌 Zone cliquée : ${zone.id}`);
            
            // Vérification que la dropzone a bien un `data-taille`
            const tailleZone = zone.getAttribute("data-taille");
            if (!tailleZone) {
                console.warn(`⚠️ La zone ${zone.id} n'a pas d'attribut 'data-taille' défini !`);
            } else {
                console.log(`🔍 Taille de la zone détectée : ${tailleZone}`);
            }

            ajusterStylesSelectionMenu(selectionMenu);

            // Nettoyage du menu précédent
            selectionMenu.innerHTML = "";
            selectionMenu.style.top = `${event.clientY}px`;
            selectionMenu.style.left = `${event.clientX}px`;
            selectionMenu.style.display = "block";

            // Récupération des éléments compatibles avec la zone
            const elementsCompatibles = window.exerciceData.diagrammeElements.filter(el => el.taille === tailleZone);

            console.log(`🔎 Éléments compatibles trouvés : ${elementsCompatibles.length}`);

            if (elementsCompatibles.length === 0) {
                selectionMenu.innerHTML = "<p>⚠️ Aucun élément disponible pour cette zone.</p>";
                return;
            }

            elementsCompatibles.forEach(element => {
                const button = document.createElement("button");
                button.className = "selection-button";
                button.textContent = element.nom;
                button.style.fontSize = "1.5vw"; 

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

function ajusterStylesSelectionMenu(selectionMenu) {
    if (!selectionMenu) return;

    console.log("🔄 Recalcul des styles du menu de sélection...");

    const zoomLevel = window.devicePixelRatio * 100;
    console.log(`🔍 Zoom actuel : ${zoomLevel}%`);

    selectionMenu.style.borderWidth = `${0.15 * (100 / zoomLevel)}em`;
    selectionMenu.style.padding = `${0.8 * (100 / zoomLevel)}em`;
    selectionMenu.style.boxShadow = `${0.2 * (100 / zoomLevel)}em ${0.2 * (100 / zoomLevel)}em ${0.8 * (100 / zoomLevel)}em rgba(0, 0, 0, 0.2)`;

    console.log(`📏 Nouvelle bordure : ${selectionMenu.style.borderWidth}, Padding : ${selectionMenu.style.padding}`);
}
