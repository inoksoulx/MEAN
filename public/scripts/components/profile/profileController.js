app.controller("profileController", function($scope, AuthService, $location) {
  $scope.authFlag = false;

  $scope.onInit = function() {
    AuthService.getUser(
      function(res) {
        $scope.user = res.data.user;
        $scope.authFlag = true;

        var socket = io();

        socket.emit("chat message", 'bau');
      },
      function(err) {
        $scope.authFlag = false;
        console.log(err);
      }
    );
  };

  $scope.navToHome = function($event) {
    $location.path("/");
    $event.preventDefault();
  };

  $scope.navToRegister = function($event) {
    $location.path("register");
    $event.preventDefault();
  };

  $scope.logOut = function($event) {
    AuthService.logOut();
    $location.path("/");

    $event.preventDefault();
  };
});
