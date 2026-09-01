// main.js - Exercice (diagramme + tableau) + identité + scoring + envoi Google Sheets
// Objectif : ne PAS toucher aux fichiers selectionMenu* et zonesElements* (ils gèrent l'UI des zones).
// Ajouts :
// - Identité obligatoire avant démarrage (mode SOLO possible)
// - Verrouillage des zones/validations avant confirmation
// - Validation impossible si incomplet
// - Scoring par étapes avec pénalité selon le nombre d'essais
// - Envoi du résultat final à Google Sheets en fin d'activité + date/heure

window.app = window.app || {};

// =========================
// 🔧 REMPLACE ICI par l'URL /exec de ton Apps Script (WebApp)
// =========================
window.app.SHEETS_WEBAPP_URL = window.app.SHEETS_WEBAPP_URL || "https://script.google.com/macros/s/AKfycbyt4Gm3ek35duFxANQ4ZSilg2ZxzDYPQcV6fuvemU1X7mm6j1_BTI3u5IS-a65Y5SVD/exec";

window.app.etape = 1;                 // 1 = diagramme, 2 = tableau col 1, 3 = col 2, 4 = col 3, 5 = fin
window.app.etapeEnCours = false;
window.app.identityConfirmed = false;
window.app.resultSent = false;

// Positions / réponses attendues
window.app.positionsElementsDiagramme = {};
window.app.reponsesAttenduesDiagramme = {};

window.app.positionsElementsTableau = {};
window.app.reponsesAttenduesTableau1 = {};
window.app.reponsesAttenduesTableau2 = {};
window.app.reponsesAttenduesTableau3 = {};

// =========================
// ✅ Scoring
// Barème : 1er essai 100%, 2e 80%, 3e 60%, 4e 40%, 5e+ 20%
// =========================
window.app.scoring = {
  attempts: { 1: 0, 2: 0, 3: 0, 4: 0 },
  max:      { 1: 0, 2: 0, 3: 0, 4: 0 },
  earned:   { 1: null, 2: null, 3: null, 4: null }
};

function pointsAvecEssais(pointsMax, essais){
  const a = Math.max(1, parseInt(essais, 10) || 1);
  const coeff = (a === 1) ? 1 : (a === 2) ? 0.8 : (a === 3) ? 0.6 : (a === 4) ? 0.4 : 0.2;
  return Math.max(0, Math.round(pointsMax * coeff * 10) / 10); // arrondi 0,1
}

function enregistrerScoreEtape(etape, pointsMax){
  if (window.app.scoring.earned[etape] !== null) return; // déjà enregistré
  window.app.scoring.max[etape] = pointsMax;
  window.app.scoring.earned[etape] = pointsAvecEssais(pointsMax, window.app.scoring.attempts[etape]);
}

function scoreFinalSur20(){
  const totalMax = Object.values(window.app.scoring.max).reduce((a,b)=>a+b,0) || 1;
  const totalEarned = Object.values(window.app.scoring.earned).reduce((a,b)=>a+(b||0),0);
  return Math.round((totalEarned / totalMax) * 20 * 10) / 10;
}

// =========================
// ✅ Identité
// =========================
function getIdentity(){
  const classe = (document.getElementById("classe")?.value || "").trim();
  const nom1 = (document.getElementById("nom1")?.value || "").trim();
  const nom2 = (document.getElementById("nom2")?.value || "").trim();
  const solo = Boolean(document.getElementById("solo")?.checked);
  return { classe, nom1, nom2, solo };
}

function isIdentityOk(){
  const { classe, nom1, nom2, solo } = getIdentity();
  return Boolean(classe && nom1 && (solo || nom2));
}

function setIdentityMessage(text, color="#333"){
  const el = document.getElementById("identity-message");
  if (!el) return;
  el.textContent = text;
  el.style.color = color;
}

function appliquerModeSoloUI(){
  const solo = document.getElementById("solo");
  const nom2 = document.getElementById("nom2");
  if (!solo || !nom2) return;

  if (solo.checked){
    nom2.value = "SOLO";
    nom2.disabled = true;
  } else {
    if (nom2.value === "SOLO") nom2.value = "";
    nom2.disabled = false;
  }
}

function refreshStartButton(){
  const ok = isIdentityOk();
  const btn = document.getElementById("start-activity-button");
  if (btn) btn.disabled = !ok;

  if (ok){
    setIdentityMessage("Vérifiez les informations, puis cliquez sur « Je confirme et je commence ».", "green");
  } else {
    setIdentityMessage("Renseignez la classe + Nom 1, puis soit Nom 2, soit cochez « Travail seul(e) ». Vérifiez avant de commencer.", "#333");
  }
}

function lockActivity(lock){
  document.body.classList.toggle("locked", Boolean(lock));
}

// Confirmation fermeture (après démarrage)
window.addEventListener("beforeunload", (e)=>{
  if (!window.app.identityConfirmed) return;
  if (window.app.resultSent) return;
  e.preventDefault();
  e.returnValue = "";
});

// =========================
// ✅ Initialiser réponses attendues depuis data.js
// =========================
function initialiserReponsesAttendues() {
  if (!window.exerciceData || !window.exerciceData.diagrammezone || !window.exerciceData.diagrammeElements) {
    console.error("Données diagramme manquantes");
    return;
  }
  if (!window.exerciceData.tableauzone || !window.exerciceData.tableauElements) {
    console.error("Données tableau manquantes");
    return;
  }

  // Diagramme : mapping par ID de zone
  window.app.reponsesAttenduesDiagramme = {};
  window.exerciceData.diagrammezone.forEach((zone, idx) => {
    const element = window.exerciceData.diagrammeElements[idx];
    if (zone?.id && element?.nom) window.app.reponsesAttenduesDiagramme[zone.id] = element.nom;
  });

  // Tableau : mapping par ID de zone, groupé par colonne
  window.app.reponsesAttenduesTableau1 = {};
  window.app.reponsesAttenduesTableau2 = {};
  window.app.reponsesAttenduesTableau3 = {};
  window.exerciceData.tableauzone.forEach((zone, idx) => {
    const element = window.exerciceData.tableauElements[idx];
    const col = parseInt(zone?.colonne, 10);
    if (!zone?.id || !element?.nom || !col) return;
    if (col === 1) window.app.reponsesAttenduesTableau1[zone.id] = element.nom;
    if (col === 2) window.app.reponsesAttenduesTableau2[zone.id] = element.nom;
    if (col === 3) window.app.reponsesAttenduesTableau3[zone.id] = element.nom;
  });
}

// =========================
// ✅ Mise à jour positions
// =========================
function mettreAJourListePositionsDiagramme() {
  window.app.positionsElementsDiagramme = {};
  document.querySelectorAll(".dropzone").forEach(zone => {
    const elementPlace = zone.querySelector("span");
    if (elementPlace) {
      window.app.positionsElementsDiagramme[zone.id] = elementPlace.textContent.trim();
    }
  });
}

function mettreAJourListePositionsTableau() {
  window.app.positionsElementsTableau = {};
  const etapeActuelle = parseInt(window.app.etape, 10);

  document.querySelectorAll(".dropzone2").forEach(zone => {
    const colonneZone = parseInt(zone.getAttribute("data-colonne"), 10);
    const cible = (etapeActuelle === 2 && colonneZone === 1) ||
                  (etapeActuelle === 3 && colonneZone === 2) ||
                  (etapeActuelle === 4 && colonneZone === 3);

    if (!cible) return;

    const elementPlace = zone.querySelector("span");
    if (elementPlace) {
      window.app.positionsElementsTableau[zone.id] = elementPlace.textContent.trim();
    }
  });
}

// =========================
// ✅ Vérification diagramme (étape 1)
// =========================
function verifierReponsesDiagramme() {
  if (!window.app.identityConfirmed) return;

  const expected = window.app.reponsesAttenduesDiagramme;
  if (!expected || Object.keys(expected).length === 0) return;
  mettreAJourListePositionsDiagramme();

  const totalZones = Object.keys(expected).length;
  let placees = 0;
  let correctes = 0;

  Object.keys(expected).forEach(zoneId => {
    const rep = window.app.positionsElementsDiagramme[zoneId];
    if (rep) placees++;
    if (rep && rep === expected[zoneId]) correctes++;
  });

  const message = document.getElementById("diagramme-message");

  if (placees < totalZones) {
    if (message) {
      message.textContent = `⚠️ Il manque ${totalZones - placees} réponses à placer.`;
      message.style.color = "orange";
    }
    return;
  }


  // ✅ On ne compte un essai que si TOUTES les réponses sont placées
  window.app.scoring.attempts[1] += 1;

  if (correctes === totalZones) {
    // score étape 1
    enregistrerScoreEtape(1, totalZones);

    if (message) {
      message.textContent = "✅ Bravo ! Toutes les réponses sont correctes.";
      message.style.color = "green";
    }

    // transformer bouton en "Suivant"
    const btn = document.getElementById("validate-1-button");
    if (btn) btn.textContent = "Suivant";

    // désactiver les zones diagramme (comme avant)
    document.querySelectorAll(".dropzone").forEach(zone => {
      zone.style.border = "none";
      zone.style.backgroundColor = "transparent";
      zone.style.pointerEvents = "none";
    });

  } else {
    if (message) {
      message.textContent = `❌ Certaines réponses sont incorrectes. Bonnes réponses : ${correctes}/${totalZones}.`;
      message.style.color = "red";
    }
  }
}

// =========================
// ✅ Vérification tableau (étapes 2->4)
// =========================
function verifierReponsesTableau() {
  if (!window.app.identityConfirmed) return;

  mettreAJourListePositionsTableau();
  const etapeActuelle = parseInt(window.app.etape, 10);

  let expected = null;
  if (etapeActuelle === 2) expected = window.app.reponsesAttenduesTableau1;
  if (etapeActuelle === 3) expected = window.app.reponsesAttenduesTableau2;
  if (etapeActuelle === 4) expected = window.app.reponsesAttenduesTableau3;
  if (!expected) return;
  const totalZones = Object.keys(expected).length;
  let placees = 0;
  let correctes = 0;

  Object.keys(expected).forEach(zoneId => {
    const rep = window.app.positionsElementsTableau[zoneId];
    if (rep) placees++;
    if (rep && rep === expected[zoneId]) correctes++;
  });

  const message = document.getElementById("tableau-message");
  const btn = document.getElementById("validate-2-button");

  if (placees < totalZones) {
    if (message) {
      message.textContent = `⚠️ Il manque ${totalZones - placees} réponses à placer.`;
      message.style.color = "orange";
    }
    return;
  }


  // ✅ On ne compte un essai que si TOUTES les réponses sont placées
  window.app.scoring.attempts[etapeActuelle] += 1;

  if (correctes === totalZones) {
    enregistrerScoreEtape(etapeActuelle, totalZones);

    if (message) {
      message.textContent = "✅ Bravo ! Toutes les réponses sont correctes.";
      message.style.color = "green";
    }

    if (btn) btn.textContent = "Suivant";

    // bloquer colonnes déjà validées (fonction existante dans zonesElements2.js)
    if (typeof window.bloquerColonnesTableau === "function") {
      window.bloquerColonnesTableau();
    } else if (typeof bloquerColonnesTableau === "function") {
      bloquerColonnesTableau();
    }

    // Fin après colonne 3
    if (etapeActuelle === 4) {
      if (btn) btn.style.display = "none";
      const s20 = scoreFinalSur20();
      if (message) {
        message.textContent = `✅ Exercice terminé ! Score final : ${s20}/20`;
        message.style.color = "black";
      }
      envoyerResultatFinal();
    }

  } else {
    if (message) {
      message.textContent = `❌ Certaines réponses sont incorrectes. Bonnes réponses : ${correctes}/${totalZones}.`;
      message.style.color = "red";
    }
  }
}

// =========================
// ✅ Passage à l'étape suivante (boutons "Suivant")
// =========================
function passerEtapesuivante() {
  if (window.app.etapeEnCours) return;
  window.app.etapeEnCours = true;

  if (window.app.etape >= 5) {
    window.app.etapeEnCours = false;
    return;
  }

  window.app.etape += 1;

  // À partir de l'étape 2, on masque valider-1 et on affiche valider-2
  if (window.app.etape >= 2) {
    const btn1 = document.getElementById("validate-1-button");
    if (btn1) btn1.style.display = "none";

    const controls2 = document.getElementById("validate-controls-2");
    if (controls2) controls2.style.display = "flex";

    const btn2 = document.getElementById("validate-2-button");
    if (btn2) {
      btn2.style.display = "inline-block";
      btn2.textContent = "Valider";
      btn2.disabled = false;
    }

    const msg1 = document.getElementById("diagramme-message");
    if (msg1) {
      msg1.textContent = "Complétez le tableau en-dessous !";
      msg1.style.color = "black";
    }

    const msg2 = document.getElementById("tableau-message");
    if (msg2) {
      if (window.app.etape === 2) msg2.textContent = "Complétez les fonctions du tableau !";
      if (window.app.etape === 3) msg2.textContent = "Complétez les critères du tableau !";
      if (window.app.etape === 4) msg2.textContent = "Complétez les niveaux du tableau !";
      msg2.style.color = "black";
    }

    // recréer / afficher uniquement la colonne correspondant à l'étape (fonction existante)
    if (typeof window.app.setupTableau === "function") {
      window.app.setupTableau();
    } else if (typeof app !== "undefined" && typeof app.setupTableau === "function") {
      app.setupTableau();
    }
  }

  setTimeout(()=>{ window.app.etapeEnCours = false; }, 50);
}

// =========================
// ✅ Envoi Google Sheets (à la fin)
// =========================
async function envoyerResultatFinal(){
  if (window.app.resultSent) return;
  window.app.resultSent = true;

  const { classe, nom1, nom2, solo } = getIdentity();
  const nom2Final = solo ? "SOLO" : nom2;

  const payload = {
    date: new Date().toISOString(), // date+heure
    classe,
    nom1,
    nom2: nom2Final,
    score: scoreFinalSur20()
  };

  // Si l'URL n'est pas renseignée, on n'envoie pas (mais on ne bloque pas l'activité)
  if (!window.app.SHEETS_WEBAPP_URL || window.app.SHEETS_WEBAPP_URL.includes("COLLE_ICI")) {
    console.warn("SHEETS_WEBAPP_URL non configurée : résultat non envoyé.", payload);
    return;
  }

  try {
    await fetch(window.app.SHEETS_WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    console.error("Erreur envoi Sheets:", e);
  }
}

// =========================
// ✅ Démarrage
// =========================
window.addEventListener("DOMContentLoaded", () => {
  // 1) réponses attendues
  initialiserReponsesAttendues();

  // 2) verrouiller l'activité (identité visible)
  lockActivity(true);

  // Désactiver boutons valider tant que pas confirmé
  const b1 = document.getElementById("validate-1-button");
  if (b1) b1.disabled = true;
  const b2 = document.getElementById("validate-2-button");
  if (b2) b2.disabled = true;

  // 3) init UI identité
  appliquerModeSoloUI();
  refreshStartButton();

  document.getElementById("classe")?.addEventListener("input", refreshStartButton);
  document.getElementById("nom1")?.addEventListener("input", refreshStartButton);
  document.getElementById("nom2")?.addEventListener("input", refreshStartButton);
  document.getElementById("solo")?.addEventListener("change", () => {
    appliquerModeSoloUI();
    refreshStartButton();
  });

  document.getElementById("start-activity-button")?.addEventListener("click", () => {
    if (!isIdentityOk()) return;

    window.app.identityConfirmed = true;
    document.body.classList.add("started");
    lockActivity(false);

    // champs figés après démarrage
    document.getElementById("classe").disabled = true;
    document.getElementById("nom1").disabled = true;
    document.getElementById("nom2").disabled = true;
    document.getElementById("solo").disabled = true;

    setIdentityMessage("Activité démarrée ✅", "green");

    // activer bouton valider diagramme
    if (b1) b1.disabled = false;

    // sécurité : relancer init menu (au cas où les zones ont été recréées)
    try { window.app.initSelectionMenu?.(); } catch(e){}
    try { window.app.initSelectionMenu2?.(); } catch(e){}
  });

  // 4) setup diagramme (comme avant, mais interaction bloquée tant que locked)
  const diagrammeImage = document.querySelector("#diagramme-container img");
  const attendreChargement = (callback) => {
    let tentatives = 0;
    const verifier = () => {
      const rect = diagrammeImage.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) callback();
      else if (tentatives < 20) { tentatives++; requestAnimationFrame(verifier); }
    };
    verifier();
  };

  const demarrerExercices = () => {
    setTimeout(() => {
      if (typeof window.app.setupDiagramme === "function") window.app.setupDiagramme();
      else if (typeof app !== "undefined" && typeof app.setupDiagramme === "function") app.setupDiagramme();
    }, 50);
  };

  if (diagrammeImage?.complete) attendreChargement(demarrerExercices);
  else diagrammeImage?.addEventListener("load", () => attendreChargement(demarrerExercices));

  // 5) handlers validation
  document.getElementById("validate-1-button")?.addEventListener("click", () => {
    if (!window.app.identityConfirmed) return;
    const btn = document.getElementById("validate-1-button");
    if (!btn) return;
    if (btn.textContent === "Valider") verifierReponsesDiagramme();
    else { btn.disabled = true; passerEtapesuivante(); }
  });

  document.getElementById("validate-2-button")?.addEventListener("click", () => {
    if (!window.app.identityConfirmed) return;
    const btn = document.getElementById("validate-2-button");
    if (!btn) return;
    if (btn.textContent === "Valider") verifierReponsesTableau();
    else { btn.disabled = true; passerEtapesuivante(); }
  });
});
