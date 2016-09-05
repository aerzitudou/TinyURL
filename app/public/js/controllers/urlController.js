var app = angular.module('tinyurlApp');

app.controller("urlController",
    ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
        $http.get("/rest/urls/" + $routeParams.shortUrl)

                .success(function (data) {
                    $scope.shortUrl = data.shortUrl;
                    $scope.longUrl = data.longUrl;
                });
        $http.get("/rest/urls/" + $routeParams.shortUrl + "/totalClicks")
            .success(function (data) {
                $scope.totalClicks = data;
            });

        var renderChart = function (chart, infos) {
            $scope[chart + 'Labels'] = [];
            $scope[chart + 'Data'] = [];
            $http.get("/rest/urls/" + $routeParams.shortUrl + "/" + infos)
                .success(function (data) {
                    console.log("data" + data);
                    data.forEach(function (info) {
                        $scope[chart + 'Labels'].push(info._id);
                        $scope[chart + 'Data'].push(info.count);
                    });
                });

        }

        renderChart("pie", "referer");

    }]);