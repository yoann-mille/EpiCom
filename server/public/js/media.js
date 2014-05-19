/*
** media.js for EpiCom in /server/public/js
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Thu May 15 17:33:57 2014 yoann mille
** Last update Mon May 19 11:36:56 2014 yoann mille
*/

var listToDel = [];

function hideListMedia (nameLi) {
    listToDel.push(nameLi);
    var li = document.getElementById(nameLi);
    li.className = 'hidden';
}

function deleteFile (media) {
    var socket = io.connect('');
    socket.emit('deleteMedia', media, listToDel, function (isOk, media) {
	while (listToDel.length) {
	    listToDel.pop();
	}
	var mediaDiv = document.getElementById('mediaDiv');
	var child = mediaDiv.firstChild;
	var alert = document.createElement('DIV');
	alert.className = 'container alert alert-danger';
	if (isOk) {
	    alert.className = 'alert alert-success';
	}
	alert.innerHTML = 'Le ficher <strong>' + media + '</strong> n\'a pas était supprimé';
	if (isOk) {
	    alert.innerHTML = 'Le ficher <strong>' + media + '</strong> a bien était supprimé';
	}
	mediaDiv.insertBefore(alert, child);
    });
}

function updatePresentation (name) {
    var socket = io.connect('');
    socket.emit('updatePresentation', name);
}
