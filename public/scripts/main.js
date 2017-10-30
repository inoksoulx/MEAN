var app = angular.module("myApp", ["ngRoute"]);

app
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/scripts/components/home/homeTemplate.html",
        controller: "homeController"
      })
      .when("/register", {
        templateUrl: "/scripts/components/register/registerTemplate.html",
        controller: "registerController"
      })
      .when("/profile/:id", {
        templateUrl: "/scripts/components/profile/profileTemplate.html",
        controller: "profileController"
      })
      .when("/profile/:id/friends", {
        templateUrl: "/scripts/components/friends/friendTemplate.html",
        controller: "friendController"
      })
      .when("/profile/:id/friends/:id", {
        templateUrl: "/scripts/components/friends/friendProfileTemplate.html",
        controller: "friendController"
      })
      .when("/error", {
        templateUrl: "/scripts/components/authError/authError.html",
        controller: "authErrorController"
      });

    $locationProvider.html5Mode(true);
  })
  .run(function($rootScope, $location, AuthService) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
      if (next.indexOf("profile") > 0) {
        AuthService.getUser(
          function(res) {
            AuthService.user = res.data.user;
          },
          function(err) {
            $location.path('/error')
            console.log(err);
          }
        );
      }
    });
  });
