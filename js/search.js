const locationInput = document.getElementById('locationInput');
const locationList = document.getElementById('locationList');
const searchButton = document.getElementById('searchButton');


locationInput.addEventListener('input', function() {
    var input = this.value;
    if (input.length > 2) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${input}`)
        .then(response => response.json())
        .then(data => {
          locationList.innerHTML = '';
          data.forEach(location => {
            var option = document.createElement('option');
            option.value = `${location.display_name} (${location.lat}, ${location.lon})`;
            locationList.appendChild(option);
          });
        });
    } else {
      locationList.innerHTML = '';
    }
  });

  searchButton.addEventListener('click', function() {
    var selectedLocation = locationInput.value.split(' (')[0];
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedLocation}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          var location = data[0];
          map.setView([location.lat, location.lon], 13);
        }
      });
  });