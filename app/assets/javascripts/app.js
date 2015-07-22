angular.module('arBlog',['ui.router', 'templates'])

.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider,$urlRouterProvider){
		$stateProvider
			.state('posts', {
				url: '/',
				templateUrl: 'posts/_posts.html',
				controller: 'PostsCtrl',
				resolve: {
					postPromise: ['posts', function(posts){
						return posts.getAll();
					}]
				}
			})
			.state('post',{
				url: '/posts/{id:[0-9]{1,8}}',
				templateUrl: 'post/_post.html',
				controller: 'PostCtrl',
				resolve: {
					post: ['$stateParams', 'posts', function($stateParams,posts){
						return posts.get($stateParams.id);
					}]
				}
			})
			.state('newPost',{//Si se cambia a slug habrá que poner esta ruta encima de 'post'
				url: '/posts/new-post',
				templateUrl: 'posts/_new.html',
				controller: 'PostsCtrl'
			})

			.state('postEdit', {
				url: '/posts/edit-post/{id:[0-9]{1,8}}',
				templateUrl: 'post/_edit.html',
				controller: 'PostCtrl',
				resolve: {
					post: ['$stateParams', 'posts', function($stateParams,posts){
						return posts.get($stateParams.id);
					}]
				}
			})
			//.state('removePost',{
			//	url: '/posts/remove/{id:[0-9]{1,8}}',
			//	controller: 'PostsCtrtl'
			//})		
		//para eliminar el hastag, pero parece incompatible con otherwise()
		//$locationProvider.html5Mode(true).hashPrefix('!');
		$urlRouterProvider.otherwise('/');
	}
])