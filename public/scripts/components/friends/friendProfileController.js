app.controller('friendProfileController', function ($scope, friendDataTransportService, $location) {
  $scope.onInit = function () {
    $scope.user = friendDataTransportService.getData();
  }

  $scope.openFriendProfile = function(user) {
    friendDataTransportService.setData(user);
    $location.path($location.url() + '/' + user.username);
  }
})