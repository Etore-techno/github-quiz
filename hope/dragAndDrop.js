// dragAndDrop.js - Drag-and-drop simplifié et fiable

app.initDragAndDrop = function () {
    document.querySelectorAll('.draggable').forEach(element => {
        // Événements souris
        element.addEventListener('mousedown', startDrag);
        // Événements tactiles
        element.addEventListener('touchstart', startDrag, { passive: false });
    });
};

// Variables globales
let draggedElement = null;

// 🎯 Démarrage du déplacement
function startDrag(e) {
    e.preventDefault();
    draggedElement = e.target;

    // Appliquer un style de suivi
    draggedElement.style.position = 'absolute';
    draggedElement.style.zIndex = 1000;

    // Gestion des événements en fonction du type d'interaction
    if (e.type === 'mousedown') {
        document.addEventListener('mousemove', moveElement);
        document.addEventListener('mouseup', stopDrag);
    } else if (e.type === 'touchstart') {
        document.addEventListener('touchmove', moveElement, { passive: false });
        document.addEventListener('touchend', stopDrag);
    }
}

// 🚚 Déplacement de l'élément
function moveElement(e) {
    let x, y;

    if (e.type === 'mousemove') {
        x = e.clientX;
        y = e.clientY;
    } else if (e.type === 'touchmove') {
        const touch = e.touches[0];
        x = touch.clientX;
        y = touch.clientY;
    }

    // Positionner directement sous le curseur/doigt
    draggedElement.style.left = `${x}px`;
    draggedElement.style.top = `${y}px`;
}

// 🛑 Arrêt du déplacement
function stopDrag(e) {
    if (e.type === 'mouseup') {
        document.removeEventListener('mousemove', moveElement);
        document.removeEventListener('mouseup', stopDrag);
    } else if (e.type === 'touchend') {
        document.removeEventListener('touchmove', moveElement);
        document.removeEventListener('touchend', stopDrag);
    }

    // Vérifier si on est au-dessus d'une zone de dépôt
    const dropZones = document.querySelectorAll('.dropzone');
    let dropped = false;

    dropZones.forEach(zone => {
        const zoneRect = zone.getBoundingClientRect();
        const elementRect = draggedElement.getBoundingClientRect();

        // Vérifier si l'élément est au centre de la zone
        const elementCenterX = elementRect.left + elementRect.width / 2;
        const elementCenterY = elementRect.top + elementRect.height / 2;

        if (
            elementCenterX >= zoneRect.left &&
            elementCenterX <= zoneRect.right &&
            elementCenterY >= zoneRect.top &&
            elementCenterY <= zoneRect.bottom
        ) {
            if (!zone.hasChildNodes()) {
                zone.appendChild(draggedElement);
                draggedElement.style.position = 'relative';
                draggedElement.style.left = '0px';
                draggedElement.style.top = '0px';
                dropped = true;
            } else {
                alert("❌ Zone déjà occupée !");
            }
        }
    });

    // Si non déposé, remettre à sa place d'origine
    if (!dropped) {
        draggedElement.style.position = 'relative';
        draggedElement.style.left = '0px';
        draggedElement.style.top = '0px';
    }

    draggedElement = null;
}
