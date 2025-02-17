// dragAndDrop.js - Gestion avancée du drag-and-drop compatible desktop et mobile

app.initDragAndDrop = function () {
    document.querySelectorAll('.draggable').forEach(element => {
        // Gestion des événements souris
        element.addEventListener('mousedown', handleMouseDown);
        // Gestion des événements tactiles
        element.addEventListener('touchstart', handleTouchStart, { passive: false });
    });

    document.querySelectorAll('.dropzone').forEach(zone => {
        zone.addEventListener('dragover', (e) => e.preventDefault()); // Drag classique
        zone.addEventListener('drop', handleDrop);
    });
};

// Variables globales
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let startX = 0;
let startY = 0;

// 🖱️ Gestion souris
function handleMouseDown(e) {
    e.preventDefault();
    draggedElement = e.target;

    // Récupération des positions de départ
    const rect = draggedElement.getBoundingClientRect();
    const container = document.getElementById('diagramme-container') || document.getElementById('tableau-container');
    const containerRect = container.getBoundingClientRect();

    startX = e.clientX;
    startY = e.clientY;

    // Décalage en fonction du conteneur et non du document
    offsetX = startX - rect.left + containerRect.left;
    offsetY = startY - rect.top + containerRect.top;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

// 📱 Gestion tactile
function handleTouchStart(e) {
    e.preventDefault();
    draggedElement = e.target;

    const touch = e.targetTouches[0];
    const rect = draggedElement.getBoundingClientRect();
    const container = document.getElementById('diagramme-container') || document.getElementById('tableau-container');
    const containerRect = container.getBoundingClientRect();

    startX = touch.clientX;
    startY = touch.clientY;

    // Ajustement par rapport au conteneur
    offsetX = startX - rect.left + containerRect.left;
    offsetY = startY - rect.top + containerRect.top;

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
}

// 🚚 Déplacement souris
function handleMouseMove(e) {
    if (!draggedElement) return;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    draggedElement.style.position = 'absolute';
    draggedElement.style.left = `${x}px`;
    draggedElement.style.top = `${y}px`;
    draggedElement.style.zIndex = 1000;
}

// 📱 Déplacement tactile
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

// 🎯 Fin déplacement souris
function handleMouseUp(e) {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    handleDropCheck(e.clientX, e.clientY);
}

// 🎯 Fin déplacement tactile
function handleTouchEnd(e) {
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
    const touch = e.changedTouches[0];
    handleDropCheck(touch.clientX, touch.clientY);
}

// 🎯 Vérification du dépôt
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
        draggedElement.style.left = `${startX - offsetX}px`;
        draggedElement.style.top = `${startY - offsetY}px`;
    }

    draggedElement.style.zIndex = 1;
    draggedElement = null;
}

// 🎯 Gestion du `drop` (drag classique desktop)
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
