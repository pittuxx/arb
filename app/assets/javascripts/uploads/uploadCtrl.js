angular.module('arBlog')
.controller('uploadCtrl', ['$scope', 'fileUpload', '$http', function($scope, fileUpload, $http){
    
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "/upload.json";

        if(file === undefined){
        	alert("You must select a file!!!");
        } else {
        	fileUpload.uploadFileToUrl(file, uploadUrl);
        }
    };


		$scope.updateImageList = function(){
			fileUpload.listFiles().then(function(dataResponse){
				$scope.imageList = dataResponse.data.images_url;
			});
		};

		$scope.deleteImage = function(image){
			if(confirm('are you sure?')){
    		fileUpload.deleteFile(image).then(function(){
    			$scope.updateImageList();
    		});
			}
		};

		//message for successful upload
		$scope.$on('successfulUpload',function(e,obj){
			$scope.msg = obj;
		});

    
}]);