#!/bin/sh
echo "start mongodb"
nohup mongod &
sleep 10
cd /database
echo "restore mongodb"
mongorestore .
kill `ps aux | awk '/mongo/ {print $2}'`