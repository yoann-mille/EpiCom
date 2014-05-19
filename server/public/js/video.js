/*
** video.js for EpiCom in /server/public/js
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:29:21 2014 yoann mille
** Last update Tue May  6 11:29:27 2014 yoann mille
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
