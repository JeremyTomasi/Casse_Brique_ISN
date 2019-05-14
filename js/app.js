import {initGame,draw} from "./modules/draw.js";
import {liste,changeMenu} from "./modules/buttons.js";

for(let i = 0; i < liste.length; i++){
    changeMenu(i)
}


let son = new Audio("../sounds/Musique_ISN.mp3")
son.loop = true
son.play()
/**
 * Initialise le jeu et réactualise le canvas toutes les 10 ms
 */
initGame()
setInterval(draw,10)
