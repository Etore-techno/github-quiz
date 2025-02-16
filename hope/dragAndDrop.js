// dragAndDrop.js - Gestion des déplacements et dépôts compatibles desktop et mobile

app.initDragAndDrop = function () {
    document.querySelectorAll('.draggable').forEach(element => {
        // Desktop events
        element.addEventListener('mousedown', handleMouseDown);
        // Mobile events
        element.addEventListener('touchstart', handleTouchStart, { passive: false });
    });

    document.querySelectorAll('.dropzone').forEach(zone => {
        zone.addEventListener('dragover', (e) => e.preventDefault()); // Compatibilité desktop
        zone.addEventListener('drop', handleDrop);
    });
};

// Variables globales
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let startX = 0;
let startY = 0;

// 🖱️ Gestion de la souris (desktop)
function handleMouseDown(e) {
    e.preventDefault();
    draggedElement = e.target;

    // Calcul des décalages
    startX = e.clientX;
    startY = e.clientY;

    const rect = draggedElement.getBoundingClientRect();
    offsetX = startX - rect.left;
    offsetY = startY - rect.top;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

// 📱 Gestion tactile (mobile)
function handleTouchStart(e) {
    e.preventDefault();
    draggedElement = e.targetTouches[0].target;

    const touch = e.targetTouches[0];
    startX = touch.clientX;
    startY = touch.clientY;

    const rect = draggedElement.getBoundingClientRect();
    offsetX = startX - rect.left;
    offsetY = startY - rect.top;

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
}

// Déplacement à la souris
function handleMouseMove(e) {
    if (!draggedElement) return;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    draggedElement.style.position = 'absolute';
    draggedElement.style.left = `${x}px`;
    draggedElement.style.top = `${y}px`;
    draggedElement.style.zIndex = 1000;
}

// Déplacement tactile
function handleTouchMove(e) {
    if (!draggedElement) return;
    const touch = e.targetTouches[0];
    const x = touch.clientX - offsetX;
    const y = touch.clientY - offsetY;

    draggedElement.style.position = 'absolute';
    draggedElement.style.left = `${x}px`;
    draggedElement.style.top = `${y}px`;
    draggedElement.style.zIndex = 1000;
}

// Fin du déplacement à la souris
function handleMouseUp(e) {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    handleDropCheck(e.clientX, e.clientY);
}

// Fin du déplacement tactile
function handleTouchEnd(e) {
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    const touch = e.changedTouches[0];
    handleDropCheck(touch.clientX, touch.clientY);
}

// Vérifier si on est dans une zone de dépôt
function handleDropCheck(clientX, clientY) {
    if (!draggedElement) return;

    const zones = document.querySelectorAll('.dropzone');
    let dropped = false;

    zones.forEach(zone => {
        const rect = zone.getBoundingClientRect();
        if (
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom
        ) {
            // Vérifier si la zone est libre
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

    // Retourner à la position initiale si non déposé
    if (!dropped) {
        draggedElement.style.left = `${startX - offsetX}px`;
        draggedElement.style.top = `${startY - offsetY}px`;
    }

    draggedElement.style.zIndex = 1;
    draggedElement = null;
}

// Gestion du drop classique (drag&drop desktop)
function handleDrop(e) {
    e.preventDefault();
    const elementId = e.dataTransfer.getData('text/plain');
    const element = document.querySelector(`.draggable[data-id="${elementId}"]`);
    const zone = e.target.closest('.dropzone');

    if (!zone || !element) return;

    if (!zone.hasChildNodes()) {
        zone.appendChild(element);
        element.style.position = 'relative';
        element.style.left = '0px';
        element.style.top = '0px';
    } else {
        alert("❌ Zone déjà occupée !");
    }
}
