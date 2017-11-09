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
  console.log(request.body);
  

  // gets the repos from GitHub, then saves them to Mongo
  // then reponds back with what's in Mongo
  github.getReposByUsername(request.body.query, (repos) => {
    if (repos.message !== 'Not Found') {
      // repos found, response set to 201
      response.status(201);
      
      // save repos to MongoDB
      db.save(repos, mongooseRepos => {
        console.log(mongooseRepos);
        // response.end(mongooseRepos);
        response.end(JSON.stringify(mongooseRepos));
      });

      // let formattedRepos = dataFormatter(repos);
      // response.end(JSON.stringify(formattedRepos)); 
    } else {
      response.status(404).send('Not Found');
    }
  })
});

app.get('/repos', function (request, response) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  response.status(200);

  // note: now just sending back the dummy data
  console.log(request.body);

  let dummyResponse = dataFormatter(dummyData);
  response.end(JSON.stringify(dummyResponse));
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

let dataFormatter = function(data) {
  return data.map( repo => {
    return {
      id: repo.id,
      name: repo.name,
      url: repo.html_url,
      login: repo.owner.login,
      forks_count: repo.forks_count
    };
  });
}
