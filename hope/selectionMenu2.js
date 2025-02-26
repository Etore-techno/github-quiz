let lastClickedZone = null;

app.initSelectionMenu2 = function () {
    console.log("🚀 Initialisation du menu de sélection...");

    let selectionMenu2 = document.getElementById("selection-menu2");
    if (selectionMenu2) selectionMenu2.remove();

    selectionMenu2 = document.createElement("div");
    selectionMenu2.id = "selection-menu2";
    selectionMenu2.style.display = "none";
    
    document.body.appendChild(selectionMenu2);

    if (!window.exerciceData || !window.exerciceData.tableauElements) {
        console.error("❌ `window.exerciceData.tableauElements` est introuvable !");
        return;
    }

    document.querySelectorAll(".dropzone2").forEach(zone2 => {
        zone2.addEventListener("click", function (event) {
            lastClickedZone = zone2; // 🔥 Sauvegarde la dernière zone cliquée
            console.log(`📌 Zone cliquée : ${zone2.id}`);

            const colonneZone2 = zone2.getAttribute("data-colonne");
            if (!colonneZone2) {
                console.warn(`⚠️ La zone ${zone2.id} n'a pas d'attribut 'data-colonne' défini !`);
                return;
            }
            console.log(`🔍 Colonne détectée : ${colonneZone2}`);

            ajusterStylesSelectionMenu(selectionMenu2);


            selectionMenu2.innerHTML = "";
            selectionMenu2.style.display = "block"; // On affiche avant le calcul

            const colonneInt = parseInt(colonneZone2);
            const elementsCompatibles2 = window.exerciceData.tableauElements.filter(el => el.colonne === colonneInt);

            console.log(`🔎 Éléments compatibles trouvés pour colonne ${colonneInt} : ${elementsCompatibles2.length}`);

            if (elementsCompatibles2.length === 0) {
                selectionMenu2.innerHTML = "<p>⚠️ Aucun élément disponible pour cette zone.</p>";
                ajusterTailleEtPositionMenu(zone2, selectionMenu2);
                return;
            }

            // **1️⃣ Ajouter les réponses AVANT de mesurer la taille**
            elementsCompatibles2.forEach(element2 => {
                const button2 = document.createElement("button");
                button2.className = "selection-button2";
                button2.textContent = element2.nom;
                button2.style.fontSize = "3.5vw";
                

                button2.addEventListener("click", function () {
                    console.log(`✅ Élément sélectionné : ${element2.nom} → Zone: ${zone2.id}`);

                    zone2.innerHTML = "";

                    document.querySelectorAll(".dropzone2 span").forEach(placedEl => {
                        if (placedEl.textContent === element2.nom) {
                            console.log(`❌ Suppression de ${element2.nom} d'une autre zone`);
                            placedEl.remove();
                        }
                    });

                    const newText2 = document.createElement("span");
                    newText2.textContent = element2.nom;
                    zone2.appendChild(newText2);

                    mettreAJourPositionsElements2();

                    selectionMenu2.style.display = "none";
                });

            });

            // **2️⃣ Ajuster la taille du menu après avoir inséré les boutons**
             setTimeout(() => {
                 ajusterTailleEtPositionMenu(zone2, selectionMenu2, elementsCompatibles2);
             }, 0); // Permet au DOM de se mettre à jour avant de mesurer la taille

        });
    });
};

/**
 * 📌 **Ajuste la taille et la position du menu** :
 * - ✅ **Largeur min de 25vw** (ou plus si nécessaire)
 * - ✅ **Hauteur ajustée en fonction du contenu**
 * - ✅ **Position à droite ou à gauche selon l’espace**
 * - ✅ **Ne dépasse pas le bas du tableau**
 */
function ajusterTailleEtPositionMenu(zone2, selectionMenu2, elementsCompatibles2) {
    // ✅ Supprime le contenu précédent
    selectionMenu2.innerHTML = "";
    selectionMenu2.classList.remove("menu-auto-size"); // 🔄 Supprime l’ancienne classe

    // ✅ Ajout temporaire dans le DOM pour calculer la taille réelle
    document.body.appendChild(selectionMenu2);
    selectionMenu2.style.display = "block";
    selectionMenu2.style.whiteSpace = "normal"; // ✅ Permet le retour à la ligne si besoin
    selectionMenu2.style.position = "absolute";
     selectionMenu2.style.zIndex = "1000";

    // ✅ Ajout des boutons AVANT de mesurer la taille
    elementsCompatibles2.forEach(element2 => {
        const button2 = document.createElement("button");
        button2.className = "selection-button2";
        button2.textContent = element2.nom;
        
        const mode2 = detecterMode2();
        if (mode2 === "portrait") {
            button2.style.fontSize = "3vw";
        } else { button2.style.fontSize = "1.5vw";
        }

        selectionMenu2.appendChild(button2);

        button2.addEventListener("click", function () {
            console.log(`✅ Élément sélectionné : ${element2.nom} → Zone: ${zone2.id}`);

            zone2.innerHTML = "";

            document.querySelectorAll(".dropzone2 span").forEach(placedEl => {
                if (placedEl.textContent === element2.nom) {
                    console.log(`❌ Suppression de ${element2.nom} d'une autre zone`);
                    placedEl.remove();
                }
            });

            const newText2 = document.createElement("span");
            newText2.textContent = element2.nom;
            zone2.appendChild(newText2);

            mettreAJourPositionsElements2();

            selectionMenu2.style.display = "none";
        });
    });

    // ✅ Attendre que les boutons soient bien ajoutés avant de calculer la taille
    setTimeout(() => {
        selectionMenu2.classList.add("menu-auto-size"); // ✅ Applique la classe pour ajuster la hauteur
        selectionMenu2.style.height = "auto"; // ✅ Autorise la hauteur dynamique exacte
        ajusterLargeurMenu(selectionMenu2);
        // ✅ Recalcule la position après le redimensionnement
        setTimeout(() => repositionnerMenu(zone2, selectionMenu2), 10);
    }, 0);
}

function detecterMode2() {
    const largeur2 = window.innerWidth;
    const hauteur2 = window.innerHeight;
    const isMobile2 = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    return isMobile2 ? (hauteur2 > largeur2 ? "portrait" : "landscape") : "desktop";
}

function ajusterLargeurMenu(selectionMenu2) {
    if (!selectionMenu2) return;

    console.log("🔄 Ajustement de la largeur du menu en fonction des éléments et de l’écran...");

    const tableau = document.querySelector("#tableau-container img");
    if (!tableau) return;
    const menu = document.querySelector(".menu-auto-size");

    const mode = detecterMode2(); // Détecte si on est en portrait ou en paysage
    const screenWidth = window.innerWidth;
    const maxMenuWidth = mode === "portrait" ? screenWidth * 0.5 : screenWidth * 0.25; // 📌 50% en portrait, 25% sinon
    selectionMenu2.style.width = `${maxMenuWidth}px`; // 🔥 Applique directement
   
    menu.style.width = `${maxMenuWidth}px`; // 🔥 Applique directement
    
    console.log(`📏 Largeur ajustée : ${selectionMenu2.style.width} (Max: ${maxMenuWidth}px, Mode: ${mode})`);
}




function repositionnerMenu(zone2, selectionMenu2) {
    const rectZone = zone2.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const scrollY = window.scrollY; // ✅ Prend en compte le scroll vertical

    const tableau = document.querySelector("#tableau-container img");
    const tableauRect = tableau.getBoundingClientRect();
    const tableauBottom = tableauRect.bottom + scrollY; // ✅ Limite basse (bas du tableau)

    let posX = rectZone.right + 10;
    let posY = rectZone.top + (rectZone.height / 2) - (selectionMenu2.offsetHeight / 2) + scrollY;

    // ✅ Vérifier si le menu dépasse à droite
    if (posX + selectionMenu2.offsetWidth > windowWidth) {
        posX = rectZone.left - selectionMenu2.offsetWidth - 10;
    }

    // ✅ Vérifier si le menu dépasse en bas du tableau
    if (posY + selectionMenu2.offsetHeight > tableauBottom) {
        posY = tableauBottom - selectionMenu2.offsetHeight - 10;
    }

    // ✅ Vérifier si le menu dépasse en haut
    if (posY < scrollY) {
        posY = scrollY + 10;
    }

    selectionMenu2.style.left = `${posX}px`;
    selectionMenu2.style.top = `${posY}px`;

    ajusterStylesSelectionMenu(selectionMenu2);
}



function ajusterStylesSelectionMenu(selectionMenu2) {
    if (!selectionMenu2) return;

    console.log("🔄 Recalcul des styles du menu de sélection...");

    const zoomLevel = window.devicePixelRatio * 100;
    console.log(`🔍 Zoom actuel : ${zoomLevel}%`);

    selectionMenu2.style.borderWidth = `${0.15 * (100 / zoomLevel)}em`;
    selectionMenu2.style.padding = `${0.8 * (100 / zoomLevel)}em`;
    selectionMenu2.style.boxShadow = `${0.2 * (100 / zoomLevel)}em ${0.2 * (100 / zoomLevel)}em ${0.8 * (100 / zoomLevel)}em rgba(0, 0, 0, 0.2)`;

    console.log(`📏 Nouvelle bordure : ${selectionMenu2.style.borderWidth}, Padding : ${selectionMenu2.style.padding}`);
}

window.addEventListener("orientationchange", () => {
    const selectionMenu2 = document.getElementById("selection-menu2");
    if (selectionMenu2 && selectionMenu2.style.display === "block") {
        ajusterLargeurMenu(selectionMenu2);
        repositionnerMenu(lastClickedZone, selectionMenu2); // Utiliser une variable globale
    }
});


// ✅ Ferme le menu si l'utilisateur clique ailleurs
document.addEventListener("click", function (event) {
    const selectionMenu2 = document.getElementById("selection-menu2");
    
    if (!selectionMenu2 || selectionMenu2.style.display !== "block") return; // 🔹 Ne fait rien si le menu est déjà fermé
    
    const isClickInsideMenu = selectionMenu2.contains(event.target); // Vérifie si on clique dans le menu
    const isClickOnDropzone = event.target.classList.contains("dropzone2"); // Vérifie si on clique sur une zone

    if (!isClickInsideMenu && !isClickOnDropzone) {
        console.log("❌ Fermeture du menu (clic en dehors)");
        selectionMenu2.style.display = "none";
    }
});
