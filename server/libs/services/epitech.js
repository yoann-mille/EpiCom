var request = require('request');
var Tools = require('../utils/tools');
var config = require('../../config');
var User = require('./user');

module.exports = {

    authentification: function(login, password, callback){
	request.post(
	    config.epitech.url + '/login?format=json&access_token=',
	    { form: { login: login, password: password } },
	    function (err, response, body) {
		if (err){
		    callback(err);
		} else if (response.statusCode !== 200){
		    callback();
		} else {
		    data = JSON.parse(Tools.spliceLine(body, 0, 1));
		    callback(null, data.access_token);
		}
	    });
    },

    token: function(content, callback){
	request.get(
	    config.epitech.url + '/?format=json&access_token=' + content.token,
	    function(err, response, body) {
		if (err){
		    callback(err);
		} else if (response.statusCode !== 200){
		    callback();
		} else {
		    data = JSON.parse(Tools.spliceLine(body, 0, 1));
		    if (data.infos.login !== content.login){
			callback();
		    } else {
			callback(null, true);
		    }
		}
	    });
    },

    pullPlanning: function(token, filter, callback){

	params = [];
	params.push('format=json');
	params.push('access_token=' + token);
	params.push('start=' + filter.start);
	params.push('end=' + filter.end);
	params = params.join('&');

	request.get(config.epitech.url + '/planning/load?' + params,
		    function(error, response, body){
			if (error) {
			    callback(err);
			} else {
			    data = JSON.parse(Tools.spliceLine(body, 0, 1));

			    if (!data || !data.length){
				callback(null, null);
			    } else {
				var data2 = [];
				data.forEach(function(value){
				    if (value.instance_location === filter.zone){
					data2.push(value);
				    }
				});
				callback(null, data2);
			    }
			}
		    });
    }

};
