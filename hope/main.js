// main.js - Initialisation de l'exercice avec la nouvelle interaction

window.app = window.app || {};

window.app.etape = "1";


window.app.positionsElementsDiagramme = {}; // Stockage des positions des éléments
window.app.reponsesAttenduesDiagramme = {};

window.app.positionsElementsTableau = {}; // Stockage des positions des éléments
window.app.reponsesAttenduesTableau1 = {};
window.app.reponsesAttenduesTableau2 = {};
window.app.reponsesAttenduesTableau3 = {};

function initialiserReponsesAttendues() {
    if (!window.exerciceData || !window.exerciceData.diagrammezone || !window.exerciceData.diagrammeElements) {
        console.error("❌ Erreur : Les données de l'exercice ne sont pas encore chargées !");
        return;
    }

    // 🔹 Initialisation des réponses attendues pour le diagramme
    if (window.exerciceData.diagrammezone.length === window.exerciceData.diagrammeElements.length) {
        window.app.reponsesAttenduesDiagramme = {};
        window.exerciceData.diagrammezone.forEach((zone, index) => {
            let element = window.exerciceData.diagrammeElements[index];
            if (element) {
                window.app.reponsesAttenduesDiagramme[zone.id] = element.nom;
            } else {
                console.error("❌ Problème : Le nombre de zones et d'éléments ne correspond pas !");
            }
        });
        console.log("✅ Réponses attendues chargées :", window.app.reponsesAttenduesDiagramme);
    }

    // 🔹 Initialisation des réponses attendues pour le tableau
    window.app.reponsesAttenduesTableau1 = {}; 
    window.app.reponsesAttenduesTableau2 = {}; 
    window.app.reponsesAttenduesTableau3 = {}; 

    window.exerciceData.tableauElements.forEach(element => {
        let colonne = element.colonne;
        let zoneId = element.id.replace("element-", "fonction-"); // ✅ Correction ici
    
        if (colonne === 1) {
            window.app.reponsesAttenduesTableau1[zoneId] = element.nom;
        } else if (colonne === 2) {
            window.app.reponsesAttenduesTableau2[zoneId] = element.nom;
        } else if (colonne === 3) {
            window.app.reponsesAttenduesTableau3[zoneId] = element.nom;
        } else {
            console.warn(`⚠️ Élément avec ID "${element.id}" a une colonne inconnue (${colonne}) !`);
        }
    });
    

    console.log("✅ Réponses attendues pour le tableau - Colonne 1 :", window.app.reponsesAttenduesTableau1);
    console.log("✅ Réponses attendues pour le tableau - Colonne 2 :", window.app.reponsesAttenduesTableau2);
    console.log("✅ Réponses attendues pour le tableau - Colonne 3 :", window.app.reponsesAttenduesTableau3);
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

            console.log("✅ Exercices prêts !");
        }, 500);
    }

    document.getElementById("validate-1-button").addEventListener("click", () => {
        const button = document.getElementById("validate-1-button")
        if (button.innerHTML = "Valider") {
            verifierReponsesDiagramme();
         } else {
            passerEtapesuivante();
         } 
    });
    document.getElementById("validate-2-button").addEventListener("click", () => {
        const button = document.getElementById("validate-2-button")
        if (button.innerHTML = "Valider") {
            verifierReponsesTableau();
         } else {
            passerEtapesuivante();
         } 
    });


});

// 📌 Fonction pour mettre à jour la liste des éléments placés
function mettreAJourListePositionsDiagramme() {
    window.app.positionsElementsDiagramme = {}; // Réinitialisation de la liste des positions

    document.querySelectorAll(".dropzone").forEach(zone => {
        let elementPlace = zone.querySelector("span"); // On récupère l'élément placé
        if (elementPlace) {
            let nomElement = elementPlace.textContent.trim(); // Nom de l'élément
            window.app.positionsElementsDiagramme[zone.id] = nomElement; // On stocke l'élément avec son ID de zone
        }
    });

    console.log("📌 Mise à jour des éléments placés :", window.app.positionsElementsDiagramme);
}
 
function mettreAJourListePositionsTableau() {
    window.app.positionsElementsTableau = {}; // Réinitialisation de la liste des positions

    document.querySelectorAll(".dropzone2").forEach(zone => {
        // 📌 Vérification de l'étape actuelle
 let etapeActuelle = parseInt(window.app.etape); // Convertir en nombre pour éviter des erreurs
 let colonneZone = parseInt(zone.getAttribute("data-colonne")); // 🔥 Prendre `data-colonne` correctement
         // ✅ Vérifier si la zone appartient à l'étape actuelle
         if (
            (etapeActuelle === 2 && colonneZone === 1) ||
            (etapeActuelle === 3 && colonneZone === 2) ||
            (etapeActuelle === 4 && colonneZone === 3)
        ) {    
                
        let elementPlace = zone.querySelector("span"); // On récupère l'élément placé
        if (elementPlace) {
            let nomElement = elementPlace.textContent.trim();
            let zoneId = zone.id;
                        window.app.positionsElementsTableau[zoneId] = nomElement;
        }
    }
    });

    console.log("📌 Mise à jour des éléments placés :", window.app.positionsElementsTableau);
}
// 📌 Fonction de validation des réponses
function verifierReponsesDiagramme() {
    if (!window.app.reponsesAttenduesDiagramme || Object.keys(window.app.reponsesAttenduesDiagramme).length === 0) {
        console.error("❌ Les réponses attendues ne sont pas disponibles !");
        return;
    }

    mettreAJourListePositionsDiagramme();

    let totalZones = Object.keys(window.app.reponsesAttenduesDiagramme).length;
    let reponsesCorrectes = 0;
    let reponsesPlacees = Object.keys(window.app.positionsElementsDiagramme).length;

    console.log("📊 Début de la vérification des réponses...");

    Object.keys(window.app.positionsElementsDiagramme).forEach(zoneId => {
        let nomElement = window.app.positionsElementsDiagramme[zoneId];
        let reponseAttendue = window.app.reponsesAttenduesDiagramme[zoneId];

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
        window.app.etape = "2";

        // 🔹 Transformation du bouton "Valider" en "Suivant"
        boutonValidation.textContent = "Suivant";
        boutonValidation.onclick = passerEtapesuivante;

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

function verifierReponsesTableau() {
    mettreAJourListePositionsTableau();
    let etapeActuelle = parseInt(window.app.etape);

    let totalZones = 0;
    let reponsesCorrectes = 0;
    let reponsesPlacees = Object.keys(window.app.positionsElementsTableau).length;
    
    let reponsesAttendues = {}; // Stockage temporaire des réponses selon l'étape

    // ✅ Sélection des réponses attendues en fonction de l'étape
    if (etapeActuelle === 2) {  
        reponsesAttendues = window.app.reponsesAttenduesTableau1;
        totalZones = Object.keys(reponsesAttendues).length;
    } else if (etapeActuelle === 3) {
        reponsesAttendues = window.app.reponsesAttenduesTableau2;
        totalZones = Object.keys(reponsesAttendues).length;
    } else if (etapeActuelle === 4) {
        reponsesAttendues = window.app.reponsesAttenduesTableau3;
        totalZones = Object.keys(reponsesAttendues).length;
    }

    console.log(`📊 Vérification pour l'étape ${etapeActuelle}...`);
    console.log("📋 Réponses attendues :", reponsesAttendues);
    console.log("📌 Éléments placés :", window.app.positionsElementsTableau);

    let erreurs = [];

    // ✅ Comparaison basée sur le texte et validation des erreurs
    Object.keys(reponsesAttendues).forEach(zoneId => {
        let reponseAttendue = reponsesAttendues[zoneId];
        let reponsePlacee = window.app.positionsElementsTableau[zoneId];

        if (reponsePlacee === reponseAttendue) {
            reponsesCorrectes++;
        } else {
            erreurs.push(`❌ Mauvaise réponse dans ${zoneId}. Attendu : "${reponseAttendue}", trouvé : "${reponsePlacee}"`);
        }
    });

    // 🔹 Affichage du message selon le résultat
    let message = document.getElementById("tableau-message");
    let boutonValidation = document.getElementById("validate-2-button");

    if (reponsesPlacees === totalZones && reponsesCorrectes === totalZones) {
        message.textContent = "✅ Bravo ! Toutes les réponses sont correctes.";
        message.style.color = "green";
        window.app.etape += 1;

        // 🔹 Transformation du bouton "Valider" en "Suivant"
        boutonValidation.textContent = "Suivant";
        boutonValidation.onclick = passerEtapesuivante;

        // 🔹 Désactiver les zones de dépôt
        document.querySelectorAll(".dropzone2").forEach(zone => {
            zone.style.border = "none";
            zone.style.backgroundColor = "transparent";
            zone.style.pointerEvents = "none";
        });

    } else if (reponsesPlacees < totalZones) {
        message.textContent = `⚠️ Il manque ${totalZones - reponsesPlacees} réponses à placer.`;
        message.style.color = "orange";
    } else {
        message.textContent = `❌ Certaines réponses sont incorrectes. Vous avez ${reponsesCorrectes} bonnes réponses sur ${totalZones}.`;
        message.style.color = "red";
        console.warn(erreurs.join("\n"));
    }

    console.log(`📊 Validation complète : ${reponsesCorrectes} bonnes réponses / ${reponsesPlacees} placées sur ${totalZones} attendues.`);
}



// 📌 Fonction qui sera appelée lorsqu'on clique sur "Suivant"
function passerEtapesuivante() {
      // 📌 Vérification de l'étape actuelle
      let etapeActuelle = parseInt(window.app.etape); // Convertir en nombre pour éviter des erreurs
      if (etapeActuelle === 2) 
          {  
    console.log("➡️ Passage à l'étape 2");
    app.setupTableau();}
    else if (etapeActuelle === 3)  {
    console.log("➡️ Passage à l'étape 3");
    app.setupTableau();}
    else if (etapeActuelle === 4)  {
    console.log("➡️ Passage à l'étape 4");
    app.setupTableau();}
    else if (etapeActuelle === 5)  {
    console.log("➡️ Fin !!!");
};
}

// 📌 Ajoute l'événement sur le bouton de validation
document.getElementById("validate-1-button").addEventListener("click", verifierReponsesDiagramme);
document.getElementById("validate-2-button").addEventListener("click", verifierReponsesTableau);
