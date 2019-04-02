export let liste = document.getElementsByClassName("liste");
let sections = document.getElementsByTagName("section");

// Permet le changement de menu grâce aux onglets présents sur la page
export function changeMenu(NbBouton) {
    liste[NbBouton].addEventListener('click',function(){
        for(let i = 0; i < liste.length; i++){
            sections[i].style.display = "none"
        }
        sections[NbBouton].style.display = "block"
    })
}
