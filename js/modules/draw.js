import {canvasJeu,zoneJeu, zoneWidth} from "../app.js";

//Position initiale de la barre
let barreX = 130
let bricks = []
let nbBricks = 12
let nbLines = 5


let posXBall = 150
let posYBall = 315

let widthBall = 35
let heightBall = 35

let brickWidth = 45
let brickHeight = 20

let barreY = 350
let barreWidth = 70
let barreHeight = 5
let dx = 1
let dy = 0.75
let jeuEnRoute = false



for(let l = 0; l < nbLines; l++){
    bricks[l] = [];
    for(let b = 0; b < nbBricks; b++){
        bricks[l][b] = { x: 0, y: 0, visible : true};
    }
}

export function drawBricks(){

    let x =2
    let y = 20
    let couleur;
    for(let c = 0; c < nbLines; c++){
        if(c != 0){
            x = 2
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
            if(bricks[c][r].visible){
                bricks[c][r].x = x
                bricks[c][r].y = y
                canvasJeu.beginPath()
                canvasJeu.fillStyle = couleur
                canvasJeu.fillRect(x,y,brickWidth,brickHeight)
                canvasJeu.closePath()
            }
            x = x + brickWidth + 5
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
        canvasJeu.drawImage(smash_ball, posXBall, posYBall, widthBall, heightBall)
    })

    posYBall -= dy
    posXBall += dx
}

/**
 * Permet de dessiner la barre de déplacement
 */
function drawPaddle(){
    //console.log(`Position de la barre : ${barreX}`)
    canvasJeu.beginPath()
    canvasJeu.fillStyle = "gray"
    canvasJeu.fillRect(barreX ,barreY , barreWidth, barreHeight)
    canvasJeu.closePath()

}

/**
 * Fonction principale du script
 */
export function draw(){
    canvasJeu.clearRect(0,0,zoneJeu.width,zoneJeu.height)
    drawBall()
    drawBricks()
    detectCollision()
    drawPaddle()
}

document.addEventListener('keydown',function(e) {
    let toucheClavier = e.key
    if (toucheClavier == "ArrowLeft" && barreX != 0) {
        barreX -= 10
    } else if (toucheClavier == "ArrowRight" && barreX != 530) {
        barreX += 10
    }
})

function detectCollision(){


    // Si la position en ordonnée de la belle est inférieure à 0 ou est supérieure à la hauteur de la zone de jeu
    if(posYBall < 0 || posYBall > zoneJeu.height - 30){
        dy = -dy
    }

    //Si la position en abscisse de la balle est inférieure à 0 ou est supérieur à la longueur de la zone de jeu
    if(posXBall > zoneJeu.width - 30 || posXBall < 0){
        dx = -dx
    }

    let leftCornerPosition = posYBall + heightBall

    let zoneTolerance = 10

    if(leftCornerPosition >= barreY && leftCornerPosition <= barreY && posXBall >= barreX - zoneTolerance && posXBall <= barreX + barreWidth + zoneTolerance){
        //console.log('Collision')
        dy = -dy
    }

    let upCenterPoint = posXBall + widthBall / 2
    
    for(let l = 0; l < nbLines;l++){
        for(let b = 0; b < nbBricks; b++){
            let brick = bricks[l][b]
            if(posYBall <= brick.y + brickHeight && upCenterPoint >= brick.x && upCenterPoint <= brick.x + brickWidth && brick.visible){
                dy = -dy
                console.log(`Effacement de la brique ${b + 1} sur la ligne ${l + 1}`)
                brick.visible = false
            }
        }
    }
}