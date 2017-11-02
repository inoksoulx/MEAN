app.controller("profileController", function(
  $scope,
  AuthService,
  $route,
  socket
) {
  $scope.user = [];
  
  $scope.onInit = function() {
    AuthService.getDataUser(function (res) {
      $scope.user = res.data.user;
      socket.emit('online', $scope.user._id);
      if (Object.keys($scope.user).length < 7) {
        $scope.fullInfoFlag = true;
      } else {
        $scope.fullInfoFlag = false;
      }
    })
  };

  socket.on('onlineUsers', function (data) {
    console.log(data);
  })


  $scope.active = $route.current.$$route.activeTab;
});
