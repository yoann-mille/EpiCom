/*
** video.js for EpiCom in /server/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:22:35 2014 yoann mille
** Last update Wed Jul  9 14:52:00 2014 yoann mille
*/

var vlc = require('vlc-api')({host: '10.18.207.221', port: 8080});

function finish(err) {
    if (err) {
	throw err;
    }
    setTimeout(this, 2000 * Math.random());
}

module.exports = {

    play : function (client, file) {
	console.log("button play video clicked = ", file.file);
	var path = require('./config').path;
/*	vlc.status.volume(75, {host: '10.18.207.221', port: '8080'}, function (err) {
	    if (err) {
		throw err;
	    }
	    setTimeout(this, 2000 * Math.random());
	});*/
/*	vlc.status.pause()
	    .then(vlc.status.play())
	    .then(vlc.status.fullscreen());*/
	var tab = [];
	tab.push(file.file);
	client.emit('play video', tab);
    },

    stop : function (client) {
	console.log("button stop video clicked.");
	client.emit('stop video');
    },

    pause : function (client) {
	console.log("button pause video clicked.");
	client.emit('pause video');
    },

    unpause : function (client) {
	console.log("button unpause video clicked.");
	client.emit('unpause video');
    }
};
