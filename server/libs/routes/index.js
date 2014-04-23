var request = require('request');
var config = require('../../config');

module.exports = function() {
    return {
	
	//    planning: require('./planning')(),
	user: require('./user')(),
//	epitech: require('./epitech')(),
	//    room: require('./room')(),
	//    reservation: require('./reservation')(),
	authentification: require('./authentification')(),
	//    playlist: require('./playlist')(),
	//    media: require('./media')(),

	/*
	 * GET home page.
	 */
	index: function(req, res){
	    res.render('index', {admin: req.session.user.rank === 'admin'});
	},

	/*
	 * Login page
	 */
	login: function(req, res) {
            res.render('login');
	},

	postLogin: function(req, res){
            res.render('index', {admin: req.session.user.rank === 'admin'});
	},

	code: function(req, res) {
            res.render('code', {admin: req.session.user.rank === 'admin'});
	},

	test: function(req, res){
	    res.render('test');
	}

    };
}
