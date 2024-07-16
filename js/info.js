document.addEventListener('DOMContentLoaded', () => {
    const iconInfo = document.querySelector('.icon-info');
    const infoBlock = document.querySelector('.info-block');
    const closeInfo = document.querySelector('.icon-close');

    if (iconInfo) {
        iconInfo.addEventListener('click', (event) => {
            // Ajouter ou supprimer la classe 'show' pour afficher ou cacher le bloc
            infoBlock.classList.toggle('show');
        });
    }

    if (closeInfo) {
        closeInfo.addEventListener('click', (event) => {
            infoBlock.classList.remove('show');
        });
    }

    document.addEventListener('click', (event) => {
        console.log('Document clicked');
        if (infoBlock.classList.contains('show') && event.target !== iconInfo && !infoBlock.contains(event.target)) {
            infoBlock.classList.remove('show');
        }
    });
});
