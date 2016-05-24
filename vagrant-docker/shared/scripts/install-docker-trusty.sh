#!/bin/bash

#
# Author: Alessandro Iori
#
# source: https://docs.docker.com/engine/installation/linux/ubuntulinux/
#
# kernel must be 3.10 at minimum,
# check your current kernel version:
# $ uname -r
#

echo ""
echo "CONFIGURATION"
echo ""

# prerequisites for 14.04
sudo apt-get update
sudo apt-get install -y linux-image-extra-$(uname -r)
apt-get install -y apparmor

# Update package information, 
# ensure that APT works with the https method, 
# and that CA certificates are installed.
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates

# Add the new GPG key.
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

# create /etc/apt/sources.list.d/docker.list
sudo rm -r /etc/apt/sources.list.d/docker.list
echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" >> /etc/apt/sources.list.d/docker.list

# Update the APT package index.
sudo apt-get update

# Purge the old repo if it exists.
sudo apt-get purge lxc-docker

# Verify that APT is pulling from the right repository.
apt-cache policy docker-engine

echo ""
echo "INSTALL DOCKER"
echo ""

# install docker
sudo apt-get update
sudo apt-get install -y docker-engine
sudo service docker start

# test
sudo docker run hello-world



