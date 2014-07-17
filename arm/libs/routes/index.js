/*
** index.js for Epicom in /arm/libs/routes
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Wed Jul 16 10:52:31 2014 yoann mille
** Last update Wed Jul 16 10:54:01 2014 yoann mille
*/

var path = require('../utils/config').path;

exports.index = function(req, res){
    res.render('arm_Epitech');
};

exports.presentation = function (req, res) {
    res.render(path.presentation + req.query.name);
};
