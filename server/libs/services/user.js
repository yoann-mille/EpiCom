/*
** user.js for EpiCom in /server/libs/services
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:18:40 2014 yoann mille
** Last update Tue May  6 11:18:48 2014 yoann mille
*/

var db = require('mysql-simple');

module.exports = {

    set: function(user, data, callback){
	
	var insert = [];
	var str = [];
	
	if (data.rank){
	    str.push('rank = ?');
	    insert.push(data.rank === 'none' ? null : data.rank);
	}
	if (data.code){
	    str.push('code = ?');
	    insert.push(data.code);
	}

	if (str.length){
	    str = str.join(', ');
	    insert.push(user.id);
	    
	    var req = 'UPDATE user SET ' + str + ' WHERE id = ?;';
	    db.nonQuery(req, insert, callback);
	} else {
	    callback();
	}
    },
    
    update: function(user, callback){
	
	var req = '\
		INSERT INTO user\
		(login, token, first_connection, last_connection)\
		VALUES (?, ?, NOW(), NOW())\
		ON DUPLICATE KEY UPDATE\
		last_connection=VALUES(last_connection),\
		token=VALUES(token)\
		;';

	db.nonQuery(req, [user.login, user.token], callback);
    },
    
    getMany: function(filters, callback){
	
	var data = [];
	var str = [];
	if (filters.login){
	    str.push('login = ?');
	    data.push(filters.login);
	}
	if (filters.id){
	    str.push('id = ?');
	    data.push(filters.id);
	}
	if (filters.token_id){
	    str.push('MD5(CONCAT(id, \'-/-\', last_connection)) = ?');
	    data.push(filters.token_id);
	}
	if (filters.token){
	    str.push('token = ?');
	    data.push(filters.token);
	}
	if (filters.code){
	    str.push('code = ?');
	    data.push(filters.code);
	}
	if (filters.rank){
	    str.push('rank = ?');
	    data.push(filters.rank);
	}
	str = str.length ? 'WHERE ' + str.join(' AND ') : '';

	var req = '\
		SELECT\
		id,\
		login,\
		MD5(CONCAT(id, \'-/-\', last_connection)) AS \'token_id\',\
		token,\
		rank\
		FROM user\
		' + str + '\
		;';

	db.query(req, data, callback);
    },
    
    get: function(filters, callback){
	
	var data = [];
	var str = [];
	if (filters.login){
	    str.push('login = ?');
	    data.push(filters.login);
	}
	if (filters.id){
	    str.push('id = ?');
	    data.push(filters.id);
	}
	if (filters.token_id){
	    str.push('MD5(CONCAT(id, \'-/-\', last_connection)) = ?');
	    data.push(filters.token_id);
	}
	if (filters.token){
	    str.push('token = ?');
	    data.push(filters.token);
	}
	if (filters.code){
	    str.push('code = ?');
	    data.push(filters.code);
	}
	if (filters.rank){
	    str.push('rank = ?');
	    data.push(filters.rank);
	}
	str = str.length ? 'WHERE ' + str.join(' AND ') : '';
	
	var req = '\
		SELECT\
		id,\
		login,\
		MD5(CONCAT(id, \'-/-\', last_connection)) AS \'token_id\',\
		token,\
		rank\
		FROM user\
		' + str + '\
		;';

	db.querySingle(req, data, callback);
    }
    
};
