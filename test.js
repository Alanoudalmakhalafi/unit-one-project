
const recipes = localStorage.getItem("recipes");

if (!!pokemons) {
  console.log("Getting pokemons from local storage");
  displayPokemons(JSON.parse(pokemons));
} else {
  fetch("https://pokeapi.co/api/v2/pokemon")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      localStorage.setItem("pokemons", JSON.stringify(json.results));
      displayPokemons(json.results);
    });
}