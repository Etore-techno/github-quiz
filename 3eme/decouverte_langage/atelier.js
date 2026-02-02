"use strict";

/* =========================================================
   BASES ÉLÈVE
========================================================= */

const HTML_BASE = `<div class="applicationJeu">
  <header class="entete">
    <h1 class="zoneTitre">Titre</h1>
    <p class="zoneParagraphe">Paragraphe</p>
  </header>

  <main class="grille">
    <section class="tableauBord">
      <div class="ligneStats">
        <div class="carteStat">
          <div class="labelStat">Score</div>
          <div id="scoreJeu" class="valeurStat">0</div>
        </div>
        <div class="carteStat">
          <div class="labelStat">Temps</div>
          <div id="tempsJeu" class="valeurStat">0</div>
        </div>
        <div class="carteStat">
          <div class="labelStat">Objectif</div>
          <div id="objectifJeu" class="valeurStat">0</div>
        </div>
      </div>

      <div class="ligneBoutons">
        <button id="btnDemarrer">Bouton</button>
        <button id="btnReinitialiser" class="secondaire">Bouton</button>
      </div>

      <div id="messageJeu" class="messageJeu">Bloc message</div>

      <!-- zone extra présente, mais vide => invisible -->
      <div id="zoneExtra" class="zoneExtra"></div>
    </section>

    <section class="zoneJeu">
      <div class="sousTitre">Zone de jeu</div>
      <div id="areneJeu" class="areneJeu"></div>
    </section>
  </main>
</div>`;

const CSS_BASE = window.CSS_BASE || `/* CSS du mini-jeu */
.applicationJeu{
  font-family: system-ui, Arial, sans-serif;
  color: #ffe8fb;
}
.entete{ text-align:center; margin-bottom:10px; }
.zoneTitre{ font-size: 20px; font-weight: 900; margin:0 0 4px; }
.zoneParagraphe{ font-size: 12px; opacity: .85; margin:0; }

.grille{
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 10px;
}

.tableauBord, .zoneJeu{
  background: rgba(255,255,255,.04);
  border: 2px solid rgba(255,255,255,.12);
  border-radius: 14px;
  padding: 10px;
}

.ligneStats{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.carteStat{
  background: rgba(0,0,0,.22);
  border: 1px solid rgba(255,255,255,.10);
  border-radius: 12px;
  padding: 8px;
  text-align: center;
}
.labelStat{ font-size: 11px; opacity:.85; }
.valeurStat{ font-size: 18px; font-weight: 900; margin-top: 3px; }

.ligneBoutons{
  display: flex;
  gap: 8px;
  margin: 10px 0 8px;
}
button{
  flex: 1;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,.14);
  background: #ff3bd4;
  color: #18071f;
  font-weight: 900;
  cursor: pointer;
}
button.secondaire{
  background: transparent;
  color: #ffe8fb;
}

.messageJeu{
  padding: 8px;
  border-radius: 12px;
  background: rgba(0,0,0,.20);
  border: 1px solid rgba(255,255,255,.10);
  font-size: 12px;
  opacity: .9;
}

.zoneExtra:empty{ display:none; }
.zoneExtra{
  margin-top: 8px;
  padding: 8px;
  border-radius: 12px;
  border: 1px dashed rgba(255,255,255,.18);
  background: rgba(255,255,255,.03);
  font-size: 12px;
  opacity: .9;
}

.sousTitre{
  font-weight: 900;
  font-size: 13px;
  color: #2fffd6;
  margin-bottom: 8px;
}

.areneJeu{
  height: 320px;
  border-radius: 14px;
  border: 3px solid rgba(47,255,214,.30);
  background: rgba(0,0,0,.25);
  position: relative;
  overflow: hidden;
}

@media (max-width: 900px){
  .grille{ grid-template-columns: 1fr; }
}`;

/* ✅ Python : affiche un emoji “démo” au départ sans message "désactivé"
   - Si JEU_ACTIF est False => démo : emoji non cliquable + stop immédiat
   - Si TEMPS_JEU <= 0 => démo aussi
*/
const PY_BASE = `from browser import document, timer, window
import random

JEU_ACTIF = False

TEMPS_JEU = 0
SCORE_CIBLE = 0
DELAI_APPARITION_MS = 900
EMOJIS = ["⭐", "🎯", "🔥"]

arene = document["areneJeu"]
score_el = document["scoreJeu"]
temps_el = document["tempsJeu"]
objectif_el = document["objectifJeu"]
message_el = document["messageJeu"]
btn_demarrer = document["btnDemarrer"]
btn_reinit = document["btnReinitialiser"]

# stop ancien jeu si ré-application
try:
    if hasattr(window, "__stop_jeu__") and window.__stop_jeu__:
        window.__stop_jeu__()
except:
    pass

score = 0
temps_restant = TEMPS_JEU
en_cours = False
id_temps = None
id_spawn = None
cible = None

def maj_affichage():
    score_el.textContent = str(score)
    temps_el.textContent = str(temps_restant)
    objectif_el.textContent = str(SCORE_CIBLE)

def message(texte):
    message_el.textContent = texte

def supprimer_cible():
    global cible
    if cible is not None:
        cible.remove()
        cible = None

def emoji_demo():
    # emoji non cliquable, juste pour montrer "un truc apparaît"
    supprimer_cible()
    t = document.createElement("div")
    t.textContent = random.choice(EMOJIS)
    arene <= t

    rect = arene.getBoundingClientRect()
    x = int(rect.width/2)
    y = int(rect.height/2)

    t.style.position = "absolute"
    t.style.left = f"{x}px"
    t.style.top = f"{y}px"
    t.style.transform = "translate(-50%,-50%)"
    t.style.userSelect = "none"
    t.style.fontSize = "52px"
    t.style.opacity = "0.95"
    # pas de curseur => non cliquable
    t.style.cursor = "default"

def spawn():
    global cible
    if not en_cours:
        return
    supprimer_cible()

    t = document.createElement("div")
    t.textContent = random.choice(EMOJIS)
    arene <= t

    try:
        fs = 52
    except:
        fs = 52
    marge = int(fs/2) + 6

    rect = arene.getBoundingClientRect()
    x = random.randint(marge, int(rect.width) - marge)
    y = random.randint(marge, int(rect.height) - marge)

    t.style.position = "absolute"
    t.style.left = f"{x}px"
    t.style.top = f"{y}px"
    t.style.transform = "translate(-50%,-50%)"
    t.style.cursor = "pointer"
    t.style.userSelect = "none"
    t.style.fontSize = "52px"

    def clic(ev):
        global score
        if not en_cours:
            return
        score += 1
        maj_affichage()
        supprimer_cible()
        if SCORE_CIBLE > 0 and score >= SCORE_CIBLE:
            gagner()

    t.bind("click", clic)
    cible = t

def tic():
    global temps_restant
    if not en_cours:
        return
    temps_restant -= 1
    maj_affichage()
    if temps_restant <= 0:
        perdre()

def arreter():
    global en_cours, id_temps, id_spawn
    en_cours = False
    btn_demarrer.disabled = False
    if id_temps is not None:
        timer.clear_interval(id_temps); id_temps = None
    if id_spawn is not None:
        timer.clear_interval(id_spawn); id_spawn = None
    supprimer_cible()

def demarrer():
    global en_cours, score, temps_restant, id_temps, id_spawn

    # ✅ au début : démo visuelle (emoji fixe), stop immédiat
    if (not JEU_ACTIF) or (TEMPS_JEU <= 0):
        emoji_demo()
        return

    if en_cours:
        return

    en_cours = True
    score = 0
    temps_restant = TEMPS_JEU
    maj_affichage()

    btn_demarrer.disabled = True
    message("Message")

    id_temps = timer.set_interval(tic, 1000)
    id_spawn = timer.set_interval(spawn, DELAI_APPARITION_MS)
    spawn()

def reinitialiser():
    arreter()
    maj_affichage()
    message("Message")

def gagner():
    arreter()
    message("Gagné")

def perdre():
    arreter()
    message("Temps écoulé")

window.__stop_jeu__ = arreter
btn_demarrer.bind("click", lambda ev: demarrer())
btn_reinit.bind("click", lambda ev: reinitialiser())

maj_affichage()
message("Message")`;

/* =========================================================
   ETAPES (inchangées sauf Python 1, qui reste OK)
========================================================= */

const ETAPES = window.ETAPES || [
  // HTML
  {
    langage:"HTML",
    titre:"HTML 1 — repérer h1",
    objectif:`Remplacer le texte <code>Titre</code> par <code>Jeu</code> dans la balise <code>&lt;h1&gt;</code>`,
    indice:`Chercher <code>&lt;h1 class="zoneTitre"&gt;</code> puis modifier le mot`,
    verif:(c)=> /<h1[^>]*class=["'][^"']*\bzoneTitre\b[^"']*["'][^>]*>\s*Jeu\s*<\/h1>/i.test(c.html),
  },
  {
    langage:"HTML",
    titre:"HTML 2 — repérer p",
    objectif:`Remplacer le texte <code>Paragraphe</code> par <code>Texte</code> dans la balise <code>&lt;p&gt;</code>`,
    indice:`Chercher <code>&lt;p class="zoneParagraphe"&gt;</code> puis modifier le mot`,
    verif:(c)=> /<p[^>]*class=["'][^"']*\bzoneParagraphe\b[^"']*["'][^>]*>\s*Texte\s*<\/p>/i.test(c.html),
  },
  {
    langage:"HTML",
    titre:"HTML 3 — repérer button",
    objectif:`Remplacer le texte du bouton <code>btnDemarrer</code> par <code>Démarrer</code>`,
    indice:`Chercher <code>id="btnDemarrer"</code> puis modifier le texte`,
    verif:(c)=> /<button[^>]*id=["']btnDemarrer["'][^>]*>\s*Démarrer\s*<\/button>/i.test(c.html),
  },
  {
    langage:"HTML",
    titre:"HTML 4 — repérer div message",
    objectif:`Remplacer le texte <code>Bloc message</code> par <code>Message</code> dans <code>id="messageJeu"</code>`,
    indice:`Chercher <code>id="messageJeu"</code> puis remplacer le mot`,
    verif:(c)=> /<div[^>]*id=["']messageJeu["'][^>]*>\s*Message\s*<\/div>/i.test(c.html),
  },
  {
    langage:"HTML",
    titre:"HTML 5 — ajouter un attribut",
    objectif:`Ajouter l’attribut <code>title="info"</code> sur le bouton Démarrer`,
    indice:`Sur <code>&lt;button id="btnDemarrer"&gt;</code> ajouter <code>title="info"</code>`,
    verif:(c)=> /<button[^>]*id=["']btnDemarrer["'][^>]*title=["']info["'][^>]*>/i.test(c.html),
  },
  {
    langage:"HTML",
    titre:"HTML 6 — modifier une classe",
    objectif:`Ajouter la classe <code>important</code> sur le titre`,
    indice:`Sur <code>&lt;h1 class="zoneTitre"&gt;</code> ajouter <code>important</code>`,
    verif:(c)=> /<h1[^>]*class=["'][^"']*\bzoneTitre\b[^"']*\bimportant\b[^"']*["'][^>]*>/i.test(c.html),
  },
  {
    langage:"HTML",
    titre:"HTML 7 — ajouter une ligne",
    objectif:`Ajouter sous le paragraphe une ligne <code>&lt;p&gt;Ligne&lt;/p&gt;</code>`,
    indice:`Ajouter un nouveau <code>&lt;p&gt;</code> sous le paragraphe`,
    verif:(c)=> /zoneParagraphe[\s\S]*<\/p>\s*<p[^>]*>\s*Ligne\s*<\/p>/i.test(c.html),
  },
  {
    langage:"HTML",
    titre:"HTML 8 — ajout complet",
    objectif:`Dans <code>zoneExtra</code> ajouter <code>&lt;button id="btnDifficile"&gt;Mode difficile&lt;/button&gt;</code>`,
    indice:`Mettre le bouton entre l’ouverture et la fermeture de <code>zoneExtra</code>`,
    verif:(c)=> /id=["']btnDifficile["']/.test(c.html),
  },

  // CSS
  {
    langage:"CSS",
    titre:"CSS 1 — couleur",
    objectif:`Remplacer la couleur du fond des boutons par <code>#2fffd6</code>`,
    indice:`Chercher <code>button{</code> puis remplacer <code>background</code>`,
    verif:(c)=> /button\s*\{[^}]*background\s*:\s*#2fffd6/is.test(c.css),
  },
  {
    langage:"CSS",
    titre:"CSS 2 — arrondis",
    objectif:`Dans <code>.areneJeu</code> remplacer <code>border-radius</code> par <code>24px</code>`,
    indice:`Chercher <code>.areneJeu</code> puis modifier`,
    verif:(c)=> /\.areneJeu[^}]*border-radius\s*:\s*24px/is.test(c.css),
  },
  {
    langage:"CSS",
    titre:"CSS 3 — centrer le message",
    objectif:`Dans <code>.messageJeu</code> ajouter <code>text-align: center</code>`,
    indice:`Ajouter la propriété dans <code>.messageJeu</code>`,
    verif:(c)=> /\.messageJeu[^}]*text-align\s*:\s*center/is.test(c.css),
  },
  {
    langage:"CSS",
    titre:"CSS 4 — taille du titre",
    objectif:`Dans <code>.zoneTitre</code> remplacer <code>font-size</code> par <code>28px</code>`,
    indice:`Modifier la valeur de font-size`,
    verif:(c)=> /\.zoneTitre[^}]*font-size\s*:\s*28px/is.test(c.css),
  },
  {
    langage:"CSS",
    titre:"CSS 5 — ombre",
    objectif:`Dans <code>.tableauBord</code> ajouter <code>box-shadow: 0 10px 25px rgba(0,0,0,.35)</code>`,
    indice:`Ajouter la propriété dans <code>.tableauBord</code>`,
    verif:(c)=> /\.tableauBord[^}]*box-shadow\s*:\s*0\s+10px\s+25px/is.test(c.css),
  },
  {
    langage:"CSS",
    titre:"CSS 6 — hover",
    objectif:`Ajouter en bas <code>button:hover { transform: scale(1.03); }</code>`,
    indice:`Ajouter une nouvelle règle complète`,
    verif:(c)=> /button\s*:\s*hover\s*\{[^}]*scale\(/is.test(c.css),
  },
  {
    langage:"CSS",
    titre:"CSS 7 — .important",
    objectif:`Créer <code>.important</code> qui met <code>color: #ffd36e</code>`,
    indice:`Ajouter <code>.important{ color: #ffd36e; }</code>`,
    verif:(c)=> /\.important\s*\{[^}]*color\s*:\s*#ffd36e/is.test(c.css),
  },
  {
    langage:"CSS",
    titre:"CSS 8 — colonne",
    objectif:`Dans <code>.ligneBoutons</code> ajouter <code>flex-direction: column</code>`,
    indice:`Ajouter flex-direction dans <code>.ligneBoutons</code>`,
    verif:(c)=> /\.ligneBoutons[^}]*flex-direction\s*:\s*column/is.test(c.css),
  },

  // Python
  {
    langage:"Python",
    titre:"Python 1 — activer",
    objectif:`Remplacer <code>JEU_ACTIF = False</code> par <code>JEU_ACTIF = True</code>`,
    indice:`Tout en haut du fichier`,
    verif:(c)=> /JEU_ACTIF\s*=\s*True/.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 2 — temps",
    objectif:`Remplacer <code>TEMPS_JEU = 0</code> par <code>TEMPS_JEU = 20</code>`,
    indice:`Modifier le paramètre`,
    verif:(c)=> /TEMPS_JEU\s*=\s*20\b/.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 3 — objectif",
    objectif:`Remplacer <code>SCORE_CIBLE = 0</code> par <code>SCORE_CIBLE = 10</code>`,
    indice:`Modifier le paramètre`,
    verif:(c)=> /SCORE_CIBLE\s*=\s*10\b/.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 4 — vitesse",
    objectif:`Remplacer <code>DELAI_APPARITION_MS = 900</code> par <code>DELAI_APPARITION_MS = 650</code>`,
    indice:`Modifier le paramètre`,
    verif:(c)=> /DELAI_APPARITION_MS\s*=\s*650\b/.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 5 — emoji",
    objectif:`Ajouter <code>🐼</code> dans <code>EMOJIS</code>`,
    indice:`Ajouter 🐼 dans la liste`,
    verif:(c)=> /EMOJIS\s*=\s*\[[^\]]*🐼[^\]]*\]/s.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 6 — victoire",
    objectif:`Dans <code>gagner()</code> mettre <code>message("Gagné")</code>`,
    indice:`Modifier la fonction gagner`,
    verif:(c)=> /def gagner\(\)[\s\S]*message\("Gagné"\)/.test(c.py),
  },
];

/* =========================================================
   DOM
========================================================= */
const $ = (id)=> document.getElementById(id);

const ui = {
  stepHeader: $("stepHeader"),
  zoneConsigne: $("zoneConsigne"),
  codeHtml: $("codeHtml"),
  codeCss: $("codeCss"),
  codePy: $("codePy"),
  btnAppliquer: $("btnAppliquer"),
  btnReinit: $("btnReinit"),
  btnSuivant: $("btnSuivant"),
  zoneStatut: $("zoneStatut"),
  apercu: $("apercu"),
  styleEleve: $("styleEleve"),
  pythonEleve: $("pythonEleve"),
};

const onglets = Array.from(document.querySelectorAll(".tab"));
const editeurs = {
  html: document.querySelector("#ed-html"),
  css: document.querySelector("#ed-css"),
  py: document.querySelector("#ed-py"),
};

/* =========================================================
   Etat
========================================================= */
const etat = {
  etape: 0,
  valide: Array(ETAPES.length).fill(false),
  code: { html: HTML_BASE, css: CSS_BASE, py: PY_BASE },
  snapshot: Array(ETAPES.length).fill(null),
};

function definirStatut(texte, type=""){
  ui.zoneStatut.classList.remove("ok","bad");
  ui.zoneStatut.textContent = texte;
  if(type) ui.zoneStatut.classList.add(type);
}

function definirOnglet(nom){
  onglets.forEach(b=> b.classList.toggle("active", b.dataset.tab === nom));
  Object.keys(editeurs).forEach(k=> editeurs[k].classList.toggle("active", k === nom));
}

function collecterCode(){
  etat.code.html = ui.codeHtml.value;
  etat.code.css = ui.codeCss.value;
  etat.code.py = ui.codePy.value;
}

function afficherCode(){
  ui.codeHtml.value = etat.code.html;
  ui.codeCss.value = etat.code.css;
  ui.codePy.value = etat.code.py;
}

/* ✅ calcule la dernière étape accessible (progression stricte) */
function maxEtapeAccessible(){
  // On débloque jusqu'à la première étape non validée
  // ex : [true,true,false,...] => max = 2 (index), donc accès 0..2
  const i = etat.valide.findIndex(v => v === false);
  return (i === -1) ? (ETAPES.length - 1) : i;
}

/* ✅ pastilles : clic uniquement si étape accessible */
function rendreEtapesHaut(){
  const maxAcc = maxEtapeAccessible();
  ui.stepHeader.innerHTML = "";

  ETAPES.forEach((_, i)=>{
    const d = document.createElement("div");
    d.className = "stepDot";
    d.textContent = String(i+1);

    if(i === etat.etape) d.classList.add("active");
    if(etat.valide[i]) d.classList.add("done");

    // seulement jusqu'à maxAcc (étape en cours incluse)
    const accessible = (i <= maxAcc);
    if(accessible){
      d.addEventListener("click", ()=> allerEtape(i));
    }else{
      d.style.opacity = "0.35";
      d.style.cursor = "not-allowed";
    }

    ui.stepHeader.appendChild(d);
  });
}

function rendreConsigne(){
  const e = ETAPES[etat.etape];
  ui.zoneConsigne.innerHTML = `
    <h3>${e.titre}</h3>
    <p>${e.objectif}</p>
    <div class="indice">Indice : ${e.indice}</div>
  `;
  const ong = (e.langage === "HTML") ? "html" : (e.langage === "CSS") ? "css" : "py";
  definirOnglet(ong);
}

function scopeCSS(css){
  return css.replace(/(^|\})\s*([^{@}][^{]*?)\s*\{/g, (m, end, sel) => {
    const s = sel.trim();
    if(!s) return m;
    if(s.includes("#apercu")) return m;
    const scoped = s.split(",").map(x => `#apercu ${x.trim()}`).join(", ");
    return `${end} ${scoped} {`;
  });
}

function validerEtape(){
  const e = ETAPES[etat.etape];
  try{
    return e.verif({ html: etat.code.html, css: etat.code.css, py: etat.code.py });
  }catch{
    return false;
  }
}

function appliquerApercu(){
  collecterCode();

  try{ if(window.__stop_jeu__) window.__stop_jeu__(); }catch(e){}

  ui.apercu.innerHTML = etat.code.html;
  ui.styleEleve.textContent = scopeCSS(etat.code.css);
  ui.pythonEleve.textContent = etat.code.py;

  try{ brython({cache:"none"}); }catch(err){ console.error(err); }

  if(validerEtape()){
    etat.valide[etat.etape] = true;
    ui.btnSuivant.disabled = false;
    definirStatut("Étape réussie", "ok");
  }else{
    ui.btnSuivant.disabled = true;
    definirStatut("Pas encore", "bad");
  }

  rendreEtapesHaut();
}

function snapshotSiBesoin(i){
  if(!etat.snapshot[i]){
    etat.snapshot[i] = { html: etat.code.html, css: etat.code.css, py: etat.code.py };
  }
}

function reinitialiserEtape(){
  const snap = etat.snapshot[etat.etape];
  etat.code = snap ? { html: snap.html, css: snap.css, py: snap.py } : { html: HTML_BASE, css: CSS_BASE, py: PY_BASE };
  etat.valide[etat.etape] = false;
  afficherCode();
  definirStatut("Étape réinitialisée");
  appliquerApercu();
}

function etapeSuivante(){
  if(!etat.valide[etat.etape]) return;

  if(etat.etape < ETAPES.length - 1){
    etat.etape += 1;
    snapshotSiBesoin(etat.etape);
    rendreConsigne();
    afficherCode();
    ui.btnSuivant.disabled = true;
    definirStatut("Nouvelle étape");
    appliquerApercu();
  }else{
    definirStatut("Tout est terminé", "ok");
  }
}

function allerEtape(i){
  // sécurité : bloquer toute navigation non autorisée
  if(i > maxEtapeAccessible()) return;

  etat.etape = i;
  snapshotSiBesoin(i);
  rendreConsigne();
  afficherCode();

  // bouton suivant uniquement si étape courante validée
  ui.btnSuivant.disabled = !etat.valide[i];

  definirStatut("Étape sélectionnée");
  appliquerApercu();
}

/* Events */
onglets.forEach(b=> b.addEventListener("click", ()=> definirOnglet(b.dataset.tab)));
ui.btnAppliquer.addEventListener("click", appliquerApercu);
ui.btnReinit.addEventListener("click", reinitialiserEtape);
ui.btnSuivant.addEventListener("click", etapeSuivante);

/* Init */
(function init(){
  snapshotSiBesoin(0);
  afficherCode();
  rendreEtapesHaut();
  rendreConsigne();
  definirStatut("Modifier le code puis cliquer sur Appliquer");
  appliquerApercu();
})();
