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

@media (max-width: 900px){
  .grille{ grid-template-columns: 1fr; }
}`;

const PY_BASE = `from browser import document, timer, window
import random

JEU_ACTIF = False

SCORE_CIBLE = 0
VIES_DEPART = 1

VITESSE_VAISSEAU = 18
VITESSE_MISSILE = 0
VITESSE_ENNEMI = 0
VITESSE_ENNEMI_MAX = 4

DELAI_ENNEMI_MS = 1200
ENNEMIS_AUTO = False
DIFFICULTE_PROGRESSIVE = False

ENNEMIS = ["👾"]

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

# Évite d'empiler plusieurs fois les mêmes événements clavier
try:
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

def largeur_arene():
    return int(arene.getBoundingClientRect().width)

def hauteur_arene():
    return int(arene.getBoundingClientRect().height)

def message(texte):
    message_el.textContent = texte

def calculer_niveau():
    return 1

def maj_affichage():
    score_el.textContent = str(score)
    vies_el.textContent = str(vies)
    objectif_el.textContent = str(SCORE_CIBLE)
    # Plus tard : afficher le niveau ici.

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

def creer_ennemi():
    if not en_cours:
        return
    if not ENNEMIS_AUTO:
        return

    e = document.createElement("div")
    e.className = "ennemi"
    e.textContent = random.choice(ENNEMIS)
    arene <= e

    marge = 28
    w = largeur_arene()
    x = random.randint(marge, max(marge + 1, w - marge))
    y = 8

    obj = {"el": e, "x": x, "y": y}
    ennemis.append(obj)

    e.style.left = f"{x}px"
    e.style.top = f"{y}px"
    e.style.transform = "translate(-50%,-50%)"

def vitesse_ennemi_actuelle():
    if not DIFFICULTE_PROGRESSIVE:
        return VITESSE_ENNEMI
    bonus = calculer_niveau() - 1
    return min(VITESSE_ENNEMI + bonus, VITESSE_ENNEMI_MAX)

def collision(missile, ennemi):
    dx = abs(missile["x"] - ennemi["x"])
    dy = abs(missile["y"] - ennemi["y"])
    return dx < 24 and dy < 24

def boucle():
    global x_vaisseau, score, vies, attente_tir

    if not en_cours:
        return

    if "ArrowLeft" in touches:
        x_vaisseau -= VITESSE_VAISSEAU
    if "ArrowRight" in touches:
        x_vaisseau += VITESSE_VAISSEAU

    placer_vaisseau()

    if attente_tir > 0:
        attente_tir -= 1

    if "Space" in touches and attente_tir <= 0:
        creer_missile()
        attente_tir = 8

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
        e["y"] += vitesse_ennemi_actuelle()
        e["el"].style.top = f"{e['y']}px"

        if e["y"] > hauteur_arene() - 20:
            try:
                e["el"].remove()
            except:
                pass
            ennemis.remove(e)

            vies -= 1
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

                score += 1
                maj_affichage()

                if SCORE_CIBLE > 0 and score >= SCORE_CIBLE:
                    gagner()
                    return
                break

def demarrer():
    global en_cours, score, vies, id_boucle, id_spawn, x_vaisseau

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
    global score, vies, x_vaisseau
    arreter()
    supprimer_liste(missiles)
    supprimer_liste(ennemis)

    score = 0
    vies = VIES_DEPART
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
   ETAPES — progression pédagogique
========================================================= */

const ETAPES = window.ETAPES || [
  // Partie 1 : modifications très simples en HTML
  {
    langage:"HTML",
    titre:"HTML 1 — titre du jeu",
    objectif:`Remplacer le texte <code>Titre</code> par <code>Space Défense</code> dans la balise <code>&lt;h1&gt;</code>.`,
    indice:`Chercher <code>&lt;h1 class="zoneTitre"&gt;</code> puis modifier uniquement le mot.`,
    verif:(c)=> /<h1[^>]*class=["'][^"']*\bzoneTitre\b[^"']*["'][^>]*>\s*Space Défense\s*<\/h1>/i.test(c.html),
  },
  {
    langage:"HTML",
    titre:"HTML 2 — phrase de présentation",
    objectif:`Remplacer le texte <code>Paragraphe</code> par <code>Protège ta base contre les envahisseurs.</code>`,
    indice:`Chercher <code>&lt;p class="zoneParagraphe"&gt;</code>.`,
    verif:(c)=> /<p[^>]*class=["'][^"']*\bzoneParagraphe\b[^"']*["'][^>]*>\s*Protège ta base contre les envahisseurs\.\s*<\/p>/i.test(c.html),
  },
  {
    langage:"HTML",
    titre:"HTML 3 — nom des boutons",
    objectif:`Remplacer le texte du premier bouton par <code>Démarrer</code> et celui du second par <code>Recommencer</code>.`,
    indice:`Chercher <code>id="btnDemarrer"</code> puis <code>id="btnReinitialiser"</code>.`,
    verif:(c)=> /<button[^>]*id=["']btnDemarrer["'][^>]*>\s*Démarrer\s*<\/button>/i.test(c.html)
      && /<button[^>]*id=["']btnReinitialiser["'][^>]*>\s*Recommencer\s*<\/button>/i.test(c.html),
  },
  {
    langage:"HTML",
    titre:"HTML 4 — symbole du vaisseau",
    objectif:`Remplacer le symbole <code>?</code> du vaisseau par <code>🚀</code>.`,
    indice:`Chercher <code>id="vaisseau"</code>.`,
    verif:(c)=> /<div[^>]*id=["']vaisseau["'][^>]*>\s*🚀\s*<\/div>/i.test(c.html),
  },

  // Partie 1 : modifications simples en CSS
  {
    langage:"CSS",
    titre:"CSS 1 — agrandir la zone de jeu",
    objectif:`Dans <code>.areneJeu</code>, remplacer <code>height: 320px</code> par <code>height: 360px</code>.`,
    indice:`Chercher la règle <code>.areneJeu</code>.`,
    verif:(c)=> /\.areneJeu\s*\{[^}]*height\s*:\s*360px/is.test(c.css),
  },
  {
    langage:"CSS",
    titre:"CSS 2 — fond spatial",
    objectif:`Dans <code>.areneJeu</code>, remplacer le fond par <code>background: radial-gradient(circle at top, #1a2a52, #050712)</code>.`,
    indice:`Modifier la propriété <code>background</code> de <code>.areneJeu</code>.`,
    verif:(c)=> /\.areneJeu\s*\{[^}]*background\s*:\s*radial-gradient\(circle at top,\s*#1a2a52,\s*#050712\)\s*;?/is.test(c.css),
  },
  {
    langage:"CSS",
    titre:"CSS 3 — taille du vaisseau",
    objectif:`Dans <code>.vaisseau</code>, remplacer <code>font-size: 28px</code> par <code>font-size: 38px</code>.`,
    indice:`Chercher la règle <code>.vaisseau</code>.`,
    verif:(c)=> /\.vaisseau\s*\{[^}]*font-size\s*:\s*38px/is.test(c.css),
  },
  {
    langage:"CSS",
    titre:"CSS 4 — missiles et ennemis",
    objectif:`Mettre le fond des missiles en <code>#2fffd6</code> et la taille des ennemis en <code>32px</code>.`,
    indice:`Chercher les règles <code>.missile</code> et <code>.ennemi</code>.`,
    verif:(c)=> /\.missile\s*\{[^}]*background\s*:\s*#2fffd6/is.test(c.css)
      && /\.ennemi\s*\{[^}]*font-size\s*:\s*32px/is.test(c.css),
  },

  // Partie 1 : paramètres Python simples pour rendre le jeu jouable
  {
    langage:"Python",
    titre:"Python 1 — activer le jeu",
    objectif:`Remplacer <code>JEU_ACTIF = False</code> par <code>JEU_ACTIF = True</code>.`,
    indice:`C’est au début du fichier Python.`,
    verif:(c)=> /JEU_ACTIF\s*=\s*True/.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 2 — objectif à atteindre",
    objectif:`Remplacer <code>SCORE_CIBLE = 0</code> par <code>SCORE_CIBLE = 5</code>.`,
    indice:`Le joueur gagne quand il atteint ce score.`,
    verif:(c)=> /SCORE_CIBLE\s*=\s*5\b/.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 3 — nombre de vies",
    objectif:`Remplacer <code>VIES_DEPART = 1</code> par <code>VIES_DEPART = 3</code>.`,
    indice:`Le joueur perd une vie si un ennemi atteint le bas de la zone.`,
    verif:(c)=> /VIES_DEPART\s*=\s*3\b/.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 4 — vitesse du missile",
    objectif:`Remplacer <code>VITESSE_MISSILE = 0</code> par <code>VITESSE_MISSILE = 10</code>.`,
    indice:`Plus le nombre est grand, plus le missile monte vite.`,
    verif:(c)=> /VITESSE_MISSILE\s*=\s*10\b/.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 5 — vitesse des ennemis",
    objectif:`Remplacer <code>VITESSE_ENNEMI = 0</code> par <code>VITESSE_ENNEMI = 2</code>.`,
    indice:`Plus le nombre est grand, plus les ennemis descendent vite.`,
    verif:(c)=> /VITESSE_ENNEMI\s*=\s*2\b/.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 6 — apparition des ennemis",
    objectif:`Remplacer <code>ENNEMIS_AUTO = False</code> par <code>ENNEMIS_AUTO = True</code>.`,
    indice:`Après cette étape, le jeu est jouable : on peut gagner ou perdre.`,
    verif:(c)=> /ENNEMIS_AUTO\s*=\s*True/.test(c.py),
  },

  // Partie 2 : enrichissement du jeu
  {
    langage:"HTML",
    titre:"HTML 5 — ajouter les commandes",
    objectif:`Dans <code>zoneExtra</code>, ajouter la ligne <code>&lt;p class="aideTouches"&gt;← → : déplacer | Espace : tirer&lt;/p&gt;</code>.`,
    indice:`Écrire cette ligne entre <code>&lt;div id="zoneExtra" class="zoneExtra"&gt;</code> et <code>&lt;/div&gt;</code>.`,
    verif:(c)=> /<div[^>]*id=["']zoneExtra["'][^>]*>[\s\S]*<p[^>]*class=["']aideTouches["'][^>]*>\s*← → : déplacer \| Espace : tirer\s*<\/p>[\s\S]*<\/div>/i.test(c.html),
  },
  {
    langage:"CSS",
    titre:"CSS 5 — créer la classe d’aide",
    objectif:`Créer une nouvelle règle <code>.aideTouches</code> qui contient <code>color: #2fffd6</code>.`,
    indice:`Ajouter une nouvelle règle CSS en bas du fichier.`,
    verif:(c)=> /\.aideTouches\s*\{[^}]*color\s*:\s*#2fffd6/is.test(c.css),
  },
  {
    langage:"CSS",
    titre:"CSS 6 — améliorer l’aide",
    objectif:`Dans la règle <code>.aideTouches</code>, ajouter <code>text-align: center</code> et <code>font-weight: 900</code>.`,
    indice:`Reprendre la règle <code>.aideTouches</code> créée à l’étape précédente et ajouter ces deux propriétés à l’intérieur des accolades.`,
    verif:(c)=> /\.aideTouches\s*\{[^}]*text-align\s*:\s*center[^}]*font-weight\s*:\s*900/is.test(c.css)
      || /\.aideTouches\s*\{[^}]*font-weight\s*:\s*900[^}]*text-align\s*:\s*center/is.test(c.css),
  },
  {
    langage:"HTML",
    titre:"HTML 6 — ajouter l’affichage du niveau",
    objectif:`Dans <code>ligneStats</code>, il existe déjà 3 blocs de statistique : <code>Score</code>, <code>Vies</code> et <code>Objectif</code>. Ajouter un 4e bloc juste après <code>Objectif</code>, avec le label <code>Niveau</code> et l’identifiant <code>id="niveauJeu"</code>.`,
    indice:`Copier-coller un bloc complet <code>&lt;div class="carteStat"&gt;...&lt;/div&gt;</code> existant, le coller en 4e position après le bloc Objectif, puis remplacer le label par <code>Niveau</code> et l’id de la valeur par <code>niveauJeu</code>.`,
    verif:(c)=> /id=["']objectifJeu["'][\s\S]*<div[^>]*class=["'][^"']*\bcarteStat\b[^"']*["'][^>]*>[\s\S]*Niveau[\s\S]*id=["']niveauJeu["']/i.test(c.html),
  },
  {
    langage:"CSS",
    titre:"CSS 7 — quatre statistiques",
    objectif:`Dans <code>.ligneStats</code>, remplacer <code>repeat(3, 1fr)</code> par <code>repeat(4, 1fr)</code>.`,
    indice:`Cela permet d’afficher correctement les 4 blocs : Score, Vies, Objectif et Niveau.`,
    verif:(c)=> /\.ligneStats\s*\{[^}]*grid-template-columns\s*:\s*repeat\(4,\s*1fr\)/is.test(c.css),
  },
  {
    langage:"HTML",
    titre:"HTML 7 — ajouter une classe au niveau",
    objectif:`Sur le nouveau bloc de statistique <code>Niveau</code>, ajouter la classe <code>niveauActuel</code> à côté de <code>carteStat</code>.`,
    indice:`Le début du bloc doit devenir par exemple <code>&lt;div class="carteStat niveauActuel"&gt;</code>.`,
    verif:(c)=> /<div[^>]*class=["'][^"']*\bcarteStat\b[^"']*\bniveauActuel\b[^"']*["'][^>]*>[\s\S]*Niveau[\s\S]*id=["']niveauJeu["']/i.test(c.html),
  },
  {
    langage:"CSS",
    titre:"CSS 8 — créer une classe niveau",
    objectif:`Créer une nouvelle règle <code>.niveauActuel</code> avec <code>border-color: rgba(47,255,214,.45)</code>.`,
    indice:`Ajouter cette règle en bas du CSS. Elle servira à différencier visuellement le bloc Niveau.`,
    verif:(c)=> /\.niveauActuel\s*\{[^}]*border-color\s*:\s*rgba\(47,\s*255,\s*214,\s*\.45\)/is.test(c.css),
  },
  {
    langage:"Python",
    titre:"Python 7 — ajouter un deuxième ennemi",
    objectif:`Remplacer exactement <code>ENNEMIS = ["👾"]</code> par <code>ENNEMIS = ["👾", "🛸"]</code>.`,
    indice:`Chaque ennemi doit être dans ses propres guillemets. Il faut donc écrire deux textes séparés par une virgule : <code>["👾", "🛸"]</code>. Ne pas écrire <code>["👾""🛸"]</code>.`,
    verif:(c)=> /ENNEMIS\s*=\s*\[\s*["']👾["']\s*,\s*["']🛸["']\s*\]/s.test(c.py)
      || /ENNEMIS\s*=\s*\[\s*["']🛸["']\s*,\s*["']👾["']\s*\]/s.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 8 — difficulté progressive",
    objectif:`Remplacer <code>DIFFICULTE_PROGRESSIVE = False</code> par <code>DIFFICULTE_PROGRESSIVE = True</code>.`,
    indice:`Les ennemis accéléreront quand le niveau augmentera.`,
    verif:(c)=> /DIFFICULTE_PROGRESSIVE\s*=\s*True/.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 9 — vitesse maximale",
    objectif:`Remplacer <code>VITESSE_ENNEMI_MAX = 4</code> par <code>VITESSE_ENNEMI_MAX = 6</code>.`,
    indice:`C’est la vitesse limite avec la difficulté progressive.`,
    verif:(c)=> /VITESSE_ENNEMI_MAX\s*=\s*6\b/.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 10 — ennemis plus fréquents",
    objectif:`Remplacer <code>DELAI_ENNEMI_MS = 1200</code> par <code>DELAI_ENNEMI_MS = 900</code>.`,
    indice:`Le délai est en millisecondes : plus il est petit, plus les ennemis apparaissent souvent.`,
    verif:(c)=> /DELAI_ENNEMI_MS\s*=\s*900\b/.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 11 — calcul du niveau",
    objectif:`Dans <code>calculer_niveau()</code>, remplacer <code>return 1</code> par <code>return 1 + score // 5</code>.`,
    indice:`Le niveau augmente tous les 5 points.`,
    verif:(c)=> /def\s+calculer_niveau\s*\(\)\s*:\s*return\s+1\s*\+\s*score\s*\/\/\s*5/s.test(c.py),
  },
  {
    langage:"Python",
    titre:"Python 12 — afficher le niveau",
    objectif:`Dans la fonction <code>maj_affichage()</code>, remplacer le commentaire <code># Plus tard : afficher le niveau ici.</code> par les deux lignes ci-dessous :<br><code>&nbsp;&nbsp;&nbsp;&nbsp;if niveau_el is not None:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;niveau_el.textContent = str(calculer_niveau())</code>`,
    indice:`Attention à l’indentation Python : la ligne <code>if niveau_el is not None:</code> doit être alignée avec les trois lignes <code>score_el</code>, <code>vies_el</code> et <code>objectif_el</code>. La ligne <code>niveau_el.textContent...</code> doit être encore plus décalée vers la droite.`,
    verif:(c)=> /def\s+maj_affichage\s*\(\)\s*:\s*\n\s+score_el\.textContent\s*=\s*str\(score\)\s*\n\s+vies_el\.textContent\s*=\s*str\(vies\)\s*\n\s+objectif_el\.textContent\s*=\s*str\(SCORE_CIBLE\)\s*\n\s+if\s+niveau_el\s+is\s+not\s+None\s*:\s*\n\s+niveau_el\.textContent\s*=\s*str\(calculer_niveau\(\)\)/s.test(c.py),
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

/* Calcule la dernière étape accessible */
function maxEtapeAccessible(){
  const i = etat.valide.findIndex(v => v === false);
  return (i === -1) ? (ETAPES.length - 1) : i;
}

/* Pastilles : clic uniquement si étape accessible */
function rendreEtapesHaut(){
  const maxAcc = maxEtapeAccessible();
  ui.stepHeader.innerHTML = "";

  ETAPES.forEach((_, i)=>{
    const d = document.createElement("div");
    d.className = "stepDot";
    d.textContent = String(i+1);

    if(i === etat.etape) d.classList.add("active");
    if(etat.valide[i]) d.classList.add("done");

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
    definirStatut("Tout est terminé : le jeu est complet.", "ok");
  }
}

function allerEtape(i){
  if(i > maxEtapeAccessible()) return;

  etat.etape = i;
  snapshotSiBesoin(i);
  rendreConsigne();
  afficherCode();

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
