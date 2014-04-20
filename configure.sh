#!/bin/sh
## configure.sh for EpiCom
## 
## Git project https://github.com/yupin/EpiCom.git
## 
## Made by yoann mille
## Email   <yoann.mille@epitech.net>
## 
## Started on  Sat Apr 19 20:33:11 2014 yoann mille
## Last update Sun Apr 20 12:03:25 2014 yoann mille
##

OPT_RPI="-rpi"
OPT_SERVER="-server"

if [ -z "$1" ]; then
    echo "Usage :"
    echo -e "  If you are on a raspberry run :"
    echo -e "\t./configure.sh $OPT_RPI"
    echo -e "  Else if you are on your server run :"
    echo -e "\t./configure.sh $OPT_SERVER"
    echo ""
    echo "================================================================================================================"
    echo -e "\t\t\t\t\t!!!! WARNING !!!!"
    echo ""
    echo -e "\tIf you are on your server DON'T run ./configure.sh $OPT_SERVER. That will change your init configuration"
    echo -e "\tand cause you few surprise ;)"
    echo "================================================================================================================"
    echo ""

    exit
fi

if [ "$1" = $OPT_RPI ]; then

    ./arm/configure.sh

    exit
fi

if [ "$1" = $OPT_SERVER ]; then

    (cd server && ./configure.sh)
    mv npm-debug.log server/

    exit
fi
