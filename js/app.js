// Récupère l'élément canvas
let zoneJeu = document.getElementById('playZone')

//Définit le canvas en 2D
let canvasJeu = zoneJeu.getContext('2d')

// Longueur et largeur des briques
let width = 20
let height = 5

// Hauteur initiale des briques dans le canvas
let y = 3

/**Permet de dessiner une ligne de briques
 * @param nombreBriques Le nombre de briques à dessiner
 * @param y Hauteur des briques dans le canvas
 * @param couleur Couleur des briques
 */
function drawBrique(nombreBriques,y,couleur = "green"){
	let x = 2
	for(let i = 0; i < nombreBriques; i++){
		canvasJeu.beginPath()
		canvasJeu.fillStyle = couleur
		canvasJeu.fillRect(x,y,width,height)
		canvasJeu.closePath()
		x = x + 5 + width
		//canvasJeu.moveTo(x,y)
	}
}

for(let i = 0; i < 5; i++){
	if(i == 0){
		drawBrique(12,y,"red")
	} else if (i == 1){
		drawBrique(12,y,"blue")
	} else if (i == 3){
		drawBrique(12,y,"yellow")
	} else if (i == 4){
		drawBrique(12,y,"pink")
	} else {
		drawBrique(12,y)
	}
	y = y + 10
}
