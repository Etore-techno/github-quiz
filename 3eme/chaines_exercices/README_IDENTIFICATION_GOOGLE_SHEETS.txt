MISE EN PLACE DE L'IDENTIFICATION ET DE LA SAUVEGARDE GOOGLE SHEETS

1. Ce qui a été ajouté dans la page web
- Une fenêtre d'identification s'ouvre au lancement.
- Les élèves indiquent seulement le numéro de la classe : 1, 2, 3, 4 ou 5.
- L'affichage correspond à 3e1, 3e2, 3e3, 3e4 ou 3e5.
- Ils indiquent nom et prénom de l'élève 1.
- Ils indiquent nom et prénom de l'élève 2, sauf s'ils cochent « Je travaille seul(e) ».
- Un code de reprise est généré automatiquement.
- Le code permet de reprendre l'activité après fermeture ou plantage.
- La progression est sauvegardée dans le navigateur, même si Google Sheets n'est pas encore configuré.

2. Fichiers modifiés / ajoutés
- index.html : ajout de la fenêtre d'identification.
- styles.css : mise en forme de la fenêtre d'identification.
- script.js : gestion des élèves, du code de reprise, de la progression et de la sauvegarde.
- Code.gs : code Google Apps Script à coller dans Google Sheets.

3. Création du tableur Google Sheets
- Créer un nouveau Google Sheets dans votre compte Google.
- Ouvrir Extensions > Apps Script.
- Supprimer le code déjà présent.
- Coller tout le contenu du fichier Code.gs.
- Enregistrer.
- Dans Apps Script, exécuter une première fois la fonction setupSheets.
- Autoriser le script.
- Les 5 feuilles 3e1, 3e2, 3e3, 3e4 et 3e5 seront créées automatiquement.

4. Déploiement du script
- Dans Apps Script, cliquer sur Déployer > Nouveau déploiement.
- Choisir le type « Application Web ».
- Exécuter en tant que : vous-même.
- Accès : Tout le monde.
- Déployer.
- Copier l'URL de l'application Web, qui se termine par /exec.

5. Lier la page web au Google Sheets
- Ouvrir script.js.
- Repérer la ligne :
  const GOOGLE_SCRIPT_URL = "";
- Coller l'URL Apps Script entre les guillemets, par exemple :
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
- Enregistrer le fichier.

6. Fonctionnement du tableur
- Chaque code de reprise correspond à une seule ligne.
- Si les élèves continuent l'activité, la ligne est mise à jour au lieu d'être dupliquée.
- Les élèves de 3e1 sont enregistrés dans la feuille 3e1, ceux de 3e2 dans 3e2, etc.
- Les notes des exercices sont visibles directement dans les colonnes.
- La colonne « Progression JSON » contient toutes les informations nécessaires pour reprendre l'activité.

7. Remarque importante
Pour que la reprise fonctionne depuis un autre ordinateur, Google Sheets doit être configuré.
Si Google Sheets n'est pas configuré, la reprise fonctionne seulement sur le même navigateur grâce à la sauvegarde locale.

8. Mise à jour importante de cette version
- L'ordre des premières colonnes du tableur est maintenant : Nom 1, Prénom 1, Nom 2, Prénom 2, Note 1, Note 2, Note 3.
- Si un élève reprend l'activité avec son code, le site restaure l'exercice exactement dans l'état sauvegardé : réponses déjà validées, réponses affichées en correction, nombre d'erreurs utilisées et points déjà obtenus.
- Après chaque vérification, la sauvegarde est forcée immédiatement pour éviter de perdre la progression si la page est fermée juste après.
- Si une progression existe à la fois dans le navigateur et dans Google Sheets, le site garde la sauvegarde la plus récente.

Pour appliquer ces changements, il faut remplacer le contenu de votre Apps Script par le nouveau fichier Code.gs, puis faire Déployer > Gérer les déploiements > Modifier > Nouvelle version > Déployer.
