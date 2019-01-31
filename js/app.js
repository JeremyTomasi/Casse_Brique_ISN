// Récupère l'élément canvas
let zoneJeu = document.getElementById('playZone')
let barreX = 130
let nbrVie = 3
//Définit le canvas en 2D
let canvasJeu = zoneJeu.getContext('2d')

// Longueur et largeur des briques

// Hauteur initiale des briques dans le canvas
let y = 3

let nbBriquesParLigne = 12
let nbreLignes = 5

let bricks = []


for(let l = 0; l < nbreLignes; l++){
	bricks[l] = [];
	for(let r = 0; r < nbBriquesParLigne; r++){
		bricks[l][r] = {x: 0, y: 0}
	}
}

console.log(bricks)
/**Permet de dessiner les briques
 * @param couleur Couleur des briques
 */

function drawBrique(couleur = "green") {
	let x = 2
	let width = 20
	let height = 5

	for (let c = 0; c < nbreLignes; c++) {
		for (let r = 0; r < nbBriquesParLigne; r++) {
			bricks[c][r].x = x
			bricks[c][r].y = y
			canvasJeu.fillStyle = couleur
			canvasJeu.fillRect(x, y, width, height)
			x = x + width + 5
		}
	}
}

for(let i = 0; i < 5; i++){
	if(i == 0){
		drawBrique("red")
	} else if (i == 1){
		drawBrique("blue")
	} else if (i == 2){
		drawBrique("yellow")
	} else if (i == 3){
		drawBrique("pink")
	} else {
		drawBrique("purple")
	}
	y = y + 10
}

canvasJeu.beginPath()
	canvasJeu.fillStyle = "gray"
	canvasJeu.fillRect(barreX ,135 , 50, 5)
canvasJeu.closePath()

let smash_ball = new Image(100,100)
smash_ball.src = "imgs/smash_ball.png"
smash_ball.addEventListener('load',function(){
    canvasJeu.drawImage(smash_ball,150,115,20,20)
})
