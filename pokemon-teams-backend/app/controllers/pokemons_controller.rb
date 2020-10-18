class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons).to_serialized_json
    end

    def show
        pokemon = Pokemon.find_by_id(params[:id])

        if pokemon
            render json: PokemonSerializer.new(pokemon).to_serialized_json
        else
            render json: { message: 'No Pokemon found with that id' }
        end
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params["trainer_id"])

        if pokemon.save
            render json: PokemonSerializer.new(pokemon).to_serialized_json
        else
            render json: { message: "Pokemon could not be created" }
        end
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:id])

        if pokemon.destroy
            render json: PokemonSerializer.new(pokemon).to_serialized_json
        else
            render json: { message: "Pokemon could not be found" }
        end
    end
end
