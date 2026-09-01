HTML • CSS • Python — progression des exercices

Structure :
- éditeur HTML / CSS / Python à gauche ;
- aperçu du mini-jeu à droite ;
- validation progressive par étapes ;
- sauvegarde possible dans un fichier .json ;
- restauration possible depuis une sauvegarde ;
- sauvegarde automatique locale de secours ;
- alerte du navigateur si l'élève ferme la page sans enregistrer.

Objectif final : créer progressivement un mini-jeu inspiré de Space Invaders.
Le joueur déplace un vaisseau horizontalement, tire des missiles vers le haut et empêche les ennemis d’atteindre le bas de la zone de jeu.

Équilibrage final du jeu :
- 5 niveaux ;
- un nouveau type d’ennemi apparaît à chaque niveau ;
- au niveau 5, les 5 types d’ennemis sont présents ;
- les ennemis ont des vitesses différentes, de 1 à 2, mais infligent tous 1 dégât ;
- les ennemis sont environ deux fois plus grands pour être plus faciles à toucher ;
- le joueur commence avec 1 vie ;
- un cœur apparaît une fois par niveau à la moitié de l’objectif ;
- le cœur descend deux fois plus vite que l’ennemi le plus rapide du niveau ;
- il n’y a pas de limite maximale de vies ;
- si le joueur réussit un niveau sans perdre de vie, il gagne 1 vie supplémentaire en passant au niveau suivant ;
- objectifs des niveaux : 20, 40, 60, 80 et 100 ennemis, soit 300 ennemis au total ;
- les tirs sont moins fréquents pour éviter qu’un appui continu sur Espace balaie tout l’écran ;
- la vitesse de base des ennemis a été légèrement augmentée ;
- les ennemis arrivent plus nombreux et descendent un peu plus vite au fil des niveaux ;
- un cadre d’informations temporaires affiche certains messages pendant environ 5 secondes.

Progression des exercices :
1. HTML 1 — titre du jeu.
2. HTML 2 — phrase de présentation.
3. HTML 3 — nom des boutons.
4. HTML 4 — symbole du vaisseau.
5. CSS 1 — agrandir la zone de jeu sans dépasser du cadre.
6. CSS 2 — fond spatial.
7. CSS 3 — taille du vaisseau.
8. CSS 4 — ennemis plus faciles à toucher.
9. CSS 5 — textes du mini-jeu plus grands.
10. Python 1 — activer le jeu.
11. Python 2 — objectif du premier niveau.
12. Python 3 — vitesses des tirs et ennemis.
13. Python 4 — vitesse du vaisseau.
14. Python 5 — tirs moins rapides.
15. Python 6 — apparition des ennemis.
16. HTML 5 — ajouter l’aide et les messages.
17. CSS 6 — deux cadres espacés pour l’aide et les infos.
18. HTML 6 — ajouter l’affichage du niveau.
19. CSS 7 — quatre statistiques sur deux lignes.
20. HTML 7 — classe du bloc Niveau.
21. Python 7 — afficher le niveau.
22. Python 8 — cinq types d’ennemis.
23. Python 9 — vitesses différentes de 1 à 2.
24. Python 10 — mêmes dégâts pour tous.
25. Python 11 — difficulté progressive.
26. Python 12 — cinq objectifs de niveau.
27. Python 13 — cœur à la moitié du niveau.
28. Python 14 — bonus sans-faute.
29. CSS 8 — décors des niveaux.
30. CSS 9 — compléter les décors.
31. Python 15 — activer les décors.
32. Python 16 — messages temporaires.
33. Projet libre — personnaliser le jeu.

Dernières corrections :
- les consignes des exercices 9, 17, 18 et 21 ont été ajustées ;
- l’ancien exercice 29 est maintenant découpé en deux exercices : création des 5 règles de décor, puis remplacement des valeurs de <code>radial-gradient(...)</code> ;
- la progression contient maintenant 33 exercices ;
- les anciennes sauvegardes à 32 ou 34 exercices restent compatibles : elles sont adaptées automatiquement au chargement ;
- la validation vérifie la modification demandée dans l’exercice ;
- quand l’élève clique sur Suivant, les trois codes sont remis dans l’état propre officiel de l’exercice réussi ;
- le bouton Réinitialiser remet les trois codes dans l’état propre de l’exercice précédent ;
- le dernier exercice reste libre : l’élève peut modifier ce qu’il veut et enregistrer ses personnalisations.

Corrections supplémentaires précédentes :
- les cadres Score, Vies, Objectif et Niveau s’affichent sur deux lignes ;
- les cadres d’aide et d’informations sont séparés ;
- les textes du mini-jeu ont été agrandis ;
- les dimensions de la zone de jeu sont calculées avec les tailles réelles en pixels CSS, ce qui corrige le déplacement du vaisseau, l’apparition des ennemis et le départ des missiles même quand la page est redimensionnée ;
- la hauteur finale de la zone de jeu est ajustée à 720 px pour rester visible avec les textes agrandis ;
- les messages temporaires restent affichés environ 5 secondes ;
- un message apparaît quand un cœur est touché, quand une vie est perdue, et quand le joueur change de niveau, avec ou sans bonus sans-faute ;
- la progression des exercices a été revérifiée : les changements visuels apparaissent progressivement, avec le jeu jouable avant les niveaux multiples, les cœurs, les décors et les messages.
