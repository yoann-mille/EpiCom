/*
** video.js for EpiCom in /server/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:22:35 2014 yoann mille
** Last update Wed Aug 20 14:21:23 2014 yoann mille
*/

module.exports = {

    play : function (client, file) {
	var path = require('./config').path;
	var tab = [];

	tab.push(file.file);
	client.emit('play video', tab);
    },

    stop : function (client) {
	client.emit('stop video');
    },

    pause : function (client) {
	client.emit('pause video');
    },

    unpause : function (client) {
	client.emit('unpause video');
    }
};
