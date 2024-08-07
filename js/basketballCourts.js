let courtsMarkers = [];

// Function to fetch basketball courts from the API
async function getBasketballCourts(latitude = 46.35546, longitude = 2.36225) {
    const url = 'https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records';
    const params = new URLSearchParams();
    
    // Define request parameters
    params.append('limit', 100);
    params.append('refine', 'equip_aps_nom:Basket-Ball');
    params.append('refine', 'equip_nature:Découvert');
    params.append('where', `within_distance(coordonnees, GEOM'POINT(${longitude} ${latitude})', 20km)`);

    try {
        const response = await fetch(`${url}?${params.toString()}`);
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // Check if the results property exists in the API response
        if (!data.results) {
            throw new Error('The results property is undefined in the API response.');
        }

        // Map the API results to the required properties
        const basketballCourts = data.results.map(record => ({
            name: record.inst_nom,
            access: record.equip_acc_libre,
            address: record.inst_adresse,
            cp: record.inst_cp,
            city: record.inst_com_nom,
            latitude: record.coordonnees.lat,
            longitude: record.coordonnees.lon
        }));

        // console.log(basketballCourts);
        
        // Display basketball courts on the map
        displayBasketballCourts(basketballCourts);
    } catch (error) {
        console.error('Error fetching basketball courts:', error);
    }
}

// Function to display basketball courts on the map
function displayBasketballCourts(courts) {
    // Store currently open popup if any
    let openPopupLatLng = null;
    map.eachLayer(layer => {
        if (layer instanceof L.Marker && layer.isPopupOpen()) {
            openPopupLatLng = layer.getLatLng();
        }
    });

    // Remove existing markers
    courtsMarkers.forEach(marker => map.removeLayer(marker));
    courtsMarkers = [];

    // Add a marker for each basketball court
    courts.forEach(court => {
        // Determine the access text
        let accessText;
        if (court.access === 'true') {
            accessText = 'Oui';
        } else if (court.access === 'false') {
            accessText = 'Non';
        } else {
            accessText = 'Non précisé';
        }

        // Determine the address text
        let addressText = court.address === null ? '' : court.address;

        // Create the popup content
        const courtsContent = ` 
            <div class="courts-content">
                <h2>${court.name}</h2>
                <p><b>Addresse :</b> ${addressText}<br>
                ${court.cp} ${court.city}</p>
                <p><b>Accès libre :</b> ${accessText}</p>
            </div>`;

        // Create a custom icon for the marker
        const markerIcon = L.icon({
            iconUrl: 'docs/img/map-pin.svg',
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
        });

        // Add the marker to the map
        const marker = L.marker([court.latitude, court.longitude], { icon: markerIcon })
            .bindPopup(courtsContent)
            .addTo(map);

        // Add the marker to the list of markers
        courtsMarkers.push(marker);
        
        // Reopen the popup if it was open previously
        // if (openPopupLatLng && openPopupLatLng.equals(marker.getLatLng())) {
        //     marker.openPopup();
        // }
    });
}

// Function to update basketball courts based on latitude and longitude
function updateBasketballCourts(latitude, longitude) {
    getBasketballCourts(latitude, longitude);
}
