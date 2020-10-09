const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers/`
const POKEMONS_URL = `${BASE_URL}/pokemons/`

document.addEventListener("DOMContentLoaded", () => { fetchTrainers(); });

function fetchTrainers() {
  fetch(TRAINERS_URL)
  .then(function(response) { return response.json(); }) 
  .then(function(json){ printTrainers(json); })
}

function printTrainers(trainers) {
  const mainDiv = document.querySelector("main");

  for (const trainer of trainers) {
    let newPoke = document.createElement("button"); newPoke.innerHTML = "Add Pokemon"; newPoke.setAttribute('data-trainer-id', trainer.id);
    let card = document.createElement("div"); card.className = "card"; card.setAttribute('data-id', trainer.id);
    let trainerName = document.createElement("p"); trainerName.innerHTML = trainer.name; card.appendChild(trainerName); card.appendChild(newPoke);
    let pokeList = document.createElement("ul"); card.appendChild(pokeList);

    newPoke.addEventListener("click", function(){ createPokemon(pokeList, trainer); });

    for (const pokemon of trainer.pokemons) { appendPokemon(pokemon, pokeList) }
    mainDiv.appendChild(card);
  }
}

function appendPokemon(pokemon, pokeList) {
    let pokeButt = document.createElement("button"); pokeButt.className="release"; pokeButt.innerHTML = "Release"; pokeButt.setAttribute('data-pokemon-id', pokemon.id);
    let eachPoke = document.createElement("li"); eachPoke.innerHTML = `${pokemon.nickname} (${pokemon.species}) `;
    pokeButt.addEventListener("click", function(){ deletePokemon(eachPoke, pokemon); });
    eachPoke.appendChild(pokeButt);
    pokeList.appendChild(eachPoke);
}

function createPokemon(pokeList, trainer) {
    fetch(TRAINERS_URL+trainer.id)
    .then(function(response) { return response.json(); }) 
    .then(function(trainer){ let numberOfPokemon = trainer.pokemons.length; 

        if (numberOfPokemon < 6) {
            let formData = { trainer_id: trainer.id };
            let configObj = { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(formData) };
            fetch(POKEMONS_URL, configObj).then(function(response) { return response.json() }).then(function(pokemon) { appendPokemon(pokemon, pokeList) });
        } else { alert("This trainer already has 6 Pokemon!"); }
    })
}

function deletePokemon(element, pokemon) {
    element.remove();
    fetch(POKEMONS_URL + pokemon.id, {method: 'DELETE'});
}