#!/bin/bash

VAGRANT_RESOURCES=/home/vagrant/shared/resources
VAGRANT_DOWNLOADS=/home/vagrant/shared/downloads

function resourceExists {
	FILE=${VAGRANT_RESOURCES}/$1
	if [ -e $FILE ]
	then
		return 0
	else
		return 1
	fi
}

function downloadExists {
	FILE=${VAGRANT_DOWNLOADS}/$1
	if [ -e $FILE ]
	then
		return 0
	else
		return 1
	fi
}

function fileExists {
	FILE=$1
	if [ -e $FILE ]
	then
		return 0
	else
		return 1
	fi
}

