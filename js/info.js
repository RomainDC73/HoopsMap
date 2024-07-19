document.addEventListener('DOMContentLoaded', () => {
    const iconInfo = document.querySelector('.info-icon');
    const infoBlock = document.querySelector('.info-block');
    const closeInfo = document.querySelector('.close-icon');

    if (iconInfo) {
        iconInfo.addEventListener('click', () => {
            infoBlock.classList.toggle('show');
        });
    }

    if (closeInfo) {
        closeInfo.addEventListener('click', () => {
            infoBlock.classList.remove('show');
        });
    }

    document.addEventListener('click', (event) => {
        if (infoBlock.classList.contains('show') && event.target !== iconInfo && !infoBlock.contains(event.target)) {
            infoBlock.classList.remove('show');
        }
    });
});
