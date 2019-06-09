#!/bin/bash

remove=src
put=''
srcFiles='srcFiles = ['
list=$(find src/*/* -name "*.js")
for item in $list; do
  str="'$item',"
  str2="${str/$remove/$put}"
  srcFiles+="$str2"
done
srcFiles+=']'
echo "$srcFiles" > dist/service-worker.js
cat src/service-worker.js >> dist/service-worker.js
