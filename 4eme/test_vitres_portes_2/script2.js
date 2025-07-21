  const donneesVerres = {
    "simple_vitrage": {
      titre: "Le simple vitrage",
        epaisseur: "4 mm — épaisseur standard pour les anciens vitrages de fenêtres",
        explication:
          "Le simple vitrage est obtenu en chauffant un mélange de sable, de calcaire et de soude à environ 1500 °C jusqu’à fusion. Il forme une plaque de verre rigide, utilisée seule mais peu efficace pour l’isolation thermique.",
        historique:
          "Longtemps seul type de vitrage utilisé, le simple vitrage équipe les habitations depuis le XIXe siècle. Peu à peu délaissé à partir des années 1970, il reste encore présent dans certains bâtiments anciens ou non chauffés.",
      },
    "verre_feuillete": {
      titre: "Le verre feuilleté",
        epaisseur: "6,8 mm — composée de deux feuilles de 3 mm avec un intercalaire PVB de 0,38 mm",
        explication:
          "Le verre feuilleté est composé de deux vitres collées grâce à un ou plusieurs films plastiques (PVB). L’ensemble est pressé puis chauffé, formant un vitrage de sécurité qui retient les éclats en cas d’impact.",
        historique:
          "Développé au début du XXe siècle, le verre feuilleté a d’abord été utilisé dans les pare-brises d’automobile. Il est ensuite devenu un standard dans les bâtiments publics, banques et vitrines de magasins.",
      },
    "verre_trempe": {
      titre: "Le verre trempé",
        epaisseur: "6 mm — très courant pour les pare-douches, les portes vitrées intérieures et les parois",
        explication:
          "Le verre trempé est un verre chauffé à haute température puis refroidi rapidement. Ce traitement thermique renforce sa solidité et le rend plus sûr car il se brise en petits morceaux non coupants.",
        historique:
          "Le verre trempé est apparu au XXe siècle avec l’essor des technologies de sécurité. D’abord réservé à l’industrie, il est devenu courant dans l’ameublement, les cabines de douche et les espaces publics à partir des années 1960.",
      },
    "double_vitrage": {
      titre: "Le double vitrage",
        epaisseur: "24 mm — souvent utilisée dans les fenêtres de maison, deux vitres de 4 mm séparées par 16 mm de gaz isolant",
        explication:
          "Le double vitrage est constitué de deux vitres séparées par une lame d’air ou de gaz, enfermée dans une structure étanche. Ce système améliore les performances thermiques et acoustiques des fenêtres.",
        historique:
          "Apparu dans les années 1930, le double vitrage s’est répandu à partir des années 1970 grâce aux nouvelles réglementations thermiques. Il est aujourd’hui généralisé dans la construction neuve et les rénovations.",
      },
    "polycarbonate": {
      titre: "Le vitrage polycarbonate",
        epaisseur: "16 mm — très utilisé en toiture de véranda, abris ou verrières",
        explication:
          "Le polycarbonate est un matériau plastique fabriqué à partir de dérivés du pétrole. Il est moulé à chaud en plaques transparentes et rigides, appréciées pour leur légèreté et leur grande résistance aux chocs.",
        historique:
          "Créé dans les années 1950, le polycarbonate s’est d’abord imposé dans l’industrie. Il a ensuite trouvé sa place dans le bâtiment à partir des années 1980, notamment pour les toitures légères, abris ou verrières.",
    }
  };

    const donneesPortes = {
    "pvc": {
      titre: "Porte en PVC",
      epaisseur: "30 mm — épaisseur la plus courante pour ce type de porte",
      explication: "La porte en PVC est fabriquée à partir d’un plastique appelé polychlorure de vinyle. Ce matériau est léger, solide et résiste bien à l’humidité. Il ne rouille pas, ne se déforme pas facilement et ne demande presque aucun entretien. Le PVC peut être coloré ou moulé pour imiter d’autres matériaux, comme le bois.",
      historique: "Les portes en PVC sont apparues dans les années 1970. Elles se sont rapidement répandues dans les maisons grâce à leur prix abordable, leur facilité d’installation et leur bonne tenue dans le temps."
    },
    "bois_standard": {
      titre: "Porte en Bois",
      epaisseur: "40 mm — épaisseur la plus courante pour ce type de porte",
      explication: "Ce type de porte est réalisé en bois massif ou en panneaux collés, à partir d’essences comme le pin ou le sapin. Le bois offre un bon confort thermique et un aspect chaleureux. Ces portes peuvent être peintes ou vernies selon le style recherché. Le bois nécessite un entretien régulier pour bien vieillir.",
      historique: "Le bois est l’un des premiers matériaux utilisés pour fabriquer des portes. Encore aujourd’hui, les portes en bois restent courantes, surtout dans les maisons traditionnelles ou de campagne."
    },
    "bois_renforce": {
      titre: "Porte en bois renforcé",
      epaisseur: "55 mm — épaisseur la plus courante pour ce type de porte",
      explication: "La porte en bois renforcé utilise un bois solide comme le chêne ou un bois composite, associé à des éléments internes plus rigides : plaques métalliques, panneaux multicouches ou structures renforcées. Elle conserve l’apparence du bois naturel, tout en apportant plus de stabilité, de confort et de durabilité.",
      historique: "Ce type de porte est apparu dans les années 1990, pour répondre aux besoins de maisons plus performantes. Elle combine le style traditionnel du bois avec des matériaux modernes à l’intérieur."
    },
    "acier": {
      titre: "Porte en acier",
      epaisseur: "40 mm — épaisseur la plus courante pour ce type de porte",
      explication: "La porte en acier est faite de tôles métalliques pliées puis assemblées. L’acier peut être peint ou recouvert d’un film décoratif. Ce type de porte est souvent utilisé dans les immeubles, caves ou bâtiments anciens, pour sa solidité et sa durabilité.",
      historique: "D’abord utilisée dans l’industrie, la porte en acier a ensuite été adoptée dans les logements collectifs pour des accès secondaires. Sa fabrication simple et sa résistance expliquent sa large utilisation."
    },
    "haute_performance": {
      titre: "Porte haute performance",
      epaisseur: "65 mm — épaisseur la plus courante pour ce type de porte",
      explication: "Cette porte est fabriquée avec plusieurs matériaux : une coque extérieure en fibre de verre, un cœur en mousse rigide et un cadre métallique renforcé (souvent en acier). Elle isole bien, résiste aux chocs et garde sa forme dans le temps. Elle peut avoir différents styles et finitions.",
      historique: "Apparue dans les années 2000, cette porte a été conçue pour répondre aux besoins des maisons neuves : bon confort, solidité et modernité. Elle est de plus en plus utilisée dans les constructions récentes."
    }
  };

 const donneesFamilles = {
    "mineraux": {
      titre: "Les matériaux minéraux",
        explication:
          "Les matériaux minéraux proviennent soit directement de roches naturelles, comme la pierre (granit, ardoise, calcaire), la brique ou le sable, soit sont obtenus par transformation à haute température, comme le verre, la céramique, la terre cuite, le béton ou la laine de roche.",
        historique:
          "Les matériaux minéraux sont parmi les plus anciens utilisés par l’être humain. La pierre taillée, l’argile cuite et le verre apparaissent dès la préhistoire ou l’Antiquité. Aujourd’hui, ces matériaux restent essentiels dans les domaines de la construction, de l’architecture et de l’aménagement.",
      },
    "organiques": {
      titre: "Les matériaux organiques",
        explication:
          "Les matériaux organiques regroupent soit des matériaux naturels d’origine végétale ou animale, comme le bois, le cuir, le carton, le liège, le coton, la laine ou le lin, soit des matériaux synthétiques fabriqués à partir du pétrole, comme le PVC, le polyéthylène, le polypropylène, le polystyrène, le polycarbonate ou le polyuréthane.",
        historique:
          "Les matériaux organiques naturels sont utilisés depuis l’Antiquité dans la fabrication d’objets, d’abris ou de vêtements. À partir du XXe siècle, l’apparition des plastiques a permis de produire des matériaux légers et variés. Aujourd’hui, de nouvelles solutions sont développées pour limiter la pollution et favoriser le recyclage.",
      },
    "metalliques": {
      titre: "Les matériaux métalliques",
        explication:
          "Les matériaux métalliques sont obtenus soit à partir de métaux purs extraits et fondus, comme l’aluminium, le cuivre, le zinc ou le titane, soit sous forme d’alliages créés en associant plusieurs métaux, comme l’acier, la fonte, l’inox ou le laiton.",
        historique:
          "Depuis l’âge du bronze puis du fer, les métaux ont marqué les grandes étapes du progrès humain. Leur emploi s’est généralisé au XIXe siècle avec la révolution industrielle, et ils restent aujourd’hui omniprésents dans les objets techniques, les infrastructures et les systèmes mécaniques.",
      },

    "composites": {
      titre: "Les matériaux composites",
        explication:
          "Les matériaux composites associent plusieurs matériaux différents pour combiner leurs propriétés, soit dans des assemblages techniques comme la fibre de verre, la fibre de carbone ou le Kevlar, soit dans des combinaisons plus courantes comme le béton armé, le contreplaqué, les stratifiés bois-plastique ou les matériaux sandwich. ",
        historique:
          "Des formes simples de composites, comme le torchis ou les briques mêlées à de la paille, existent depuis l’Antiquité. Les composites modernes, développés à partir des années 1950, se sont largement répandus dans les secteurs de l’aéronautique, de l’automobile, du sport ou du bâtiment.",
    }
  };

  function afficherInfosverre(type) {
    const data = donneesVerres[type];
    document.getElementById("titre-verre").textContent = data.titre;
document.getElementById("epaisseur").innerHTML = `<strong>Épaisseur :</strong> <span>${data.epaisseur}</span>`;
    document.getElementById("explication").textContent = data.explication;
    document.getElementById("historique").textContent = data.historique;
    document.getElementById("image-explication").src = `images/vitrage/explication_${type}.jpg`;
    document.getElementById("image-historique").src = `images/vitrage/historique_${type}.jpg`;
  }

  function afficherInfosporte(type) {
    const data = donneesPortes[type];
    document.getElementById("titre-porte").textContent = data.titre;
    document.getElementById("epaisseur").innerHTML = `<strong>Épaisseur :</strong> <span>${data.epaisseur}</span>`;
    document.getElementById("explication").textContent = data.explication;
    document.getElementById("historique").textContent = data.historique;
    document.getElementById("image-explication").src = `images/explication_${type}.jpg`;
    document.getElementById("image-historique").src = `images/historique_${type}.jpg`;
  }
  
  function afficherInfosfamille(type) {
    const data = donneesFamilles[type];
    document.getElementById("titre-familles").textContent = data.titre;
    document.getElementById("explication").textContent = data.explication;
    document.getElementById("historique").textContent = data.historique;
    document.getElementById("image-explication").src = `images/familles/explication_${type}.jpg`;
    document.getElementById("image-historique").src = `images/familles/historique_${type}.jpg`;
  }



function scaleFixe() {
  const cadre = document.getElementById("cadre-fixe");
  const ratioRef = 1920 / 1080;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const ratioEcran = w / h;

  let scale;
  if (ratioEcran > ratioRef) {
    scale = h / 1080;
  } else {
    scale = w / 1920;
  }

  cadre.style.transform = `scale(${scale})`;
}

function centrerCadreFixe() {
  const cadre = document.getElementById("cadre-fixe");
  const largeurEcran = window.innerWidth;
  const hauteurEcran = window.innerHeight;
  const largeurCadre = 1920;
  const hauteurCadre = 1080;

  const scale = Math.min(largeurEcran / largeurCadre, hauteurEcran / hauteurCadre);

  // Appliquer le scale
  cadre.style.transform = `scale(${scale})`;

  // Calcul des marges restantes pour centrer
  const margeHorizontale = (largeurEcran - largeurCadre * scale) / 2;
  const margeVerticale = (hauteurEcran - hauteurCadre * scale) / 2;

  cadre.style.left = `${margeHorizontale}px`;
  cadre.style.top = `${margeVerticale}px`;
}

// Lors du chargement initial (avec un petit délai pour mobile)
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    scaleFixe();
    centrerCadreFixe();
  }, 100);
});

// Lors du redimensionnement de la fenêtre (avec temporisation)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    scaleFixe();
    centrerCadreFixe();
  }, 100);
});

// Lors du changement d'orientation (mobile/tablette)
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    scaleFixe();
    centrerCadreFixe();
  }, 200);
});
