const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')
let teams;


function fetchTeams(){
    return fetch(`${BASE_URL}/trainers`)
        .then(function(response) {
        return response.json();
    }).then(function(json) {
        teams = json;
        renderTeams(teams);
    }).catch(function(error) {
        console.log(error.message);
    })
}


function renderTeams(teams){ 
    teams.forEach(team => {
        let divCard = document.createElement('div')
        divCard.className = 'card'
        divCard.dataset.id = team.id
        let para = document.createElement("P")
        para.innerHTML = `${team.name}`
        let addPokeButton = document.createElement('button')
        addPokeButton.setAttribute('data-trainer-id', `${team.id}`);
        addPokeButton.innerHTML = "Add Pokemon"
        let ul = document.createElement('ul')
        
        team.pokemons.forEach(pokemon => {
            let releaseButton = document.createElement('button')
            releaseButton.className = "release"
            releaseButton.innerHTML = "Release"
            releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`);
            let li = document.createElement('li')
            li.innerHTML = `${pokemon.species} (${pokemon.nickname})`
            li.appendChild(releaseButton)
            ul.appendChild(li)
            
            releaseButton.addEventListener('click', (e) => {
                e.preventDefault();
                releasePokemon(e)
            })

        })
        let divs = [para, addPokeButton, ul];
        divs.forEach(div => divCard.appendChild(div));
        main.appendChild(divCard);

        addPokeButton.addEventListener('click', (e) => {
            e.preventDefault()
            addPokemon(e) 
        })

        

    })

}

function addPokemon(e) {
    const trainerId = e.target.dataset.trainerId;
    const trainerDiv = document.querySelector(`div[data-id="${trainerId}"]`);
    const trainerDivUl = trainerDiv.querySelector("ul")
    if (trainerDivUl.children.length < 6) {
        fetch(`${BASE_URL}/pokemons`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
        body: JSON.stringify({trainer_id: trainerId})
        })
        .then(response => response.json())
        .then(json => {
            let newLi = document.createElement('li')
            newLi.innerHTML = `${json.species} (${json.nickname})`
            trainerDivUl.appendChild(newLi)
            let releaseButton = document.createElement('button')
            releaseButton.className = "release"
            releaseButton.innerHTML = "Release"
            releaseButton.setAttribute('data-pokemon-id', `${json.id}`);
            newLi.appendChild(releaseButton)
        
        })
        .catch(function(error) {
            console.log(error);
        })
    } else {
        alert("No more than 6 pokemon!")
    }
}

function releasePokemon(e) {
    const pokemonId = e.target.dataset.pokemonId
    fetch(`${BASE_URL}/pokemons/${pokemonId}`, {
    method: 'DELETE',
    })
    .then(res => res.json()) 
    .then(res => {
        e.target.parentElement.remove()
        console.log(res)
    })
        
}


document.addEventListener('DOMContentLoaded', function(){
    fetchTeams();
})