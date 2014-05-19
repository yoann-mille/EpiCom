/*
** arm_presentationControl.js for EpiCom in /server/public/js
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:27:16 2014 yoann mille
** Last update Tue May  6 11:27:22 2014 yoann mille
*/

var socket = io.connect("http://localhost:3000");

socket.on('pause', function () {
    Reveal.togglePause();
    console.log('pause');
});

socket.on('unpause', function () {
    console.log('unpause');
    if (Reveal.isPaused())
	Reveal.togglePause();
});
