#!/bin/sh
cd /home/vagrant/projects/snapcook
npm install
nohup node app.js > /dev/null 2>&1 &