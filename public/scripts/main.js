var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/scripts/components/home/homeTemplate.html",
        controller: "homeController"
    })
    .when("/register", {
        templateUrl : "/scripts/components/register/registerTemplate.html",
        controller: "registerController"
    })
    .when("/profile/:id", {
        templateUrl : "/scripts/components/profile/profileTemplate.html",
        controller: "profileController"
    });
});

