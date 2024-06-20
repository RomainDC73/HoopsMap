export function getBasketballCourts(location, radius) {
  const apiUrl = `https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?q=&rows=100&facets=codedepartement&facets=coderegion&facets=codeactivite&refine.codeactivite=0201&geofilter.distance=${location.lat}%2C+${location.lng}%2C+${radius}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data.records)
    .catch(error => console.error('Erreur lors de la récupération des terrains de basket :', error));
}