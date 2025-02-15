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