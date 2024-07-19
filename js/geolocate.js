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
    // Get the current position
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
        } else {
          console.error("Erreur de géolocalisation : ", error);
        }
      }
    );
  } else {
    console.error("La géolocalisation n'est pas disponible");
  }
}

// Add event listener to the geolocate button
geoLocateButton.addEventListener('click', geolocate);
