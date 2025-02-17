// dragAndDrop.js - Drag-and-drop centré sous le curseur

app.initDragAndDrop = function () {
    document.querySelectorAll('.draggable').forEach(element => {
        element.addEventListener('mousedown', startDrag);
        element.addEventListener('touchstart', startDrag, { passive: false });
    });
};

// Variables globales
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

// 🛠️ Démarrage du déplacement
function startDrag(e) {
    e.preventDefault();
    draggedElement = e.target;

    const rect = draggedElement.getBoundingClientRect();

    // Calcul de l'offset pour centrer sous le curseur/doigt
    if (e.type === 'mousedown') {
        offsetX = e.clientX - rect.left - rect.width / 2;
        offsetY = e.clientY - rect.top - rect.height / 2;
        document.addEventListener('mousemove', moveElement);
        document.addEventListener('mouseup', stopDrag);
    } else if (e.type === 'touchstart') {
        const touch = e.touches[0];
        offsetX = touch.clientX - rect.left - rect.width / 2;
        offsetY = touch.clientY - rect.top - rect.height / 2;
        document.addEventListener('touchmove', moveElement, { passive: false });
        document.addEventListener('touchend', stopDrag);
    }

    draggedElement.style.position = 'absolute';
    draggedElement.style.zIndex = 1000;
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

    // Centrer l'élément sous le curseur
    draggedElement.style.left = `${x - offsetX}px`;
    draggedElement.style.top = `${y - offsetY}px`;
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

    // Vérifier si l'élément est au-dessus d'une zone de dépôt
    const dropZones = document.querySelectorAll('.dropzone');
    let dropped = false;

    dropZones.forEach(zone => {
        const zoneRect = zone.getBoundingClientRect();
        const elementRect = draggedElement.getBoundingClientRect();

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

    // Retour à la position initiale si non déposé
    if (!dropped) {
        draggedElement.style.position = 'relative';
        draggedElement.style.left = '0px';
        draggedElement.style.top = '0px';
    }

    draggedElement = null;
}
