app.initSelectionMenu = function () {
    console.log("🚀 Initialisation du menu de sélection...");

    const selectionMenu = document.createElement("div");
    selectionMenu.id = "selection-menu";
    selectionMenu.style.display = "none";
    document.body.appendChild(selectionMenu);

    function afficherMenu(event, zone) {
        console.log(`📌 Zone cliquée : ${zone.id}`);

        selectionMenu.innerHTML = "";

        // Positionner le menu à côté de la zone
        selectionMenu.style.top = `${event.clientY}px`;
        selectionMenu.style.left = `${event.clientX}px`;
        selectionMenu.style.display = "block";

        // Récupération des éléments compatibles avec la zone
        const tailleZone = zone.getAttribute("data-taille");
        const elementsCompatibles = window.exerciceData.diagrammeElements.filter(el => el.taille === tailleZone);

        if (elementsCompatibles.length === 0) {
            selectionMenu.innerHTML = "<p>Aucun élément disponible</p>";
            return;
        }

        elementsCompatibles.forEach(element => {
            const button = document.createElement("button");
            button.className = "selection-button";
            button.textContent = element.nom;

            button.addEventListener("click", function () {
                console.log(`✅ Élément sélectionné : ${element.nom} → Zone: ${zone.id}`);

                // Supprimer un élément déjà placé
                zone.innerHTML = "";

                // Vérifier si l'élément est déjà placé ailleurs et le retirer
                document.querySelectorAll(".placed-element").forEach(placedEl => {
                    if (placedEl.id === element.id) {
                        console.log(`❌ Suppression de ${element.nom} d'une autre zone`);
                        placedEl.remove();
                    }
                });

                // Ajout de l'élément sélectionné
                const newElement = document.createElement("div");
                newElement.className = "placed-element";
                newElement.id = element.id;
                newElement.textContent = element.nom;
                zone.appendChild(newElement);

                // Enregistrement de la position
                window.app.positionsElements[element.id] = zone.id;

                // Fermeture du menu
                selectionMenu.style.display = "none";
            });

            selectionMenu.appendChild(button);
        });
    }

    // Ajouter les événements de clic après la création des zones
    document.addEventListener("click", (event) => {
        const zone = event.target.closest(".dropzone");
        if (zone) {
            afficherMenu(event, zone);
        } else if (!selectionMenu.contains(event.target)) {
            selectionMenu.style.display = "none";
        }
    });
};

// Exécuter après le chargement du diagramme
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        app.initSelectionMenu();
    }, 1000);
});
