#!/bin/bash

#
# insall-docker.sh is supported on these Ubuntu operating systems:
#
# • Ubuntu Xenial 16.04 (LTS)
# • Ubuntu Wily 15.10
# • Ubuntu Trusty 14.04 (LTS)
# • Ubuntu Precise 12.04 (LTS)
#
# tested on: Ubuntu Trusty 14.04 (LTS)
#
# source: https://docs.docker.com/linux/step_one/
#		  https://docs.docker.com/engine/installation/linux/ubuntulinux/
#
# author: Alessandro Iori
#


echo ""
echo "CONFIGURATION"
echo ""

#
# kernel must be 3.10 at minimum,
# check your current kernel version:
# $ uname -r
#

# minimum kernel version 3.10
MKV=310

# Kernel
echo "Kernel version:"
uname -r

KV=`uname -r | awk -F. '{print $1$2}'`

if [ "$KV" -lt "$MKV" ]; then
	echo "Kernel must be 3.10 at minimum."
	echo "Docker can not be install."
	exit
else
	echo "kernel version ok"
fi

# Release
echo "Linux release:"
lsb_release -s -d

LR=`lsb_release -s -d | awk '{print$1}'`
LRV=`lsb_release -s -d | awk '{print$2}' | awk -F. '{print $1$2}'`

if [ "$LR" != "Ubuntu" ]; then
	echo "Linux release is not Ububtu"
	echo "Docker can not be install."
	exit
else
	echo "Linux release ok"
fi

sudo apt-get update
sudo apt-get install -y linux-image-extra-$(uname -r)
# prerequisites for 14.04
apt-get install -y apparmor

if which curl >/dev/null; then
    echo ""
    echo "curl exist"
    echo ""
else
	echo ""
	echo "curl doesn't exist"
	echo ""
	sudo apt-get update
	sudo apt-get install -y curl 
fi
 
echo ""
echo "INSTALL DOCKER"
echo ""

curl -fsSL https://get.docker.com/ | sh

echo ""
echo "VERIFY"
echo ""
docker run hello-world


