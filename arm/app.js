/*
** app.js for EpiCom ARM
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.net>
** 
** Started on  Mon Apr 21 18:49:51 2014 yoann mille
Last update Tue Apr 22 12:02:14 2014 
*/

var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path')
, omx = require('omxcontrol')
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
	omx.start(file);
    });
    socket.on('stop video', function () {
	console.log('[server] Emit : STOP VIDEO');
	omx.quit();
    });
    socket.on('pause video', function () {
	console.log('[server] Emit : PAUSE VIDEO');
	omx.pause();
    });
    socket.on('unpause video', function () {
	console.log('[server] Emit : UNPAUSE VIDEO');
	omx.pause();
    });

    /************************************/
    /*		Presentation		*/
    /************************************/
    socket.on('pause presentation', function () {
	console.log('[server] Emit : PAUSE PRESENTATION');
	ioPres.sockets.emit('pause');
    });
});