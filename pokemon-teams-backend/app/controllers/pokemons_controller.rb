
class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find(params[:trainer_id])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id] )
        render json: pokemon
    end

    def destroy 
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: pokemon
    end 

    private 
    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end 

end
