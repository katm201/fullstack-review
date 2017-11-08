const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', function() {
  // we're connected! all schema stuff goes in here
  // each repo (row in a SQL db, document in Mongo), is an instance of Repo model

  let repoSchema = mongoose.Schema({
    id: Number,
    name: String,
    url: String,
    forks_count: Number,
    login: String
  });

  let Repo = mongoose.model('Repo', repoSchema);

  repoSchema.methods.findAllByLogin = function(callback) {
    return this.model('Repo').find({login: this.login}, callback);
  };

  let save = (/* TODO */) => {
    // TODO: Your code here
    // This function should save a repo or repos to
    // the MongoDB

  };
});

module.exports.save = save;