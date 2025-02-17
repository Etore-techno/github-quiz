// dragAndDropMouse.js - Drag-and-Drop sécurisé pour le diagramme

app.initDragAndDropMouse = function () {
    document.querySelectorAll('.draggable').forEach(element => {
        element.addEventListener('pointerdown', startDrag);
    });
};

let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let initialParent = null;

// 🟢 Début du drag
function startDrag(e) {
    e.preventDefault();
    draggedElement = e.target;
    if (!draggedElement.classList.contains('draggable')) return;

    initialParent = draggedElement.parentNode;
    const container = document.querySelector('.main-container');
    const containerRect = container.getBoundingClientRect();
    const elementRect = draggedElement.getBoundingClientRect();

    offsetX = e.clientX - elementRect.left + containerRect.left;
    offsetY = e.clientY - elementRect.top + containerRect.top;

    draggedElement.style.position = 'absolute';
    draggedElement.style.zIndex = 1000;
    draggedElement.style.pointerEvents = 'none';

    moveElement(e);

    document.addEventListener('pointermove', moveElement);
    document.addEventListener('pointerup', stopDrag);
}

// 🚚 Déplacement en cours
function moveElement(e) {
    if (!draggedElement) return;

    const container = document.querySelector('.main-container');
    const containerRect = container.getBoundingClientRect();

    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

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

                // 🧠 Mise à jour de la position
                window.app.diagrammePositions[draggedElement.id] = zone.id;
                console.log(`✅ ${draggedElement.id} placé dans ${zone.id}`);
            }
        }
    });

    // 🔙 Retour au conteneur d'origine si nécessaire
    if (!dropped) {
        initialParent.appendChild(draggedElement);
        draggedElement.style.position = 'relative';
        draggedElement.style.left = '0px';
        draggedElement.style.top = '0px';

        window.app.diagrammePositions[draggedElement.id] = initialParent.id;
        console.log(`↩️ ${draggedElement.id} remis dans ${initialParent.id}`);
    }

    draggedElement.style.pointerEvents = 'auto';
    draggedElement = null;

    // 🖨️ Afficher les positions actuelles
    window.app.logDiagrammePositions();
}
