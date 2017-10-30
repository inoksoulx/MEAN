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
      localStorage.setItem("_id.token", token);
      localStorage.setItem("user", JSON.stringify(user));

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
