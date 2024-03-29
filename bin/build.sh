#!/bin/bash

# Preparing
rm -rf dist
mkdir -p dist
cp -R ./src/* ./dist/

# Building manifest file
bash ./bin/process-manifest.sh > ./dist/manifest.json

# Obtaining list of files to cache
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

# Copying `service-worker` and substituting `srcFiles`
file_content=`cat ./src/service-worker.js`
file_content="${file_content/BUILD_DATE/$(date)}"
echo "${file_content/srcFiles/$srcFiles}" > ./dist/service-worker.js
