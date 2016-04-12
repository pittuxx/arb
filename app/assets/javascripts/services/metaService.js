angular.module('arBlog')
	.service('metaService',['$rootScope',function($rootScope){

			this.setTitle = function(title){
				$rootScope.title = title;
			}

			this.setDescription = function(description){
				$rootScope.description = description;
			}

			this.setTwitterMetas = function(postObject) {
				if(postObject != null){
					$rootScope.twitterMetas = {
						'twitter:card': 'summary',
						'twitter:site': '@yourprofile',
						'twitter:title': postObject.title,
						'twitter:description': postObject.meta_description,
						'twitter:url': 'http://mywebsite.com/#!/' + postObject.slug,
						'twitter:image': 'url de la imagen en postObject'
					}
				}else{
					$rootScope.twitterMetas = {}
				}
			}

			this.setOgMetas = function(postObject){
				if(postObject != null){
					$rootScope.ogMetas = {
						'og:title': postObject.title,
						'og:type': 'article',
						'og:url': 'http://mywebsite.com/#!/' + postObject.slug,
						'og:image': 'url de la imagen',
						'og:description': postObject.meta_description,
						'og:site_name': 'Blog de Mierda',
						'article:published_time': postObject.created_at,
						'article:modified_time': postObject.updated_at,
						'fb:admins': 'Facebook numberic ID'
					}
				}else{
					$rootScope.ogMetas = {}
				}
			}

			this.setTags = function(tag_ary){
				if(tag_ary != null){
					$rootScope.tags = {
						'article:tag': tag_ary
					}
				}else{
					$rootScope.tags = {}
				}
			}
		}]
	) 
