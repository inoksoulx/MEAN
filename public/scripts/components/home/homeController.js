app.controller('homeController', function ($scope, $location, AuthService, $timeout) {

  $scope.loginUser = function () {
    var user = {
      username: $scope.username,
      password: $scope.password
    }

    AuthService.loginUser(user, function (res) {
      if (res.data.success) {
        console.log(res);
        AuthService.storeDataUser(res.data.token, res.data.user);
        $timeout(function () {
          $location.path('profile/' + user.username);
        }, 1500)
      }
    })
  }
})