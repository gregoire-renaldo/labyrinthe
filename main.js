let nbLigne = 4;
let nbColonne = 4;

let positionPlayer = [0, 0];

const monJeu = document.querySelector("#jeu");
const alert = document.querySelector(".alert");

let niveauEnCours = 0;

var tabJeu = null;
lancerNiveauSuivant();

function creaCel(image) {
  let cellule = {
    image: image,
    left: getLeft(image),
    top: getTop(image),
    right: getRight(image),
    bot: getBot(image),
  };
  return cellule;
}

function getLeft(image) {
  if (
    image === 0 ||
    image === 1 ||
    image === 2 ||
    image === 3 ||
    image === 6 ||
    image === 7 ||
    image === 8 ||
    image === 12
  )
    return true;
  return false;
}
function getTop(image) {
  if (
    image === 0 ||
    image === 2 ||
    image === 3 ||
    image === 4 ||
    image === 5 ||
    image === 8 ||
    image === 9 ||
    image === 14
  )
    return true;
  return false;
}
function getRight(image) {
  if (
    image === 0 ||
    image === 1 ||
    image === 3 ||
    image === 4 ||
    image === 6 ||
    image === 9 ||
    image === 10 ||
    image === 13
  )
    return true;
  return false;
}
function getBot(image) {
  if (
    image === 0 ||
    image === 1 ||
    image === 2 ||
    image === 4 ||
    image === 5 ||
    image === 7 ||
    image === 10 ||
    image === 11
  )
    return true;
  return false;
}

function afficherLabyrinthe(tabJeu) {
  monJeu.innerHTML = "";
  let content = "<table>";
  for (let i = 0; i < tabJeu.length; i++) {
    content += "<tr>";
    for (let j = 0; j < tabJeu[i].length; j++) {
      content += "<td>";
      content += "<img src='images/" + tabJeu[i][j].image + ".png' />";
      if (i === nbLigne - 1 && j === nbColonne - 1) {
        let pandaLigne = 25 + 100 * i;
        let pandaColonne = 25 + 100 * j;
        content +=
          "<img src='images/panda.png' style='width:50px;height:50px;position:absolute;left:" +
          pandaColonne +
          "px;top:" +
          pandaLigne +
          "px'/>";
      }
      if (i === positionPlayer[0] && j === positionPlayer[1]) {
        let oursLigne = 25 + 100 * positionPlayer[0];
        let oursColonne = 25 + 100 * positionPlayer[1];
        content +=
          "<img src='images/bear.png' style='width:50px;height:50px;position:absolute;left:" +
          oursColonne +
          "px;top:" +
          oursLigne +
          "px'/>";
      }
      content += "</td>";
    }
    content += "</tr>";
  }
  content += "</table>";
  monJeu.innerHTML = content;
}

function getCellule(i, j) {
  return tabJeu[i][j];
}

addEventListener("keyup", function (event) {
  let lignePlayer = positionPlayer[0];
  let colonnePlayer = positionPlayer[1];
  if (event.keyCode === 37 && colonnePlayer > 0) {
    //gauche
    if (getCellule(positionPlayer[0], positionPlayer[1]).left) {
      colonnePlayer--;
    }
  }
  if (event.keyCode === 38 && lignePlayer > 0) {
    // haut
    if (getCellule(positionPlayer[0], positionPlayer[1]).top) {
      lignePlayer--;
    }
  }
  if (event.keyCode === 39 && colonnePlayer < nbColonne - 1) {
    // droite
    if (getCellule(positionPlayer[0], positionPlayer[1]).right) {
      colonnePlayer++;
    }
  }
  if (event.keyCode === 40 && lignePlayer < nbLigne - 1) {
    // bas
    if (getCellule(positionPlayer[0], positionPlayer[1]).bot) {
      lignePlayer++;
    }
  }
  positionPlayer = [lignePlayer, colonnePlayer];
  afficherLabyrinthe(tabJeu);
  verificationFinJeu();
});

function verificationFinJeu() {
  if (
    positionPlayer[0] === nbLigne - 1 &&
    positionPlayer[1] === nbColonne - 1
  ) {
    let content = "";
    if (niveauEnCours < 1) {
      content +=
        "<p>Bien Joué ! Passer au nveau : " + (niveauEnCours + 1) + " ?</p>";
    } else {
      content += "vous avez gagné";
    }
    content +=
      "<button class='tn btn-primary' onClick='lancerNiveauSuivant()'> Suivant</button>";
    alert.innerHTML = content;
    alert.classList.remove("d-none");
  }
}

function lancerNiveauSuivant() {
  niveauEnCours++;
  alert.classList.add("d-none");
   nbLigne = 4;
   nbColonne = 4;
   positionPlayer = [0, 0];
   tabJeu = loadLevel()

  afficherLabyrinthe(tabJeu);
}

function loadLevel() {
  let ligne1 = [creaCel(5), creaCel(10), creaCel(1), creaCel(7)];
  let ligne2 = [creaCel(5), creaCel(14), creaCel(5), creaCel(5)];
  let ligne3 = [creaCel(4), creaCel(1), creaCel(8), creaCel(5)];
  let ligne4 = [creaCel(14), creaCel(9), creaCel(12), creaCel(9)];
  let tab = [ligne1, ligne2, ligne3, ligne4];
  return tab;
}
