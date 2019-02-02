import {canvasJeu, zoneJeu} from "../app.js";

//Position initiale de la barre
let barreX = 130
let bricks = []
let nbBricks = 12
let nbLines = 5


console.log(bricks)

export function drawBricks(){

    let x = 60
    let y = 20
    let width = 35
    let height = 20
    let couleur;
    for(let c = 0; c < nbLines; c++){
        bricks[c] = [];
        if(c != 0){
            x = 60
            y = y + 30
        }
        switch(c){
            case 0:
                couleur = "red"
                break
            case 1:
                couleur = "green"
                break
            case 2:
                couleur = "yellow"
                break
            case 3:
                couleur = "aquamarine"
                break
            case 4:
                couleur = "pink"
                break
        }
        for(let r = 0; r < nbBricks; r++){
            bricks[c][r] = { x: 0, y: 0, visible : true};
            bricks[c][r].x = x
            bricks[c][r].y = y
            if(bricks[c][r].visible){
                canvasJeu.beginPath()
                canvasJeu.fillStyle = couleur
                canvasJeu.fillRect(x,y,width,height)
                canvasJeu.closePath()
            }
            x = x + width + 5
        }
    }
}


/**
 * Permet de dessiner la balle
 */
function drawBall() {
    let smash_ball = new Image(100, 100)
    smash_ball.src = "imgs/smash_ball.png"
    smash_ball.addEventListener('load', function () {
        canvasJeu.drawImage(smash_ball, 150, 315, 35, 35)
    })
}

/**
 * Permet de dessiner la barre de déplacement
 */
function drawPaddle(){
    canvasJeu.beginPath()
    canvasJeu.fillStyle = "gray"
    canvasJeu.fillRect(barreX ,350 , 70, 5)
    canvasJeu.closePath()
}

/**
 * Dessine la balle et la barre de déplacement
 */
export function draw(){
    canvasJeu.clearRect(0,0,zoneJeu.width,zoneJeu.height)
    drawBricks()
    drawBall()
    drawPaddle()
}


document.addEventListener('keydown',function(e) {
    let toucheClavier = e.key
    if (toucheClavier == "ArrowLeft") {
        barreX -= 7
    } else if (toucheClavier == "ArrowRight") {
        barreX += 7
    }
})