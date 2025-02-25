// main.js - Initialisation de l'exercice avec la nouvelle interaction

window.app = window.app || {};
window.app.positionsElements = {}; // Stockage des positions des éléments


// 📌 Initialisation des réponses attendues pour le diagramme
window.app.reponsesAttendues = {};

function initialiserReponsesAttendues() {
    if (!window.exerciceData || !window.exerciceData.diagrammezone || !window.exerciceData.diagrammeElements) {
        console.error("❌ Erreur : Les données de l'exercice ne sont pas encore chargées !");
        return;
    }

    if (window.exerciceData.diagrammezone.length === window.exerciceData.diagrammeElements.length) {
        window.exerciceData.diagrammezone.forEach((zone, index) => {
            let element = window.exerciceData.diagrammeElements[index];
            if (element) {
                window.app.reponsesAttendues[zone.id] = element.nom;
            }
        });

        console.log("✅ Réponses attendues chargées :", window.app.reponsesAttendues);
    } else {
        console.error("❌ Problème : Le nombre de zones et d'éléments ne correspond pas !");
    }
}

// Appel de l'initialisation après le chargement des données
window.addEventListener("DOMContentLoaded", () => {
    initialiserReponsesAttendues();
});



window.addEventListener("DOMContentLoaded", () => {
    const diagrammeImage = document.querySelector("#diagramme-container img");

    function attendreChargement(callback) {
        let tentatives = 0;
        const verifier = () => {
            const rect = diagrammeImage.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                callback();
            } else if (tentatives < 20) {
                tentatives++;
                requestAnimationFrame(verifier);
            }
        };
        verifier();
    }

    if (diagrammeImage.complete) {
        attendreChargement(demarrerExercices);
    } else {
        diagrammeImage.addEventListener('load', () => attendreChargement(demarrerExercices));
    }

    function demarrerExercices() {
        setTimeout(() => {
            app.setupDiagramme();

            app.setupTableau();


            console.log("✅ Exercices prêts !");
        }, 500);
    }

    document.getElementById("validate-1-button").addEventListener("click", () => {
        verifierReponses();
    });
});



function detecterMode() {
    const largeur = window.innerWidth;
    const hauteur = window.innerHeight;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    return isMobile ? (hauteur > largeur ? "portrait" : "landscape") : "desktop";
}

function detecterMode2() {
    const largeur2 = window.innerWidth;
    const hauteur2 = window.innerHeight;
    const isMobile2 = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    return isMobile2 ? (hauteur2 > largeur2 ? "portrait" : "landscape") : "desktop";
}

// 📌 Fonction pour mettre à jour la liste des éléments placés
function mettreAJourPositionsElements() {
    window.app.positionsElements = {}; // Réinitialisation de la liste des positions

    document.querySelectorAll(".dropzone").forEach(zone => {
        let elementPlace = zone.querySelector("span"); // On récupère l'élément placé
        if (elementPlace) {
            let nomElement = elementPlace.textContent.trim(); // Nom de l'élément
            window.app.positionsElements[zone.id] = nomElement; // On stocke l'élément avec son ID de zone
        }
    });

    console.log("📌 Mise à jour des éléments placés :", window.app.positionsElements);
}
 

// 📌 Fonction pour mettre à jour la liste des éléments placés
function mettreAJourPositionsElements2() {
    window.app.positionsElements2 = {}; // Réinitialisation de la liste des positions

    document.querySelectorAll(".dropzone2").forEach(zone2 => {
        let elementPlace2 = zone2.querySelector("span"); // On récupère l'élément placé
        if (elementPlace2) {
            let nomElement2 = elementPlace2.textContent.trim(); // Nom de l'élément
            window.app.positionsElements2[zone2.id] = nomElement2; // On stocke l'élément avec son ID de zone
        }
    });

    console.log("📌 Mise à jour des éléments placés :", window.app.positionsElements2);
}


// 📌 Fonction de validation des réponses
function verifierReponses() {
    if (!window.app.reponsesAttendues || Object.keys(window.app.reponsesAttendues).length === 0) {
        console.error("❌ Les réponses attendues ne sont pas disponibles !");
        return;
    }

    mettreAJourPositionsElements();

    let totalZones = Object.keys(window.app.reponsesAttendues).length;
    let reponsesCorrectes = 0;
    let reponsesPlacees = Object.keys(window.app.positionsElements).length;

    console.log("📊 Début de la vérification des réponses...");

    Object.keys(window.app.positionsElements).forEach(zoneId => {
        let nomElement = window.app.positionsElements[zoneId];
        let reponseAttendue = window.app.reponsesAttendues[zoneId];

        if (reponseAttendue && nomElement === reponseAttendue) {
            reponsesCorrectes++;
        } else {
            console.warn(`❌ Mauvaise réponse dans ${zoneId}. Attendu : ${reponseAttendue}, trouvé : ${nomElement}`);
        }
    });

    let message = document.getElementById("diagramme-message");
    let boutonValidation = document.getElementById("validate-1-button");

    if (reponsesPlacees === totalZones && reponsesCorrectes === totalZones) {
        message.textContent = "✅ Bravo ! Toutes les réponses sont correctes.";
        message.style.color = "green";

        // 🔹 Transformation du bouton "Valider" en "Suivant"
        boutonValidation.textContent = "Suivant";
        boutonValidation.style.backgroundColor = "#28a745"; // Vert succès
        boutonValidation.style.color = "white";
        boutonValidation.onclick = passerEtapeSuivante;

        // 🔹 Désactiver les zones (supprime bordures et interactions)
        document.querySelectorAll(".dropzone").forEach(zone => {
            zone.style.border = "none";
            zone.style.backgroundColor = "transparent";
            zone.style.pointerEvents = "none"; // Désactive le clic
        });

    } else if (reponsesPlacees < totalZones) {
        message.textContent = `⚠️ Il manque ${totalZones - reponsesPlacees} réponses à placer.`;
        message.style.color = "orange";
    } else {
        message.textContent = `❌ Certaines réponses sont incorrectes. Vous avez ${reponsesCorrectes} bonnes réponses sur ${totalZones}.`;
        message.style.color = "red";
    }

    console.log(`📊 Validation complète : ${reponsesCorrectes} bonnes réponses / ${reponsesPlacees} placées sur ${totalZones} attendues.`);
}

// 📌 Fonction qui sera appelée lorsqu'on clique sur "Suivant"
function passerEtapeSuivante() {
    console.log("➡️ Passage à l'étape suivante...");
    // Ajoute ici ce que tu veux faire quand on passe à l'étape suivante (redirection, affichage d'un autre exercice...)
}

// 📌 Ajoute l'événement sur le bouton de validation
document.getElementById("validate-1-button").addEventListener("click", verifierReponses);
