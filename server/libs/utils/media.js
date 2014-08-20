/*
** media.js for EpiCom in /server/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:20:26 2014 yoann mille
** Last update Tue Aug 19 15:05:54 2014 yoann mille
*/

var path = require('./config').path;
var fs = require('fs-extra');

module.exports = {

    deleteMedia : function (media, list, fnClient) {
	var fs = require('fs-extra');
	var dir = path.images;
	if (media == 'videos')
	    dir = path.video;
	else if (media == 'presentations')
	    dir = path.presentation;
	else if (media == 'playlists')
	    dir = path.playlist;
	for (var i = 0; i < list.length; i++) {
	    var li = list[i];
	    console.log(dir + list[i].replace('.png', '.jade'));
	    fs.remove(dir + list[i].replace('.png', '.jade'), function (err) {
		if (err) {
		    console.log('Error on delet file ' + dir + list[i] + '\n\t'  + err);
		    fnClient(false, list[i]);
		}
		if (media == 'presentations') {
		    fs.remove(path.miniature + li, function (err) {
			if (err)
			    console.log('Error on delet file ' + path.miniature + li + '\n\t'  + err);
		    });
		}
		fnClient(true, li);
	    });
	}
    },

    readDirMini : function (req, res, next) {
	req.param.files = {};
	fs.readdir(path.miniature , function(err, minis) {
	    if (err) {
                console.log('Error on loading files in ' + path.miniature + ' :');
                console.log(err);
		req.param.files.mini = [];
            } else {
		req.param.files.mini = minis;
	    }
	    next();
	});
    },

    readDirImages : function (req, res, next) {
	fs.readdir(path.images, function(err, images) {
	    if (err) {
                console.log('Error on loading files in ' + path.images + ' :');
                console.log(err);
		req.param.files.img = [];
            } else {
		req.param.files.img = images;
	    }
	    next();
	});
    },

    readDirVideo : function (req, res, next) {
	if (req.param.files === undefined)
	    req.param.files = {};
	fs.readdir(path.video, function(err, videos) {
	    if (err) {
                console.log('Error on loading files in ' + path.video + ' :');
                console.log(err);
		req.param.files.video = [];
            } else {
		req.param.files.video = videos;
	    }
	    next();
	});
    },

    readDirPlaylist : function (req, res, next) {
	fs.readdir(path.playlist, function(err, playlists) {
	    if (err) {
                console.log('Error on loading files in ' + path.playlist + ' :');
                console.log(err);
		req.param.files.plists = [];
            } else {
		req.param.files.plists = playlists;
	    }
	    next();
	});
    },

    readFileUpdatePlaylist : function (req, res, next) {
	var data = fs.readFileSync(path.playlist + req.query.plistname, {encoding: 'utf8'}).replace('#EXTM3U', '').split('\n');
	console.log(data.length);
	for (var j = 0; j < data.length; j++) {
	    if (j % 2 == 0)
		data[j] = '';
	    else
		data[j] = data[j].replace('#EXTINF:0,', '');		
	}
	req.param.plist = {name: req.query.plistname.replace('.m3u', ''), data: data};
	next();
    },

    readFilePlaylist : function (req, res, next) {
	var list = req.param.files.plists;

	req.param.files.playlist = [];
	list.forEach(function (plist, i, array) {
	    var data = fs.readFileSync(path.playlist + plist, {encoding: 'utf8'}).replace('#EXTM3U', '').split('\n');
	    for (var j = 0; j < data.length; j++) {
		if (j % 2 == 0)
		    data[j] = '';
		else
		    data[j] = data[j].replace('#EXTINF:0,', '');		
	    }
	    req.param.files.playlist.push({name: plist, data: data});
	    if (i + 1 == array.length)
		next();
	});
    },

    /************************************/
    /*		Upload files		*/
    /************************************/
    upload : function (req, res, next) {
	var fs = require('fs-extra');
	var files = req.files.file;
	var tab = [files];
	var isUpload = null;
	var folder = "";

	if (Array.isArray(files))
	    tab = files;
	for (var i = 0; i < tab.length; i++) {
	    console.log('Tab[' + i + '] = ');
	    console.log(tab[i]);
	    folder = path.video;
	    if (tab[i].type.indexOf('image', 0) == 0)
		folder = path.images;
	    fs.copy(tab[i].path, folder + tab[i].name, function (err) {
		if (err)
		    isUpload = "KO";
	    });
	    if (i == tab.length - 1) {
		if (isUpload == null)
		    isUpload = "OK";
		req.param.isUpload = isUpload;
		next();
	    }
	}
    },

    /************************************/
    /*		Play URL		*/
    /*	  Youtube or Dailymotion	*/
    /************************************/
    playURL : function (req, res, next) {
	var url = req.body.playURL;

	if (url.search('youtube.com/watch\\?v=') != -1)
	    url = url.replace('youtube.com/watch?v=', 'youtube.com/embed/');
	if (url.search('dailymotion.com/video/') != -1)
	    url = url.replace('dailymotion.com/video/', 'dailymotion.com/embed/video/');
	if (url.search('\\?') == -1)
	    url += '?';
	else
	    url += '&';
	url += 'autoplay=1';
	this.client.emit('playURL', url);
	next();
    },

    playlist: function (data, cb) {
	var name = data.name + '.m3u';
	var tab = data.buff;
	var fs = require('fs-extra');
	var file = path.playlist + name;
	var buff = '#EXTM3U\n';

	tab.forEach(function (row, i, array) {
	    
	    buff += '#EXTINF:0,' + row + '\n';
	    buff += path.video + row + '\n';

	    if (i + 1 == array.length) {
		fs.outputFile(file, buff, function(err) {
		    if (err) {
			cb(false);
			console.log('Error on creating playlist name : ' + file);
			console.log(err);
		    }
		    cb(true);
		});
	    }
	});
    }
};
