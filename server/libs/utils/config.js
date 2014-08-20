/*
** config.js for EpiCom in /server/libs/utils
** 
** Git project https://github.com/yoann-mille/EpiCom.git
** 
** Made by yoann mille
** Email   <yoann.mille@epitech.eu>
** 
** Started on  Tue May  6 11:20:14 2014 yoann mille
** Last update Tue Jul 22 11:50:42 2014 yoann mille
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

module.exports = config;
