// dragAndDropMouse.js - Drag-and-Drop avec gestion avancée et logs détaillés

app.initDragAndDropMouse = function () {
    const container = document.getElementById('deplacables-diagramme-container');

    console.log("🚀 Initialisation du drag-and-drop...");

    interact('.draggable').draggable({
        inertia: true,
        autoScroll: true,
        listeners: {
            start(event) {
                const target = event.target;
                console.log(`🎯 Début du déplacement : ${target.id}`);
                target.classList.add('draggable-moving');
            },
            move(event) {
                const target = event.target;
                let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);

                console.log(`🔄 Déplacement : ${target.id} → x: ${x}, y: ${y}`);
            },
            end(event) {
                event.target.classList.remove('draggable-moving');

                const target = event.target;
                const targetRect = target.getBoundingClientRect();

                console.log(`🛑 Fin du déplacement : ${target.id}, Vérification des zones...`);

                const zones = document.querySelectorAll('.dropzone');
                let droppedInZone = false;

                zones.forEach(zone => {
                    const zoneRect = zone.getBoundingClientRect();
                    const zoneTaille = zone.getAttribute('data-taille');
                    const elementTaille = target.getAttribute('data-taille');

                    const overlapX = Math.max(0, Math.min(targetRect.right, zoneRect.right) - Math.max(targetRect.left, zoneRect.left));
                    const overlapY = Math.max(0, Math.min(targetRect.bottom, zoneRect.bottom) - Math.max(targetRect.top, zoneRect.top));
                    const overlapArea = overlapX * overlapY;
                    const targetArea = targetRect.width * targetRect.height;

                    const overlapRatio = overlapArea / targetArea;

                    console.log(`🧐 Zone : ${zone.id}, Overlap: ${(overlapRatio * 100).toFixed(2)}%, Taille: ${zoneTaille}, Élément: ${elementTaille}`);

                    if (overlapRatio > 0.5 && zoneTaille === elementTaille && !zone.hasChildNodes()) {
                        console.log(`✅ Placement réussi : ${target.id} → ${zone.id}`);
                        zone.appendChild(target);
                        target.style.transform = "translate(0,0)";
                        target.setAttribute('data-x', 0);
                        target.setAttribute('data-y', 0);
                        window.app.positionsElements[target.id] = zone.id;
                        droppedInZone = true;
                    }
                });

                if (!droppedInZone) {
                    console.warn(`⚠️ Aucune zone valide trouvée. Retour au conteneur...`);
                    container.appendChild(target);
                    target.style.transform = "translate(0,0)";
                    target.setAttribute('data-x', 0);
                    target.setAttribute('data-y', 0);
                    window.app.positionsElements[target.id] = container.id;
                }

                app.reorganiserContainer(container);
            }
        }
    });

    app.reorganiserContainer(container);

    app.verifierPositions = function () {
        const correctPositions = {
            "element-1": "zone-1",
            "element-2": "zone-2",
            "element-3": "zone-3",
            "element-4": "zone-4",
            "element-5": "zone-5",
            "element-6": "zone-6",
            "element-7": "zone-7",
            "element-8": "zone-8"
        };

        let correct = true;
        for (const [element, zone] of Object.entries(correctPositions)) {
            const currentPosition = window.app.positionsElements[element];
            console.log(`🔍 Vérification : ${element} → attendu: ${zone}, trouvé: ${currentPosition}`);
            if (currentPosition !== zone) {
                correct = false;
            }
        }

        if (correct) {
            alert('✅ Tous les éléments sont correctement placés !');
        } else {
            alert('⚠️ Certains éléments ne sont pas bien placés.');
        }
    };
};

window.app.positionsElements = {};
