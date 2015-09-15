class SitemapController < ApplicationController
	respond_to :xml

	def index
		@posts = Post.order(created_at: :desc)

		@host = Rails.env.development? ? 'http://localhost' + request.port_string + '/#!/' : \
		'http://' + request.domain + '/#!/'
	end
end