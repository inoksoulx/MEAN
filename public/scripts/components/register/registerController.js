app.controller('registerController', function ($scope, AuthService, $location, $timeout) {
  $scope.registerUser = function () {
    var user = {
      name: $scope.name,
      username: $scope.username,
      email: $scope.email,
      password: $scope.password,
      online: false
    }

    console.log(user);

    AuthService.registerUser(user, function (res) {
      if (res.data.success) {
        console.log('Success');
        $timeout(function () {
          $location.path('/')
        }, 3000)
      }
    })
  }
})