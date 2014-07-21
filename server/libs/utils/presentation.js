/*
** presentation.js for EpiCom in /server/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:21:03 2014 yoann mille
** Last update Wed Jul 16 15:18:26 2014 yoann mille
*/

var path = require('./config').path;
var saveName = '';

module.exports = {

    /****************************************************/
    /*							*/
    /*		Control RPI presentation		*/
    /*							*/
    /****************************************************/

    play : function (client, file) {
	console.log("button play presentation clicked file : " + file);
	client.emit('play presentation', file.file.replace('.png', ''));
    },

    stop : function (client) {
	console.log("button stop presentation clicked.");
	client.emit('stop presentation');
    },

    pause : function (client) {
	console.log("button pause presentation clicked.");
	client.emit('pause presentation');
    },

    unpause : function (client) {
	console.log("button unpause presentation clicked.");
	client.emit('unpause presentation');
    },

    /****************************************************/
    /*                                                  */
    /*          Check the name of the presentation      */
    /*		while the user type it			*/
    /*                                                  */
    /****************************************************/

    checkPresNameExist: function (client, data) {
	var fs = require('fs-extra');
	var dir = path.presentation;
	var name = data.presName;
	name = name.replace(' ', '_');
	name = 'arm_' + name + '.jade';
	name = dir + name;
	fs.exists(name, function (exists) {
	    client.emit('checkPresNameExist', exists);
	});
    },

    /****************************************************/
    /*							*/
    /*		Create presentation file .jade		*/
    /*							*/
    /****************************************************/    

    createPres: function (req, res, next) {
	var fs = require('fs-extra');
	var fileName = req.body.name.replace(' ', '_');
	fileName = 'arm_' + fileName + '.jade';
	var dir = path.presentation;
	fileName = dir + fileName;

	/************************************************/
	/*	Fill buff with the jade instruction	*/
	/************************************************/
	var buff = 'include arm_layoutTop\n\n';
	buff += 'div.reveal\n';

	var slide = req.body.slide;
	var slides = [];
	if (slide instanceof Array) {
	    slides = slide;
	} else {
	    slides.push(slide);
	}
	for (var i in slides) {
	    buff += '\tdiv.slides\n';
	    buff += '\t\tsection\n';
	    var tab = slides[i].split('\n');
	    for (j = 0, nbTab = 3; j < tab.length; j++) {
		for (var k = 0; k < nbTab; k++) {
		    buff += '\t';
		}
		if (tab[j].indexOf('li ', 0) == 0) {
		    buff += 'ul\n';
		    for (; j < tab.length && tab[j].indexOf('li', 0) == 0; j++) {
			for (var k = 0; k < nbTab + 1; k++) {
			    buff += '\t';
			}
			buff += tab[j] + '\n';
		    }
		    j--;
		} else if (tab[j].indexOf('img ', 0) == 0) {
		    buff += 'div\n';
		    buff += '\t\t\t\t';
		    buff += 'img(src="media/image/' + tab[j].split(' ')[1] + '")\n';
		} else {
		    buff += tab[j] + '\n';
		}
	    }
	}
	buff += '\ninclude arm_layoutBottom';

	fs.exists(fileName, function (exists) {
	    if (exists) {
		console.log('File already exist :' + fileName);
		res.redirect('presentation?fileExist=true');
	    }
	    else {
		fs.createFile(fileName, function (err, stat) {
		    if (err)
			console.log('Create file ' + fileName + ' error :\n' + err);
		    else {
			fs.appendFile(fileName, buff, function (err) {
			    if (err){
				console.log('Error on append on file : ' + fileName);
				console.log('Buff : ' + Buff);
			    }
			    else {
				console.log('File ' + fileName + ' created');
				next();
			    }
			});
		    }
		});
	    }
	});

    },


    /****************************************************/
    /*							*/
    /*		Take screenshot of presentation		*/
    /*		using phatom to have miniature		*/
    /*		visualisation in /media page		*/
    /*							*/
    /****************************************************/

    screenshot: function(req, res, next) {
	var fileName = req.body.name.replace(' ', '_');
	fileName = 'arm_' + fileName;
	var pathFile = fileName;
	// Add presentation's route on server for preview
	console.log('Add path ' + fileName + ' to server');
	this.app.get(	'/' + fileName, function (req, res) {
	    res.render(path.presentation + fileName);
	});
	var url = 'http://localhost:3000/' + pathFile;
	var phantom = require('phantom');
	phantom.create(function (ph) {
	    ph.createPage(function (page) {
		page.open(url, function (status) {
		    if (status == "success") {
			// put images in public directory
			var image_file_name = fileName + '.png';
			var image_path =  path.miniature + image_file_name;
			console.log('Screenshot of file ' + fileName + ' success');
			page.render(image_path, function(){
			    next();
			});
		    }
		    else {
			console.log('Error on taking screenshot of file ' + fileName + '\n\tStatus = ' + status);
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.end("404 Not Found");
		    }
		    page.close();
		    ph.exit();
		});
	    });
	});
    },
    
    /****************************************************/
    /*                                                  */
    /*          Load presentation into html form        */
    /*                                                  */
    /****************************************************/

    updatePresentation: function (req, res, next) {
	var fs = require('fs-extra');
	var name = req.query.name;
	saveName = name;
	var file = fs.readFileSync(path.presentation + name.replace('.png', '.jade'), 'utf8');
	var slides = [];
	var lines = file.split('\n');

	var numLine = 0;
	while (numLine < lines.length) {
	    while (numLine < lines.length && lines[numLine].indexOf('\t\tsection', 0) != 0) {
		numLine++;
	    }
	    numLine++;
	    var slide = '';
	    while (numLine < lines.length && lines[numLine].indexOf('\t\t\t', 0) == 0) {
		slide += lines[numLine].replace('\t\t\t', '');
		slide += '\n';
		numLine++;
	    }
	    if (numLine < lines.length)
		slides.push(slide);
	}
	if (numLine > lines.length) {
	    req.param.slides = slides;
	    next();
	}
    },

    deletePres: function (req, res, next) {
	var fs = require('fs-extra');
	var name = req.body.name;

	fs.remove(path.miniature + saveName, function (err) {
	    if (err)
		console.log("Error on remove file : " + path.miniature + saveName + "\n" + err);
	    fs.remove(path.presentation + saveName.replace('.png', '.jade'), function (err) {
		if (err)
		    console.log("Error on remove file : " + path.presentation + saveName.replace('.png', '.jade') + "\n" + err);
		next();
	    });
	});
    }
};
