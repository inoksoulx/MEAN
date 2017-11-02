app.controller("profileSettingsController", function(
  $scope,
  AuthService,
  $route
) {
  $scope.sendDataUser = function() {
    var data = {
      firstname: $scope.firstname,
      surname: $scope.surname,
      lastname: $scope.lastname,
      info: $scope.info,
      number: $scope.number,
      id: JSON.parse(localStorage.getItem("user")).id
    };

    AuthService.sendAddData(data, function(res) {
      console.log(res);
    });
  };

  $scope.sendDataPhoto = function() {
    AuthService.sendPhotoData($scope.file, function(res) {
      console.log(res);
    });
  };

  $scope.active = $route.current.$$route.activeTab;
});
