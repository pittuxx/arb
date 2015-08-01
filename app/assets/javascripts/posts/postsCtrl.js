angular.module('arBlog')
.controller('PostsCtrl',[
	'$scope',
	'posts',
	'$window',
	function($scope,posts,$window){
		$scope.posts = posts.posts;
		//empty object that will receive form field data
		$scope.post = {};
		//message for showing in form
		$scope.what = 'New Post';
		//success msg for post created
		$scope.created = false;

		$scope.addOrEditPost = function(){
			posts.create($scope.post);
			//clear form fields
			$scope.post = {};
			$scope.created = 'Post successfuly created';
		};

		$scope.removePost = function(post){
			//confirm before delete...
			if(confirm('are you sure?')){
				posts.delete(post);
			}
		};
	}
]);