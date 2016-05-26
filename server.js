var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('updateMessage', function(message) {
        console.log("Message updated : " + message.text);
        io.emit('updateMessage', message);
    });
});

app.use(express.static(__dirname + "/client"));

http.listen(8080, function() {
    console.log('listening on *:8080');
});
