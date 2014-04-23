/*
** socket.js for EpiCom Server
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.net>
** 
** Started on  Tue Apr 22 10:01:41 2014 yoann mille
** Last update Tue Apr 22 16:13:01 2014 yoann mille
*/

module.exports = {
  
    play : function (client, file) {
	console.log("button play presentation clicked.");
	client.emit('play presentation', file);
    },

    stop : function (client) {
	console.log("button stop presentation clicked.");
	client.emit('stop presentation');
    },

    pause : function (client) {
	console.log("button pause presentation clicked.");
	client.emit('pause presentation');
    },

    unpause : function (client) {
	console.log("button unpause presentation clicked.");
	client.emit('unpause presentation');
    }
};
