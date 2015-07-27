require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :json

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?


  def angular
    render 'layouts/application'
  end

  private
  def configure_permitted_parameters
  	devise_parameter_sanitizer.for(:sign_up) << :username
  end
end
