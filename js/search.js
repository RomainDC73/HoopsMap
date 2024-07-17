const locationInput = document.getElementById('locationInput');
const customDropdown = document.getElementById('customDropdown');
const searchButton = document.getElementById('searchButton');

window.onload = function() {
  locationInput.value = '';
}

locationInput.addEventListener('input', function() {
  const input = this.value;
  if (input.length > 2) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=FR&q=${input}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        customDropdown.innerHTML = '';
        data.forEach(location => {
          const option = document.createElement('div');
          option.textContent = `${location.display_name.split(',').slice(0, 2).join(',')}`;
          option.addEventListener('click', function() {
            locationInput.value = option.textContent;
            customDropdown.style.display = 'none';
          });
          customDropdown.appendChild(option);
        });
        customDropdown.style.display = 'block';
      });
  } else {
    customDropdown.innerHTML = '';
    customDropdown.style.display = 'none';
  }
});

searchButton.addEventListener('click', function() {
  const selectedLocation = locationInput.value;
  fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=FR&q=${selectedLocation}`)
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
      customDropdown.innerHTML = '';
      customDropdown.style.display = 'none';
    });
});

document.addEventListener('click', function(event) {
  if (!customDropdown.contains(event.target) && event.target !== locationInput) {
    customDropdown.style.display = 'none';
  }
});
