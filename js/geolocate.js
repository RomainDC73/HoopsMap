const geoLocateButton = document.getElementById('geoLocateButton');

const geolocIcon = L.divIcon({
  html: '<i data-feather="arrow-down-circle"></i>',
  className: 'show-geoloc-icon', // Classe personnalisée pour styliser l'icône
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76], // Point de l'icône correspondant à la position du popup
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
