# Purity ToDo Application

[![Netlify Status](https://api.netlify.com/api/v1/badges/05f29ca9-75bf-4c65-be73-e648421a0ac6/deploy-status)](https://app.netlify.com/sites/reactive-todo-app/deploys)

The app is built using [Purity](https://github.com/tatomyr/purity) reactive store & rendering library
and bare native ES modules.
The aim is mostly proof of concept.

# Development

To start dev server run `npm start` or `bash bin/start.sh`. Your app will be accessible at
http://localhost:8080.

To deploy use `npm run build && npm run deploy` or `bash bin/build.sh && bash bin/deploy.sh`.
This will deploy your code to [Netlify](https://reactive-todo-app.netlify.com/)
throughout auxilliary repository at `git@gitlab.com:tatomyr/reactive-todo-app.git`.
Make sure that a branch you're deploying to (e.g. `master`) isn't protected.
