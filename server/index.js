const express = require('express');
const bodyParser = require('body-parser');
const dummyData = require('../data.json');
const github = require('../helpers/github');

let app = express();

app.use(bodyParser.json())

app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (request, response) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log(request.body);
  response.status(201);

  github.getReposByUsername(request.body.query, (repos) => {
    let formattedRepos = dataFormatter(repos);
    response.end(JSON.stringify(formattedRepos)); 
  })
});

app.get('/repos', function (request, response) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  response.status(200);

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
