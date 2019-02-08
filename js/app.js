import {draw} from "./modules/draw.js";

// Récupère l'élément canvas
export let zoneJeu = document.getElementById('playZone')

export let zoneWidth = zoneJeu.width

let nbrVie = 3
//Définit le canvas en 2D
export let canvasJeu = zoneJeu.getContext('2d')

/**
 * Réactualise le canvas toutes les 10 ms
 */

setInterval(draw,10)

//console.log(`Longueur de la zone de jeu : ${zoneJeu.width}px`)
//console.log(`Hauteur de la zone de jeu : ${zoneJeu.height}px`)