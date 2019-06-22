# Reactive ToDo Application

The app is built using [quantum](https://github.com/tatomyr/quantum) reactive store & rendering library
and bare native ES modules.
The aim is mostly proof of concept.

# Development

To start dev server run `npm start` or `bash bin/start.sh`. Your app will be accessible at
http://localhost:8080.

To deploy use `npm run build && npm run deploy` or `bash bin/build.sh && bash bin/deploy.sh`.
This will deploy your code to [Netlify](https://reactive-todo-app.netlify.com/)
throughout auxilliary repository git@gitlab.com:tatomyr/reactive-todo-app.git.
Make sure that a branch you're deploying to (e.g. `master`) isn't protected.
