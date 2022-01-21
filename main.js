let nbLigne = 4;
let nbColonne = 4;

let positionPlayer = [0, 0];

const monJeu = document.querySelector("#jeu");

let ligne1 = [5, 10, 1, 7];
let ligne2 = [5, 14, 5, 5];
let ligne3 = [4, 1, 8, 5];
let ligne4 = [14, 9, 12, 9];
let tabJeu = [ligne1, ligne2, ligne3, ligne4];

afficherLabyrinthe(tabJeu);

function afficherLabyrinthe(tabJeu) {
  monJeu.innerHTML = "";
  let content = "<table>";
  for (let i = 0; i < tabJeu.length; i++) {
    content += "<tr>";
    for (let j = 0; j < tabJeu[i].length; j++) {
      content += "<td>";
      content += "<img src='images/" + tabJeu[i][j] + ".png' />";
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

addEventListener("keyup", function (event) {
  let lignePlayer = positionPlayer[0];
  let colonnePlayer = positionPlayer[1];
  if (event.keyCode === 37) { // lefet
    colonnePlayer--;
  }
  if (event.keyCode === 38) {
    lignePlayer--;
  }
  if (event.keyCode === 39) {
    colonnePlayer++;
  }
  if (event.keyCode === 40) {
    lignePlayer++;
  }
  positionPlayer = [lignePlayer, colonnePlayer];
  afficherLabyrinthe(tabJeu)
});
