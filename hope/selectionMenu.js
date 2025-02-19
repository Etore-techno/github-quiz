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
