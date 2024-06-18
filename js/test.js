async function testAPI() {
  const response = await fetch('https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?limit=20');
  const json = await response.json();
  console.log(json);
}

testAPI();