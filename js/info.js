// Add an event listener that runs when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select the element with class 'info-icon' which is used to open the information block
    const iconInfo = document.querySelector('.info-icon');
    
    // Select the element with class 'info-block' which contains additional information and is shown/hidden
    const infoBlock = document.querySelector('.info-block');
    
    // Select the element with class 'close-icon' which is used to close the information block
    const closeInfo = document.querySelector('.close-icon');

    // Check if the 'info-icon' element exists
    if (iconInfo) {
        // Add a click event listener to the 'info-icon' element
        iconInfo.addEventListener('click', () => {
            // Toggle the 'show' class on the 'info-block' element
            // This will either show or hide the information block based on its current state
            infoBlock.classList.toggle('show');
        });
    }

    // Check if the 'close-icon' element exists
    if (closeInfo) {
        // Add a click event listener to the 'close-icon' element
        closeInfo.addEventListener('click', () => {
            // Remove the 'show' class from the 'info-block' element to hide it
            infoBlock.classList.remove('show');
        });
    }

    // Add a click event listener to the entire document
    document.addEventListener('click', (event) => {
        // Check if the 'info-block' element is currently shown and the click event target is neither the 'info-icon' 
        // nor an element within the 'info-block'
        if (infoBlock.classList.contains('show') && event.target !== iconInfo && !infoBlock.contains(event.target)) {
            // Remove the 'show' class from the 'info-block' element to hide it if a click occurs outside of it
            infoBlock.classList.remove('show');
        }
    });
});
