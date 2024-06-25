const map = L.map('map').setView([46.35546, 2.36225], 6);

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=v9Y0wyS0E3eJC9u7PByU', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  maxZoom: 20
}).addTo(map);

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        
        // Centrer la carte sur les coordonnées de l'utilisateur
        map.setView([lat, lng], 13);
      },
      function(error) {
        console.log(error);
      }
    );
  } else {
    console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
  }