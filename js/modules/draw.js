import {canvasJeu,zoneJeu} from "../app.js";

// Position initiale sur l'axe X et sur l'axe Y de la barre de déplacement (pt sup gauche)
let barreX, barreY
//Position initiale sur l'axe X et sur l'axe Y de la balle (pt sup gauche)
let posXBall, posYBall
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
// Taille de la balle
let widthBall = 25
// Hauteur de la balle
let heightBall = 25
// Taille de la brique
let brickWidth = 45
// Hauteur de la brique
let brickHeight = 20
// Vitesse sur l'axe X de la balle
let dx = 0.5
//Vitesse sur l'axe Y de la balle
let dy = 0.75

// Crée un objet pour chaque brique
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

                canvasJeu.beginPath()
                canvasJeu.fillStyle = "brown"
                canvasJeu.fillRect(bricks[c][r].x,bricks[c][r].y,2,2)
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

// Initialise le jeu
export function initGame(){
    posXBall = zoneJeu.width / 2
    posYBall = zoneJeu.height / 1.26 - 10
    barreX = zoneJeu.width / 2 - 20
    barreY = zoneJeu.height / 1.14
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

    let centerPointX = posXBall + widthBall / 2
    let DownPointY = posYBall + heightBall
    let centerMiddleY = posYBall + heightBall / 2
    let rightPointX = posXBall + widthBall
    // Collisions sur les côtés latéraux
    if(posXBall <= 0 || posXBall + widthBall >= zoneJeu.width){
        dx = -dx
    }
    //Collisions en haut du canvas
    if(posYBall <= 0 || DownPointY >= zoneJeu.height){
        dy = -dy
    }



    //Collisions sur la barre
    if(centerPointX >= barreX && centerPointX <= barreX + barreWidth && DownPointY >= barreY){
        dy = -dy
    }

    for(let l = 0; l < nbLines; l++){
        for(let c = 0; c < nbBricks;c++){
            let b = bricks[l][c]
            //Collisions si la balle tape la brique en bas
            if(centerPointX >= b.x  && rightPointX <= b.x + brickWidth && posYBall < b.y + brickHeight && b.visible && DownPointY >= b.y + brickHeight){
                dy = -dy
                console.log("Collision côté inférieur")
                b.visible = false
            }

            //Collisions côté droit de la brique
            if(posXBall <= b.x + brickWidth && centerMiddleY <= b.y + brickHeight && centerMiddleY >= b.y && b.visible && rightPointX >= b.x + brickWidth){
                dx = -dx
                console.log("Collision côté à droite de la brique")
                b.visible = false
            }
            //Collision côté gauche
            if(rightPointX >= b.x && centerMiddleY <= b.y + brickHeight && centerMiddleY >= b.y && b.visible && rightPointX <= b.x + brickWidth){
                dx = -dx
                console.log("Collision côté à gauche de la brique")
                b.visible = false
            }

        }
    }

}