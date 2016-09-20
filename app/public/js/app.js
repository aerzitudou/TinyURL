var app = angular.module('tinyurlApp', ['ngRoute', 'ngResource', 'chart.js']); //code to control the view, get the app by calling angular.module

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { //"/" 实际handle的是/#/的根目录,一般的url没有#的是被Node处理的
            templateUrl: "./public/views/home.html",
            controller: "homeController" //embed this page
        })

        //start added for user management system
        .when('/login', {
            templateUrl: './public/views/login.html',
            controller: 'loginController'
        })
        .when('/logout', {
            controller: 'logoutController'
        })
        .when('/register', {
            templateUrl: './public/views/register.html',
            controller: 'registerController'
        })
        .when('/one', {
            template: '<h1>This is page one!</h1>'
        })
        .when('/two', {
            template: '<h1>This is page two!</h1>'
        })

        //end added for user management system
        .when("/urls/:shortUrl", {
            templateUrl: "./public/views/url.html",
            controller: "urlController"

        });
    }
); //$routeProvider就是普通的字符串,并无特殊含义

