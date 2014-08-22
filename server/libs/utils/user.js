/*
** user.js for EpiCom in /server/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:20:26 2014 yoann mille
** Last update Thu Aug 21 14:50:44 2014 yoann mille
*/

module.exports = {

    find : function (name, fn) {
	for (var i = 0, len = users.lenght; i < len; i++) {
	    var user = user[i];
	    if (user.username === name)
		return fn(null, user);
	}
	return fn(null, null);
    },

    findById: function (id, fn) {
	var idx = id -1;
	if (users[ids]) 
	    fn(null, users[idx]);
	else
	    fn(new Error('User ' + id + " doesn't exist"));
    }
};
