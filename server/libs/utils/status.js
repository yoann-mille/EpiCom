/*
** status.js for EpiCom in /server/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by thomas cholley
** Email   <thomas.cholley@epitech.eu>
** 
** Started on  Tue May  6 11:21:27 2014 yoann mille
** Last update Wed May  7 09:45:12 2014 yoann mille
*/

var res = require('express').response;

var status = {
    success: {
	ok: 200,
	created: 201,
	accepted: 202,
	noContent: 204
    },

    error: {
	// Client's errors
	badRequest: 400,
	unauthorized: 401,
	forbidden: 403,
	notFound: 404,

	// Server's errors
	internalError: 500,
	notImplemented: 501,
	serviceUnavailable: 503
    }
};

res.notFound = function(){
    this.send(status.error.notFound);
};

res.error = function(err){
    this.send(status.error.internalError, err);
};

res.badRequest = function(err){
    this.send(status.error.badRequest, err);
};

res.forbidden = function(err){
    this.send(status.error.forbidden, err);
};

res.unauthorized = function(page){
    this.status(status.error.unauthorized);
    this.render('login',  {errorAuthentification: true});
};

res.serviceUnavailable = function(err){
    this.send(status.error.serviceUnavailable, err || null);
};

res.accepted = function(){
    this.send(status.success.accepted, true);
};

res.created = function(obj){
    this.send(status.success.created, obj||true);
};

res.updated = function(obj){
    this.json(status.success.ok, obj);
};

res.noContent = function(){
    this.send(status.success.noContent);
};
