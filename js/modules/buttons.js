export let liste = document.getElementsByClassName("liste");
let sections = document.getElementsByTagName("section");

console.log(liste)

export function changeMenu(NbBouton) {
    liste[NbBouton].addEventListener('click',function(){
        for(let i = 0; i < sections.length; i++){
            sections[i].style.display = "none"
        }
        sections[NbBouton].style.display = "block"
    })
}