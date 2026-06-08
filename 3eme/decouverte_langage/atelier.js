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
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.entete{ text-align:center; margin-bottom:8px; flex: 0 0 auto; }
.zoneTitre{ font-size: 32px; font-weight: 900; margin:0 0 6px; }
.zoneParagraphe{ font-size: 22px; opacity: .9; margin:0; }

.grille{
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 12px;
}

.tableauBord, .zoneJeu{
  background: rgba(255,255,255,.04);
  border: 2px solid rgba(255,255,255,.12);
  border-radius: 14px;
  padding: 10px;
}

.tableauBord{
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.zoneJeu{
  display: flex;
  flex-direction: column;
  min-height: 0;
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
.labelStat{ font-size: 19px; opacity:.9; }
.valeurStat{ font-size: 32px; font-weight: 900; margin-top: 3px; }

.ligneBoutons{
  display: flex;
  gap: 10px;
  margin: 0;
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
  font-size: 22px;
}
button.secondaire{
  background: transparent;
  color: #ffe8fb;
}

.messageJeu{
  padding: 11px;
  border-radius: 12px;
  background: rgba(0,0,0,.20);
  border: 1px solid rgba(255,255,255,.10);
  font-size: 22px;
  opacity: .95;
}

.zoneExtra:empty{ display:none; }
.zoneExtra{
  margin-top: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-size: 22px;
}

.sousTitre{
  font-weight: 900;
  font-size: 24px;
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
  width: 6px;
  height: 18px;
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

VIES_DEPART = 1

VITESSE_VAISSEAU = 18
VITESSE_MISSILE = 0
VITESSE_ENNEMI = 0
VITESSE_ENNEMI_MAX = 3.8

DELAI_TIR = 8
DELAI_ENNEMI_MS = 1200
ENNEMIS_AUTO = False
DIFFICULTE_PROGRESSIVE = False

ENNEMIS = ["👾"]
ENNEMIS_VITESSES = {"👾": 1}
ENNEMIS_DEGATS = {"👾": 1}

OBJECTIFS_NIVEAUX = [5]
NIVEAU_MAX = 1

COEUR_PAR_NIVEAU = False
BONUS_SANS_FAUTE = False
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
info_el = element_optionnel("infoJeu")

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
score_niveau = 0
vies = VIES_DEPART
niveau = 1
x_vaisseau = 0

en_cours = False
missiles = []
ennemis = []
touches = set()

id_boucle = None
id_spawn = None
id_info = None
attente_tir = 0
coeur_apparu = False
niveau_sans_faute = True

def largeur_arene():
    try:
        return int(arene.offsetWidth)
    except:
        return int(arene.getBoundingClientRect().width)

def hauteur_arene():
    try:
        return int(arene.offsetHeight)
    except:
        return int(arene.getBoundingClientRect().height)

def message(texte):
    message_el.textContent = texte

def info_temporaire(texte):
    global id_info
    if info_el is None:
        return
    info_el.textContent = texte
    try:
        info_el.classList.add("visible")
    except:
        pass
    if id_info is not None:
        try:
            timer.clear_timeout(id_info)
        except:
            pass
    def effacer():
        if info_el is not None:
            info_el.textContent = ""
            try:
                info_el.classList.remove("visible")
            except:
                pass
    id_info = timer.set_timeout(effacer, 5000)

def objectif_niveau():
    index = min(max(niveau - 1, 0), len(OBJECTIFS_NIVEAUX) - 1)
    return OBJECTIFS_NIVEAUX[index]

def calculer_niveau():
    return niveau

def ennemis_disponibles():
    nombre = min(max(niveau, 1), len(ENNEMIS))
    return ENNEMIS[:nombre]

def facteur_ennemi_max_niveau():
    disponibles = ennemis_disponibles()
    if not disponibles:
        return 1
    return max([ENNEMIS_VITESSES.get(e, 1) for e in disponibles])

def maj_cadre_niveau(animation=False):
    if niveau_el is None:
        return
    try:
        bloc = niveau_el.parent
        bloc.className = "carteStat niveauActuel niveau" + str(niveau)
        if animation:
            bloc.classList.add("niveauFlash")
            def fin_animation():
                try:
                    bloc.classList.remove("niveauFlash")
                except:
                    pass
            timer.set_timeout(fin_animation, 1300)
    except:
        pass

def maj_decor(animation=False):
    if not DECORS_NIVEAUX:
        arene.className = "areneJeu"
        maj_cadre_niveau(animation)
        return

    arene.className = "areneJeu decorNiveau" + str(niveau)
    maj_cadre_niveau(animation)

def maj_affichage(animation_niveau=False):
    score_el.textContent = str(score)
    vies_el.textContent = str(vies)
    objectif_el.textContent = str(score_niveau) + "/" + str(objectif_niveau())
    # Plus tard : afficher le niveau ici.
    maj_decor(animation_niveau)

def annoncer_niveau_si_besoin():
    if not MESSAGES_NIVEAUX:
        return
    if niveau == 1:
        message("Niveau 1 : prépare-toi !")
    elif niveau == 2:
        message("Niveau 2 : un nouvel ennemi apparaît !")
    elif niveau == 3:
        message("Niveau 3 : les ennemis sont plus variés.")
    elif niveau == 4:
        message("Niveau 4 : la cadence augmente.")
    elif niveau >= 5:
        message("Niveau 5 : tous les ennemis sont présents !")

def placer_vaisseau():
    global x_vaisseau
    w = largeur_arene()
    try:
        largeur_vaisseau = int(vaisseau_el.offsetWidth)
    except:
        largeur_vaisseau = 56
    marge = max(1, int(largeur_vaisseau / 2))
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

    try:
        hauteur_vaisseau = int(vaisseau_el.offsetHeight)
    except:
        hauteur_vaisseau = 50
    try:
        hauteur_missile = int(m.offsetHeight)
    except:
        hauteur_missile = 20
    y = hauteur_arene() - 10 - hauteur_vaisseau - hauteur_missile
    obj = {"el": m, "x": x_vaisseau, "y": y}
    missiles.append(obj)

    m.style.left = f"{x_vaisseau}px"
    m.style.top = f"{y}px"
    m.style.transform = "translateX(-50%)"

def creer_ennemi(coeur=False):
    if not en_cours:
        return
    if not ENNEMIS_AUTO and not coeur:
        return

    symbole = "❤️" if coeur else random.choice(ennemis_disponibles())
    e = document.createElement("div")
    e.className = "bonus" if coeur else "ennemi"
    e.textContent = symbole
    arene <= e

    try:
        largeur_objet = int(e.offsetWidth)
    except:
        largeur_objet = 70
    try:
        hauteur_objet = int(e.offsetHeight)
    except:
        hauteur_objet = 70

    marge = max(1, int(largeur_objet / 2))
    demi_hauteur = max(1, int(hauteur_objet / 2))
    w = largeur_arene()
    x_max = max(marge, w - marge)
    x = random.randint(marge, x_max)
    y = demi_hauteur

    obj = {"el": e, "x": x, "y": y, "symbole": symbole, "bonus": coeur, "demi_hauteur": demi_hauteur}
    ennemis.append(obj)

    e.style.left = f"{x}px"
    e.style.top = f"{y}px"
    e.style.transform = "translate(-50%,-50%)"

def vitesse_ennemi_actuelle():
    if not DIFFICULTE_PROGRESSIVE:
        return VITESSE_ENNEMI
    bonus = (niveau - 1) * 0.18
    return min(VITESSE_ENNEMI + bonus, VITESSE_ENNEMI_MAX)

def vitesse_objet(obj):
    if obj.get("bonus"):
        return vitesse_ennemi_actuelle() * facteur_ennemi_max_niveau() * 2
    facteur = ENNEMIS_VITESSES.get(obj["symbole"], 1)
    return vitesse_ennemi_actuelle() * facteur

def delai_ennemi_actuel():
    if not DIFFICULTE_PROGRESSIVE:
        return DELAI_ENNEMI_MS
    return max(560, DELAI_ENNEMI_MS - (niveau - 1) * 130)

def maj_spawn():
    global id_spawn
    if id_spawn is not None:
        timer.clear_interval(id_spawn)
        id_spawn = None
    if en_cours and ENNEMIS_AUTO:
        id_spawn = timer.set_interval(creer_ennemi, delai_ennemi_actuel())

def verifier_coeur_moitie():
    global coeur_apparu
    if not COEUR_PAR_NIVEAU:
        return
    if coeur_apparu:
        return
    if score_niveau >= objectif_niveau() / 2:
        coeur_apparu = True
        creer_ennemi(coeur=True)
        info_temporaire("Cœur bonus : touchez-le pour gagner 1 vie !")

def collision(missile, objet):
    rect_m = missile["el"].getBoundingClientRect()
    rect_o = objet["el"].getBoundingClientRect()

    return not (
        rect_m.right < rect_o.left or
        rect_m.left > rect_o.right or
        rect_m.bottom < rect_o.top or
        rect_m.top > rect_o.bottom
    )

def passer_niveau_ou_gagner():
    global niveau, score_niveau, coeur_apparu, niveau_sans_faute, vies

    if score_niveau < objectif_niveau():
        return False

    bonus_sans_faute = BONUS_SANS_FAUTE and niveau_sans_faute
    if bonus_sans_faute:
        vies += 1

    if niveau >= NIVEAU_MAX or niveau >= len(OBJECTIFS_NIVEAUX):
        if bonus_sans_faute:
            info_temporaire("Dernier niveau sans faute : +1 vie !")
        gagner()
        return True

    niveau += 1
    score_niveau = 0
    coeur_apparu = False
    niveau_sans_faute = True
    supprimer_liste(missiles)
    supprimer_liste(ennemis)
    maj_spawn()
    annoncer_niveau_si_besoin()
    maj_affichage(animation_niveau=True)

    if MESSAGES_NIVEAUX:
        if bonus_sans_faute:
            info_temporaire("Niveau " + str(niveau) + " atteint : sans faute, +1 vie !")
        elif BONUS_SANS_FAUTE:
            info_temporaire("Niveau " + str(niveau) + " atteint : pas de bonus sans-faute.")
        else:
            info_temporaire("Niveau " + str(niveau) + " atteint !")

    return True

def boucle():
    global x_vaisseau, score, score_niveau, vies, attente_tir, niveau_sans_faute

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

        if e["y"] >= hauteur_arene() - e.get("demi_hauteur", 30):
            try:
                e["el"].remove()
            except:
                pass
            ennemis.remove(e)

            if e.get("bonus"):
                continue

            degats = ENNEMIS_DEGATS.get(e["symbole"], 1)
            vies -= degats
            niveau_sans_faute = False
            maj_affichage()

            if MESSAGES_NIVEAUX:
                if vies > 0:
                    info_temporaire("Un ennemi a atteint le bas : -1 vie. Il reste " + str(vies) + " vie(s).")
                else:
                    info_temporaire("Un ennemi a atteint le bas : dernière vie perdue !")

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
                    vies += 1
                    info_temporaire("Cœur touché : +1 vie !")
                else:
                    score += 1
                    score_niveau += 1
                    verifier_coeur_moitie()

                maj_affichage()
                if passer_niveau_ou_gagner():
                    return
                break

def demarrer():
    global en_cours, score, score_niveau, vies, niveau, id_boucle, x_vaisseau, attente_tir, coeur_apparu, niveau_sans_faute

    if not JEU_ACTIF:
        message("Le jeu n'est pas encore activé.")
        return

    if VITESSE_MISSILE <= 0 or VITESSE_ENNEMI <= 0 or not ENNEMIS_AUTO:
        message("Le jeu est presque prêt : continue les exercices.")
        return

    if en_cours:
        return

    supprimer_liste(missiles)
    supprimer_liste(ennemis)

    score = 0
    score_niveau = 0
    vies = VIES_DEPART
    niveau = 1
    attente_tir = 0
    coeur_apparu = False
    niveau_sans_faute = True
    x_vaisseau = int(largeur_arene() / 2)
    placer_vaisseau()
    maj_affichage(animation_niveau=True)

    en_cours = True
    btn_demarrer.disabled = True
    annoncer_niveau_si_besoin()
    if not MESSAGES_NIVEAUX:
        message("Détruis les ennemis avant qu'ils atteignent le bas !")

    id_boucle = timer.set_interval(boucle, 30)
    maj_spawn()
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
    global score, score_niveau, vies, niveau, x_vaisseau, coeur_apparu, niveau_sans_faute, attente_tir
    arreter()
    supprimer_liste(missiles)
    supprimer_liste(ennemis)

    score = 0
    score_niveau = 0
    vies = VIES_DEPART
    niveau = 1
    attente_tir = 0
    coeur_apparu = False
    niveau_sans_faute = True
    x_vaisseau = int(largeur_arene() / 2)

    placer_vaisseau()
    maj_affichage(animation_niveau=True)
    message("Prêt ? Clique sur Démarrer.")
    if info_el is not None:
        info_el.textContent = ""

def gagner():
    arreter()
    supprimer_liste(missiles)
    supprimer_liste(ennemis)
    message("Bravo, mission réussie : les 5 niveaux sont terminés !")

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
  let n = html;
  if(!/class=["']aideTouches["']/i.test(n)){
    n = n.replace(/<div([^>]*)id=["']zoneExtra["']([^>]*)><\/div>/i,
      '<div$1id="zoneExtra"$2>\n        <p class="aideTouches">← → : déplacer | Espace : tirer</p>\n      </div>');
  }
  if(!/id=["']infoJeu["']/i.test(n)){
    n = n.replace(/(<\/p>\s*)<\/div>/i,
      '$1\n        <div id="infoJeu" class="infoJeu"></div>\n      </div>');
  }
  return n;
}

function removeAideTouches(html){
  return html
    .replace(/\s*<p[^>]*class=["']aideTouches["'][^>]*>\s*← → : déplacer \| Espace : tirer\s*<\/p>\s*/i, "")
    .replace(/\s*<div[^>]*id=["']infoJeu["'][^>]*>\s*<\/div>\s*/i, "")
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
  const rules = `.areneJeu.decorNiveau1{
  background: radial-gradient(circle at top, #1a2a52, #050712);
}

.areneJeu.decorNiveau2{
  background: radial-gradient(circle at top, #3a1a52, #050712);
}

.areneJeu.decorNiveau3{
  background: radial-gradient(circle at top, #523b1a, #050712);
}

.areneJeu.decorNiveau4{
  background: radial-gradient(circle at top, #5b1828, #050712);
}

.areneJeu.decorNiveau5{
  background: radial-gradient(circle at top, #123b3a, #050712);
}

.niveauActuel.niveau1{ border-color: rgba(47,255,214,.55); }
.niveauActuel.niveau2{ border-color: rgba(77,163,255,.75); }
.niveauActuel.niveau3{ border-color: rgba(255,211,110,.80); }
.niveauActuel.niveau4{ border-color: rgba(255,128,80,.85); }
.niveauActuel.niveau5{ border-color: rgba(255,59,212,.95); }

.niveauFlash{
  animation: flashNiveau .35s alternate 4;
}

@keyframes flashNiveau{
  from{ transform: scale(1); filter: brightness(1); }
  to{ transform: scale(1.08); filter: brightness(1.9); }
}`;
  [".areneJeu.decorNiveau1", ".areneJeu.decorNiveau2", ".areneJeu.decorNiveau3", ".areneJeu.decorNiveau4", ".areneJeu.decorNiveau5", ".niveauActuel.niveau1", ".niveauActuel.niveau2", ".niveauActuel.niveau3", ".niveauActuel.niveau4", ".niveauActuel.niveau5", ".niveauFlash", "@keyframes flashNiveau"].forEach(sel => { css = removeCssRule(css, sel); });
  return css.trimEnd() + "\n\n" + rules + "\n";
}

function removeDecorRules(css){
  [".areneJeu.decorNiveau1", ".areneJeu.decorNiveau2", ".areneJeu.decorNiveau3", ".areneJeu.decorNiveau4", ".areneJeu.decorNiveau5", ".niveauActuel.niveau1", ".niveauActuel.niveau2", ".niveauActuel.niveau3", ".niveauActuel.niveau4", ".niveauActuel.niveau5", ".niveauFlash", "@keyframes flashNiveau"].forEach(sel => { css = removeCssRule(css, sel); });
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


function retablirProgressionComplete(c){
  let n = cloneCode(c);
  n = appliquerModifs(n, [
    {type:"htmlClass", tag:"h1", className:"zoneTitre", value:"Space Défense"},
    {type:"htmlClass", tag:"p", className:"zoneParagraphe", value:"Protège ta base contre les envahisseurs !"},
    {type:"htmlId", tag:"button", id:"btnDemarrer", value:"Démarrer"},
    {type:"htmlId", tag:"button", id:"btnReinitialiser", value:"Recommencer"},
    {type:"htmlId", tag:"div", id:"vaisseau", value:"🚀"},
  ]);
  n.html = addAideTouches(n.html);
  n.html = addBlocNiveau(n.html);
  n.html = addClasseNiveau(n.html);
  n.css = setCssProperty(n.css, ".areneJeu", "height", "720px");
  n.css = setCssProperty(n.css, ".grille", "gap", "12px");
  n.css = setCssProperty(n.css, ".ligneBoutons", "margin", "0");
  n.css = setCssProperty(n.css, ".zoneExtra", "gap", "14px");
  n.css = addCssRule(n.css, ".tableauBord", `.tableauBord{
  display: flex;
  flex-direction: column;
  gap: 14px;
}`);
  n.css = addCssRule(n.css, ".zoneJeu", `.zoneJeu{
  display: flex;
  flex-direction: column;
  min-height: 0;
}`);
  n.css = setCssProperty(n.css, ".areneJeu", "background", "radial-gradient(circle at top, #1a2a52, #050712)");
  n.css = setCssProperty(n.css, ".vaisseau", "font-size", "44px");
  n.css = setCssProperty(n.css, ".missile", "background", "#2fffd6");
  n.css = setCssProperty(n.css, ".missile", "height", "20px");
  n.css = setCssProperty(n.css, ".ennemi", "font-size", "64px");
  n.css = setCssProperty(n.css, ".bonus", "font-size", "64px");
  n.css = setCssProperty(n.css, ".ligneStats", "grid-template-columns", "repeat(2, 1fr)");
  n.css = setCssProperty(n.css, ".zoneTitre", "font-size", "38px");
  n.css = setCssProperty(n.css, ".zoneParagraphe", "font-size", "26px");
  n.css = setCssProperty(n.css, ".labelStat", "font-size", "23px");
  n.css = setCssProperty(n.css, ".valeurStat", "font-size", "40px");
  n.css = setCssProperty(n.css, "button", "font-size", "25px");
  n.css = setCssProperty(n.css, ".messageJeu", "font-size", "25px");
  n.css = setCssProperty(n.css, ".sousTitre", "font-size", "28px");
  n.css = addCssRule(n.css, ".aideTouches", `.aideTouches{
  color: #2fffd6;
  text-align: center;
  font-weight: 900;
  padding: 10px;
  border-radius: 12px;
  border: 1px dashed rgba(47,255,214,.35);
  background: rgba(47,255,214,.08);
}`);
  n.css = addCssRule(n.css, ".infoJeu", `.infoJeu{
  min-height: 54px;
  padding: 10px;
  border-radius: 12px;
  border: 2px solid rgba(255,211,110,.38);
  background: rgba(255,211,110,.10);
  color: #fff2c2;
  font-size: 23px;
  font-weight: 800;
}`);
  n.css = addDecorRules(n.css);
  n.py = setPythonConst(n.py, "JEU_ACTIF", "True");
  n.py = setPythonConst(n.py, "OBJECTIFS_NIVEAUX", "[20]");
  n.py = setPythonConst(n.py, "VITESSE_MISSILE", "10");
  n.py = setPythonConst(n.py, "VITESSE_ENNEMI", "1.8");
  n.py = setPythonConst(n.py, "VITESSE_VAISSEAU", "22");
  n.py = setPythonConst(n.py, "DELAI_TIR", "18");
  n.py = setPythonConst(n.py, "ENNEMIS_AUTO", "True");
  n.py = addAffichageNiveau(n.py);
  n.py = setPythonConst(n.py, "ENNEMIS", '["👾", "🛸", "☄️", "🛰️", "👽"]');
  n.py = setPythonConst(n.py, "ENNEMIS_VITESSES", '{"👾": 1, "🛸": 1.25, "☄️": 1.5, "🛰️": 1.75, "👽": 2}');
  n.py = setPythonConst(n.py, "ENNEMIS_DEGATS", '{"👾": 1, "🛸": 1, "☄️": 1, "🛰️": 1, "👽": 1}');
  n.py = setPythonConst(n.py, "DIFFICULTE_PROGRESSIVE", "True");
  n.py = setPythonConst(n.py, "DELAI_ENNEMI_MS", "1100");
  n.py = setPythonConst(n.py, "VITESSE_ENNEMI_MAX", "4.4");
  n.py = setPythonConst(n.py, "OBJECTIFS_NIVEAUX", "[20, 40, 60, 80, 100]");
  n.py = setPythonConst(n.py, "NIVEAU_MAX", "5");
  n.py = setPythonConst(n.py, "COEUR_PAR_NIVEAU", "True");
  n.py = setPythonConst(n.py, "BONUS_SANS_FAUTE", "True");
  n.py = setPythonConst(n.py, "DECORS_NIVEAUX", "True");
  n.py = setPythonConst(n.py, "MESSAGES_NIVEAUX", "True");
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
    objectif:`Dans <code>.areneJeu</code>, remplace exactement <code>height: 320px;</code> par <code>height: 720px;</code>.`,
    indice:`Cherche la règle CSS <code>.areneJeu</code>.`,
    verif:(c)=> /\.areneJeu\s*\{[\s\S]*height\s*:\s*720px\s*;/i.test(c.css),
    restore:(c)=> appliquerModifs(c, [{type:"cssProp", selector:".areneJeu", prop:"height", value:"720px"}]),
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
    objectif:`Dans <code>.vaisseau</code>, remplace exactement <code>font-size: 28px;</code> par <code>font-size: 44px;</code>.`,
    indice:`Le vaisseau sera plus visible sans prendre toute la place.`,
    verif:(c)=> /\.vaisseau\s*\{[\s\S]*font-size\s*:\s*44px\s*;/i.test(c.css),
    restore:(c)=> appliquerModifs(c, [{type:"cssProp", selector:".vaisseau", prop:"font-size", value:"44px"}]),
    reset:(c)=> appliquerModifs(c, [{type:"cssProp", selector:".vaisseau", prop:"font-size", value:"28px"}]),
  },
  {
    langage:"CSS", titre:"CSS 4 — ennemis plus faciles à toucher",
    objectif:`Dans <code>.missile</code>, écris <code>background: #2fffd6;</code> et <code>height: 20px;</code>. Dans <code>.ennemi</code> et <code>.bonus</code>, écris exactement <code>font-size: 64px;</code>.`,
    indice:`Les ennemis et les cœurs seront environ deux fois plus grands, donc plus faciles à toucher.`,
    verif:(c)=> /\.missile\s*\{[\s\S]*background\s*:\s*#2fffd6\s*;/i.test(c.css)
      && /\.missile\s*\{[\s\S]*height\s*:\s*20px\s*;/i.test(c.css)
      && /\.ennemi\s*\{[\s\S]*font-size\s*:\s*64px\s*;/i.test(c.css)
      && /\.bonus\s*\{[\s\S]*font-size\s*:\s*64px\s*;/i.test(c.css),
    restore:(c)=> appliquerModifs(c, [
      {type:"cssProp", selector:".missile", prop:"background", value:"#2fffd6"},
      {type:"cssProp", selector:".missile", prop:"height", value:"20px"},
      {type:"cssProp", selector:".ennemi", prop:"font-size", value:"64px"},
      {type:"cssProp", selector:".bonus", prop:"font-size", value:"64px"},
    ]),
    reset:(c)=> appliquerModifs(c, [
      {type:"cssProp", selector:".missile", prop:"background", value:"#ffd36e"},
      {type:"cssProp", selector:".missile", prop:"height", value:"18px"},
      {type:"cssProp", selector:".ennemi", prop:"font-size", value:"24px"},
      {type:"cssProp", selector:".bonus", prop:"font-size", value:"26px"},
    ]),
  },
  {
    langage:"CSS", titre:"CSS 5 — textes du mini-jeu plus grands",
    objectif:`Agrandis les textes du mini-jeu : <code>.zoneTitre</code> à <code>38px</code>, <code>.zoneParagraphe</code> à <code>26px</code>, <code>.labelStat</code> à <code>23px</code>, <code>.valeurStat</code> à <code>40px</code>, <code>button</code> à <code>25px</code>, <code>.messageJeu</code> à <code>25px</code> et <code>.sousTitre</code> à <code>28px</code>.`,
    indice:`Il y a plusieurs règles CSS à modifier, mais seulement des tailles de police.`,
    verif:(c)=> /\.zoneTitre\s*\{[\s\S]*font-size\s*:\s*38px\s*;/i.test(c.css)
      && /\.zoneParagraphe\s*\{[\s\S]*font-size\s*:\s*26px\s*;/i.test(c.css)
      && /\.labelStat\s*\{[\s\S]*font-size\s*:\s*23px\s*;/i.test(c.css)
      && /\.valeurStat\s*\{[\s\S]*font-size\s*:\s*40px\s*;/i.test(c.css)
      && /button\s*\{[\s\S]*font-size\s*:\s*25px\s*;/i.test(c.css)
      && /\.messageJeu\s*\{[\s\S]*font-size\s*:\s*25px\s*;/i.test(c.css)
      && /\.sousTitre\s*\{[\s\S]*font-size\s*:\s*28px\s*;/i.test(c.css),
    restore:(c)=> appliquerModifs(c, [
      {type:"cssProp", selector:".zoneTitre", prop:"font-size", value:"38px"},
      {type:"cssProp", selector:".zoneParagraphe", prop:"font-size", value:"26px"},
      {type:"cssProp", selector:".labelStat", prop:"font-size", value:"23px"},
      {type:"cssProp", selector:".valeurStat", prop:"font-size", value:"40px"},
      {type:"cssProp", selector:"button", prop:"font-size", value:"25px"},
      {type:"cssProp", selector:".messageJeu", prop:"font-size", value:"25px"},
      {type:"cssProp", selector:".sousTitre", prop:"font-size", value:"28px"},
    ]),
    reset:(c)=> appliquerModifs(c, [
      {type:"cssProp", selector:".zoneTitre", prop:"font-size", value:"32px"},
      {type:"cssProp", selector:".zoneParagraphe", prop:"font-size", value:"22px"},
      {type:"cssProp", selector:".labelStat", prop:"font-size", value:"19px"},
      {type:"cssProp", selector:".valeurStat", prop:"font-size", value:"32px"},
      {type:"cssProp", selector:"button", prop:"font-size", value:"22px"},
      {type:"cssProp", selector:".messageJeu", prop:"font-size", value:"22px"},
      {type:"cssProp", selector:".sousTitre", prop:"font-size", value:"24px"},
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
    langage:"Python", titre:"Python 2 — objectif du premier niveau",
    objectif:`Dans le Python, remplace <code>OBJECTIFS_NIVEAUX = [5]</code> par <code>OBJECTIFS_NIVEAUX = [20]</code>. Le joueur commence toujours avec <code>VIES_DEPART = 1</code>.`,
    indice:`Le nombre entre crochets indique l'objectif du niveau 1.`,
    verif:(c)=> /^\s*OBJECTIFS_NIVEAUX\s*=\s*\[\s*20(?:\s*,[\s\S]*?)?\]\s*$/m.test(c.py) && /^\s*VIES_DEPART\s*=\s*1\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"OBJECTIFS_NIVEAUX", value:"[20]"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"OBJECTIFS_NIVEAUX", value:"[5]"}]),
  },
  {
    langage:"Python", titre:"Python 3 — vitesses des tirs et ennemis",
    objectif:`Dans le Python, fais les deux modifications suivantes : <code>VITESSE_MISSILE = 10</code> et <code>VITESSE_ENNEMI = 1.8</code>.`,
    indice:`Les ennemis sont un peu plus rapides, mais le jeu reste jouable.`,
    verif:(c)=> /^\s*VITESSE_MISSILE\s*=\s*10\s*$/m.test(c.py) && /^\s*VITESSE_ENNEMI\s*=\s*1\.8\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"VITESSE_MISSILE", value:"10"},
      {type:"pyConst", name:"VITESSE_ENNEMI", value:"1.8"},
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
    langage:"Python", titre:"Python 5 — tirs moins rapides",
    objectif:`Dans le Python, remplace « <code>DELAI_TIR = 8</code> » par « <code>DELAI_TIR = 18</code> ».`,
    indice:`Plus le nombre est grand, plus il faut attendre entre deux missiles : cela évite de balayer tout l'écran en restant appuyé sur Espace.`,
    verif:(c)=> /^\s*DELAI_TIR\s*=\s*18\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"DELAI_TIR", value:"18"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"DELAI_TIR", value:"8"}]),
  },
  {
    langage:"Python", titre:"Python 6 — apparition des ennemis",
    objectif:`Dans le Python, remplace « <code>ENNEMIS_AUTO = False</code> » par « <code>ENNEMIS_AUTO = True</code> ».`,
    indice:`Après cette étape, les ennemis apparaissent automatiquement.`,
    verif:(c)=> /^\s*ENNEMIS_AUTO\s*=\s*True\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS_AUTO", value:"True"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS_AUTO", value:"False"}]),
  },
  {
    langage:"HTML", titre:"HTML 5 — ajouter l’aide et les messages",
    objectif:`Dans le HTML, trouve <code>&lt;div id="zoneExtra" class="zoneExtra"&gt;&lt;/div&gt;</code>. Ajoute à l'intérieur l'aide <code>&lt;p class="aideTouches"&gt;← → : déplacer | Espace : tirer&lt;/p&gt;</code> puis un cadre vide <code>&lt;div id="infoJeu" class="infoJeu"&gt;&lt;/div&gt;</code>.`,
    indice:`L'aide et le message de jeu doivent être dans deux cadres séparés.`,
    verif:(c)=> /<div[^>]*id=["']zoneExtra["'][^>]*>[\s\S]*<p[^>]*class=["']aideTouches["'][^>]*>\s*← → : déplacer \| Espace : tirer\s*<\/p>[\s\S]*<div[^>]*id=["']infoJeu["'][^>]*class=["']infoJeu["'][^>]*>\s*<\/div>[\s\S]*<\/div>/i.test(c.html),
    restore:(c)=> ({...c, html:addAideTouches(c.html)}),
    reset:(c)=> ({...c, html:removeAideTouches(c.html)}),
  },
  {
    langage:"CSS", titre:"CSS 6 — deux cadres pour l’aide et les infos",
    objectif:`Dans le CSS, ajoute une règle <code>.aideTouches</code> et une règle <code>.infoJeu</code>. L'aide doit contenir <code>color: #2fffd6;</code>, <code>text-align: center;</code> et <code>font-weight: 900;</code>. Le cadre info doit contenir <code>font-size: 23px;</code> et <code>font-weight: 800;</code>. Dans <code>.zoneExtra</code>, règle aussi <code>gap: 14px;</code>.`,
    indice:`Les cadres Aide et Infos de jeu seront séparés plus nettement.`,
    verif:(c)=> /\.aideTouches\s*\{[\s\S]*color\s*:\s*#2fffd6\s*;[\s\S]*text-align\s*:\s*center\s*;[\s\S]*font-weight\s*:\s*900\s*;/i.test(c.css)
      && /\.infoJeu\s*\{[\s\S]*font-size\s*:\s*23px\s*;[\s\S]*font-weight\s*:\s*800\s*;/i.test(c.css)
      && /\.zoneExtra\s*\{[\s\S]*gap\s*:\s*14px\s*;/i.test(c.css),
    restore:(c)=> {
      let css = addCssRule(c.css, ".aideTouches", `.aideTouches{
  color: #2fffd6;
  text-align: center;
  font-weight: 900;
  padding: 10px;
  border-radius: 12px;
  border: 1px dashed rgba(47,255,214,.35);
  background: rgba(47,255,214,.08);
}`);
      css = addCssRule(css, ".infoJeu", `.infoJeu{
  min-height: 54px;
  padding: 10px;
  border-radius: 12px;
  border: 2px solid rgba(255,211,110,.38);
  background: rgba(255,211,110,.10);
  color: #fff2c2;
  font-size: 23px;
  font-weight: 800;
}`);
      css = setCssProperty(css, ".zoneExtra", "gap", "14px");
      css = setCssProperty(css, ".ligneBoutons", "margin", "0");
      css = addCssRule(css, ".tableauBord", `.tableauBord{
  display: flex;
  flex-direction: column;
  gap: 14px;
}`);
      return {...c, css};
    },
    reset:(c)=> ({...c, css:removeCssRule(removeCssRule(c.css, ".aideTouches"), ".infoJeu")}),
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
    langage:"CSS", titre:"CSS 7 — quatre statistiques sur deux lignes",
    objectif:`Dans <code>.ligneStats</code>, remplace exactement <code>repeat(3, 1fr)</code> par <code>repeat(2, 1fr)</code>.`,
    indice:`Score, Vies, Objectif et Niveau s'afficheront en deux colonnes et deux lignes.`,
    verif:(c)=> /\.ligneStats\s*\{[\s\S]*grid-template-columns\s*:\s*repeat\(2,\s*1fr\)\s*;/i.test(c.css),
    restore:(c)=> appliquerModifs(c, [{type:"cssProp", selector:".ligneStats", prop:"grid-template-columns", value:"repeat(2, 1fr)"}]),
    reset:(c)=> appliquerModifs(c, [{type:"cssProp", selector:".ligneStats", prop:"grid-template-columns", value:"repeat(3, 1fr)"}]),
  },
  {
    langage:"HTML", titre:"HTML 7 — classe du bloc Niveau",
    objectif:`Sur le bloc <code>Niveau</code>, remplace exactement <code>class="carteStat"</code> par <code>class="carteStat niveauActuel"</code>.`,
    indice:`Cette classe permettra de donner une couleur différente au bloc Niveau.`,
    verif:(c)=> /<div[^>]*class=["'][^"']*\bcarteStat\b[^"']*\bniveauActuel\b[^"']*["'][^>]*>[\s\S]*Niveau[\s\S]*id=["']niveauJeu["']/i.test(c.html),
    restore:(c)=> ({...c, html:addClasseNiveau(c.html)}),
    reset:(c)=> ({...c, html:removeClasseNiveau(c.html)}),
  },
  {
    langage:"Python", titre:"Python 7 — afficher le niveau",
    objectif:`Dans <code>maj_affichage()</code>, remplace le commentaire <code># Plus tard : afficher le niveau ici.</code> par <code>if niveau_el is not None:</code> puis, à la ligne suivante, <code>niveau_el.textContent = str(calculer_niveau())</code>.`,
    indice:`Fais cette étape avant les niveaux multiples pour voir le changement de niveau pendant le jeu.`,
    verif:(c)=> /def\s+maj_affichage\s*\([^)]*\)\s*:[\s\S]*if\s+niveau_el\s+is\s+not\s+None\s*:\s*\n\s+niveau_el\.textContent\s*=\s*str\(calculer_niveau\(\)\)/.test(c.py),
    restore:(c)=> ({...c, py:addAffichageNiveau(c.py)}),
    reset:(c)=> ({...c, py:removeAffichageNiveau(c.py)}),
  },
  {
    langage:"Python", titre:"Python 8 — cinq types d’ennemis",
    objectif:`Dans le Python, remplace la liste des ennemis par exactement <code>ENNEMIS = ["👾", "🛸", "☄️", "🛰️", "👽"]</code>.`,
    indice:`Le jeu utilisera seulement les premiers ennemis au début, puis un nouvel ennemi apparaîtra à chaque niveau.`,
    verif:(c)=> /^\s*ENNEMIS\s*=\s*\[\s*["']👾["']\s*,\s*["']🛸["']\s*,\s*["']☄️["']\s*,\s*["']🛰️["']\s*,\s*["']👽["']\s*\]\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS", value:'["👾", "🛸", "☄️", "🛰️", "👽"]'}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS", value:'["👾"]'}]),
  },
  {
    langage:"Python", titre:"Python 9 — vitesses différentes",
    objectif:`Dans le Python, remplace <code>ENNEMIS_VITESSES</code> par <code>ENNEMIS_VITESSES = {"👾": 1, "🛸": 1.25, "☄️": 1.5, "🛰️": 1.75, "👽": 2}</code>.`,
    indice:`Chaque nouvel ennemi est légèrement plus rapide que le précédent.`,
    verif:(c)=> /^\s*ENNEMIS_VITESSES\s*=\s*\{\s*["']👾["']\s*:\s*1\s*,\s*["']🛸["']\s*:\s*1\.25\s*,\s*["']☄️["']\s*:\s*1\.5\s*,\s*["']🛰️["']\s*:\s*1\.75\s*,\s*["']👽["']\s*:\s*2\s*\}\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS_VITESSES", value:'{"👾": 1, "🛸": 1.25, "☄️": 1.5, "🛰️": 1.75, "👽": 2}'}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS_VITESSES", value:'{"👾": 1}'}]),
  },
  {
    langage:"Python", titre:"Python 10 — mêmes dégâts pour tous",
    objectif:`Dans le Python, remplace <code>ENNEMIS_DEGATS</code> par <code>ENNEMIS_DEGATS = {"👾": 1, "🛸": 1, "☄️": 1, "🛰️": 1, "👽": 1}</code>.`,
    indice:`Tous les ennemis font perdre 1 vie s'ils atteignent le bas.`,
    verif:(c)=> /^\s*ENNEMIS_DEGATS\s*=\s*\{\s*["']👾["']\s*:\s*1\s*,\s*["']🛸["']\s*:\s*1\s*,\s*["']☄️["']\s*:\s*1\s*,\s*["']🛰️["']\s*:\s*1\s*,\s*["']👽["']\s*:\s*1\s*\}\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS_DEGATS", value:'{"👾": 1, "🛸": 1, "☄️": 1, "🛰️": 1, "👽": 1}'}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"ENNEMIS_DEGATS", value:'{"👾": 1}'}]),
  },
  {
    langage:"Python", titre:"Python 11 — difficulté progressive",
    objectif:`Dans le Python, fais les trois modifications suivantes : <code>DIFFICULTE_PROGRESSIVE = True</code>, <code>DELAI_ENNEMI_MS = 1100</code> et <code>VITESSE_ENNEMI_MAX = 4.4</code>.`,
    indice:`Les ennemis arrivent un peu plus nombreux et descendent un peu plus vite à chaque niveau, sans devenir impossibles trop tôt.`,
    verif:(c)=> /^\s*DIFFICULTE_PROGRESSIVE\s*=\s*True\s*$/m.test(c.py)
      && /^\s*DELAI_ENNEMI_MS\s*=\s*1100\s*$/m.test(c.py)
      && /^\s*VITESSE_ENNEMI_MAX\s*=\s*4\.4\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"DIFFICULTE_PROGRESSIVE", value:"True"},
      {type:"pyConst", name:"DELAI_ENNEMI_MS", value:"1100"},
      {type:"pyConst", name:"VITESSE_ENNEMI_MAX", value:"4.4"},
    ]),
    reset:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"DIFFICULTE_PROGRESSIVE", value:"False"},
      {type:"pyConst", name:"DELAI_ENNEMI_MS", value:"1200"},
      {type:"pyConst", name:"VITESSE_ENNEMI_MAX", value:"3.8"},
    ]),
  },
  {
    langage:"Python", titre:"Python 12 — cinq objectifs de niveau",
    objectif:`Dans le Python, remplace <code>OBJECTIFS_NIVEAUX</code> par <code>OBJECTIFS_NIVEAUX = [20, 40, 60, 80, 100]</code> et remplace <code>NIVEAU_MAX = 1</code> par <code>NIVEAU_MAX = 5</code>.`,
    indice:`Il faut atteindre 20 ennemis pour passer au niveau 2, puis 40, 60, 80 et 100.`,
    verif:(c)=> /^\s*OBJECTIFS_NIVEAUX\s*=\s*\[\s*20\s*,\s*40\s*,\s*60\s*,\s*80\s*,\s*100\s*\]\s*$/m.test(c.py)
      && /^\s*NIVEAU_MAX\s*=\s*5\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"OBJECTIFS_NIVEAUX", value:"[20, 40, 60, 80, 100]"},
      {type:"pyConst", name:"NIVEAU_MAX", value:"5"},
    ]),
    reset:(c)=> appliquerModifs(c, [
      {type:"pyConst", name:"OBJECTIFS_NIVEAUX", value:"[20]"},
      {type:"pyConst", name:"NIVEAU_MAX", value:"1"},
    ]),
  },
  {
    langage:"Python", titre:"Python 13 — cœur à la moitié du niveau",
    objectif:`Dans le Python, remplace « <code>COEUR_PAR_NIVEAU = False</code> » par « <code>COEUR_PAR_NIVEAU = True</code> ».`,
    indice:`Un cœur apparaîtra une fois par niveau, à la moitié de l'objectif. Il descend deux fois plus vite que l'ennemi le plus rapide du niveau.`,
    verif:(c)=> /^\s*COEUR_PAR_NIVEAU\s*=\s*True\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"COEUR_PAR_NIVEAU", value:"True"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"COEUR_PAR_NIVEAU", value:"False"}]),
  },
  {
    langage:"Python", titre:"Python 14 — bonus sans-faute",
    objectif:`Dans le Python, remplace « <code>BONUS_SANS_FAUTE = False</code> » par « <code>BONUS_SANS_FAUTE = True</code> ».`,
    indice:`Si aucun ennemi ne passe pendant un niveau, le joueur gagne 1 vie en passant au niveau suivant.`,
    verif:(c)=> /^\s*BONUS_SANS_FAUTE\s*=\s*True\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"BONUS_SANS_FAUTE", value:"True"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"BONUS_SANS_FAUTE", value:"False"}]),
  },
  {
    langage:"CSS", titre:"CSS 8 — décors et bloc niveau",
    objectif:`Dans le CSS, ajoute les règles des décors de niveaux et les couleurs du bloc <code>Niveau</code>. Il faut aussi ajouter <code>.niveauFlash</code> avec une animation <code>flashNiveau</code>.`,
    indice:`Tu peux utiliser le bouton Rétablir si tu veux remettre automatiquement toutes les règles de décor et de clignotement.`,
    verif:(c)=> /\.areneJeu\.decorNiveau5\s*\{[\s\S]*#123b3a[\s\S]*#050712[\s\S]*\}/i.test(c.css)
      && /\.niveauActuel\.niveau5\s*\{[\s\S]*border-color\s*:/i.test(c.css)
      && /\.niveauFlash\s*\{[\s\S]*animation\s*:\s*flashNiveau/i.test(c.css)
      && /@keyframes\s+flashNiveau/i.test(c.css),
    restore:(c)=> ({...c, css:addDecorRules(c.css)}),
    reset:(c)=> ({...c, css:removeDecorRules(c.css)}),
  },
  {
    langage:"Python", titre:"Python 15 — activer les décors",
    objectif:`Dans le Python, remplace « <code>DECORS_NIVEAUX = False</code> » par « <code>DECORS_NIVEAUX = True</code> ».`,
    indice:`Le décor et la couleur du bloc Niveau changeront selon le niveau atteint.`,
    verif:(c)=> /^\s*DECORS_NIVEAUX\s*=\s*True\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"DECORS_NIVEAUX", value:"True"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"DECORS_NIVEAUX", value:"False"}]),
  },
  {
    langage:"Python", titre:"Python 16 — messages temporaires",
    objectif:`Dans le Python, remplace « <code>MESSAGES_NIVEAUX = False</code> » par « <code>MESSAGES_NIVEAUX = True</code> ».`,
    indice:`Le jeu affichera quelques informations utiles pendant 5 secondes, par exemple pour le cœur, la perte d’une vie, le changement de niveau ou le bonus sans-faute.`,
    verif:(c)=> /^\s*MESSAGES_NIVEAUX\s*=\s*True\s*$/m.test(c.py),
    restore:(c)=> appliquerModifs(c, [{type:"pyConst", name:"MESSAGES_NIVEAUX", value:"True"}]),
    reset:(c)=> appliquerModifs(c, [{type:"pyConst", name:"MESSAGES_NIVEAUX", value:"False"}]),
  },
  {
    langage:"Libre", titre:"Projet libre — personnaliser le jeu",
    objectif:`Le jeu est terminé. Tu peux maintenant modifier ce que tu veux : couleurs, textes, vitesse, symboles, décor, taille du vaisseau, etc. Clique sur <strong>Appliquer</strong> pour tester, puis sur <strong>Enregistrer</strong> pour garder tes modifications libres.`,
    indice:`Le bouton Réinitialiser remet le code dans l'état de l'exercice précédent, juste avant les modifications libres.`,
    verif:(c)=> true,
    restore:(c)=> retablirProgressionComplete(c),
    reset:(c)=> retablirProgressionComplete(c),
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
  btnSauvegarder: $("btnSauvegarder"),
  btnCharger: $("btnCharger"),
  inputSauvegarde: $("inputSauvegarde"),
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

const CLE_SAUVEGARDE_AUTO = "atelier_space_defense_sauvegarde_auto_v1";
const TYPE_SAUVEGARDE = "sauvegarde-space-defense";
const VERSION_SAUVEGARDE = 1;

let travailModifieDepuisExport = false;
let timerSauvegardeAuto = null;

function copieEtatPourSauvegarde(){
  return {
    etape: etat.etape,
    statut: etat.statut.slice(),
    dejaReussi: etat.dejaReussi.slice(),
    code: {
      html: etat.code.html,
      css: etat.code.css,
      py: etat.code.py,
    },
  };
}

function creerObjetSauvegarde(){
  collecterCode();
  return {
    type: TYPE_SAUVEGARDE,
    version: VERSION_SAUVEGARDE,
    application: "HTML CSS Python - Space Défense",
    date: new Date().toISOString(),
    nombreEtapes: ETAPES.length,
    etat: copieEtatPourSauvegarde(),
  };
}

function normaliserEtatSauvegarde(obj){
  if(!obj || typeof obj !== "object") throw new Error("Fichier de sauvegarde invalide.");

  const source = obj.etat || obj;
  if(!source || typeof source !== "object") throw new Error("Fichier de sauvegarde invalide.");
  if(!source.code || typeof source.code !== "object") throw new Error("Le code enregistré est introuvable.");

  const html = typeof source.code.html === "string" ? source.code.html : null;
  const css = typeof source.code.css === "string" ? source.code.css : null;
  const py = typeof source.code.py === "string" ? source.code.py : null;
  if(html === null || css === null || py === null) throw new Error("Le fichier ne contient pas les trois codes HTML, CSS et Python.");

  const statut = Array.isArray(source.statut) ? source.statut.slice(0, ETAPES.length) : [];
  while(statut.length < ETAPES.length) statut.push(ETAT_NON_FAIT);

  const dejaReussi = Array.isArray(source.dejaReussi) ? source.dejaReussi.slice(0, ETAPES.length) : [];
  while(dejaReussi.length < ETAPES.length) dejaReussi.push(false);

  let etape = Number.isInteger(source.etape) ? source.etape : 0;
  etape = Math.max(0, Math.min(ETAPES.length - 1, etape));

  return {
    etape,
    statut: statut.map(s => [ETAT_NON_FAIT, ETAT_REUSSI, ETAT_REINITIALISE].includes(s) ? s : ETAT_NON_FAIT),
    dejaReussi: dejaReussi.map(Boolean),
    code: { html, css, py },
  };
}

function remplacerEtat(nouvelEtat){
  etat.etape = nouvelEtat.etape;
  etat.statut = nouvelEtat.statut;
  etat.dejaReussi = nouvelEtat.dejaReussi;
  etat.code = nouvelEtat.code;
}

function sauvegarderAutoLocalement(){
  try{
    const sauvegarde = creerObjetSauvegarde();
    localStorage.setItem(CLE_SAUVEGARDE_AUTO, JSON.stringify(sauvegarde));
    return true;
  }catch(err){
    console.warn("Sauvegarde automatique impossible", err);
    return false;
  }
}

function programmerSauvegardeAuto(){
  clearTimeout(timerSauvegardeAuto);
  timerSauvegardeAuto = setTimeout(()=> sauvegarderAutoLocalement(), 400);
}

function marquerTravailModifie(){
  travailModifieDepuisExport = true;
  programmerSauvegardeAuto();
}

function nomFichierSauvegarde(){
  const date = new Date();
  const pad = (n)=> String(n).padStart(2, "0");
  const horodatage = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}`;
  return `sauvegarde_space_defense_${horodatage}.json`;
}

async function enregistrerTravail(){
  const sauvegarde = creerObjetSauvegarde();
  const contenu = JSON.stringify(sauvegarde, null, 2);
  const blob = new Blob([contenu], { type:"application/json" });
  const nom = nomFichierSauvegarde();

  try{
    if(window.showSaveFilePicker){
      const handle = await window.showSaveFilePicker({
        suggestedName: nom,
        types: [{ description:"Sauvegarde Space Défense", accept:{ "application/json":[".json"] } }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    }else{
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = nom;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(()=> URL.revokeObjectURL(url), 1000);
    }

    sauvegarderAutoLocalement();
    travailModifieDepuisExport = false;
    definirStatut("Travail enregistré. Range le fichier dans ton dossier personnel réseau.", "ok");
  }catch(err){
    if(err && err.name === "AbortError"){
      definirStatut("Enregistrement annulé.", "reset");
    }else{
      console.error(err);
      definirStatut("Impossible d'enregistrer le fichier de sauvegarde.", "bad");
    }
  }
}

function chargerTravailDepuisFichier(fichier){
  if(!fichier) return;

  const lecteur = new FileReader();
  lecteur.onload = ()=>{
    try{
      const obj = JSON.parse(String(lecteur.result || ""));
      const nouvelEtat = normaliserEtatSauvegarde(obj);
      remplacerEtat(nouvelEtat);
      afficherCode();
      rendreEtapesHaut();
      rendreConsigne();
      appliquerApercu({ valider:false, messageAuto:false });
      sauvegarderAutoLocalement();
      travailModifieDepuisExport = false;
      definirStatut("Sauvegarde chargée. Tu peux continuer ton travail.", "ok");
    }catch(err){
      console.error(err);
      definirStatut("Fichier de sauvegarde invalide ou illisible.", "bad");
    }finally{
      ui.inputSauvegarde.value = "";
    }
  };
  lecteur.onerror = ()=>{
    definirStatut("Impossible de lire le fichier de sauvegarde.", "bad");
    ui.inputSauvegarde.value = "";
  };
  lecteur.readAsText(fichier, "utf-8");
}

function proposerRestaurationAuto(){
  let brut = null;
  try{
    brut = localStorage.getItem(CLE_SAUVEGARDE_AUTO);
  }catch(err){
    return false;
  }
  if(!brut) return false;

  try{
    const obj = JSON.parse(brut);
    const nouvelEtat = normaliserEtatSauvegarde(obj);
    const date = obj.date ? new Date(obj.date) : null;
    const dateLisible = date && !Number.isNaN(date.getTime()) ? date.toLocaleString("fr-FR") : "date inconnue";
    const ok = confirm(`Une sauvegarde automatique a été trouvée (${dateLisible}).\n\nVoulez-vous la restaurer ?`);
    if(!ok) return false;

    remplacerEtat(nouvelEtat);
    travailModifieDepuisExport = true;
    definirStatut("Sauvegarde automatique restaurée. Pense à enregistrer ton travail dans ton dossier réseau.", "reset");
    return true;
  }catch(err){
    console.warn("Sauvegarde automatique ignorée", err);
    return false;
  }
}

window.addEventListener("beforeunload", (event)=>{
  if(!travailModifieDepuisExport) return;
  sauvegarderAutoLocalement();
  event.preventDefault();
  event.returnValue = "";
});

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
  const ong = (e.langage === "HTML") ? "html" : (e.langage === "CSS") ? "css" : (e.langage === "Python") ? "py" : "html";
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
  marquerTravailModifie();
}

/* Events */
onglets.forEach(b=> b.addEventListener("click", ()=> definirOnglet(b.dataset.tab)));
[ui.codeHtml, ui.codeCss, ui.codePy].forEach(zone=>{
  zone.addEventListener("input", ()=>{
    collecterCode();
    marquerTravailModifie();
  });
});
ui.btnAppliquer.addEventListener("click", ()=>{
  appliquerApercu({ valider:true, messageAuto:true });
  marquerTravailModifie();
});
ui.btnReinit.addEventListener("click", ()=>{
  reinitialiserEtape();
  marquerTravailModifie();
});
ui.btnRetablir.addEventListener("click", ()=>{
  retablirEtape();
  marquerTravailModifie();
});
ui.btnSuivant.addEventListener("click", ()=>{
  etapeSuivante();
  marquerTravailModifie();
});
ui.btnSauvegarder.addEventListener("click", enregistrerTravail);
ui.btnCharger.addEventListener("click", ()=> ui.inputSauvegarde.click());
ui.inputSauvegarde.addEventListener("change", ()=> chargerTravailDepuisFichier(ui.inputSauvegarde.files[0]));

/* Init */
(function init(){
  updateScale();
  const restauration = proposerRestaurationAuto();
  afficherCode();
  rendreEtapesHaut();
  rendreConsigne();
  if(!restauration) definirStatut("Modifier le code puis cliquer sur Appliquer");
  appliquerApercu({ valider:false, messageAuto:false });
  sauvegarderAutoLocalement();
})();
