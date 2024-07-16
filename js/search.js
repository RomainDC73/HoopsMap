const locationInput = document.getElementById('locationInput');
const locationList = document.getElementById('locationList');
const searchButton = document.getElementById('searchButton');

window.onload = function() {
  locationInput.value = '';
}


locationInput.addEventListener('input', function() {
  const input = this.value;
  if (input.length > 2) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${input}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        locationList.innerHTML = '';
        data.forEach(location => {
          const option = document.createElement('option');
          option.value = `${location.display_name.split(',').slice(0, 2).join(',')}`;
          locationList.appendChild(option);
        });
      });
  } else {
    locationList.innerHTML = '';
  }
});

searchButton.addEventListener('click', function() {
  const selectedLocation = locationInput.value;
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedLocation}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const location = data[0];
        const latitude = location.lat;
        const longitude = location.lon;
        map.setView([latitude, longitude], 15);
        locationInput.setSelectionRange(0, 0);

        updateBasketballCourts(latitude, longitude);
      }
      locationList.innerHTML = '';
    });
});