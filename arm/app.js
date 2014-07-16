/*
** app.js for EpiCom /arm
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.net>
** 
** Started on  Mon Apr 21 18:49:51 2014 yoann mille
** Last update Wed Jul 16 11:02:03 2014 yoann mille
*/

var express = require('express')
, routes = require('./libs/routes')
, http = require('http')
, path = require('path')
, vlc = require('./libs/utils/vlcControler')
, io = require("socket.io");

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

var ioPres = io.listen(server);

ioPres.sockets.on('connection', function (socket) {
});

var ioServer = io.listen(4242);

ioServer.set('log level', 1);
ioServer.sockets.on('connection', function (socket) {
    console.log('connection');
    /****************************/
    /*		Video		*/
    /****************************/
    socket.on('play video', function (file) {
	console.log('[server] Emit : PLAY VIDEO\n\tFILE : ', file);
	vlc.launch(file);
    });
    socket.on('stop video', function () {
	console.log('[server] Emit : STOP VIDEO');
	vlc.quit();
    });
/*    socket.on('pause video', function () {
	console.log('[server] Emit : PAUSE VIDEO');
	vlc.pause();
    });
    socket.on('unpause video', function () {
	console.log('[server] Emit : UNPAUSE VIDEO');
	vlc.pause();
    });*/

    /************************************/
    /*		Presentation		*/
    /************************************/
    socket.on('pause presentation', function (file) {
	console.log('[server] Emit : PAUSE PRESENTATION');
	ioPres.sockets.emit('pause');
    });
    socket.on('unpause presentation', function () {
	console.log('[server] Emit : UNPAUSE PRESENTATION');
	ioPres.sockets.emit('unpause');
    });
    socket.on('play presentation', function (file) {
	console.log('[server] Emit : PLAY PRESENTATION ' + file);
	vlc.quit();
	app.get('/' + file, routes.presentation);
	ioPres.sockets.emit('play', file);
    });
    socket.on('stop presentation', function () {
	console.log('[server] Emit : STOP PRESENTATION');
	//	ioPres.sockets.emit('pause');
    });
});
