document.addEventListener("DOMContentLoaded", () => {
    console.log("Script chargé");

    etape = 1;
    isDragging = false;
    currentDraggedElement = null;
    initialPosition = { x: 0, y: 0, parent: null };
    scrollInterval = null;

   


    

    

    chargerEtape();
});
