const express = require('express');
const bodyParser = require('body-parser');
const dummyData = require('../data.json');
const github = require('../helpers/github');
const db = require('../database/index');

let app = express();

app.use(bodyParser.json())

app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (request, response) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // gets the repos from GitHub, then saves them to Mongo
  // then reponds back with what's in Mongo
  github.getReposByUsername(request.body.query, (repos) => {
    if (repos.message !== 'Not Found') {
      response.status(201);
      
      db.save(repos, mongooseRepos => {
        response.end(JSON.stringify(mongooseRepos));
      });
    } else {
      response.status(404).send('Not Found');
    }
  })
});

app.get('/repos', function (request, response) {
  response.status(200);

  db.findTop25(repos => {
    response.end(JSON.stringify(repos));
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
