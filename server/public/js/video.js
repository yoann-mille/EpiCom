/*
** video.js for EpiCom in /server/public/js
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:29:21 2014 yoann mille
** Last update Mon Jul  7 16:03:21 2014 yoann mille
*/

var socket = null;

function playVideo (file) {
    if (socket === null)
	socket = io.connect();

    socket.on('disconnect', function () {
	socket = null;
    });
    socket.emit('play video', {file: file});
}

function stopVideo () {
    if (socket === null)
	socket = io.connect();

    socket.on('disconnect', function () {
	socket = null;
    });
    socket.emit('stop video');
}

function pauseVideo () {
    if (socket === null)
	socket = io.connect();

    socket.on('disconnect', function () {
	socket = null;
    });
    socket.emit('pause video');
}

function unpauseVideo () {
    if (socket === null)
	socket = io.connect();

    socket.on('disconnect', function () {
	socket = null;
    });
    socket.emit('unpause video');
}
