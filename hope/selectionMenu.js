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
                const mode = detecterMode();
        if (mode === "portrait") {
            button.style.fontSize = "3vw";
        } else { button.style.fontSize = "1.5vw";
        }

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



    // 🔄 Mise à jour des positions après l'ajout d'un élément
    mettreAJourPositionsElements();

                    // Fermeture du menu
                    selectionMenu.style.display = "none";
                });

                selectionMenu.appendChild(button);
            });
        ajusterLargeurMenu(selectionMenu, zone);
        repositionnerMenu(zone, selectionMenu);
        });
    });
};

function detecterMode() {
    const largeur = window.innerWidth;
    const hauteur = window.innerHeight;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    return isMobile ? (hauteur > largeur ? "portrait" : "landscape") : "desktop";
}

function repositionnerMenu(zone, selectionMenu) {
    const rectZone = zone.getBoundingClientRect(); // 📌 Position de la zone
    const rectDiagramme = document.querySelector("#diagramme-container img").getBoundingClientRect(); // 📌 Position du tableau
    const scrollY = window.scrollY; // ✅ Prend en compte le scroll

    const menuWidth = selectionMenu.offsetWidth; // 📌 Largeur du menu
    const menuHeight = selectionMenu.offsetHeight; // 📌 Hauteur du menu

    // ✅ Calcul de la position initiale (menu centré sous la zone)
    let posX = rectZone.left + rectZone.width / 2 - menuWidth / 2;
    let posY = rectZone.bottom + 10 + scrollY; // 📌 10px en dessous de la zone

    // ✅ Vérifier si le menu dépasse en bas du tableau
    if (posY + menuHeight > rectDiagramme.bottom + scrollY) {
        posY = rectZone.top - menuHeight + scrollY - 10; // 📌 Place le menu au-dessus
    }

    // ✅ Vérifier si le menu touche le bord gauche du tableau
    if (posX < rectDiagramme.left) {
        posX = rectDiagramme.left; // 📌 Aligner à gauche du tableau
    }

    // ✅ Vérifier si le menu dépasse à droite du tableau
    if (posX + menuWidth > rectDiagramme.right) {
        posX = rectDiagramme.right - menuWidth; // 📌 Aligner à droite du tableau
    }

    // ✅ Appliquer les nouvelles positions
    selectionMenu.style.left = `${posX}px`;
    selectionMenu.style.top = `${posY}px`;

    ajusterStylesSelectionMenu(selectionMenu); // ✅ Appliquer les styles ajustés
}

function ajusterLargeurMenu(selectionMenu, zone) {
    if (!selectionMenu || !zone) return;

    console.log("🔄 Ajustement de la largeur du menu en fonction des éléments et de l’écran...");

    const diagramme = document.querySelector("#diagramme-container img");
    if (!diagramme) return;

    const mode = detecterMode(); // Détecte si on est en portrait ou en paysage
    const screenWidth = window.innerWidth;
    const tailleZone = zone.getAttribute("data-taille"); // 📌 Récupère la taille de la zone cliquée ("petite" ou "grande")

    // ✅ Définition des largeurs min et max selon le mode et la taille de la zone
    let minMenuWidth, maxMenuWidth;

    if (mode === "portrait") {
        minMenuWidth = (tailleZone === "grande") ? screenWidth * 0.45 : screenWidth * 0.25; // 40% si grande, 25% si petite
        maxMenuWidth = screenWidth * 0.50; // Max toujours 50% en portrait
    } else {
        minMenuWidth = (tailleZone === "grande") ? screenWidth * 0.25 : screenWidth * 0.15; // 25% si grande, 15% si petite
        maxMenuWidth = screenWidth * 0.25; // Max toujours 25% en landscape
    }

    // ✅ Appliquer les styles au menu
    selectionMenu.style.minWidth = `${minMenuWidth}px`;
    selectionMenu.style.maxWidth = `${maxMenuWidth}px`;

    console.log(`📏 Largeur ajustée : min = ${minMenuWidth}px, max = ${maxMenuWidth}px (Mode: ${mode}, Taille: ${tailleZone})`);
}

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
// ✅ Ferme le menu si l'utilisateur clique ailleurs
document.addEventListener("click", function (event) {
    const selectionMenu = document.getElementById("selection-menu");
    
    if (!selectionMenu || selectionMenu.style.display !== "block") return; // 🔹 Ne fait rien si le menu est déjà fermé
    
    const isClickInsideMenu = selectionMenu.contains(event.target); // Vérifie si on clique dans le menu
    const isClickOnDropzone = event.target.classList.contains("dropzone"); // Vérifie si on clique sur une zone

    if (!isClickInsideMenu && !isClickOnDropzone) {
        console.log("❌ Fermeture du menu (clic en dehors)");
        selectionMenu.style.display = "none";
    }
});