var User = require('../services/user');
var Epitech = require('../services/epitech');

module.exports = function() {
    return {

	update: function(req, res, next){
	    User.update(req.user, function(err){
		if (err){
		    res.error(err);
		} else {
		    next();
		}
	    });
	},

	getCurrentUser: function(req, res, next){
	    User.get({login: req.user.login}, function(err, user){
		if (err){
		    res.error(err);
		} else if (!user){
		    res.badRequest({message: 'This user doesn\'t exist.'});
		} else {
		    req.user = user;
		    next();
		}
	    });
	},

	sendToken: function(req, res){
	    res.json({token: req.user.token_id});
	},

	getUser: function(req, res, next, target){
	    User.get({login: target}, function(err, user){
		if (err){
		    res.error(err);
		} else if (!user){
		    res.badRequest({message: 'This user doesn\'t exist.'});
		} else {
		    req.target = user;
		    next();
		}
	    });
	},

	setCode: function(req, res){

	    req.checkBody('code', 'invalid code').notEmpty().isNumeric();

	    var errors = req.validationErrors();
	    if (errors){
		console.log(errors);
		res.badRequest(errors);
	    } else {
		User.set(req.user, {code: req.param('code')},
			 function (err, infos){
			     if (err){
				 console.log(err);
				 res.error(err);
			     } else {
				 res.redirect('/');
			     }
			 });
	    }
	},

	viewAdmin: function(req, res) {
	    User.getMany({rank: 'admin'}, function(err, users) {
		var tab = [];
		console.log(users);
		if (Object.prototype.toString.call(users) === '[object Array]') {
		    tab = users;
		} else {
		    tab.push(users);
		}
		res.render('user', {users: tab, admin: req.session.user.rank === 'admin'});
	    });
	},

	makeAdmin: function(req, res) {
	    console.log(req.body);
	    User.get({login: req.body.login}, function(err, user){
		if (err){
		    res.error(err);
		} else if (!user){
		    res.badRequest({message: 'This user doesn\'t exist.'});
		} else {
		    User.set(user, {rank: 'admin'}, function(err, infos){
			if (err){
			    res.error(err);
			} else {
			    res.redirect('user');
			}
		    });
		}
	    });
	},

	undoAdmin: function(req, res) {
	    var ids = req.body.checkbox;
	    console.log(ids);
	    if (Object.prototype.toString.call(ids) === '[object Array]'){
		for (var i in ids) {
		    console.log(i);
		    User.get({id: ids[i]}, function(err, user){
			if (err){
			    res.error(err);
			} else if (!user) {
			    res.badRequest({message: 'This user doesn\'t exist.'});
			} else {
			    User.set(user, {rank: 'none'}, function(err, infos){
				if (err){
				    res.error(err);
				}
			    });
			}
		    });
		}
		res.redirect('user');
	    } else {
		User.get({id: ids}, function(err, user){
		    if (err){
			res.error(err);
		    } else if (!user){
			res.badRequest({message: 'This user doesn\'t exist.'});
		    } else {
			User.set(user, {rank: 'none'}, function(err, infos){
			    if (err){
				res.error(err);
			    } else {
				res.redirect('user');
			    }
			});
		    }
		});
	    }
	},

	setRank: function(req, res){

	    req.checkBody('rank', 'invalid rank').isIn(['admin', 'privileged', 'none']);	

	    var errors = req.validationErrors();
	    if (errors){
		res.badRequest(errors);
	    } else if (req.user.rank !== 'admin'){
		res.forbidden();
	    } else {
		var data = {rank: req.param('rank')};
		User.set(req.target, data, function (err, infos){
		    if (err){
			res.error(err);
		    } else {
			res.accepted();
		    }
		});
	    }
	}

    };
}
