app.controller('authErrorController', function ($scope, $location) {
   $scope.navToHome = function($event) {
    $location.path("/");
    $event.preventDefault();
  };

  $scope.navToRegister = function($event) {
    $location.path("register");
    $event.preventDefault();
  };
})