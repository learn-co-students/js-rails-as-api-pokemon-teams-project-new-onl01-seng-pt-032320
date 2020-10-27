const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(event) {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(res => {
        res.forEach(trainer => {
            makeTrainercard(trainer)
        })
    })
})

// create div-container that contains a button for "add pokemon", a ul that lists element with pokemon with a release button

function makeTrainercard(trainer){
    let classcontainer = document.createElement("div")
    let addpokemonbutton = document.createElement("button")
    let addparagraph = document.createElement("p")
    let thelist = document.createElement("ul") 
    let lillist = document.createElement("li")
    let releasebutton = document.createElement("button")
    classcontainer.className = "card"
    classcontainer.setAttribute("data-id", trainer.id)
    addpokemonbutton.setAttribute("data-trainer-id", trainer.id)
    addparagraph.innerHTML = trainer.name
    addpokemonbutton.innerHTML = "Add Pokemon"
    trainer.pokemons.forEach(pokemon => {
        releasebutton.setAttribute("class", "release")
        releasebutton.setAttribute("data-pokemon-id", pokemon.id)
        lillist.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        releasebutton.innerHTML = "Release"
        lillist.appendChild(releasebutton)
        thelist.appendChild(lillist)
    })
    classcontainer.appendChild(addparagraph)
    classcontainer.appendChild(addpokemonbutton)
    classcontainer.appendChild(thelist)
    document.querySelector("main").appendChild(classcontainer)

    // "release" and "add" pokemon - event listeners with those functions
    releasebutton.addEventListener("click", removePokemon)
    //addpokemonbutton.addEventListener("click", addPokemon)
}

function removePokemon(event) {
    event.preventDefault()// something asynchronously will be done, dont refresh page
    debugger
    const pokemonId = event.target.dataset.pokemonId
    console.log("jkdsjkdksdjdjk look over here:" + event.target.dataset.pokemonId)
    let configObject = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };
    fetch(`${POKEMONS_URL}/${pokemonId}`, configObject)
    .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        console.log(object)
        removePokemonFromCard(object);
      })
      .catch(function(error) {
        console.log(error.message);
      });
    }

      function removePokemonFromCard(object) {
        const pokemonId = object.id
        console.log(pokemonId)
        bugger
        const pokemonLi = document.querySelector('[data-pokemon-id="' + pokemonId + '"]').parentNode
        console.log(pokemonLi)
        pokemonLi.parentNode.removeChild(pokemonLi)
      }

      // add pokemon event listener and function