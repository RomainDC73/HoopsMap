// Stocker les marqueurs des terrains de basket-ball pour pouvoir les supprimer plus tard
let courtsMarkers = [];

async function getBasketballCourts(latitude = 46.35546, longitude = 2.36225) {
    const url = 'https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records';
    const params = new URLSearchParams();
    params.append('limit', 100);
    params.append('refine', 'equip_aps_nom:Basket-Ball');
    params.append('refine', 'equip_nature:Découvert');
    params.append('where', `within_distance(coordonnees, GEOM'POINT(${longitude} ${latitude})', 10km)`);

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
            cp: record.inst_cp,
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
    const courtsList = document.getElementById('courts-list'); // Assurez-vous d'avoir un élément avec cet ID dans votre HTML
    courtsList.innerHTML = '';

    // Supprimer les marqueurs existants
    courtsMarkers.forEach(marker => map.removeLayer(marker));
    courtsMarkers = [];

    courts.forEach(court => {
        const courtItem = document.createElement('li');
        courtItem.textContent = `${court.name} - Accès Libre : ${court.access} - Code Postal : ${court.cp}`;
        courtsList.appendChild(courtItem);

        // Ajouter un marqueur sur la carte pour chaque terrain de basket-ball
        const marker = L.marker([court.latitude, court.longitude])
            .bindPopup(`${court.name} - Accès Libre : ${court.access} - Code Postal : ${court.cp}`)
            .addTo(map);

        courtsMarkers.push(marker);
    });
}

function updateBasketballCourts(latitude, longitude) {
    // Appel de la fonction pour obtenir les terrains de basket-ball
    getBasketballCourts(latitude, longitude);
}



