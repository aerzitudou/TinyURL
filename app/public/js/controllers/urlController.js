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

        $scope.getTime = function (time) {
            if (time === undefined) {
                console.log("time is " + time);
                return;
            } else {
                $scope.lineLabels = [];
                $scope.lineData = [];
                $http.get("/rest/urls/" + $routeParams.shortUrl + "/" + time)
                    .success(function (data) {
                        data.forEach(function (info) {
                            var legend = '';
                            if (time === 'hour') {
                                if (info._id.minutes < 10) {
                                    info._id.minutes = '0' + info._id.minutes;
                                }
                                legend = info._id.hour + ':' + info._id.minutes;
                            } else if (time === 'day') {
                                legend = info._id.hour + ':00'
                            } else {
                                legend = info._id.month + '/' + info._id.day;
                            }
                            $scope['lineLabels'].push(legend);
                            $scope['lineData'].push(info.count);
                        });
                    });
                return;
            }


        };

        $scope.getTime('hour');

        //function as a model
        //通过scope下variable设定数据model
        //可重用的model
        var renderChart = function (chart, infos) {
            $scope[chart + 'Labels'] = [];
            $scope[chart + 'Data'] = [];
            $http.get("/rest/urls/" + $routeParams.shortUrl + "/" + infos) //infos 就是传进来的字符串
            //给后端发送的http请求实际上是referer和country
                .success(function (data) {
                    data.forEach(function (info) {
                        $scope[chart + 'Labels'].push(info._id);
                        $scope[chart + 'Data'].push(info.count);
                    });
                });

        };
        renderChart("pie", "referer");
        renderChart("doughnut", "country");
        renderChart("bar", "platform");
        renderChart("base", "browser");
    }]);