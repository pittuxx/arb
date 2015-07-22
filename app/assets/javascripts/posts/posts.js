angular.module('arBlog')
.factory('posts',['$http',function($http){
	var o = { posts: [] };

	o.getAll = function(){
		return $http.get('/posts.json').success(function(data){
			angular.copy(data, o.posts);
		});
	};

	o.get = function(id){
		return $http.get('/posts/' + id + '.json').then(function(res){
			return res.data;
		});
	};

	o.create = function(post){
		return $http.post('/posts.json', post).then(function(data){
			o.posts.push(data);
		});
	};

	o.update = function(post){
		return $http.put('/posts/' + post.id + '.json', post).then(function(res){
			return res.data;
		});
	};

	o.delete = function(post){
		return $http.delete('/posts/' + post.id + '.json').then(function(){
			return o.getAll();
		});
	};

	return o;
}])