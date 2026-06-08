"use strict";

/* =========================================================
   BASES ÉLÈVE — MINI-JEU TYPE SPACE INVADERS SIMPLE
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
          <div class="labelStat">Vies</div>
          <div id="viesJeu" class="valeurStat">0</div>
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

      <div id="zoneExtra" class="zoneExtra"></div>
    </section>

    <section class="zoneJeu">
      <div class="sousTitre">Zone de jeu</div>
      <div id="areneJeu" class="areneJeu">
        <div id="vaisseau" class="vaisseau">?</div>
      </div>
    </section>
  </main>
</div>`;

const CSS_BASE = window.CSS_BASE || `/* CSS du mini-jeu */
.applicationJeu{
  font-family: system-ui, Arial, sans-serif;
  color: #ffe8fb;
}
.entete{ text-align:center; margin-bottom:10px; }
.zoneTitre{ font-size: 28px; font-weight: 900; margin:0 0 4px; }
.zoneParagraphe{ font-size: 18px; opacity: .85; margin:0; }

.grille{
  display: grid;
  grid-template-columns: 380px 1fr;
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
.labelStat{ font-size: 15px; opacity:.85; }
.valeurStat{ font-size: 26px; font-weight: 900; margin-top: 3px; }

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
  font-size: 17px;
}
button.secondaire{
  background: transparent;
  color: #ffe8fb;
}

.messageJeu{
  padding: 10px;
  border-radius: 12px;
  background: rgba(0,0,0,.20);
  border: 1px solid rgba(255,255,255,.10);
  font-size: 17px;
  opacity: .9;
}

.zoneExtra:empty{ display:none; }
.zoneExtra{
  margin-top: 8px;
  padding: 8px;
  border-radius: 12px;
  border: 1px dashed rgba(255,255,255,.18);
  background: rgba(255,255,255,.03);
  font-size: 17px;
  opacity: .9;
}

.sousTitre{
  font-weight: 900;
  font-size: 19px;
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

.vaisseau{
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  font-size: 28px;
  user-select: none;
}

.missile{
  position: absolute;
  width: 5px;
  height: 16px;
  border-radius: 999px;
  background: #ffd36e;
}

.ennemi{
  position: absolute;
  font-size: 24px;
  user-select: none;
}

.bonus{
  position: absolute;
  font-size: 26px;
  user-select: none;
}

@media (max-width: 900px){
  .grille{ grid-template-columns: 1fr; }
}`;

const PY_BASE = `from browser import document, timer, window
import random

JEU_ACTIF = False

SCORE_CIBLE = 0
VIES_DEPART = 1
VIES_MAX = 5

VITESSE_VAISSEAU = 18
VITESSE_MISSILE = 0
VITESSE_ENNEMI = 0
VITESSE_ENNEMI_MAX = 4

DELAI_TIR = 8
DELAI_ENNEMI_MS = 1200
ENNEMIS_AUTO = False
DIFFICULTE_PROGRESSIVE = False

ENNEMIS = ["👾"]
ENNEMIS_VITESSES = {"👾": 1}
ENNEMIS_POINTS = {"👾": 1}
ENNEMIS_DEGATS = {"👾": 1}

BONUS_COEUR_ACTIF = False
CHANCE_COEUR = 0
DECORS_NIVEAUX = False
MESSAGES_NIVEAUX = False

arene = document["areneJeu"]
vaisseau_el = document["vaisseau"]
score_el = document["scoreJeu"]
vies_el = document["viesJeu"]
objectif_el = document["objectifJeu"]
message_el = document["messageJeu"]
btn_demarrer = document["btnDemarrer"]
btn_reinit = document["btnReinitialiser"]

def element_optionnel(id_element):
    try:
        return document[id_element]
    except:
        return None

niveau_el = element_optionnel("niveauJeu")

# Stoppe l'ancien jeu si on clique plusieurs fois sur Appliquer
# et retire les anciens écouteurs clavier pour éviter les doublons.
try:
    if hasattr(window, "__stop_jeu__") and window.__stop_jeu__:
        window.__stop_jeu__()
    if hasattr(window, "__space_keydown__") and window.__space_keydown__:
        document.unbind("keydown", window.__space_keydown__)
    if hasattr(window, "__space_keyup__") and window.__space_keyup__:
        document.unbind("keyup", window.__space_keyup__)
except:
    pass

score = 0
vies = VIES_DEPART
x_vaisseau = 0

en_cours = False
missiles = []
ennemis = []
touches = set()

id_boucle = None
id_spawn = None
attente_tir = 0
dernier_niveau_annonce = 1

def largeur_arene():
    return int(arene.getBoundingClientRect().width)

def hauteur_arene():
    return int(arene.getBoundingClientRect().height)

def message(texte):
    message_el.textContent = texte

def calculer_niveau():
    return 1

def maj_decor():
    if not DECORS_NIVEAUX:
        arene.className = "areneJeu"
        return

    niveau = calculer_niveau()
    if niveau >= 4:
        arene.className = "areneJeu decorNiveau4"
    elif niveau >= 3:
        arene.className = "areneJeu decorNiveau3"
    elif niveau >= 2:
        arene.className = "areneJeu decorNiveau2"
    else:
        arene.className = "areneJeu"

def maj_affichage():
    score_el.textContent = str(score)
    vies_el.textContent = str(vies)
    objectif_el.textContent = str(SCORE_CIBLE)
    # Plus tard : afficher le niveau ici.
    maj_decor()

def annoncer_niveau_si_besoin():
    global dernier_niveau_annonce
    if not MESSAGES_NIVEAUX:
        return

    niveau = calculer_niveau()
    if niveau > dernier_niveau_annonce:
        dernier_niveau_annonce = niveau
        if niveau == 2:
            message("Niveau 2 : les ennemis accélèrent !")
        elif niveau == 3:
            message("Niveau 3 : attention aux ennemis spéciaux !")
        elif niveau >= 4:
            message("Niveau 4 : la zone devient très dangereuse !")

def placer_vaisseau():
    global x_vaisseau
    marge = 28
    w = largeur_arene()
    if x_vaisseau <= 0:
        x_vaisseau = int(w / 2)
    x_vaisseau = max(marge, min(w - marge, x_vaisseau))
    vaisseau_el.style.left = f"{x_vaisseau}px"
    vaisseau_el.style.bottom = "10px"

def supprimer_liste(liste):
    for obj in liste[:]:
        try:
            obj["el"].remove()
        except:
            pass
        liste.remove(obj)

def creer_missile():
    if not en_cours:
        return
    if VITESSE_MISSILE <= 0:
        return

    m = document.createElement("div")
    m.className = "missile"
    arene <= m

    y = hauteur_arene() - 55
    obj = {"el": m, "x": x_vaisseau, "y": y}
    missiles.append(obj)

    m.style.left = f"{x_vaisseau}px"
    m.style.top = f"{y}px"
    m.style.transform = "translateX(-50%)"

def choisir_symbole_ennemi():
    if BONUS_COEUR_ACTIF and random.randint(1, 100) <= CHANCE_COEUR:
        return "❤️"
    return random.choice(ENNEMIS)

def creer_ennemi():
    if not en_cours:
        return
    if not ENNEMIS_AUTO:
        return

    symbole = choisir_symbole_ennemi()
    e = document.createElement("div")
    e.className = "bonus" if symbole == "❤️" else "ennemi"
    e.textContent = symbole
    arene <= e

    marge = 28
    w = largeur_arene()
    x = random.randint(marge, max(marge + 1, w - marge))
    y = 8

    obj = {"el": e, "x": x, "y": y, "symbole": symbole, "bonus": symbole == "❤️"}
    ennemis.append(obj)

    e.style.left = f"{x}px"
    e.style.top = f"{y}px"
    e.style.transform = "translate(-50%,-50%)"

def vitesse_ennemi_actuelle():
    if not DIFFICULTE_PROGRESSIVE:
        return VITESSE_ENNEMI
    bonus = calculer_niveau() - 1
    return min(VITESSE_ENNEMI + bonus, VITESSE_ENNEMI_MAX)

def vitesse_objet(obj):
    if obj.get("bonus"):
        return max(1, VITESSE_ENNEMI * 0.8)
    facteur = ENNEMIS_VITESSES.get(obj["symbole"], 1)
    return vitesse_ennemi_actuelle() * facteur

def collision(missile, objet):
    rect_m = missile["el"].getBoundingClientRect()
    rect_o = objet["el"].getBoundingClientRect()

    return not (
        rect_m.right < rect_o.left or
        rect_m.left > rect_o.right or
        rect_m.bottom < rect_o.top or
        rect_m.top > rect_o.bottom
    )

def boucle():
    global x_vaisseau, score, vies, attente_tir

    if not en_cours:
        return

    deplacement_vaisseau = max(2, VITESSE_VAISSEAU / 3)
    if "ArrowLeft" in touches:
        x_vaisseau -= deplacement_vaisseau
    if "ArrowRight" in touches:
        x_vaisseau += deplacement_vaisseau

    placer_vaisseau()

    if attente_tir > 0:
        attente_tir -= 1

    if "Space" in touches and attente_tir <= 0:
        creer_missile()
        attente_tir = DELAI_TIR

    for m in missiles[:]:
        m["y"] -= VITESSE_MISSILE
        m["el"].style.top = f"{m['y']}px"

        if m["y"] < -20:
            try:
                m["el"].remove()
            except:
                pass
            missiles.remove(m)

    for e in ennemis[:]:
        e["y"] += vitesse_objet(e)
        e["el"].style.top = f"{e['y']}px"

        if e["y"] > hauteur_arene() - 20:
            try:
                e["el"].remove()
            except:
                pass
            ennemis.remove(e)

            if e.get("bonus"):
                continue

            degats = ENNEMIS_DEGATS.get(e["symbole"], 1)
            vies -= degats
            maj_affichage()

            if vies <= 0:
                perdre()
                return

    for m in missiles[:]:
        for e in ennemis[:]:
            if collision(m, e):
                try:
                    m["el"].remove()
                    e["el"].remove()
                except:
                    pass

                if m in missiles:
                    missiles.remove(m)
                if e in ennemis:
                    ennemis.remove(e)

                if e.get("bonus"):
                    vies = min(VIES_MAX, vies + 1)
                    message("Bonus récupéré : +1 vie !")
                else:
                    points = ENNEMIS_POINTS.get(e["symbole"], 1)
                    score += points
                    annoncer_niveau_si_besoin()

                maj_affichage()

                if SCORE_CIBLE > 0 and score >= SCORE_CIBLE:
                    gagner()
                    return
                break

def demarrer():
    global en_cours, score, vies, id_boucle, id_spawn, x_vaisseau, dernier_niveau_annonce

    if not JEU_ACTIF:
        message("Le jeu n'est pas encore activé.")
        return

    if SCORE_CIBLE <= 0 or VITESSE_MISSILE <= 0 or VITESSE_ENNEMI <= 0 or not ENNEMIS_AUTO:
        message("Le jeu est presque prêt : continue les exercices.")
        return

    if en_cours:
        return

    supprimer_liste(missiles)
    supprimer_liste(ennemis)

    score = 0
    vies = VIES_DEPART
    dernier_niveau_annonce = 1
    x_vaisseau = int(largeur_arene() / 2)
    placer_vaisseau()
    maj_affichage()

    en_cours = True
    btn_demarrer.disabled = True
    message("Détruis les ennemis avant qu'ils atteignent le bas !")

    id_boucle = timer.set_interval(boucle, 30)
    id_spawn = timer.set_interval(creer_ennemi, DELAI_ENNEMI_MS)
    creer_ennemi()

def arreter():
    global en_cours, id_boucle, id_spawn
    en_cours = False
    btn_demarrer.disabled = False

    if id_boucle is not None:
        timer.clear_interval(id_boucle)
        id_boucle = None

    if id_spawn is not None:
        timer.clear_interval(id_spawn)
        id_spawn = None

def reinitialiser():
    global score, vies, x_vaisseau, dernier_niveau_annonce
    arreter()
    supprimer_liste(missiles)
    supprimer_liste(ennemis)

    score = 0
    vies = VIES_DEPART
    dernier_niveau_annonce = 1
    x_vaisseau = int(largeur_arene() / 2)

    placer_vaisseau()
    maj_affichage()
    message("Prêt ? Clique sur Démarrer.")

def gagner():
    arreter()
    supprimer_liste(missiles)
    supprimer_liste(ennemis)
    message("Bravo, mission réussie !")

def perdre():
    arreter()
    supprimer_liste(missiles)
    supprimer_liste(ennemis)
    message("Base touchée : mission échouée.")

def evenement_dans_editeur(ev):
    # Les touches du jeu ne doivent pas bloquer l'écriture dans les zones de code.
    try:
        cible = ev.target
        nom = cible.tagName.lower()
        if nom in ["textarea", "input", "select"]:
            return True
        if hasattr(cible, "isContentEditable") and cible.isContentEditable:
            return True
    except:
        pass
    return False

def touche_down(ev):
    if evenement_dans_editeur(ev):
        return

    k = ev.key
    if k == " ":
        k = "Space"

    if k in ["ArrowLeft", "ArrowRight", "Space"]:
        touches.add(k)
        ev.preventDefault()

def touche_up(ev):
    if evenement_dans_editeur(ev):
        return

    k = ev.key
    if k == " ":
        k = "Space"

    if k in touches:
        touches.remove(k)

window.__space_keydown__ = touche_down
window.__space_keyup__ = touche_up
window.__stop_jeu__ = arreter

document.bind("keydown", touche_down)
document.bind("keyup", touche_up)

btn_demarrer.bind("click", lambda ev: demarrer())
btn_reinit.bind("click", lambda ev: reinitialiser())

placer_vaisseau()
maj_affichage()
message("Prêt ? Clique sur Démarrer.")`;

/* =========================================================
   OUTILS POUR VALIDATION / RÉINITIALISATION / RÉTABLISSEMENT
========================================================= */

function cloneCode(c){
  return { html: c.html, css: c.css, py: c.py };
}

function escRegExp(txt){
  return txt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function setHtmlContentByClass(html, tag, className, value){
  const re = new RegExp("(<" + tag + "[^>]*class=[\"'][^\"']*\\b" + className + "\\b[^\"']*[\"'][^>]*>)[\\s\\S]*?(<\\/" + tag + ">)", "i");
  return html.replace(re, (m, a, b)=> a + value + b);
}

function setHtmlContentById(html, tag, id, value){
  const re = new RegExp("(<" + tag + "[^>]*id=[\"']" + id + "[\"'][^>]*>)[\\s\\S]*?(<\\/" + tag + ">)", "i");
  return html.replace(re, (m, a, b)=> a + value + b);
}

function addAideTouches(html){
  if(/class=["']aideTouches["']/i.test(html)) return html;
  return html.replace(/<div([^>]*)id=["']zoneExtra["']([^>]*)><\/div>/i,
    '<div$1id="zoneExtra"$2>\n        <p class="aideTouches">← → : déplacer | Espace : tirer</p>\n      </div>');
}

function removeAideTouches(html){
  return html
    .replace(/\s*<p[^>]*class=["']aideTouches["'][^>]*>\s*← → : déplacer \| Espace : tirer\s*<\/p>\s*/i, "")
    .replace(/<div([^>]*)id=["']zoneExtra["']([^>]*)>\s*<\/div>/i, '<div$1id="zoneExtra"$2></div>');
}

function addBlocNiveau(html){
  if(/id=["']niveauJeu["']/i.test(html)) return html;
  const bloc = `        <div class="carteStat">
          <div class="labelStat">Niveau</div>
          <div id="niveauJeu" class="valeurStat">0</div>
        </div>
`;
  return html.replace(/(\s*<\/div>\s*\n\s*\n\s*<div class="ligneBoutons">)/i, "\n" + bloc + "$1");
}

function removeBlocNiveau(html){
  return html.replace(/\s*<div[^>]*class=["'][^"']*\bcarteStat\b[^"']*["'][^>]*>\s*<div[^>]*class=["']labelStat["'][^>]*>\s*Niveau\s*<\/div>\s*<div[^>]*id=["']niveauJeu["'][^>]*>[\s\S]*?<\/div>\s*<\/div>/i, "");
}

function addClasseNiveau(html){
  if(/class=["'][^"']*\bniveauActuel\b[^"']*["'][\s\S]*id=["']niveauJeu["']/i.test(html)) return html;
  return html.replace(/<div class="carteStat">(\s*<div class="labelStat">Niveau<\/div>\s*<div id="niveauJeu" class="valeurStat">0<\/div>\s*<\/div>)/i,
    '<div class="carteStat niveauActuel">$1');
}

function removeClasseNiveau(html){
  return html.replace(/<div class="carteStat niveauActuel">(\s*<div class="labelStat">Niveau<\/div>)/i,
    '<div class="carteStat">$1');
}

function setCssProperty(css, selector, prop, value){
  const re = new RegExp("(" + escRegExp(selector) + "\\s*\\{[\\s\\S]*?" + escRegExp(prop) + "\\s*:\\s*)[^;]+(;?)", "i");
  if(re.test(css)){
    return css.replace(re, (m, a, b)=> a + value + (b || ";"));
  }
  const block = new RegExp("(" + escRegExp(selector) + "\\s*\\{)", "i");
  return css.replace(block, "$1\n  " + prop + ": " + value + ";");
}

function addCssRule(css, selector, ruleText){
  const re = new RegExp(escRegExp(selector) + "\\s*\\{[\\s\\S]*?\\}", "i");
  if(re.test(css)) return css.replace(re, ruleText);
  return css.trimEnd() + "\n\n" + ruleText + "\n";
}

function removeCssRule(css, selector){
  const re = new RegExp("\\n?\\s*" + escRegExp(selector) + "\\s*\\{[\\s\\S]*?\\}\\s*", "i");
  return css.replace(re, "\n");
}

function addDecorRules(css){
  const rules = `.areneJeu.decorNiveau2{
  background: radial-gradient(circle at top, #3a1a52, #050712);
}

.areneJeu.decorNiveau3{
  background: radial-gradient(circle at top, #523b1a, #050712);
}

.areneJeu.decorNiveau4{
  background: radial-gradient(circle at top, #5b1828, #050712);
}`;
  css = removeCssRule(css, ".areneJeu.decorNiveau2");
  css = removeCssRule(css, ".areneJeu.decorNiveau3");
  css = removeCssRule(css, ".areneJeu.decorNiveau4");
  return css.trimEnd() + "\n\n" + rules + "\n";
}

function removeDecorRules(css){
  css = removeCssRule(css, ".areneJeu.decorNiveau2");
  css = removeCssRule(css, ".areneJeu.decorNiveau3");
  css = removeCssRule(css, ".areneJeu.decorNiveau4");
  return css;
}

function setPythonConst(py, name, value){
  const re = new RegExp("^\\s*" + name + "\\s*=.*$", "m");
  if(re.test(py)) return py.replace(re, name + " = " + value);
  return name + " = " + value + "\n" + py;
}

function setCalculerNiveau(py, expr){
  return py.replace(/def\s+calculer_niveau\s*\(\)\s*:\s*\n\s*return\s+[^\n]*/m,
    "def calculer_niveau():\n    return " + expr);
}

function addAffichageNiveau(py){
  if(/niveau_el\.textContent\s*=\s*str\(calculer_niveau\(\)\)/.test(py)) return py;
  return py.replace(/([ \t]*)# Plus tard : afficher le niveau ici\./,
    "$1if niveau_el is not None:\n$1    niveau_el.textContent = str(calculer_niveau())");
}

function removeAffichageNiveau(py){
  if(!/niveau_el\.textContent\s*=\s*str\(calculer_niveau\(\)\)/.test(py)) return py;
  return py.replace(/\n([ \t]*)if\s+niveau_el\s+is\s+not\s+None\s*:\s*\n[ \t]*niveau_el\.textContent\s*=\s*str\(calculer_niveau\(\)\)/,
    "\n$1# Plus tard : afficher le niveau ici.");
}

function appliquerModifs(c, modifs){
  const n = cloneCode(c);
  modifs.forEach((m)=>{
    if(m.type === "htmlClass") n.html = setHtmlContentByClass(n.html, m.tag, m.className, m.value);
    if(m.type === "htmlId") n.html = setHtmlContentById(n.html, m.tag, m.id, m.value);
    if(m.type === "cssProp") n.css = setCssProperty(n.css, m.selector, m.prop, m.value);
    if(m.type === "pyConst") n.py = setPythonConst(n.py, m.name, m.value);
  });
  return n;
}

/* =========================================================
   ETAPES — progression pédagogique
========================================================= */

const ETAPES = window.ETAPES || [
  {
    langage:"HTML", titre:"HTML 1 — titre du jeu",
    objectif:`Dans le HTML, remplace exactement « <code>Titre</code> » par « <code>Space Défense</code> ».`,
    indice:`Cherche la ligne <code>&lt;h1 class="zoneTitre"&gt;Titre&lt;/h1&gt;</code>.`,
    verif:(c)=> /<h1[^>]*class=["'][^"']*\bzoneTitre\b[^"']*["'][^>]*>\s*Space Défense\s*<\/h1>/i.test(c.html),
    restore:(c)=> appliquerModifs(c, [{type:"htmlClass", tag:"h1", className:"zoneTitre", value:"Space Défense"}]),
    reset:(c)=> appliquerModifs(c, [{type:"htmlClass", tag:"h1", className:"zoneTitre", value:"Titre"}]),
  },
  {
    langage:"HTML", titre:"HTML 2 — phrase de présentation",
    objectif:`Dans le HTML, remplace exactement « <code>Paragraphe</code> » par « <code>Protège ta base contre les envahisseurs !</code> ».`,
    indice:`Cherche la ligne <code>&lt;p class="zoneParagraphe"&gt;Paragraphe&lt;/p&gt;</code>.`,
    verif:(c)=> /<p[^>]*class=["'][^"']*\bzoneParagraphe\b[^"']*["'][^>]*>\s*Protège ta base contre les envahisseurs !\s*<\/p>/i.test(c.html),
    restore:(c)=> appliquerModifs(c, [{type:"htmlClass", tag:"p", className:"zoneParagraphe", value:"Protège ta base contre les envahisseurs !"}]),
    reset:(c)=> appliquerModifs(c, [{type:"htmlClass", tag:"p", className:"zoneParagraphe", value:"Paragraphe"}]),
  },
  {
    langage:"HTML", titre:"HTML 3 — nom des boutons",
    objectif:`Dans le HTML, remplace le texte du premier bouton par « <code>Démarrer</code> » et celui du second bouton par « <code>Recommencer</code> ».`,
    indice:`Cherche <code>id="btnDemarrer"</code> puis <code>id="btnReinitialiser"</code>.`,
    verif:(c)=> /<button[^>]*id=["']btnDemarrer["'][^>]*>\s*Démarrer\s*<\/button>/i.test(c.html)
      && /<button[^>]*id=["']btnReinitialiser["'][^>]*>\s*Recommencer\s*<\/button>/i.test(c.html),
    restore:(c)=> appliquerModifs(c, [
      {type:"htmlId", tag:"button", id:"btnDemarrer", value:"Démarrer"},
      {type:"htmlId", tag:"button", id:"btnReinitialiser", value:"Recommencer"},
    ]),
    reset:(c)=> appliquerModifs(c, [
      {type:"htmlId", tag:"button", id:"btnDemarrer", value:"Bouton"},
      {type:"htmlId", tag:"button", id:"btnReinitialiser", value:"Bouton"},
    ]),
  },
  {
    langage:"HTML", titre:"HTML 4 — symbole du vaisseau",
    objectif:`Dans le HTML, remplace le symbole « <code>?</code> » du vaisseau par « <code>🚀</code> ».`,
    indice:`Cherche <code>&lt;div id="vaisseau" class="vaisseau"&gt;?&lt;/div&gt;</code>.`,
    verif:(c)=> /<div[^>]*id=["']vaisseau["'][^>]*>\s*🚀\s*<\/div>/i.test(c.html),
    restore:(c)=> appliquerModifs(c, [{type:"htmlId", tag:"div", id:"vaisseau", value:"🚀"}]),
    reset:(c)=> appliquerModifs(c, [{type:"htmlId", tag:"div", id:"vaisseau", value:"?"}]),
  },
  {
    langage:"CSS", titre:"CSS 1 — agrandir la zone de jeu",
    objectif:`Dans <code>.areneJeu</code>, remplace exactement <code>height: 320px;</code> par <code>height: 760px;</code>.`,
    indice:`Cherche la règle CSS <code>.areneJeu</code>.`,
    verif:(c)=> /\.areneJeu\s*\{[\s\S]*height\s*:\s*760px\s*;/i.test(c.css),
    restore:(c)=> appliquerModifs(c, [{type:"cssProp", selector:".areneJeu", prop:"height", value:"760px"}]),
    reset:(c)=> appliquerModifs(c, [{type:"cssProp", selector:".areneJeu", prop:"height", value:"320px"}]),
  },
  {
    langage:"CSS", titre:"CSS 2 — fond spatial",
    objectif:`Dans <code>.areneJeu</code>, remplace exactement la propriété <code>background</code> par <code>background: radial-gradient(circle at top, #1a2a52, #050712);</code>.`,
    indice:`Le point-virgule final est conseillé. Les couleurs doivent être écrites exactement comme dans la consigne.`,
    verif:(c)=> /\.areneJeu\s*\{[\s\S]*background\s*:\s*radial-gradient\(circle at top,\s*#1a2a52,\s*#050712\)\s*;/i.test(c.css),
    restore:(c)=> appliquerModifs(c, [{type:"cssProp", selector:".areneJeu", prop:"background", value:"radial-gradient(circle at top, #1a2a52, #050712)"}]),
    reset:(c)=> appliquerModifs(c, [{type:"cssProp", selector:".areneJeu", prop:"background", value:"rgba(0,0,0,.25)"}]),
  },
  {
    langage:"CSS", titre:"CSS 3 — taille du vaisseau",
    objectif:`Dans <code>.vaisseau</code>, remplace exactement <code>font-size: 28px;</code> par <code>font-size: 38px;</code>.`,
    indice:`Cherche la règle CSS <code>.vaisseau</code>.`,
    verif:(c)=> /\.vaisseau\s*\{[\s\S]*font-size\s*:\s*38px\s*;/i.test(c.css),
    restore:(c)=> appliquerModifs(c, [{type:"cssProp", selector:".vaisseau", prop:"font-size", value:"38px"}]),
    reset:(c)=> appliquerModifs(c, [{type:"cssProp", selector:".vaisseau", prop:"font-size", value:"28px"}]),
  },
  {
    langage:"CSS", titre:"CSS 4 — missiles et ennemis",
    objectif:`Dans <code>.missile</code>, écris exactement <code>background: #2fffd6;</code>. Dans <code>.ennemi</code>, écris exactement <code>font-size: 32px;</code>.`,
    indice:`Il y a deux modifications à faire pour réussir cette étape.`,
    verif:(c)=> /\.missile\s*\{[\s\S]*background\s*:\s*#2fffd6\s*;/i.test(c.css)
      && /\.ennemi\s*\{[\s\S]*font-size\s*:\s*32px\s*;/i.test(c.css),
    restore:(c)=> appliquerModifs(c, [
      {type:"cssProp", selector:".missile", prop:"background", value:"#2fffd6"},
      {type:"cssProp", selector:".ennemi", prop:"font-size", value:"32px"},
    ]),
    reset:(c)=> appliquerModifs(c, [
      {type:"cssProp", selector:".missile", prop:"background", value:"#ffd36e"},
      {type:"cssProp", selector:".ennemi", prop:"font-size", value:"24px"},
    ]),
  },
  {
    langage:"Python", titre:"Python 1 — activer le jeu",
    objectif:`Dans le Python, remplace « <code>JEU_ACTIF = False</code> » par « <code>JEU_ACTIF = True</code> ».`,
    indice:`Le mot <code>True</code> commence par une majuscule.`,
    verif:(c)=> /^\s*JEU_ACTIF\s*=\s*True\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"JEU_ACTIF", value:"True"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"JEU_ACTIF", value:"False"}]),
  },
  {
    langage:"Python", titre:"Python 2 — objectif et vies",
    objectif:`Dans le Python, fais les deux modifications suivantes : <code>SCORE_CIBLE = 5</code> et <code>VIES_DEPART = 3</code>. Les deux lignes doivent être correctes pour valider l'exercice.`,
    indice:`Le score cible sert à gagner. Les vies de départ servent à éviter de perdre dès la première erreur.`,
    verif:(c)=> /^\s*SCORE_CIBLE\s*=\s*5\s*$/m.test(c.py) && /^\s*VIES_DEPART\s*=\s*3\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"SCORE_CIBLE", value:"5"},
      {type:"pyConst", name:"VIES_DEPART", value:"3"},
    ]),
    reset:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"SCORE_CIBLE", value:"0"},
      {type:"pyConst", name:"VIES_DEPART", value:"1"},
    ]),
  },
  {
    langage:"Python", titre:"Python 3 — vitesses des tirs et ennemis",
    objectif:`Dans le Python, fais les deux modifications suivantes : <code>VITESSE_MISSILE = 10</code> et <code>VITESSE_ENNEMI = 2</code>.`,
    indice:`Sans vitesse de missile, le joueur ne peut pas tirer. Sans vitesse d'ennemi, les ennemis ne descendent pas.`,
    verif:(c)=> /^\s*VITESSE_MISSILE\s*=\s*10\s*$/m.test(c.py) && /^\s*VITESSE_ENNEMI\s*=\s*2\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"VITESSE_MISSILE", value:"10"},
      {type:"pyConst", name:"VITESSE_ENNEMI", value:"2"},
    ]),
    reset:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"VITESSE_MISSILE", value:"0"},
      {type:"pyConst", name:"VITESSE_ENNEMI", value:"0"},
    ]),
  },
  {
    langage:"Python", titre:"Python 4 — vitesse du vaisseau",
    objectif:`Dans le Python, remplace « <code>VITESSE_VAISSEAU = 18</code> » par « <code>VITESSE_VAISSEAU = 22</code> ».`,
    indice:`Cette variable règle la vitesse de déplacement du vaisseau avec les flèches gauche et droite.`,
    verif:(c)=> /^\s*VITESSE_VAISSEAU\s*=\s*22\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"VITESSE_VAISSEAU", value:"22"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"VITESSE_VAISSEAU", value:"18"}]),
  },
  {
    langage:"Python", titre:"Python 5 — délai entre deux tirs",
    objectif:`Dans le Python, remplace « <code>DELAI_TIR = 8</code> » par « <code>DELAI_TIR = 6</code> ».`,
    indice:`Plus le nombre est petit, plus le vaisseau peut tirer rapidement.`,
    verif:(c)=> /^\s*DELAI_TIR\s*=\s*6\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"DELAI_TIR", value:"6"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"DELAI_TIR", value:"8"}]),
  },
  {
    langage:"Python", titre:"Python 6 — apparition des ennemis",
    objectif:`Dans le Python, remplace « <code>ENNEMIS_AUTO = False</code> » par « <code>ENNEMIS_AUTO = True</code> ».`,
    indice:`Après cette étape, le jeu devient jouable : on peut gagner ou perdre.`,
    verif:(c)=> /^\s*ENNEMIS_AUTO\s*=\s*True\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS_AUTO", value:"True"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS_AUTO", value:"False"}]),
  },
  {
    langage:"HTML", titre:"HTML 5 — ajouter les commandes",
    objectif:`Dans le HTML, trouve <code>&lt;div id="zoneExtra" class="zoneExtra"&gt;&lt;/div&gt;</code>. Transforme cette ligne pour placer à l’intérieur : <code>&lt;p class="aideTouches"&gt;← → : déplacer | Espace : tirer&lt;/p&gt;</code>.`,
    indice:`La balise <code>&lt;p&gt;</code> doit être écrite entre l’ouverture <code>&lt;div id="zoneExtra" class="zoneExtra"&gt;</code> et la fermeture <code>&lt;/div&gt;</code>. La barre <code>|</code> doit rester présente.`,
    verif:(c)=> /<div[^>]*id=["']zoneExtra["'][^>]*>[\s\S]*<p[^>]*class=["']aideTouches["'][^>]*>\s*← → : déplacer \| Espace : tirer\s*<\/p>[\s\S]*<\/div>/i.test(c.html),
    restore:(c)=> ({...c, html:addAideTouches(c.html)}),
    reset:(c)=> ({...c, html:removeAideTouches(c.html)}),
  },
  {
    langage:"CSS", titre:"CSS 5 — créer et améliorer l’aide",
    objectif:`Dans le CSS, ajoute une règle <code>.aideTouches</code> contenant exactement ces trois propriétés : <code>color: #2fffd6;</code>, <code>text-align: center;</code> et <code>font-weight: 900;</code>.`,
    indice:`Tu peux ajouter cette règle à la fin du fichier CSS.`,
    verif:(c)=> /\.aideTouches\s*\{[\s\S]*color\s*:\s*#2fffd6\s*;[\s\S]*text-align\s*:\s*center\s*;[\s\S]*font-weight\s*:\s*900\s*;/i.test(c.css)
      || /\.aideTouches\s*\{[\s\S]*color\s*:\s*#2fffd6\s*;[\s\S]*font-weight\s*:\s*900\s*;[\s\S]*text-align\s*:\s*center\s*;/i.test(c.css),
    restore:(c)=> ({...c, css:addCssRule(c.css, ".aideTouches", `.aideTouches{
  color: #2fffd6;
  text-align: center;
  font-weight: 900;
}`)}),
    reset:(c)=> ({...c, css:removeCssRule(c.css, ".aideTouches")}),
  },
  {
    langage:"HTML", titre:"HTML 6 — ajouter l’affichage du niveau",
    objectif:`Dans <code>ligneStats</code>, ajoute un 4e bloc juste après <code>Objectif</code>. Ce bloc doit contenir exactement le label <code>Niveau</code> et la valeur <code>id="niveauJeu"</code>.`,
    indice:`Copie un bloc <code>carteStat</code> existant, colle-le après Objectif, puis remplace le label et l'id.`,
    verif:(c)=> /id=["']objectifJeu["'][\s\S]*<div[^>]*class=["'][^"']*\bcarteStat\b[^"']*["'][^>]*>[\s\S]*Niveau[\s\S]*id=["']niveauJeu["']/i.test(c.html),
    restore:(c)=> ({...c, html:addBlocNiveau(c.html)}),
    reset:(c)=> ({...c, html:removeBlocNiveau(c.html)}),
  },
  {
    langage:"CSS", titre:"CSS 6 — quatre statistiques",
    objectif:`Dans <code>.ligneStats</code>, remplace exactement <code>repeat(3, 1fr)</code> par <code>repeat(4, 1fr)</code>.`,
    indice:`Cela permet d'afficher correctement Score, Vies, Objectif et Niveau.`,
    verif:(c)=> /\.ligneStats\s*\{[\s\S]*grid-template-columns\s*:\s*repeat\(4,\s*1fr\)\s*;/i.test(c.css),
    restore:(c)=> appliquerModifs(c, [{type:"cssProp", selector:".ligneStats", prop:"grid-template-columns", value:"repeat(4, 1fr)"}]),
    reset:(c)=> appliquerModifs(c, [{type:"cssProp", selector:".ligneStats", prop:"grid-template-columns", value:"repeat(3, 1fr)"}]),
  },
  {
    langage:"HTML", titre:"HTML 7 — classe du bloc Niveau",
    objectif:`Sur le bloc <code>Niveau</code>, remplace exactement <code>class="carteStat"</code> par <code>class="carteStat niveauActuel"</code>.`,
    indice:`Cette classe permettra de donner une bordure différente au bloc Niveau.`,
    verif:(c)=> /<div[^>]*class=["'][^"']*\bcarteStat\b[^"']*\bniveauActuel\b[^"']*["'][^>]*>[\s\S]*Niveau[\s\S]*id=["']niveauJeu["']/i.test(c.html),
    restore:(c)=> ({...c, html:addClasseNiveau(c.html)}),
    reset:(c)=> ({...c, html:removeClasseNiveau(c.html)}),
  },
  {
    langage:"CSS", titre:"CSS 7 — style du niveau",
    objectif:`Dans le CSS, ajoute une règle <code>.niveauActuel</code> avec exactement <code>border-color: rgba(47,255,214,.45);</code>.`,
    indice:`La virgule et le point devant <code>.45</code> sont importants.`,
    verif:(c)=> /\.niveauActuel\s*\{[\s\S]*border-color\s*:\s*rgba\(47,\s*255,\s*214,\s*\.45\)\s*;/i.test(c.css),
    restore:(c)=> ({...c, css:addCssRule(c.css, ".niveauActuel", `.niveauActuel{
  border-color: rgba(47,255,214,.45);
}`)}),
    reset:(c)=> ({...c, css:removeCssRule(c.css, ".niveauActuel")}),
  },
  {
    langage:"Python", titre:"Python 7 — ajouter un deuxième ennemi",
    objectif:`Dans le Python, remplace « <code>ENNEMIS = ["👾"]</code> » par « <code>ENNEMIS = ["👾", "🛸"]</code> ».`,
    indice:`Chaque ennemi doit être dans ses propres guillemets. Il faut une virgule entre les deux.`,
    verif:(c)=> /^\s*ENNEMIS\s*=\s*\[\s*["']👾["']\s*,\s*["']🛸["']\s*\]\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS", value:'["👾", "🛸"]'}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS", value:'["👾"]'}]),
  },
  {
    langage:"Python", titre:"Python 8 — difficulté progressive",
    objectif:`Dans le Python, fais les deux modifications suivantes : <code>DIFFICULTE_PROGRESSIVE = True</code> et <code>VITESSE_ENNEMI_MAX = 6</code>.`,
    indice:`La première ligne active l'accélération progressive. La deuxième fixe une limite pour éviter que le jeu devienne injouable.`,
    verif:(c)=> /^\s*DIFFICULTE_PROGRESSIVE\s*=\s*True\s*$/m.test(c.py) && /^\s*VITESSE_ENNEMI_MAX\s*=\s*6\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"DIFFICULTE_PROGRESSIVE", value:"True"},
      {type:"pyConst", name:"VITESSE_ENNEMI_MAX", value:"6"},
    ]),
    reset:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"DIFFICULTE_PROGRESSIVE", value:"False"},
      {type:"pyConst", name:"VITESSE_ENNEMI_MAX", value:"4"},
    ]),
  },
  {
    langage:"Python", titre:"Python 9 — ennemis plus fréquents",
    objectif:`Dans le Python, remplace « <code>DELAI_ENNEMI_MS = 1200</code> » par « <code>DELAI_ENNEMI_MS = 900</code> ».`,
    indice:`Le délai est en millisecondes : plus il est petit, plus les ennemis apparaissent souvent.`,
    verif:(c)=> /^\s*DELAI_ENNEMI_MS\s*=\s*900\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"DELAI_ENNEMI_MS", value:"900"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"DELAI_ENNEMI_MS", value:"1200"}]),
  },
  {
    langage:"Python", titre:"Python 10 — calcul du niveau",
    objectif:`Dans <code>calculer_niveau()</code>, remplace « <code>return 1</code> » par « <code>return 1 + score // 5</code> ».`,
    indice:`Le symbole <code>//</code> permet de faire une division entière. Le niveau augmente tous les 5 points.`,
    verif:(c)=> /def\s+calculer_niveau\s*\(\)\s*:\s*\n\s*return\s+1\s*\+\s*score\s*\/\/\s*5\s*$/m.test(c.py),
    restore:(c)=> ({...c, py:setCalculerNiveau(c.py, "1 + score // 5")}),
    reset:(c)=> ({...c, py:setCalculerNiveau(c.py, "1")}),
  },
  {
    langage:"Python", titre:"Python 11 — afficher le niveau",
    objectif:`Dans <code>maj_affichage()</code>, remplace le commentaire <code># Plus tard : afficher le niveau ici.</code> par <code>if niveau_el is not None:</code> puis, à la ligne suivante, <code>niveau_el.textContent = str(calculer_niveau())</code>.`,
    indice:`La ligne <code>if</code> doit être dans la fonction. La ligne <code>niveau_el...</code> doit être encore plus décalée vers la droite.`,
    verif:(c)=> /def\s+maj_affichage\s*\(\)\s*:[\s\S]*if\s+niveau_el\s+is\s+not\s+None\s*:\s*\n\s+niveau_el\.textContent\s*=\s*str\(calculer_niveau\(\)\)/.test(c.py),
    restore:(c)=> ({...c, py:addAffichageNiveau(c.py)}),
    reset:(c)=> ({...c, py:removeAffichageNiveau(c.py)}),
  },
  {
    langage:"Python", titre:"Python 12 — ajouter plusieurs ennemis",
    objectif:`Dans le Python, remplace la liste des ennemis par exactement <code>ENNEMIS = ["👾", "🛸", "☄️", "🛰️"]</code>.`,
    indice:`Il faut quatre éléments séparés par des virgules.`,
    verif:(c)=> /^\s*ENNEMIS\s*=\s*\[\s*["']👾["']\s*,\s*["']🛸["']\s*,\s*["']☄️["']\s*,\s*["']🛰️["']\s*\]\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS", value:'["👾", "🛸", "☄️", "🛰️"]'}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS", value:'["👾", "🛸"]'}]),
  },
  {
    langage:"Python", titre:"Python 13 — vitesses différentes",
    objectif:`Dans le Python, remplace la ligne <code>ENNEMIS_VITESSES</code> par « <code>ENNEMIS_VITESSES = {"👾": 1, "🛸": 1.4, "☄️": 2, "🛰️": 0.7}</code> ».`,
    indice:`Le dictionnaire indique un coefficient de vitesse pour chaque ennemi.`,
    verif:(c)=> /^\s*ENNEMIS_VITESSES\s*=\s*\{\s*["']👾["']\s*:\s*1\s*,\s*["']🛸["']\s*:\s*1\.4\s*,\s*["']☄️["']\s*:\s*2\s*,\s*["']🛰️["']\s*:\s*0\.7\s*\}\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS_VITESSES", value:'{"👾": 1, "🛸": 1.4, "☄️": 2, "🛰️": 0.7}'}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS_VITESSES", value:'{"👾": 1}'}]),
  },
  {
    langage:"Python", titre:"Python 14 — ennemi dangereux",
    objectif:`Dans le Python, ajoute l'ennemi dangereux <code>💀</code> dans <code>ENNEMIS</code>, puis remplace exactement <code>ENNEMIS_DEGATS</code> par <code>ENNEMIS_DEGATS = {"👾": 1, "🛸": 1, "☄️": 1, "🛰️": 1, "💀": 2}</code>.`,
    indice:`Si <code>💀</code> atteint le bas, le joueur perd 2 vies.`,
    verif:(c)=> /^\s*ENNEMIS\s*=\s*\[\s*["']👾["']\s*,\s*["']🛸["']\s*,\s*["']☄️["']\s*,\s*["']🛰️["']\s*,\s*["']💀["']\s*\]\s*$/m.test(c.py)
      && /^\s*ENNEMIS_DEGATS\s*=\s*\{\s*["']👾["']\s*:\s*1\s*,\s*["']🛸["']\s*:\s*1\s*,\s*["']☄️["']\s*:\s*1\s*,\s*["']🛰️["']\s*:\s*1\s*,\s*["']💀["']\s*:\s*2\s*\}\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"ENNEMIS", value:'["👾", "🛸", "☄️", "🛰️", "💀"]'},
      {type:"pyConst", name:"ENNEMIS_DEGATS", value:'{"👾": 1, "🛸": 1, "☄️": 1, "🛰️": 1, "💀": 2}'},
    ]),
    reset:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"ENNEMIS", value:'["👾", "🛸", "☄️", "🛰️"]'},
      {type:"pyConst", name:"ENNEMIS_DEGATS", value:'{"👾": 1}'},
    ]),
  },
  {
    langage:"Python", titre:"Python 15 — ennemis qui rapportent plus",
    objectif:`Dans le Python, remplace <code>ENNEMIS_POINTS</code> par « <code>ENNEMIS_POINTS = {"👾": 1, "🛸": 1, "☄️": 2, "🛰️": 3, "💀": 4}</code> ».`,
    indice:`Les ennemis plus difficiles peuvent rapporter plus de points.`,
    verif:(c)=> /^\s*ENNEMIS_POINTS\s*=\s*\{\s*["']👾["']\s*:\s*1\s*,\s*["']🛸["']\s*:\s*1\s*,\s*["']☄️["']\s*:\s*2\s*,\s*["']🛰️["']\s*:\s*3\s*,\s*["']💀["']\s*:\s*4\s*\}\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS_POINTS", value:'{"👾": 1, "🛸": 1, "☄️": 2, "🛰️": 3, "💀": 4}'}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS_POINTS", value:'{"👾": 1}'}]),
  },
  {
    langage:"Python", titre:"Python 16 — bonus cœur",
    objectif:`Dans le Python, fais les deux modifications suivantes : <code>BONUS_COEUR_ACTIF = True</code> et <code>CHANCE_COEUR = 8</code>.`,
    indice:`Le cœur apparaît parfois. Si le joueur le touche avec un missile, il gagne 1 vie, sans dépasser le maximum.`,
    verif:(c)=> /^\s*BONUS_COEUR_ACTIF\s*=\s*True\s*$/m.test(c.py) && /^\s*CHANCE_COEUR\s*=\s*8\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"BONUS_COEUR_ACTIF", value:"True"},
      {type:"pyConst", name:"CHANCE_COEUR", value:"8"},
    ]),
    reset:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"BONUS_COEUR_ACTIF", value:"False"},
      {type:"pyConst", name:"CHANCE_COEUR", value:"0"},
    ]),
  },
  {
    langage:"CSS", titre:"CSS 8 — décors selon le niveau",
    objectif:`Dans le CSS, ajoute les trois règles <code>.areneJeu.decorNiveau2</code>, <code>.areneJeu.decorNiveau3</code> et <code>.areneJeu.decorNiveau4</code> données dans l'indice.`,
    indice:`Utilise ces fonds : niveau 2 <code>radial-gradient(circle at top, #3a1a52, #050712)</code>, niveau 3 <code>radial-gradient(circle at top, #523b1a, #050712)</code>, niveau 4 <code>radial-gradient(circle at top, #5b1828, #050712)</code>.`,
    verif:(c)=> /\.areneJeu\.decorNiveau2\s*\{[\s\S]*#3a1a52[\s\S]*#050712[\s\S]*\}/i.test(c.css)
      && /\.areneJeu\.decorNiveau3\s*\{[\s\S]*#523b1a[\s\S]*#050712[\s\S]*\}/i.test(c.css)
      && /\.areneJeu\.decorNiveau4\s*\{[\s\S]*#5b1828[\s\S]*#050712[\s\S]*\}/i.test(c.css),
    restore:(c)=> ({...c, css:addDecorRules(c.css)}),
    reset:(c)=> ({...c, css:removeDecorRules(c.css)}),
  },
  {
    langage:"Python", titre:"Python 17 — activer les décors",
    objectif:`Dans le Python, remplace « <code>DECORS_NIVEAUX = False</code> » par « <code>DECORS_NIVEAUX = True</code> ».`,
    indice:`Le décor changera automatiquement selon le niveau atteint.`,
    verif:(c)=> /^\s*DECORS_NIVEAUX\s*=\s*True\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"DECORS_NIVEAUX", value:"True"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"DECORS_NIVEAUX", value:"False"}]),
  },
  {
    langage:"Python", titre:"Python 18 — messages de niveau",
    objectif:`Dans le Python, remplace « <code>MESSAGES_NIVEAUX = False</code> » par « <code>MESSAGES_NIVEAUX = True</code> ».`,
    indice:`Le jeu affichera un message quand le joueur passe à un niveau supérieur.`,
    verif:(c)=> /^\s*MESSAGES_NIVEAUX\s*=\s*True\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"MESSAGES_NIVEAUX", value:"True"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"MESSAGES_NIVEAUX", value:"False"}]),
  },
  {
    langage:"Python", titre:"Python 19 — objectif final",
    objectif:`Dans le Python, remplace « <code>SCORE_CIBLE = 5</code> » par « <code>SCORE_CIBLE = 20</code> ».`,
    indice:`Le jeu dure plus longtemps et permet de voir les nouveaux niveaux.`,
    verif:(c)=> /^\s*SCORE_CIBLE\s*=\s*20\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"SCORE_CIBLE", value:"20"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"SCORE_CIBLE", value:"5"}]),
  },
];

/* =========================================================
   DOM
========================================================= */
const $ = (id)=> document.getElementById(id);

const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;
const viewport = $("viewport");

function updateScale(){
  if(!viewport) return;
  const scale = Math.min(window.innerWidth / BASE_WIDTH, window.innerHeight / BASE_HEIGHT);
  const scaledWidth = BASE_WIDTH * scale;
  const scaledHeight = BASE_HEIGHT * scale;
  viewport.style.transform = `scale(${scale})`;
  viewport.style.left = `${Math.max(0, (window.innerWidth - scaledWidth) / 2)}px`;
  viewport.style.top = `${Math.max(0, (window.innerHeight - scaledHeight) / 2)}px`;
}

window.addEventListener("resize", updateScale);

const ui = {
  stepHeader: $("stepHeader"),
  zoneConsigne: $("zoneConsigne"),
  codeHtml: $("codeHtml"),
  codeCss: $("codeCss"),
  codePy: $("codePy"),
  btnAppliquer: $("btnAppliquer"),
  btnReinit: $("btnReinit"),
  btnRetablir: $("btnRetablir"),
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
const ETAT_NON_FAIT = "non-fait";
const ETAT_REUSSI = "reussi";
const ETAT_REINITIALISE = "reinitialise";

const etat = {
  etape: 0,
  statut: Array(ETAPES.length).fill(ETAT_NON_FAIT),
  dejaReussi: Array(ETAPES.length).fill(false),
  code: { html: HTML_BASE, css: CSS_BASE, py: PY_BASE },
};

function definirStatut(texte, type=""){
  ui.zoneStatut.classList.remove("ok","bad","reset");
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

function maxEtapeAccessible(){
  let max = 0;
  for(let i = 0; i < ETAPES.length; i++){
    if(etat.dejaReussi[i] || etat.statut[i] === ETAT_REUSSI || etat.statut[i] === ETAT_REINITIALISE){
      max = Math.min(ETAPES.length - 1, i + 1);
    }
  }
  return max;
}

function peutAccederEtape(i){
  return i <= maxEtapeAccessible() || etat.dejaReussi[i];
}

function majBoutons(){
  const statut = etat.statut[etat.etape];
  ui.btnSuivant.disabled = statut !== ETAT_REUSSI;
  ui.btnRetablir.disabled = !(statut === ETAT_REINITIALISE && etat.dejaReussi[etat.etape]);
}

function rendreEtapesHaut(){
  ui.stepHeader.innerHTML = "";

  ETAPES.forEach((_, i)=>{
    const d = document.createElement("div");
    d.className = "stepDot";
    d.textContent = String(i + 1);

    if(etat.statut[i] === ETAT_REUSSI) d.classList.add("done");
    if(etat.statut[i] === ETAT_REINITIALISE) d.classList.add("reset");
    if(i === etat.etape) d.classList.add("active");

    const accessible = peutAccederEtape(i);
    if(accessible){
      d.addEventListener("click", ()=> allerEtape(i));
    }else{
      d.classList.add("locked");
    }

    if(etat.statut[i] === ETAT_REUSSI) d.title = "Exercice réussi";
    else if(etat.statut[i] === ETAT_REINITIALISE) d.title = "Exercice réussi puis réinitialisé";
    else d.title = accessible ? "Exercice à faire" : "Exercice non accessible";

    ui.stepHeader.appendChild(d);
  });
}

function rendreConsigne(){
  const e = ETAPES[etat.etape];
  ui.zoneConsigne.innerHTML = `
    <h3>${etat.etape + 1}. ${e.titre}</h3>
    <p>${e.objectif}</p>
    <div class="indice">Indice : ${e.indice}</div>
  `;
  const ong = (e.langage === "HTML") ? "html" : (e.langage === "CSS") ? "css" : "py";
  definirOnglet(ong);
}

function scopeCSS(css){
  return css.replace(/(^|\})\s*([^\{@\}][^\{]*?)\s*\{/g, (m, end, sel) => {
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

function appliquerApercu(options={ valider:true, messageAuto:true }){
  collecterCode();

  try{ if(window.__stop_jeu__) window.__stop_jeu__(); }catch(e){}

  ui.apercu.innerHTML = etat.code.html;
  ui.styleEleve.textContent = scopeCSS(etat.code.css);
  ui.pythonEleve.textContent = etat.code.py;

  try{ brython({cache:"none"}); }catch(err){ console.error(err); }

  if(options.valider){
    if(validerEtape()){
      etat.statut[etat.etape] = ETAT_REUSSI;
      etat.dejaReussi[etat.etape] = true;
      if(options.messageAuto) definirStatut("Étape réussie", "ok");
    }else{
      if(etat.statut[etat.etape] !== ETAT_REINITIALISE){
        etat.statut[etat.etape] = ETAT_NON_FAIT;
      }
      if(options.messageAuto) definirStatut("Pas encore", "bad");
    }
  }

  majBoutons();
  rendreEtapesHaut();
}

function reinitialiserEtape(){
  collecterCode();
  const e = ETAPES[etat.etape];
  if(typeof e.reset === "function"){
    etat.code = e.reset(etat.code);
  }

  if(etat.dejaReussi[etat.etape]){
    etat.statut[etat.etape] = ETAT_REINITIALISE;
    definirStatut("Exercice réinitialisé. Tu peux cliquer sur Rétablir pour remettre la version réussie.", "reset");
  }else{
    etat.statut[etat.etape] = ETAT_NON_FAIT;
    definirStatut("Exercice réinitialisé.");
  }

  afficherCode();
  appliquerApercu({ valider:false, messageAuto:false });
}

function retablirEtape(){
  collecterCode();
  const e = ETAPES[etat.etape];
  if(!(etat.statut[etat.etape] === ETAT_REINITIALISE && etat.dejaReussi[etat.etape])) return;

  if(typeof e.restore === "function"){
    etat.code = e.restore(etat.code);
  }

  etat.statut[etat.etape] = ETAT_REUSSI;
  afficherCode();
  appliquerApercu({ valider:true, messageAuto:false });
  definirStatut("Exercice rétabli.", "ok");
}

function etapeSuivante(){
  if(etat.statut[etat.etape] !== ETAT_REUSSI) return;

  if(etat.etape < ETAPES.length - 1){
    etat.etape += 1;
    rendreConsigne();
    afficherCode();
    definirStatut("Nouvelle étape");
    appliquerApercu({ valider:false, messageAuto:false });
  }else{
    definirStatut("Tout est terminé : le jeu est complet.", "ok");
  }
}

function allerEtape(i){
  if(!peutAccederEtape(i)) return;

  etat.etape = i;
  rendreConsigne();
  afficherCode();
  definirStatut("Étape sélectionnée");
  appliquerApercu({ valider:false, messageAuto:false });
}

/* Events */
onglets.forEach(b=> b.addEventListener("click", ()=> definirOnglet(b.dataset.tab)));
ui.btnAppliquer.addEventListener("click", ()=> appliquerApercu({ valider:true, messageAuto:true }));
ui.btnReinit.addEventListener("click", reinitialiserEtape);
ui.btnRetablir.addEventListener("click", retablirEtape);
ui.btnSuivant.addEventListener("click", etapeSuivante);

/* Init */
(function init(){
  updateScale();
  afficherCode();
  rendreEtapesHaut();
  rendreConsigne();
  definirStatut("Modifier le code puis cliquer sur Appliquer");
  appliquerApercu({ valider:false, messageAuto:false });
})();
