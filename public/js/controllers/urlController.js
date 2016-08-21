var app = angular.module('tinyurlApp');

app.controller("urlController",
    ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
        $http.get("/rest/urls/" + $routeParams.shortUrl)

                .success(function (data) {
                    $scope.shortUrl = data.shortUrl;
                    $scope.longUrl = data.longUrl;
                });

    }]);