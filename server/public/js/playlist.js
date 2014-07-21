/*
** dragAndDrop.js for Epicom in /server/public/js
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue Jun 17 10:14:47 2014 yoann mille
** Last update Mon Jul  7 15:49:52 2014 yoann mille
*/

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
    row.insertCell(1).innerHTML = document.getElementById(data).parentNode.parentNode.id;

    var cell = row.insertCell(2);
    cell.appendChild(buttonDel);
}
