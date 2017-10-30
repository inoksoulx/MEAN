app.factory('socket', function() {
    var socket = io( 'localhost:8080', {'transports': ['websocket', 'polling']});

    return {
        on: function(eventName, callback){
            socket.on(eventName, callback);
        },
        emit: function(eventName, data) {
            socket.emit(eventName, data);
        }
    };
});