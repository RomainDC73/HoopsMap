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

        // Ajouter un marqueur avec une icône personnalisée à la position géolocalisée
        const geolocMarker = L.marker([latitude, longitude], { icon: geolocIcon }).addTo(map);
        
        // Optionnel : Ajouter un popup au marqueur
        geolocMarker.bindPopup("Vous êtes ici").openPopup();

        updateBasketballCourts(latitude, longitude);
        locationInput.value = ''; // Effacer le champ d'entrée de localisation si nécessaire

        // Mettre à jour les icônes Feather
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
