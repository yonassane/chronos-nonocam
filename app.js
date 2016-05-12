var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('updateMessage', function(message) {
        console.log("Message updated : " + message);
        io.emit('updateMessage', message);
    });
});

app.get('/master', function(req, res) {
    res.sendFile( __dirname + '/master.html' );
});

app.get('/slave', function(req, res) {
    res.sendFile( __dirname + '/slave.html' );
});

app.get('/history', function(req, res) {
    res.sendFile( __dirname + '/history.html' );
});

http.listen(8080, function(){
    console.log('listening on *:8080');
});
