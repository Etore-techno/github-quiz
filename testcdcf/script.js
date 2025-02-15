document.addEventListener("DOMContentLoaded", () => {
    console.log("Script chargé");

    let etape = 1;
    let isDragging = false;
    let currentDraggedElement = null;
    let initialPosition = { x: 0, y: 0, parent: null };
    let scrollInterval = null;

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
            zoneElement.style.top = `${zone.top}px`;
            zoneElement.style.left = `${zone.left}px`;
            zoneElement.style.width = `${zone.width}px`;
            zoneElement.style.height = `${zone.height}px`;
    
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
            initialiserDragAndDrop();
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
    
    function initialiserDragAndDrop() {
        const draggables = document.querySelectorAll('.diagramme-draggable, .bougeable');
        const droppables = document.querySelectorAll('.diagramme-droppable, .tableau-droppable');
    
        let isDragging = false;
        let currentDraggedElement = null;
        let initialPosition = { x: 0, y: 0, parent: null };
        let scrollInterval = null;
    
        draggables.forEach((draggable, index) => {
            if (!draggable.id) {
                draggable.id = "draggable-" + index;
            }
            draggable.setAttribute("draggable", "true");
    
            // ✅ Début du drag (Sauvegarde de la position initiale)
            draggable.addEventListener("dragstart", function (event) {
                isDragging = true;
                currentDraggedElement = event.target;
                event.dataTransfer.setData("text", event.target.id);
                event.dataTransfer.effectAllowed = "move";
    
                // 🟢 Sauvegarde la position initiale de l'élément
                initialPosition.x = event.target.offsetLeft;
                initialPosition.y = event.target.offsetTop;
                initialPosition.parent = event.target.parentElement;
    
                setTimeout(() => {
                    event.target.style.opacity = "0.5";
                }, 0);
            });
    
            // ✅ Fin du drag (normal)
            draggable.addEventListener("dragend", function () {
                isDragging = false;
                if (currentDraggedElement) {
                    currentDraggedElement.style.opacity = "1";
                    currentDraggedElement = null;
                }
                clearInterval(scrollInterval);
            });
        });
    
        // ✅ Auto-scroll en haut ou en bas de la page
        document.addEventListener("dragover", function (event) {
            if (!isDragging || !currentDraggedElement) return;
    
            event.preventDefault();
            const scrollSpeed = 13;
            const scrollMargin = 150; // Zone de scroll augmentée (200px)
    
            const mouseY = event.clientY;
            const windowHeight = window.innerHeight;
    
            clearInterval(scrollInterval);
            if (mouseY < scrollMargin) {
                scrollInterval = setInterval(() => {
                    window.scrollBy(0, -scrollSpeed);
                }, 50);
            } else if (mouseY > windowHeight - scrollMargin) {
                scrollInterval = setInterval(() => {
                    window.scrollBy(0, scrollSpeed);
                }, 50);
            }
        });
    
        // ✅ Gestion des zones de dépôt
        droppables.forEach(droppable => {
            droppable.addEventListener("dragover", function (event) {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
            });
    
            droppable.addEventListener("drop", function (event) {
                event.preventDefault();
                if (!currentDraggedElement) return;
    
                const id = event.dataTransfer.getData("text");
                const draggedElement = document.getElementById(id);
    
                if (!draggedElement) {
                    console.warn("⚠ Aucun élément trouvé pour l'ID:", id);
                    return;
                }
    
                const existingElement = droppable.querySelector('.diagramme-draggable, .bougeable');
                if (existingElement) {
                    retournerElementDepart(existingElement);
                }
    
                droppable.appendChild(draggedElement);
                draggedElement.style.position = "relative";
                draggedElement.style.opacity = "1";
                currentDraggedElement = null;
                isDragging = false;
            });
        });
    
        // ✅ Empêcher le drop en dehors d'une zone valide
        document.addEventListener("drop", function (event) {
            if (!event.target.classList.contains('diagramme-droppable') &&
                !event.target.classList.contains('tableau-droppable')) {
                event.preventDefault();
                console.warn("⚠ Drop annulé : en dehors d'une zone valide.");
                if (currentDraggedElement) {
                    retournerElementDepart(currentDraggedElement);
                    currentDraggedElement.style.opacity = "1";
                    currentDraggedElement = null;
                    isDragging = false;
                }
            }
        });
    }

    
 // ✅ Fonction pour retourner l'élément à sa position d'origine
 function retournerElementDepart(element) {
    let containerDepart;

    if (etape === 1 && element.classList.contains("diagramme-draggable")) {
        containerDepart = document.getElementById("deplacables-diagramme-container");
    } else if (etape === 2 || etape === 3) {
        containerDepart = document.getElementById("deplacables-tableau-container");

        if (!element.classList.contains("bougeable")) {
            console.warn(`Correction : l'élément ${element.id} avait une classe incorrecte, on applique 'bougeable'.`);
            element.classList.remove("diagramme-draggable");
            element.classList.add("bougeable");
        }
    }

    if (containerDepart) {
        console.log(`🔄 Retour de l'élément ${element.id} dans ${containerDepart.id}`);

        if (!containerDepart.contains(element)) {
            containerDepart.appendChild(element);
        }

        // 🌟 Animation fluide du retour
        element.style.transition = "all 0.3s ease";
        element.style.position = "relative";
        element.style.left = "0px";
        element.style.top = "0px";

        setTimeout(() => {
            element.style.transition = "";
        }, 300);
    } else {
        console.error("⚠ Impossible de trouver le conteneur de retour pour l'élément :", element);
    }
}
    
    

    
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
    

    function activerDragAndDrop(zonesData, elementsData, deplacablesContainerId, messageId, validateButtonId) {
        const draggables = (etape === 1) 
            ? document.querySelectorAll(".diagramme-draggable") 
            : document.querySelectorAll(".bougeable");
    
        const droppables = (etape === 1) 
            ? document.querySelectorAll(".diagramme-droppable") 
            : document.querySelectorAll(".tableau-droppable");
    
        if (!droppables || droppables.length === 0) {
            console.error("Aucune zone de dépôt trouvée !");
            return;
        }
        if (!validateButtonId || validateButtonId === "") {
            console.error("⚠ Erreur : validateButtonId est vide !");
            return; // Stoppe la fonction pour éviter l'erreur
        }
        let validateButton = document.getElementById(validateButtonId);
        
        if (!validateButton) {
            console.error("Le bouton de validation n'a pas été trouvé !");
            return;
        }
    
        let correspondance = {};
        if (zonesData.length === elementsData.length) {
            zonesData.forEach((zone, index) => {
                correspondance[zone.id] = elementsData[index].id;
            });
        } else {
            console.error("⚠ Erreur : Le nombre de zones et d'éléments ne correspond pas.");
        }
    
        console.log("📌 Correspondance générée : ", correspondance);
    
        validateButton.replaceWith(validateButton.cloneNode(true)); // Supprime les anciens événements
        validateButton = document.getElementById(validateButtonId);

        validateButton.addEventListener("click", () => {
        if (validateButton.textContent === "Suivant") {
        // 🟢 Si on clique sur "Suivant", on change d'étape
        if (etape === 1) {
            modifierIDsElementsEtape1();
            etape = 2;
            chargerEtape();
        } else if (etape === 2) {
            modifierIDsElementsEtape2();
            etape = 3;
            chargerEtape();
        }else if (etape === 3) {
            modifierIDsElementsEtape3();
        }
        return; // On quitte la fonction après avoir changé d'étape
    }

    // 🟠 Si on est encore en mode "Valider"
    let correctCount = 0;
    let allPlaced = true;

    console.log("📌 Zones vérifiées : ", droppables);

    droppables.forEach(droppable => {
        let placedElement = droppable.querySelector(etape === 1 ? ".diagramme-draggable" : ".bougeable");

        console.log(`📌 Vérification zone ${droppable.id} : ${placedElement ? placedElement.id : "⚠ Vide"}`);

        if (!placedElement) {
            allPlaced = false;
            console.warn(`⚠ Zone ${droppable.id} est vide !`);
        } else {
            if (correspondance[droppable.id] === placedElement.id) {
                correctCount++;
            }
        }
    });

    const totalElements = Object.keys(correspondance).length;
    const message = document.getElementById(messageId);

    console.log(`✅ ${correctCount} / ${totalElements} éléments correctement placés.`);

    if (!allPlaced) {
        message.textContent = "Veuillez placer tous les éléments avant de valider.";
        message.style.color = "red";
        return;
    }

    if (correctCount === totalElements) {
        message.textContent = "Bravo ! Tous les éléments sont bien placés.";
        message.style.color = "green";

        // Désactiver les éléments
        draggables.forEach(draggable => {
            draggable.setAttribute("draggable", "false");
            draggable.style.cursor = "default";
        });

        // 🟢 Transformer le bouton "Valider" en "Suivant"
        validateButton.textContent = "Suivant";
        validateButton.style.backgroundColor = "#4CAF50";
        validateButton.style.color = "white";

    } else {
        message.textContent = `Vous avez ${correctCount} élément(s) bien placé(s) sur ${totalElements}.`;
        message.style.color = "orange";
    }
});




    }
    

    function activerRetourContainer(deplacablesContainerId) {
        const deplacablesContainer = document.getElementById(deplacablesContainerId);
    
        deplacablesContainer.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
    
        deplacablesContainer.addEventListener("drop", (event) => {
            event.preventDefault();
            const draggableId = event.dataTransfer.getData("text");
    
            if (!draggableId) return;
    
            const draggableElement = document.getElementById(draggableId);
            if (draggableElement) {
                if (etape === 1 && draggableElement.classList.contains("diagramme-draggable")) {
                    deplacablesContainer.appendChild(draggableElement);
                } else if (etape === 2 && draggableElement.classList.contains("bougeable")) {
                    deplacablesContainer.appendChild(draggableElement);
                } else if (etape === 3 && draggableElement.classList.contains("bougeable")) {
                    deplacablesContainer.appendChild(draggableElement);
                }
            }
        });
    }
    

    chargerEtape();
});
