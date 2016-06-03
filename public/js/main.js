//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadPic = function(file) {
        var fileExtension = '.' + file.name.substr((~-file.name.lastIndexOf(".") >>> 0) + 2);
        $scope.renamedFile = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
        Upload.rename(file, $scope.renamedFile);
        file.upload = Upload.upload({
            url: '/upload',
            data: {file: file, username: $scope.username}
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }
}]);