const express = require('express');
const reqestModule = require('request');
const bodyParser = require('body-parser');
const dummyData = require('../data.json');

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
  response.end(JSON.stringify(dummyData));
});

app.get('/repos', function (request, response) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  response.status(200);
  // response.redirect('/');
  response.end();
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

