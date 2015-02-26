Rails.application.routes.draw do

  root 'home#index'
  get '/robots.txt' => 'home#robots'

end
