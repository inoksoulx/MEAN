app.controller("friendController", function(
  $scope,
  $location,
  $http,
  socket,
  $routeParams
) {
   var req = {
    method: "POST",
    url: "users/allusers",
    headers: {
      "Content-Type": "application/json"
    },
    data: { id: (_id = JSON.parse(localStorage.getItem("user")).id) }
  };

  $scope.users = [];

  $http(req).then(function(res) {
    $scope.users = res.data.users
  });

  console.log($routeParams);

  socket.emit("online", 'id');
  socket.on("online", function(id) {
    console.log(id);
  });

  $scope.openFriendProfile = function(user) {
    console.log(user);
  }

  $scope.pathToHome = function($event) {
    $location.path($location.url().slice(0, -8));
    $event.preventDefault();
  };
});
