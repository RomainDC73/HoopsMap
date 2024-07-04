const iconInfo = document.querySelector('.icon-info');
const infoBlock = document.querySelector('.info-block');
const closeInfo = document.querySelector('.icon-close');

// Ajouter un écouteur d'événement de clic à l'icône
iconInfo.addEventListener('click', () => {
    // Ajouter ou supprimer la classe 'show' pour afficher ou cacher le bloc
    infoBlock.classList.toggle('show');
});

closeInfo.addEventListener('click', () => {
    infoBlock.classList.remove('show');
});

document.addEventListener('click', (event) => {
    if (infoBlock.classList.contains('show') && event.target !== iconInfo && event.target !== infoBlock) {
        infoBlock.classList.remove('show');
    }
});