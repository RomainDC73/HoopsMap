import { getBasketballCourts } from './basketballCourts.js';

const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=v9Y0wyS0E3eJC9u7PByU', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  maxZoom: 20
}).addTo(map);

let markers = [];

function clearMarkers() {
  markers.forEach(marker => marker.remove());
  markers = [];
}

function showBasketballCourts(location, radius) {
  getBasketballCourts(location, radius)
    .then(basketballCourts => {
      clearMarkers();
      basketballCourts.forEach(court => {
        const marker = L.marker([court.fields.coordonnees[1], court.fields.coordonnees[0]]).addTo(map);
        marker.bindPopup(`<b>${court.fields.nom}</b><br>${court.fields.adresse}`);
        markers.push(marker);
      });
    })
    .catch(error => console.error('Erreur lors de la récupération des terrains de basket :', error));
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const { latitude, longitude } = position.coords;

      // Centrer la carte sur les coordonnées de l'utilisateur
      map.setView([latitude, longitude], 13);

      // Afficher les terrains de basket dans un rayon de 5 km autour de la position
      showBasketballCourts({ lat: latitude, lng: longitude }, 5000);
    },
    function(error) {
      console.log(error);
    }
  );
} else {
  console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
}