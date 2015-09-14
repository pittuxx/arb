angular.module('arBlog')
.controller('PostsCtrl',[
	'$scope',
	'postsFactory',
	'metaService',
	function($scope,postsFactory,metaService){
		$scope.posts = postsFactory.posts;
		//empty object that will receive form field data
		$scope.post = {};
		//message for showing in form
		$scope.what = 'New Post';
		//success msg for post created
		$scope.created = false;
		//delete this?
		$scope.errorMsg = undefined;

		//meta title
		metaService.setTitle('Blog de mierda');
		//meta description
		metaService.setDescription('Descripción del Blog de mierda');

		//Add Post
		$scope.addOrEditPost = function(){
			postsFactory.create($scope.post);
			//clear form fields
			$scope.post = {};
			//PROBLEM created is also setted when post is not created
			$scope.created = 'Post successfuly created';
		};

		//Remove post
		$scope.removePost = function(post){
			//confirm before delete...
			if(confirm('are you sure?')){
				postsFactory.delete(post);
			}
		};

		//creates error message when user is not authorized to do the action 
		$scope.$on('unauthorizedAction',function(e,data){
			$scope.errorMsg = data.errorMessage;
		});
	}
]);