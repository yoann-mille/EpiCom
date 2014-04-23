/*
** app.js for EpiCom Server
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.net>
** 
** Started on  Tue Apr 22 09:51:40 2014 yoann mille
** Last update Wed Apr 23 17:25:50 2014 yoann mille
*/

var express = require('express')
, routes = require('./libs/routes')()
, expressValidator = require('express-validator')
, video = require('./libs/utils/video')
, presentation = require('./libs/utils/presentation')
, http = require('http')
, io = require('socket.io')
, db = require('mysql-simple')
, config = require('./config')
, path = require('path');

require('./libs/utils/status');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
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

db.init(config.sql.user, config.sql.password, config.sql.database, config.sql.host);

app.get('/', routes.index);

app.get(	'/login', routes.login);
app.get(	'/video', routes.video);
app.get(	'/presentation', routes.presentation);

app.use(function(req, res){
//  res.send('what???', 404);
    res.status(404).send('404');
});

/*
app.get('/', routes.authentification.session, routes.index);

app.get(	'/login', routes.login);
app.post(	'/login', routes.authentification.getToken, routes.user.update, routes.user.getCurrentUser, routes.authentification.setSession);

app.get(	'/logout', routes.authentification.session, routes.authentification.unsetSession);

app.get(	'/video', routes.authentification.session, routes.video);

app.get(	'/video', routes.authentification.session, routes.presentation);
*/

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

/* socket for administration interface */
var admSocket = io.listen(server);

/* socket for RPI communication */
var clientio  = require('socket.io-client');
var client    = clientio.connect('http://10.18.207.129:4242');

/* files for tests */
var file = new Array("/home/pi/stage/media/videoTest.mp4", "/home/pi/stage/media/videoTest.mp4");

admSocket.sockets.on('connection', function (socket) {
    /*** Video ***/
    socket.on('play video', video.play.bind(null, client, file));
    socket.on('stop video', video.stop.bind(null, client));
    socket.on('pause video', video.pause.bind(null, client));
    socket.on('unpause video', video.unpause.bind(null, client));

    /*** Presentation ***/
    socket.on('play presentation', presentation.play.bind(null, client));
    socket.on('stop presentation', presentation.stop.bind(null, client));
    socket.on('pause presentation', presentation.pause.bind(null, client));
    socket.on('unpause presentation', presentation.unpause.bind(null, client));
});
