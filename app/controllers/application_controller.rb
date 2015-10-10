require "application_responder"

class ApplicationController < ActionController::Base
  rescue_from ActionController::InvalidAuthenticityToken, with: :invalid_authenticity_request

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

    devise_parameter_sanitizer.for(:sign_in) { |u|
      u.permit(:login, :username, :email, :password, :remember_me) 
    }

    devise_parameter_sanitizer.for(:account_update) { |u| 
      u.permit(:password, :password_confirmation, :current_password, :email) 
    }
  end

  #Clean up cookies and session on InvalidAuthenticityRequest
  def invalid_authenticity_request
    sign_out(current_user)
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
    render error: 'invalid token', status: :unprocessable_entity
  end
end
