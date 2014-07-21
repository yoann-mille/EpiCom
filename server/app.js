/*
** app.js for EpiCom in /server
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue Apr 22 09:51:40 2014 yoann mille
** Last update Fri Jul 18 17:08:30 2014 yoann mille
*/

var express = require('express')
, routes = require('./libs/routes')()
, expressValidator = require('express-validator')
, http = require('http')
, io = require('socket.io')
, db = require('mysql-simple')
, config = require('./libs/utils/config')
, video = require('./libs/utils/video')
, presentation = require('./libs/utils/presentation')
, media = require('./libs/utils/media')
, path = require('path');

require('./libs/utils/status');

var app = express();

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
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

/* socket for administration interface */
var admSocket = io.listen(server);

/* socket for RPI communication */
var clientio  = require('socket.io-client');
var client    = clientio.connect('http://10.18.207.249:4242');

db.init(config.sql.user, config.sql.password, config.sql.database, config.sql.host);

app.get('/', routes.index);

app.get(	'/login', routes.login);

app.get(	'/upload', routes.upload);
app.post(	'/upload', media.upload, routes.upload);

app.post(	'/playURL', media.playURL.bind({client: client}), routes.upload);

app.get(	'/presentation', routes.presentation);
app.post(	'/presentation', presentation.createPres, presentation.screenshot.bind({app: app}), routes.viewPres);
app.get(	'/updatePresentation', presentation.updatePresentation, routes.updatePresentation);
app.post(	'/updatePresentation', presentation.deletePres, presentation.createPres, presentation.screenshot.bind({app: app}), routes.viewPres);

app.get(	'/media', media.list, routes.media);

app.get(	'/playlist', media.list, routes.playlist);

app.use(function(req, res){
    res.status(404).render('404', {title: '404'});
});

/*
app.get('/', routes.authentification.session, routes.index);

app.get(	'/login', routes.login);
app.post(	'/login', routes.authentification.getToken, routes.user.update, routes.user.getCurrentUser, routes.authentification.setSession);

app.get(	'/logout', routes.authentification.session, routes.authentification.unsetSession);

app.get(	'/video', routes.authentification.session, routes.video);

app.get(	'/video', routes.authentification.session, routes.presentation);
*/

client.on('connection', function () {
    console.log('Connection on client : ' + client);
});

admSocket.set('log level', 1);

admSocket.sockets.on('connection', function (socket) {
    /*** Video ***/

    socket.on('play video', video.play.bind(null, client));
    socket.on('stop video', video.stop.bind(null, client));
    socket.on('pause video', video.pause.bind(null, client));
    socket.on('unpause video', video.unpause.bind(null, client));

    /*** Presentation ***/
    socket.on('play presentation', presentation.play.bind(null, client));
    socket.on('stop presentation', presentation.stop.bind(null, client));
    socket.on('pause presentation', presentation.pause.bind(null, client));
    socket.on('unpause presentation', presentation.unpause.bind(null, client));

    socket.on('checkPresNameExist', presentation.checkPresNameExist.bind(null, socket));

    socket.on('previewPres', function (media, cb) {
	app.get('/' + media, routes.previewPres);
	cb(media);
    });
    /*** Media ***/
    socket.on('deleteMedia', media.deleteMedia);
//    socket.on('updatePresentation', presentation.updatePresentation.bind({app: app}));
});
