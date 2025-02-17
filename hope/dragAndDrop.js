// dragAndDrop.js - Gestion du Drag and Drop amélioré

app.initDragAndDrop = function () {
    document.querySelectorAll('.draggable').forEach(element => {
        element.addEventListener('pointerdown', startDrag);
    });
};

let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let initialParent = null;
let container = null;

// 🟢 Démarrage du drag
function startDrag(e) {
    e.preventDefault();
    draggedElement = e.target;
    if (!draggedElement.classList.contains('draggable')) return;

    initialParent = draggedElement.parentNode;
    container = document.querySelector('.main-container');

    const containerRect = container.getBoundingClientRect();
    const elementRect = draggedElement.getBoundingClientRect();

    offsetX = e.clientX - elementRect.left;
    offsetY = e.clientY - elementRect.top;

    // Appliquer un style temporaire pendant le déplacement
    draggedElement.style.position = 'absolute';
    draggedElement.style.zIndex = 1000;
    draggedElement.style.pointerEvents = 'none';

    moveElement(e);

    document.addEventListener('pointermove', moveElement);
    document.addEventListener('pointerup', stopDrag);
}

// 🚚 Déplacement de l'élément
function moveElement(e) {
    if (!draggedElement) return;

    const containerRect = container.getBoundingClientRect();

    let x = e.clientX - offsetX - containerRect.left;
    let y = e.clientY - offsetY - containerRect.top;

    // Appliquer les nouvelles positions
    draggedElement.style.left = `${x}px`;
    draggedElement.style.top = `${y}px`;
}

// 🛑 Fin du drag
function stopDrag(e) {
    document.removeEventListener('pointermove', moveElement);
    document.removeEventListener('pointerup', stopDrag);

    let dropped = false;
    document.querySelectorAll('.dropzone').forEach(zone => {
        const zoneRect = zone.getBoundingClientRect();
        const elemRect = draggedElement.getBoundingClientRect();

        const elemCenterX = elemRect.left + elemRect.width / 2;
        const elemCenterY = elemRect.top + elemRect.height / 2;

        if (
            elemCenterX >= zoneRect.left &&
            elemCenterX <= zoneRect.right &&
            elemCenterY >= zoneRect.top &&
            elemCenterY <= zoneRect.bottom
        ) {
            if (!zone.hasChildNodes()) {
                zone.appendChild(draggedElement);
                draggedElement.classList.remove('draggable-moving');
                draggedElement.classList.add('draggable-dropped');
                draggedElement.style.position = 'relative';
                draggedElement.style.left = '0px';
                draggedElement.style.top = '0px';
                dropped = true;
            }
        }
    });

    // Retour au container d'origine si non déposé
    if (!dropped) {
        initialParent.appendChild(draggedElement);
        draggedElement.style.position = 'relative';
        draggedElement.style.left = '0px';
        draggedElement.style.top = '0px';
    }

    // Rétablir les interactions normales
    draggedElement.style.pointerEvents = 'auto';
    draggedElement = null;
}
