Rails.application.routes.draw do

   root "posts#index"
   resources :posts, only: [:index, :show, :new, :create, :edit, :update, :destroy]
   resources :contacts, only: [:index, :create, :destroy]
   resources :to_do_lists, only: [:index, :create, :destroy]
end
