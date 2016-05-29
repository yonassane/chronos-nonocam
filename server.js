var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var io          = require('socket.io')(http);
var httpAuth    = require('http-auth');
var sqlite      = require('sqlite3').verbose();

var db = new sqlite.Database('chronosNonocam.db');

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('updateMessage', function(message) {
        console.log("Message updated : " + message.text);

        db.run(
            'INSERT INTO `message` (`text`, `textColor`, `backgroundColor`, `rows`) VALUES (?, ?, ?, ?);',
            [ message.text, message.textColor, message.backgroundColor, message.rows ]
        );

        io.emit('updateMessage', message);
    });
});

var basicAuth = httpAuth.basic(
    {
        'realm': "Hu ?! Who's knocking ?!"
    },
    function(user, passwd, callback) {
        callback(user === 'nonocam' && passwd === 'ilovekawa');
    }
);

app
.get('/master', httpAuth.connect(basicAuth), express.static(__dirname + "/client/master"))
.get('/api/message/last', function(req, res) {
    db.get(
        'SELECT `text`, `textColor`, `backgroundColor`, `rows` FROM `message` ORDER BY `creationDate` DESC LIMIT 1',
        function(err, row) {
            res.send(row);
        }
    );
})
.get('/api/message/all', function() {
    db.all(
        'SELECT `text`, `textColor`, `backgroundColor`, `rows` FROM `message` ORDER BY `creationDate` ASC',
        function(err, rows) {
            res.send(rows);
        }
    );
})
.use(express.static(__dirname + "/client"));


http.listen(8080, function() {
    console.log('listening on *:8080');
});
