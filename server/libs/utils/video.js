/*
** socket.js for EpiCom Server
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.net>
** 
** Started on  Tue Apr 22 10:01:41 2014 yoann mille
** Last update Tue Apr 22 16:11:54 2014 yoann mille
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
