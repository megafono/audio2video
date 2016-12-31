Rails.application.routes.draw do
  resources :conversions, only: [:show, :create, :new]

  root 'conversions#new'
end
