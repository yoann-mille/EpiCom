/*
** media.js for EpiCom in /server/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:20:26 2014 yoann mille
** Last update Fri Jul 18 17:15:29 2014 yoann mille
*/

var path = require('./config').path;

module.exports = {

    deleteMedia : function (media, list, fnClient) {
	var fs = require('fs-extra');
	var dir = path.images;
	if (media == 'videos')
	    dir = path.video;
	else if (media == 'presentations')
	    dir = path.presentation;
	for (var i = 0; i < list.length; i++) {
	    var li = list[i];
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

    list :  function (req, res, next) {
	var fs = require('fs-extra');
	var img;
	var video;
	var mini;
	fs.readdir(path.miniature ,function(err, minis){
            if (err){
                console.log('Error on loading files in media/ :');
                console.log(err);
		mini = [];
            }
	    else {
		mini = minis;
	    }
	    fs.readdir(path.video ,function(err, videos){
		if (err){
                    console.log('Error on loading files in media/ :');
                    console.log(err);
		    video = [];
		}
		else {
		    video = videos;
		}
	   	fs.readdir(path.images,function(err, imgs){
		    if (err){
			console.log('Error on loading files in media/ :');
			console.log(err);
			img = [];
		    }
		    else {
			img = imgs;
		    }
		    req.param.files = {
			mini: mini,
			video: video,
			img: img
		    };
		    next();
		});
            });
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
	url + 'rel=0&autoplay=1'
	this.client.emit('playURL', url);
    },
};
