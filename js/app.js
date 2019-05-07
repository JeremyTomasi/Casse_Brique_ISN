import {initGame,draw} from "./modules/draw.js";
import {liste,changeMenu} from "./modules/buttons.js";

for(let i = 0; i < liste.length; i++){
    changeMenu(i)
}

/**
 * Initialise le jeu et réactualise le canvas toutes les 10 ms
 */
initGame()
setInterval(draw,10)
