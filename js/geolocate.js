// Get the geoLocateButton element from the DOM
const geoLocateButton = document.getElementById('geoLocateButton');

// Define a custom icon for geolocation marker
const geolocIcon = L.icon({
  iconUrl: 'docs/img/arrow-down-circle.svg',  // URL of the custom icon
  iconSize: [38, 95],  // Size of the icon
  iconAnchor: [22, 94],  // Anchor point of the icon
  popupAnchor: [-3, -76],  // Anchor point of the popup
});

// Function to handle geolocation
function geolocate() {
  // Check if geolocation is available
  if (navigator.geolocation) {
    // Check the geolocation permission status
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
        if (permissionStatus.state === 'denied') {
          alert("La géolocalisation est désactivée dans les paramètres de votre navigateur. Veuillez l'activer.");
        } else {
          getGeolocation();
        }
      });
    } else {
      // If Permissions API is not available, try to get geolocation directly
      getGeolocation();
    }
  } else {
    console.error("La géolocalisation n'est pas disponible");
  }
}

// Function to get geolocation
function getGeolocation() {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      // Set the view of the map to the current position
      map.setView([latitude, longitude], 14);

      // Add a marker to the current position
      const geolocMarker = L.marker([latitude, longitude], { icon: geolocIcon }).addTo(map);
      // Bind a popup to the marker
      geolocMarker.bindPopup("Vous êtes ici").openPopup();

      // Update basketball courts around the current position
      updateBasketballCourts(latitude, longitude);
      locationInput.value = '';  // Clear the location input

      // Replace icons with Feather icons
      feather.replace();

      // Indicate that search or geolocation was triggered
      searchOrGeolocateTriggered = true;
    },
    error => {
      // Handle geolocation errors
      if (error.code === 1) {
        alert("Vous avez refusé la géolocalisation. Vous pouvez activer la géolocalisation dans les paramètres de votre navigateur.");
      } else if (error.code === 2) {
        alert("La position est actuellement indisponible.");
      } else if (error.code === 3) {
        alert("La demande de géolocalisation a expiré.");
      } else {
        console.error("Erreur de géolocalisation : ", error);
      }
    }
  );
}

// Add event listener to the geolocate button
geoLocateButton.addEventListener('click', geolocate);
