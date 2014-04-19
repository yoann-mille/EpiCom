#!/bin/sh
## configure.sh for EpiCom
## 
## Git project https://github.com/yupin/EpiCom.git
## 
## Made by yoann mille
## Email   <yoann.mille@epitech.net>
## 
## Started on  Sat Apr 19 20:33:11 2014 yoann mille
## Last update Sat Apr 19 21:32:14 2014 yoann mille
##

##################################
##	Files to add in /boot/	##
##################################

cat ./config/config.txt >> /boot/config.txt
cat ./config/xinitrc >> /boot/xinitrc

##################################
##	Files to add in /etc/	##
##################################

cat ./config/rc.local >> /etc/rc.local
