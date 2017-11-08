const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  url: String,
  forks_count: Number,
  login: String
});

// can put methods on the repoSchema

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', function() {
  // we're connected! all schema stuff goes in here
  // each repo (row in a SQL db), is an instance of Repo
});

module.exports.save = save;