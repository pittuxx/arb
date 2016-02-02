class UploadsController < ApplicationController

	def upload
    @upload = Upload.new

    render json: {msg: @upload.save(params[:file])}
  end

  def list_files
  	@upload = Upload.new
  	@files = @upload.list

  	render json: @files
  end

  def delete_file
  	@upload = Upload.new
  	@upload.delete(params[:path])

  	@files = @upload.list

  	render json: @files
  end

end