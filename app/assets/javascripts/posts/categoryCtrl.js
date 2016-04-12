angular.module('arBlog')
.controller('CategoryCtrl',[
	'$scope',
	'postsFactory',
	'metaService',
	'marked',
	'$stateParams',
	function($scope,postsFactory,metaService,marked,$stateParams){
		$scope.posts = postsFactory.posts;

		$scope.resume = function(body){
			//console.log(body);
			return body.split(/\s+/).slice(0,10).join(" ") + "...";
		};
		$scope.renderText = function(text){
			return marked(text);
		};

		//meta title
		metaService.setTitle('Blog de mierda');
		//meta description
		metaService.setDescription('Descripción del Blog de mierda');
	}
]);
//incluir codigo de paginación???