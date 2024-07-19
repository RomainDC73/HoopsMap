// Stocker les marqueurs des terrains de basket-ball pour pouvoir les supprimer plus tard
let courtsMarkers = [];

async function getBasketballCourts(latitude = 46.35546, longitude = 2.36225) {
    const url = 'https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records';
    const params = new URLSearchParams();
    params.append('limit', 100);
    params.append('refine', 'equip_aps_nom:Basket-Ball');
    params.append('refine', 'equip_nature:Découvert');
    params.append('where', `within_distance(coordonnees, GEOM'POINT(${longitude} ${latitude})', 20km)`);

    try {
        const response = await fetch(`${url}?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        const data = await response.json();

        // Afficher la réponse JSON complète
        console.log(data);
        // console.log("L'URL envoyée est : ",response);

        if (!data.results) {
            throw new Error('La propriété records est indéfinie dans la réponse de l\'API.');
        }

        // Traitement des données basé sur la structure réelle de la réponse
        const basketballCourts = data.results.map(record => ({
            name: record.inst_nom,
            access: record.equip_acc_libre,
            address: record.inst_adresse,
            cp: record.inst_cp,
            city: record.inst_com_nom,
            latitude: record.coordonnees.lat,
            longitude: record.coordonnees.lon
        }));

        // Afficher ou utiliser les données
        console.log(basketballCourts);
        displayBasketballCourts(basketballCourts); // Exemple d'une fonction pour afficher les données
    } catch (error) {
        console.error('Erreur lors de la récupération des terrains de basket-ball:', error);
    }
}

// Fonction pour afficher les terrains de basket-ball (exemple)
function displayBasketballCourts(courts) {

    // Supprimer les marqueurs existants
    courtsMarkers.forEach(marker => map.removeLayer(marker));
    courtsMarkers = [];
    courts.forEach(court => {

        let accessText;
        if (court.access === 'true') {
            accessText = 'Oui';
        } else if (court.access === 'false') {
            accessText = 'Non';
        } else {
            accessText = 'Non renseigné';
        }

        let addressText;
        if (court.address === null) {
            addressText = '';
        } else {
            addressText = court.address;
        }
        // Ajouter un marqueur sur la carte pour chaque terrain de basket-ball

        const courtsContent = ` 
            <div class="courts-content">
                <h2>${court.name}</h2>
                <p><b>Adresse :</b> ${addressText}<br>
                ${court.cp} ${court.city}</p>
                <p><b>Accès Libre :</b> ${accessText}</p>
            </div>`;
        const marker = L.icon({
            iconUrl: 'docs/img/map-pin.svg',
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],

        });
        
        L.marker([court.latitude, court.longitude], { icon: marker })
            .bindPopup(courtsContent)
            .addTo(map);

        courtsMarkers.push(marker);
    });
}

function updateBasketballCourts(latitude, longitude) {
    // Appel de la fonction pour obtenir les terrains de basket-ball
    getBasketballCourts(latitude, longitude);
}



