var app = angular.module('tinyurlApp');

app.controller("homeController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $scope.submit = function () {
        //拿到inbox的值
        $http.post(
            "rest/urls", {
                longUrl: $scope.longUrl
            })
            .success(function (data) {
                $location.path("/urls/" + data.shortUrl); //当你返回结果时,请跳转到这个页面,后面直接跟我的shortUrl
            });
    }
}]);