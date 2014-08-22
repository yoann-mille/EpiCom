/*
** app.js for EpiCom in /server
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue Apr 22 09:51:40 2014 yoann mille
** Last update Fri Aug 22 15:37:54 2014 yoann mille
*/

var express = require('express')
, routes = require('./libs/routes')()
, expressValidator = require('express-validator')
, http = require('http')
, io = require('socket.io')
, authentification = require('./libs/utils/authentification')
, config = require('./libs/utils/config')
, video = require('./libs/utils/video')
, presentation = require('./libs/utils/presentation')
, media = require('./libs/utils/media')
, path = require('path');

var app = express();

require('./libs/utils/status');

app.configure(function(){
    app.set('port', process.env.PORT || config.server.port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(expressValidator());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(function(req, res, next) {

	var err = req.session.error
	, msg = req.session.success;
	
	delete req.session.error;
	delete req.session.success;
	res.locals.message = '';
	if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
	if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
	
	next();
    });
    app.use(function(req, res){
	res.status(404).render('404', {title: '404'});
    });
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

/****************************************/
/*					*/
/*		Init Sockets		*/
/*					*/
/****************************************/

/* socket for administration interface */
var admSocket	= io.listen(server);

/* socket for RPI communication */
var clientio	= require('socket.io-client');
var clients	= [];

clients.push(clientio.connect(config.clients.tv1)); // TV1
clients.push(clientio.connect(config.clients.tv2)); // TV2
clients.push(clientio.connect(config.clients.tv3)); // TV3
clients.push(clientio.connect(config.clients.tv4)); // TV4
clients.push(clientio.connect(config.clients.tv5)); // TV5

clients.forEach(function (client, i, array) {
    client.on('connection', function () {
	console.log('Connection on client : ' + client);
    });
});

admSocket.set('log level', 1);


admSocket.sockets.on('connection', function (socket) {

    /************/
    /*	Video	*/
    /************/
    
    socket.on('play video', video.play.bind(null, clients));
    socket.on('stop video', video.stop.bind(null, clients));
    socket.on('pause video', video.pause.bind(null, clients));
    socket.on('unpause video', video.unpause.bind(null, clients));
    
    /********************/
    /*	Presentation	*/
    /********************/
    socket.on('play presentation', presentation.play.bind(null, clients));
    socket.on('stop presentation', presentation.stop.bind(null, clients));
    socket.on('pause presentation', presentation.pause.bind(null, clients));
    socket.on('unpause presentation', presentation.unpause.bind(null, clients));
    
    socket.on('checkPresNameExist', presentation.checkPresNameExist.bind(null, socket));
    
    socket.on('previewPres', function (media, cb) {
	app.get('/' + media, routes.previewPres);
	cb(media);
    });

    /************/
    /*	 Media	*/
    /************/
    socket.on('deleteMedia', media.deleteMedia);

    socket.on('createPlaylist', media.createPlaylist);
    
    socket.on('sentPlaylist', function (name) {
	clients.forEach(function (client, i, array) {
	    client.emit('playPlaylist', name);
	});
    });
});

/****************************************/
/*					*/
/*		Init Routes		*/
/*					*/
/****************************************/

app.get(	'/',			authentification.isLogin, routes.index);

app.get(	'/login',		routes.login);
app.post(	'/login',		authentification.trylogin, routes.index);
app.get(	'/logout',		authentification.logout);

app.get(	'/upload',		authentification.isLogin, routes.upload);
app.post(	'/upload',		authentification.isLogin, media.upload, routes.upload);

app.post(	'/playURL',		authentification.isLogin, media.playURL.bind({clients: clients}), routes.upload);

app.get(	'/presentation',	authentification.isLogin, routes.presentation);
app.post(	'/presentation',	authentification.isLogin, presentation.createPres, presentation.screenshot.bind({app: app}), routes.viewPres);
app.get(	'/updatePresentation',	authentification.isLogin, presentation.updatePresentation, routes.updatePresentation);
app.post(	'/updatePresentation',	authentification.isLogin, presentation.deletePres, presentation.createPres, presentation.screenshot.bind({app: app}), routes.viewPres);

app.get(	'/media',		authentification.isLogin, media.readDirMini, media.readDirImages, media.readDirVideo, media.readDirPlaylist, media.readFilePlaylist, routes.media);

app.get(	'/playlist',		authentification.isLogin, media.readDirVideo, routes.playlist);

app.get(	'/updatePlaylist',	authentification.isLogin, media.readDirVideo, media.readFileUpdatePlaylist, routes.playlist);
