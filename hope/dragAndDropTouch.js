// dragAndDropTouch.js - Drag and Drop pour les écrans tactiles

app.initDragAndDrop = function () {
    document.querySelectorAll('.draggable').forEach(element => {
        element.addEventListener('touchstart', startDrag, { passive: false });
    });
};

let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let initialParent = null;

function startDrag(e) {
    e.preventDefault();
    draggedElement = e.target;
    initialParent = draggedElement.parentNode;

    const rect = draggedElement.getBoundingClientRect();
    const touch = e.touches[0];

    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;

    draggedElement.style.position = 'absolute';
    draggedElement.style.zIndex = 1000;

    document.addEventListener('touchmove', moveElement, { passive: false });
    document.addEventListener('touchend', stopDrag);
}

function moveElement(e) {
    const touch = e.touches[0];
    draggedElement.style.left = `${touch.clientX - offsetX}px`;
    draggedElement.style.top = `${touch.clientY - offsetY}px`;
}

function stopDrag() {
    document.removeEventListener('touchmove', moveElement);
    document.removeEventListener('touchend', stopDrag);

    let dropped = false;
    document.querySelectorAll('.dropzone').forEach(zone => {
        const zoneRect = zone.getBoundingClientRect();
        const elemRect = draggedElement.getBoundingClientRect();

        const centerX = elemRect.left + elemRect.width / 2;
        const centerY = elemRect.top + elemRect.height / 2;

        if (
            centerX >= zoneRect.left &&
            centerX <= zoneRect.right &&
            centerY >= zoneRect.top &&
            centerY <= zoneRect.bottom
        ) {
            if (!zone.hasChildNodes()) {
                zone.appendChild(draggedElement);
                draggedElement.style.position = 'relative';
                draggedElement.style.left = '0px';
                draggedElement.style.top = '0px';
                dropped = true;
            }
        }
    });

    if (!dropped) {
        initialParent.appendChild(draggedElement);
        draggedElement.style.position = 'relative';
        draggedElement.style.left = '0px';
        draggedElement.style.top = '0px';
    }
}
