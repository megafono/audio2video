Rails.application.routes.draw do
  resources :conversions, only: [:show, :create, :new]

  if Rails.env.production?
    DelayedJobWeb.use Rack::Auth::Basic do |username, password|
      username == 'admin' && password == 'oladuke123'
    end
  end

  root 'conversions#new'
end
