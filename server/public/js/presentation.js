/*
** presentation.js for EpiCom in /server/public/js
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:28:17 2014 yoann mille
** Last update Tue May  6 11:28:24 2014 yoann mille
*/

var socket = null;

function playPres () {
    if (socket === null)
	socket = io.connect('');
    socket.emit('play presentation');
}
function stopPres () {
    if (socket === null)
	socket = io.connect('');
    socket.emit('stop presentation');
}
function pausePres () {
    if (socket === null)
	socket = io.connect('');
    socket.emit('pause presentation');
}
function unpausePres () {
    if (socket === null)
	socket = io.connect('');
    socket.emit('unpause presentation');
}

function addDivSlide () {
    var form = document.getElementById('form pres');
    var list = form.childNodes;

    var glyphicon = document.createElement("SPAN");
    glyphicon.className = 'glyphicon glyphicon-remove';

    var buttonDel = document.createElement("BUTTON");
    buttonDel.className = 'btn btn-default btn-pres-new-slide';
    buttonDel.setAttribute('type', 'button');
    buttonDel.onclick = function () {form.removeChild(node)};
    
    buttonDel.appendChild(glyphicon);

    var node = list[2].cloneNode(true);
    node.lastChild.value = '';
    node.setAttribute('autofocus', '');
    node.insertBefore(buttonDel, node.childNodes[1]);

    var button = document.getElementById('button add slide');
    form.insertBefore(node, button);
    window.scrollTo(0, node.offsetTop);
}

function checkPresNameExist () {
    var inputPresName = document.getElementById('presName');
    var presName = inputPresName.value;
    if (socket === null)
	socket = io.connect('');
    socket.emit('checkPresNameExist', {presName: presName});
    socket.on('checkPresNameExist', function (data) {
	if (data === true) {
	    var divPres = document.getElementById('presContainer');
	    var form = document.getElementById('form pres');
	    if (document.getElementById('alert pres exist') == null) {
		var alert = document.createElement('DIV');
		alert.className = 'alert alert-danger alert-pres';
		alert.id = 'alert pres exist';
		alert.innerHTML = 'La présentation <strong>' + presName + '</strong> existe déjà';
		inputPresName.value = '';
		divPres.insertBefore(alert, form);
	    }
	} else {
	    var alert = document.getElementById('alert pres exist');
	    if (alert !== null)
		document.getElementById('presContainer').removeChild(alert);
	}
    });
}
