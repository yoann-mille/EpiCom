/*
** config.js for EpiCom in /server/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:20:14 2014 yoann mille
** Last update Fri Aug 22 15:24:48 2014 yoann mille
*/

config = {};

config.epitech = {};
config.epitech.url = 'https://intra.epitech.eu/intra'

config.sql = {};
config.sql.host = 'localhost';
config.sql.user = 'root';
config.sql.password = '';
config.sql.database = 'epicom';

config.path = {};
config.path.root = "/home/yupin/EpiCom/server/";
config.path.views = config.path.root + "views/";
config.path.media = config.path.root + "media/";
config.path.images = config.path.media + "image/";
config.path.video = config.path.media + "video/";
config.path.miniature = config.path.media + "miniature/";
config.path.presentation = config.path.media + "presentation/";
config.path.playlist = config.path.media + "playlist/";

config.server = {};
config.server.url = '127.0.0.1';
config.server.port = '3000';

config.clients = {};
config.clients.tv1 = 'http://10.18.207.255:4242';
config.clients.tv2 = 'http://10.18.207.254:4242';
config.clients.tv3 = 'http://10.18.207.253:4242';
config.clients.tv4 = 'http://10.18.207.252:4242';
config.clients.tv5 = 'http://10.18.207.251:4242';

config.clients.path = {};
config.clients.path.media = "/home/olimex/EpiCom/arm/media/";
config.clients.path.video = config.clients.path.media + "video/";

module.exports = config;
