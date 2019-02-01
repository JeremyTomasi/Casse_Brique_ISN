import {drawBrique,draw} from "./modules/draw.js";

// Récupère l'élément canvas
let zoneJeu = document.getElementById('playZone')

let nbrVie = 3
//Définit le canvas en 2D
export let canvasJeu = zoneJeu.getContext('2d')

/**
 * Permet d'actualiser la position de la balle et de la barre sans effacer les briques
 */
setInterval(function(){
    canvasJeu.clearRect(0,zoneJeu.height - 53,zoneJeu.width,zoneJeu.height)
    draw()
},10)

console.log(zoneJeu.height)

// Hauteur initiale des briques dans le canvas
export let y = 3

for(let i = 0; i < 5; i++){
	if(i == 0){
		drawBrique("red")
	} else if (i == 1){
		drawBrique("blue")
	} else if (i == 2){
		drawBrique("yellow")
	} else if (i == 3){
		drawBrique("pink")
	} else {
		drawBrique("purple")
	}
	y = y + 10
}

draw()