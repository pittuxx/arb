xml.instruct!

xml.urlset("xmlns:xsi" => "http://www.w3.org/2001/XMLSchema-instance",
					"xsi:schemaLocation" => "http://www.sitemaps.org/schemas/sitemap/0.9 
					http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd",
					"xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9") do

	xml.url do
		xml.loc @host
		xml.changefreq('daily')
		xml.priority('1.0')
	end

	@posts.each do |post|
		xml.url do
			#xml.loc post_url(post)
			#xml.loc 'http://localhost:3000/#!/' + post.slug
			xml.loc @host + post.slug
			xml.changefreq('daily')
			xml.priority('0.6')
			xml.lastmod(post.updated_at.strftime("%Y-%m-%dT%H:%M:%S.%2N%:z"))
		end
	end

end