var app = require('express')()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server);

server.listen(3012);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.set('log level', 1);

var clientio  = require('socket.io-client');
var client    = clientio.connect('http://10.18.207.129:4242');

client.on('connection', function (socket) {
    console.log('connection on ', socket);
});

var file = new Array("/home/pi/stage/media/videoTest.mp4", "/home/pi/stage/media/videoTest.mp4");

console.log("file : ", file);

io.sockets.on('connection', function (socket) {
    /*** Video ***/
    socket.on('play video', function () {
	console.log("button play video clicked.");
	client.emit('play video', file);
    });
    socket.on('stop video', function () {
	console.log("button stop video clicked.");
	client.emit('stop video');
    });
    socket.on('pause video', function () {
	console.log("button pause video clicked.");
	client.emit('pause video');
    });
    socket.on('unpause video', function () {
	console.log("button unpause video clicked.");
	client.emit('unpause video');
    });

    /*** Presentation ***/
    socket.on('play presentation', function () {
	console.log("button play presentation clicked.");
	client.emit('play presentation', file);
    });
    socket.on('stop presentation', function () {
	console.log("button stop presentation clicked.");
	client.emit('stop presentation');
    });
    socket.on('pause presentation', function () {
	console.log("button pause presentation clicked.");
	client.emit('pause presentation');
    });
    socket.on('unpause presentation', function () {
	console.log("button unpause presentation clicked.");
	client.emit('unpause presentation', file);
    });
});
