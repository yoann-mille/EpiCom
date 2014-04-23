/*
** video.js for EpiCom Server
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.net>
** 
** Started on  Tue Apr 22 11:01:47 2014 yoann mille
** Last update Tue Apr 22 11:11:14 2014 yoann mille
*/

var socket = io.connect('');

function playVideo () {
    socket.emit('play video', {toto: "salut", titi: "connard"});
}
function stopVideo () {
    socket.emit('stop video');
}
function pauseVideo () {
    socket.emit('pause video');
}
function unpauseVideo () {
    socket.emit('unpause video');
}
