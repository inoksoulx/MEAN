app.controller("friendController", function(
  $scope,
  $location,
  $http,
  socket,
  friendDataTransportService,
  $route,
  AuthService
) {
  AuthService.getAllUsers(function(res) {
    $scope.users = res.data.users;
  });

  socket.on("onlineUsers", function(data) {
    console.log(data);
  });

  $scope.active = $route.current.$$route.activeTab;

  $scope.openFriendProfile = function(user) {
    friendDataTransportService.setData(user);
    $location.path($location.url() + "/" + user.username);
  };
});
