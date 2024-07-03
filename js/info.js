const iconInfo = document.querySelector('.icon-info');
const infoBlock = document.querySelector('.info-block');

// Ajouter un écouteur d'événement de clic à l'icône
iconInfo.addEventListener('click', () => {
    // Ajouter ou supprimer la classe 'show' pour afficher ou cacher le bloc
    infoBlock.classList.toggle('show');
});