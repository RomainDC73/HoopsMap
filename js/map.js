// Variable to track if a search or geolocation action has been triggered
let searchOrGeolocateTriggered = false;

// Initialize the map with a default view centered at specific coordinates and zoom level
const map = L.map('map').setView([46.35546, 2.36225], 6);

// Add a tile layer to the map from Mapbox with a specific style and access token
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9tZGMiLCJhIjoiY2x5MnJ1NzJmMDBpeTJpczNnY3hmeWF3bCJ9.TXQcRxl8KOcll6zuEafSAA', {
  // Attribution text for the map tiles
  attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">&copy; Mapbox</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  // Maximum zoom level for the map tiles
  maxZoom: 20,
  // Size of each tile
  tileSize: 512,
  // Zoom offset to align tiles properly
  zoomOffset: -1
}).addTo(map);

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    // Clear any previously set timeout
    clearTimeout(timeout);
    // Set a new timeout to call the function after a specified delay
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Function to search for basketball courts in the current map area
function searchInThisArea() {
  // Check if a search or geolocation action has been triggered
  if (searchOrGeolocateTriggered) {
    // Get the center coordinates of the current map view
    const center = map.getCenter();
    // Update the display of basketball courts based on the center coordinates
    updateBasketballCourts(center.lat, center.lng);
    // Log the center coordinates for debugging
    console.log('Recherche dans cette zone:', center);
  }
}

// Create a debounced version of the searchInThisArea function
// This will delay the function call by 1000 milliseconds (1 second)
const debouncedSearchInThisArea = debounce(searchInThisArea, 1000);

// Add an event listener to the map that triggers the debounced function
// This will call searchInThisArea when the map's movement ends
map.on('moveend', debouncedSearchInThisArea);
