Rails.application.routes.draw do

  root 'home#index'
  get '/robots.txt' => 'home#robots'
  post 'subscribe' => 'home#subscribe'
  post 'email' => 'emails#create'

end
