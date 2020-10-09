Rails.application.routes.draw do
  get '/trainers', to: 'trainers#index'
  get '/trainers/:id', to: 'trainers#show'

  get '/pokemons', to: 'pokemons#index'
  post '/pokemons/', to: 'pokemons#create'
  delete '/pokemons/:id', to: 'pokemons#destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
