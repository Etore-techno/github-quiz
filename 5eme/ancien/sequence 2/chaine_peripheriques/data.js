window.CHAINE_DATA = {
  basePoints: [10, 8, 6, 5],

  series: [
    {
      id: "ordinateur",
      name: "Ordinateur",
      exercises: [
        {
          title: "Mail avec pièce jointe",
          statement:
            "Scénario : Tu numérises un document, puis tu l’envoies par mail en écrivant un message.",
          needs: { acquerir: 3, traiter: 1, communiquer: 2 },
          pool: [
            { id:"scanner", name:"Scanner", img:"images/peripheriques/scanner.png" },
            { id:"souris", name:"Souris", img:"images/peripheriques/souris.png" },
            { id:"clavier", name:"Clavier", img:"images/peripheriques/clavier.png" },
            { id:"unite", name:"Unité centrale", img:"images/peripheriques/unite_centrale.png" },
            { id:"ecran", name:"Écran", img:"images/peripheriques/ecran.png" },
            { id:"box_tx", name:"Box Internet (envoi)", img:"images/peripheriques/box_internet.png" },

            // intrus
            { id:"usb", name:"Clé USB", img:"images/peripheriques/cle_usb.png" },
            { id:"casque", name:"Casque", img:"images/peripheriques/casque.png" }
          ],
          solution: {
            scanner: "acquerir",
            souris: "acquerir",
            clavier: "acquerir",
            unite: "traiter",
            ecran: "communiquer",
            box_tx: "communiquer"
          }
        },

        {
          title: "Visioconférence",
          statement:
            "Scénario : Tu rejoinds une visio, tu parles, tu vois et entends les autres, et les autres te voient.",
          needs: { acquerir: 4, traiter: 1, communiquer: 3 },
          pool: [
            { id:"souris", name:"Souris", img:"images/peripheriques/souris.png" },
            { id:"micro", name:"Micro", img:"images/peripheriques/micro.png" },
            { id:"webcam", name:"Webcam", img:"images/peripheriques/webcam.png" },
            { id:"unite", name:"Unité centrale", img:"images/peripheriques/unite_centrale.png" },
            { id:"ecran", name:"Écran", img:"images/peripheriques/ecran.png" },
            { id:"casque", name:"Casque", img:"images/peripheriques/casque.png" },
            { id:"box_rx", name:"Box Internet (réception)", img:"images/peripheriques/box_internet.png" },
            { id:"box_tx", name:"Box Internet (envoi)", img:"images/peripheriques/box_internet.png" },

            // intrus
            { id:"scanner", name:"Scanner", img:"images/peripheriques/scanner.png" },
            { id:"impr", name:"Imprimante", img:"images/peripheriques/imprimante.png" }
          ],
          solution: {
            souris: "acquerir",
            micro: "acquerir",
            webcam: "acquerir",
            box_rx: "acquerir",
            unite: "traiter",
            ecran: "communiquer",
            casque: "communiquer",
            box_tx: "communiquer"
          }
        },

        {
          title: "Jouer sur ordinateur",
          statement:
            "Scénario : Tu joues à un jeu hors ligne installé sur ton ordinateur.",
          needs: { acquerir: 1, traiter: 1, communiquer: 2 },
          pool: [
            { id:"manette", name:"Manette", img:"images/peripheriques/manette.png" },
            { id:"unite", name:"Unité centrale", img:"images/peripheriques/unite_centrale.png" },
            { id:"ecran", name:"Écran", img:"images/peripheriques/ecran.png" },
            { id:"casque", name:"Casque", img:"images/peripheriques/casque.png" },

            // intrus
            { id:"scanner", name:"Scanner", img:"images/peripheriques/scanner.png" },
            { id:"webcam", name:"Webcam", img:"images/peripheriques/webcam.png" }
          ],
          solution: {
            manette: "acquerir",
            unite: "traiter",
            ecran: "communiquer",
            casque: "communiquer"
          }
        },

        {
          title: "Film en classe",
          statement:
            "Scénario : Le professeur ouvre sa session et lance un film projeté pour la classe.",
          needs: { acquerir: 2, traiter: 1, communiquer: 2 },
          pool: [
            { id:"clavier", name:"Clavier", img:"images/peripheriques/clavier.png" },
            { id:"souris", name:"Souris", img:"images/peripheriques/souris.png" },
            { id:"unite", name:"Unité centrale", img:"images/peripheriques/unite_centrale.png" },
            { id:"video_proj", name:"Vidéoprojecteur", img:"images/peripheriques/videoprojecteur.png" },
            { id:"enceintes", name:"Enceintes", img:"images/peripheriques/enceintes.png" },

            // intrus
            { id:"ecouteurs", name:"Écouteurs", img:"images/peripheriques/ecouteurs.png" },
            { id:"micro", name:"Micro", img:"images/peripheriques/micro.png" }
          ],
          solution: {
            clavier: "acquerir",
            souris: "acquerir",
            unite: "traiter",
            video_proj: "communiquer",
            enceintes: "communiquer"
          }
        },

        {
          title: "Impression de photo",
          statement:
            "Scénario : Tu as pris des photos et tu veux en imprimer une.",
          needs: { acquerir: 2, traiter: 1, communiquer: 2 },
          pool: [
            { id:"app_photo", name:"Appareil photo", img:"images/peripheriques/appareil_photo.png" },
            { id:"souris", name:"Souris", img:"images/peripheriques/souris.png" },
            { id:"unite", name:"Unité centrale", img:"images/peripheriques/unite_centrale.png" },
            { id:"ecran", name:"Écran", img:"images/peripheriques/ecran.png" },
            { id:"impr", name:"Imprimante", img:"images/peripheriques/imprimante.png" },

            // intrus
            { id:"micro", name:"Micro", img:"images/peripheriques/micro.png" },
            { id:"manette", name:"Manette", img:"images/peripheriques/manette.png" }
          ],
          solution: {
            app_photo: "acquerir",
            souris: "acquerir",
            unite: "traiter",
            ecran: "communiquer",
            impr: "communiquer"
          }
        }
      ]
    },

    {
      id: "autres",
      name: "Autres systèmes",
      exercises: [
        {
          title: "Smartphone",
          statement:
            "Scénario : Tu utilises ton smartphone pour envoyer un message vocal. Tu en reçois un également.",
          needs: { acquerir: 3, traiter: 1, communiquer: 3 },
          pool: [
            { id:"micro", name:"Micro", img:"images/peripheriques/micro.png" },
            { id:"tactile", name:"Surface tactile", img:"images/peripheriques/surface_tactile.png" },
            { id:"cpu_smart", name:"Processeur du smartphone", img:"images/peripheriques/processeur_smartphone.png" },
            { id:"ecran", name:"Ecran", img:"images/peripheriques/ecran.png" },
            { id:"hp", name:"Haut-parleur", img:"images/peripheriques/haut_parleur.png" },
            { id:"g5_rx", name:"5G (réception)", img:"images/peripheriques/5g.png" },
            { id:"g5_tx", name:"5G (envoi)", img:"images/peripheriques/5g.png" },

            // intrus
            { id:"camera", name:"Caméra", img:"images/peripheriques/camera.png" },
            { id:"capteur_mouv", name:"Capteur de mouvement", img:"images/peripheriques/detecteur_mouvement.png" }
          ],
          solution: {
            micro: "acquerir",
            tactile: "acquerir",
            g5_rx: "acquerir",
            cpu_smart: "traiter",
            ecran: "communiquer",
            hp: "communiquer",
            g5_tx: "communiquer"
          }
        },

        {
          title: "Couloir du collège",
          statement:
            "Scénario : Dans les couloirs, la lumière s’allume quand quelqu’un passe. Pendant les vacances, si une présence est détectée, le système déclenche une alerte sonore.",
          needs: { acquerir: 1, traiter: 1, communiquer: 2 },
          pool: [
            { id:"capteur_mouv", name:"Capteur de mouvement", img:"images/peripheriques/detecteur_mouvement.png" },
            { id:"unite_cmd", name:"Unité de commande", img:"images/peripheriques/unite_commande.png" },
            { id:"lampes", name:"Lampes", img:"images/peripheriques/lampes.png" },
            { id:"sirene", name:"Sirène", img:"images/peripheriques/sirene.png" },

            // intrus
            { id:"gyrophare", name:"Gyrophare", img:"images/peripheriques/gyrophare.png" },
            { id:"capteur_temp", name:"Capteur de température", img:"images/peripheriques/capteur_temperature.png" }
          ],
          solution: {
            capteur_mouv: "acquerir",
            unite_cmd: "traiter",
            lampes: "communiquer",
            sirene: "communiquer"
          }
        },

        {
          title: "Portail du collège",
          statement:
            "Scénario : À l’entrée du parking, un professeur demande l’ouverture du portail via une télécommande. Le portail vérifie qu’il n’y a pas d’obstacle avant de se fermer et un signal lumineux prévient quand le portail est en mouvement.",
          needs: { acquerir: 2, traiter: 1, communiquer: 2 },
          pool: [
            { id:"telecommande", name:"Télécommande", img:"images/peripheriques/telecommande.png" },
            { id:"unite_cmd", name:"Unité de commande", img:"images/peripheriques/unite_commande.png" },
            { id:"capteur_obst", name:"Capteur d’obstacle", img:"images/peripheriques/capteur_obstacle.png" },
            { id:"moteur_portail", name:"Moteur du portail", img:"images/peripheriques/moteur_portail.png" },
            { id:"gyrophare", name:"Gyrophare", img:"images/peripheriques/gyrophare.png" },

            // intrus
            { id:"lecteur_code", name:"Lecteur code-barres", img:"images/peripheriques/lecteur_codebarres.png" },
            { id:"capteur_temp", name:"Capteur de température", img:"images/peripheriques/capteur_temperature.png" }
          ],
          solution: {
            telecommande: "acquerir",
            capteur_obst: "acquerir",
            unite_cmd: "traiter",
            moteur_portail: "communiquer",
            gyrophare: "communiquer"
          }
        },

        {
          title: "Station météo domestique",
          statement:
            "Scénario : Une station météo mesure la température et l’humidité, puis affiche les résultats.",
          needs: { acquerir: 2, traiter: 1, communiquer: 1 },
          pool: [
            { id:"capteur_temp", name:"Capteur de température", img:"images/peripheriques/capteur_temperature.png" },
            { id:"capteur_hum", name:"Capteur d’humidité", img:"images/peripheriques/capteur_humidite.png" },
            { id:"unite_trait", name:"Unité de traitement", img:"images/peripheriques/unite_traitement.png" },
            { id:"afficheur", name:"Afficheur", img:"images/peripheriques/afficheur.png" },

            // intrus
            { id:"sirene", name:"Sirène", img:"images/peripheriques/sirene.png" },
            { id:"capteur_obst", name:"Capteur d’obstacle", img:"images/peripheriques/capteur_obstacle.png" }
          ],
          solution: {
            capteur_temp: "acquerir",
            capteur_hum: "acquerir",
            unite_trait: "traiter",
            afficheur: "communiquer"
          }
        },

        {
          title: "Caisse automatique",
          statement:
            "Scénario : Tu fais tes courses. Tu scannes tes articles, le montant s’affiche, tu règles avec ta carte, puis tu récupères le ticket.",
          needs: { acquerir: 2, traiter: 1, communiquer: 2 },
          pool: [
            { id:"lecteur_code", name:"Lecteur code-barres", img:"images/peripheriques/lecteur_codebarres.png" },
            { id:"lecteur_cb", name:"Lecteur carte bancaire", img:"images/peripheriques/lecteur_carte.png" },
            { id:"unite_caisse", name:"Unité de caisse", img:"images/peripheriques/unite_caisse.png" },
            { id:"ecran", name:"Ecran", img:"images/peripheriques/ecran.png" },
            { id:"ticket", name:"Imprimante ticket", img:"images/peripheriques/imprimante_ticket.png" },

            // intrus
            { id:"gyrophare", name:"Gyrophare", img:"images/peripheriques/gyrophare.png" },
            { id:"capteur_mouv", name:"Capteur de mouvement", img:"images/peripheriques/detecteur_mouvement.png" }
          ],
          solution: {
            lecteur_code: "acquerir",
            lecteur_cb: "acquerir",
            unite_caisse: "traiter",
            ecran: "communiquer",
            ticket: "communiquer"
          }
        },

        {
          title: "Robot aspirateur",
          statement:
            "Scénario : Tu appuies sur un bouton pour lancer le robot. Il se déplace en évitant les obstacles et de tomber dans les escaliers.",
          needs: { acquerir: 3, traiter: 1, communiquer: 1 },
          pool: [
            { id:"bouton", name:"Bouton", img:"images/peripheriques/bouton.png" },
            { id:"capteur_obst", name:"Capteur d’obstacle", img:"images/peripheriques/capteur_obstacle.png" },
            { id:"capteur_antichute", name:"Capteur anti-chute", img:"images/peripheriques/capteur_antichute.png" },
            { id:"carte_cmd", name:"Carte de commande", img:"images/peripheriques/carte_commande.png" },
            { id:"moteurs", name:"Moteurs", img:"images/peripheriques/moteurs.png" },

            // intrus
            { id:"afficheur", name:"Afficheur", img:"images/peripheriques/afficheur.png" },
            { id:"gyrophare", name:"Gyrophare", img:"images/peripheriques/gyrophare.png" }
          ],
          solution: {
            bouton: "acquerir",
            capteur_obst: "acquerir",
            capteur_antichute: "acquerir",
            carte_cmd: "traiter",
            moteurs: "communiquer"
          }
        },

        {
          title: "Distributeur de boissons",
          statement:
            "Scénario : Tu choisis une boisson, tu règles avec ta carte. Le système fait tourner un mécanisme pour faire tomber la boisson et affiche un message.",
          needs: { acquerir: 2, traiter: 1, communiquer: 2 },
          pool: [
            { id:"boutons", name:"Boutons", img:"images/peripheriques/boutons.png" },
            { id:"lecteur_carte", name:"Lecteur de carte", img:"images/peripheriques/lecteur_carte.png" },
            { id:"unite_cmd", name:"Unité de commande", img:"images/peripheriques/unite_commande.png" },
            { id:"moteur", name:"Moteur", img:"images/peripheriques/moteur.png" },
            { id:"afficheur", name:"Afficheur", img:"images/peripheriques/afficheur.png" },

            // intrus
            { id:"capteur_temp", name:"Capteur de température", img:"images/peripheriques/capteur_temperature.png" },
            { id:"gyrophare", name:"Gyrophare", img:"images/peripheriques/gyrophare.png" }
          ],
          solution: {
            boutons: "acquerir",
            lecteur_carte: "acquerir",
            unite_cmd: "traiter",
            moteur: "communiquer",
            afficheur: "communiquer"
          }
        },

        {
          title: "Interphone maison",
          statement:
            "Scénario : Quelqu’un sonne. Tu vois la personne et tu lui parles. Tu peux aussi déclencher l’ouverture de la porte.",
          needs: { acquerir: 4, traiter: 1, communiquer: 3 },
          pool: [
            { id:"bouton_sonnette", name:"Bouton sonnette", img:"images/peripheriques/bouton_sonnette.png" },
            { id:"camera", name:"Caméra", img:"images/peripheriques/camera.png" },
            { id:"micro", name:"Micro", img:"images/peripheriques/micro.png" },
            { id:"boitier_cmd", name:"Boîtier de commande", img:"images/peripheriques/boitier_commande.png" },
            { id:"ecran", name:"Ecran", img:"images/peripheriques/ecran.png" },
            { id:"hp", name:"Haut-parleur", img:"images/peripheriques/haut_parleur.png" },
            { id:"bouton_ouverture", name:"Bouton ouverture", img:"images/peripheriques/bouton_ouverture.png" },
            { id:"serrure", name:"Serrure électrique", img:"images/peripheriques/serrure_electrique.png" },

            // intrus
            { id:"gyrophare", name:"Gyrophare", img:"images/peripheriques/gyrophare.png" },
            { id:"capteur_temp", name:"Capteur de température", img:"images/peripheriques/capteur_temperature.png" }
          ],
          solution: {
            bouton_sonnette: "acquerir",
            camera: "acquerir",
            micro: "acquerir",
            bouton_ouverture: "acquerir",
            boitier_cmd: "traiter",
            ecran: "communiquer",
            hp: "communiquer",
            serrure: "communiquer"
          }
        }
      ]
    }
  ]
};