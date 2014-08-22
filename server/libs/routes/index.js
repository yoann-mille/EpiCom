/*
** index.js for EpiCom in /server/libs/routes
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:16:35 2014 yoann mille
** Last update Thu Aug 21 15:39:21 2014 yoann mille
*/

var config = require('../utils/config');

module.exports = function() {
    return {
	
	/*
	 * GET home page.
	 */
	index: function(req, res){
	    res.render('index', {title: 'Home',  user: req.user});
	},

	media: function(req, res) {
	    var files = req.param.files;
	    res.render('media', {title: 'Media', videos: files.video, minis: files.mini, imgs: files.img, media: req.query.media, plists: files.playlist,  user: req.user});	    
	},

	playlist: function(req, res) {
	    var files = req.param.files;
	    res.render('playlist', {title: 'Playlist', videos: files.video, plist: req.param.plist, isOk: req.param.isOk,  user: req.user});
	},
	
	upload: function(req, res) {
	    res.render('upload', {title: 'Upload', isUpload: req.param.isUpload,  user: req.user});
	},

	presentation: function(req, res) {
	    var fileExist = false;
	    if (req.query.fileExist !== undefined)
		fileExist = req.query.fileExist;
	    res.render('presentation', {title: 'Presentation', fileExist: fileExist,  user: req.user});
	},

	updatePresentation: function(req, res) {
	    res.render('updatePresentation', {title: 'Presentation', presName: req.query.name.replace('.png', ''),  slides: req.param.slides,  user: req.user});
	},

	viewPres: function (req, res) {
	    var fileName = req.body.name.replace(' ', '_');
	    fileName = 'arm_' + fileName;
	    console.log(fileName);
	    res.redirect(fileName);
	},

	previewPres: function (req, res) {
	    var filename = req.query.name;
	    var path = config.path;

	    res.render(path.presentation + filename);
	},

	/*
	 * Login page
	 */
	login: function(req, res) {
            res.render('login', {title: 'Login',  user: req.user});
	}
    };
}
