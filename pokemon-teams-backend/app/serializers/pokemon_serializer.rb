class PokemonSerializer < ActiveModel::Serializer
  attributes :id, :species, :nickname

  belongs_to :trainer
end
