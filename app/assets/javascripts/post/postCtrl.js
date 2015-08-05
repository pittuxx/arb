angular.module('arBlog')
.controller('PostCtrl',[
	'$scope',
	'postsFactory',
	'post',
	function($scope,postsFactory,post,$location){
		$scope.post = post;
		$scope.updated = false;
		//message for showing in form
		$scope.what = 'Edit Post';

		//EDIT post
		$scope.addOrEditPost = function(){
			postsFactory.update($scope.post);
			date = new Date();
			$scope.updated = date.toLocaleTimeString();
		};

		//creates error message when user is not authorized to do the action 
		$scope.$on('unauthorizedAction',function(e,data){
			$scope.errorMsg = data.errorMessage;
		});
	}]);