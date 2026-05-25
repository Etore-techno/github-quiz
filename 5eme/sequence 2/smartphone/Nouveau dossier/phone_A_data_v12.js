// Données — Smartphone simulé de Mathis
// Le PIN est calculé automatiquement dans core_v13.js.

window.PROFILES = window.PROFILES || {};
window.PROFILES.A = {
  "label": "Téléphone de Mathis (3e)",
  "pin": "AUTO_3E",
  "security": {
    "pinRule": "birthYearTroisieme",
    "pinDescription": "PIN calculé automatiquement : année de naissance type d’un élève de 3e pour l’année scolaire en cours. Changement automatique le 1er septembre."
  },
  "accountPassword": "Nala",
  "owner": {
    "prenom": "Mathis",
    "nom": "Leroy",
    "pin": "AUTO_3E",
    "accountPassword": "Nala",
    "classe": "3e2",
    "ville": "Saint-Nom-la-Bretèche",
    "villeCollege": "Feucherolles",
    "college": "Collège Jean Monnet",
    "email": "mathis.leroy78@messagerie.fr",
    "telephone": "06 43 82 19 77",
    "adresse": "12 rue de la Fontaine, 78860 Saint-Nom-la-Bretèche"
  },
  "device": {
    "model": "Samsung Galaxy A34",
    "os": "Android 14",
    "storage": "128 Go",
    "battery": "82 %",
    "network": "4G / Wi‑Fi maison"
  },
  "ui": {
    "lockWallpaper": "",
    "homeWallpaper": ""
  },
  "limited": {
    "lockHint": "",
    "notifications": [
      {
        "app": "Messages",
        "title": "Maman",
        "when": "{{today:08:02}}",
        "preview": "Donne à Nala sa gamelle en rentrant 🐾."
      },
      {
        "app": "Réseau+",
        "title": "hugo_sk8 t’a identifié",
        "when": "{{today:07:55}}",
        "preview": "« Lucas l’écureuil, épisode 2 😂 »"
      },
      {
        "app": "Messages",
        "title": "Groupe 3e2",
        "when": "{{today:07:48}}",
        "preview": "Léa : il va encore faire la victime"
      },
      {
        "app": "Mail",
        "title": "Réseau+",
        "when": "{{yesterday:18:44}}",
        "preview": "Nouveau commentaire sur une publication où tu es identifié."
      }
    ],
    "healthCard": {
      "bloodType": "O+",
      "allergies": "Arachide (légère)",
      "treatment": "Ventoline si besoin",
      "conditions": "Asthme léger",
      "patientId": "UR-62-019-784",
      "insuranceIdPartial": "1 86 ** ** ** 123",
      "iceContacts": [
        {
          "label": "ICE 1",
          "name": "Maman (S. Leroy)",
          "phone": "06 12 34 56 78"
        },
        {
          "label": "ICE 2",
          "name": "Papa (T. Leroy)",
          "phone": "06 98 76 54 32"
        }
      ]
    },
    "guestApps": [
      "phone",
      "notifications",
      "health"
    ]
  },
  "full": {
    "about": {},
    "messages": {
      "threads": [
        {
          "title": "Maman",
          "when": "{{today:08:02}}",
          "snippet": "Donne à Nala sa gamelle en rentrant 🐾."
        },
        {
          "title": "Groupe 3e2",
          "when": "{{today:07:51}}",
          "snippet": "Sarah : Supprimez au moins la photo, sérieux."
        },
        {
          "title": "Hugo",
          "when": "{{yesterday:18:34}}",
          "snippet": "Lucas l’écureuil 😂 j’en peux plus"
        },
        {
          "title": "Inès",
          "when": "{{yesterday:21:19}}",
          "snippet": "Même quand il répond pas ils continuent."
        },
        {
          "title": "Clara",
          "when": "{{yesterday:17:18}}",
          "snippet": "C’est Lina sur la vidéo ?"
        },
        {
          "title": "Papa",
          "when": "{{day:-2:19:41}}",
          "snippet": "Le code est 3819. Ne le partage pas."
        },
        {
          "title": "Camille",
          "when": "{{day:-2:18:06}}",
          "snippet": "Pour l’exposé, on met la source de l’image ?"
        },
        {
          "title": "Coach (Foot)",
          "when": "{{day:-2:16:12}}",
          "snippet": "Match samedi, pense à tes crampons."
        },
        {
          "title": "Nina",
          "when": "{{day:-3:20:14}}",
          "snippet": "On voit ton lieu sur le post du skatepark."
        },
        {
          "title": "Louis",
          "when": "{{day:-4:18:47}}",
          "snippet": "Tu m’envoies la musique ?"
        }
      ],
      "conversations": {
        "Maman": [
          {
            "from": "Maman",
            "text": "Tu as ton badge ? 🙂",
            "when": "{{day:-8:07:12}}"
          },
          {
            "from": "Moi",
            "text": "Oui, je l’ai dans le sac.",
            "when": "{{day:-8:07:13}}"
          },
          {
            "from": "Maman",
            "text": "Tu es bien sorti du bus ?",
            "when": "{{today:07:32}}"
          },
          {
            "from": "Moi",
            "text": "Oui, j’arrive au collège.",
            "when": "{{today:07:33}}"
          },
          {
            "from": "Maman",
            "text": "Donne à Nala sa gamelle en rentrant 🐾.",
            "when": "{{today:08:02}}"
          },
          {
            "from": "Moi",
            "text": "Oui t’inquiète.",
            "when": "{{today:08:03}}"
          }
        ],
        "Papa": [
          {
            "from": "Papa",
            "text": "Avant de partir, active l’alarme.",
            "when": "{{day:-2:19:35}}"
          },
          {
            "from": "Moi",
            "text": "Ok.",
            "when": "{{day:-2:19:36}}"
          },
          {
            "from": "Papa",
            "text": "Le code est 3819. Ne le partage pas.",
            "when": "{{day:-2:19:41}}"
          },
          {
            "from": "Moi",
            "text": "Compris.",
            "when": "{{day:-2:19:42}}"
          }
        ],
        "Hugo": [
          {
            "from": "Hugo",
            "text": "T’as vu la photo de Lucas dans l’arbre ? 😂",
            "when": "{{yesterday:18:21}}"
          },
          {
            "from": "Moi",
            "text": "Oui elle tourne partout.",
            "when": "{{yesterday:18:22}}"
          },
          {
            "from": "Hugo",
            "text": "Le gars a fui un chien qui faisait la taille d’un cartable 😭",
            "when": "{{yesterday:18:23}}"
          },
          {
            "from": "Hugo",
            "text": "Lucas l’écureuil, nouveau surnom officiel.",
            "when": "{{yesterday:18:24}}"
          },
          {
            "from": "Moi",
            "text": "Tu l’as mise en story ?",
            "when": "{{yesterday:18:25}}"
          },
          {
            "from": "Hugo",
            "text": "Oui. J’ai mis en privé mais tout le monde capture l’écran.",
            "when": "{{yesterday:18:26}}"
          },
          {
            "from": "Hugo",
            "text": "Demain je remets celle du sac vidé, elle est encore meilleure.",
            "when": "{{yesterday:18:28}}"
          },
          {
            "from": "Moi",
            "text": "Ça commence à faire beaucoup non ?",
            "when": "{{yesterday:18:29}}"
          },
          {
            "from": "Hugo",
            "text": "Oh ça va, il répond jamais, c’est qu’il s’en fiche.",
            "when": "{{yesterday:18:30}}"
          },
          {
            "from": "Hugo",
            "text": "Regarde les commentaires, tout le monde rigole.",
            "when": "{{yesterday:18:34}}"
          }
        ],
        "Inès": [
          {
            "from": "Inès",
            "text": "Ils recommencent avec Lucas…",
            "when": "{{yesterday:21:12}}"
          },
          {
            "from": "Moi",
            "text": "Quoi encore ?",
            "when": "{{yesterday:21:13}}"
          },
          {
            "from": "Inès",
            "text": "Photo de l’arbre + photo de ses affaires. Ils ont fait un montage.",
            "when": "{{yesterday:21:14}}"
          },
          {
            "from": "Moi",
            "text": "Je l’ai vu passer.",
            "when": "{{yesterday:21:15}}"
          },
          {
            "from": "Inès",
            "text": "Même quand il répond pas ils continuent.",
            "when": "{{yesterday:21:16}}"
          },
          {
            "from": "Inès",
            "text": "Sarah a dit d’arrêter mais personne écoute.",
            "when": "{{yesterday:21:17}}"
          },
          {
            "from": "Moi",
            "text": "Je vais pas repartager.",
            "when": "{{yesterday:21:18}}"
          },
          {
            "from": "Inès",
            "text": "Oui mais il faudrait peut-être supprimer ce que tu as en favoris aussi.",
            "when": "{{yesterday:21:19}}"
          }
        ],
        "Groupe 3e2": [
          {
            "from": "Tom",
            "text": "Remettez la photo du sac de Lucas 😂",
            "when": "{{today:07:44}}"
          },
          {
            "from": "Léa",
            "text": "Il va encore faire la victime",
            "when": "{{today:07:45}}"
          },
          {
            "from": "Hugo",
            "text": "Lucas l’écureuil + Lucas le sac-poubelle, quelle journée",
            "when": "{{today:07:46}}"
          },
          {
            "from": "Tom",
            "text": "J’ai mis le sticker “la honte” dessus",
            "when": "{{today:07:46}}"
          },
          {
            "from": "Malo",
            "text": "Il va finir par ranger ses affaires au moins",
            "when": "{{today:07:47}}"
          },
          {
            "from": "Sarah",
            "text": "Vous forcez trop là.",
            "when": "{{today:07:47}}"
          },
          {
            "from": "Hugo",
            "text": "Oh ça va, c’est une blague.",
            "when": "{{today:07:47}}"
          },
          {
            "from": "Léa",
            "text": "Il a qu’à pas réagir comme ça aussi",
            "when": "{{today:07:48}}"
          },
          {
            "from": "Inès",
            "text": "Vous dites ça tous les jours, c’est plus une blague.",
            "when": "{{today:07:48}}"
          },
          {
            "from": "Moi",
            "text": "Envoyez pas dans le groupe de classe entier.",
            "when": "{{today:07:49}}"
          },
          {
            "from": "Tom",
            "text": "Trop tard 😬",
            "when": "{{today:07:50}}"
          },
          {
            "from": "Sarah",
            "text": "Supprimez au moins la photo, sérieux.",
            "when": "{{today:07:51}}"
          }
        ],
        "Clara": [
          {
            "from": "Clara",
            "text": "C’est Lina sur la vidéo ?",
            "when": "{{yesterday:17:13}}"
          },
          {
            "from": "Moi",
            "text": "Oui je crois, avec Noé.",
            "when": "{{yesterday:17:14}}"
          },
          {
            "from": "Clara",
            "text": "Deux filles les filmaient près du parc des sports.",
            "when": "{{yesterday:17:15}}"
          },
          {
            "from": "Moi",
            "text": "Envoie pas partout, ça peut vite partir.",
            "when": "{{yesterday:17:16}}"
          },
          {
            "from": "Clara",
            "text": "Je l’ai juste mise dans le groupe privé.",
            "when": "{{yesterday:17:17}}"
          },
          {
            "from": "Moi",
            "text": "C’est déjà beaucoup.",
            "when": "{{yesterday:17:18}}"
          }
        ],
        "Camille": [
          {
            "from": "Camille",
            "text": "Pour l’exposé, on met la source de l’image ?",
            "when": "{{day:-2:18:02}}"
          },
          {
            "from": "Moi",
            "text": "Je pense oui, sinon on va oublier d’où elle vient.",
            "when": "{{day:-2:18:03}}"
          },
          {
            "from": "Camille",
            "text": "J’en ai trouvé une sur un site, mais je sais pas si on peut la reprendre.",
            "when": "{{day:-2:18:04}}"
          },
          {
            "from": "Moi",
            "text": "Prends plutôt celle où il y a marqué libre de droits, au pire on met le lien.",
            "when": "{{day:-2:18:06}}"
          }
        ],
        "Nina": [
          {
            "from": "Nina",
            "text": "On voit ton lieu sur le post du skatepark.",
            "when": "{{day:-3:20:10}}"
          },
          {
            "from": "Moi",
            "text": "Ah bon ?",
            "when": "{{day:-3:20:11}}"
          },
          {
            "from": "Nina",
            "text": "Oui, il y a le nom du skatepark + l’heure. Même pas besoin de demander où tu es.",
            "when": "{{day:-3:20:12}}"
          },
          {
            "from": "Moi",
            "text": "Je vais regarder les réglages après.",
            "when": "{{day:-3:20:14}}"
          }
        ],
        "Louis": [
          {
            "from": "Louis",
            "text": "Tu m’envoies la musique que t’as téléchargée ?",
            "when": "{{day:-4:18:42}}"
          },
          {
            "from": "Moi",
            "text": "Je sais pas si je peux, je l’ai récupérée vite fait.",
            "when": "{{day:-4:18:43}}"
          },
          {
            "from": "Louis",
            "text": "Sinon envoie juste le lien, ça ira.",
            "when": "{{day:-4:18:47}}"
          }
        ],
        "Coach (Foot)": [
          {
            "from": "Coach",
            "text": "Match samedi, rendez-vous 13h45 au stade.",
            "when": "{{day:-2:16:10}}"
          },
          {
            "from": "Moi",
            "text": "Ok coach.",
            "when": "{{day:-2:16:11}}"
          },
          {
            "from": "Coach",
            "text": "Pense à tes crampons et à ta gourde.",
            "when": "{{day:-2:16:12}}"
          }
        ]
      }
    },
    "social": {
      "appName": "Réseau+",
      "profile": {
        "pseudo": "mathis_g",
        "bio": "foot • skate • Saint‑Nom‑la‑Bretèche",
        "avatar": "skate.jpg",
        "stats": {
          "posts": "42",
          "followers": "193",
          "following": "219"
        },
        "displayName": "Mathis",
        "privacy": "Compte public"
      },
      "feed": [
        {
          "user": "hugo_sk8",
          "date": "{{today:07:56}}",
          "text": "Lucas l’écureuil, épisode 2 🐿️😂",
          "image": "photo_arbre_chien.png",
          "location": "Près du collège",
          "likes": "72",
          "commentsCount": "45",
          "comments": [
            {
              "user": "tom.3e",
              "text": "j’ai jamais vu quelqu’un grimper aussi vite"
            },
            {
              "user": "lea_3e",
              "text": "il a peur de son ombre en fait"
            },
            {
              "user": "malo78",
              "text": "le chien devait faire 3 kg mdr"
            },
            {
              "user": "enzo_foot",
              "text": "nouveau record du collège"
            },
            {
              "user": "mathis_g",
              "text": "c’était vraiment un petit chien ?"
            },
            {
              "user": "hugo_sk8",
              "text": "oui 😂 même mon petit cousin aurait pas eu peur"
            },
            {
              "user": "tom.3e",
              "text": "Lucas l’écureuil ça reste"
            },
            {
              "user": "sarah.78",
              "text": "vous êtes lourds, laissez-le"
            },
            {
              "user": "ines_78",
              "text": "ça fait déjà plusieurs posts sur lui"
            },
            {
              "user": "emma_78",
              "text": "même si on voit pas son visage tout le monde sait que c’est lui"
            },
            {
              "user": "hugo_sk8",
              "text": "détendez-vous c’est pour rire"
            }
          ]
        },
        {
          "user": "tom.3e",
          "date": "{{today:07:44}}",
          "text": "Quelqu’un a retrouvé le sac de Lucas après l’ouragan ?",
          "image": "photo_affaires_sol.png",
          "location": "Vestiaire",
          "likes": "68",
          "commentsCount": "36",
          "comments": [
            {
              "user": "hugo_sk8",
              "text": "Lucas et le rangement, saison 0"
            },
            {
              "user": "lea_3e",
              "text": "la honte devant tout le monde"
            },
            {
              "user": "malo78",
              "text": "ses affaires ont demandé à changer de propriétaire"
            },
            {
              "user": "enzo_foot",
              "text": "le sac a abandonné avant lui"
            },
            {
              "user": "clara_78",
              "text": "qui a mis les papiers par terre ?"
            },
            {
              "user": "tom.3e",
              "text": "on a juste pris la photo"
            },
            {
              "user": "hugo_sk8",
              "text": "la prochaine fois il prendra une valise"
            },
            {
              "user": "mathis_g",
              "text": "ça date de ce matin ?"
            },
            {
              "user": "emma_78",
              "text": "c’est bon arrêtez maintenant"
            },
            {
              "user": "sarah.78",
              "text": "si c’était votre sac vous rigoleriez moins"
            },
            {
              "user": "ines_78",
              "text": "supprimez, sérieux"
            }
          ]
        },
        {
          "user": "mathis_g",
          "date": "{{today:07:38}}",
          "text": "Bus du matin, encore à moitié endormi 😴",
          "image": "bus.jpg",
          "location": "Vers Feucherolles",
          "likes": "22",
          "commentsCount": "7",
          "comments": [
            {
              "user": "sarah.78",
              "text": "courage !"
            },
            {
              "user": "hugo_sk8",
              "text": "j’ai raté le premier bus"
            },
            {
              "user": "lea_3e",
              "text": "on arrive dans 5 min"
            },
            {
              "user": "tom.3e",
              "text": "gardez une place"
            },
            {
              "user": "nina_78",
              "text": "on voit presque ton arrêt sur la photo"
            },
            {
              "user": "mathis_g",
              "text": "ah oui j’avais pas fait attention"
            }
          ]
        },
        {
          "user": "lea_3e",
          "date": "{{yesterday:20:18}}",
          "text": "Compilation de la semaine : arbre, sac, couloir… Lucas nous régale 😭",
          "image": "photo_couloir_filme.png",
          "likes": "53",
          "commentsCount": "33",
          "comments": [
            {
              "user": "tom.3e",
              "text": "il est devenu un meme"
            },
            {
              "user": "hugo_sk8",
              "text": "attends demain y’a la suite"
            },
            {
              "user": "malo78",
              "text": "à chaque fois il fait une tête de paniqué"
            },
            {
              "user": "mathis_g",
              "text": "vous avez encore filmé ?"
            },
            {
              "user": "lea_3e",
              "text": "on voit même pas son visage"
            },
            {
              "user": "ines_78",
              "text": "vous voyez pas que ça le met mal ?"
            },
            {
              "user": "sarah.78",
              "text": "supprimez, franchement"
            },
            {
              "user": "emma_78",
              "text": "même sans visage tout le monde sait que c’est lui"
            },
            {
              "user": "hugo_sk8",
              "text": "il avait qu’à pas partir en courant"
            }
          ]
        },
        {
          "user": "mathis_g",
          "date": "{{yesterday:18:24}}",
          "text": "Nala veut sortir même quand il pleut 🐾",
          "image": "chien_Nala.jpg",
          "likes": "18",
          "commentsCount": "5",
          "comments": [
            {
              "user": "ines_78",
              "text": "elle est trop mignonne"
            },
            {
              "user": "clara_78",
              "text": "je veux le même chien"
            },
            {
              "user": "hugo_sk8",
              "text": "c’est le chien qui a fait grimper Lucas ?"
            },
            {
              "user": "sarah.78",
              "text": "Hugo stop sérieux"
            },
            {
              "user": "mathis_g",
              "text": "c’est pas le même chien"
            }
          ]
        },
        {
          "user": "clara_78",
          "date": "{{yesterday:17:12}}",
          "text": "Lina et Noé repérés près du parc des sports 👀",
          "image": "photo_couple_filme_parc_sports.png",
          "location": "Chemin du Parc des sports, Feucherolles",
          "likes": "39",
          "commentsCount": "18",
          "comments": [
            {
              "user": "lea_3e",
              "text": "c’est son nouveau mec ?"
            },
            {
              "user": "tom.3e",
              "text": "envoie la vidéo"
            },
            {
              "user": "hugo_sk8",
              "text": "Noé il avait dit qu’il venait juste pour le foot 😂"
            },
            {
              "user": "malo78",
              "text": "Lina va nier demain"
            },
            {
              "user": "nina_78",
              "text": "vous les avez filmés sans demander ?"
            },
            {
              "user": "ines_78",
              "text": "ça se fait pas de filmer les gens comme ça"
            },
            {
              "user": "sarah.78",
              "text": "laissez Lina tranquille"
            },
            {
              "user": "clara_78",
              "text": "j’ai rien mis de méchant"
            },
            {
              "user": "emma_78",
              "text": "mais tout le monde va commenter maintenant"
            }
          ]
        },
        {
          "user": "mathis_g",
          "date": "{{day:-2:18:04}}",
          "text": "Match compliqué mais victoire quand même ⚽",
          "image": "foot.jpg",
          "location": "Stade",
          "likes": "45",
          "commentsCount": "10",
          "comments": [
            {
              "user": "coach78",
              "text": "beau match, continue comme ça"
            },
            {
              "user": "hugo_sk8",
              "text": "le but était propre"
            },
            {
              "user": "tom.3e",
              "text": "même Lucas aurait pas couru aussi vite que toi 😂"
            },
            {
              "user": "sarah.78",
              "text": "bravo !"
            },
            {
              "user": "malo78",
              "text": "prochain match je viens"
            },
            {
              "user": "ines_78",
              "text": "bien joué"
            }
          ]
        },
        {
          "user": "mathis_g",
          "date": "{{day:-3:14:06}}",
          "text": "Skatepark à 14h, comme prévu.",
          "image": "skate.jpg",
          "location": "Skatepark Saint‑Nom-la-Bretèche",
          "likes": "27",
          "commentsCount": "7",
          "comments": [
            {
              "user": "hugo_sk8",
              "text": "j’arrive"
            },
            {
              "user": "tom.3e",
              "text": "Lucas vient ou il grimpe dans un arbre ?"
            },
            {
              "user": "ines_78",
              "text": "arrête avec ça"
            },
            {
              "user": "nina_78",
              "text": "t’as laissé le lieu visible"
            },
            {
              "user": "mathis_g",
              "text": "on se retrouve près de l’entrée"
            }
          ]
        },
        {
          "user": "mathis_g",
          "date": "{{day:-9:16:25}}",
          "text": "Bonne équipe cette saison 💪",
          "image": "equipe.jpg",
          "location": "Club",
          "likes": "34",
          "commentsCount": "4",
          "comments": [
            {
              "user": "enzo_foot",
              "text": "on gagne samedi"
            },
            {
              "user": "coach78",
              "text": "bel esprit d’équipe"
            },
            {
              "user": "tom.3e",
              "text": "photo propre"
            },
            {
              "user": "clara_78",
              "text": "bravo"
            }
          ]
        },
        {
          "user": "mathis_g",
          "date": "{{day:-60:18:30}}",
          "text": "Vacances au ski ❄️",
          "image": "ski.jpg",
          "likes": "31",
          "commentsCount": "4",
          "comments": [
            {
              "user": "tom.3e",
              "text": "trop bien"
            },
            {
              "user": "clara_78",
              "text": "la chance"
            },
            {
              "user": "hugo_sk8",
              "text": "ramène une photo dossier"
            }
          ]
        }
      ]
    },
    "browser": {
      "suggestions": [
        "Chemin du Parc des sports Feucherolles",
        "skatepark Saint-Nom-la-Bretèche",
        "résultat match foot dimanche",
        "mettre compte Réseau+ privé",
        "mot de passe messagerie oublié"
      ],
      "history": [
        "Chemin du Parc des sports Feucherolles",
        "skatepark Saint-Nom-la-Bretèche horaires",
        "résultat match foot dimanche",
        "site images libres de droits exposé",
        "replay PSG hier soir",
        "mettre un compte en privé",
        "masquer notifications écran verrouillé"
      ]
    },
    "mailLogin": {
      "address": "mathis.leroy78@messagerie.fr",
      "password": "M@this-foot17",
      "inbox": [
        {
          "from": "Réseau+",
          "when": "{{today:08:01}}",
          "subject": "Nouveaux commentaires",
          "snippet": "hugo_sk8 et 6 autres personnes ont commenté une publication où tu es identifié.",
          "body": "Bonjour Mathis,\n\nPlusieurs nouveaux commentaires ont été ajoutés sur une publication où tu es identifié.\n\nPublication : « Lucas l’écureuil, épisode 2 »\nDerniers commentaires : tom.3e, lea_3e, sarah.78.\n\nTu peux gérer les identifications dans les paramètres de ton compte."
        },
        {
          "from": "Foot Club",
          "when": "{{yesterday:19:34}}",
          "subject": "Match de samedi",
          "snippet": "Rendez-vous à 13h45 au stade. Pense à tes crampons.",
          "body": "Salut Mathis,\n\nRappel pour le match de samedi : rendez-vous à 13h45 au stade.\n\nÀ prévoir : crampons, protège-tibias, gourde et maillot.\n\nLe coach."
        },
        {
          "from": "Maman",
          "when": "{{yesterday:18:05}}",
          "subject": "Vacances",
          "snippet": "J’ai envoyé les dates à papa. Regarde si ça tombe bien avec ton match.",
          "body": "Coucou,\n\nJ’ai envoyé les dates des vacances à papa. Vérifie seulement si tu as un match ou un entraînement important sur cette période.\n\nBisous."
        },
        {
          "from": "Réseau+",
          "when": "{{yesterday:17:18}}",
          "subject": "Nouvelle connexion",
          "snippet": "Une connexion à votre compte a été détectée sur un nouvel appareil.",
          "body": "Une connexion à votre compte Réseau+ a été détectée hier à 17:17.\n\nAppareil : navigateur mobile\nLieu approximatif : Feucherolles\n\nSi c’était vous, aucune action n’est nécessaire."
        },
        {
          "from": "Boutique Foot78",
          "when": "{{day:-2:11:23}}",
          "subject": "Votre commande est en préparation",
          "snippet": "Votre maillot et vos chaussettes de foot sont en cours de préparation.",
          "body": "Bonjour Mathis,\n\nVotre commande est en préparation.\n\nArticles : maillot entraînement, chaussettes de foot.\nLivraison prévue : prochainement à votre adresse enregistrée.\n\nMerci pour votre achat."
        },
        {
          "from": "Messagerie",
          "when": "{{day:-3:09:16}}",
          "subject": "Vérification de sécurité",
          "snippet": "Votre compte a été utilisé sur un téléphone Android.",
          "body": "Bonjour,\n\nVotre compte mathis.leroy78@messagerie.fr a été utilisé sur un téléphone Android.\n\nSi vous reconnaissez cette activité, aucune action n’est nécessaire.\nSinon, modifiez votre mot de passe."
        },
        {
          "from": "Service Streaming",
          "when": "{{day:-4:12:10}}",
          "subject": "Connexion détectée",
          "snippet": "Une connexion a été détectée sur un nouvel appareil.",
          "body": "Bonjour,\n\nUne connexion a été détectée sur un nouvel appareil.\n\nAppareil : Téléphone Android\nHeure : 12:08\n\nSi vous ne reconnaissez pas cette activité, changez votre mot de passe."
        },
        {
          "from": "Camille",
          "when": "{{day:-5:18:31}}",
          "subject": "Image pour l’exposé",
          "snippet": "Je t’ai envoyé le lien de l’image qu’on peut utiliser.",
          "body": "Salut,\n\nJe t’ai envoyé le lien de l’image pour l’exposé. Sur le site, il est écrit qu’on peut la réutiliser avec la source.\n\nOn mettra le lien à la fin du diapo.\n\nCamille"
        }
      ]
    },
    "maps": {
      "mapImage": "",
      "recentPlaces": [
        {
          "name": "Collège Jean Monnet",
          "when": "{{today:07:30}}",
          "address": "1 place de l’Europe, 78810 Feucherolles",
          "lat": 48.8667158,
          "lng": 1.9792565,
          "zoom": 16
        },
        {
          "name": "Maison",
          "when": "{{today:07:10}}",
          "address": "12 rue de la Fontaine, 78860 Saint-Nom-la-Bretèche",
          "lat": 48.866667,
          "lng": 2.033333,
          "zoom": 15
        },
        {
          "name": "Chemin du Parc des sports",
          "when": "{{yesterday:17:05}}",
          "address": "Chemin du Parc des sports, 78810 Feucherolles",
          "lat": 48.8659,
          "lng": 1.9786,
          "zoom": 17
        },
        {
          "name": "Skatepark",
          "when": "{{day:-3:13:50}}",
          "address": "3 place Henri Hamel, 78860 Saint-Nom-la-Bretèche",
          "lat": 48.863333,
          "lng": 2.018096,
          "zoom": 17
        },
        {
          "name": "Stade / foot",
          "when": "{{day:-2:13:45}}",
          "address": "Stade municipal, secteur Saint-Nom-la-Bretèche",
          "lat": 48.855762,
          "lng": 2.021391,
          "zoom": 17
        }
      ],
      "defaultPlace": "Collège Jean Monnet"
    },
    "downloads": [
      {
        "name": "lucas_arbre_story.png",
        "note": "Enregistré depuis une story Réseau+.",
        "image": "photo_arbre_chien.png",
        "date": "{{yesterday:18:31}}",
        "source": "Réseau+"
      },
      {
        "name": "sac_lucas_vestiaire.png",
        "note": "Image reçue dans le groupe 3e2.",
        "image": "photo_affaires_sol.png",
        "date": "{{today:07:44}}",
        "source": "Messages"
      },
      {
        "name": "couloir_capture.png",
        "note": "Capture reçue dans une discussion.",
        "image": "photo_couloir_filme.png",
        "date": "{{yesterday:20:18}}",
        "source": "Messages"
      },
      {
        "name": "parc_sports_video.mp4",
        "note": "Miniature d’une vidéo envoyée par Clara.",
        "image": "photo_couple_filme_parc_sports.png",
        "date": "{{yesterday:17:14}}",
        "source": "Réseau+"
      },
      {
        "name": "planning_vacances.pdf",
        "note": "Dates de vacances de la famille."
      },
      {
        "name": "image_expose_source.txt",
        "note": "Lien gardé pour l’exposé avec Camille."
      },
      {
        "name": "musique.mp3",
        "note": "Fichier audio téléchargé."
      }
    ],
    "photos": [
      {
        "img": "photo_arbre_chien.png",
        "label": "Lucas arbre",
        "meta": "{{yesterday:18:30}}",
        "place": "Parc près du collège"
      },
      {
        "img": "photo_affaires_sol.png",
        "label": "Sac Lucas",
        "meta": "{{today:07:43}}",
        "place": "Vestiaire"
      },
      {
        "img": "photo_couloir_filme.png",
        "label": "Capture couloir",
        "meta": "{{yesterday:20:18}}",
        "place": "Collège"
      },
      {
        "img": "photo_couple_filme_parc_sports.png",
        "label": "Lina et Noé",
        "meta": "{{yesterday:17:12}}",
        "place": "Chemin du Parc des sports"
      },
      {
        "img": "bus.jpg",
        "label": "Bus du matin",
        "meta": "{{today:07:38}}",
        "place": "Trajet vers Feucherolles"
      },
      {
        "img": "chien_Nala.jpg",
        "label": "Nala 🐾",
        "meta": "{{yesterday:18:24}}",
        "place": "Maison"
      },
      {
        "img": "foot.jpg",
        "label": "Match de foot",
        "meta": "{{day:-2:15:10}}",
        "place": "Stade"
      },
      {
        "img": "skate.jpg",
        "label": "Skatepark",
        "meta": "{{day:-3:14:03}}",
        "place": "Saint‑Nom-la-Bretèche"
      },
      {
        "img": "equipe.jpg",
        "label": "Photo d’équipe",
        "meta": "{{day:-9:16:25}}",
        "place": "Club"
      },
      {
        "img": "ski.jpg",
        "label": "Vacances au ski",
        "meta": "{{day:-60:18:30}}",
        "place": "Album famille"
      },
      {
        "img": "amis.jpg",
        "label": "Photo avec des amis",
        "meta": "{{day:-12:17:50}}",
        "place": "Galerie"
      }
    ],
    "notes": [
      {
        "title": "Wi‑Fi",
        "body": "Maison : Livebox-LEROY\nChez Hugo : SNLB_Fibre_5G\nGrand-mère : Orange_7A42"
      },
      {
        "title": "Boîte mail",
        "body": "Mdp : M@this-foot17"
      },
      {
        "title": "Alarme maison",
        "body": "Code : 3819\nActiver en partant / désactiver en rentrant."
      },
      {
        "title": "Vacances",
        "body": "Départ vacances d’hiver : dimanche matin\nRetour : le dimanche suivant\nValises à préparer la veille."
      },
      {
        "title": "RDV semaine",
        "body": "Mercredi — 16h30 : entraînement foot\nSamedi — 14h : skatepark"
      },
      {
        "title": "Exposé",
        "body": "Voir avec Camille pour les images.\nPenser à garder le lien de la source."
      }
    ],
    "bank": {
      "balance": "42,15 €",
      "ops": [
        {
          "when": "Hier",
          "label": "Boulangerie Saint‑Nom",
          "amount": "-3,20 €"
        },
        {
          "when": "Mar.",
          "label": "Transport / bus",
          "amount": "-2,10 €"
        },
        {
          "when": "Lun.",
          "label": "Virement parents",
          "amount": "+15,00 €"
        }
      ]
    },
    "settings": {
      "accounts": [
        {
          "label": "Compte Google",
          "value": "mathis.leroy78@messagerie.fr"
        },
        {
          "label": "Compte Réseau+",
          "value": "@mathis_g"
        }
      ],
      "toggles": [
        {
          "label": "Notifications sur écran verrouillé",
          "sub": "Contenu masqué",
          "on": false
        },
        {
          "label": "Masquer le contenu sensible",
          "sub": "Activé pour l’écran verrouillé",
          "on": true
        },
        {
          "label": "Localisation",
          "sub": "Autorisée pour Plans, Photos et Réseau+",
          "on": true
        },
        {
          "label": "Réseau+ peut utiliser la position",
          "sub": "Lieu ajouté à certaines publications",
          "on": true
        },
        {
          "label": "Compte Réseau+ privé",
          "sub": "Désactivé",
          "on": false
        },
        {
          "label": "Double authentification",
          "sub": "Compte mail",
          "on": false
        },
        {
          "label": "Déverrouillage biométrique",
          "sub": "Empreinte / reconnaissance faciale",
          "on": false
        }
      ]
    }
  }
};
