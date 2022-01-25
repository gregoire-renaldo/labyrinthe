var IA = {
    startIA : function(){
        this.deplacerPlayer();
        deplacement();
        setTimeout(function(){
            IA.startIA();
        }, 300);
    },

    deplacerPlayer: function(){
        var possibilites = this.getPossibilite();
        positionPlayer = this.getBestPossibilite(possibilites);
    },

    getPossibilite : function(){
        var possibilites = [];
        if(getCellule(positionPlayer[0],positionPlayer[1]).left){
            possibilites.push([positionPlayer[0],positionPlayer[1]-1]);
        }
        if(getCellule(positionPlayer[0],positionPlayer[1]).right){
            possibilites.push([positionPlayer[0],positionPlayer[1]+1]);
        }
        if(getCellule(positionPlayer[0],positionPlayer[1]).top){
            possibilites.push([positionPlayer[0]-1,positionPlayer[1]]);
        }
        if(getCellule(positionPlayer[0],positionPlayer[1]).bot){
            possibilites.push([positionPlayer[0]+1,positionPlayer[1]]);
        }
        return possibilites;
    },

    getBestPossibilite: function(possibilites){
        var randomPossibilite = Math.floor(Math.random() * possibilites.length);
        var posToPlay = possibilites[randomPossibilite];
        return posToPlay;
    }
}
