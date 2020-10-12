const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener("DOMContentLoaded", (event) => {
  fetchTrainers();
});

function fetchTrainers() {
  return fetch(TRAINERS_URL)
    .then((resp) => resp.json())
    .then((json) => renderTrainerCards(json));
}

function renderTrainerCards(trainers) {
  for (let trainer of trainers.data) {
    let pokemonList = document.createElement("ul");
    pokemonList.setAttribute("id", "pokemonList");
    let trainerName = document.createElement("p");
    let card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-id", `${trainer.id}`);
    let main = document.querySelector("main");
    main.appendChild(card);
    trainerName.innerText = `${trainer.attributes.name}`;
    let addPokemon = document.createElement("button");
    addPokemon.innerText = "Add Pokemon";
    addPokemon.setAttribute("data-trainer-id", `${trainer.id}`);
    addPokemon.addEventListener("click", (e) => {
      createNewPokemon(e, trainer);
    });
    card.appendChild(trainerName);
    card.appendChild(addPokemon);
    card.appendChild(pokemonList);
    for (let pokemon of trainer.attributes.pokemons) {
      pokemonList.appendChild(pokemonButton(pokemon.nickname, pokemon.species, pokemon.id));
    }
  }
}

function pokemonButton(nickname, species, id) {
  let newLi = document.createElement("li");
  newLi.innerText = `${nickname} (${species})`;
  let releaseButton = document.createElement("button");
  releaseButton.className = "release";
  releaseButton.setAttribute("data-pokemon-id", `${id}`);
  releaseButton.innerText = "Release";
  releaseButton.addEventListener('click', (e) => {
    releasePokemon(e)
  })
  newLi.appendChild(releaseButton);
  return newLi;
}

function createNewPokemon(e, trainer) {
  pokemonList = e.target.parentElement.querySelector("#pokemonList");
  e.preventDefault();
  return fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      trainer_id: trainer.id,
    }),
  })
    .then((resp) => resp.json())
    .then((json) => pokemonList.appendChild(pokemonButton(json.data.attributes.nickname,json.data.attributes.species,json.data.id)))
}

function releasePokemon(e) {
  let li = e.target.parentElement
  pokemon_id = e.target.getAttribute("data-pokemon-id");
  url = POKEMONS_URL + "/" + parseInt(pokemon_id,10)
  e.preventDefault();
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      pokemon_id: pokemon_id
    }),
  })
    .then((resp) => resp.json())
    .then(li.remove())
}

