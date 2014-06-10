/*
** media.js for EpiCom in /server/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:20:26 2014 yoann mille
** Last update Tue May 20 17:14:31 2014 yoann mille
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
	    fs.remove(dir + list[i].replace('.png', '.jade'), function (err) {
		if (err) {
		    console.log('Error on delet file ' + dir + list[i] + '\n\t'  + err);
		    fnClient(false, list[i]);
		}
		if (media == 'presentations') {
		    fs.remove(path.miniature + list[i], function (err) {
			if (err)
			    console.log('Error on delet file ' + path.miniature + list[i] + '\n\t'  + err);
		    });
		}
		fnClient(true, list[i]);
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
    }
};
