const geoLocateButton = document.getElementById('geoLocateButton');

const geolocIcon = L.icon({
  iconUrl: 'docs/img/arrow-down-circle.svg',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 14);

        const geolocMarker = L.marker([latitude, longitude], { icon: geolocIcon }).addTo(map);
        
        geolocMarker.bindPopup("Vous êtes ici").openPopup();

        updateBasketballCourts(latitude, longitude);
        locationInput.value = '';

        feather.replace();

        searchOrGeolocateTriggered = true;

      },
      error => {
        if (error.code === 1){
            alert("Vous avez refusé la géolocalisation. Vous pouvez activer la géolocalisation dans les paramètres de votre navigateur.");
        } else {
            console.error("Erreur de géolocalisation : ", error);
        }
      }
    );
  } else {
    console.error("La géolocalisation n'est pas disponible");
  }
}

geoLocateButton.addEventListener('click', geolocate);
