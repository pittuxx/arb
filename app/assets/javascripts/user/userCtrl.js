angular.module('arBlog')
.controller('UserCtrl', [
	'$scope',
	'Auth',
	'$http',
	function($scope,Auth,$http) {

		Auth.currentUser().then(function(user){
			$scope.user = user;
		});

		$scope.updatePassword = function(){

			return $http({
				method: 'PUT',
				url: '/users.json',
				data: {
					user: {
						password: $scope.userPassword.password,
						password_confirmation: $scope.userPassword.password_confirmation,
						current_password: $scope.userPassword.current_password
					},
				}
			}).then(function(res){
				$scope.userPassword = {};
				return res.data;
			});
		};

		$scope.updateEmail = function(){

			return $http({
				method: 'PUT',
				url: '/users.json',
				data: {
					user: {
						email: $scope.userEmail.email,
						current_password: $scope.userEmail.current_password
					},
				}
			}).then(function(res){
				$scope.userEmail = {};
				return res.data;
			});
		};
}])