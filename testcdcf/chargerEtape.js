function chargerEtape() {
    let zonesData, elementsData, containerId, deplacablesContainerId, messageId, validateButtonId;

    if (etape === 1) {
        console.log("Chargement de l'étape 1 : Diagramme...");
        zonesData = window.diagrammezone;
        elementsData = window.diagrammeElements;
        containerId = "diagramme-container";
        deplacablesContainerId = "deplacables-diagramme-container";
        messageId = "diagramme-message";
        validateButtonId = "validate-1-button";

        document.getElementById("diagramme-container").style.display = "block";
        document.getElementById("deplacables-diagramme-container").style.display = "flex";
        document.getElementById("tableau-container").style.display = "none";
        document.getElementById("deplacables-tableau-container").style.display = "none";
        const message = document.getElementById(messageId);
        message.textContent = "Déplacez les éléments de droite afin de compléter le diagramme :";
      
    } else if (etape === 2) {
        console.log("Chargement de l'étape 2 : Tableau...");
        zonesData = window.tableauzones1;
        elementsData = window.tableauElementsEtape1;
        containerId = "tableau-container-fonctions";
        deplacablesContainerId = "deplacables-tableau-container";
        messageId = "tableau-message";
        validateButtonId = "validate-2-button";

        document.getElementById("titre-2").style.display = "block";

        document.getElementById("diagramme-container").style.display = "block";
        document.getElementById("deplacables-diagramme-container").style.display = "none";
        document.getElementById("validate-1-button").style.display = "none";
        document.getElementById("validate-2-button").style.display = "block";

        document.getElementById("tableau-message").style.display = "block";
        const message = document.getElementById(messageId);
        message.textContent = "Replacez les fonctions dans le tableau :";
        document.getElementById("tableau-container").style.display = "block";
        document.getElementById("tableau-container-fonctions").style.display = "block";
        document.getElementById("tableau-container-criteres-niveaux").style.display = "none";

        document.getElementById("deplacables-tableau-container").style.display = "flex";

        // Réinitialiser les zones de dépôt avant l'étape 2
        document.querySelectorAll(".tableau-droppable").forEach(zone => {
            zone.innerHTML = "";
        });

        console.log("Zones de dépôt réinitialisées pour l'étape 2.");

    } else if (etape === 3) {
        console.log("Chargement de l'étape 3 : Tableau - Partie 2...");
        zonesData = window.tableauzones2;
        elementsData = window.tableauElementsEtape2;
        containerId = "tableau-container-criteres-niveaux";
        deplacablesContainerId = "deplacables-tableau-container";
        messageId = "tableau-message";
        validateButtonId = "validate-3-button"; 

        document.getElementById("deplacables-diagramme-container").style.display = "none";
        document.getElementById("validate-2-button").style.display = "none";
        document.getElementById("validate-3-button").style.display = "block";

        const message = document.getElementById(messageId);
        message.textContent = "Replacez les critères et les niveaux dans le tableau :";
        
        document.getElementById("tableau-container").style.display = "block";
        document.getElementById("tableau-container-criteres-niveaux").style.display = "block";

        document.getElementById("deplacables-tableau-container").style.display = "flex";
    }

    if (!zonesData || !elementsData) {
        console.error("Les données pour cette étape ne sont pas disponibles.");
        return;
    }

    console.log("Zones chargées:", zonesData);
    console.log("Éléments chargés:", elementsData);

    const container = document.getElementById(containerId);
    const deplacablesContainer = document.getElementById(deplacablesContainerId);

    container.querySelectorAll(".diagramme-droppable, .tableau-droppable").forEach(zone => zone.remove());
    deplacablesContainer.innerHTML = "";

    // Mélanger aléatoirement les éléments avant de les afficher
    let elementsDataShuffled = [...elementsData].sort(() => Math.random() - 0.5);

    // **🔴 Création des zones de dépôt avec vérification**
    zonesData.forEach(zone => {
        const zoneElement = document.createElement("div");

        // ✅ Ajout de la bonne classe selon l'étape
        if (etape === 1) {
            zoneElement.classList.add("diagramme-droppable");
        } else {
            zoneElement.classList.add("tableau-droppable");
        }

        zoneElement.id = zone.id;
        zoneElement.style.position = "absolute";
        zoneElement.style.top = `${zone.top}%`;
        zoneElement.style.left = `${zone.left}%`;
        zoneElement.style.width = `${zone.width}%`;
        zoneElement.style.height = `${zone.height}%`;

        container.appendChild(zoneElement);
    });

    // **🟢 Vérification que les zones de dépôt existent bien après leur création**
    setTimeout(() => {

        document.addEventListener("wheel", (event) => {
            if (isDragging || currentDraggedElement) {
                event.preventDefault();
                window.scrollBy(0, event.deltaY);
            }
        }, { passive: false });
        const allZones = document.querySelectorAll(etape === 1 ? ".diagramme-droppable" : ".tableau-droppable");
        console.log("📌 Vérification après création des zones :", allZones);

        if (allZones.length === 0) {
            console.error("⚠ Problème : Aucune zone de dépôt détectée après création !");
        } else {
            console.log(`✅ ${allZones.length} zones de dépôt créées avec succès.`);
        }

        // **🔵 Initialisation du Drag & Drop après la création des zones**
        initDragAndDrop();
        activerDragAndDrop(zonesData, elementsData, deplacablesContainerId, messageId, validateButtonId);
        activerRetourContainer(deplacablesContainerId);
    }, 100); // ✅ Petit délai pour s'assurer que le DOM est bien mis à jour

    // **🔴 Création des éléments déplaçables**
    elementsDataShuffled.forEach(element => {
        const elementDiv = document.createElement("div");

        // ✅ Vérifier l'étape pour attribuer la bonne classe
        if (etape === 1) {
            elementDiv.classList.add("diagramme-draggable");
        } else {
            elementDiv.classList.add("bougeable");
        }

        elementDiv.id = element.id;
        elementDiv.textContent = element.nom;
        elementDiv.setAttribute("draggable", "true");

        deplacablesContainer.appendChild(elementDiv);
    });
}