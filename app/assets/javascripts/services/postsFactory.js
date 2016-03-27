angular.module('arBlog')
.factory('postsFactory',['$http','$rootScope' ,function($http,$rootScope){
	var o = { posts: [] };

	o.getAll = function(){
		return $http.get('/posts.json').success(function(data){
			angular.copy(data, o.posts);
		});
	};

	o.get = function(slug){
		return $http.get('/posts/' + slug + '.json').then(function(res){
			return res.data;
		});
	};

	o.create = function(post){
		return $http.post('/posts.json', post).then(function(data){
			o.posts.push(data);
		}, function(e) {
			$rootScope.$broadcast('unauthorizedAction',{errorMessage: e.data.error});
			console.log(e);
		});
	};

	o.update = function(post){
		return $http.put('/posts/' + post.prevSlug + '.json', post).then(function(res){
			return res.data;
		}, function(e) {
			$rootScope.$broadcast('unauthorizedAction',{errorMessage: e.data.error});
			console.log(e);
		});
	};

	o.delete = function(post){
		return $http.delete('/posts/' + post.slug + '.json').then(function(){
			return o.getAll();
		}, function(e) {
			$rootScope.$broadcast('unauthorizedAction',{errorMessage: e.data.error});
			console.log(e);
		});
	};

	return o;
}])