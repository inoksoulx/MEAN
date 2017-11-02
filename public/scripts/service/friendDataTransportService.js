app.factory("friendDataTransportService", function() {
  var friendData;

  return {
    setData: function(data) {
      friendData = data;
      localStorage.setItem('friendData', JSON.stringify(friendData));
    },
    getData: function() {
      console.log(friendData);
      return friendData ? friendData : JSON.parse(localStorage.getItem('friendData'));
    },
  };
});
