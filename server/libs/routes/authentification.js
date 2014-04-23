var User = require('../services/user');
var Epitech = require('../services/epitech');

module.exports = function() {
    return {

	/**
	 * cette fonction permet de verifier l'identite de l'utilisateur
	 * sur l'intranet epitech. Si l'utilsateur est  verifie il est 
	 * ajouté en base et un token d'accès à l'api est généré et renvoyé
	 */
	getToken: function(req, res, next){

	    req.checkBody('login', 'invalid login').notEmpty();
	    req.checkBody('password', 'invalid password').notEmpty();

	    var errors = req.validationErrors();
	    if (errors){
		res.badRequest(errors);
	    } else {
		var login = req.param('login');
		var password = req.param('password');
		Epitech.authentification(login, password,
					 function(err, token){
					     if (err){
						 res.serviceUnavailable(err);
					     } else if (!token){
						 res.unauthorized();
					     } else {
						 req.user = {token: token, login:login};
						 next();
					     }
					 });
	    }
	},

	/**
	 * verifie que le token d'accès a l'api est valide, 
	 * récupere l'utilisateur correspondant et verifie qu'il
	 * est toujours identifié à l'intra (via access_token)
	 */
	token: function(req, res, next, tokenId){

	    User.get({ token_id: tokenId },
		     function(err, user){
			 if (err){
			     res.error(err);
			 } else if (!user){
			     res.unauthorized();
			 } else {
			     Epitech.token({ login: user.login, token: user.token },
					   function(err, ok){
					       if (err){
						   res.error(err);
					       } else if (!ok){
						   res.unauthorized();
					       } else {
						   req.user = user;
						   next();
					       }
					   });
			 }
		     });
	},

	/**
	 * permet une authentification via la code pin settable
	 * par l'utilisateur
	 */
	code: function(req, res, next){

	    req.checkBody('login', 'invalid login').notEmpty();
	    req.checkBody('code', 'invalid code').notEmpty().isNumeric();

	    var errors = req.validationErrors();
	    if (errors){
		res.badRequest(errors);
	    } else {
		User.get({ login: req.param('login'), code: req.param('code') },
			 function(err, user){
			     if (err){				 
				 res.error(err);
			     } else if (!user) {
				 res.unauthorized();
			     } else {
				 req.user = user;
				 next();
			     }
			 });
	    }
	},

	setSession: function(req, res){
	    req.session.user = req.user;
	    res.accepted();
	},

	session: function(req, res, next){
	    if (typeof req.session.user === 'undefined' || !req.session.user){
		res.redirect('/login');
	    } else {
		Epitech.token({ login: req.session.user.login, token: req.session.user.token },
			      function(err, ok){
				  if (err){
				      //res.error(err);
				      res.redirect('/login');
				  } else if (!ok){
				      res.redirect('/login');
				  } else {
				      req.user = req.session.user;
				      next();
				  }
			      });
	    }
	},

	unsetSession: function(req, res){
	    req.session.user = null;
	    res.redirect('/login');
	},

	admin: function(req, res, next){
	    if (req.session.user.rank !== 'admin'){
		res.redirect('/');
	    } else {
		next();
	    }
	}

    };
}
