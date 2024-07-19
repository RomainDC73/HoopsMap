// Get references to the input field and dropdown element
const locationInput = document.getElementById('locationInput');
const customDropdown = document.getElementById('customDropdown');

// Clear the input field when the page loads
window.onload = function() {
  locationInput.value = '';
}

// Add an event listener to the location input field
// This handles user input and fetches location suggestions
locationInput.addEventListener('input', function() {
  // Sanitize the input to prevent unwanted characters
  const input = sanitizeInput(this.value);

  // If the input is longer than 2 characters, fetch location suggestions
  if (input.length > 2) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=FR&q=${encodeURIComponent(input)}`)
      .then(response => response.json())
      .then(data => {
        // Clear previous dropdown items
        customDropdown.innerHTML = '';

        // Populate the dropdown with new location suggestions
        data.forEach(location => {
          const option = document.createElement('div');
          // Display the first two parts of the location name
          option.textContent = `${location.display_name.split(',').slice(0, 2).join(',')}`;
          // Add a click event to each option
          option.addEventListener('click', function() {
            // Set the input field value to the selected location
            locationInput.value = option.textContent;
            // Hide the dropdown
            customDropdown.style.display = 'none';
            // Trigger a search for the selected location
            searchLocation(locationInput.value); 
          });
          // Add the option to the dropdown
          customDropdown.appendChild(option);
        });
        // Show the dropdown
        customDropdown.style.display = 'block';
      });
  } else {
    // Hide the dropdown if input is too short
    customDropdown.innerHTML = '';
    customDropdown.style.display = 'none';
  }
});

// Function to search for a location and update the map view
function searchLocation(location) {
  // Sanitize the location input
  const sanitizedLocation = sanitizeInput(location);
  // Fetch location data from OpenStreetMap
  fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=FR&q=${encodeURIComponent(sanitizedLocation)}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        // Get the latitude and longitude of the first result
        const location = data[0];
        const latitude = location.lat;
        const longitude = location.lon;
        // Update the map view to the new location
        map.setView([latitude, longitude], 15);
        // Clear the input field selection
        locationInput.setSelectionRange(0, 0);
        // Update basketball courts based on the new location
        updateBasketballCourts(latitude, longitude);
        // Set the flag to indicate a search or geolocation has occurred
        searchOrGeolocateTriggered = true;
      }
      // Hide the dropdown and clear its contents
      customDropdown.innerHTML = '';
      customDropdown.style.display = 'none';
    });
}

// Add an event listener to close the dropdown when clicking outside of it
document.addEventListener('click', function(event) {
  if (!customDropdown.contains(event.target) && event.target !== locationInput) {
    customDropdown.style.display = 'none';
  }
});

// Function to sanitize user input, removing unwanted characters
function sanitizeInput(input) {
  return input.replace(/[^\w\s,-]/gi, '');
}
