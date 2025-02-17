// dragAndDropMouse.js - Gestion Drag and Drop (Souris)

window.app.initDragAndDropMouse = function () {
    console.log("🖱️ Initialisation du drag and drop avec la souris...");
    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(el => {
        el.addEventListener('mousedown', startDrag);
    });
};

let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let initialParent = null;

function startDrag(e) {
    e.preventDefault();
    draggedElement = e.target;

    if (!draggedElement.classList.contains('draggable')) return;

    // Calcul des offsets
    const rect = draggedElement.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Se rappeler du parent d'origine
    initialParent = draggedElement.parentNode;

    // Appliquer les styles nécessaires
    draggedElement.style.position = 'absolute';
    draggedElement.style.zIndex = '1000';

    // Déplacement initial
    moveElement(e);

    // Ajouter les écouteurs pour le déplacement et le relâchement
    document.addEventListener('mousemove', moveElement);
    document.addEventListener('mouseup', stopDrag);
}

function moveElement(e) {
    if (!draggedElement) return;

    // Calcul des nouvelles positions
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    // Mise à jour de la position
    draggedElement.style.left = `${x}px`;
    draggedElement.style.top = `${y}px`;
}

function stopDrag(e) {
    document.removeEventListener('mousemove', moveElement);
    document.removeEventListener('mouseup', stopDrag);

    // Vérifier si l'élément est déposé dans une zone
    let dropped = false;
    document.querySelectorAll('.dropzone').forEach(zone => {
        const zoneRect = zone.getBoundingClientRect();
        const elemRect = draggedElement.getBoundingClientRect();

        // Vérifier si le centre de l'élément est dans la zone
        const centerX = elemRect.left + elemRect.width / 2;
        const centerY = elemRect.top + elemRect.height / 2;

        if (centerX >= zoneRect.left && centerX <= zoneRect.right &&
            centerY >= zoneRect.top && centerY <= zoneRect.bottom) {

            if (!zone.hasChildNodes()) {
                zone.appendChild(draggedElement);
                draggedElement.style.position = 'relative';
                draggedElement.style.left = '0';
                draggedElement.style.top = '0';
                dropped = true;
            }
        }
    });

    // Si non déposé, retour à l'origine
    if (!dropped) {
        initialParent.appendChild(draggedElement);
        draggedElement.style.position = 'relative';
        draggedElement.style.left = '0';
        draggedElement.style.top = '0';
    }

    draggedElement = null;
}
