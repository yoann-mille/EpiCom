/*
** index.js for EpiCom in /server/libs/routes
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:16:35 2014 yoann mille
** Last update Fri Jul 18 14:11:14 2014 yoann mille
*/

var request = require('request');
var config = require('../utils/config');

module.exports = function() {
    return {
	
	user: require('./user')(),
	authentification: require('./authentification')(),
	/*
	 * GET home page.
	 */
	index: function(req, res){
//	    res.render('index', {title: 'Home', admin: req.session.user.rank === 'admin'});
	    res.render('index', {title: 'Home'});
	},

	media: function(req, res) {
	    var files = req.param.files;
	    res.render('media', {title: 'Media', videos: files.video, minis: files.mini, imgs: files.img, media: req.query.media});	    
	},

	playlist: function(req, res) {
	    var files = req.param.files;
	    res.render('playlist', {title: 'Playlist', videos: files.video, minis: files.mini, imgs: files.img});	    
	},
	
	upload: function(req, res) {
	    res.render('upload', {title: 'Upload', isUpload: req.param.isUpload});
	},

	presentation: function(req, res) {
	    var fileExist = false;
	    if (req.query.fileExist !== undefined)
		fileExist = req.query.fileExist;
	    res.render('presentation', {title: 'Presentation', fileExist: fileExist});
	},

	updatePresentation: function(req, res) {
	    res.render('updatePresentation', {title: 'Presentation', presName: req.query.name.replace('.png', ''),  slides: req.param.slides});
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
            res.render('login', {title: 'Login'});
	},

	postLogin: function(req, res){
            res.render('index', {title: 'Home', admin: req.session.user.rank === 'admin'});
	},

	code: function(req, res) {
            res.render('code', {admin: req.session.user.rank === 'admin'});
	},

	test: function(req, res){
	    res.render('test');
	}

    };
}
