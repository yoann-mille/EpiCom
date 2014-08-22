/*
** video.js for EpiCom in /server/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:22:35 2014 yoann mille
** Last update Fri Aug 22 11:03:45 2014 yoann mille
*/

module.exports = {

    play : function (clients, file) {
	var path = require('./config').path;
	var tab = [];

	tab.push(file.file);
	clients.forEach(function (client, i, array) {
	    client.emit('play video', tab);
	});
    },

    stop : function (clients) {
	clients.forEach(function (client, i, array) {
	    client.emit('stop video');
	});
    },

    pause : function (clients) {
	clients.forEach(function (client, i, array) {
	    client.emit('pause video');
	});
    },

    unpause : function (clients) {
	clients.forEach(function (client, i, array) {
	    client.emit('unpause video');
	});
    }
};
