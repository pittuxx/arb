angular.module('arBlog',['ui.router', 
	'templates', 
	'Devise', 
	'ngSanitize', 
	'hc.marked'
	])

.config([
	'$stateProvider',
	'$urlRouterProvider',
	'$locationProvider',
	function($stateProvider,$urlRouterProvider,$locationProvider){
		$locationProvider.html5Mode(false).hashPrefix('!');
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
			.state('tags', {
				url: '/tags/:tag',
				templateUrl: 'posts/_posts.html',
				controller: 'TagsCtrl',
				resolve: {
					postPromise: ['postsFactory','$stateParams',function(postsFactory,$stateParams){
						return postsFactory.getByTag($stateParams.tag);
					}]
				}
			})
			.state('category', {
				url: '/category/:category',
				templateUrl: 'posts/_posts.html',
				controller: 'CategoryCtrl',
				resolve: {
					postPromise: ['postsFactory','$stateParams',function(postsFactory,$stateParams){
						return postsFactory.getByCategory($stateParams.category);
					}]
				}
			})
			.state('newPost',{//Si se cambia a slug habrá que poner esta ruta encima de 'post'
				url: '/posts/new-post',
				templateUrl: 'posts/_new.html',
				controller: 'PostsCtrl',
				resolve: {
					auth: ['$q','Auth','$state',function($q,Auth,$state){
						if(!Auth.isAuthenticated()){
							//$state.go('posts');
							return $q.reject("Not Authorized");
						}
					}]
				}
			})
			.state('postEdit', {
				//url: '/posts/edit-post/{id:[0-9]{1,8}}',
				url: '/posts/edit-post/:slug',
				templateUrl: 'post/_edit.html',
				controller: 'PostCtrl',
				resolve: {
					post: ['$q',
						'Auth',
						'$stateParams',
						'postsFactory',
						function($q,Auth,$stateParams,postsFactory){
							if(!Auth.isAuthenticated()){
								return $q.reject("Not Authorized");
							}else{
								return postsFactory.get($stateParams.slug);
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
			.state('editUser', {
				url: '/user',
				templateUrl: 'user/_edit_user.html',
				controller: 'UserCtrl',
				onEnter: ['$state','Auth','$q', function($state,Auth,$q){
						if(!Auth.isAuthenticated()){
							return $q.reject("Not Authorized");
						}else{
							return $q.resolve();
						}
					}
				]
			})
			.state('form', {
				url: '/form',
				templateUrl: 'form/_form.html'
			})
			.state('post',{
				//url: '/posts/{id:[0-9]{1,8}}',
				url: '/:slug',
				templateUrl: 'post/_post.html',
				controller: 'PostCtrl',
				resolve: {
					post: ['$stateParams', 'postsFactory', function($stateParams,postsFactory){
						return postsFactory.get($stateParams.slug);
					}]
				}
			})//'post-state' must be the last not to conflict with other urls...
		//para eliminar el hastag, pero parece incompatible con otherwise()
		//$locationProvider.html5Mode(true).hashPrefix('!');
		$urlRouterProvider.otherwise('/');
	}
])

//angular.module('arBlog')
.run(['$rootScope','Auth',function($rootScope,Auth){
	//present in all the app
	//check auth outside navCtrl
	$rootScope.signedIn = Auth.isAuthenticated;
	$rootScope.logout = Auth.logout;
}])

.filter('startFromGrid', ['$rootScope',function($rootScope) {
  return function(input, start) {
    start = +start;
    return input.slice(start);
  };
}]);