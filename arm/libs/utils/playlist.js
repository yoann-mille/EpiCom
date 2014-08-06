/*
** vlcControler.js for Epicom in /arm/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue Jul  8 11:23:51 2014 yoann mille
** Last update Tue Jul  8 11:24:04 2014 yoann mille
*/

var path = require('./path');

playlist.readFile = function (file) {
    var fs = require('fs-extra');

    return fs.readFileSync(path.playlist + file);
}

playlist.start = function (app, ioPres, vlc, file) {
    var buff = playlist.readFile(file);

    
}