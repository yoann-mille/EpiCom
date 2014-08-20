/*
** media.js for EpiCom in /server/public/js
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Thu May 15 17:33:57 2014 yoann mille
** Last update Tue Aug 19 14:52:35 2014 yoann mille
*/

var listToDel = [];
var socket = null;

function hideListMedia (nameLi) {
    listToDel.push(nameLi);
    var li = document.getElementById(nameLi);
    li.className = 'hidden';
}

function previewPres (media) {
    if (socket === null)
	socket = io.connect();

    socket.on('disconnect', function () {
	socket = null;
    });
    socket.emit('previewPres', media.replace('.png', ''), function (name) {
	console.log('titi?');
	document.location.href = '/' + name + '?name=' + name;
    });
}

function deleteFile (media) {
    if (socket === null)
	socket = io.connect();

    socket.on('disconnect', function () {
	socket = null;
    });
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
    document.location.href = '/updatePresentation?name=' + name;
}

function playURL() {
    var url = document.getElementById('url').value;

    if (url.search('youtube.com/watch\\?v=') != -1)
	url = url.replace('youtube.com/watch?v=', 'youtube.com/embed/');
    if (url.search('dailymotion.com/video/') != -1)
	url = url.replace('dailymotion.com/video/', 'dailymotion.com/embed/video/');
    if (url.search('\\?') == -1)
	url += '?';
    else
	url += '&';
    document.location.href = url + 'rel=0&autoplay=1';
}

function updatePlaylist (name) {
    document.location.href = '/updatePlaylist?plistname=' + name;
}
