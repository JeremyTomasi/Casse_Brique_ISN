import {canvasJeu,zoneJeu, zoneWidth} from "../app.js";

//Position X initiale de la barre
let barreX = 130

// Position Y de la barre
let barreY = 350

//Taille de la barre
let barreWidth = 70

//Hauteur de la barre
let barreHeight = 5

// Tableau contenant toutes les briques
let bricks = []

// Nombre de briques par ligne
let nbBricks = 12

//Nombre de lignes de briques
let nbLines = 5

// Position X initiale de la balle
let posXBall = 150

// Position Y initiale de la balle
let posYBall = 315

// Taille de la balle
let widthBall = 35

// Hauteur de la balle
let heightBall = 35

// Taille de la brique
let brickWidth = 45

// Hauteur de la brique
let brickHeight = 20

// Vitesse sur l'axe X de la balle
let dx = 1

//Vitesse sur l'axe Y de la balle
let dy = 0.75

for(let l = 0; l < nbLines; l++){
    bricks[l] = [];
    for(let b = 0; b < nbBricks; b++){
        bricks[l][b] = { x: 0, y: 0, visible : true};
    }
}

// Permet de dessiner les briques
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

// Détecte les entrées clavier pour le déplacement de la barre
document.addEventListener('keydown',function(e) {
    let toucheClavier = e.key
    if (toucheClavier == "ArrowLeft" && barreX != 0) {
        barreX -= 10
    } else if (toucheClavier == "ArrowRight" && barreX != 530) {
        barreX += 10
    }
})


// Permet de détecter les collisions avec les briques et les côtés du canvas
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