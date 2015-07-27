class SessionsController < Devise::SessionsController
	#code for fixing 422 error in Devise with Angularjs
	#more info: https://technpol.wordpress.com/2014/04/17/rails4-angularjs-csrf-and-devise/
	after_action :set_csrf_headers, only: [:create,:destroy]

	protected
	def set_csrf_headers
		cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
	end
end