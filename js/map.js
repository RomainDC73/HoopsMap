const map = L.map('map').setView([46.35546, 2.36225], 6);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9tZGMiLCJhIjoiY2x5MnJ1NzJmMDBpeTJpczNnY3hmeWF3bCJ9.TXQcRxl8KOcll6zuEafSAA', {
  attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">&copy; Mapbox</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  maxZoom: 20,
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);

const searchInThisAreaButton = document.getElementById('searchInThisAreaButton');

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function searchInThisArea() {
  const center = map.getCenter();
  updateBasketballCourts(center.lat, center.lng);
  searchInThisAreaButton.style.display = 'none'; // Hide the button after search
}

const debouncedSearchInThisArea = debounce(searchInThisArea, 1000);

map.on('moveend', debouncedSearchInThisArea);




