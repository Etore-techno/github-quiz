// dragAndDrop.js - Drag-and-drop mobile/desktop sans confinement

app.initDragAndDrop = function () {
    document.querySelectorAll('.draggable').forEach(element => {
        element.classList.add('draggable-start');
        element.addEventListener('mousedown', startDrag);
        element.addEventListener('touchstart', startDrag, { passive: false });
    });
};

let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let initialParent = null;
let initialPosition = { top: 0, left: 0 };

// 🟢 Démarrage du drag
function startDrag(e) {
    e.preventDefault();
    draggedElement = e.target;

    // Calcul de l'offset par rapport au curseur
    const rect = draggedElement.getBoundingClientRect();
    initialPosition = { top: rect.top, left: rect.left };
    initialParent = draggedElement.parentNode;

    // Calculer les offsets
    if (e.type === 'mousedown') {
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener('mousemove', moveElement);
        document.addEventListener('mouseup', stopDrag);
    } else if (e.type === 'touchstart') {
        const touch = e.touches[0];
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        document.addEventListener('touchmove', moveElement, { passive: false });
        document.addEventListener('touchend', stopDrag);
    }

    // Déplacer temporairement dans le body
    document.body.appendChild(draggedElement);
    draggedElement.classList.remove('draggable-start');
    draggedElement.classList.add('draggable-moving');

    // Appliquer position absolue et aligner sous le curseur
    draggedElement.style.position = 'absolute';
    moveElement(e);
}

// 🚚 Déplacement en cours
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

    // Déplacer l'élément sous le curseur
    draggedElement.style.left = `${x - offsetX}px`;
    draggedElement.style.top = `${y - offsetY}px`;
}

// 🛑 Fin du drag
function stopDrag(e) {
    if (e.type === 'mouseup') {
        document.removeEventListener('mousemove', moveElement);
        document.removeEventListener('mouseup', stopDrag);
    } else if (e.type === 'touchend') {
        document.removeEventListener('touchmove', moveElement);
        document.removeEventListener('touchend', stopDrag);
    }

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
                draggedElement.classList.remove('draggable-moving');
                draggedElement.classList.add('draggable-dropped');
                draggedElement.style.position = 'relative';
                draggedElement.style.left = '0px';
                draggedElement.style.top = '0px';
                dropped = true;
            } else {
                alert("❌ Zone déjà occupée !");
            }
        }
    });

    // Si non déposé, retour au container initial
    if (!dropped) {
        initialParent.appendChild(draggedElement);
        draggedElement.classList.remove('draggable-moving');
        draggedElement.classList.add('draggable-start');
        draggedElement.style.position = 'relative';
        draggedElement.style.left = '0px';
        draggedElement.style.top = '0px';
    }

    draggedElement = null;
}
