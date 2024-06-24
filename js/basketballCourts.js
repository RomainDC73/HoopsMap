// Fonction pour obtenir les terrains de basket-ball
async function getBasketballCourts() {
    const url = 'https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records';
    const params = new URLSearchParams({
        limit: 100,
        refine: 'equip_aps_code:[1101]',
        refine: 'equip_nature:Découvert'
    });

    try {
        const response = await fetch(`${url}?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        const data = await response.json();

        // Traitement des données
        const basketballCourts = data.records.map(record => ({
            name: record.fields.nom,
            address: record.fields.inst_nom,  // Adapté en fonction des champs de la réponse
            city: record.fields.inst_com
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

    courts.forEach(court => {
        const courtItem = document.createElement('li');
        courtItem.textContent = `${court.name} - ${court.address}, ${court.city}`;
        courtsList.appendChild(courtItem);
    });
}

// Appel de la fonction pour obtenir les terrains de basket-ball
getBasketballCourts();