angular.module('arBlog')
.controller('PostsCtrl',[
	'$scope',
	'postsFactory',
	'metaService',
	'marked',
	function($scope,postsFactory,metaService,marked){
		$scope.posts = postsFactory.posts;
		//console.log($scope.posts);
		//empty object that will receive form field data
		$scope.post = {};
		//message for showing in form
		$scope.what = 'New Post';
		//success msg for post created
		$scope.created = false;
		//delete this?
		$scope.errorMsg = undefined;
		//resume few words for post list
		$scope.resume = function(body){
			return body.split(/\s+/).slice(0,10).join(" ") + "...";
		};

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

		$scope.renderText = function(text){
			return marked(text);
		};

		//Code for Pagination
		$scope.currentPage = 0;
		$scope.pageSize = 3;
		$scope.pages = [];

		$scope.configPages = function(){
			$scope.pages.length = 0;
			var inicio = $scope.currentPage - 4;
			var fin = $scope.currentPage - 5;
			var postsPerPage = Math.ceil($scope.posts.length / $scope.pageSize);

			if (inicio < 1) {
				inicio = 1;
				if (postsPerPage > 10) {
					fin = 10;
				} else {
					fin = postsPerPage;
				}
			} else {
				if (inicio >= postsPerPage - 10) {
					inicio = postsPerPage - 10;
					fin = postsPerPage;
				}
			}

			if (inicio < 1) {
				inicio = 1
			};

			for (var i = inicio; i <= fin; i++) {
				$scope.pages.push({no: i});
			}

			if ($scope.currentPage >= $scope.pages.length){
				$scope.currentPage = $scope.pages.length - 1;
			}
		};

		$scope.setPage = function(index) {
			$scope.currentPage = index - 1;
		};

		$scope.goBack = function(){
			if ($scope.currentPage === 0) {
				return;
			} else {
				$scope.currentPage -= 1;
			}
		};

		$scope.goForward = function(){
			if ($scope.currentPage >=  $scope.posts.length/$scope.pageSize - 1) {
				return;
			} else {
				$scope.currentPage += 1;
			}
		};

		$scope.configPages();
		//End pagination
	}
])
