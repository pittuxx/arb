angular.module('arBlog')
	.service('metaService',['$rootScope',
		function metaTagsService($rootScope){

			this.setTitle = function(title){
				$rootScope.title = title;
			}

			this.setDescription = function(description){
				$rootScope.description = description;
			}

			this.setTwitterMetas = function(postObject) {
				$rootScope.twitterMetas = {
					'twitter:card': 'summary',
					'twitter:site': '@yourprofile',
					'twitter:title': postObject.title,
					'twitter:description': postObject.meta_description,
					'twitter:url': 'path url',
					'twitter:image': 'url de la imagen en postObject'
				}
			}

			this.setOgMetas = function(postObject){
				$rootScope.ogMetas = {
					'og:title': postObject.title,
					'og:type': "article",
					'og:url': "path url",
					'og:image': "url de la imagen",
					'og:description': postObject.meta_description,
					'og:site_name': "Blog de Mierda",
					'article:published_time': postObject.created_at,
					'article:modified_time': postObject.updated_at,
					'article:tag': "hacer un each",
					'fb:admins': "Facebook numberic ID"
				}
			}

		}])