const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener("DOMContentLoaded", () => {
    // Declare variables
    const pokemonTeamsContainer = document.querySelector("main");

    // Functions
    function addPokemon() {
        const pokemonButtons = document.querySelectorAll(".add-pokemon");

        pokemonButtons.forEach(button => {
            button.addEventListener("click", () => {
                const trainerID = button.getAttribute('data-trainer-id');
                const pokemonCount = button.parentElement.querySelector("ul").childElementCount

                if (pokemonCount < 6) {
                    updatePokemon(trainerID, button.parentElement);
                }
            })
        })
    }

    function updatePokemon(trainerID, teamContainer) {
        configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                trainer_id: trainerID
            })
        }

        fetch(POKEMONS_URL, configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(object) {
            const pokemonList = teamContainer.querySelector(".pokemon-list");
            const addListItem = document.createElement("LI");
            const releaseButton = document.createElement("BUTTON");

            releaseButton.classList.add("release");
            releaseButton.setAttribute("data-pokemon-id", object.id);
            releaseButton.innerText = "Release";

            addListItem.innerHTML = `${object.nickname} (${object.species}) `;
            addListItem.appendChild(releaseButton);
            pokemonList.appendChild(addListItem);
            setTimeout(function() {
                releasePokemon();
            }, 1000);
        })
    }

    function releasePokemon() {
        const releaseButtons = document.querySelectorAll(".release");

        releaseButtons.forEach(button => {
            button.addEventListener("click", () => {
                const pokemonID = button.getAttribute("data-pokemon-id");
                deletePokemon(pokemonID)
                button.parentElement.remove();

            })
        })
    }

    function deletePokemon(pokemonID) {
        configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pokemon_id: pokemonID
            })
        }

        fetch(`${POKEMONS_URL}/${pokemonID}`, configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(object) {
            return object;
        })
    }

    function newPokemonTeamCard(teamData) {
        const newCard = document.createElement("DIV");
        const teamOwner = document.createElement("P");
        const addPokemon = document.createElement("BUTTON");
        const pokemonList = document.createElement("UL");

        newCard.classList.add("card");
        newCard.setAttribute("data-id", teamData.id);

        addPokemon.setAttribute("data-trainer-id", teamData.id);
        addPokemon.classList.add("add-pokemon");
        addPokemon.innerHTML = "Add Pokemon";

        pokemonList.classList.add("pokemon-list");

        teamOwner.innerHTML = teamData.name;
        teamData["pokemons"].forEach(pokemon => {
            const addListItem = document.createElement("LI");
            const releaseButton = document.createElement("BUTTON");

            releaseButton.classList.add("release");
            releaseButton.setAttribute("data-pokemon-id", pokemon.id);
            releaseButton.innerText = "Release";

            addListItem.innerHTML = `${pokemon.nickname} (${pokemon.species}) `;
            addListItem.appendChild(releaseButton);
            pokemonList.append(addListItem); 
        })

        newCard.appendChild(teamOwner);
        newCard.appendChild(addPokemon);
        newCard.appendChild(pokemonList);
        pokemonTeamsContainer.append(newCard);
    }

    // Use this for the pokemonCount: querySelector("ul").childElementCount

    fetch(TRAINERS_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
        object.forEach(team => {
            newPokemonTeamCard(team);
        })
        addPokemon();
    })

    setTimeout(addPokemon(), 1000);

    setTimeout(function() {
        releasePokemon();
    }, 1000)
});
