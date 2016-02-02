class Upload
	require 'fileutils'

	def save(doc)
		@document = doc
		@nombre_documento = @document.original_filename
		@extension_del_documento = File.extname(@document.path)
		if process?
			@directorio = Rails.root.join('public','images') + "#{Time.now.strftime("%Y/%m")}"
			FileUtils.mkdir_p(@directorio) unless File.directory?(@directorio)
			@directorio += "#{@nombre_documento}"

			check_and_up
		else
			return "Formato no permitido, solo puede subir archivos .png .jpg .jpeg .gif .tiff"
		end
	end


	# in a future...
	def delete(file)
		fileup = 'public' + file
		File.delete(fileup) if File.exist?(fileup)
	end

	def list
		directory = Rails.root.join('public','images')
		list = Dir.glob("#{directory}/**/*").reject { |file_path| File.directory? file_path }
		path_to_delete = Rails.root.join('public').to_s

		return {:images_url => list.map {|el| el.sub(path_to_delete, '')}}
	end

	private
	def process?
		%w(.png .jpg .jpeg .gif .tiff).include? @extension_del_documento.downcase
	end

	def check_and_up	
		unless File.exists?(@directorio)
			File.open(@directorio,"wb") {|f| f.write(@document.read) }
			
			return "Imagen subida con éxito"
		else
			return "Ya existe un archivo con ese nombre y esa extensión"
		end
	end
end
