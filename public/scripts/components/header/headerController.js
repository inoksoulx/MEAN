app.controller("headerController", function($scope, $location, AuthService) {
  $scope.userName = JSON.parse(localStorage.getItem("user")).username;
  var _id = JSON.parse(localStorage.getItem("user")).id;

  $scope.active = $scope.$parent.active;

  $scope.pathToFriends = function($event) {
    $location.path("profile/" + $scope.userName + "/friends");
    $event.preventDefault();
  };

  $scope.pathToHome = function($event) {
    $location.path("profile/" + $scope.userName);
    $event.preventDefault();
  };

  $scope.pathToSettings = function($event) {
    $location.path("profile/" + $scope.userName + "/settings");
    $event.preventDefault();
  };

  $scope.logOut = function($event) {
    AuthService.logOut(_id);
    $location.path("/");
    $event.preventDefault();
  };
});
