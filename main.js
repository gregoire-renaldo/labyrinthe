const monJeu = document.querySelector("#jeu");
const alert = document.querySelector(".alert");
var sizeImage = 150;

var nbLigne = 4;
var nbColonne = 4;

var positionPlayer = [0,0];
var niveauEnCours = 0;

var tabJeu = null;

lancerNiveauSuivant();
IA.startIA();

function creaCel(image){
    var cellule = {
        image : image,
        left : getLeft(image),
        top : getTop(image),
        right : getRight(image),
        bot : getBot(image)
    }
    return cellule;
}

function getLeft(image){
    if(image === 0 || image === 1 || image === 2 || image === 3 || image === 6 || image === 7 || image === 8 || image === 12) return true;
    return false;
}
function getTop(image){
    if(image === 0 || image === 2 || image === 3 || image === 4 || image === 5 || image === 8 || image === 9 || image === 14) return true;
    return false;
}
function getRight(image){
    if(image === 0 || image === 1 || image === 3 || image === 4 || image === 6 || image === 9 || image === 10 || image === 13) return true;
    return false;
}
function getBot(image){
    if(image === 0 || image === 1 || image === 2 || image === 4 || image === 5 || image === 7 || image === 10 || image === 11) return true;
    return false;
}

function afficherLabyrinthe(tabJeu){
    monJeu.innerHTML = "";
    var content ="<table>";
    for (var i = 0 ; i < tabJeu.length;i++){
        content += "<tr>";
        for (var j = 0 ; j < tabJeu[i].length;j++){
            content += "<td>";
                content += "<img src='images/"+tabJeu[i][j].image+".png' style='width:"+sizeImage+"px;height:"+sizeImage+"px;' />";
                if(i === nbLigne -1 && j === nbColonne -1){
                    var pandaLigne = sizeImage/4 + sizeImage * i;
                    var pandaColonne = sizeImage/4 + sizeImage * j;
                    content += "<img src='images/panda.png' style='width:"+(sizeImage/2)+"px;height:"+(sizeImage/2)+"px;position:absolute;left:"+pandaColonne+"px;top:"+pandaLigne+"px'/>";
                }
                if(i === positionPlayer[0] && j === positionPlayer[1]){
                    var oursLigne = sizeImage/4 + sizeImage * positionPlayer[0];
                    var oursColonne = sizeImage/4 + sizeImage * positionPlayer[1];
                    content += "<img src='images/bear.png' style='width:"+(sizeImage/2)+"px;height:"+(sizeImage/2)+"px;position:absolute;left:"+oursColonne+"px;top:"+oursLigne+"px'/>";
                }
            content += "</td>";
        }
        content += "</tr>";
    }
    content +="</table>";
    monJeu.innerHTML = content;
}

function getCellule(i,j){
    return tabJeu[i][j];
}

// addEventListener("keyup",function(event){
//     var lignePlayer = positionPlayer[0];
//     var colonnePlayer = positionPlayer[1];
//     if(event.keyCode === 37 && colonnePlayer>0){//gauche
//         if(getCellule(positionPlayer[0],positionPlayer[1]).left){
//             colonnePlayer--;
//         }
//     }
//     if(event.keyCode === 38 && lignePlayer > 0){ // haut
//         if(getCellule(positionPlayer[0],positionPlayer[1]).top){
//             lignePlayer--;
//         }
//     }
//     if(event.keyCode === 39 && colonnePlayer < nbColonne - 1){ // droite
//         if(getCellule(positionPlayer[0],positionPlayer[1]).right){
//             colonnePlayer++;
//         }
//     }
//     if(event.keyCode === 40 && lignePlayer < nbLigne - 1){ // bas
//         if(getCellule(positionPlayer[0],positionPlayer[1]).bot){
//             lignePlayer++;
//         }
//     }
//     positionPlayer = [lignePlayer,colonnePlayer];
//     deplacement();
// });

function deplacement(){
    afficherLabyrinthe(tabJeu);
    verificationFinJeu();
}

function verificationFinJeu(){
    if(positionPlayer[0] === nbLigne-1 && positionPlayer[1] === nbColonne-1){
        var content = "";
        if(niveauEnCours < levels.nbNiveau){
            content += "<p>Bien joué ! Passer au niveau : " + (niveauEnCours+1) + " ?</p>";
            content += "<button class='btn btn-primary' onClick='lancerNiveauSuivant()'> Suivant </button>";
        } else {
            content += "Vous avez gagné ! ";
        }

        alert.innerHTML = content;
        alert.classList.remove("d-none");
    }
}

function lancerNiveauSuivant(){
    niveauEnCours++;
    alert.classList.add("d-none");
    nbLigne = levels["level"+niveauEnCours].nbLigne;
    nbColonne = levels["level"+niveauEnCours].nbColonne;
    positionPlayer = [0,0];
    tabJeu = loadLevel();

    afficherLabyrinthe(tabJeu);
}

function loadLevel(){
    var tab = [];

    for(var i = 1 ; i <= levels["level"+niveauEnCours].nbLigne;i++){
        var ligne=[];
        for(var j = 1 ; j <= levels["level"+niveauEnCours].nbColonne; j++){
            var val = levels["level"+niveauEnCours]["ligne"+i]["case"+j];
            ligne.push(creaCel(val));
        }
        tab.push(ligne);
    }
    return tab;
}
