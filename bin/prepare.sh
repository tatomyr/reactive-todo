#!/bin/bash

rm -rf dist
mkdir -p dist
cp ./src/index.html ./dist/
cp ./src/manifest.json ./dist/
cp -a ./src/assets ./dist/
