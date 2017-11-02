app.factory("AuthService", function($http) {
  return {
    registerUser: function(user, cb) {
      var req = {
        method: "POST",
        url: "users/register",
        headers: {
          "Content-Type": "application/json"
        },
        data: user
      };

      return $http(req).then(cb);
    },

    loginUser: function(user, cb) {
      var req = {
        method: "POST",
        url: "users/authenticate",
        headers: {
          "Content-Type": "application/json"
        },
        data: user
      };

      return $http(req).then(cb);
    },

    sendAddData: function(data, cb) {
      var req = {
        method: "POST",
        url: "users/addinfo",
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      };

      return $http(req).then(cb);
    },

    sendPhotoData: function(file, cb) {
      var id = JSON.parse(localStorage.getItem("user")).id;
      var df = new FormData();
      df.append("file", file);
      df.append("id", id);

      return $http
        .post("users/uploadavatar", df, {
          headers: {
            "Content-Type": undefined
          }
        })
        .then(cb);
    },

    getAllUsers: function(cb) {
      var req = {
        method: "POST",
        url: "users/allusers",
        headers: {
          "Content-Type": "application/json"
        },
        data: { id: (_id = JSON.parse(localStorage.getItem("user")).id) }
      };

      return $http(req).then(cb);
    },

    getDataUser: function(cb) {

      var req = {
        method: "POST",
        url: "users/getuser",
        headers: {
          "Content-Type": "application/json"
        },
        data: { id: (_id = JSON.parse(localStorage.getItem("user")).id) }
      };

      return $http(req).then(cb);
    },

    loadToken: function() {
      var token = localStorage.getItem("_id.token");
      this.authToken = token;
    },

    getUser: function(successCb, errorCb) {
      this.loadToken();

      headers = {
        Authorization: this.authToken
      };

      return $http
        .get("users/profile", { headers: headers })
        .then(successCb, errorCb);
    },

    storeDataUser: function(token, user) {
      var storageData = {
        id: user._id,
        username: user.username
      };

      localStorage.setItem("_id.token", token);
      localStorage.setItem("user", JSON.stringify(storageData));

      this.authToken = token;
      this.user = user;
    },

    logOut: function(id) {
      var _this = this;
      var _id = id;

      var req = {
        method: "POST",
        url: "users/logout",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          id: _id
        }
      };

      $http(req).then(function() {
        _this.authToken = null;
        _this.user = null;

        localStorage.clear();
      });
    }
  };
});
