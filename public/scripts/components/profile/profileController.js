app.controller("profileController", function(
  $scope,
  AuthService,
  $location,
  $http
) {
  $scope.onInit = function() {
    $scope.user = AuthService.user;
  };

  $scope.pathToFriens = function($event) {
    $location.path($location.url() + "/friends");
    $event.preventDefault();
  };

  $scope.pathToHome = function($event) {
    $location.path($location.url().slice(0, -8));
    $event.preventDefault();
  };

  $scope.logOut = function($event) {
    AuthService.logOut($scope.user.id);
    $location.path("/");

    $event.preventDefault();
  };
});
