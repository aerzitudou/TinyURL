var app = angular.module('tinyurlApp');

app.controller("urlController",
    ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
        $scope.submit = function () {
            console.log("in urlContoller");
            $http.get("/rest/urls/" + $routeParams.shortUrl)

                .success(function (data) {
                    $scope.shortUrl = data.shortUrl;
                    $scope.shortUrl = data.longUrl;
                });
        }
    }]);