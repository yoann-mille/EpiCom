/*
** presentation.js for EpiCom Server
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.net>
** 
** Started on  Tue Apr 22 11:02:50 2014 yoann mille
** Last update Tue Apr 22 11:05:16 2014 yoann mille
*/

function playPres () {
    socket.emit('play presentation');
}
function stopPres () {
    socket.emit('stop presentation');
}
function pausePres () {
    socket.emit('pause presentation');
}
function unpausePres () {
    socket.emit('unpause presentation');
}
