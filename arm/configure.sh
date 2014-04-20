#!/bin/sh
## configure.sh for EpiCom
## 
## Git project https://github.com/yoann-mille/EpiCom.git
## 
## Made by yoann mille
## Email   <yoann.mille@epitech.net>
## 
## Started on  Sun Apr 20 00:20:03 2014 yoann mille
## Last update Sun Apr 20 12:04:42 2014 yoann mille
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
