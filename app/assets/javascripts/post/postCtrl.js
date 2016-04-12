angular.module('arBlog')
.controller('PostCtrl',[
	'$scope',
	'postsFactory',
	'post',
	'metaService',
	'$location',
	function($scope,postsFactory,post,metaService,$location){
		//post.url = $location.url();
		$scope.post = post;
		$scope.my_markdown = post.body;
		$scope.updated = false;
		//message for showing in form
		$scope.what = 'Edit Post';

		//set meta title
		metaService.setTitle(post.title);
		//set meta description
		metaService.setDescription(post.meta_description);
		//set twitter meta tags
		metaService.setTwitterMetas(post);
		//set open graph meta tags
		metaService.setOgMetas(post);
		//set 'article:tag' meta
		metaService.setTags(post.tag_ary);
		// 
		$scope.post.prevSlug = $scope.post.slug

		//Edit post
		$scope.addOrEditPost = function(){
			postsFactory.update($scope.post);
			date = new Date();
			$scope.updated = date.toLocaleTimeString();
			$scope.post.prevSlug = $scope.post.slug
		};

		//creates error message when user is not authorized to do the action 
		$scope.$on('unauthorizedAction',function(e,data){
			$scope.errorMsg = data.errorMessage;
		});

		$scope.disqusConfig = {
	    disqus_shortname: 'pitux',
	    disqus_identifier: $location.path(),
	    disqus_url: $location.absUrl()
		};
	}
]);