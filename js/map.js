const map = L.map('map').setView([46.35546, 2.36225], 6);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9tZGMiLCJhIjoiY2x5MnJ1NzJmMDBpeTJpczNnY3hmeWF3bCJ9.TXQcRxl8KOcll6zuEafSAA', {
  attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">&copy; Mapbox</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  maxZoom: 20,
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);

const searchInThisAreaButton = document.getElementById('searchInThisAreaButton');

map.on('moveend', function() {
  searchInThisAreaButton.style.display = 'block';
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        
        // Centrer la carte sur les coordonnées de l'utilisateur
        map.setView([lat, lng], 13);
        updateBasketballCourts(lat, lng);
      },
      function(error) {
        console.log(error);
      }
    );
  } else {
    console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
  }

  