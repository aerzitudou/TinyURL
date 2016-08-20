var app = angular.module('tinyurlApp', ['ngRoute']); //code to control the view, get the app by calling angular.module

app.config(function ($routeProvider) {
        $routeProvider.when("/", { //"/" 实际handle的是/#/的根目录,一般的url没有#的是被Node处理的
            templateUrl: "xxx",
            controller: "xxx" //embed this page
        });
    }
); //$routeProvider就是普通的字符串,并无特殊含义