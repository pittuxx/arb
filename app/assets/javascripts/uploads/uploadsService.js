angular.module('arBlog')
.service('fileUpload', ['$http','$rootScope', function ($http,$rootScope) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            // it works without this option...
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(obj){
        	//console.log(obj.msg);
            //alert(obj.msg);
            //return obj;
            $rootScope.$broadcast('successfulUpload',obj.msg);
        })
        .error(function(e){
            console.log(e);
        });
    }

    this.listFiles = function(){
        return $http.get('/list-files.json');
    };

    this.deleteFile = function(image){
        return $http.delete('/delete-file.json', {params: {path: image}});
    };
}]);
