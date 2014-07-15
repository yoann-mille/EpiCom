/*
** vlcControler.js for Epicom in /arm/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue Jul  8 11:23:51 2014 yoann mille
** Last update Tue Jul  8 11:24:04 2014 yoann mille
*/

var exec = require('child_process').exec;
var kill = require('child_process').execFile;
var parseurl = require('url');

var pipe = false;
var map = false;
var DEFAULT_PATH = '/vlc';
var proc = null;

function vlc(mapper) {
    map = mapper;
    return vlc.express;
}

vlc.express = function(req,res,next) {
    if (req.path.indexOf(DEFAULT_PATH) === 0) {
        //replace + and decode                                                                                                                               
        path = decodeURIComponent(req.path.replace(/\+/g, ' '));
        //remove leading and trailing /                                                                                                                      
        path = path.replace(/^\/|\/$/g,'');
        //split and remove leading path                                                                                                                      
        var parts = path.split('/');
        parts.shift();
        var command = parts.shift();
	console.log('executing',command,parts);
        if (vlc[command]) {
            if (command === 'start') {
                vlc.start(parts.join('/')+'?'+parseurl.parse(req.url).query);
            } else {
                vlc[command].apply(this,parts);
            }
            //prevent anything else from being served from this subpath                                                                                      
            res.end('executed '+command);
            return;
        }
    }
    next();
};

vlc.start = function(fn) {
    if (!pipe) {
        pipe = 'vlccontrol';
        exec('mkfifo ' + pipe);
    }
    if (map) {
        map(fn,cb);
    } else {
        cb(fn);
    }

    function cb(fn) {
        //        console.log(fn);                                                                                                                           
        if (fn.length != 0) {
	    var file = fn.pop();
            proc = exec('cvlc -f  media/video/"' + file + '" < ' + pipe, function(error, stdout, stderr) {
                console.log(stdout);
                cb(fn);
            });
            exec('echo . > ' + pipe);
        }
    }
};

vlc.launch = function (files) {
    if (pipe) {
	var rm = kill('/usr/bin/killall',  ['-9', '/usr/bin/vlc'], function (error, stdout, stderr) {
	    pipe = null;
	    vlc.start(files);
	});
    } else {
	vlc.start(files);
    }
};

vlc.sendKey = function(key) {
    if (!pipe) return;
    exec('echo -n '+key+' > '+pipe);
};

vlc.mapKey = function(command,key,then) {
    vlc[command] = function() {
        vlc.sendKey(key);
        if (then) {
            then();
        }
    };
};

vlc.mapKey('pause','p');
vlc.mapKey('quit','q',function() {
    if (pipe)
	exec('rm ' + pipe);
    kill('/usr/bin/killall', ['-9', '/usr/bin/vlc'], null);
    pipe = false;
});
vlc.mapKey('play','.');
vlc.mapKey('forward',"$'\\x1b\\x5b\\x43'");
vlc.mapKey('backward',"$'\\x1b\\x5b\\x44'");

module.exports = vlc;