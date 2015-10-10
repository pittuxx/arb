angular.module('arBlog')
.controller('AuthCtrl', [
	'$scope',
	'$state',
	'Auth',
	'$http',
	function($scope,$state,Auth,$http) {


		$scope.login = function(){
			Auth.login($scope.user).then(function(){
				$state.go('posts');
			});
		};

		$scope.register = function(){
			Auth.register($scope.user).then(function(){
				$state.go('posts');
			});
		};
	}])