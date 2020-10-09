class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        render json: pokemons, except: [:updated_at, :created_at];
    end

    def create
        newNickname = Faker::Name.first_name
        newSpecies = Faker::Games::Pokemon.name
        newPokemon = Pokemon.create(nickname: newNickname, species: newSpecies, trainer_id: params[:trainer_id])
        render json: newPokemon # THIS WAS THE MAGIC THAT DID IT ALL !!!
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end  
end