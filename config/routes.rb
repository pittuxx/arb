Rails.application.routes.draw do
  # post image
  match 'upload', to: 'uploads#upload', via: :post, format: :json

  match 'list-files', to: 'uploads#list_files', via: :get, format: :json

  match 'delete-file', to: 'uploads#delete_file', via: :delete, format: :json
  # REEMPLAZAR LAS / POR - EN EL STRING DE PATH PARA LUEGO RECONSTRUIR...


  # get :tag url
  get "tags/:tag", to:'posts#index', as: :tag

  # get 'sitemap/index'
  get "sitemap" => "sitemap#index", format: :xml, as: :sitemap

  #this is for fixing 422 error in Devise with Angularjs
  devise_for :users, controllers: {sessions: 'sessions'}
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root to: 'application#angular'
  resources :posts, except: [:new,:edit]

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
