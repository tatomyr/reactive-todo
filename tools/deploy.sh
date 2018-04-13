#!/bin/bash

cd dist
git init
git remote add deploy git@gitlab.com:tatomyr/reactive-todo-app.git
git add .
git commit -m "deploy"
git push -f deploy master
