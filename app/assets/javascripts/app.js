angular.module('arBlog',['ui.router', 'templates', 'Devise'])

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
					postPromise: ['postsFactory', function(postsFactory){
						return postsFactory.getAll();
					}]
				}
			})
			.state('post',{
				url: '/posts/{id:[0-9]{1,8}}',
				templateUrl: 'post/_post.html',
				controller: 'PostCtrl',
				resolve: {
					post: ['$stateParams', 'postsFactory', function($stateParams,postsFactory){
						return postsFactory.get($stateParams.id);
					}]
				}
			})
			.state('newPost',{//Si se cambia a slug habrá que poner esta ruta encima de 'post'
				url: '/posts/new-post',
				templateUrl: 'posts/_new.html',
				controller: 'PostsCtrl',
				resolve: {
					auth: ['Auth','$state',function(Auth,$state){
						if(!Auth.isAuthenticated()){
							$state.go('posts');
						}
					}]
				}
			})
			.state('postEdit', {
				url: '/posts/edit-post/{id:[0-9]{1,8}}',
				templateUrl: 'post/_edit.html',
				controller: 'PostCtrl',
				resolve: {
					post: ['Auth',
						'$state',
						'$stateParams',
						'postsFactory',
						function(Auth,$state,$stateParams,postsFactory){
							if(!Auth.isAuthenticated()){
								$state.go('posts');
							}else{
								return postsFactory.get($stateParams.id);
							}
						}
					]
				}
			})
			.state('login', {
				url: '/login',
				templateUrl: 'auth/_login.html',
				controller: 'AuthCtrl',
				//onEnter onExit change for reducing post petitions... will work?
				onEnter: ['$state', 'Auth', function($state,Auth){
					Auth.currentUser().then(function(){
						$state.go('posts');
					})
				}]
			})
			.state('register', {
				url: '/register',
				templateUrl: 'auth/_register.html',
				controller: 'AuthCtrl',
				//onEnter onExit change for reducing post petitions... will work?
				onEnter: ['$state','Auth',function($state,Auth){
					Auth.currentUser().then(function(){
						$state.go('posts');
					})
				}]
			})
		//para eliminar el hastag, pero parece incompatible con otherwise()
		//$locationProvider.html5Mode(true).hashPrefix('!');
		$urlRouterProvider.otherwise('/');
	}
])

//angular.module('arBlog')
.run(['$rootScope','Auth',function($rootScope,Auth){
	//present in all the app
	$rootScope.signedIn = Auth.isAuthenticated;
	$rootScope.logout = Auth.logout;
}])