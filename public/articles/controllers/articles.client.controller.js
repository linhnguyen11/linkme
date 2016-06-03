angular.module('articles').controller('ArticlesController', ['$rootScope','$scope','$routeParams', '$location', 'Authentication', 'Articles','Upload', '$timeout','$http',
    function($rootScope, $scope, $routeParams, $location, Authentication, Articles, Upload, $timeout, $http)
    {
        $scope.authentication = Authentication;
        $scope.create = function(file,iptitle,ipcontent,ipcategory) {
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
                     var article = new Articles({
                        title: iptitle,
                        content: ipcontent,
                        category: ipcategory,
                        imageurl:  response.data.files[0].url,
                        deleteurl: response.data.files[0].deleteUrl
                    });
                    article.$save(function(response) {
                        $location.path('articles/' + response._id);
                    }, function(errorResponse) {
                        $scope.error = errorResponse.data.message;
                    });
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

        };
        $scope.find = function() {
            $scope.articles = Articles.query();
            $scope.quantity = 50;
        };
        $scope.addmore = function(){
            $scope.quantity += 50;
        }
        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $routeParams.articleId
            });

        };
        $scope.update = function() {
            $scope.article.$update(function() {
                $location.path('articles/' + $scope.article._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        }
        $scope.test1 = function(article) {
         }
        $scope.delete = function(article) {

            $http.delete($scope.article.deleteurl);
            if (article) {
                article.$remove(function() {
                    for (var i in $scope.articles) {
                        if ($scope.articles[i] === article) {
                            $scope.articles.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.article.$remove(function() {
                    $location.path('articles');
                });
            }
        };
    }
]);
