let scoreElement = document.getElementById("score")

let nbrVie = 3
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
let dx = 1
//Vitesse sur l'axe Y de la balle
let dy = 1

// Nbre de fins effectués par la boucle de fin de partie
let nbreFin = 0

// Score de la partie
let score = 0

// Username de l'utilisateur
let username

// Compteur pour le mouvement de la balle
let isMoved = 0

// Variation de vitesse de la balle
let speedBall = 0.05

// Récupère l'élément canvas
export let zoneJeu = document.getElementById('playZone')


//Définit le canvas en 2D
export let canvasJeu = zoneJeu.getContext('2d')

// Crée un objet pour chaque brique
for (let l = 0; l < nbLines; l++) {
    bricks[l] = [];
    for (let b = 0; b < nbBricks; b++) {
        bricks[l][b] = {x: 0, y: 0, visible: true, couleur: null};
    }
}

// Permet de dessiner les briques
export function drawBricks() {

    // Position x de la brique
    let x = 2
    // Position y de la brique
    let y = 20

    // Couleur de la rangée de briqueq
    let couleur;
    for (let c = 0; c < nbLines; c++) {
        if (c !== 0) {
            x = 2
            y = y + 30
        }
        // Couleur des briques
        switch (c) {
            case 0:
                couleur = "black"
                break
            case 1:
                couleur = "purple"
                break
            case 2:
                couleur = "red"
                break
            case 3:
                couleur = "orange"
                break
            case 4:
                couleur = "yellow"
                break
        }
        // Dessin des briques
        for (let r = 0; r < nbBricks; r++) {
            if (bricks[c][r].visible) {
                bricks[c][r].x = x
                bricks[c][r].y = y
                bricks[c][r].couleur = couleur

                canvasJeu.beginPath()
                canvasJeu.fillStyle = couleur
                canvasJeu.fillRect(x, y, brickWidth, brickHeight)
                canvasJeu.closePath()

                // Ajout d'ombres sur les briques
                canvasJeu.shadowColor = "gray"
                canvasJeu.shadowBlur = 5
                canvasJeu.shadowOffsetX = 10
                canvasJeu.shadowOffsetY = 10
            }

            //Décale la position x pour la prochaine brique
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


}

//Permet de faire bouger la balle
function moveBall() {
    posYBall -= dy
    posXBall += dx
}

// Initialise le jeu
export function initGame() {
    posXBall = zoneJeu.width / 2
    posYBall = zoneJeu.height / 1.26 - 10
    barreX = zoneJeu.width / 2 - 20
    barreY = zoneJeu.height / 1.14
}

/**
 * Permet de dessiner la barre de déplacement
 */
function drawPaddle() {
    canvasJeu.beginPath()
    canvasJeu.fillStyle = "gray"
    canvasJeu.fillRect(barreX, barreY, barreWidth, barreHeight)
    canvasJeu.closePath()

}

/**
 * Fonction principale du script
 */
export function draw() {
    // Efface le canvas afin de le réactualiser
    canvasJeu.clearRect(0, 0, zoneJeu.width, zoneJeu.height)
    // Dessine la barre de déplacement
    drawPaddle()
    // Dessine les briques dans le canvas
    drawBricks()
    //Dessine la balle dans le canvas
    drawBall()
    // Détecte les collisions de la balle dans le canvas
    detectCollision()
    // Affiche le score sur la page
    displayInfosGame()
    // Détecte la fin du jeu
    endGame()
    // Détecte si la balle est en mouvement ou pas
    if(isMoved == 1){
      moveBall()
    }
    //Au clic de la souris, la balle se met à bouger
    zoneJeu.addEventListener('click',function(){
      isMoved = 1
    })
    }

// Détecte les entrées clavier pour le déplacement de la barre
document.addEventListener('keydown', function (e) {
    let toucheClavier = e.key
    if (toucheClavier == "ArrowLeft" && barreX != 0) {
        barreX -= 10
    } else if (toucheClavier == "ArrowRight" && barreX != 530) {
        barreX += 10
    }
})


// Affiche le score à l'emplacement dédié
function displayInfosGame() {
    scoreElement.innerHTML = `Score : ${score}`
    document.getElementById('nbreVies').innerHTML = `Vies : ${nbrVie}`
}


// Permet de détecter les collisions avec les briques et les côtés du canvas
function detectCollision() {

    let centerPointX = posXBall + widthBall / 2
    let DownPointY = posYBall + heightBall
    let centerMiddleY = posYBall + heightBall / 2
    let rightPointX = posXBall + widthBall
    // Collisions sur les côtés latéraux
    if (posXBall <= 0 || posXBall + widthBall >= zoneJeu.width) {
        dx = -dx
    }
    //Collisions en haut du canvas
    if (posYBall <= 0) {
        dy = -dy
    }

    if (DownPointY >= zoneJeu.height) {
        nbrVie--;
        dx = 1
        dy = 1

        initGame()
        drawBall()
    }


    //Collisions sur la barre
    if (centerPointX >= barreX && centerPointX <= barreX + barreWidth && DownPointY >= barreY && DownPointY <= barreY + barreHeight) {
        dy = -dy
    }


    for (let l = 0; l < nbLines; l++) {
        for (let c = 0; c < nbBricks; c++) {
            let brick = bricks[l][c]
            let nextBrick = bricks[l][c + 1]

            //Collisions si la balle tape la brique en bas
            if (centerPointX > brick.x && rightPointX < brick.x + brickWidth && brick.visible && posYBall <= brick.y + brickHeight) {
                // Accélère la vitesse de la balle et rend la brique non visible
                dy = -dy - speedBall
                brick.visible = false
                score++;
            }

            //Collisions côté droit de la brique
            if (posXBall < brick.x + brickWidth && centerMiddleY < brick.y + brickHeight && centerMiddleY > brick.y && brick.visible && rightPointX > brick.x + brickWidth) {
                // Accélère la vitesse de la balle et rend la brique non visible
                dx = -dx - speedBall
                brick.visible = false
                score++;
            }
            //Collision côté gauche
            if (rightPointX > brick.x && centerMiddleY < brick.y + brickHeight && centerMiddleY > brick.y && brick.visible && rightPointX < brick.x + brickWidth) {
                // Accélère la vitesse de la balle et rend la brique non visible
                dx = -dx - speedBall
                brick.visible = false
                score++;
            }

            if (nextBrick !== undefined && centerPointX > brick.x + brickWidth && centerPointX < nextBrick.x && posYBall <= brick.y + brickHeight && brick.visible && nextBrick.visible) {
                // Accélère la vitesse de la balle et rend la brique et la brique suivante non visible
                dy = -dy - speedBall
                brick.visible = false
                nextBrick.visible = false
                score = score + 2
            }
        }
    }
}

//Détecte le game over de la partie
function endGame() {
    // Si l'utilisateur n'a plus de vies
    if (nbrVie === 0 && nbreFin === 0) {
        isMoved = 0
        alert("Game Over")
        nbreFin = 1
        username = prompt("Username : ")
        let regex = new RegExp("\\w")
        let verif = regex.test(username)
        while(verif === false || username == null){
            alert('Username non valide')
            username = prompt("Username : ")
            verif = regex.test(username)
        }
        sendScore()
        setTimeout(function(){
          location.reload()
        },2000)
      }
      // Si l'utilisateur a cassé toutes les briques
      else if(nbrVie !== 0 && score >= 60){
        isMoved = 0
        let regex = new RegExp("\\w")
        let verif = regex.test(username)
        while(verif === false || username == null){
            alert('Username non valide')
            username = prompt("Username : ")
            verif = regex.test(username)
        }
        sendScore()
        setTimeout(function(){
          location.reload()
        },2000)
      }
}

//Envoie les scores dans la Base de Données
function sendScore() {
    // Initialise l'AJAX
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Récupère la réponse de la requête
            document.getElementById('etatRequete').innerHTML = this.responseText
        }
    }
    // Ouvre la requête
    xhr.open("POST", "send_score.php", true)
    // Ajoute un header à la requête afin de la traiter comme un formulaire
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // Envoie la requête AJAX
    xhr.send(`username=${username}&score=${score}`)
}
