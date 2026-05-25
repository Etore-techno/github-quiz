Atelier Space Défense — progression des exercices

Structure conservée :
- éditeur HTML / CSS / Python à gauche ;
- aperçu du mini-jeu à droite ;
- validation progressive par étapes.

Objectif final : créer progressivement un mini-jeu inspiré de Space Invaders.
Le joueur déplace un vaisseau horizontalement, tire des missiles vers le haut et doit empêcher les ennemis d’atteindre le bas de la zone de jeu.

Partie 1 — jeu simple jouable
1. HTML : remplacer le titre par Space Défense.
2. HTML : remplacer le paragraphe par la phrase de présentation.
3. HTML : renommer les boutons Démarrer et Recommencer.
4. HTML : remplacer le symbole du vaisseau par 🚀.
5. CSS : agrandir la zone de jeu.
6. CSS : créer un fond spatial.
7. CSS : agrandir le vaisseau.
8. CSS : modifier le style des missiles et des ennemis.
9. Python : activer le jeu.
10. Python : fixer le score à atteindre.
11. Python : donner 3 vies au joueur.
12. Python : régler la vitesse des missiles.
13. Python : régler la vitesse des ennemis.
14. Python : activer l’apparition automatique des ennemis.

À la fin de l’étape 14, le jeu est jouable : le joueur peut gagner ou perdre.

Partie 2 — amélioration progressive du jeu
15. HTML : ajouter une aide indiquant les touches.
16. CSS : créer la classe de l’aide.
17. CSS : améliorer l’aide en la centrant et en la mettant en gras.
18. HTML : ajouter un 4e bloc de statistique pour le niveau, juste après Objectif.
19. CSS : afficher correctement les 4 blocs de statistique.
20. HTML : ajouter la classe niveauActuel sur le bloc Niveau.
21. CSS : créer le style de la classe niveauActuel.
22. Python : ajouter un deuxième type d’ennemi.
23. Python : activer la difficulté progressive.
24. Python : augmenter la vitesse maximale des ennemis.
25. Python : rendre les ennemis plus fréquents.
26. Python : calculer le niveau en fonction du score.
27. Python : afficher le niveau dans le tableau de bord.

Corrections de cette version :
- l’étape 17 n’utilise plus box-shadow sur .zoneJeu pour éviter l’ambiguïté avec la règle commune .tableauBord, .zoneJeu ;
- l’étape 18 parle de "bloc de statistique" plutôt que de "carte" ;
- l’étape 18 accepte l’ajout du bloc Niveau sans exiger la classe niveauActuel ;
- la classe niveauActuel est demandée dans une étape séparée, plus claire.


Corrections v3 :
- Python 7 : écrire ENNEMIS = ["👾", "🛸"]. Les deux ennemis doivent être dans des guillemets séparés, avec une virgule entre les deux.
- Python 12 : dans maj_affichage(), remplacer le commentaire par :
    if niveau_el is not None:
        niveau_el.textContent = str(calculer_niveau())
  La ligne if doit être indentée dans la fonction, et la ligne niveau_el doit être encore plus indentée.
