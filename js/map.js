const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
