angular.module('arBlog')
.controller('PostsCtrl',[
	'$scope',
	'posts',
	function($scope,posts){
		$scope.posts = posts.posts;
		//empty object that will receive form field data
		$scope.post = {};
		//message for showing in form
		$scope.what = 'New Post';
		//success msg for post created
		$scope.created = false;
		//
		$scope.errorMsg = undefined;

		//Add Post
		$scope.addOrEditPost = function(){
			posts.create($scope.post);
			//clear form fields
			$scope.post = {};
			//PROBLEM created is also setted when post is not created
			$scope.created = 'Post successfuly created';
		};

		$scope.removePost = function(post){
			//confirm before delete...
			if(confirm('are you sure?')){
				posts.delete(post);
			}
		};

		//creates error message when user is not authorized to do the action 
		$scope.$on('unauthorizedAction',function(e,data){
			$scope.errorMsg = data.errorMessage;
		});
	}
]);