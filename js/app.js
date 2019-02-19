import {initGame,draw} from "./modules/draw.js";

// Récupère l'élément canvas
export let zoneJeu = document.getElementById('playZone')


let nbrVie = 3
//Définit le canvas en 2D
export let canvasJeu = zoneJeu.getContext('2d')

/**
 * Initialise le jeu et réactualise le canvas toutes les 10 ms
 */
initGame()
setInterval(draw,10)

//console.log(`Longueur de la zone de jeu : ${zoneJeu.width}px`)
//console.log(`Hauteur de la zone de jeu : ${zoneJeu.height}px`)