// *********** constants ***************** //

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener( "DOMContentLoaded", () => {
    getTeams()
})

function getTeams() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(teams => {
        createTeamsList(teams)
    })
}

function createTeamsList(teams) {
    teams.forEach(team => {
       const div = document.createElement("div")
       div.className = "card"
       div.dataset.id = team.id
       const pTag = document.createElement("p")
       pTag.innerHTML = `${team.name}`
       const addPokemon = document.createElement("button")
       addPokemon.innerHTML = "Add Pokemon"
       addPokemon.setAttribute('data-trainer-id', `${team.id}`)
       const ul = document.createElement("ul")
       div.appendChild(addPokemon)
       div.appendChild(pTag)
    

       team.pokemons.forEach(pokemon => {
           const li = document.createElement("li")
           li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
           const release = document.createElement("button")
           release.className = "release"
           release.setAttribute = ("data-pokemon-id", `${pokemon.id}`)
           release.innerHTML = "Release"
           li.appendChild(release)
           ul.appendChild(li)
           div.appendChild(ul)
           main.appendChild(div)

           release.addEventListener('click', (event) => {
            event.preventDefault();
            releasePokemon(event)
        })

    })
    addPokemon.addEventListener('click', (event) => {
        event.preventDefault()
        addNewPokemon(event) 
    })
})

}
       function addNewPokemon(event) {
          event.preventDefault()

          const trainerId = event.target.dataset.trainerId;
          const trainerDiv = document.querySelector(`div[data-id="${trainerId}"]`);
          const trainerDivUl = trainerDiv.querySelector("ul")
          if (trainerDivUl.children.length < 6) {
              fetch(`${POKEMONS_URL}`, {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                  },
              body: JSON.stringify({trainer_id: trainerId})
                })
              .then(response => response.json())
              .then(pokemon => console.log(pokemon))
            //       
            //       const addedLi = document.createElement('li')
            //       addedLi.innerHTML = `${pokemon.nickname} (${pokemon.species})`
            //       trainerDivUl.appendChild(addedLi)
            //       const newRelease = document.createElement('button')
            //       newRelease.className = "release"
            //       newRelease.innerHTML = "Release"
            //       newRelease.setAttribute('data-pokemon-id', `${pokemon.id}`);
            //       addedLi.appendChild(newRelease)
              
            //      })
                 .catch(function(error) {
                  console.log(error);
              })
                
             } else {
              alert("You can only have 6 Pokemon at a time.")
          }
        }

      function releasePokemon(event) {
        const pokemonId = event.target.dataset.pokemonId
        fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: 'DELETE',
        })
        .then(response => response.json()) 
        .then(response => {
            event.target.parentElement.remove()
            console.log(response)
        })     
    }
