class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons, include: [:trainer], except: [:created_at, :updated_at]
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: pokemon_params[:trainer_id])
        render json: pokemon, include: [:trainer], except: [:created_at, :updated_at]
    end 

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        # binding.pry
        pokemon.delete
        
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:id, :species, :nickname, :trainer_id)
    end
end
