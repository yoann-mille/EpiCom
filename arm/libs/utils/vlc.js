/*
** vlc.js for Epicom in /arm/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Wed Jun 18 16:48:50 2014 yoann mille
** Last update Wed Jun 18 18:37:57 2014 yoann mille
*/

var exec = require('child_process').exec;
var child = null;
var cmd = '/usr/bin/vlc';
cmd += ' --fullscreen';
cmd += ' --playlist-autostart';

module.exports = {

    play: function (files) {
	if (child)
	    quit();
	cmd += ' ';
	cmd += files;
	child = exec(cmd, function (err, stdout, stderr) {
	    if (err) {
		console.log('exec error on file : ' + files);
		console.log(err);
	    }
	});
    },

    quit: function () {
	child.kill();
	child = null;
    }

};
