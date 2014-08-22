/*
** dragAndDrop.js for Epicom in /server/public/js
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue Jun 17 10:14:47 2014 yoann mille
** Last update Fri Aug 22 15:07:43 2014 yoann mille
*/

var socket = null;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    var data = ev.dataTransfer.getData("Text");
    var table = document.getElementById('table list');
    table.deleteRow(-1);

    var row = table.insertRow(-1);
    var emptyRow = table.insertRow(-1);

    var glyphicon = document.createElement("SPAN");
    glyphicon.className = 'glyphicon glyphicon-remove';

    var buttonDel = document.createElement("BUTTON");
    buttonDel.className = 'btn btn-default';
    buttonDel.setAttribute('type', 'button');
    buttonDel.onclick = function () {
	var i = this.parentNode.parentNode.rowIndex;
	table.deleteRow(i);
    };
    
    buttonDel.appendChild(glyphicon);

    row.insertCell(0).innerHTML = data;

    var cell = row.insertCell(1);
    cell.appendChild(buttonDel);
}

function deleteRow (button) {
    var table = document.getElementById('table list');

    var i = button.parentNode.parentNode.rowIndex;
    table.deleteRow(i);

    if (table.rows.length == 1) {
	var row = table.insertRow(-1);
	row.insertCell(0).innerHTML = '';
	row.insertCell(1).innerHTML = '';
    }
}

function createPlaylist () {
    if (socket === null)
	socket = io.connect();
    
    socket.on('disconnect', function () {
	socket = null;
    });

    var rows = document.getElementById('table list').rows;
    var name = document.getElementById('playlistName').value;
    var buff = [];

    for (var i = 1; i < rows.length - 1; i++) {
	var cells = rows[i].cells;
	buff.push(cells[0].innerHTML);
    }

    socket.emit('createPlaylist', {name: name, buff: buff}, function (isOk) {
	document.location.href = '/playlist?isOk=' + isOk;
    });
}
