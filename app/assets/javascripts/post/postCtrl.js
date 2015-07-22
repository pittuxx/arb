angular.module('arBlog')
.controller('PostCtrl',[
	'$scope',
	'posts',
	'post',
	function($scope,posts,post,$location){
		$scope.post = post;
		$scope.updated = false;
		$scope.what = 'Edit Post';

		$scope.addOrEditPost = function(){
			posts.update($scope.post);
			date = new Date();
			$scope.updated = date.toLocaleTimeString();
		};
	}]);