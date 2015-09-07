angular.module('arBlog')
.controller('NavCtrl', [
	'$scope',
	'Auth',
	'$http',
	function($scope,Auth,$http){
		//now is defined in '.run'
		$scope.signedIn = Auth.isAuthenticated;
		//$scope.logout = Auth.logout;
		$scope.logout = function() {
        Auth.logout().then(function(oldUser) {
          $http.delete('/users/sign_out.json').
          	then(function(response){
          		console.log(response);
          	},function(response){
          		console.log('error: '+response);
          	});
          alert("Successfully logged out!");
        }, function(error) {
          console.log(error);
        });
      }

		Auth.currentUser().then(function(user){
					$scope.user = user;
				});

		$scope.$on('devise:new-registration', function(e,user){
			$scope.user = user;
		});

		$scope.$on('devise:login', function(e,user){
			$scope.user = user;
		});

		$scope.$on('devise:logout', function(e,user){
			$scope.user = {};
		});
	}])