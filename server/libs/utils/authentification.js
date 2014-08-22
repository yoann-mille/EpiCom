/*
** authentification.js for EpiCom in /server/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:20:26 2014 yoann mille
** Last update Fri Aug 22 15:39:07 2014 yoann mille
*/

var users = [
    {login: 'mille_y', password: 'toto'}
];

module.exports = {

    trylogin: function (req, res, next) {
	var login = req.param('login');
	var password = req.param('password');
	var i = 0;
	var len = users.length;

	while (i < len) {
	    if (users[i].login === login && users[i].password == password) {
		i = len + 1;
		req.session.regenerate(function(){
		    var token = Math.random();

		    req.session.user = {login: login, token: token};
		    req.session.success = users[i];
		    return next();
		});
	    } else {
		i++;
	    }
	    if (i == len)
		res.redirect('/login');
	}
    },

    isLogin: function (req, res, next) {
	if (req.session.user)
	    next();
	else
	    res.redirect('/login');
    },

    logout: function (req, res, next) {
	req.session.destroy(function(){
	    res.redirect('/');
	});
    }
};
