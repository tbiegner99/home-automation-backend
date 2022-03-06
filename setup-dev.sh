#!/bin/bash
while getopts "s" opt; do
  case "$opt" in
    h|\?)
      echo "s - force secret overwrite. i f not provided secrets will be prompted if they dont exist"
      exit 0
      ;;
    s)  SCRIPTARGS="-s"
      ;;

  esac
done
source ./secrets/setup.sh $SCRIPTARGS
docker-compose -f ./docker-compose-debug.yml up  -d