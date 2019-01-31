import {canvasJeu, y} from "../app.js";

export let nbBriquesParLigne = 12

export let nbreLignes = 5

// Tableau contenant toutes les briques
let bricks = []

//Position initiale de la barre
let barreX = 130

/**Permet de dessiner les briques
 * @param couleur Couleur des briques
 */
export function drawBrique(couleur = "green") {
    let x = 2
    let width = 20
    let height = 5

    for (let c = 0; c < nbreLignes; c++) {
        bricks[c] = [];
        for (let r = 0; r < nbBriquesParLigne; r++) {
            bricks[c][r] = {x: 0, y: 0}
            bricks[c][r].x = x
            bricks[c][r].y = y
            canvasJeu.fillStyle = couleur
            canvasJeu.fillRect(x, y, width, height)
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
        canvasJeu.drawImage(smash_ball, 150, 115, 20, 20)
    })
}

/**
 * Permet de dessiner la barre de déplacement
 */
function drawPaddle(){
    canvasJeu.beginPath()
    canvasJeu.fillStyle = "gray"
    canvasJeu.fillRect(barreX ,135 , 50, 5)
    canvasJeu.closePath()
}

/**
 * Dessine la balle et la barre de déplacement
 */
export function draw(){
    drawBall()
    drawPaddle()
}