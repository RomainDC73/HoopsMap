const locationInput = document.getElementById('locationInput');
const customDropdown = document.getElementById('customDropdown');

window.onload = function() {
  locationInput.value = '';
}

locationInput.addEventListener('input', function() {
  const input = sanitizeInput(this.value);
  if (input.length > 2) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=FR&q=${encodeURIComponent(input)}`)
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
            searchLocation(locationInput.value); // Trigger search
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

function searchLocation(location) {
  const sanitizedLocation = sanitizeInput(location);
  fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=FR&q=${encodeURIComponent(sanitizedLocation)}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const location = data[0];
        const latitude = location.lat;
        const longitude = location.lon;
        map.setView([latitude, longitude], 15);
        locationInput.setSelectionRange(0, 0);

        updateBasketballCourts(latitude, longitude);
        searchOrGeolocateTriggered = true;
      }
      customDropdown.innerHTML = '';
      customDropdown.style.display = 'none';
    });
}

document.addEventListener('click', function(event) {
  if (!customDropdown.contains(event.target) && event.target !== locationInput) {
    customDropdown.style.display = 'none';
  }
});

function sanitizeInput(input) {
  // Fonction de nettoyage basique, adaptée à vos besoins spécifiques
  return input.replace(/[^\w\s,-]/gi, ''); // Retire tout caractère non-alphanumérique sauf espace, virgule et tiret
}
