/*
** video.js for EpiCom in /server/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:22:35 2014 yoann mille
** Last update Tue May  6 11:22:41 2014 yoann mille
*/

module.exports = {

    play : function (client, file) {
	console.log("button play video clicked = ", file);
	client.emit('play video', file);
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
