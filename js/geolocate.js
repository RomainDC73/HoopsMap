const geoLocateButton = document.getElementById('geoLocateButton');

function geolocate(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 14);
                L.marker([latitude, longitude]).addTo(map)
                    .bindPopup('You are here')
                    .openPopup();
            },
            error => {
                console.error("Erreur de géolocalisation : ", error);
            }
        );
    } else {
        console.error("La géolocalisation n'est pas disponible");
    }
}

geoLocateButton.addEventListener('click', geolocate);