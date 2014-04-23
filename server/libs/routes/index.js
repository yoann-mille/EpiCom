var request = require('request');
var config = require('../../config');

module.exports = function() {
    return {
	
	user: require('./user')(),
	authentification: require('./authentification')(),

	/*
	 * GET home page.
	 */
	index: function(req, res){
	    res.render('index', {title: 'Home', admin: req.session.user.rank === 'admin'});
	},

	video: function(req, res) {
	    res.render('video', {title: 'Video'});
	},

	presentation: function(req, res) {
	    res.render('presentation', {title: 'Presentation'});
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
